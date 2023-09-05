CREATE DATABASE  IF NOT EXISTS `siscomite` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `siscomite`;
-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: siscomite
-- ------------------------------------------------------
-- Server version	8.0.33

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
-- Table structure for table `aprendices`
--

DROP TABLE IF EXISTS `aprendices`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `aprendices` (
  `id_aprendiz` int NOT NULL AUTO_INCREMENT,
  `nombres_aprendiz` varchar(100) NOT NULL,
  `apellidos_aprendiz` varchar(100) NOT NULL,
  `numero_documento_aprendiz` varchar(45) NOT NULL,
  `email_aprendiz_sena` varchar(300) NOT NULL,
  `email_aprendiz_personal` varchar(300) NOT NULL,
  `celular_aprendiz` varchar(20) NOT NULL,
  `fijo_aprendiz` varchar(20) DEFAULT NULL,
  `estado` varchar(100) NOT NULL,
  `id_documento` int NOT NULL,
  `id_ficha` int NOT NULL,
  PRIMARY KEY (`id_aprendiz`),
  KEY `id_documento` (`id_documento`),
  KEY `id_ficha` (`id_ficha`),
  CONSTRAINT `aprendices_ibfk_1` FOREIGN KEY (`id_documento`) REFERENCES `documentos` (`id_documento`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `aprendices_ibfk_2` FOREIGN KEY (`id_ficha`) REFERENCES `fichas` (`id_ficha`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `aprendices`
--

LOCK TABLES `aprendices` WRITE;
/*!40000 ALTER TABLE `aprendices` DISABLE KEYS */;
INSERT INTO `aprendices` VALUES (1,'Cristian D','Bedoya T','','torres23torres@soy.sena.edu','torres23torres@gamil.com','3007030424','4512461','',1,1),(3,'Juan Carlos','Prasca','','prasca@soy.sena.edu.co','parasca85@gmail.com','30124242555',NULL,'',1,1),(4,'Juan Guillermo','Gomez','','jggomez319@soy.sena.edu.co','jggomez016@gmail.com','3195910996',NULL,'',1,1),(5,'Cristian David ','Bedoya T','1027944969','torres23torresTo@soy.sena.edu','torres23torresTo@gamil.com','3007030424',NULL,'',1,1),(6,'Juan Pepitos','Alcaraz','1027541224','pepito@soy.sena.edu.co','prpito994@gmail.com','3042155256',NULL,'',1,1),(7,'Cristian prueba','Bedoya T','1027944955','torresprueba@soy.sena.edu','torresprueba@gamil.com','3007030424',NULL,'EN FORMACIÓN',1,2);
/*!40000 ALTER TABLE `aprendices` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `archivos`
--

DROP TABLE IF EXISTS `archivos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `archivos` (
  `id_archivo` int NOT NULL AUTO_INCREMENT,
  `nombre_archivo` varchar(255) DEFAULT NULL,
  `ruta_archivo` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_archivo`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `archivos`
--

LOCK TABLES `archivos` WRITE;
/*!40000 ALTER TABLE `archivos` DISABLE KEYS */;
INSERT INTO `archivos` VALUES (1,'1693274892477-WhatsApp Image 2023-08-25 at 11.03.50 AM.jpeg','uploads/1693274892477-WhatsApp Image 2023-08-25 at 11.03.50 AM.jpeg'),(2,'1693274924964-orgullo_y_prejuicio.pdf','uploads/1693274924964-orgullo_y_prejuicio.pdf'),(3,'1693279499369-web 2-4 sabados avanzados.xls','uploads/1693279499369-web 2-4 sabados avanzados.xls'),(4,'1693315913237-SOLICITUD_DE_COMITE_DE_EVALUACION_Y_SEGUIMIENTO_APRENDICES.pdf','uploads/1693315913237-SOLICITUD_DE_COMITE_DE_EVALUACION_Y_SEGUIMIENTO_APRENDICES.pdf'),(5,'1693316037911-SOLICITUD_DE_COMITE_DE_EVALUACION_Y_SEGUIMIENTO_APRENDICES.pdf','uploads/1693316037911-SOLICITUD_DE_COMITE_DE_EVALUACION_Y_SEGUIMIENTO_APRENDICES.pdf'),(6,'1693318215352-Reglamento-Aprendiz-sena-2023 (1).pdf','uploads/1693318215352-Reglamento-Aprendiz-sena-2023 (1).pdf');
/*!40000 ALTER TABLE `archivos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `articulos`
--

DROP TABLE IF EXISTS `articulos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `articulos` (
  `id_articulo` int NOT NULL AUTO_INCREMENT,
  `id_capitulo` int DEFAULT NULL,
  `numero_articulo` varchar(100) DEFAULT NULL,
  `descripcion_articulo` text,
  PRIMARY KEY (`id_articulo`),
  KEY `id_capitulo` (`id_capitulo`),
  CONSTRAINT `articulos_ibfk_1` FOREIGN KEY (`id_capitulo`) REFERENCES `capitulos` (`id_capitulo`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `articulos`
--

LOCK TABLES `articulos` WRITE;
/*!40000 ALTER TABLE `articulos` DISABLE KEYS */;
INSERT INTO `articulos` VALUES (1,1,'Artículo 1. Formación profesional integral.','La formación profesional que imparte el SENA, constituye un proceso educativo teórico-práctico de carácter integral, orientado al desarrollo de conocimientos técnicos, tecnológicos y de actitudes y valores para la convivencia social, que le permiten a la persona actuar crítica y creativamente en el mundo del trabajo y de la vida. '),(2,1,'Artículo 2. Comunidad educativa SENA.','En la Formación Profesional Integral participan diferentes actores,  cada uno de los cuales conoce y ejerce su rol dentro del proceso de formación profesional integral en el diseño, desarrollo y ejecución de la misma, entre los cuales están: los aprendices, instructores, personal administrativo y de apoyo, directivos y por extensión dentro del proceso formativo, la familia o acudientes, egresados, gremios de la producción, empresarios, instituciones educativas y representantes de los trabajadores, de los sectores económicos, la sociedad y del sistema nacional de ciencia, tecnología e innovación así como cooperantes internacionales.'),(3,1,'Artículo 3.  Aprendiz SENA.','Se considera Aprendiz SENA a toda persona matriculada en los programas de formación profesional de la entidad, en cualquier tipo de formación: Titulada o Complementaria, desde las diferentes modalidades Presencial, Virtual y a Distancia, que apropia, responsablemente competencias de manera integral que lo forman para contribuir al desarrollo personal, social y del mundo del trabajo, soportado en los valores morales, éticos culturales y ecológicos.                                                                                                                        El Aprendiz SENA es protagonista de su formación profesional integral, que se desarrolla a lo largo de la etapa lectiva y de la etapa productiva, en el caso de la formación titulada, en cualquiera de sus modalidades de formación y según los procedimientos institucionales.');
/*!40000 ALTER TABLE `articulos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `capitulos`
--

DROP TABLE IF EXISTS `capitulos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `capitulos` (
  `id_capitulo` int NOT NULL AUTO_INCREMENT,
  `titulo` varchar(255) DEFAULT NULL,
  `descripcion_capitulo` text,
  PRIMARY KEY (`id_capitulo`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `capitulos`
--

LOCK TABLES `capitulos` WRITE;
/*!40000 ALTER TABLE `capitulos` DISABLE KEYS */;
INSERT INTO `capitulos` VALUES (1,'CAPÍTULO I. PRINCIPIOS GENERALES ',''),(2,'CAPÍTULO II. DERECHOS, ESTÍMULOS DEL APRENDIZ SENA',''),(3,'CAPÍTULO III. DEBERES Y PROHIBICIONES DEL APRENDIZ SENA',''),(4,'CAPÍTULO IV. TRÁMITES ACADÉMICOS Y ADMINISTRATIVOS','Los trámites académicos son aquellos pasos que los aprendices adelantan dentro del proceso de matrícula, formación y certificación, o para gestionar solicitudes de traslado, aplazamiento, reingreso y retiro voluntario.  '),(5,'CAPÍTULO V. INCUMPLIMIENTO Y DESERCIÓN',''),(6,'CAPÍTULO VI. FALTAS ACADÉMICAS Y DISCIPLINARIAS ',''),(7,'CAPÍTULO VII. MEDIDAS FORMATIVAS Y SANCIONES ',''),(8,'CAPÍTULO VIII. EVALUACIÓN ',''),(9,'CAPÍTULO IX. REPRESENTATIVIDAD DE LOS APRENDICES ','');
/*!40000 ALTER TABLE `capitulos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `documentos`
--

DROP TABLE IF EXISTS `documentos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `documentos` (
  `id_documento` int NOT NULL AUTO_INCREMENT,
  `tipo_documento` varchar(100) NOT NULL,
  PRIMARY KEY (`id_documento`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `documentos`
--

LOCK TABLES `documentos` WRITE;
/*!40000 ALTER TABLE `documentos` DISABLE KEYS */;
INSERT INTO `documentos` VALUES (1,'C.C'),(2,'C.E'),(3,'T.I'),(4,'PEP'),(5,'Registro Civil');
/*!40000 ALTER TABLE `documentos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fichas`
--

DROP TABLE IF EXISTS `fichas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fichas` (
  `id_ficha` int NOT NULL AUTO_INCREMENT,
  `numero_ficha` varchar(100) NOT NULL,
  `nombre_programa` varchar(100) NOT NULL,
  `jornada` varchar(100) NOT NULL,
  `etapa_programa` varchar(100) NOT NULL,
  `numero_trimestre` varchar(100) NOT NULL,
  `estado` varchar(100) NOT NULL,
  `id_modalidad` int NOT NULL,
  `id_usuario_coordinador` int NOT NULL,
  PRIMARY KEY (`id_ficha`),
  KEY `id_modalidad` (`id_modalidad`),
  KEY `fk_usuario_coordinador` (`id_usuario_coordinador`),
  CONSTRAINT `fichas_ibfk_1` FOREIGN KEY (`id_modalidad`) REFERENCES `modalidades` (`id_modalidad`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_usuario_coordinador` FOREIGN KEY (`id_usuario_coordinador`) REFERENCES `usuarios` (`id_usuario`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fichas`
--

LOCK TABLES `fichas` WRITE;
/*!40000 ALTER TABLE `fichas` DISABLE KEYS */;
INSERT INTO `fichas` VALUES (1,'2473196','ADSO','Mañana','Lectiva','4','',1,3),(2,'2664110','ADSI','Tarde','Lectiva','5','EN EJECUCIÓN',1,3);
/*!40000 ALTER TABLE `fichas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `modalidades`
--

DROP TABLE IF EXISTS `modalidades`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `modalidades` (
  `id_modalidad` int NOT NULL AUTO_INCREMENT,
  `nombre_modalidad` varchar(100) NOT NULL,
  PRIMARY KEY (`id_modalidad`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `modalidades`
--

LOCK TABLES `modalidades` WRITE;
/*!40000 ALTER TABLE `modalidades` DISABLE KEYS */;
INSERT INTO `modalidades` VALUES (1,'Presencial'),(2,'Virtual');
/*!40000 ALTER TABLE `modalidades` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `numerales`
--

DROP TABLE IF EXISTS `numerales`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `numerales` (
  `id_numeral` int NOT NULL AUTO_INCREMENT,
  `id_articulo` int DEFAULT NULL,
  `numero_numeral` varchar(10) DEFAULT NULL,
  `descripcion_numeral` text,
  PRIMARY KEY (`id_numeral`),
  KEY `id_articulo` (`id_articulo`),
  CONSTRAINT `numerales_ibfk_1` FOREIGN KEY (`id_articulo`) REFERENCES `articulos` (`id_articulo`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `numerales`
--

LOCK TABLES `numerales` WRITE;
/*!40000 ALTER TABLE `numerales` DISABLE KEYS */;
INSERT INTO `numerales` VALUES (1,1,'1','Descripcion de la prohibicion'),(2,1,'2','Descripcion de la norma'),(3,1,'3','Descripcion de la regla');
/*!40000 ALTER TABLE `numerales` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `paragrafos`
--

DROP TABLE IF EXISTS `paragrafos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `paragrafos` (
  `id_paragrafo` int NOT NULL AUTO_INCREMENT,
  `id_articulo` int DEFAULT NULL,
  `titulo_paragrafo` varchar(255) DEFAULT NULL,
  `descripcion_paragrafos` text,
  PRIMARY KEY (`id_paragrafo`),
  KEY `id_articulo` (`id_articulo`),
  CONSTRAINT `paragrafos_ibfk_1` FOREIGN KEY (`id_articulo`) REFERENCES `articulos` (`id_articulo`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `paragrafos`
--

LOCK TABLES `paragrafos` WRITE;
/*!40000 ALTER TABLE `paragrafos` DISABLE KEYS */;
INSERT INTO `paragrafos` VALUES (1,1,'Parágrafo','Se desccribe algo');
/*!40000 ALTER TABLE `paragrafos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id_rol` int NOT NULL AUTO_INCREMENT,
  `nombre_rol` varchar(100) NOT NULL,
  PRIMARY KEY (`id_rol`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'Coordinador'),(2,'Instructor'),(3,'Administrador');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `solicitud`
--

DROP TABLE IF EXISTS `solicitud`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `solicitud` (
  `id_solicitud` int NOT NULL AUTO_INCREMENT,
  `tipo_solicitud` varchar(100) NOT NULL,
  `nombre_coordinacion` varchar(200) NOT NULL,
  `id_usuario_solicitante` int NOT NULL,
  `id_aprendiz` int NOT NULL,
  `estado` varchar(45) NOT NULL,
  `fecha_creacion` datetime NOT NULL,
  `categoria_causa` varchar(255) NOT NULL,
  `calificacion_causa` varchar(255) NOT NULL,
  `descripcion_caso` varchar(2000) NOT NULL,
  `evidencias` varchar(1000) NOT NULL,
  `id_articulo` int DEFAULT NULL,
  PRIMARY KEY (`id_solicitud`),
  KEY `fk_solicitud_1` (`id_usuario_solicitante`),
  KEY `id_aprendiz` (`id_aprendiz`),
  KEY `id_articulo` (`id_articulo`),
  CONSTRAINT `fk_solicitud_1` FOREIGN KEY (`id_usuario_solicitante`) REFERENCES `usuarios` (`id_usuario`),
  CONSTRAINT `solicitud_ibfk_2` FOREIGN KEY (`id_aprendiz`) REFERENCES `aprendices` (`id_aprendiz`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `solicitud_ibfk_3` FOREIGN KEY (`id_articulo`) REFERENCES `articulos` (`id_articulo`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `solicitud`
--

LOCK TABLES `solicitud` WRITE;
/*!40000 ALTER TABLE `solicitud` DISABLE KEYS */;
INSERT INTO `solicitud` VALUES (1,'Individual','Marianela',3,1,'Pendiente','2023-08-16 16:36:54','Academica','Grave','No ha entregado ningun trabajo','Link de drive',1);
/*!40000 ALTER TABLE `solicitud` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `id_usuario` int NOT NULL AUTO_INCREMENT,
  `nombres` varchar(100) NOT NULL,
  `apellidos` varchar(100) NOT NULL,
  `numero_documento` varchar(100) NOT NULL,
  `email_sena` varchar(300) NOT NULL,
  `email_personal` varchar(300) DEFAULT NULL,
  `numero_celular` varchar(20) NOT NULL,
  `telefono_fijo` varchar(20) DEFAULT NULL,
  `estado` varchar(100) NOT NULL,
  `contrasena` varchar(500) NOT NULL,
  `id_documento` int NOT NULL,
  `id_rol` int NOT NULL,
  PRIMARY KEY (`id_usuario`),
  KEY `id_rol` (`id_rol`),
  KEY `id_documento` (`id_documento`),
  CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`id_rol`) REFERENCES `roles` (`id_rol`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `usuarios_ibfk_2` FOREIGN KEY (`id_documento`) REFERENCES `documentos` (`id_documento`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (3,'cristian david','Bedoya Torres','1027944969','bedoya969@soy.sena.edu',NULL,'3007030424',NULL,'','$2a$10$DZvyLyvnd4b/oiwOHe/fiuu5jce2kNPgmIB53KPckhjzziGnclRq6',1,1),(4,'cristian ','Bedoya ','1027944956','bedoya956@soy.sena.edu',NULL,'3007030424',NULL,'','$2a$10$O1zLg2.YqZtNbR9DmUwkRO207FuzZ69JpdpI2kwRkmU9JkhaoZzJu',1,2),(5,'Juan Carlos ','Prasca Medina ','1063355027','prasca07@soy.sena.edu',NULL,'3004984546',NULL,'','$2a$10$Q1Sw/kfD0p4NFchNsGowauXAvqMhVKNIPgSUQAFr5CkNr2cEwtzWG',1,2),(7,'cristian Prueba','Bedoya Prueba','1027944970','bedoyaprueba@soy.sena.edu',NULL,'3007030425',NULL,'ACTIVO','$2a$10$rirSMtMHGqWuWxAyucGY/OxDOGtiWAg7BbHmry9SBzHyxu0cirkUS',1,2);
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'siscomite'
--

--
-- Dumping routines for database 'siscomite'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-08-29 10:20:48
