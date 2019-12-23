const { Tickets } = require('../../data/helpers');
module.exports = (req, res, next) => {
  const id = parseInt(req.params.id);

  Tickets
    .findBy({ id })
    .first()
    .then(ticket => {
      if (!!ticket) {
        next();
      } else {
        res.status(404).json({ message: `ticket with id ${id} does not exist` });
      }
    })
    .catch(error => res.status(500).json({ error }));
}