import {User} from "../User.js";
export class Project {
    private _id: number;
    private _nom: string;
    private _desc: string;
    private _del: boolean;
    private _creator: User | null | object;


    constructor(id: number, nom: string, desc: string, del: boolean, creator: User | null | object) {
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

    get creator(): User | null | object {
        return this._creator;
    }

    set creator(value: User | null | object) {
        this._creator = value;
    }

    toBDD(): object {
        //@ts-ignore
        const idCrea = this.creator ? this.creator.id : null;
        return {
            nom: this.nom,
            description: this.desc,
            idCreateur: idCrea
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

