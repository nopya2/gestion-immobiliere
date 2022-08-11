-- MySQL dump 10.19  Distrib 10.3.34-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: groupe_education
-- ------------------------------------------------------
-- Server version	10.3.34-MariaDB-0ubuntu0.20.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `academic_year`
--

DROP TABLE IF EXISTS `academic_year`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `academic_year` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `etablishment_id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `created_at` datetime DEFAULT NULL COMMENT '(DC2Type:datetime_immutable)',
  PRIMARY KEY (`id`),
  KEY `IDX_275AE72116BE0BCF` (`etablishment_id`),
  CONSTRAINT `FK_275AE72116BE0BCF` FOREIGN KEY (`etablishment_id`) REFERENCES `etablishment` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `academic_year`
--

LOCK TABLES `academic_year` WRITE;
/*!40000 ALTER TABLE `academic_year` DISABLE KEYS */;
/*!40000 ALTER TABLE `academic_year` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cycle`
--

DROP TABLE IF EXISTS `cycle`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cycle` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` longtext COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` datetime NOT NULL COMMENT '(DC2Type:datetime_immutable)',
  `updated_at` datetime NOT NULL COMMENT '(DC2Type:datetime_immutable)',
  `etablishment_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `IDX_B086D19316BE0BCF` (`etablishment_id`),
  CONSTRAINT `FK_B086D19316BE0BCF` FOREIGN KEY (`etablishment_id`) REFERENCES `etablishment` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cycle`
--

LOCK TABLES `cycle` WRITE;
/*!40000 ALTER TABLE `cycle` DISABLE KEYS */;
INSERT INTO `cycle` VALUES (1,'Licence','licence','2022-08-11 18:06:33','2022-08-11 18:06:33',1),(2,'Maitrise','Maitrise','2022-08-11 18:15:09','2022-08-11 18:15:09',1),(3,'Doctorat','Doctorat','2022-08-11 18:15:42','2022-08-11 18:15:42',1);
/*!40000 ALTER TABLE `cycle` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `diploma`
--

DROP TABLE IF EXISTS `diploma`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `diploma` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `etablishment_id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `duration` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `IDX_EC21895716BE0BCF` (`etablishment_id`),
  CONSTRAINT `FK_EC21895716BE0BCF` FOREIGN KEY (`etablishment_id`) REFERENCES `etablishment` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `diploma`
--

