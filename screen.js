var Screen = function() {
    
    this.bgImage = null;
    this.font = "20px Lucida Console";
}

Screen.prototype.draw = function(canvas) {

    canvas.drawImage(this.bgImage, 0, 0);

}

// Panel Screen =================================

var PanelScreen = function() {

    this.modes = ["observe", "animate", "form"];
    this.categories = ["planet", "biology", "technology", "society", "messages", "visual"];
    this.current_mode = 0;
    this.current_category = 0;
    this.planet = null;
    this.font = "20px Lucida Console";
    
    this.show_correct_check = false;
    this.show_correct_harmless = false;
    this.show_correct_exploit = false;
    this.show_correct_predict = false;
    this.show_correct_other = false;
}

PanelScreen.prototype = _.extend(Screen.prototype, UIObject);

PanelScreen.prototype.draw = function(canvas) {
   
    canvas.drawImage(this.bgImage, 0, 0, 1024, 848);
    this.draw_screen(canvas)
}

PanelScreen.prototype.setupScreen = function(engine) {
    this.bgImage = new Image;
    this.bgImage.src = "images/panel_blank_2.png";
    this.add_choice_buttons(engine);
    this.add_category_buttons(engine);
    this.add_form_objects(engine);
    this.getNewPlanet();

}

PanelScreen.prototype.getNewPlanet = function() {

    this.planet = new Planet;

}

PanelScreen.prototype.add_choice_buttons = function(engine) {

    var killButton = new ImageButton(310, 640, "images/destroy_button_3.png", 4);
    engine.gameObjects.push(killButton);
    killButton.screen = this;
    killButton.handler = function() {
        this.screen.killPlanet();
    };
    
    var saveButton = new ImageButton(770, 650, "images/save_button_4.png", 4);       
    engine.gameObjects.push(saveButton);
    saveButton.screen = this;
    saveButton.handler = function() {
        
        this.screen.savePlanet();
    };
    
    var helpButton = new ImageButton(730, 650, "images/help_button_2.png", 4);       
    engine.gameObjects.push(saveButton);
    saveButton.screen = this;
    saveButton.handler = function() {
        
        this.screen.savePlanet();
    };


}

PanelScreen.prototype.add_category_buttons = function(engine) {

    this.category_buttons = [];
    for (i = 0; i < this.categories.length; i++) {
    
        var newButton = new Button(this.categories[i], 75, 110 + (70 * i), 160, 40);             
        engine.gameObjects.push(newButton);
        newButton.index = i;
        newButton.screen = this;
        newButton.setSounds("side");
        newButton.handler = function() {
            
            this.screen.current_category = this.index;
            //console.log("HI");
        };
        this.category_buttons.push(newButton);
    }
}

