$(document).ready(function(){
	// Activate tooltip
    $('[data-toggle="tooltip"]').tooltip();
    $('#add-new-instrument').click(function(){
        addInstrument();
    });
    $('#search-field').keyup(function(){
        searchList();
    });
    $('#delete-button').click(function(){
        deleteInstrument();
    });
    
    $.get( config.domain + config.endpoints.instruments, function( response ) {
        fillnDisplayList(response.data)
    });
});
const config = {
    idPrefix:"_list_item_",
    domain:"http://localhost:8080",
    endpoints:{
        instruments:"/api/instruments",
        delete:"/api/instruments/"
    },
    status: {
        success:"success",
        failed:"failed"
    }
}

var instrumentList;
var searchedList;
var idToDelete = "";
function fillnDisplayList(data)
{
    var instrumentHolder = document.getElementById("instrument-list");
    instrumentList = data;
    instrumentList.forEach(element => {
        var listItem = createNewInstrumentElement(element);
        instrumentHolder.appendChild(listItem);
    });
}
function createFilteredList() {
    var searchKey = $('#search-field').val();
    if(searchKey.trim() == "") {
        searchedList = instrumentList;
    } else {
        //As you can notice, I'm filtering results by name property of the object.
        //More complex filters can be added here (ex: search by multiple properties)
        searchedList = instrumentList.filter(obj => searchByNameFilter(obj,searchKey));
    }    
}
function searchByNameFilter(obj, searchKey) {
    return obj.name.toLowerCase().includes(searchKey.toLowerCase());
}
function searchList() {
    createFilteredList();
    displaySearchedList();
}
function displaySearchedList()
{
    var instrumentHolder = document.getElementById("instrument-list");

    instrumentHolder.innerHTML = "";
    searchedList.forEach(element => {
        var listItem = createNewInstrumentElement(element);
        instrumentHolder.appendChild(listItem);
    });
}
function createActionBar(id)
{
    var a = document.createElement("a");
    a.className = "delete";
    var i = document.createElement("i");
    i.className = "material-icons";
    i.innerHTML = "&#xE872;";
    a.appendChild(i);
    a.addEventListener('click', function(){
        deleteInstrumentDialog(id);
    });
    return a;
}

function deleteInstrumentDialog(id) {
    idToDelete = id;
    $("#deleteInstrumentModal").modal();
}

function deleteInstrument()
{
    //send delete
    //onsuccess {}
    $.ajax({
        url: config.domain + config.endpoints.delete + idToDelete,
        type: 'DELETE',
        success: function(result) {
            if(result.status == config.status.success) {
                document.getElementById(config.idPrefix + idToDelete).remove();
                instrumentList = instrumentList.filter(obj => obj.instrumentId != idToDelete);
            } else {
                //handle error
            }
        }
    });
    
}

function clearForm() {
    $('#_newItemID').val("");
    $('#_newName').val("");
    $('#_newSymbol').val("");
    $('#_newType').val("");
}

function addInstrument()
{
    var newItemId = $('#_newItemID').val().trim();
    var newName = $('#_newName').val().trim()
    var newSymbol = $('#_newSymbol').val().trim();
    var newType = $('#_newType').val().trim();
    if(
    newItemId == "" 
    || newName == "" 
    || newSymbol == "" 
    ||newType == ""
    ) {
        return;
    }
    //In real world, database engine will assign unique id, and after inserting a new object we can return its Id to the client and insert it into the list 
    //Here you can choose it on your own, but be aware of duplicates.
    var instrumentHolder = document.getElementById("instrument-list");
    var item = {
        instrumentId: newItemId,
        name: newName,
        symbol: newSymbol,
        instrumentType: newType
    }

    $.post( config.domain + config.endpoints.instruments, item)
    .done(function(data) {
        if(data.status == config.status.success) {
            var newListItem = createNewInstrumentElement(item);
            instrumentHolder.appendChild(newListItem);
            clearForm();
            $('#addInstrumentModal').modal('hide')
        } else {
            //handle error
        }
        
    });
    
}

function createNewInstrumentElement(item)
{
	var listItem = document.createElement("tr");
    listItem.id = config.idPrefix + item.instrumentId;

    var id = document.createElement("td");
    var name = document.createElement("td");
    var symbol = document.createElement("td");
    var type = document.createElement("td");
    var action = document.createElement("td");

    
    action.appendChild(createActionBar(item.instrumentId));
	id.innerText = item.instrumentId;
    name.innerText = item.name;
    symbol.innerText = item.symbol;
    type.innerText = item.instrumentType;

	//and appending.
	listItem.appendChild(id);
	listItem.appendChild(name);
	listItem.appendChild(symbol);
	listItem.appendChild(type);
	listItem.appendChild(action);
	return listItem;
}



