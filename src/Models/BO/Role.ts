export class Role {
    private _id: number;
    private _nom: string;
    private _del: boolean;


    constructor(id: number, nom: string, del: boolean) {
        this._id = id;
        this._nom = nom;
        this._del = del;
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

    toBDD(): object {
        return {
            nom: this.nom
        }
    }

    toJson(): object {
        return {
            id: this.id,
            nom: this.nom,
            del: this.del
        }
    }
}