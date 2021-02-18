//function to make api request
makeRequest = () => {
    return new Promise((resolve, reject) => {
        //id is retreived from the querystring searchparam
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const id = urlParams.get('id');

        let apiRequest = new XMLHttpRequest();
        //id is used to build the unique url for the single item page.
        apiRequest.open('GET', 'http://localhost:3000/api/cameras/' + id);
        apiRequest.send();
        apiRequest.onreadystatechange = () => {
            if (apiRequest.readyState === 4) {
                if (apiRequest.status === 200) {
                     //if ready state and status return success codes resolve promise with response.
                    resolve(JSON.parse(apiRequest.response));
                } else {
                    //if unsuccessfull reject with error message.
                    reject('Something Went Wrong - API Request Failed!!!')
                }
            }
        }
    });
}