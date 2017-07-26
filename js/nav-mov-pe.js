var $i = 0;
function slide()
{
    if($i == 0){
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
                cover.style.filter = 'alpha(opacity='+bgalpha+')';
                cover.style.opacity = bgalpha/100;
            }
            else
            {
                clearInterval(timer);
                $i = 1;
            }
        },30)
    }
}

function clearslide()
{
    if($i == 1){
        $i = 0;
        document.getElementById("navpe").className="ic-nav-pe-up";
        var cover = document.getElementById("cover");
        var bgalpha = 30;
        var target = 0;
        var timer2 =setInterval(function()
        {
            if(bgalpha>target)
            {
                bgalpha = bgalpha - 1;
                cover.style.filter = 'alpha(opacity='+bgalpha+')';
                cover.style.opacity = bgalpha/100;
            }
            else
            {
                cover.style.visibility = "hidden";
                clearInterval(timer2);
            }
        },30)
    }
}