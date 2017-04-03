var express = require('express');
var router = express.Router();
var Job = require('../models/job_schema.js');
var util = require('../util');
var job_handler = util.job_handler;
var request = require('request');
let missing_id = {
    "response" : "Must supply an ID"
};

// GET all jobs
router.get('/', (req, res) => {
	Job.find((err, jobs) => job_handler(res, jobs, err));
});

// POST to create job 
router.post('/', (req, res) => {
    let url = req.body.url;
    if (url) {
        // create job
        return Job.create({url: url, html: null, completed: false}, (err, job) => {
            if (err) {
                return res.json({"response": "Error creating job"});
            }
            // send client the job ID if job creation successful
            res.json({"response": "Job created with ID: " + job._id});

            // make request to supplied url
            return request(url, (err, response, body) => {
                if (err) {
                    body = "Error fetching URL: " + url;
                    console.error(err);
                }
                // update job with data
                return Job.findByIdAndUpdate(job._id, {html: body, completed: true}, (err) => {
                    if (err) return console.error(err);
                });
            });
        });
    }
    return job_handler(res, {"response": "Must input URL"}, null);


});

// DELETE to delete all jobs
router.delete('/', (req, res) => {
    Job.remove({}, (err) => {
        let response = {"response" : "All jobs deleted"};
        return job_handler(res, response, err);
    });
});


// GET job by ID
router.get('/:id', (req, res) => {
    if (req.params.id) {
        return Job.findById(req.params.id, (err, job) => {
            if (job) return job_handler(res, job, err);
            let response = {"response" : "Job pending"};
            return job_handler(res, response, err);
        });
    }
    return job_handler(res, missing_id, null);
});

// DELETE job by ID
router.delete('/:id', (req, res) => {
    if (req.params.id) {
        return Job.findByIdAndRemove(req.params.id, (err, job) => {
            let response = {
                "status" : "removed"
                "URL" : job.url ? job.url : "none",
                "ID"  : job.id ? job.id : "none"
            };
            return job_handler(res, response, err)
        });
    }
    return job_handler(res, missing_id, null)
});

module.exports = router;