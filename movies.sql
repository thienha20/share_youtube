-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               8.0.21 - MySQL Community Server - GPL
-- Server OS:                    Win64
-- HeidiSQL Version:             11.3.0.6295
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- Dumping structure for table movies.shares
DROP TABLE IF EXISTS `shares`;
CREATE TABLE IF NOT EXISTS `shares` (
  `share_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `link` varchar(500) NOT NULL DEFAULT '',
  `youtube_code` varchar(20) NOT NULL DEFAULT '',
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`share_id`),
  KEY `FK_shares_users` (`user_id`),
  CONSTRAINT `FK_shares_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table movies.shares: ~9 rows (approximately)
/*!40000 ALTER TABLE `shares` DISABLE KEYS */;
INSERT INTO `shares` (`share_id`, `user_id`, `link`, `youtube_code`, `timestamp`) VALUES
	(1, 1, 'https://www.youtube.com/watch?v=NidvcNHaVOw', 'NidvcNHaVOw', '2021-11-21 16:25:15'),
	(2, 1, 'https://youtu.be/v01qcSuh_UI', 'v01qcSuh_UI', '2021-11-21 16:25:15'),
	(3, 1, 'https://youtu.be/EMyFuAZ05mo', 'EMyFuAZ05mo', '2021-11-21 16:25:15'),
	(4, 1, 'https://youtu.be/szgK1WaI-5w', 'szgK1WaI-5w', '2021-11-21 16:25:15'),
	(5, 1, 'https://youtu.be/QCjygQ6Y29U', 'QCjygQ6Y29U', '2021-11-21 16:25:15'),
	(6, 1, 'https://youtu.be/TayDLDDsF2Q', 'TayDLDDsF2Q', '2021-11-21 16:25:15'),
	(7, 1, 'https://youtu.be/uUvXetE7IW0', 'uUvXetE7IW0', '2021-11-21 16:25:15'),
	(8, 1, 'https://youtu.be/y7r_Xp93d_s', 'y7r_Xp93d_s', '2021-11-21 16:25:15'),
	(9, 1, 'https://youtu.be/KOk7oekJ6SY', 'KOk7oekJ6SY', '2021-11-21 16:25:15'),
	(10, 3, 'https://www.youtube.com/watch?v=X57TeVD_1eo', 'X57TeVD_1eo', '2021-11-22 10:15:31'),
	(11, 3, 'https://www.youtube.com/watch?v=FzJofBuwTzQ', 'FzJofBuwTzQ', '2021-11-22 10:15:50'),
	(12, 3, 'https://www.youtube.com/watch?v=mlGsG9s9FqM', 'mlGsG9s9FqM', '2021-11-22 10:20:15'),
	(13, 3, 'https://www.youtube.com/watch?v=CfVToJvkvN8', 'CfVToJvkvN8', '2021-11-22 10:20:56'),
	(14, 3, 'https://www.youtube.com/watch?v=AYqU6zHVknE', 'AYqU6zHVknE', '2021-11-22 10:22:28'),
	(15, 3, 'https://www.youtube.com/watch?v=UjOWqFJ3zpc', 'UjOWqFJ3zpc', '2021-11-22 10:23:22'),
	(16, 3, 'https://www.youtube.com/watch?v=Bduk1cqNwTg', 'Bduk1cqNwTg', '2021-11-22 10:31:48'),
	(17, 3, 'https://www.youtube.com/watch?v=663asg0k7A8', '663asg0k7A8', '2021-11-22 10:34:32'),
	(18, 1, 'https://www.youtube.com/watch?v=szgK1WaI-5w', 'szgK1WaI-5w', '2021-11-22 11:34:40');
/*!40000 ALTER TABLE `shares` ENABLE KEYS */;

-- Dumping structure for table movies.users
DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(100) NOT NULL DEFAULT '',
  `password` varchar(50) NOT NULL DEFAULT '',
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table movies.users: ~1 rows (approximately)
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` (`user_id`, `email`, `password`, `timestamp`) VALUES
	(1, 'admin@admin.com', '54d76aa7d0132143dcedfc0b408ef686', '2021-11-21 16:18:41'),
	(2, 'test@admin.com', '5c263ed23f141c36f32291af471c4196', '2021-11-22 09:48:37'),
	(3, 'test@test.vn', '2533303e8dd25e3b76348120f7c00390', '2021-11-22 10:03:37'),
	(4, 'test_311@test.vn', 'e561f32df7150f14261a6499923c095e', '2021-11-22 11:02:21'),
	(5, 'test_160@test.vn', 'a56a44786bf58037914b4f0870bd2a89', '2021-11-22 11:03:20'),
	(6, 'test_799@test.vn', 'fb5a33d4c0fa881221b863683bb98cbc', '2021-11-22 11:04:31'),
	(7, 'test_564@test.vn', 'a578e036940d2c2d0ce3ef234e86b131', '2021-11-22 11:05:14'),
	(8, 'test_64@test.vn', 'a5c0ac97743ea4ceebde87140e452476', '2021-11-22 11:07:25'),
	(9, 'test_443@test.vn', '21dcabda257a3c7d7c149fc91e6ee086', '2021-11-22 11:08:23'),
	(10, 'test_186@test.vn', 'bb48ec9cdb1f931092b30d25a98bf0de', '2021-11-22 11:09:03'),
	(11, 'test_826@test.vn', 'bbdde4c6166c686c4ad61a8e410a37b8', '2021-11-22 11:11:11'),
	(12, 'test_408@test.vn', 'f2add8662f8cb0b5cc0907c5b499be44', '2021-11-22 11:11:32'),
	(13, 'test_663@test.vn', 'd78472f4a9eca83a4b955498fb05c579', '2021-11-22 11:13:39'),
	(14, 'test_248@test.vn', 'c8931e08b3fcb371f645a0fddb029431', '2021-11-22 11:16:43'),
	(15, 'test_108@test.vn', '8f218dec85f2432f331c2a62a74fb3f1', '2021-11-22 11:23:07'),
	(16, 'test_389@test.vn', 'eeb3d7ef3cf4996a8ec0742c05da8757', '2021-11-22 11:29:29'),
	(17, 'test_886@test.vn', '7ce0e65ace80e26b9a68d1a210f0df77', '2021-11-22 11:29:58'),
	(18, 'test_738@test.vn', '8ecc2e2267908c54c7c923e89b9a8c24', '2021-11-22 11:38:48');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
