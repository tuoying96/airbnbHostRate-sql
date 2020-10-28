var express = require('express');
var router = express.Router();

// var sqlite3 = require('sqlite3').verbose();
const myDB = require("../db/myDB.js");


/* GET home page. */
router.get("/", function (req, res, next) {
  res.redirect("/hosts");
});

router.get("/hosts", async (req, res) => {
  const page = req.query.page || 1;
  console.log("/hosts", page);

  try {
    const songs = await myDB.getHosts(page);
    // console.log("got songs", songs);
    res.render("hosts", {
      hosts: hosts,
      err: req.session.err,
      msg: req.session.msg,
    });
  } catch (err) {
    console.log("got error", err);
    res.render("hosts", { err: err.message, songs: [] });
  }
});

module.exports = router;
