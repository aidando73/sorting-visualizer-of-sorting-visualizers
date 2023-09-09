const { Octokit, App } = require("octokit");

// Get the token from the environment variable
const accessToken = process.env.GITHUB_ACCESS_TOKEN;
console.log(accessToken);


const octokit = new Octokit({
   auth: accessToken,
});

octokit.rest.users.getAuthenticated()
   .then(console.log);