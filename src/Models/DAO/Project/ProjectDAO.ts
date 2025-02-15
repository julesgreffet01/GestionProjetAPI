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
        const query = `SELECT * FROM "Projects" p JOIN "ToDo" t ON p.id = t."idProject" JOIN "ToDoTasks" tt ON t.id = tt."idTodo" 
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

}