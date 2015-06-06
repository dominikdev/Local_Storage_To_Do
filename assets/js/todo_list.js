function ToDoList(){
     var currentList = "";
     var allListItems;
     var allListNames;
     
     this.setupToDo = function(){
          allListItems = new ListItems();
          allListNames = new ListNames();
          //CHECK FOR EXISTING DATA
          if(localStorage.getItem('listNames')){ 
               var listNamesFromStorage = JSON.parse(localStorage.getItem('listNames'));
               for(var x=0; x<listNamesFromStorage.length;x+=1){
                    allListNames.addListWithName(listNamesFromStorage[x]);
               }
               
               //CHECK FOR LIST ITEM DATA
               if(localStorage.getItem('listItems')){
                    var listItemsFromStorage = JSON.parse(localStorage.getItem('listItems'));
                    for(var y=0; y<listItemsFromStorage.length; y+=1){
                         allListItems.addListItemFromStorage(listItemsFromStorage[y]);
                    }
               } 
               
               //CHECK FOR ASSIGNED CURRENT LIST
               if(localStorage.getItem('currentlist')){
                    currentList = JSON.parse(localStorage.getItem('currentlist'));
               } //ELSE ASSIGN CURRENT LIST AS FIRST LIST
               else{
                    currentList = allListNames.getListNames()[0];
                    this.saveToDoList()
               }
          }// ELSE ADD DEFAULT DATA
          else{
               allListNames.addListWithName("To Do");
               this.setCurrentList(0);
               this.saveToDoList();
          }
     }
     this.saveToDoList = function(){
          //SAVE LIST DATA TO LOCAL STORAGE
          localStorage.setItem("listNames", JSON.stringify(allListNames.getListNames()));
          localStorage.setItem("listItems", JSON.stringify(allListItems.getListItems()));
          localStorage.setItem("currentlist", JSON.stringify(currentList));
     }
     this.setCurrentList = function(listIndex){
          var listNames = allListNames.getListNames();
          if(listNames.length>0){
               currentList = listNames[listIndex];
               this.saveToDoList();
          } else{
               localStorage.clear();
               this.setupToDo();
          }
          
     }
     this.returnCurrentList = function(){
          return currentList;
     }
     this.addList = function(lName){
          allListNames.addListWithName(lName);
          var theListNames = allListNames.getListNames();
          this.setCurrentList(theListNames.length-1);
     }
     this.addItemToCurrentList = function(itemName,priority){
          allListItems.addListItemWithInfo(currentList,itemName,priority);
          this.saveToDoList();
     }
     this.getCurrentListItems = function(){
          return allListItems.returnItemsByListName(currentList);
     }
     this.returnAllListTitles = function(){
          return allListNames.getListNames();
     }
     this.markComplete = function(index){
          allListItems.markCompleteById(index);
          this.saveToDoList();
     };
     this.sortItemsInList = function(sortType){
          switch(sortType){
               case 1:
                    allListItems.sortByTitle(true);
                    break;
               case 2:
                    allListItems.sortByTitle(false);
                    break;
               case 3:
                    allListItems.sortByPriority(false);
                    break;
               case 4:
                    allListItems.sortByPriority(true);
                    break;
               case 5:
                    allListItems.sortByDate(true);
                    break;
               case 6:
                    allListItems.sortByDate(false);
                    break;
          }
     }
     this.updateCurrentListTitle = function(newTitle){
          allListNames.updateListName(currentList,newTitle);
          allListItems.updateListTitles(currentList,newTitle);
          currentList = newTitle;
          this.saveToDoList();
     }
     this.deleteCurrentList = function(){
          allListNames.deleteListName(currentList);
          allListItems.deleteItemsFromList(currentList);
          this.setCurrentList(0);
     }
     this.deleteItemByIndex = function(index){
          allListItems.deleteItemByIndex(index);
          this.saveToDoList();
     }
     this.clearCurrentList = function(){
          allListItems.deleteItemsFromList(currentList);
          this.saveToDoList();
     }

}
