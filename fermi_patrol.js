function get_context() {

    var c = document.getElementById("game_canvas");
    return c.getContext("2d");
}

function random_choice(arr) {

    var roll = Math.floor(Math.random() * arr.length);
    return arr[roll];
}

function play_sound(name) {

    var audio = null;

    switch (name) {
        case "mouseover_side":
            audio = new Audio('sounds/blup_1.wav'); break;
        case "click_side":
            audio = new Audio('sounds/blip_1.wav'); break;
    
    }
    
    if (audio != null) {
        audio.play();
    }

}