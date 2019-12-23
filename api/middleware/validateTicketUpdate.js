module.exports = (req, res, next) => {
  const { title, description, tried, category_id } = req.body;
  const content = Object.entries(req.body);
  const updates = {};

  if (!content.length) {
    return res.status(400).json({ message: 'there is request body attached' });
  }

  if (!title && !description && !tried && !category_id) {
    return res.status(400).json({ message: 'no updatable fields in request body' })
  }

  if (title) updates.title = title;
  if (description) updates.description = description;
  if (tried) updates.tried = tried;
  if (category_id) updates.category = category_id;

  req.ticket_updates = updates;
  next();
}