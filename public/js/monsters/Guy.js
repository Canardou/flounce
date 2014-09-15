var Guy = function(life,gold,value,decay){
    //Guuuuuuuyyyyy !
    Monster.call(this,life,gold,value,decay);
    this.parts.create()
};

inh(Guy,Monster);



