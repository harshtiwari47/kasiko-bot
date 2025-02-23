document.addEventListener('DOMContentLoaded', function() {
  const apiEndpoint = 'assets/json/leaderboard.json';
  const container = document.querySelector('.leaderboard-container');

  fetch(apiEndpoint)
    .then(response => response.json())
    .then(data => {
      // Verify that the data is an array and contains entries
      if (!Array.isArray(data) || data.length === 0) {
        container.innerHTML = '<p>No leaderboard data available.</p>';
        return;
      }
      
      // Create a table element to display the leaderboard
      const table = document.createElement('table');
      table.classList.add('leaderboard-table');

      // Create the header row
      const headerRow = document.createElement('tr');
      
      const thRank = document.createElement('th');
      thRank.textContent = 'Rank';
      headerRow.appendChild(thRank);
      
      const thUsername = document.createElement('th');
      thUsername.textContent = 'Username';
      headerRow.appendChild(thUsername);
      
      const thNetWorth = document.createElement('th');
      thNetWorth.textContent = 'Net Worth';
      headerRow.appendChild(thNetWorth);
      
      table.appendChild(headerRow);

      // Loop through each entry in the JSON (assumed to be already sorted in rank order)
      data.forEach(entry => {
        const row = document.createElement('tr');
        
        const tdRank = document.createElement('td');
        tdRank.textContent = entry.rank;
        row.appendChild(tdRank);
        
        const tdUsername = document.createElement('td');
        tdUsername.textContent = entry.username;
        row.appendChild(tdUsername);
        
        const tdNetWorth = document.createElement('td');
        tdNetWorth.textContent = entry.netWorth;
        row.appendChild(tdNetWorth);
        
        table.appendChild(row);
      });

      container.appendChild(table);
    })
    .catch(error => {
      console.error('Error fetching leaderboard data:', error);
      container.innerHTML = '<p>Error loading leaderboard data.</p>';
    });
});