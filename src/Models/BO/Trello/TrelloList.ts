import {Trello} from './Trello.js';

export class TrelloList {
    private _id: number;
    private _nom: string;
    private _position: number| null;
    private _del: boolean;
    private _Trello: Trello | null | object;

    constructor(id: number, nom: string, position: number| null, del: boolean, Trello: Trello | null | object) {
        this._id = id;
        this._nom = nom;
        this._position = position;
        this._del = del;
        this._Trello = Trello;
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

    get position(): number| null {
        return this._position;
    }

    set position(value: number| null) {
        this._position = value;
    }

    get del(): boolean {
        return this._del;
    }

    set del(value: boolean) {
        this._del = value;
    }

    get Trello(): Trello | null | object {
        return this._Trello;
    }

    set Trello(value: Trello | null | object) {
        this._Trello = value;
    }

    toBDD(): object {
        //@ts-ignore
        const idTrello = this.Trello ? this.Trello.id : null;
        return {
            nom: this.nom,
            position: this.position,
            idTrello: idTrello
        }
    }

    toJson(): object {
        return {
            id: this.id,
            nom: this.nom,
            del: this.del,
            position: this.position,
            Trello: this.Trello
        }
    }
}