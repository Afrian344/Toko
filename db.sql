CREATE TABLE IF NOT EXISTS `barang` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nama_barang` varchar(100) NOT NULL,
  `harga` int(11) NOT NULL,
  `stok` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `barang` (`nama_barang`, `harga`, `stok`) VALUES
('Laptop Asus', 11000000, 10),
('Laptop Acer', 12000000, 8),
('Laptop LenovoLOQ', 12700000, 5),
('Laptop AsusROG', 17000000, 15),
('Laptop MACBOOK', 14000000, 10),
('Laptop Notebook', 11200000, 11);