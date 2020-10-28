var sqlite3 = require("sqlite3").verbose();
const util = require("util");

function myDB() {
  const myDB = {};

  const getDb = () => new sqlite3.Database("./db/airbnb.sqlite3");

  myDB.getSongs = function (page) {
    const db = getDb();

    const PAGE_SIZE = 10;
    const query = `SELECT TrackId, Name, Composer, UnitPrice, Milliseconds
      FROM tracks
      ORDER BY Milliseconds
      LIMIT ${PAGE_SIZE} OFFSET ${PAGE_SIZE * (page - 1)};`;

    const allPromise = util.promisify(db.all.bind(db));

    return allPromise(query).finally(() => {
      console.log("done, closing");
      db.close();
    });
  };

  myDB.createSong = function (song) {
    const db = getDb();

    const query = `
    INSERT INTO tracks(Name, Milliseconds, MediaTypeId, UnitPrice)
VALUES($Name, $Milliseconds, 1, 1);`;

    const runPromise = util.promisify(db.run.bind(db));

    return runPromise(query, song).finally(() => db.close());
  };

  myDB.updateSong = function (song) {
    const db = getDb();

    const query = `
    UPDATE tracks
    SET
      Name = $Name,
      Milliseconds = $Milliseconds,
      MediaTypeId = $MediaTypeId,
      UnitPrice = $UnitPrice
    WHERE
      TrackId = $TrackId;`;

    const runPromise = util.promisify(db.run.bind(db));

    return runPromise(query, {
      $TrackId: +song.$TrackId,
      $Name: song.$Name,
      $Milliseconds: +song.$Milliseconds,
      $MediaTypeId: 1,
      $UnitPrice: 1.1,
    })
      .then(() => db)
      .finally(() => db.close());
  };

  myDB.deleteSong = function (songId) {
    const db = getDb();

    const query = `
    DELETE FROM tracks WHERE trackId==$trackId;`;

    const runPromise = util.promisify(db.run.bind(db));

    return runPromise(query, {
      $trackId: songId,
    }).finally(() => db.close());
  };

  return myDB;
}

module.exports = myDB();
