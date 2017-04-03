Overview 
======
Create a job queue whose workers fetch data from a URL and store the results in a database.  The job queue should expose a REST API for adding jobs and checking their status / results.

Example:
User submits www.google.com to your endpoint.  The user gets back a job id. Your system fetches www.google.com (the result of which would be HTML) and stores the result.  The user asks for the status of the job id and if the job is complete, he gets a response that includes the HTML for www.google.com

Installation
=============
Run these commands from the terminal:
```
$ git clone https://github.com/michaelserna/REST-API-Job-Queue.git
$ cd REST-API-Job-Queue
$ npm install
```

# API Docs

Create a new job with a post request:
POST /jobs with url data
```
curl -X POST localhost:3000/ -d 'url=https://google.com'
```
Sucessful response:
```
{
  "response":"Job created with ID: 58e1959ccdac2936710507b8"
}

```

Get all jobs:
GET /jobs
```
curl localhost:3000/jobs
```
Successful response:
```http
[
    {
        "_id": "58asd49018ffb91232e393c1",
        "url": "http://www.google.com"
        "html": "<!doctype html>...</body></html>",
        "completed": true,
        "__v": 0,
    },
    {
        "_id": "58e1959ccdac2936710507b8",
        "url": "http://www.reddit.com"
        "html": null,
        "completed": false,
        "__v": 0,
    }
]
```
Delete all jobs:
DELETE /jobs
```
curl -X DELETE localhost:3000/jobs
```
Successful response:
```
{
    "response" : "All jobs deleted"
}
```

Get an individual job through id param:
GET /jobs/:id
```
curl localhost:3000/jobs/58asd49018ffb91232e393c1
```
Successful response:
```
{
    "_id": "58asd49018ffb91232e393c1",
    "url": "http://www.google.com"
    "html": "<!doctype html>...</body></html>",
    "completed": true,
    "__v": 0,
}
```

Delete an individual job through id param:
DELETE /api/v1/:id 
```
 curl -X DELETE localhost:3000/jobs/58asd49018ffb91232e393c1
```
Successful response (return job that was deleted):
```
{
    "status" : "removed",
    "URL" : "http://www.google.com",
    "ID"  : 58asd49018ffb91232e393c1
}
```
