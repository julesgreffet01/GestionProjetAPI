import {Project} from "./Project";

export class Trello {
    private _id: number;
    private _nom: string;
    private _del: boolean;
    private _projet: Project;

    constructor(id: number, nom: string, del: boolean, projet: Project) {
        this._id = id;
        this._nom = nom;
        this._del = del;
        this._projet = projet;
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

    get del(): boolean {
        return this._del;
    }

    set del(value: boolean) {
        this._del = value;
    }

    get projet(): Project {
        return this._projet;
    }

    set projet(value: Project) {
        this._projet = value;
    }

    toBDD(): object {
        return {
            nom: this._nom,
            idProj: this._projet.id
        }
    }

    toJson(): object {
        return {
            id: this._id,
            nom: this._nom,
            del: this._del,
            projet: this._projet
        }
    }
}