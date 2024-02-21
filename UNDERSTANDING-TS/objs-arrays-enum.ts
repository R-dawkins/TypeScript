/* const person: {
  name: string;
  age: number;
  hobbies: string[];
  role: [number, string]; //튜플(tuple) : 단 두가지 요소만 있는 배열
} = {
  name: "Maximilian",
  age: 30,
  hobbies: ["Sports", "Cooking"],
  role: [2, "author"],
}; */
// const ADMIN = 0;
// const READ_ONLY = 1;
// const AUTHOR = 2;

enum Role {
  ADMIN = 5,
  READ_ONLY = 100,
  AUTHOR,
}

const person = {
  name: "Maximilian",
  age: 30,
  hobbies: ["Sports", "Cooking"],
  role: Role.ADMIN,
};

// person.role.push("admin");
//push는 타입스크립트가 잡아내지 못한다.
// person.role[1] = 10;
// person.role = [0, "admin"];

let favoriteActivities: string[];
favoriteActivities = ["Sports"];

console.log(person.name);

for (const hobby of person.hobbies) {
  console.log(hobby.toUpperCase());
}

if (person.role === Role.ADMIN) {
  console.log("is admin");
}
