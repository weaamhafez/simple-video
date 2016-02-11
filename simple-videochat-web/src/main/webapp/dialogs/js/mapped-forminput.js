var mappedPropertiesModel = {
	properties: [],
	addProperty: function(a,row){
		mappedPropertiesModel.properties.push({});
		var length = mappedPropertiesModel.properties.length;
		mappedPropertiesModel.properties[length - 1].name = $($("#formProperties option")[0]).val();
		mappedPropertiesModel.properties[length - 1].target = $($("#targetFormProperties option")[0]).val();
		mappedPropertiesModel.properties[length - 1].type = $($("#formProperties option")[0]).attr("type");
	},
	removeProperty: function(a, row) {
		mappedPropertiesModel.properties.splice(row.index, 1);
	},
	setFormPropertyType:function(a,row){
		row.prop.type = $(a.delegateTarget[a.delegateTarget.options.selectedIndex]).attr("type");
	}
};
$(document).ready(function() {
	
	// fill form fields
	$("#formProperties").empty();
	$("#preview .previewItem").each(function() {
		var prop = $(this).data("prop");
		var title = prop["titleEn"];
		if(title == null || title == "")
			title = "Untitled";
		if($(this).data("type") != "navigation")
			$("#formProperties").append("<option value='" + prop.ctrlName + "' type='formField'>" + title + "</option>");
	});
	// fill with current form parameters
	if(formPropertiesModel.properties)
	{
		if(formPropertiesModel.properties.length > 0)
		{
			for(var i = 0 ; i < formPropertiesModel.properties.length ; i++)
				$("#formProperties").append("<option value='" + formPropertiesModel.properties[i].name + "' type='" + formPropertiesModel.properties[i].propType + "'>" + formPropertiesModel.properties[i].name + "</option>");
		}
	}
	if($("#formProperties option").length == 0){
		errorAlert("No properties / fields in the form to be mapped");
//		$('#modal').modal('hide');
		return;
	}
	// fill target form properties
	// load form target input param type properties
	if($("#prop #formsList").find(":selected").attr("type") === "form")
		loadTargetForm($("#prop #formsList").val());
//	else if($("#prop #formsList").find(":selected").attr("type") === "visualization")
//		loadTargetVisualization($("#prop #formsList").val());
	
	function loadTargetForm(id) {
		$.ajax({
		    url: FORM_DESIGN_FIND_URL+'/' + id,
		    type: 'GET',
		    dataType: 'json',
		    success: function(data) {
		    	loadTargetFormProps(data);
		    },
		    complete: function(){
		    	if($("#targetFormProperties option").length == 0) {
		    		errorAlert("Cannot load input paramaters from the target form");
		    	}
		    }
		});
	}
	
	function loadTargetVisualization(id)
	{
		$.ajax({
		    url: FORM_DESIGN_FINDALL_VISUALIZATION_URL+'/' + id,
		    type: 'GET',
		    dataType: 'json',
		    success: function(data) {
		    	loadTargetFormProps(data);
		    },
		    complete: function(){
		    	if($("#targetFormProperties option").length == 0) {
		    		errorAlert("Cannot load input paramaters from the target form");
		    	}
		    }
		});
	}
	
	function loadTargetFormProps(data)
	{
		if(data)
		{
			if(data.properties && data.properties.length > 0)
			{
				for(var i=0;i<data.properties.length;i++)
				{
					if(data.properties[i].propType === inputParamVal)
					$("#targetFormProperties").append("<option value='" + data.properties[i].name + "'>" + data.properties[i].name + "</option>");
				}
				$("#mappedPropertiesTable").show();
				bindMappedPropertiesToModel();
			}
		}
	}
	function bindMappedPropertiesToModel() {
		if($("#prop #formMappingInput").val() != "")
			mappedPropertiesModel.properties = JSON.parse($("#prop #formMappingInput").val());
		
		propertiesBinder = rivets.bind($('#mapped-properties'), mappedPropertiesModel);
		if($("#prop #formMappingInput").val() == "")
			$("#addProperty").triggerHandler("click");
	}

    function unbindMappedPropertiesFromModel() {
        if (propertiesBinder) {
            propertiesBinder.unbind();
            propertiesBinder = '';
        }
    }
});

function saveNavigationMapping()
{
	$("#prop #formMappingInput").val(JSON.stringify(mappedPropertiesModel.properties));
}

//# sourceURL=mapped-forminput.js