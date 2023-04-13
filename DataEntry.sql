INSERT INTO ADMIN(ADMINID, NAME, ADDRESS, CITY, STATE, CONTACT) VALUES (1, 'Bob', '1234 West St', 'Dekalb', 'Illinois', '123-456-7890');
INSERT INTO ADMIN(ADMINID, NAME, ADDRESS, CITY, STATE, CONTACT) VALUES (2, 'Sally', '1234 East St', 'Dekalb', 'Illinois', '256-726-7361');
INSERT INTO EMPLOYEE(EMPLOYEEID, NAME, ADDRESS, CITY, STATE, CONTACT, COMMISSION) VALUES (1, 'Bob', '1234 West St', 'Dekalb', 'Illinois', '779-456-1264', 10);
INSERT INTO EMPLOYEE(EMPLOYEEID, NAME, ADDRESS, CITY, STATE, CONTACT, COMMISSION) VALUES (2, 'Sally', '1234 East St', 'Dekalb', 'Illinois', '425-954-8245', 10);
INSERT INTO EMPLOYEE(EMPLOYEEID, NAME, ADDRESS, CITY, STATE, CONTACT, COMMISSION) VALUES (3, 'John', '1234 North St', 'Dekalb', 'Illinois', '156-456-3645', 10);

INSERT INTO QUOTE(QUOTEID, CUSTOMERID, EMPLOYEEID, PAYMENTINFO, PRICE, DESCRIPTION) VALUES (1, 1, 1, 'Credit Card', 100, 'This is a description');
INSERT INTO QUOTE(QUOTEID, CUSTOMERID, EMPLOYEEID, PAYMENTINFO, PRICE, DESCRIPTION) VALUES (2, 2, 2, 'Credit Card', 100, 'This is a description');
INSERT INTO QUOTE(QUOTEID, CUSTOMERID, EMPLOYEEID, PAYMENTINFO, PRICE, DESCRIPTION) VALUES (3, 3, 3, 'Credit Card', 100, 'This is a description');
INSERT INTO QUOTE(QUOTEID, CUSTOMERID, EMPLOYEEID, PAYMENTINFO, PRICE, DESCRIPTION) VALUES (4, 4, 1, 'Credit Card', 100, 'This is a description');
INSERT INTO QUOTE(QUOTEID, CUSTOMERID, EMPLOYEEID, PAYMENTINFO, PRICE, DESCRIPTION) VALUES (5, 5, 2, 'Credit Card', 100, 'This is a description');
