import {GlobalDAO} from "./GlobalDAO";
import {Project} from "../BO/Project";
import {UserDAO} from "./UserDAO";

export class ProjectDAO extends GlobalDAO{
    getTableName(): string {
        return "Project";
    }
    objectToClass(row: object): Project {
        //@ts-ignore
        const creator: Promise<object | null> = UserDAO.find(row.id);
        return new Project(
            //@ts-ignore
            row.id,
            //@ts-ignore
            row.nom,
            //@ts-ignore
            row.description,
            //@ts-ignore
            row.del,
            //@ts-ignore
            creator
        )
    }

}