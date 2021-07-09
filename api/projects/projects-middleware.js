// add middlewares here related to projects

const Projects = require("./projects-model");

async function validateProjectId(req, res, next) {
    try {
         const projects = await Projects.get(req.params.id);
         console.log(projects);
         if (!projects) {
            next({
                status: 404,
                message: "project not found"
            })
         } else {
            req.projects = projects;
            next();
         }
    } catch (err) {
        next(err)
    }
}

function validateName(req, res, next) {
    const { name } = req.body;
    if (!name) {
        res.status(400).json({message: "missing required name field"})
    } else {
        req.text = name.trim();
        next();
    }
}

function validateDescription(req, res, next) {
    const { description } = req.body;
    if (!description) {
        res.status(400).json({message: "missing required description field" })
    } else {
        req.description = description.trim();
        next();
    }
}


module.exports = {
    validateProjectId,
    validateName,
    validateDescription,
}