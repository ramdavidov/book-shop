'use strict'

function onInit() {
    renderBooks()
    renderBooksPagesBtn()
}

// Render books table:
function renderBooks() {
    var elBooks = document.querySelector('.books-container')
    var books = getBooksForDisplay()
    var booksStr = ''
    books.forEach(book => {
        var bookStr = `<tr>
        <td>${book.name}</td>
        <td>${formatCurrency(book.price)}</td>
        <td><img class="book-cover" src="img/${book.imgUrl}.png" /></td>
        <td><button class="btn btn-info" data-trans="read" onclick="onShowDetails(${book.id})">📋 Read</button></td>
        <td><button class="btn btn-warning" data-trans="update" onclick="onUpdateBook(${book.id})">✏️ Edit</button></td>
        <td><button class="btn btn-danger"data-trans="delete" onclick="onRemoveBook(${book.id})">❌ Delete</button></td>
        </tr>`
        booksStr += bookStr
    })
    elBooks.innerHTML = `<table class="table table-striped table-dark books-table">
    <thead><tr><th data-trans="book-name" onclick="onSortBooks('name')">Name:</th><th data-trans="book-price" onclick="onSortBooks('price')">Price:</th><th data-trans="book-cover">Cover:</th><th data-trans="actions" colspan="3">Actions:</th></tr></thead>
    <tbody>` + `${booksStr}` + `</table></tbody>`
    renderBooksPagesBtn()
    doTrans()
}

// Render button per page:
function renderBooksPagesBtn() {
    var elBtns = document.querySelector('.page-num-container')
    var amount = getBooksLength()
    var btnStrs = ''
    for (var i = 0; i < amount; i++) {
        var btnStr = `<button class="page-btn prev-page btn btn-light mr-1" onclick="onGoToPage(${i})">${i + 1}</button>`
        btnStrs += btnStr
    }
    elBtns.innerHTML = btnStrs
}

// Render basic Modal:
function renderModal(bookId = '') {
    var $elModalContainer = $('.book-modal-container')
    $elModalContainer.html(`
        <div class="modal fade book-details-modal" id="staticBackdrop" data-id="${bookId}" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="staticBackdropLabel"></h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-trans="button-close" data-dismiss="modal">Close</button>
                </div>
              </div>
            </div>
          </div>
        `)
    doTrans()
}

// Render 'save' & 'new book' type to the modal:
function renderSaveBookContent() {
    var elBookName = document.querySelector('.modal-title')
    var elModalBody = document.querySelector('.modal-body')
    var elFooter = document.querySelector('.modal-footer')

    elModalBody.classList.add('row-12', 'justify-content-center')
    elBookName.innerText = 'Save Book'
    elBookName.dataset.trans = 'book-save'
    elModalBody.innerHTML = `
        <h6 data-trans="book-name">Book name:</h6>
        <input class="save-book save-book-name" data-trans="book-name" type="text" placeholder="Book name:" />
        <h6 data-trans="book-price">Price:</h6>
        <input class="save-book save-book-price" data-trans="book-price" type="text" placeholder="Price:" />
        <h6 data-trans="book-cover">Book cover:</h6>
        <input class="save-book save-book-img" data-trans="book-cover" type="text" placeholder="Cover index:" />`

    elFooter.innerHTML = `
        <button type="button" class="btn btn-secondary" data-trans="button-close" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" data-trans="book-save" data-dismiss="modal" onclick="onSaveBook()">Save book</button>`
}

// Render 'read' type to the modal:
function onShowDetails(bookId) {
    var book = findBook(bookId)
    renderModal(bookId)
    var elBookName = document.querySelector('.modal-title')
    var elModalBody = document.querySelector('.modal-body')
    elModalBody.classList.add('row')
    elBookName.innerText = book.name
    elModalBody.innerHTML = `
        <div class="col">
            <div><span data-trans="book-price">'Price:'</span> ${formatCurrency(book.price)}</div>
                <i class="far fa-plus"></i>
            <div class="mt-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate culpa alias consequuntur ut atque quod excepturi! Quam earum possimus iure nam doloremque ab quia minus eveniet perferendis facere, ullam consequuntur!</div>
            <div class="rate-container mt-4">
                <div class="rating mr-3" data-trans="book-rating">Rating:</div>
                <button class="value-button" onclick="onDecreaseValue()">-</button>
                <div class="value-number">${book.rate}</div>
                    <button class="value-button" onclick="onIncreaseValue()">+</button>
                </div>
            </div>
            <div class="m-2">
            <img class="details-img" src="img/${book.imgUrl}.png" />
        </div>`
    modalToggle()
    doTrans()
}

// Toggles the modal (to do: change from jQuery to dqs)
function modalToggle() {
    var $elModal = $('.modal')
    $elModal.modal('toggle')
}

// Changes the current lang. adds rtl to boddy if 'he':
function onSetLang(lang) {
    setLang(lang);
    if (lang === 'he') {
        document.body.classList.add('rtl')
        document.body.classList.add('text-right')
    } else {
        document.body.classList.remove('rtl')
        document.body.classList.add('text-right')
    }
    renderBooks()
}

// Updating / creadting book:
function onSaveBook() {
    var elModal = document.querySelector('.book-details-modal')
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
    modalToggle()
    elBookName.value = ''
    elBookPrice.value = ''
    elBookImg.value = ''
}

// 'Add new book':
function onAddBook() {
    renderModal()
    renderSaveBookContent()
    doTrans()
    modalToggle()
}

// 'Edit' book:
function onUpdateBook(bookId) {
    renderModal()
    renderSaveBookContent()
    var elModal = document.querySelector('.book-details-modal')
    var elBookName = document.querySelector('.save-book-name')
    var elBookPrice = document.querySelector('.save-book-price')
    var elBookImg = document.querySelector('.save-book-img')
    var elModal = document.querySelector('.modal-title')
    // elModal.classList.add('data-trans="book-name"')
    elModal.dataset.id = bookId
    var book = findBook(bookId)
    elBookName.value = book.name
    elBookPrice.value = book.price
    elBookImg.value = book.imgUrl
    modalToggle()
    doTrans()
}

function onRemoveBook(bookId) {
    removeBook(bookId)
    renderBooks()
}

// Go to specific page:
function onGoToPage(pageNum) {
    goToPage(pageNum)
    renderBooks()
}

// 'Next' / 'Prev' page:
function onChangePage(diff) {
    changePage(diff)
    renderBooks()
}

function onSortBooks(sortBy) {
    sortBooks(sortBy)
    renderBooks()
}

// handles changing 'Rating':
function onIncreaseValue() {
    var elModal = document.querySelector('.book-details-modal')
    var elRate = document.querySelector('.value-number')
    var bookId = elModal.dataset.id
    increaseValue(bookId)
    var book = findBook(+bookId)
    elRate.innerText = book.rate

}

function onDecreaseValue() {
    var elModal = document.querySelector('.book-details-modal')
    var elRate = document.querySelector('.value-number')
    var bookId = elModal.dataset.id
    decreaseValue(bookId)
    var book = findBook(+bookId)
    elRate.innerText = book.rate
}