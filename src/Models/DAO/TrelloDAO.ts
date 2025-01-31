import {GlobalDAO} from "./GlobalDAO";
import {Trello} from "../BO/Trello";
import {ProjectDAO} from "./ProjectDAO";

export class TrelloDAO extends GlobalDAO{
    getTableName(): string {
        return "Trello";
    }
    objectToClass(row: object): Trello {
        //@ts-ignore
        const projet: Promise<object | null> = ProjectDAO.find(row.id);
        return new Trello(
            //@ts-ignore
            row.id,
            //@ts-ignore
            row.nom,
            //@ts-ignore
            row.del,
            //@ts-ignore
            projet
        )
    }

}