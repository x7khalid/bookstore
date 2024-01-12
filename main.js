/*
  Bookstore Project
  1. Add, edit, delete books and view their information.
  2. The ability to inquire about a book
  3. Sell book and export invoice
*/

let books = [];
let receiptId = 0;

function addBook(id, title, author, price, quantity) {
  books.push([id, title, author, price, quantity]);
}

function deleteBook(bookIndex) {
  let leftPart = books.slice(0, bookIndex);
  let rightPart = books.slice(bookIndex + 1);
  let book = books[bookIndex];
  books = leftPart.concat(rightPart);
  return book;
}

function searchBookById(id) {
  for (let i = 0; i < books.length; i++) {
    if (books[i][0] == id) {
      return i;
    }
  }
  return -1;
}

function searchBookByTitle(title) {
  for (let i = 0; i < books.length; i++) {
    if (books[i][1] == title) {
      return i;
    }
  }
  return -1;
}

function searchBookByAuthor(author) {
  for (let i = 0; i < books.length; i++) {
    if (books[i][2] == author) {
      return i;
    }
  }
  return -1;
}

function printReceipt(bookTitle, price, quantity, booksPrice) {
  console.log(`
  Receipt Id: \t${++receiptId}
  Book: \t${bookTitle}
  Price: \t${price}
  Quantity: \t${quantity}
  Total Price: \t${booksPrice}`);
}

/*
  This function takes the book title, quantity, and the customer balance.
  It sells the book and prints a receipt if done successfully.
*/
function sellBook(bookTitle, quantity, balance) {
  let bookIndex = searchBookByTitle(bookTitle);
  if (bookIndex == -1) { // check if the book exists.
    console.log(`"${bookTitle}" is unavailable in the bookstore.`);
    return;
  }
  let book = books[bookIndex];
  if (quantity > book[3]) {  // check if the book quantity needed is available.
    console.log(
      `The quantity you are asking for is unavailable, we only have ${book[3]}`
    );
    return;
  }
  let booksPrice = quantity * book[4]; // calculate the price of the books.
  if (booksPrice > balance) { // check if customer balance is sufficient.
    console.log(
      `Your balance is insufficient. The price of books is ${booksPrice}`
    );
    return;
  }
  book[4] -= quantity; // remove the books from the bookstore;
  // print a receipt
  printReceipt(bookTitle, book[3], quantity, booksPrice);
}

/* Here we add a sample of the books in the bookstore */
addBook(1, "Start with why", "Simon Sinek", 80.0, 13);
addBook(2, "But how do it know", "J. Clark Scott", 59.9, 22);
addBook(3, "Clean Code", "Robert Cecil Martin", 50.0, 5);
addBook(4, "Zero to One", "Peter Thiel", 45.0, 12);
addBook(5, "You don't know JS", "Kyle Simpson", 39.9, 9);

/* Here we sell one of the books and print a receipt if done successfully */
sellBook("Start with why", 3, 240);

console.log(deleteBook(0)); // delete the book and display it.
console.log(books); // print the books list.
