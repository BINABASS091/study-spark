function byId(id) {
  return document.getElementById(id);
}

function formatDate(dateValue) {
  const date = new Date(dateValue);
  return date.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
}

function getPosts() {
  return Array.isArray(window.BLOG_POSTS) ? [...window.BLOG_POSTS] : [];
}

function cardTemplate(post) {
  return `
    <article class="card">
      <img src="${post.image}" alt="${post.subject} illustration" loading="lazy">
      <div class="card-content">
        <h3><a href="post.html?id=${post.id}">${post.title}</a></h3>
        <p class="meta">${post.subject} · Grade ${post.gradeBand} · ${post.readTime}</p>
        <p>${post.excerpt}</p>
      </div>
    </article>
  `;
}

function listItemTemplate(post) {
  return `
    <article class="list-item">
      <a href="post.html?id=${post.id}">${post.title}</a>
      <p class="meta">${formatDate(post.date)} · ${post.subject}</p>
    </article>
  `;
}

function renderHome() {
  const posts = getPosts();
  const featuredGrid = byId("featuredGrid");
  const allPostsGrid = byId("allPostsGrid");
  const latestList = byId("latestList");
  const popularList = byId("popularList");
  const subjectFilter = byId("subjectFilter");
  const gradeFilter = byId("gradeFilter");
  const searchInput = byId("searchInput");
  const subjectChips = byId("subjectChips");

  const subjects = [...new Set(posts.map((post) => post.subject))];
  subjects.forEach((subject) => {
    const option = document.createElement("option");
    option.value = subject;
    option.textContent = subject;
    subjectFilter.appendChild(option);

    const chip = document.createElement("button");
    chip.className = "chip";
    chip.type = "button";
    chip.textContent = subject;
    chip.addEventListener("click", () => {
      subjectFilter.value = subject;
      applyFilters();
    });
    subjectChips.appendChild(chip);
  });

  const latestPosts = [...posts].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 3);
  latestList.innerHTML = latestPosts.map(listItemTemplate).join("");

  const popularPosts = [...posts].sort((a, b) => b.popularity - a.popularity).slice(0, 3);
  popularList.innerHTML = popularPosts.map(listItemTemplate).join("");

  function applyFilters() {
    const keyword = searchInput.value.trim().toLowerCase();
    const subject = subjectFilter.value;
    const grade = gradeFilter.value;

    const filtered = posts.filter((post) => {
      const subjectMatch = subject === "all" || post.subject === subject;
      const gradeMatch = grade === "all" || post.gradeBand === grade;
      const textMatch = !keyword || `${post.title} ${post.excerpt} ${post.subject}`.toLowerCase().includes(keyword);
      return subjectMatch && gradeMatch && textMatch;
    });

    const featured = filtered.filter((post) => post.featured);
    featuredGrid.innerHTML = featured.length ? featured.map(cardTemplate).join("") : "<p>No featured posts found.</p>";
    allPostsGrid.innerHTML = filtered.length ? filtered.map(cardTemplate).join("") : "<p>No posts match your search.</p>";
  }

  searchInput.addEventListener("input", applyFilters);
  subjectFilter.addEventListener("change", applyFilters);
  gradeFilter.addEventListener("change", applyFilters);
  applyFilters();

  const newsletterForm = byId("newsletterForm");
  const newsletterMessage = byId("newsletterMessage");
  newsletterForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const email = byId("newsletterEmail").value.trim();
    localStorage.setItem("studyspark_newsletter", email);
    newsletterMessage.textContent = "Subscribed successfully. You will receive new assignment updates.";
    newsletterForm.reset();
  });

  const feedbackForm = byId("feedbackForm");
  const feedbackMessage = byId("feedbackMessage");
  feedbackForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = byId("teacherName").value.trim();
    const message = byId("teacherMessage").value.trim();
    const allFeedback = JSON.parse(localStorage.getItem("studyspark_feedback") || "[]");
    allFeedback.push({ name, message, submittedAt: new Date().toISOString() });
    localStorage.setItem("studyspark_feedback", JSON.stringify(allFeedback));
    feedbackMessage.textContent = "Thanks for the suggestion. We will review it soon.";
    feedbackForm.reset();
  });
}

function getQueryParam(key) {
  return new URLSearchParams(window.location.search).get(key);
}

