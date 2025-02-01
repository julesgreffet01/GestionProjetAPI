import {Project} from "../Project/Project";

export class Trello {
    private _id: number;
    private _nom: string;
    private _del: boolean;
    private _projet: Project | null | object;

    constructor(id: number, nom: string, del: boolean, projet: Project | null | object) {
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

    get projet(): Project | null | object {
        return this._projet;
    }

    set projet(value: Project | null | object) {
        this._projet = value;
    }

    toBDD(): object {
        //@ts-ignore
        const idProj = this._projet ? this._projet.id : null;
        return {
            nom: this._nom,
            idProj: idProj
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