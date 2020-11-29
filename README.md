# p5-puzzle-effect
Research on how to 'puzzle' an image inside of a sketch 

### Turn any sketch
![puzzle](input-puzzle.jpg)

### Into a puzzeld up sketch
![puzzle](input-to-puzzle.jpg)




### I include the script in ```index.html```
```html
  <script src="effects.min.js" defer></script>
  <script src="sketch.js" defer></script>
```
### ```effects.js```
```javascript
function puzzle(buffer, scl) {
  // Set a new graphics buffer with the same dimensions
  const gfx = createGraphics(buffer.width, buffer.height);
  
  // Copy buffer to a p5.Image, it might be a a p5.Graphic  
  const bufferPixels = buffer.get();
  
  // All the pieces of the puzzle, each one is an image
  const pieces = [];
  
  // Used to remove selected indices, when piecing the puzzle
  const indices = [];
  let index = 0;
  
  // Split up the input image in a grid of smaller pieces
  for (let x = 0; x < buffer.width; x += scl) {
    for (let y = 0; y < buffer.height; y += scl) {
      // Slice up the image using
      pieces.push(bufferPixels.get(x, y, scl, scl));
      // Mark the index
      indices.push(index);
      index += 1;
    }
  }
  
  // Same loop as above, but this time we puzzle the images
  for (let x = 0; x < buffer.width; x += scl) {
    for (let y = 0; y < buffer.height; y += scl) {
      // Each cell: try a random index
      let index = floor(random(pieces.length));
      // Render the image in the buffer at current position
      gfx.image(pieces[index], x, y);
      // Remove index from the options to choose from
      pieces.splice(index, 1);
    }
  }
  
  // I assume we are done
  return gfx;
}
```

### Use it in ```sketch.js```
```javascript
function setup() {
  createCanvas(800, 400);
  
  const title = 'The image is puzzeld in pieces';
  background('#231298');
  fill('#d32389');
  textAlign(CENTER, CENTER);
  textSize(90);
  textFont("Texturina");
  text(title, 10, 20, width - 40, height - 40);
  
  const design = get();
  //image(design, 0, 0)
  image(puzzle(design, 200), random(5), random(5))
}
```