function renderPost() {
  const posts = getPosts();
  const postId = getQueryParam("id");
  const post = posts.find((item) => item.id === postId) || posts[0];

  if (!post) {
    byId("postContainer").innerHTML = "<p>Post not found.</p>";
    return;
  }

  document.title = `${post.title} | StudySpark`;

  const breadcrumbs = byId("breadcrumbs");
  breadcrumbs.innerHTML = `
    <a href="index.html">Home</a> ›
    <a href="index.html#subjects">${post.subject}</a> ›
    <span>${post.title}</span>
  `;

  const container = byId("postContainer");
  const worksheetBtn = post.worksheet
    ? `<a class="btn-secondary" href="${post.worksheet}" download>Download Worksheet</a>`
    : "";

  container.innerHTML = `
    <h1>${post.title}</h1>
    <p class="meta">${post.subject} · Grade ${post.gradeBand} · ${formatDate(post.date)} · ${post.readTime}</p>
    <img class="hero-image" src="${post.image}" alt="${post.subject} assignment visual">
    <p>${post.intro}</p>

    <h2>Step-by-Step Guide</h2>
    <ol class="steps">${post.steps.map((step) => `<li>${step}</li>`).join("")}</ol>

    <p><strong>Worked Example:</strong> ${post.example}</p>

    <aside class="did-you-know">
      <strong>Did You Know?</strong>
      <p>${post.didYouKnow}</p>
    </aside>

    <div class="toolbar">
      <button id="printBtn" type="button">Print This Article</button>
      ${worksheetBtn}
      <a href="https://wa.me/?text=${encodeURIComponent(post.title + ' - ' + window.location.href)}" target="_blank" rel="noopener noreferrer">Share on WhatsApp</a>
      <a href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}" target="_blank" rel="noopener noreferrer">Share on Facebook</a>
    </div>

    <section class="quiz">
      <h2>Quick Quiz</h2>
      <p>${post.quiz.question}</p>
      <form id="quizForm">
        <div class="quiz-options">
          ${post.quiz.options.map((option, index) => `
            <label>
              <input type="radio" name="quizOption" value="${option}" ${index === 0 ? "" : ""}>
              <span>${option}</span>
            </label>
          `).join("")}
        </div>
        <button type="submit">Check Answer</button>
      </form>
      <p id="quizResult" class="quiz-result" aria-live="polite"></p>
    </section>
  `;

  byId("printBtn").addEventListener("click", () => window.print());

  const quizForm = byId("quizForm");
  const quizResult = byId("quizResult");
  quizForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const selected = new FormData(quizForm).get("quizOption");
    if (!selected) {
      quizResult.textContent = "Please choose an answer first.";
      quizResult.style.color = "#8a6d3b";
      return;
    }

    if (selected === post.quiz.answer) {
      quizResult.textContent = `Correct! ${post.quiz.explanation}`;
      quizResult.style.color = "#11643a";
    } else {
      quizResult.textContent = `Not quite. ${post.quiz.explanation}`;
      quizResult.style.color = "#9f1239";
    }
  });

  renderComments(post.id);
  renderRelated(posts, post);
}

function renderComments(postId) {
  const commentForm = byId("commentForm");
  const commentList = byId("commentList");
  const key = `studyspark_comments_${postId}`;

  function draw() {
    const comments = JSON.parse(localStorage.getItem(key) || "[]");
    commentList.innerHTML = comments.length
      ? comments
          .map((comment) => `
            <article class="comment-item">
              <strong>${comment.name}</strong>
              <p>${comment.text}</p>
            </article>
          `)
          .join("")
      : "<p>No questions yet. Be the first to ask.</p>";
  }

  commentForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = byId("commentName").value.trim();
    const text = byId("commentText").value.trim();
    if (!name || !text) {
      return;
    }
    const comments = JSON.parse(localStorage.getItem(key) || "[]");
    comments.unshift({ name, text, createdAt: new Date().toISOString() });
    localStorage.setItem(key, JSON.stringify(comments));
    commentForm.reset();
    draw();
  });

  draw();
}

function renderRelated(posts, currentPost) {
  const relatedTarget = byId("relatedPosts");
  const related = posts
    .filter((post) => post.id !== currentPost.id)
    .sort((a, b) => (a.subject === currentPost.subject ? -1 : 1) - (b.subject === currentPost.subject ? -1 : 1))
    .slice(0, 3);

  relatedTarget.innerHTML = related.map(cardTemplate).join("");
}

function init() {
  const page = document.body.getAttribute("data-page");
  if (page === "home") {
    renderHome();
  }
  if (page === "post") {
    renderPost();
  }
}

init();