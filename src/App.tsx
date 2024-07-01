import "./App.css";
import "./components/TodoList";
import TodoList from "./components/TodoList";

function App() {
  let myName: string = "Name String";
  let count: number;
  let isHotOutside: boolean;

  myName = "Jimmy Persons";
  // doesn't work: type of string is not assignable to type number error
  // can't make a string a number!!!
  // myName = 4;
  count = 5;
  isHotOutside = true;

  // 'any' type can be assigned to any different data type
  // TRY TO AVOID, ESPECIALLY FOR SIMPLE/PRIMITIVE DATA TYPES
  // the following code isn't inherently bad, but it doesn't give us any of the advantages of TypeScript
  let anyTypeExample;
  anyTypeExample = "Jimmy";
  anyTypeExample = 6;
  anyTypeExample = false;

  // because we assigned myNumber to a number type (7), typescript INFERS that our myNumber variable is a number type.
  // therefore, myNumber CANNOT be assigned to another type
  let myNumber = 7;
  // let myNumber: number = 7
  // myNumber = "Seven!" // can't do this!

  let fruitArray: string[] = ["strawberry", "apple", "orange"];

  // you CAN dynamically type arrays like so...but it's not too common so don't worry about it! :D
  // let dynamicArray: [number, ...string[]] = [8, "orange", "strawberry"]

  /* Objects */
  // our fruit object needs a name (string) and a rating (number)
  let fruit: { name: string; rating: number };

  fruit = {
    name: "pineapple",
    rating: 9,
  };

  let fruitObjectArray: { name: string; rating: number }[];
  fruitObjectArray = [fruit, fruit];

  // Type Aliases
  // let us define our own custom types
  // the Fruit type is now reusable!
  type Fruit = {
    name: string;
    rating: number | string; // Union Type
  };

  // Union types allow us to specify if a type can be multiple different types

  let fruit2: Fruit = {
    name: "mango",
    rating: 8,
    // size: "small"
  };

  let fruit3: Fruit = {
    name: "peach",
    rating: "8",
  };

  let fruitTypeObjectArray: Fruit[];
  fruitTypeObjectArray = [fruit, fruit2, fruit3];

  /* TypeScript Functions */
  // void function - a function that doesn't return anything
  const sayHello = (name: string): void => {
    console.log("Hello " + name);
    // return name;
  };

  sayHello("Link");
  // sayHello(7)

  // we can type our return type
  const add = (a: number, b: number): number => {
    return a + b;
  };

  // declare the shape of our function WITHOUT defining a body
  // 2 functions with the same name but they take in different parameters

  // ***these function declarations tell you HOW you are allowed to write your function
  // ***in this case you can either write fruitInventoryCalc with 2 parameters or 1 parameter
  // *** you NEED these in order to use the different parameter options
  function fruitInventoryCalc(fruit: Fruit, quantity: number): void;
  function fruitInventoryCalc(fruit: Fruit | null): void;

  // building out our function
  // | union - can be multiple types (Fruit or null)
  // ? indicates an optional type so it could be there or NOT be there (quantity)
  // *** here is where we actually define what happens inside those functions that we defined before
  function fruitInventoryCalc(fruit: Fruit | null, quantity?: number) {
    if (fruit) {
      console.log(`Looks like you have a ${fruit.name}`);

      if (quantity) {
        console.log(`You have ${quantity} of your fruit!`);
      } else {
        console.log("You have exactly ONE of your fruit");
      }
    } else {
      console.log("no fruit :/");
    }
  }

  fruitInventoryCalc(fruit2, 5);
  fruitInventoryCalc(fruit3);
  fruitInventoryCalc(null);

  // Unknown type
  // any type is never going to help you out
  // it lets us write the following without warning us that we may get undefined data

  // const getFruitArraySize = (fruitList: any) => {
  //   console.log(`You have this many fruit in your array: ${fruitList.length}`)
  // }

  // unknown type actually warns us if we're going to do something that might result in dealing with undefined data
  // when you use the unknown type, typescript enforces type guarding
  // type guarding - checking to see if the unknown type you are working with is correct through conditional logic
  const getFruitArraySize = (fruitList: unknown) => {
    if (Array.isArray(fruitList)) {
      console.log(
        `You have this many fruit in your array: ${fruitList.length}`
      );
    } else {
      console.log("Hey, that's not an array!");
    }
  };
  getFruitArraySize(8);
  getFruitArraySize(fruitTypeObjectArray);

  return (
    <>
      <TodoList />
    </>
  );
}

export default App;
