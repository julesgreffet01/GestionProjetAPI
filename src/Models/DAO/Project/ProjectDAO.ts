import {GlobalDAO} from "../GlobalDAO.js";
import {Project} from "../../BO/Project/Project.js";
import {UserDAO} from "../UserDAO.js";

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
}