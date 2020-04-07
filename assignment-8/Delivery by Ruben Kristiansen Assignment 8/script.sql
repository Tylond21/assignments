/*
SQLyog Professional v13.1.1 (64 bit)
MySQL - 10.4.8-MariaDB : Database - dat310
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`dat310` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `dat310`;

/*Table structure for table `order_rows` */

DROP TABLE IF EXISTS `order_rows`;

CREATE TABLE `order_rows` (
  `row_id` int(11) NOT NULL AUTO_INCREMENT,
  `product_id` int(11) DEFAULT NULL,
  `order_id` int(11) DEFAULT NULL,
  `count` int(11) DEFAULT NULL,
  `size` char(50) DEFAULT NULL,
  PRIMARY KEY (`row_id`),
  KEY `order_id` (`order_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `order_id` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`),
  CONSTRAINT `product_id` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;

/*Data for the table `order_rows` */

/*Table structure for table `orders` */

DROP TABLE IF EXISTS `orders`;

CREATE TABLE `orders` (
  `order_id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` char(50) DEFAULT NULL,
  `last_name` char(50) DEFAULT NULL,
  `email` char(50) DEFAULT NULL,
  `street` char(50) DEFAULT NULL,
  `city` char(50) DEFAULT NULL,
  `postcode` char(50) DEFAULT NULL,
  PRIMARY KEY (`order_id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8;

/*Data for the table `orders` */

/*Table structure for table `products` */

DROP TABLE IF EXISTS `products`;

CREATE TABLE `products` (
  `product_id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(20) NOT NULL,
  `price` int(11) NOT NULL,
  `discount` int(11) NOT NULL,
  `img` varchar(50) NOT NULL,
  `description` varchar(255) NOT NULL,
  `details` text NOT NULL,
  PRIMARY KEY (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

/*Data for the table `products` */

insert  into `products`(`product_id`,`title`,`price`,`discount`,`img`,`description`,`details`) values 
(1,'Special socks',170,18,'tsock.jpg','Perfectly good socks!','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sodales neque quis nisi facilisis lobortis. Nam efficitur eget nisi sit amet bibendum. Vestibulum elementum faucibus quam ut posuere. Vivamus pellentesque luctus nunc at bibendum. Mauris viverra ultrices nisi, sit amet imperdiet lectus accumsan eu. Morbi ornare diam nulla, nec aliquet nisl accumsan dictum. Mauris sit amet tellus in ipsum commodo hendrerit. Nunc at mollis magna. Proin felis nibh, venenatis non lobortis quis, ullamcorper nec dolor. Vivamus tempus volutpat fringilla. Praesent volutpat sit amet massa nec ultricies. Curabitur sollicitudin pharetra tortor in dictum. In mattis orci vel augue vehicula rutrum. Nullam vitae sollicitudin orci.'),
(2,'Good socks',180,0,'tsock.jpg','Keep you warm.','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sodales neque quis nisi facilisis lobortis. Nam efficitur eget nisi sit amet bibendum. Vestibulum elementum faucibus quam ut posuere. Vivamus pellentesque luctus nunc at bibendum. Mauris viverra ultrices nisi, sit amet imperdiet lectus accumsan eu. Morbi ornare diam nulla, nec aliquet nisl accumsan dictum. Mauris sit amet tellus in ipsum commodo hendrerit. Nunc at mollis magna. Proin felis nibh, venenatis non lobortis quis, ullamcorper nec dolor. Vivamus tempus volutpat fringilla. Praesent volutpat sit amet massa nec ultricies. Curabitur sollicitudin pharetra tortor in dictum. In mattis orci vel augue vehicula rutrum. Nullam vitae sollicitudin orci.');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
