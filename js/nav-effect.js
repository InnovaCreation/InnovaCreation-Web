window.onscroll = function() 
{ 
    var x, y; 
    if(window.pageYOffset) 
    {
        y = window.pageYOffset;    
        x = window.pageXOffset; 
    } else if(document.documentElement && document.documentElement.scrollTop) 
    {
        y = document.documentElement.scrollTop;    
        x = document.documentElement.scrollLeft; 
    } else if(document.body) 
    {
        y = document.body.scrollTop;    
        x = document.body.scrollLeft;   
    } 
 
    if(y>=700)
    {
        document.getElementById("nav").className = "ic-nav-thin"
    }
    else
    {
        document.getElementById("nav").className = "ic-nav-thick"
    }
}
