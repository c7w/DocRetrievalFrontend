import {useDispatch} from "react-redux";
import {BackendAddress} from "../Configuration";
import {updateLoading, updateResult} from "../Store/Store";
import moment from "moment";

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

const MakeQuery = (query_params, dispatcher) => {

    console.debug(query_params);

    let result_string = "";
    for (const key in query_params) {
        if(key === 'tstop' && query_params[key] === moment().format("YYYY-MM-DD")) {  continue; }
        if(key === 'tstart' && query_params[key] === "2012-01-01") {  continue; }

        if(query_params[key]) {result_string += key + '=' + query_params[key] + '&';}

    }
    console.debug(result_string);

    fetch(`${BackendAddress}?${result_string}`)
        .then(res => res.json())
        .then(
            data => {
                setTimeout(()=>{
                    showMessage("");
                    dispatcher(updateLoading(false));
                    dispatcher(updateResult(JSON.stringify(data)));
                }, 300)
            }
        ).catch((err) => {
            console.debug(err);
            dispatcher(updateLoading(false));
            showMessage("Failed to Fetch Data.");
    })

}


export {showMessage, MakeQuery};