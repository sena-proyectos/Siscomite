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
  `email_aprendiz_personal` varchar(300) DEFAULT NULL,
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
) ENGINE=InnoDB AUTO_INCREMENT=148 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `aprendices`
--

LOCK TABLES `aprendices` WRITE;
/*!40000 ALTER TABLE `aprendices` DISABLE KEYS */;
INSERT INTO `aprendices` VALUES (63,'JUANGUI','LLERMO','123456789','jggomez016@gmail.com','','1234567891',NULL,'EN FORMACIÓN',1,4),(120,'JOHAN FELIPE','GIL GUERRA','1000100946','pipegil0106@gmail.com',NULL,'3043923574',NULL,'EN FORMACIÓN',1,5),(121,'PAULINA','RODRIGUEZ COSSIO','1000756360','ieca.paulinarodriguez@gmail.com',NULL,'3127490512',NULL,'EN FORMACIÓN',1,5),(122,'SEBASTIAN','MEJIA PUCHE','1001227211','sebaspuche29@gmail.com',NULL,'3054349145',NULL,'EN FORMACIÓN',1,5),(123,'JULIAN ESTEBAN','TABORDA GARCIA','1001368597','juliantgmusic@gmail.com',NULL,'3053295272',NULL,'EN FORMACIÓN',1,5),(124,'INGRID','ECHAVARRIA AGUDELO','1001376369','ingridechavarria2018@gmail.com',NULL,'3013100566',NULL,'EN FORMACIÓN',1,5),(125,'KELLY JHOJANA','VALENCIA GARCIA','1001418295','kellyysantiago574@gmail.com',NULL,'3157773242',NULL,'EN FORMACIÓN',1,5),(126,'DAVID','ROMERO VELEZ','1001420529','davidanime88@gmail.com',NULL,'3006371438',NULL,'EN FORMACIÓN',1,5),(127,'YINA','GAVIRIA FORONDA','1001420553','yinagf1@gmail.com',NULL,'3105186215',NULL,'EN FORMACIÓN',1,5),(128,'WARLY','ESTRADA LLORENTE','1003398604','warlyestrada75@gmail.com',NULL,'3218168188',NULL,'EN FORMACIÓN',1,5),(129,'YANLI CARINA','BEJARANO BETANCUR','1007507799','carinabejarano59@gmail.com',NULL,'3043969269',NULL,'EN FORMACIÓN',1,5),(130,'BEATRIZ ANDREA','ESCOBAR ORTIZ','1018420177','escobaraandrea@gmail.com',NULL,'3132479810',NULL,'EN FORMACIÓN',1,5),(131,'VALERIA','AREIZA GARCIA','1020105612','valeriaareiza1812@gmail.com',NULL,'3206784121',NULL,'EN FORMACIÓN',1,5),(132,'JHORJELIS','HINESTROZA MOSQUERA','1000404088','Jhorjelishinestroza@gmail.com',NULL,'3244082072',NULL,'EN FORMACIÓN',1,5),(133,'YULIANA','GRISALES ALVAREZ','1025642251','alvarezyuliana516@gmail.com',NULL,'3001273841',NULL,'EN FORMACIÓN',1,5),(134,'MAIRA ALEJANDRA','HERRERA ALVAREZ','1025643039','alejaalvarez4015@gmail.com',NULL,'3052840075',NULL,'EN FORMACIÓN',1,5),(135,'JUANA MARIA','PEREZ TORRES','1032010860','juanamariaperez2411@gmail.com',NULL,'3137967252',NULL,'EN FORMACIÓN',1,5),(136,'MARIA CAMILA','ARANGO ARCILA','1035970952','3043257646camila@gmail.com',NULL,'3028193135',NULL,'EN FORMACIÓN',1,5),(137,'HENRY ALEXANDER','VANEGAS QUICENO','1036657002','figu9920@hotmail.com',NULL,'3003165768',NULL,'EN FORMACIÓN',1,5),(138,'LUIS FERNANDO','DIAZ OSORIO','1038646035','luisfernandodiazosorio4@gmail.com',NULL,'3106888439',NULL,'EN FORMACIÓN',1,5),(139,'STIVEN','COCK ALVAREZ','1039463292','stiven_23_@hotmail.com',NULL,'3052261321',NULL,'EN FORMACIÓN',1,5),(140,'EVELYN','ORTEGA ARBOLEDA','1040570683','evelyn4713@hotmail.com',NULL,'3005707008',NULL,'EN FORMACIÓN',1,5),(141,'ANGIE STEFANIA','RAMIREZ BETANCUR','1040730542','stefaniabetancur583@gmail.com',NULL,'3148613918',NULL,'EN FORMACIÓN',1,5),(142,'FRANCY CAROLINA','BALLESTEROS PUERTA','1042066937','Carolinaballesteros761@gmail.com',NULL,'3193824993',NULL,'EN FORMACIÓN',1,5),(143,'MARINELA','ESPITIA CORREA','1067161366','marinelaespitia40@gmail.com',NULL,'3126482523',NULL,'EN FORMACIÓN',1,5),(144,'MERLYS','MENCO MIRANDA','1101385079','merlysmencom2005@gmail.com',NULL,'3128519108',NULL,'EN FORMACIÓN',1,5),(145,'ROSSANA','RODRIGUEZ ','2000006396','rossanarodriguez07@gmail.com',NULL,'3122714503',NULL,'EN FORMACIÓN',1,5);
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
  `tipo_archivo` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`id_archivo`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `archivos`
