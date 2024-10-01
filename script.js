let gridSize = 16;
const drawingGrid = document.getElementById('drawing-grid');
const mouseBehaviorRadios = document.querySelectorAll('.mouse-behavior');
const gridSizeInput = document.getElementById('grid-size')

createGrid();
// Create grid panels

function createGrid(){
    drawingGrid.innerHTML = '';
    const gridPanelWidth = Math.floor((500 / gridSize) * 100) / 100;
    console.log(gridPanelWidth);
    document.documentElement.style.setProperty('--grid-panel-width', `${gridPanelWidth}px`); // Set the CSS variable
    document.documentElement.style.setProperty('--grid-size',gridSize);

    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            const gridPanel = document.createElement('div');
            gridPanel.classList.add('grid-panel');
            gridPanel.id = `grid-panel-${i + 1}-${j + 1}`;
            drawingGrid.appendChild(gridPanel);
        }
    }
}

gridSizeInput.addEventListener('input', (event) => {
    gridSize = Number(event.target.value); 
    createGrid(); 
});


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
               panel.classList.add('paint')
            }
        });
    });
};

// Function for "Hover to Paint" behavior
const hoverToPaint = () => {

    const gridPanels = document.querySelectorAll('.grid-panel');
    gridPanels.forEach(panel => {
        panel.addEventListener('mouseover', () => {
            panel.classList.add('paint')
        });
    });
};

// Function for "Click to Paint" behavior
const clickToHover = () => {
    let isMouseDown = false; 

    drawingGrid.addEventListener('mousedown', () => {
        isMouseDown = !isMouseDown;  // Set mouse state to down
    });
    drawingGrid.addEventListener('mouseleave', () => (isMouseDown = false));

   
    const gridPanels = document.querySelectorAll('.grid-panel');
    gridPanels.forEach(panel => {
        panel.addEventListener('mouseover', () => {
            if (isMouseDown) {
                panel.classList.add('paint')
            }
        });
        panel.addEventListener('mousedown', () => {
            panel.classList.add('paint')
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


// Change background color
const backgroundColorToggle = document.getElementById('bg-color-toggle');

backgroundColorToggle.addEventListener('change', (event) => {
    const newBgColor = event.target.value; // Use event.target to get the value
    document.documentElement.style.setProperty('--grid-panel-color', newBgColor); // Set the CSS variable
});

// Change paint color
const paintColorToggle = document.getElementById('paint-color-toggle');

paintColorToggle.addEventListener('change', (event) => {
    const newBgColor = event.target.value; // Use event.target to get the value
    document.documentElement.style.setProperty('--paint-color', newBgColor); // Set the CSS variable
});

//clear grid function
function clearGrid(){
    const gridPanels = document.querySelectorAll('.grid-panel');

    if (confirm('Do you want to clear the grid? This action cannot be undone.')) {
    gridPanels.forEach((panel)=>{
        panel.classList.remove('paint');
    });
}
}

const neBtn = document.querySelector('.new-btn');

neBtn.addEventListener('click', () => {
    if (confirm('Do you want to reset the website? This will clear the grid and reset all settings.')) {
        location.reload(); // Reload the page to reset everything
    }
});

function toggleControl(){
    const menu = document.querySelector('.controls');

    menu.classList.toggle('show-menu');
}
