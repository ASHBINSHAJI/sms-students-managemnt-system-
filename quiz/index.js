function toggleDropdown(){
    document.getElementById("dropdownmenu").classList.toggle("show")
}
window.addEventListener("click",function(e){
    let dropdown=document.querySelector(".dropdown");
    if (!dropdown.contains(e.target)){
        document.getElementById("dropdownmenu").classList.remove("show");
    }
});
let start=document.getElementById("button");
start.addEventListener("click",function(){

// });
    button.disabled=true;
    let dots=0;
    let animation=setInterval(function(){
        dots=(dots+1)%4;
        button.innerHTML="Intializing"+".".repeat(dots);
    },400);
    setTimeout(function(){
        clearInterval(animation);
        window.location.href="enter.html"
    },2000);
    window.addEventListener("pageshow",function(){
        button.innerHTML="ENTER SYSTEM ➡️ ";
        button.disabled=false;
    })
});
let buttonAbout=document.getElementById("buttonAbout");
buttonAbout.addEventListener("click",function(){
  buttonAbout.disabled=true;
   let dots=0;
   let animation=setInterval(function(){
    dots=(dots+1)%4;
    buttonAbout.innerHTML="Finding"+".".repeat(dots);
   },400);
   setTimeout(function(){
  clearInterval(animation);
  window.location.href="about.html"
   },2000);
   

});
window.addEventListener("pageshow",function(){
    buttonAbout.innerHTML="ℹ️ABOUT SYSTEM";
    buttonAbout.disabled=false;
   });