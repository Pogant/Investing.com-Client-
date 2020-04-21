# Investing.com-client-
Investing.com interview

To prevent Chrome on CORS blocking pls install http-server
Setup:
Install Node and NPM. 
Install http-server globally by typing 'npm install -g http-server'. 
Then simply run http-server in the project directory: 

Eg. d:\my_project> http-server

Use 'http://localhost:8081' (or the port that was assigned to http-server) to make requests to the server without being CORS-blocked by Chrome.

Make sure that in app.js config variable (line 20) server domain and port we set as required.
