import express from 'express';
import handlebars from 'express-handlebars';
import path from 'path';
import {fileURLToPath} from 'url';
import { Collection } from 'mongodb';
import mongoConnection from './configs/mongodb.js';
import helper from './configs/handlebars-helpers.js';
import postService from './services/post-service.js'


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.engine("hbs", handlebars.engine({
    helpers: helper,
    extname: '.hbs',
    defaultLayout: 'main'
}));
app.set("view engine", "hbs");
app.set("views", __dirname + "/views");

let collection;

app.listen(3000, async ()=>{
    console.log("서버 시작");
    const mongoClient = await mongoConnection();
    collection= mongoClient.db().collection("post");
    console.log("Mongodb Connect")
});

app.get("/", async (req,res) => {
    const page = parseInt(req.query.page) || 1;
    const search = req.query.search || "";
    try{
        const [posts, paginator] = await postService.list(collection, page, search);
        res.render("home",{title:"테스트 게시판", search, paginator, posts});
    }catch(error){
        console.error(error);
        res.render("home",{title:"테스트 게시판"});
    }
    
});

app.get("/write",(req,res)=>{
    res.render("write", {title:"테스트 게시판"})
});

app.get("/detail/:id", async (req,res)=>{
    const result = await postService.getDetailPost(collection, req.params.id);
    res.render("detail",{
        title:"테스트 게시판",
        post: result.value,
    });
});

app.post("/write", async (req,res)=>{
    const post = req.body;
    const result = await postService.writePost(collection, post);

    res.redirect(`/detail/${result.insertedId}`);
});

