import React, {Component} from 'react'
import * as BooksAPI from './BooksAPI'
import {Link} from 'react-router-dom'
import ListBooks from './ListBooks';

class SearchBook extends Component {

	state = {
		query: '',
		books: [],
		invalidQuery: false,
	}

	/**FilteredBooks holds the final list of books that are to be shown in the search results */
	filteredBooks = [];
	booksInShelfAndQuery = []

	/**
	 * Filter books that are already present in one of the 3 shelves from the books array.
	 * Add those books with appropriate shelf name and set the state
	 */
	filterResults = (books) =>{
		this.booksInShelfAndQuery = [];
		let bookPresent = false;
		BooksAPI.getAll().then((booksInShelf)=> {
			this.filteredBooks = books.filter((book)=>{
				bookPresent = false;
				booksInShelf.map(bookShelf => {
					if(bookShelf.id === book.id){
						bookPresent = true;
						this.booksInShelfAndQuery.push(bookShelf);
					}
				})
				if(bookPresent)
				return false
				return true
			})
			this.filteredBooks = this.booksInShelfAndQuery.concat(this.filteredBooks);
			this.setState({
				books: this.filteredBooks,
				invalidQuery: false
			})
		});
	}


	updateQuery = (query) => {
		this.setState ({
			query: query
		});
		BooksAPI.search(query).then((books) => {
			if(!books){
				this.setState({
					query: '',
					books: []
				})
			}
			//Happens when few pieces of data are missing(Eg: missing thumbnail images for books)
			else if(books.error){
				this.setState({
					invalidQuery: true
				})	
			}
			else {
				this.filterResults(books);
			}
		})
	}


	changeShelf = (book,newShelf) => {
		BooksAPI.update(book,newShelf).then(()=>{
		  this.updateQuery(this.state.query)
		});
	  }

	render () {
		return (
		
		<div className="search-books">
			<div className="search-books-bar">
			<Link className="close-search" to="/">Close</Link>
			<div className="search-books-input-wrapper">
				<input type="text" 
							 placeholder="Search by title or author" 
							 value={this.state.query} 
							 onChange={(event) => this.updateQuery(event.target.value)}
				/>
			</div>
			</div>
			{!this.state.invalidQuery && (
				<div className="search-books-results">
				<ol className="books-grid">
					<ListBooks books={this.state.books} changeShelf={this.changeShelf} />
				</ol>
				</div>
			)}
			{this.state.invalidQuery && (
				<div className="search-books-results">
					<div className="no-results-found">
						<p className="error-line">
							No results found <span>:(</span>
						</p>
						<p>We couldn't find any book matching your search</p>
					</div>
				</div>
			)}
		</div> 
		)}
}

export default SearchBook