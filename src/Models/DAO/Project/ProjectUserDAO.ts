import {ProjectUser} from "../../BO/Project/ProjectUser.js";
import connectDB from "../../../Config/dbConfig.js";

export class ProjectUserDAO {

    static async getAllByUser(userId: number): Promise<ProjectUser[]> {
        const client = await connectDB();
        const query = `SELECT * FROM ProjectUser WHERE idUser = $1 AND del = FALSE`;

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

    static async delete(id: number): Promise<number | null> {
        const client = await connectDB();
        const query = `DELETE FROM ProjectUser WHERE id = ${id}`;

        try {
            const result = await client.query(query);
            if (result.rows.length === 0) {
                return null;
            }
            return result.rowCount;
        } catch (error) {
            console.error("Database error:", error);
            throw error;
        } finally {
            if (client) client.release();
        }
    }

    static async create(projectUser: ProjectUser): Promise<ProjectUser | null> {
        const client = await connectDB();
        const query = `INSERT INTO ProjectUser ('idUser', 'idProject', 'idRole') VALUES ($1, $2, $3)RETURNING *;`;
        const values = [projectUser.idUser, projectUser.idProj, projectUser.idRole];

        try {
            const result = await client.query(query, values);

            if (result.rows.length === 0) {
                return null;
            }
            const tabFinal = result.rows.map(row => new ProjectUser(
                row.idUser,
                row.idProj,
                row.idRole,
                row.del
            ));

            return tabFinal[0];
        } catch (error) {
            console.error("Database error:", error);
            throw error;
        } finally {
            if (client) client.release();
        }
    }
}