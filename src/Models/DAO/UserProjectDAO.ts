import {UserProject} from "../BO/UserProject";
import connectDB from "../../Config/dbConfig";

export class UserProjectDAO {

    static async getAllByUser(userId: number): Promise<UserProject[]> {
        const client = await connectDB();
        const query = `SELECT * FROM UserProject WHERE idUser = $1`;

        try {
            const result = await client.query(query, [userId]);

            if (result.rows.length === 0) {
                return []; // Toujours retourner un tableau, même vide
            }

            return result.rows.map(row => new UserProject(
                row.idUser,
                row.idProj,
                row.idRole,
                row.del
            ));
        } catch (error) {
            console.error("Database error:", error);
            throw error;
        } finally {
            if (client) client.release();
        }
    }


}