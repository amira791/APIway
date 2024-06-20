
* This folder contains the Django app with all the necessary files : 
     - settings.py : for Django app configuration, in this file you can change the database you want to work with in the DATABASE section.
     - urls.py : contains the urls related to the app 
     - models.py: contains the models structures which represents the data stored in db 
     - serializes.py: used to send data from backend to frontend in a structured format such as JSON
     - view.py : for some backend logics
* Frontend Folder: 
Contains the react app with the different necessary files 
    - API.js: this file contains the configuration of the base url of the app 
    - Components : front end logic
    - Hooks : manage communication from frontend to backend using the base url defined in API.js 

* To Run and use the app you should:
  - open two parallel terminals
  -  use the first terminal to run the react app: enter the frontend folder and run :
    - npm install
    - npm start

- use the second terminal to run the Django app:
     - pip install
     - python manage.py makemigrations 
     - python manage.py migrate
     - python manage.py runserver
