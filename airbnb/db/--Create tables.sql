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

CREATE TABLE "Guests" (
	"guestid"	INTEGER,
	"name"	TEXT,
	PRIMARY KEY("guestid" AUTOINCREMENT)
);

CREATE TABLE "Listing_Guest" (
	"listingid"	INTEGER,
	"guestid"	INTEGER,
	FOREIGN KEY("listingid") REFERENCES "Listings"("listingid") ON DELETE CASCADE,
	FOREIGN KEY("guestid") REFERENCES "Guests"("guestid") ON DELETE CASCADE
);


-- Queries
-- 1. one query must contain a join of at least three tables, 

SELECT Hosts.hostid, Hosts.name, Hosts.email, Hosts.phone, HostInfo.responseRate, HostInfo.startFrom, Listings.listingName, Listings.price, Listings.rating, Listings.roomType
FROM Hosts, HostInfo, Listings
WHERE Hosts.hostid = HostInfo.hostid AND Hosts.hostid = Listings.hostid;

-- 2. one must contain a subquery, 
SELECT hid, Hosts.name, Hosts.email, ROUND(AVG(listRating), 2) as hostRating
		FROM Hosts, 
		(
		SELECT listingid, hostid as hid, Listings.listingName, AVG(Listings.rating) as listRating
		FROM  Listings
		GROUP BY listingid
		)
		WHERE hid = Hosts.hostid
		GROUP BY hid

-- 3. one must be a group by with a having clause
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
	WHERE HostInfo.hostid = hid
	GROUP BY hid
	HAVING hostRating >2

-- 4. one must contain a complex search criterion (more than one expression with logical connectors). 
-- Experiment with advanced query mechanisms such as RCTE, PARTITION BY, or SELECT CASE/WHEN.
SELECT *, ROW_NUMBER() OVER(PARTITION BY roomType ORDER BY price DESC) RANK
FROM Listings, Hosts
WHERE Listings.hostid = Hosts.hostid AND price IS NOT NULL

-- 5. Experiment with advanced query mechanisms using SELECT CASE/WHEN.
SELECT 
	CASE 
		WHEN price >= 100 THEN 'LUXURY' 
		WHEN price >= 50 AND price < 100  THEN 'MODERATE' 
		WHEN price >= 0 AND price < 50  THEN 'COMFORT' 
	ELSE NULL END price_class, 
	COUNT(*) 
FROM    Listings
WHERE PRICE IS NOT NULL
GROUP BY 
	CASE 
		WHEN price >= 100 THEN 'LUXURY' 
		WHEN price >= 50 AND price < 100  THEN 'MODERATE' 
		WHEN price >= 0 AND price < 50  THEN 'COMFORT' 
       ELSE NULL END

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
	WHERE HostInfo.hostid = hid
	GROUP BY hid
	HAVING hostRating >2

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