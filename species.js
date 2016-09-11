var Planet = function() {

    this.name = generate_name();
    this.id = Math.floor( Math.random() * 10000).toString();
    this.type = random_choice(["earthlike", "earthlike", "earthlike", "acidic", "radioactive", "idyllic", "harsh", "wild", "paradisical", "temperate"]);
    this.moons = Math.floor(Math.random() * 10);
    this.rings = 0;
    this.atmosphere = "60% nitrogen, 10% oxygen, 30% whatever";
    this.surface_area = Math.floor( 240000000 + (Math.random() * 500000000)) + " km^2";
    this.temperature = (7 + (Math.random() * 25)).toFixed(3) + " C";
    
    this.planet_ok = false;
    this.cloud_ok = false;
    this.image = new Image;
    this.image.crossOrigin = "Anonymous";
    this.image.planet = this;
    this.image.onload = function() {
        
        if(this.planet.cloud_ok) {
            this.planet.image = getPlanetImage(this, this.planet.cloudImage, 240, 240);
        }
        this.planet.planet_ok = true;
    }
    this.cloudImage = new Image;
    this.cloudImage.crossOrigin = "Anonymous";
    this.cloudImage.planet = this;
    this.cloudImage.onload = function() {
        
        if(this.planet.planet_ok) {
            this.planet.image = getPlanetImage(this.planet.image, this, 240, 240);
        }
        this.planet.cloud_ok = true;
    }
    
    var planetNum = 1 + Math.floor(Math.random() * 4);
    this.image.src = "images/planets/planet_" + planetNum + ".png";
    
    var cloudNum = 1 + Math.floor(Math.random() * 4);
    this.cloudImage.src = "images/planets/atmosphere_" + planetNum + ".png";
    
    this.species = new Species(this.name);
}

var Species = function(planet_name) {

    this.name = get_species_name(planet_name);
    this.habitat = this.get_habitat();
    this.shape = this.get_shape(this.habitat);
    this.diet_type = this.get_diet_type(this.habitat);
    this.diet = this.get_diet(this.habitat, this.diet_type);
    this.reproduction = this.get_reproduction(this.habitat, this.shape);
    this.lifespan = 20 + Math.floor(Math.random() * 150) ;
    this.growth = (0.91 + (Math.random() * 2.0)).toFixed(2);
    this.esper = Math.random().toFixed(2);
    
    this.psych = new Psych;
    this.tech = new Tech(this.psych);
    this.society = new Society(this.psych);
    this.message = new Message(this.psych);
    
    this.image = null;
    
    // =======================
    
    this.body_ok = false;
    this.head_ok = false;
    this.bodyImage = new Image;
    this.bodyImage.crossOrigin = "Anonymous";
    this.bodyImage.species = this;
    this.bodyImage.onload = function() {
        
        if(this.species.head_ok) {
            this.species.image = getSpeciesImage(this, this.species.headImage, 240, 240);
        }
        this.species.body_ok = true;
    }
    this.headImage = new Image;
    this.headImage.crossOrigin = "Anonymous";
    this.headImage.species = this;
    this.headImage.onload = function() {
        
        if(this.species.body_ok) {
            this.species.image = getSpeciesImage(this.species.bodyImage, this, 240, 240);
        }
        this.species.head_ok = true;
    }
    
    this.shape = "biped";
    
    var bodyNum = 1 + Math.floor(Math.random() * 2);
    this.bodyImage.src = "images/species/" + this.shape + "_" + bodyNum + ".png";

    var headNum = 1 + Math.floor(Math.random() * 0);
    this.headImage.src = "images/species/head_" + headNum + ".png";
}

Species.prototype.get_habitat = function() {

    var habitats = ["terrestrial", "amphibious", "aquatic", "subterranean"];
    var roll = Math.floor( Math.random() * habitats.length);
    return habitats[roll];
}

