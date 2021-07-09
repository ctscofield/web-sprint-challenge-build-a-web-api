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

router.put("/:id", (req, res, next) => {

})

router.delete("/:id", (req, res, next) => {

})


module.exports = router;