document.addEventListener('DOMContentLoaded', function() {
  var hero = document.getElementById('hero');
  var main = document.getElementById('main');
  var heroImage = document.getElementById('heroImage');
  var portfolioBtn = document.getElementById('portfolioBtn');
  var logoBtn = document.getElementById('logoBtn');
  
  var availablePages = [2, 3, 4, 5, 7, 8, 9, 10, 11, 13, 14, 15, 16, 17, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
  
  function showRandomImage() {
    var randomPage = availablePages[Math.floor(Math.random() * availablePages.length)];
    var pageNum = randomPage < 10 ? '0' + randomPage : '' + randomPage;
    heroImage.style.opacity = '0';
    setTimeout(function() {
      heroImage.src = './assets/pages/Page-' + pageNum + '.jpg';
      heroImage.style.opacity = '1';
    }, 800);
  }
  
  showRandomImage();
  
  var imageInterval = setInterval(function() {
    if (!hero.classList.contains('hidden')) {
      showRandomImage();
    }
  }, 3000);
  
  function enterPortfolio() {
    hero.classList.add('hidden');
    main.style.display = 'block';
    document.body.classList.remove('hero-active');
    clearInterval(imageInterval);
  }
  
  portfolioBtn.addEventListener('click', function(e) {
    e.preventDefault();
    enterPortfolio();
  });
  
  var universityLink = document.querySelector('a[href="#page-01"]');
  if (universityLink) {
    universityLink.addEventListener('click', function(e) {
      if (hero.classList.contains('hidden') === false) {
        e.preventDefault();
        enterPortfolio();
        setTimeout(function() {
          document.getElementById('page-01').scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    });
  }
  
  var internshipLink = document.querySelector('a[href="#page-12"]');
  if (internshipLink) {
    internshipLink.addEventListener('click', function(e) {
      if (hero.classList.contains('hidden') === false) {
        e.preventDefault();
        enterPortfolio();
        setTimeout(function() {
          document.getElementById('page-12').scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    });
  }
  
  var workLink = document.querySelector('a[href="#page-18"]');
  if (workLink) {
    workLink.addEventListener('click', function(e) {
      if (hero.classList.contains('hidden') === false) {
        e.preventDefault();
        enterPortfolio();
        setTimeout(function() {
          document.getElementById('page-18').scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    });
  }
  
  var aboutLink = document.querySelector('a[href="#about"]');
  if (aboutLink) {
    aboutLink.addEventListener('click', function(e) {
      if (hero.classList.contains('hidden') === false) {
        e.preventDefault();
        enterPortfolio();
        setTimeout(function() {
          document.getElementById('about').scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    });
  }
  
  logoBtn.addEventListener('click', function() {
    hero.classList.remove('hidden');
    main.style.display = 'none';
    document.body.classList.add('hero-active');
    window.scrollTo(0, 0);
    showRandomImage();
    clearInterval(imageInterval);
    imageInterval = setInterval(function() {
      if (!hero.classList.contains('hidden')) {
        showRandomImage();
      }
    }, 3000);
  });

  var pageWrappers = document.querySelectorAll('.page-wrapper');

  function updateScales() {
    var viewportCenter = window.innerHeight / 2;
    pageWrappers.forEach(function(wrapper) {
      var rect = wrapper.getBoundingClientRect();
      var elementCenter = rect.top + rect.height / 2;
      var distance = Math.abs(viewportCenter - elementCenter);
      var maxDistance = window.innerHeight;
      var scale = Math.max(0.75, 1.05 - (distance / maxDistance) * 0.3);
      var opacity = Math.max(0.75, 1 - (distance / maxDistance) * 0.25);
      var img = wrapper.querySelector('.portfolio-page');
      if (img) {
        img.style.transform = 'scale(' + scale + ')';
        img.style.opacity = opacity;
      }
    });
  }

  window.addEventListener('scroll', updateScales);
  updateScales();

  document.body.classList.add('hero-active');
});
