# DESCRIPTION

The Project is about making SOAP request to National Weather Service Station to get the Weather Data and other necessary parameters to support the weather information. It is done using entirely JavaScript (NodeJS)

# TECH USED
+ Web Application
+ Frontend
..1. Basics HTML, CSS , JavaScript
..2. XML to Json converter [x2js](https://github.com/abdmob/x2js "XML to JSON convertor")
..3. [Bootstrap Framework](http://getbootstrap.com/ "Bootstrap")
..4. [JQuery Framework](https://jquery.com/ "JQuery")
+ Backend
..1. [Node JS as Backend Server]( https://nodejs.org/en/ "Node JS")
..2. [Express Framework](https://expressjs.com/ "Express JS")
..3. [Socket IO](https://socket.io/ "Socket IO")
..4. [SOAP Strong](https://www.npmjs.com/package/strong-soap) (npm Library to render SOAP request)

# USAGE
### System Installation
- Install NodeJS (See above Link)
- Navigate to the project folder 
``` cd my_project_folder ```
- Type **npm install**, which will install all the libraries present in the package.json file
``` npm install ```
- Type **npm start** to start the project
``` npm start ```

## SCREENSHOT EXAMPLE
- open the browser and type "**localhost:3000**"
- you should get like shown below.
![alt weather_app][weather_app_1]
- Enter the Lat and Long to get the data of the particular area
![alt weather_app][weather_app_2]

[weather_app_1]: https://github.com/Nishank-coder93/gen_images/blob/master/waether_demo_1.png
[weather_app_2]: https://github.com/Nishank-coder93/gen_images/blob/master/waether_demo_2.png

# SOURCES USED FROM
- [Weather Data](https://graphical.weather.gov/xml/mdl/XML/Design/MDL_XML_Design.pdf)
- UI [Code Pen](https://codepen.io/joshbader/pen/EjXgqr)

# FUTURE POSSIBLE IMPLEMENTATIONS
- Map functionality to select the area from map instead of Lat and Long
- Adding place search capability
- Some UI changes