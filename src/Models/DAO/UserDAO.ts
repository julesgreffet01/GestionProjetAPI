import {GlobalDAO} from "./GlobalDAO";
import {User} from "../BO/User";
import {ProjectUser} from "../BO/Project/ProjectUser";
import connectDB from "../../Config/dbConfig";
import {ProjectUserDAO} from "./Project/ProjectUserDAO";
import bcrypt = require("bcrypt");
import {TrelloCardDAO} from "./Trello/TrelloCardDAO";
import {TrelloCard} from "../BO/Trello/TrelloCard";

export class UserDAO extends GlobalDAO{
    getTableName(): string {
        return "Users";
    }
    async objectToClass(row: any): Promise<User> {
       return new User(
           row.id,
           row.log,
           row.mdp,
           row.del
       )
    }

    async findComplet(id: number): Promise<object | null> {
        const client = await connectDB();

        try {
            const user = await UserDAO.find(id);
            if (!user) return null;

            //all projets
            let allProj: ProjectUser[] = await ProjectUserDAO.getAllByUser(id);
            const newAllProj = allProj.map(({ idUser, ...rest }) => rest);
            //@ts-ignore
            user.allProjects = newAllProj;

            //all Tasks
            //TODO a finir

            //all cards
            let allCards: TrelloCard[] = await TrelloCardDAO.getAllCardsByUser(id);
            //@ts-ignore
            user.allCards = allCards;



            return user;
        } catch (e) {
            console.error(e);
            throw e;
        } finally {
            client.release();
        }
    }

    async authentification(log: string, mdp: string): Promise<User | null> {
        const client = await connectDB();
        try {
            const tableName = this.getTableName();

            const query = `SELECT * FROM ${tableName} WHERE log = $1 LIMIT 1`;
            const result = await client.query(query, [log]);

            if (result.rows.length === 0) {
                return null;
            }
            const user = result.rows[0];
            const isMatch = await bcrypt.compare(mdp, user.mdp);
            if (!isMatch) {
                throw new Error("Password not match!");
            }
            return this.objectToClass(user);
        } catch (e) {
            console.error("Authentication error:", e);
            throw e;
        } finally {
            client.release();
        }
    }


}