/*global game,pi,cos,sin,def,isDef,rand from utils.js*/
var Paddle = function(damage, x, y, orientation, small, initial_angle, angle_max, speed) {
    //Building.call(this,damage);
    //Constants and functions
    this.initial_angle = def(initial_angle, 0.7);
    this.angle_max = def(angle_max, 0.9);
    this.speed = def(speed, 12);
    this.sound = game.add.audio('paddle1');
    /**
     * Generate the base of paddle, without the body physics
     * @param cx pivot point x
     * @param cy pivot point y
     * @param img sprite reference
     */
    var generate_paddle = function(cx, cy, img) {
        var paddle = game.add.sprite(x-cx, y-cy, img);
        game.global.depth[4].add(paddle);
        paddle.pivotOffsetX = cx;
        paddle.pivotOffsetY = cy;
        game.physics.p2.enableBody(paddle);
        paddle.body.clearShapes();
        return paddle;
    };
    //Starting creation
    this.small = small || false;
    //Left or right sprite
    //cx and cy must be the pivot point of the paddle
    switch (orientation) {
        case 'right':
        case 0:
            if (small) {
                this.paddle = generate_paddle(45, -15, 'flipperRightSmallImg');
                this.paddle.body.loadPolygon('paddle_physics', 'flipper_right_small');
            }
            else {
                this.paddle = generate_paddle(50, 0, 'paddle_right');
                this.paddle.body.loadPolygon('paddle_physics', 'paddle_right_reg');
            }
            this.orientation = 1;

            break;
        case 'left':
        case 1:
            if (small) {
                this.paddle = generate_paddle(45, -15, 'flipperLeftSmallImg');
                this.paddle.body.loadPolygon('paddle_physics', 'flipper_left_small');
            }
            else {
                this.paddle = generate_paddle(-50, 0, 'paddle_left');
                this.paddle.body.loadPolygon('paddle_physics', 'paddle_left_reg');
            }
            this.orientation = -1;
            break;
    }
    //Physics of the pivot
    //Add a pivot point
    this.paddle.pivotPoint = game.add.sprite(this.paddle.position.x + this.paddle.pivotOffsetX,
        this.paddle.position.y + this.paddle.pivotOffsetY);
    //Physics of the pivot : static, no collision, revolute constraint with upper/lower limit
    game.physics.p2.enable(this.paddle.pivotPoint);
    this.paddle.pivotPoint.body.static = true;
    this.paddle.pivotPoint.body.clearCollision(true, true);
    this.paddle.flipperConstraint = game.physics.p2.createRevoluteConstraint(this.paddle, [this.paddle.pivotOffsetX, this.paddle.pivotOffsetY],
        this.paddle.pivotPoint, [0, 5]);
    this.paddle.flipperConstraint.upperLimitEnabled = true;
    this.paddle.flipperConstraint.lowerLimitEnabled = true;
    this.paddle.flipperConstraint.lowerLimit = this.orientation * this.initial_angle;
    this.paddle.flipperConstraint.upperLimit = this.orientation * this.initial_angle;
    //The motor allow movement when upper limit (or lower limit, depends of orientation) is raised
    this.paddle.flipperConstraint.enableMotor();
    this.paddle.flipperConstraint.setMotorSpeed(this.orientation * this.speed);
    this.paddle.body.setCollisionGroup(game.global.playerCollisionGroup);
    this.paddle.body.collides(game.global.enemiesCollisionGroup, this.hit, this);
    this.paddle.body.collides(game.global.limbsCollisionGroup);
    this.paddle.body.mass = 10;
    this.entity=this.paddle;
    this.design=this.paddle;
};

Paddle.prototype.up = function(x, y) {
    //Function to call when key is pressed
    if (this.orientation == 1)
        this.paddle.flipperConstraint.lowerLimit = this.orientation * this.initial_angle - this.angle_max;
    else
        this.paddle.flipperConstraint.upperLimit = this.orientation * this.initial_angle + this.angle_max;
    this.sound.play();
};

Paddle.prototype.down = function(x, y) {
    //Function to call when key is released (resting)
    if (this.orientation == 1)
        this.paddle.flipperConstraint.lowerLimit = this.orientation * this.initial_angle;
    else
        this.paddle.flipperConstraint.upperLimit = this.orientation * this.initial_angle;
};

Paddle.prototype.destroy = function() {
    //Remove the paddle
    this.paddle.pivotPoint.destroy();
    this.paddle.destroy();
};