PanelScreen.prototype.add_form_objects = function(engine) {

    var warningButton = new Button("I HAVE READ THIS WARNING", 350, 490, 300, 40);
    warningButton.setSounds("side");
    engine.gameObjects.push(warningButton);
    warningButton.screen = this;
    warningButton.handler = function() {

        this.screen.setFormPage(1);
    };
    this.warning_ok_button = warningButton;
    this.warning_ok_button.hidden = true;
    
    this.warning_image = new Image;
    this.warning_image.src = "images/warning.png";
    
    var peacefulCheck = new CheckBox(190, 185);
    peacefulCheck.hidden = true;
    engine.gameObjects.push(peacefulCheck);
    this.peaceful_check = peacefulCheck;
    
    var weakCheck = new CheckBox(315, 185);
    weakCheck.hidden = true;
    engine.gameObjects.push(weakCheck);
    this.weak_check = weakCheck;
    
    var exploitCheck = new CheckBox(520, 185);
    exploitCheck.hidden = true;
    engine.gameObjects.push(exploitCheck);
    this.exploit_check = exploitCheck;
    
    var amusingCheck = new CheckBox(677, 185);
    amusingCheck.hidden = true;
    engine.gameObjects.push(amusingCheck);
    this.amusing_check = amusingCheck;
    
    var otherCheck = new CheckBox(158, 235);
    otherCheck.hidden = true;
    engine.gameObjects.push(otherCheck);
    this.other_check = otherCheck;
    
    var otherInput = new CanvasInput({
        canvas: document.getElementById('game_canvas'),
        x: 205,
        y: 230,
        width: 200,
        height: 24,
        fontFamily: "system",
        fontColor: "#FFFFFF",
        fontSize: "16",
        backgroundColor: "#222222",
        placeHolder: "Reason for preservation...",
        borderWidth: "1px",
        borderColor: "#333333",
        boxShadow: null,
        innerShadow: null
    });
    this.other_input = otherInput;
    
    var harmlessInput = new CanvasInput({
        canvas: document.getElementById('game_canvas'),
        x: 75,
        y: 325,
        width: 600,
        height: 24,
        fontFamily: "system",
        fontColor: "#FFFFFF",
        fontSize: "16",
        backgroundColor: "#222222",
        placeHolder: "Enter text...",
        borderWidth: "1px",
        borderColor: "#333333",
        boxShadow: null,
        innerShadow: null
    });
    this.harmless_input = harmlessInput;
    
    var exploitInput = new CanvasInput({
        canvas: document.getElementById('game_canvas'),
        x: 75,
        y: 395,
        width: 600,
        height: 24,
        fontFamily: "system",
        fontColor: "#FFFFFF",
        fontSize: "16",
        backgroundColor: "#222222",
        placeHolder: "Enter text...",
        borderWidth: "1px",
        borderColor: "#333333",
        boxShadow: null,
        innerShadow: null
    });
    this.exploit_input = exploitInput;
    
    var predictInput = new CanvasInput({
        canvas: document.getElementById('game_canvas'),
        x: 75,
        y: 465,
        width: 600,
        height: 24,
        fontFamily: "system",
        fontColor: "#FFFFFF",
        fontSize: "16",
        backgroundColor: "#222222",
        placeHolder: "Enter text...",
        borderWidth: "1px",
        borderColor: "#333333",
        boxShadow: null,
        innerShadow: null
    });
    this.predict_input = predictInput;
    
    var formCancelButton = new Button("CANCEL", 725, 415, 200, 40);
    engine.gameObjects.push(formCancelButton);
    formCancelButton.screen = this;
    formCancelButton.handler = function() {

        this.screen.setMode(0);
    };
    formCancelButton.hidden = true;
    this.form_cancel_button = formCancelButton
    
    var formCompleteButton = new Button("SUBMIT", 725, 465, 200, 40);
    engine.gameObjects.push(formCompleteButton);
    formCompleteButton.screen = this;
    formCompleteButton.handler = function() {

        if (this.screen.isFormOk()) {
            this.screen.form_ok = true;
            this.screen.setFormPage(2);
        } else {
            this.screen.form_ok = false;
        }
    };
    formCompleteButton.hidden = true;
    this.form_complete_button = formCompleteButton
    
    var waiverCancelButton = new Button("CANCEL", 295, 475, 200, 40);
    engine.gameObjects.push(waiverCancelButton);
    waiverCancelButton.screen = this;
    waiverCancelButton.handler = function() {

        this.screen.setMode(0);
    };
    waiverCancelButton.hidden = true;
    this.waiver_cancel_button = waiverCancelButton
    
    var waiverCompleteButton = new Button("SUBMIT", 535, 475, 200, 40);
    engine.gameObjects.push(waiverCompleteButton);
    waiverCompleteButton.screen = this;
    waiverCompleteButton.handler = function() {

        this.screen.setFormPage(3);
    };
    waiverCompleteButton.hidden = true;
    waiverCompleteButton.enabled = false;
    this.waiver_complete_button = waiverCompleteButton
    
    var waiverCheck = new CheckBox(523, 425);
    waiverCheck.hidden = true;
    waiverCheck.button = this.waiver_complete_button;
    waiverCheck.handler = function() {
        this.button.enabled = this.checked;
    }
    engine.gameObjects.push(waiverCheck);
    this.waiver_check = waiverCheck;
    
    var acceptButton = new Button("CONTINUE", 390, 470, 220, 40);
    acceptButton.setSounds("side");
    engine.gameObjects.push(acceptButton);
    acceptButton.screen = this;
    acceptButton.handler = function() {

        this.screen.setMode(0);
    };
    this.accept_button = acceptButton;
    this.accept_button.hidden = true;
}

PanelScreen.prototype.draw_screen = function(canvas) {

    if (this.current_mode == 0) {
        this.draw_observe(canvas);
    }
    else if (this.current_mode == 1) {
        this.draw_confirmation(canvas);
    }
    else if (this.current_mode == 2) {
        this.draw_form(canvas);
    }

}

