from time import sleep
from github import Github
from github import Auth
import os
import json

github_access_token = os.environ.get('GITHUB_ACCESS_TOKEN')

auth = Auth.Token(github_access_token)

g = Github(auth=auth)

black_list = [
    "klonnet23/helloy-word"
]

repositories = g.search_repositories(query='Sorting Visualizer', sort='stars', order='desc')
print ("[")
count = 0
for repo in repositories:
    if repo.full_name in black_list:
        continue
    count += 1
    print(f'{{"repoFullName": "{repo.full_name}", "stargazersCount": {repo.stargazers_count}, "ownerAvatarUrl": "{repo.owner.avatar_url}", "language": "{repo.language}", "description": {json.dumps(repo.description)}, "forks": {repo.forks_count}, "updatedAt": "{repo.updated_at}"}},')
    if count % 100 == 0:
        # Github API has a rate limit of 30 search requests per minute
        # there are 30 repositories per page
        # sleep(60)
        break
print ("]")