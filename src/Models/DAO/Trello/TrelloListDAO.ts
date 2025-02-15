import {GlobalDAO} from "../GlobalDAO.js";
import {TrelloList} from "../../BO/Trello/TrelloList.js";
import {TrelloDAO} from "./TrelloDAO.js";
import connectDB from "../../../Config/dbConfig";

export class TrelloListDAO extends GlobalDAO{
    getTableName(): string {
        return `"TrelloLists"`;
    }
    async objectToClass(row: any): Promise<TrelloList> {
        const trello= await TrelloDAO.find(row.id);
        return new TrelloList(
            row.id,
            row.nom,
            row.position,
            row.del,
            trello
        )
    }

    static async getAllByPositionAndTrello(trelloId: number): Promise<TrelloList[]> {
        const client  = await connectDB();
        const tableName = this.prototype.getTableName();
        const query = `SELECT * FROM ${tableName} WHERE "idTrello" = $1 AND del = FALSE ORDER BY position ASC`;
        try {
            const result = await client.query(query, [trelloId]);
            return await Promise.all(result.rows.map(row => this.prototype.objectToClass(row)));
        } catch (e) {
            console.error(e);
            throw e;
        } finally {
            client.release();
        }
    }

    static async updatePosition(positions: object){
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
        } catch (error) {
            console.error("Erreur lors de la mise à jour des positions :", error);
            throw error;
        } finally {
            if (client) client.release();
        }
    }
}