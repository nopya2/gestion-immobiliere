-- MariaDB dump 10.19  Distrib 10.4.24-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: groupe_education
-- ------------------------------------------------------
-- Server version	10.4.24-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Dumping data for table `doctrine_migration_versions`
--

LOCK TABLES `doctrine_migration_versions` WRITE;
/*!40000 ALTER TABLE `doctrine_migration_versions` DISABLE KEYS */;
INSERT INTO `doctrine_migration_versions` VALUES ('DoctrineMigrations\\Version20220526152803','2022-05-26 17:28:33',7414),('DoctrineMigrations\\Version20220530224827','2022-05-31 00:49:28',4901),('DoctrineMigrations\\Version20220531003017','2022-05-31 02:31:14',1908),('DoctrineMigrations\\Version20220531003312','2022-05-31 02:33:23',367),('DoctrineMigrations\\Version20220531003651','2022-05-31 02:37:02',507),('DoctrineMigrations\\Version20220531004109','2022-05-31 02:41:31',407),('DoctrineMigrations\\Version20220609205826','2022-06-09 23:00:47',4623),('DoctrineMigrations\\Version20220609210823','2022-06-09 23:08:41',855),('DoctrineMigrations\\Version20220609212423','2022-06-09 23:25:04',773),('DoctrineMigrations\\Version20220609225204','2022-06-10 00:52:40',1263),('DoctrineMigrations\\Version20220611232506','2022-06-12 01:26:01',2022),('DoctrineMigrations\\Version20220611235951','2022-06-12 02:00:06',2997),('DoctrineMigrations\\Version20220612000443','2022-06-12 02:05:00',1335),('DoctrineMigrations\\Version20220613201535','2022-06-13 22:16:04',2219),('DoctrineMigrations\\Version20220613210552','2022-06-13 23:09:52',1027),('DoctrineMigrations\\Version20220613224211','2022-06-14 00:42:27',3941),('DoctrineMigrations\\Version20220613224441','2022-06-14 00:44:51',2392),('DoctrineMigrations\\Version20220614032517','2022-06-14 05:26:32',11854),('DoctrineMigrations\\Version20220619201933','2022-06-19 22:19:52',3468),('DoctrineMigrations\\Version20220619203851','2022-06-19 22:39:21',878),('DoctrineMigrations\\Version20220619205743','2022-06-19 22:58:01',1665),('DoctrineMigrations\\Version20220619210650','2022-06-19 23:07:08',3331),('DoctrineMigrations\\Version20220619212837','2022-06-19 23:28:50',2756),('DoctrineMigrations\\Version20220619214102','2022-06-19 23:41:35',2702),('DoctrineMigrations\\Version20220620085953','2022-06-20 11:03:41',1439);
/*!40000 ALTER TABLE `doctrine_migration_versions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `etablishment`
--

LOCK TABLES `etablishment` WRITE;
/*!40000 ALTER TABLE `etablishment` DISABLE KEYS */;
INSERT INTO `etablishment` VALUES (12,'Hollee Harrington','kihy@mailinator.com','Officia delectus ve','vahoqyt@mailinator.com','Gabon','https://www.qum.org.uk','2022-06-14 02:42:26','2022-06-14 02:42:26','a:1:{i:0;s:12:\"+24112234296\";}',11,'SECONDAIRE','',NULL),(13,'Lycee Prive du PK13','pk13@gmail.com','PK13','Libreville','Gabon',NULL,'2022-06-14 02:46:22','2022-06-14 02:46:22','a:2:{i:0;s:12:\"+24162382842\";i:1;s:12:\"+24177907499\";}',12,'SECONDAIRE',NULL,NULL);
/*!40000 ALTER TABLE `etablishment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `image`
--

LOCK TABLES `image` WRITE;
/*!40000 ALTER TABLE `image` DISABLE KEYS */;
INSERT INTO `image` VALUES (3,'uploads/images/etablishments/62a5ba0236045.png','image/jpeg',38555,'uploads/images/etablishments/62a5ba0236045.png'),(4,'274061401_5211721385546913_8478922134820435789_n.jpg','image/jpeg',38555,'uploads/images/etablishments/62a5e32a2ca20.png'),(6,'tof-site-jt-150222.jpg','image/jpeg',53680,'uploads/images/etablishments/62a5e202af81c.png'),(11,'274061401_5211721385546913_8478922134820435789_n.jpg','image/jpeg',38555,'uploads/images/etablishments/62a7d9750239b.png'),(12,'batiment.PNG','image/png',555411,'uploads/images/etablishments/62a7da5ebfc38.png');
/*!40000 ALTER TABLE `image` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `module`
--

LOCK TABLES `module` WRITE;
/*!40000 ALTER TABLE `module` DISABLE KEYS */;
INSERT INTO `module` VALUES (7,'Utilisateur','utilisateur',''),(8,'Etablissement','etablissement','');
/*!40000 ALTER TABLE `module` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `module_permission`
--

LOCK TABLES `module_permission` WRITE;
/*!40000 ALTER TABLE `module_permission` DISABLE KEYS */;
INSERT INTO `module_permission` VALUES (7,1),(7,2),(7,3),(7,4),(7,8),(8,1),(8,2),(8,3),(8,4),(8,8);
/*!40000 ALTER TABLE `module_permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `permission`
--

LOCK TABLES `permission` WRITE;
/*!40000 ALTER TABLE `permission` DISABLE KEYS */;
INSERT INTO `permission` VALUES (1,'Consulter','consulter'),(2,'Créer','creer'),(3,'Modifier','modifier'),(4,'Supprimer','supprimer'),(5,'Valider','valider'),(8,'Exporter','exporter');
/*!40000 ALTER TABLE `permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `phone`
--

LOCK TABLES `phone` WRITE;
/*!40000 ALTER TABLE `phone` DISABLE KEYS */;
/*!40000 ALTER TABLE `phone` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `privilege`
--

LOCK TABLES `privilege` WRITE;
/*!40000 ALTER TABLE `privilege` DISABLE KEYS */;
INSERT INTO `privilege` VALUES (3,7,1,4),(4,7,2,4),(5,7,3,4),(6,7,4,4),(7,7,8,4),(8,8,1,4),(9,8,2,4),(10,8,3,4),(11,8,4,4),(12,8,8,4),(13,8,1,3),(14,7,1,3);
/*!40000 ALTER TABLE `privilege` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES (3,'Administrateur','Tous les droits'),(4,'Directeur General','Directeur General');
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `symfony_demo_comment`
--

LOCK TABLES `symfony_demo_comment` WRITE;
/*!40000 ALTER TABLE `symfony_demo_comment` DISABLE KEYS */;
/*!40000 ALTER TABLE `symfony_demo_comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `symfony_demo_post`
--

LOCK TABLES `symfony_demo_post` WRITE;
/*!40000 ALTER TABLE `symfony_demo_post` DISABLE KEYS */;
/*!40000 ALTER TABLE `symfony_demo_post` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `symfony_demo_post_tag`
--

LOCK TABLES `symfony_demo_post_tag` WRITE;
/*!40000 ALTER TABLE `symfony_demo_post_tag` DISABLE KEYS */;
/*!40000 ALTER TABLE `symfony_demo_post_tag` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `symfony_demo_tag`
--

LOCK TABLES `symfony_demo_tag` WRITE;
/*!40000 ALTER TABLE `symfony_demo_tag` DISABLE KEYS */;
/*!40000 ALTER TABLE `symfony_demo_tag` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (5,'kala ndong','christ jonathan','christ.kala','christ.kala@education.ga','$2y$13$SV8m41Buo14aQz2vB7mUsut4PuB/fym1N6CAE0HYyKBzjHFf7cPQe','[\"ROLE_DG\"]','77454754','66089842',1,'user',NULL),(37,'ndong otogue','yvon paul brice','yvon.ndong','yvon.ndong@education.ga','$2y$13$SV8m41Buo14aQz2vB7mUsut4PuB/fym1N6CAE0HYyKBzjHFf7cPQe','[\"ROLE_ADMIN\"]','77454754','66089842',1,'user',NULL);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-06-24 12:09:53
