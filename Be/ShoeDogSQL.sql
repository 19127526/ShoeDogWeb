CREATE DATABASE  IF NOT EXISTS ShoeDog/*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */ /*!80016 */;
USE `ShoeDog`;



DROP TABLE IF EXISTS `Categories`;
create table Categories
(
    CatId      int auto_increment primary key,
    CatName    varchar(50) charset utf8 not null
);
INSERT INTO categories (CatId, CatName) VALUES (1, 'Áo Chính Hãng');
INSERT INTO categories (CatId, CatName) VALUES (2, 'Nón Chính Hãng');
INSERT INTO categories (CatId, CatName) VALUES (3, 'Túi Chính Hãng');
INSERT INTO categories (CatId, CatName) VALUES (4, 'Phụ Kiện Chính Hãng');
INSERT INTO categories (CatId, CatName) VALUES (5, 'Dép Chính Hãng');
INSERT INTO categories (CatId, CatName) VALUES (6, 'Giày mới 100%');


DROP TABLE IF EXISTS `Products`;
create table Products
(
    ProId int auto_increment primary key,
    Inventory varchar(7) unique not null,
    ProName varchar(150) charset utf8  not null,
    Price double not null,
    Des longtext  null,
    ShortDes longtext  null,
    StatusPro int default 1 not null,
    DateStart TIMESTAMP default CURRENT_TIMESTAMP not null,
    CatId int not null,
    ImageArray longtext null,
    Brand varchar(150) charset utf8 not null ,
    Discount float default 1.0 null,
    TotalPrice double default (Price * Discount) null ,
    ImageMain longtext  null,
    Size varchar(150) charset utf8,
    Color varchar(30) charset utf8,
    ImageId longtext null,
    constraint `product-category`
        foreign key (CatId) references Categories (CatId)
);

DROP TABLE IF EXISTS `Orders`;
create table Orders
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
    MethodPay int not null
);


DROP TABLE IF EXISTS `OrderDetails`;
create table OrdersDetails
(
    OrderDetailId int auto_increment primary key,
    ProId int not null,
    Amount bigint not null ,
    Size longtext not null ,
    OrderId int not null,

    constraint `orderDetail-product`
        foreign key(ProId) references Products (ProId),
    constraint `orderDetail-order`
        foreign key(OrderId) references Orders (OrderId)
);
