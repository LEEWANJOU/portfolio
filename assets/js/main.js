document.addEventListener('DOMContentLoaded', function() {
  var hero = document.getElementById('hero');
  var main = document.getElementById('main');
  var heroImage = document.getElementById('heroImage');

  var availablePages = [3,4,5,7,9,11,14,16,17,20,21,22,23,24,25,26,27,28,29,30,31];
  var imageInterval = null;

  function showRandomImage() {
    if (!heroImage) return;
    var randomPage = availablePages[Math.floor(Math.random() * availablePages.length)];
    var pageNum = randomPage < 10 ? '0' + randomPage : '' + randomPage;
    heroImage.style.opacity = '0';
    setTimeout(function() {
      heroImage.src = './assets/pages/Page-' + pageNum + '.jpg';
      heroImage.style.opacity = '1';
    }, 600);
  }

  function startRotation() {
    showRandomImage();
    if (imageInterval) clearInterval(imageInterval);
    imageInterval = setInterval(showRandomImage, 3000);
  }

  if (hero && heroImage) {
    document.body.classList.add('hero-active');
    startRotation();
  }

  function goToPortfolio(targetId) {
    if (hero) hero.classList.add('hidden');
    if (main) main.style.display = 'block';
    document.body.classList.remove('hero-active');
    if (imageInterval) clearInterval(imageInterval);
    if (targetId) {
      setTimeout(function() {
        var el = document.getElementById(targetId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    }
  }

  function goToHero() {
    if (hero) hero.classList.remove('hidden');
    if (main) main.style.display = 'none';
    document.body.classList.add('hero-active');
    window.scrollTo(0, 0);
    startRotation();
  }

  function bind(id, handler) {
    var el = document.getElementById(id);
    if (el) el.addEventListener('click', handler);
  }

  bind('logoBtn', goToHero);
  bind('portfolioBtn', function() { goToPortfolio(null); });
  bind('universityBtn', function() { goToPortfolio('page-01'); });
  bind('internshipBtn', function() { goToPortfolio('page-12'); });
  bind('workBtn', function() { goToPortfolio('page-18'); });
  bind('aboutBtn', function() { goToPortfolio('about'); });

  var pageWrappers = document.querySelectorAll('.page-wrapper');
  function updateScales() {
    var viewportCenter = window.innerHeight / 2;
    for (var i = 0; i < pageWrappers.length; i++) {
      var wrapper = pageWrappers[i];
      var rect = wrapper.getBoundingClientRect();
      var elementCenter = rect.top + rect.height / 2;
      var distance = Math.abs(viewportCenter - elementCenter);
      var maxDistance = window.innerHeight;
      var scale = Math.max(0.6, Math.min(1.0, 1.1 - (distance / maxDistance) * 0.5));
      var opacity = Math.max(0.5, 1 - (distance / maxDistance) * 0.5);
      var img = wrapper.querySelector('.portfolio-page');
      if (img) {
        img.style.transform = 'scale(' + scale + ')';
        img.style.opacity = opacity;
      }
    }
  }
  window.addEventListener('scroll', updateScales);
  updateScales();
});
