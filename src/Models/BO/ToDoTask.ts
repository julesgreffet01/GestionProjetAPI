import {User} from "./User";
import {ToDo} from "./ToDo";

export class ToDoTask {
    private _id: number;
    private _lib: string;
    private _ordre: number;
    private _enCours: boolean;
    private _realised: boolean;
    private _dateReal: Date;
    private _realisateur: User;
    private _ToDo: ToDo;

    constructor(id: number, lib: string, ordre: number, enCours: boolean, realised: boolean, dateReal: Date, realisateur: User, ToDo: ToDo) {
        this._id = id;
        this._lib = lib;
        this._ordre = ordre;
        this._enCours = enCours;
        this._realised = realised;
        this._dateReal = dateReal;
        this._realisateur = realisateur;
        this._ToDo = ToDo;
    }


    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }

    get lib(): string {
        return this._lib;
    }

    set lib(value: string) {
        this._lib = value;
    }

    get ordre(): number {
        return this._ordre;
    }

    set ordre(value: number) {
        this._ordre = value;
    }

    get enCours(): boolean {
        return this._enCours;
    }

    set enCours(value: boolean) {
        this._enCours = value;
    }

    get realised(): boolean {
        return this._realised;
    }

    set realised(value: boolean) {
        this._realised = value;
    }

    get dateReal(): Date {
        return this._dateReal;
    }

    set dateReal(value: Date) {
        this._dateReal = value;
    }

    get realisateur(): User {
        return this._realisateur;
    }

    set realisateur(value: User) {
        this._realisateur = value;
    }

    get ToDo(): ToDo {
        return this._ToDo;
    }

    set ToDo(value: ToDo) {
        this._ToDo = value;
    }

    toBDD(): object {
        return {
            lib: this.lib,
            ordre: this.ordre,
            enCours: this.enCours,
            realised: this.realised,
            dateReal: this.dateReal,
            idRealisateur: this.realisateur.id,
            idTodo: this.ToDo.id
        }
    }

    toJson(): object {
        return {
            id: this.id,
            lib: this.lib,
            ordre: this.ordre,
            enCours: this.enCours,
            realised: this.realised,
            realisateur: this.realisateur,
            dateReal: this.dateReal,
            ToDo: this.ToDo
        }
    }
}