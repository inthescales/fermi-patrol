function generate_name() {

    var consonants = ["b", "c", "d", "f", "g", "h", "j", "k", "l", "m", "n", "p", "r", "s", "t","v","w","x","y","z"];
    var finals_cons = ["r", "l", "m", "n", "y", "w", "f", "s"];
    var vowels = ["a", "e", "i", "o", "u"];
    
    var syllables = 1 + Math.floor( Math.random() * 4);
    
    var name = "";
    
    for (i = 0; i < syllables; i++) {
    
        var syll = random_choice(consonants) + random_choice(vowels);
        
        if (Math.random() < 0.3) {
           syll += random_choice(finals_cons);
        }
        
        name += syll;
    }

    
    return name;

}

function get_species_name(planet_name) {

    var last = planet_name[planet_name.length-1];
    
    if (last == "a") {
        return planet_name + "ns";
    }
    else if (last == "i" || last == "o" || last == "u" || last == "e") {
        return planet_name + "ans";
    }
    else {
        return planet_name + "ians";
    }

}