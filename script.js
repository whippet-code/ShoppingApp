// imports
require("dotenv").config();
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

// Initialize Firebase
const DBConfig = {
  databaseURL: process.env("DATABASE_URL"),
};

const app = initializeApp(DBConfig);
const db = getDatabase(app);
const dbRef = ref(db, "shoppingList");

// Add item to DB
const addItem = (item) => {
  push(dbRef, item);
};

// Remove item from DB
const removeItem = (id) => {
  remove(ref(db, `shoppingList/${id}`));
};

// Get items from DB
const getItems = () => {
  shoppingList.innerHTML = "";
  onValue(dbRef, (snapshot) => {
    let data = snapshot.val();
    let allItems = Object.entries(data);
    allItems.forEach((item) => {
      shoppingList.innerHTML += appendItem(item);
    });
  });
};

// Append item to html
const appendItem = (item) => {
  return `<li id=${item[0]}>${item[1]}</li>`;
};

//clear input field
const clearInput = () => {
  userInput.value = "";
};

// set up html elements
const addBtn = document.getElementById("add-to-list");
const userInput = document.getElementById("item-to-add");
const shoppingList = document.getElementById("shopping-list");

// add event listener to add button
addBtn.addEventListener("click", () => {
  const userInputValue = userInput.value;
  //clear input field
  clearInput();
  //add item to db
  addItem(userInputValue);
  //get items from db
  getItems();
});

// event listener function to add to each list item when added
shoppingList.addEventListener("click", (e) => {
  let id = e.target.id;
  removeItem(id);

  //get items from db
  getItems();
});

getItems();
