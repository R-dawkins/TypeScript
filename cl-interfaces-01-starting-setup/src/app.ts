// readonly : 초기화 후에 수정 불가
class Department {
  static fiscalYear = 2020; //static을 사용한 정적인 메소드, 프로퍼티는 정적이지 않은 요소에서 사용할 수 없다.
  // private readonly id: string; - 생략
  // private name: string; - 생략
  protected employees: string[] = []; //protected 접근제한자 : 정의된 클래스를 제외한 모든 외부에서 접근을 제한하는 private와 다르게 상속받은 클래스에서 접근이 가능
  constructor(
    protected readonly id: string,
    public name: string /* 약식 초기화 : 프로퍼티와 생성자 함수 내부의 코드를 생략하고 바로 생성자 함수의 매개변수에 프로퍼티 생성과 초기화 가능*/
  ) {
    // this.id = id - 생략
    // this.name = n; - 생략
    // console.log(this.fiscalYear); 여기서 this는 클래스를 기반으로 생성한 인스턴스를 의미하기 떄문에 정적 프로퍼티인 fiscalYear에는 this로 접근할 수 없다
    console.log(Department.fiscalYear); //클래스 이름으로 접근하면 클래스 안에서 정적 메소드,프로퍼티 사용 가능
  }
  static createEmployee(name: string) {
    return { name: name };
  }

  describe(
    this: Department /* typescript에서 사용할수 있는 특수한 매개변수 this가 참고할 클래스를 지정할 수 있음 */
  ) {
    console.log(`Department (${this.id}) : ${this.name}`);
  }

  addEmployee(employee: string) {
    this.employees.push(employee);
  }

  printEmployeeInformation() {
    console.log(this.employees.length);
    console.log(this.employees);
  }
}

class ITDepartment extends Department {
  admins: string[];
  constructor(id: string, admins: string[]) {
    super(id, "IT");
    this.admins = admins; // this를 사용하려면 super 다음에 사용해야 한다 (다른 클래스를 상속 받았을 시)
  }
}

class AccountingDepartment extends Department {
  private lastReport: string;
  get mostRecentReport() {
    //getter
    if (this.lastReport) {
      return this.lastReport;
    }
    throw new Error("No Report Found");
  }
  set mostRecentReport(value: string) {
    if (!value) {
      throw new Error("Please pass in a valid value");
    }
    this.addReport(value);
  }
  constructor(id: string, private reports: string[]) {
    super(id, "Accounting");
    this.lastReport = reports[0];
  }
  describe() {
    console.log("Accounting Department - ID : " + this.id);
  }
  addEmployee(name: string) {
    if (name === "Max") {
      return;
    }
    this.employees.push(name);
  }
  addReport(text: string) {
    this.reports.push(text);
    this.lastReport = text;
  }
  printReport() {
    console.log(this.reports);
  }
}

const employee1 = Department.createEmployee("Max");
console.log(employee1, Department.fiscalYear);

const IT = new ITDepartment("D2", ["Max"]);

IT.addEmployee("Max");
IT.addEmployee("Manu");

IT.describe();
IT.printEmployeeInformation();

console.log(IT);
const accounting = new AccountingDepartment("d2", []);
accounting.addEmployee("Max");
accounting.addEmployee("Manu");

accounting.addReport("Something went wrong...");
console.log(accounting.mostRecentReport); //getter를 사용하면 ()를 붙이지 않고 프로퍼티에 접근하듯이 사용 가능
accounting.mostRecentReport = "Year End Report"; //setter를 사용하면 프로퍼티에 접근하듯이 사용 가능
// accounting.printReport();
// accounting.printEmployeeInformation();
accounting.describe();
/* const accountingCopy = { describe: accounting.describe }; */
/* accountingCopy.describe(); 지정한 클래스가 Department이기 떄문에 name 프로퍼티가 있어야 한다.*/