PanelScreen.prototype.draw_observe = function(canvas) {

    if (this.planet == null) {
        return;
    }

    var draw_x = 275;
    var draw_y = 110;
    var draw_width = 300;
    var draw_height = 200;
    
    var grid_height = 30;
    var grid_width = 50;
    
    var columns = Math.floor(draw_width / grid_width);

    canvas.font = this.font;
    canvas.fillStyle = "white";
    
    if (this.current_category == 0) {
     
        canvas.fillText("name: " + this.planet.name, draw_x + (grid_width * 0), draw_y + (grid_height * 0));
        canvas.fillText("type: " + this.planet.type, draw_x + (grid_width * 0), draw_y + (grid_height * 1));
        canvas.fillText("moons: " + this.planet.moons.toString(), draw_x + (grid_width * 0), draw_y + (grid_height * 2));
        canvas.fillText("rings: " + this.planet.rings.toString(), draw_x + (grid_width * 0), draw_y + (grid_height * 3));
        canvas.fillText("surface area: " + this.planet.surface_area, draw_x + (grid_width * 0), draw_y + (grid_height * 12));
        canvas.fillText("average temp.: " + this.planet.temperature, draw_x + (grid_width * 0), draw_y + (grid_height * 13));

        if (this.planet.planet_ok && this.planet.cloud_ok) {
            drawPlanet(this.planet, canvas, draw_x + grid_width + 100, draw_y + 70);       
        }
        
    }
    else if (this.current_category == 1) {
        
        var species = this.planet.species;
        
        canvas.fillText(species.name, draw_x + (grid_width * 0), draw_y + (grid_height * 0));
        canvas.fillText(species.habitat + " " + species.shape, draw_x + (grid_width * 0), draw_y + (grid_height * 1));
        canvas.fillText("lifespan: " + species.lifespan.toString() + " years", draw_x + (grid_width * 0), draw_y + (grid_height * 3));
        canvas.fillText("pop growth: " + species.growth + "% / year", draw_x + (grid_width * 0), draw_y + (grid_height * 4));
        canvas.fillText("esper rating: " + species.esper + "%", draw_x + (grid_width * 0), draw_y + (grid_height * 5));
        
        var virtues = species.psych.get_traits(3);
        canvas.fillText("psych profile:", draw_x + (grid_width * 0), draw_y + (grid_height * 7));
        
        for(i = 0; i < virtues.length; i++) {
            canvas.fillText("- " + virtues[i].name + "  (" + virtues[i].val.toFixed(2) + ")", draw_x + (grid_width * 0), draw_y + (grid_height * (8 + i)));
        }
        
        canvas.fillText(species.diet, draw_x + (grid_width * 0), draw_y + (grid_height * 12));
        canvas.fillText(species.reproduction, draw_x + (grid_width * 0), draw_y + (grid_height * 13));
        
        if (species.image != null) {
            drawSpecies(species, canvas, draw_x + grid_width + 100, draw_y + 70);       
        }
    }
    else if (this.current_category == 2) {
    
        var species = this.planet.species;
        var tech = species.tech;
        
        canvas.fillText("Fuel source: " + tech.fuel_source, draw_x + (grid_width * 0), draw_y + (grid_height * 0));
        canvas.fillText("Power use: " + tech.power_use + " TWh", draw_x + (grid_width * 0), draw_y + (grid_height * 1));
        canvas.fillText("Processing power: " + tech.processing + " flops", draw_x + (grid_width * 0), draw_y + (grid_height * 2));
        
        canvas.fillText("Most celebrated inventions:", draw_x + (grid_width * 0), draw_y + (grid_height * 4));
        for(i = 0; i < 3; i++) {
            canvas.fillText("- " + tech.inventions[i], draw_x + (grid_width * 0), draw_y + (grid_height * (5 + i) ));
        }
    }
    else if (this.current_category == 3) {
    
        var species = this.planet.species;
        var psych = species.psych;
        var society = species.society;
        
        canvas.fillText("Status: " + society.status, draw_x + (grid_width * 0), draw_y + (grid_height * 0));
        canvas.fillText("Rule: " + society.government, draw_x + (grid_width * 0), draw_y + (grid_height * 1));
        
        canvas.fillText("Favored passtimes:", draw_x + (grid_width * 0), draw_y + (grid_height * 3));
        for(i = 0; i < 3; i++) {
            canvas.fillText("- " + psych.passtimes[i], draw_x + (grid_width * 0), draw_y + (grid_height * (4 + i) ));
        }
        
        if (psych.oppressions.length <= 0) {
            canvas.fillText("Oppression: none", draw_x + (grid_width * 0), draw_y + (grid_height * 8));
        } else {
            canvas.fillText("Oppressions:", draw_x + (grid_width * 0), draw_y + (grid_height * 8));
            for(i = 0; i < psych.oppressions.length; i++) {
                canvas.fillText("- " + psych.oppressions[i], draw_x + (grid_width * 0), draw_y + (grid_height * (9 + i) ));
            }
        }
    }
    else if (this.current_category == 4) {
    
        var species = this.planet.species;
        var message = species.message
        
        for (i = 0; i < message.line.length; i++) {
        
            canvas.fillText(message.line[i], draw_x + (grid_width * 0), draw_y + (grid_height * i));
        }
        
        canvas.drawImage(species.tech.probeImage, draw_x - 20, 280, 240, 240);
    }

}

