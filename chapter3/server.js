import http from 'http';
import url from 'url';

const server = http.createServer((req,res)=>{
    const path = url.parse(req.url,true).pathname;
    res.setHeader('Content-type','text/html;charset=utf-8');
    
    if (path in urlMap){
        urlMap[path](req,res);
    }else {
        not_found(req,res);
    }
}).listen(8000,()=> console.log('서버 구동'));


const user = (req,res)=>{
    const userInfo = url.parse(req.url,true).query;
    res.end(`[user] name : ${userInfo.name}, age: ${userInfo.age}`);
}

const feed = (req,res) => {
    res.end(`
        <ul>
        <li>picture1</li>
        <li>picture2</li>
        <li>picture3</li>
        </ul>`)
}

const not_found = (req,res)=>{
    res.statusCode = 404;
    res.end('404 page not found');
}
const urlMap = {
    "/":(req,res)=>res.end("HOME"),
    "/user":user,
    "/feed":feed
}