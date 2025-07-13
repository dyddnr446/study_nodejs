import url from 'url';
import express from 'express';

const app = express();
const port = 3000;

app.listen(port,()=>{
    console.log(`서버를 구동합니다.${port}`)
})

app.get("/",(req,res)=>res.end("HOME"));
app.get("/user", user);
app.get("/feed",feed);

function user(req, res){
    const user = url.parse(req.url,true).query;
    res.json(`[user] name : ${user.name}, age: ${user.age}`);
}

function feed(req,res){
    res.json(`
    <ul>
    <li>picture1</li>
    <li>picture2</li>
    <li>picture3</li>
    </ul>`);
}