async function fetchProjects() {
    const container = document.getElementById('project-list');
    const loader = document.getElementById('loader');

    try {
        const response = await fetch('http://localhost:5000/api/projects');
        const projects = await response.json();

        loader.style.display = 'none';

        if (projects.length === 0) {
            container.innerHTML = "<p class='text-center col-span-3'>No projects found in database.</p>";
            return;
        }

        projects.forEach(project => {
            const card = `
                <div class="card bg-base-100 border border-base-300 shadow-xl hover:shadow-2xl transition-all">
                    <figure><img src="${project.image || 'https://via.placeholder.com/400x200'}" alt="Project" /></figure>
                    <div class="card-body">
                        <h2 class="card-title text-primary">${project.title}</h2>
                        <p class="text-sm">${project.description}</p>
                        <div class="card-actions justify-end mt-2">
                            ${project.tags.map(tag => `<div class="badge badge-outline">${tag}</div>`).join('')}
                        </div>
                        <a href="${project.link}" target="_blank" class="btn btn-sm btn-outline mt-4">Live Preview</a>
                    </div>
                </div>
            `;
            container.innerHTML += card;
        });
    } catch (error) {
        console.error("Error fetching projects:", error);
        loader.innerHTML = "Failed to load projects. Is the server running?";
    }
}

window.onload = fetchProjects;