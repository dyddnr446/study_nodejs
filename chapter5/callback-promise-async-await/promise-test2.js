const DB = [];

function saveDB(user){
    const oldDBSize = DB.length;
    DB.push(user)
    console.log(`save ${user.name} to DB`);
    return new Promise((resolve, reject)=>{
        if (DB.length > oldDBSize){
            resolve(user);
        }else{
            reject(new Error("save DB Error!"));
        }
    });
}

function sendEmail(user){
    console.log(`email to ${user.name}`);
    return new Promise((resolve, reject)=>{
        resolve(user);
    });
}

function getResult(user){
    return new Promise((resolve,reject)=>{
        resolve(`success register ${user.name}`);
    });
}

function registerByPromise(user){
    const result = saveDB(user).then(sendEmail).then(getResult);
    console.log(result);
    return result
}
const myUser = {email:"dyddnr446@gmail.com", password:"hi", name:"yonguk"}
const allResult = Promise.all([saveDB(myUser), sendEmail(myUser), getResult(myUser)]);
allResult.then(console.log);

