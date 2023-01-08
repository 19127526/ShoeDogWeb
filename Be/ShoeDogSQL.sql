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
INSERT INTO categories (CatId, CatName) VALUES (6, 'Giày Mới');
INSERT INTO categories (CatId, CatName) VALUES (7, 'Giày Cũ');
INSERT INTO categories (CatId, CatName) VALUES (8, 'Giày Trẻ Em');


DROP TABLE IF EXISTS `Products`;
create table Products
(
    ProId int auto_increment primary key,
    Inventory varchar(7) unique not null,
    ProName varchar(150) charset utf8  not null,
    Price longtext not null,
    Des longtext  null,
    ShortDes longtext  null,
    StatusPro int default 1 not null,
    DateStart TIMESTAMP default CURRENT_TIMESTAMP not null,
    CatId int not null,
    ImageArray longtext null,
    Quantity longtext not null,
    Brand varchar(150) charset utf8 not null ,
    Discount longtext not null,
    TotalPrice longtext not null,
    ImageMain longtext  null,
    Size longtext not null,
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
    MethodPay int not null,
    TotalCost int not null
);


DROP TABLE IF EXISTS `OrderDetails`;
create table OrdersDetails
(
    OrderDetailId int auto_increment primary key,
    ProId int not null,
    Amount bigint not null ,
    Size longtext not null ,
    OrderId int not null,
    Price double not null,

    constraint `orderDetail-product`
        foreign key(ProId) references Products (ProId),
    constraint `orderDetail-order`
        foreign key(OrderId) references Orders (OrderId)
);

DROP TABLE IF EXISTS `Users`;
create table Users
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







