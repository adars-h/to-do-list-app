const _ = require("lodash");
const { Item } = require("../models/item.js");
const mongoose = require('mongoose');
const item1 = new Item({ name : 'Welcome to My Todolist App'});
const item2 = new Item({ name: 'Press + button to add a new list item'});
const item3 = new Item({ name: "<-- Hit this to delete an item."});
// creating the default items to display when the user first loads the root.
const defaultItems = [item1,item2,item3];
const options={
	weekday: "long",
	day: "numeric",
	month: "long"
};

function HandleGetTask (req,res) {
    var today = new Date();
    var day = today.toLocaleDateString("en-US",options);
    Item.find({id:req.user.emailId},function(err,foundItems){
            if(err)
            res.send(err);
            else {
                if( foundItems.length === 0 ) {
                    for (let i = 0;i<3;i++) {
                       defaultItems[i].id = req.user.emailId;
                    }
                    Item.insertMany(defaultItems,function(err) {
                        if(err)
                        res.send(err);
                    });
                    res.redirect("/");
                }
                else
                    res.render("list",{Day: day,listTitle: "To-Do-List App", newItems:foundItems});
            }
     });
     
}

function HandleAddTask (req,res) {
	const itemName = req.body.newItem;
	const item = new Item(
		{
          id : req.user.emailId,
		  name : itemName
	    }
	);
		item.save();
		res.redirect("/");
}

function HandleDeleteTask (req,res) { 
	const checkedItemId = req.body.checkbox;
    const listName = req.body.listName;

		Item.findByIdAndRemove(checkedItemId, function(err){
			if (!err) {
			  res.redirect("/");
			}
		  });
}

function HandleUpdateTask (req,res) {
    return;
}


module.exports = {
    HandleAddTask,
    HandleDeleteTask,
    HandleUpdateTask,
    HandleGetTask
};