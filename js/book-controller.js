'use strict'

function onInit() {
    renderBooks()
    renderBooksPagesBtn()
}

function renderBooks() {
    var elBooks = document.querySelector('.books-container')
    var books = getBooksForDisplay()
    var booksStr = ''
    books.forEach(book => {
        var bookStr = `<tr>
        <td>${book.name}</td>
        <td>${book.price}$</td>
        <td><img class="book-cover" src="img/${book.imgUrl}.png" /></td>
        <td><button onclick="onShowDetails(${book.id})">📋 Read</button></td>
        <td><button onclick="onUpdateBook(${book.id})">✏️ Update</button></td>
        <td><button onclick="onRemoveBook(${book.id})">❌ Delete</button></td>
        </tr>`
        booksStr += bookStr
    })
    elBooks.innerHTML = `<table class="books-table">
    <thead><th onclick="onSortBooks('name')">Name:</th><th onclick="onSortBooks('price')">Price:</th><th>Cover:</th><th colspan="3">Actions:</th></thead>
    <tbody>` + `${booksStr}` + `</table></tbody>`
    renderBooksPagesBtn()
}

function renderBooksPagesBtn() {
    var elBtns = document.querySelector('.page-num-container')
    var amount = getBooksLength()
    var btnStrs = ''
    for (var i = 0; i < amount; i++) {
        var btnStr = `<button class="page-btn prev-page" onclick="onGoToPage(${i})">${i + 1}</button>`
        btnStrs += btnStr
    }
    elBtns.innerHTML = btnStrs
}

function onGoToPage(pageNum) {
    goToPage(pageNum)
    renderBooks()
}

function onChangePage(diff) {
    changePage(diff)
    renderBooks()
}

function onSortBooks(sortBy) {
    sortBooks(sortBy)
    renderBooks()
}

function onIncreaseValue() {
    var elModal = document.querySelector('.book-details')
    var elRate = document.querySelector('.value-number')
    var bookId = elModal.dataset.id
    increaseValue(bookId)
    var book = findBook(+bookId)
    elRate.innerText = book.rate

}

function onDecreaseValue() {
    var elModal = document.querySelector('.book-details')
    var elRate = document.querySelector('.value-number')
    var bookId = elModal.dataset.id
    decreaseValue(bookId)
    var book = findBook(+bookId)
    elRate.innerText = book.rate
}

function onShowDetails(bookId) {
    var elModal = document.querySelector('.book-details')
    var elBookName = document.querySelector('.details-name')
    var elBookPrice = document.querySelector('.details-price')
    var elBookRate = document.querySelector('.value-number')
    var elBookImg = document.querySelector('.details-img')
    elModal.dataset.id = bookId
    elModal.style.display = 'block'
    var book = findBook(bookId)
    elBookName.innerText = book.name
    elBookPrice.innerText = 'Book price: ' + book.price +'$'
    elBookRate.innerText = book.rate
    elBookImg.src = `img/${book.imgUrl}.png`
}

function closeDetails() {
    var elModal = document.querySelector('.book-details')
    elModal.style.display = 'none'
}

function onSaveBook() {
    var elModal = document.querySelector('.book-modal')
    var elBookName = document.querySelector('.save-book-name')
    var elBookPrice = document.querySelector('.save-book-price')
    var elBookImg = document.querySelector('.save-book-img')
    var name = elBookName.value
    var price = elBookPrice.value
    var imgUrl = elBookImg.value
    if (!name || !price || !imgUrl) return
    var bookId = elModal.dataset.id
    if (bookId) {
        updateBook(bookId, name, price, imgUrl)
    } else {
        addBook(name, price, imgUrl)
    }
    renderBooks()
    toggleModal()
    elBookName.value = ''
    elBookPrice.value = ''
    elBookImg.value = ''
}

function onAddBook() {
    var elModal = document.querySelector('.book-modal')
    elModal.dataset.id = ''
    toggleModal()
}


// updates the modal to work for updating book.
function onUpdateBook(bookId) {
    var elModal = document.querySelector('.book-modal')
    var elBookName = document.querySelector('.save-book-name')
    var elBookPrice = document.querySelector('.save-book-price')
    var elBookImg = document.querySelector('.save-book-img')
    elModal.dataset.id = bookId
    var book = findBook(bookId)
    elBookName.value = book.name
    elBookPrice.value = book.price
    elBookImg.value = book.imgUrl
    toggleModal()
}


function toggleModal() {
    var elModal = document.querySelector('.book-modal')

    if (elModal.style.display === 'none' || elModal.style.display === '') {
        elModal.style.display = 'flex'
    } else {
        elModal.style.display = 'none'
    }
}

function onRemoveBook(bookId) {
    removeBook(bookId)
    renderBooks()
}




//Page select: need to fix page '1' bug

// function onBooksInPageChanged(booksInPage) {
//     booksInPageChanged(booksInPage)
//     renderBooks()
// }

// function renderBooksInPageSelect() {
//     var elSelect = document.querySelector('.books-in-page-select')
//     var amount = getBooksLengthSelect()
//     var selectStrs = ''
//     for (var i = 1; i <= amount; i++) {
//         var selectStr = `<option>${i}</option>`
//         selectStrs += selectStr
//     }
//     elSelect.innerHTML = selectStrs
// }