LOCK TABLES `diploma` WRITE;
/*!40000 ALTER TABLE `diploma` DISABLE KEYS */;
INSERT INTO `diploma` VALUES (1,1,'Licence','Bac+3',3),(2,1,'Master','Bac+5',5),(4,1,'Doctorat','Bac+7',7),(5,1,'BTS','Brevet de Technicien Supérieur',2),(6,1,'DUT','Diplôme Universitaire de Technologie',2);
/*!40000 ALTER TABLE `diploma` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `doctrine_migration_versions`
--

DROP TABLE IF EXISTS `doctrine_migration_versions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `doctrine_migration_versions` (
  `version` varchar(191) COLLATE utf8_unicode_ci NOT NULL,
  `executed_at` datetime DEFAULT NULL,
  `execution_time` int(11) DEFAULT NULL,
  PRIMARY KEY (`version`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `doctrine_migration_versions`
--

LOCK TABLES `doctrine_migration_versions` WRITE;
/*!40000 ALTER TABLE `doctrine_migration_versions` DISABLE KEYS */;
INSERT INTO `doctrine_migration_versions` VALUES ('DoctrineMigrations\\Version20220624101531','2022-07-09 12:33:13',4537),('DoctrineMigrations\\Version20220628091307','2022-07-09 12:33:17',2357),('DoctrineMigrations\\Version20220709114451','2022-07-09 12:45:03',16629),('DoctrineMigrations\\Version20220711105435','2022-07-11 11:54:46',1784),('DoctrineMigrations\\Version20220711155643','2022-07-11 16:56:54',949),('DoctrineMigrations\\Version20220711161616','2022-07-11 17:16:20',2606),('DoctrineMigrations\\Version20220711162516','2022-07-11 17:25:27',1428),('DoctrineMigrations\\Version20220712144135','2022-07-12 15:41:47',1197),('DoctrineMigrations\\Version20220712164613','2022-07-12 17:46:25',88),('DoctrineMigrations\\Version20220713143809','2022-07-13 15:38:22',1685),('DoctrineMigrations\\Version20220713145053','2022-07-13 15:50:58',1454),('DoctrineMigrations\\Version20220713145231','2022-07-13 15:52:33',1041),('DoctrineMigrations\\Version20220713151920','2022-07-13 16:19:31',2140),('DoctrineMigrations\\Version20220714121904','2022-07-14 13:19:19',5907),('DoctrineMigrations\\Version20220714124556','2022-07-14 13:46:07',58),('DoctrineMigrations\\Version20220714125945','2022-07-14 14:05:16',1488),('DoctrineMigrations\\Version20220715140108','2022-07-15 15:01:17',1540),('DoctrineMigrations\\Version20220810173613','2022-08-10 18:36:24',1759),('DoctrineMigrations\\Version20220810173831','2022-08-10 18:38:42',54),('DoctrineMigrations\\Version20220810174240','2022-08-10 18:42:58',1253),('DoctrineMigrations\\Version20220811145552','2022-08-11 15:56:05',138),('DoctrineMigrations\\Version20220811152535','2022-08-11 16:25:50',260),('DoctrineMigrations\\Version20220811163459','2022-08-11 17:35:08',1451);
/*!40000 ALTER TABLE `doctrine_migration_versions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employee`
--

DROP TABLE IF EXISTS `employee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `employee` (
  `id` int(11) NOT NULL,
  `etablishment_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `IDX_5D9F75A116BE0BCF` (`etablishment_id`),
  CONSTRAINT `FK_5D9F75A116BE0BCF` FOREIGN KEY (`etablishment_id`) REFERENCES `etablishment` (`id`),
  CONSTRAINT `FK_5D9F75A1BF396750` FOREIGN KEY (`id`) REFERENCES `user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee`
--

LOCK TABLES `employee` WRITE;
/*!40000 ALTER TABLE `employee` DISABLE KEYS */;
INSERT INTO `employee` VALUES (42,1),(43,1),(46,1),(47,1),(48,1),(49,1);
/*!40000 ALTER TABLE `employee` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `etablishment`
--

DROP TABLE IF EXISTS `etablishment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `etablishment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `logo_id` int(11) DEFAULT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `address` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `city` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `country` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `website` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` datetime DEFAULT NULL COMMENT '(DC2Type:datetime_immutable)',
  `updated_at` datetime DEFAULT NULL COMMENT '(DC2Type:datetime_immutable)',
  `phones` longtext COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '(DC2Type:array)',
  `etablishment_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `postal_box` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `manager_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UNIQ_5FB710525E237E06` (`name`),
  UNIQUE KEY `UNIQ_5FB71052F98F144A` (`logo_id`),
  UNIQUE KEY `UNIQ_5FB71052783E3463` (`manager_id`),
  CONSTRAINT `FK_5FB71052783E3463` FOREIGN KEY (`manager_id`) REFERENCES `manager` (`id`),
  CONSTRAINT `FK_5FB71052F98F144A` FOREIGN KEY (`logo_id`) REFERENCES `image` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `etablishment`
--

LOCK TABLES `etablishment` WRITE;
/*!40000 ALTER TABLE `etablishment` DISABLE KEYS */;
INSERT INTO `etablishment` VALUES (1,1,'Centre des métiers de la femme','cemef@edgucation.ga','Libreville','Libreville','Gabon',NULL,'2022-07-11 11:44:29','2022-07-11 11:44:29','a:2:{i:0;s:12:\"+24111720892\";i:1;s:12:\"+24111721064\";}','PROFESSIONNEL','4105 libreville',8);
/*!40000 ALTER TABLE `etablishment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `faculty`
--

DROP TABLE IF EXISTS `faculty`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `faculty` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `etablishment_id` int(11) DEFAULT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `code` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UNIQ_1796604377153098` (`code`),
  UNIQUE KEY `UNIQ_179660435E237E06` (`name`),
  KEY `IDX_1796604316BE0BCF` (`etablishment_id`),
  CONSTRAINT `FK_1796604316BE0BCF` FOREIGN KEY (`etablishment_id`) REFERENCES `etablishment` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `faculty`
--

LOCK TABLES `faculty` WRITE;
/*!40000 ALTER TABLE `faculty` DISABLE KEYS */;
INSERT INTO `faculty` VALUES (2,1,'Economie Pétrolière','Economie Pétrolière','EP'),(3,1,'Economie numérique','Economie numérique','EN');
/*!40000 ALTER TABLE `faculty` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `faculty_diploma`
--

DROP TABLE IF EXISTS `faculty_diploma`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `faculty_diploma` (
  `faculty_id` int(11) NOT NULL,
  `diploma_id` int(11) NOT NULL,
  PRIMARY KEY (`faculty_id`,`diploma_id`),
  KEY `IDX_AD325F0D680CAB68` (`faculty_id`),
  KEY `IDX_AD325F0DA99ACEB5` (`diploma_id`),
  CONSTRAINT `FK_AD325F0D680CAB68` FOREIGN KEY (`faculty_id`) REFERENCES `faculty` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_AD325F0DA99ACEB5` FOREIGN KEY (`diploma_id`) REFERENCES `diploma` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `faculty_diploma`
--

LOCK TABLES `faculty_diploma` WRITE;
/*!40000 ALTER TABLE `faculty_diploma` DISABLE KEYS */;
INSERT INTO `faculty_diploma` VALUES (2,1),(2,2),(2,4),(3,1),(3,2),(3,4);
/*!40000 ALTER TABLE `faculty_diploma` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `image`
--

DROP TABLE IF EXISTS `image`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `image` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `filename` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `extension` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `size` double NOT NULL,
  `url` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `image`
--

LOCK TABLES `image` WRITE;
/*!40000 ALTER TABLE `image` DISABLE KEYS */;
INSERT INTO `image` VALUES (1,'téléchargement.png','image/png',8093,'uploads/images/etablishments/62cbff0d1c59d.png');
/*!40000 ALTER TABLE `image` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `information`
--

DROP TABLE IF EXISTS `information`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `information` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `etablishment_id` int(11) DEFAULT NULL,
  `academic_year` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `start_year` date DEFAULT NULL,
  `end_year` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UNIQ_2979188316BE0BCF` (`etablishment_id`),
  CONSTRAINT `FK_2979188316BE0BCF` FOREIGN KEY (`etablishment_id`) REFERENCES `etablishment` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `information`
--

LOCK TABLES `information` WRITE;
/*!40000 ALTER TABLE `information` DISABLE KEYS */;
INSERT INTO `information` VALUES (1,1,NULL,NULL,NULL);
/*!40000 ALTER TABLE `information` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `learner`
--

DROP TABLE IF EXISTS `learner`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `learner` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `firstname` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `birthdate` date NOT NULL,
  `birthplace` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `sex` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `address` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `identity_photo_id` int(11) DEFAULT NULL,
  `postal_box` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `district` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `registration_number` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime NOT NULL COMMENT '(DC2Type:datetime_immutable)',
  `updated_at` datetime NOT NULL COMMENT '(DC2Type:datetime_immutable)',
  PRIMARY KEY (`id`),
  UNIQUE KEY `UNIQ_8EF383438CEDFBE` (`registration_number`),
  UNIQUE KEY `UNIQ_8EF38343D751045` (`identity_photo_id`),
  CONSTRAINT `FK_8EF38343D751045` FOREIGN KEY (`identity_photo_id`) REFERENCES `image` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `learner`
--

LOCK TABLES `learner` WRITE;
/*!40000 ALTER TABLE `learner` DISABLE KEYS */;
/*!40000 ALTER TABLE `learner` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `learner_parent`
--

DROP TABLE IF EXISTS `learner_parent`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `learner_parent` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `phone_id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `firstname` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `relationship` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UNIQ_1F88FBAC3B7323CB` (`phone_id`),
  CONSTRAINT `FK_1F88FBAC3B7323CB` FOREIGN KEY (`phone_id`) REFERENCES `phone` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `learner_parent`
--

LOCK TABLES `learner_parent` WRITE;
/*!40000 ALTER TABLE `learner_parent` DISABLE KEYS */;
/*!40000 ALTER TABLE `learner_parent` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `level`
--

DROP TABLE IF EXISTS `level`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `level` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `faculty_id` int(11) NOT NULL,
  `etablishment_id` int(11) NOT NULL,
  `obtained_diploma_id` int(11) DEFAULT NULL,
  `prepared_diploma_id` int(11) NOT NULL,
  `code` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime NOT NULL COMMENT '(DC2Type:datetime_immutable)',
  `updated_at` datetime NOT NULL COMMENT '(DC2Type:datetime_immutable)',
  `duration` int(11) NOT NULL,
  `level_type_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `IDX_9AEACC13680CAB68` (`faculty_id`),
  KEY `IDX_9AEACC1316BE0BCF` (`etablishment_id`),
  KEY `IDX_9AEACC137A45AADA` (`obtained_diploma_id`),
  KEY `IDX_9AEACC135F4DC7F1` (`prepared_diploma_id`),
  KEY `IDX_9AEACC1364E4A98C` (`level_type_id`),
  CONSTRAINT `FK_9AEACC1316BE0BCF` FOREIGN KEY (`etablishment_id`) REFERENCES `etablishment` (`id`),
  CONSTRAINT `FK_9AEACC135F4DC7F1` FOREIGN KEY (`prepared_diploma_id`) REFERENCES `diploma` (`id`),
  CONSTRAINT `FK_9AEACC1364E4A98C` FOREIGN KEY (`level_type_id`) REFERENCES `level_type` (`id`),
  CONSTRAINT `FK_9AEACC13680CAB68` FOREIGN KEY (`faculty_id`) REFERENCES `faculty` (`id`),
  CONSTRAINT `FK_9AEACC137A45AADA` FOREIGN KEY (`obtained_diploma_id`) REFERENCES `diploma` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `level`
--

LOCK TABLES `level` WRITE;
/*!40000 ALTER TABLE `level` DISABLE KEYS */;
INSERT INTO `level` VALUES (2,'Jolie Castillo','<p><strong>Ea vitae ullamco aut.</strong></p>',3,1,NULL,2,'ETTt','2022-08-10 17:52:23','2022-08-10 17:52:23',98,2),(3,'Nicole Odom','<p>Sint quia in velit d.</p>',3,1,2,2,'ETTTt','2022-08-10 17:52:46','2022-08-10 17:52:46',85,2),(4,'Mikayla Snider','<p>Fugiat, quaerat et a.</p>',2,1,2,1,'ETTTT','2022-08-10 17:55:59','2022-08-10 17:55:59',26,2),(5,'Geoffrey Holloway','<p>Quo quod sed dicta l.</p>',2,1,NULL,1,'GH','2022-08-11 16:15:49','2022-08-11 16:15:49',9,1);
/*!40000 ALTER TABLE `level` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `level_type`
--

DROP TABLE IF EXISTS `level_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `level_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `etablishment_id` int(11) DEFAULT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `code` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `level` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UNIQ_E5FBAC385E237E06` (`name`),
  UNIQUE KEY `UNIQ_E5FBAC3877153098` (`code`),
  KEY `IDX_E5FBAC3816BE0BCF` (`etablishment_id`),
  CONSTRAINT `FK_E5FBAC3816BE0BCF` FOREIGN KEY (`etablishment_id`) REFERENCES `etablishment` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `level_type`
--

LOCK TABLES `level_type` WRITE;
/*!40000 ALTER TABLE `level_type` DISABLE KEYS */;
INSERT INTO `level_type` VALUES (1,1,'Licence 1','L1','Bac+1'),(2,1,'Master 1','M1','Bac+4'),(3,1,'DUT1','DUT1','Bac+1'),(4,1,'DUT2','DUT2','Bac+2'),(5,1,'Licence 2','L2','Bac+2'),(6,1,'Licence 3','L3','Bac+3'),(7,1,'Master 2','M2','Bac+5');
/*!40000 ALTER TABLE `level_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `manager`
--

DROP TABLE IF EXISTS `manager`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `manager` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `employee_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UNIQ_FA2425B98C03F15C` (`employee_id`),
  CONSTRAINT `FK_FA2425B98C03F15C` FOREIGN KEY (`employee_id`) REFERENCES `employee` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `manager`
--

LOCK TABLES `manager` WRITE;
/*!40000 ALTER TABLE `manager` DISABLE KEYS */;
INSERT INTO `manager` VALUES (5,43),(8,46);
/*!40000 ALTER TABLE `manager` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `module`
--

DROP TABLE IF EXISTS `module`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `module` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` longtext COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `module`
--

LOCK TABLES `module` WRITE;
/*!40000 ALTER TABLE `module` DISABLE KEYS */;
INSERT INTO `module` VALUES (1,'Etablissement','etablissement','Gestion des établissements'),(2,'Employé','employe','Gestion des employés'),(3,'Diplôme','diplome','Gestion des diplômes');
/*!40000 ALTER TABLE `module` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `module_permission`
--

DROP TABLE IF EXISTS `module_permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `module_permission` (
  `module_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL,
  PRIMARY KEY (`module_id`,`permission_id`),
  KEY `IDX_75ACB937AFC2B591` (`module_id`),
  KEY `IDX_75ACB937FED90CCA` (`permission_id`),
  CONSTRAINT `FK_75ACB937AFC2B591` FOREIGN KEY (`module_id`) REFERENCES `module` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_75ACB937FED90CCA` FOREIGN KEY (`permission_id`) REFERENCES `permission` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `module_permission`
--

LOCK TABLES `module_permission` WRITE;
/*!40000 ALTER TABLE `module_permission` DISABLE KEYS */;
INSERT INTO `module_permission` VALUES (1,1),(1,2),(1,3),(1,4),(2,1),(2,2),(2,3),(2,4),(3,1),(3,2),(3,3),(3,4);
/*!40000 ALTER TABLE `module_permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `permission`
--

DROP TABLE IF EXISTS `permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `permission` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permission`
--

LOCK TABLES `permission` WRITE;
/*!40000 ALTER TABLE `permission` DISABLE KEYS */;
INSERT INTO `permission` VALUES (1,'Lister','lister'),(2,'Créer','creer'),(3,'Modifier','modifier'),(4,'Supprimer','supprimer'),(5,'Valider','validater');
/*!40000 ALTER TABLE `permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `phone`
--

DROP TABLE IF EXISTS `phone`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `phone` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `phone_number` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `phone`
--

LOCK TABLES `phone` WRITE;
/*!40000 ALTER TABLE `phone` DISABLE KEYS */;
/*!40000 ALTER TABLE `phone` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `privilege`
--

DROP TABLE IF EXISTS `privilege`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `privilege` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `module_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL,
  `role_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `IDX_87209A87AFC2B591` (`module_id`),
  KEY `IDX_87209A87FED90CCA` (`permission_id`),
  KEY `IDX_87209A87D60322AC` (`role_id`),
  CONSTRAINT `FK_87209A87AFC2B591` FOREIGN KEY (`module_id`) REFERENCES `module` (`id`),
  CONSTRAINT `FK_87209A87D60322AC` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`),
  CONSTRAINT `FK_87209A87FED90CCA` FOREIGN KEY (`permission_id`) REFERENCES `permission` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `privilege`
--

LOCK TABLES `privilege` WRITE;
/*!40000 ALTER TABLE `privilege` DISABLE KEYS */;
INSERT INTO `privilege` VALUES (1,1,1,1),(2,1,2,1),(3,1,3,1),(4,1,4,1),(5,2,1,2),(6,2,2,2),(7,2,3,2),(8,2,4,2),(9,2,1,3),(10,2,2,3),(11,2,3,3),(12,2,4,3),(13,1,1,3),(14,1,3,3),(15,2,1,4),(16,2,3,4),(17,2,1,5),(18,2,2,5),(19,2,3,5),(20,2,4,5),(21,1,1,5),(22,1,3,5);
/*!40000 ALTER TABLE `privilege` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `role` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` longtext COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES (1,'Administrateur','Toutes les permissions'),(2,'Informaticien Secondaire','L\'informaticien pour le secondaire'),(3,'Informaticien Supérieur','Informaticien du supérieur'),(4,'Informaticien Formation Professionnelle','Gestionnaire de la formation professionnelle'),(5,'Responsable d\'établissement','');
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `symfony_demo_comment`
--

DROP TABLE IF EXISTS `symfony_demo_comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `symfony_demo_comment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `post_id` int(11) NOT NULL,
  `author_id` int(11) NOT NULL,
  `content` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `published_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `IDX_53AD8F834B89032C` (`post_id`),
  KEY `IDX_53AD8F83F675F31B` (`author_id`),
  CONSTRAINT `FK_53AD8F834B89032C` FOREIGN KEY (`post_id`) REFERENCES `symfony_demo_post` (`id`),
  CONSTRAINT `FK_53AD8F83F675F31B` FOREIGN KEY (`author_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `symfony_demo_comment`
--

LOCK TABLES `symfony_demo_comment` WRITE;
/*!40000 ALTER TABLE `symfony_demo_comment` DISABLE KEYS */;
/*!40000 ALTER TABLE `symfony_demo_comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `symfony_demo_post`
--

DROP TABLE IF EXISTS `symfony_demo_post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `symfony_demo_post` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `author_id` int(11) NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `summary` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `content` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `published_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `IDX_58A92E65F675F31B` (`author_id`),
  CONSTRAINT `FK_58A92E65F675F31B` FOREIGN KEY (`author_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `symfony_demo_post`
--

LOCK TABLES `symfony_demo_post` WRITE;
/*!40000 ALTER TABLE `symfony_demo_post` DISABLE KEYS */;
/*!40000 ALTER TABLE `symfony_demo_post` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `symfony_demo_post_tag`
--

DROP TABLE IF EXISTS `symfony_demo_post_tag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `symfony_demo_post_tag` (
  `post_id` int(11) NOT NULL,
  `tag_id` int(11) NOT NULL,
  PRIMARY KEY (`post_id`,`tag_id`),
  KEY `IDX_6ABC1CC44B89032C` (`post_id`),
  KEY `IDX_6ABC1CC4BAD26311` (`tag_id`),
  CONSTRAINT `FK_6ABC1CC44B89032C` FOREIGN KEY (`post_id`) REFERENCES `symfony_demo_post` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_6ABC1CC4BAD26311` FOREIGN KEY (`tag_id`) REFERENCES `symfony_demo_tag` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `symfony_demo_post_tag`
--

LOCK TABLES `symfony_demo_post_tag` WRITE;
/*!40000 ALTER TABLE `symfony_demo_post_tag` DISABLE KEYS */;
/*!40000 ALTER TABLE `symfony_demo_post_tag` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `symfony_demo_tag`
--

DROP TABLE IF EXISTS `symfony_demo_tag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `symfony_demo_tag` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UNIQ_4D5855405E237E06` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `symfony_demo_tag`
--

LOCK TABLES `symfony_demo_tag` WRITE;
/*!40000 ALTER TABLE `symfony_demo_tag` DISABLE KEYS */;
/*!40000 ALTER TABLE `symfony_demo_tag` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `firstname` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `username` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `roles` longtext COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '(DC2Type:json)',
  `phone_number1` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone_number2` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `enabled` tinyint(1) DEFAULT NULL,
  `discr` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UNIQ_8D93D649F85E0677` (`username`),
  UNIQUE KEY `UNIQ_8D93D649E7927C74` (`email`),
  KEY `IDX_8D93D649D60322AC` (`role_id`),
  CONSTRAINT `FK_8D93D649D60322AC` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (5,'kala ndong','christ jonathan','christ.kala','christ.kala@education.ga','$2y$13$BM.qDObAXWnR7NsEQu1aCe4Z8HQBGYzNB18mjwjr0DVV0heVVmw5e','[\"ROLE_DG\"]','+24177454754','+24166089842',1,'user',4),(37,'ndong otogue','yvon paul brice','yvon.ndong','yvon.ndong@education.ga','$2y$13$nF93v0bfwr777JTLbuHAyuxxaomRa260Bm4fFaYEfb/GmrCS5Sh1S','[\"ROLE_ADMIN\"]','+24177454754','+24166089842',1,'user',1),(38,'mayombo','ted','ted@education.ga','ted@education.ga','$2y$13$fF8823Kt4t8.wd.JISkN3.B51UQLW68wNe7joFCnvVDV90g3MJnB.','[\"ROLE_USER\"]','+24166666666',NULL,1,'user',1),(39,'Zachary Aguirre','Desirae','terulebade','qaquzeku@mailinator.com','$2y$13$A5tKvLetQn.yHHROvfH.VOQZOZvg0MkgMDmDN3nTQ9CRXSvwJ7FZ.','[\"ROLE_USER\"]','+24107721230','+24107773912',1,'user',2),(42,'Debra Bond','Howard','xerofitu','rego@mailinator.com','$2y$13$nF93v0bfwr777JTLbuHAyuxxaomRa260Bm4fFaYEfb/GmrCS5Sh1S','[\"ROLE_USER\"]','+24107763647','+24107774830',1,'employee',3),(43,'Blossom Roman','Ignatius','baxomagun','fesahyquzo@mailinator.com','$2y$13$QcNecxb66csO1KjeOmsC6.cHtsUREB/MwQhVTTOT34nSHSbBntVFy','[\"ROLE_USER\"]','+24107768457','+24107715412',1,'employee',5),(45,'Arden Schroeder','Jemima','sezewytupu','vexahi@mailinator.com','$2y$13$YTOlwxrZtQu5YlSPWKONCOkEct460dSDaGjn2GB6IAGvmot1i1u9y','[\"ROLE_USER\"]','+24107729829','+24107750172',1,'user',3),(46,'Justine Bowman','Vance','qyqeg','nyxenepyc@mailinator.com','$2y$13$aJj83VbR8orciLTo1WfZDOMVbKjut.NJjsl7n8yrRNAtphAj3dB.O','[\"ROLE_USER\"]','+24107740131','+24107769657',1,'employee',5),(47,'Echo Craig','Shelly','vodegate','jogy@mailinator.com','$2y$13$LVuR2NtSaG8oWjRa.xs9/un6bsLvkMAGzmnTitN9syLmZFwqw9AXa','[\"ROLE_USER\"]','+24107797155','+24107755238',0,'employee',5),(48,'Dexter Joyner','Ramona','jiqywalin','tukybasyb@mailinator.com','$2y$13$9Eh4vNhpPgR33eFq0x7I0enRZ9FNUqpkVkC2CyRGZ1VwylC59Ac.q','[\"ROLE_USER\"]','+24107781755','+24107748150',1,'employee',5),(49,'Georgia Wall','Josephine','nivagul','nyqixugi@mailinator.com','$2y$13$zNdx0Zu9MY38fcUxnurfU.fV3cVqkma4rv0jleTEXN6hs6mykDW16','[\"ROLE_USER\"]','+24107742899','+24107790377',1,'employee',2);
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

-- Dump completed on 2022-08-11 18:25:43
