const con = require("./db_connect");

async function createTable() {
let sql=`CREATE TABLE IF NOT EXISTS notes (
  NoteId INT NOT NULL AUTO_INCREMENT,
  EmailId VARCHAR(255) NOT NULL,
  note VARCHAR(255) NOT NULL,
  CONSTRAINT notePK PRIMARY KEY(NoteId)
); `
await con.query(sql);
}
createTable();

async function getAllNotes() {
 const sql = "SELECT * FROM notes;";
 let notes = await con.query(sql);
 console.log(notes)
 return notes;
}

async function create(note) {

const sql = `INSERT INTO notes (EmailId, note)
  VALUES ("${note.EmailId}","${note.note}");
`

await con.query(sql);
return {success:"Note Added"};
}

async function read(note) {
  let sql;
  
    sql = `
      SELECT * FROM notes
       WHERE NoteId = ${note.NoteId}
    `
  
  return await con.query(sql);  
}

async function modify(note) {
  let sql = `UPDATE notes 
    SET note = "${note.note}"
    WHERE NoteId = ${note.NoteId}
  `;
  
  await con.query(sql);
  let updatedNote = await read(note);
  return updatedNote[0];
}

async function remove(note) {
  let sql = `DELETE FROM notes
    WHERE NoteId = ${note.NoteId}
  `
  await con.query(sql);
  }

module.exports = { getAllNotes, create, read, modify, remove};