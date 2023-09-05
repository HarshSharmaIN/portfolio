document.querySelector("#hamburger").addEventListener("click" , ()=>{
  document.querySelector("#links").classList.toggle("hiddenResp");
})

if (window.screen.width > 425){
window.onscroll = function scrollFunction(){
    if (document.body.scrollTop > 60 || document.documentElement.scrollTop > 60) {
        document.getElementById("nav").classList.add('scroll-nav');
        document.getElementById("logo").classList.add('scroll-logo');
      }
      else {
        document.getElementById("nav").classList.remove('scroll-nav');
        document.getElementById("logo").classList.remove('scroll-logo');
      }
  }
}

const crntyear = new Date().getFullYear();
const nextyear = crntyear+1;

document.querySelector("#crntyear").innerText = crntyear+"-"+nextyear;