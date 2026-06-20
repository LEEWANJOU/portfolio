document.addEventListener('DOMContentLoaded', function() {
  var hero = document.getElementById('hero');
  var main = document.getElementById('main');
  var heroImage = document.getElementById('heroImage');
  var portfolioBtn = document.getElementById('portfolioBtn');
  
  // Hero Section - Random Image + 5 Second Auto Switch
  var availablePages = [2, 3, 4, 5, 7, 8, 9, 10, 11, 13, 14, 15, 16, 17, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
  var randomPage = availablePages[Math.floor(Math.random() * availablePages.length)];
  var pageNum = randomPage < 10 ? '0' + randomPage : '' + randomPage;
  
  heroImage.src = './assets/pages/Page-' + pageNum + '.jpg';
  
  // Auto switch after 5 seconds
  setTimeout(function() {
    hero.classList.add('hidden');
    main.style.display = 'block';
    document.body.classList.remove('hero-active');
  }, 5000);
  
  // Click Portfolio button to switch
  portfolioBtn.addEventListener('click', function(e) {
    e.preventDefault();
    hero.classList.add('hidden');
    main.style.display = 'block';
    document.body.classList.remove('hero-active');
  });

  // Portfolio Scroll Effect - Scale Based on Distance from Viewport Center
  var pageWrappers = document.querySelectorAll('.page-wrapper');

  function updateScales() {
    var viewportCenter = window.innerHeight / 2;
    pageWrappers.forEach(function(wrapper) {
      var rect = wrapper.getBoundingClientRect();
      var elementCenter = rect.top + rect.height / 2;
      var distance = Math.abs(viewportCenter - elementCenter);
      var maxDistance = window.innerHeight;
      
      var scale = Math.max(0.5, 1.3 - (distance / maxDistance) * 0.8);
      var opacity = Math.max(0.6, 1 - (distance / maxDistance) * 0.4);
      
      var img = wrapper.querySelector('.portfolio-page');
      if (img) {
        img.style.transform = 'scale(' + scale + ')';
        img.style.opacity = opacity;
      }
    });
  }

  window.addEventListener('scroll', updateScales);
  updateScales();

  // Set hero active
  document.body.classList.add('hero-active');
});
