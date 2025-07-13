import express from 'express';

const app = express();
const port = 3000;

app.get("/",(req,res)=>{
    res.set({"content-type":"text/html; charset=utf-8"});
    res.end("헬로 Express");
})

app.listen(port,()=>{
    console.log(`START SERVER : user ${port}`);
})