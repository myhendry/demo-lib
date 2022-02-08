const a1 = [
  {
    name: "Ali",
    age: 20,
  },
  {
    name: "Chris",
    age: 26,
  },
  {
    name: "John",
    age: 22,
  },
];

let i = 0;

let a2 = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];

// for (let i = 0; i < a2.length; i++) {
//   // console.log(a2[i]);
//   for (let j = 0; j < a2[i].length; j++) {
//     console.log(a2[i][j]);
//   }
// }

let s1 = "it is a nice day";
// let sr1 = s1
//   .split(" ")
//   .map((s) => {

//     return s + " | ";
//   })
//   .join(",");
// console.log(sr1);

// let s = "liverpool";
// let s1 = s.split("").map((s) => s + "a");
// console.log(s1);

// let z = new Array(3).fill(10);
// console.log(z);

// while (i <= 5) {
//   console.log(i);
//   {
//     if (i == 3) continue;
//   }
//   i++;
// }

// for (a of a1) {
//   for (o in a) {
//     console.log(a[o]);
//   }
// }

// a1.forEach((c) => {
//   c.age + 20;
//   console.log(c.age);
// });

// for (let i = 0; i < a1.length; i++) {
//   console.log(a1[i].name);
// }

// a1.map((a) => {
//   console.log(a.name);
// });

// let ta = a1.reduce((acc, a, i) => {
//   acc += a.age;

//   return acc;
// }, 0);

// let ra = a1.filter((a) => {
//   return a.age < 25;
// });

// let sa = a1.sort((a, b) => b.age - a.age);

// let fa = a1.find((a) => a.age > 25);
// console.log(fa);

// //* Remove Items from Object Based on Array of Values
// const obj = {
//   location: "TW",
//   age: 20,
//   region: "Asia",
// };

// const f = ["location", "region"];

// f.forEach((el) => delete obj[el]);
// // console.log(obj);

// //* Remove Item/s from Object
// const obj3 = {
//   location: "TW",
//   age: 20,
// };

// let { age, ...obj2 } = obj3;
// //console.log("obj2", obj2);

// const obj4 = {
//   location: "TW",
//   age: 20,
//   region: "Asia",
// };

// let { location, region, ...obj5 } = obj4;
// //console.log("obj5", obj5);
