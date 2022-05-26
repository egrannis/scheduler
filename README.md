# Interview Scheduler
The Interview Scheduler is single page application that acts as a simple interview appointment scheduling tool. Users are able to book, edit, and cancel interviews.

This project was created using Create React App. A complete list of the technologies used to build this application can be seen below: 

`Client-Side:`
 - [React](https://reactjs.org/)
 - [Webpack](https://webpack.js.org/)
 - [Babel](https://babeljs.io/)
 - [Axios](https://www.npmjs.com/package/axios)
 - [SASS](https://sass-lang.com/)

`Server-Side:`
- [Node.js](https://nodejs.org/en/)
- [Express](https://expressjs.com/)
- [PostgreSQL](https://www.postgresql.org/)

`Testing:`
- [Storybook](https://storybook.js.org/)
- [Webpack Dev Server](https://github.com/webpack/webpack-dev-server)
- [Jest](https://jestjs.io/)
- [React Testing Library](https://testing-library.com/)
- [Cypress](https://www.cypress.io/)


# Screenshots
!["Enter a student name into the form and select an nterviewer"](https://github.com/egrannis/scheduler/blob/master/docs/Form-Entering-Student-Name-And-Saving.png?raw=true)

# Setup

Clone this repository to your machine and install dependencies by:
```sh
git clone git@github.com:egrannis/scheduler.git
cd scheduler
npm install
 ```

Ensure that that your package.json file under "dependencies" and "devDependencies" includes:

- axios
- @testing-library/react-hooks
- react-test-renderer
- react-dom
- react-scripts
- classnames
- normalize.css
- prop-types
- node-sass
- cypress

## Database + API Server Setup

Clone this [scheduler-api](https://github.com/egrannis/scheduler-api) github repository to your machine:

```sh
git clone git@github.com:egrannis/scheduler-api
```
Follow the setup instructions in the [scheduler-api README file](https://github.com/egrannis/scheduler-api) to set up your API server.

## Running Webpack Development Server

```sh
cd /scheduler
npm start
```

## Running Jest Test Framework

```sh
cd /scheduler
npm test
```

## Running Storybook Visual Testbed
```sh
cd /scheduler
npm run storybook
```
# Using The Application
- Click through any day in the `menu bar` on the `left side` of the page to view available appointment slots for each day.

- Create a new appointment in an available slot by pressing the `+ icon`.

- `Enter your name` in the `form field` that shows the placeholder 'Enter Student Name'.

- `Select an interviewer` from the list by hovering over the icon and clicking it. 

- Click `Save` at the bottom right and the page will indicate that the appointment is 'Saving'. Then, you will see your newly created appointment right on your screen. 

- If you made a mistake in creating an appointment, no worries! There are both functional `edit` and `delete` options.

- To `edit` an appointment, hover over that appointment and click on the `edit icon` at the `bottom right` of the appointment card. You can then change the student name input and/or select a different interviewer and press save.

- To `delete` an appointment, hover over that appointment and click on the `delete icon` at the `bottom right` of the appointment card. A message will pop up asking if you are sure you want to delete the appointment. Click `confirm` and it will indicate that it is deleting your appointment, and then you will see an empty slot where your appointment was originally. If you click `cancel` when presented with the confirmation message, it will simply bring you back to the view of your appointment.

- Enjoy!
