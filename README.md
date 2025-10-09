# College-social-life-app
We are making college social life app that connects students, faculty, and organizations in one place. Students can communicate with each other and faculty, while organizations promote events and activities. The app also highlights upcoming events and important announcements, keeping the campus community informed and engaged.

# commands run
- npm init -y
- npm install express
- used node server to run the server for now! 
- npm install ejs
- npm install cors

# Commands run for frontend
- npm create vite@latest (make sure to install with npm)

# Homepage Data Flow Example

```text
Browser
   |
   | 1. User visits URL: GET /
   v
Express App (app.js)
   |
   | 2. app.js sees:
   |      app.use('/', homeRoutes)
   v
Router (homeRoutes)
   |
   | 3. Router matches the route:
   |      router.get('/', homeController.showHomepage)
   v
Controller (homeController)
   |
   | 4. Controller logic:
   |      res.render('homepage')   <-- renders the homepage.ejs template
   v
View (homepage.ejs)
   |
   | 5. HTML is sent back to the browser
   v
Browser
   |
   | 6. Browser displays the homepage
