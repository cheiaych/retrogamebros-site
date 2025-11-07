# retrogamebros-site

Notes:
```
folder paths for console and product images in assets must be lowercase ie: nintendo, microsoft, nes, gamecube
image filenames themselves can be captialized, as long as they match whats in the Products database
```

Startup: 
```
cd Express
npm run build-and-start
```

Stating with nodemon for auto-restart on save
```
cd Express
npm run dev
```

Starting React
```
cd React
npm start
```

Building/Starting Docker
```
docker compose up

Docker runs with Express as root (WORKDIR ./Express) to match running npm run in Express locally
Port and volume mounting configuration in docker-compose.yml
```