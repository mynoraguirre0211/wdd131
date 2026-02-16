/* DATA (Objects + Arrays) */

const courses = [
    {
        id: "english",
        title: "English",
        description: "Discover a fun and natural way to learn English with engaging online classes! ✨ ",
        importance: "Starting English between ages 1 and 4 gives children a natural advantage, since young minds learn languages quickly through play, songs, and daily interaction. For Guatemalan parents, early English learning opens the door to better education, future career opportunities, and greater confidence in a global world. Our affordable online classes are specially designed for little learners, using fun, age- appropriate techniques that help children enjoy the process while building strong English skills from the very beginning.",
        stories: [
            { name: "Lucas", result: "Improved school grades and confidence." },
        ]
    },
    {
        id: "spanish",
        title: "Spanish",
        description: "Discover a fun and natural way to learn Spanish with personalized, engaging online classes! ✨",
        importance: "Spanish is one of the most widely spoken languages in the world, giving children the opportunity to connect with millions of people and cultures. For parents, helping their children learn Spanish as a second language is an investment in their future, as bilingual kids often develop stronger communication skills, better academic performance, and greater confidence. Through personalized and engaging classes, children can learn Spanish in a natural and fun way, building real- life speaking skills that will support them in school, travel, and future career opportunities.",
        stories: [
            { name: "Sofia", result: "Now speaks with her grandparents confidently." },
        ]
    }
];

/* UTILITIES */

const qs = (selector) => document.querySelector(selector);
const qsa = (selector) => document.querySelectorAll(selector);

/* LOCAL STORAGE */
function savePreference(language) {
    localStorage.setItem("preferredLanguage", language);
}

function getPreference() {
    return localStorage.getItem("preferredLanguage");
}

/* DOM RENDERING */
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

/* EVENT HANDLERS */
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

/* INITIALIZATION */

function init() {

    renderCourses("#courses-container");

    handleCourseSelection();
    handleContactForm();
    handleTrialButtons();
    showAudienceMessage();

    const preferred = getPreference();
    if (preferred && qs("#preferred-language")) {
        qs("#preferred-language").textContent =
            `Your preferred language: ${preferred.toUpperCase()}`;
    }

    const importanceEl = qs("#importance-text");
    const storiesEl = qs("#stories-container");

    if (importanceEl && storiesEl) {

        let language = "";

        if (window.location.pathname.includes("english")) {
            language = "english";
        }

        if (window.location.pathname.includes("spanish")) {
            language = "spanish";
        }

        if (language) {
            renderImportance(language, "#importance-text");
            renderSuccessStories(language, "#stories-container");
        }
    }
}

document.addEventListener("DOMContentLoaded", init);

function showAudienceMessage() {
    const banner = qs("#audience-message");
    if (!banner) return;

    const preferred = getPreference();

    let message = "";

    if (preferred === "spanish") {
        message = "Perfect for parents who want their kids to speak Spanish naturally";
    } else if (preferred === "english") {
        message = "Ideal for those parents who want their kids to learn English early 🇬🇹";
    } else {
        message = "Start your child’s bilingual journey today!";
    }

    banner.textContent = message;
}

