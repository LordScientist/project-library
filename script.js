let library = document.getElementById('library');
let dialog = document.getElementById('bookCreation');
let newBookCreation = document.getElementById('newBookCreation');
let form = document.getElementById('fillings');




let myLibrary = [];

//constructor
function Book(title,author,pages,read)
    {
        this.id = crypto.randomUUID();
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }

Book.prototype.toggleRead = function()
    {
        this.read = !this.read;
    }

// create book and add to library
function addBookToLibrary(title,author,pages,read)
    {
        let newBook = new Book(title,author,pages,read);
        myLibrary.push(newBook);
        
        bookDisplay();
    }

function bookDisplay()
    {
        library.innerHTML = "";    
        myLibrary.forEach
            (element => 
                {
                    let wrapper = document.createElement('div');
                    wrapper.classList.add('card');
                    wrapper.dataset.id = element.id;
                    let bookTitle = document.createElement('h3');
                    let bookAuthor = document.createElement('p');
                    let bookPages = document.createElement('p');
                    let bookRead = document.createElement('button');
                    let removeBook = document.createElement('button');
                    removeBook.classList.add('remove');
                    bookRead.classList.add('read-status');
                    bookTitle.textContent = element.title;
                    bookAuthor.textContent = element.author;
                    bookPages.textContent = element.pages;
                    bookRead.textContent = element.read ? "Read" : "Unread";
                    removeBook.textContent = "Remove Book"; 
                    wrapper.append(bookTitle,bookAuthor,bookPages,bookRead);
                    library.append(wrapper);
                    wrapper.append(removeBook);

                    removeBook.addEventListener('click',(event) => 
                        {
                            let clickedId = event.target.closest('div').dataset.id;
                            myLibrary = myLibrary.filter(book => book.id !== clickedId);
                            bookDisplay();
                                
                        })

                    bookRead.addEventListener('click',() => 
                        {
                            element.toggleRead();
                            bookDisplay();
                        })
                }
            );

    }

const starterBooks = [
    { title: "The Hobbit", author: "J.R.R. Tolkien", pages: 295, read: true },
    { title: "Dune", author: "Frank Herbert", pages: 412, read: false },
];

starterBooks.forEach(book => addBookToLibrary(book.title, book.author, book.pages, book.read));

newBookCreation.addEventListener("click",() => 
    {
        form.reset();
        dialog.showModal();
    }
)

form.addEventListener("submit",(event) => 
    {
        event.preventDefault();
        addBookToLibrary(form.title.value,form.author.value,form.pages.value,form.readTrue.checked);
        dialog.close();
    }
);


