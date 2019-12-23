const { Categories } = require('../../data/helpers');
module.exports = (req, res, next) => {
  const id = parseInt(req.body.category_id);

  Categories
    .findBy({ id })
    .first()
    .then(category => {
      if (!!category) {
        next();
      } else {
        res.status(404).json({ message: `the category id ${id} does not exist` })
      }
    })
    .catch(error => res.status(500).json({ error }));
}