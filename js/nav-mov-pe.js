function slide()
{
    document.getElementById("navpe").className="ic-nav-pe-down";
    var cover = document.getElementById("cover");
    var bgalpha = 0;
    var target = 30;
    var timer = setInterval(function()
    {
        if(bgalpha<target)
        {
            bgalpha = bgalpha + 1;
            cover.style.visibility = "visible";
            cover.style.filter = 'alpha(opacity='+bgalpha+')';//IE核
            cover.style.opacity = bgalpha/100;//非IE核
        }
        else
        {
            clearInterval(timer);
        }
    },30)
}

function clearslide()
{
    document.getElementById("navpe").className="ic-nav-pe-up";
    var cover = document.getElementById("cover");
    var bgalpha = 30;
    var target = 0;
    var timer2 =setInterval(function()
    {
        if(bgalpha>target)
        {
            bgalpha = bgalpha - 1;
            cover.style.filter = 'alpha(opacity='+bgalpha+')';//IE核
            cover.style.opacity = bgalpha/100;//非IE核
        }
        else
        {
            cover.style.visibility = "hidden";
            clearInterval(timer2);
        }
    },30)
}