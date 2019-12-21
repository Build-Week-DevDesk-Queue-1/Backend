exports.seed = knex => {
  return knex('tickets')
    .insert([
      {
        title: 'Div not centering to the screen',
        description: 'I am trying to center a div but it isn\'t working',
        tried: 'text-align: center',
        category_id: 2,
        helper_id: 1,
        student_id: 7,
        resolved: false, 
      },
      {
        title: 'Getting error message invalid token',
        description: 'Even though I am attaching an authorization token into my header, I am getting an error message back saying invalid token',
        tried: 'creating new accounts, logging in again to get a new token',
        category_id: 12,
        student_id: 4,
        resolved: false, 
      }
    ])
}