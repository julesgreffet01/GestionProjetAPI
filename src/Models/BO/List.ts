import {Trello} from './Trello';

export class List {
    private _id: number;
    private _nom: string;
    private _position: number;
    private _del: boolean;
    private _Trello: Trello;

    constructor(id: number, nom: string, position: number, del: boolean, Trello: Trello) {
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

    get position(): number {
        return this._position;
    }

    set position(value: number) {
        this._position = value;
    }

    get del(): boolean {
        return this._del;
    }

    set del(value: boolean) {
        this._del = value;
    }

    get Trello(): Trello {
        return this._Trello;
    }

    set Trello(value: Trello) {
        this._Trello = value;
    }

    toBDD(): object {
        return {
            nom: this.nom,
            position: this.position,
            idTrello: this.Trello.id
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