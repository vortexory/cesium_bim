// Add Help Button and Modal to the DOM
function addHelpUI() {
    // Add CSS to the document head
    const style = document.createElement('style');
    style.textContent = `
        #helpButton {
            position: absolute;
            bottom: 20px;
            right: 20px;
            width: 50px;
            height: 50px;
            background-color: #3498db;
            color: white;
            border: none;
            border-radius: 50%;
            font-size: 24px;
            cursor: pointer;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
            z-index: 1000;
            display: flex;
            justify-content: center;
            align-items: center;
            transition: background-color 0.3s;
        }
        
        #helpButton:hover {
            background-color: #2980b9;
        }
        
        #helpModal {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            z-index: 1001;
            justify-content: center;
            align-items: center;
        }
        
        .modal-content {
            background-color: white;
            padding: 20px;
            border-radius: 8px;
            width: 600px;
            max-width: 90%;
            max-height: 80vh;
            overflow-y: auto;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
        }
        
        .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 15px;
            border-bottom: 1px solid #e0e0e0;
            padding-bottom: 10px;
        }
        
        .modal-header h2 {
            margin: 0;
            color: #333;
            font-size: 20px;
        }
        
        .close-button {
            background: none;
            border: none;
            font-size: 24px;
            cursor: pointer;
            color: #777;
        }
        
        .close-button:hover {
            color: #333;
        }
        
        .help-section {
            margin-bottom: 20px;
        }
        
        .help-section h3 {
            margin-top: 15px;
            margin-bottom: 8px;
            color: #3498db;
        }
        
        .help-section p {
            margin: 8px 0;
            line-height: 1.5;
            color: #333;
        }
        
        .help-section ul {
            margin: 10px 0;
            padding-left: 20px;
        }
        
        .help-section li {
            margin-bottom: 5px;
            color: #333;
        }
    `;
    document.head.appendChild(style);
    
    // Create help button
    const helpButton = document.createElement('button');
    helpButton.id = 'helpButton';
    helpButton.title = 'Help & Usage Instructions';
    helpButton.textContent = '?';
    document.body.appendChild(helpButton);
    
    // Create modal
    const helpModal = document.createElement('div');
    helpModal.id = 'helpModal';
    helpModal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>3D Viewer Usage Guide</h2>
                <button class="close-button">&times;</button>
            </div>
            
            <div class="help-section">
                <h3>Basic Navigation</h3>
                <p><b>Rotate:</b> Left-click + drag</p>
                <p><b>Pan:</b> Right-click + drag or middle-click + drag</p>
                <p><b>Zoom:</b> Mouse wheel or Ctrl + left-click + drag</p>
                <p><b>Reset View:</b> Double-click empty space</p>
            </div>
            
            <div class="help-section">
                <h3>Cross-Section Tool</h3>
                <p>The cross-section tool allows you to slice through 3D models to see their internal structure.</p>
                <p><b>Enable/Disable Clipping:</b> Click the "Enable Clipping" button to toggle cross-sections on/off.</p>
                <p><b>Adjust Clipping Planes:</b> Use the X, Y, and Z sliders to move the clipping planes along each axis.</p>
                <p><b>Invert Planes:</b> Click "Invert Planes" to flip the visible side of each cross-section.</p>
                <p><b>Reset Positions:</b> Click "Reset" to return all clipping planes to their original positions.</p>
                <p><b>Customize Cut Surface:</b> Use the color picker to change the appearance of the cut faces.</p>
            </div>
            
            <div class="help-section">
                <h3>Lighting Controls</h3>
                <p>The scene is pre-configured with optimized lighting to provide maximum visibility of model details.</p>
                <p>The lighting simulates a bright noon environment with multiple light sources to illuminate all model sides.</p>
            </div>
            
            <div class="help-section">
                <h3>Performance Tips</h3>
                <p>If you experience slow performance:</p>
                <ul>
                    <li>Reduce the number of visible models</li>
                    <li>Disable the cross-section tool when not needed</li>
                    <li>Allow models to fully load before making rapid camera movements</li>
                </ul>
            </div>
            
            <div class="help-section">
                <h3>Troubleshooting</h3>
                <p><b>Models not visible:</b> Check that the model files are properly located in the /glb/ folder</p>
                <p><b>Clipping not working:</b> Try toggling the clipping planes off and on again</p>
                <p><b>Poor performance:</b> Refresh the page to clear memory and restart the viewer</p>
            </div>
        </div>
    `;
    document.body.appendChild(helpModal);
    
    // Setup event listeners
    setupHelpModalEvents();
}

// Setup event handlers for the help modal
function setupHelpModalEvents() {
    const helpButton = document.getElementById('helpButton');
    const helpModal = document.getElementById('helpModal');
    const closeButton = document.querySelector('.close-button');
    
    // Show modal when help button is clicked
    helpButton.addEventListener('click', function() {
        helpModal.style.display = 'flex';
    });
    
    // Close modal when close button is clicked
    closeButton.addEventListener('click', function() {
        helpModal.style.display = 'none';
    });
    
    // Close modal when clicking outside the content
    helpModal.addEventListener('click', function(event) {
        if (event.target === helpModal) {
            helpModal.style.display = 'none';
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && helpModal.style.display === 'flex') {
            helpModal.style.display = 'none';
        }
    });
}

// Initialize help UI when page is loaded
window.addEventListener('load', function() {
    // Wait for page to fully render
    setTimeout(function() {
        addHelpUI();
    }, 2000);
}); 