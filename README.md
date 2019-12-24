# API DOCS

## Authentication Routes

* /api/auth/register

```javascript
{
  email: "example@email.com", // string (required) [ must be in proper email format ]
  password: "abc123!", // string (required) [ min. 6 total characters | min. 1 special character | min. 1 digit ]
  first_name: "firstname", // string (required)
  last_name: "lastname", // string (required)
  role_id: 1 // integer (required)
}
```

* /api/auth/login