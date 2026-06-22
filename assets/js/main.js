document.addEventListener('DOMContentLoaded', function() {
  var hero = document.getElementById('hero');
  var main = document.getElementById('main');
  var heroImage = document.getElementById('heroImage');
  var aboutScreen = document.getElementById('aboutScreen');

  var allMenu = document.getElementById('allMenu');
  var academicMenu = document.getElementById('academicMenu');
  var internshipMenu = document.getElementById('internshipMenu');
  var workMenu = document.getElementById('workMenu');
  var menus = [allMenu, academicMenu, internshipMenu, workMenu];

  var introIds = ['introAcad01','introAcad06','introIntern38','introIntern32','introWork20','introWork24','introWork26','introWork37','introWork33','introWork34'];

  var availablePages = [3,4,5,7,9,11,16,17,19,20,21,22,23,24,25,26,27,28,29,30,31];
  var imageInterval = null;
  var recentPages = [];
  var historySize = 6;

  function pickPage() {
    var candidates = availablePages.filter(function(p) {
      return recentPages.indexOf(p) === -1;
    });
    if (candidates.length === 0) candidates = availablePages.slice();
    var page = candidates[Math.floor(Math.random() * candidates.length)];
    recentPages.push(page);
    if (recentPages.length > historySize) recentPages.shift();
    return page;
  }
  function showRandomImage() {
    if (!heroImage) return;
    var nextPage = pickPage();
    var pageNum = nextPage < 10 ? '0' + nextPage : '' + nextPage;
    heroImage.style.opacity = '0';
    setTimeout(function() {
      heroImage.src = './assets/pages/Page-' + pageNum + '.jpeg';
      heroImage.style.opacity = '1';
    }, 600);
  }
  function startRotation() {
    if (imageInterval) clearInterval(imageInterval);
    showRandomImage();
    imageInterval = setInterval(showRandomImage, 3000);
  }

  var pageWrappers = document.querySelectorAll('.page-wrapper');
  var pagesContainer = document.getElementById('pagesContainer');

  function getWrapperByPage(p) {
    for (var i = 0; i < pageWrappers.length; i++) {
      if (parseInt(pageWrappers[i].getAttribute('data-page'), 10) === p) return pageWrappers[i];
    }
    return null;
  }
  function reorderPages(orderedPages) {
    for (var i = 0; i < orderedPages.length; i++) {
      var w = getWrapperByPage(orderedPages[i]);
      if (w) pagesContainer.appendChild(w);
    }
  }

  function filterPagesRange(minPage, maxPage) {
    var ordered = [];
    for (var p = minPage; p <= maxPage; p++) {
      if (getWrapperByPage(p)) ordered.push(p);
    }
    reorderPages(ordered);
    for (var i = 0; i < pageWrappers.length; i++) {
      var w = pageWrappers[i];
      var pg = parseInt(w.getAttribute('data-page'), 10);
      w.style.display = (pg >= minPage && pg <= maxPage) ? 'flex' : 'none';
    }
    updateScales();
  }
  function filterPagesList(list) {
    reorderPages(list);
    for (var i = 0; i < pageWrappers.length; i++) {
      var w = pageWrappers[i];
      var p = parseInt(w.getAttribute('data-page'), 10);
      w.style.display = (list.indexOf(p) !== -1) ? 'flex' : 'none';
    }
    updateScales();
  }
  function showIntroPanel(activeId) {
    for (var i = 0; i < introIds.length; i++) {
      var el = document.getElementById(introIds[i]);
      if (el) el.style.display = (introIds[i] === activeId) ? 'flex' : 'none';
    }
    updateScales();
  }
  function updateScales() {
    var vc = window.innerHeight / 2;
    for (var i = 0; i < pageWrappers.length; i++) {
      var w = pageWrappers[i];
      if (w.style.display === 'none') continue;
      var r = w.getBoundingClientRect();
      var ec = r.top + r.height / 2;
      var d = Math.abs(vc - ec);
      var md = window.innerHeight;
      var scale = Math.max(0.6, Math.min(1.0, 1.1 - (d / md) * 0.5));
      var opacity = Math.max(0.5, 1 - (d / md) * 0.5);
      var img = w.querySelector('.portfolio-page');
      if (img) { img.style.transform = 'scale(' + scale + ')'; img.style.opacity = opacity; }
    }
  }
  window.addEventListener('scroll', updateScales);

  function hideAllScreens() {
    if (hero) hero.classList.add('hidden');
    for (var i = 0; i < menus.length; i++) { if (menus[i]) menus[i].style.display = 'none'; }
    if (main) main.style.display = 'none';
    if (aboutScreen) aboutScreen.style.display = 'none';
    document.body.classList.remove('hero-active');
    if (imageInterval) clearInterval(imageInterval);
  }
  function enterMainRange(minPage, maxPage, scrollTargetId, introId) {
    hideAllScreens();
    main.style.display = 'block';
    showIntroPanel(introId || null);
    filterPagesRange(minPage, maxPage);
    afterEnterMain(scrollTargetId);
  }
  function enterMainList(list, scrollTargetId, introId) {
    hideAllScreens();
    main.style.display = 'block';
    showIntroPanel(introId || null);
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
  function showAboutScreen() {
    hideAllScreens();
    aboutScreen.style.display = 'flex';
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

  var navItems = ['allBtn','academicBtn','internshipBtn','workBtn','aboutBtn'];
  function setActiveNav(activeId) {
    for (var i = 0; i < navItems.length; i++) {
      var el = document.getElementById(navItems[i]);
      if (el) { if (navItems[i] === activeId) el.classList.add('active'); else el.classList.remove('active'); }
    }
  }

  bind('logoBtn', function() { setActiveNav(null); goToHero(); });
  bind('portfolioBtn', function() { setActiveNav(null); showMenu(allMenu); });
  bind('allBtn', function() { setActiveNav('allBtn'); showMenu(allMenu); });
  bind('academicBtn', function() { setActiveNav('academicBtn'); showMenu(academicMenu); });
  bind('internshipBtn', function() { setActiveNav('internshipBtn'); showMenu(internshipMenu); });
  bind('workBtn', function() { setActiveNav('workBtn'); showMenu(workMenu); });
  bind('aboutBtn', function() { setActiveNav('aboutBtn'); showAboutScreen(); });

  bind('allTile01', function() { setActiveNav('academicBtn'); enterMainRange(2, 5, null, 'introAcad01'); });
  bind('allTile06', function() { setActiveNav('academicBtn'); enterMainRange(7, 11, null, 'introAcad06'); });
  bind('allTile12', function() { setActiveNav('internshipBtn'); enterMainRange(12, 17, null, null); });
  bind('allTile18', function() { setActiveNav('workBtn'); enterMainRange(18, 39, null, null); });

  bind('acadTile01', function() { setActiveNav('academicBtn'); enterMainRange(2, 5, null, 'introAcad01'); });
  bind('acadTile06', function() { setActiveNav('academicBtn'); enterMainRange(7, 11, null, 'introAcad06'); });

  bind('internTile38', function() { setActiveNav('internshipBtn'); enterMainList([38,14,39,15], null, 'introIntern38'); });
  bind('internTile32', function() { setActiveNav('internshipBtn'); enterMainRange(16, 17, null, 'introIntern32'); });

  bind('workTile20', function() { setActiveNav('workBtn'); enterMainRange(19, 23, null, 'introWork20'); });
  bind('workTile24', function() { setActiveNav('workBtn'); enterMainRange(24, 25, null, 'introWork24'); });
  bind('workTile26', function() { setActiveNav('workBtn'); enterMainList([26,35,36], null, 'introWork26'); });
  bind('workTile37', function() { setActiveNav('workBtn'); enterMainRange(27, 27, null, 'introWork37'); });
  bind('workTile33', function() { setActiveNav('workBtn'); enterMainRange(28, 29, null, 'introWork33'); });
  bind('workTile34', function() { setActiveNav('workBtn'); enterMainRange(30, 31, null, 'introWork34'); });

  if (hero && heroImage) {
    document.body.classList.add('hero-active');
    startRotation();
  }

  document.addEventListener('contextmenu', function(e) { e.preventDefault(); });
  document.addEventListener('copy', function(e) { e.preventDefault(); });
  document.addEventListener('cut', function(e) { e.preventDefault(); });
  document.addEventListener('dragstart', function(e) { e.preventDefault(); });
});
