const express = require('express')
const { Tickets, Roles } = require('../../data/helpers');

const { 
  checkRole, 
  checkTicketOwnership,
  validateTicketId, 
  validateCategoryId, 
  validateTicketUpdate, 
  validateTicketCreation } = require('../middleware')

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

router.get('/:id', validateTicketId, checkTicketOwnership, (req, res) => {
  const id = parseInt(req.params.id);

  Tickets
    .findBy({ id })
    .first()
    .then(ticket => res.status(200).json(ticket))
    .catch(error => res.status(500).json({ error }));
});

router.get('/unresolved', (req, res) => {
  Tickets
    .findBy({ resolved: false })
    .then(tickets => res.status(200).json(tickets))
    .catch(error => res.status(500).json({ error }));
});

router.get('/open', (req, res) => {
  Tickets
    .findBy({ resolved: false, helper_id: null })
    .then(tickets => res.status(200).json(tickets))
    .then(error => res.status(500).json({ error }));
});

router.put('/:id', validateTicketId, checkTicketOwnership, validateTicketUpdate, (req, res) => {
  const id = parseInt(req.params.id);
  const changes = req.ticket_updates;

  Tickets
    .change(id, changes)
    .then(ticket => res.status(200).json(ticket))
    .catch(error => res.status(500).json({ error }));
});

router.put('/:id/accept', checkRole('Helper'), validateTicketId, checkTicketOwnership, (req, res) => {
  const ticket_id = req.params.id;
  const { id } = req.decoded_token;

  Tickets
    .change(parseInt(ticket_id), { helper_id: id })
    .then(ticket => {
      res.status(200).json(ticket);
    })
    .catch(error => res.status(500).json({ error }));
});

router.put('/:id/reopen', checkRole('Helper'), validateTicketId, checkTicketOwnership, (req, res) => {
  const id = parseInt(req.params.id);

  Tickets
    .change(id, { helper_id: null })
    .then(ticket => res.status(200).json(ticket))
    .catch(error => res.status(500).json({ error }));
});

router.put('/:id/resolve', checkRole('Helper'), validateTicketId,  checkTicketOwnership, (req, res) => {
  const id = parseInt(req.params.id);

  Tickets
    .change(id, { resolved: true })
    .then(ticket => res.status(200).json(ticket))
    .catch(error => res.status(500).json({ error }));

});

router.post('/', checkRole('Student'), validateTicketCreation, validateCategoryId, (req, res) => {
  const ticketData = req.ticket_content;
  ticketData.student_id = req.decoded_token.id;

  Tickets
    .add(ticketData)
    .then(ticket => {
      res.status(201).json(ticket);
    })
    .catch(error => res.status(500).json({ error }));
})

router.delete('/:id', validateTicketId, checkTicketOwnership, (req, res) => {
  const id = parseInt(req.params.id);

  Tickets
    .remove(id)
    .then(() => res.status(200).json({ message: 'ticket removed successfuly' }))
    .catch(error => res.status(500).json({ error }));
});

module.exports = router;