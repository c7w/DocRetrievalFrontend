import { Pagination } from 'antd';
import 'antd/dist/antd.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getLoading, getQuery, getResult } from '../Store/Store';
import { showMessage } from "../utils/Utils";
import { updateLoading, updateQuery, updateResult } from "../Store/Store";
import './ResultBox.css';
import {BackendAddress} from "../Configuration";

// props.document
const ResultCard = (props) => {
  // console.debug(props.document);
  const data = JSON.parse(props.document);
  console.debug(data);


  let judger = "";
  if (data.case.judger.审判员.length !== 0) judger += '审判员' + data.case.judger.审判员.join('、') + '；';
  if (data.case.judger.人民陪审员.length !== 0) judger += '人民陪审员' + data.case.judger.人民陪审员.join('、') + '；';
  if (data.case.judger.法官助理.length !== 0) judger += '法官助理' + data.case.judger.法官助理.join('、') + '；';
  if (data.case.judger.书记员.length !== 0) judger += '书记员' + data.case.judger.书记员.join('、') + '；';

  let content = data.document.content;

  content = content.replace(data.case.fact, '<span class="fact" title="事实论据">' + data.case.fact + '</span>')
                  .replace(data.case.debate, '<span class="debate" title="辩论焦点">' + data.case.debate + '</span>')
                  .replace(data.case.reason, '<span class="reason" title="判决理由">' + data.case.reason + '</span>')
                  .replace(data.case.record, '<span class="record" title="庭审记录">' + data.case.record + '</span>')
                  .replace(data.case.result, '<span class="result" title="判决结果">' + data.case.result + '</span>')

  return (
      <div className="result-card">
        <p style={{textAlign: 'center', fontWeight: 'bold'}}>{data.case.name}</p>
        <table width="98%"><tbody>
          <tr>
            <td className="card-entry">审判程序</td><td>{data.case.program}</td>
            <td className="card-entry">案件类型</td><td>{data.case.type}</td>
          </tr>
          <tr>
            <td className="card-entry">判决号</td><td>{data.case.id}</td>
            <td className="card-entry">文书类型</td><td>{data.document.type}</td>
          </tr>
          <tr>
            <td className="card-entry">裁判法院</td><td>{data.document.court}</td>
            <td className="card-entry">裁判时间</td><td>{data.case.date}</td>
          </tr>
          <tr><td className="card-entry">当事人</td><td colSpan="3">{data.case.parties.join("、")}</td></tr>
          <tr><td className="card-entry">判决人</td><td colSpan="3">{judger}</td></tr>
          <tr><td className="card-entry" colSpan="4">法律依据</td></tr>
          <tr><td colSpan="4"><ul>
            {data.case.article.filter((article)=>article !== '').map(
              (article, ind)=><li style={{fontSize: '12px'}} key={ind}>{article}</li>
            )}
          </ul></td></tr>
          <tr><td className="card-entry" colSpan="4">文书内容</td></tr>
          <tr><td colSpan="4" style={{padding: '2rem', fontFamily: 'KaiTi', lineHeight: '1.8'}}
            dangerouslySetInnerHTML={{ __html: content }}
          /></tr>

        </tbody></table>
      </div>
  );
};

const ResultBox = () => {

    const query = useSelector(getQuery);
    const loading = useSelector(getLoading);
    const result = useSelector(getResult);
    const dispatcher = useDispatch();

    let data = {all: 10}
    let ResultCards = <></>;

    if (result !== '') { 
      data = JSON.parse(result);
      const DataList = data.documents.map((doc, index)=> <ResultCard document={ JSON.stringify(doc) } key={index}/>);
      ResultCards = (DataList);
    }

    const pageSwitch = (page, pageSize) => {
        if (loading) { return;}

        dispatcher(updateLoading(true));
        showMessage('Loading...');

        console.debug(query);
        const currQuery = JSON.parse(query);
        console.debug(page);
        currQuery.page = page;

        console.debug(currQuery);

        dispatcher(updateQuery(JSON.stringify(currQuery)));

        fetch(`${BackendAddress}?q=${currQuery.query}&page=${currQuery.page}`)
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


    return (<div id="ResultBox">
          <div id="no-data"><span id="no-data-message" style={{color: 'grey', fontSize: '36px', fontWeight: 'bold'}}>No Data</span></div>
          <div id="result-group" style={{display: 'none'}}>
            <p style={{textAlign: 'center'}}>共检索到 <span id="result-count">{data.all}</span> 条相关结果，用时 <span id="result-time">{data.time / 1000}</span>s</p>
            <div id="result-cards">
              {ResultCards}
            </div>
            <Pagination onChange={pageSwitch} pageSize={10} total={data.all} showSizeChanger={false} style={{textAlign: 'center', margin: '0 auto 5vh'}}/>
          </div>
        </div>);
};

export default ResultBox;