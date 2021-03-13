# User Profile

> This repo is a clone of the User Profile service from an AirBnb room listing page.

## Related Projects

  - https://github.com/Mauve-Mishka/title-service
  - https://github.com/Mauve-Mishka/photos-service
  - https://github.com/Mauve-Mishka/summary-service
  - https://github.com/Mauve-Mishka/amenities-service
  - https://github.com/Mauve-Mishka/availability-service
  - https://github.com/Mauve-Mishka/more-places-service

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)

## Usage

> Some usage instructions

## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 6.13.0
- etc

## Development

### Installing Dependencies

From within the root directory:

```sh
npm install -g webpack
npm install
```
## CRUD
CRUD API

GET
Endpoint: http://localhost:5007/users/:userId

Returns a JSON object with user info. For example:
```{"languages":["doggo","duck","chicken"],"_id":"60443ea4ad8703830eeff43d","userId":10201,"__v":0,"avatarUrl":"https://images.app.goo.gl/dJzfRGB8Fz4DS7or9","bio":"I am the cutest little doggo ever.","identityVerified":false,"isSuperhost":false,"joinDate":"2021-03-07T02:49:28.287Z","name":"LucyFur","responseRate":10,"responseTime":"within a month"}```


PUT
Endpoint: http://localhost:5007/users/:userId

If ID is found, it will update existing record. If ID is not found, it will insert a new record.
Return 200 if record is successfully added or updated, return 500 if the operation is unsuccessful.
When updating existing record, it will only update and overwrite values at the given keys. If key(s) is not passed or has a falsey value, it will not overwrite.

Expected request body is a JSON object. For example:
{
  "name": "LucyFur",
  "languages": ["doggo", "duck", "chicken"]
}


DELETE
Endpoint: http://localhost:5007/users/:userId

Will delete user info for a given ID.

For example:

http://localhost:5007/users/100 will delete user record with id of 100.
