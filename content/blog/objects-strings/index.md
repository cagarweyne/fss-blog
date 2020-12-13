---
title: Objects in ES6
date: "2015-03-26"
description: Objects and Strings have been updated in ES6
featuredImage: './images/featured-image.jpg' 
---

ES2015 has added a shorter syntax for creating object literals, in ES5 you would typicaly see something like this: 

```javascript 
function createUser(first, last){
  let fullName = first + " " + last;
  return { first: first, last: last, fullName: fullName }
}

//calling the build user fuction 
let user = createUser("Abdi", "Cagarweyne");
console.log( user.first );//Abdi
console.log( user.last );//Abdi Ahmed
console.log( user.fullName );//Abdi Ahmed
```
However, as you can see returning objects with keys and variables with the same name looks repetitive and in ES2015 you can use the shorthand to initialize objects: 

```javascript 
function createUser(first, last){
  let fullName = first + " " + last;
  return { first, last, fullName }//this is equivalent to: return { first: first, last: last, fullName: fullName }
}

//calling the build user fuction 
let user = createUser("Abdi", "Cagarweyne");
console.log( user.first );//Abdi
console.log( user.last );//Abdi Ahmed
console.log( user.fullName );//Abdi Ahmed
```
As you can see this is much cleaner and means that you have less writing to do when initialize objects, if the key and value variables both have the same name, then you can use the shorthand method to make your code more terse and less repetitive. The object initializer shorthand works anywhere a new object is returned for example: 

```javascript 
let name = "David";
let age = 45;
let colleagues = ["George","Michelle"];
let user = { name, age, colleagues };//this is the same as: let user = { name: name, age: age, friends: friends };

console.log( user.name );//Davide
console.log( user.age );//45
console.log( user.colleagues );//["George","Michelle"]
```

## Object Destructuring 

ES2015 introduces anothe really cool feature when it comes to assigning values attached to an object or in an array. If we had an array that contained values which we wanted to assign to individual variables we would do the following in ES5: 

```javascript 
let nums = [1, 2, 3]; 

let a = nums[0], b = nums[1], c = nums[2]; 

console.log(a, b, c); //prints 1 2 3 to the console 
```
To get the values into individual we had to access each value in the index and assign it to a variable. However, we can achieve the same result by using destructuring in ES2015: 

```javascript 
let nums = [1, 2, 3]; 
let [a, b, c] = nums; 

console.log(a, b, c)
```
This looks much cleaner than the previous version and means that you have less code to write. The same can also be done with objects, for example: 

```javascript 
let obj = {
  x: 7, 
  y: 8, 
  z: 9
}

let x = obj.x, y = obj.y, z = obj.z; 
console.log(x, y, z);//prinst 7 8 9 to the console
```

This becomes:

```javascript 
let obj = {
  x: 7, 
  y: 8, 
  z: 9
}

let { x, y, z } = obj; 
console.log(x, y, z);//prinst 7 8 9 to the console
```

This destructuring process might seem confusing at first, as you are used to seeing syntax like `[ a, b, c]` or `{ x, y, z }` on the right hand side instead of the left. However, what is happeining here is that the pattern has been flipped, so that when you have `[ a, b, c]` or `{ x, y, z }` on the left hand side of the assignment it means that detach all of the values corresponding on the left handside from the right. Obvisouly, for this to work in object destructuring the variables that you are assigning the values to must match the keys of the object that you are destructuring. For example, the following will not work: 

```javascript 
let obj = {
  a: 7, 
  b: 8, 
  c: 9
}

let { x, y, z } = obj; 
console.log(x, y, z);//prints: undefined undefined undefined
```
Also for array destructuring, this will only work if the values on the right are the same number or less than the length of the array, for example: 

```javascript 
let nums = [1, 2, 3]; 
let [a] = nums; //only the first element will be assigned to the variable a

console.log(a)//1
```
This results in undefined for variables `b` and `c`: 

