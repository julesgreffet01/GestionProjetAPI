import {GlobalDAO} from "../GlobalDAO.js";
import {ToDoTask} from "../../BO/ToDo/ToDoTask.js";
import {UserDAO} from "../UserDAO.js";
import {ToDoDAO} from "./ToDoDAO.js";
import {ToDoTaskUserDAO} from "./ToDoTaskUserDAO.js";
import connectDB from "../../../Config/dbConfig";
import {ToDo} from "../../BO/ToDo/ToDo";


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
            ToDo,
            row.del
        )
    }

    static async getAllTasksByUser(userId: number): Promise<ToDoTask[]> {
        const idArray = await ToDoTaskUserDAO.getAllTaskByUser(userId);
        const toDoTaskDAO = new ToDoTaskDAO();

        const rawTasks= await Promise.all(idArray.map(id => ToDoTaskDAO.find(id)))

        const validTasks = rawTasks.filter(task => task !== null);

        return await Promise.all(validTasks.map(async (row) => {
            return await toDoTaskDAO.objectToClass(row);
        }));
    }

    static async updateOrder(orderMapping: any): Promise<void> {
        const client = await connectDB();
        try {
            const tableName = this.prototype.getTableName();

            for (const [id, ordre] of Object.entries(orderMapping)) {
                const query = `UPDATE ${tableName} SET ordre = $1 WHERE id = $2 `;
                await client.query(query, [ordre, id]);
            }

        } catch (error) {
            console.error("Erreur lors de la mise à jour des ordres :", error);
            throw error;
        } finally {
            if (client) client.release();
        }
    }

    static async getAllByOrderByToDo(toDoId: number){
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

    static async realiser(taskId: number, rea: boolean) {
        const client = await connectDB();
        try {
            const toDoTaskDAO = new ToDoTaskDAO();
            const tableName = this.prototype.getTableName();
            const query = `UPDATE ${tableName} SET realised = $1 WHERE id = $2`;
            const result = await client.query(query, [rea, taskId]);
            return  await toDoTaskDAO.objectToClass(result.rows[0]);
        } catch (error) {
            console.error("Erreur lors du realised :", error);
            throw error;
        } finally {
            if (client) client.release();
        }
    }

    static async enCours(userId: number, bool: boolean): Promise<any[]> {
        const client = await connectDB();
        try {
            const tableName = this.prototype.getTableName();
            const query = `UPDATE ${tableName} SET "enCours" = $1 WHERE id = $2`;
            const result = await client.query(query, [bool, userId]);
            return result.rows;
        }catch (error) {
            console.error("Erreur lors du enCours :", error);
            throw error;
        } finally {
            if (client) client.release();
        }
    }
}