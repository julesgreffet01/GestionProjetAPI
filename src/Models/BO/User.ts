export class User {
    private _id: number;
    private _log: string;
    private _mdp: string;
    private _del: boolean;
    private _allTasks: object[];
    private _allCards: object[];
    private _allProjects: object[];


    constructor(id: number, log: string, mdp: string, del: boolean) {
        this._id = id;
        this._log = log;
        this._mdp = mdp;
        this._del = del;
        this._allTasks = [];
        this._allCards = [];
        this._allProjects = [];
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

    get del(): boolean {
        return this._del;
    }

    set del(value: boolean) {
        this._del = value;
    }

    get allTasks(): object[] {
        return this._allTasks;
    }

    set allTasks(value: object[]) {
        this._allTasks = value;
    }

    get allCards(): object[] {
        return this._allCards;
    }

    set allCards(value: object[]) {
        this._allCards = value;
    }

    get allProjects(): object[] {
        return this._allProjects;
    }

    set allProjects(value: object[]) {
        this._allProjects = value;
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
            mdp: this.mdp,
            del: this.del,
            allTasks: this.allTasks,
            allCards: this.allCards,
            allProjects: this.allProjects
        }
    }
}