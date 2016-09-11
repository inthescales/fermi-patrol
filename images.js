function drawPlanet(planet, context, x, y) {
    
    context.drawImage(planet.image, x, y);
}

function getPlanetImage(image, cloudImage, width, height) {

    var new_canvas = document.createElement('canvas');
    new_canvas.width = width;
    new_canvas.height = height;
    var new_context = new_canvas.getContext("2d");
    new_context.imageSmoothingEnabled = false;
    
    new_context.drawImage(image, 0, 0, width, height);
    new_context.drawImage(cloudImage, 0, 0, width, height);
    var imageData = new_context.getImageData(0, 0, width, height);   
    
    var defaultColors = defaultPlanetColors();
    var newColors = getPlanetColors();
    
    for (var i=0;i<imageData.data.length;i+=4)
      {
          // is this pixel the old rgb?
          
          for (var j = 0; j < defaultColors.atmo.length; j++) {
          
              if(imageData.data[i]   == defaultColors.atmo[j][0] &&
                 imageData.data[i+1] == defaultColors.atmo[j][1] &&
                 imageData.data[i+2] == defaultColors.atmo[j][2]
              ){
                  // change to your new rgb
                  imageData.data[i]   = newColors.atmo[j][0];
                  imageData.data[i+1] = newColors.atmo[j][1];
                  imageData.data[i+2] = newColors.atmo[j][2];
                  
                  j = 100;
              }
          }
          
          for (var j = 0; j < defaultColors.water.length; j++) {
          
              if(imageData.data[i]   == defaultColors.water[j][0] &&
                 imageData.data[i+1] == defaultColors.water[j][1] &&
                 imageData.data[i+2] == defaultColors.water[j][2]
              ){
                  // change to your new rgb
                  imageData.data[i]   = newColors.water[j][0];
                  imageData.data[i+1] = newColors.water[j][1];
                  imageData.data[i+2] = newColors.water[j][2];
                  
                  j = 100;
              }
          }
          
          for (var j = 0; j < defaultColors.veg.length; j++) {
          
              if(imageData.data[i]   == defaultColors.veg[j][0] &&
                 imageData.data[i+1] == defaultColors.veg[j][1] &&
                 imageData.data[i+2] == defaultColors.veg[j][2]
              ){
                  // change to your new rgb
                  imageData.data[i]   = newColors.veg[j][0];
                  imageData.data[i+1] = newColors.veg[j][1];
                  imageData.data[i+2] = newColors.veg[j][2];
                  
                  j = 100;
              }
          }
          
          for (var j = 0; j < defaultColors.dirt.length; j++) {
          
              if(imageData.data[i]   == defaultColors.dirt[j][0] &&
                 imageData.data[i+1] == defaultColors.dirt[j][1] &&
                 imageData.data[i+2] == defaultColors.dirt[j][2]
              ){
                  // change to your new rgb
                  imageData.data[i]   = newColors.dirt[j][0];
                  imageData.data[i+1] = newColors.dirt[j][1];
                  imageData.data[i+2] = newColors.dirt[j][2];
                  
                  j = 100;
              }
          }
          
          for (var j = 0; j < defaultColors.cloud.length; j++) {
          
              if(imageData.data[i]   == defaultColors.cloud[j][0] &&
                 imageData.data[i+1] == defaultColors.cloud[j][1] &&
                 imageData.data[i+2] == defaultColors.cloud[j][2]
              ){
                  // change to your new rgb
                  imageData.data[i]   = newColors.cloud[j][0];
                  imageData.data[i+1] = newColors.cloud[j][1];
                  imageData.data[i+2] = newColors.cloud[j][2];
                  
                  j = 100;
              }
          }

      }
      
    
    new_context.putImageData(imageData, 0, 0);
    
    var image = new Image();
    image.src = new_canvas.toDataURL('image/png');
    return image;

}

var planetColors = function(atmo, water, veg, dirt, cloud) {

    this.atmo = atmo;
    this.water = water;
    this.veg = veg;
    this.dirt = dirt;
    this.cloud = cloud;
}

