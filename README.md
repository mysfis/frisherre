### git add .
### git commit -am "smth here"
### git push heroku master
### pipenv shell
### python manage.py makemigrations api
### python manage.py migrate
### python manage.py runserver
### yarn run storybook

curl http://localhost:8000/api/token/ -X POST   -H "Content-Type: application/json"   -d '{"email": "bruno.cochard@gmail.com", "password": "xxx"}'

curl http://localhost:8000/api/users/ -H  "Authorization: Bearer xxx"
curl http://localhost:8000/api/outings/ -H  "Authorization: Bearer xxx"

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.


### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

### `npm run eject`
**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

## Deployment
Deploy on heroku
### connect to heroku git
$ heroku login
$ git init
$ heroku git:remote -a keluno
### set config for dynos
$ heroku buildpacks:set heroku/python
$ heroku buildpacks:add --index 1 heroku/nodejs
specify engines in package.json
add Procfile for heroku
verify requirements.text
add runtime.txt
set whitenoise in settings.py
add appUrl in ALLOWED_HOSTS in settings.py
add TemplateView in django URLs.py
### push code to git heroku
$ git add .
$ git commit -am "initial commit"
$ git push heroku master
$ heroku run bash