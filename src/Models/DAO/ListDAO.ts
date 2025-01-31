import {GlobalDAO} from "./GlobalDAO";
import {List} from "../BO/List";
import {TrelloDAO} from "./TrelloDAO";

export class ListDAO extends GlobalDAO{
    getTableName(): string {
        return "Lists";
    }
    objectToClass(row: object): List {
        //@ts-ignore
        const trello: Promise<object | null> = TrelloDAO.find(row.id);
        return new List(
            //@ts-ignore
            row.id,
            //@ts-ignore
            row.nom,
            //@ts-ignore
            row.position,
            //@ts-ignore
            row.del,
            //@ts-ignore
            trello
        )
    }



}