Species.prototype.get_shape = function(habitat) {

    var shapes = [];
    switch(habitat) {
    
        case "terrestrial":
            shapes = ["biped", "quadruped", "multiped", "slitheroid", "spheroid", "blob", "rooted"];
            break;
        case "amphibious":
            shapes = ["biped", "quadruped", "multiped", "slitheroid", "blob", "rooted"];
            break;
        case "aquatic":
            shapes = ["biped", "quadruped", "fishoid", "eeloid", "spheroid", "blob", "rooted"];
            break;
        case "subterranean":
            shapes = ["biped", "quadruped", "multiped", "slitheroid", "spheroid", "blob"];
            break;
    }
    
    return random_choice(shapes);
}

Species.prototype.get_diet_type = function(habitat) {

    var diets = [];
    switch(habitat) {
        
        case "terrestrial":
            diets = ["herbivore", "omnivore", "carnivore", "photosynthetic"];
            break;
        case "amphibious":
            diets = ["herbivore", "omnivore", "carnivore", "photosynthetic"];
            break;
        case "aquatic":
            diets = ["herbivore", "omnivore", "carnivore", "photosynthetic", "vent-feeder"];
            break;
        case "subterranean":
            diets = ["herbivore", "omnivore", "carnivore"];
            break;
    }
    
    return random_choice(diets);
}

Species.prototype.get_diet = function(habitat, type) {

    var diets = [];
    var foods = [];
    switch(habitat) {
        
        case "terrestrial":
        
            switch(type) {
                case "herbivore":
                    foods = ["fruits", "roots", "vegetables", "leaves", "flowers", "grasses"];
                    diets = ["Primarily eats " + random_choice(foods) + " and " + random_choice(foods) + ".",
                             "Eats " + random_choice(foods) + ", preferring to forage on their own"];
                    break;
                case "omnivore":
                    foods = ["fruits", "roots", "vegetables", "leaves", "flowers", "grasses", "herd animals", "small birds", "insects", "fish"];
                    diets = ["Primarily eats " + random_choice(foods) + " and " + random_choice(foods) + "."];
                    break;
                case "carnivore":
                    foods = ["herd animals", "small birds", "insects", "rotten corpses", "fish"];
                    diets = ["Primarily eats " + random_choice(foods) + " and " + random_choice(foods) + ", when available.",
                             "Gorges on " + random_choice(foods) + ", then remains motionless for days.",
                             "Eats " + random_choice(foods) + ", preferring to hunt on their own"];
                    break;
                case "photosynthetic":
                    diets = ["Stands in place for long periods absorbing sunlight.",
                             "Passively absorbs sunlight through the day."];
                    break;
            }
            break;
        case "amphibious":
            switch(type) {
                case "herbivore":
                    foods = ["fruits", "roots", "vegetables", "leaves", "flowers", "grasses", "algae"];
                    diets = ["Primarily eats " + random_choice(foods) + " and " + random_choice(foods) + ".",
                             "Eats " + random_choice(foods) + ", preferring to forage on their own"];
                    break;
                case "omnivore":
                    foods = ["fruits", "roots", "vegetables", "leaves", "flowers", "grasses", "herd animals", "small birds", "insects", "fish"];
                    diets = ["Primarily eats " + random_choice(foods) + " and " + random_choice(foods) + "."];
                    break;
                case "carnivore":
                    foods = ["herd animals", "small birds", "insects", "rotten corpses", "fish", "crustaceans"];
                    diets = ["Primarily eats " + random_choice(foods) + " and " + random_choice(foods) + ", when available.",
                             "Gorges on " + random_choice(foods) + ", then remains motionless for days.",
                             "Eats " + random_choice(foods) + ", preferring to hunt on their own"];
                    break;
                case "photosynthetic":
                    diets = ["Stands in place for long periods absorbing sunlight.",
                             "Passively absorbs sunlight through the day."];
                    break;
            }
            break;
        case "aquatic":
            switch(type) {
                case "herbivore":
                    foods = ["algae", "seaweed", "kelpoid plants"];
                    diets = ["Primarily eats " + random_choice(foods) + " and " + random_choice(foods) + ".",
                             "Eats " + random_choice(foods) + ", preferring to forage on their own"];
                    break;
                case "omnivore":
                    foods = ["fruits", "roots", "vegetables", "leaves", "flowers", "grasses", "herd animals", "small birds", "insects", "fish"];
                    diets = ["Primarily eats " + random_choice(foods) + " and " + random_choice(foods) + "."];
                    break;
                case "carnivore":
                    foods = ["fish", "crustaceans", "plankton"];
                    diets = ["Primarily eats " + random_choice(foods) + " and " + random_choice(foods) + ", when available.",
                             "Gorges on " + random_choice(foods) + ", then remains motionless for days.",
                             "Eats " + random_choice(foods) + ", preferring to hunt on their own"];
                    break;
                case "photosynthetic":
                    diets = ["Floats in place for long periods absorbing sunlight.",
                             "Passively absorbs sunlight through the day."];
                    break;
                case "vent-feeder":
                    diets = ["Sits constantly on volcanic vents absorbing nutrients.",
                             "Draws nutrients from volcanic vents through the day",
                             "Consumes hydrothermal spewings, piped into each home"];
                    break;
            }
            break;
        case "subterranean":
            switch(type) {
                case "herbivore":
                    foods = ["roots", "tubers", "soil", "shoots", "fungi"];
                    diets = ["Primarily eats " + random_choice(foods) + " and " + random_choice(foods) + ".",
                             "Eats " + random_choice(foods) + ", preferring to forage on their own"];
                    break;
                case "omnivore":
                    foods = ["roots", "tubers", "soil", "shoots", "fungi", "worms", "insects", "small herbivores"];
                    diets = ["Primarily eats " + random_choice(foods) + " and " + random_choice(foods) + "."];
                    break;
                case "carnivore":
                    foods = ["worms", "insects", "small herbivores"];
                    diets = ["Primarily eats " + random_choice(foods) + " and " + random_choice(foods) + ", when available.",
                             "Gorges on " + random_choice(foods) + ", then remains motionless for days.",
                             "Eats " + random_choice(foods) + ", preferring to hunt on their own"];
                    break;
            break;
        }
    }
    
    return random_choice(diets);

}

