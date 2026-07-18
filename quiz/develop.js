function toggleDropdown(){
    document.getElementById("dropdownmenu").classList.toggle("show")
}
window.addEventListener("click",function(e){
    let dropdown=document.querySelector(".dropdown");
    if (dropdown.contains(e.target)){
        document.getElementById("dropdownmenu").classList.remove("show");
    }
});//guest page code