function defaultPlanetColors() {

    var atmo = [[74, 190, 255], [41, 142, 247]];
    var water = [[33, 77, 198], [41, 56, 173], [49, 36, 123]];
    var veg = [[82, 174, 90], [57, 146, 82], [33, 117, 90]];
    var dirt = [[214, 219, 123], [198, 186, 107]];
    var cloud = [[247, 239, 231], [231, 219, 206]];
    return new planetColors(atmo, water, veg, dirt, cloud);

}

function getPlanetColors() {

    var def = defaultPlanetColors();
    
    var atmo = [rgbToHsl(def.atmo[0]), rgbToHsl(def.atmo[1])];
    var water = [rgbToHsl(def.water[0]), rgbToHsl(def.water[1]), rgbToHsl(def.water[2])];
    var veg = [rgbToHsl(def.veg[0]), rgbToHsl(def.veg[1]), rgbToHsl(def.veg[2])];
    var dirt = [rgbToHsl(def.dirt[0]), rgbToHsl(def.dirt[1])];
    var cloud = [rgbToHsl(def.cloud[0]), rgbToHsl(def.cloud[1])];
    
    var chance = 0;
    
    var atmoShift = 0;
    var groundShift = 0;
    var cloudShift = Math.random();
    
    chance = Math.random();
    if (chance < 0.1) {
        atmoShift = Math.random();
        groundShift = Math.random();
    }
    else if (chance < 0.8) {
        atmoShift = (Math.random() / 2.0) - 0.25;
        groundShift = (Math.random() / 2.0) - 0.25;
    }
    else {
        atmoShift = (Math.random() / 10.0) - 0.05;
        groundShift = (Math.random() / 10.0) - 0.05;
    }
    
    for(var i = 0; i < atmo.length; i++ ) {
        atmo[i][0] += atmoShift;
        if (atmo[i][0] > 1) { atmo[i][0] -= 1; }
        if (atmo[i][0] < 0) { atmo[i][0] += 1; }
    }
    
    for(var i = 0; i < water.length; i++ ) {
        water[i][0] += atmoShift;
        if (water[i][0] > 1) { water[i][0] -= 1; }
        if (water[i][0] < 0) { water[i][0] += 1; }
    }
    
    for(var i = 0; i < veg.length; i++ ) {
        veg[i][0] += groundShift;
        if (veg[i][0] > 1) { veg[i][0] -= 1; }
        if (veg[i][0] < 0) { veg[i][0] += 1; }
    }
    
    for(var i = 0; i < dirt.length; i++ ) {
        dirt[i][0] += groundShift;
        if (dirt[i][0] > 1) { dirt[i][0] -= 1; }
        if (dirt[i][0] < 0) { dirt[i][0] += 1; }
    }
    
    for(var i = 0; i < cloud.length; i++ ) {
        cloud[i][0] += cloudShift;
        if (cloud[i][0] > 1) { cloud[i][0] -= 1; }
        if (cloud[i][0] < 0) { cloud[i][0] += 1; }
    }
    
    var atmo2 = [hslToRgb(atmo[0]), hslToRgb(atmo[1])];
    var water2 = [hslToRgb(water[0]), hslToRgb(water[1]), hslToRgb(water[2])];
    var veg2 = [hslToRgb(veg[0]), hslToRgb(veg[1]), hslToRgb(veg[2])];
    var dirt2 = [hslToRgb(dirt[0]), hslToRgb(dirt[1])];
    var cloud2 = [hslToRgb(cloud[0]), hslToRgb(cloud[1])];

    return new planetColors(atmo2, water2, veg2, dirt2, cloud2);

}

// ======================================================================== SPECIES

function drawSpecies(species, context, x, y) {
    
    context.drawImage(species.image, x + 100, y - 120);
}

