//get data from session storage and display confirmation
displayConfirmation = () => {
    const data = JSON.parse(sessionStorage.getItem('data'));
    const price = JSON.parse(sessionStorage.getItem('price'));
    const orderId = document.getElementById('orderId');
    const totalPrice = document.getElementById('totalPrice');
    orderId.innerText = data.orderId;
    totalPrice.innerText = '$' + price / 100;
}

displayConfirmation();