INSERT INTO products (ProId, Inventory, ProName, Price, Des, ShortDes, StatusPro, DateStart, CatId, ImageArray,  Discount, TotalPrice, ImageMain, Size, Color,Brand) VALUES (1, 'abc1234', 'Stussy Built Tough Tee', 115000, '<strong><img class="emoji" role="img" draggable="false" src="https://s.w.org/images/core/emoji/13.1.0/svg/2705.svg" alt="✅" />Cam kết trọn đời mọi sản phẩm bên Shoe Dog là hàng chính hãng</strong>
\\n
\\n<strong>Địa chỉ:</strong>
\\n
\\n<strong><img class="emoji" role="img" draggable="false" src="https://s.w.org/images/core/emoji/13.1.0/svg/1f4cd.svg" alt="?" />Chi nhánh 1: 86/118 Trường Chinh, phường 12, quận Tân Bình</strong>
\\n
\\n<strong><img class="emoji" role="img" draggable="false" src="https://s.w.org/images/core/emoji/13.1.0/svg/1f4cd.svg" alt="?" />Chi nhánh 2: 666/4 Ba tháng hai, phường 14, quận 10</strong>
\\n
\\n<strong>Mọi thông tin chi tiết xin vui lòng liên hệ: 0865414134</strong>
\\n
\\n<strong>Facebook: https://www.facebook.com/giay2handschatluong</strong>
\\n
\\n<strong>Instagram: https://www.instagram.com/shoedog.vn_/</strong>', '<em>- Screenprinted graphics</em>
\\n
\\n<em>- Ribbed collar</em>
\\n
\\n<em>- 100% Cotton</em>', 1, '2022-12-03 23:53:28', 1, 'https://shoedog.vn/wp-content/uploads/2022/09/1904893_BLAC_1_38d3cedd-f0a4-47a6-8013-a9497c7304f8_720x.webp, https://shoedog.vn/wp-content/uploads/2022/09/1904893_BLAC_2_98c74189-1d94-4e9c-90a7-4f2726b57bfe_720x.webp', 0, 115000, 'https://shoedog.vn/wp-content/uploads/2022/09/1904893_BLAC_1_38d3cedd-f0a4-47a6-8013-a9497c7304f8_720x.webp', 'L, M', 'Đen','Nike');
INSERT INTO products (ProId, Inventory, ProName, Price, Des, ShortDes, StatusPro, DateStart, CatId, ImageArray, Discount, TotalPrice, ImageMain, Size, Color,Brand) VALUES (2, 'aaabbbb', 'Stussy Built Tough Tee', 115000, '<strong><img class="emoji" role="img" draggable="false" src="https://s.w.org/images/core/emoji/13.1.0/svg/2705.svg" alt="✅" />Cam kết trọn đời mọi sản phẩm bên Shoe Dog là hàng chính hãng</strong>
\\n
\\n<strong>Địa chỉ:</strong>
\\n
\\n<strong><img class="emoji" role="img" draggable="false" src="https://s.w.org/images/core/emoji/13.1.0/svg/1f4cd.svg" alt="?" />Chi nhánh 1: 86/118 Trường Chinh, phường 12, quận Tân Bình</strong>
\\n
\\n<strong><img class="emoji" role="img" draggable="false" src="https://s.w.org/images/core/emoji/13.1.0/svg/1f4cd.svg" alt="?" />Chi nhánh 2: 666/4 Ba tháng hai, phường 14, quận 10</strong>
\\n
\\n<strong>Mọi thông tin chi tiết xin vui lòng liên hệ: 0865414134</strong>
\\n
\\n<strong>Facebook: https://www.facebook.com/giay2handschatluong</strong>
\\n
\\n<strong>Instagram: https://www.instagram.com/shoedog.vn_/</strong>', '<em>- Screenprinted graphics</em>
\\n
\\n<em>- Ribbed collar</em>
\\n
\\n<em>- 100% Cotton</em>', 1, '2022-12-04 00:11:24', 1, null,  0, 115000, 'https://shoedog.vn/wp-content/uploads/2022/09/1904893_WHIT_1_ae5513bc-1746-4dd1-9dff-76980280a5ce_720x.webp, https://shoedog.vn/wp-content/uploads/2022/09/1904893_WHIT_2_de581c52-91d5-4644-9564-c1bfa0ffc06c_720x.webp', 'L, M', 'Trắng','Gucci');
INSERT INTO products (ProId, Inventory, ProName, Price, Des, ShortDes, StatusPro, DateStart, CatId, ImageArray,  Discount, TotalPrice, ImageMain, Size, Color,Brand) VALUES (3, 'ccccccc', 'Nón Nike Heritage 86 chính hãng', 85000, '<img class="aligncenter size-full wp-image-1120" src="https://shoedog.vn/wp-content/uploads/2022/01/271595152_3178837255775151_8041934531318166492_n.jpg" alt="" width="1440" height="1440" /> <img class="aligncenter size-full wp-image-1121" src="https://shoedog.vn/wp-content/uploads/2022/01/271599349_3178837249108485_5362027506056020752_n.jpg" alt="" width="1440" height="1440" /> <img class="aligncenter size-full wp-image-1122" src="https://shoedog.vn/wp-content/uploads/2022/01/271610182_3178837229108487_1476959637064592103_n.jpg" alt="" width="1440" height="1440" /> <img class="aligncenter size-full wp-image-1123" src="https://shoedog.vn/wp-content/uploads/2022/01/271653126_3178837232441820_3981912697630967423_n.jpg" alt="" width="1440" height="1440" /> <img class="aligncenter size-full wp-image-1124" src="https://shoedog.vn/wp-content/uploads/2022/01/271656884_3178837239108486_1446433627113033019_n.jpg" alt="" width="1440" height="1439" /> <img class="aligncenter size-full wp-image-1126" src="https://shoedog.vn/wp-content/uploads/2022/01/271660445_3178837245775152_4525744367107358356_n.jpg" alt="" width="1440" height="1440" /> <img class="aligncenter size-full wp-image-1127" src="https://shoedog.vn/wp-content/uploads/2022/01/271664559_3178837225775154_5648722583419083262_n.jpg" alt="" width="1440" height="1440" /> <img class="aligncenter size-full wp-image-1128" src="https://shoedog.vn/wp-content/uploads/2022/01/271664559_3178837252441818_8870196710787165471_n.jpg" alt="" width="1440" height="1439" /> <img class="aligncenter size-full wp-image-1129" src="https://shoedog.vn/wp-content/uploads/2022/01/271688593_3178837242441819_4887242882146411619_n.jpg" alt="" width="1440" height="1440" /> <img class="aligncenter size-full wp-image-1130" src="https://shoedog.vn/wp-content/uploads/2022/01/271700747_3178837235775153_7776080202202517120_n.jpg" alt="" width="1440" height="1440" />
\\n
\\nNón Nike Heritage 86 chính hãng, mới 100% full tag đầy đủ. Giá store 24$ chưa kể phí ship về nữa đó cả nhà.
\\n<div class="woocommerce-tabs wc-tabs-wrapper container tabbed-content">
\\n<div class="tab-panels">
\\n<div id="tab-description" class="woocommerce-Tabs-panel woocommerce-Tabs-panel--description panel entry-content active" role="tabpanel" aria-labelledby="tab-title-description">
\\n
\\n<strong><img class="emoji" role="img" draggable="false" src="https://s.w.org/images/core/emoji/13.1.0/svg/2705.svg" alt="✅" />Cam kết trọn đời mọi sản phẩm bên Shoe Dog là hàng chính hãng</strong>
\\n
\\n<strong>Địa chỉ:</strong>
\\n
\\n<strong><img class="emoji" role="img" draggable="false" src="https://s.w.org/images/core/emoji/13.1.0/svg/1f4cd.svg" alt="?" />Chi nhánh 1: 86/118 Trường Chinh, phường 12, quận Tân Bình</strong>
\\n
\\n<strong><img class="emoji" role="img" draggable="false" src="https://s.w.org/images/core/emoji/13.1.0/svg/1f4cd.svg" alt="?" />Chi nhánh 2: 666/4 Ba tháng hai, phường 14, quận 10</strong>
\\n
\\n<strong>Mọi thông tin chi tiết xin vui lòng liên hệ: 0865414134</strong>
\\n
\\n<strong>Facebook: https://www.facebook.com/giay2handschatluong</strong>
\\n
\\n<strong>Instagram: https://www.instagram.com/shoedog.vn_/</strong>
\\n
\\n</div>
\\n</div>
\\n</div>', '<div class="cxmmr5t8 oygrvhab hcukyx3x c1et5uql o9v6fnle ii04i59q">
\\n<div dir="auto"><span class="pq6dq46d tbxw36s4 knj5qynh kvgmc6g5 ditlmg2l oygrvhab nvdbi5me sf5mxxl7 gl3lb2sf hhz5lgdu"><img src="https://static.xx.fbcdn.net/images/emoji.php/v9/t77/1/16/203c.png" alt="‼️" width="16" height="16" /></span>Thêu chữ sắc nét: Nike phía trước và 1972 phía sau</div>
\\n</div>
\\n<div class="cxmmr5t8 oygrvhab hcukyx3x c1et5uql o9v6fnle ii04i59q">
\\n<div dir="auto">Dây cài làm bằng chất liệu da thật cao cấp, bọc cẩn thận.</div>
\\n</div>', 1, '2022-12-04 00:15:23', 2, null,  0, 85000, 'https://shoedog.vn/wp-content/uploads/2022/01/271660445_3178837245775152_4525744367107358356_n.jpg', null, 'Trắng','Gucci');
INSERT INTO products (ProId, Inventory, ProName, Price, Des, ShortDes, StatusPro, DateStart, CatId, ImageArray,  Discount, TotalPrice, ImageMain, Size, Color,Brand) VALUES (4, 'ddddddd', 'Balo Adidas BP Mini', 650000, '<img class="aligncenter size-full wp-image-1099" src="https://shoedog.vn/wp-content/uploads/2022/01/271779126_3182053078786902_892526941942475405_n.jpg" alt="" width="1440" height="1440" /> <img class="aligncenter size-full wp-image-1100" src="https://shoedog.vn/wp-content/uploads/2022/01/271788803_3182053085453568_3083065279543118305_n.jpg" alt="" width="1440" height="1440" /> <img class="aligncenter size-full wp-image-1101" src="https://shoedog.vn/wp-content/uploads/2022/01/271805728_3182053095453567_5437710691344004953_n.jpg" alt="" width="1440" height="1440" /> <img class="aligncenter size-full wp-image-1102" src="https://shoedog.vn/wp-content/uploads/2022/01/271941571_3182053088786901_2358267383490890704_n.jpg" alt="" width="1440" height="1440" />', '<div dir="auto">Kích thước: 8 cm x 15 cm x 22 cm</div>
\\n<div dir="auto">Dung tích: 4 L</div>
\\n<div dir="auto">Vải jacquard làm từ 100% polyester tái chế</div>
\\n<div dir="auto">Ngăn khóa kéo phía trước</div>
\\n<div dir="auto">Quai đeo vai lót đệm tùy chỉnh</div>
\\n<div dir="auto">Chất vải satin bóng</div>', 1, '2022-12-04 00:19:01', 3, null,  0, 650000, 'https://shoedog.vn/wp-content/uploads/2022/01/271660445_3178837245775152_4525744367107358356_n.jpg', null, 'Trắng','Gucci');
INSERT INTO products (ProId, Inventory, ProName, Price, Des, ShortDes, StatusPro, DateStart, CatId, ImageArray,  Discount, TotalPrice, ImageMain, Size, Color,Brand) VALUES (5, 'eeeeeee', 'Ví cầm tay Coach Chính hãng', 950000, 'Cap MLB, LA, mlb', 'Cap MLB, LA, mlb', 1, '2022-12-04 00:21:38', 4, null,  0, 950000, 'https://shoedog.vn/wp-content/uploads/2022/08/8269cce23249f017a958.jpg', null, 'Trắng','Adidas');
INSERT INTO products (ProId, Inventory, ProName, Price, Des, ShortDes, StatusPro, DateStart, CatId, ImageArray,  Discount, TotalPrice, ImageMain, Size, Color,Brand) VALUES (6, 'kjjjjjj', 'DÉP DISCOVERY SANDLINE', 100000, '<div class="woocommerce-tabs wc-tabs-wrapper container tabbed-content"> \\n<div class="tab-panels"> \\n<div id="tab-description" class="woocommerce-Tabs-panel woocommerce-Tabs-panel--description panel entry-content active" role="tabpanel" aria-labelledby="tab-title-description"> \\n \\n<strong><img class="emoji" role="img" draggable="false" src="https://s.w.org/images/core/emoji/13.1.0/svg/2705.svg" alt="✅" />Cam kết trọn đời mọi sản phẩm bên Shoe Dog là hàng chính hãng</strong> \\n \\n<strong>Địa chỉ:</strong> \\n \\n<strong><img class="emoji" role="img" draggable="false" src="https://s.w.org/images/core/emoji/13.1.0/svg/1f4cd.svg" alt="?" />Chi nhánh 1: 86/118 Trường Chinh, phường 12, quận Tân Bình</strong> \\n \\n<strong><img class="emoji" role="img" draggable="false" src="https://s.w.org/images/core/emoji/13.1.0/svg/1f4cd.svg" alt="?" />Chi nhánh 2: 666/4 Ba tháng hai, phường 14, quận 10</strong> \\n \\n<strong>Mọi thông tin chi tiết xin vui lòng liên hệ: 0865414134</strong> \\n \\n<strong>Facebook: https://www.facebook.com/giay2handschatluong</strong> \\n \\n<strong>Instagram: https://www.instagram.com/shoedog.vn_/</strong> \\n \\n</div> \\n</div> \\n</div>', '<ul>
\\n 	<li>Tên sản phẩm : Dép Slipper
\\nThương hiệu : Discovery
\\n+ Xuất sứ  : Hàn Quốc
\\n+ Chất liệu : Chất liệu da tổng hợp mềm mại và sang trọng khi trải nghiệm
\\nThiết kế trẻ trung phù hợp với mọi lứa tuổi</li>
\\n</ul>', 1, '2022-12-04 00:24:26', 5, null,  0, 100000, 'https://shoedog.vn/wp-content/uploads/2022/07/f92bb92eee6c2c32757d.jpg', null, 'Trắng','Adidas');
INSERT INTO products (ProId, Inventory, ProName, Price, Des, ShortDes, StatusPro, DateStart, CatId, ImageArray,  Discount, TotalPrice, ImageMain, Size, Color,Brand) VALUES (7, 'asaaaaa', 'NIKE DUNK LOW PANDA', 199999, '<strong><img class="emoji" role="img" draggable="false" src="https://s.w.org/images/core/emoji/13.1.0/svg/2705.svg" alt="✅" />Cam kết trọn đời mọi sản phẩm bên Shoe Dog là hàng chính hãng</strong>
\\n
\\n<strong>Địa chỉ:</strong>
\\n
\\n<strong><img class="emoji" role="img" draggable="false" src="https://s.w.org/images/core/emoji/13.1.0/svg/1f4cd.svg" alt="?" />Chi nhánh 1: 86/118 Trường Chinh, phường 12, quận Tân Bình</strong>
\\n
\\n<strong><img class="emoji" role="img" draggable="false" src="https://s.w.org/images/core/emoji/13.1.0/svg/1f4cd.svg" alt="?" />Chi nhánh 2: 666/4 Ba tháng hai, phường 14, quận 10</strong>
\\n
\\n<strong>Mọi thông tin chi tiết xin vui lòng liên hệ: 0865414134</strong>
\\n
\\n<strong>Facebook: https://www.facebook.com/giay2handschatluong</strong>
\\n
\\n<strong>Instagram: https://www.instagram.com/shoedog.vn_/</strong>', 'Brand: Jordan
\\n
\\nColorway: <span class="release-attr-value">White/Aluminum</span>
\\n<div class="release-attr-item">
\\n
\\nStyle code: <span style="font-size: 14.4px;">DC0774-141</span>
\\n<div class="release-attr-item"></div>
\\n</div>', 1, '2022-12-04 00:26:52', 6, null,  0, 199999, 'https://shoedog.vn/wp-content/uploads/2022/09/Thiet-ke-chua-co-ten-2.png', '28', 'Trắng','Adidas');