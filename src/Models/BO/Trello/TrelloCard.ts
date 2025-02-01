import {TrelloList} from "./TrelloList";

export class TrelloCard {
    private _id: number;
    private _nom: string;
    private _description: string;
    private _dateReal: Date;
    private _position: number;
    private _realised: boolean;
    private _list: TrelloList | null | object;

    constructor(id: number, nom: string, description: string, dateReal: Date, position: number, realised: boolean, list: TrelloList | null | object) {
        this._id = id;
        this._nom = nom;
        this._description = description;
        this._dateReal = dateReal;
        this._position = position;
        this._realised = realised;
        this._list = list;
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

    get description(): string {
        return this._description;
    }

    set description(value: string) {
        this._description = value;
    }

    get dateReal(): Date {
        return this._dateReal;
    }

    set dateReal(value: Date) {
        this._dateReal = value;
    }

    get position(): number {
        return this._position;
    }

    set position(value: number) {
        this._position = value;
    }

    get realised(): boolean {
        return this._realised;
    }

    set realised(value: boolean) {
        this._realised = value;
    }

    get list(): TrelloList | null | object {
        return this._list;
    }

    set list(value: TrelloList | null | object) {
        this._list = value;
    }

    toBDD(): object {
        //@ts-ignore
        const idList = this.list ? this.list.id : null;
        return {
            nom: this.nom,
            description: this.description,
            dateReal: this.dateReal,
            realised: this.realised,
            idList: idList
        }
    }

    toJson(): object {
        return {
            id: this.id,
            nom: this.nom,
            description: this.description,
            position: this.position,
            dateReal: this.dateReal,
            realised: this.realised,
            list: this.list
        }
    }
}