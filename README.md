# Welcome to rbx wallets

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# Create .env file, add the following code:
$ DB_URL=mongodb+srv://fahmi:X4uHGSumpkSCqyDs@cluster0.mh76y.mongodb.net/rblx?retryWrites=true&w=majority
$JWT_SECRET=shhhhh

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

## Deployment and Setup on heroku

To deploy on production using heroku just push commits to the master branch and it will automatically trigger a rebuild and will deploy the new code.

```bash
## add these config vars in env 

$ DB_URL # db url
$ JWT_SECRET # jwt secret for tokens
$ COOKIE # Cookie for the roblox api
$ GROUP_ID # roblox group id
$ DISCORD_WEBHOOK #webhook url for the discord server
```