Species.prototype.get_reproduction = function(habitat, shape) {

    var repro = [];
        
    repro = ["Bears single live young, which they raise",
             "Bears live young in a litter",
             "Bears live young spontaneously, which wander off",
             "Lays eggs, which they carry with them",
             "Lays eggs in a clutch",
             "Lays eggs spontaneously, which are raised publicly",
             "Reproduces through budding",
             "Reproduces by scattering seeds",
             "Reproduces by spores"];
    
    return random_choice(repro);
    
}

var Psych = function() {

    this.virtues = [];

    this.virtues.push( new VirtueAxis("reception", "friendliness", "hostility"));
    this.virtues.push( new VirtueAxis("defense", "protectiveness", "appeasement"));
    this.virtues.push( new VirtueAxis("thought", "innovation", "dogma"));
    this.virtues.push( new VirtueAxis("pleasure", "hedonism", "asceticism"));
    this.virtues.push( new VirtueAxis("labor", "industry", "contemplation"));
    this.virtues.push( new VirtueAxis("interaction", "cooperation", "competition"));
    this.virtues.push( new VirtueAxis("desire", "ambition", "contentment"));
    this.virtues.push( new VirtueAxis("metaphysics", "spirituality", "materialism"));

    this.passtimes = [];
    for (var i = 0; i < 3; i++) {
        var newpass = null;
        var ok = false;
  
        while (!ok) {
            newpass = this.get_pastime();
            ok = true;
            for (var j = 0; j < i; j++) {
                if (this.passtimes[j] == newpass) {
                    ok = false;
                    j = i;
                }
            }
        }
        
        this.passtimes.push(newpass);
    }
    
    var oppressions_count = Math.floor(Math.random() * 4);
    this.oppressions = this.get_oppressions( oppressions_count );
}

