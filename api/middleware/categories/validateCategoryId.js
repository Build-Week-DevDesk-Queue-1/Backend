const { Categories } = require('../../../data/helpers');
module.exports = (req, res, next) => {
  const id = parseInt(req.body.category_id);

  if (isNaN(id)) return res.status(400).json({ message: 'The category id provided is not a valid number' });

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
    .catch(error => res.status(5001).json({ error }));
}
