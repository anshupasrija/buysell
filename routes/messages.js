/*
 * All routes for Widgets are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

const sendMessages = require("../lib/messageHelper");

module.exports = (db) => {
  router.post("/", (req, res) => {

    sendMessages(req, res);
    res.send('OK');

  });
  return router;
};
