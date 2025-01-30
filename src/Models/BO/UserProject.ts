export class UserProject {
    private _idUser: number;
    private _idProj: number;
    private _idRole: number;
    private _del: boolean;

    constructor(idUser: number, idProj: number, idRole: number, del: boolean) {
        this._idUser = idUser;
        this._idProj = idProj;
        this._idRole = idRole;
        this._del = del;
    }


    get idUser(): number {
        return this._idUser;
    }

    set idUser(value: number) {
        this._idUser = value;
    }

    get idProj(): number {
        return this._idProj;
    }

    set idProj(value: number) {
        this._idProj = value;
    }

    get idRole(): number {
        return this._idRole;
    }

    set idRole(value: number) {
        this._idRole = value;
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
            idProj: this.idProj,
            idRole: this.idRole,
            del: this.del
        }
    }
}