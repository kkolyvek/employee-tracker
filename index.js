// IMPORTS AND INITS
// =================
const inquirer = require('inquirer');
const mysql = require('mysql2');
const figlet = require('figlet');
const table = require('cli-table3');
require("dotenv").config();

const db = mysql.createConnection(
    {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: "employees_db"
    }
);

const questions = [
    {
        type: 'list',
        message: 'What would you like to do?',
        choices: [
            'View all departments',
            'View all roles',
            'View all employees',
            new inquirer.Separator(),
            'Add a department',
            'Add a role',
            'Add an employee',
            "Update an employee's role",
            new inquirer.Separator(),
            'QUIT',
            new inquirer.Separator()
        ],
        name: 'selection'
    }
];

// FUNCTIONS
// =========

const viewDepts = () => {
    const data = new table({
        head: ['ID', 'Name']
    });
    queryStr = 'SELECT * FROM department';
    db.query(queryStr, function (err, results) {
        results.forEach(el => {
            data.push([el.id, el.name]);
        });
        console.log('\n');
        console.log(data.toString());
        console.log('\n');
        main();
    });
};

const viewRoles = () => {
    const data = new table({
        head: ['ID', 'Title', 'Department', 'Salary']
    });
    queryStr = 'SELECT role.id, title, department.name, salary FROM role JOIN department ON role.department_id = department.id';
    db.query(queryStr, (err, results) => {
        results.forEach(el => {
            data.push([el.id, el.title, el.name, el.salary])
        });
        console.log('\n');
        console.log(data.toString());
        console.log('\n');
        main();
    })
};

const viewEmps = () => {
    const data = new table({
        head: ['ID', 'First Name', 'Last Name', 'Title', 'Department', 'Salary', 'Manager']
    });
    queryStr = 
    'SELECT e.id, e.first_name, e.last_name, role.title, department.name, role.salary, CONCAT_WS(" ", employee.first_name, employee.last_name) AS manager FROM employee e '
    + 'JOIN role ON role.id = e.role_id '
    + 'JOIN department ON role.department_id = department.id '
    + 'LEFT JOIN employee ON employee.id = e.manager_id'
    db.query(queryStr, (err, results) => {
        results.forEach(el => {
            data.push([el.id, el.first_name, el.last_name, el.title, el.name, el.salary, el.manager]);
        });
        console.log('\n');
        console.log(data.toString());
        console.log('\n');
        main();
    });
};

const main = () => {
    inquirer
        .prompt(questions)
        .then(({ selection }) => {
            switch(selection) {
                case 'View all departments':
                    viewDepts();
                    break;
                case 'View all roles':
                    viewRoles();
                    break;
                case 'View all employees':
                    viewEmps();
                    break;
                default:
                    console.log('Bye')
                    db.end();
                    break;
            };
        });
};

// RUN
// ===

console.log('\n');
console.log(figlet.textSync('Employee', {
    font: 'Standard',
    horizontalLayout: 'full'
}));
console.log(figlet.textSync('Manager', {
    font: 'Standard',
    horizontalLayout: 'full'
}));
console.log('\n');

main();