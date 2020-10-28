var express = require('express');
var router = express.Router();

const myDB = require("../db/myDB.js");


/* GET home page. */
router.get("/", function (req, res, next) {
  res.redirect("/hosts");
});

router.get("/hosts", async (req, res) => {
  const page = req.query.page || 1;
  console.log("/hosts", page);

  try {
    const hosts = await myDB.getHosts(page);
    // console.log("got hosts", hosts);
    res.render("hosts", {
      hosts: hosts,
      err: req.session.err,
      msg: req.session.msg,
    });
  } catch (err) {
    console.log("got error", err);
    res.render("hosts", { err: err.message, hosts: [] });
  }
});

router.post("/hosts/create", async (req, res) => {
  const host = req.body;

  try {
    console.log("Create host", host);
    await myDB.createHost(host, res);
    req.session.msg = "Host created";
    res.redirect("/hosts");
  } catch (err) {
    req.session.err = err.message;
    res.redirect("/hosts");
  }
});

module.exports = router;
