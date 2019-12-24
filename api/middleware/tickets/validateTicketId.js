const { Tickets } = require('../../data/helpers');
module.exports = (req, res, next) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) return res.status(400).json({ message: 'The ticket id provided is not a valid number' });

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