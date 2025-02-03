// Get the grid container from the HTML by its id
const gridElement = document.getElementById('grid');

// Define the TicTakToe class to handle game logic
class TicTakToe {
  // The constructor initializes the game state
  constructor(root, gridSize = 3) {
    // Store the root element (grid container) and grid size (default is 3 for a 3x3 grid)
    this.root = root;
    this.gridSize = gridSize;
    
    // This will be a 2D array representing the grid cells (buttons)
    this.grid = [];
    
    // Track the winner (null if no winner yet)
    this.winner = null;
    
    // Track the current player ('X' starts first)
    this.currentPlayer = 'X';
    
    // Counter to track how many cells have been filled
    this.cellFilled = 0;

    // Create and populate the grid with buttons
    this.populateGrid();
    
    // Add event listeners for user interactions
    this.addEventListeners();
  }

  // populateGrid creates the grid and organizes it into a 2D array
  populateGrid() {
    // Create the grid (using createGrid) and append it to the root element
    this.root.appendChild(this.createGrid());
    
    // Get all child elements (buttons) that were added to the grid container
    const elements = this.root.children;
    
    // Convert the flat list of elements into a 2D array representing rows
    for (let i = 0; i < this.gridSize; i++) {
      // For each row, slice out the correct number of cells from the elements array
      this.grid[i] = Array.from(elements).slice(i * this.gridSize, i * this.gridSize + this.gridSize);
    }
  }

  // createGrid generates the grid by creating buttons for each cell
  createGrid() {
    // Create a document fragment to hold the grid cells temporarily
    const fragment = document.createDocumentFragment();
    
    // Loop through the rows and columns to create gridSize * gridSize cells
    for (let i = 0; i < this.gridSize; i++) {
      for (let j = 0; j < this.gridSize; j++) {
        // Create a button element for each cell
        const cell = document.createElement('button');
        
        // Store the cell's coordinates in data attributes for later use
        cell.dataset.x = i;
        cell.dataset.y = j;
        
        // Add the class 'cell' to each button for styling and event detection
        cell.classList.add('cell');
        
        // Append the cell to the document fragment
        fragment.appendChild(cell);
      }
    }
    // Return the fragment containing all the grid cells
    return fragment;
  }

  // addEventListeners sets up user interactions with the grid
  addEventListeners() {
    // Listen for click events on the grid container
    this.root.addEventListener('click', e => {
      // Check if the clicked element has the 'cell' class and no winner has been declared yet
      if (e.target.classList.contains('cell') && this.winner === null) {
        // Call the play method with the clicked cell as the argument
        this.play(e.target);
      }
    });
  }

  // play handles a player's move when a cell is clicked
  play(cell) {
    // Only allow moves on cells that are empty
    if (cell.textContent === '') {
      // Set the cell with the current player's symbol (either 'X' or 'O')
      this.set(cell.dataset.x, cell.dataset.y, this.currentPlayer);
      
      // Increment the count of filled cells
      this.cellFilled += 1;
      
      // Check if the move resulted in a win
      if (this.checkWinner()) {
        // If there's a winner, record it
        this.winner = this.currentPlayer;
        // If a winnerCallback function exists, call it with the winner as an argument
        this.winnerCallback?.(this.winner);
        return;
      } 
      // If all cells are filled and no winner, it's a draw
      else if (this.cellFilled === this.gridSize * this.gridSize) {
        this.winner = 'Draw';
        this.winnerCallback?.(this.winner);
        return;
      }
      // If the game is not over, switch to the next player
      this.changePlayer();
    }
  }

  // changePlayer toggles the current player between 'X' and 'O'
  changePlayer() {
    this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
  }

  // set updates the content of a specific cell in the grid
  set(row, col, value) {
    this.grid[row][col].textContent = value;
  }

  // checkWinner checks all possible winning conditions and returns the winner's symbol or false if no winner
  checkWinner() {
    return (
      this.isRowHasWinner(0) ||
      this.isRowHasWinner(1) ||
      this.isRowHasWinner(2) ||
      this.isColHasWinner(0) ||
      this.isColHasWinner(1) ||
      this.isColHasWinner(2) ||
      this.checkDiagonal() ||
      this.checkDiagonalReverse()
    );
  }

  // isRowHasWinner checks if a specific row has all cells with the same symbol
  isRowHasWinner(row) {
    // Get the value of the first cell in the row
    const value = this.grid[row][0].textContent;
    // Check if every cell in the row has the same textContent
    if (this.grid[row].every(v => v.textContent === value)) {
      return value; // Return the winning symbol (if they are the same)
    }
    return false; // Otherwise, return false indicating no win in this row
  }

  // isColHasWinner checks if a specific column has all cells with the same symbol
  isColHasWinner(col) {
    // Get the value of the cell in the first row for the specified column
    const value = this.grid[0][col].textContent;
    // Create an array of cells in that column and check if every cell has the same textContent
    if (this.grid.map(row => row[col]).every(v => v.textContent === value)) {
      return value; // Return the winning symbol
    }
    return false; // Otherwise, return false indicating no win in this column
  }

  // checkDiagonal checks the main diagonal (top-left to bottom-right) for a win
  checkDiagonal() {
    // Get the value from the top-left cell
    const value = this.grid[0][0].textContent;
    // Loop through each cell in the main diagonal
    for (let i = 0; i < this.grid.length; i++) {
      if (this.grid[i][i].textContent !== value) {
        return false; // Return false if any cell in the diagonal doesn't match
      }
    }
    return value; // If all cells match, return the winning symbol
  }

  // checkDiagonalReverse checks the reverse diagonal (top-right to bottom-left) for a win
  checkDiagonalReverse() {
    // Get the value from the top-right cell
    const value = this.grid[0][2].textContent;
    // Loop through each cell in the reverse diagonal
    for (let i = 0; i < this.grid.length; i++) {
      if (this.grid[i][this.grid.length - 1 - i].textContent !== value) {
        return false; // Return false if any cell in the reverse diagonal doesn't match
      }
    }
    return value; // If all cells match, return the winning symbol
  }

  // reset clears the grid and resets the game state for a new game
  reset() {
    // Loop through all rows and columns to clear each cell's textContent
    for (let i = 0; i < this.gridSize; i++) {
      for (let j = 0; j < this.gridSize; j++) {
        this.grid[i][j].textContent = "";
      }
    }
    // Reset the game state variables
    this.winner = null;
    this.currentPlayer = 'X';
    this.cellFilled = 0;
  }
}

// Create a new instance of the TicTakToe game, passing in the grid element
const ticTakToe = new TicTakToe(gridElement);

// Define a callback function to handle the winner and update the UI accordingly
ticTakToe.winnerCallback = (winner) => {
  switch (winner) {
    case 'X':
      // If player X wins, update the winner message
      document.getElementById('winner').textContent = 'Player X won!';
      break;
    case 'O':
      // If player O wins, update the winner message
      document.getElementById('winner').textContent = 'Player O won!';
      break;
    default:
      // If it's a draw, update the winner message accordingly
      document.getElementById('winner').textContent = 'Draw!';
  }
};

// Add an event listener to the reset button to restart the game when clicked
document.getElementById('reset').addEventListener('click', () => {
  // Reset the game state
  ticTakToe.reset();
  // Clear the winner message
  document.getElementById('winner').textContent = "";
});
