import paginator from "../utils/paginator.js"
import { ObjectId } from 'mongodb';

//글 작성
async function writePost(collection, post){
    post.hits=0;
    post.createDt = new Date().toISOString();
    return await collection.insertOne(post);
}

//글 리스트 출력
async function list(collection, page, search) {
    const perPage = 10;
    const query = { title: new RegExp(search, "i")};
    const cursor = collection.find(query, { limit : perPage, skip: (page-1)*perPage}).sort({
        createdDt: -1,
    });

    const totalCount = await collection.count(query);
    const posts = await cursor.toArray();
    const paginatorObj = paginator({totalCount, page, perPage: perPage});
    return [posts, paginatorObj];
}

//project 설정 및 id 검색
const projectOption ={
    projection:{
        password: 0,
        "comments.password":0,
    }
}
async function getDetailPost(collection, id) {
    return await collection.findOneAndUpdate({_id: new ObjectId(id)}, {$inc : {hits:1}}, projectOption);
}

//데이터 불러오기
async function getPostByIdAndPassword(collection, {id, password}) {
    return await collection.findOne({_id: new ObjectId(id), password:password},projectOption);
}

//id로 데이터 불러오기
async function getPostById(collection, id) {
    return await collection.findOne({_id: new ObjectId(id)},projectOption);
}
//게시글 수정
async function updatePost(collection, id, post) {
    const toUpdatePost ={
        $set:{
            ...post,
        },
    };
    return await collection.updateOne({_id: new ObjectId(id)}, toUpdatePost);
}
export default{
    writePost,
    list,
    getDetailPost,
    getPostByIdAndPassword,
    getPostById,
    updatePost
}