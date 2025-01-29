import {User} from "./User";
export class Projet {
    private _id: number;
    private _nom: string;
    private _desc: string;
    private _del: boolean;
    private _creator: User;


    constructor(id: number, nom: string, desc: string, del: boolean, creator: User) {
        this._id = id;
        this._nom = nom;
        this._desc = desc;
        this._del = del;
        this._creator = creator;
    }


    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }

    get nom(): string {
        return this._nom;
    }

    set nom(value: string) {
        this._nom = value;
    }

    get desc(): string {
        return this._desc;
    }

    set desc(value: string) {
        this._desc = value;
    }

    get del(): boolean {
        return this._del;
    }

    set del(value: boolean) {
        this._del = value;
    }

    get creator(): User {
        return this._creator;
    }

    set creator(value: User) {
        this._creator = value;
    }

    toBDD(): object {
        return {
            nom: this.nom,
            description: this.desc,
            idCreateur: this.creator.id
        }
    }

    toJson(): object {
        return {
            id: this.id,
            nom: this.nom,
            desc: this.desc,
            del: this.del,
            creator: this.creator
        }
    }
}

