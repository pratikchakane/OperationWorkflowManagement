/*
SQLyog Community Edition- MySQL GUI v7.01 
MySQL - 5.0.27-community-nt : Database - operationalflow
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

CREATE DATABASE /*!32312 IF NOT EXISTS*/`operationalflow` /*!40100 DEFAULT CHARACTER SET latin1 */;

USE `operationalflow`;

/*Table structure for table `formdetails` */

DROP TABLE IF EXISTS `formdetails`;

CREATE TABLE `formdetails` (
  `typeofform` varchar(255) default NULL,
  `formval` varchar(255) default NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `formdetails` */

insert  into `formdetails`(`typeofform`,`formval`) values ('Leave','[\'FormLabel&&Leave form\', \'Input&&name\', \'Input&&employee id\', \'File&&upload file\', \'Select&&male-female\', \'Checkbox&&Team Leader-Project manager-HR\']'),('Others','[\'FormLabel&&adhar\', \'Input&&name\', \'Input&&adhar id\', \'File&&upload adhar\', \'Select&&male-female\', \'Checkbox&&Team Leader-HR\']'),('Others','[\'FormLabel&&bussines card\', \'Input&&name\', \'Input&&company name\', \'File&&file\', \'Checkbox&&Team Leader-Project manager-HR\']');

/*Table structure for table `status` */

DROP TABLE IF EXISTS `status`;

CREATE TABLE `status` (
  `id` varchar(255) default NULL,
  `username` varchar(255) default NULL,
  `usertype` varchar(255) default NULL,
  `inputval` varchar(255) default NULL,
  `whoaccess` varchar(255) default NULL,
  `typeofapply` varchar(255) default NULL,
  `status` varchar(255) default NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `status` */

insert  into `status`(`id`,`username`,`usertype`,`inputval`,`whoaccess`,`typeofapply`,`status`) values ('3','o','oo','[\'new bussiness\', \'BVCOE\', \'img2.jpg\']','HR','Others','Rejected'),('2','o','oo','[\'new bussiness\', \'BVCOE\', \'img2.jpg\']','Project manager','Others','Accepted');

/*Table structure for table `userapply` */

DROP TABLE IF EXISTS `userapply`;

CREATE TABLE `userapply` (
  `id` int(255) NOT NULL auto_increment,
  `username` varchar(255) default NULL,
  `usertype` varchar(255) default NULL,
  `inputval` varchar(255) default NULL,
  `whoaccess` varchar(255) default NULL,
  `typeofapply` varchar(255) default NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `userapply` */

insert  into `userapply`(`id`,`username`,`usertype`,`inputval`,`whoaccess`,`typeofapply`) values (1,'o','oo','[\'new bussiness\', \'BVCOE\', \'img2.jpg\']','Team Leader','Others');

/*Table structure for table `users` */

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int(255) NOT NULL auto_increment,
  `username` varchar(255) default NULL,
  `email` varchar(255) default NULL,
  `mobile` varchar(255) default NULL,
  `password` varchar(255) default NULL,
  `type` varchar(255) default NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `users` */

insert  into `users`(`id`,`username`,`email`,`mobile`,`password`,`type`) values (1,'h','yashsalvi1999@gmail.com','9930090883','h','HR'),(2,'p','yashsalvi1999@gmail.com','9930090883','p','Project manager'),(3,'t','yashsalvi1999@gmail.com','9930090883','t','Team Leader'),(4,'j','yashsalvi1999@gmail.com','9930090883','j','Junior'),(5,'o','yashsalvi1999@gmail.com','9930090883','o','oo');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