```javascript 
let nums = [1]; 
let [a, b, c] = nums; //b and c are assigned undefined since there isn't a corressponding value in array

console.log(a, b, c)//1 undefined undefined
```

## Adding functions to an Object 

Adding functions to an object is something that is done all of the time, and in ES6 it has been made simpler to add a function to an object. Previously, we would declare the property of the object and then use th full function declaration to add a method: 

```javascript 

let myObj = {
  prop1: 'Hello', 
  prop2: 'world', 
  fullName: function(firstname, lastname) {
  	let fullName = firstname + ' ' + lastname; 
  	return fullName; 
  }
}

```
In ES6 the syntax is shortand and made simpler by just declaring the object property followed by the parenthesis and the function body: 

```javascript 

let myObj = {
  prop1: 'Hello', 
  prop2: 'world', 
  fullName(firstname, lastname) {
  	let fullName = firstname + ' ' + lastname; 
  	return fullName; 
  }
}

```
## Template strings

Another great feature added to ES6 is the use of ttenplate strings. Template strings allow embedded expressions and you can use multi-line strings and string interpolation features with them. Let's have look at some examples to understand better. Say you have a url where you are posting some data and you want to add interpolation with a service id, in ES5 this would be done like this:

```javascript 

let url = "/service/"+servid

```
In ES6, you can just use backticks to surround your whole string and add interpolation using the dollar sign and curly braces: 

```javascript 

let url = `/service/${servid}`

```

This is much cleaner and means that you can actually create complex strings with interpolation without having to use plus signs, line breaks, multiple double quotes etc. If you have ever needed to create multi-line strings before you would have to use line breaks to achieve this. However, in ES6 you simply use the backticks and continue writing you string on the new line without the need for a line break. Let's look at how this is done in ES5 first and then using template strings in ES6: 

```javascript 

//ES5 
console.log("string text line 1\n"+
"string text line 2");
// "string text line 1
// string text line 2"


//ES6 

console.log(`string text line 1
string text line 2`);
// "string text line 1
// string text line 2"

```

## Object.assign

As a developer, writng flexible and reusabel functions is something that we all must strive to do and the new feature in ES6 object.assign helps in that regard. Let's look at an example scenario where using object.assign will be useful for us. Say we're creating a function that accepts an options parameter, in that it can take 0 or more options as properties, and depending on the options supplied the function will return a different value: 

```javascript 

function person(name, options = {}) {
    let age = options.age || 'at least 18';
    let address = options.address || 'Shared accommodation'; 
    let occupation = options.occupation || 'Student'; 
    
  return `${name} is ${age} and is currently at ${address} 
  and their occupation is ${occupation}`;
}

```
When calling this function some options might not be specified, so this means that we need to account for this using default values. As you can see from the function, we assign each property of the options object to a variable and then use the double pipe to check for the presence of a value that has been passed in. If there is no value it will return undefined and then we fall back to the default values.

the code above is fine as it is, but it requires a bit of brain power to understand and in the long term may be difficult to maintain. let's fix this function using a defaults object and the new feature object.assign: 

```javascript 

function person(name, options = {}) {
  let defaults = {
    age: 'at least 18', 
    address: 'Shared accommodation', 
    occupation: 'Student'
  }
    
  return `${name} is ${defaults.age} and is currently at ${defaults.address} 
  and their occupation is ${defaults.occupation}`;
}

```
Now that we have improved upon our function, the next step is to merge options and defaults, and where there are duplicate, those from options must override the properties in the defaults object. This is where the object.assign feature in ES6 comes in really useful to help us. 

The object.assign feature helps us to copy one or more source objects into a target object and retunrs the target object. The way in which the function works is that it takes a target object as the first argument and then takes any number of subsequent arguments as the source object from which to copy the properties. So the function looks like this: `Object.assign(target, source_1, ..., source_n)`. 

