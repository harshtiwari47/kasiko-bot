/**
 * This script toggles the mobile navigation menu by adding or removing
 * the "active" class on the sidebar when the menu button is clicked.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Select the mobile menu toggle button and the sidebar element
  const menuToggle = document.querySelector('.menu-toggle');
  const sidebar = document.querySelector('.sidebar');

  // Ensure both elements exist before proceeding
  if (menuToggle && sidebar) {
    menuToggle.addEventListener('click', () => {
      // Toggle the "active" class on the sidebar element
      sidebar.classList.toggle('active');
    });
  }
});

/**
 * This script highlights the active navigation link in the sidebar based on the current page URL.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Get the current page's filename from the URL (e.g., "index.html", "help.html")
  let currentPage = window.location.pathname.split("/").pop();

  // If no filename is found (e.g., when accessing the root), assume "index.html"
  if (!currentPage) {
    currentPage = "index.html";
  }

  // Select all navigation links from the sidebar
  const navLinks = document.querySelectorAll('.side-nav a');

  // Loop through each link and add the "active" class if it matches the current page
  navLinks.forEach(link => {
    const linkPage = link.getAttribute('href');

    if (linkPage === currentPage) {
      link.classList.add('active');
    }
  });
});