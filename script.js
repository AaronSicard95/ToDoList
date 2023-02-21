if(localStorage.getItem("numOfItems") == null){
    localStorage.setItem("numOfItems", "0");
}
function clickedComplete(passedItem){
    passedItem.classList = "done";
    localStorage.setItem(`isDone${passedItem.id}`, "done");
}
function clickedUndo(passedItem){
    passedItem.classList = "notDone";
    localStorage.setItem(`isDone${passedItem.id}`, "notDone");
}
function addToList(index){
    let newItem = document.createElement("li");
    newItem.innerHTML = `${localStorage.getItem(`info${index}`)} <input id="buttonFor${index}" type="Button" value="complete"> <input id="undoButtonFor${index}" type="Button" value="Not Done">`;
    newItem.id = `${index}`;
    let checkDone = `isDone${index}`;
    newItem.classList = localStorage.getItem(checkDone);
    document.getElementById("tdList").append(newItem);
    let buttonID = `buttonFor${index}`;
    let undoButtonID = `undoButtonFor${index}`;
    document.getElementById(buttonID).onclick = function(){clickedComplete(newItem)};
    document.getElementById(undoButtonID).onclick = function(){clickedUndo(newItem)};
}
if(localStorage.getItem("numOfItems")!=null){
    let num = parseInt(localStorage.getItem("numOfItems"));
    for(let i = 0; i<num;i++){
        let newItem = document.createElement("li");
        newItem.innerHTML = `${localStorage.getItem(`info${i}`)} <input id="buttonFor${i}" type="Button" value="complete"> <input id="undoButtonFor${i}" type="Button" value="Not Done">`;
        newItem.id = `${i}`;
        let checkDone = `isDone${i}`;
        newItem.classList = localStorage.getItem(checkDone);
        document.getElementById("tdList").append(newItem);
        let buttonID = `buttonFor${i}`;
        let undoButtonID = `undoButtonFor${i}`;
        document.getElementById(buttonID).onclick = function(){clickedComplete(newItem)};
        document.getElementById(undoButtonID).onclick = function(){clickedUndo(newItem)};
    }
}
function submitFunc(evt){
    evt.preventDefault();
    localStorage.setItem("numOfItems", parseInt(localStorage.getItem("numOfItems"))+1);
    localStorage.setItem(`info${parseInt(localStorage.getItem("numOfItems"))-1}`, document.querySelector("form#addTDForm input#newText").value);
    addToList(localStorage.getItem("numOfItems")-1);
}
document.getElementById("addTDForm").addEventListener('submit', submitFunc);