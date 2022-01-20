const APIURL = "https://api.github.com/users/";

const form = document.getElementById("form");
const main = document.getElementById("main");
const search = document.getElementById("search");

async function getUser(username) {
  // axios.get(APIURL + username)
  // .then(res => console.log(res.data))
  // .catch(err => console.log(err))
  try {
    const { data } = await axios.get(APIURL + username); //res

    createUserCard(data); //res.data
    getRepos(username);
  } catch (error) {
    if (error.response.status == 404) {
      createErrorCard("User not found");
    }
  }
}

async function getRepos(username) {
  try {
    const { data } = await axios.get(APIURL + username + "/repos?sort=created"); //res

    addReposToCard(data); //res.data
  } catch (err) {
    createErrorCard("Problem fetching repos");
  }
}

function createUserCard(user) {
  const cardHTML = `
    <div class="card">
        <div>
                <img src="${user.avatar_url}." alt="${user.name}" class="avatar">
        </div>
            <div class="user-info">
                <h2>${user.name}</h2>
                <p>${user.bio}</p>

                <ul>
                    <li>${user.followers} <strong>Followers</strong></li>
                    <li>${user.following} <strong>Following</strong></li>
                    <li>${user.public_repos} <strong>Repos</strong></li>
                </ul>

                <div id="repos">

                </div>
            </div>
    </div>
    `;
  main.innerHTML = cardHTML;
}

function addReposToCard(repos) {
  const reposEl = document.getElementById("repos");

  repos.slice(0, 15).forEach((repo) => {
    const repoEl = document.createElement("a");
    repoEl.classList.add("repo");
    repoEl.href = repo.html_url;
    repoEl.target = "_blank";
    repoEl.innerText = repo.name;

    reposEl.appendChild(repoEl);
  });
}

function createErrorCard(msg) {
  const cardHTML = `
    <div class='card'>
        <h1>${msg}
    </div>    
    `; 
  main.innerHTML = cardHTML;
}

form.addEventListener("submit", (event) => {
  event.preventDefault(); 

  const user = search.value;

  if (user) {
    getUser(user);

    search.value = "";
  }
});