If Object.assign encounters duplicate properties on source objects, the value from the last source object will always be returned. So, if a property foo was already in the target object and then in the last source there is also another property foo, then this last property will overwrite the last one and this is the one that gets returned. 

Let's now use the Object.assign function to merge the defaults object with the passed in options object and see the Object.assign in action. 

```javascript 

function person(name, options = {}) {
  let defaults = {
    age: 'at least 18', 
    address: 'Shared accommodation', 
    occupation: 'Student'
  }
  
  let finalOptions = Object.assign({}, defaults, options); 
    
  return `${name} is ${finalOptions.age} and is currently at ${finalOptions.address} 
  and their occupation is ${finalOptions.occupation}`;
}

person('abdi', {age: 30});

```

The way in which you use Object.assign is very straight forward, you create a variable that will hold the return value of the target object and you pass an empty object as the first argument then followed by the source objects that you wish to copy from: 

`let finalOptions = Object.assign({}, defaults, options)`.

One thing to note is that we haven't used the defaults object as the target object, because if we did we would be mutating the defaults object and we would  not have access to the original values anymore. It's important that we do not mutate the defaults object because if we wanted to compare the defaults value with the passed in options value then we would have nothing to compare with. 

Also, notice how there is a variable declared to hold the return  value from the Object.assign function, we could have written it like this: 

```javascript 
let finalOptions; 
Object.assign(finalOptions, defaults, options); 
```
If we wrote it like this then we would not be using the return value from the function, and even though it would still work, the correct way is to assign the return value directly to the `finalOptions` variable. 

## Arrays

Arrays are an important data type that is used extensively, and it is not uncommon to access elements by their index. For example, say we have an array of fruits: 

```javascript 
let fruits = ['apple', 'grapes', 'banana']; 

let a = fruits[0]; 
let b = fruits[1]; 
let c = fruits[2]; 

console.log(a, b, c);

```

As you can see from the code above, we can assign each fruit to its own variable using their indices 0, 1, and 2. This is perfectly fine and works, but it is more code than we actually need and if we had more elements in the array we would need to know the index fo each element in order to assign it to a variable, which means that this doesn't scale very well. 

In ES6, we can assign each fruit to a variable using what's called array destructuring. Array destructuring allows us to write the code in a much better way, similar to the way in which we destructure an object, we can destructure an array. So let's rewrite the example above using array destructuring: 

```javascript 
let fruits = ['apple', 'grapes', 'banana']; 

let [a, b, c ] = fruits; 

console.log(a, b, c);//apple grapes banana
```
Instead of accessing elements by their index, we declare a single line of code between square brackets and assign them to the variables on the left. The JS engine will try to match the number of variables on the left to the number of elements in the array. As you can see from the code above, we assigned the variables a, b and c the values apples, grapes and banana respectively. This code is actually easier to undertand and requires less code. 

If there are any values that we aren't interested in, we can discard them during the assignment operation: 

```javascipt 
let fruits = ['apple', 'grapes', 'banana']; 

let [a, , b ] = fruits; 
console.log(a, b) //apple banana
```
In the exampe above we only store apple and banana into the variables and we have left out grapes. We achieved this using a blank space after the first variable to indicate that we don't want the second element assigned to any variable. When we run the code we only get apples and banana assigned to variables a and b respectively. 

###Destructuring and rest parameters

We've already learned some cool things that we can do in ES6, and we can combine array destructuring with rest paramaters group values into other arrays. Let's look at an example to see what we mean: 

```javascript 
let fruits = ['apple', 'grapes', 'banana']; 
let [first. ...rest] = fruits; 

console.log(first, rest);//apple, ['grapes', 'banana']
```
The example above shows array destructuring and the rest parameters in use, we assigned the first element apple to the variable first and then we used the rest parameter with the three dots `...` to group all remaining elements into a new array called rest 

### Destructuring from return values 

