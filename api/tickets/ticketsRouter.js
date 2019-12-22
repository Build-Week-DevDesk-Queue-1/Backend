const express = require('express')
const { Tickets, Roles } = require('../../data/helpers');
const { checkRole } = require('../middleware')
const router = express.Router();

router.get('/', async (req, res) => {
// TODO refactor this endpoint to return ALL tickets without discrimination
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
});

router.get('/:id', (req, res) => {
// TODO get content of the ticket by it's id
});

router.get('/unresolved', (req, res) => {
// TODO get an array of all unresolved tickets (even the ones that already have an assigned helper)
});

router.get('/open', (req, res) => {
// TODO get an array of all open tickets (no helper_id assigned)
});

router.put('/:id', (req, res) => {
// TODO able to change title, content, and tried
});

router.put('/:id/accept', checkRole('Helper'), (req, res) => {
  const ticket_id = req.params.id;
  const { id } = req.decoded_token;
  Tickets
    .change(parseInt(ticket_id), { helper_id: id })
    .then(ticket => {
      res.status(200).json(ticket);
    })
    .catch(error => res.status(500).json({ error }));
});

router.put('/:id/assign', checkRole('Helper'), (req, res) => {
//TODO change helper_id to the token owner
});

router.put('/:id/resolve', checkRole('Helper'), (req, res) => {
//TODO change resolved status of ticket to true
});


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

router.delete('/:id', (req, res) => {
// TODO Delete this ticket.
});

module.exports = router;