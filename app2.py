import pprint
from time import sleep
from github import Github
from github import Auth
import os

github_access_token = os.environ.get('GITHUB_ACCESS_TOKEN')

auth = Auth.Token(github_access_token)

g = Github(auth=auth)

repositories = g.search_repositories(query='Sorting Visualizer', sort='stars', order='desc')
count = 0
for repo in repositories:
    count += 1
    pprint.pprint(repo.__dict__)
    if count % 1 == 0:
        break;
