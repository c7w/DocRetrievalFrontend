const CaseTypeList = [
    "",
    "民事案件",
    "刑事案件",
    "行政案件",
    "执行案件",
];

const DocumentTypeList = [
    "",
    "判决书",
    "裁定书",
    "调解书",
    "决定书",
    "通知书",
    "令",
    "其他"
];

const CaseProgramList = [
    "",
    "行政一审",
    "执行审查",
    "刑事审判监督",
    "督促",
    "民事一审",
    "催告",
    "行政非诉审查",
    "民事管辖",
    "其他执行",
    "刑事一审",
    "破产",
    "刑事管辖",
    "执行实施",
    "非诉财产保全审查",
    "刑罚与执行变更",
    "行政二审",
    "行政审判监督",
    "其他赔偿",
    "非诉行为保全审查",
    "刑事二审",
    "民事审判监督",
    "民事二审",
    "行政赔偿",
    "特别程序"
];

let KeywordList = ['民商事', '权责情节', '民事行为能力', '完全民事行为能力', '限制民事行为能力', '无民事行为能力', '精神病人', '民事行为的效力', '无效', '可变更、可撤销', '部分无效', '效力待定', '欺诈', '胁迫', '乘人之危', '恶意串通', '国家、集体或者第三人利益', '社会公共利益', '国家指令性计划', '以合法形式掩盖非法目的', '重大误解', '显失公平', '无权处分', '追认', '催告', '撤销', '附条件', '附期限', '代理', '委托代理', '法定代理', '指定代理', '无权代理', '复代理', '转委托', '隐名代理', '间接代理', '表见代理', '民事权利', '原始取得', '继受取得', '善意取得', '相邻关系', '按份共有', '共同共有', '不当得利', '无因管理', '民事责任规定', '合同', '预期违约', '根本违约 ', '双方违约', '实际履行', '情势变更', '违约金', '避免损失扩大义务', '侵权', '过错', '无过错', '混合过错 ', '共同过错', '过错推定 ', '公平责任', '职 务侵权 ', '产品责任', '高度危险作业 ', '环境污染', '地面施工', '建筑物', '动物', '被监护人', '承担民事责任形式', '停止侵害', '排除妨碍', '消除危险', '返还财产', '恢复原状', '修理、重作、更换', '赔偿损失 ', '支付违约金', '消除影响', '恢复名 誉', '赔礼道歉', '追缴财产', '免责事由', '正当防卫', '紧急避险', '不可抗力', '受害人过错', '第三人过错', '受害人同意 ', '自助行为', '意外事件', '合同约定', '诉 讼关键词', '基本原则', '诚实信用原则', '处分原则', '辩论原则', '管辖', '级别管辖', '地域管辖', '专属管辖', '共同管辖', '选择管辖', '协议管辖', '移送管辖', '指定管辖', '管辖权转移', '管辖权异议', '被告住所地', '原告住所地', '合同履行地', '合同签订地', '标的物所在地', '公司住所地', '侵权行为地', '侵权行为实施地', '侵权结果发生地', '票据支付地', '不动产所在地', '港口所在地', '被继承人死亡时住所地', '主要遗产所在地', '回避', '自行回避', '申请回避', '指令回避', '诉讼参加人（当事人和诉讼代理人）', '正当当事人', '诉讼权利能力', '诉讼行为能力', '有独立请求权', '无独立请求权', '第三人', '自行和解', '共同诉讼', '一般代理', '特别授权', '诉讼代表人', '法定代理人', '民事主体资格', '证据', '证据种类', '当事人的陈述', '书证', '物证', '视听资料', '电子数据', '证人证言', '鉴定意见', '勘验笔录', '证据分类', '原始证据', '传来证据', '直接证据', '间接证据', '本证', '反证', '证明', '证明力', '证据不足', '举证时限', '证据交换', '谁主张、谁举证', '举证责任倒置', '自认', '新证据', '法院调查取证', '重新鉴定', '客观性', '关联性', '合法性', '可采性', '证据登记', '示意证据', '传闻证据', '质证', '证明责任（举证责任）', '证明责任的转移', '举证不能的后果', '举证通知', '逾期举证', '举证期限的延长', '证明对象', '高度盖然性', '临时性救济和保障程序', '财产保全', '行为保全', '先予执行', '拘传', '训诫', '责令退出法庭', '罚款', '拘留', '限制出境', '诉前证据保全', '诉前行为保全', '审判程序', '诉讼请求', '检察建议', '另行起诉', '撤诉', '不予受理', '一事不再理', '独任审判', '陪审', '简易程序', '法院调解', '当事人和解', '庭前调解', '追加必要共同诉讼人', '不公开审理', '放弃诉讼请求', '变更诉讼请求', '增加诉讼请求', '反诉', '按撤诉处理', '延期审理', '中止审理', '开庭审理', '书面审理', '中止诉讼（诉讼中止）', '终结诉讼（诉讼终结）', '缺席判决', '驳回起诉', '驳回诉讼请求', '维持原判', '发回重审', '申请撤回上诉', '申请再审', '抗诉', '审判监督', '特殊程序', '选民资格案件', '宣告失踪', '宣告死亡', '认定公民无民事行为能力', '认定公民限制民事行为能力', '认定财产无主', '确认调解协议', '实现担保物权', '督促程序', '支付令', '公示催告', '设立海事赔偿责任限制基金', '债权登记与受偿', '船舶优先权催告', '破产清算', '破产和解', '破产重组', '清算', '除权判决', '执行', '中止执行（执行中止）', '终结执行（执行终结）', '执行异议', '执行和解', '执行担保', '执行竞合', '执行标的', '委托执行', '执行回转', '迟延履行金', '强制执行', '查封', '扣押', '冻结', '解冻', '拍卖', '变卖', '折价', '涉外民事诉讼', '司法豁免', '司法协助', '司法救助', '涉外财产保全', '涉外仲裁', '仲裁协议', '域外承认和执行', '不予执行仲裁裁决', '被申请人住所地', '国际条约', '其他民商事诉讼关键词', '诉讼标的', '当事人适格', '公益诉讼', '群体性诉讼', '证据保全', '既判力', '释明权', '法律援助', '补偿安置协议', '诉讼时效', '刑事', '权责情节', '但书规定 ', '情节显著轻微', '危 害不大', '主观方面', '犯罪故意', '直接故意', '明知', '希望', '间接故意', '放任', '犯罪过失 ', '疏忽大意', '过于自信', '认识错误', '无罪过事件', '意外事件', '不 可抗力', '犯罪主体', '刑事责任年龄', '十四周岁以下', '已满十四周岁不满十六周岁', '已满十六周岁', '已满十四周岁不满十八周岁', '刑事责任能力', '精神病人', '醉酒的人', '又聋又哑的人', '盲人 ', '单位犯罪', '直接负责', '主管人员', '直接责任人员', '特殊主体', '国家工作人员', '以国家工作人员论', '国家机关工作人员', '司法工作 人员', '排除犯罪的事由', '正当防卫', '防卫过当', '紧急避险', '避险过当', '执行命令', '执行职务', '业务行为', '被害人同意', '自救', '犯罪形态', '犯罪预备', '犯罪未遂', '犯罪既隧', '共同犯罪', '共同犯罪构成', '共同犯罪故意', '共同犯罪行为', '同时犯', '共同犯罪形式', '事前无预谋的共同犯罪', '事前预谋的共同犯罪', '犯罪集团 ', '黑社会性质', '犯罪组织', '共同犯罪人的种类', '主犯', '首要分子', '从犯', ' 胁从犯', '教唆犯', '教唆未遂', '罪数形态', '典型的罪数', '同种数罪', '不同种数罪', '不典型的罪数', '想象竞合犯', '继续犯', '结果加重犯', '惯犯', '牵连犯', '吸收犯', '量刑情节', '法定情节', '从重', '应当从轻', '可以从轻', '应当减轻', '可以减轻', '酌定减轻', '应当免除', '可以免除', '酌定情节', '犯罪动机', '犯罪手段', '犯罪时间', '犯罪地点', '犯罪结果', '一贯表现', '累犯', '五年以内', '危害国家安全 ', '自首', '在逃人员 ', '以自首论', '特殊自首 ', '余罪自首 ', '准自首', '立功', '一般立功', '重大立功', '自首又有立功表现', '数罪并罚', '吸收', '漏罪', '再犯新罪', '缓刑', '悔罪表现', '考验期', '撤销缓刑', '假释', '暴力性犯罪', '十年以上有期徒刑', '无期徒刑 ', '减刑', '可以减刑', '应当减刑', '减刑建议书', '监外执行', ' 保外就医', '怀孕 ', '正在哺乳', '社会危险', '自伤自残', '刑罚消灭', '追诉时效 ', '不再追诉', '赦免', '其他刑事权责情节词', '民族自治地方', '重伤', '轻微伤', '轻伤', '主刑', '管制', '数罪并罚 ', '羁押1日折抵刑期2日', '拘役', '羁押1日折抵刑期1日', '有期徒刑', '无期徒刑', '死缓', '立即执行', '罪行极其严重', '故意犯罪 ', '缓期二年', '重大立功表现', '2年期满', '不适用', '不满18周岁', '怀孕的妇女', '附 加刑', '罚金', '单处', '并处', '缴纳', '追缴', '减少', '剥夺政治权利', '期限相等', '终身 ', '没收财产', '全部财产', '正当债务', '驱逐出境', '诉讼关键词', '基本 原则', '尊重和保障人权', '无罪推定', '不公开审理', '本民族语言文字', '刑事司法协助', '互惠原则', '外国人犯罪', '外交特权', '豁免权', '法律监督', '查明犯罪事实', '通用的语言文字', '国际条约', '管辖', '立案管辖', '审判管辖', '级别管辖', '地域管辖', '犯罪预备地', '犯罪行为地', '犯罪结果地', '居住地', '移送管辖', '指定管辖', '优先管辖', '专门管辖', '特殊管辖', '管辖权异议', '抓获地', '入境地', '最初停靠地', '最初停泊地', '最初降落地', '拐入地', '拐出地', '主管单位所在地', '原户籍地', '离境前居住地', '服刑地', '侵权产品制造地', '侵权产品储存地', '侵权产品运输地', '侵权产品销售地', '网站服务器所在地', '网络接入地', '网站建立者所在地', '网站管理者所在地', '侵权作品上传者所在地', '回避', '指令回避 ', '自行回避', '申请 回避', '辩护与代理', '自行辩护', '委托辩护', '指定辩护', '拒绝辩护', '委托代理', '法律援助', '证据', '证据原则', '证据裁判', '证据程序法定', '直接言词', '证据种类', '物证', '书证', '专家证人', '专家辅助人意见', '证人证言', '口供', '被告人供述', '被告人辩解', '犯罪嫌疑人供述', '犯罪嫌疑人辩解', '被害人陈述', '鉴定意见', '勘验笔录', '检查笔录', '辨认笔录', '侦查实验', '视听资料', '电子数据', '电子邮件', '电子数据交换', '网上聊天记录', '博客', '微博客', '手机短信', '电子签名', '域名', '证据分类', '原始证据', '传来证据', '有罪证据', '无罪证据', '言词证据', '实物证据', '直接证据', '间接证据', '控诉证据', '辩护证据', '证据规则', '原件', '原物', '复制件', '非法方法', '非法证据', '自证其罪', '威胁', '引诱', '欺骗', '刑讯逼供', '符合事实的意见', '司法认知', '推定', '证据登记', '示意证据', '传闻证据', '品性证据', '倾向证据', '证据开示', '补正', '合理解释', '证明', '证明对象', '待证事实', '免证事实', '证明责任', '证明标准', '确信无疑标准', '排除合理怀疑', '质证', '证明力', '证据能力', '客观性', '关联性', '合法性', '可采性', '证据确实、充分', '证据不足', '证人出庭', '证人保护', '证人经济补偿', '证明体系', '强制措施', '拘传', '传唤', '留置', '取保候审', '保证金', '保证人', '监视居住', '批准逮捕', '决定逮捕', '执行逮捕', '拘留', '扭送', '保护性约束', '强制到庭', '超期羁押', '变更强制措施', '解除强制措施', '异地执行', '附带民事诉讼', '附带民事诉讼', '物质损失', '财产保全', '先予执行', '请求权人', '连带责任', '共同致害人', '负有赔偿责任的人', '审前程序', '同步录音录像', '退回补充侦查', '自行补充侦查', '审查起诉', '不起诉', '法定不起诉', '酌定不起诉', '存疑不起诉（证据不足不起诉）', '补充起诉', '变更起诉', '量刑建议', '分案起诉', '另案起诉', '自诉', '告诉才处理', '轻微刑事案件', '审判程序', '独任审判', '审判委员会', '陪审', '庭前审查', '庭前准备', '法庭调查', '法庭辩论', '最后陈述', '书面审理', '少年法庭', '简易程序', '延期审理', '中止审理（诉讼中止）', '终止审理（诉讼终止）', '反诉', '调解', '不予受理', '驳回起诉', '驳回上诉', '驳回抗诉', '法定刑以下', '抗诉', '请求抗诉', '不追究刑事责任', '宣告无罪', '维持原判', '改判', '发回重审', '上诉不加刑', '死刑复核', '报送复核', '核准死刑', '改判死刑缓期两年执行', '审判监督', '申诉', '提审', '指令再审', '国家赔偿', '特别程序', '未成年', '社区矫正', '教育为主、惩罚为辅', '附条件不起诉', '封存犯罪记录', '被害人谅解', '当事人和解', '和解协议', '没收程序', '强制医疗', '其他刑事诉讼关键词', '交付执行', '变更执行', '暂予监外执行', '初犯', '偶犯', '前科', '被害人过错', '未成年犯', '社区矫正机构', '强制缴纳', '终止执行', '中止执行', '权属异议（财产异议）', '死刑暂停执行', '死刑停止执行', '人民监督员', '犯罪记录', '行贿犯罪档案', '行政', '权责情节', '行政行为种类', '行政处罚', '行政强制', '行政裁决', '行政确认', '行政登记 ', '行政许可', '行政批准 ', '行政命令', '行政复议', '行政撤销', '行政检查', '行政合同', '行政奖励', '行政补偿', '行政执行', '行政受理', '行政给付', '行政征用', '行政征收', '行政划拔', '行政规划', '行政救助', '行政协助 ', '行政允诺', '行政监督', '其他行政行为', '行政行为效 力', '合法', '违法', '无效', '可撤销', '信赖保护', '废止', '行政处罚种类和程序', '警告', '罚款', '没收违法所得', '没收非法财物', '责令停产停业', '暂扣或者吊销许可证', '暂扣或者吊销执照', '行政拘留', '简单程序', '一般程序', '听证程序', '行政判决', '维持具体行政行为', '撤销具体行政行为', '部分撤销具体行政行为', '重新作出具体行政行为', '限期履行法定职责', '变更行政处罚', '行政赔偿', '侵犯人身权', '违法拘留', '违法采取限制公民人身自由的行政强制措施', '非法拘禁', '殴打等暴力行为', '违法使用武器、警械', '公民身体伤害或者死亡', '侵犯财产权', '违法实施罚款', '违法吊销许可证和执照', '违法责令停产停业', '违法没收财物', '违法对财产采取查封、扣押、冻结', '违反国家规定征收财物、摊派费用', '国家不承担赔偿责任情形', '行政机关工作人员行使职权无关的个人行为', '公民、法人和其他组织自己的行为', '诉讼关键词', '基本原则', '合法性审查', '受案范围', '可诉性行政行为', '拘留', '吊销许可证和执照', '没收财物', '限制人身自由', '查封', '扣押', '冻结', '侵犯法律规定的经营自主权', '拒绝颁发许可证和执照', '拒绝履行（不履行）', '拖延履行', '不予答复', '未依法发给抚恤金', '违法要求履行义务', '侵犯其他人身权、财产权', '不可诉行为', '国家行为', '抽象行政行为', '内部人事管理行为（内部行为）', '终局行政决定行为（终裁行为）', '刑事司法行为', '调解行为', '仲裁行为', '行政指导', '重复处理行为', '不产生实际影响的行为', '管辖', '级别管辖', '专属管辖', '共同管辖', '移送管辖', '指定管辖', '管辖权转移', '管辖权异议', '户籍所在地', '经常居住地', '被限制人身自由地', '不动产所在地', '复议机关所在地', '诉讼参加人', '共同诉讼', '共同被告', '第三人', '原告诉讼主体资格', '复议机关', '证据', '证据种类', '书证', '物证', '视听资料', '证人证言', '当事人的陈述', '鉴定结论', '勘验笔录', '现场笔录', '证据分类', '原始证据', '传来证据', '言词证据', '实物证据', '本证', '反证', '直接证据', '间接证据', '定案证据', '非定案证据', '法定证据', '非法定证据', '证明', '举证责任', '举证时限', '调取证据', '保全证据', '质证', '客观性', '关联性', '合法性', '可采性', '证明责任', '新证据', '重新鉴定', '逾期举证', '证据确凿', '证据不足', '高度盖然性', '审判程序', '行政复议', '复议前置', '行政复议中止', '行政复议终止', '可复议', '可诉讼', '不予受理', '先予受理', '指令再审', '被告不适格陪审', '回避', '不公开审理', '书面审理', '重复起诉', '诉讼中止', '诉讼终结', '撤诉', '驳回起诉', '缺席判决', '驳回诉讼请求', '维持原判', '改判', '撤销原判', '发回重审', '提审', '抗诉', '其他行政诉讼关键词', '可诉性', '不可诉', '证据保全', '具有普通约束力的决定', '具有普通约束力的命令', '对行政机关工作人员的奖惩', '对行政机关工作人员的任免', '行政不作为', '行政合同', '受理行为', '通告行为', '确认行为', '涉外行政诉讼', '先予执行', '不予执行', '财产保全', '自由裁量权', '听证', '电子政务', '政府信息公开'
];
KeywordList = Array.from(new Set(KeywordList));


export {CaseTypeList, DocumentTypeList, CaseProgramList, KeywordList};