var VirtueAxis = function(name_axis, name_one, name_two) {

    this.name = name_axis;
    this.one = new Virtue(name_one, Math.random());
    this.two = new Virtue(name_two, 1 - this.one.val);
}

var Virtue = function(name, val) {
    this.name = name;
    this.val = val;
    
    this.passtimes = null;
    switch (name) {
        case "friendliness":
            this.passtimes = ["talking about feelings", "hugging", "reverential poetry", "recreational sex", "animal grooming"];
            break;
        case "hostility":
            this.passtimes = ["wrestling", "insult contests", "dueling", "boxing", "contact sports"];
            break;
        case "protectiveness":
            this.passtimes = ["feats of strength", "footraces", "wrestling", "home renovation"];
            break;
        case "appeasement":
            this.passtimes = ["recreational hiding", "mock negotiation", "talking about feelings", "storytelling"];
            break;
        case "innovation":
            this.passtimes = ["riddle contests", "art", "daydreaming", "lying", "storytelling"];
            break;
        case "dogma":
            this.passtimes = ["recitation of classics", "studying", "visiting historical sites", "reverential poetry"];
            break;
        case "hedonism":
            this.passtimes = ["eating delicacies", "use of intoxicants", "recreational sex", "daydreaming"];
            break;
        case "asceticism":
            this.passtimes = ["meditation", "flagellation", "visiting sweat lodges", "visiting isolated sites", "fasting"];
            break;
        case "industry":
            this.passtimes = ["touring factories", "home renovation", "exercise", "studying"];
            break;
        case "contemplation":
            this.passtimes = ["meditation", "studying", "spending time in nature", "daydreaming", "use of intoxicants"];
            break;
        case "cooperation":
            this.passtimes = ["team sports", "choral singing", "recreational sex", "group dancing", "local festivals"];
            break;
        case "competition":
            this.passtimes = ["feats of strength", "team sports", "art"];
            break;
        case "ambition":
            this.passtimes = ["exercise", "studying", "scheming", "home renovation", "flattery"];
            break;
        case "contentment":
            this.passtimes = ["meditation", "sleeping", "use of intoxicants", "recreational sex", "daydreaming"];
            break;
        case "spirituality":
            this.passtimes = ["praying", "visiting holy sites", "recitation of classics", "studying", "meditation"];
            break;
        case "materialism":
            this.passtimes = ["shopping", "home renovation", "exercise"];
            break;
        default:
            this.passtimes = ["broken"];
            break;
    }
    
    this.inventions = null;
    switch (name) {
        case "friendliness":
            this.inventions = ["telecommunication", "machine translation", "mood elevating drugs", "planetary unification"];
            break;
        case "hostility":
            this.inventions = ["steroids", "atomic bombs", "the automated army"];
            break;
        case "protectiveness":
            this.inventions = ["telecommunication", "surveillance equipment", "smart home", "active camoflauge"];
            break;
        case "appeasement":
            this.inventions = ["mobile homes", "organ transfer", "advanced dialectics"];
            break;
        case "innovation":
            this.inventions = ["augmented reality", "machine translation", "artificial intelligence", "Machine-mind-interface"];
            break;
        case "dogma":
            this.inventions = ["centralized archives", "brainwashing", "the canonical texts", "the concensus device"];
            break;
        case "hedonism":
            this.inventions = ["reduced work hours", "rapid fermentation", "teledildonics", "the bliss engine"];
            break;
        case "asceticism":
            this.inventions = ["efficient nutrient cubes", "the ascetic virtues"];
            break;
        case "industry":
            this.inventions = ["the assembly line", "expanded work hours", "focus enhancing drugs", "efficient nutrient cubes"];
            break;
        case "contemplation":
            this.inventions = ["mind-clearing drugs", "decentralized archives", "reduced work hours", "noise reduction laws"];
            break;
        case "cooperation":
            this.inventions = ["telecommunication", "machine translation", "planetary unification", "communism"];
            break;
        case "competition":
            this.inventions = ["mutually assured destruction", "capitalism", "social darwinism", "the automobile"];
            break;
        case "ambition":
            this.inventions = ["examination system", "meritocracy", "eugenics", "undetectable poison"];
            break;
        case "contentment":
            this.inventions = ["mood elevating drugs", "efficient nutrient cubes"];
            break;
        case "spirituality":
            this.inventions = ["psychedelic drugs", "the search for god program", "the ecumenical congress", "the lay preacher's network"];
            break;
        case "materialism":
            this.inventions = ["mass-production", "electron microscopes", "radio telescopes", "nihilism"];
            break;
        default:
            this.inventions = ["broken"];
            break;
    }
}

