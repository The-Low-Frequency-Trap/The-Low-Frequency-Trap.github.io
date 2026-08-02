document.addEventListener('DOMContentLoaded', () => {
  // Sticky Navigation Highlight on Scroll
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  function highlightNav() {
    let scrollY = window.pageYOffset;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + sectionId) {
            link.classList.add('active');
          }
        });
      }
    });
  }
  window.addEventListener('scroll', highlightNav);

  // Copy BibTeX functionality
  const copyBtn = document.getElementById('copy-bibtex-btn');
  const bibtexText = document.getElementById('bibtex-code');

  if (copyBtn && bibtexText) {
    copyBtn.addEventListener('click', () => {
      const textToCopy = bibtexText.innerText;
      navigator.clipboard.writeText(textToCopy).then(() => {
        const originalText = copyBtn.innerText;
        copyBtn.innerText = 'Copied! ✓';
        copyBtn.style.background = '#16a34a';
        copyBtn.style.borderColor = '#16a34a';
        
        setTimeout(() => {
          copyBtn.innerText = originalText;
          copyBtn.style.background = '';
          copyBtn.style.borderColor = '';
        }, 2000);
      }).catch(err => {
        console.error('Failed to copy text: ', err);
      });
    });
  }

  // Taxonomy Category Tab Switching
  const tabBtns = document.querySelectorAll('.tab-btn');
  const taxonomyPanels = document.querySelectorAll('.taxonomy-panel');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');

      tabBtns.forEach(b => b.classList.remove('active'));
      taxonomyPanels.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const activePanel = document.getElementById('panel-' + targetTab);
      if (activePanel) {
        activePanel.classList.add('active');
      }
    });
  });

  // Lightbox Modal Zoom for Qualitative Examples
  const modal = document.getElementById('image-modal');
  const modalImg = document.getElementById('modal-img');
  const modalClose = document.querySelector('.modal-close');
  const expandableImgs = document.querySelectorAll('.expandable-img');

  expandableImgs.forEach(img => {
    img.addEventListener('click', () => {
      if (modal && modalImg) {
        modalImg.src = img.src;
        modalImg.alt = img.alt;
        modal.classList.add('open');
      }
    });
  });

  if (modalClose && modal) {
    modalClose.addEventListener('click', () => {
      modal.classList.remove('open');
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('open');
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('open')) {
        modal.classList.remove('open');
      }
    });
  }
});
