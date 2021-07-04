console.log('nav-show.js');
window.onscroll = function(){
    // 1 获取滚动条滚动距离
    var top = document.documentElement.scrollTop;
    // 2 获取到顶部的div tagName= nav
    var nav = document.getElementsByTagName('nav')[0];
    
    // 加入top >= 444 nav出现
    if(top>=222){
        nav.style.position='fixed';
        nav.style.top='0';
        nav.style.height='48px';
        nav.style.display='block';
        nav.style.zIndex='10';
    }else {
        nav.style.display='none';
    }
}