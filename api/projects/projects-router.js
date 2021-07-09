// Write your "projects" router here!
const express = require("express");
const {
    validateProjectId,
    validateName,
    validateDescription,
} = require("./projects-middleware");

const Projects = require("./projects-model");

const router = express.Router();

router.get("/", (req, res, next) => {
    Projects.get()
        .then(projects => {
            res.status(200).json(projects);
        })
        .catch(next)
})

router.get("/:id", validateProjectId,(req, res) => {
    console.log(Projects);
    res.json(req.projects);
})

router.post("/", validateName, validateDescription, async (req, res, next) => {
    Projects.insert(req.body)
        .then(newProject => {
            res.status(201).json(newProject)
        })
        .catch(next)
})

router.put("/:id", validateProjectId, validateName, validateDescription, async (req, res, next) => {
    Projects.update(req.params.id, req.body)
        .then(() => {
            return Projects.get(req.params.id)
        })
        .then(project => {
            res.json(project)
        })
        .catch(next)
})

router.delete("/:id", validateProjectId, (req, res, next) => {
    console.log(Projects);
})

router.get("/:id/actions", validateProjectId, (eq, res, next) => {
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