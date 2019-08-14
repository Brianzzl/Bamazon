DROP DATABASE bamazon;
CREATE DATABASE bamazon;
USE bamazon;
CREATE TABLE products (
	item_id INT NOT NULL AUTO_INCREMENT,
    product_name varchar(100) NOT NULL,
    department_name varchar(100) DEFAULT NULL,
    price decimal(10,2) NOT NULL,
    stock_quatity INT NOT NULL,
    PRIMARY KEY (item_id)
);
