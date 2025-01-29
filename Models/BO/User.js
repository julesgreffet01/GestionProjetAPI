import {del} from "express/lib/application";

class User {
    #id;
    #log;
    #mdp;
    #del;
    constructor(id, log, del, mdp){
        this.#id = id;
        this.#log = log;
        this.#mdp = mdp;
        this.#del = del;
    }


    get del() {
        return this.#del;
    }

    set del(value) {
        this.#del = value;
    }

    get id() {
        return this.#id;
    }

    set id(value) {
        this.#id = value;
    }

    get log() {
        return this.#log;
    }

    set log(value) {
        this.#log = value;
    }

    get mdp() {
        return this.#mdp;
    }

    set mdp(value) {
        this.#mdp = value;
    }

    toArray() {
        return [this.#id, this.#log, this.#del, this.#mdp];
    }

    toJson(){
        return {
            id: this.#id,
            log: this.#log,
            del: this.#del,
            mdp: this.#mdp
        }
    }
}