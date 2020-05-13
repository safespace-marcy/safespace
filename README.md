# Safe Space

Many people have had traumatic events occur in their life that lingers with them for years. Being unable to share how we feel, or not having the resources to do so with professionals, we risk having to deal with these experiences on our own. Survivor Network provides a platform for individuals seeking a safe community where they can share their feelings and experiences. A place that they can find relief and talk to those who can relate.


## Team

  - __Product Owner__: Enmanuel de la Nuez
  - __Scrum Master__: Devonte Duncan
  - __Development Team Members__: Anne Hyacinthe, Cielo Raymundo

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Tasks](#tasks)
1. [Team](#team)
1. [Contributing](#contributing)

## Usage

> Some usage instructions for getting the app up and running locally

## Requirements

- Node 0.10.x
- Axios 0.19.2.x
- Postgresql 9.1.x
- Express 4.17.1.x
- Dotenv 8.2.0.x
- PG 8.1.0.x

## Development

### Installing Dependencies

From within the root directory:

```sh
npm install 
```

From within the `client` directory:
```sh
npm install 
npm start
```

### Roadmap

View the project roadmap [here](https://github.com/safespace-marcy/safespace/projects).


## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.


## Style Guide

This project adheres to the [StandardJS Style Guide](https://github.com/standard/standard).

## Entity-Relationship Diagram

![](./diagram.png)

## Table Definitions

```sql
CREATE TABLE users(
  id SERIAL PRIMARY KEY,
  username varchar(32) UNIQUE NOT NULL,
  email varchar(50) UNIQUE NOT NULL,
  password text NOT NULL
);

CREATE TABLE communities(
  id SERIAL PRIMARY KEY,
  username varchar(32) UNIQUE NOT NULL
);

CREATE TABLE posts(
  id SERIAL PRIMARY KEY,
  id integer REFERENCES users NOT NULL,
  id integer REFERENCES communities NOT NULL,
  content text, 
  time_made timestamp NOT NULL
);

CREATE TABLE community_users(
  id SERIAL PRIMARY KEY,
  id integer REFERENCES users NOT NULL,
  id integer REFERENCES communities NOT NULL
);

```
