-- Insert data into the airline table
INSERT INTO airline (airline_name) VALUES 
('Jet Blue'),
('American Airlines'), 
('Air India'),
('Delta Air Lines'),
('Lufthansa'),
('Emirates'),
('Southwest Airlines'),
('Spirit Airlines'),
('United Airlines'),
('Air France'),
('Grey Bandit Airlines'),
('Madrid Airways')
;

-- Insert data into the airline_staff table
INSERT INTO airline_staff (userName, passcode, first_name, last_name, date_of_birth, airline_name) VALUES
('JetBlueHero55', 'IloveJetBlue123', 'Jason', 'Kingston', '03/14/2002', 'Jet Blue'),
('flBerg587', 'nyGiants123', 'Florence', 'Berg', '08-31-1993', 'Air France'),
('jsesh', 'cookiemonster42', 'Jahnvi', 'Seshadri', '03-14-2002', 'Emirates'),
('sadas908', 'stuytown', 'Sahil', 'Das', '07-19-2000', 'Spirit Airlines'),
('sadesai#2', 'parsippany', 'Suneet', 'Desai', '08-20-2002', 'Air India'),
('nishvinder', 'herricks2020', 'Nishi', 'Shah', '11-25-1998', 'Grey Bandit Airlines'),
('jackieswish', 'theAlabama111', 'Jackie', 'Swick', '02-08-1989', 'Southwest Airlines'),
('riap344', 'akpsi', 'Ria', 'Patel', '06-26-1995', 'Madrid Airways'),
('aniswar', 'london', 'Anisa', 'Sarwar', '04-23-2001', 'Lufthansa'),
('keviins234', 'sofprezzz', 'Keviin', 'Shah', '07-09-1990', 'American Airlines'),
('nibarP886', 'dentalschool', 'Nihar', 'Patel', '06-29-2002', 'Air India')
;

INSERT INTO airplane (airplane_id, num_of_seats, manufactoring_comp, manufactoring_date, age, airline_name) VALUES
('HSR78', 220, 'Lockheed Martin', '04-20-2005', 17, 'Air France'),
('JSH84', 192, 'Boeing', '03-22-2003', 20, 'United Airlines'),
('AEKD2', 144, 'Airbus', '11-13-2011', 11, 'Grey Bandit Airlines'),
('WED#4', 80, 'Textron', '01-01-2013', 10, 'Air France'),
('QWE24', 166, 'Dassault Aviation', '02-03-2000', 23, 'Madrid Airways'),
('SHFJ7', 193, 'Embraer', '12-02-2021', 1, 'Delta Air Lines'),
('ARPT9', 144, 'Korea Aerospace Industries', '06-23-2010', 12, 'Lufthansa'),
('YNH84', 334, 'Airbus', '05-02-1999', 23, 'Spirit Airlines'),
('KLSD3', 283, 'Boeing', '12-31-2003', 19, 'Air India'),
('DZJ21', 48, 'Lockheed Martin', '07-04-1995', 27, 'American Airlines'),
('PRE4J', 255, 'Airbus', '10-17-2005', 17, 'Emirates'),
('BNSR4', 131, 'Boeing', '09-25-2001', 21, 'Southwest Airlines'),
('DA440', 124, 'Airbus', '04/18/1988', 35, 'Jet Blue'),
('SA770', 182, 'Airbus', '01/15/2002', 21, 'Jet Blue'),
('UA150', 318, 'Boeing', '10/26/2009', 14, 'Jet Blue')
;

INSERT INTO airport (airport_code, airport_name, city, country, airport_type) VALUES
('ATL', 'Hartsfield-Jackson Atlanta International Airport', 'Atlanta', 'United States', 'Both'),
('DFW', 'Dallas Fort Worth International Airport', 'Dallas-Fort Worth', 'United States', 'International'),
('DXB', 'Dubai International Airport', 'Garhoud', 'United Arab Emirates', 'International'),
('DTW', 'Detroit Metro Airport', 'Detroit', 'United States', 'Domestic'),
('LGA', 'LaGuardia Airport', 'New York', 'United States', 'Domestic'),
('PVD', 'T.F. Green International Airport', 'Warwick', 'United States', 'Both'),
('LCY', 'London City Airport', 'London', 'United Kingdom', 'Both'),
('JFK', 'John F. Kennedy Airport', 'New York', 'United States', 'Both'),
('PVG', 'Shanghai Pudong Airport', 'Shanghai', 'China', 'Both')
;

