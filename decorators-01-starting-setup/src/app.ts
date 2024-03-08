// decorators : 만든 클래스나 클래스의 메서드가 올바로 사용되었는지 확인하는 작업이나 내부적인 변환 작업을 수행하는 것에 사용되는 함수
// 내가 만드는 페이지와 같은 외적인 부분에 영향을 주는 것이 아니라 개발하는 영역에서 도움을 주는 모듈이다.
// 데코레이터는 개발자가 클래스와 같은 것에 추가해 사용하는 도구이다.
// @ 특수 식별자 : 타입스크립트가 보고 인식할 수 있다. @함수의 형식으로 함수를 지정(실행X)하면 그 함수가 데코레이터가 된다.
// 데코레이터는 constructor (생성자)를 인수로 받는다.
// 데코레이터는 클래스가 인스턴스화 될 때가 아니라 정의될 때 실행된다.
// 데코레이터는 1개 이상 가능하다. 2개 이상일 때는 아래에 적혀진 데코레이터가 먼저 실행된다. (상향식)
// 그러나 데코레이터 팩토리는 일반적인 자바스크립트 함수처럼 위의 것이 먼저 실행된다. (하향식)
// 클래스 데코레이터, 메서드 데코레이터, 접근자 데코레이터는 값을 반환할 시 타입스크립트가 그 값을 사용한다
// 프로퍼티 데코레이터, 매개변수 데코레이터는 값을 반환할 수는 있지만 타입스크립트가 값을 무시한다.
// 메서드 데코레이터와 접근자 데코레이터는 새로운 설명자(descriptor) 객체를 반환할 수 있다 (인수로 받았던 그 설명자)
// 데코레이터 함수는 일반적으로 대문자로 시작하지만 굳이 그러지 않아도 상관없다.
//ts class validator 라이브러리를 활용하면 이 수업에서 만든 것 보다 정교한 유효성 검사기를 사용할 수 있다.

/* function Logger(constructor: Function) {
  console.log("Logging...");
  console.log(constructor);
}

@Logger
class Person {
  name = "Max";
  
  constructor() {
    console.log("Creating person object...");
  }
}

const pers = new Person();
console.log(pers);
 */

// 데코레이터 팩토리 : 데코레이터 함수를 반환하는데, 이를 데코레이터로 추가할 때 원하는 값을 설정할 수 있다.
// (자신이 원하는 값을 인수로 넣어서 데코레이터 함수에서 사용할 수 있다는 말인듯)
// 외부 함수를 실행해 내부 함수를 반환하여야 하기 때문에 @함수()의 형식으로 실행한다.
function Logger(logString: string) {
  console.log("Logger Factory");
  return function (constructor: Function) {
    console.log(logString);
    console.log(constructor);
  };
}

// angular와 WithTemplate 데코레이터 함수는 유사한 점이 있다. 템플릿과 렌더링 할 위치를 정한다는 점에서.
function WithTemplate(template: string, hookId: string) {
  console.log("Template Factory");
  return function <T extends { new (...args: any[]): { name: string } }>(
    originalConstructor: T /* _: Function */
  ) {
    // _ 특수 식별자 : 인자가 필요한 걸 알지만 사용하지 않을 것

    return class extends originalConstructor {
      // class 데코레이터 : 기존 클래스를 상속받아 새로운 로직을 추가하고 클래스를 반환할 수 있다.
      // 기존 데코레이터 함수처럼 클래스가 정의 될 때가 아니라 인스턴스 화 될 때 실행된다.
      constructor(..._: any[]) {
        super(); //기존 Person 클래스의 동작 보존
        console.log("Rendering template"); //
        const hookEl = document.getElementById(hookId);
        if (hookEl) {
          hookEl.innerHTML = template;
          hookEl.querySelector("h1")!.textContent = this.name;
        }
      }
    };
  };
}

// @Logger("LOGGING - PERSON")
@Logger("LOGGING")
@WithTemplate("<h1>My Person Object</h1>", "app")
class Person {
  name = "Max";

  constructor() {
    console.log("Creating person object...");
  }
}

const pers = new Person();
console.log(pers);

// ---
function Log(target: any, propertyName: string | Symbol) {
  //프로퍼티 데코레이터
  //클래스 데코레이터와 다르게 반환한 값을 타입스크립트가 무시
  console.log("Property decorator");
  console.log(target, propertyName);
}

function Log2(target: any, name: string, descriptor: PropertyDescriptor) {
  //접근자 데코레이터
  //클래스 데코레이터와 마찬가지로 반환한 값을 타입스크립트가 사용
  console.log("Accessor decorator!");
  console.log(target);
  console.log(name);
  console.log(descriptor);
}

