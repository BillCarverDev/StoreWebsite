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
    // console.table(tableData);
    inquirer.prompt([
        {
            name: "userSelection",
            type: "list",
            // choices: ["AMG F1", new inquirer.Separator(), "Scuderia Ferrari", new inquirer.Separator(), "Haas F1"],
            choices: productTable,
            message: ["What item would you like to buy"]
        }])
        .then(function(res) {
            let selection = res.userSelection.split("-");
            let selectionID = selection[0];

            // console.log(selection);

            inquirer.prompt({
                name: "userQuantity",
                type: "input",
                message: ["How many?"]
            })
            .then(function(res) {
                let quantityInt = res.userQuantity;
                checkInventory(selectionID, quantityInt);
            })
        })
};

function checkInventory(ID, QTY){
    // console.log(QTY);
    var stockCheck = "SELECT quantity from sellthisproduct where id = "+ID
    console.log(ID);
    connection.query(stockCheck, function(err, res) {
        if (err) throw err;
        let stockInt = res.quantity;
        if (QTY > stockInt) {
            console.log("/nSold Out!");
            displayProduct();
        }
        else goToCart(ID, QTY);
    })

};

function goToCart(ID, QTY){

}


// var selectionArray = [];
// for (var i = 0; i < res.length; i++) {
//     selectionArray.push(results[i].item_name);

//     // Making selection array into an object:
//         var selection = {
//             id: res[i].id,
//             item_name: res[i].item_name,
//             sale_price: res[i].sale_price
//         }
//         selectionArray.push(selection);
//     console.log(res[i]);
         


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

// The first should ask them the ID of the product they would like to buy.
// The second message should ask how many units of the product they would like to buy.

// Issues: //
// node isn't returning list of items to the buyer

// Resolved Issues: //
// Cannot see table in console/ installed console.table