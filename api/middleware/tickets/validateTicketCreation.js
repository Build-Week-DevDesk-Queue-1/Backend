module.exports = (req, res, next) => {
  const required = ['title', 'description', 'tried', 'category_id'];
  const errors = [];

  if (!Object.entries(req.body).length) {
    return res.status(400).json({ message: 'there is request body attached' });
  }

  required.forEach(field => {
    if (!(field in req.body) || !req.body[field].toString().length) {
      errors.push(`missing a valid ${field} value`);
    }
  })

  if (!!errors.length) return res.status(400).json({ errors, tag: 'validateTicketCreation' });

  const { title, description, tried, category_id } = req.body;

  const ticket = {
    title,
    description,
    tried,
    category_id    
  }
  
  req.ticket_content = ticket;
  next();
}