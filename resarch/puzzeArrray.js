function puz(arr) {
  const ret = [];
	const indices = [];
  for (let index = 0; index < arr.length; index += 1) {
  	indices.push(index);
  }
  while (ret.length < arr.length) {
  	const r = Math.floor(Math.random()*indices.length)
    ret.push(arr[indices[r]]);
    indices.splice(r, 1);
 }

 return ret;
}

// Test
const a = [12, {strange: "thing"}, 100, "2999"];
const b = puz(a);
console.log({a, b});
console.log(a.length === b.length);