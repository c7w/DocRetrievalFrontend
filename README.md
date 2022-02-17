# Doc Retrieval Frontend

## Querying API

要想搜索对应字段（右），需要传入 `[GET] /api/query` 的 params 的字段（左）如下：

F + q -> document0content
F + dtype -> document0type
F + dcourt -> document0court
F + ctype -> case0type
F + cprogram -> case0program
F + cid -> case0id
F + cname -> case0name
+ creason -> case0reason
+ cresult -> case0result
+ carticle -> case0article
F + tstart -> case0date (In format YYYY-mm-dd)
F + tstop -> case0date
+ page -> page (Not larger than 1000)