--

LOCK TABLES `archivos` WRITE;
/*!40000 ALTER TABLE `archivos` DISABLE KEYS */;
INSERT INTO `archivos` VALUES (18,'1698165179786-CRISTIAN DAVID BEDOYA TORRES - Primera visita .pdf','Downloads/Evidencias-Siscomite1698165179786-CRISTIAN DAVID BEDOYA TORRES - Primera visita .pdf','application/pdf');
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
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `articulos`
--

LOCK TABLES `articulos` WRITE;
/*!40000 ALTER TABLE `articulos` DISABLE KEYS */;
INSERT INTO `articulos` VALUES (1,1,'Artículo 1. Formación profesional integral.','La formación profesional que imparte el SENA, constituye un proceso educativo teórico-práctico de carácter integral, orientado al desarrollo de conocimientos técnicos, tecnológicos y de actitudes y valores para la convivencia social, que le permiten a la persona actuar crítica y creativamente en el mundo del trabajo y de la vida. '),(2,1,'Artículo 2. Comunidad educativa SENA.','En la Formación Profesional Integral participan diferentes actores,  cada uno de los cuales conoce y ejerce su rol dentro del proceso de formación profesional integral en el diseño, desarrollo y ejecución de la misma, entre los cuales están: los aprendices, instructores, personal administrativo y de apoyo, directivos y por extensión dentro del proceso formativo, la familia o acudientes, egresados, gremios de la producción, empresarios, instituciones educativas y representantes de los trabajadores, de los sectores económicos, la sociedad y del sistema nacional de ciencia, tecnología e innovación así como cooperantes internacionales.'),(3,1,'Artículo 3.  Aprendiz SENA.','Se considera Aprendiz SENA a toda persona matriculada en los programas de formación profesional de la entidad, en cualquier tipo de formación: Titulada o Complementaria, desde las diferentes modalidades Presencial, Virtual y a Distancia, que apropia, responsablemente competencias de manera integral que lo forman para contribuir al desarrollo personal, social y del mundo del trabajo, soportado en los valores morales, éticos culturales y ecológicos.                                                                                                                        El Aprendiz SENA es protagonista de su formación profesional integral, que se desarrolla a lo largo de la etapa lectiva y de la etapa productiva, en el caso de la formación titulada, en cualquiera de sus modalidades de formación y según los procedimientos institucionales.'),(4,3,'Artículo 8. Deberes del aprendiz SENA.','Se entiende por deber, la obligación legal, social y moral que compromete a la persona a cumplir con determinada actuación, asumiendo con responsabilidad todos sus actos, para propiciar la armonía, el respeto, la integración, el bienestar común, la sana convivencia, el servicio a los demás, la seguridad de las personas y de los bienes de la institución.                                                                                                                           Además de los consagrados en la constitución y la ley, el aprendiz SENA es responsable de cumplir con los siguientes deberes: '),(5,3,'Artículo 9. Prohibiciones.','Se considerarán prohibiciones para los Aprendices del SENA, las siguientes: '),(14,19,'createRuledd','vcreateRule');
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
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `capitulos`
--

