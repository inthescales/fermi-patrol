var UIObject = {
    hidden: false,
    enabled: true,
    intersects: function(obj, mouse) {
        var t = 5; //tolerance
        var xIntersect = (mouse.x + t) > obj.x && (mouse.x - t) < obj.x + obj.width;
        var yIntersect = (mouse.y + t) > obj.y && (mouse.y - t) < obj.y + obj.height;
        return  xIntersect && yIntersect;
    },
    updateStats: function(canvas){
    
        if (this.hidden || !this.enabled) {
            return;
        }
        
        if (this.intersects(this, canvas.mouse)) {
            this.hovered = true;
            if (canvas.mouse.clicked && this.hidden == false) {
                this.clicked = true;
            }
        } else {
            this.hovered = false;
        }
        
        if (!canvas.mouse.down) {
            this.clicked = false;
        }           	
    }
};