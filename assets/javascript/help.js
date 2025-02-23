document.addEventListener('DOMContentLoaded', function() {
  const apiEndpoint = 'assets/json/help.json';
  let helpData = {};

  const searchInput = document.getElementById('help-search');
  const cardsContainer = document.getElementById('help-cards-container');
  const detailContainer = document.getElementById('help-detail-container');
  const breadcrumbsContainer = document.getElementById('help-breadcrumbs');
  const detailContent = document.getElementById('help-detail-content');
  const backBtn = document.getElementById('back-btn');

  // Fetch help data from dummy API
  fetch(apiEndpoint)
    .then(response => response.json())
    .then(data => {
      helpData = data;
      renderHelpCards(helpData);
    })
    .catch(error => {
      console.error('Error fetching help data:', error);
      cardsContainer.innerHTML = '<p>Error loading commands.</p>';
    });

  // Render command cards, with optional search filter
  function renderHelpCards(data, filter = '') {
    // Clear the cards container
    cardsContainer.innerHTML = '';

    // Iterate over each category
    for (let category in data) {
      // Create a section for the category
      const categorySection = document.createElement('div');
      categorySection.classList.add('category-section');

      // Category Header
      const categoryHeader = document.createElement('h2');
      categoryHeader.textContent = category;
      categorySection.appendChild(categoryHeader);

      // Container for command cards within this category
      const cardsWrapper = document.createElement('div');
      cardsWrapper.classList.add('cards-wrapper');
      cardsWrapper.style.display = 'flex';
      cardsWrapper.style.flexWrap = 'wrap';
      cardsWrapper.style.gap = '20px';

      // Iterate over each command in the category
      for (let command in data[category]) {
        // Filter commands if a search term is provided
        if (filter && !command.toLowerCase().includes(filter.toLowerCase())) {
          continue;
        }
        const cmdData = data[category][command];

        // Create a command card
        const card = document.createElement('div');
        card.classList.add('command-card');

        // Command Name
        const cmdName = document.createElement('h3');
        cmdName.classList.add("commandName");
        cmdName.textContent = command;
        card.appendChild(cmdName);

        // Parameters
        const params = document.createElement('p');
        params.classList.add("commandParameters");
        params.innerHTML = `${cmdData.parameters}`;
        card.appendChild(params);

        // Short Info
        const info = document.createElement('p');
        info.innerHTML = `${cmdData.info}`;
        card.appendChild(info);

        // "More Info" button
        const moreBtn = document.createElement('button');
        moreBtn.textContent = 'More Info';
        moreBtn.addEventListener('click', function() {
          displayCommandDetail(category, command, cmdData);
        });
        card.appendChild(moreBtn);

        // Append card to wrapper
        cardsWrapper.appendChild(card);
      }

      // Append category section only if there is at least one card
      if (cardsWrapper.children.length > 0) {
        categorySection.appendChild(cardsWrapper);
        cardsContainer.appendChild(categorySection);
      }
    }
  }

  // Display detailed help for a specific command
  function displayCommandDetail(category, command, cmdData) {
    // Build breadcrumbs text: Category > Command > Details
    breadcrumbsContainer.textContent = `${category} > ${command} > Details`;

    // Build detailed content
    detailContent.innerHTML = `
      <h2>${command}</h2>
      <p class="commandParameters infoPageParams">${cmdData.parameters}</p>
      <p><strong>Info:</strong> ${cmdData.info}</p>
      <div>${cmdData.description}</div>
    `;

    // Hide cards view and show detail view
    cardsContainer.style.display = 'none';
    detailContainer.style.display = 'block';
  }

  // Back button handler: return to cards view
  backBtn.addEventListener('click', function() {
    detailContainer.style.display = 'none';
    cardsContainer.style.display = 'flex';
  });

  // Search functionality: filter command cards by name
  searchInput.addEventListener('input', function(e) {
    const searchTerm = e.target.value.trim();
    renderHelpCards(helpData, searchTerm);
  });
});