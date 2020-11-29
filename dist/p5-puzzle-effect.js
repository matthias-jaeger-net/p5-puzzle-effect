/**
 * Returns a puzzled version of the given image
 *
 * @requires {p5} Global mode
 * @param {p5.Graphics} buffer The given image to be puzzled
 * @param {number} res The resolution of the puzzle grid
 * @return {p5.Graphics} gfx A new buffer with the finished puzzle
 */
function puzzle(buffer, res) {
  const gfx = createGraphics(buffer.width, buffer.height);
  const bufferPixels = buffer.get();
  const sclX = img.width / res;
  const sclY = img.height / res;
  const pieces = [];
  const indices = [];
  const newIndices = [];
  let index = 0;
  for (let x = 0; x < buffer.width; x += sclX) {
    for (let y = 0; y < buffer.height; y += sclY) {
      pieces.push(bufferPixels.get(x, y, sclX, sclY));
      indices.push(index);
      index += 1;
    }
  }
  while (newIndices.length <= pieces.length) {
    const index = floor(random(indices.length));
    newIndices.push(indices[index]);
    indices.splice(index, 1);
  }
  index = 0;
  for (let x = 0; x < buffer.width; x += sclX) {
    for (let y = 0; y < buffer.height; y += sclY) {
      gfx.image(pieces[newIndices[index]], x, y);
      index += 1;
    }
  }
  return gfx;
}