var Monster = function(life,gold,value,decay){
    this.life=life;
    this.gold=gold;
    this.value=def(value,0);
    this.decay=def(decay,false);
    this.dead=false;
    this.parts=game.add.group();
};

Monster.prototype.die=function(){
    this.dead=true;
};

Monster.prototype.getHit=function(damage){
    if(!this.dead){
        this.life-=this.damage;
        if(this.life<0){
            this.life=0;
            this.die();
            for (var part in this.parts){
                this.parts[part].die();
            }
        }
    }
};