INSERT INTO customer (email_address, first_name, last_name, date_of_birth, passcode, building_num, street, apt, city, state, zipCode, passport_num, passport_country, passport_expiration) VALUES
('rheas@gmail.com', 'Rhea', 'Sathnur', '11-23-2003', 'nishi123', 14, 'Palladium St', '6A', 'New York', 'New York', '10009', 39492049, 'United States', '05-29-2029'),
('chrisO34@yahoo.com', 'Chris', 'Olmedo', '01-22-2001', 'bestRunner1!', 56, 'Clark St', '4D', 'Brooklyn', 'New York', '11201', 12932011, 'United States', '08-01-2025'),
('rahulsur22@hotmail.com', 'Rahul', 'Surana', '12-03-2001', 'financebro355', 355, 'Ave B', 'BSMT', 'New York', 'New York', '10003', 47527382, 'United States', '11-03-2026'),
('arnachoksi99@gmail.com', 'Arna', 'Choksi', '11-05-2002', 'physicsGod339', 14, 'Palladium St', '12E', 'New York', 'New York', '10009', 58492940, 'United States', '04-04-2034'),
('deepsvni29@gmail.com', 'Deep', 'Savani', '10-18-1984', 'nyit4life', 37, 'Hillside Ave', '1B', 'Queens', 'New York', '10409', 67329503, 'United States', '02-09-2030'),
('nishas@gmail.com', 'Nisha', 'Shah', '03-14-1997', 'luvmaryland123', 920, 'Maryland St.', null, 'Annapolis', 'Maryland', '21207', 19483949, 'United States', '03-04-2032'),
('maanavsavani239@gmail.com', 'Maanav', 'Savani', '03-22-2005', 'legoMaster3!', 27, 'Hamilton Drive', null, 'Roslyn', 'New York', '11576', 49035724, 'United States', '06-04-2025'),
('marksmith93@gmail.com', 'Mark', 'Smith', '08-21-2005', 'yetighost22', 90, 'Chapel Lane', null, 'Argoed', null, 'NP2 9PH', 20340048, 'United Kingdom', '06-04-2025'),
('jstone@yahoo.com', 'Jebediah', 'Stone', '05-08-2000', 'potatoHead22', 41, 'Rue Clement Marot', null, 'Perpignan', null, '66100', 23940245, 'France', '06-04-2025'),
('sergioKitchens998@gmail.com', 'Gunna', 'Wunna', '06-14-1993', 'americanRapper!', 36, 'Prince St.', null, 'Mcphersons Crossing', 'New South Wales', 2460, 66749934, 'Australia', '01-04-2026'),
('nihalrahman@gmail.com', 'Nihal', 'Rahman', '03/15/2002', 'Rahman123!', 370, 'Jay St', 'N/A', 'Brooklyn', 'NY', '11201', 28395239, 'United States', '12/25/2025'),
('shubhsavani@gmail.com', 'Shubh', 'Savani', '03/12/2001', 'SavaniQueen3!', 373, 'Gold St', '3B', 'Brooklyn', 'NY', '11201', 76543218, 'United States', '12/25/2025'),
('tanvirahman@gmail.com', 'Tanvi', 'Rahman', '08/06/2002', 'Nihal443!', 16450, '84 Ave', '2 FL', 'Queens', 'NY', '11432', 12345678, 'United States', '12/25/2025')
;

INSERT INTO flight (flight_num, departure_date, departure_time, arrival_date, arrival_time, departure_airport, arrival_airport, airline_name, airplane_ID, flight_status) VALUES
('886', '12-23-2022', '02:22:10', '12-23-2022', '08:32:20', 'ATL', 'LCY', 'Delta Air Lines', 'DZJ21', 'delayed'),
('433', '06-19-2023', '06:10:35', '06-19-2023', '09:25:10', 'LGA', 'DTW', 'American Airlines', 'BNSR4', 'on-time'),
('203', '07-11-2024', '12:23:00', '07-12-2024', '01:32:02', 'DFW', 'DXB', 'Emirates', 'SHFJ7', 'on-time'),
('664', '09-22-2024', '15:04:12', '09-22-2024', '18:00:00', 'DFW', 'PVD', 'Spirit Airlines', 'AEKD2', 'on-time'),
('594', '09-30-2020', '13:03:23', '09-30-2020', '19:35:23', 'JFK', 'DFW', 'Grey Bandit Airlines', 'YNH84', 'on-time'),
('123', '01-22-2023', '13:23:44', '01-23-2023', '16:53:43', 'JFK', 'PVG', 'Jet Blue', 'DA440', 'delayed'),
('456', '11-19-2023', '11:12:01', '11-19-2023', '13:28:34', 'JFK', 'PVG', 'Jet Blue', 'SA770', 'delayed'),
('789', '06-11-2023', '14:56:59', '06-11-2023', '01:13:55', 'PVG', 'JFK', 'Jet Blue', 'UA150', 'on-time')
;

INSERT INTO review (email_address, flight_num, departure_date, departure_time, rating, comments) VALUES
('rheas@gmail.com', '886', '12-23-2022', '02:22:10', 8, "Even though the flight was delayed, the first class flight experience was great! The service and staff were kind and very welcoming."),
('rahulsur22@hotmail.com', '886', '12-23-2022', '02:22:10', 3, "The economy class seats were ripped. The staff did not care for their guests. I want my money back."),
('jstone@yahoo.com', '594', '09-30-2020', '13:03:23', 9, 'Best flight experience ever. The food and drinks were amazing and the pilot was very nice to me. He even let me fly the plane.')
;

