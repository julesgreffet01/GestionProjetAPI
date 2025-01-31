import {GlobalDAO} from "./GlobalDAO";
import {Card} from "../BO/Card";
import {ListDAO} from "./ListDAO";

export class CardDAO extends GlobalDAO {
    getTableName(): string {
        return "Cards";
    }
    objectToClass(row: object): Card {
        // @ts-ignore
        const list: Promise<object | null> = ListDAO.find(row.idList);
        return new Card(
           // @ts-ignore
           row.id,
           // @ts-ignore
           row.nom,
           // @ts-ignore
           row.description,
           // @ts-ignore
           row.dateReal,
           // @ts-ignore
           row.position,
           // @ts-ignore
           row.realised,
           // @ts-ignore
           list
       )
    }

}