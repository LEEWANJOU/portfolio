document.addEventListener('DOMContentLoaded', function() {
  var hero = document.getElementById('hero');
  var portfolioMenu = document.getElementById('portfolioMenu');
  var main = document.getElementById('main');
  var heroImage = document.getElementById('heroImage');

  var availablePages = [3,4,5,7,9,11,16,17,19,20,21,22,23,24,25,26,27,28,29,30,31];
  var shuffledPages = [];
  var imageInterval = null;

  function shuffleArray(arr) {
    var array = arr.slice();
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }

  function getNextPage() {
    if (shuffledPages.length === 0) {
      shuffledPages = shuffleArray(availablePages);
    }
    return shuffledPages.pop();
  }

  function showRandomImage() {
    if (!heroImage) return;
    var nextPage = getNextPage();
    var pageNum = nextPage < 10 ? '0' + nextPage : '' + nextPage;
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

  var pageWrappers = document.querySelectorAll('.page-wrapper');

  function filterPages(minPage, maxPage) {
    for (var i = 0; i < pageWrappers.length; i++) {
      var wrapper = pageWrappers[i];
      var pageNum = parseInt(wrapper.getAttribute('data-page'), 10);
      if (pageNum >= minPage && pageNum <= maxPage) {
        wrapper.style.display = 'flex';
      } else {
        wrapper.style.display = 'none';
      }
    }
    updateScales();
  }

  function updateScales() {
    var viewportCenter = window.innerHeight / 2;
    for (var i = 0; i < pageWrappers.length; i++) {
      var wrapper = pageWrappers[i];
      if (wrapper.style.display === 'none') continue;
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

  function hideAllScreens() {
    if (hero) hero.classList.add('hidden');
    if (portfolioMenu) portfolioMenu.style.display = 'none';
    if (main) main.style.display = 'none';
    document.body.classList.remove('hero-active');
    if (imageInterval) clearInterval(imageInterval);
  }

  function enterMain(minPage, maxPage, scrollTargetId) {
    hideAllScreens();
    main.style.display = 'block';
    filterPages(minPage, maxPage);
    if (scrollTargetId) {
      setTimeout(function() {
        var el = document.getElementById(scrollTargetId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    } else {
      setTimeout(function() { window.scrollTo(0, 0); }, 50);
    }
  }

  function showPortfolioMenu() {
    hideAllScreens();
    portfolioMenu.style.display = 'flex';
    window.scrollTo(0, 0);
  }

  function goToHero() {
    hideAllScreens();
    hero.classList.remove('hidden');
    document.body.classList.add('hero-active');
    window.scrollTo(0, 0);
    startRotation();
  }

  function bind(id, handler) {
    var el = document.getElementById(id);
    if (el) el.addEventListener('click', handler);
  }

  bind('logoBtn', goToHero);
  bind('portfolioBtn', showPortfolioMenu);
  bind('allBtn', function() { enterMain(1, 31, null); });
  bind('academicBtn', function() { enterMain(1, 11, null); });
  bind('internshipBtn', function() { enterMain(12, 17, null); });
  bind('workBtn', function() { enterMain(18, 31, null); });
  bind('aboutBtn', function() { enterMain(1, 31, 'about'); });

  bind('menuPage01', function() { enterMain(1, 5, null); });
  bind('menuPage06', function() { enterMain(6, 11, null); });
  bind('menuPage12', function() { enterMain(12, 17, null); });
  bind('menuPage18', function() { enterMain(18, 31, null); });

  if (hero && heroImage) {
    document.body.classList.add('hero-active');
    startRotation();
  }

  document.addEventListener('contextmenu', function(e) { e.preventDefault(); });
  document.addEventListener('copy', function(e) { e.preventDefault(); });
  document.addEventListener('cut', function(e) { e.preventDefault(); });
  document.addEventListener('dragstart', function(e) { e.preventDefault(); });
});
