DROP TABLE IF EXISTS reservation;
DROP TABLE IF EXISTS client;
DROP TABLE IF EXISTS insurance;
DROP TABLE IF EXISTS travel_option;
DROP TABLE IF EXISTS file_data;
DROP TABLE IF EXISTS hotel;
DROP TABLE IF EXISTS travel;
DROP TABLE IF EXISTS airline_company;
DROP TABLE IF EXISTS city;
DROP TABLE IF EXISTS country;

GO
CREATE TABLE file_data
(
    id INT IDENTITY(1,1),
    name NVARCHAR(100),
    type NVARCHAR(255),
    data VARBINARY(MAX),
    CONSTRAINT PK_file_data PRIMARY KEY (id)
)

GO
CREATE TABLE airline_company
    (
     id INT IDENTITY(1,1) PRIMARY KEY,
     name NVARCHAR(100) NOT NULL ,
     price INT NOT NULL ,
     type NVARCHAR(100) NOT NULL
    )
GO
CREATE TABLE country
    (
     id INT IDENTITY(1,1) PRIMARY KEY,
     name NVARCHAR(100) NOT NULL
    )
GO
CREATE TABLE city
    (
     id INT IDENTITY(1,1) PRIMARY KEY,
     name NVARCHAR(100) NOT NULL ,
     country_id INT NOT NULL,
     constraint FK_city_country foreign key (country_id) references country(id)
    )

GO
CREATE TABLE hotel
(
    id INT IDENTITY(1,1) PRIMARY KEY,
    name NVARCHAR(100) NOT NULL,
    stars_count INT NOT NULL,
    price FLOAT NOT NULL,
    description VARCHAR NOT NULL,
    city_id INT NOT NULL,
    airline_company_id INT NOT NULL,
    CONSTRAINT FK_hotel_city FOREIGN KEY (city_id) REFERENCES city(id),
    CONSTRAINT FK_hotel_airline_company FOREIGN KEY (airline_company_id) REFERENCES airline_company(id)
)

ALTER TABLE hotel
ALTER COLUMN description NVARCHAR(100);


GO
CREATE TABLE insurance
    (
     id INT IDENTITY(1,1) PRIMARY KEY,
     type NVARCHAR(100) NOT NULL ,
     price FLOAT NOT NULL ,
     description NVARCHAR(100) NOT NULL
    )
GO
CREATE TABLE travel
    (
     id INT IDENTITY(1,1) PRIMARY KEY ,
     name NVARCHAR(100) NOT NULL ,
     base_price FLOAT NOT NULL ,
     description NVARCHAR(100) NOT NULL ,
     start_season DATETIME NOT NULL ,
     end_season DATETIME NOT NULL ,
     hotel_id INT NOT NULL ,
     city_id INT NOT NULL,
     file_data_id INT DEFAULT 1,
     constraint FK_travel_hotel foreign key (hotel_id) references hotel(id),
     constraint FK_travel_city foreign key (city_id) references city(id),
     constraint FK_travel_file_data foreign key (file_data_id) references file_data(id),
    )
GO
CREATE TABLE travel_option
    (
     id INT IDENTITY(1,1) PRIMARY KEY ,
     departure_time DATETIME NOT NULL ,
     arrival_time DATETIME NOT NULL ,
     travel_id INT NOT NULL,
     travel_price INT NOT NULL,
     constraint FK_travel_option_travel foreign key (travel_id) references travel(id)
    )
GO
CREATE TABLE client
    (
     id NVARCHAR(100) PRIMARY KEY ,
     email NVARCHAR(100) NOT NULL,
     name NVARCHAR(100) NOT NULL,
     last_name NVARCHAR(100) NOT NULL,
     file_data_id INT DEFAULT 2,
     constraint FK_client_file_data foreign key (file_data_id) references file_data(id),
    )
GO
CREATE TABLE reservation
(
    id INT IDENTITY(1,1),
    reservation_number NVARCHAR(100) NOT NULL,
    isCanceled BIT NOT NULL,
    isAllFood BIT NOT NULL,
    client_id NVARCHAR(100) NOT NULL,
    travel_option_id INT NOT NULL,
    insurance_id INT NOT NULL,
    CONSTRAINT PK_reservation PRIMARY KEY (id, client_id, travel_option_id),
    CONSTRAINT FK_reservation_client FOREIGN KEY (client_id) REFERENCES client(id),
    CONSTRAINT FK_reservation_travel_option FOREIGN KEY (travel_option_id) REFERENCES travel_option(id)
)

