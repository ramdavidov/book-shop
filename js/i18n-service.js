var gCurrLang = 'en'
var gTrans = {
    title: {
        en: 'BookShop',
        he: 'חנות ספרים'
    },
    'add-new-book': {
        en: '➕ Add new book',
        he: '➕ הוסף ספר חדש',
    },
    'page-next': {
        en: 'NEXT',
        he: 'הבא',
    },
    'page-prev': {
        en: 'PREV',
        he: 'הקודם',
    },
    read: {
        en: '📋 Read',
        he: '📋 עיין',
    },
    update: {
        en: '✏️ Edit',
        he: '✏️ ערוך',
    },
    delete: {
        en: '❌ Delete',
        he: '❌ הסר',
    },
    'book-name': {
        en: 'Name:',
        he: 'שם:',
    },
    'book-price': {
        en: 'Price:',
        he: 'מחיר:',
    },
    'book-cover': {
        en: 'Cover:',
        he: 'כריכה:',
    },
    'book-rating': {
        en: 'Rating:',
        he: 'דירוג:',
    },
    'book-save': {
        en: 'Save book',
        he: 'שמור ספר',
    },
    actions: {
        en: 'Actions:',
        he: 'פעולות:',
    },
    'button-close': {
        en: 'Close',
        he: 'סגור',
    }
}

// QS for all data items
function doTrans() {
    // For each el get the data-trans and use getTrans to replace the innerText 
    var els = document.querySelectorAll('[data-trans]');
    els.forEach(el => {
        var txt = getTrans(el.dataset.trans);
        // If this is an input, translate the placeholder
        if (el.placeholder) el.placeholder = txt;
        else el.innerText = txt;
    })
}

function getTrans(transKey) {
    var langMap = gTrans[transKey]
    if (!langMap) return 'UNKNOWN';
    var txt = langMap[gCurrLang]
    // If translation not found - use english
    if (!txt) txt = langMap['en'];
    return txt;
}

function setLang(lang) {
    gCurrLang = lang;
}

// temp utils

function formatNumOlder(num) {
    return num.toLocaleString('es')
}

function formatNum(num) {
    return new Intl.NumberFormat(gCurrLang).format(num);
}


function formatCurrency(num) {
    if (gCurrLang === 'he') {
        var exchangeToNis = num * 3.5 
        return new Intl.NumberFormat('he-IL',{ style: 'currency', currency: 'ILS' }).format(exchangeToNis);
    } else {
        return new Intl.NumberFormat('en-US',{ style: 'currency', currency: 'USD' }).format(num);
    }
    
}

function formatDate(time) {
    var options = {
        year: 'numeric', month: 'short', day: 'numeric',
        hour: 'numeric', minute: 'numeric',
        hour12: true,
    };
    return new Intl.DateTimeFormat(gCurrLang, options).format(time);
}

function kmToMiles(km) {
    return km / 1.609;
}