LOCK TABLES `capitulos` WRITE;
/*!40000 ALTER TABLE `capitulos` DISABLE KEYS */;
INSERT INTO `capitulos` VALUES (1,'CAPÍTULO I. PRINCIPIOS GENERALES ',''),(2,'CAPÍTULO II. DERECHOS, ESTÍMULOS DEL APRENDIZ SENA',''),(3,'CAPÍTULO III. DEBERES Y PROHIBICIONES DEL APRENDIZ SENA',''),(4,'CAPÍTULO IV. TRÁMITES ACADÉMICOS Y ADMINISTRATIVOS','Los trámites académicos son aquellos pasos que los aprendices adelantan dentro del proceso de matrícula, formación y certificación, o para gestionar solicitudes de traslado, aplazamiento, reingreso y retiro voluntario.  '),(5,'CAPÍTULO V. INCUMPLIMIENTO Y DESERCIÓN',''),(6,'CAPÍTULO VI. FALTAS ACADÉMICAS Y DISCIPLINARIAS ',''),(7,'CAPÍTULO VII. MEDIDAS FORMATIVAS Y SANCIONES ',''),(8,'CAPÍTULO VIII. EVALUACIÓN ',''),(9,'CAPÍTULO IX. REPRESENTATIVIDAD DE LOS APRENDICES ',''),(19,'createRule','createRule');
/*!40000 ALTER TABLE `capitulos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `causas`
--

DROP TABLE IF EXISTS `causas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `causas` (
  `id_causa` int NOT NULL AUTO_INCREMENT,
  `categoria_causa` varchar(100) NOT NULL,
  `calificacion_causa` varchar(100) NOT NULL,
  `descripcion_caso` varchar(1000) NOT NULL,
  `evidencias` varchar(1000) NOT NULL,
  `id_articulo` int NOT NULL,
  PRIMARY KEY (`id_causa`),
  KEY `id_articulo` (`id_articulo`),
  CONSTRAINT `causas_ibfk_1` FOREIGN KEY (`id_articulo`) REFERENCES `articulos` (`id_articulo`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `causas`
--

LOCK TABLES `causas` WRITE;
/*!40000 ALTER TABLE `causas` DISABLE KEYS */;
INSERT INTO `causas` VALUES (2,'Academica','grave','no respondio con los trabajos','No se tienen',2);
/*!40000 ALTER TABLE `causas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `detalle_solicitud_aprendices`
--

DROP TABLE IF EXISTS `detalle_solicitud_aprendices`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `detalle_solicitud_aprendices` (
  `id_detalle_solicitud_aprendiz` int NOT NULL AUTO_INCREMENT,
  `id_aprendiz` int NOT NULL,
  `id_solicitud` int NOT NULL,
  PRIMARY KEY (`id_detalle_solicitud_aprendiz`),
  KEY `id_aprendiz` (`id_aprendiz`),
  KEY `id_solicitud` (`id_solicitud`),
  CONSTRAINT `detalle_solicitud_aprendices_ibfk_1` FOREIGN KEY (`id_aprendiz`) REFERENCES `aprendices` (`id_aprendiz`),
  CONSTRAINT `detalle_solicitud_aprendices_ibfk_2` FOREIGN KEY (`id_solicitud`) REFERENCES `solicitud` (`id_solicitud`)
) ENGINE=InnoDB AUTO_INCREMENT=67 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detalle_solicitud_aprendices`
--

LOCK TABLES `detalle_solicitud_aprendices` WRITE;
/*!40000 ALTER TABLE `detalle_solicitud_aprendices` DISABLE KEYS */;
INSERT INTO `detalle_solicitud_aprendices` VALUES (64,124,83),(65,63,83),(66,135,83);
/*!40000 ALTER TABLE `detalle_solicitud_aprendices` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `detalle_solicitud_numerales`
--

DROP TABLE IF EXISTS `detalle_solicitud_numerales`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `detalle_solicitud_numerales` (
  `id_solicitud_numeral` int NOT NULL AUTO_INCREMENT,
  `id_solicitud` int DEFAULT NULL,
  `id_numeral` int DEFAULT NULL,
  PRIMARY KEY (`id_solicitud_numeral`),
  KEY `id_solicitud` (`id_solicitud`),
  KEY `id_numeral` (`id_numeral`),
  CONSTRAINT `detalle_solicitud_numerales_ibfk_1` FOREIGN KEY (`id_solicitud`) REFERENCES `solicitud` (`id_solicitud`),
  CONSTRAINT `detalle_solicitud_numerales_ibfk_2` FOREIGN KEY (`id_numeral`) REFERENCES `numerales` (`id_numeral`)
) ENGINE=InnoDB AUTO_INCREMENT=96 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detalle_solicitud_numerales`
--

LOCK TABLES `detalle_solicitud_numerales` WRITE;
/*!40000 ALTER TABLE `detalle_solicitud_numerales` DISABLE KEYS */;
INSERT INTO `detalle_solicitud_numerales` VALUES (93,83,5),(94,83,4),(95,83,6);
/*!40000 ALTER TABLE `detalle_solicitud_numerales` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `detalle_solicitud_usuarios`
--

DROP TABLE IF EXISTS `detalle_solicitud_usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `detalle_solicitud_usuarios` (
  `id_detalle_solicitud_usuario` int NOT NULL AUTO_INCREMENT,
  `id_usuario` int NOT NULL,
  `id_solicitud` int NOT NULL,
  PRIMARY KEY (`id_detalle_solicitud_usuario`),
  KEY `id_usuario` (`id_usuario`),
  KEY `id_solicitud` (`id_solicitud`),
  CONSTRAINT `detalle_solicitud_usuarios_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`),
  CONSTRAINT `detalle_solicitud_usuarios_ibfk_2` FOREIGN KEY (`id_solicitud`) REFERENCES `solicitud` (`id_solicitud`)
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detalle_solicitud_usuarios`
--

LOCK TABLES `detalle_solicitud_usuarios` WRITE;
/*!40000 ALTER TABLE `detalle_solicitud_usuarios` DISABLE KEYS */;
INSERT INTO `detalle_solicitud_usuarios` VALUES (55,8,83),(56,7,83);
/*!40000 ALTER TABLE `detalle_solicitud_usuarios` ENABLE KEYS */;
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
  `numero_trimestre` varchar(100) DEFAULT NULL,
  `estado` varchar(100) NOT NULL,
  `id_modalidad` int NOT NULL,
  `id_usuario_coordinador` int NOT NULL,
  PRIMARY KEY (`id_ficha`),
  KEY `id_modalidad` (`id_modalidad`),
  KEY `fk_usuario_coordinador` (`id_usuario_coordinador`),
  CONSTRAINT `fichas_ibfk_1` FOREIGN KEY (`id_modalidad`) REFERENCES `modalidades` (`id_modalidad`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_usuario_coordinador` FOREIGN KEY (`id_usuario_coordinador`) REFERENCES `usuarios` (`id_usuario`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fichas`
--

LOCK TABLES `fichas` WRITE;
/*!40000 ALTER TABLE `fichas` DISABLE KEYS */;
INSERT INTO `fichas` VALUES (4,'2473196','ADSO','MAÑANA','LECTIVA','7','ACTIVO',1,3),(5,'1234567','MULTIMEDIA','MAÑANA','LECTIVA','4','ACTIVO',1,4);
/*!40000 ALTER TABLE `fichas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mensajes`
--

DROP TABLE IF EXISTS `mensajes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mensajes` (
  `id_mensaje` int NOT NULL AUTO_INCREMENT,
  `id_usuario` int NOT NULL,
  `id_solicitud` int NOT NULL,
  `mensaje` text NOT NULL,
  `fecha_creacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `estado_mensaje` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id_mensaje`),
  KEY `id_usuario` (`id_usuario`),
  KEY `id_solicitud` (`id_solicitud`),
  CONSTRAINT `mensajes_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`),
  CONSTRAINT `mensajes_ibfk_2` FOREIGN KEY (`id_solicitud`) REFERENCES `solicitud` (`id_solicitud`)
) ENGINE=InnoDB AUTO_INCREMENT=337 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mensajes`
--

LOCK TABLES `mensajes` WRITE;
/*!40000 ALTER TABLE `mensajes` DISABLE KEYS */;
INSERT INTO `mensajes` VALUES (329,3,83,'Se ha creado una nueva solicitud','2023-10-24 16:32:59','Sin leer'),(330,4,83,'Se ha creado una nueva solicitud','2023-10-24 16:32:59','Sin leer'),(331,5,83,'Se ha creado una nueva solicitud','2023-10-24 16:32:59','Sin leer'),(332,9,83,'Se ha creado una nueva solicitud','2023-10-24 16:32:59','Leido'),(333,13,83,'Se ha creado una nueva solicitud','2023-10-24 16:32:59','Sin leer'),(334,10,83,'Se ha creado una nueva solicitud','2023-10-24 16:32:59','Sin leer'),(335,12,83,'Se ha creado una nueva solicitud','2023-10-24 16:32:59','Sin leer'),(336,14,83,'Se ha creado una nueva solicitud','2023-10-24 16:32:59','Sin leer');
/*!40000 ALTER TABLE `mensajes` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `modalidades`
--

LOCK TABLES `modalidades` WRITE;
/*!40000 ALTER TABLE `modalidades` DISABLE KEYS */;
INSERT INTO `modalidades` VALUES (1,'Presencial'),(2,'Virtual'),(3,'Media técnia'),(4,'A distancia');
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
) ENGINE=InnoDB AUTO_INCREMENT=63 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `numerales`
--

