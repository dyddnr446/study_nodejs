import {MongoClient, ServerApiVersion } from 'mongodb'

const uri = "mongodb+srv://dyddnr446:dnr31245!@cluster0.6jj4r64.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";


const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();
    
    console.log('db 접속 성공');
    
    const collection = client.db('test').collection('person');

    //문서 추가하기
    await collection.insertOne({ name:'Andy', age:30});
    console.log('문서 추가 완료');

    //문서 찾기
    const documents = await collection.find({ name : 'Andy'}).toArray();
    console.log('찾은 문서:', documents);
    //문서 갱신하기
    await collection.updateOne({name: 'Andy'}, {$set: { age: 31}});
    console.log('문서 업데이트');
    //갱신된 문서 확인하기
    const updateDocuments = await collection.find({name:'Andy'}).toArray();
    console.log('갱신된 문서:',updateDocuments);
    
    // await collection.deleteOne({ name: 'Andy' });
    // console.log('문서삭제');

  }catch (err){
    console.error(err);
  }
  finally {
    await client.close();
  }
}

run()
    .then(console.log)
    .catch(console.error);