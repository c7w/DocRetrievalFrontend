import {useDispatch} from "react-redux";
import {BackendAddress} from "../Configuration";
import {updateCurrent, updateLoading, updateQAResult, updateResult} from "../Store/Store";
import moment from "moment";
import {KeywordList} from "./Constants";

const showMessage = (message, dispatcher) => {
    const div1 = document.getElementById("no-data");
    const span = document.getElementById("no-data-message");
    if (message !== "") {
        dispatcher(updateCurrent('none'));
        div1.style.display = 'flex';
        span.innerText = message;
    } else {
        div1.style.display = 'none';
    }
}

const MakeQAQuery = (query_string, dispatcher) => {
    fetch(`${BackendAddress}-qa/?query=${query_string}`)
        .then(res => res.json())
        .then(
            data => {
                setTimeout(()=>{
                    dispatcher(updateCurrent("qa"));
                    dispatcher(updateLoading(false));
                    dispatcher(updateQAResult(JSON.stringify(data)));
                    showMessage("", dispatcher);
                }, 300)
            }
        ).catch((err) => {
            console.debug(err);
            dispatcher(updateLoading(false));
            showMessage("Failed to Fetch Data.", dispatcher);
    })
}

const MakeQuery = (query_params, dispatcher) => {

    console.debug(query_params);

    let result_string = "";
    for (const key in query_params) {
        if(key === 'tstop' && query_params[key] === moment().format("YYYY-MM-DD")) {  continue; }
        if(key === 'tstart' && query_params[key] === "2012-01-01") {  continue; }

        if(query_params[key]) {result_string += key + '=' + query_params[key] + '&';}

    }
    const QueryKeyword = [];
    KeywordList.forEach((keyword) => { if(query_params.q?.indexOf(keyword) > -1) {QueryKeyword.push(keyword);} })
    if(QueryKeyword.length > 0) {  result_string += 'keyword=' + QueryKeyword.join(';'); }
    console.debug(result_string);


    fetch(`${BackendAddress}?${result_string}`)
        .then(res => res.json())
        .then(
            data => {
                setTimeout(()=>{

                    data.documents = data.documents.map((doc)=>{
                        return {...doc, keywords: KeywordList.filter((keyword)=> doc.document.content?.indexOf(keyword) > -1 )}
                    })

                    showMessage("", dispatcher);
                    dispatcher(updateCurrent("doc"));
                    dispatcher(updateLoading(false));
                    dispatcher(updateResult(JSON.stringify(data)));
                }, 300)
            }
        ).catch((err) => {
            console.debug(err);
            dispatcher(updateLoading(false));
            showMessage("Failed to Fetch Data.", dispatcher);
    })

}


export {showMessage, MakeQuery, MakeQAQuery};