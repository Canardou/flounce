var GameData = function(){
	this.checkCookie();
};

GameData.prototype.setCookie = function(cname,cvalue,exdays) {
	var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname+"="+cvalue+"; "+expires;
};

GameData.prototype.getCookie = function(cname) {
	var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) != -1) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
};

//Check if the user already exists : if not => TO DO
GameData.prototype.checkCookie = function() {
    var user=getCookie("username");
    if (user !== "") {
        this.currentLvl = getCookie(currentLvl);
		this.username =  getCookie(username);
		this.topScore = getCookie(topScore);
    } else {
       //user = prompt("Please enter your name:","");
       this.currentLvl = 0;
       this.topScore = 0;
       this.username = "JohnDoe";
       setCookie("username", this.username, game.global.EXPDATE);
       setCookie("currentLvl", 0, game.global.EXPDATE);
       setCookie("topScore", 0, game.global.EXPDATE);
    }
};
