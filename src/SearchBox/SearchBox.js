import { useDispatch, useSelector } from "react-redux";
import { getQuery, getLoading, getResult } from "../Store/Store";
import {MakeQuery, showMessage} from "../utils/Utils";
import { updateLoading, updateQuery, updateResult } from "../Store/Store";
import "./SearchBox.css";
import {BackendAddress} from "../Configuration";
import {DatePicker, Input, Select} from "antd";
import {Option} from "antd/es/mentions";
import {useState} from "react";
import {CaseProgramList, CaseTypeList, DocumentTypeList} from "../utils/Constants";
import moment from "moment";

const SearchBox = () => {

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
        showMessage('Loading...');

        const page = 1;
        const query = {q, page, ctype, dtype, cprogram, cid, cname, dcourt, tstart: tstart.format("YYYY-MM-DD"), tstop: tstop.format("YYYY-MM-DD"), creason, cresult, carticle}
        dispatcher(updateQuery(JSON.stringify(query)));

        MakeQuery(query, dispatcher);
    };

    return (
        <div className="SearchBox">
            <h2 id="web-name">面向文书结构化信息的检索平台</h2>
            <div className="search-bar">
                <input id="in" placeholder="Search..." onChange={(e) => {setQ(e.target.value);}} />
                <i className="fa fa-search" onClick={search}
                   style={{fontSize: '20px', marginRight: '1rem', cursor: 'pointer'}}></i>
            </div>
            <div className={"Advanced"}>
                <table width={"98%"}>
                    <tbody>
                    <tr>
                        <td className={"SearchItem"}>案件类型</td>
                        <td>
                            <Select defaultValue={""} className={"AdvancedSelect"} onChange={setCaseType}>
                                {CaseTypeList.map((caseType, index) => <Select.Option value={caseType} key={index}>{caseType}</Select.Option>)}
                            </Select>
                        </td>
                        <td className={"SearchItem"}>文书类型</td>
                        <td>
                            <Select defaultValue={""} className={"AdvancedSelect"} onChange={setDocumentType}>
                                {DocumentTypeList.map((type, index) => <Select.Option value={type} key={index}>{type}</Select.Option>)}
                            </Select>
                        </td>
                    </tr>
                    <tr>
                        <td className={"SearchItem"}>审判程序</td>
                        <td>
                            <Select defaultValue={""} className={"AdvancedSelect"} onChange={setCaseProgram}>
                                {CaseProgramList.map((type, index) => <Select.Option value={type} key={index}>{type}</Select.Option>)}
                            </Select>
                        </td>
                        <td className={"SearchItem"}>文书序号</td>
                        <td>
                            <Input placeholder="（2021）浙0502执2394号" className={"AdvancedInput"} allowClear onChange={(e) => {setCaseId(e.target.value)}} />
                        </td>
                    </tr>
                    <tr>
                        <td className={"SearchItem"}>案件名称</td>
                        <td>
                            <Input placeholder="XXX 等买卖合同纠纷执行实施类执行通知书" className={"AdvancedInput"} allowClear onChange={(e) => {setCaseName(e.target.value)}} />
                        </td>
                        <td className={"SearchItem"}>审判法院</td>
                        <td>
                            <Input placeholder="湖州市吴兴区人民法院" className={"AdvancedInput"} allowClear onChange={(e) => {setDocumentCourt(e.target.value)}} />
                        </td>
                    </tr>
                    <tr>
                        <td className={"SearchItem"}>起始日期</td>
                        <td>
                            <DatePicker value={tstart} onChange={setTimeStart} />
                        </td>
                        <td className={"SearchItem"}>截止日期</td>
                        <td>
                            <DatePicker value={tstop} onChange={setTimeStop} />
                        </td>
                    </tr>
                    <tr>
                        <td className={"SearchItem"}>审判理由</td>
                        <td colSpan={3}>
                            <Input placeholder="" className={"AdvancedInput"} allowClear onChange={(e) => {setCaseReason(e.target.value)}} />
                        </td>
                    </tr>
                    <tr>
                        <td className={"SearchItem"}>审判结果</td>
                        <td colSpan={3}>
                            <Input placeholder="" className={"AdvancedInput"} allowClear onChange={(e) => {setCaseResult(e.target.value)} }/>
                        </td>
                    </tr>
                    <tr>
                        <td className={"SearchItem"}>相关法条</td>
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