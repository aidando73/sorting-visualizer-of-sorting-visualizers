Instructions on how to deploy:

- Go to the Lambda console and create a new function
- Zip the dependencies

```
 python -m pip install --platform manylinux2014_x86_64 --only-binary=:all: -t python -r requirements.txt
 zip -r dependencies.zip python
```

- Upload a layer with the dependencies
- Add layer to the lambda function
- Zip the code

```
cd service 
zip -r code.zip *.py 
```

- Upload code to the lambda function
- Populate environment variables 

```
GITHUB_ACCESS_TOKEN=<token>
S3_BUCKET=<bucket>
```

- Edit the execution role of the lambda function. Giving it PutObject access to the S3 bucket (Should be an existing permission for it)
- Add a trigger to the lambda function. (EventBridge, cron expression run every day at 00:00 adelaide time `cron(0 14 * * ? *)`)
- Add a destination to a SNS topic (on failure and asynchroneous invocation), that sends an email to yourself.