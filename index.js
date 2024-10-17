// Generate the Battleship board
const board = document.getElementById('battleship-board');

// Rows (A-J)
const rows = 'ABCDEFGHIJ'.split('');
// Columns (1-10)
const columns = Array.from({ length: 10 }, (_, i) => i + 1);

// Create the top row (numbers)
board.innerHTML += '<div class="cell header"></div>'; // Empty top-left corner
columns.forEach(number => {
    board.innerHTML += `<div class="cell header">${number}</div>`;
});

// Generate the grid (rows A-J, columns 1-10)
rows.forEach((letter, rowIndex) => {
    // Add row header (letters A-J)
    board.innerHTML += `<div class="cell header">${letter}</div>`;
    
    // Create 10 cells for each row (no text inside the cells initially)
    columns.forEach(column => {
        const coordinate = `${letter}${column}`;
        board.innerHTML += `<div class="cell" data-coordinate="${coordinate}"></div>`;
    });
});

// Function to simulate placing a ship
function placeShip(coordinates) {
    coordinates.forEach((coord, index) => {
        setTimeout(() => {
            const cell = document.querySelector(`[data-coordinate="${coord}"]`);
            cell.classList.add('ship');
        }, index * 500);  // Delay of 500ms for each part of the ship
    });
}

// Function to simulate firing a shot and displaying "Hit" or "Miss"
function fireShot(coord, hit = false) {
    setTimeout(() => {
        const cell = document.querySelector(`[data-coordinate="${coord}"]`);
        const content = document.createElement('div');
        content.className = 'cell-content'; // Layered text for hit/miss
        content.innerText = hit ? "Hit" : "Miss";
        cell.appendChild(content);
        if (hit) {
            cell.classList.add('hit');
        } else {
            cell.classList.add('miss');
        }
    }, 500);  // Delay to simulate turn-based firing
}

// Function to clear the board
function resetBoard() {
    document.querySelectorAll('.cell').forEach(cell => {
        cell.classList.remove('ship', 'hit', 'miss');
        if (!cell.classList.contains('header')) {
            cell.innerHTML = ''; // Clear only the content cells
        }
    });
}

// Simulate the gameplay with a sequence of actions
function simulateGameplay() {
    // Reset the board before starting a new loop
    resetBoard();

    // Place ships on the board
    placeShip(['A1', 'A2', 'A3', 'A4']);
    placeShip(['C5', 'D5', 'E5']);
    placeShip(['H8', 'H9', 'H10']);
    
    // Fire some shots
    setTimeout(() => {
        fireShot('A1', true);  // Hit
        fireShot('B3', false); // Miss
        fireShot('C5', true);  // Hit
        fireShot('F7', false); // Miss
        fireShot('H10', true); // Hit
    }, 3000); // Start firing shots after ships are placed

    // Restart the simulation after a delay (6 seconds for ships + shots)
    setTimeout(simulateGameplay, 8000);  // Adjust timing to match animation length
}

// Start the simulation when the page loads
window.onload = simulateGameplay;