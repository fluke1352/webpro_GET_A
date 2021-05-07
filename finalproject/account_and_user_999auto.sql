-- MySQL dump 10.13  Distrib 8.0.23, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: 999auto
-- ------------------------------------------------------
-- Server version	8.0.23

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `account`
--

DROP TABLE IF EXISTS `account`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `account` (
  `account_id` int NOT NULL AUTO_INCREMENT,
  `user_username` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `user_password` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `user_user_id` int NOT NULL,
  PRIMARY KEY (`account_id`),
  KEY `user_id_idx` (`user_user_id`),
  CONSTRAINT `idx_account_user_user_id` FOREIGN KEY (`user_user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account`
--

LOCK TABLES `account` WRITE;
/*!40000 ALTER TABLE `account` DISABLE KEYS */;
INSERT INTO `account` VALUES (1,'Jornsnow','Jornsnow123',1),(2,'kaimookcmcafe','kaimookcmcafe999',2),(3,'nattapontanee','nattapontanee11',3),(4,'rineesaptaweekarn','rineesaptaweekarn69',4),(5,'toosapthaweekarn','toosapthaweekarn69',5),(6,'mookmik','mookmik78',6),(7,'champwow','champwow33',7),(8,'renaharn','renaharn42',8),(9,'flukejirayu','flukejirayu999',9),(10,'annaloca','annaloca55',10),(11,'Pookthongjid','Pookthongjid89',11),(12,'nonnatchanon','nonnatchanon36',12),(13,'bankdokkathin','bankdokkathin19',13),(14,'pingkainaitamnan','pingkainaitamnan72',14),(15,'jeableabduan','jeableabduan11',15);
/*!40000 ALTER TABLE `account` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `user_status` enum('customer','owner') CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT 'customer',
  `user_fname` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `user_lname` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `user_phone` char(10) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `user_image` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  KEY `idx_account_user_user_id` (`user_id`),
  KEY `idx2_user_user_id` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'customer','Jorn','snow','0608894533','\\uploads\\myImage-1619712416088.jpg'),(2,'customer','kaimook','cmcafe','0668942358','\\uploads\\myImage-1619712583551.jpg'),(3,'customer','nattapon','tanee','0655894235','\\uploads\\myImage-1619712674379.jpg'),(4,'customer','rinee','sapthaweekarn','0975423590','\\uploads\\myImage-1619712740138.jpg'),(5,'customer','too','sapthaweekarn','0985651235','\\uploads\\myImage-1619712791581.jpg'),(6,'customer','mook','mik','0953215684','\\uploads\\myImage-1619712845524.jpg'),(7,'customer','champ','wow','0688952355','\\uploads\\myImage-1619712887274.jpg'),(8,'customer','rena','harn','0698531258','\\uploads\\myImage-1619712940570.jpg'),(9,'customer','fluke','jirayu','0698564895','\\uploads\\myImage-1619712981314.jpg'),(10,'customer','anna','loca','0682359535','\\uploads\\myImage-1619713052156.jpg'),(11,'customer','Pook','thongjid','0689852369','\\uploads\\myImage-1619713089317.jpg'),(12,'customer','non','natchanon','0698223595','\\uploads\\myImage-1619713128221.jpg'),(13,'customer','bank','dokkathin','0915560109','\\uploads\\myImage-1619713172497.jpg'),(14,'customer','pingkai','naitamnan','0689523905','\\uploads\\myImage-1619713212581.jpg'),(15,'customer','jeab','leabduan','0895662235','\\uploads\\myImage-1619713271949.jpg');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-04-29 23:52:34
