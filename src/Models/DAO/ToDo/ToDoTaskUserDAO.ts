import connectDB from "../../../Config/dbConfig.js";
import {ToDoTaskUser} from "../../BO/ToDo/ToDoTaskUser";

export class ToDoTaskUserDAO {

    static async getIdTaskByUser(userId: number): Promise<number[]> {
        const client = await connectDB();
        const query = `SELECT "idTask" FROM "ToDoTasksUsers" WHERE "idUser" = $1 AND del = FALSE`;

        try {
            const result = await client.query(query, [userId]);
            if (result.rows.length === 0) {
                return [];
            }

            return result.rows.map((row: any) => row.idTask);
        } catch (error) {
            console.error("Database error:", error);
            throw error;
        } finally {
            if (client) client.release();
        }
    }
    static async getAllByTask(idTask: number): Promise<ToDoTaskUser[]> {
        const client = await connectDB();
        const query = `SELECT * FROM "ToDoTasksUsers" WHERE "idTask" = $1 AND del = FALSE`;
        try {
            const result = await client.query(query, [idTask]);
            if (result.rows.length === 0) {
                return [];
            }

            return result.rows.map((row: any) => new ToDoTaskUser(
                row.idUser,
                row.idTask,
                row.del,
            ));
        } catch (error) {
            console.error("Database error:", error);
            throw error;
        } finally {
            if (client) client.release();
        }
    }
    static async create(taskUser: ToDoTaskUser) {
        const client = await connectDB();
        const query = `INSERT INTO "ToDoTasksUsers" ("idUser", "idTask") VALUES ($1, $2)`;
        try {
            const result = await client.query(query, [taskUser.idUser, taskUser.idTask]);
            return result.rowCount;
        } catch (error) {
            console.error("Database error:", error);
            throw error;
        } finally {
            if (client) client.release();
        }
    }

    static async delete(taskUser: ToDoTaskUser){
        const client = await connectDB();
        const query = `DELETE FROM "ToDoTasksUsers" WHERE "idUser" = $1 AND "idTask" = $2`;
        try {
            const result = await client.query(query, [taskUser.idUser, taskUser.idTask]);
            return result.rowCount;
        } catch (error) {
            console.error("Database error:", error);
            throw error;
        } finally {
            if (client) client.release();
        }
    }
}