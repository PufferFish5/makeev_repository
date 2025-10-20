let cool_library = [
{ title: "To Kill a Mockingbird", author: "Harper Lee", year: 1960, genre: "Classic", available: true },
{ title: "The Great Gatsby", author: "F. Scott Fitzgerald", year: 1925, genre: "Classic", available: false },
{ title: "Pride and Prejudice", author: "Jane Austen", year: 1813, genre: "Romance", available: true },
{ title: "The Hobbit", author: "J. R. R. Tolkien", year: 1937, genre: "Fantasy", available: true },
{ title: "The Catcher in the Rye", author: "J. D. Salinger", year: 1951,genre: "Coming-of-age", available: false }
];

function addb(library, newBook) {
library.push(newBook);
console.log(`Book ${newBook.title} is added to library`)
};

function delb(library, book_title) {
let book_id = library.findIndex (book => book.title === book_title); 
if (book_id !== -1) {
    library.splice(book_id, 1);
    console.log(`Book ${book_title} is deleted from library`); 
} else {
    console.log(`Book ${book_title} doesn't exist in library`)};
};

function searchb(library, book_title) {
let book_id = library.findIndex (book => book.title ===book_title); 
if (book_id !== -1) {
    console.log(`Book ${book_title} currently at position ${book_id + 1}`); 
} else {
    console.log(`Book ${book_title} doesn't exist in library`)};
};

function countb(library) {
    console.log(`Currently library have ${library.length} books`);
}

function in_stockb(library, book_title) {
    let book_id = library.findIndex(book => book.title === book_title);
    let check = 0;
    if (library[book_id].available) {
        console.log(`Book is available`);
        check = 1;
    } else {
        console.log(`Book is unavailable`);
    }
}

function upd_stockb(library, book_title, upd) {
    let book_id = library.findIndex(book => book.title === book_title);
    check = library[book_id].available;

    if (upd) {
        if (check) { // otdat
            console.log(`Book already in stock`);
        } else {
            console.log(`Book returned`);
            library[book_id].available = true;
        }
    } else {
        if (check) { // zabrat
            console.log(`Book claimed`);
            library[book_id].available = false;
        } else {
            console.log(`Book isn't in stock`);
        }
    }
}


const new_book = { title: "шерлок Xолмс", author: "Артур конан Дойл", уear: 1887, genre: "Детектив", available: true };
addb(cool_library, new_book);
delb(cool_library, "The Hobbit")
searchb(cool_library, "The Catcher in the Rye")
countb(cool_library)
in_stockb(cool_library, "The Great Gatsby")
upd_stockb(cool_library, "To Kill a Mockingbird", true)