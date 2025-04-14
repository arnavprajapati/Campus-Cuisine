-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: mysql
-- Generation Time: Apr 06, 2025 at 01:24 PM
-- Server version: 8.0.41
-- PHP Version: 8.2.27
SET
  SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";

START TRANSACTION;

SET
  time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;

/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;

/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;

/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `library`
--
-- --------------------------------------------------------
--
-- Table structure for table `admin`
--
CREATE TABLE
  `admin` (
    `id` int NOT NULL,
    `FullName` varchar(100) DEFAULT NULL,
    `AdminEmail` varchar(120) DEFAULT NULL,
    `UserName` varchar(100) NOT NULL,
    `Password` varchar(100) NOT NULL,
    `updationDate` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE CURRENT_TIMESTAMP
  ) ENGINE = InnoDB DEFAULT CHARSET = latin1;

--
-- Dumping data for table `admin`
--
INSERT INTO
  `admin` (
    `id`,
    `FullName`,
    `AdminEmail`,
    `UserName`,
    `Password`,
    `updationDate`
  )
VALUES
  (
    1,
    'Kumar Pandule',
    'kumarpandule@gmail.com',
    'admin',
    '11d8c28a64490a987612f2332502467f',
    '2025-04-06 09:43:13'
  );

-- --------------------------------------------------------
--
-- Table structure for table `tblauthors`
--
CREATE TABLE
  `tblauthors` (
    `id` int NOT NULL,
    `AuthorName` varchar(159) DEFAULT NULL,
    `creationDate` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
    `UpdationDate` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
  ) ENGINE = InnoDB DEFAULT CHARSET = latin1;

--
-- Dumping data for table `tblauthors`
--
INSERT INTO
  `tblauthors` (
    `id`,
    `AuthorName`,
    `creationDate`,
    `UpdationDate`
  )
VALUES
  (
    1,
    'Kumar Pandule',
    '2017-07-08 12:49:09',
    '2021-06-28 16:03:28'
  ),
  (
    2,
    'Kumar Prince',
    '2017-07-08 14:30:23',
    '2025-04-06 10:09:48'
  ),
  (
    3,
    'Rahul',
    '2017-07-08 14:35:08',
    '2021-06-28 16:03:43'
  ),
  (4, 'HC Verma', '2017-07-08 14:35:21', NULL),
  (5, 'R.D. Sharma ', '2017-07-08 14:35:36', NULL);

-- --------------------------------------------------------
--
-- Table structure for table `tblbooks`
--
CREATE TABLE
  `tblbooks` (
    `id` int NOT NULL,
    `BookName` varchar(255) DEFAULT NULL,
    `CatId` int DEFAULT NULL,
    `AuthorId` int DEFAULT NULL,
    `ISBNNumber` int DEFAULT NULL,
    `BookPrice` int DEFAULT NULL,
    `RegDate` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
    `UpdationDate` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
  ) ENGINE = InnoDB DEFAULT CHARSET = latin1;

--
-- Dumping data for table `tblbooks`
--
INSERT INTO
  `tblbooks` (
    `id`,
    `BookName`,
    `CatId`,
    `AuthorId`,
    `ISBNNumber`,
    `BookPrice`,
    `RegDate`,
    `UpdationDate`
  )
VALUES
  (
    3,
    'physics',
    6,
    4,
    1111,
    36,
    '2017-07-08 20:17:31',
    '2025-04-06 10:18:04'
  ),
  (
    4,
    'asdasf',
    5,
    1,
    3154315,
    213142,
    '2025-04-03 09:04:13',
    NULL
  );

-- --------------------------------------------------------
--
-- Table structure for table `tblcategory`
--
CREATE TABLE
  `tblcategory` (
    `id` int NOT NULL,
    `CategoryName` varchar(150) DEFAULT NULL,
    `Status` int DEFAULT NULL,
    `CreationDate` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
    `UpdationDate` timestamp NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE CURRENT_TIMESTAMP
  ) ENGINE = InnoDB DEFAULT CHARSET = latin1;

--
-- Dumping data for table `tblcategory`
--
INSERT INTO
  `tblcategory` (
    `id`,
    `CategoryName`,
    `Status`,
    `CreationDate`,
    `UpdationDate`
  )
VALUES
  (
    5,
    'Technology',
    1,
    '2017-07-04 18:35:39',
    '2017-07-08 17:13:03'
  ),
  (
    6,
    'Science',
    1,
    '2017-07-04 18:35:55',
    '2025-04-06 10:08:26'
  ),
  (
    7,
    'Management',
    0,
    '2017-07-04 18:36:16',
    '0000-00-00 00:00:00'
  );

-- --------------------------------------------------------
--
-- Table structure for table `tblissuedbookdetails`
--
CREATE TABLE
  `tblissuedbookdetails` (
    `id` int NOT NULL,
    `BookId` int DEFAULT NULL,
    `StudentID` varchar(150) DEFAULT NULL,
    `IssuesDate` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
    `ReturnDate` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
    `RetrunStatus` int DEFAULT NULL,
    `fine` int DEFAULT NULL
  ) ENGINE = InnoDB DEFAULT CHARSET = latin1;

