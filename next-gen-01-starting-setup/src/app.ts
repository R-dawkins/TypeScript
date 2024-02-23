const userName = "Max";
// userName = "Maximilian";
let age = 30;
age = 29;

/* function add(a: number, b: number) {
  let result;
  result = a + b;
  return result;
} */

/* if (age > 20) {
  let isOld = true;
}
console.log(isOld);
 */

/* const add = (a: number, b: number = 1) => a + b;

console.log(add(2, 5));

const printOutput: (a: string | number) => void = (output) =>
  console.log(output);

const button = document.querySelector("button");
if (button) {
  button.addEventListener("click", (event) => console.log(event));
}

printOutput(add(5));
 */
const hobbies = ["Sports", "Cooking"];
const activeHobbies = ["Hiking"];

activeHobbies.push(...hobbies);
console.log(activeHobbies);

const person = {
  firstName: "Max",
  old: 30,
};
const copiedPerson = { ...person };
console.log(copiedPerson);

const add = (...numbers: number[]) => {
  return numbers.reduce((curResult, curValue) => {
    return curResult + curValue;
  }, 0);
};
// rest 매개변수 (...매개변수명 : 타입) 인수를 무제한으로 허용하는데 유용한 기능
const addedNumbers = add(5, 10, 2);
console.log(addedNumbers);

const [hobby1, ...remain] = hobbies;
console.log(remain);

const { firstName: user, old } = person;
console.log(user, old);
