import { useDispatch, useSelector } from "react-redux";
import { getQuery, getLoading, getResult } from "../Store/Store";
import { showMessage } from "../utils/Utils";
import { updateLoading, updateQuery, updateResult } from "../Store/Store";
import "./SearchBox.css";
import {BackendAddress} from "../Configuration";
import {Select} from "antd";
import {Option} from "antd/es/mentions";
import {useState} from "react";

const SearchBox = () => {

    const query = useSelector(getQuery);
    const loading = useSelector(getLoading);
    const result = useSelector(getResult);

    const dispatcher = useDispatch();

    // Advanced Search Properties Starts
    const [CaseType, setCaseType] = useState("");

    // Advanced Search Properties Ends

    const search = () => {
        if (loading) {
            return;
        }

        dispatcher(updateLoading(true));
        showMessage('Loading...');

        const content = document.getElementById("in").innerHTML;
        const page = 1;
        dispatcher(updateQuery(JSON.stringify({query: content, page: page})));

        fetch(`${BackendAddress}?q=${content}&page=${page}`)
            .then(res => res.json())
            .then(
                data => {
                    showMessage("");
                    dispatcher(updateLoading(false));
                    dispatcher(updateResult(JSON.stringify(data)));
                }
            ).catch((err) => {
            console.debug(err);
            dispatcher(updateLoading(false));
            showMessage("Failed to Fetch Data.");
        })
    };

    return (
        <div className="SearchBox">
            <h2 id="web-name">面向文书结构化信息的检索平台</h2>
            <div className="search-bar">
                <input id="in" placeholder="Search..."/>
                <i className="fa fa-search" onClick={search}
                   style={{fontSize: '20px', marginRight: '1rem', cursor: 'pointer'}}></i>
            </div>
            <div className={"Advanced"}>
                <table width={"98%"}>
                    <tbody>
                    <tr>
                        <td className={"SearchItem"}>案件类型</td>
                        <td>
                            <Select defaultValue={CaseType} style={{width: 120}} onChange={setCaseType}>
                                <Option value=""></Option>
                            </Select>
                        </td>
                        <td className={"SearchItem"}>文书类型</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td className={"SearchItem"}>审判程序</td>
                        <td></td>
                        <td className={"SearchItem"}>文书序号</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td className={"SearchItem"}>案件名称</td>
                        <td></td>
                        <td className={"SearchItem"}>审判法院</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td className={"SearchItem"}>起始日期</td>
                        <td></td>
                        <td className={"SearchItem"}>截止日期</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td className={"SearchItem"}>审判理由</td>
                        <td colSpan={3}></td>
                    </tr>
                    <tr>
                        <td className={"SearchItem"}>审判结果</td>
                        <td colSpan={3}></td>
                    </tr>
                    <tr>
                        <td className={"SearchItem"}>相关法条</td>
                        <td colSpan={3}></td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>);


};

export default SearchBox;