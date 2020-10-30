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
    // await myDB.createListing(host, res);
    // await myDB.createReview(host, res);
    req.session.msg = "Host created";
    res.redirect("/hosts");
  } catch (err) {
    req.session.err = err.message;
    res.redirect("/hosts");
  }
});

router.post("/hosts/createHostInfo", async (req, res) => {
  const host = req.body;
  

  try {
    console.log("Create Hostinfo", host);
    await myDB.createHostInfo(host, res);
    req.session.msg = "HostInfo created";
    res.redirect("/hosts");
  } catch (err) {
    req.session.err = err.message;
    res.redirect("/hosts");
  }
});

router.post("/hosts/createListing", async (req, res) => {
  const host = req.body;

  try {
    console.log("Create Listing", host);
    await myDB.createListing(host, res);
    req.session.msg = "Listing created";
    res.redirect("/hosts");
  } catch (err) {
    req.session.err = err.message;
    res.redirect("/hosts");
  }
});

router.post("/hosts/submitReview", async (req, res) => {
  const host = req.body;

  try {
    console.log("Submit Review", host);
    await myDB.submitReview(host, res);
    req.session.msg = "Review Submitted";
    res.redirect("/hosts");
  } catch (err) {
    req.session.err = err.message;
    res.redirect("/hosts");
  }
});

router.post("/hosts/delete", async (req, res) => {
  try {
    const host = req.body;
    console.log(host);
    await myDB.deleteHost(host.$hostid);
    

    req.session.msg = "Host deleted";
    res.redirect("/hosts");
  } catch (err) {
    console.log("got error update");
    req.session.err = err.message;
    res.redirect("/hosts");
  }
});

router.post("/hosts/update", async (req, res) => {
  try {
    const host = req.body;
    const db = await myDB.updateHost(host);

    console.log("update", db);

    req.session.msg = "Host Updated";
    res.redirect("/hosts");
  } catch (err) {
    console.log("got error update");
    req.session.err = err.message;
    res.redirect("/hosts");
  }
});


module.exports = router;
