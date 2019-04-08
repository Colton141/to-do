// Business Logic
function ToDoList() {
  this.toDoListArray = [],
  this.currentId = 0
}

ToDoList.prototype.addToDo = function(toDo) {
  toDo.id = this.assignId();
  this.toDoListArray.push(toDo);
}

ToDoList.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
}

ToDoList.prototype.findItem = function(id) {
  for (var i = 0; i<=this.toDoListArray.length; i++) {
    if (this.toDoListArray[i]) {
      if (this.toDoListArray[i].id === id) {
        return this.toDoListArray[i];
      }
    }
  };
  return false;
}

ToDoList.prototype.deleteItem = function(id) {
  for (var i = 0; i<=this.toDoListArray.length; i++) {
    if (this.toDoListArray[i]) {
      if (this.toDoListArray[i].id === id) {
        delete this.toDoListArray[i];
        return true;
      }
    }
  };
  return false;
}

function ListItem(toDoItem) {
  this.toDoItem = toDoItem
}


// User Interface
var toDoList = new ToDoList();

function displayList(displayList) {
  var toDoList = $("ul#List");
  var htmlForToDoList = "";
  displayList.toDoListArray.forEach(function(item) {
    htmlForToDoList += "<li id=" + item.id + ">" + item.toDoItem + "</li>"
    toDoList.html(htmlForToDoList);
    console.log(item.id);
  });
};

function showListItem(toDoItemId) {
  var item = toDoList.findItem(toDoItemId);
  $("#showToDoList").show();
  $(".toDoItem").html(item.toDoItem);
  var buttons = $("#buttons");
  buttons.empty();
  buttons.append("<button class='deleteButton' id=" + item.id + ">Delete</button>");
}

function attachListeners() {
  $("ul#List").on("click", "li", function() {
    showListItem(this.id);
  });
  $("#buttons").on("click", ".deleteButton", function() {
    toDoList.deleteItem(this.id);
    $("#showToDoList").hide();
    displayList(toDoList);
  });
};


$("document").ready(function() {
  attachListeners();
  $("form#toDoList").submit(function(event) {
    event.preventDefault();
    var input = $("#userInput").val();
    $("input#userInput").val("");
    var newItem = new ListItem(input);
    toDoList.addToDo(newItem);
    displayList(toDoList);

  });

});
