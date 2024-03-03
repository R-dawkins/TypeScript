type Admin = {
  name: string;
  privileges: string[];
};

type Employee = {
  name: string;
  startDate: Date;
};

// interface ElevatedEmployee extends Admin,Employee {}

type ElevatedEmployee = Admin & Employee;

const e1: ElevatedEmployee = {
  name: "Max",
  privileges: ["create-server"],
  startDate: new Date(),
};

type Combinable = string | number;
type Numeric = number | boolean;
type Universal = Combinable & Numeric;

//함수 오버로드 : 함수 정보와 함수 선언부를 조합하여 타입스크립트가 함수의 반환 타입을 명확히 알게 하는 방법
// 타입스크립트가 넘겨지는 인자 타입 조합에 따라 어떤 타입을 함수가 반환하는지를 명확히 알게 된다.

function add(a: number, b: number): number; // 함수 정보
function add(a: string, b: string): string; // 함수 정보
function add(a: Combinable, b: Combinable) {
  // 함수 선언부
  if (typeof a === "string" || typeof b === "string") {
    // >>> typeof를 사용한 타입 가드
    return a.toString() + b.toString();
  }
  return a + b;
}

const result = add("pinot", " Blanc");
result.split(" ");

//optinal chaining (선택적 체이닝) : 어떤 시점에 특정 데이터가 아직 없는, 들어오지 못한 상태일 때 사용
// 선택적 체이닝 연산자 : .(점, dot)앞에 물음표 ?를 붙여서 사용 :
const fetchedUserData = {
  id: "u1",
  name: "max",
  job: { title: "CEO", description: "My own company" },
};

console.log(fetchedUserData?.job?.title);

// 일반 자바스크립트 선택적 체이닝 방법 : console.log(fetchedUserData.job && fetchedUserData.job.title);

// Null 병합 : 받아온 데이터가 null인지 어떤 값인지 모를 때 처리하는 방법
// Null 병합 연산자 ?? : 값이 Null이거나 undefind일 때만 폴백(대비책) 값 사용

const userInput = "";

const storedData = userInput || "DEFAULT"; // 첫번째 값이 falsy한 값일 때 두번쨰 값 참조, 이 방법의 문제점은 null이 아니라 빈 문자열 또한 처리된다는 것
const storedData2 = userInput ?? "DEFAULT"; // null 병합 연산자 사용
console.log(storedData);
console.log(storedData2);

type UnknownEmployee = Employee | Admin;
function printEmployeeInformation(emp: UnknownEmployee) {
  console.log("Name: " + emp.name);
  if ("privileges" in emp) {
    console.log("Privileges: " + emp.privileges);
  }
  if ("startDate" in emp) {
    console.log("Start Date: " + emp.startDate);
  }
}

printEmployeeInformation(e1);
printEmployeeInformation({ name: "Maru", startDate: new Date() });

class Car {
  drive() {
    console.log("Driving");
  }
}

class Truck {
  drive() {
    console.log("Driving a truck");
  }
  loadCargo(amount: number) {
    console.log("Loading cargo ... " + amount);
  }
}

type Vehicle = Car | Truck;

const v1 = new Car();
const v2 = new Truck();

function useVehicle(vehicle: Vehicle) {
  vehicle.drive();
  // if ("loadCargo" in vehicle) {
  // in을 사용한 타입 가드
  if (vehicle instanceof Truck) {
    // instanceof를 사용한 타입가드
    vehicle.loadCargo(1000);
  }
}

useVehicle(v1);
useVehicle(v2);

// 아래부터 구별된 유니언 타입 가드 패턴
// 객체에 하나의 공통 속성을 추가하여 switch를 활용
// 객체와 유니언 타입을 이용할 때 아주 유용하다
interface Bird {
  type: "bird";
  flyingSpeed: number;
}
interface Horse {
  type: "horse";
  runningSpeed: number;
}

type Animal = Bird | Horse;

function moveAnimal(animal: Animal) {
  let speed;
  switch (animal.type) {
    case "bird":
      speed = animal.flyingSpeed;
      break;
    case "horse":
      speed = animal.runningSpeed;
  }
  console.log("Moving with speed" + speed);
}

moveAnimal({ type: "bird", flyingSpeed: 10 });

// 아래부터 형 변환

/* const userInputElement = <HTMLInputElement>(
  document.getElementById("user-input")!
);
userInputElement.value = "Hi there!"; */
//<> 꺽쇠를 사용한 형 변환 방법

const userInputElement = document.getElementById(
  "user-input"
)! as HTMLInputElement;
userInputElement.value = "Hi there!";
// react에서 꺽쇠를 사용하기 때문에 충돌을 방지하기 위해 as를 사용하는 형 변환 방법
// 프로젝트 시 위 둘중 하나의 방법만 사용할 것 나는 React를 사용하니 as를 사용해야 할 것 같다

// 형 변한을 사용하면 해당 코드가 어떤 element 타입을 반환하는 지 typescript에게 알려준다.
// 위 코드에서 형 변한을 사용하지 않으면 해당 id를 가진 element가 input인지 타입 스크립트가 알 수 없기 때문에 오류를 발생시킨다.
// 형 변환을 사용하면 그 오류를 방지할 수 있다.

// ! 느낌표
// document.getElementById("user-input")! << 이 느낌표는 이 앞에 있는 것이 절대 Null이 아님을 타입스크립트에게 알리는 것이다.
// null이 확실하게 반환되지 않는 것을 알 때만 써야하고 다른 때는 if문을 사용하는 것이 좋다

const userInputElement2 = document.getElementById(
  "user-input"
) as HTMLInputElement;
userInputElement2.value = "Hi there!";
// 형 변환 처리를 사용하면 해당하는 코드가 Null이 아니라는 것을 알려주는 것이기 때문에 확실하지 않다면 if문을 사용해야 한다.

const userInputElement3 = document.getElementById("user-input");

if (userInputElement3) {
  (userInputElement3 as HTMLInputElement).value = "Hi there!";
}
// if문 안의 userInputElement3을 괄호로 감싸서 먼저 형 변환 처리를 하여 그 결과의 value에 접근한다.

interface ErrorContainer {
  email: string; // 미리 정의하는 속성을 추가하는 것도 가능
  // id: number; 인덱스 속성에 지정된 것과 같이 문자열이어야 한다. 숫자면 컴파일 에러 발생
  [prop: string]: string;
  // 인덱스 속성 : 이 에러 컨테이너라는 인터페이스로 만들어진 객체에 추가되 는 propertie(속성)은 반드시 문자열로 인지될 수 있는 속성 이름이 있어야 하고
  // 속성의 값은 문자열이어야 한다. (string 타입으로 지정했을 시)
}

const errorBag: ErrorContainer = {
  email: "not a valid email!",
  userName: "Must start with a capital character",
};
