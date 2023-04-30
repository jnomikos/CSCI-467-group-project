const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();

// Open database
let db = new sqlite3.Database('database/mydatabase.db');

function getEmployees() {
    return new Promise((resolve, reject) => {
        db.all(`SELECT * FROM employee WHERE isAdmin = 0`, (err, rows) => {
            if (err) {
                reject(err);
            } else {
                console.log(rows);
                resolve(rows);
            }
        });
    });
}

router.get("/", async (req, res) => {
    console.log("Admin");
    let session = req.session;
    if(!session.username || session.level != 'admin') {
        res.redirect('/');
    } else {
        try {
            let employees = await getEmployees();
            res.render("adminInterface", {loggedOn: true, username: session.username, employees: employees});
        } catch(error) {
            console.log(error);
            res.status(500).send("Internal Server Error");
        }
        
    }
});


router.post("/add_employee", async (req, res) => {
    let session = req.session;
    let employees;
    try {
        employees = await getEmployees();
    } catch(error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }

    // First we check if username and password were given
    if(!req.body.name_input || !req.body.password_input) {
        res.render("adminInterface", {loggedOn: true, username: session.username, employees: employees, addEmployeeText: "Username or password field is blank!"});
        return;
    }

    // Then we check if the username already exists
    for(let employee of employees) {
        if(employee.name == req.body.name_input) {
            res.render("adminInterface", {loggedOn: true, username: session.username, employees: employees, addEmployeeText: "Cannot add employee! Username already exists."});
            return;
        }
    }  

    // Adds a new employee
    db.run(`INSERT INTO employee (name, password) VALUES ("${req.body.name_input}", "${req.body.password_input}")`, (err) => {
        if (err) {
            console.log(err);
        }
    });
    
    // Now we do getEmployees again so that new employee can show in our table
    try {
        employees = await getEmployees();
    } catch(error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
    res.render("adminInterface", {loggedOn: true, username: session.username, employees: employees, addEmployeeText: "Successfully added a new employee"});
});

router.post("/remove_employee", async (req, res) => {

    console.log("Request to delete employee " + req.body.employeeID);

    db.run(`DELETE FROM employee WHERE employeeID = "${req.body.employeeID}"`, (err) => {
        if (err) {
            console.log(err);
        }
    });

    // We do getEmployees to refresh table
    let employees;
    try {
        employees = await getEmployees();
    } catch(error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }

    res.render("adminInterface", {loggedOn: true, username: req.session.username, employees: employees});
});


//allow admin to add, edit, and delete employees
router.get("/employee/:id", (req, res) => {
    const id = req.params.id;
    db.get(`SELECT * FROM employee WHERE id = "${id}"`, (err, row) => {
        if (err) {
            console.log(err);
        }
        res.render("employeeEdit", {row: row});
    });
});

router.post("/employee/:id", (req, res) => {
    const id = req.params.id;
    const name = req.body.name;
    const password = req.body.password;
    const address = req.body.address;
    const city = req.body.city;
    const state = req.body.state;
    const contact = req.body.contact;
    const commission = req.body.commission;

    db.run(`UPDATE employee SET name = "${name}", password = "${password}", address = "${address}", city = "${city}", state = "${state}", contact = "${contact}", commission = "${commission}" WHERE id = "${id}"`, (err) => {
        if (err) {
            console.log(err);
        }
        res.redirect("/adminInterface/employee");
    });
});



//allow admin to search and view quotes based on status, date range, employee, and customer
router.get("/quote", (req, res) => {
    console.log("Quote");
    db.all(`SELECT * FROM quote`, (err, rows) => {
        if (err) {
            console.log(err);
        }
        res.render("quote", {rows: rows});
    });
});

//allow admin to find specific quotes
router.post("/quote", (req, res) => {
    const status = req.body.status;
    const date1 = req.body.date1;
    const date2 = req.body.date2;
    const employee = req.body.employee;
    const customer = req.body.customer;

    let query = `SELECT * FROM quote WHERE status = "${status}" AND date BETWEEN "${date1}" AND "${date2}" AND employee = "${employee}" AND customer = "${customer}"`;

    if (status == "All") {
        query = `SELECT * FROM quote WHERE date BETWEEN "${date1}" AND "${date2}" AND employee = "${employee}" AND customer = "${customer}"`;
    }

    if (employee == "All") {
        query = `SELECT * FROM quote WHERE status = "${status}" AND date BETWEEN "${date1}" AND "${date2}" AND customer = "${customer}"`;
    }

    if (customer == "All") {
        query = `SELECT * FROM quote WHERE status = "${status}" AND date BETWEEN "${date1}" AND "${date2}" AND employee = "${employee}"`;
    }

    if (status == "All" && employee == "All") {
        query = `SELECT * FROM quote WHERE date BETWEEN "${date1}" AND "${date2}" AND customer = "${customer}"`;
    }

    if (status == "All" && customer == "All") {
        query = `SELECT * FROM quote WHERE date BETWEEN "${date1}" AND "${date2}" AND employee = "${employee}"`;
    }

    if (employee == "All" && customer == "All") {
        query = `SELECT * FROM quote WHERE status = "${status}" AND date BETWEEN "${date1}" AND "${date2}"`;
    }

    if (status == "All" && employee == "All" && customer == "All") {
        query = `SELECT * FROM quote WHERE date BETWEEN "${date1}" AND "${date2}"`;
    }

    if (status == "All" && employee == "All" && customer == "All" && date1 == "" && date2 == "") {
        query = `SELECT * FROM quote`;
    }

    db.all(query, (err, rows) => {
        if (err) {
            console.log(err);
        }
        res.render("quote", {rows: rows});
    });
});

router.get('/logout',(req,res) => {
    req.session.destroy();
    res.redirect('/');
});

module.exports = router;