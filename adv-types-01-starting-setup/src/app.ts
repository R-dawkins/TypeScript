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

function add(a: Combinable, b: Combinable) {
  if (typeof a === "string" || typeof b === "string") {
    // >>> typeof를 사용한 타입 가드
    return a.toString() + b.toString();
  }
  return a + b;
}

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
