export class ToDoTaskUser {
    private _idUser: number;
    private _idTask: number;
    private _del: boolean;

    constructor(idUser: number, idTask: number, del: boolean) {
        this._idUser = idUser;
        this._idTask = idTask;
        this._del = del;
    }

    get idUser(): number {
        return this._idUser;
    }

    set idUser(value: number) {
        this._idUser = value;
    }

    get idTask(): number {
        return this._idTask;
    }

    set idTask(value: number) {
        this._idTask = value;
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
            idTask: this.idTask,
            del: this.del
        }
    }
}