//displays the headings for the products table
displayProductsHeadings = () => {
    const br = document.createElement('br');
    //if theres no products added then display empty cart message.
    if (localStorage.length == 0) {
        document.getElementById('orderSection').remove();
        main.innerHTML = '<h2 class = "text-center text-warning bg-dark p-3 m-0">Your Shopping Cart is Currently Empty</h2>';
    } else {
        //create and display table headings
        const heading = document.createElement('h2');
        heading.innerHTML = 'Items in Your Cart';
        heading.classList.add('text-center', 'text-warning', 'bg-dark', 'p-3', 'm-0')
        main.parentNode.insertBefore(heading, main);
        heading.parentNode.insertBefore(br, heading);
        const tHeader = document.createElement('tr');
        tHeader.innerHTML = '<th>Name</th>' + '<th>Lense</th>' + '<th>Price</th>' + '<th></th>';
        table.appendChild(tHeader);
    }
}

displayProducts = () => {
    const total = document.createElement('h5');

    //retrieve products from localstorage and display
    for (let i = 0; i < localStorage.length; i++) {
        let data = JSON.parse(localStorage.getItem(localStorage.key(i)));
        const tRow = document.createElement('tr');
        const name = document.createElement('td');
        const lense = document.createElement('td');
        const price = document.createElement('td');
        const x = document.createElement('td');
        const xButton = document.createElement('button');

        table.setAttribute('id', 'table');
        table.classList.add('table', 'bg-dark', 'text-warning', 'm-0');
        main.appendChild(table);

        xButton.classList.add('btn', 'btn-danger');

        name.innerHTML = data.name;
        products[i] = data.id;
        lense.innerHTML = data.lenses;
        price.innerHTML = '$' + data.price / 100;
        x.innerHTML = '';
        xButton.innerHTML = 'X';
        x.appendChild(xButton);

        totalPrice += data.price;
        total.classList.add('text-center', 'bg-dark', 'text-warning', 'pb-3', 'm-0');
        total.innerHTML = 'Total Price is - $' + totalPrice / 100;
        sessionStorage.setItem('price', JSON.stringify(totalPrice));
        main.appendChild(total);

        //event listener used to remove an item.
        xButton.addEventListener('click', () => {
            localStorage.removeItem(localStorage.key(i));
            xButton.parentElement.parentElement.remove();
            location.reload();
        });
        tRow.appendChild(name);
        tRow.appendChild(lense);
        tRow.appendChild(price);
        tRow.appendChild(x);
        table.appendChild(tRow);
    }
}

//validate the data input
validation = () => {
    //retreive form fields
    const submitButton = document.getElementById('submitButton');
    const surname = document.getElementById('surname');
    const forename = document.getElementById('forename');
    const address = document.getElementById('address');
    const city = document.getElementById('city');
    const email = document.getElementById('email');
    //initialise validation boolean to false
    let isSurnameValid = false;
    let isForenameValid = false;
    let isValidAddress = false;
    let isCityValid = false;
    let isEmailValid = false;
    //regex for data validation
    const regName = /^[A-Za-z]{3,32}$/;
    const regAddress = /^[A-Za-z0-9 ]{7,32}$/;
    const emailReg = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/
    
    //validation section uses regex to validate - uses blur listener (on leaving the field.)
    //if true update the validation boolean - add green style.
    //else display error message - and add red style.
    //surname validation
    surname.addEventListener('blur', () => {
        if (regName.test(surname.value)) {
            surnameError.classList.add('d-none');
            isSurnameValid = true;
            surname.style.border = 'medium solid green';
        }
        else {
            surnameError.classList.remove('d-none');
            surname.style.border = 'medium solid red';
        }
    });

    //forname validation
    forename.addEventListener('blur', () => {
        if (regName.test(forename.value)) {
            forenameError.classList.add('d-none');
            isForenameValid = true;
            forename.style.border = 'medium solid green';
        }
        else {
            forenameError.classList.remove('d-none');
            forename.style.border = 'medium solid red';
        }
    });

    //address validation
    address.addEventListener('blur', () => {
        if (regAddress.test(address.value)) {
            addressError.classList.add('d-none');
            isValidAddress = true;
            address.style.border = 'medium solid green';
        }
        else {
            addressError.classList.remove('d-none');
            address.style.border = 'medium solid red';
        }
    });

    //city validation
    city.addEventListener('blur', () => {
        if (regName.test(city.value)) {
            cityError.classList.add('d-none');
            isCityValid = true;
            city.style.border = 'medium solid green';
        }
        else {
            cityError.classList.remove('d-none');
            city.style.border = 'medium solid red';
        }
    });

    //email validation
    email.addEventListener('blur', () => {
        if (emailReg.test(email.value)) {
            emailError.classList.add('d-none');
            isEmailValid = true;
            email.style.border = 'medium solid green';
            submitError.classList.add('d-none');
        }
        else {
            emailError.classList.remove('d-none');
            email.style.border = 'medium solid red';
        }
    });

    //submit button listener - listens for click event
    submitButton.addEventListener('click', ($event) => {
        $event.preventDefault();
        //build the orderObject for the backend
        const contact = {
            firstName: forename.value,
            lastName: surname.value,
            address: address.value,
            city: city.value,
            email: email.value,
        };

        const orderObject = {
            contact, products
        };
 
    //submitForm() is called only when all fields are validated and validation boolean is set to true.
if ((isSurnameValid) && (isForenameValid) && (isCityValid) && (isEmailValid) && (isValidAddress)) {
    submitForm(orderObject);
}
else {
    //else display an error message
    document.getElementById('submitError').classList.remove('d-none');
}

//some more validation to change styles to red and display error message if any field is left empty.
if (surname.value === '') {
    surnameError.classList.remove('d-none');
    surname.style.border = 'medium solid red';
}
if (forename.value === '') {
    forenameError.classList.remove('d-none');
    forename.style.border = 'medium solid red';
}
if (address.value === '') {
    addressError.classList.remove('d-none');
    address.style.border = 'medium solid red';
}
if (city.value === '') {
    cityError.classList.remove('d-none');
    city.style.border = 'medium solid red';
}
if (email.value === '') {
    emailError.classList.remove('d-none');
    email.style.border = 'medium solid red';
}
});
}

//function to make api request
makeRequest = (data) => {
    return new Promise((resolve, reject) => {
        let apiRequest = new XMLHttpRequest();
        apiRequest.open('POST', 'http://localhost:3000/api/cameras/order');
        apiRequest.setRequestHeader('Content-Type', 'application/json');
        apiRequest.send(JSON.stringify(data));
        apiRequest.onreadystatechange = () => {
            if (apiRequest.readyState === 4) {
                if (apiRequest.status === 201) {
                    //if ready state and status return success codes resolve promise with response.
                    resolve(JSON.parse(apiRequest.response));
                }
                if (apiRequest.status === 400) {
                    //if unsuccessfull reject with error message.
                    reject('Something Went Wrong - API Request Failed!!!')
                }
            }
        };
    });
}

//opens the confirmation page - after clearing localStorage and saving data to session storage.
displayConfirmation = (response) => {
    localStorage.clear();
    sessionStorage.setItem('data', JSON.stringify(response));
    window.location = 'confirmation.html';
}

const main = document.querySelector('main');
const table = document.createElement('table');
const products = [];

displayProductsHeadings();
let totalPrice = 0;
displayProducts();
validation();
