/**
 * This file contains the Home component.
 * Other React components for viewing notes and notebooks should be nested
 * beneath the Home component.
 */

const React = require('react');

const NotebookList = require('./NotebookList');

/*
  *** TODO: Start building the frontend from here ***
  You should remove the placeholder text and modify the component as you see
  fit while working on the assignment.
*/
const Home = () => (
  <div className="container">
    <h1>Neverwrote</h1>
    <p>
      Really don't understand why it is named Neverwrote. Oh well.
    </p>
    <NotebookList />
  </div>
);

module.exports = Home;