Psych.prototype.get_virtue = function() {

    /*var roll1 = Math.floor( Math.random() * this.virtues.length);
    var axis = this.virtues[roll1];
    var roll2 = Math.random();
    if (roll2 < 0.5) {
        return axis.one;
    }
    else {
        return axis.two;
    }*/
    
    var traits = this.get_traits(4);
    var choice = random_choice(traits);
    return choice;

}

Psych.prototype.get_pastime = function(virtue) {
    
    var virtue = this.get_virtue();
    return random_choice(virtue.passtimes);
}

Psych.prototype.get_oppressions = function(count) {

    var ret = [];
    var oppressions = ["phenotype", "religion", "custom", "language", "odor", "brand loyalty", "heritage", "nation"];
    
    
    for (var i = 0; i < count; i++) {
        var got = random_choice(oppressions);
        
        var index = oppressions.indexOf(got);
        oppressions.splice(index, 1);
        ret.push(got);
    }
    
    return ret;
}

Psych.prototype.get_invention = function(virtue) {
    
    var virtue = this.get_virtue();
    return random_choice(virtue.inventions);    
}

Psych.prototype.get_traits = function(count) {

    var allVirtues = [];

    for (var i = 0; i < this.virtues.length; i++) {
    
        var axis = this.virtues[i];
        allVirtues.push(axis.one);
        allVirtues.push(axis.two);
    }
    
    allVirtues.sort( function(a,b) {
        return (b.val - a.val)
    });
    
    var ret = [];
    for (var i = 0; i < count; i++) {
        ret.push(allVirtues[i]);
    }
    
    return ret;
}

//=======================================================
//               TECHNOLOGY
//=======================================================

var Tech = function(psych) {

    this.fuel_source = random_choice(["hydrocarbon", "solar", "wind", "geothermal", "fission", "fusion", "magnetic", "psychic"]);
    this.power_use = 20000 + (Math.random() * 120000).toFixed(2);
    this.processing = (Math.random() * 10).toFixed(2) + " x 10^" + Math.floor( Math.random() * 25);

    this.inventions = [];
    for (var i = 0; i < 3; i++) {
        var newinv = null;
        var ok = false;
        while (!ok) {
            newinv = psych.get_invention();
            ok = true;
            for (j = 0; j < i; j++) {
                if (this.inventions[j] == newinv) {
                    ok = false;
                    j = i;
                }
            }
        }
        this.inventions.push(newinv);
    }

}

//=======================================================
//                   SOCIETY
//=======================================================

var Society = function(psych) {

    this.status = this.get_status();
    this.government = this.get_government(psych);

}

Society.prototype.get_status = function() {

    var roll = Math.floor(Math.random() * 5);
    var status = "";
    
    switch (roll) {
    
        case 0:
        case 1:
            status = "unified";
            break;
        case 3:
        case 4:
            status = " (" + Math.floor(Math.random() * 5) + " superpowers)"
        case 2:
            status = Math.floor(Math.random() * 500) + " states" + status;

            break;
    }
    
    return status;
}

