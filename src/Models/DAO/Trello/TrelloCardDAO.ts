import {GlobalDAO} from "../GlobalDAO.js";
import {TrelloCard} from "../../BO/Trello/TrelloCard.js";
import {TrelloListDAO} from "./TrelloListDAO.js";
import {TrelloCardUserDAO} from "./TrelloCardUserDAO.js";

export class TrelloCardDAO extends GlobalDAO {
    getTableName(): string {
        return `"TrelloCards"`;
    }
    async objectToClass(row: any): Promise<TrelloCard> {
        const list: Promise<object | null> = TrelloListDAO.find(row.idList);
        return new TrelloCard(
           row.id,
           row.nom,
           row.description,
           row.dateReal,
           row.position,
           row.realised,
           list
       )
    }

    static async getAllCardsByUser(userId: number): Promise<TrelloCard[]> {
        const idArray: number[] = await TrelloCardUserDAO.getAllCardByUser(userId);
        const trelloCardDAO = new TrelloCardDAO();

        const rawCards = await Promise.all(
            idArray.map(id => TrelloCardDAO.find(id))
        );

        const validRawCards = rawCards.filter(card => card !== null);

        return await Promise.all(validRawCards.map(async (row) => {
            return await trelloCardDAO.objectToClass(row);
        }));
    }


}