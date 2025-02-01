import {GlobalDAO} from "../GlobalDAO.js";
import {ToDoTask} from "../../BO/ToDo/ToDoTask.js";
import {UserDAO} from "../UserDAO.js";
import {ToDoDAO} from "./ToDoDAO.js";
import {ToDoTaskUserDAO} from "./ToDoTaskUserDAO.js";


export class ToDoTaskDAO extends GlobalDAO {
    getTableName(): string {
        return "ToDoTasks";
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

    static async getAllTasksByUser(userId: number): Promise<ToDoTask[]> {
        const idArray = await ToDoTaskUserDAO.getAllCardByUser(userId);
        const toDoTaskDAO = new ToDoTaskDAO();

        const rawTasks= await Promise.all(idArray.map(id => ToDoTaskDAO.find(id)))

        const validTasks = rawTasks.filter(task => task !== null);

        return await Promise.all(validTasks.map(async (row) => {
            return await toDoTaskDAO.objectToClass(row);
        }));
    }

}