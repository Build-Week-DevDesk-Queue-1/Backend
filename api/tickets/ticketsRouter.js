const express = require('express')
const { Tickets, Roles } = require('../../data/helpers');
const { checkRole } = require('../middleware')
const router = express.Router();

router.get('/', async (req, res) => {
  const { role_id, id } = req.decoded_token;
  const role = await Roles.findBy({ id: role_id });

  switch (role.name) {
    case 'Student':
      return Tickets
        .findBy({ student_id: id })
        .then(tickets => {
          res.status(200).json(tickets);
        })
        .catch(error => res.status(500).json({ error }));

    case 'Helper':
      return Tickets
        .findBy({ helper_id: null, resolved: false })
        .then(tickets => {
          res.status(200).json(tickets);
        })
        .catch(error => res.status(500).json({ error }));
    
    default:
      res.status(500).json({ error: 'unable to fetch tickets at this time' });
  }
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