let userlastvisitedpage = "https://soundcloud.com/discover"
let webview = document.querySelector("#webview")
webview.setAttribute("src", "https://soundcloud.com/discover")


var cssLink = document.createElement("link");
cssLink.href = "main.css";
cssLink.rel = "stylesheet";
cssLink.type = "text/css";
document.head.appendChild(cssLink);