There will always be opportunities to use array destructuring in your JS code, and another place where we can use them is when we return values from functions. We can use them to assign to multiple variables at once. Let's see what we mean by looking at some code: 

```javascript 

function myFruits() {
   let fruits = ['apple', 'grapes', 'banana'];
   return fruits; 
}

```
As you would expect in JS, we can assign the return value to variable: 

```javascript 
function myFruits() {
   let fruits = ['apple', 'grapes', 'banana'];
   return fruits; 
}

let allFruits = myFruits(); 

```
Nothing new in the example above, however, using array destructuring we can assign multiple variables at once, just as we did before, from the return value of the function: 

```javascript 

function myFruits() {
   let fruits = ['apple', 'grapes', 'banana'];
   return fruits; 
}

let [a, b, c] = myFruits(); 

console.log(a, b, c);//apple, grapes, banana

```
### The for...of loop 

The for of loop is a new feature added in ES6, which is a better way of looping over arrays and other iterables. Let's look at an example to understand further. Once gain, say we have an array of fruits: 

```javascript 
let fruits = ['apple', 'grapes', 'banana'];
```

To loop over the array we can use the for in loop:

```javascript 
let fruits = ['apple', 'grapes', 'banana'];

for(let i in fruits) {
  console.log(fruits[i]);
}

```
The for in loop returns the index for each element, and it is assigned to the `i` variable in the loop. We can then use this index variable to access each element of the array. So, there are two steps here, first assigning each index to the `i` variable and then accessing each element using the index in the variable on the array. 

Using for of we don't need to use the index to access an element in an array: 

```javascript 
let fruits = ['apple', 'grapes', 'banana'];
```

To loop over the array we can use the for in loop:

```javascript 
let fruits = ['apple', 'grapes', 'banana'];

for(let fruit of fruits) {
  console.log(fruit);
}

```
The for of loop reads each element directly from the array and assigns it to the named variable, which is `fruit`. This is only one step when compared to the for in loop, and this means that we can loop over arrays and other iterables writing less code. 

### Objects and the for...of loop 

The for of loop cannot be used to iterate over properties of a plain javascript object. So the following will not work: 

```javascript 

let person = {
  name: "Abdi", 
  address: "123 JS street Node Avenue", 
  occupation: "JS Developer"
}

for(let prop of person) {
  console.log("Property", prop);
}

```

If you try to run the code above you will run into a type error: `TypeError: person[Symbol.iterator] is not a function`. So you migt be asking: when can I use for of without running into errors? We can check to see if the for of loop will work by looking to see if there is a function assigned to the Symbol.iterator property. For the array if we log the type that is assigned to the Symbol.iterator property, we can see that this returns a function: 

```javascript 
let fruits = ['apple', 'grapes', 'banana'];
console.log(typeof fruits[Symbol.iterator]);//function

let person = {
  name: "Abdi", 
  address: "123 JS street Node Avenue", 
  occupation: "JS Developer"
}

console.log(typeof person[Symbol.iterator]);//undefined

```
If we run the same check on the plain JS object, you will notice that it returns undefined. This means that there is nothing assigned to the property and the obpject will not work with for of loop. 

### Array.find() 

ES6 also adds new array function that we can use to find a specific element in an array. The array.find() function takes a testing function to return an element that meets this criteria: 

```javascript 

let services = [
  {name: 'nails', activated: false},
  {name: 'haircut', activated: true},
  {name: 'feet therapy', activated: true}
]

```
Lets say that we wante to find the first service object that was activated, we can use the array.find function to ohelp us get the first object which has activated set to true: 

```javascript 
let services = [
  {name: 'nails', activated: false},
  {name: 'haircut', activated: true},
  {name: 'feet therapy', activated: true}
]

let activated = services.find(service => {
  return service.activated
}); 

console.log(activated);//{name: 'haircut', activated: true}

```
The find method will return the first object that has activated set to true

## Maps

