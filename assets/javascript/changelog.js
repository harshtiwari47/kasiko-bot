document.addEventListener('DOMContentLoaded', function() {
  const apiEndpoint = 'assets/json/changelog.json';

  let currentPage = 0;
  const itemsPerPage = 2;
  let changelogData = [];

  // Function to render the current page of changelog entries
  function renderPage(page) {
    const container = document.querySelector('.changelog-container');
    container.innerHTML = ''; // Clear previous content

    const startIndex = page * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageData = changelogData.slice(startIndex, endIndex);

    pageData.forEach(entry => {
      // Create a container for each changelog entry
      const entryDiv = document.createElement('div');
      entryDiv.classList.add('changelog-entry');

      // Create header (version and date)
      const header = document.createElement('h2');
      header.textContent = `${entry.version} - ${entry.date}`;
      entryDiv.appendChild(header);

      // Create a list for changes
      const ul = document.createElement('ul');
      entry.changes.forEach(change => {
        const li = document.createElement('li');
        li.textContent = change;
        ul.appendChild(li);
      });
      entryDiv.appendChild(ul);

      // Append this entry to the container
      container.appendChild(entryDiv);
    });

    // Update button states based on page number
    document.getElementById('prev-btn').disabled = page === 0;
    document.getElementById('next-btn').disabled = endIndex >= changelogData.length;
  }

  // Fetch changelog data from the dummy API endpoint
  fetch(apiEndpoint)
    .then(response => response.json())
    .then(data => {
      changelogData = data; // Assume data is an array of changelog objects
      renderPage(currentPage);
    })
    .catch(error => {
      console.error('Error fetching changelog data:', error);
      const container = document.querySelector('.changelog-container');
      container.innerHTML = '<p>Error loading changelog data.</p>';
    });

  // Event listeners for pagination buttons
  document.getElementById('prev-btn').addEventListener('click', function() {
    if (currentPage > 0) {
      currentPage--;
      renderPage(currentPage);
    }
  });

  document.getElementById('next-btn').addEventListener('click', function() {
    if ((currentPage + 1) * itemsPerPage < changelogData.length) {
      currentPage++;
      renderPage(currentPage);
    }
  });
});