//Manage towers in-between battle phases
var Panel = function(){
    this.towers = [];
    this.shown = [];
};

Panel.prototype.setTowers=function(towers){
    this.towers=towers;
};

Panel.prototype.show=function(){
    for(var i=0;i<this.towers.length;i++){
        this.shown.push(new this.towers[i]({base:10,max:20},150*(i+1),1000));
    }
};

Panel.prototype.hide=function(){
    
};