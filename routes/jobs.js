/* Handle non-ID based requests */
var express = require('express');
var router = express.Router();
var Job = require('../models/job_schema.js');
var util = require('../util');
var job_handler = util.job_handler;
var request = require('request');

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


module.exports = router;