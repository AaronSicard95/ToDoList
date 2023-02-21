const textBox = document.getElementById("newText");
const myList = document.getElementById("tdList");
//Makes sure the local storage counter never returns NULL, may cause errors if it does
if(localStorage.getItem("numOfItems") == null){
    localStorage.setItem("numOfItems", "0");
}
//Crosses off List Item
function clickedComplete(dex){
    myList.children[dex].classList = "done";
    localStorage.setItem(`isDone${dex}`, "done");
}
//Uncroses list item
function clickedUndo(dex){
    myList.children[dex].classList = "notDone";
    localStorage.setItem(`isDone${dex}`, "notDone");
}
//Removes List Item At Index
function clickedRemove(dex){
    let lastIndex = parseInt(localStorage.getItem("numOfItems"));
    for(let i = dex; i<lastIndex;i++){
        localStorage.setItem(`info${i}`, localStorage.getItem(`info${i+1}`));
        localStorage.setItem(`isDone${i}`, localStorage.getItem(`isDone${i+1}`));
        console.log(localStorage.getItem(`info${i}`));
    }
    localStorage.setItem("numOfItems", parseInt(localStorage.getItem("numOfItems"))-1);
    myList.children[dex].remove();
}
//Puts list Items onto the page
function addToList(index){
    let newItem = document.createElement("li");
    newItem.innerHTML = `${localStorage.getItem(`info${index}`)}    <input id="buttonFor${index}" type="Button" value="complete">  <input id="undoButtonFor${index}" type="Button" value="Not Done">    <input id="removeButtonFor${index}" type="Button" value="Remove">`;
    newItem.id = `${index}`;
    let checkDone = `isDone${index}`;
    newItem.classList = localStorage.getItem(checkDone);
    document.getElementById("tdList").append(newItem);
}
//add new list item to sttorage and the page once form is Submitted
function submitFunc(evt){
    evt.preventDefault();
    localStorage.setItem(`info${parseInt(localStorage.getItem("numOfItems"))}`, document.querySelector("form#addTDForm input#newText").value);
    addToList(localStorage.getItem("numOfItems"));
    localStorage.setItem("numOfItems", parseInt(localStorage.getItem("numOfItems"))+1);
    console.log(localStorage.getItem("numOfItems"));
    textBox.value = "";
}
//Adds list Items from local Storage to the page
if(localStorage.getItem("numOfItems")!=0){
    let num = parseInt(localStorage.getItem("numOfItems"));
    for(let i = 0; i<num;i++){
        addToList(i);
    }
}
//Listens for clicks to the complete and notDone Buttons
myList.addEventListener("click", function(evt){
    if(evt.target.tagName === 'INPUT'){
        if(evt.target.value == "complete"){
            let myIndex = Array.prototype.indexOf.call(myList.children, evt.target.parentElement);
            clickedComplete(myIndex);
        }else if(evt.target.value == "Not Done"){
            let myIndex = Array.prototype.indexOf.call(myList.children, evt.target.parentElement);
            clickedUndo(myIndex);
        }else{
            let myIndex = Array.prototype.indexOf.call(myList.children, evt.target.parentElement);
            clickedRemove(myIndex);
        }
    }
})
document.getElementById("addTDForm").addEventListener('submit', submitFunc);