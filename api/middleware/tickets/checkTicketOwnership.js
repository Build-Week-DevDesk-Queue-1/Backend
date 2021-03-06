const { Tickets } = require('../../../data/helpers');
module.exports = (req, res, next) => {
  const ticket_id = parseInt(req.params.id);
  const user_id = parseInt(req.decoded_token.id);

  Tickets
    .validateId(ticket_id)
    .then(ticket => {
      if (ticket.helper_id === user_id || ticket.student_id === user_id) {
        next();
      } else {
        res.status(401).json({ message: 'token owner does not have access to update this ticket' });
      }
    })
    .catch(error => res.status(500).json({ error, tag: 'ownership' }));
}