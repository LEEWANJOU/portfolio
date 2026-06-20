// Intersection Observer for page scaling effect
document.addEventListener('DOMContentLoaded', () => {
  const pageWrappers = document.querySelectorAll('.page-wrapper');

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.6 // Trigger when 60% of element is visible
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      } else {
        entry.target.classList.remove('active');
      }
    });
  }, observerOptions);

  pageWrappers.forEach(wrapper => {
    observer.observe(wrapper);
  });
});
