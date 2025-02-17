import {GlobalDAO} from "../GlobalDAO.js";
import {ToDo} from "../../BO/ToDo/ToDo.js";
import {ProjectDAO} from "../Project/ProjectDAO.js";
import connectDB from "../../../Config/dbConfig";

export class ToDoDAO extends GlobalDAO {
    getTableName(): string {
       return `"ToDo"`;
    }
    async objectToClass(row: any): Promise<ToDo> {
        const projet = await ProjectDAO.find(row.idProject);
        return new ToDo(
            row.id,
            row.nom,
            row.del,
            projet
        )
    }

    static async getAllByProject(projectId: number) {
        const client = await connectDB();
        const tableName = this.prototype.getTableName();
        const query = `SELECT * FROM ${tableName} WHERE "idProject" = ${projectId} AND del = FALSE`;
        try {
            const result = await client.query(query);
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
        const query = `SELECT * FROM ${tableName} WHERE "idProject" = ${projectId} AND del = TRUE`;
        try {
            const result = await client.query(query);
            return await Promise.all(result.rows.map((row)=> this.prototype.objectToClass(row)));
        } catch (e) {
            console.error("Authentication error:", e);
            throw e;
        } finally {
            client.release();
        }
    }

}