LOCK TABLES `numerales` WRITE;
/*!40000 ALTER TABLE `numerales` DISABLE KEYS */;
INSERT INTO `numerales` VALUES (4,5,'1','Plagiar materiales, trabajos y demás documentos generados en los grupos de trabajo o producto del trabajo en equipo institucional, así como las fuentes bibliográficas consultadas en los diferentes soportes.'),(5,5,'2','Realizar fraude en evaluaciones, en el proceso de aprendizaje o en concursos, juegos o competencias de cualquier carácter. '),(6,5,'3','Aportar documentación o información que difiera con la real, para el ingreso a la entidad o para obtener cualquier beneficio de la misma. '),(7,5,'4','Suplantar identidad durante el proceso de formación. '),(8,5,'5','Alterar, adulterar, falsificar o sustraer documentos oficiales, calificaciones, evaluaciones o firmas correspondientes al SENA o emitidos por ella '),(9,5,'6','Utilizar de manera irresponsable el internet y las nuevas tecnologías dispuestas por el SENA para su proceso formativo.'),(10,5,'7','Fumar en áreas no permitidas en el centro de formación, así como ingresar, comercializar, promocionar, ingerir o suministrar bebidas alcohólicas o sustancias psicoactivas, dentro de las instalaciones del SENA, o ingresar a la entidad en estado que indique alteraciones ocasionadas por el consumo de estos.'),(11,5,'8','Ingresar o portar armas, objetos cortopunzantes, explosivos u otros artefactos que representen riesgo o puedan ser empleados para atentar contra la vida o la integridad física de las personas, para destruir o deteriorar la planta física o los bienes del SENA o de las instituciones con las cuales se adelanten actividades de aprendizaje, culturales, recreativas, deportivas y sociales. Los miembros de la fuerza pública y organismos de seguridad del Estado, que se encuentren en un proceso de aprendizaje, no podrán portar armas en el Centro de Formación. '),(12,5,'9','Utilizar el nombre del SENA, las instalaciones, el internet y nuevas tecnologías, para actividades particulares o con ánimo de lucro, exceptuando aquellas que sean parte de proyectos productivos aprobados por el Subdirector de Centro o la instancia competente.'),(13,5,'11','Destruir, sustraer, dañar total o parcialmente instalaciones físicas, equipos, materiales, software, elementos y dotación en general del SENA o de instituciones, empresas u otras entidades donde el aprendiz represente la entidad y/o se desarrollen actividades de aprendizaje, culturales, recreativas, deportivas y sociales o intercambios estudiantiles nacionales o internacionales. '),(14,5,'12','Obstaculizar el ingreso a las instalaciones de los Centros de Formación y/o perturbar el desarrollo normal de las actividades de aprendizaje, liderando o apoyando este tipo de actos en oficinas, ambientes de aprendizaje, zonas de descanso, bibliotecas y en general donde estas se desarrollen.'),(15,5,'13','Realizar acciones proselitistas de carácter político o religioso dentro de las instalaciones del SENA y demás ambientes donde se desarrollen actividades formativas, así como propiciar actos indecorosos, de acoso, maltrato físico y/o mental, o conductas que puedan afectar a cualquier miembro de la comunidad educativa. '),(16,5,'14','Permanecer con el uniforme acordado para el programa de formación de la especialidad, en situaciones o lugares ajenos al proceso de aprendizaje, que deterioren la imagen institucional. '),(17,5,'15','Generar, transmitir, publicar o enviar información confidencial, de circulación restringida, inadecuada, malintencionada, violenta, pornográfica, insultos o agresiones por los medios de comunicación físicos o electrónicos, disponibles para su proceso formativo.'),(18,5,'16','Todo acto que sabotee, perturbe o impida las actividades de formación, administrativas y de bienestar que se realicen en la entidad o en los sitios donde se le represente.'),(19,5,'17','Realizar comportamientos contrarios a la normativa SENA en lugares donde se adelanten eventos de formación nacional o internacional, que atenten contra la imagen del SENA o del país.'),(20,5,'18','Incumplir las normas de convivencia establecidas en cada Centro de Formación o Centro de convivencia.'),(21,5,'19','Ingresar o salir de cualquier instalación del Centro de Formación o de la entidad donde se desarrolle la formación, por sitios diferentes a la portería, saltando muros, cercas o violentando puertas, ventanas y cerraduras.'),(22,5,'20','Elaborar escritos o mensajes satíricos, dibujar y/o escribir sobre cualquier superficie, objeto o mueble de las instalaciones donde se desarrollan programas de formación; o pegar avisos, carteles, pancartas o análogos en sitios no autorizados.'),(23,5,'21','Propiciar conductas, propuestas o actos inmorales hacia cualquier miembro de la comunidad educativa, que atenten contra la integridad física, moral y/o psicológica.');
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
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `paragrafos`
--

