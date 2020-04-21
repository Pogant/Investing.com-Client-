# Investing.com-client-
Investing.com interview

This is simple client based on HTML, CSS and jQuery. 
To prevent Chrome on CORS blocking pls install http-server or use your own server. Otherwise Chrome will block you (You cant send http requests from file:// to http://).  
How to setup http-server: 
Install Node and NPM. 
Install http-server globally by typing 'npm install -g http-server'. 
Then simply run http-server in the project directory: 

Eg. d:\my_project> http-server

Use 'http://localhost:PORT_ASSIGNED_BY_HTTP_SERVER' to make requests to the server without being CORS-blocked by Chrome.

Make sure that in app.js config variable (line 20) server domain and port we set as accordingly.
