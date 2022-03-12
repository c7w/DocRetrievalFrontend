import { Pagination } from 'antd';
import 'antd/dist/antd.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {getCurrent, getLoading, getQAResult, getQuery, getResult} from '../Store/Store';
import {MakeQuery, showMessage} from "../utils/Utils";
import { updateLoading, updateQuery, updateResult } from "../Store/Store";
import './ResultBox.css';
import {myChart} from "../utils/Figure";
import {BackendAddress} from "../Configuration";

// props.document
const ResultCard = (props) => {
  // console.debug(props.document);
  const data = JSON.parse(props.document);


  let judger = "";
  if (data.case.judger.审判员.length !== 0) judger += '审判员' + data.case.judger.审判员.join('、') + '；';
  if (data.case.judger.人民陪审员.length !== 0) judger += '人民陪审员' + data.case.judger.人民陪审员.join('、') + '；';
  if (data.case.judger.法官助理.length !== 0) judger += '法官助理' + data.case.judger.法官助理.join('、') + '；';
  if (data.case.judger.书记员.length !== 0) judger += '书记员' + data.case.judger.书记员.join('、') + '；';

  let content = data.document.content;

  content = content.replace(data.case.debate, '<span class="debate" title="辩论焦点">' + data.case.debate + '</span>')
                  .replace(data.case.reason, '<span class="reason" title="判决理由">' + data.case.reason + '</span>')
                  .replace(data.case.record, '<span class="record" title="庭审记录">' + data.case.record + '</span>')
                  .replace(data.case.result, '<span class="result" title="判决结果">' + data.case.result + '</span>')

    // console.debug(data.case.program in ['刑事一审', '刑事二审'])
    if(data.case.type === '刑事案件' && ['刑事一审', '刑事二审'].includes(data.case.program)) {
        const fact = data.case.fact;
        const led = data.led;

        let fact_string = '<span class="fact" title="事实论据">';

        // Construct fact_string from led_data

        let cursorLedIndex = 0;
        let cursorLedPos = 0;

        let char_index = 0;

        while ( char_index < fact.length) {
            if(cursorLedIndex >= led.length) break;
            while( led[cursorLedIndex].tokens[cursorLedPos].indexOf("#") > -1 || led[cursorLedIndex].tokens[cursorLedPos].indexOf("[") > -1 ) {
                cursorLedPos++;
                if(cursorLedPos >= led[cursorLedIndex].tokens.length) { cursorLedIndex++; cursorLedPos = 0; }
                if(cursorLedIndex >= led.length) break;
                if(led[cursorLedIndex].tokens[cursorLedPos] === '[SEP]') { cursorLedIndex++; cursorLedPos = 0; }
            }
            if(cursorLedIndex >= led.length) break;

            if( fact.indexOf(led[cursorLedIndex].tokens[cursorLedPos], char_index) === char_index ) {
                if(led[cursorLedIndex].events[cursorLedPos] !== 'None') {
                    fact_string += `<span class="fact-led" title="${led[cursorLedIndex].events[cursorLedPos]}">${ led[cursorLedIndex].tokens[cursorLedPos] }</span>`
                } else {
                    fact_string += led[cursorLedIndex].tokens[cursorLedPos];
                }

                char_index += led[cursorLedIndex].tokens[cursorLedPos].length;
                cursorLedPos++;

                if(cursorLedPos >= led[cursorLedIndex].tokens.length) { cursorLedIndex++; cursorLedPos = 0; }
                if(cursorLedIndex >= led.length) break;
                if(led[cursorLedIndex].tokens[cursorLedPos] === '[SEP]') { cursorLedIndex++; cursorLedPos = 0; }

            } else {
                char_index++;
            }
        }


        fact_string += '</span>'

        content = content.replace(data.case.fact, fact_string);
    } else {
        content = content.replace(data.case.fact, '<span class="fact" title="事实论据">' + data.case.fact + '</span>')
    }

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
          <tr><td className="card-entry">关键词</td><td colSpan="3">{data.keywords.join('; ')}</td></tr>
          <tr><td className="card-entry" colSpan="4">法律依据</td></tr>
          <tr><td colSpan="4"><ul>
            {data.case.article?.filter((article)=>article !== '').map(
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

const ResultQACard = (props) => {
    const data = JSON.parse(props.data);
    return (
        <div className="result-card">
            <p>【Q】 {data.inquiry_title}</p>
            {/*<p>【>】 {data.inquiry_description}</p>*/}
            <p>【A】 {data.reply}</p>
        </div>
    );
}

const ResultBox = () => {

    const query = useSelector(getQuery);
    const loading = useSelector(getLoading);
    const result = useSelector(getResult);
    const result_qa = useSelector(getQAResult);
    const system = useSelector(getCurrent);
    const dispatcher = useDispatch();

    let data = {all: 10}
    let data_qa = {all: 10}

    let ResultCards = <></>;
    let ResultQACards = <></>;

    // Here, DATA fetched back, update ResultCard List
    if (result !== '') { 
      data = JSON.parse(result);
      console.debug(data);

      // Update ResultCards
      const DataList = data.documents.map((doc, index)=> <ResultCard document={ JSON.stringify(doc) } key={index}/>);
      ResultCards = (DataList);

      // Update Figures
      myChart(data.figure);
    }

    if (result_qa !== '') {
        data_qa = JSON.parse(result_qa);
        // Update ResultQACards
        console.debug(data_qa);
        ResultQACards = data_qa.documents.map((doc, index) => <ResultQACard data={JSON.stringify(doc._source)} key={index}/>)
    }

    const pageSwitch = (page, pageSize) => {
        if (loading) {
            return;
        }

        dispatcher(updateLoading(true));
        showMessage('Loading...', dispatcher);

        const currQuery = JSON.parse(query);
        currQuery.page = page;

        console.debug(currQuery);

        dispatcher(updateQuery(JSON.stringify(currQuery)));

        MakeQuery(currQuery, dispatcher);

    }

    return (<div id="ResultBox">
          <div id="no-data"><span id="no-data-message" style={{color: 'grey', fontSize: '36px', fontWeight: 'bold'}}>No Data</span></div>
          <div id="result-group" style={{display: system === 'doc' ? 'block' : 'none'}}>
              <div className={"Figures"}>
                  <div id={"china-map"}/>
                  <div id={"pie-maps"}>
                      <div id={"program-map"} className={"pie-map"}/>
                      <div id={"ctype-map"} className={"pie-map"}/>
                      <div id={"court-map"} className={"pie-map"}/>
                  </div>
              </div>
            <p style={{textAlign: 'center'}}>共检索到 <span id="result-count">{data.all >= 10000 ? ">10000" : data.all}</span> 条相关结果，用时 <span id="result-time">{data.time / 1000}</span>s</p>
            <div id="result-cards">
              {ResultCards}
            </div>
            <Pagination onChange={pageSwitch} pageSize={10} total={data.all > 1000 ? 1000 : data.all} showSizeChanger={false} style={{textAlign: 'center', margin: '0 auto 5vh'}}/>
          </div>
          <div id={"result-qa-group"} style={{display: system === 'qa' ? 'block' : 'none'}} >
              <p style={{textAlign: 'center'}}>共检索到 <span id="result-count">{data_qa.all}</span> 条相关结果，用时 <span id="result-time">{data_qa.time / 1000}</span>s</p>
              <div id="result-cards">
                  {ResultQACards}
              </div>
          </div>
        </div>);
};



export default ResultBox;