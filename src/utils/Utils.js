
const updateResult = (data) => {
    console.debug(data);
    showMessage('');
    document.getElementById("result-count").innerHTML = data.all;
    document.getElementById("result-time").innerHTML = data.time;

    const doc_list = data.documents;

    const result_cards = document.getElementById("result-cards");

    doc_list.forEach((doc) => {
        console.debug(doc.document.content);
    })

}

const showMessage = (message) => {
    const div1 = document.getElementById("no-data");
    const span = document.getElementById("no-data-message");
    const div2 = document.getElementById("result-group");
    if (message !== "") {
        div1.style.display = 'flex';
        div2.style.display = 'none';
        span.innerText = message;
    } else {
        div2.style.display = 'block';
        div1.style.display = 'none';
    }
}

const query = (query_params) => {
    let result_string = "";
    for (const key in query_params) {
        if(query_params[key]) result_string += key + '=' + query_params[key];
    }

}


export {showMessage};