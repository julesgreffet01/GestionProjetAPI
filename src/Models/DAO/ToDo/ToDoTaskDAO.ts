import {GlobalDAO} from "../GlobalDAO.js";
import {ToDoTask} from "../../BO/ToDo/ToDoTask.js";
import {UserDAO} from "../UserDAO.js";
import {ToDoDAO} from "./ToDoDAO.js";
import {ToDoTaskUserDAO} from "./ToDoTaskUserDAO.js";
import connectDB from "../../../Config/dbConfig";


export class ToDoTaskDAO extends GlobalDAO {
    getTableName(): string {
        return `"ToDoTasks"`;
    }
    async objectToClass(row: any): Promise<ToDoTask> {
        const Realisateur = row.idRealisateur ? await UserDAO.find(row.idRealisateur) : null;
        const ToDo = await ToDoDAO.find(row.idTodo);

        return new ToDoTask(
            row.id,
            row.lib,
            row.ordre,
            row.enCours,
            row.realised,
            row.dateReal,
            Realisateur,
            ToDo
        )
    }

    static async getIdTasksByUser(userId: number): Promise<ToDoTask[]> {
        const idArray = await ToDoTaskUserDAO.getIdTaskByUser(userId);
        const toDoTaskDAO = new ToDoTaskDAO();

        // Récupération des tâches brutes
        const rawTasks = await Promise.all(idArray.map(id => ToDoTaskDAO.find(id)));

        // Filtrage des tâches valides (exclure les valeurs null)
        const validTasks = rawTasks.filter(task => task !== null);

        // Retourner des instances valides de ToDoTask
        return validTasks.map((row: any) =>
            new ToDoTask(
                row.id,
                row.lib,
                row.ordre,
                row.enCours,
                row.realised,
                row.dateReal,
                row.realisateur,
                row.ToDo
            )
        );
    }


    static async getAllByOrderByTodo(toDoId: number){
        const client = await connectDB();
        try {
            const toDoTaskDAO = new ToDoTaskDAO();
            const tableName = this.prototype.getTableName();
            const query = `SELECT * FROM ${tableName} WHERE del = FALSE AND "idTodo" = $1 ORDER BY ordre ASC`;
            const result = await client.query(query, [toDoId]);
            return await Promise.all(result.rows.map(async (row) => {
                return await toDoTaskDAO.objectToClass(row);
            }));
        }catch (error) {
            console.error("Erreur lors getAll par ordre :", error);
            throw error;
        } finally {
            if (client) client.release();
        }
    }


    static async updateOrder(orderMapping: any) {
        const client = await connectDB();
        try {
            const tableName = this.prototype.getTableName();

            let rows = [];
            for (const [id, ordre] of Object.entries(orderMapping)) {
                const query = `UPDATE ${tableName} SET ordre = $1 WHERE id = $2 `;
                const result = await client.query(query, [ordre, id]);
                rows.push(result.rowCount);
            }
            return rows;
        } catch (error) {
            console.error("Erreur lors de la mise à jour des ordres :", error);
            throw error;
        } finally {
            if (client) client.release();
        }
    }


    static async realiser(taskId: number, real: boolean, idRealisateur: number | null = null) {
        const client = await connectDB();
        try {
            const toDoTaskDAO = new ToDoTaskDAO();
            const tableName = this.prototype.getTableName();
            const query = `UPDATE ${tableName} SET realised = $1, "idRealisateur" = $2 WHERE id = $2`;
            const result = await client.query(query, [real, taskId, idRealisateur]);
            return  await toDoTaskDAO.objectToClass(result.rows[0]);
        } catch (error) {
            console.error("Erreur lors du realised :", error);
            throw error;
        } finally {
            if (client) client.release();
        }
    }

    static async enCours(userId: number, bool: boolean): Promise<ToDoTask> {
        const client = await connectDB();
        try {
            const toDoTaskDAO = new ToDoTaskDAO();
            const tableName = this.prototype.getTableName();
            const query = `UPDATE ${tableName} SET "enCours" = $1 WHERE id = $2`;
            const result = await client.query(query, [bool, userId]);
            return  await toDoTaskDAO.objectToClass(result.rows[0]);
        }catch (error) {
            console.error("Erreur lors du enCours :", error);
            throw error;
        } finally {
            if (client) client.release();
        }
    }
}