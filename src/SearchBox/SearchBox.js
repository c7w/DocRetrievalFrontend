import { useDispatch, useSelector } from "react-redux";
import { getQuery, getLoading, getResult } from "../Store/Store";
import {MakeQuery, showMessage, MakeQAQuery} from "../utils/Utils";
import { updateLoading, updateQuery, updateResult } from "../Store/Store";
import "./SearchBox.css";
import {BackendAddress} from "../Configuration";
import {DatePicker, Input, Select} from "antd";
import {Option} from "antd/es/mentions";
import {useEffect, useState} from "react";
import {CaseProgramList, CaseTypeList, DocumentTypeList} from "../utils/Constants";
import moment from "moment";

const SearchBox = () => {

    const [SearchOption, setSearchOption] = useState("doc");
    const query = useSelector(getQuery);
    const loading = useSelector(getLoading);
    const result = useSelector(getResult);

    const dispatcher = useDispatch();

    // Advanced Search Properties Starts
    const [q, setQ] = useState("");
    const [ctype, setCaseType] = useState("");
    const [dtype, setDocumentType] = useState("");
    const [cprogram, setCaseProgram] = useState("");
    const [cid, setCaseId] = useState("");
    const [cname, setCaseName ] = useState("");
    const [dcourt, setDocumentCourt] = useState("");
    const [tstart, setTimeStart] = useState(moment("20120101", "YYYYMMDD"));
    const [tstop, setTimeStop] = useState(moment());
    const [creason, setCaseReason] = useState("");
    const [cresult, setCaseResult] = useState("");
    const [carticle, setCaseArticle] = useState("");

    // Advanced Search Properties Ends


    const search = () => {
        if (loading) {
            return;
        }

        dispatcher(updateLoading(true));
        showMessage('Loading...', dispatcher);

        if(SearchOption == 'doc') {
            const page = 1;
            const query = {q, page, ctype, dtype, cprogram, cid, cname, dcourt, tstart: tstart.format("YYYY-MM-DD"), tstop: tstop.format("YYYY-MM-DD"), creason, cresult, carticle}
            dispatcher(updateQuery(JSON.stringify(query)));
            MakeQuery(query, dispatcher);
        } else {
            MakeQAQuery(q, dispatcher);
        }



    };

    return (
        <div className="SearchBox">
            <h2 id="web-name">????????????????????????????????????????????????</h2>
            <div className="search-bar">
                <Select defaultValue={"doc"} className={"OptionSelect"} onChange={setSearchOption}>
                    <Select.Option value={"doc"} key={0}>?????????</Select.Option>
                    <Select.Option value={"qa"} key={1}>?????????</Select.Option>
                </Select>
                <input id="in" placeholder="Search..." onChange={(e) => {setQ(e.target.value);}} />
                <i className="fa fa-search" onClick={search}
                   style={{fontSize: '20px', marginRight: '1rem', cursor: 'pointer'}}></i>
            </div>
            <div className={"Advanced"} style={{display: SearchOption == 'doc' ? 'block' : 'none'}}>
                <table width={"98%"}>
                    <tbody>
                    <tr>
                        <td className={"SearchItem"}>????????????</td>
                        <td>
                            <Select defaultValue={""} className={"AdvancedSelect"} onChange={setCaseType}>
                                {CaseTypeList.map((caseType, index) => <Select.Option value={caseType} key={index}>{caseType}</Select.Option>)}
                            </Select>
                        </td>
                        <td className={"SearchItem"}>????????????</td>
                        <td>
                            <Select defaultValue={""} className={"AdvancedSelect"} onChange={setDocumentType}>
                                {DocumentTypeList.map((type, index) => <Select.Option value={type} key={index}>{type}</Select.Option>)}
                            </Select>
                        </td>
                    </tr>
                    <tr>
                        <td className={"SearchItem"}>????????????</td>
                        <td>
                            <Select defaultValue={""} className={"AdvancedSelect"} onChange={setCaseProgram}>
                                {CaseProgramList.map((type, index) => <Select.Option value={type} key={index}>{type}</Select.Option>)}
                            </Select>
                        </td>
                        <td className={"SearchItem"}>????????????</td>
                        <td>
                            <Input placeholder="???2021??????0502???2394???" className={"AdvancedInput"} allowClear onChange={(e) => {setCaseId(e.target.value)}} />
                        </td>
                    </tr>
                    <tr>
                        <td className={"SearchItem"}>????????????</td>
                        <td>
                            <Input placeholder="XXX ???????????????????????????????????????????????????" className={"AdvancedInput"} allowClear onChange={(e) => {setCaseName(e.target.value)}} />
                        </td>
                        <td className={"SearchItem"}>????????????</td>
                        <td>
                            <Input placeholder="??????????????????????????????" className={"AdvancedInput"} allowClear onChange={(e) => {setDocumentCourt(e.target.value)}} />
                        </td>
                    </tr>
                    <tr>
                        <td className={"SearchItem"}>????????????</td>
                        <td>
                            <DatePicker value={tstart} onChange={setTimeStart} />
                        </td>
                        <td className={"SearchItem"}>????????????</td>
                        <td>
                            <DatePicker value={tstop} onChange={setTimeStop} />
                        </td>
                    </tr>
                    <tr>
                        <td className={"SearchItem"}>????????????</td>
                        <td colSpan={3}>
                            <Input placeholder="" className={"AdvancedInput"} allowClear onChange={(e) => {setCaseReason(e.target.value)}} />
                        </td>
                    </tr>
                    <tr>
                        <td className={"SearchItem"}>????????????</td>
                        <td colSpan={3}>
                            <Input placeholder="" className={"AdvancedInput"} allowClear onChange={(e) => {setCaseResult(e.target.value)} }/>
                        </td>
                    </tr>
                    <tr>
                        <td className={"SearchItem"}>????????????</td>
                        <td colSpan={3}>
                            <Input placeholder="" className={"AdvancedInput"} allowClear onChange={(e) => {setCaseArticle(e.target.value)}} />
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>);


};

export default SearchBox;