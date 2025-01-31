import {GlobalDAO} from "./GlobalDAO";
import {Admin} from "../BO/Admin";
import connectDB from "../../Config/dbConfig";
import bcrypt = require("bcrypt");

export class AdminDAO extends GlobalDAO{
    getTableName(): string {
        return "Admin";
    }

    objectToClass(row: object): Admin {
        return new Admin(
            // @ts-ignore
            row["id"],
            // @ts-ignore
            row["log"],
            // @ts-ignore
            row["mdp"]
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
                return null;
            }
            return this.objectToClass(user);
        } catch (e) {
            console.error("Authentication error:", e);
            return null;
        } finally {
            client.release();
        }
    }

}