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

| NAME                              | TYPE   | REQ                                                                | RES                                 | HEADER        |
| --------------------------------- | ------ | ------------------------------------------------------------------ | ----------------------------------- | ------------- |
| /api                              | GET    | N/A                                                                | OBJECT                              | N/A           |
| /api/auth/register                | POST   | {username, password, email}                                        | {user, token}                       | N/A           |
| /api/auth/login                   | POST   | {email, password}                                                  | {user.email, user.username, token}  | N/A           |
| /api/concerns                     | GET    | N/A                                                                | ARRAY                               | Authorization |
| /api/concerns                     | POST   | {title, description, createdBy}                                    | AFFECTED                            | Authorization |
| /api/concerns/createdBy/userId    | GET    | N/A                                                                | ARRAY                               | Authorization |
| /api/concerns/byZip/zip           | GET    | N/A                                                                | ARRAY                               | Authorization |
| /api/concerns/postId              | PUT    | Object with key value updates, the whole object or just part of it | AFFECTED                            | Authorization |
| /api/concerns/postId              | DELETE | N/A                                                                | Success Message                     | Authorization |
| /upvotes/:postId/:userId          | PUT    | N/A                                                                | New Post Object                     | Authorization |
| /downvote/:postId/:likeId/:userId | PUT    | N/A                                                                | Returns list of liked posts by user | Authorization |

### Schemas

#### User

{
username: `String`,
password: `String`,
}

## License

MIT
