import {GlobalDAO} from "../GlobalDAO";
import {Trello} from "../../BO/Trello/Trello";
import {ProjectDAO} from "../Project/ProjectDAO";

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