const { Roles } = require('../../data/helpers')

module.exports = role => {
  return (req, res, next) => {
    const { role_id } = req.decoded_token;
    return Roles
      .findBy({ id: role_id })
      .then(result => {
        if (result.name === role) {
          next();
        } else {
          res.status(401).json({ message: 'unauthorizaed role' });
        }
      })
      .catch(error => res.status(5001).json({ error, tag: 'role' }));
  }
}
