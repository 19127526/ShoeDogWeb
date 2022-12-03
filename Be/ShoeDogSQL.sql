CREATE DATABASE  IF NOT EXISTS ShoeDog/*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */ /*!80016 */;
USE `ShoeDog`;



DROP TABLE IF EXISTS `Categories`;
create table Categories
(
    CatId      int auto_increment primary key,
    CatName    varchar(50) charset utf8 not null
);


DROP TABLE IF EXISTS `Materials`;
create table Materials
(
	MatId int auto_increment primary key,
    Size varchar(20) charset utf8  default null null,
    Color varchar(30) charset utf8  default null null
);

DROP TABLE IF EXISTS `Products`;
create table Products
(
	ProId int auto_increment primary key,
    ProName varchar(150) charset utf8  not null,
    Price double not null,
    Des longtext  null,
    StatusPro int default 1 not null,
    DateStart TIMESTAMP default CURRENT_TIMESTAMP not null,
    CatId int not null,
    ImageArray longtext null,
    Quantity bigint default 1 null,
    MatId int not null,
    Discount float default 1.0 null,
    TotalPrice double default (Price * Discount) null ,
    ImageMain longtext not null,
    constraint `product-category`
        foreign key (CatId) references Categories (CatId),
	constraint `product-material`
		foreign key(MatId) references Materials (MatId)
);


DROP TABLE IF EXISTS `Orders`;
create table Orders
(
	OrderId int auto_increment primary key,
    StatusOrder int default 0 not null
);

DROP TABLE IF EXISTS `OrderDetails`;
create table OrdersDetails
(
	OrderDetailId int auto_increment primary key,
    ProId int not null,
    Amount bigint default 1 null,
    OrderId int not null,
    constraint `orderDetail-product`
		foreign key(ProId) references Products (ProId),
	 constraint `orderDetail-order`
		foreign key(OrderId) references Orders (OrderId)
);

















