

CREATE TABLE admin (
  adminID INTEGER PRIMARY KEY AUTOINCREMENT,
  name VARCHAR(50) NOT NULL,
  password VARCHAR(50) NOT NULL,
  address VARCHAR(50) NOT NULL,
  city VARCHAR(50) NOT NULL,
  state VARCHAR(50) NOT NULL,
  contact VARCHAR(50) NOT NULL
);

CREATE TABLE employee (
  employeeID INTEGER PRIMARY KEY AUTOINCREMENT,
  name VARCHAR(50) NOT NULL,
  password VARCHAR(50) NOT NULL,
  address VARCHAR(50) NOT NULL,
  city VARCHAR(50) NOT NULL,
  state VARCHAR(50) NOT NULL,
  contact VARCHAR(50) NOT NULL,
  commission INTEGER NOT NULL
);

CREATE TABLE quote (
  quoteID INTEGER PRIMARY KEY AUTOINCREMENT,
  customerID INTEGER NOT NULL DEFAULT 0,
  employeeID INTEGER NOT NULL,
  customerEmail VARCHAR(50) NOT NULL,
  paymentInfo VARCHAR(50) NOT NULL,
  price INTEGER NOT NULL,
  description VARCHAR(50) NOT NULL,
  status VARCHAR(50) DEFAULT('unresolved') NOT NULL,
  FOREIGN KEY (employeeID) REFERENCES employee(employeeID)
);