CREATE OR ALTER TRIGGER CalculateTravelPrice
ON travel_option
AFTER INSERT
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @DepartureTime DATETIME, @ArrivalTime DATETIME, @TravelID INT, @HotelID INT, @StarsCount INT, @BasePrice FLOAT, @NumOfDays INT, @Price FLOAT;

    SELECT @DepartureTime = i.departure_time, @ArrivalTime = i.arrival_time, @TravelID = i.travel_id
    FROM inserted i;

    SELECT @HotelID = t.hotel_id FROM travel t WHERE t.id = @TravelID;
    SELECT @StarsCount = h.stars_count, @BasePrice = h.price FROM hotel h WHERE h.id = @HotelID;

    SET @NumOfDays = DATEDIFF(DAY, @DepartureTime, @ArrivalTime);
    SET @Price = (@NumOfDays * @BasePrice) + (@StarsCount * 100);

    UPDATE travel_option
    SET travel_price = @Price
    WHERE travel_id = @TravelID AND departure_time = @DepartureTime AND arrival_time = @ArrivalTime;
END;

    -- Inserts for the 'country' table
INSERT INTO country (name) VALUES ('Egypt')
INSERT INTO country (name) VALUES ('France');
INSERT INTO country (name) VALUES ('Italy');
INSERT INTO country (name) VALUES ('Spain');
INSERT INTO country (name) VALUES ('Japan');
INSERT INTO country (name) VALUES ('Greece');

INSERT INTO city (name, country_id) VALUES ('Hurghada', 1);
INSERT INTO city (name, country_id) VALUES ('Paris', 2);
INSERT INTO city (name, country_id) VALUES ('Marseille', 2);
INSERT INTO city (name, country_id) VALUES ('Nice', 2);

-- Italy
INSERT INTO city (name, country_id) VALUES ('Rome', 3);
INSERT INTO city (name, country_id) VALUES ('Venice', 3);
INSERT INTO city (name, country_id) VALUES ('Florence', 3);
INSERT INTO city (name, country_id) VALUES ('Milan', 3);

-- Spain
INSERT INTO city (name, country_id) VALUES ('Barcelona', 4);
INSERT INTO city (name, country_id) VALUES ('Madrid', 4);
INSERT INTO city (name, country_id) VALUES ('Seville', 4);

-- Japan
INSERT INTO city (name, country_id) VALUES ('Tokyo', 5);

-- Greece
INSERT INTO city (name, country_id) VALUES ('Athens', 6);
INSERT INTO city (name, country_id) VALUES ('Santorini', 6);

INSERT INTO hotel (name, stars_count, price, description, city_id, airline_company_id) VALUES ('Ocean View Resort', 5, 300.00, 'Luxury beachfront resort', 1, 1);
INSERT INTO hotel (name, stars_count, price, description, city_id, airline_company_id) VALUES ('Mountain Escape Hotel', 4, 150.50, 'Cozy mountain lodge', 2, 1);
INSERT INTO hotel (name, stars_count, price, description, city_id, airline_company_id) VALUES ('Urban Central Inn', 3, 100.00, 'Convenient city center hotel', 3, 1);
INSERT INTO hotel (name, stars_count, price, description, city_id, airline_company_id) VALUES ('Heritage Grand Hotel', 4, 200.00, 'Historic elegance and comfort', 4, 1);
INSERT INTO hotel (name, stars_count, price, description, city_id, airline_company_id) VALUES ('Skyline Business Hotel', 5, 250.75, 'Modern amenities for business travelers', 5, 1);
INSERT INTO hotel (name, stars_count, price, description, city_id, airline_company_id) VALUES ('Garden Boutique Hotel', 3, 120.00, 'Charming hotel with a garden view', 6, 1);
INSERT INTO hotel (name, stars_count, price, description, city_id, airline_company_id) VALUES ('The Travelers Rest', 2, 80.00, 'Affordable and cozy', 7, 1);
INSERT INTO hotel (name, stars_count, price, description, city_id, airline_company_id) VALUES ('Sunset Beach Hotel', 4, 175.00, 'Beautiful sunset views', 8, 1);
INSERT INTO hotel (name, stars_count, price, description, city_id, airline_company_id) VALUES ('Metropolitan Suites', 5, 300.00, 'Luxurious city experience', 9, 1);
INSERT INTO hotel (name, stars_count, price, description, city_id, airline_company_id) VALUES ('Countryside Inn', 3, 95.00, 'Quiet, scenic country location', 10, 1);

INSERT INTO airline_company (name, price, type) VALUES ('Emirates', 1000, 'LUXURY');

