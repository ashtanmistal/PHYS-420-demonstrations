function makegrid() {
  const div = document.createElement('div');
  document.body.appendChild(div);
  div.className = 'grid_container';
  div.style = 'display: flex; flex-direction: column; overflow: hidden; height: 1080px; width: 1920px; border: 1px solid black';
  let i = 0;
  while (i < 1080) {
    let j = 0;
    while (j < 1920) {
      const square = document.createElement('div');
      square.className = 'square';
      square.style = 'height: 1px; width: 1px; background-color: black; margin: 0; padding: 0; border: 0;';
      div.appendChild(square);
      j++;
    }
    i++;
  }
  const randomsquare = document.getElementsByClassName('square');
  const random = Math.floor(Math.random() * randomsquare.length);
  randomsquare[random].style = 'height: 1px; width: 1px; background-color: white;';

}

makegrid();
