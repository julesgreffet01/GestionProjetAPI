import {GlobalDAO} from "../GlobalDAO.js";
import {Project} from "../../BO/Project/Project.js";
import {UserDAO} from "../UserDAO.js";
import connectDB from "../../../Config/dbConfig";

export class ProjectDAO extends GlobalDAO{
    getTableName(): string {
        return `"Projects"`;
    }
    async objectToClass(row: any): Promise<Project> {
        const idCrea = parseInt(row.idCreateur);

        const creator = idCrea ? await UserDAO.find(idCrea) : null;
        return new Project(
            row.id,
            row.nom,
            row.description,
            row.del,
            creator
        );
    }

    static async getProjectByTask(taskId: number) {
        const client = await connectDB();
        const query = `SELECT p.* FROM "Projects" p JOIN "ToDo" t ON p.id = t."idProject" JOIN "ToDoTasks" tt ON t.id = tt."idTodo" 
            WHERE tt.id = $1 LIMIT 1 `;
        try {
            const result = await client.query(query, [taskId]);
            return result.rows.length > 0 ? this.prototype.objectToClass(result.rows[0]) : null;

        } catch (error) {
            console.error("Erreur lors de la récupération du projet :", error);
            throw error;
        } finally {
            client.release();
        }
    }

    static async getProjectByCard(cardId: number) {
        const client = await connectDB();
        const query = `SELECT p.* FROM "Projects" p JOIN "Trello" t ON p.id = t."idProj" JOIN "TrelloLists" tl ON t.id = tl."idTrello"
            JOIN "TrelloCards" tc ON tl.id = tc."idList" WHERE tc.id = $1 LIMIT 1;`;
        try {
            const result = await client.query(query, [cardId]);
            return result.rows.length > 0 ? this.prototype.objectToClass(result.rows[0]) : null;
        } catch (error) {
            console.error("Erreur lors de la récupération du projet :", error);
            throw error;
        } finally {
            client.release();
        }
    }

    static async getAllByUser(userId: number) {
        const client = await connectDB();
        const query = `SELECT p.* FROM "Projects" p INNER JOIN "ProjectUser" pu on p.id = pu."idProject" WHERE pu."idUser" = $1 AND pu.del = FALSE AND p.del = FALSE`
        try {
            const result = await client.query(query, [userId]);
            return result.rows.length > 0 ? await Promise.all(result.rows.map(async(row)  => await this.prototype.objectToClass(row))) : [];
        } catch (error) {
            console.error("Erreur lors de la récupération du projet :", error);
            throw error;
        } finally {
            client.release();
        }
    }

    static async getAllDelByCreateur(userId: number) {
        const client = await connectDB();
        const query = `SELECT * FROM "Projects"  WHERE "idCreateur" = $1 del = TRUE`
        try {
            const result = await client.query(query, [userId]);
            return result.rows.length > 0 ? await Promise.all(result.rows.map(async(row)  => await this.prototype.objectToClass(row))) : [];
        } catch (error) {
            console.error("Erreur lors de la récupération du projet :", error);
            throw error;
        } finally {
            client.release();
        }
    }
}