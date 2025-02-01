import {User} from "../User";
import {ToDo} from "./ToDo";

export class ToDoTask {
    private _id: number;
    private _lib: string;
    private _ordre: number;
    private _enCours: boolean;
    private _realised: boolean;
    private _dateReal: Date;
    private _realisateur: User | null | object;
    private _ToDo: ToDo | null | object;

    constructor(id: number, lib: string, ordre: number, enCours: boolean, realised: boolean, dateReal: Date, realisateur: User | null | object, ToDo: ToDo | null | object) {
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

    get realisateur(): User | null | object {
        return this._realisateur;
    }

    set realisateur(value: User | null | object) {
        this._realisateur = value;
    }

    get ToDo(): ToDo | null | object {
        return this._ToDo;
    }

    set ToDo(value: ToDo | null | object) {
        this._ToDo = value;
    }

    toBDD(): object {
        //@ts-ignore
        const idReal = this.realisateur ? this.realisateur.id : null;
        //@ts-ignore
        const idToDo = this.ToDo ? this.ToDo.id : null;
        return {
            lib: this.lib,
            ordre: this.ordre,
            enCours: this.enCours,
            realised: this.realised,
            dateReal: this.dateReal,
            idRealisateur: idReal,
            idTodo: idToDo
        };
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