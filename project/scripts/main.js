/* ================================
   DATA (Objects + Arrays)
================================ */
const courses = [
    {
        id: "english",
        title: "English",
        description: "Learn English through fun stories, games, and real-life conversations.",
        importance: "English opens doors to global education, careers, and travel opportunities.",
        stories: [
            { name: "Lucas", result: "Improved school grades and confidence." },
            { name: "Emma", result: "Now communicates fluently with international friends." },
            { name: "Noah", result: "Passed his school English exams with excellence." }
        ]
    },
    {
        id: "spanish",
        title: "Spanish",
        description: "Learn Spanish naturally with playful activities and cultural immersion.",
        importance: "Spanish connects children to millions of speakers and diverse cultures worldwide.",
        stories: [
            { name: "Sofia", result: "Now speaks with her grandparents confidently." },
            { name: "Mateo", result: "Improved reading and pronunciation skills." },
            { name: "Isabella", result: "Won a school language competition." }
        ]
    }
];

/* ================================
   UTILITIES
================================ */
const qs = (selector) => document.querySelector(selector);
const qsa = (selector) => document.querySelectorAll(selector);

/* ================================
   LOCAL STORAGE
================================ */
function savePreference(language) {
    localStorage.setItem("preferredLanguage", language);
}

function getPreference() {
    return localStorage.getItem("preferredLanguage");
}

/* ================================
   DOM RENDERING
================================ */
function renderCourses(containerId) {
    const container = qs(containerId);
    if (!container) return;

    const html = courses.map(course => `
    <div class="card" data-lang="${course.id}">
      <h3>${course.title}</h3>
      <p>${course.description}</p>
      <button class="btn select-course" data-lang="${course.id}">Explore</button>
    </div>
  `).join("");

    container.innerHTML = html;
}

function renderSuccessStories(language, containerId) {
    const container = qs(containerId);
    if (!container) return;

    const course = courses.find(c => c.id === language);
    if (!course) return;

    const html = course.stories.map(story => `
    <div class="card">
      <h4>${story.name}</h4>
      <p>${story.result}</p>
    </div>
  `).join("");

    container.innerHTML = html;
}

function renderImportance(language, elementId) {
    const element = qs(elementId);
    if (!element) return;

    const course = courses.find(c => c.id === language);
    if (!course) return;

    element.textContent = course.importance;
}

/* ================================
   EVENT HANDLERS
================================ */
function handleCourseSelection() {
    document.body.addEventListener("click", (event) => {
        const btn = event.target.closest(".select-course");
        if (!btn) return;

        const language = btn.dataset.lang;
        savePreference(language);

        if (language === "english") {
            window.location.href = "english.html";
        } else if (language === "spanish") {
            window.location.href = "spanish.html";
        }
    });
}

function handleContactForm() {
    const form = qs("#contact-form");
    if (!form) return;

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const name = qs("#name").value.trim();
        const email = qs("#email").value.trim();
        const language = qs("#language").value;
        const message = qs("#message").value.trim();

        if (!name || !email || !language) {
            alert("Please complete all required fields.");
            return;
        }

        const submission = {
            name,
            email,
            language,
            message,
            date: new Date().toLocaleString()
        };

        const stored = JSON.parse(localStorage.getItem("submissions")) || [];
        stored.push(submission);
        localStorage.setItem("submissions", JSON.stringify(stored));

        form.reset();
        qs("#form-status").textContent = `Thank you ${name}! We will contact you soon.`;
    });
}

function handleTrialButtons() {
    qsa(".trial-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const preferred = getPreference();
            const message = preferred
                ? `Great choice! We’ll prepare a trial class for ${preferred.toUpperCase()} 🎉`
                : `Great choice! We’ll prepare a trial class for you 🎉`;

            alert(message);
        });
    });
}

/* ================================
   INITIALIZATION
================================ */
function init() {
    renderCourses("#courses-container");
    handleCourseSelection();
    handleContactForm();
    handleTrialButtons();

    const preferred = getPreference();
    if (preferred && qs("#preferred-language")) {
        qs("#preferred-language").textContent = `Your preferred language: ${preferred.toUpperCase()}`;
    }
}

document.addEventListener("DOMContentLoaded", init);
