const validateToken = require('./validateToken');
const validateCategoryId = require('./categories/validateCategoryId');
const validateTicketId = require('./tickets/validateTicketId');
const validateTicketCreation = require('./tickets/validateTicketCreation');
const validateTicketUpdate = require('./tickets/validateTicketUpdate');
const checkRole = require('./checkRole');
const checkTicketOwnership = require('./tickets/checkTicketOwnership');

module.exports = {
  validateToken,
  validateCategoryId,
  validateTicketId,
  validateTicketCreation,
  validateTicketUpdate,
  checkRole,
  checkTicketOwnership
}