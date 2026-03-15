// ─── Project data ───────────────────────────────────────────────
// Add/edit your projects here. Each project needs a folder under images/
// with a thumb.jpg and any number of full-size images.
const PROJECTS = {
  project1: {
    title: 'Project Title',
    type: 'Character Design',
    images: [
      'images/project1/full1.jpg',
    ]
  },
  project2: {
    title: 'Environment Study',
    type: 'Environment',
    images: [
      'images/project2/full1.jpg',
    ]
  },
  project3: {
    title: 'Creature Design',
    type: 'Creature',
    images: [
      'images/project3/full1.svg',
    ]
  },
  project4: {
    title: 'Visual Dev',
    type: 'Visual Development',
    images: [
      'images/project4/full1.svg',
    ]
  },
  project5: {
    title: 'Keyframe',
    type: 'Keyframe Art',
    images: [
      'images/project5/full1.svg',
    ]
  },
  project6: {
    title: 'Character Sheet',
    type: 'Character Design',
    images: [
      'images/project6/full1.svg',
    ]
  },
};

// ─── Fade-in on scroll ──────────────────────────────────────────
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger cards slightly
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// ─── Modal ──────────────────────────────────────────────────────
const modal = document.getElementById('modal');
const modalContent = document.getElementById('modal-content');
const modalClose = document.getElementById('modal-close');

function openProject(projectKey) {
  const project = PROJECTS[projectKey];
  if (!project) return;

  modalContent.innerHTML = `
    <div class="modal-header">
      <h2>${project.title}</h2>
      <span>${project.type}</span>
    </div>
    ${project.images.map(src => `<img src="${src}" alt="${project.title}" loading="lazy">`).join('')}
  `;

  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  modal.scrollTop = 0;
}

function closeModal() {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

// Open on card click
document.querySelectorAll('.project').forEach(card => {
  card.addEventListener('click', () => {
    openProject(card.dataset.project);
  });
});

// Close button
modalClose.addEventListener('click', closeModal);

// Close on Escape key
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && modal.classList.contains('open')) closeModal();
});

// Close on backdrop click (outside modal-content)
modal.addEventListener('click', e => {
  if (e.target === modal) closeModal();
});
