const fruits = ["æble", "pære", "banan"];

//Generelt object. Map findes også i java fx
const map1 = new Map();

//Javascript object - Erik bryder sig ikke om, da keyen bliver castet til string
const map2 = {};
const map3 = {};

function createFruitMap(fruit, index)
{
    map1.set(index, fruit);
    map2[index] = fruit;
    map3[fruit] = index;
}

fruits.forEach(createFruitMap)


console.log(map1)
console.log(map2)
