import {Admin} from "../BO/Admin.js";
import connectDB from "../../Config/dbConfig.js";
import bcrypt = require("bcrypt");

export class AdminDAO {
    getTableName(): string {
        return "Admin";
    }

    async objectToClass(row: any): Promise<Admin> {
        return new Admin(
            row.id,
            row.log,
            row.mdp
        );
    }

    async authentification(log: string, mdp: string): Promise<Admin | null> {
        const client = await connectDB();
        try {
            const tableName = this.getTableName();

            const query = `SELECT * FROM ${tableName} WHERE log = $1 LIMIT 1`;
            const result = await client.query(query, [log]);

            if (result.rows.length === 0) {
                return null;
            }
            const user = result.rows[0];
            const isMatch = await bcrypt.compare(mdp, user.mdp);
            if (!isMatch) {
                throw new Error("Password not match!");
            }
            return this.objectToClass(user);
        } catch (e) {
            console.error("Authentication error:", e);
            throw e;
        } finally {
            client.release();
        }
    }

}