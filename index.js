let main = document.getElementById("main");

size = 15;

arr = [];
for (let x = 0; x < size; x++) {
  arr.push([]);
  for (let y = 0; y < size; y++) {
    arr[arr.length - 1].push(0);
  }
}

for (let x = 0; x < size; x++) {
  for (let y = 0; y < size; y++) {
    if ((x == 1 || y == 1) && (x == 1 || y == 1)) {
      arr[x][y] = 3;
    }
    if ((x == size - 1 || y == size - 1) && (x == size - 1 || y == size - 1)) {
      arr[x][y] = 3;
    }
  }
}

arr[2][2] = 2;

ghost = { x: 13, y: 13 };

for (let j = 3; j < 13; j += 2) {
  for (let i = 3; i < 13; i++) {
    arr[i][j] = 3;
  }
}

setInterval(() => {
  let z = 100;
  while (main.firstChild) {
    main.removeChild(main.firstChild);
  }
  for (let x = 0; x < size; x++) {
    for (let y = 0; y < size; y++) {
      let newDiv = document.createElement("div");
      if (arr[x][y] == 0) {
        newDiv.style.backgroundColor = "black";
      } else if (arr[x][y] == 3) {
        newDiv.style.backgroundColor = "blue";
      } else if (arr[x][y] == 5) {
        newDiv.style.backgroundColor = "red";
      } else {
        newDiv.style.backgroundColor = "yellow";
      }
      newDiv.style.position = "absolute";
      newDiv.style.paddingLeft = `${x * 50}px`;
      newDiv.style.paddingTop = `${y * 50}px`;
      newDiv.style.zIndex = `${z}`;
      z--;
      main.appendChild(newDiv);
    }
  }
}, 100);

window.addEventListener("keydown", function (event) {
  if (event.key === "w") {
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length; j++) {
        if (arr[i][j] == 2 && arr[i][j - 1] != 3) {
          arr[i][j] = 0;
          arr[i][j - 1] = 2;
          break;
        }
      }
    }
  }
  if (event.key === "s") {
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length; j++) {
        if (arr[i][j] == 2 && arr[i][j + 1] != 3) {
          arr[i][j] = 0;
          arr[i][j + 1] = 2;
          break;
        }
      }
    }
  }
  if (event.key === "a") {
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length; j++) {
        if (arr[i][j] == 2 && arr[i - 1][j] != 3) {
          arr[i][j] = 0;
          arr[i - 1][j] = 2;
          break;
        }
      }
    }
  }
  if (event.key === "d") {
    for (let j = 0; j < arr.length; j++) {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i][j] == 2 && arr[i + 1][j] != 3) {
          arr[i][j] = 0;
          arr[i + 1][j] = 2;
          break;
        }
      }
    }
  }
});

let tempArr = [];

setInterval(() => {
  arr[ghost.x][ghost.y] = 5;
  tempArr = [];
  for (let x = 0; x < size; x++) {
    tempArr.push([]);
    for (let y = 0; y < size; y++) {
      tempArr[x][y] = {};
      tempArr[x][y].color = arr[x][y];
      tempArr[x][y].parent = null;
    }
  }
  //console.log(tempArr)
  if (arr[ghost.x + 1][ghost.y] == 0) {
    tempArr[ghost.x + 1][ghost.y].parent = { x: ghost.x + 1, y: ghost.y };
  }
  if (arr[ghost.x - 1][ghost.y] == 0) {
    tempArr[ghost.x - 1][ghost.y].parent = { x: ghost.x - 1, y: ghost.y };
  }
  if (arr[ghost.x][ghost.y + 1] == 0) {
    tempArr[ghost.x][ghost.y + 1].parent = { x: ghost.x, y: ghost.y + 1 };
  }
  if (arr[ghost.x][ghost.y - 1] == 0) {
    tempArr[ghost.x][ghost.y - 1].parent = { x: ghost.x, y: ghost.y - 1 };
  }
  for (let iteration = 0; iteration < 40; iteration++) {
    for (let x = 1; x < size - 1; x++) {
      for (let y = 1; y < size - 1; y++) {
        if (tempArr[x][y].parent != null) {
          //console.log(1)
          if (tempArr[x + 1][y].parent == null && arr[x + 1][y] != 3) {
            tempArr[x + 1][y].parent = tempArr[x][y].parent;
          }
          if (tempArr[x - 1][y].parent == null && arr[x - 1][y] != 3) {
            tempArr[x - 1][y].parent = tempArr[x][y].parent;
          }
          if (tempArr[x][y + 1].parent == null && arr[x][y + 1] != 3) {
            tempArr[x][y + 1].parent = tempArr[x][y].parent;
          }
          if (tempArr[x][y - 1].parent == null && arr[x][y - 1] != 3) {
            tempArr[x][y - 1].parent = tempArr[x][y].parent;
          }
        }
      }
    }
  }
  for (let x = 0; x < size; x++) {
    for (let y = 0; y < size; y++) {
      if (arr[x][y] == 2 && tempArr[x][y].parent != null) {
        arr[tempArr[x][y].parent.x][tempArr[x][y].parent.y] = 5;
        arr[ghost.x][ghost.y] = 0;
        ghost.x = tempArr[x][y].parent.x;
        ghost.y = tempArr[x][y].parent.y;
      } else {
        //console.log("ne staa")
      }
    }
  }
}, 1000);
