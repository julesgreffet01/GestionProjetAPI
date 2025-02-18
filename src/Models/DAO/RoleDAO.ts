import {GlobalDAO} from "./GlobalDAO";
import {Role} from "../BO/Role";
import connectDB from "../../Config/dbConfig";

export class RoleDAO extends GlobalDAO {
    getTableName(): string {
       return `"Roles"`;
    }
    async objectToClass(row: any): Promise<Role> {
        return new Role(
            row.id,
            row.nom,
            row.del
        )
    }

    static async getAll(): Promise<Role[]> {
        const client = await connectDB()
        const tableName = this.prototype.getTableName()
        const query = `SELECT * FROM ${tableName} WHERE del = FALSE`;
        try {
            const { rows } = await client.query(query);
            return Promise.all(rows.map(async (row) => await this.prototype.objectToClass(row)));
        } catch (error) {
            console.error("Error fetching all data:", error);
            throw error;
        } finally {
            if(client) client.release();
        }
    }

}