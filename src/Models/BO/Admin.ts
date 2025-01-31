export class Admin {
    private _id: number;
    private _log: string;
    private _mdp: string;

    constructor(id: number, log: string, mdp: string) {
        this._id = id;
        this._log = log;
        this._mdp = mdp;
    }

    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }

    get log(): string {
        return this._log;
    }

    set log(value: string) {
        this._log = value;
    }

    get mdp(): string {
        return this._mdp;
    }

    set mdp(value: string) {
        this._mdp = value;
    }

    toBDD(): object {
        return {
            log: this.log,
            mdp: this.mdp
        }
    }

    toJson(): object {
        return {
            id: this.id,
            log: this.log,
            mdp: this.mdp
        }
    }
}