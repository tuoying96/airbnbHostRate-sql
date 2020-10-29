--Create tables

CREATE TABLE "Hosts" (
	"hostid"	INTEGER,
	"name"	TEXT,
	"email"	TEXT,
	"phone"	NUMERIC,
	PRIMARY KEY("hostid" AUTOINCREMENT)
);

CREATE TABLE "HostInfo" (
	"hostid"	INTEGER,
	"responseRate"	REAL,
	"startFrom"	TEXT
);

CREATE TABLE "Listings" (
	"listingid"	INTEGER,
	"hostid"	INTEGER NOT NULL,
	"listingName"	TEXT NOT NULL,
	"price"	INTEGER,
	"roomType"	TEXT,
	"rating"	INTEGER,
	"photoUrl"	TEXT,
	PRIMARY KEY("listingid" AUTOINCREMENT),
	FOREIGN KEY("hostid") REFERENCES "Hosts"("hostid") ON DELETE CASCADE
);


CREATE TABLE "Reviews" (
	"reviewid"	INTEGER,
	"listingid"	INTEGER NOT NULL,
	"content"	TEXT,
	PRIMARY KEY("reviewid" AUTOINCREMENT),
	FOREIGN KEY("listingid") REFERENCES "Listings"("listingid") ON DELETE CASCADE
);

-- Read tables
SELECT hid, name, email, HostInfo.startFrom, hostRating
	FROM HostInfo, 
		(
		SELECT hid, Hosts.name, Hosts.email, ROUND(AVG(listRating), 2) as hostRating
		FROM Hosts, 
		(
		SELECT listingid, hostid as hid, Listings.listingName, AVG(Listings.rating) as listRating
		FROM  Listings
		GROUP BY listingid
		)
		WHERE hid = Hosts.hostid
		GROUP BY hid
    )
	WHERE HostInfo.hostid = hid AND hostRating > 2
	GROUP BY hid

-- Create records
INSERT INTO Hosts(name, email) 
	VALUES($Name, $Email);
INSERT INTO HostInfo (hostid, responseRate, startFrom) 
	VALUES ((SELECT MAX(hostid) FROM Hosts), $ResponseRate, "10/24/20 17:16");
INSERT INTO Listings (hostid, listingName, rating) 
	VALUES ((SELECT MAX(hostid) FROM Hosts), $ListingName, 5);
INSERT INTO Reviews (listingid, content) 
	VALUES ((SELECT MAX(listingid) FROM Listings), $Review);

-- Update records
UPDATE Hosts
    SET
      name = $name,
      email = $email,
      startFrom = $startFrom
    WHERE
      hostid = $hostid;

-- Delete records
DELETE FROM Hosts WHERE hostid==$hostid;