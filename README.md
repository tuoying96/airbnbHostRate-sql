# AirbnbHostRate
## Business Documentation  
### User: 
Airbnb  
  Airbnb Host can use this database and management application to manage their profile and check their ratings.  
Hosts  
  Airbnb staff can use this database and application check the status, profile and rating of Hosts. They can also update the rating of Hosts. 
### Rules:
This database aim to be an internal tool to manage Airbnb Host.  
- As for the Data schema, I used the data from Airbnb’s website: http://insideairbnb.com/get-the-data.html.  
- This internal host management tool is used for Airbnb hosts and Airbnb staff to manage the hosts' profile, listing informstion and listing reviews.
- New airbnb hosts can create their account in this application. In the right side of the website, there is a form to submit their name and email to create a new account. Bresides, they will be given a new and unique hostId, which is hidden in this page but will be recorded in the database.
- Airbnb hosts can update their information in this application, for example, update their name and email address
- Airbnb hosts can create new listing in this interface. After they click the "Create New Listing" button, this listing data will be stored in the airbnb.db database.
- Airbnb staff have the access to upddate the rating of hosts based on their listings rating. So, the Rating showed in this page is actually hostRating which is a derived attribute. That means the hostRating does not physical exist in out database, and it is calculated base the the rating attribute in Listings table.
- Both Airbnb staff and Airbnb hosts can submit a review for the lastest listing, and the default rating for this new review is 5.
- The Guests table stores the guests’ data of Airbnb.
- Once guests have stayed in one listing, their record will be paired. 

### Tasks:
The above rules requires us to create three tables and six routes. I used LucidChart to create UML for these tables,
- The first table is Hosts table.
- The second table is HostInfo table.
- The third table is Listings table.
- The forth table is Reviews table.
- The fifth table is Guests table.

- Our database should build appropriate schema for this database, so that each tables can be associate with others and build relationship.
- In the listings table. hostID is the foreign key for this listing. Hence, when we want to delete a host, the corresponding listings with hosted, and reviews in Reviews table with listingid linked with this host should be deleted at the same time. Therefore, we set the foreign keys contains for these foreign keys when create Listings, Reviews schema.
- In order to develop this application, helping Airbnb and Airbnb Host to manage their data, we should have the following APIs to operate our database.
- `/hosts` The home page will redirect to ("/hosts"), which is the main routes. In this page, it shows the Airbnb host database with their name, email, the date they joined Airbnb and most importantly, their hostRating.
- `/hosts/create` The CREATE interface let users to create a new Airbnb user, and post data to database.
- `/hosts/createListing` This route let Airbnb host to create their new listing and post data to database. Besides, because this is a new listing, so I assumen that the default rating for this listing is 5. Later, Airbnb staff can update its rating based on the revires.
- `/hosts/submitReview` This route let Airbnb staff or other users to submit reviews for the newest added lsting and post it to the database.
- `/hosts/delete` This route let us to delete the records in the Hosts table. Besides, because tht hostid in the Hosts table is foreign key in Listings table, and listingid in Listing Table is the foreign key in Reviews Table, all of the related records will bbe deleted.
- `/hosts/update` This route let us to uodate the information and records in the Hosts table.
