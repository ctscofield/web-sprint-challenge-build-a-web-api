// add middlewares here related to actions

const Actions = require("./actions-model");

async function validateActionId(req, res, next) {
    try {
         const actions = await Actions.get(req.params.id);
         console.log(actions);
         if (!actions) {
            next({
                status: 404,
                message: "action not found",
            })
         } else {
            req.actions = actions;
            next();
         }
    } catch (err) {
        res.status(500).json({
            message: "Trouble finding action"
        })
        
    }
}

async function validateProject_Id(req, res, next) {
    const { project_id } = req.body;
    if (!project_id) {
        res.status(400).json({message: "missing required project_id field"})
    } else {
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

function validateNotes(req, res, next) {
    const { notes } = req.body;
    if (!notes) {
        res.status(400).json({message: "missing required notes field" })
    } else {
        req.notes = notes.trim();
        next();
    }
}


module.exports = {
    validateActionId,
    validateProject_Id,
    validateDescription,
    validateNotes
};