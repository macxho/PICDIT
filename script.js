const links = [...document.querySelectorAll(".nav-link")];
const sections = links
  .map((link) => document.getElementById(link.dataset.section))
  .filter(Boolean);

const setActive = (id) => {
  links.forEach((link) => {
    link.classList.toggle("active", link.dataset.section === id);
  });
};

const updateActiveFromScroll = () => {
  const marker = window.innerHeight * 0.52;
  let current = sections[0]?.id;

  sections.forEach((section) => {
    const box = section.getBoundingClientRect();
    if (box.top <= marker && box.bottom >= marker) {
      current = section.id;
    }
  });

  if (current) {
    setActive(current);
  }
};

links.forEach((link) => {
  link.addEventListener("click", () => setActive(link.dataset.section));
});

window.addEventListener("scroll", updateActiveFromScroll, { passive: true });
window.addEventListener("resize", updateActiveFromScroll);
updateActiveFromScroll();

document.querySelector(".contact-slip")?.addEventListener("submit", (event) => {
  event.preventDefault();
  const button = event.currentTarget.querySelector("button");
  button.textContent = "Inquiry Ready";
  setTimeout(() => {
    button.textContent = "Send Inquiry";
  }, 1800);
});

const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = new FormData(form);

    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Accept': 'application/json' },
      body: data
    });

    const json = await res.json();

    status.style.display = 'block';
    if (json.success) {
      status.style.color = 'green';
      status.textContent = 'Message sent. I\'ll be in touch soon.';
      form.reset();
    } else {
      status.style.color = 'red';
      status.textContent = 'Something went wrong. Try again.';
    }
  });