Society.prototype.get_government = function(psych) {

    var virtue = psych.get_virtue();
    var base = random_choice(["monarchy", "oligarchy", "plutocracy", "democracy", "council of elders", "aristocracy"]);
    
    var words = []
    switch (virtue.name) {
        case "friendliness":
            words = ["benevolent", "federated"];
            break;
        case "hostility":
            words = ["militant", "tyrannical", "honorable"];
            break;
        case "protectiveness":
            words = ["fortress", "survivalist", "nationalist"];
            break;
        case "appeasement":
            words = ["representative", "decentralized"];
            break;
        case "innovation":
            words = ["technocratic", "radical"];
            break;
        case "dogma":
            words = ["ancestral", "ecclesiastic"];
            break;
        case "hedonism":
            words = ["opulent", "benevolent"];
            break;
        case "asceticism":
            words = ["austere"];
            break;
        case "industry":
            words = ["workers'", "technocratic"];
            break;
        case "contemplation":
            words = ["ritual"];
            break;
        case "cooperation":
            words = ["workers'", "egalitarian"];
            break;
        case "competition":
            words = ["meritocratic", "cut-throat"];
            break;
        case "ambition":
            words = ["meritocratic"];
            break;
        case "contentment":
            words = ["representative", "federal"];
            break;
        case "spirituality":
            words = ["theocratic", "enlightened"];
            break;
        case "materialism":
            words = ["technocratic"];
            break;
        default:
            words = ["broken"];
            break;
    }

    return random_choice(words) + " " + base;
    
}

//=======================================================
//               MESSAGES
//=======================================================

