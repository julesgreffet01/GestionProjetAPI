import {GlobalDAO} from "../GlobalDAO";
import {Project} from "../../BO/Project/Project";
import {UserDAO} from "../UserDAO";

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