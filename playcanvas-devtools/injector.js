(function() {
    var baseUrl;
    if (window.__overrideurl__) {
        baseUrl = window.__overrideurl__;
        console.log('Using url override ' + baseUrl);
    } else {
        baseUrl = 'https://yaustar.github.io/playcanvas-devtools/';
        console.log('Using @yaustar GitHub');
    }
    
    var app = pc.Application.getApplication();

    var callback = function() {
        window.__pcDevtoolsConstruct__(baseUrl, app, window);
    };

    var constructorScript = document.createElement('script');
    constructorScript.src = baseUrl + 'constructor.js';
    constructorScript.onload = function () {
        callback();
    };
    document.head.appendChild(constructorScript);
})();