var Message = function(psych) {

    var openings = [];
    var middles = [];
    var closings = [];

    var virtue = psych.get_virtue();

    this.line = [];
    
    switch (virtue.name) {
        case "friendliness":
            openings = ["Greetings friends!", "Hello aliens!"];
            break;
        case "hostility":
            openings = ["Attention aliens.", "A warning to all aliens", "Aliens beware"];
            break;
        case "protectiveness":
            openings = ["We know you're out there.", "We see you."];
            break;
        case "appeasement":
            openings = ["We humbly welcome aliens.", "Come parlay with us, aliens!"];
            break;
        case "innovation":
            openings = ["Greetings to intelligent life.", "We greet alien intelligence."];
            break;
        case "dogma":
            openings = ["Attention to strangers.", "Offworlders.", "Those who dwell outside:"];
            break;
        case "hedonism":
            openings = ["Pleasant living to you, aliens."];
            break;
        case "asceticism":
            openings = ["Greetings.", "We greet you, aliens."];
            break;
        case "industry":
            openings = ["We are ready for contact.", "Greetings, aliens."];
            break;
        case "contemplation":
            openings = ["We have long considered the possibility of alien life.", "We imagine aliens."];
            break;
        case "cooperation":
            openings = ["Friends from the stars!", "Fellow galaxy-children!", "Harmonious greetings!"];
            break;
        case "competition":
            openings = ["Hello, competition.", "Will you challenge us?"];
            break;
        case "ambition":
            openings = ["Greetings to you, aliens"];
            break;
        case "contentment":
            openings = ["We happily await you."];
            break;
        case "spirituality":
            openings = ["Gods be with you!", "To all children of the divine.", "To our offworld siblings!", "Light be with you."];
            break;
        case "materialism":
            openings = ["Hello, lifeforms.", "A message to all beings:", "Our consciousness calls!"];
            break;
        default:
            openings = ["broken"];
            break;
    }
    
    this.line.push(random_choice(openings));

    for (var i = 0; i < 3; i++) {
  
        virtue = psych.get_virtue();

        switch (virtue.name) {
            case "friendliness":
                middles = ["We hope for a peaceful union between our peoples", "Let us build friendship between us!"];
                break;
            case "hostility":
                middles = ["We will crush you if you cross us.", "Do not get in our way.", "Prepare to meet us in battle."];
                break;
            case "protectiveness":
                middles = ["Stay far away from us.", "We don't want to know you.", "We will defend our homes.", "We are ready for any threat.", "Announce your intentions."];
                break;
            case "appeasement":
                middles = ["We will do anything to maintain peace.", "We hope you will be kind to us.", "We're sure we can reach a peaceful arrangement.", "We offer our world to you."];
                break;
            case "innovation":
                middles = ["Let us share knowledge!", "We wish to know more about you.", "We want to learn about your ways.", "We're very curious about you.", "Let us have cultural interchange!"];
                break;
            case "dogma":
                middles = ["You will not change our ways.", "You may be able to join our circle.", "You must learn our ways."];
                break;
            case "hedonism":
                middles = ["Send us your rare goods!", "Come enjoy our lovely planet.", "Come see our beautiful faces."];
                break;
            case "asceticism":
                middles = ["We need nothing from you.", "We have everything we need here.", "Our lives are complete.", "Your influence will distract us.", "Do not disturb our practices."];
                break;
            case "industry":
                middles = ["Let's all work together!", "We hope for a lively exchange of goods"];
                break;
            case "contemplation":
                middles = ["We wish to know your mysteries", "Let us contemplate the universe together", "Let us share our wisdom.", "We wish to know you."];
                break;
            case "cooperation":
                middles = ["We would consider a union between our worlds.", "We hope our planets can work together", "Let us learn each other's ways"];
                break;
            case "competition":
                middles = ["We welcome competition from your world!", "We will show you the glory of our people!", "We're not afraid."];
                break;
            case "ambition":
                middles = ["We're sure you have many wonderful things to share.", "Come speak with us privately."];
                break;
            case "contentment":
                middles = ["We would like to receive you.", "We will show you our happiness", "Our planet is a paradise!", "We will share our bounty with you!"];
                break;
            case "spirituality":
                middles = ["We will teach you the truth of the divine", "Do you know of God yet?", "Let us join our spirits!", "Please read our holy texts."];
                break;
            case "materialism":
                middles = ["We would like to access your observational data.", "We are very curious about your biology.", "We have much information to share.", "We have extensive star maps."];
                break;
            default:
                middles = ["broken"];
                break;
        }

        this.line.push(random_choice(middles));
    }
    
    virtue = psych.get_virtue();
    
    switch (virtue.name) {
        case "friendliness":
            closings = ["See you soon!", "Best wishes.", "We love you!", "Go with peace.", "Until soon."];
            break;
        case "hostility":
            closings = ["Begone!", "You have been warned!", "We'll see you soon.", "Again, don't mess with us."];
            break;
        case "protectiveness":
            closings = ["That is all.", "Stay away please.", "That's all there is to it.", "We'll be watching.", "We'll be ready."];
            break;
        case "appeasement":
            closings = ["We hope you will come.", "We hope this pleases you.", "We hope to see you."];
            break;
        case "innovation":
            closings = ["To the future!", "Toward greater things!"];
            break;
        case "dogma":
            closings = ["So it was, so it will be.", "We look forward to teaching you.", "It will be as the scrolls say."];
            break;
        case "hedonism":
            closings = ["Pleasant life to you!", "Live long and prosper!", "Be well!", "Pleasure to you!", "Happiness be yours."];
            break;
        case "asceticism":
            closings = ["..."];
            break;
        case "industry":
            closings = ["Farewell friends"];
            break;
        case "contemplation":
            closings = ["We will be thinking of you.", "We will contemplate your arrival."];
            break;
        case "cooperation":
            closings = ["Let's make the future bright!", "Until we see you."];
            break;
        case "competition":
            closings = ["Bring it on!"];
            break;
        case "ambition":
            closings = ["We have much to gain from our meeting.", "We eagerly await you."];
            break;
        case "contentment":
            closings = ["We will wait for you."];
            break;
        case "spirituality":
            closings = ["Goddess be with you.", "May your souls know peace.", "Rest to you.", "A thousand blessings!", "Be blesesed"];
            break;
        case "materialism":
            closings = ["We wish you optimality", "May your fortunes be adequate"];
            break;
        default:
            closings = ["broken"];
            break;
    }
    
    this.line.push(random_choice(closings));
}