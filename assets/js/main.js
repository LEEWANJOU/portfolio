document.addEventListener('DOMContentLoaded', function() {
  var hero = document.getElementById('hero');
  var main = document.getElementById('main');
  var heroImage = document.getElementById('heroImage');

  var allMenu = document.getElementById('allMenu');
  var academicMenu = document.getElementById('academicMenu');
  var internshipMenu = document.getElementById('internshipMenu');
  var workMenu = document.getElementById('workMenu');
  var menus = [allMenu, academicMenu, internshipMenu, workMenu];

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

  function filterPagesRange(minPage, maxPage) {
    for (var i = 0; i < pageWrappers.length; i++) {
      var wrapper = pageWrappers[i];
      var pageNum = parseInt(wrapper.getAttribute('data-page'), 10);
      wrapper.style.display = (pageNum >= minPage && pageNum <= maxPage) ? 'flex' : 'none';
    }
    updateScales();
  }

  function filterPagesList(list) {
    for (var i = 0; i < pageWrappers.length; i++) {
      var wrapper = pageWrappers[i];
      var pageNum = parseInt(wrapper.getAttribute('data-page'), 10);
      wrapper.style.display = (list.indexOf(pageNum) !== -1) ? 'flex' : 'none';
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
    for (var i = 0; i < menus.length; i++) {
      if (menus[i]) menus[i].style.display = 'none';
    }
    if (main) main.style.display = 'none';
    document.body.classList.remove('hero-active');
    if (imageInterval) clearInterval(imageInterval);
  }

  function enterMainRange(minPage, maxPage, scrollTargetId) {
    hideAllScreens();
    main.style.display = 'block';
    filterPagesRange(minPage, maxPage);
    afterEnterMain(scrollTargetId);
  }

  function enterMainList(list, scrollTargetId) {
    hideAllScreens();
    main.style.display = 'block';
    filterPagesList(list);
    afterEnterMain(scrollTargetId);
  }

  function afterEnterMain(scrollTargetId) {
    if (scrollTargetId) {
      setTimeout(function() {
        var el = document.getElementById(scrollTargetId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    } else {
      setTimeout(function() { window.scrollTo(0, 0); }, 50);
    }
  }

  function showMenu(menuEl) {
    hideAllScreens();
    menuEl.style.display = 'flex';
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

  var navItems = ['allBtn', 'academicBtn', 'internshipBtn', 'workBtn', 'aboutBtn'];
  function setActiveNav(activeId) {
    for (var i = 0; i < navItems.length; i++) {
      var el = document.getElementById(navItems[i]);
      if (el) {
        if (navItems[i] === activeId) {
          el.classList.add('active');
        } else {
          el.classList.remove('active');
        }
      }
    }
  }

  // Top nav
  bind('logoBtn', function() { setActiveNav(null); goToHero(); });
  bind('portfolioBtn', function() { setActiveNav(null); showMenu(allMenu); });
  bind('allBtn', function() { setActiveNav('allBtn'); showMenu(allMenu); });
  bind('academicBtn', function() { setActiveNav('academicBtn'); showMenu(academicMenu); });
  bind('internshipBtn', function() { setActiveNav('internshipBtn'); showMenu(internshipMenu); });
  bind('workBtn', function() { setActiveNav('workBtn'); showMenu(workMenu); });
  bind('aboutBtn', function() { setActiveNav('aboutBtn'); enterMainRange(1, 36, 'about'); });

  // All menu tiles
  bind('allTile01', function() { setActiveNav('academicBtn'); enterMainRange(1, 5, null); });
  bind('allTile06', function() { setActiveNav('academicBtn'); enterMainRange(6, 11, null); });
  bind('allTile12', function() { setActiveNav('internshipBtn'); enterMainRange(12, 17, null); });
  bind('allTile18', function() { setActiveNav('workBtn'); enterMainRange(18, 36, null); });

  // Academic menu tiles
  bind('acadTile01', function() { setActiveNav('academicBtn'); enterMainRange(1, 5, null); });
  bind('acadTile06', function() { setActiveNav('academicBtn'); enterMainRange(6, 11, null); });

  // Internship menu tiles
  bind('internTile12', function() { setActiveNav('internshipBtn'); enterMainRange(12, 15, null); });
  bind('internTile32', function() { setActiveNav('internshipBtn'); enterMainRange(16, 17, null); });

  // Work menu tiles
  bind('workTile20', function() { setActiveNav('workBtn'); enterMainRange(19, 23, null); });
  bind('workTile24', function() { setActiveNav('workBtn'); enterMainRange(24, 25, null); });
  bind('workTile26', function() { setActiveNav('workBtn'); enterMainList([26, 35, 36], null); });
  bind('workTile37', function() { setActiveNav('workBtn'); enterMainRange(27, 27, null); });
  bind('workTile33', function() { setActiveNav('workBtn'); enterMainRange(28, 29, null); });
  bind('workTile34', function() { setActiveNav('workBtn'); enterMainRange(30, 31, null); });

  if (hero && heroImage) {
    document.body.classList.add('hero-active');
    startRotation();
  }

  document.addEventListener('contextmenu', function(e) { e.preventDefault(); });
  document.addEventListener('copy', function(e) { e.preventDefault(); });
  document.addEventListener('cut', function(e) { e.preventDefault(); });
  document.addEventListener('dragstart', function(e) { e.preventDefault(); });
});
