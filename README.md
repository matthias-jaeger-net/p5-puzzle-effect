# p5-puzzle-effect

The ```puzzle(buffer, res)``` function splits up a given image, texture or graphics buffer into a grid of smaller images and returns with a new, randomly arranged composition of those pieces. Download the ```p5-puzzle-effect.js``` file and add it to your sketch. This is a visual experiment and research documentation for creative coders working with [Processing and p5.js](https://p5.org)

#### Input
![cover](images/mark-harpur.png)
#### Output
![cover](images/puzzeld-landscape.jpg)

#### ```index.html```
```html
<script src="p5-puzzle-effect.js" defer></script>
<script src="sketch.js" defer></script>
```
#### ```sketch.js```
```javascript
let img;

function preload() {
  // https://unsplash.com/photos/K2s_YE031CA
  img = loadImage('mark-harpur.png');
}

function setup() {
  createCanvas(img.width, img.height);
  image(puzzle(img, 8), 0, 0);
  save('puzzeld-landscape.jpg');
}
```

#### ``````p5-puzzle-effect.js``````

```javascript
/**
 * Returns a puzzled version of the given image
 * - commented version
 * @requires {p5} Global mode
 * @param {p5.Graphics} buffer The given image to be puzzled
 * @param {number} res The resolution of the puzzle grid
 * @return {p5.Graphics} gfx A new buffer with the finished puzzle
 */
function puzzle(buffer, res) {
  // The graphic to be returned has the same size as the buffer we get
  const gfx = createGraphics(buffer.width, buffer.height);

  // To prevent us from errors wee make a deep copy of the given buffer
  const bufferPixels = buffer.get();

  // Define the size of a cell in the grid
  const sclX = img.width / res;
  const sclY = img.height / res;

  // Lists to be sorted and operated on
  const pieces = [];
  const indices = [];
  const newIndices = [];

  // Counter init
  let index = 0;

  // Populate data lists
  for (let x = 0; x < buffer.width; x += sclX) {
    for (let y = 0; y < buffer.height; y += sclY) {
      // Images go in the pieces list
      pieces.push(bufferPixels.get(x, y, sclX, sclY));

      // Saving the index positions seperatly
      indices.push(index);
      index += 1;
    }
  }

  // Puzzeling a new list
  while (newIndices.length <= pieces.length) {
    // Pick a random index from the options indices.length will shrink...
    const index = floor(random(indices.length));

    // Add to new list
    newIndices.push(indices[index]);

    // Remove from options to pick
    indices.splice(index, 1);
  }

  // Reset counter
  index = 0;

  // Redraw the final image into the graphic
  for (let x = 0; x < buffer.width; x += sclX) {
    for (let y = 0; y < buffer.height; y += sclY) {
      // Get the sorted indicces and
      gfx.image(pieces[newIndices[index]], x, y);
      index += 1;
    }
  }

  // Done return the final graphic
  return gfx;
}
```
