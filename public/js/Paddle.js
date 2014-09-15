/*global game,pi,cos,sin,def,isDef,rand from utils.js*/
var Paddle=function(x,y,orientation,small,initial_angle,angle_max,speed){
    //Constants and functions
    this.initial_angle = def(initial_angle,0.5);
    this.angle_max = def(angle_max,0.9);
    this.speed = def(speed,10);
    var generate_paddle=function(cx,cy,img){
        var paddle=game.add.sprite(x,y,img);
        paddle.pivotOffsetX = cx;
        paddle.pivotOffsetY = cy;
        game.physics.p2.enableBody(paddle,true);
        paddle.body.clearShapes();
        return paddle;
    };
    
    this.small=small||false;
    switch(orientation){
        case 'right':
        case 0:
            if(small){
                this.paddle=generate_paddle(45,-15,'flipperRightSmallImg');
                this.paddle.body.loadPolygon('paddle_physics','flipper_right_small');
            }
            else{
                this.paddle=generate_paddle(45,-15,'flipperRightImg');
                this.paddle.body.loadPolygon('paddle_physics','flipper_right');
            }
            this.orientation=1;
            
            break;
        case 'left':
        case 1:
            if(small){
                this.paddle=generate_paddle(45,-15,'flipperLeftSmallImg');
                this.paddle.body.loadPolygon('paddle_physics','flipper_left_small');
            }
            else{
                this.paddle=generate_paddle(45,-15,'flipperLeftImg');
                this.paddle.body.loadPolygon('paddle_physics','flipper_left');
            }
            this.orientation=-1;
            break;
    }
    
    this.paddle.pivotPoint=game.add.sprite(this.paddle.position.x + this.paddle.pivotOffsetX,
                                            this.paddle.position.y + this.paddle.pivotOffsetY);
    
    game.physics.p2.enable(this.paddle.pivotPoint,true);
    this.paddle.pivotPoint.body.static=true;
    this.paddle.pivotPoint.body.clearCollision(true,true);
    this.paddle.flipperConstraint=game.physics.p2.createRevoluteConstraint(this.paddle,
                                                                            [this.paddle.pivotOffsetX,this.paddle.pivotOffsetY],
                                                                            this.paddle.pivotPoint,
                                                                            [0, 5]);
    
    this.paddle.flipperConstraint.upperLimitEnabled=true;
    this.paddle.flipperConstraint.lowerLimitEnabled=true;
    this.paddle.flipperConstraint.lowerLimit=this.orientation*this.initial_angle;
    this.paddle.flipperConstraint.upperLimit=this.orientation*this.initial_angle;
    
    this.paddle.flipperConstraint.enableMotor();
    this.paddle.flipperConstraint.setMotorSpeed(this.orientation*this.speed);
};

Paddle.prototype.up=function(x,y){
    if(this.orientation==1)
        this.paddle.flipperConstraint.lowerLimit=this.orientation*this.initial_angle-this.angle_max;
    else
        this.paddle.flipperConstraint.upperLimit=this.orientation*this.initial_angle+this.angle_max;
};

Paddle.prototype.down=function(x,y){
    if(this.orientation==1)
        this.paddle.flipperConstraint.lowerLimit=this.orientation*this.initial_angle;
    else
        this.paddle.flipperConstraint.upperLimit=this.orientation*this.initial_angle;
};

Paddle.prototype.destroy=function(){
    this.paddle.pivotPoint.destroy();
    this.paddle.destroy();
};