import {ProjectUser} from "../../BO/Project/ProjectUser.js";
import connectDB from "../../../Config/dbConfig.js";

export class ProjectUserDAO {

    static async getAllByUser(userId: number): Promise<ProjectUser[]> {
        const client = await connectDB();
        const query = `SELECT * FROM UserProject WHERE idUser = $1 AND del = FALSE`;

        try {
            const result = await client.query(query, [userId]);

            if (result.rows.length === 0) {
                return [];
            }

            return result.rows.map(row => new ProjectUser(
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