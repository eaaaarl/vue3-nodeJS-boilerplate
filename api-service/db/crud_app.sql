-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 11, 2024 at 04:31 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `crud_app`
--

-- --------------------------------------------------------

--
-- Table structure for table `students`
--

CREATE TABLE `students` (
  `id` int(11) NOT NULL,
  `full_name` varchar(255) NOT NULL,
  `status` enum('Active','Inactive') NOT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `students`
--

INSERT INTO `students` (`id`, `full_name`, `status`, `avatar`, `created_at`, `updated_at`) VALUES
(119, 'Blecy Kate Salem', 'Active', 'uploads/1720536935338-2.jpg', '2024-07-08 14:40:55', '2024-07-09 14:55:35'),
(120, 'Sophia Salem', 'Active', '', '2024-07-08 14:41:01', '2024-07-08 14:41:01'),
(149, 'Marissa Ado', 'Active', NULL, '2024-07-10 02:21:39', '2024-07-10 02:21:39'),
(150, 'Rex Ado', 'Active', NULL, '2024-07-10 02:21:45', '2024-07-10 02:21:45'),
(151, 'Jhonn Rex Ado', 'Active', NULL, '2024-07-10 02:21:53', '2024-07-10 02:21:53'),
(152, 'Marr Ado', 'Active', NULL, '2024-07-10 02:22:00', '2024-07-10 02:22:00'),
(153, 'Nel Ado', 'Active', NULL, '2024-07-10 02:22:21', '2024-07-10 02:22:21'),
(155, 'Nene Ado', 'Active', NULL, '2024-07-10 02:22:39', '2024-07-10 02:22:39'),
(156, 'Roi Ado', 'Active', NULL, '2024-07-10 02:23:08', '2024-07-10 02:23:08'),
(157, 'Josh Guadadalquiver', 'Active', NULL, '2024-07-10 02:23:28', '2024-07-10 02:23:28');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `fullname` varchar(255) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `fullname`, `avatar`, `created_at`, `updated_at`) VALUES
(7, 'test', 'test@gmail.com', '$2a$10$zKC.gLbBGyGONKrkpHtjdu2QsEhLHDHc7MO/cXMI35CvO0f4fZucS', NULL, NULL, '2024-07-07 14:59:10', '2024-07-07 14:59:10'),
(8, 'test1', 'test1@gmail.com', '$2a$10$GNAxt.rCWFl6jAicalk/i.nUli3DHk0CFnmbSnRf5eiQxfvQc2dP6', NULL, NULL, '2024-07-07 15:00:36', '2024-07-07 15:00:36');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `students`
--
ALTER TABLE `students`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=160;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
