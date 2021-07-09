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


module.exports = {
    validateProjectId
}