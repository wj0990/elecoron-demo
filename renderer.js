const func = async () => {
  const response = await window.versions.ping()
}

func();

document.getElementById('drag1').ondragstart = (event) => {
  event.preventDefault();
  window.electron.startDarg('drag-and-drop-1.md')
}

document.getElementById('drag2').ondragstart = (event) => {
  event.preventDefault();
  window.electron.startDarg('drag-and-drop-1.md')
}