ES6 introduces a new data structure called maps. Maps are a data structure composed of a collection of key value pairs, which makes them very useful to store simple data. Maps are actually present in other programming languages and are useful to store property values. A Map stores collections of unique keys mapped to values each key is associated with one, and only one value, in order to find a specific value in map, you give it it key and you receive its value in return. 

### Issues with Objects as maps 

JS developers are first exposed to Maps through objects, you can use objects as key values stores, there are some limitations with this. The main limitation is that you cannot use a non string value as a key. The JS engine always converts object keys to strings and this causes unexpected behavior when you use objects as keys. Let's look at an example to better understand this: 

```javascript 

let carOne = { make: 'Audi' };
let carTwo = { make: 'Ford' }; 

```
lets add a new object to the scene `carAge' that will also be an object but will use the two car objects as keys: 

```javascript

let carOne = { make: 'Audi' };
let carTwo = { make: 'Ford' }; 

let carAge = {}; 

carAge[carOne] = 3; 
carAge[carTwo] = 5; 

console.log(carAge); //{ '[object Object]': 5 }

```

When you look at the console log of the carAge object you will see that it only contains one key which is `object Object` and a value of 5. Both keys have been converted to strings, and since they were objects, the string that they were converted to was `object object', and this means that only that key is being set in the carAge object. So in otherwords, the last value this set in the object will overwrite all previous values and so on. 

###The Map data structure 

To overcome this limitation in using objects as keys, ES6 introduced Map as a new data structure. The Map object is similar to the JS objects that we are used to, it is a simple key => value data structure. If you want to access the value of a particular key, you just provide that key and in return you get the value. The main difference with Maps is that you can use ANY value as a key or a value andmore importantly, objects are not converted to strings. 

To see Maps in action, let's make carAge a Map instead of a normal JS object, and use the set method to add keys to the Map. This is different to simply assigning the key in plain JS objects with dot notation or a using the brackets: 

```javascript 

let carOne = { make: 'Audi' };
let carTwo = { make: 'Ford' }; 

let carAge = new Map(); 

carAge.set(carOne, 3); 
carAge.set(CarTwo, 5); 

console.log(carAge); //{ '[object Object]': 5 }

```
The `set` method takes two arguments, a key and a value. As we did before we are using the objects as keys and assiging them their respective ages. To read the values of a map we can't simply use the dot or bracket notation, again we need to use one of its methods that it comes with to manipulate the `Map`, which is the `get` method that only takes a key as its only argument. Here's how we read keys off of a map: 

```javascript 

console.log(carAge.get(carOne));// 3
console.log(carAge.get(carTwo));//5

```

As you can see when you log the keys, the two values are assigned to different keys in the Map and nothing is converted to string or overwritten. Therefore, in majority of the cases we should not use JS objects as maps, because of their limitations when it comes to using objects as keys. 

You should use Maps when the keys are unknown until runtime, for example after loading in data from an AJAX call. However, when we are using predefined keys and we know their values before runtime, it is perfectly fine to use normal JS objects. We should also aim to use keys when all the keys and their values are of the same type. This will help keep the maps consistent and easier to work with, as you know what to expect.  

### Iterating Maps with for...of

The Map data structure are iterable, this means that we can use the for.. of loop and each run of the loop will return a [key, value] pair for each entry in the Map. Let's create a new Map of cars and add some entries: 

```javascript 

let cars = new Map(); 

cars.set("CarOne", "Audi"); 
cars.set("CarTwo", "Ford"); 
cars.set("CarThree", "GM"); 
cars.set("CarFour", "BMW"); 
```

We can easily loop through this Map of car using for..of loop and in each loop it will return a key value pair: 

```javascript 

let cars = new Map(); 

cars.set("CarOne", "Audi"); 
cars.set("CarTwo", "Ford"); 
cars.set("CarThree", "GM"); 
cars.set("CarFour", "BMW"); 

for(let [key, value] of cars) {
  console.log(`${key} = ${value}`); 
}

```

