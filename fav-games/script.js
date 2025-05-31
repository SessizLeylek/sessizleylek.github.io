fetch('all_sorted.txt')
  .then(response => response.text())
  .then(text => {
    const lines = text.split('\n');
    const container = document.getElementById('content');

    lines.forEach((line, i) => {
      if (line.trim() === '') return; // skip empty lines

      const p = document.createElement('p');
      p.textContent = line;
      p.style.fontSize = `${64 / Math.sqrt(i + 1) + 16}px`; // i+1 to avoid division by 0
      p.style.textAlign = "center";
      container.appendChild(p);
    });
  })
  .catch(error => {
    console.error('Error loading the file:', error);
  });
