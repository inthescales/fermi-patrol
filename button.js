var Button = function(text, x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.clicked = false;
    this.hovered = false;
    this.text = text;
    this.mouseover_sound = null;
    this.click_sound = null;
    this.enabled = true;
}
 
Button.prototype = _.extend(Button.prototype, UIObject);

Button.prototype.setSounds = function(profile) {

    switch (profile) {
        case "side":
            this.mouseover_sound = "mouseover_side";
            this.click_sound = "click_side";
            break;
    }
}

Button.prototype.update = function(canvas) {
    var wasNotClicked = !this.clicked;
    
    var wasHovered = this.hovered;
    
    this.updateStats(canvas);
    
    if (!wasHovered && this.hovered && !this.hidden && this.enabled) {
        play_sound(this.mouseover_sound);
    }
 
    if (this.clicked && wasNotClicked && this.enabled) {
        if (!_.isUndefined(this.handler)) {
            play_sound(this.click_sound);
            this.handler();
            canvas.mouse.clicked = false;
        }
    }
}

Button.prototype.draw = function(canvas) {

    if (this.hidden == true) {
        return;
    }

    //set color
    if (!this.enabled) {
        canvas.fillStyle = "rgb(140, 140, 140)";
    } else if (this.hovered) {
        canvas.fillStyle = "rgb(120,120,120)";
    } else {
        canvas.fillStyle = "rgb(80, 80, 80)";
    }
 
    //draw button
    canvas.fillRect(this.x, this.y, this.width, this.height);
 
    //text options
    var fontSize = 20;
    canvas.fillStyle = "yellow";
    canvas.font = fontSize + "px lucida console";
 
    //text position
    var textSize = canvas.measureText(this.text);
    var textX = this.x + (this.width/2) - (textSize.width / 2);
    var textY = this.y + (this.height/2) - (fontSize/2);
 
    //draw the text
    canvas.fillText(this.text, textX, textY);
}

var ImageButton = function(x, y, source, scale) {

    this.x = x;
    this.y = y;
    this.width = 0;
    this.height = 0;
    this.clicked = false;
    this.hovered = false;
    this.scale = scale;
    this.enabled = true;
    
    this.image = new Image;
    this.image.src = source;
    this.image.button = this;
    this.image.onload = function() {
        this.button.width = this.width * this.button.scale;
        this.button.height = this.height * this.button.scale;
    }
}

ImageButton.prototype = _.extend(ImageButton.prototype, Button.prototype);

ImageButton.prototype.draw = function(canvas) {

    canvas.drawImage(this.image, this.x, this.y, this.width, this.height);

}
