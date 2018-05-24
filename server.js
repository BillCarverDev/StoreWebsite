var inquirer = require("inquirer");
var mysql = require("mysql");
require("console.table");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "amazon_DB"
})

connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected as ID " + connection.threadID + "\n");
    getArray();    
    // requestOrders();
});

function getArray() {
    // console.log("getArray init");    
    connection.query("SELECT * FROM sellthisproduct", function(err, tableData) {
        if (err) throw err;
        // console.table(tableData);       
        // requestOrders(tableData);
        displayProduct(tableData);
        })
    };    


// function requestOrders() {
//     console.log("requestOrders init");
//     inquirer.prompt({
//         name: "buyStuff",
//         type: "list",
//         message:["Would you like to buy some crap?"],
//         choices: ["YES", new inquirer.Separator(), "NO"],
//     })
//     .then(function(choice) {
//         if (choice.buyStuff === "YES") {
//             // shop(selectionArray);
//             shop();
//         }
//         else if (choice.buyStuff === "NO"){
//             end();
//         }
//     })
// };

function displayProduct(list){
    let productTable = [];
    list.forEach(table => {
        let row = "";
        row += table.id;
        row += ":  ";
        row += table.item_name;
        row += ": $"
        row += table.sale_price;
        productTable.push(row)
    })
    shop(productTable);
}

function shop(productTable) {
    console.log("Shop Init");
    // console.table(productTable);
    inquirer.prompt([
        {
            name: "userSelection",
            type: "list",
            // choices: ["AMG F1", new inquirer.Separator(), "Scuderia Ferrari", new inquirer.Separator(), "Haas F1"],
            choices: productTable,
            message: ["What item would you like to buy"]
        }])
        .then(function(res) {
            console.table(res);
                 

            let selectionID = res.userSelection[0];
            let selectionObj = res.userSelection.split(":");
            let selectionName = selectionObj[1];
               
            
            console.log("SelctionID equals: " +selectionID);
            console.log("SelctionName equals: " + selectionName);        
           

            inquirer.prompt({
                name: "userQuantity",
                type: "input",
                message: ["How many?"]
            })
            .then(function(res) {
                let quantityInt = res.userQuantity;
                checkInventory(selectionID, quantityInt, selectionName);
            })
        })
};

function checkInventory(selectionID, QTY, selectionName){
    console.log("checkInventory selectionName=" + selectionName);
    console.log("checkInventory Init");
    var stockCheck = "SELECT quantity from sellthisproduct where id = "+selectionID
    console.log("SelectionID is: " +selectionID);
    console.log("user selected quantity: " + QTY);
    connection.query(stockCheck, function(err, res) {
        // console.log("stockCheck=" +stockCheck);
        // console.log("res:" +res[0].quantity);
        if (err) throw err;
        let stockInt = res[0].quantity;
        console.log("stockInt=" + stockInt);
        if (QTY > stockInt) {
            console.log("***** Sorry we only have " + stockInt + " of this item.  Please select a different quantity******");
            getArray();
            console.log("displayProduct Init");
        }
        else goToCart(selectionID, QTY, selectionName);
        // console.log("goToCart Callback Init");
        
    })
};

function goToCart(selectionID, QTY, selectionName){
    console.log(selectionName);
    connection.query("UPDATE sellthisproduct SET quantity = quantity - ? where id = ?", [QTY, selectionID]); {
    };
    console.log("You have purchased " + QTY + "" + selectionName + "'s! Thank you! Have a good day!");
        
};





function end() {
    console.log("End init");
    inquirer.prompt({
        name: "news",
        // type: "list",
        // message: ("Before you go, would you like to save $50 on your next order?"),
        message: ["You are now being redirected to the Washington Post"],
        // choices: ["YES", new inquirer.Separator(), "NO"],
    })
    window.open("https://www.washingtonpost.com", '_blank');
    connection.end();
}


// Issues: //


// Resolved Issues: //
// Cannot see table in console/ installed console.table
// node isn't returning list of items to the buyer/ fixed displayProduct functions
// Multiple errors pulling the data correctly from mysql/ played with syntax for hours until correct values returned
// callback to displayProduct function: Cannot read property 'forEach' of undefined at 52/ Replaced with getArray function
// goToCart function error:  Error: ER_PARSE_ERROR: You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near '= quantity - '2' where id = '1'' at line 1 / missing SET from UPDATE table SET quantity
// selectionName variable is being passed thru functions but is undefined at 124/ fixed by adding the missing param in a .then