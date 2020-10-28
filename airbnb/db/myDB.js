var sqlite3 = require("sqlite3").verbose();
const util = require("util");

function myDB() {
  const myDB = {};

  const getDb = () => new sqlite3.Database("./db/airbnb.db");

  myDB.getHosts = function (page) {
    const db = getDb();

    const PAGE_SIZE = 10;     
    const query = `SELECT hid, Hosts.name, Hosts.email, Hosts.startFrom, ROUND(AVG(listRating), 2) as hostRating
    FROM Hosts,
    (
    SELECT listingid, hostid as hid, Listings.listingName, AVG(Listings.rating) as listRating
    FROM  Listings
    GROUP BY listingid
    )
    WHERE hid = Hosts.hostid
    GROUP BY hid
    LIMIT ${PAGE_SIZE} OFFSET ${PAGE_SIZE * (page - 1)};`;

    const allPromise = util.promisify(db.all.bind(db));

    return allPromise(query).finally(() => {
      console.log("done, closing");
      db.close();
    });
  };

  myDB.createHost = function (host) {
    const db = getDb();

    const query = `
    INSERT INTO Hosts(name, email, startFrom) VALUES($Name, $Email, "2020-10-24 17:16:38");
    INSERT INTO Listings (hostid,listingName, rating) VALUES ((SELECT MAX(hostid) FROM Hosts), "New listing", 5);
    INSERT INTO Reviews (listingid,rating) VALUES ((SELECT MAX(listingid) FROM Listings), 5);`;

    const runPromise = util.promisify(db.run.bind(db)); 

    return runPromise(query, host).finally(() => db.close());
  };


  // myDB.createListing = function (host) {
  //   const db = getDb();

  //   const query = `INSERT INTO Listings (hostid,listingName, rating) VALUES ((SELECT MAX(hostid) FROM Hosts), "New listing", 5);`;

  //   const runPromise = util.promisify(db.run.bind(db)); 

  //   return runPromise(query, host).finally(() => db.close());
  // };

  // myDB.createReview = function (host) {
  //   const db = getDb();

  //   const query = `
  //   INSERT INTO Reviews (listingid,rating) VALUES ((SELECT MAX(listingid) FROM Listings), 5);`;

  //   const runPromise = util.promisify(db.run.bind(db)); 

  //   return runPromise(query, host).finally(() => db.close());
  // };


  myDB.updateHost = function (host) {
    const db = getDb();

    const query = `
    UPDATE Hosts
    SET
      name = $name,
      email = $email,
      startFrom = $startFrom
    WHERE
      hostid = $hostid;`;

    const runPromise = util.promisify(db.run.bind(db));

    return runPromise(query, {
      $hostid: +host.$hostid,
      $name: host.$name,
      $email: host.$email,
      $phone: host.$phone,
      $responseRate: host.$responseRate,
      $startFrom: host.$startFrom
    })
      .then(() => db)
      .finally(() => db.close());
  };

  myDB.deleteHost = function (hostid) {
    const db = getDb();

    const query = `
    DELETE FROM Hosts WHERE hostid==$hostid;`;

    const runPromise = util.promisify(db.run.bind(db));

    return runPromise(query, {
      $hostid: hostid,
    }).finally(() => db.close());
  };

  return myDB;
}

module.exports = myDB();
