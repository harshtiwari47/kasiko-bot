document.addEventListener('DOMContentLoaded', function() {
  const apiEndpoint = 'assets/json/items.json';
  const itemsContainer = document.getElementById('items-container');

  // Selected item details panel elements
  const sItemImg = document.getElementById('s-item-img');
  const sItemName = document.getElementById('s-item-name');
  const sItemDescription = document.getElementById('s-item-description');
  const sItemAccessing = document.getElementById('s-item-accessing');
  const sItemType = document.getElementById('s-item-type');
  const sItemPurchaseable = document.getElementById('s-item-purchaseable');
  const sItemCost = document.getElementById('s-item-cost');
  const sItemSellable = document.getElementById('s-item-sellable');
  const sItemInterest = document.getElementById('s-item-interest');
  const sItemShareable = document.getElementById('s-item-shareable');
  const sItemExclusive = document.getElementById('s-item-exclusive');

  fetch(apiEndpoint)
  .then(response => response.json())
  .then(data => {
    const items = data.items;
    if (!items || items.length === 0) {
      itemsContainer.innerHTML = '<p>No items available at this time.</p>';
      return;
    }
    itemsContainer.innerHTML = ''; // clear initial text

    const cardElements = [];

    items.forEach(item => {
      // Create item card element
      const card = document.createElement('div');
      card.classList.add('item-card');

      // Create and add image to card
      const img = document.createElement('img');
      img.src = item.img;
      img.alt = item.name;
      img.width = "100%";
      card.appendChild(img);

      // Create and add item name to card
      const name = document.createElement('h3');
      name.textContent = item.name;
      card.appendChild(name);

      // On card click, update the selected item details panel
      card.addEventListener('click', function() {

        document.querySelector('.item-details-selected').scrollIntoView({
          behavior: 'smooth'
        });

        sItemImg.src = item.img;
        sItemImg.alt = item.name;
        sItemName.textContent = item.name;
        // Use howToUse as the item description (adjust if necessary)
        sItemDescription.textContent = item.howToUse;
        sItemAccessing.textContent = item.howToAccess;
        sItemType.textContent = item.itemType;
        sItemPurchaseable.textContent = item.isPurchaseable ? 'Yes': 'No';
        sItemCost.textContent = (item.isPurchaseable && item.cost) ? item.cost: 'N/A';
        sItemSellable.textContent = item.isSellable ? 'Yes': 'No';
        sItemInterest.textContent = item.interest || 'N/A';
        sItemShareable.textContent = item.isSharable ? 'Yes': 'No';
        sItemExclusive.textContent = item.isExclusive ? 'Yes': 'No';
      });

      // Append the card to the items container
      itemsContainer.appendChild(card);
      cardElements.push(card);
    });

    if (cardElements.length > 0) {
      cardElements[0].click();
    }
  })
  .catch(error => {
    console.error('Error fetching items data:',
      error);
    itemsContainer.innerHTML = '<p>Error loading items data.</p>';
  });
});