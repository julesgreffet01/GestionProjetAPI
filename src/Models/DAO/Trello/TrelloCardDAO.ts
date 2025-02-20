import {GlobalDAO} from "../GlobalDAO.js";
import {TrelloCard} from "../../BO/Trello/TrelloCard.js";
import {TrelloListDAO} from "./TrelloListDAO.js";
import {TrelloCardUserDAO} from "./TrelloCardUserDAO.js";
import connectDB from "../../../Config/dbConfig";
import {UserDAO} from "../UserDAO";

export class TrelloCardDAO extends GlobalDAO {
    getTableName(): string {
        return `"TrelloCards"`;
    }
    async objectToClass(row: any): Promise<TrelloCard> {
        console.log(row);
        const list = await TrelloListDAO.find(row.idList);
        const realisateur = row.idRealisateur ? await UserDAO.find(row.idRealisateur) : null;
        return new TrelloCard(
            row.id,
            row.nom,
            row.description,
            new Date(row.dateReal),
            row.position,
            row.realised,
            list,
            realisateur,
       )
    }

    static async getAllCardsByUser(userId: number): Promise<TrelloCard[]> {
        const idArray: number[] = await TrelloCardUserDAO.getAllCardByUser(userId);
        const rawCards = await Promise.all(idArray.map(id => TrelloCardDAO.find(id)));
        const validRawCards = rawCards.filter(card => card !== null);
        return validRawCards.map((row: any) =>
            new TrelloCard(
                row.id,
                row.nom,
                row.description,
                new Date(row.dateReal),
                row.position,
                row.realised,
                row.list,
                row.realisateur
            )
        );
    }



    static async getAllByListAndPosition(listId: number): Promise<TrelloCard[]> {
        const client = await connectDB();
        const tableName = this.prototype.getTableName();
        const query = `SELECT * FROM ${tableName} WHERE "idList" = $1 AND realised = FALSE ORDER BY position ASC`;
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

    static async getAllRealisedByTrello(trelloId: number): Promise<TrelloCard[]> {
        const client = await connectDB();
        const query = `SELECT tc.* FROM "TrelloCards" tc INNER JOIN "TrelloLists" tl ON tc."idList" = tl.id INNER JOIN "Trello" t ON tl."idTrello" = t.id WHERE t.id = $1 AND tl.del = FALSE AND tc.realised = TRUE ORDER BY tc.id ASC`;
        try {
            const result = await client.query(query, [trelloId]);
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

    static async changeRealised(taskId: number, real: boolean, realisateurId: number | null = null){
        const client = await connectDB();
        const tableName = this.prototype.getTableName();
        const query = `UPDATE ${tableName} SET realised = $1, "idRealisateur" = $2 WHERE id = $3 RETURNING *`;
        try {
            const result = await client.query(query, [real, realisateurId, taskId]);
            return await this.prototype.objectToClass(result.rows[0]);
        } catch (e) {
            console.error("Authentication error:", e);
            throw e;
        } finally {
            client.release();
        }
    }
}