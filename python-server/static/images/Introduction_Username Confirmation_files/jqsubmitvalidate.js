var gErrors = 0; //number of errors is set to none to begin with
function validate(form, skipBlockUI)
{
//var inputs=form.getElementsByTagName('input');
var inputs=$("input[required]:visible,input[validate]:visible,input[message]:visible",form);
for (i=0; i<inputs.length; i++){ 
		if(inputs[i].disabled&&($(inputs[i]).attr("validatedisabled")!="true")) continue;
                if(typeof inputs[i].onchange != 'undefined'){
                    inputs[i].onchange();
                    var messageHolder;
                    if(inputs[i].getAttribute("message")!=null)
                    {   messageHolder=document.getElementById(inputs[i].getAttribute("message"));
                    }else{
                            var id=inputs[i].id;
                            messageHolder=document.getElementById(id+"Msg");
                    }
                    if(messageHolder!=null&&messageHolder.innerHTML!="")
                    {	gErrors = gErrors + 1;
                    }
                }
}
var selects=$("select[required]:visible,select[validate]:visible,select[message]:visible",form);	
for (i=0; i<selects.length; i++){
	if(selects[i].disabled) continue;
               if(typeof selects[i].onchange != 'undefined'){ 
		selects[i].onchange();
		var messageHolder;
		if(selects[i].getAttribute("message")!=null)
		{
			messageHolder=document.getElementById(selects[i].getAttribute("message"));
		}else{
			var id=selects[i].id;
			messageHolder=document.getElementById(id+"Msg");
		}
		if(messageHolder!=null&&messageHolder.innerHTML!="")
		{
			gErrors = gErrors + 1;
		}
               }
}
var textareas=$("textarea[required]:visible,textarea[validate]:visible,textarea[message]:visible",form);
for (i=0; i<textareas.length; i++){
	if(textareas[i].disabled) continue;
               if(typeof textareas[i].onchange != 'undefined'){ 
		textareas[i].onchange();
		var messageHolder;
		if(textareas[i].getAttribute("message")!=null)
		{
			messageHolder=document.getElementById(textareas[i].getAttribute("message"));
		}else{
			var id=textareas[i].id;
			messageHolder=document.getElementById(id+"Msg");
		}
		if(messageHolder!=null&&messageHolder.innerHTML!="")
		{
			gErrors = gErrors + 1;
		}
               }
}    
//if we defined some custom (validation) 
if(typeof(customValidation)!="undefined")
 {var result=customValidation();
    if(!result)
     {
       gErrors = 0;
       return false;     
     }
 }
//if we defined some custom (non validation) 
if(typeof(customSubmit)!="undefined")customSubmit();   
if (gErrors > 0){
         $("#errordialog").dialog('open');   
	gErrors = 0;// reset errors to 0
	return false;
}else{
    if(!skipBlockUI && (typeof(scheduleBlockUI)!="undefined")) scheduleBlockUI();
    return true;
}
	
}
