import paginator from "../utils/paginator.js"
import { ObjectId } from "mongodb";

async function writePost(collection, post){
    post.hits=0;
    post.createDt = new Date().toISOString();
    return await collection.insertOne(post);
}

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

const projectOption ={
    projection:{
        passworld: 0,
        "comments.password":0,
    }
}

async function getDetailPost(collection, id) {
    return await collection.findOneAndUpdate({_id:ObjectId(id)}, {$inc : {hits:1}}, projectOption);
}
export default{
    writePost,
    list,
    getDetailPost,
}