INSERT INTO travel (name, base_price, description, start_season, end_season, hotel_id, city_id, file_data_id) VALUES ('Luxury Beach Escape', 500.00, 'A luxury stay at the Ocean View Resort with beach access', '2024-06-01', '2024-08-31', 1, 1, 1);
INSERT INTO travel (name, base_price, description, start_season, end_season, hotel_id, city_id, file_data_id) VALUES ('Mountain Adventure Week', 350.00, 'A week of hiking and relaxation at Mountain Escape Hotel', '2024-09-01', '2024-11-30', 2, 2, 2);
INSERT INTO travel (name, base_price, description, start_season, end_season, hotel_id, city_id, file_data_id) VALUES ('City Discovery Tour', 400.00, 'Urban exploration with a comfortable stay at Urban Central Inn', '2024-05-01', '2024-07-31', 3, 3, 3);
INSERT INTO travel (name, base_price, description, start_season, end_season, hotel_id, city_id, file_data_id) VALUES ('Heritage City Experience', 450.00, 'Experience the historic wonders while staying at Heritage Grand Hotel', '2024-04-01', '2024-06-30', 4, 4, 4);
INSERT INTO travel (name, base_price, description, start_season, end_season, hotel_id, city_id, file_data_id) VALUES ('Business and Pleasure Trip', 550.00, 'A perfect mix of business and leisure at Skyline Business Hotel', '2024-10-01', '2024-12-31', 5, 5, 5);
INSERT INTO travel (name, base_price, description, start_season, end_season, hotel_id, city_id, file_data_id) VALUES ('Garden Retreat', 300.00, 'A peaceful stay amidst nature at Garden Boutique Hotel', '2024-03-01', '2024-05-31', 6, 6, 6);
INSERT INTO travel (name, base_price, description, start_season, end_season, hotel_id, city_id, file_data_id) VALUES ('Affordable Backpacker Special', 200.00, 'An affordable, cozy spot for backpackers at The Travelers Rest', '2024-07-01', '2024-09-30', 7, 7, 7);
INSERT INTO travel (name, base_price, description, start_season, end_season, hotel_id, city_id, file_data_id) VALUES ('Sunset Beach Holiday', 425.00, 'Romantic sunsets and beach stays at Sunset Beach Hotel', '2024-06-01', '2024-08-31', 8, 8, 8);
INSERT INTO travel (name, base_price, description, start_season, end_season, hotel_id, city_id, file_data_id) VALUES ('Metropolitan Culture Tour', 500.00, 'Experience the city buzz at Metropolitan Suites', '2024-09-01', '2024-11-30', 9, 9, 9);
INSERT INTO travel (name, base_price, description, start_season, end_season, hotel_id, city_id, file_data_id) VALUES ('Countryside Calm', 350.00, 'Relax in the quiet countryside at Countryside Inn', '2024-10-01', '2024-12-31', 10, 10, 10);
INSERT INTO travel (name, base_price, description, start_season, end_season, hotel_id, city_id, file_data_id) VALUES ('Seaside Getaway', 400.00, 'Enjoy the sea and sand at Ocean View Resort', '2024-05-01', '2024-07-31', 1, 1, 11);
INSERT INTO travel (name, base_price, description, start_season, end_season, hotel_id, city_id, file_data_id) VALUES ('Alpine Hiking Adventure', 320.00, 'Trek the trails and relax at Mountain Escape Hotel', '2024-06-01', '2024-08-31', 2, 2, 12);
INSERT INTO travel (name, base_price, description, start_season, end_season, hotel_id, city_id, file_data_id) VALUES ('Urban Art and History', 380.00, 'Explore art galleries and museums while staying at Urban Central Inn', '2024-09-01', '2024-11-30', 3, 3, 13);
INSERT INTO travel (name, base_price, description, start_season, end_season, hotel_id, city_id, file_data_id) VALUES ('Historic Monuments Tour', 430.00, 'Dive into history with a stay at Heritage Grand Hotel', '2024-04-01', '2024-06-30', 4, 4, 14);
INSERT INTO travel (name, base_price, description, start_season, end_season, hotel_id, city_id, file_data_id) VALUES ('City Lights and Business Nights', 520.00, 'Mix work with some urban nightlife at Skyline Business Hotel', '2024-10-01', '2024-12-31', 5, 5, 15);
INSERT INTO travel (name, base_price, description, start_season, end_season, hotel_id, city_id, file_data_id) VALUES (N'Nature Lover’s Retreat', 280.00, 'Stay at Garden Boutique Hotel and enjoy the natural surroundings', '2024-03-01', '2024-05-31', 6, 6, 1);
