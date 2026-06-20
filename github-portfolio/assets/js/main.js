// Portfolio Page Manager
class PortfolioViewer {
  constructor() {
    this.totalPages = 27;
    this.currentPage = 1;
    this.container = document.getElementById('pages-container');
    this.pageIndicator = document.getElementById('page-indicator');
    this.prevBtn = document.getElementById('prev-btn');
    this.nextBtn = document.getElementById('next-btn');

    this.init();
  }

  init() {
    this.attachEventListeners();
    this.loadPage(this.currentPage);
    this.updateControls();
  }

  attachEventListeners() {
    this.prevBtn.addEventListener('click', () => this.previousPage());
    this.nextBtn.addEventListener('click', () => this.nextPage());

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') this.previousPage();
      if (e.key === 'ArrowRight') this.nextPage();
    });
  }

  loadPage(pageNumber) {
    const pageNum = String(pageNumber).padStart(2, '0');
    const imagePath = `./assets/pages/page-${pageNum}.jpg`;

    // Clear container
    this.container.innerHTML = '';

    // Create image element
    const img = document.createElement('img');
    img.src = imagePath;
    img.alt = `Portfolio page ${pageNumber}`;
    img.loading = 'eager'; // Load current page immediately

    img.addEventListener('error', () => {
      this.container.innerHTML = `<p style="padding: 20px; text-align: center; color: #999;">無法載入第 ${pageNumber} 頁</p>`;
    });

    this.container.appendChild(img);

    // Update page indicator
    this.pageIndicator.textContent = `第 ${pageNumber} 頁 / ${this.totalPages}`;

    // Scroll to container
    this.container.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadPage(this.currentPage);
      this.updateControls();
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadPage(this.currentPage);
      this.updateControls();
    }
  }

  updateControls() {
    this.prevBtn.disabled = this.currentPage === 1;
    this.nextBtn.disabled = this.currentPage === this.totalPages;
  }
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  new PortfolioViewer();
});
