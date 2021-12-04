//* Remove Items from Object Based on Array of Values
const obj = {
  location: "TW",
  age: 20,
  region: "Asia",
};

const f = ["location", "region"];

f.forEach((el) => delete obj[el]);
// console.log(obj);

//* Remove Item/s from Object
const obj3 = {
  location: "TW",
  age: 20,
};

let { age, ...obj2 } = obj3;
//console.log("obj2", obj2);

const obj4 = {
  location: "TW",
  age: 20,
  region: "Asia",
};

let { location, region, ...obj5 } = obj4;
//console.log("obj5", obj5);
