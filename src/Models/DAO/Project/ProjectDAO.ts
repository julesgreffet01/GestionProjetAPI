import {GlobalDAO} from "../GlobalDAO.js";
import {Project} from "../../BO/Project/Project.js";
import {UserDAO} from "../UserDAO.js";

export class ProjectDAO extends GlobalDAO{
    getTableName(): string {
        return "Project";
    }
    async objectToClass(row: any): Promise<Project> {
        const creator = await UserDAO.find(row.id);
        return new Project(
            row.id,
            row.nom,
            row.description,
            row.del,
            creator
        );
    }
}