function getSpeciesImage(bodyImage, headImage, width, height, morphology) {

    var new_canvas = document.createElement('canvas');
    new_canvas.width = width * 2;
    new_canvas.height = height * 2;
    var new_context = new_canvas.getContext("2d");
    new_context.imageSmoothingEnabled = false;
    
    new_context.drawImage(bodyImage, (width / 2), (height / 2) + 30, width, height);
    new_context.drawImage(headImage, (width / 2) - morphology.neck_point[0], (height / 2) - morphology.neck_point[1], width, height);
    var imageData = new_context.getImageData(0, 0, width * 2, height * 2);   
    
    var defaultColors = defaultSpeciesColors();
    var newColors = getSpeciesColors();
    
    for (var i=0;i< imageData.data.length ;i+=4)
      {
          // is this pixel the old rgb?
          
          for (var j = 0; j < defaultColors.primary.length; j++) {
          
              if(imageData.data[i]   == defaultColors.primary[j][0] &&
                 imageData.data[i+1] == defaultColors.primary[j][1] &&
                 imageData.data[i+2] == defaultColors.primary[j][2]
              ){
                  // change to your new rgb
                  imageData.data[i]   = newColors.primary[j][0];
                  imageData.data[i+1] = newColors.primary[j][1];
                  imageData.data[i+2] = newColors.primary[j][2];
                  
                  j = 100;
              }
          }
          
          for (var j = 0; j < defaultColors.secondary.length; j++) {
          
              if(imageData.data[i]   == defaultColors.secondary[j][0] &&
                 imageData.data[i+1] == defaultColors.secondary[j][1] &&
                 imageData.data[i+2] == defaultColors.secondary[j][2]
              ){
                  // change to your new rgb
                  imageData.data[i]   = newColors.secondary[j][0];
                  imageData.data[i+1] = newColors.secondary[j][1];
                  imageData.data[i+2] = newColors.secondary[j][2];
                  
                  j = 100;
              }
          }

      }
      
    
    new_context.putImageData(imageData, 0, 0);
    
    var image = new Image();
    image.src = new_canvas.toDataURL('image/png');
    return image;

}

var speciesColors = function(primary, secondary) {

    this.primary = primary;
    this.secondary = secondary;
}

function defaultSpeciesColors() {

    var primary = [[148, 231, 66], [82, 203, 33], [24, 130, 24]];
    var secondary = [[214, 93, 90], [189, 32, 33], [115, 28, 49]];
    return new speciesColors(primary, secondary);

}

function getSpeciesColors() {

    var def = defaultSpeciesColors();
    
    var primary = [rgbToHsl(def.primary[0]), rgbToHsl(def.primary[1]), rgbToHsl(def.primary[2])];
    var secondary = [rgbToHsl(def.secondary[0]), rgbToHsl(def.secondary[1]), rgbToHsl(def.secondary[2])];
    
    var primaryShift = Math.random();
    for(var i = 0; i < primary.length; i++ ) {
        primary[i][0] += primaryShift;
        primary[i][0] %= 1;
    }
    
    var secondaryShift = Math.random();
    for(var i = 0; i < secondary.length; i++ ) {
        secondary[i][0] += secondaryShift;
        secondary[i][0] %= 1;
    }
    
    var primary2 = [hslToRgb(primary[0]), hslToRgb(primary[1]), hslToRgb(primary[2])];
    var secondary2 = [hslToRgb(secondary[0]), hslToRgb(secondary[1]), hslToRgb(secondary[2])];

    return new speciesColors(primary2, secondary2);

}

// ======================================================================== HELPERS

function hslToRgb(arr){

    var h = arr[0];
    var s = arr[1];
    var l = arr[2];
    var r, g, b;
    
    if(s == 0){
        r = g = b = l; // achromatic
    }else{
        var hue2rgb = function hue2rgb(p, q, t){
            if(t < 0) t += 1;
            if(t > 1) t -= 1;
            if(t < 1/6) return p + (q - p) * 6 * t;
            if(t < 1/2) return q;
            if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        }

        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }

    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

function rgbToHsl(arr){

    var r = arr[0];
    var g = arr[1];
    var b = arr[2];

    r /= 255, g /= 255, b /= 255;
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;

    if(max == min){
        h = s = 0; // achromatic
    }else{
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch(max){
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    return [h, s, l];
}
