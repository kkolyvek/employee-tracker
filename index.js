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
            "View a department's budget",
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

const addDeptQuestions = [
    {
        type: 'input',
        message: 'Enter department to add:',
        name: 'dbNew'
    }
];

// FUNCTIONS
// =========

// HELPER FUNCTIONS
// ================

const roleInq = (results) => {
    // Build list of departments
    let deptsList = results.map(el => {
        return {
            name: el.name,
            value: el.id
        };
    });
    deptsList.push(new inquirer.Separator());
    // Build prompts
    const addRoleQuestions = [
        {
            type: 'input',
            message: 'Enter role to add:',
            name: 'roleNew'
        },
        {
            type: 'number',
            message: 'Enter salary for this role:',
            name: 'salaryNew'
        },
        {
            type: 'list',
            choices: deptsList,
            message: "Select new role's department:",
            name: 'deptNew'
        }
    ];
    // Present and process prompts
    inquirer
        .prompt(addRoleQuestions)
        .then(({ roleNew, salaryNew, deptNew }) => {
            if (typeof(salaryNew) !== 'number') {
                console.log(typeof(salaryNew))
                console.error('\nSalary must be a number!\n');
                roleInq(results);
            } else {
                queryStr = `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`;
                db.query(queryStr, [roleNew, salaryNew, deptNew], (err, results) => {
                    if (err) {console.log('\nError adding role!')}
                    else {console.log('\nAdded new role.\n')}
                    main();
                });
            };
        });
};

const empInq = (roles, emps) => {
    // Build list of roles and potential managers
    let rolesList = roles.map(el => {
        return {
            name: el.title,
            value: el.id
        };
    });
    rolesList.push(new inquirer.Separator());
    
    let empList = emps.map(el => {
        return {
            name: el.name,
            value: el.id
        };
    });
    empList.push({name: 'No Manager', value: null});
    empList.push(new inquirer.Separator());
    
    // Build prompts
    const addEmpQuestions = [
        {
            type: 'input',
            message: "Enter employee's first name:",
            name: 'firstName'
        },
        {
            type: 'input',
            message: "Enter employee's last name:",
            name: 'lastName'
        },
        {
            type: 'list',
            choices: rolesList,
            message: "Select new employee's role:",
            name: 'role'
        },
        {
            type: 'list',
            choices: empList,
            message: "Select new employee's manager:",
            name: 'manager'
        }
    ];
    // Present and process prompts
    inquirer
    .prompt(addEmpQuestions)
    .then(({ firstName, lastName, role, manager }) => {
        queryStr = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;
        db.query(queryStr, [firstName, lastName, role, manager], (err, results) => {
            if (err) {console.log('\nError adding employee!')}
            else {console.log('\nAdded new employee.\n')}
            main();
        });
    })
};

const updateEmpInq = (emps, roles) => {
    // Build list of employees and potential roles
    let empList = emps.map(el => {
        return {
            name: el.name,
            value: el.id
        };
    });
    empList.push(new inquirer.Separator());
    
    let rolesList = roles.map(el => {
        return {
            name: el.title,
            value: el.id
        };
    });
    rolesList.push(new inquirer.Separator());
    
    // Build prompts
    const updateEmpQuestions = [
        {
            type: 'list',
            choices: empList,
            message: 'Select employee to update:',
            name: 'employee'
        },
        {
            type: 'list',
            choices: rolesList,
            message: 'Select new role:',
            name: 'role'
        }
    ];
    inquirer
        .prompt(updateEmpQuestions)
        .then(({ employee, role }) => {
            queryStr = `UPDATE employee SET role_id = ? WHERE id = ?`;
            db.query(queryStr, [role, employee], (err, results) => {
                if (err) {console.log("\nError updating employee's role!")}
                else {console.log("\nUpdated employee's role.\n")}
                main();
            });
        });
};

// VIEWER FUNCTIONS
// ================

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

const viewBudget = () => {
    const deptStr = 'SELECT * FROM department';
    db.query(deptStr, (err, depts) => {
        let deptOpts = depts.map(el => {return {name: el.name, value: el.id}});
        deptOpts.push(new inquirer.Separator());

        inquirer
            .prompt(
                [{
                    type: 'list',
                    choices: deptOpts,
                    message: 'Select department to view:',
                    name: 'dept'
                }]
            )
            .then(({ dept }) => {
                const data = new table({
                    head: ['Department', 'Total Utilized Budget']
                });
                const budgetStr = 
                `SELECT department.name, SUM(role.salary) AS budget 
                FROM department 
                JOIN role ON role.department_id = department.id 
                JOIN employee ON employee.role_id = role.id 
                WHERE department.id = ?`
                db.query(budgetStr, dept, (err, results) => {
                    data.push([results[0].name, results[0].budget])
                    console.log('\n');
                    console.log(data.toString());
                    console.log('\n');
                    main();
                });
        });
    });
};

// DATABASE EDITOR FUNCTIONS
// =========================

const addDept = (department) => {
    queryStr = 'INSERT INTO department (name) VALUES (?)';
    db.query(queryStr, department, (err, results) => {
        if (err) {console.log('\nError adding department!')}
        else {console.log('\nAdded new department.\n')}
        main();
    });
};

const addRole = () => {
    deptsStr = 'SELECT * FROM department';
    db.query(deptsStr, (err, results) => {
        roleInq(results);
    });
};

const addEmployee = () => {
    roleStr = 'SELECT title, id FROM role';
    db.query(roleStr, (err, roleResults) => {
        empStr = 'SELECT CONCAT_WS(" ", first_name, last_name) AS name, id FROM employee';
        db.query(empStr, (err, empResults) => {
            empInq(roleResults, empResults);
        });
    });
};

const updateEmployee = () => {
    empStr = 'SELECT CONCAT_WS(" ", first_name, last_name) AS name, id FROM employee';
    db.query(empStr, (err, empResult) => {
        roleStr = 'SELECT title, id FROM role';
        db.query(roleStr, (err, roleResult) => {
            updateEmpInq(empResult, roleResult);
        });
    });
};

// MAIN FUNCTION
// =============

const main = () => {
    inquirer
        .prompt(questions)
        .then(async ({ selection }) => {
            switch(selection) {

                // View Options
                case 'View all departments':
                    viewDepts();
                    break;
                case 'View all roles':
                    viewRoles();
                    break;
                case 'View all employees':
                    viewEmps();
                    break;
                case "View a department's budget":
                    viewBudget();
                    break;

                // Edit Options
                case 'Add a department':
                    inquirer
                        .prompt(addDeptQuestions)
                        .then(({ dbNew }) => addDept(dbNew));
                    break;
                case 'Add a role':
                    addRole();
                    break;
                case 'Add an employee':
                    addEmployee();
                    break;
                case "Update an employee's role":
                    updateEmployee();
                    break;
                
                // EXIT
                default:
                    console.log('Bye')
                    db.end();
                    break;
            };
        });
};

// RUN
// ===

// Pretty console output
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

// Begin program
main();