INSERT INTO staff_email_address (userName, email) VALUES
('flBerg587', 'flBerg587@airFrance.org'),
('jsesh', 'jsesh@emirates.org'),
('sadas908', 'sadas908@spirit.org'),
('sadesai#2', 'sadesai#2@airIndia.org'),
('nishvinder', 'nishvinder@greyBandit.org'),
('jackieswish', 'jackieswish@southwest.org'),
('riap344', 'riap344@madridAirways.org'),
('aniswar', 'aniswar@lufthansa.org'),
('keviins234', 'keviins234@american.org'),
('nibarP886', 'nibarP886@airIndia.org'),
('JetBlueHero55', 'jetblueguardian@gmail.com')
;

INSERT INTO staff_phone_number (userName, phone_number) VALUES
('flBerg587', '202-918-2132'),
('jsesh', '210-654-7305'),
('sadas908', '505-646-8591'),
('sadesai#2', '223-529-8566'),
('nishvinder', '415-575-4917'),
('jackieswish', '318-578-5118'),
('riap344', '201-905-8052'),
('aniswar', '448-342-0654'),
('keviins234', '505-646-9803'),
('nibarP886', '325-616-4350'),
('JetBlueHero55', '347-939-1035')
;

INSERT INTO ticket (ticket_ID, price, flight_num, departure_date, departure_time, airline_name) VALUES
('3956', 122.50, '123', '01-22-2023', '13:23:44', 'Jet Blue'),
('3957', 122.50, '123', '01-22-2023', '13:23:44', 'Jet Blue'),
('3958', 122.50, '123', '01-22-2023', '13:23:44', 'Jet Blue'),
('2934', 97.46, '433', '06-19-2023', '06:10:35', 'American Airlines'),
('1203', 99.77, '203', '07-11-2024', '12:23:00', 'Emirates'),
('1204', 99.77, '203', '07-11-2024', '12:23:00', 'Emirates'),
('4507', 58.62, '664', '09-22-2024', '15:04:12', 'Spirit Airlines'),
('0943', 89.50, '594', '09-30-2020', '13:03:23', 'Grey Bandit Airlines'),
('0944', 89.50, '594', '09-30-2020', '13:03:23', 'Grey Bandit Airlines'),
('0213', 172.50, '123', '01-22-2023', '13:23:44', 'Jet Blue'),
('5678', 97.46, '456', '11-19-2023', '11:12:01', 'Jet Blue'),
('9302', 99.77, '789', '06-11-2023', '14:56:59', 'Jet Blue')
;


INSERT INTO ticket_bought_by (ticket_ID, email_address, first_name, last_name, date_of_birth, card_type, card_num, name_on_card, expire_date, purchase_date, purchase_time) VALUES 
('3956', 'maanavsavani239@gmail.com', 'Manish', 'Savani', '04-09-1986', 'debit', '2939549103', 'Maanav Savani', '03-14-2025', '12-14-2022', '13:03:22'),
('3957', 'maanavsavani239@gmail.com', 'Usha', 'Savani', '05-24-1989', 'debit', '2939549103', 'Maanav Savani', '03-14-2025', '12-14-2022', '13:03:22'),
('3958', 'maanavsavani239@gmail.com', 'Maisha', 'Savani', '08-04-1997', 'debit', '2939549103', 'Maanav Savani', '03-14-2025', '12-14-2022', '13:03:22'),
('1203', 'rheas@gmail.com', 'Rohin', 'Singh', '10-05-2009', 'credit', '4950349582', 'Rhea Sathnur', '06-12-2028', '03-02-2023', '13:12:22'),
('1204', 'rheas@gmail.com', 'Rohan', 'Gupta', '12-11-1992', 'credit', '4950349582', 'Rhea Sathnur', '06-12-2028', '03-02-2023', '13:12:22'),
('0943', 'chrisO34@yahoo.com', 'Chris', 'Olmedo', '01-22-2001', 'credit', '7013404924', 'Robert Olmedo', '11-23-2024','09-01-2020', '03:44:02'),
('0944', 'chrisO34@yahoo.com', 'Matthew', 'Olmedo', '01-22-2001', 'credit', '7013404924', 'Robert Olmedo', '11-23-2024','09-01-2020', '03:44:02'),
('0213', 'nihalrahman@gmail.com', 'Nihal', 'Rahman', '03/15/2002', 'debit', '1234567891', 'Nihal Rahman', '12/25/2025', '07/31/2018', '13:00:33'),
('5678', 'shubhsavani@gmail.com', 'Shubh', 'Savani', '03/12/2001', 'debit', '987654321', 'Shubh Savani', '12/25/2025', '12/01/2019', '01:32:00'),
('9302', 'tanvirahman@gmail.com', 'Tanvi', 'Rahman', '08/06/2002', 'credit', '1029384756', 'Tanvi Rahman', '12/25/2025', '05/25/2020', '17:19:59')
;