--
-- Dumping data for table `tblissuedbookdetails`
--
INSERT INTO
  `tblissuedbookdetails` (
    `id`,
    `BookId`,
    `StudentID`,
    `IssuesDate`,
    `ReturnDate`,
    `RetrunStatus`,
    `fine`
  )
VALUES
  (
    1,
    1,
    'SID002',
    '2017-07-15 06:09:47',
    '2017-07-15 11:15:20',
    1,
    0
  ),
  (
    2,
    1,
    'SID002',
    '2017-07-15 06:12:27',
    '2017-07-15 11:15:23',
    1,
    5
  ),
  (
    3,
    3,
    'SID002',
    '2017-07-15 06:13:40',
    '2025-04-06 10:22:31',
    1,
    0
  ),
  (
    4,
    3,
    'SID002',
    '2017-07-15 06:23:23',
    '2017-07-15 11:22:29',
    1,
    2
  ),
  (
    6,
    3,
    'SID011',
    '2017-07-15 18:02:55',
    '2025-04-03 09:05:56',
    1,
    0
  ),
  (
    7,
    3,
    'SID009',
    '2025-04-05 17:11:23',
    '2025-04-05 17:23:23',
    1,
    0
  );

-- --------------------------------------------------------
--
-- Table structure for table `tblstudents`
--
CREATE TABLE
  `tblstudents` (
    `id` int NOT NULL,
    `StudentId` varchar(100) DEFAULT NULL,
    `FullName` varchar(120) DEFAULT NULL,
    `EmailId` varchar(120) DEFAULT NULL,
    `MobileNumber` char(11) DEFAULT NULL,
    `Password` varchar(120) DEFAULT NULL,
    `Status` int DEFAULT NULL,
    `RegDate` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
    `UpdationDate` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
  ) ENGINE = InnoDB DEFAULT CHARSET = latin1;

--
-- Dumping data for table `tblstudents`
--
INSERT INTO
  `tblstudents` (
    `id`,
    `StudentId`,
    `FullName`,
    `EmailId`,
    `MobileNumber`,
    `Password`,
    `Status`,
    `RegDate`,
    `UpdationDate`
  )
VALUES
  (
    1,
    'SID002',
    'Anuj kumar',
    'anuj.lpu1@gmail.com',
    '9865472555',
    '123',
    0,
    '2017-07-11 15:37:05',
    '2025-04-03 09:01:25'
  ),
  (
    4,
    'SID005',
    'sdfsd',
    'csfsd@dfsfks.com',
    '8569710025',
    '92228410fc8b872914e023160cf4ae8f',
    0,
    '2017-07-11 15:41:27',
    '2017-07-15 17:43:03'
  ),
  (
    8,
    'SID009',
    'Hello',
    'test@gmail.com',
    '432235246',
    '11d8c28a64490a987612f2332502467f',
    1,
    '2017-07-11 15:58:28',
    '2025-04-05 16:33:38'
  ),
  (
    9,
    'SID010',
    'Amit',
    'amit@gmail.com',
    '8585856224',
    'f925916e2754e5e03f75dd58a5733251',
    1,
    '2017-07-15 13:40:30',
    NULL
  ),
  (
    10,
    'SID011',
    'Sarita Pandey',
    'sarita@gmail.com',
    '4672423754',
    'f925916e2754e5e03f75dd58a5733251',
    1,
    '2017-07-15 18:00:59',
    NULL
  );

--
-- Indexes for dumped tables
--
--
-- Indexes for table `admin`
--
ALTER TABLE `admin` ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tblauthors`
--
ALTER TABLE `tblauthors` ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tblbooks`
--
ALTER TABLE `tblbooks` ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tblcategory`
--
ALTER TABLE `tblcategory` ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tblissuedbookdetails`
--
ALTER TABLE `tblissuedbookdetails` ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tblstudents`
--
ALTER TABLE `tblstudents` ADD PRIMARY KEY (`id`),
ADD UNIQUE KEY `StudentId` (`StudentId`);

--
-- AUTO_INCREMENT for dumped tables
--
--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin` MODIFY `id` int NOT NULL AUTO_INCREMENT,
AUTO_INCREMENT = 2;

--
-- AUTO_INCREMENT for table `tblauthors`
--
ALTER TABLE `tblauthors` MODIFY `id` int NOT NULL AUTO_INCREMENT,
AUTO_INCREMENT = 12;

--
-- AUTO_INCREMENT for table `tblbooks`
--
ALTER TABLE `tblbooks` MODIFY `id` int NOT NULL AUTO_INCREMENT,
AUTO_INCREMENT = 5;

--
-- AUTO_INCREMENT for table `tblcategory`
--
ALTER TABLE `tblcategory` MODIFY `id` int NOT NULL AUTO_INCREMENT,
AUTO_INCREMENT = 14;

--
-- AUTO_INCREMENT for table `tblissuedbookdetails`
--
ALTER TABLE `tblissuedbookdetails` MODIFY `id` int NOT NULL AUTO_INCREMENT,
AUTO_INCREMENT = 8;

--
-- AUTO_INCREMENT for table `tblstudents`
--
ALTER TABLE `tblstudents` MODIFY `id` int NOT NULL AUTO_INCREMENT,
AUTO_INCREMENT = 25;

COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;

/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;

/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;