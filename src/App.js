import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import ListBooks from './ListBooks'
import SearchBook from './SearchBook'

class BooksApp extends React.Component {
  state = {
    books: []
  }

  componentDidMount(){
    BooksAPI.getAll().then((books)=> {
      this.setState({
        books: books
      })
    });
  }

  // Call the booksAPIs update method to change the shelf and re-render the component
  changeShelf = (book,newShelf) => {
    BooksAPI.update(book,newShelf).then(()=>{
      BooksAPI.getAll().then((books)=> {
        this.setState({
          books: books
        })
      });
    });
  }

  render() {
    return (
      <Router forceRefresh="true">
      <div className="app">
      <Route exact path="/" render={()=>(
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
                  <div className="bookshelf-books">
                    <ListBooks books={this.state.books.filter(book=> (book.shelf === "currentlyReading"))} changeShelf={this.changeShelf} /> 
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <div className="bookshelf-books">
                    <ListBooks books={this.state.books.filter(book=> (book.shelf === "wantToRead"))} changeShelf={this.changeShelf} /> 
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <div className="bookshelf-books">
                  <ListBooks books={this.state.books.filter(book=> (book.shelf ==="read"))} changeShelf={this.changeShelf} /> 
                  </div>
                </div>
              </div>
            </div>
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
        </div>
       )} />
        <Route path="/search" render ={()=>(
         <SearchBook/>
        )} 
        />
        </div>
      </Router>      
    )
  }
}

export default BooksApp
