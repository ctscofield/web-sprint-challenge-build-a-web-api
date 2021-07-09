// Write your "actions" router here!
const express = require("express")
const {
    validateActionId,
    validateProject_Id,
    validateDescription,
    validateNotes
} =require("./actions-middlware")

const Actions = require("./actions-model")

const router = express.Router()

router.get("/", (req, res, next) => {
    Actions.get()
        .then(actions => {
            res.status(200).json(actions)
        })
        .catch(next)
})

router.get("/:id", validateActionId, (req, res) => {
    console.log(Actions)
    res.json(req.actions)
})

router.post("/", validateProject_Id, validateDescription, validateNotes, async (req, res, next) => {
    Actions.insert(req.body)
        .then(newAction => {
            res.status(201).json(newAction)
        })
        .catch(next)
})

router.put("/:id", validateActionId, validateProject_Id, validateDescription, validateNotes, async (req, res, next) => {
    Actions.update(req.params.id, req.body)
        .then(() => {
            return Actions.get(req.params.id)
        })
        .then(action => {
            res.json(action)
        })
        .catch(next)
})

router.delete("/:id", validateActionId, async (req, res, next) => {
    try {
        await Actions.remove(req.params.id)
        res.json(req.actions)
    } catch (err) {
        next(err)
    }
})

router.use((err, req, res, next) => { //eslint-disable-line
    res.status(err.status || 500).json({
      customMessage: "something bad happened",
      message: err.message,
      stack: err.stack,
    })
})


module.exports = router;