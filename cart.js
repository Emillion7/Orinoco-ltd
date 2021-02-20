//displays the headings for the products table
displayProductsHeadings = () => {
    const br = document.createElement('br');
    //if theres no products added thendisplay empty cart message.
    if (localStorage.length == 0) {
        document.getElementById('orderSection').remove();
        main.innerHTML = '<h2 class = "text-center">Your Shopping Cart is Currently Empty</h2>';
    } else {
        //create and display table headings
        const heading = document.createElement('h2');
        heading.innerHTML = 'Items in Your Cart';
        heading.classList.add('text-center')
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
        table.classList.add('table');
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
        total.classList.add('text-center');
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