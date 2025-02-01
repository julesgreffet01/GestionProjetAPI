import {Project} from "../Project/Project.js";

export class ToDo {
    private _id: number;
    private _nom: string;
    private _del: boolean;
    private _project: Project | null | object;

    constructor(id: number, nom: string, del: boolean, project: Project | null | object) {
        this._id = id;
        this._nom = nom;
        this._del = del;
        this._project = project;
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

    get project(): Project | null | object {
        return this._project;
    }

    set project(value: Project | null | object) {
        this._project = value;
    }

    toBDD(): object {
        //@ts-ignore
        const idProj = this.project ? this.project.id : null;
        return {
            nom: this.nom,
            idProject: idProj,
        }
    }

    toJson(): object {
        return {
            id: this.id,
            nom: this.nom,
            del: this.del,
            project: this.project
        }
    }
}