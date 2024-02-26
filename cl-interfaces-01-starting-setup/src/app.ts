// interface : 객체의 구조를 정의, 객체가 어떻게 구성되어야 할 지 정의
// 구조는 정의할 수 있으나 값은 할당 불가
interface Addfn {
  (a: number, b: number): number; //익명 함수를 작성한 것
} // interface로 함수 타입 정의
// type Addfn = (a: number, b: number) => number;
let add: Addfn;

add = (n1: number, n2: number) => {
  return n1 + n2;
};

interface Named {
  readonly name?: string;
  outputName?: string;
}

interface Greetable extends Named {
  greet(phrase: string): void;
}

class Person implements Greetable {
  name?: string;
  age = 30;
  constructor(n?: string) {
    if (n) {
      this.name = n;
    }
  }
  greet(phrase: string) {
    if (this.name) {
      console.log(phrase + " " + this.name);
    } else {
      console.log("Hi!");
    }
  }
}

let user1: Greetable;

// user1 = new Person("Max");
user1 = new Person();

user1.greet("Hi there - I am");

// user1.name = "Manu"; interface에서 readonly 접근제한자 사용 시 클래스에 readonly 접근제한자 사용한 것과 같이 작동

console.log(user1);
