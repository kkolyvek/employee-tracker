<h1 align="center"><strong>Employee Tracker</strong></h1>

<p align="center">
  <img src="https://img.shields.io/github/languages/top/kkolyvek/employee-tracker">
  <img src="https://img.shields.io/badge/License-Unlicensed-blue.svg">
</p>

## Description

A command-line content management system to interact with employee information.

## Table of Contents

1. [Installation](#installation)
2. [Usage](#usage)
3. [License](#license)
4. [Questions](#questions)

## Installation

This application requires [Node.js](https://nodejs.org/en/) and [NPM](https://www.npmjs.com/) to functions. Once the repository is cloned, run `npm install` to acquire the required dependencies.

Additionally, create a `.env` file at the root of the file structure and enter the following data:

> ```
> DB_HOST=<your database host>
> DB_USER=<your sql username>
> DB_PASSWORD=<your sql password>
> ```

## Usage

This applicaiton allows users to perform the following edits on an SQL database of employees:

- View all departments
- View all roles
- View all employees
- View a department's budget
- Add a department
- Add a role
- Add am employee
- Update an employee's role

To begin, edit the `seeds.sql` file with data on a workplace you'd like to store. Then navigate to the cloned repository and run `node index.js` to start the program. See the video below to preview the program's functionality.

> ![Site Demo](./assets/readme-demo.gif)

## License

This is free and unencumbered software released into the public domain.

Anyone is free to copy, modify, publish, use, compile, sell, or
distribute this software, either in source code form or as a compiled
binary, for any purpose, commercial or non-commercial, and by any
means.

In jurisdictions that recognize copyright laws, the author or authors
of this software dedicate any and all copyright interest in the
software to the public domain. We make this dedication for the benefit
of the public at large and to the detriment of our heirs and
successors. We intend this dedication to be an overt act of
relinquishment in perpetuity of all present and future rights to this
software under copyright law.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR
OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

For more information, please refer to <http://unlicense.org/>

---

## Questions

For further questions and comments, please reach out through [GitHub](https://github.com/kkolyvek) or via email at kk674@uw.edu.
