-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 06, 2024 at 05:08 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_pets`
--

-- --------------------------------------------------------

--
-- Table structure for table `breeds`
--

CREATE TABLE `breeds` (
  `BreedID` int(11) NOT NULL,
  `BreedName` varchar(100) DEFAULT NULL,
  `SpeciesID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `breeds`
--

INSERT INTO `breeds` (`BreedID`, `BreedName`, `SpeciesID`) VALUES
(1, 'Labrador Retriever', 1),
(2, 'German Shepherd', 1),
(3, 'Persian', 2),
(4, 'Siamese', 2),
(5, 'Canary', 3),
(6, 'Goldfish', 4),
(7, 'Catty', 2);

-- --------------------------------------------------------

--
-- Table structure for table `owners`
--

CREATE TABLE `owners` (
  `OwnerID` int(11) NOT NULL,
  `Name` varchar(100) DEFAULT NULL,
  `ContactDetails` varchar(100) DEFAULT NULL,
  `Address` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `owners`
--

INSERT INTO `owners` (`OwnerID`, `Name`, `ContactDetails`, `Address`) VALUES
(1, 'John Doe', '555-1235', '123 Maple Street'),
(2, 'Jane Smith', '555-5678', '456 Oak Wood Avenue'),
(3, 'Alice Johnson', '555-8765', '789 Pine Road'),
(4, 'Test 3', 'Test 4', 'test 6');

-- --------------------------------------------------------

--
-- Table structure for table `pets`
--

CREATE TABLE `pets` (
  `PetID` int(11) NOT NULL,
  `Name` varchar(100) DEFAULT NULL,
  `SpeciesID` int(11) DEFAULT NULL,
  `BreedID` int(11) DEFAULT NULL,
  `DateOfBirth` date DEFAULT NULL,
  `OwnerID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `pets`
--

INSERT INTO `pets` (`PetID`, `Name`, `SpeciesID`, `BreedID`, `DateOfBirth`, `OwnerID`) VALUES
(1, 'Buddy', 1, 1, '2018-05-10', 1),
(2, 'Max', 1, 2, '2020-08-15', 2),
(3, 'Whiskers', 2, 3, '2019-11-20', 1),
(4, 'Shadow', 2, 4, '2021-03-30', 3),
(5, 'Tweety', 3, 5, '2022-06-25', 2),
(6, 'Goldie', 4, 6, '2023-02-10', 3),
(11, 'wow', 4, 4, '2024-08-23', 4),
(12, 'wow', 1, 1, '2024-08-31', 1),
(13, 'wew', 1, 1, '2024-08-28', 1),
(14, 'Wishiwashi updated to dog', 1, 2, '2024-08-28', 3),
(15, 'Wishiwashi', 2, 2, '2024-08-28', 3),
(16, 'wow', 4, 6, '0000-00-00', 1),
(17, 'wooow', 1, 1, '2024-08-29', 2),
(18, 'tweetiebird', 3, 5, '2024-08-28', 3);

-- --------------------------------------------------------

--
-- Table structure for table `species`
--

CREATE TABLE `species` (
  `SpeciesID` int(11) NOT NULL,
  `SpeciesName` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `species`
--

INSERT INTO `species` (`SpeciesID`, `SpeciesName`) VALUES
(1, 'Dogs'),
(2, 'Cat'),
(3, 'Bird'),
(4, 'Fish'),
(5, 'Rabbit'),
(6, 'Rabbit');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `username` varchar(100) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `first_name`, `last_name`, `username`, `email`, `password_hash`, `avatar`, `created_at`) VALUES
(1, 'John', 'Doe', 'JDoe', 'JDoe@gmail.com', '12345', '66cf4f1798277_20240828182351_avatar_1.png', '2024-08-21 13:54:52'),
(2, 'Jane', 'Doe', 'Jane123', 'Jane123@gmail.com', '$2y$10$S85AIJiA1MVga0AiF8OAmO8NWiNU834SneHLXPJjboQS84ceB80e.', '66cf5282da975_20240828183826_avatar_2.png', '2024-08-21 15:47:38'),
(3, 'Jaya', 'Matilok', 'Jaya23', 'Jaya23@gmail.com', '$2y$10$ROLAGew68g/oC/TOHDBdEOnFdZ5zm0mk9e4CIEHmxClhSxsElb5Ie', '66cf4f0fd7ab7_20240828182343_avatar_2.png', '2024-08-22 00:01:00'),
(4, 'Jake', 'Doe', 'Jake', 'J@gmail.com', '$2y$10$EzFf3Dk8QAEhyoZn7kgA0OciC3anTseLMumvm/FAOxMLYM/zBSp0S', '66cf40f462741_20240828172332_avatar_1.png', '2024-08-28 23:23:32'),
(5, 'Charls', 'Pacaldo', 'CharlsPacaldo', 'CharlsPacalda@gmail.com', '$2y$10$mD4o.5XrKWuQW1XIHvPDneCPPJwpsKvH6OrhHku6UmPfn8RtyODA.', '66cf50aa48cfa_20240828183034_avatar_2.png', '2024-08-29 00:24:45'),
(6, 'carl', 'vargas', 'carlos23', 'carlvargas23@gmail.com', '123456789', NULL, '2024-10-17 15:56:32');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `breeds`
--
ALTER TABLE `breeds`
  ADD PRIMARY KEY (`BreedID`),
  ADD KEY `SpeciesID` (`SpeciesID`);

--
-- Indexes for table `owners`
--
ALTER TABLE `owners`
  ADD PRIMARY KEY (`OwnerID`);

--
-- Indexes for table `pets`
--
ALTER TABLE `pets`
  ADD PRIMARY KEY (`PetID`),
  ADD KEY `OwnerID` (`OwnerID`),
  ADD KEY `SpeciesID` (`SpeciesID`),
  ADD KEY `BreedID` (`BreedID`);

--
-- Indexes for table `species`
--
ALTER TABLE `species`
  ADD PRIMARY KEY (`SpeciesID`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `breeds`
--
ALTER TABLE `breeds`
  MODIFY `BreedID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `owners`
--
ALTER TABLE `owners`
  MODIFY `OwnerID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `pets`
--
ALTER TABLE `pets`
  MODIFY `PetID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `species`
--
ALTER TABLE `species`
  MODIFY `SpeciesID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `breeds`
--
ALTER TABLE `breeds`
  ADD CONSTRAINT `breeds_ibfk_1` FOREIGN KEY (`SpeciesID`) REFERENCES `species` (`SpeciesID`);

--
-- Constraints for table `pets`
--
ALTER TABLE `pets`
  ADD CONSTRAINT `pets_ibfk_1` FOREIGN KEY (`OwnerID`) REFERENCES `owners` (`OwnerID`),
  ADD CONSTRAINT `pets_ibfk_2` FOREIGN KEY (`SpeciesID`) REFERENCES `species` (`SpeciesID`),
  ADD CONSTRAINT `pets_ibfk_3` FOREIGN KEY (`BreedID`) REFERENCES `breeds` (`BreedID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
