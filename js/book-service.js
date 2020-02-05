'use strict'

const KEY = 'books'
const BOOKS_IN_PAGE = 3;
var gCurrPage = 1;
var gBooks = _createBooks()
saveBooks()

function goToPage(pageNum) {
    gCurrPage = pageNum + 1
}

function getBooksForDisplay() {
    var from = (gCurrPage - 1) * BOOKS_IN_PAGE;
    var to = from + BOOKS_IN_PAGE;
    return gBooks.slice(from, to);
}

function getBooksLengthSelect() {
    gCurrPage = 1
    return gBooks.length
}

function getBooksLength() {
    var length = gBooks.length
    var numOfPages = Math.ceil(length / BOOKS_IN_PAGE)
    return numOfPages
}

function changePage(diff) {
    gCurrPage += diff;
    var lastPage = Math.ceil(gBooks.length / BOOKS_IN_PAGE);
    if (gCurrPage > lastPage) gCurrPage = 1;
    else if (gCurrPage < 1) gCurrPage = lastPage;

}

function sortBooks(sortBy) {
    if (sortBy === 'price') {
        gBooks.sort(function (a, b) { return a.price - b.price });
    }
    if (sortBy === 'name') {
        gBooks.sort(function (a, b) {
            var lowA = a.name.toLowerCase()
            var lowB = b.name.toLowerCase()

            if (lowA < lowB) { return -1; }
            if (lowA > lowB) { return 1; }
            return 0;
        })
    }
}

function increaseValue(bookId) {
    var book = findBook(+bookId)
    if (book.rate >= 10) return
    book.rate++
    saveToStorage(KEY, gBooks)
}

function decreaseValue(bookId) {
    var book = findBook(+bookId)
    if (book.rate <= 0) return
    book.rate--
    saveToStorage(KEY, gBooks)
}

function addBook(name, price, imgUrl) {
    var book = { name: name, price: price, imgUrl: imgUrl }
    var newBook = _createBook(book)
    gBooks.push(newBook)
    saveToStorage(KEY, gBooks)
}

function updateBook(bookId, name, price, imgUrl) {
    var book = findBook(+bookId)
    book.name = name
    book.price = price
    book.imgUrl = imgUrl
    saveToStorage(KEY, gBooks)
}

function findBook(bookId) {
    var findBook = gBooks.find(book => {
        return bookId === book.id
    })
    return findBook
}

function removeBook(bookId) {
    var idx = gBooks.findIndex(book => {
        return bookId === book.id
    })
    gBooks.splice(idx, 1);
    saveToStorage(KEY, gBooks)
}

function saveBooks() {
    saveToStorage(KEY, gBooks)
}

function _createBooks() {
    var books = loadFromStorage(KEY);
    if (books) return books;

    var books = [
        { name: 'Catch-22', price: '50', imgUrl: '1' },
        { name: 'The Old Man and the Sea', price: '60', imgUrl: '2' },
        { name: '1984', price: '39', imgUrl: '3' },
        { name: 'If This Is a Man', price: '44', imgUrl: '4' },
        { name: 'The Catcher in the Rye', price: '68', imgUrl: '5' },
        { name: 'Kafka on the Shore', price: '81', imgUrl: '6' },
        { name: 'Lord of the Flies', price: '43', imgUrl: '7' }

    ]
        .map(_createBook)
    return books
}

function _createBook(book) {
    var book = {
        id: parseInt(Math.random() * 1000),
        name: book.name,
        price: book.price,
        imgUrl: book.imgUrl,
        rate: 0
    }
    return book
}