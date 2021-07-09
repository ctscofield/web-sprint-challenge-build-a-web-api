// Write your "projects" router here!
const express = require("express");

const Projects = require("./projects-model");

const router = express.Router();

router.get("/", (req, res, next) => {
    Projects.get()
        .then(projects => {
            console.log(projects);
        })
        .catch(next)
})








router.use((err, req, res, next) => { //eslint-disable-line
    res.status(err.status || 500).json({
      customMessage: "something bad happened",
      message: err.message,
      stack: err.stack,
    })
})

module.exports = router;