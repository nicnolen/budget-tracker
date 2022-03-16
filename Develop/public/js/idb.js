// Create variable to hold db connection
let db;
// Establish a connection to IndexedDB database called
const request = indexedDB.open('budget_tracker', 1);

// This event will emit if the database version changes (nonexistant to version 1, v1 to v2, etc.)
request.onupgradeneeded = function (event) {
  // save a reference to the database
  const db = event.target.result;
  // create an object store (table) called `budget_tracker`, set it to have an auto incrementing primary key of sorts
  db.createObjectStore('budget_tracker', { autoIncrement: true });
};
