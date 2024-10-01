

document.addEventListener('DOMContentLoaded',()=>{
    const gridSize = 16;
    const drawingGrid = document.getElementById('drawing-grid');

    for(let i = 0; i < gridSize; i++){
        for(let j = 0; j < gridSize; j++){
            const gridPanel = document.createElement('div');
            gridPanel.classList.add('grid-panel');
            gridPanel.id = `grid-panel-${i+1}-${j+1}`;
            drawingGrid.appendChild(gridPanel);
        }   
    }
});