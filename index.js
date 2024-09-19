import http from "http"
import myDateTime from "./date"
import {getParamsURL,getPath} from "./getURL"
http.createServer(function (req, res){
    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
    res.write(myDateTime() + "<br>");
    res.write(getPath(req)+"<br>");
    res.write(getParamsURL(req) + "<br>");
    res.end('Hello KTPM0121, chúc bạn thành công với Nodejs');
}).listen(8080);