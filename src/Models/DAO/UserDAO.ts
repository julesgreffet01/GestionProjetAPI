import {GlobalDAO} from "./GlobalDAO.js";
import {User} from "../BO/User.js";
import {ProjectUser} from "../BO/Project/ProjectUser.js";
import connectDB from "../../Config/dbConfig.js";
import {ProjectUserDAO} from "./Project/ProjectUserDAO.js";
import bcrypt = require("bcrypt");
import {TrelloCardDAO} from "./Trello/TrelloCardDAO.js";
import {TrelloCard} from "../BO/Trello/TrelloCard.js";
import {ToDoTaskDAO} from "./ToDo/ToDoTaskDAO";

export class UserDAO extends GlobalDAO{
    getTableName(): string {
        return `"Users"`;
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
            if (user instanceof User) {
                //all projets
                let allProj: ProjectUser[] = await ProjectUserDAO.getAllByUser(id);
                const newAllProj = allProj.map(({ idUser, ...rest }) => rest);
                user.allProjects = newAllProj;

                //all Tasks
                let allTask = await ToDoTaskDAO.getAllTasksByUser(id);
                user.allTasks = allTask;

                //all cards
                let allCards: TrelloCard[] = await TrelloCardDAO.getAllCardsByUser(id);
                user.allCards = allCards;
            }

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

    static async logUnique(log: string): Promise<boolean> {
        const client = await connectDB();
        try {
            const result = await client.query('SELECT 1 FROM users WHERE log = $1 LIMIT 1', [log]);

            return result.rows.length !== 0;

        } catch (e) {
            console.error(e);
            throw e;
        } finally {
            if (client) client.release();
        }
    }

}