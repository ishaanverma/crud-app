# CRUD App

This app requires docker to run. For installing docker refer to `https://docs.docker.com/get-docker/`

## Setup
```sh
git clone https://github.com/ishaanverma/crud-app.git
cd crud-app
docker-compose up -d
```

Log on to `http://localhost:3000/`

The client will run on port `3000` and the server will run on port `4000`.

## TODO
- [x] CREATE endpoint for inventory items
- [x] READ endpoint for inventory items
- [x] UPDATE endpoint for inventory items
- [x] DELETE endpoint for inventory items
- [x] Download CSV endpoint for inventory items