PanelScreen.prototype.draw_form = function(canvas) {

    canvas.fillStyle = this.font;

    if (this.current_category == 0) {
        
        canvas.fillText("WARNING", 460, 70);
        canvas.fillText("The existence of non-human species constitutes an undeniable possibility", 75, 100);
        canvas.fillText("of existential danger to humans, both individually and as a species, and", 75, 130);
        canvas.fillText("therefore should not be considered without rigorous deliberation and", 75, 160);
        canvas.fillText("evidence beyond a shadow of a doubt of the harmlessness and utility of", 75, 190);
        canvas.fillText("such species.", 75, 220);
        
        canvas.drawImage(this.warning_image, 350, 230, 292, 244);
    }
    else if (this.current_category == 1) {
    
        var draw_x = 75;
        var draw_y = 100;
    
        canvas.fillStyle = "white";
    
        canvas.fillText("Planet Preservation Form", 340, 67);
    
        canvas.fillText("Name: " + this.planet.name, draw_x, draw_y);
        
        canvas.fillText("ID#: " + this.planet.id, 355, 100);
        
        //canvas.fillText("Planet ID: " + this.planet.id, 625, 100);
        
        canvas.fillText("Reason for conservation:", 75, 150);
        
        if (this.show_correct_check == true) {
            canvas.fillStyle = "red";
            canvas.fillText("PLEASE CHOOSE ONE OR MORE", 375, 150);
            canvas.fillStyle = "white";
        }
        
        canvas.fillText("peaceful:", 75, 190);
        canvas.fillText("weak:", 245, 190);
        canvas.fillText("exploitable:", 370, 190);
        canvas.fillText("amusing:", 570, 190);
        canvas.fillText("other:", 75, 240);
        
        if (this.show_correct_other == true) {
            canvas.fillStyle = "red";
            canvas.fillText("PLEASE EXPLAIN", 430, 240);
            canvas.fillStyle = "white";
        }
        
        canvas.fillText("Proof of harmlessness:", 75, 300);
        canvas.fillText("Utility to humans:", 75, 370);
        canvas.fillText("Predicted outcome:", 75, 440);
        
        canvas.fillStyle = "red";
        if (this.show_correct_harmless == true) { canvas.fillText("PLEASE ANSWER", 350, 300); }
        if (this.show_correct_exploit == true) { canvas.fillText("PLEASE ANSWER", 320, 370); }
        if (this.show_correct_predict == true) { canvas.fillText("PLEASE ANSWER", 320, 440); }
        canvas.fillStyle = "white";
        
        this.other_input.render();
        this.harmless_input.render();
        this.exploit_input.render();
        this.predict_input.render();
    }
    else if (this.current_category == 2) {
    
        canvas.fillText("WAIVER", 460, 70);
        canvas.fillText("In order to recommend the preservation of a non-human species, you are", 75, 100);
        canvas.fillText("obligated to assume full legal and moral responsibility for any possible", 75, 130);
        canvas.fillText("damages to humans occurring as a result of this action, whether bodily,", 75, 160);
        canvas.fillText("emotional, or financial. You may be held liable for any such damages.", 75, 190);
        canvas.fillText("You must agree to this condition before continuing.", 75, 240);
        
        canvas.fillText("I agree:", 420, 430);
    }
    else if (this.current_category == 3) {
        canvas.fillText("THANK YOU", 455, 70);
        
        canvas.fillText("Your recommendation has been accepted and will be processed by the", 75, 130);
        canvas.fillText("Species Preservation Committee as soon as possible.", 75, 160);
    }

}

