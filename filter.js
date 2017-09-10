
var req = new XMLHttpRequest();
req.open('GET', document.location, false);
req.send(null);
var headers = req.getAllResponseHeaders().toLowerCase();

//alert(headers);
var count =0;
 //var patt = /location.origin/i
alert("Page domain "+ location.host);
//window.location.href;
var scripts = document.getElementsByTagName('script');
for (var i=0,l=scripts.length; i<l ;i++){
    var script_src=scripts[i].src;
    if(script_src)
    {
        if(script_src.search(location.host)<0)
        {

              scripts[i].innerHTML ='  ';
              scripts[i].src="",
              //window.alert("script Source = " + scripts[i].src);
              count=count+1;
     
        }
        
    }
    
   
}
im_count=0;
var images = document.getElementsByTagName('img');
for (var i=0,l=images.length; i<l ;i++){
    var image_src=images[i].src;
    if(image_src)
    {
        if(image_src.search(location.host)<0)
        {
              //window.alert("image Source = " + images[i].src);
              images[i].src  ='  ';
              im_count=count+1;
     
        }
        
    }
    
   
}
alert(count + '   scripts blocked');
alert(im_count + '   images blocked');
var content=req.responseText;

if(content.search(document.cookie)<0)
{
   alert("Cookie value accessed"); 
}

