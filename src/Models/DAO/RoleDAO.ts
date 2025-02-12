import {GlobalDAO} from "./GlobalDAO";
import {Role} from "../BO/Role";

export class RoleDAO extends GlobalDAO {
    getTableName(): string {
       return `"Roles"`;
    }
    async objectToClass(row: any): Promise<Role> {
        return new Role(
            row.id,
            row.nom,
            row.del
        )
    }

}