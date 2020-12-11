import Person from "./Person.js"
import Employee from "./Employee.js"
var person1 = new Person("Toma Daniela", "235656465631", "Baia Mare", "Cluj-Napoca");
var employee1 = new Employee("Petrus Rubinia", "2566556363", "CLuj-Napoca", "Cluj Napoca", "cluj");
var employee2 = new Employee("Toma Daniela", "235656465631", "Baia Mare", "Cluj-Napoca", "Bucuresti");
//console.log(person1.getFullInformation());
console.log(employee1.getAdress());
console.log(employee1.getJAdress());
console.log(employee1.getJobAdress());
//console.log(person1.changeJobAdress());
console.log(employee2.getAdress());
console.log(employee2.getJAdress());
console.log(employee2.getJobAdress());


//exercitiul 4

var arr = [1, -2, 6, -7, 10, 9, 14, true, false, null, undefined];
var isEven = (num) => typeof num === 'number';
var numberArray = arr.filter(isEven);
console.log(numberArray);

var multiplication = (num) => num = num * 10;
var multiplicationArray = numberArray.map(multiplication);
console.log(multiplicationArray);

var result = multiplicationArray.reduce((sum, val) => val + sum, 0);
console.log(result);

