module.exports = (req, res, next) => {
  const required = ['title', 'description', 'tried', 'category_id'];

  if (!Object.entries(req.body).length) {
    return res.status(400).json({ message: 'there is request body attached' });
  }

  const errors = required.map(field => {
    if (!field in req.body || !req.body[field].toString().length) {
      return `missing a valid ${field} value`;
    }
  })

  if (!!errors.length) return res.status(400).json({ errors });

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