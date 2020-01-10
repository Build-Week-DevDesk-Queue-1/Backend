const router = require('express').Router();
const { Categories } = require('../../data/helpers');

router.get('/', (req, res) => {
  Categories
    .find()
    .then(categories => res.status(200).json(categories))
    .catch(error => res.status(500).json({ error }));
});

module.exports = router;