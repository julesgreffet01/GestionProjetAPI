import {GlobalDAO} from "../GlobalDAO";
import {TrelloList} from "../../BO/Trello/TrelloList";
import {TrelloDAO} from "./TrelloDAO";

export class TrelloListDAO extends GlobalDAO{
    getTableName(): string {
        return "Lists";
    }
    async objectToClass(row: any): Promise<TrelloList> {
        const trello= await TrelloDAO.find(row.id);
        return new TrelloList(
            row.id,
            row.nom,
            row.position,
            row.del,
            trello
        )
    }



}