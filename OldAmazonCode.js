var inquirer = require("inquirer");
var mysql = require("mysql");

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
    // getArray();
    requestOrders();
});

// function getArray() {
//     console.log("getArray init");
//     connection.query("SELECT * FROM sellThisProduct", function(err, res){
//         if (err) throw err;
//         var selectionArray = [];
//         for (var i = 0; i < res.length; i++) {
//             // selectionArray.push(results[i].item_name);

//             // Making selection array into an object:
//             var selection = {
//                 id: res[i].id,
//                 item_name: res[i].item_name,
//                 sale_price: res[i].sale_price
//             }
//             selectionArray.push(selection);
//             // console.log(res[i]);
//         }
//         requestOrders(selectionArray);
//     })
    
// };

function requestOrders() {
    console.log("requestOrders init");
    inquirer.prompt({
        name: "buyStuff",
        type: "list",
        message:["Would you like to buy some crap?"],
        choices: ["YES", new inquirer.Separator(), "NO"],
    })
    .then(function(choice) {
        if (choice.buyStuff === "YES") {
            // shop(selectionArray);
            shop();
        }
        else if (choice.buyStuff === "NO"){
            end();
        }
    })
};


function shop() {
    // console.log(selectionArray)
    console.log("Shop init");
    inquirer.prompt([
        {
            name: "userSelection",
            type: "list",
            choices: ["AMG F1", new inquirer.Separator(), "Scuderia Ferrari", new inquirer.Separator(), "Haas F1"],
        })
            // choices: function(){
            //     // let itemNames = []

            //     // Commented out the above, now trying to push items into an object so it displays the item and price
            //     var itemOutput = []
            //     for(let i = 0; i < selectionArray.length; i++) {
            //         // Keeping the above for loop, commenting out the working code immediately below
            //         // itemNames.push(selectionArray[i].item_name)

            //         // items and price to object:
            //         var itemList = {
            //             item: selectionArray[i].item_name,
            //             sale: selectionArray[i].sale_price,
            //         }
            //         itemOutput.push(itemList);
            //         // console.log(res[i]);
            //     }
                
            //     return itemOutput                
            // },
            // choices: function () { 
            
            //Getting error asking for a choices parameter, commenting out below code and adding a standard array.

            
            
    //             choices: function() {
    //             console.log("getArray init");
    //             connection.query("SELECT * FROM sellThisProduct", function(err, res){
    //                 if (err) throw err;
    //                 var selectionArray = [];
    //                 for (var i = 0; i < res.length; i++) {
    //                     // selectionArray.push(results[i].item_name);
            
    //                     // Making selection array into an object:
    //                     var selection = {
    //                         id: res[i].id,
    //                         item_name: res[i].item_name,
    //                         sale_price: res[i].sale_price
    //                     }
    //                     selectionArray.push(selection);
    //                     // console.log(res[i]);
    //                 }
    //                 // requestOrders(selectionArray);
    //                 return selectionArray
    //             })
                
    //         },
    //         message: "What item would you like to buy?",
    //     },
    //     {
    //         name: "userQuantity",
    //         type: "input",
    //         message: "How many items?"

    //     },
    // ]).catch(err => console.log(err));


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