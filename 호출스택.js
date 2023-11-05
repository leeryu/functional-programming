function asyncFunction(task, delay) {
  setTimeout(function () {
    console.log(task);
    if (delay > 100) {
      asyncFunction("Task " + (delay - 100), delay - 100);
    }
  }, delay);
}

console.log("Start");

asyncFunction("Task 500", 500);

console.log("End");
