const router = require("express").Router()
const DevController = require("./controllers/DevController")
const SearchController = require("./controllers/SearchController")


router.post("/devs", DevController.store)
router.get("/devs", DevController.index)
router.get("/search", SearchController.index)

module.exports = router