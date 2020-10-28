# AirbnbHostRate
## Business Documentation  
### User: Airbnb Hosts
### Rules:
This database aim to be an internal tool to manage Airbnb Host.  
- As for the Data schema, I used the data from Airbnb’s website: http://insideairbnb.com/get-the-data.html.  
- This internal host management tool is used for Airbnb hosts and Airbnb staff to manage the hosts' profile, listing informstion and listing reviews.
- New airbnb hosts can create their account in this application. In the right side of the website, there is a form to submit their name and email to create a new account. Bresides, they will be given a new and unique hostId, which is hidden in this page but will be recorded in the database.
- Airbnb hosts can update their information in this application, for example, update their name and email address
- Airbnb hosts can create new listing in this interface. After they click the "Create New Listing" button, this listing data will be stored in the airbnb.db database.
- Airbnb staff have the access to upddate the rating of hosts based on their listings rating. So, the Rating showed in this page is actually hostRating which is a derived attribute. That means the hostRating does not physical exist in out database, and it is calculated base the the rating attribute in Listings table.
- Both Airbnb staff and Airbnb hosts can submit a review for the lastest listing, and the default rating for this new review is 5.
### Tasks:
The above rules requires us to create six routes
- `/hosts` The home page will redirect to ("/hosts"), which is the main routes. In this page, it shows the Airbnb host database with their name, email, the date they joined Airbnb and most importantly, their hostRating.
- `/hosts/create` The CREATE interface let users to create a new Airbnb user, and post data to database.
- `/hosts/createListing` This route let Airbnb host to create their new listing and post data to database. Besides, because this is a new listing, so I assumen that the default rating for this listing is 5. Later, Airbnb staff can update its rating based on the revires.
- `/hosts/submitReview` This route let Airbnb staff or other users to submit reviews for the newest added lsting and post it to the database.
- `/hosts/delete` This route let us to delete the records in the Hosts table. Besides, because tht hostid in the Hosts table is foreign key in Listings table, and listingid in Listing Table is the foreign key in Reviews Table, all of the related records will bbe deleted.
- `/hosts/update` This route let us to uodate the information and records in the Hosts table.




  
- Conceptual model: create a diagram you can share with clients  
[expect to see Lucci Chat]  
Attributes can have multiple values  
attribut types  

  


Tasks
- (10 pts) Describe the requirements of the problem with a simple document that lists the rules of the database in the problem domain language. Then describe a list of business rules and the list of possible nouns and actions you identified. I'm expecting this to be a short 1 or 2 pages document.  
This database aim to be an internal tool to manage Airbnb Host.  
- (15 pts) Analyze the problem and create a conceptual model in UML using a tool of your choice (e.g., LucidChart, Enterprise Architect, ArgoUML, Visual Paradigm, ERwin, TOAD) as discussed during class and provided in the references and resources below. Additional requirements and clarifications will be provided in the #general channel on Slack. The diagram must contain at least three classes, at least one to many relationship and one many to many. All relationships, except generalization, must have full multiplicity constraints and labeled as appropriate. Classes must have proper names, descriptions, and attributes with domain types. Key attributes and derived attributes must be marked. Don't build a model with more than 10 entities.
- (10 pts) From the Conceptual Model, construct a logical data model expressed as an ERD using a language of your choice (other than UML) and a tool of your choice. The logical data model may not have any many-to-many relationships, so introduce association entities as needed.  
The type of database, ERD, 
  
- (15 pts) From the logical model, define a relational schema in at least BCNF. Using functional dependencies, show that the schema in in at least BCNF.  
Using functional dependencies
All tables must have a key  
compuong key  





- (10 pts) Create a set of SQL data definition statements for the above model and realize that schema in SQLite3 by executing the script from the SQLite3, the console or Node. You can use DB Browser to generate these statements. Show that the tables were created and conform to the constraints through screen shots or other means.

Using SB Browser  


- (10 pts) Populate the tables with test data. You can use tools such as https://www.mockaroo.com/schemas (Links to an external site.) or  https://www.generatedata.com/ (Links to an external site.).
- (10 pts) Define and execute at least five queries that show your database. At least one query must contain a join of at least three tables, one must contain a subquery, one must be a group by with a having clause, and one must contain a complex search criterion (more than one expression with logical connectors). Experiment with advanced query mechanisms such as RCTE, PARTITION BY, or SELECT CASE/WHEN.
- (20 pts) Create a basic Node + Express application that let's you create, display, modify and delete at least to of the tables with a foreign key between then. No need to have a polished interface, and you can use the code created in class as a starting point
### issues
cp ~/.eslintrc.js .   