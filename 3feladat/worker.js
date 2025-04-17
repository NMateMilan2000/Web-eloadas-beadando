let i = 0;

function count() {
  i++;
  postMessage("Számláló: " + i);
  setTimeout(count, 1000);
}

count();
