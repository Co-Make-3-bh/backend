# CoMake API

> https://comake-api.herokuapp.com/api

# New Features!

> Last Updated: 7/24/2020 6:57 PM

### Installation

Install the dependencies and start the server.

```sh
$ cd backend
$ npm install
$ npm run server
```

For production environments...

```sh
$ npm run start
```

### Routes

Current Routes Available.

| NAME               | TYPE | REQ                         | RES                                | HEADER |
| ------------------ | ---- | --------------------------- | ---------------------------------- | ------ |
| /api               | GET  | N/A                         | OBJECT                             | N/A    |
| /api/auth/register | POST | {username, password, email} | {user, token}                      | N/A    |
| /api/auth/login    | POST | {email, password}           | {user.email, user.username, token} | N/A    |

### Schemas

#### User

{
username: `String`,
password: `String`,
}

## License

MIT
