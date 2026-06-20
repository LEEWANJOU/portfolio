document.addEventListener('DOMContentLoaded', function() {
  var hero = document.getElementById('hero');
  var main = document.getElementById('main');
  var heroImage = document.getElementById('heroImage');
  var logoBtn = document.getElementById('logoBtn');
  var portfolioBtn = document.getElementById('portfolioBtn');
  var universityBtn = document.getElementById('universityBtn');
  var internshipBtn = document.getElementById('internshipBtn');
  var workBtn = document.getElementById('workBtn');
  var aboutBtn = document.getElementById('aboutBtn');

  var availablePages = [2,3,4,5,7,8,9,10,11,13,14,15,16,17,19,20,21,22,23,24,25,26,27,28,29,30,31];
  var imageInterval = null;

  function showRandomImage() {
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

  function goToPortfolio(targetId) {
    hero.classList.add('hidden');
    main.style.display = 'block';
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
    hero.classList.remove('hidden');
    main.style.display = 'none';
    document.body.classList.add('hero-active');
    window.scrollTo(0, 0);
    startRotation();
  }

  logoBtn.addEventListener('click', goToHero);
  portfolioBtn.addEventListener('click', function() { goToPortfolio(null); });
  universityBtn.addEventListener('click', function() { goToPortfolio('page-01'); });
  internshipBtn.addEventListener('click', function() { goToPortfolio('page-12'); });
  workBtn.addEventListener('click', function() { goToPortfolio('page-18'); });
  aboutBtn.addEventListener('click', function() { goToPortfolio('about'); });

  var pageWrappers = document.querySelectorAll('.page-wrapper');
  function updateScales() {
    var viewportCenter = window.innerHeight / 2;
    for (var i = 0; i < pageWrappers.length; i++) {
      var wrapper = pageWrappers[i];
      var rect = wrapper.getBoundingClientRect();
      var elementCenter = rect.top + rect.height / 2;
      var distance = Math.abs(viewportCenter - elementCenter);
      var maxDistance = window.innerHeight;
      var scale = Math.max(0.75, Math.min(1.0, 1.0 - (distance / maxDistance) * 0.25));
      var opacity = Math.max(0.75, 1 - (distance / maxDistance) * 0.25);
      var img = wrapper.querySelector('.portfolio-page');
      if (img) {
        img.style.transform = 'scale(' + scale + ')';
        img.style.opacity = opacity;
      }
    }
  }
  window.addEventListener('scroll', updateScales);
  updateScales();

  document.body.classList.add('hero-active');
  startRotation();
});
