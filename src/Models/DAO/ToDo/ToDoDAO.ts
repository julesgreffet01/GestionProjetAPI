import {GlobalDAO} from "../GlobalDAO";
import {ToDo} from "../../BO/ToDo/ToDo";
import {ProjectDAO} from "../Project/ProjectDAO";

export class ToDoDAO extends GlobalDAO {
    getTableName(): string {
       return "ToDo";
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