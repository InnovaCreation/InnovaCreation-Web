var $or = true;
function Pagemove(i) 
{
    if($or == true)
    {
        $or = false
        $velocity = 1.5;//初速度，单位为像素/10毫秒
        $af = 11.5;//加速度系数
        /*↑可设置变量*/
        i = i * document.body.clientHeight/1080;
        $x=0;
        var y;
        if(window.pageYOffset)
        {
            y = window.pageYOffset;    
        } 
        else if(document.documentElement && document.documentElement.scrollTop) 
        {  
            y = document.documentElement.scrollTop;    
        }
        else if(document.body)
        {
            y = document.body.scrollTop;    
        }
        $timer = setInterval(function(){
            var z;
            if(window.pageYOffset)
            {
                z = window.pageYOffset;    
            } 
            else if(document.documentElement && document.documentElement.scrollTop) 
            {  
                z = document.documentElement.scrollTop;    
            }
            else if(document.body)
            {
                z = document.body.scrollTop;    
            }
            if(y<=i)
            {
                if(z<=i)
                {
                    if(z<=(i+y)/2)
                    {
                        $x = Math.abs(180/(i-y)*(z-y)+1);
                    }
                    else
                    {
                        $x = Math.abs(180/(i-y)*(z-y+1));
                    }
                    speed = Math.sin(2*Math.PI/360*$x)
                    target = z + $af*speed + $velocity;
                    window.scrollTo(0,target)
                }
                else
                {
                    clearInterval($timer);
                    $or = true;
                }
            }
            else
            {
                if(i<z)
                {
                    if(z<(i+y)/2)
                    {
                        $x = Math.abs(180/(i-y)*(z-y+1));
                    }
                    else
                    {
                        $x = Math.abs(180/(i-y)*(z-y+1));
                    }
                    speed = Math.sin(2*Math.PI/360*$x)
                    target = z - $af*speed - $velocity;
                    window.scrollTo(0,target)
                }
                else
                {
                    clearInterval($timer);
                    $or = true;
                }
            }
        },5)
    }
}