/* Handle ID based requests */
var express = require('express');
var router = express.Router();
var Job = require('../models/job_schema.js');
var job_handler = require('../util').job_handler;

let missing_id = {
    "response" : "Must supply an ID"
};

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
        return Job.removeById(req.params.id, (err, job) => {
            let response = {
                "Removed Job" : job.name ? job.name : "none",
                "Removed ID"  : job.id ? job.id : "none"
            };
            return job_handler(res, response, err)
        });
    }
    return job_handler(res, missing_id, null)
});

module.exports = router;
