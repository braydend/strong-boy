SetupTheme();

function SetupTheme(){
  //if desktop, use dashboard theme
  if( navigator.userAgent.match(/Android/i)
 || navigator.userAgent.match(/webOS/i)
 || navigator.userAgent.match(/iPhone/i)
 || navigator.userAgent.match(/iPad/i)
 || navigator.userAgent.match(/iPod/i)
 || navigator.userAgent.match(/BlackBerry/i)
 || navigator.userAgent.match(/Windows Phone/i)
 ){
    alert("Mobile");
    document.getElementById("dashboard-top").className += " mobile-top col-xs-12";
    document.getElementById("dashboard-title").className += " mobile-title col-xs-12";
    document.getElementById("dashboard-nav").className += " mobile-nav col-xs-12";
    var navItems = document.getElementsByName("dashboard-nav-item");
    for(var i = 0; i < navItems.length; i++){
      navItems[i].className += " mobile-nav-item";
    }
  }else{
     alert("Desktop");
     //Apply fixed position tags to divs
     document.getElementById("dashboard-top").className += " col-lg-10 position-fixed dashboard-top";
     document.getElementById("dashboard-title").className += " col-lg-2 position-fixed dashboard-title";
     document.getElementById("dashboard-nav").className += " col-lg-2 position-fixed dashboard-nav";
     document.getElementById("dashboard-content").className += " col-lg-10 dashboard-content";
     var navItems = document.getElementsByName("dashboard-nav-item");
     for(var i = 0; i < navItems.length; i++){
       navItems[i].className += " dashboard-nav-item";
     }
   }
}