As you can see from the for of loop, we have used array destructuring to assign the key to a key and value to value respectively and we are accessing these using template strings when we log them out. When we run the code we can see that it prints each entry of the Map to the console successfully. 

### WeakMaps 

ES6 has also inttroduced another type of data set that is a variation of the Map called WeakMaps. The WeakMap is a special type of Map, and the main difference is that you can only use objects as keys. This means that you can't use primitive data types such as strings, numbers and booleans as the keys in a WeakMap. Let's look at an example where WeakMaps are used: 

```javascript 

let personOne = {}; 
let personTwo = {};

let people = new WeakMap(); 
people.set (personOne, "Abdi"); 
people.set(personTwo, "David"); 

console.log(people.get(personOne));//Abdi
console.log(people.get(personTwo));//David

```
As you can see from the code above, we can use the same `set` and `get` methods as we did with `Map`. However, if you tried using a string as a key, you will run into an error, which says `Invalid value used as weak map key`. Besides only allowing objects as keys, WeakMaps are not iterable, you cannot use the for..of loop to iterate over the keys in a WeakMap. You will run into the same error when trying to iterate over objects with a for...of loop. 

### Why do need WeakMaps? 

The main use for WeakMaps is that they make efficient use of memory, this means that individual entries can be garbage collected while the WeakMap is still in use. They are called 'Weak' because they hold a weak reference to the object that is used as reference for the keys. As long as an object is no longer referenced after it is used, WeakMaps will not prevent the garbage collector from colecting objects that are being used a keys in a WeakMap. This makes efficient use of memory and frees more of it up that can be used else where. 

## Sets


Like Maps and WeakMaps, Sets are a new data structure introduced in ES6, to understand why we need Sets in the first place, let's first go back to JS Arrays and see some of the limitations that lead to Sets being added to ES6. 

### Limitations with Array 

As you know Arrays in JS are simple and easy to use, however one thing that they don't do is enforce uniqueness in the elments that they hold. This means that you can have duplicate entries in an array in JS. So the following array in JS is perfectly fine: 

```javascript 
let cars = ['Audi', 'Ford', 'Audi', 'Mercedes', 'VW']; 

console.log(cars.length)//5
```

If we print the length property of the array we will see that it has a size of 5 items, even though we have duplicate item - audi. So in ES6 if you want to prevent duplicate entries in an array you can use Sets. Sets can store unique values of any type, be it primitive values or object references. You can create Sets in the same way that you create Maps, using the new keyword: 

```javascript 
let cars = new Set(); 
```
Now if you want to add items to a set you use the add method that is available on all instances of a set, insted of array push method: 
```javascript 
let cars = new Set(); 

cars.add('Audi');
cars.add('Ford');
cars.add('Mercedes');
cars.add({driver: 'Abdi'}); 
cars.add('VW');
cars.add('Audi');

console.log('Total no. cars', cars.size);//5

```
To get the number of items in a set you use the `.size` propery instead of the `.length`. You will notice that the duplicate entry of Audi is ignored and the total size is 5 not 6. 

### Sets and for...of 

As you would expect, Set objects are iterable and we can use the for...of loop and destructuring. Let's see an example of iterating over a set object: 

```javascript 
let cars = new Set(); 

cars.add('Audi');
cars.add('Ford');
cars.add('Mercedes');
cars.add({driver: 'Abdi'}); 
cars.add('VW');
cars.add('Audi');

for(let car of cars) {
  console.log(car);
}
```
### Sets and destructuring 

We can also use destructuring with sets just like we can with normal JS arrays: 

```javascript 
let cars = new Set(); 

cars.add('Audi');
cars.add('Ford');
cars.add('Mercedes');
cars.add({driver: 'Abdi'}); 
cars.add('VW');
cars.add('Audi');

let [a, b, c] = cars; 
console.log(a, b, c);//Audi, Ford, Mercedes

```

