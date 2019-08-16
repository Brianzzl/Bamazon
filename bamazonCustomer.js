
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
        var query = "SELECT stock_quatity FROM products WHERE item_id = ? "
        connection.query(query, [answer.Item], function(err, res) {
            if (err) throw err;
            console.log(res);

            var stockLevel = parseInt(res) - parseInt(answer.amount);
            // var cost = parseInt(answer.amount)
            // console.log(res[0]);
            // console.log(answer.amount);
            // console.log(stockLevel);
            if (stockLevel < 0){
                console.log("not enought inventory");
            }
            else{
                updateStock(stockLevel,answer.Item);
            }
        });
    });

}

function updateStock(stock,item){
    var query = "UPDATE products set stock_quatity = stock where item_id = item;"
    connection.query(query, function(err, res) {
        if (err) throw err;
        console.log(res);

    })
}