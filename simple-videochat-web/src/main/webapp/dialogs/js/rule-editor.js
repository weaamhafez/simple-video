var _filters = [];
$(document).ready(function() {
	setLabelsAndDefaults();
	$("#action").select2();
	$('.color').colorpicker();
	$('.color').colorpicker('show');
	function setLabelsAndDefaults()
	{
		$("#ruleLabel").html(ruleEditorBuilder);
		$("#actionLabel").html(ruleEditorAction);
		$("#actionTitle").html(ruleEditorAction);
		$("#colorChooserLabel").html(ruleEditorColor);
		$("#valueLabel").html(ruleEditorValue);
		$("#colorChooser-error").html(fieldRequired);
		$("#valueLabel-error").html(fieldRequired);
		$("#actionLabel-error").html(fieldRequired);
		$("#isHiddenFieldLabel").html(isHiddenControlLabel);
		// set action values
		$("#action option[value='']").text(ruleEditorSelectAction);
		$("#action option[value='readonly']").text(ruleEditorReadonlyAction);
		$("#action option[value='mandatory']").text(ruleEditorMandatoryAction);
		$("#action option[value='change_color']").text(ruleEditorChangeColorAction);
		$("#action option[value='set_value']").text(ruleEditorSetValueAction);

	}

	$("#action").change(function(){
		$("#colorChooser").val("");
		$("#valueCtrl").val("");
		$("#colorChooser-error").hide();
		$("#valueLabel-error").hide();
		if($(this).val() === "change_color")
		{
			$("#colorChooserDiv").show();
			$("#colorChooserLabel").show();
			$("#setValueDiv").hide();
		}
		else if($(this).val() === "set_value")
		{
			$("#colorChooserDiv").hide();
			$("#colorChooserLabel").hide();
			$("#setValueDiv").show();
		}
		else
		{
			$("#colorChooserDiv").hide();
			$("#setValueDiv").hide();
			$("#colorChooserLabel").hide();
		}
			
	});

	
	saveCurrentSelItemProp();
	$("#preview .previewItem").each(function() {
		var prop = $(this).data("prop");
		var title = prop["titleEn"];
		if(title == null || title == "")
			title = "Untitled"
			
		_filters.push({
		    id: prop["ctrlName"],
		    label: prop["ctrlName"] + "/" + title,
		    type: 'string'
		  });
	});


	$('#builder').queryBuilder({
		  sortable: true,
		  filters: _filters
		});
});
function loadConditionalAction()
{
	if($("#prop #conditionExp").val() != "") 
	{
		var condExp = JSON.parse($("#prop #conditionExp").val());
		if(condExp["action"] != null && condExp["action"] != undefined)
		{
			$("#action option[value='" + condExp["action"] + "']").attr("selected","selected");
			$("#action").triggerHandler("change");
			if(condExp["action"] === "change_color")
			{
				$("#colorChooser").val(condExp["color"]);
				$(".color").colorpicker('setValue', condExp["color"]);
			}
			else if(condExp["action"] === "set_value")
				$("#valueCtrl").val(condExp["setValue"]);
		}
		$("#isHiddenField").prop("checked",condExp["hide_as_default"]);
		
	}
}
//# sourceURL=rule-editor.js