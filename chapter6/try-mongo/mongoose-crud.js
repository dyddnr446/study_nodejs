import express from "express";
import bodyparse from "body-parser";
import mongoose from "mongoose";
import Person from "./person-model.js";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());

app.listen(3000, () => {
  console.log("Server started");
  const mongodbUri =
    "mongodb+srv://dyddnr446:dnr31245!@cluster0.6jj4r64.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

  mongoose.connect(mongodbUri, {}).then(console.log("Connected to MongoDB"));
  mongoose.set("strictQuery", false);
});

//전체 조회
app.get("/person", async (req, res) => {
  const person = await Person.find({});
  res.send(person);
});

//특정 이메일로 찾기
app.get("/person/:email", async (req, res) => {
  const person = await Person.findOne({ email: req.params.email });
  res.send(person);
});
//person 데이터 추가하기
app.post("/person", async (req, res) => {
  const person = new Person(req.body);
  await person.save();
  res.send(person);
});
//person 데이터 수정하기
app.put("/person/:email", async (req, res) => {
  const person = await Person.findOneAndUpdate(
    { email: req.params.email },
    { $set: req.body },
    { new: true }
  );
  console.log(person);
  res.send(person);
});

app.delete("/person/:email", async (req, res) => {
  await Person.deleteMany({ email: req.params.email });
  res.send({ success: true });
});
