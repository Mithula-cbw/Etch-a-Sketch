const gridSize = 16;
const drawingGrid = document.getElementById('drawing-grid');
const mouseBehaviorRadios = document.querySelectorAll('.mouse-behavior');


// Create grid panels
for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
        const gridPanel = document.createElement('div');
        gridPanel.classList.add('grid-panel');
        gridPanel.id = `grid-panel-${i + 1}-${j + 1}`;
        drawingGrid.appendChild(gridPanel);
    }
}

// Add event listeners for mouse behavior radio buttons
mouseBehaviorRadios.forEach((radio) => {
    radio.addEventListener('change', (event) => {
        currentBehavior = event.target.value;  // Update current behavior
        applyMouseBehavior(currentBehavior);   // Call the appropriate function
    });
});

// Function to apply the selected mouse behavior
function applyMouseBehavior(behavior) {
    // Clear existing event listeners
    clearPanelListeners();

    switch (behavior) {
        case 'click-n-drag':
            clickAndDrag();
            break;
        case 'hover':
            hoverToPaint();
            break;
        case 'click-n-hover':
            clickToHover();
            break;
        default:
            clickAndDrag();  // Default to click and drag
    }
}

// Function for "Click and Drag to Paint" behavior
const clickAndDrag = () => {
    let isMouseDown = false;

    document.addEventListener('mousedown', () => (isMouseDown = true));
    document.addEventListener('mouseup', () => (isMouseDown = false));
    drawingGrid.addEventListener('mouseleave', () => (isMouseDown = false));

    const gridPanels = document.querySelectorAll('.grid-panel');
    gridPanels.forEach(panel => {
        panel.addEventListener('mouseover', () => {
            if (isMouseDown) {
                panel.style.backgroundColor = 'blue';
            }
        });
    });
};

// Function for "Hover to Paint" behavior
const hoverToPaint = () => {

    const gridPanels = document.querySelectorAll('.grid-panel');
    gridPanels.forEach(panel => {
        panel.addEventListener('mouseover', () => {
            panel.style.backgroundColor = 'blue';  // Change color on hover
        });
    });
};

// Function for "Click to Paint" behavior
const clickToHover = () => {
    let isMouseDown = false; 

    drawingGrid.addEventListener('mousedown', () => {
        isMouseDown = !isMouseDown;  // Set mouse state to down
    });
   
    const gridPanels = document.querySelectorAll('.grid-panel');
    gridPanels.forEach(panel => {
        panel.addEventListener('mouseover', () => {
            if (isMouseDown) {
                panel.style.backgroundColor = 'blue';  // Change color on hover if mouse is down
            }
        });
        panel.addEventListener('mousedown', () => {
            panel.style.backgroundColor = 'blue';  // Immediate color change on mousedown
        });
    });

    
};

// Function to clear existing event listeners from grid panels
const clearPanelListeners = () => {
    const gridPanels = document.querySelectorAll('.grid-panel');
    gridPanels.forEach(panel => {
        // Remove previous listeners if necessary
        const newPanel = panel.cloneNode(true);
        panel.parentNode.replaceChild(newPanel, panel);
    });
};

// Initialize default behavior
applyMouseBehavior('click-n-drag');
