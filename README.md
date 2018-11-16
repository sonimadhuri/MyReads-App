# MyReads Project

The MyReads project is a bookshelf app that allows you to select and categorize books you have read, are currently reading, or want to read. The app also has a search functionality with which you can search from a large collection of books and categorize them for further reading.

## Installing and launching the app
To run this app on your local system follow these steps(these steps assumes you have node and npm installed):
    - Download the project and navigate to the project directory 
    - run  `npm install` in terminal to download the project dependencies listed in package.json file
    - run  `npm start` to run the server and the app is launched automatically in your default browser.

## Dependencies 
    Note: These dependencies will be automamtically installed when you run the `npm install`
    -"escape-string-regexp": "^1.0.5",
    -"prop-types": "^15.6.1",
    -"react": "^16.3.2",
    -"react-dom": "^16.3.2",
    -"react-router-dom": "^4.3.1",
    -"sort-by": "^1.2.0"

## Backend Server

To simplify your development process, we've provided a backend server for you to develop against. The provided file [`BooksAPI.js`](src/BooksAPI.js) contains the methods you will need to perform necessary operations on the backend:

* [`getAll`](#getall)
* [`update`](#update)
* [`search`](#search)

### `getAll`

Method Signature:

```js
getAll()
```

* Returns a Promise which resolves to a JSON object containing a collection of book objects.
* This collection represents the books currently in the bookshelves in your app.

### `update`

Method Signature:

```js
update(book, shelf)
```

* book: `<Object>` containing at minimum an `id` attribute
* shelf: `<String>` contains one of ["wantToRead", "currentlyReading", "read"]  
* Returns a Promise which resolves to a JSON object containing the response data of the POST request

### `search`

Method Signature:

```js
search(query)
```

* query: `<String>`
* Returns a Promise which resolves to a JSON object containing a collection of a maximum of 20 book objects.
* These books do not know which shelf they are on. They are raw results only. You'll need to make sure that books have the correct state while on the search page.

## Important
The backend API uses a fixed set of cached search results and is limited to a particular set of search terms, which can be found in [SEARCH_TERMS.md](SEARCH_TERMS.md). That list of terms are the _only_ terms that will work with the backend, so don't be surprised if your searches for Basket Weaving or Bubble Wrap don't come back with any results.
