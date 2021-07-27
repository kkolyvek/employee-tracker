USE employees_db;

-- DEPARTMENTS TABLE
INSERT INTO department (name)
VALUES ('Management'),
       ('Reception'),
       ('Accounting'),
       ('Quality Control'),
       ('Sales'),
       ('Supplier Relations'),
       ('Customer Service'),
       ('Human Resources'),
       ('Warehouse');

-- ROLES TABLE
INSERT INTO role (title, salary, department_id)
VALUES ('Chief Financial Officer', 300000, 1),
       ('Regional Manager', 200000, 1),
       ('Assistant Regional Manager', 130000, 1),
       ('Sales Representative', 75000, 5),
       ('Regional Director in Charge of Sales', 95000, 5),
       ('Accountant', 87500, 3),
       ('Senior Accountant', 102500, 3),
       ('Quality Assurance Representative', 70000, 4),
       ('Receptionist', 60000, 2),
       ('Supplier Relations Representative', 75000, 6),
       ('Customer Service Representative', 65000, 7),
       ('Human Resources', 85000, 8),
       ('Warehouse Foreman', 75000, 9),
       ('Warehouse Worker', 55000, 9);

-- EMPLOYEES TABLE
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('David', 'Wallace', 1, NULL),
       ('Michael', 'Scott', 2, 1),
       ('Dwight', 'Schrute', 3, 2),
       ('Jim', 'Halpert', 3, 2),
       ('Pam', 'Beesley', 9, 2),
       ('Angela', 'Martin', 7, 2),
       ('Kevin', 'Malone', 6, 6),
       ('Oscar', 'Martinez', 6, 6),
       ('Creed', 'Bratton', 8, 2),
       ('Andy', 'Bernard', 5, 2),
       ('Phyllis', 'Lapin', 4, 10),
       ('Stanley', 'Hudson', 4, 10),
       ('Meredith', 'Palmer', 10, 2),
       ('Kelly', 'Kapoor', 11, 2),
       ('Toby', 'Flenderson', 12, 2),
       ('Darryl', 'Philbin', 13, 2),
       ('Jerry', 'DiCanio', 14, 16),
       ('Madge', 'Madsen', 14, 16),
       ('Lonnie', 'Collins', 14, 16);