PanelScreen.prototype.draw_confirmation = function(canvas) {

    
    canvas.fillText("Planet destroyed \u2713", 400, 300);

}

PanelScreen.prototype.killPlanet = function() {

    play_sound("victory");
    
    this.getNewPlanet();
    this.setMode(1);
    this.current_category = 0;
}

PanelScreen.prototype.savePlanet = function() {

    this.setMode(2);
}

PanelScreen.prototype.setMode = function(new_mode) {

    this.current_mode = new_mode;
    
    if (new_mode == 0) {
        
        this.category_buttons.forEach( function(item, index) {
            item.hidden = false;
        });
        
        this.current_category = 0;
    }
    else {
        this.category_buttons.forEach( function(item, index) {
            item.hidden = true;
        });
    }
    
    if (new_mode == 1) {
        var screen = this;
        setTimeout(function() {
            screen.setMode(0)
        }, 1500);
    }
    
    if (new_mode == 2) {
        this.setFormPage(0);
    }
    else {
        this.setFormPage(-1);
        this.current_category = 0;
    }
}

PanelScreen.prototype.setFormPage = function(new_page) {

    this.current_category = new_page;
    
    if (new_page == 0) {
        this.warning_ok_button.hidden = false;
    }
    else {
        this.warning_ok_button.hidden = true;
    }
    
    if (new_page == 1) {
        this.peaceful_check.hidden = false;
        this.weak_check.hidden = false;
        this.exploit_check.hidden = false;
        this.amusing_check.hidden = false;
        this.other_check.hidden = false;
        this.form_complete_button.hidden = false;
        this.form_cancel_button.hidden = false;
    }
    else {
        this.peaceful_check.hidden = true;
        this.weak_check.hidden = true;
        this.exploit_check.hidden = true;
        this.amusing_check.hidden = true;
        this.other_check.hidden = true;
        this.form_complete_button.hidden = true;
        this.form_cancel_button.hidden = true;
    }
    
    if (new_page == 2) {
        this.waiver_check.hidden = false;
        this.waiver_complete_button.hidden = false;
        this.waiver_cancel_button.hidden = false;
    }
    else {
        this.waiver_check.hidden = true;
        this.waiver_complete_button.hidden = true;
        this.waiver_cancel_button.hidden = true;
    }
    
    if (new_page == 3) {
        this.accept_button.hidden = false;
    } else {
        this.accept_button.hidden = true;
    }
    
    this.harmless_input.value("");
    this.exploit_input.value("");
    this.predict_input.value("");
    this.other_input.value("");
    
    this.peaceful_check.checked = false;
    this.weak_check.checked = false;
    this.exploit_check.checked = false;
    this.amusing_check.checked = false;
    this.other_check.checked = false;
    
    this.show_correct_check = false;
    this.show_correct_harmless = false;
    this.show_correct_exploit = false;
    this.show_correct_predict = false;
    this.show_correct_other = false;
}

PanelScreen.prototype.isFormOk = function() {

    var ok = true;

    if(this.harmless_input.value().length <= 0 ||
       this.exploit_input.value().length <= 0 ||
       this.predict_input.value().length <= 0) {
       
        ok = false;
    }
    
    if(this.peaceful_check.checked == false &&
       this.weak_check.checked == false &&
       this.exploit_check.checked == false &&
       this.amusing_check.checked == false &&
       !(this.other_check.checked && this.other_input.value().length > 0)) {
       
        this.show_correct_check = true;
        
        ok = false;
    } else {
        this.show_correct_check = false;
    }
    
    this.show_correct_harmless = (this.harmless_input.value().length <= 0);
    this.show_correct_exploit = (this.exploit_input.value().length <= 0);
    this.show_correct_predict = (this.predict_input.value().length <= 0);
        
    this.show_correct_other = (this.other_check.checked && this.other_input.value().length <= 0);
   
    return ok;
}
