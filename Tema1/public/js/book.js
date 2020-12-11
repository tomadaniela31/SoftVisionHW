export class Book {
    constructor(ISBN, title, author, numberOfPages, existInRo) {
        this.ISBN = ISBN;
        this.title = title;
        this.author = author;
        this.numberOfPages = numberOfPages;
        this.existInRo = existInRo;
    }
    existaInRomana() {
        if (this.existInRo == 1)
            console.log(this.title + " " + "exista in limba romana. ");
    }
    modificaTitlu() {
        console.log(this.title.toUpperCase());
    }

    afisareCarte() {
        console.log("Titlul este:" + this.title + '\n' + "Autorul este:" + this.author + '\n' + "Numar de pagini:" + this.numberOfPages + '\n');
        if (this.existInRo == 0)
            console.log("Aceasta carte nu exista in limba romana.")
        else
            console.log("Aceasta carte exista in limba romana. ");
    }
}