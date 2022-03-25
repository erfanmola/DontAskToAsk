em_projects.forEach((project) => {
  let ul = document.getElementById("projects");
  let li = document.createElement("li");
  let a = document.createElement("a");
  a.href = project.url;
  a.textContent = project.title;
  li.appendChild(a);
  ul.appendChild(li);
});
