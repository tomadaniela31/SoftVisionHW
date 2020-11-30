import { Book } from './book.js';
//tema1
var book = {
    title: "IT",
    author: "Stephen King",
    noPages: 456,
    existInEnglish: true
}
var name = "hsbjs";
console.log(book);

function deterNume(name) {
    console.log("Buna, numele meu este " + name);
}

//tema2

var phrase = ["Love", "I", "Javascript"];
function modifyPhrase(phrase) {
    phrase.shift(); //["I", "Javascript"]
    phrase.pop();//["I"]
    phrase.push("Love");//["I", "Love"]
    phrase.push("JavaScript");//["I","Love","Javascript"]
    console.log(phrase); //afisare in consola
}
modifyPhrase(phrase);

var array1 = ["Paul", 1, false, { name: "Jon Snow" }, [1, 2, 3], null, undefined, function () { console.log('Test') }]

/*function typeOfElements(array1) {
    for (var i = 0; i < array1.length; i++)

        console.log(i + ' ' + array1[i] + ' ' + typeof array1[i] + '\n');
}
typeOfElements(array1);

*/
array1.forEach(function (item, index) {
    console.log(index + ' ' + item + ' ' + typeof item + '\n');
})

const myBook = new Book(1, "iT", "Stephan King", 600, 1);
const myBook2 = new Book(1, "it", "Stephan King", 200, 0);
myBook.existaInRomana();//verifica daca cartea exista in limba romana 
myBook.modificaTitlu();//modifica titlul cartii
myBook.afisareCarte();//afiseaza cartea cu toate specificatiile ei
myBook2.afisareCarte();



const canvas = document.getElementById("ecran");
/**@type {CanvasRenderingContext2D} */
const context = canvas.getContext('2d');
const btn = document.querySelector('button');
function random(number) {
    return Math.floor(Math.random() * (number + 1));
}//functia calculeaza un numar random 

btn.onclick = function () {
    var x = random(50);
    var y = random(50);
    context.fillStyle = "blue";
    context.fillRect(x, y, 50, 50);
}// eveniment : la apasarea butonului va aparea un patrat albastru cu dimensiunile 50x50 la coordonate random din canvas

const mario = new Image();
mario.src = './mario2.png';
let marioX = 0;
let marioY = 0;
const marioWidth = 50;
const marioHeight = 70;
mario.onload = () => {
    context.drawImage(mario, 0 * marioWidth, 0 * marioHeight, marioWidth, marioHeight, 0, 0, marioWidth, marioHeight)
}
document.addEventListener("keydown", function (event) {
    context.clearRect(0, 0, 600, 600);

    switch (event.key) {
        case 'w': {
            if (marioY >= 0)
                marioY -= 10;
            break;
        }
        case 's': {
            if (marioY <= 600)
                marioY += 10;
            break;
        }
        case 'a': {
            if (marioX >= 0)
                marioX -= 10;
            break;
        }
        case 'd': {
            if (marioX <= 600)
                marioX += 10;
            break;
        }
    }
    context.drawImage(mario, 0 * marioWidth, 0 * marioHeight, marioWidth, marioHeight, marioX, marioY, marioWidth, marioHeight);

});