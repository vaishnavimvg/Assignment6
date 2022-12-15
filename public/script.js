// getUsers button 
async function fetchData(route = '', data = {}, methodType) {
  const response = await fetch(`http://localhost:3000${route}`, {
    method: methodType, // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  if(response.ok) {
    return await response.json(); // parses JSON response into native JavaScript objects
  } else {
    throw await response.json();
  }
} 

// logout event listener
let logout = document.getElementById("logout-btn");
if(logout) logout.addEventListener('click', removeCurrentUser)

// stateful mechanism for user
// logging in a user
function setCurrentUser(user) {
  localStorage.setItem('user', JSON.stringify(user));
  window.location.href = "note.html";
}

// getting current user function
function getCurrentUser() {
  return JSON.parse(localStorage.getItem('user'));
}

// logout function for current user
function removeCurrentUser() {
  localStorage.removeItem('user');
  window.location.href = "login.html";
}

function getUsers() {
   
  fetch("http://localhost:3000/users/")
  .then((res)=> res.json())
  .then((data) => console.log(data))
  .catch((err)=> console.log(err))
  
}
class User 
{

   constructor()
   {
       
   }


   getFN(){
       return this.FN;
   
   }
   getLN(){
       return this.LN;
   }
   getemail(){
       return this.email;

   }
   getPassword()
   {
       return this.Password;
   }
   getNts()
   {
       return this.Ptext;
   }

   setFN(FName1){
       this.FN=FName1;
   }
   setLN(LName1){
       this.LN=LName1;
   }
   setemail(Email){
       this.email=Email;

   }
   setPassword(Password){
       this.Password=Password;
   }
   setNts(Ptext){
       this.Ptext=Ptext;
   }

}
let create= document.getElementById("login-form");
if(create) create.addEventListener('submit',login)

function login(e){
let eml1=document.getElementById("uname").value;
let pwd=document.getElementById("password").value;

let luser=new User();
luser.setemail(`${eml1}`);
luser.setPassword(`${pwd}`);
fetchData("/users/login",{"EmailId":eml1,"pwd":pwd},"POST").then((data) => {
  setCurrentUser(data);
})
.catch((err) =>{
  let p = document.querySelector('error');
  p.innerHTML = err.message;
});
console.log(luser.getemail());
console.log(luser.getPassword());
}

let Reg=document.getElementById("regsiter-form");
if(Reg) Reg.addEventListener('submit',breg)

function userRegister(r){
   let FU1= document.getElementById("fname").value;
   let Lr=document.getElementById("lname").value;
   let eml1=document.getElementById("uname").value;
   let pwd=document.getElementById("password").value;
   
   let regi= new User();
   regi.setFN(`${FU1}`);
   regi.setLN(`${Lr}`);
   regi.setemail(`${eml1}`);
   regi.setPassword(`${pwd}`);
   fetchData("/users/register",{"fName":FU1,"lName":Lr,"EmailId":eml1,"pwd":pwd},"POST").then((data) => {
    setCurrentUser(data);
  })
  .catch((err) =>{
    let p = document.querySelector('error');
    p.innerHTML = err.message;
  });
   
   console.log(regi.getFN());
   console.log(regi.getLN());
   console.log(regi.getemail());
   console.log(regi.getPassword());
}

let UserN= document.getElementById("note-form");
if(UserN) UserN.addEventListener('submit',takeNote)

function takeNote(b){
   let Notepage= document.getElementById("note").value;
   if(Notepage==""){
    return;
   }
   let usr= getCurrentUser();
   fetchData("/notes/addnote",{"EmailId":usr.EmailId,"note":Notepage},"POST").then((data) => {
    window.location.href = "note.html";
  })
  .catch((err)=> {
    let p = document.querySelector('.error');
    p.innerHTML = err.message;
  })
}
let notes = document.querySelector('notes');
if(notes&&getCurrentUser()) {
  let usr= getCurrentUser();
  notes.innerHTML = `
    <ul>
  `
  fetch("http://localhost:3000/notes/")
  .then((res)=> res.json())
  .then((data) => {
    for (const note in data) {
      console.log(data[note]+" "+usr.EmailId);
      if (data[note].EmailId==usr.EmailId) {
        notes.innerHTML = notes.innerHTML+`
          <li>${data[note].note}</li>
        `
      }
    }
  })
  .catch((err)=> {
    let p = document.querySelector('notes');
    p.innerHTML = err.message;
  })
  notes.innerHTML = notes.innerHTML+`
    </ul>
  `
} else {
  if(notes) window.location.href = "login.html";
}