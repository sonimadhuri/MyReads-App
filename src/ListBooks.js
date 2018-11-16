import React, {Component} from "react"
import PropTypes from "prop-types"

class ListBooks extends Component{

	static propTypes =  {
		books: PropTypes.array.isRequired,
		changeShelf: PropTypes.func.isRequired,
	}

	render(){
		const {books,changeShelf} = this.props;
		return (
			<ol className="books-grid">
			{ books.length>0 && ( 
			books.map((book,index) => (
			<li key={index}>
				<div className="book">
					<div className="book-top">
					{/* Lets the search work properly if the book does not have a thumbnail */}
					{book.imageLinks && (
						<div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${ book.imageLinks.thumbnail})` }}></div>
					)}
					<div className="book-shelf-changer">
						<select onChange={function(e){changeShelf(book,e.target.value)}} value={book.shelf?book.shelf:"none"}>
							<option value="move" disabled>Move to...</option>
							<option value="currentlyReading">Currently Reading</option>
							<option value="wantToRead">Want to Read</option>
							<option value="read">Read</option>
							<option value="none">None</option>
						</select>
					</div>
					</div>
					<div className="book-title">{book.title}</div>
					<div className="book-authors">
						{book.authors}
					</div>
				</div>
			</li>
			)))}
			</ol>
		)
	}
}

export default ListBooks