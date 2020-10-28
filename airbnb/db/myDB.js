var sqlite3 = require("sqlite3").verbose();
const util = require("util");

function myDB() {
  const myDB = {};

  const getDb = () => new sqlite3.Database("./db/airbnb.sqlite3");

  myDB.getHosts = function (page) {
    const db = getDb();

    const PAGE_SIZE = 10;
    const query = `SELECT Hosts.name, Hosts.startFrom
    FROM Hosts;`;

    const allPromise = util.promisify(db.all.bind(db));

    return allPromise(query).finally(() => {
      console.log("done, closing");
      db.close();
    });
  };

  myDB.createHost = function (host) {
    const db = getDb();

    const query = `
    INSERT INTO Hosts(name, email)
VALUES($Name, $Email, "Anonymity", "@email.com");`;

    const runPromise = util.promisify(db.run.bind(db));

    return runPromise(query, host).finally(() => db.close());
  };

  // myDB.updateSong = function (song) {
  //   const db = getDb();

  //   const query = `
  //   UPDATE tracks
  //   SET
  //     Name = $Name,
  //     Milliseconds = $Milliseconds,
  //     MediaTypeId = $MediaTypeId,
  //     UnitPrice = $UnitPrice
  //   WHERE
  //     TrackId = $TrackId;`;

  //   const runPromise = util.promisify(db.run.bind(db));

  //   return runPromise(query, {
  //     $TrackId: +song.$TrackId,
  //     $Name: song.$Name,
  //     $Milliseconds: +song.$Milliseconds,
  //     $MediaTypeId: 1,
  //     $UnitPrice: 1.1,
  //   })
  //     .then(() => db)
  //     .finally(() => db.close());
  // };

  // myDB.deleteSong = function (songId) {
  //   const db = getDb();

  //   const query = `
  //   DELETE FROM tracks WHERE trackId==$trackId;`;

  //   const runPromise = util.promisify(db.run.bind(db));

  //   return runPromise(query, {
  //     $trackId: songId,
  //   }).finally(() => db.close());
  // };

  return myDB;
}

module.exports = myDB();
