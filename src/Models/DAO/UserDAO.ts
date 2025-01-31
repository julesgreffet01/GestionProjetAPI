import {GlobalDAO} from "./GlobalDAO";
import {User} from "../BO/User";
import {UserProject} from "../BO/UserProject";
import connectDB from "../../Config/dbConfig";
import {UserProjectDAO} from "./UserProjectDAO";

export class UserDAO extends GlobalDAO{
    getTableName(): string {
        return "Users";
    }
    objectToClass(row: object): User {
       return new User(
           //@ts-ignore
           row.id,
           //@ts-ignore
           row.log,
           //@ts-ignore
           row.mdp,
           //@ts-ignore
           row.del
       )
    }

    async findComplet(id: number): Promise<object | null> {
        const client = await connectDB();

        try {
            const user = await UserDAO.find(id);
            if (!user) return null;

            //all projets
            let allProj: UserProject[] = await UserProjectDAO.getAllByUser(id);
            const newAllProj = allProj.map(({ idUser, ...rest }) => rest);
            //@ts-ignore
            user.allProjects = newAllProj;

            //all Tasks
            //TODO a finir

            return user;
        } catch (e) {
            console.error(e);
            throw e;
        } finally {
            client.release();
        }
    }


}