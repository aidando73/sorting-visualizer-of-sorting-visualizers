from time import sleep
from github import Github
from github import Auth
import os

github_access_token = os.environ.get('GITHUB_ACCESS_TOKEN')

auth = Auth.Token(github_access_token)

g = Github(auth=auth)

repositories = g.search_repositories(query='Sorting Visualizer', sort='stars', order='desc')
print ("[")
count = 0
for repo in repositories:
    count += 1
    print(f'{{"repoFullName": "{repo.full_name}", "stargazersCount": {repo.stargazers_count}}},')
    if count % 900 == 0:
        # Github API has a rate limit of 30 search requests per minute
        # there are 30 repositories per page
        sleep(60)
print ("]")