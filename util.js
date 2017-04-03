module.exports = {
    // Handler to handler errors or data
    job_handler(res, data, err) {
        if (err) {
            console.error(err);
            return res.send("Error completing request");
        }
        return res.json(data);
    }
};