-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Apr 06, 2023 at 11:29 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

-- CREATE SCHEMA `air_ticket_res_db` ;

-- SELECT DATABASE ('air_ticket_res_db');

-- Database: `air_ticket_res_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `Airline`
--

CREATE TABLE `Airline` (
  `airline_name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Airline_Staff`
--

CREATE TABLE `Airline_Staff` (
  `userName` varchar(50) NOT NULL,
  `passcode` varchar(100) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `date_of_birth` char(10) NOT NULL,
  `airline_name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Airplane`
--

CREATE TABLE `Airplane` (
  `airplane_ID` varchar(5) NOT NULL,
  `num_of_seats` int(11) NOT NULL,
  `manufactoring_comp` varchar(50) NOT NULL,
  `manufactoring_date` char(10) NOT NULL,
  `age` int(11) NOT NULL,
  `airline_name` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Airport`
--

CREATE TABLE `Airport` (
  `airport_code` varchar(5) NOT NULL,
  `airport_name` varchar(50) DEFAULT NULL,
  `city` varchar(20) DEFAULT NULL,
  `country` varchar(20) DEFAULT NULL,
  `airport_type` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


-- --------------------------------------------------------

--
-- Table structure for table `Customer`
--

CREATE TABLE `Customer` (
  `email_address` varchar(30) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `date_of_birth` char(10) NOT NULL,
  `passcode` varchar(100) NOT NULL,
  `building_num` int(11) NOT NULL,
  `street` varchar(30) NOT NULL,
  `apt` varchar(10),
  `city` varchar(85) NOT NULL,
  `state` varchar(50),
  `zipCode` varchar(10) NOT NULL,
  `passport_num` int(11) NOT NULL,
  `passport_country` varchar(60) NOT NULL,
  `passport_expiration` char(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Flight`
--

CREATE TABLE `Flight` (
  `flight_num` varchar(5) NOT NULL,
  `departure_date` char(10) NOT NULL,
  `departure_time` char(8) NOT NULL,
  `arrival_date` char(10) NOT NULL,
  `arrival_time` char(8) NOT NULL,
  `departure_airport` varchar(5) NOT NULL,
  `arrival_airport` varchar(5) NOT NULL,
  `airline_name` varchar(50) NOT NULL,
  `airplane_ID` varchar(5) NOT NULL,
  `flight_status` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Review`
--

CREATE TABLE `Review` (
  `email_address` varchar(30) NOT NULL,
  `flight_num` varchar(5) NOT NULL,
  `departure_date` char(10) NOT NULL,
  `departure_time` char(8) NOT NULL,
  `rating` int(11) NOT NULL,
  `comments` varchar(300) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Staff_Email_Address`
--

CREATE TABLE `Staff_Email_Address` (
  `userName` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Staff_Phone_Number`
--

CREATE TABLE `Staff_Phone_Number` (
  `userName` varchar(50) NOT NULL,
  `phone_number` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
-- --------------------------------------------------------

--
-- Table structure for table `Ticket`
--

CREATE TABLE `Ticket` (
  `ticket_ID` varchar(20) NOT NULL,
  `price` decimal(7,2) NOT NULL,
  `flight_num` VARCHAR(5) NOT NULL,
  `departure_date` char(10) NOT NULL,
  `departure_time` char(8) NOT NULL,
  `airline_name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Ticket_Bought_By`
--

CREATE TABLE `Ticket_Bought_By` (
  `ticket_ID` varchar(20) NOT NULL,
  `email_address` varchar(30) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `date_of_birth` char(10) NOT NULL,
  `card_type` varchar(10) NOT NULL,
  `card_num` varchar(20) NOT NULL,
  `name_on_card` varchar(101) NOT NULL,
  `expire_date` char(10) NOT NULL,
  `purchase_date` char(10) NOT NULL,
  `purchase_time` char(8) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Airline`
--
ALTER TABLE `Airline`
  ADD PRIMARY KEY (`airline_name`);

--
-- Indexes for table `Airline_Staff`
--
ALTER TABLE `Airline_Staff`
  ADD PRIMARY KEY (`userName`,`airline_name`),
  ADD KEY `airline_name` (`airline_name`);

--
-- Indexes for table `Airplane`
--
ALTER TABLE `Airplane`
  ADD PRIMARY KEY (`airplane_ID`,`airline_name`),
  ADD KEY `airline_name` (`airline_name`);

--
-- Indexes for table `Airport`
--
ALTER TABLE `Airport`
  ADD PRIMARY KEY (`airport_code`);

--
-- Indexes for table `Customer`
--
ALTER TABLE `Customer`
  ADD PRIMARY KEY (`email_address`);

--
-- Indexes for table `Flight`
--
ALTER TABLE `Flight`
  ADD PRIMARY KEY (`flight_num`,`departure_date`,`departure_time`,`airline_name`,`airplane_ID`),
  ADD KEY `departure_airport` (`departure_airport`),
  ADD KEY `arrival_airport` (`arrival_airport`),
  ADD KEY `airline_name` (`airline_name`),
  ADD KEY `airplane_ID` (`airplane_ID`);

--
-- Indexes for table `Review`
--
ALTER TABLE `Review`
  ADD PRIMARY KEY (`email_address`,`flight_num`,`departure_date`,`departure_time`),
  ADD KEY `flight_num` (`flight_num`,`departure_date`,`departure_time`);

--
-- Indexes for table `Staff_Email_Address`
--
ALTER TABLE `Staff_Email_Address`
  ADD PRIMARY KEY (`userName`,`email`);

--
-- Indexes for table `Staff_Phone_Number`
--
ALTER TABLE `Staff_Phone_Number`
  ADD PRIMARY KEY (`userName`,`phone_number`);

--
-- Indexes for table `Ticket`
--
ALTER TABLE `Ticket`
  ADD PRIMARY KEY (`ticket_ID`,`flight_num`,`departure_date`,`departure_time`,`airline_name`),
  ADD KEY `flight_num` (`flight_num`,`departure_date`,`departure_time`),
  ADD KEY `airline_name` (`airline_name`);

--
-- Indexes for table `Ticket_Bought_By`
--
ALTER TABLE `Ticket_Bought_By`
  ADD PRIMARY KEY (`ticket_ID`,`email_address`),
  ADD KEY `email_address` (`email_address`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `Airline_Staff`
--
ALTER TABLE `Airline_Staff`
  ADD CONSTRAINT `airline_staff_ibfk_1` FOREIGN KEY (`airline_name`) REFERENCES `Airline` (`airline_name`);

--
-- Constraints for table `Airplane`
--
ALTER TABLE `Airplane`
  ADD CONSTRAINT `airplane_ibfk_1` FOREIGN KEY (`airline_name`) REFERENCES `Airline` (`airline_name`);

--
-- Constraints for table `Flight`
--
ALTER TABLE `Flight`
  ADD CONSTRAINT `flight_ibfk_1` FOREIGN KEY (`departure_airport`) REFERENCES `Airport` (`airport_code`),
  ADD CONSTRAINT `flight_ibfk_2` FOREIGN KEY (`arrival_airport`) REFERENCES `Airport` (`airport_code`),
  ADD CONSTRAINT `flight_ibfk_3` FOREIGN KEY (`airline_name`) REFERENCES `Airline` (`airline_name`),
  ADD CONSTRAINT `flight_ibfk_4` FOREIGN KEY (`airplane_ID`) REFERENCES `Airplane` (`airplane_ID`);

--
-- Constraints for table `Review`
--
ALTER TABLE `Review`
  ADD CONSTRAINT `review_ibfk_1` FOREIGN KEY (`email_address`) REFERENCES `Customer` (`email_address`),
  ADD CONSTRAINT `review_ibfk_2` FOREIGN KEY (`flight_num`,`departure_date`,`departure_time`) REFERENCES `Flight` (`flight_num`, `departure_date`, `departure_time`);

--
-- Constraints for table `Staff_Email_Address`
--
ALTER TABLE `Staff_Email_Address`
  ADD CONSTRAINT `staff_email_address_ibfk_1` FOREIGN KEY (`userName`) REFERENCES `Airline_Staff` (`userName`);

--
-- Constraints for table `Staff_Phone_Number`
--
ALTER TABLE `Staff_Phone_Number`
  ADD CONSTRAINT `staff_phone_number_ibfk_1` FOREIGN KEY (`userName`) REFERENCES `Airline_Staff` (`userName`);

--
-- Constraints for table `Ticket`
--
ALTER TABLE `Ticket`
  ADD CONSTRAINT `ticket_ibfk_1` FOREIGN KEY (`flight_num`,`departure_date`,`departure_time`) REFERENCES `Flight` (`flight_num`, `departure_date`, `departure_time`),
  ADD CONSTRAINT `ticket_ibfk_2` FOREIGN KEY (`airline_name`) REFERENCES `Airline` (`airline_name`);

--
-- Constraints for table `Ticket_Bought_By`
--
ALTER TABLE `Ticket_Bought_By`
  ADD CONSTRAINT `ticket_bought_by_ibfk_1` FOREIGN KEY (`ticket_ID`) REFERENCES `Ticket` (`ticket_ID`),
  ADD CONSTRAINT `ticket_bought_by_ibfk_2` FOREIGN KEY (`email_address`) REFERENCES `Customer` (`email_address`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
