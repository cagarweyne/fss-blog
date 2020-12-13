---
title: ES6 Classes
date: "2015-03-29"
description: We dive deep into ES6 classes, learn how to use classes
featuredImage: './images/featured-image.jpg'
---

If you've written any amount of substantial code you will have come across the need to encapsulate your code, and using JS constructor functions is the way this has been achieved. Let's say that we want to create an object that we can use to create instances of cars from. To do this we will typically create a constructor function: 

```javascript 

function Car(carSpec) {
  this.name = carSpec.name; 
  this.model = carSpec.model; 
  this.description = carSpec.description; 
} 

let car = new Car({name: 'Ford', model: 'Galaxy', description: 'A large family car'}); 

console.log(car.description);//A large family car 

```
Now if we want to add functions (methods) that we want to attach to the constructor function we add this to its to the functions prototype property like this: 

```javascript 
function Car(carSpec) {
  this.name = carSpec.name; 
  this.model = carSpec.model; 
  this.description = carSpec.description; 
}  

//add the function to the prototype property 
Car.prototype.drive = function() {
  console.log("Driving.....");
}

let car = new Car({name: 'Ford', model: 'Galaxy', description: 'A large family car'}); 

console.log(car.description);//A large family car 

//Now our car instance has the drive method available to it
car.drive(); //Driving.....
```

Now we've created a generic car object model, what if we wanted to create another car model, say Audi, that inherits from this generic car object, but also has unique properties? We can achieve with this with  the prototypal inheritance of JS. To implement this we'll need to create another constructor function and inherit from the Car object: 

```javascript 

//our main generic car object 
function Car(carSpec) {
  this.name = carSpec.name; 
  this.model = carSpec.model; 
  this.description = carSpec.description; 
}  

//add the function to the prototype property 
Car.prototype.drive = function() {
  console.log("Driving.....");
} 

function Audi(carSpec) {
  //call the generic car function constructor an pass it the context and the carSpec params
  Car.call(this, carSpec)
  this.engine = carSpec.engine;
  this.audiDrive = function() {
    console.log('vroom vrooom');
  }
}

//Then we need to use the Object.create to construct the subclass prototype so that we don't have to call the base constructor
Audi.prototype = Object.create(Car.prototype); 
//set the constructor of our Audi back to the Audi constructor again
Audi.prototype.constructor = Audi;

const myAudi = new Audi({name: 'My Audi', model: 'Audi', description: 'great German car', engine: 'A313'}); 

console.log(myAudi.description); 

```

Using this approach works but it involves a writing quite a bit of code, especially when you want to inherit from another object. There are quite a lot of things that we have to write just to get things wired up and working - this is one of main points that can make working with OO code in JS confusing. 

In ES6 we can rewrite our constructor functions using classes. Now in terms of the actual implementation of our ES6 classes it will actually just be converted to a constructor function under the hood, it is worth remembering that JS has a prototype system that is different from classical OOP languages such as Java and as such the JS remain a prototype based language. When we create classes in ES6 it doesn't mean that we are using new object model, rather using classes is just another way to create objects - but with a lot less code and lot less confusion surrounding it! 

With that out of the way, let's actually write an ES6 class to see how it's done. We'll use the car model again as an example but this time we will write it in ES6 using classes. Creating Object Oriented code using classes will actually assimilate it with other popular programming languages, and the syntax will look familiar to other developers coming from a non JS background. 

```javascript 

class Car {
  constructor(name, model, description) {
    this.name = name; 
    this.model = model; 
    this.description = description; 
  }
}

let car = new Car('Ford', 'Galaxy', 'A large family car' )
console.log(car.description);

```

You might argue that we have merely replaced the `function` keyword with `class` and everything else is still the same. Well, let's see how we can add methods to the class and then you'll realise that it's actually a lot different: 

```javascript 

class Car {
  constructor(name, model, description) {
    this.name = name; 
    this.model = model; 
    this.description = description; 
  }
  
  drive() {
    console.log("Driving.....");
  }
}

let car = new Car('Ford', 'Galaxy', 'A large family car' )
console.log(car.description);
car.drive(); 

```
Looking at that you can immediatley appreciate that it is cleaner and easier to understand, in fact adding a method to a class look exactly like the method initializer shorthand in object. There is no need to assign it to assign a function to the prototype. 

All instance variables set in the constructor can be accessed from all other instance methods, for example lets say that when the drive method is called we wanted to say the name of the car that is driving plus its model. We can rewrite our class like this: 

```javascript 

class Car {
  constructor(name, model, description) {
    this.name = name; 
    this.model = model; 
    this.description = description; 
  }
  
  drive() {
    console.log(`${this.name} which is a ${this.model} model is now driving`);
  }
}

let car = new Car('Ford', 'Galaxy', 'A large family car' )
car.drive();//Ford which is a Galaxy model is now driving 

```
As you can see from the code example above, we can access Class instance variables inside other instance methods. The drive method has access to the Class instance variables `name`, `model` and `description`. It goes without saying, that you need to use they keyword `this` to access instance properties and methods. 

### Inheritance in ES6 Classes 

In the previous example when we wanted to inherit from the generic car object, we had to write a lot of code to achieve this and this code can be confusing to understand at times. The process of inheritance in ES6 is simplified and we don't have to actually write a lot of code to achieve what we want.

To understand how inheritance is simplified in ES6, we will rewrite the previous example where we created an Audi car model and inherited from the generic car object's properties and methods. To do this in ES5 we had to write a lot of code. Let's rewrite the code now in ES6: 

```javascript 
//our generic car object in ES6 
class Car {
  constructor(carSpec) {
    this.name = carSpec.name; 
    this.model = carSpec.model; 
    this.description = carSpec.description; 
  }

  //drive method
  drive() {
    console.log("Driving.....");
  }
}



//new car model (Audi)
class Audi extends Car {
  constructor(carSpec) {
    super(carSpec);// Car.constructor(); 
    this.engine = carSpec.engine; 
  }

}

let audi = new Audi({name: "Audi", model: "A3", engine: "A313", description: "Best Audi Model"}); 

console.log(audi);

//prints 
// {
//   description: "Best Audi Model",
//   engine: "A313",
//   model: "A3",
//   name: "Audi"
// }


audi.drive(); //calls the inherited instance method from Car - "Driving....."

```
The ES6 code is actually a lot simpler! We have our initial car object, that takes in a carSpec options object as an argument. In the Car object's constructor method we initialize the variables `name`, `model` and `description`. Nothing new here. Then we created a new car object model Audi, and as you will have noticed we added a few things to the original Car object. After the class name we added the keyword `extends` followed by the name of the class that we want to inherit from. In our case here it is the Car object. This means that we want to inherit all of properties and instance methods of the Car object. 

We also want to have the name, model and description properties to be assigned as instance properties of the new Audi model, to achieve this we need to call the constructor method of the Car object. We can achieve this by using the keyword `super` and invoking it with parenthesis `super()`. This means that we won't have to do the same assignment that we did in when we wrote the constructor method of the Car object, this will be done for us the moment that we call super. However, we also need to pass along the `carSpec` options object to the super method so that when it runs, our class can assigned with a name, model and description. Then below the call to the super method, we can assign our own unique class instance, in our cases the Audi model has an engine property, we can pull this off the `carSpec` object that is passed in and assign to the engine property of the class. 

As mentioned we also have access to all of the methods of the Car object, so we can simply call the drive method on the new instance of the Audi model and it will run the inherited drive method. 