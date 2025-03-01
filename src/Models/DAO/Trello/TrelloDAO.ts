import {GlobalDAO} from "../GlobalDAO.js";
import {Trello} from "../../BO/Trello/Trello.js";
import {ProjectDAO} from "../Project/ProjectDAO.js";
import connectDB from "../../../Config/dbConfig";

export class TrelloDAO extends GlobalDAO{
    getTableName(): string {
        return `"Trello"`;
    }
    async objectToClass(row: any): Promise<Trello> {
        const projet = await  ProjectDAO.find(row.idProj);
        return new Trello(
            row.id,
            row.nom,
            row.del,
            projet
        )
    }

    static async getAllByProject(projectId: number) {
        const client = await connectDB();
        const tableName = this.prototype.getTableName();
        const query = `SELECT * FROM ${tableName} WHERE "idProj" = $1 AND del = FALSE;`;
        try {
            const result = await client.query(query, [projectId]);
            return await Promise.all(result.rows.map((row)=> this.prototype.objectToClass(row)));
        } catch (e) {
            console.error("Authentication error:", e);
            throw e;
        } finally {
            client.release();
        }
    }

    static async getAllDelByProject(projectId: number) {
        const client = await connectDB();
        const tableName = this.prototype.getTableName();
        const query = `SELECT * FROM ${tableName} WHERE "idProj" = $1 AND del = TRUE;`;
        try {
            const result = await client.query(query, [projectId]);
            return await Promise.all(result.rows.map((row)=> this.prototype.objectToClass(row)));
        } catch (e) {
            console.error("Authentication error:", e);
            throw e;
        } finally {
            client.release();
        }
    }
}