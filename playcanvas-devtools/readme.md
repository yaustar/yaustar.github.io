# How to add to a PlayCanvas App

Create a bookmarklet by making a new bookmark and changing URL to the following:
```
javascript:(function(){var a=document.createElement('script');a.src='https://raw.githubusercontent.com/yaustar/playcanvas-devtools-injector/master/injector.js';document.head.appendChild(a);})();
```