// root route
const router = require('express').Router();
const path = require('path');

router.get('/', (req, res) => {
    res.sendFile(path.join(_dirname, "../public/index.html"))
});

// router.get('/exercise', (req, res) => {
//     res.sendFile(path.join(_dirname, "../public/exercise.html"))
// });

module.exports = router;

