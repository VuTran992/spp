$(document).ready(function () {

    const x = (x, y) => x * y;

    const test = x(4, 5);

    const letters = new Set();
    letters.add("a");
    letters.add("b");
    letters.add("c");
    letters.add("d");
    console.log(letters.size);
});