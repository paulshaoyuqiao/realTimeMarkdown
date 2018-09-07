# realTimeMarkdown

This web application allows users to edit in markdown language simultaneously and preview the results in real time. Upon creating a document and appending its name (proceeded by a backslash `/`) to the end of the website, you can share its url with your friends and edit the document at the same time. All of the participants will be able to view the changes from each other in real time as well.

There are the technologies used in this application:

### Front End:
* **Bootstrap 4** (_Updated_)(formatting and splitting the screen in half)

### Back End:
* **showndown** (converting markdown to viewable html)
* **express.js** (backend server framework)
* **RedisToGo** (storing all markdown documents)
* **share.js** (supporting real-time editing of the same document)

Here is the link to the app (now deployed on Heroku):
https://paulshao-rtmarkdown.herokuapp.com/
