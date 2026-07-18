
window.addEventListener("pageshow",function(){
    buttonAbout.innerHTML="ℹ️ABOUT SYSTEM";
    buttonAbout.disabled=false;
   });
 
let params =new URLSearchParams(window.location.search);
let type =params.get("type");
let logintitle=document.getElementById("logintitle");
let idlabel=document.getElementById("idlabel");
let Loginbtn=document.getElementById("Loginbtn");
// let learnbtn=document.getElementById("learnbtn")
if(type=="leader"){
    logintitle.textContent="Leader Login";
    idlabel.textContent="Leader ID"
    Loginbtn.textContent="Leader"
    // learnbtn.textContent="studentID"
}else{
    logintitle.textContent="Student Login";
    idlabel.textContent="Student ID"
    Loginbtn.textContent="Student"
    // learnbtn.textContent="leader ID"
}
document.getElementById("learnbtn").addEventListener("click",function(){

 logintitle.textContent="Leader Login";
    idlabel.textContent="Leader ID"
    Loginbtn.textContent="Leader"
})

//    let params =new URLSearchParams(window.location.search);
//    let type =params.get("type");
//    console.log(type)
//    let logintitle=document.getElementById("logintitle");
//    console.log(logintitle);
//    if(type=="leader"){
//     logintitle.textContent="Leader Login";
//    }else{
//     logintitle.textContent="Student Login";
//    }
   function toggleDropdown(){
    document.getElementById("dropdownmenu").classList.toggle("show")
}
window.addEventListener("click",function(e){
    let dropdown=document.querySelector(".dropdown");
    if (!dropdown.contains(e.target)){
        document.getElementById("dropdownmenu").classList.remove("show");
    }
});
