// Write your "actions" router here!
const express = require("express")
const {
    validateActionId,

} =require("./actions-middlware")

const Actions = require("./actions-model")

const router = express.Router();

router.get("/", (req, res, next) => {
    Actions.get()
        .then(actions => {
            res.status(200).json(actions);
        })
        .catch(next)
})

router.get("/:id", validateActionId, (req, res) => {
    console.log(Actions)
    res.json(req.actions)
})

router.post("/", (req, res, next) => {

})

router.put("/:id", (req, res, next) => {

})

router.delete("/:id", (req, res, next) => {

})


module.exports = router;