from time import sleep
from github import Github
from github import Auth
import os
import json
import boto3

github_access_token = os.environ.get('GITHUB_ACCESS_TOKEN')
s3_bucket = os.environ.get('S3_BUCKET')

if github_access_token is None:
    raise Exception('GITHUB_ACCESS_TOKEN is not set')

if s3_bucket is None:
    raise Exception('S3_BUCKET is not set')

auth = Auth.Token(github_access_token)

g = Github(auth=auth)

black_list = [
    "klonnet23/helloy-word",
    "sanusanth/Python-Basic-programs",
    "zmon/Code-for-America-Projects-Hub",
    "yet-another-alex/dearpygui-examples"
]

def cache_search_results():
    repositories = g.search_repositories(query='Sorting Visualizer', sort='stars', order='desc')
    result = []
    count = 0
    for repo in repositories:
        if repo.full_name in black_list:
            continue
        count += 1
        result.append({
            "repoFullName": repo.full_name,
            "stargazersCount": repo.stargazers_count,
            "ownerAvatarUrl": repo.owner.avatar_url,
            "language": repo.language,
            "description": repo.description,
            "forks": repo.forks_count,
            "updatedAt": str(repo.updated_at)
        })
        if count >= 100:
            break;

    s3 = boto3.client('s3')
    s3.put_object(Bucket=s3_bucket, Key='sorting-visualizer-of-sorting-visualizers/data.json', Body=json.dumps(result), ContentType='application/json')