### WeakSets 

Similar to WeakMaps we have WeakSets, and if you recall these are the memory efficient version for Sets. Let's look at an example to see how WeakSets work: 

```javascript 

let weakCars = new WeakSet(); 

weakCars.add('Audi'); //error: Invalid value used in weak set

```
If you try to add a string to a WeakSet you will get an error: Invalid value used in weak set, just like WeakMaps, WeakSets only accept objects and nothing else can be stored. So let's add an object instead: 

```javascript 
let weakCars = new WeakSet(); 

weakCars.add({driver: 'Abdi'});
let passenger = { name: 'Sarah' }; 
weakCars.add(passenger);

```

To see if a particular object is in a WeakSet you can use the `has()` method which returns a boolean, to see whether a WeakSet contains a given object. 

```javascript 
let weakCars = new WeakSet(); 

weakCars.add({driver: 'Abdi'});
let passenger = { name: 'Sarah' }; 
weakCars.add(passenger);

console.log(weakCars.has(passenger))// true 

```
If you wanted to delete a particular entry in a WeakSet you can use the `delete` method: 

```javascript 

let weakCars = new WeakSet(); 

weakCars.add({driver: 'Abdi'});
let passenger = { name: 'Sarah' }; 
weakCars.add(passenger);
weakCars.delete(passenger); 
console.log(weakCars.has(passenger))// false 

```

WeakSets are different from Sets in a few different ways, first they are not iterable and they offer no methods for reading values from them. 



### When should we use WeakSets 

There are a limited use cases when WeakSets are actually useful, even though we can't iterate over them or even read values from them. One obvious example is efficient memory usage and to prevent memory leaks. Another instance where WeakSets can be used is when you want to make sure that you do not muatate any data in your app. For example say you have a function that is called when ever a particular link is clicked, and when it is called the function will set a property in an object to true: 

```javascript 

let carSlides = [
{ car: 'Audi', seen: false, image: 'url' },
{ car: 'Ford', seen: false, image: 'url' },
{ car: 'Mercedes', seen: false, image: 'url' },
{ car: 'VW', seen: false, image: 'url' }
];



function clicked(carSlides) {
  carSlides.forEach(car => {
    //mutates each object in the carSlides array
    car.seen = true; 
  } )
}

//lets say this is set true when user clicks on a link somewhere
let linkClicked = true; 
  if(linkClicked) {
  clicked(carSlides); 
}

console.log(carSlides)

```

The above is fine, but let's say that you do not want to mutate your data, having immutable object in your code is something that you should try and implement in your code where possible. We can refactor the code above to make use of WeakSets and not make any mutations to the carSlides array: 

```javascript 

let carSlides = [
{ car: 'Audi', seen: false, image: 'url' },
{ car: 'Ford', seen: false, image: 'url' },
{ car: 'Mercedes', seen: false, image: 'url' },
{ car: 'VW', seen: false, image: 'url' }
];

let carsViewed = new WeakSet();

function clicked(carSlides) {
  carSlides.forEach(car => {
    //instead of mutating we add the object to the carsViewed WeakSet
    carsViewed.add(car);
  } )
}

//lets say this is set true when user clicks on a link somewhere
let linkClicked = true; 
  if(linkClicked) {
  clicked(carSlides); 
}

//console.log(carSlides)//still have our object intact without mutations

//we can then check to see that we have each car as an object in the WeakSets array
for(let car of carSlides) {
 //check each individiual object is present in the WeakSet
 console.log(carsViewed.has(car)); //true 
 //other code.......
}

```
Even though it seems that we are doing extra work, this is actually making sure that we do not mutate our carSlides array data, and in essence achieve some form of data immutability. What you have to also remember is that the WeakSet does not preven the garbage collector from collecting objects that are no longer being referenced, and in turn creating an efficient use of memory. 
