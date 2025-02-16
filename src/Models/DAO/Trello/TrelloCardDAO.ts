import {GlobalDAO} from "../GlobalDAO.js";
import {TrelloCard} from "../../BO/Trello/TrelloCard.js";
import {TrelloListDAO} from "./TrelloListDAO.js";
import {TrelloCardUserDAO} from "./TrelloCardUserDAO.js";
import connectDB from "../../../Config/dbConfig";

export class TrelloCardDAO extends GlobalDAO {
    getTableName(): string {
        return `"TrelloCards"`;
    }
    async objectToClass(row: any): Promise<TrelloCard> {
        const list: Promise<object | null> = TrelloListDAO.find(row.idList);
        return new TrelloCard(
           row.id,
           row.nom,
           row.description,
           row.dateReal,
           row.position,
           row.realised,
           list
       )
    }

    static async getAllCardsByUser(userId: number): Promise<TrelloCard[]> {
        const idArray: number[] = await TrelloCardUserDAO.getAllCardByUser(userId);
        const trelloCardDAO = new TrelloCardDAO();

        const rawCards = await Promise.all(
            idArray.map(id => TrelloCardDAO.find(id))
        );

        const validRawCards = rawCards.filter(card => card !== null);

        return await Promise.all(validRawCards.map(async (row) => {
            return await trelloCardDAO.objectToClass(row);
        }));
    }

    static async getAllByListAndPosition(listId: number): Promise<TrelloCard[]> {
        const client = await connectDB();
        const tableName = this.prototype.getTableName();
        const query = `SELECT * FROM ${tableName} WHERE "idList" = $1 ORDER BY position ASC`;
        try {
            const result = await client.query(query, [listId]);
            return await Promise.all(result.rows.map((row) => this.prototype.objectToClass(row)));
        } catch (e) {
            console.error("Authentication error:", e);
            throw e;
        } finally {
            client.release();
        }
    }

    static async updatePosition (positions: object){
        const client = await connectDB();
        const tableName = this.prototype.getTableName();
        try {
            let rows = [];
            for (const [id, position] of Object.entries(positions)) {
                const query = `UPDATE ${tableName} SET position = $1 WHERE id = $2 `;
                const result = await client.query(query, [position, id]);
                rows.push(result.rowCount);
            }
            return rows;
        } catch (e) {
            console.error("Authentication error:", e);
            throw e;
        } finally {
            client.release();
        }
    }
}