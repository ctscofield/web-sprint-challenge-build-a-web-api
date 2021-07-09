// Write your "projects" router here!
const express = require("express");

const Projects = require("./projects-model");

const router = express.Router();

router.get("/", (req, res, next) => {
    Projects.get()
        .then(projects => {
            res.status(200).json(projects);
        })
        .catch(next)
})

router.get("/:id", (req, res, next) => {
    console.log(Projects);
})

router.post("/", (req, res, next) => {
    console.log(Projects);
})

router.put("/:id", (req, res, next) => {
    console.log(Projects);
})

router.delete("/:id", (req, res, next) => {
    console.log(Projects);
})

router.get("/:id/actions", (eq, res, next) => {
        console.log(Projects);
})


router.use((err, req, res, next) => { //eslint-disable-line
    res.status(err.status || 500).json({
      customMessage: "something bad happened",
      message: err.message,
      stack: err.stack,
    })
})

module.exports = router;