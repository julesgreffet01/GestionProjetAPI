import {GlobalDAO} from "../GlobalDAO.js";
import {Trello} from "../../BO/Trello/Trello.js";
import {ProjectDAO} from "../Project/ProjectDAO.js";

export class TrelloDAO extends GlobalDAO{
    getTableName(): string {
        return "Trello";
    }
    async objectToClass(row: any): Promise<Trello> {
        const projet = await  ProjectDAO.find(row.id);
        return new Trello(
            row.id,
            row.nom,
            row.del,
            projet
        )
    }

}