$(document).ready(function() {
	
	loadColorCode();
});
var __currentEditableCell = null;
var __selListId = null;

function addRow(optionJson) {
	var tempFn = _genericTemplates["colorcode"];
	var result = tempFn(optionJson);
	$("#colorCodeTable tbody").append(result);
}

function addEmptyRow() {
	var tempFn = _genericTemplates["colorcode"];
	var result = tempFn({});
	$("#colorCodeTable tbody").append(result);
	$("#colorCodeTable tbody").find("tr").filter(":last").find("td").filter(":first").focus();
	$("#colorCodeTable tbody").find("tr").filter(":last").find("td").filter(":first").triggerHandler("click");
}

function loadColorCode()
{
	var list = {
			color_range:[]
	}
	var colors = $("#prop #color_range").val() != "" ? JSON.parse($("#prop #color_range").val()) : [];
//	updateUiAccordingType(data.type);
	for(var i=0;i<colors.length;i++) {
		addRow(colors[i]);
	}
}


function editCell(el) {
	if(el.find(".editableCell").length == 0) {
		var text = el.text().trim();
		if(el.parent().children("td").index(el) == 0)
			el.html("<div class='editableCell'><select><option value='red' style='background-color: #FF0000;'>" + redColor + "</option><option value='yellow' style='background-color: #FFFF00;'>" + yellowColor + "</option><option value='green' style='background-color: #007700;'>" + greenColor + "</option></select></div>");
		else
			el.html("<div class='editableCell'><input type='textbox' value='" + text + "' title='For navigating between cells, use Tab / ctrl+arrow keys' /></div>");
		el.find("input").focus();
		el.find("input").keydown(function(e) {
			// tab/right arrow
			if(e.keyCode == 9 || (e.keyCode == 39 && e.ctrlKey))
			{
				e.preventDefault();
	            e.stopPropagation();
				if(__currentEditableCell != null)
				{
					var nextCell = __currentEditableCell.next("td") ;
					if(nextCell != null)
					{
						// if last cell and last row then add new row
						if($(nextCell).children().html() != undefined && $(nextCell).parent().next().html() == undefined)
						{
							addEmptyRow();
						}
						// if last cell in row , but not last row in table, then move to next row
						else if($(nextCell).children().html() != undefined && $(nextCell).parent().next().html() != undefined)
						{
							if(__currentEditableCell != null) {
								__currentEditableCell.html(__currentEditableCell.find("input").filter(":first").val());
							}
							__currentEditableCell = el;
							nextCell = $(nextCell).parent().next().find("td").filter(":first");
							nextCell.triggerHandler("click");
							return;
						}
						else
		    			{
							if(__currentEditableCell != null) {
								__currentEditableCell.html(__currentEditableCell.find("input").filter(":first").val());
							}
							__currentEditableCell = el;
							nextCell.triggerHandler("click");
							return;
		    			}
					}
					
				}
	    		
			}
			// left arrow
			else if(e.keyCode == 37 && e.ctrlKey)
			{
				e.preventDefault();
	            e.stopPropagation();
				var nextCell = __currentEditableCell.prev("td") ;
				if(nextCell.html() != undefined)
				{
					if(__currentEditableCell != null) {
						__currentEditableCell.html(__currentEditableCell.find("input").filter(":first").val());
					}
					__currentEditableCell = el;
					nextCell.triggerHandler("click");
				}
			} 
			// up arrow, go to same cell in prev row
			else if(e.keyCode == 38 && e.ctrlKey)
			{
				e.preventDefault();
	            e.stopPropagation();
				var currentRow = __currentEditableCell.parent();
				if(currentRow.prev().html() != undefined)
				{
					var columnIndexOfCurrentCell = currentRow.children().index(__currentEditableCell);
					var nextCell = currentRow.prev().children("td")[columnIndexOfCurrentCell] ;
					if($(nextCell).html() != undefined)
					{
						if(__currentEditableCell != null) {
							__currentEditableCell.html(__currentEditableCell.find("input").filter(":first").val());
						}
						__currentEditableCell = el;
						$(nextCell).triggerHandler("click");
					}
				}
			}
			// down arrow , go to same cell in next row
			else if(e.keyCode == 40 && e.ctrlKey)
			{
				e.preventDefault();
	            e.stopPropagation();
				var currentRow = __currentEditableCell.parent();
				if(currentRow.next().html() != undefined)
				{
					var columnIndexOfCurrentCell = currentRow.children().index(__currentEditableCell);
					var nextCell = currentRow.next().children("td")[columnIndexOfCurrentCell] ;
					if($(nextCell).html() != undefined)
					{
						if(__currentEditableCell != null) {
							__currentEditableCell.html(__currentEditableCell.find("input").filter(":first").val());
						}
						__currentEditableCell = el;
						$(nextCell).triggerHandler("click");
					}
				}
			}
		});
		el.find("input").keypress(function(e) {
		    if(e.which == 13) {
		    	__currentEditableCell.html(__currentEditableCell.find("input").filter(":first").val());
		    	__currentEditableCell = null;
		    }
		});
		if(__currentEditableCell != null) {
			__currentEditableCell.html(__currentEditableCell.find("input").filter(":first").val());
		}
		__currentEditableCell = el;
	}
	
}

function blurCell()
{
	if(__currentEditableCell != null)
	{
		__currentEditableCell.html(__currentEditableCell.find("input").filter(":first").val());
		__currentEditableCell = null;
	}
}




function deleteRow(el) {
	el.closest("tr").remove();
}


function saveColorCode() {
	blurCell();
	var list = [];
	$("#colorCodeTable tbody tr").each(function() {
		var color = $(this).find("td:nth-child(1)").children().children().find("option:selected").val();
		var min = $(this).find("td:nth-child(2)").text();
		var max = $(this).find("td:nth-child(3)").text();
		var colorCode = {
	            "color" : color,
	            "min" : min,
	            "max" : max
	        };
		list.push(colorCode);
	});
	$("#prop #color_range").val(JSON.stringify(list));
}
//# sourceURL=color-code.js