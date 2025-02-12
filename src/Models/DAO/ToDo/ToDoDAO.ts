import {GlobalDAO} from "../GlobalDAO.js";
import {ToDo} from "../../BO/ToDo/ToDo.js";
import {ProjectDAO} from "../Project/ProjectDAO.js";

export class ToDoDAO extends GlobalDAO {
    getTableName(): string {
       return `"ToDo"`;
    }
    async objectToClass(row: any): Promise<ToDo> {
        const projet = await ProjectDAO.find(row.id);
        return new ToDo(
            row.id,
            row.nom,
            row.del,
            projet
        )
    }

}