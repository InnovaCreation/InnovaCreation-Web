window.onscroll = function() 
{ 
    var x, y; 
    if(window.pageYOffset) 
    {    // all except IE    
        y = window.pageYOffset;    
        x = window.pageXOffset; 
    } else if(document.documentElement && document.documentElement.scrollTop) 
    {    // IE 6 Strict    
        y = document.documentElement.scrollTop;    
        x = document.documentElement.scrollLeft; 
    } else if(document.body) 
    {    // all other IE    
        y = document.body.scrollTop;    
        x = document.body.scrollLeft;   
    } 
 
    if(y>=100)
    {

        document.getElementById("nav").className = "ic-nav-down";
        //id输入替换nav
    }
    else
    {
        document.getElementById("nav").className = "ic-nav-up";
        //id输入替换nav
    }
}
