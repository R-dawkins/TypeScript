import "reflect-metadata";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";

//declare var GLOBAL: any;
//declare : typescript가 인식하지 못하는 패키지, 일반적으로 전역 변수를 타입스크립트에 알릴 수 있음

import { Product } from "./product.model";
const products = [
  { title: "A Carpet", price: 29.99 },
  { title: "A Book", price: 10.99 },
];

const newProd = new Product("", -5.99);
validate(newProd).then((errors) => {
  if (errors.length > 0) {
    console.log("VAL Error");
    console.log(errors);
  }
});
console.log(newProd.getInformation());

const p1 = new Product("A Book", 12.99);
console.log(p1.getInformation());

/* const loadedProducts = products.map((prod) => {
  return new Product(prod.title, prod.price);
}); */
// 위의 코드를 아래의 코드처럼 간단하게 바꿔주는 것이 class-transformer
const loadedProducts = plainToClass(Product, products);
// const loadedProducts = plainToClass(변환 대상 클래스, 변환하려는 데이터)

for (const prod of loadedProducts) {
  console.log(prod.getInformation());
}
