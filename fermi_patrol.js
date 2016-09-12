function get_context() {

    var c = document.getElementById("game_canvas");
    return c.getContext("2d");
}

function random_choice(arr) {

    var roll = Math.floor(Math.random() * arr.length);
    return arr[roll];
}

var sound = [];

function load_sounds() {

    sound["mouseover_side"] = new Audio('sounds/blup_1.wav');
    sound["click_side"] = new Audio('sounds/blip_1.wav');
    sound["victory"] = new Audio('sounds/victory_tone.wav');
    sound["warning"] = new Audio('sounds/warning.wav');
}

function play_sound(name) {

    var audio = sound[name];

    if (audio != null) {
        audio.play();
    }

}