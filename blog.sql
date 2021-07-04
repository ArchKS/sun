-- MySQL dump 10.14  Distrib 5.5.68-MariaDB, for Linux (x86_64)
--
-- Host: localhost    Database: blog
-- ------------------------------------------------------
-- Server version	5.5.68-MariaDB

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
-- Table structure for table `articles`
--

DROP TABLE IF EXISTS `articles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `articles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(40) NOT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `visited` int(11) DEFAULT NULL,
  `category` varchar(10) DEFAULT NULL,
  `tags` varchar(40) DEFAULT NULL,
  `content` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `articles`
--

LOCK TABLES `articles` WRITE;
/*!40000 ALTER TABLE `articles` DISABLE KEYS */;
INSERT INTO `articles` VALUES (1,'2017书单','2017-04-07 16:00:00',107,'读书','书单','\n《巫师简史》· 于怀岸\n\n《中国井文化》· 吴裕成\n\n《古今武侠故事》· 严振新、林瑞锋\n\n《白鹿原》· 陈忠实\n\n《人生》 ·  路遥\n\n《封神演义》 · ‎许仲琳，陸西星\n\n《苏东坡传》· 林语堂\n\n《文化苦旅》· 余秋雨\n\n《再生缘》· 陈端生\n\n《星际争霸》· 刘慈欣\n\n《何谓文化》· 余秋雨\n\n《禅与诗》 · 李壮鹰 \n\n《七剑下辽东》· 郑证因\n\n《王阳明知行合一》· 度阴山\n\n《风声鹤唳》· 林语堂\n\n《周国平小语》· 周国平\n\n《一只特立独行的猪》· 王小波\n\n《三个火枪手》· 大仲马 \n\n《吸引力法则》· 杰克•坎菲尔德 D.D. 沃特金\n\n《人性》·  戴尔·卡耐基\n\n《汤姆叔叔的小屋》· 斯托夫人 \n\n《思维导图》'),(2,'2019书单','2019-02-28 16:00:00',103,'读书','书单','\n《秘密》· 东野圭吾 \n\n《影响力》· 罗伯特·西奥迪尼\n\n《白夜行》· 东野圭吾 \n\n《心经》\n\n《六祖坛经》\n\n'),(3,'2018书单','2018-03-30 16:00:00',58,'读书','书单','\n《偷影子的人》· 马克·李维\n\n《诗词格律》· 王力\n\n《白雪少年》· 林清玄\n\n《追风筝的人》· 卡勒德·胡赛尼\n\n《梦的解析》· 弗洛伊德\n\n《性学三论》· 弗洛伊德\n\n《乌合之众》· 古斯塔夫・勒庞\n\n《寻找无双》· 王小波\n\n《人间失格》· 太宰治\n\n《红拂夜奔》· 王小波\n\n《月亮与六便士》· 威廉·薩默塞特·毛姆\n\n《且听风吟》· 村上春树\n\n《人类群星闪耀时》· 斯蒂芬·茨威格\n\n《狼图腾》·  姜戎於\n\n《连城诀》· 金庸\n\n《预约死亡》· 毕淑敏\n\n《瓦尔登湖》· 梭罗\n\n《情人》· 渡边淳一\n\n《我不》· 大冰\n\n《自控力》· 凯利·麦格尼格尔\n\n《毛泽东传》· 罗斯·特里尔'),(5,'2020书单','2020-08-10 16:00:00',39,'读书','书单','\n《影响力》· 罗伯特·西奥迪尼\n\n《茶花女》· 小仲马\n\n《苏菲的世界》· 乔斯坦·贾德 \n\n《人类简史》· 尤瓦尔·赫拉利\n\n《欲罢不能 : 刷屏时代如何摆脱行为上瘾》· 亚当·奥尔特\n\n《自控力》 凯利·麦格尼格尔\n\n《传习录》· 王守仁\n\n《给青年的十二封信》 · 朱光潜');
/*!40000 ALTER TABLE `articles` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-04-21 12:37:51
