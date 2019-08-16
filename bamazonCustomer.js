
var inquirer = require("inquirer");
var mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",    
    port: 3306,  
    // Your username
    user: "root",

    // Your password
    password: "",
    database: "bamazon",

});


connection.connect(function(err){
    if(err) throw err;
    displayItem();

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
            "stock:" + res[i].stock_quatity
            );
        }
        console.log("-----------------------------------");
        customerSearch();
      });

}

function customerSearch(){
    inquirer.prompt([
        {
            name:"Item",
            type: "input",
            message: "Enter the ID of the product you want to buy:",
        },
        {
            name:"amount",
            type: "input",
            message: "Enter how many product you want to buy:",
        }
    ]).then(function(answer){
        var query = "SELECT * FROM products WHERE item_id = ? "
        connection.query(query, [answer.Item], function(err, res) {
            if (err) throw err;
            // console.log(res);

            var stockLevel = parseInt(res[0].stock_quatity) - parseInt(answer.amount);
            var cost = parseInt(answer.amount)*parseInt(res[0].price);
            // console.log(res[0].stock_quatity);
            // console.log(stockLevel);
            // console.log(cost);

            if (stockLevel < 0){
                console.log("not enought inventory");

            }
            else{
                updateStock(stockLevel,answer.Item,cost);

            }
        });
    });

}

function updateStock(stock,item,cost){
    var query = "UPDATE products set stock_quatity = ? where item_id = ?;"
    connection.query(query, [stock,item],function(err, res) {
        if (err) throw err;
        // console.log(res);
        console.log("Thanks for shopping with us, total cost:"+ cost+"$");


    })
}