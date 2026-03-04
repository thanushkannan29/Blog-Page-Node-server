
document.addEventListener("DOMContentLoaded", function () {
    callAPI();
});

function callAPI() {

    const spinner = document.getElementById("loadingSpinner");
    const container = document.getElementById("BlogContainer");

    spinner.style.display = "block";
    container.innerHTML = "";

    fetch('https://dummyjson.com/posts')
        .then(response => response.json())
        .then(data => {

            spinner.style.display = "none";
            addBlogDataToPage(data.posts);

        })
        .catch(error => {
            spinner.style.display = "none";
            container.innerHTML = "<p class='text-danger text-center'>Failed to load blogs.</p>";
            console.error("Error:", error);
        });
}

function addBlogDataToPage(posts) {

    const container = document.getElementById("BlogContainer");

    posts.forEach(post => {

        const col = document.createElement("div");
        col.className = "col-lg-4 col-md-6 col-sm-12";

        col.innerHTML = `
    <div class="card h-100 shadow-lg border-0">
        <div class="card-body d-flex flex-column">
            <h5 class="card-title fw-bold">${post.title}</h5>
            <p class="card-text">${post.body}</p>

            <div class="mb-2">
                ${post.tags.map(tag =>
                    `<span class="badge bg-primary-subtle text-primary me-1">${tag}</span>`
                ).join("")}
            </div>

            <div class="mt-auto">
                <small class="text-muted">
                    👍 ${post.reactions.likes} 
                    👎 ${post.reactions.dislikes} 
                    👁 ${post.views}
                </small>
            </div>
        </div>
    </div>
`;

        container.appendChild(col);
    });
}
function toggleTheme() {
    const body = document.body;
    const btn = document.querySelector(".theme-toggle");

    const currentTheme = body.getAttribute("data-bs-theme");

    if (currentTheme === "light") {
        body.setAttribute("data-bs-theme", "dark");
        btn.innerHTML = "☀ Light Mode";
        btn.classList.remove("btn-light");
        btn.classList.add("btn-dark");
    } else {
        body.setAttribute("data-bs-theme", "light");
        btn.innerHTML = "🌙 Dark Mode";
        btn.classList.remove("btn-dark");
        btn.classList.add("btn-light");
    }
}

