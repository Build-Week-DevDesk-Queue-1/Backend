# **API User Guide**

### **Authentication Routes**

###  **User Registration**:

### POST */api/auth/register*

Creates a new user account.
Returns an object with user info and a JSON web token.

Input:
```javascript
{
  email: "example@email.com", // string (required) [ must be in proper email format ]
  password: "abc123!", // string (required) [ min. 6 total characters | min. 1 special character | min. 1 digit ]
  first_name: "firstname", // string (required)
  last_name: "lastname", // string (required)
  role_id: 1 // integer (required) [ must be a valid role id ]
}
```
Output:

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
### POST */api/auth/login*

Validates user's credentials.
Returns an object with user info and a JSON web token.

Input:
```javascript
{
  email: "example@email.com", // string (required)
  password: "abc123!", // string (required)
}
```

Output:
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

### **Student Actions**:

### PUT */api/tickets/:id*

Updates an existing ticket using the `:id` in the URL as the ticket's id.
The ticket can only be updated by the users associated with it (creator/assigned helper).
Must include at least one of the three fields in the example input below.
Returns an object with the updated ticket's info.

Input:
```javascript
{
  title: "Updated Title", // string (optional)
  description: "This is an updated description", // string (optional)
  tried: "Attempt 1, Attempt 2, updated Attempt 3", // string (optional)
}
```
Output:
```javascript
{
    id: 1,
    created_at: "2019-12-22 07:44:46",
    updated_at: "2019-12-22 08:40:22",
    student_id: 2,
    category_id: 3,
    helper_id: 1,
    title: "test title new",
    description: "this is a description new",
    tried: "I tried doing many things new",
    resolved: false
}
```