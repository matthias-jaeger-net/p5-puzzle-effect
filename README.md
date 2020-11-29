# p5-puzzle-effect

### Download the ```effects.js``` file and add it to your sketch
```javascript
/**
 * Returns a puzzled version of the given image
 * 
 * @requires {p5} Global mode 
 * @param {p5.Graphics, p5.Image} buffer A given buffer or image
 * @param {number} res The sidelength of a puzzle piece 
 * @return {p5.Graphics} A new buffer with the finished puzzle
 */
function puzzle(buffer, res) {
  const gfx = createGraphics(buffer.width, buffer.height);
  const bufferPixels = buffer.get();
  const pieces = [];
  const indices = [];
  const sclX = img.width / res;
  const sclY = img.height / res;
  let index = 0;
  for (let x = 0; x < buffer.width; x += sclX) {
    for (let y = 0; y < buffer.height; y += sclY) {
      pieces.push(bufferPixels.get(x, y, sclX, sclY));
      indices.push(index);
      index += 1;
    }
  }
  for (let x = 0; x < buffer.width; x += sclX) {
    for (let y = 0; y < buffer.height; y += sclY) {
      let index = random(indices);
      gfx.image(pieces[index], x, y);
      // Remove index from the options to choose from
      indices.splice(index, 1);
    }
  }
  return gfx;
}
```
###  Then I include eeffects my script in ```index.html```
```html
  <script src="effects.js" defer></script>
  <script src="sketch.js" defer></script>
```

### Turn any of your static sketches ...
![puzzle](input-puzzle.jpg)

### Into a puzzeld-up sketch,
![puzzle](input-to-puzzle.jpg)

### with smaller or larger resolution.
![puzzle](input-to-puzzle.jpg)

## The images from above and this sketch are just an example, the effects function will work with any desgin as an input. 

### I import the font I'm using in ```style.css```
```css
@import url('https://fonts.googleapis.com/css2?family=Texturina:wght@900&display=swap');
```

### My basic ```sketch.js``` has no animation loop
```javascript
function setup() {
  createCanvas(800, 400);
  background(themeDark);
  
  // Just a few colors
  const themeDark = '#275B98';
  const themeLight = '#FF846F';
  const themeAccent = '#667FD1';

  // Irregular stripes in the bachkground
  stroke(themeLight);
  for (let x = 0; x < width; x += 5) {
    line(x + random(-1, 1), 0, x + random(-1, 1), height);
  }
  
  // A simple gradient
  for (let y = 0; y < height; y += 1) {
    const r = red(themeAccent);
    const g = green(themeAccent);
    const b = blue(themeAccent);
    const alpha = map(y, 0, height, 0, 190);
    stroke(r, g, b, alpha);
    line(0, y, width, y);
  }
  
  // Text layout
  const title = 'The image is puzzeld in pieces';
  textSize(90);
  textFont('Texturina');
  textAlign(CENTER, CENTER);
  
  fill(themeDark);
  text(title, 11, 22, width - 40, height - 40);
  
  fill(themeLight);
  text(title, 10, 20, width - 40, height - 40);
  
  // Done
  save('input-to-puzzle.jpg');
}
```


### Use it in your own ```sketch.js```
```javascript
function setup() {
  createCanvas(800, 400);
  
  // Anything can be drawn here ...
  
  const design = get();
  const resolution = 200; 
  image(puzzle(design, resolution), 0, 0);
}
```
