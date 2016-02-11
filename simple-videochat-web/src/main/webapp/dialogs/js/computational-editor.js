var source = [];
$(document).ready(function() {
	$("#computationalEditorLabel").html(computationalLabel);
	$("#hint").html(computationalLoadControlsHint);
	$("#computationalEditor").text($("#prop #computationalExp").val());
	$("#computationalEditor-error").html(computationalExpNotValid);
	$('#computationalEditor').suggest('@', {
		  data: newSource(),
		  map: function(control) {
		    return {
		      value: control.id,
		      text: '<strong>'+control.name+'</strong>'
		    }
		  }
		});
	
	function newSource()
	{
		var copy = [];
		$("#preview .previewItem").each(function() {
			var prop = $(this).data("prop");
			var title = prop["titleEn"];
			if(title == null || title == "")
				title = "Untitled"
			if(($(this).data("type") === "number" || $(this).data("type") === "money") && prop["ctrlName"] != $($(".propEl")[0]).children().filter(":input").val())
			{
				source.push({
				    id: '{{' + prop["ctrlName"] + '}}',
				    name: title
				  });
			}
		});
		copy = source;
	    
	    return copy;
	}
});
function computationExpression()
{
	var expression = $('#computationalEditor').val();
	var pattern = /({{\w+}})/gi;
	var matcher = expression.match(pattern);
	var expValidate = expression;
	if(matcher != null)
	{
		for(var i = 0 ; i<matcher.length ; i++)
		{
			var fieldName = matcher[i].replace("{{","").replace("}}","");
			// valid control
			if($.grep(source, function(n) { return n.id === "{{" + fieldName + "}}"; }).length <= 0)
			{
				$("#computationalEditor-error").show();
				return;
			}
			expValidate = expValidate.replace("{{" + fieldName + "}}",1);
		}
	}
	
	try {
		if (isNaN(math.eval(expValidate))) {
			$("#computationalEditor-error").show();
			return;
		}
	} catch (e) {
		console.log(e.message);
		$("#computationalEditor-error").show();
		return;
	}
	return expression;
}
//# sourceURL=computational-editor.js