LOCK TABLES `paragrafos` WRITE;
/*!40000 ALTER TABLE `paragrafos` DISABLE KEYS */;
INSERT INTO `paragrafos` VALUES (1,1,'Parágrafo','Se desccribe algo'),(2,4,'Parágrafo','Para el caso de los aprendices en condición de discapacidad, además de los deberes enunciados, deberá: '),(3,4,'Parágrafo 1','Poner en conocimiento oportunamente al Centro de formación sobre cualquier condición de discapacidad, para proceder a la gestión de los ajustes razonables pertinentes.'),(4,4,'Parágrafo 2','Procurar por el cuidado de su salud y el bienestar de la comunidad, garantizando el cumplimiento de tratamientos médicos o procesos de rehabilitación establecidos por las instancias de salud tratantes.'),(5,4,'Parágrafo 3','Hacer partícipe a la familia y/o cuidador en los procesos de acompañamiento institucional como apoyo a su proceso formativo siempre y cuando se requiera.'),(12,14,'createRule','createRuled');
/*!40000 ALTER TABLE `paragrafos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `plantillas`
--

DROP TABLE IF EXISTS `plantillas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `plantillas` (
  `id_plantilla` int NOT NULL AUTO_INCREMENT,
  `nombre_plantilla` varchar(255) NOT NULL,
  `html_content` longtext NOT NULL,
  PRIMARY KEY (`id_plantilla`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `plantillas`
--

LOCK TABLES `plantillas` WRITE;
/*!40000 ALTER TABLE `plantillas` DISABLE KEYS */;
INSERT INTO `plantillas` VALUES (1,'Solicitar citación a comité de evaluación y seguimiento.','<p><strong>PROGRAMACIÓN CES EXTRAORDINARIO JUNIO 29 DE 2023</strong></p><p>Cordial saludo, respetado señor Carlos Freyman.</p><p>Desde el CES-CTM solicitamos su autorización para realizar citación y radicación a comité de evaluación y seguimiento a celebrarse el jueves 21 de septiembre de 2023 entre 10:00 a. m. y 4:00 p. m., ya se cuenta con visto bueno de la coordinación.</p><p><em>Nota</em>: adjuntamos carta de citación.</p><p style=\"color:red;\"><strong>Relaciono cuadro consolidado de los aprendices que se citarán a comité:</strong></p><p style=\"color:red;\">Nota: Tania, el documento lo encuentras en el drive</p>'),(2,'Radicar citación CES CTM','<p><strong>RADICAR NOTIFICACIÓN CES-CTM</strong><br>Cordial saludo, respetado señor Carlos Freyman,<br>Desde el CES-CTM solicitamos su autorización para realizar radicación de<br>notificación a la resolución 05-07933, 31/08/2023, ya se cuenta con visto bueno de los coordinadores académicos.<br><em><u>Nota:</u></em> adjuntamos notificación</p>'),(3,'Invitación a comité de evaluación y seguimiento.','<p><strong>INVITACIÓN A COMITÉ EXTRAORDINARIO JUNIO 29 DE 2023</strong></p><p><strong>Cordial saludo, respetados compañeros.</strong></p><p>Me permito enviar citación a comité extraordinario de evaluación y seguimiento a celebrarse de manera presencial el día jueves <strong>29 de junio de 2023</strong> entre <strong>09:00 a. m. - 1:00 a. m.</strong>, ambiente 602, sexto (6) piso del Centro Tecnológico del Mobiliario. (<strong>Calle 63 No. 58 B 03, Calatrava Itagüí</strong>). Por favor revisar las notas hasta final del correo.</p><p><strong>Nota:</strong> Para los instructores solicitantes, les recordamos que la asistencia al comité es indispensable para explicación y ampliación del caso. Si las evidencias son consideradas insuficientes, el comité puede ser declarado no procedente.</p><p>Enlace TEAMS: <a href=\"#\">dar clic aquí</a></p>'),(4,'Citación CES extraordinario.','<p><strong>CITACIÓN CES EXTRAORDINARIO FICHA 2226219 JUNIO 29 DE 2023</strong><br /><em>Cordial saludo, respetado aprendiz<br />De acuerdo con el Artículo 33 del Reglamento del Aprendiz SENA, nos permitimos enviarle citación a comité extraordinario de evaluación y seguimiento a celebrarse de manera presencial el próximo martes 18 de julio de 2023 a las 9:30 a. m. en el ambiente 602 ubicado en el sexto (6) piso del Centro Tecnológico del Mobiliario. (Calle 63 No. 58 B 03, Calatrava Itagüí). Si posee evidencias que pueda aportar para la citación usted debe anexarlas y enviarlas al correo: comiteaprendices@sena.edu.co, antes del día del comité; además de asistir con un acudiente en caso de ser menor de edad.<br />En caso de no poder asistir de forma presencial agradecemos informar con tiempo para enviar el enlace de la reunión. O en caso de ser de modalidad virtual o a distancia dar clic aquí.<br /><br />Nota: Este es el segundo comunicado e invitación del aprendiz a un comité de evaluación y seguimiento.</em></p>'),(5,'Enviar acta de citación a comité de evaluación y seguimiento.','<p>Buen día.<br>El CES-CTM hace envío del acta de comité ordinario celebrado para el lunes 08 de mayo de 2023 a las 9:00 a. m. Los compromisos se resumen a continuación:<br><span style=\"color:red;\">Tabla de compromisos.</span></p>'),(6,'Información de comités de evaluación y seguimiento.','<p>INFORMACIÓN DE COMITÉS<br>Buen día para todos.</p><p>Desde el CES-CTM hemos verificado y efectivamente ya se encuentra en el registro de comités. La agenda está a 15 días después de asentada la solicitud. Así que en los próximos días estaremos enviando información de la fecha de programación para el caso de la aprendiz.</p><p>Cordialmente,</p>');
/*!40000 ALTER TABLE `plantillas` ENABLE KEYS */;
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
  `estado` varchar(45) NOT NULL,
  `estado_descripcion` varchar(100) NOT NULL,
  `fecha_creacion` datetime NOT NULL,
  `categoria_causa` varchar(255) NOT NULL,
  `calificacion_causa` varchar(255) NOT NULL,
  `descripcion_caso` varchar(2000) NOT NULL,
  `id_archivo` int DEFAULT NULL,
  PRIMARY KEY (`id_solicitud`),
  KEY `fk_solicitud_1` (`id_usuario_solicitante`),
  KEY `fk_archivo` (`id_archivo`),
  CONSTRAINT `fk_archivo` FOREIGN KEY (`id_archivo`) REFERENCES `archivos` (`id_archivo`),
  CONSTRAINT `fk_solicitud_1` FOREIGN KEY (`id_usuario_solicitante`) REFERENCES `usuarios` (`id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=84 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `solicitud`
--

LOCK TABLES `solicitud` WRITE;
/*!40000 ALTER TABLE `solicitud` DISABLE KEYS */;
INSERT INTO `solicitud` VALUES (83,'Grupal','cristian  Bedoya ',9,'En proceso','Verificando información para la aprobación de la solicitud','2023-10-24 16:32:59','Academica','grave','buenassss',18);
/*!40000 ALTER TABLE `solicitud` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `nuevoMensajeAdministrador` AFTER INSERT ON `solicitud` FOR EACH ROW BEGIN
    DECLARE id_usuario_administrador INT;
    DECLARE done INT DEFAULT 0;
    DECLARE curUsuarios CURSOR FOR
        SELECT id_usuario
        FROM usuarios
        WHERE id_rol = 3 OR id_rol = 1;

    -- Declarar controlador para continuar procesamiento de cursor
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = 1;

    -- Obtener el ID de la solicitud recién insertada
    SET @id_solicitud_nueva = NEW.id_solicitud;

    -- Iniciar cursor
    OPEN curUsuarios;

    -- Recorrer usuarios y enviar mensajes
    usuarioLoop: LOOP
        FETCH curUsuarios INTO id_usuario_administrador;
        IF done = 1 THEN
            LEAVE usuarioLoop;
        END IF;

        -- Insertar un mensaje para el usuario actual con el estado "Sin leer"
        INSERT INTO mensajes (id_usuario, id_solicitud, mensaje, estado_mensaje)
        VALUES (id_usuario_administrador, @id_solicitud_nueva, 'Se ha creado una nueva solicitud', 'Sin leer');
    END LOOP;

    -- Cerrar cursor
    CLOSE curUsuarios;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `solicitud_AFTER_UPDATE` AFTER UPDATE ON `solicitud` FOR EACH ROW BEGIN
 DECLARE instructor_id INT;
    DECLARE solicitud_id INT;
    
    -- Obtener el id del usuario con rol 2 (instructor) asociado a la solicitud
    SELECT u.id_usuario INTO instructor_id
FROM usuarios u
INNER JOIN solicitud s ON u.id_usuario = s.id_usuario_solicitante
WHERE u.id_rol = 2
AND s.id_solicitud = NEW.id_solicitud; -- NEW.id_usuario es el nuevo id_usuario después de la actualización

    -- Verificar si el estado de la solicitud cambió y si es un instructor
    IF NEW.estado != OLD.estado AND instructor_id IS NOT NULL THEN
        -- Obtener el id de la solicitud
        SET solicitud_id = NEW.id_solicitud;

        -- Insertar un nuevo registro en la tabla mensajes
        INSERT INTO mensajes (id_usuario, id_solicitud, mensaje, fecha_creacion, estado_mensaje)
        VALUES (instructor_id, solicitud_id, 'El estado de su solicitud ha cambiado', NOW(), 'Sin leer');
    END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

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
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (3,'cristian david','Bedoya Torres','1027944969','bedoya969@soy.sena.edu',NULL,'3007030424',NULL,'ACTIVO','$2a$10$DZvyLyvnd4b/oiwOHe/fiuu5jce2kNPgmIB53KPckhjzziGnclRq6',1,1),(4,'cristian ','Bedoya ','1027944956','bedoya956@soy.sena.edu',NULL,'3007030424',NULL,'ACTIVO','$2a$10$O1zLg2.YqZtNbR9DmUwkRO207FuzZ69JpdpI2kwRkmU9JkhaoZzJu',1,1),(5,'Juan Carlos ','Prasca Medina ','1063355027','prasca07@soy.sena.edu',NULL,'3004984546',NULL,'ACTIVO','$2a$10$Q1Sw/kfD0p4NFchNsGowauXAvqMhVKNIPgSUQAFr5CkNr2cEwtzWG',1,1),(7,'cristian Prueba','Bedoya Prueba','1027944970','bedoyaprueba@soy.sena.edu',NULL,'3007030425',NULL,'ACTIVO','$2a$10$rirSMtMHGqWuWxAyucGY/OxDOGtiWAg7BbHmry9SBzHyxu0cirkUS',1,2),(8,'David','Torres','1010101010','torres@soy.sena.edu',NULL,'3007030424',NULL,'ACTIVO','$2a$10$0jE5eg39maDwPlXJnpuUteQFIA.s/36dBQC6NuYYkKyIVDSm5h4ma',1,2),(9,'David','Torres','101010101','torres@soy.sena.edu',NULL,'3007030424',NULL,'ACTIVO','$2a$10$17zhj7Y3XI5M85mdZ.KmaeBsxBODypjeYJ8L7KcJW./h3/oe4NIOG',1,1),(10,'Stiven','Benjumea Morales','1040491426','stevenbenjumea9@gmail.com','','3016911686','1234567','ACTIVO','$2a$10$T1JyH4oB2k7wtPVpavRctOFD77J05NFn2ru7QEq.yHhNo3XXvJcbW',1,3),(11,'Estefania ','Valencia Perez','1020109614','ev77190@gmail.com',NULL,'3242192087',NULL,'ACTIVO','$2a$10$Pr9dg3bhBI/03wse.jF/meQ7A6GNEpyjZf/bgKdTQaDBRLKDkQbTW',1,2),(12,'Admin','Administrador','1234567890','admin@sena.edu.co',NULL,'1234567890',NULL,'ACTIVO','$2a$10$X4w.T7rhPOqAm1kVn2HCyef40K92gATZykvYjgSrY/ibx4D3ZESWS',1,3),(13,'Coordi','Coordinador','123456789','coordi@sena.edu.co',NULL,'1234567890',NULL,'ACTIVO','$2a$10$awleqvF3Nl4sUz5kX63B4.rgCInBjl0qwbxPEc322RhkedbQawTt.',1,1),(14,'Instructor','Instructor','12345678','instructor@sena.edu.co',NULL,'1234567890',NULL,'ACTIVO','$2a$10$9HHCQIAkG7iCs22dBvdBT..mOxMHHn5cbAxVqExvf2zHODO4jXlpC',1,3),(15,'GUILLERMO','MORALES','0987654321','gsmorales@sena.edu.co',NULL,'30169116186',NULL,'ACTIVO','$2a$10$vuxPisdaevBoZJe/4DrBseM33NRSi492lwfS32YFp/rElBFuV4I0C',1,2);
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

-- Dump completed on 2023-11-03 10:32:09
