import {del} from "express/lib/application";

class Project {
    #id;
    #nom;
    #desc;
    #del;
    #idCrea;

    constructor(id, nom, desc, del, idCrea) {
        this.#id = id;
        this.#nom = nom;
        this.#desc = desc;
        this.#del = del;
        this.#idCrea = idCrea;
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

    get nom() {
        return this.#nom;
    }

    set nom(value) {
        this.#nom = value;
    }

    get desc() {
        return this.#desc;
    }

    set desc(value) {
        this.#desc = value;
    }

    get idCrea() {
        return this.#idCrea;
    }

    set idCrea(value) {
        this.#idCrea = value;
    }

    toArray() {
        return [this.#id, this.#nom, this.#desc,  this.#del, this.#idCrea];
    }

    toJson(){
        return {
            id: this.#id,
            nom: this.#nom,
            desc: this.#desc,
            del: this.#del,
            idCrea: this.#idCrea
        }
    }
}