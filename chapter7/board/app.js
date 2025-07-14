import express from "express";
import handlebars from "express-handlebars";
import path from "path";
import { fileURLToPath } from "url";
import { Collection } from "mongodb";
import mongoConnection from "./configs/mongodb.js";
import helper from "./configs/handlebars-helpers.js";
import postService from "./services/post-service.js";
import { title } from "process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

//미들웨어 사용
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//handlebars 엔진 사용 및 세팅
app.engine(
  "hbs",
  handlebars.engine({
    helpers: helper,
    extname: ".hbs",
    defaultLayout: "main",
  })
);
app.set("view engine", "hbs");
app.set("views", __dirname + "/views");

let collection;

app.listen(3000, async () => {
  console.log("서버 시작");
  const mongoClient = await mongoConnection();
  collection = mongoClient.db().collection("post");
  console.log("Mongodb Connect");
});

//메인 화면
app.get("/", async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const search = req.query.search || "";
  try {
    const [posts, paginator] = await postService.list(collection, page, search);
    res.render("home", { title: "테스트 게시판", search, paginator, posts });
  } catch (error) {
    console.error(error);
    res.render("home", { title: "테스트 게시판" });
  }
});

//글 내용 상세보기
app.get("/detail/:id", async (req, res) => {
  const result = await postService.getDetailPost(collection, req.params.id);
  res.render("detail", {
    title: "테스트 게시판",
    post: result,
  });
});

//
app.get("/write", async (req, res) => {
  res.render("write", { title: "테스트 게시판", mode: "create" });
});

//글쓰기
app.post("/write", async (req, res) => {
  const post = req.body;
  const result = await postService.writePost(collection, post);

  res.redirect(`/detail/${result.insertedId}`);
});



//비밀번호 확인 요청
app.post("/check-password", async (req, res) => {
  const { id, password } = req.body;
  const post = await postService.getPostByIdAndPassword(collection, {
    id,
    password,
  });
  if (!post) {
    return res.status(404).json({ isExist: false });
  } else {
    return res.json({ isExist: true });
  }
});

//글 수정 화면 접속
app.get("modify/:id", async (req, res) => {
  const post = await postService.getPostById(collection, req.params.id);
  console.log(post);
  res.render("write", { title: "테스트 게시판", mode: "modify", post });
});

//글 수정 요청
app.post("modify/:id", async (req, res) => {
    const {id, title, writer, password, content } = req.body;
    const post = {
        title,
        writer,
        password,
        content,
        createDt: new Date().toISOString(),
    }

    const result = postService.updatePost(collection, id, post);
    res.redirect(`/detail/${id}`);
});