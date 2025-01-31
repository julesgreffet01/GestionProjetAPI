import {Card} from "./Card";
import {User} from "./User";

export class CardUser {
    private _idUser: number;
    private _idCard: number;
    private _del: boolean;

    constructor(idUser: number, idCard: number, del: boolean) {
        this._idUser = idUser;
        this._idCard = idCard;
        this._del = del;
    }

    get idUser(): number {
        return this._idUser;
    }

    set idUser(value: number) {
        this._idUser = value;
    }

    get idCard(): number {
        return this._idCard;
    }

    set idCard(value: number) {
        this._idCard = value;
    }

    get del(): boolean {
        return this._del;
    }

    set del(value: boolean) {
        this._del = value;
    }

    toJson(): object {
        return {
            idUser: this.idUser,
            idCard: this.idCard,
            del: this.del
        }
    }
}