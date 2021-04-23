-- MariaDB dump 10.17  Distrib 10.4.8-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: 999auto
-- ------------------------------------------------------
-- Server version	10.5.9-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
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
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `account` (
  `account_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_username` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `user_password` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `user_user_id` int(11) NOT NULL,
  PRIMARY KEY (`account_id`),
  KEY `user_id_idx` (`user_user_id`),
  CONSTRAINT `idx_account_user_user_id` FOREIGN KEY (`user_user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account`
--

LOCK TABLES `account` WRITE;
/*!40000 ALTER TABLE `account` DISABLE KEYS */;
INSERT INTO `account` VALUES (1,'phawit','123456',1),(2,'josh1','1243',2),(3,'0614194945','q',7),(4,'Fluek','q',8),(5,'Fluke','1234',9),(6,'12','12',10),(7,'122223','12',11),(8,'jimjimjim','123456',12),(9,'champwow','1234567',13),(10,'sahaim','longky',14),(11,'az','az',15),(12,'asd','asd',17),(13,'asd','asd',18),(14,'zx','zx',19),(15,'as','as',21),(16,'q','q',22),(17,'qwee15','we',23);
/*!40000 ALTER TABLE `account` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order`
--

DROP TABLE IF EXISTS `order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `order` (
  `order_id` int(11) NOT NULL AUTO_INCREMENT,
  `delivery_date` date DEFAULT NULL,
  `order_date` date DEFAULT NULL,
  `price_of_all_item` float(8,2) DEFAULT NULL,
  `amount_of_all_item` int(11) DEFAULT NULL,
  `user_user_id` int(11) NOT NULL,
  PRIMARY KEY (`order_id`),
  KEY `user_id2_idx` (`user_user_id`),
  KEY `idx_order_order_id` (`order_id`),
  CONSTRAINT `idx2_user_user_id` FOREIGN KEY (`user_user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order`
--

LOCK TABLES `order` WRITE;
/*!40000 ALTER TABLE `order` DISABLE KEYS */;
INSERT INTO `order` VALUES (1,'2020-12-10','2020-12-15',10000.00,10,1),(2,'2020-07-12','2020-07-13',5000.00,5,8),(3,'2020-08-12','2020-09-12',1050.00,1,2),(4,'2020-08-18','2020-08-23',5000.00,5,7),(5,'2020-09-18','2020-11-18',12000.00,2,9),(6,'2020-10-01','2020-10-15',200.00,2,11),(7,'2020-11-07','2020-11-10',4000.00,2,10),(8,'2020-11-15','2020-11-20',600.00,3,12),(9,'2020-12-20','2020-12-30',8000.00,8,13),(10,'2020-06-20','2020-12-20',15000.00,15,14);
/*!40000 ALTER TABLE `order` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_item`
--

DROP TABLE IF EXISTS `order_item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `order_item` (
  `item_no` int(11) NOT NULL AUTO_INCREMENT,
  `item_amount` int(11) DEFAULT NULL,
  `item_price` float DEFAULT NULL,
  `total_price` float DEFAULT NULL,
  `order_order_id` int(11) NOT NULL,
  `product_product_id` int(11) NOT NULL,
  PRIMARY KEY (`item_no`,`order_order_id`),
  KEY `order_id_idx` (`order_order_id`),
  KEY `product_id_idx` (`product_product_id`),
  CONSTRAINT `idx_order_order_id` FOREIGN KEY (`order_order_id`) REFERENCES `order` (`order_id`),
  CONSTRAINT `idx_product_product_id` FOREIGN KEY (`product_product_id`) REFERENCES `product` (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_item`
--

LOCK TABLES `order_item` WRITE;
/*!40000 ALTER TABLE `order_item` DISABLE KEYS */;
INSERT INTO `order_item` VALUES (1,5,1000,5000,1,2),(2,10,200,2000,2,3),(3,2,1000,2,3,2),(4,5,500,2500,4,4),(5,7,2,7000,5,2),(6,1,2000,2000,6,5),(7,6,200,1200,8,3),(8,3,2000,6000,7,5),(9,5,2000,10000,10,3),(10,10,1000,10000,9,2);
/*!40000 ALTER TABLE `order_item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `owner`
--

DROP TABLE IF EXISTS `owner`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `owner` (
  `owner_id` int(11) NOT NULL AUTO_INCREMENT,
  `owner_username` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `owner_password` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`owner_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `owner`
--

LOCK TABLES `owner` WRITE;
/*!40000 ALTER TABLE `owner` DISABLE KEYS */;
INSERT INTO `owner` VALUES (1,'josh1','1243');
/*!40000 ALTER TABLE `owner` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `product` (
  `product_id` int(11) NOT NULL AUTO_INCREMENT,
  `product_name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `category` enum('camera','film','radio','sensor','speaker') COLLATE utf8_unicode_ci DEFAULT NULL,
  `storge_date` date DEFAULT NULL,
  PRIMARY KEY (`product_id`),
  KEY `idx_product_product_id` (`product_id`),
  KEY `idx2_product_product_id` (`product_id`),
  KEY `id3` (`product_id`),
  KEY `id4` (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (1,' supachai010','speaker',NULL),(2,'supachai02adw','speaker',NULL),(3,'laminaextra452424','film',NULL),(4,'jvc_super01','radio',NULL),(5,'camera01','camera',NULL),(6,'sensorsonic01','sensor',NULL),(7,'jvchome01','radio',NULL),(8,'ลำโพง','speaker',NULL),(9,'test','speaker','2021-04-16'),(10,'adsas','speaker','2021-04-18'),(11,'zx','speaker','2021-04-18');
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_inflow`
--

DROP TABLE IF EXISTS `product_inflow`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `product_inflow` (
  `inflow_id` int(11) NOT NULL AUTO_INCREMENT,
  `inflow_amount` int(11) DEFAULT NULL,
  `inflow_price` float DEFAULT NULL,
  `product_product_id` int(11) NOT NULL,
  `inflow_date` date DEFAULT NULL,
  PRIMARY KEY (`inflow_id`,`product_product_id`),
  KEY `product_id5_idx` (`product_product_id`),
  CONSTRAINT `idx2_product_product_id` FOREIGN KEY (`product_product_id`) REFERENCES `product` (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_inflow`
--

LOCK TABLES `product_inflow` WRITE;
/*!40000 ALTER TABLE `product_inflow` DISABLE KEYS */;
INSERT INTO `product_inflow` VALUES (1,10,10000,1,'2020-01-05'),(2,2,400,3,'2020-04-02'),(3,10,500,5,'2020-09-25'),(4,15,15000,1,'2020-10-11'),(5,55,10,11,'2021-04-18'),(6,NULL,40000,3,'2021-04-19'),(7,NULL,80000,5,'2021-04-19'),(8,NULL,80000,5,'2021-04-19'),(9,NULL,5000000,3,'2021-04-19'),(10,9,8000,2,'2021-04-19'),(11,10,700000,4,'2021-04-19'),(12,NULL,10000,2,'2021-04-19'),(13,20,10000,2,'2021-04-19');
/*!40000 ALTER TABLE `product_inflow` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_owner`
--

DROP TABLE IF EXISTS `product_owner`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `product_owner` (
  `product_product_id` int(11) NOT NULL,
  `owner_owner_id` int(11) NOT NULL,
  `date` date DEFAULT NULL,
  PRIMARY KEY (`product_product_id`,`owner_owner_id`),
  KEY `owner_id_idx` (`owner_owner_id`),
  CONSTRAINT `idx2_product_product_id2` FOREIGN KEY (`product_product_id`) REFERENCES `product` (`product_id`),
  CONSTRAINT `owner_id` FOREIGN KEY (`owner_owner_id`) REFERENCES `owner` (`owner_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_owner`
--

LOCK TABLES `product_owner` WRITE;
/*!40000 ALTER TABLE `product_owner` DISABLE KEYS */;
INSERT INTO `product_owner` VALUES (1,1,'2020-01-01'),(2,1,'2021-04-19'),(3,1,'2021-04-19'),(11,1,'2021-04-18');
/*!40000 ALTER TABLE `product_owner` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_storge_date`
--

DROP TABLE IF EXISTS `product_storge_date`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `product_storge_date` (
  `product_product_id` int(11) NOT NULL,
  `storge_date_no` int(11) NOT NULL,
  `storge_date` date DEFAULT NULL,
  PRIMARY KEY (`product_product_id`,`storge_date_no`),
  CONSTRAINT `product_id3` FOREIGN KEY (`product_product_id`) REFERENCES `product` (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_storge_date`
--

LOCK TABLES `product_storge_date` WRITE;
/*!40000 ALTER TABLE `product_storge_date` DISABLE KEYS */;
INSERT INTO `product_storge_date` VALUES (1,1,NULL),(1,3,NULL),(2,2,NULL),(5,4,NULL);
/*!40000 ALTER TABLE `product_storge_date` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_type`
--

DROP TABLE IF EXISTS `product_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `product_type` (
  `type_id` int(11) NOT NULL AUTO_INCREMENT,
  `type_name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `other_spec` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `price` float DEFAULT NULL,
  `amount_product` int(11) DEFAULT NULL,
  `brand` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `product_product_id` int(11) NOT NULL,
  `image` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`type_id`,`product_product_id`),
  KEY `product4_idx` (`product_product_id`),
  CONSTRAINT `product4` FOREIGN KEY (`product_product_id`) REFERENCES `product` (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_type`
--

LOCK TABLES `product_type` WRITE;
/*!40000 ALTER TABLE `product_type` DISABLE KEYS */;
INSERT INTO `product_type` VALUES (1,'เสียงกลาง','เสียงดังระดับจักวาล ขนาด 14นิ้ว',1500,10,'jvc',1,NULL),(2,'ขับรถ','เสียงดังระดับจักโลก ขนาด 12นิ้ว',10000,39,'jvct',2,NULL),(3,NULL,'ความโปร่งใส40%',5000000,NULL,'lamina',3,NULL),(4,'4ดิน','มีจอขนาด 8 นิ้ว',700000,10,'jvc',4,NULL),(5,NULL,'ความชัดระดับHDมีinfrarede',80000,NULL,'cameaw',5,NULL),(6,'เซ็นเซิ่อถอย','ระยะ15เมตรเสียงเตื่อนเมื่อใกล่วัตถุ',1000,5,'tomato',6,NULL),(7,'1ดิน','มีบูทรูตและช่องUSB',1600,6,'jvc',7,NULL),(8,'ลำโพงรถ','ฝังเพชร',500000,1,'โซนวย',7,'\\uploads\\myImage-1618468000578.jpg'),(9,'test','test',5000000,110,'test',9,'\\uploads\\myImage-1618553512365.jfif'),(10,'adsas','adsas',10,35,'adsas',10,'\\uploads\\myImage-1618727732204.png'),(11,'zx','zx',10,55,'zx',11,'\\uploads\\myImage-1618728153279.jpg');
/*!40000 ALTER TABLE `product_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_status` enum('customer','owner') COLLATE utf8_unicode_ci DEFAULT 'customer',
  `user_fname` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `user_lname` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `user_phone` char(10) COLLATE utf8_unicode_ci DEFAULT NULL,
  `user_image` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  KEY `idx_account_user_user_id` (`user_id`),
  KEY `idx2_user_user_id` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'customer','Phawit','Sapthaweekarn','0909934126',NULL),(2,'owner','Faluk','josh','0123456789',NULL),(7,'customer','fluke','8910','0614194945',NULL),(8,'customer','fluke','8910','0614194942',NULL),(9,'customer','bank','jimjimjosh','0588891999',NULL),(10,'customer','tuu','tuu','1234444444',NULL),(11,'customer','tuus','tuus','1222222222',NULL),(12,'customer','jimm','tuus','1231111111',NULL),(13,'customer','champ','wow','1111111111',NULL),(14,'customer','sahaim','longky','2222222222',NULL),(15,'customer','Phaw','adaw','0123456751',NULL),(17,'customer','asd','asd','1561156156',NULL),(18,'customer','asd','asd','1156116156',NULL),(19,'customer','ad','ad','1111111111',NULL),(20,'customer',NULL,NULL,NULL,NULL),(21,'customer','zxc','zx','1111111111',NULL),(22,'customer','sad','wqe','1233125555',NULL),(23,'customer','asd','wq','3123231233','\\uploads\\myImage-1618208955031.jpg');
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

-- Dump completed on 2021-04-20  9:12:41
