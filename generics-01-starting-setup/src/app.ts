/*
//제네릭 타입 generics type : 다른 타입과 연결된 타입, 그 타입이 무엇인지에 대해 아주 유연함
const names: Array<string> = [];
// 배열 안에 문자열이 들어가도록 타입 지정. 배열 타입에 제공되는 데이터의 타입을 구체적으로 명시한 것이다.
names[0]; // 문자열이 들어갈 것을 알고 있기 때문에 문자열 관련 메서드가 추천됨

const promise: Promise<string> = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("This is done");
  }, 2000);
});

promise.then((data) => {
  console.log(data); // data가 문자열을 반환한다는 것을 타입 스크립트가 알고 있기 때문에 문자열 메서드 추천됨
});
 */

function merge<T extends object, U extends object>(objA: T, objB: U): T & U {
  return Object.assign(objA, objB);
}
// 제네릭 제약 조건을 설정하지 않으면 자바스크립트는 Object.assign 메소드의 인수가 객체인지 아닌지 신경쓰지 않기 때문에 객체가 아닌 인수를 넣어도 오류가 발생하지 않는다.
console.log(merge({ name: "Max" }, { age: 42 }));

const mergedObj = merge({ name: "Max", hobbies: ["Sports"] }, { age: 30 });

console.log(mergedObj);

/* const mergedObj = merge({ name: "Max" }, { age: 42 }) as {
  name: string;
  age: number;
}; */

// 형 변환으로 어떤 키를 가지고 있는지 타입스크립트로 하여금 알게 할 수 있지만 번거롭다
interface Lengthy {
  length: number;
}

function countAndDescribe<T extends Lengthy>(element: T): [T, string] {
  let descriptionText = "Got no Value";
  if (element.length === 1) {
    descriptionText = "Got 1 element.";
  } else if (element.length > 1) {
    descriptionText = "Got " + element.length + " elements.";
  }
  return [element, descriptionText];
}

console.log(countAndDescribe(["Sport", "Cooking"]));

function extractAndConvert<T extends object, U extends keyof T>(
  obj: T,
  key: U
) {
  return "Value" + obj[key];
}
extractAndConvert({ name: "Max" }, "name");

class DataStorage<T extends string | number | boolean> {
  private data: T[] = [];
  addItem(item: T) {
    this.data.push(item);
  }
  removeItem(item: T) {
    this.data.splice(this.data.indexOf(item), 1);
  }
  getItem() {
    return [...this.data];
  }
}

const textStorage = new DataStorage<string>();
textStorage.addItem("Max");
textStorage.addItem("Manu");
textStorage.removeItem("Max");
console.log(textStorage.getItem());

const numberStorage = new DataStorage<number>();
numberStorage.addItem(1);
numberStorage.addItem(2);
numberStorage.removeItem(1);
console.log(numberStorage.getItem());

/* const objStorage = new DataStorage<object>();
const maxObj = { name: "Max" };
objStorage.addItem(maxObj);
objStorage.addItem({ name: "Manu" });
objStorage.removeItem(maxObj);
console.log(objStorage.getItem()); */
// 객체는 참조 타입이기 때문에 변수에 할당하지 않고 새롭게 작성하면 새로운 값만 같은 새로운 객체가 된다.
// 따라서 변수에 할당하여 indexOf가 정상작동하도록 한다

interface CourseGoal {
  title: string;
  description: string;
  completeUntil: Date;
}

// Partial 내장 타입 : 모든 속성을 옵션(있어도 되고 없어도 되는)으로 바꾸어준다.

function createCourseGoal(
  title: string,
  description: string,
  date: Date
): CourseGoal {
  let courseGoal: Partial<CourseGoal> = {};
  // 현재 Partial 내장타입이 CourseGoal 인터페이스의 속성들의 유무가 상관없게 만들었다 그래서 빈 객체를 할당 해놓아도 괜찮다.
  courseGoal.title = title;
  courseGoal.description = description;
  courseGoal.completeUntil = date;
  return courseGoal as CourseGoal; //형변환
  // return { title: title, description: description, completeUntil: date };
}

//Readonly 내장 타입 : 읽기 전용 타입으로 만들어 push나 pop으로 추가,제거하려고 하면 오류를 발생시킨다.
const names: Readonly<string[]> = ["Max", "Anna"];
// names.push("Manu");
// names.pop("Anna");
