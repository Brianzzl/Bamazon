
var inquirer = require("inquirer");
var mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",    
    port: 3306,  
    // Your username
    user: "root",

    // Your password
    password: "Myr00t",
    database: "bamazon",

});


connection.connect(function(err){
    if(err) throw err;
    displayItem();
    // customerSearch();
})

function displayItem(){
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
          console.log(
            res[i].item_id + " | " + 
            res[i].product_name + " | " + 
            res[i].department_name + " | " + 
            "$: "+  res[i].price + " | " + 
            "stock:" + res[i].stock_quantity
            );
        }
        console.log("-----------------------------------");
      });

}

// function customerSearch(){
//     inquirer.prompt({
//         name:"action",

//     })
// }