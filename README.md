# Final Adv

## Requirements
**Note: I made adjustments to scope based on original idea**

- The application I'm going to build is called TabbyTales.  It’s going to be a daily journal application designed for Cats. Similar to Facebook, MySpace, or Instagram.    

This application will feature:
- Profile
- Posts(Blogs)
- Added Geolocation (https://ionicframework.com/docs/native/geolocation)
- Added Share (https://ionicframework.com/docs/native/share)

The application will utilize:
- MongoDB 
- Google Locator API
- User Interface

## Build
```bash
# install mongodb
brew install mongodb-community@7.0
# start server, dont' start via mongod
brew services start mongodb-community@7.0
# database
mongosh blog
# stop server
brew services stop mongodb-community@7.0
```

## Start Sever
```bash
cd express_server
# Deny location data if both GOOGLE_API_KEY/GOOGLE_ENDPOINT are not provided
# This step can be skipped if denying
vi .env # must add two environment variables
# add GOOGLE_ENDPOINT = 'https://maps.googleapis'
# add GOOGLE_API_KEY = ''

npm install
npm start

# test

# get, use browser
http://localhost:8080/api/blogs

```

## Run Ionic
```bash
cd ionic_app
npm install
ionic serve
```
## Screenshots
![screenshot](/screenshots/screenshot1.png)
![screenshot](/screenshots/screenshot2.png)
![screenshot](/screenshots/screenshot3.png)
![screenshot](/screenshots/screenshot4.png)
![screenshot](/screenshots/screenshot5.png)
![screenshot](/screenshots/screenshot6.png)
![screenshot](/screenshots/screenshot7.png)
![screenshot](/screenshots/screenshot8.png)
![screenshot](/screenshots/screenshot9.png)
![screenshot](/screenshots/screenshot10.png)


## References:  
Images provided by: https://www.flaticon.com/