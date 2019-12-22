const express = require('express')
const { Tickets, Roles } = require('../../data/helpers');
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
        .findBy({ helper_id: null })
        .then(tickets => {
          res.status(200).json(tickets);
        })
        .catch(error => res.status(500).json({ error }));
    
    default:
      res.status(500).json({ error: 'unable to fetch tickets at this time' });
  }
})

module.exports = router;