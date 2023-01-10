CREATE DATABASE  IF NOT EXISTS sho62786_shoesdogdatabase/*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */ /*!80016 */;
USE `sho62786_shoesdogdatabase`;



DROP TABLE IF EXISTS `categories`;
create table categories
(
    CatId      int auto_increment primary key,
    CatName    varchar(50) charset utf8 not null
);
INSERT INTO sho62786_shoesdogdatabase.categories (CatId, CatName) VALUES (1, 'Áo Chính Hãng');
INSERT INTO sho62786_shoesdogdatabase.categories (CatId, CatName) VALUES (2, 'Nón Chính Hãng');
INSERT INTO sho62786_shoesdogdatabase.categories (CatId, CatName) VALUES (3, 'Túi Chính Hãng');
INSERT INTO sho62786_shoesdogdatabase.categories (CatId, CatName) VALUES (4, 'Phụ Kiện Chính Hãng');
INSERT INTO sho62786_shoesdogdatabase.categories (CatId, CatName) VALUES (5, 'Dép Chính Hãng');
INSERT INTO sho62786_shoesdogdatabase.categories (CatId, CatName) VALUES (6, 'Giày Mới');
INSERT INTO sho62786_shoesdogdatabase.categories (CatId, CatName) VALUES (7, 'Giày Cũ');
INSERT INTO sho62786_shoesdogdatabase.categories (CatId, CatName) VALUES (8, 'Giày Trẻ Em');


DROP TABLE IF EXISTS `products`;
create table products
(
    ProId int auto_increment primary key,
    Inventory varchar(7) unique not null,
    ProName varchar(150) charset utf8  not null,
    Price longtext not null,
    Des longtext charset utf8 null,
    ShortDes longtext  null,
    StatusPro int default 1 not null,
    DateStart TIMESTAMP default CURRENT_TIMESTAMP not null,
    CatId int not null,
    ImageArray longtext null,
    Brand varchar(150) charset utf8 not null ,
    Discount longtext not null,
    TotalPrice longtext not null,
    ImageMain longtext  null,
    Size longtext not null,
    Color varchar(30) charset utf8,
    ImageId longtext null,
    constraint `product-category`
        foreign key (CatId) references categories (CatId)
);

DROP TABLE IF EXISTS `orders`;
create table orders
(
    OrderId int auto_increment primary key,
    FullName varchar(100) charset utf8  not null,
    Email varchar(100) charset utf8  null,
    Address varchar(100)  not null ,
    PhoneNumber varchar(100)  not null ,
    Note varchar(100) null ,
    InventoryOrder varchar(10) null,
    OrderDate TIMESTAMP default CURRENT_TIMESTAMP not null,
    StatusOrder int default 0 not null,
    MethodPay int not null,
    TotalCost int not null
);


DROP TABLE IF EXISTS `orderdetails`;
create table ordersdetails
(
    OrderDetailId int auto_increment primary key,
    ProId int not null,
    Amount bigint not null ,
    Size longtext not null ,
    OrderId int not null,
    Price double not null,

    constraint `orderDetail-product`
        foreign key(ProId) references products (ProId),
    constraint `orderDetail-order`
        foreign key(OrderId) references orders (OrderId)
);

DROP TABLE IF EXISTS `users`;
create table users
(
    UserId int auto_increment primary key,
    UserName varchar(100) charset utf8  not null,
    Password varchar(100) charset utf8  not null,
    FullName varchar(100) charset utf8 null,
    Email varchar(100) charset utf8  null,
    Address varchar(100)  null ,
    PhoneNumber varchar(100)  null ,
    Role int default 0 not null,
    StatusUser int default 1 not null,
    tokens longtext null
);





