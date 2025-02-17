import {ProjectUser} from "../../BO/Project/ProjectUser.js";
import connectDB from "../../../Config/dbConfig.js";

export class ProjectUserDAO {

    static async getAllByUser(userId: number): Promise<ProjectUser[]> {
        const client = await connectDB();
        const query = `SELECT * FROM "ProjectUser" WHERE "idUser" = $1 AND del = FALSE`;

        try {
            const result = await client.query(query, [userId]);

            if (result.rows.length === 0) {
                return [];
            }

            return result.rows.map(row => new ProjectUser(
                row.idUser,
                row.idProject,
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

    static async getAllByProject(projId: number): Promise<ProjectUser[]> {
        const client = await connectDB();
        const query = `SELECT * FROM "ProjectUser" WHERE "idProject" = $1 AND del = FALSE`;

        try {
            const result = await client.query(query, [projId]);
            if (result.rows.length === 0) {
                return [];
            }

            return result.rows.map(row => new ProjectUser(
                row.idUser,
                row.idProject,
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

    static async find(userId: number, projId: number): Promise<ProjectUser | null> { // Retourne un seul objet ou null
        const client = await connectDB();
        const query = `SELECT * FROM "ProjectUser" WHERE "idUser" = ? AND "idProject" = ? AND del = FALSE`;

        try {
            const result = await client.query(query, [userId, projId]);

            if (!result.rows || result.rows.length === 0) {
                return null;
            }

            const row = result.rows[0];
            return new ProjectUser(
                row.idUser,
                row.idProj,
                row.idRole,
                row.del
            );

        } catch (e) {
            console.error("Database error:", e);
            throw e;
        } finally {
            if (client) client.release();
        }
    }


    static async delete(idUser: number, idProj: number): Promise<number | null> {
        const client = await connectDB();
        const query = `DELETE FROM "ProjectUser" WHERE "idUser" = ${idUser} AND "idProject" = ${idProj}`;

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
        const query = `INSERT INTO "ProjectUser" ("idUser", "idProject", "idRole") VALUES ($1, $2, $3)RETURNING *;`;
        const values = [projectUser.idUser, projectUser.idProj, projectUser.idRole];

        try {
            const result = await client.query(query, values);

            if (result.rows.length === 0) {
                return null;
            }
            const tabFinal = result.rows.map(row => new ProjectUser(
                row.idUser,
                row.idProject,
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

    static async update(projectUser: ProjectUser): Promise<number | null> {
        const client = await connectDB();
        const query = `UPDATE "ProjectUser" SET "idRole" = $1 WHERE "idUser" = $2 AND "idProject" = $3`;
        try {
            const result = await client.query(query, [projectUser.idRole, projectUser.idUser, projectUser.idProj]);
            return result.rowCount;
        } catch (error) {
            console.error("Database error:", error);
            throw error;
        } finally {
            if (client) client.release();
        }
    }
}