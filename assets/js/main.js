document.addEventListener('DOMContentLoaded', () => {
  const pageWrappers = document.querySelectorAll('.page-wrapper');

  const updateScales = () => {
    const viewportCenter = window.innerHeight / 2;

    pageWrappers.forEach(wrapper => {
      const rect = wrapper.getBoundingClientRect();
      const elementCenter = rect.top + rect.height / 2;
      const distance = Math.abs(viewportCenter - elementCenter);
      const maxDistance = window.innerHeight;
      
      const scale = Math.max(0.6, 1.3 - (distance / maxDistance) * 0.7);
      const opacity = Math.max(0.7, 1 - (distance / maxDistance) * 0.3);
      
      const img = wrapper.querySelector('.portfolio-page');
      if (img) {
        img.style.transform = `scale(${scale})`;
        img.style.opacity = opacity;
      }
    });
  };

  window.addEventListener('scroll', updateScales, { passive: true });
  updateScales();
});
