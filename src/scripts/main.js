const BASE_URL = 'https://books-api.dicoding.dev';
const xhr = new XMLHttpRequest();

function main() {

  const getBook = async () => {
    // tuliskan kode di sini!
    // use fetch
    try {
      const response = await fetch(`${BASE_URL}/list`);
      const toJson = await response.json();
      
      renderAllBooks(toJson?.books)
    } catch (error) {
      showResponseMessage(error.message)
    }


    // use xhr
    // menetapkan callback jika response yang dihasilkan sukses atau error
    // xhr.onload = function() {
    //   const responseJSON = JSON.parse(this.responseText);

    //   if(responseJSON.error){
    //     showResponseMessage(responseJSON.message)
    //   } else {
    //     renderAllBooks(responseJSON.books)
    //   }
    // }

    // xhr.onerror = function() {
    //   showResponseMessage();
    // }

    // // membuat GET request
    // xhr.open('GET', `${BASE_URL}/list`);

    // // mengirim request
    // xhr.send();
  };


  const insertBook = async (book) => {
    // tuliskan kode di sini!

    // xhr
    // xhr.onload = function() {
    //   const responseJSON = JSON.parse(this.responseText);
    //   showResponseMessage(responseJSON.message);
    //   getBook();
    // }

    // xhr.onerror = function() {
    //   showResponseMessage();
    // }

    // xhr.open('POST', `${BASE_URL}/add`);
    // xhr.setRequestHeader('Content-Type', 'application/json');
    // xhr.setRequestHeader('X-Auth-Token', '12345');

    // xhr.send(JSON.stringify(book))

    // fetch
    try {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Auth-Token': '12345'
        },
        body: JSON.stringify(book)
      }

      const response = await fetch(`${BASE_URL}/add`, options);
      const toJson = await response.json();

      showResponseMessage(toJson.message);
      getBook();

    } catch (error) {
      showResponseMessage(error.message);
    }
  };

  const updateBook = async (book) => {
    // tuliskan kode di sini!
    
    // xhr 
    // xhr.onload = function() {
    //   const responseJSON = JSON.parse(this.responseText);
    //   showResponseMessage(responseJSON.message);
    //   getBook();
    // }

    // xhr.onerror = function() {
    //   showResponseMessage();
    // }

    // xhr.open('PUT', `${BASE_URL}/edit/${book.id}`);

    // xhr.setRequestHeader('Content-Type', 'application/json');
    // xhr.setRequestHeader('X-Auth-Token', '12345');

    // xhr.send(JSON.stringify(book));
  
    // fetch
    try {
      const options = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-Auth-Token': '12345'
        },
        body: JSON.stringify(book),
      }

      const response = await fetch(`${BASE_URL}/edit/${book.id}`, options);
      const toJson = await response.json();

      showResponseMessage(toJson.message);
      getBook();

    } catch (error) {
      showResponseMessage(error.message);
    }

  };

  const removeBook = async (bookId) => {
    // tuliskan kode di sini!

    // xhr
    // xhr.onload = function() {
    //   const responseJSON = JSON.parse(this.responseText);
    //   showResponseMessage(responseJSON.message);
    //   getBook();
    // }

    // xhr.onerror = function() {
    //   showResponseMessage();
    // }

    // xhr.open('DELETE', `${BASE_URL}/delete/${bookId}`);

    // xhr.setRequestHeader('X-Auth-Token', 12345);

    // xhr.send();

    // fetch
    try {
      const options = {
        method: 'DELETE',
        headers: {
          'X-Auth-Token': '12345'
        },
      };

      const response = await fetch(`${BASE_URL}/delete/${bookId}`, options);
      const toJson = await response.json();

      showResponseMessage(toJson.message);
      getBook();
    } catch (error) {
      showResponseMessage(error.message);
    }
  };


  
  
  
  
  /*
      jangan ubah kode di bawah ini ya!
  */

  const renderAllBooks = (books) => {
    const listBookElement = document.querySelector('#listBook');
    listBookElement.innerHTML = '';

    books.forEach(book => {
      listBookElement.innerHTML += `
        <div class="col-lg-4 col-md-6 col-sm-12" style="margin-top: 12px;">
          <div class="card">
            <div class="card-body">
              <h5>(${book.id}) ${book.title}</h5>
              <p>${book.author}</p>
              <button type="button" class="btn btn-primary button-edit" id="${book.id}">Edit</button>
              <button type="button" class="btn btn-danger button-delete" id="${book.id}">Hapus</button>
            </div>
          </div>
        </div>
      `;
    });

    const buttonsDelete = document.querySelectorAll('.button-delete');
    buttonsDelete.forEach(button => {
      button.addEventListener('click', event => {
        const bookId = event.target.id;
        
        removeBook(bookId);
      });
    });

    const buttonsEdit = document.querySelectorAll('.button-edit');
    buttonsEdit.forEach(button => {
      button.addEventListener('click', event => {
        const bookId = event.target.id;
        
        const findBook = books.find(book => book.id == bookId);

        inputBookId.value = findBook.id;
        inputBookTitle.value = findBook.title;
        inputBookAuthor.value = findBook.author;

      });
    });
  };

  const showResponseMessage = (message = 'Check your internet connection') => {
    alert(message);
  };

  document.addEventListener('DOMContentLoaded', () => {

    const inputBookId = document.querySelector('#inputBookId');
    const inputBookTitle = document.querySelector('#inputBookTitle');
    const inputBookAuthor = document.querySelector('#inputBookAuthor');
    const buttonSave = document.querySelector('#buttonSave');
    const buttonUpdate = document.querySelector('#buttonUpdate');

    buttonSave.addEventListener('click', function () {
      const book = {
        id: Number.parseInt(inputBookId.value),
        title: inputBookTitle.value,
        author: inputBookAuthor.value
      };
      
      insertBook(book);
    });

    buttonUpdate.addEventListener('click', function () {
      const book = {
        id: Number.parseInt(inputBookId.value),
        title: inputBookTitle.value,
        author: inputBookAuthor.value
      };

      updateBook(book);
    });
    getBook();
  });
}

export default main;