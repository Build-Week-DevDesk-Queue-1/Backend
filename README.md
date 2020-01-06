# **API User Guide**

**Table of Contents:**|
---------
[Authentication Routes](#Authentication-Routes)|
[Ticket Routes](#Ticket-Routes)|
[General Routes](#General-Routes)|

### **Authentication Routes**

###  **User Registration**:

#### POST */api/auth/register*

Creates a new user account.
Returns an object with user info and a JSON web token.

Request:
```javascript
{
  email: "example@email.com", // string (required) [ must be in proper email format ]
  password: "abc123!", // string (required) [ min. 6 total characters | min. 1 special character | min. 1 digit ]
  first_name: "firstname", // string (required)
  last_name: "lastname", // string (required)
  role_id: 1 // integer (required) [ must be a valid role id ]
}
```
Response:

```javascript
{
  user: {
      id: 1,
      role_id: 1,
      email: "example@email.com",
      first_name: "firstname",
      last_name: "lastname",
      role: "Student"
  },
  token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OSwicm9sZV9pZCI6MSwiaWF0IjoxNTc3MTY1MDY3LCJleHAiOjE1NzcxNjg2Njd9.pg1rqfKM5BxyLssMVyL8xrCW9BjKZhmqIrODlZp16Kk"
}
```

### **User Login** 
[back to top](#api-user-guide)
#### POST */api/auth/login*

Validates user's credentials.
Returns an object with user info and a JSON web token.

Request:
```javascript
{
  email: "example@email.com", // string (required)
  password: "abc123!", // string (required)
}
```

Response:
```javascript
{
  user: {
      id: 1,
      role_id: 1,
      email: "example@email.com",
      first_name: "firstname",
      last_name: "lastname",
      role: "Student"
  },
  token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OSwicm9sZV9pZCI6MSwiaWF0IjoxNTc3MTY1MDY3LCJleHAiOjE1NzcxNjg2Njd9.pg1rqfKM5BxyLssMVyL8xrCW9BjKZhmqIrODlZp16Kk"
}
```
## **Ticket Routes**
[back to top](#api-user-guide)

### **Student Actions**:

#### GET */api/tickets*

Returns an array of all tickets created by the token owner

Request:
```javascript
// No input needed
```
Response:
```javascript
[
  {
    student_first_name: "Jonathan",
    student_last_name: "Chen",
    helper_first_name: null,
    helper_last_name: null,
    email: null,
    category: "Applied JavaScript",
    id: 3,
    created_at: 1577512671723,
    updated_at: 1577213948126,
    student_id: 2,
    category_id: 4,
    helper_id: null,
    title: "test title",
    description: "this is a description",
    tried: "I tried doing many things",
    resolved: 0
  },
  {
    student_first_name: "Jonathan",
    student_last_name: "Chen",
    helper_first_name: null,
    helper_last_name: null,
    email: null,
    category: "Applied JavaScript",
    id: 4,
    created_at: 1578342998271,
    updated_at: 1577213948126,
    student_id: 2,
    category_id: 4,
    helper_id: null,
    title: "test title",
    description: "this is a description",
    tried: "I tried doing things",
    resolved: 0
  }
]
```

#### POST */api/tickets*

Creates a new ticket.
Returns an object with the updated ticket's info.

Request:
```javascript
{
  title: "Updated Title", // string (required)
  category_id: 4, // number (required)
  description: "This is an updated description", // string (required)
  tried: "Attempt 1, Attempt 2", // string (required)
}
```
Response:
```javascript
{
    id: 1,
    created_at: "2019-12-22 07:44:46",
    updated_at: "2019-12-22 07:44:46",
    student_id: 1,
    category_id: 4,
    helper_id: null,
    title: "title",
    description: "description",
    tried: "Attempt 1, Attempt 2",
    resolved: false
}
```

#### PUT */api/tickets/:id*

Updates an existing ticket using the `:id` in the URL as the ticket's id.
The ticket can only be updated by the users associated with it (creator/assigned helper).
Must include at least one of the fields in the example input below.
Returns an object with the updated ticket's info.

Request:
```javascript
{
  title: "Updated Title", // string (optional)
  category_id: 3, // number (optional)
  description: "This is an updated description", // string (optional)
  tried: "Attempt 1, Attempt 2, updated Attempt 3", // string (optional)
}
```
Response:
```javascript
{
    id: 1,
    created_at: "2019-12-22 07:44:46",
    updated_at: "2019-12-22 08:40:22",
    student_id: 1,
    category_id: 3,
    helper_id: null,
    title: "test title new",
    description: "this is a description new",
    tried: "I tried doing many things new",
    resolved: false
}
```

### **Helper Actions**:

#### GET */api/tickets*

Returns an array of all tickets accepted by the token owner.

Request:
```javascript
// No input needed
```
Response:
```javascript
[
  {
    student_first_name: "Michael",
    student_last_name: "Ross",
    helper_first_name: "Nattajohn",
    helper_last_name: "Rojanasupya",
    email: "nattajohn@devdeskq.com",
    category: "Advanced CSS",
    id: 1,
    created_at: 1577213948126,
    updated_at: 1577214562899,
    student_id: 7,
    category_id: 2,
    helper_id: 1,
    title: "Div not centering to the screen",
    description: "I am trying to center a div but it isn't working",
    tried: "text-align: center",
    resolved: 0
  },
  {
    student_first_name: "Preston",
    student_last_name: "Middleton",
    helper_first_name: "Nattajohn",
    helper_last_name: "Rojanasupya",
    email: "nattajohn@devdeskq.com",
    category: "Authentication and Testing",
    id: 2,
    created_at: 1577213948126,
    updated_at: 1578344062601,
    student_id: 4,
    category_id: 12,
    helper_id: 1,
    title: "Getting error message invalid token",
    description: "Even though I am attaching an authorization token into my header, I am getting an error message back saying invalid token",
    tried: "creating new accounts, logging in again to get a new token",
    resolved: 0
  }
]
```

#### PUT */api/tickets/:id/accept*

Accepts the ticket with the id of `:id` as the token holder
Returns an object with the updated ticket's info.

Request:
```javascript
// No input needed
```
Response:
```javascript
{
    id: 1,
    created_at: "2019-12-22 07:44:46",
    updated_at: "2019-12-22 08:52:39",
    student_id: 1,
    category_id: 4,
    helper_id: 2, // <== updated with the token owner's user id
    title: "title",
    description: "description",
    tried: "Attempt 1, Attempt 2",
    resolved: false
}
```

#### PUT */api/tickets/:id/reopen*

Puts the ticket with the id of `:id` back into the queue for another helper to accept it.
Returns an object with the updated ticket's info.

Request:
```javascript
// No input needed
```
Response:
```javascript
{
    id: 1,
    created_at: "2019-12-22 07:44:46",
    updated_at: "2019-12-22 08:52:39",
    student_id: 1,
    category_id: 4,
    helper_id: null, // <== is null now (back in the queue)
    title: "title",
    description: "description",
    tried: "Attempt 1, Attempt 2",
    resolved: false
}
```

#### PUT */api/tickets/:id/resolve*

Marks the ticket as complete by changing the resolved status to `true`
Returns an object with the updated ticket's info.

Request:
```javascript
// No input needed
```
Response:
```javascript
{
    id: 1,
    created_at: "2019-12-22 07:44:46",
    updated_at: "2019-12-22 08:55:39",
    student_id: 1,
    category_id: 4,
    helper_id: 2, 
    title: "title",
    description: "description",
    tried: "Attempt 1, Attempt 2",
    resolved: true // <== won't show up in queue any more
}
```

## **General Routes**
[back to top](#api-user-guide)

#### GET */api/categories*

Returns an array of all available categories

Request:
```javascript
// No input needed
```
Response:
```javascript
[
  {
      id: 1,
      name: "User Interface and Git"
  },
  {
      id: 2,
      name: "Advanced CSS"
  },
  {
      id: 3,
      name: "JavaScript Fundamentals"
  }, 
  ...
]
```