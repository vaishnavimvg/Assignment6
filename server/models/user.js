const con = require("./db_connect");


async function createTable() {
let sql=`CREATE TABLE IF NOT EXISTS users (
  UserId INT NOT NULL AUTO_INCREMENT,
  fName VARCHAR(255) NOT NULL,
  lName VARCHAR(255) NOT NULL,
  EmailId VARCHAR(255) NOT NULL UNIQUE,
  pwd VARCHAR(255) NOT NULL,
  CONSTRAINT userPK PRIMARY KEY(UserId)
); `
await con.query(sql);
}
createTable();

async function register(user) {
let cUser = await getUser(user.EmailId);
console.log(user)
if(cUser.length > 0) throw error("email already in use");

const sql = `INSERT INTO users (fName,lName,EmailId, pwd)
  VALUES ("${user.fName}", "${user.lName}","${user.EmailId}","${user.pwd}");
`
await con.query(sql);
return await login(user);
}


async function getAllUsers() {
 const sql = "SELECT * FROM users;";
 let users = await con.query(sql);
 console.log(users)
 return users;
}


async function getUser(user) {
  let sql;
  
  if(user.UserId) {
    sql = `
      SELECT * FROM users
       WHERE UserId = ${user.UserId}
    `
  } else {
    sql = `
    SELECT * FROM users 
      WHERE EmailId = "${user.EmailId}"
  `;
  }
  return await con.query(sql);  
  }


async function login(user) { 
  console.log(user.EmailId);
let cUser = await getUser(user); 

if(!cUser[0]) throw Error("email not found");
if(cUser[0].pwd !== user.pwd) throw Error("Password incorrect");
console.log(cUser[0]);

return cUser[0];
}

async function editUser(user) {
  let sql = `UPDATE users 
    SET EmailId = "${user.EmailId}"
    WHERE UserId = ${user.UserId}
  `;
  
  await con.query(sql);
  let updatedUser = await getUser(user);
  return updatedUser[0];
  }

async function deleteUser(user) {
  let sql = `DELETE FROM users
    WHERE UserId = ${user.UserId}
  `
  await con.query(sql);
  }


module.exports = { getAllUsers, login, register, deleteUser, editUser};