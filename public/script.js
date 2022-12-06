// getUsers button 
document.getElementById("btn-users").addEventListener('click', getUsers);

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
let em1=document.getElementById("uname").value;
let pwd=document.getElementById("password").value;

let luser=new User();
luser.setemail(`${em1}`);
luser.setPassword(`${pwd}`);
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

   console.log(regi.getFN());
   console.log(regi.getLN());
   console.log(regi.getemail());
   console.log(regi.getPassword());
   
}

let UserN= document.getElementById("note-form");
if(UserN) UserN.addEventListener('submit',page)

function takeNote(b){
   let Notepage= document.getElementById("note").value;
   let usr= new User(Notepage);
   usr.setNts(`${Notepage}`);

   console.log(usr.getNts());
}