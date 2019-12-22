const express = require('express')
const { Tickets, Roles } = require('../../data/helpers');
const { checkRole } = require('../middleware')
const router = express.Router();

router.get('/', async (req, res) => {
  const { role_id, id } = req.decoded_token;
  const role = await Roles.findBy({ id: role_id });

  const queryObject = role.name === 'Student'
    ? { student_id: id }
    : role.name === 'Helper'
      ? { helper_id: null, resolved: false }
      : null

  if (!queryObject) {
    return res.status(400).json({ message: 'not a valid role' });
  }

  Tickets
    .findBy(queryObject)
    .then(tickets => {
      res.status(200).json(tickets);
    })
    .catch(error => res.status(500).json({ error }));
})

router.put('/:id/accept', checkRole('Helper'), (req, res) => {
  const ticket_id = req.params.id;
  const { id } = req.decoded_token;
  Tickets
    .change(parseInt(ticket_id), { helper_id: id })
    .then(ticket => {
      res.status(200).json(ticket);
    })
    .catch(error => res.status(500).json({ error }));
})

router.post('/', checkRole('Student'), (req, res) => {
  const ticketData = req.body;
  ticketData.student_id = req.decoded_token.id;

  Tickets
    .add(ticketData)
    .then(ticket => {
      res.status(201).json(ticket);
    })
    .catch(error => res.status(500).json({ error }));
})


module.exports = router;