export default class Person {
    constructor(name, cnp, adress, jAdress) {
        this.name = name;
        this.cnp = cnp;
        this.adress = adress;
        this.jAdress = jAdress;

    }

    getFullInformation() {
        return this.getName() + " " + this.getCnp() + " " + this.getAdress() + " " + this.getJAdress();
    }
    getAdress() {
        return this.adress;
    }
    getName() {
        return this.name;
    }
    getCnp() {
        return this.cnp;
    }
    getJAdress() {
        return this.jAdress;
    }
    changeJobAdress() {
        return this.adress + " " + this.getJAdress();
    }

    getJAdress() {
        return this.jAdress;
    }


}