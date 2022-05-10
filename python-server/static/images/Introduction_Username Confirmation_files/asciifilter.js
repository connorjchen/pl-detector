var ASCII_MAIN_ERROR="Invalid characters found. We can only accept standard English (ASCII) characters.";
var ASCII_ERROR_MSG1="Non-ASCII characters are not allowed (ie: &ntilde;, &micro;, &yen;)";
var ASCII_ERROR_MSG2="Control characters are not allowed (ie: Backspace, Tab, New Line)";
if(typeof window.onload == 'undefined'||(window.onload==null))
{ 
  window.onload = attachASCIIFilters;

  if (typeof validateErrorMap !== "undefined")
  {
      ASCII_ERROR_MSG1 = validateErrorMap.validateErr01;
      ASCII_ERROR_MSG2 = validateErrorMap.validateErr02;
  }
}

function attachASCIIFilters()
{
  // Make sure we're on a newer browser
    if (document.getElementsByTagName)
    {
          var objInput = document.getElementsByTagName('input'); // get all input tags
          var forms=document.getElementsByTagName("form"); // get the form
          for (var iCounter=0; iCounter<objInput.length; iCounter++)
          {   
              if(objInput[iCounter].disabled) continue;
              var type=objInput[iCounter].getAttribute("type");
              var name=objInput[iCounter].getAttribute("name");
              var required=objInput[iCounter].getAttribute("required");
              var validate=objInput[iCounter].getAttribute("validate");                    
              if("text"==type&&required==null&&validate==null&&name!=null&&!name.endsWith("_native"))
              {       
                if(typeof objInput[iCounter].onchange == 'undefined'||(objInput[iCounter].onchange==null))
                {
                    objInput[iCounter].onchange = function(){return setupASCIIFilter(this);} // attach the onchange event to each input tag
                }
                //objInput[iCounter].onclick = function(){return attach(this);} // attach the onchange event to each input tag
                if(typeof objInput[iCounter].onblur == 'undefined'||(objInput[iCounter].onblur==null))
                {
                    objInput[iCounter].onblur = function(){return setupASCIIFilter(this);} // attach the onblur event to each input tag
                }
                if(typeof objInput[iCounter].onkeyup == 'undefined'||(objInput[iCounter].onkeyup==null))
                {
                    objInput[iCounter].onkeyup = function(){return setupASCIIFilter(this);} // attach the onblur event to each input tag
                }
              }
          }		
          for (iCounter=0; iCounter<forms.length; iCounter++)
          {
                  if(typeof forms[iCounter].onsubmit == 'undefined'||(forms[iCounter].onsubmit==null))
                  {
                      forms[iCounter].onsubmit = function(){return doASCIICheck(this);} // attach the onsubmit to the form 
                  }
          }
	}
}

String.prototype.trim = function(){
	return this.replace(/^\s+|\s+$/g,"");
}

String.prototype.endsWith = function(txt, ignoreCase){
    var rgx;
    if(ignoreCase){
        rgx=new RegExp(txt+"$","i");        
    }else{
        rgx=new RegExp(txt+"$");
    }
    return this.match(rgx)!=null;
}

function setupASCIIFilter(objInput)
{
    sVal = objInput.value; //sVal is the value of the input field being validated
    var sFeedback=""; //feedback message sent back to the user
    var sFeedbackLoc =  objInput.getAttribute('message');
    var sFeedbackId =  objInput.getAttribute('id');
    var sFeedbackName =  objInput.getAttribute('name');
    if(sFeedbackLoc==null){
       if(sFeedbackId!=null) 
       {sFeedbackLoc=sFeedbackId+"msg";}
       else if(sFeedbackName!=null) 
       {sFeedbackLoc=sFeedbackName+"msg";}
    }
    if(sVal != null&&sVal != ""){
       sFeedback = validateASCII(sVal);
    }
    // after validation is complete return the feedback 
    var messageHolder=document.getElementById(sFeedbackLoc);
    if(messageHolder!=null)
    {
     messageHolder.className="errorMsg";
     messageHolder.innerHTML = sFeedback;        
    }else{
     var span=document.createElement("span");
     span.setAttribute("id",sFeedbackLoc);
     span.setAttribute("class","errorMsg");
     var text=document.createTextNode(sFeedback);
     span.appendChild(text);
     objInput.parentNode.appendChild(span);
    }
 }

function validateASCII(sVal){
    if (sVal!=null){ 
        for(var i=0;i<sVal.length;i++){
            var code=sVal.charCodeAt(i);
            if(code>127){
                return ASCII_ERROR_MSG1;
            }else if(code<32||code==127){
                return ASCII_ERROR_MSG2;
            }
        }
    }
    return "";
}

var gASCIIErrors = 0; //number of errors is set to none to begin with
function doASCIICheck(form)
{   
    var inputs=form.getElementsByTagName('input');
    for (i=0; i<inputs.length; i++){
        if(inputs[i].disabled) continue;
        var type=inputs[i].getAttribute("type");
        var name=inputs[i].getAttribute("name");
        var id=inputs[i].getAttribute("id");
        var required=inputs[i].getAttribute("required");
        var validate=inputs[i].getAttribute("validate");
        var message=inputs[i].getAttribute("message");
        if("text"==type&&required==null&&validate==null&&name!=null&&!name.endsWith("_native")){
            if(typeof inputs[i].onchange != 'undefined'){
                inputs[i].onchange();
                var messageHolder;
                if(message!=null)
                {   messageHolder=document.getElementById(inputs[i].getAttribute("message"));
                }else if(id!=null){
                    messageHolder=document.getElementById(id+"msg");
                }else if(name!=null){
                    messageHolder=document.getElementById(name+"msg");
                }
                if(messageHolder!=null&&messageHolder.innerHTML!="")
                {	gASCIIErrors = gASCIIErrors + 1;
                }
            }
	}
    }
    
    //if we defined some custom (validation) 
    if(typeof(customASCIIValidation)!="undefined")
    {var result=customASCIIValidation();
        if(!result)
        {
            gASCIIErrors = 0;
            return false;     
        }
    }
    //if we defined some custom (non validation) 
    if(typeof(customSubmit)!="undefined")customSubmit();   
    if (gASCIIErrors > 0){
	//if there are any errors give a message
	var mainMessageHolder=document.getElementById("main_error_msg");
	if(mainMessageHolder)
	{
            mainMessageHolder.innerHTML="&nbsp;&nbsp;"+ASCII_MAIN_ERROR+"&nbsp;&nbsp;";
            mainMessageHolder.className="errorMsg2";
        }else{
            alert (ASCII_MAIN_ERROR);
	}
	gASCIIErrors = 0;// reset errors to 0
	return false;
    }else 
    {return true;}//set this to true in to allow the form to submit
    
}
