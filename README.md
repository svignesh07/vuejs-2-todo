# vuejs-2-todo

> An aesthetically pleasing and fully responsive todo list built with Vue.js 2 and Materialize

## Build Setup

Steps 1, 2, and 3 are mandatory for the functioning of the app.

``` bash
# install dependencies
1. npm install

# serve with hot reload at localhost:8080
2. npm run dev

# To run json-server locally
3. npm run server

# run unit tests
npm run unit

# run all tests
npm test
```

Some Test Usernames to login into the app -
Bret, Antonette, Samantha, Karianne, Kamren, Delphine, Moriah.Stanton

Useful Notes -

1. A fake API is created with our own data using JSONPlaceholder. Read more about it here - (https://jsonplaceholder.typicode.com/).
_Note_: the resource will not be created updated or deleted from their server but it will be faked as if. Therefore I have chosen to create a fake API to persist data (todo items).
2. User is logged in into the app when the username exists in the Database.json file which resides in the root directory. Database.json contains a json with 2 keys a)users and their b) todos.
3. User's details are stored in the localStorage to simulate Login.
4. A user can add an item in the list, logout and come back anytime to see all of his/her todo items
5. A task's state can be changed to "completed" or "pending".
6. Logout button removes the currentUser item from localStorage.