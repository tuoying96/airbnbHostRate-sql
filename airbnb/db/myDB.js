var sqlite3 = require("sqlite3").verbose();
const util = require("util");

function myDB() {
  const myDB = {};

  const getDb = () => new sqlite3.Database("./db/airbnb.db");

  myDB.getHosts = function (page) {
    const db = getDb();

    const PAGE_SIZE = 10;     
    const query = `SELECT hid, name, email, HostInfo.startFrom, hostRating
    FROM HostInfo, 
      (
      SELECT hid, Hosts.name, Hosts.email, ROUND(AVG(listRating), 2) as hostRating
      FROM Hosts, 
      (
      SELECT listingid, hostid as hid, Listings.listingName, Listings.rating as listRating
      FROM  Listings
      WHERE listRating > 0
      GROUP BY listingid
      )
      WHERE hid = Hosts.hostid
      GROUP BY hid
      )
    WHERE HostInfo.hostid = hid
    GROUP BY hid
    HAVING hostRating >2
    LIMIT ${PAGE_SIZE} OFFSET ${PAGE_SIZE * (page - 1)};`;

    const allPromise = util.promisify(db.all.bind(db));

    return allPromise(query).finally(() => {
      console.log("done, closing");
      db.close();
    });
  };

  myDB.createHost = function (host) {
    const db = getDb();

    // db.serialize(() => {
    //   // Queries scheduled here will be serialized.
    //   db.run(`INSERT INTO Hosts(name, email, startFrom) VALUES($Name, $Email, "2020-10-24 17:16:38")`)
    //     .run(`INSERT INTO Listings (hostid,listingName, rating) VALUES ((SELECT MAX(hostid) FROM Hosts)`) 
    // });

    const query = `INSERT INTO Hosts(name, email) VALUES($Name, $Email);`
    // const query = `
    // INSERT INTO Hosts(name, email, startFrom) VALUES($Name, $Email, "2020-10-24 17:16:38");
    // INSERT INTO Listings (hostid, listingName, rating) VALUES ((SELECT MAX(hostid) FROM Hosts),  "Pea", 5)
    // INSERT INTO Reviews (listingid,content) VALUES ((SELECT MAX(listingid) FROM Listings), $Review);`;

    const runPromise = util.promisify(db.run.bind(db)); 
    // console.log("after fun promise");

    return runPromise(query, host).finally(() => db.close());
  };

  myDB.createHostInfo = function (host) {
    const db = getDb();
    console.log("I am in createHostInfo");
    const query = `INSERT INTO HostInfo (hostid, responseRate, startFrom) VALUES ((SELECT MAX(hostid) FROM Hosts), $ResponseRate, "10/24/20 17:16")`;
    console.log("Finished Listing");

    const runPromise = util.promisify(db.run.bind(db)); 

    return runPromise(query, host).finally(() => db.close());
  };


  myDB.createListing = function (host) {
    const db = getDb();
    console.log("I am in createListing");
    const query = `INSERT INTO Listings (hostid, listingName, rating) VALUES ((SELECT MAX(hostid) FROM Hosts), $ListingName, 5)`;
    console.log("Finished Listing");

    const runPromise = util.promisify(db.run.bind(db)); 

    return runPromise(query, host).finally(() => db.close());
  };

  myDB.submitReview = function (host) {
    const db = getDb();

    const query = `
    INSERT INTO Reviews (listingid, content) VALUES ((SELECT MAX(listingid) FROM Listings), $Review);`;

    const runPromise = util.promisify(db.run.bind(db)); 

    return runPromise(query, host).finally(() => db.close());
  };


  myDB.updateHost = function (host) {
    const db = getDb();

    const query = `
    UPDATE Hosts
    SET
      name = $Name,
      email = $Email
    WHERE
      hostid = $hostid;`;

    console.log("In  Updateing");
    console.log(host);

    const runPromise = util.promisify(db.run.bind(db));
    console.log(+host.$hostid);
    // console.log(host.$Name);

    return runPromise(query, 
      {
      $hostid: +host.$hostid,
      $Name: host.$Name,
      $Email: host.$Email,
    //   // $phone: host.$phone,
    //   // $responseRate: host.$responseRate,
    //   // $startFrom: host.$startFrom
     }
    )
      .then(() => db)
      .finally(() => db.close());
  };

  myDB.deleteHost = function (hostId) {
    const db = getDb();

    const query = `DELETE FROM Hosts WHERE hostid==$hostid;`;
    
    console.log("Finished Deleting");
    console.log(+hostId);

    const runPromise = util.promisify(db.run.bind(db));

    return runPromise(query, {
      $hostid: +hostId,
    }).finally(() => db.close());
  };

  return myDB;
}

module.exports = myDB();