function Log3( //메소드 데코레이터
  //클래스 데코레이터와 마찬가지로 반환한 값을 타입스크립트가 사용

  target: any,
  name: string | Symbol,
  descriptor: PropertyDescriptor
) {
  console.log("Method decorator!");
  console.log(target);
  console.log(name);
  console.log(descriptor);
}

function Log4(target: any, name: string | Symbol, position: number) {
  // 매개변수 데코레이터
  // 클래스 데코레이터와 다르게 값을 반환할 수는 있지만 타입스크립트가 무시
  console.log("Parameter decorator!");
  console.log(target);
  console.log(name); //매개변수를 사용하는 메소드 이름
  console.log(position); //매개변수의 위치값 번호 index
}

class Product {
  @Log //property decorator
  title: string;
  private _price: number;

  @Log2 //accessor decorator
  set price(val: number) {
    if (val > 0) {
      this.price = val;
    } else {
      throw new Error("Invalid price - should be positive!");
    }
  }

  constructor(t: string, p: number) {
    this.title = t;
    this._price = p;
  }

  @Log3 //method decorator
  getPriceWithTax(@Log4 tax: number) {
    // Log4 = parameter decorator
    return this._price * (1 + tax);
  }
}

const p1 = new Product("Book", 19);
const p2 = new Product("Book 2", 29);

function Autobind(
  _target: any,
  _methodName: string,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value;
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    enumerable: false,
    get() {
      const boundFn = originalMethod.bind(this); //여기서 this는 get메소드를 실행시킨 대상을 가르키게 된다. 게터 메소드는 항상 자신이 속한 실제 객체에 의해 실행된다.
      // 따라서 get 내부의 this는 언제나 get을 정의한 객체를 가리키게 된다. 이 값은 addEventListener에 의해 바뀌지 않는다.
      return boundFn;
    },
  };
  return adjDescriptor; //설명자 객체가 반환되면 기존 설명자 객체가 덮어씌워진다.
}

class Printer {
  message = "This works!";

  @Autobind
  showMessage() {
    console.log(this.message);
  }
}

const p = new Printer();
const button = document.querySelector("button")!;
button.addEventListener("click", p.showMessage);
// 이벤트리스너에서 p.showMessage가 호출되는 경우에는 this가 이벤트의 대상을 가르킨다.
// addEventListener가 this에 이 함수를 실행한 이벤트 대상을 바인딩 한다. 이를 해결하려면 일반적으로 bind()를 사용하여 p에 this를 바인드한다.
// button.addEventListener("click", p.showMessage.bind(p));

// ---

interface ValidatorConfig {
  [property: string]: {
    [validatableProp: string]: string[]; //['required','positive'] 유효성 검사기 이름이 목록 형태로 추가
  };
}

const registerValidators: ValidatorConfig = {};

function Required(target: any, propName: string) {
  // 프로퍼티 데코레이터
  registerValidators[target.constructor.name] = {
    ...registerValidators[target.constructor.name],
    [propName]: [
      ...(registerValidators[target.constructor.name]?.[propName] ?? []),
      "require",
    ],
  };
}

function PositiveNumber(target: any, propName: string) {
  // 프로퍼티 데코레이터
  registerValidators[target.constructor.name] = {
    ...registerValidators[target.constructor.name],
    [propName]: [
      ...(registerValidators[target.constructor.name]?.[propName] ?? []),
      "positive",
    ],
  };
}

function validate(obj: any) {
  const objValidatorConfig = registerValidators[obj.constructor.name];
  if (!objValidatorConfig) {
    return true;
  }
  let isValid = true;
  for (const prop in objValidatorConfig) {
    for (const validator of objValidatorConfig[prop]) {
      switch (validator) {
        case "require":
          isValid = isValid && !!obj[prop];
          break;
        case "positive":
          isValid = isValid && obj[prop] > 0;
          break;
      }
    }
  }
  return isValid;
}

class Course {
  @Required
  title: string;
  @PositiveNumber
  price: number;
  constructor(t: string, p: number) {
    this.title = t;
    this.price = p;
  }
}

const courseForm = document.querySelector("form")!;
courseForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const titleEl = document.getElementById("title") as HTMLInputElement;
  const priceEl = document.getElementById("price") as HTMLInputElement;

  const title = titleEl.value;
  const price = +priceEl.value; // +는 자료형을 숫자로 변환하는 것

  const createCourse = new Course(title, price);

  if (!validate(createCourse)) {
    alert("Invalid input, please try again!");
    return;
  }
  console.log(createCourse);
});
