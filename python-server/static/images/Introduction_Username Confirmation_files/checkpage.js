var m_elements = new Array();
var m_layer = new Array();
var load_count = 0;
var browser = "";

//add browser determination here at load time ...
if (document.getElementById && navigator.userAgent.toLowerCase().indexOf("mac") == -1){
   if (navigator.userAgent.toLowerCase().indexOf("msie") != -1){ // IE  || parseInt(navigator.appVersion) > 4){ // IE or recent NS  
        browser = "IE";
   } 
}

function getFormElements(){ // completes loading of elements & activate first field ...
     if (browser == "IE"){ 
	 var m_form = document.forms[0].elements;

         for(var y=0;y<m_form.length;y++){
	    if (typeof(m_elements[y]) != "undefined"){  
	     if ((m_form[y].type == "radio" || m_form[y].type == "checkbox")){
		if (m_form[y].checked){
		    getButtonForms(m_form[y].type,m_form[y].name);
	        } 
	     }
	     else if (typeof(m_form[y].value) != "undefined" && m_form[y].value != ""){
                  m_elements[y].allOk = true;
	     }
	     // do not show any error message at load time, even if incorrect value ... 
	     document.getElementById(m_elements[y].layer).style.visibility = 'hidden';
	   }
	 }

	 if (m_form[0].disabled == false && m_form[0].type == "text"){
             m_form[0].focus(); // activate first element
         }
     }
}

function formElement(index,type,name,value,ischecked,layer){
         this.index = index;
         this.type = type;
         this.name = name;
         this.value = value;
         this.ischecked = ischecked;
         this.allOk = false;
         this.layer = layer;
         this.masterid = "none";
         this.isdependent = false;
         this.dependent = "none";
}

function getButtonForms(m_elementtype,m_elementname){ // only checkboxes and radio buttons ...
         var m_form = document.forms[0].elements;
         var m_ischecked;

	 for(var i=0;i<m_form.length;i++){
	     if (m_form[i].type == m_elementtype){ // reload elements ...
		 if (m_form[i].name == m_elementname && m_form[i].checked){ // go through elements with same name ...
		     m_elements[i].ischecked = true;
		     m_ischecked = true;
		 }
	     }
         }

         for(var t=0;t<m_form.length;t++){
             if (m_form[t].name == m_elementname){
		 m_elements[t].allOk = true;
             }
         }

	 return m_ischecked;
}

function findNextElement(m_index,m_elementname){ // only for checkbox & radio button groups ...
	  var l_index = 0;
	  for(var i=0;i<m_elements.length;i++){
              // look for next checkbox or radio group with same name ... 
	      if (i >= m_index && m_elements[i].name != m_elementname){
                  l_index = i;
	          break;
	      }
	  }

	  return l_index;
}

function getErrorMessage(m_index){
	 return m_errors[m_index];
}

function checkError(m_object){
         var n_index = findIndex(m_object);
         var m_form = document.forms[0].elements;

       if (browser == "IE"){
         if (m_form[n_index].type == "text" || m_form[n_index].type == "password"){ 
             if (m_form[n_index].value == ""){
		 document.getElementById(m_elements[n_index].layer).style.visibility = 'visible';
	         m_elements[n_index].allOk = false; 
	     }
             else {
                 m_elements[n_index].value = document.forms[0].elements[n_index].value;
		 m_elements[n_index].allOk = true; 
                 document.getElementById(m_elements[n_index].layer).style.visibility = 'hidden';
            }
         }
         else if (m_form[n_index].type.indexOf("select") != -1){
	      if (m_form[n_index].value == "" || m_form[n_index].value == "Choose One"){
                  document.getElementById(m_elements[n_index].layer).style.visibility = 'visible';
                  m_elements[n_index].allOk = false;
	      }
              else if(m_form[n_index].value == 0 && m_form[n_index].name != "dependent_num"){
                   document.getElementById(m_elements[n_index].layer).style.visibility = 'visible';
                   m_elements[n_index].allOk = false;
              }  
	      else {
                  m_elements[n_index].value = document.forms[0].elements[n_index].value;
                  m_elements[n_index].allOk = true;
                  document.getElementById(m_elements[n_index].layer).style.visibility = 'hidden';
              }
         }
         else if (m_form[n_index].type == "checkbox" || m_form[n_index].type == "radio"){
		  removeDependents(n_index,m_form[n_index].name);
		  
		  var m_ischecked = getButtonForms(m_form[n_index].type,m_form[n_index].name);
		  if (!m_ischecked){
		     document.getElementById(m_elements[n_index].layer).style.visibility = 'visible';
                     m_elements[n_index].allOk = false;
		  }
                  else {
		     document.getElementById(m_elements[n_index].layer).style.visibility = 'hidden';
                     m_elements[n_index].allOk = true;
		  }
        }

        // check to see if a previous element has been omitted ...
        checkPrecedents(n_index);

     }
}

function checkPrecedents(n_index){
         for(var p=0;p<=n_index;p++){
            if (m_elements[p].allOk == false){
                if (m_elements[p].isdependent == false){
                    document.getElementById(m_elements[p].layer).style.visibility = 'visible';
		}
                else {
                    var isvisible = 'hidden';
                    var master_id = m_elements[p].masterid;
                        if (m_elements[master_id].ischecked == true){
			       isvisible = 'visible';
                        }

                    document.getElementById(m_elements[p].layer).style.visibility = isvisible;
               }
            }
	    else if (m_elements[p].isdependent == true && m_elements[p].allOk){ // handles dependents that are OK ...
	             document.getElementById(m_elements[p].layer).style.visibility = 'hidden';
	    }
	 }
}


function hideLayer(m_layer){
	if (browser == "IE"){
            document.getElementById(m_layer).style.visibility = 'hidden';
        }
}

function loadElements(m_name,m_layer,m_master,m_master_value){
     if (browser == "IE"){
         if (typeof(m_layer) == "string"){ // creates layers ...

             var m_addlayer = false;

             for(var ml=0;ml<m_layer.length;ml++){ // check if it has been added ...
                 if (m_layer[ml] != m_layer){
                     m_addlayer = true;
		 }
             }

             if (m_master == "NoInclude"){ // does not include layer now ...
		 m_addlayer = false;
             }

             if (m_addlayer == true){ // if not added, add ... 
                 document.write("<div id='"+m_layer+"' style='position:absolute; visibility:hidden'>");
                 document.write("<span class='errorMsg'>"+getErrorMapping(m_name)+"</span>");
                 document.write("</div>");
                 m_layer[m_layer.length] = m_layer;
	     }
	 }

        if (m_master != "LoadLayerOnly"){ // way to include layers without loading elements ...
         var m_form = document.forms[0].elements;

         m_elements[load_count] = new formElement(load_count,m_form[load_count].type,m_form[load_count].name,m_form[load_count].value,m_form[load_count].checked,m_layer);

          if (typeof(m_master) == "string" && m_master != "NoInclude" && m_master != "NotRequired"){
              m_elements[load_count].isdependent = true;
              for(var i=0;i<m_elements.length;i++){
                  if (m_elements[i].name == m_master){
		     if (m_master_value == m_elements[i].value){ 
			 m_elements[load_count].masterid = i;
                         break;
                     }
		     else if (m_elements[i].type.indexOf("select") != -1){ // pull down master ...
			  m_elements[load_count].masterid = i;
			  break;
		     }
		  }
	      }

	      m_elements[m_elements[load_count].masterid].dependent = load_count;
	   }

           // additional filters ...
              if (m_master == "NotRequired"){
                  m_elements[load_count].allOk = true;
              }
         load_count ++;
       }
  }
}

function removeDependents(m_id,m_name){
	 var m_form = document.forms[0].elements;
	 for(var u=0;u<m_form.length;u++){
             if (m_form[u].name == m_name && u != m_id){
		 if (m_elements[u].dependent != "none"){
		     var d_id = m_elements[u].dependent;
		     var m_depend = m_elements[d_id];
                         m_form[d_id].checked = false;
                         m_depend.allOk = true;
			 document.getElementById(m_depend.layer).style.visibility = 'hidden';
		 }
	         break; 
	     }
             
	     if (u == m_id){ // must check the dependent ...
                if (m_elements[u].dependent != "none"){ 
		     var d_id = m_elements[u].dependent;
		     var m_depend = m_elements[d_id];
	                 checkError(m_depend);
		}
	        break; 
	     }
	 }
}

function checkValidate(){
     if (browser == "IE"){ 
	 var m_form = document.forms[0].elements;
         var m_submit = true;
         for(var y=0;y<m_elements.length;y++){
             if (m_elements[y].allOk == false){
		 m_submit = false;
                 if (m_elements[y].isdependent == true){
                    if (m_elements[m_elements[y].masterid].allOk == true && typeof(m_elements[y].layer) != "undefined"){
			if (m_form[m_elements[y].masterid].checked == true){ 
			    document.getElementById(m_elements[y].layer).style.visibility = 'visible';
			}
		     }
                  }
                  else {
                     if (typeof(m_elements[y].layer) != "undefined"){
                        document.getElementById(m_elements[y].layer).style.visibility = 'visible';
		     }
                  }
	     }
        }
        return m_submit;
     }
     else {
	return true;
     }
}

function warnDependent(m_object){
     if (browser == "IE"){
	 var n_index = findIndex(m_object);
         var m_form = document.forms[0];

         if (m_elements[m_elements[n_index].masterid].allOk == true){
	    if (m_object.type == "text" && m_object.value == ""){
		setAllOk(m_object.name,false);
		document.getElementById(m_elements[n_index].layer).style.visibility = 'visible';
            }
	    else if (m_object.type.indexOf("select") != -1 && (m_object.value == "" || m_object.value == "Choose One")){
		 setAllOk(m_object.name,false);
		 document.getElementById(m_elements[n_index].layer).style.visibility = 'visible';
	    }
	    else if ((m_object.type == "checkbox" || m_object.type == "radio") && m_object.checked == false){
		 setAllOk(m_object.name,false);
	         document.getElementById(m_elements[n_index].layer).style.visibility = 'visible'; 
	    }
            else {
		setAllOk(m_object.name,true);
                document.getElementById(m_elements[n_index].layer).style.visibility = 'hidden';
            }
	 }
         else {
	       // set test for howfound ...
               if (m_form.elements[m_elements[n_index].masterid].checked == true){ 
		   m_elements[m_elements[n_index].masterid].allOk = true;
	           checkError(m_elements[m_elements[n_index].masterid]); 
	       }
	       setAllOk(m_object.name,true);
               document.getElementById(m_elements[n_index].layer).style.visibility = 'hidden';
         }
     }
}

function setLayer(m_object,m_visibility,is_true){ // to directly adjust properties ...
  if (browser == "IE"){
      if (typeof(is_true) == "undefined"){
	  is_true = true;
      }

      var n_index = findIndex(m_object);
      m_elements[n_index].allOk = is_true;
      document.getElementById(m_elements[n_index].layer).style.visibility = m_visibility;
  }
}

function setAllOk(m_name,m_allok){
     if (browser == "IE"){
	 for(var h=0;h<m_elements.length;h++){
             if (m_elements[h].name == m_name){
		 m_elements[h].allOk = m_allok;
             }
         }
     }
}

function compareElements(m_id,m_layer,m_value){
     if (browser == "IE"){
         if (m_value != m_elements[(m_id-1)].value){
             document.getElementById(m_layer).style.visibility = 'visible';
             m_elements[m_id].allOk == false;
         }
         else {
             checkError(this.id,m_layer);
         }
     }
}

function findIndex(m_object){
         var n_index;
         
         for(var i=0;i<m_elements.length;i++){
             if ((m_object.type == "checkbox" || m_object.type == "radio")){
                if (m_object.value == m_elements[i].value && m_object.name == m_elements[i].name){
                    n_index = i;
                }
             }
             else {
                if (m_object.name == m_elements[i].name){
                    n_index = i;
                }
             }
         }
       
         return n_index;
}

function checkPreviousElement(m_index){
    if (browser ==  "IE"){
	 var m_form = document.forms[0].elements;

	 if (m_elements[m_index].allOk == false){
             checkPrecedents(m_index); 
         }
         else {
	     checkError(m_form[m_index]);
         }
    }
}

function checkPreviousElementByName(m_object,m_index){ // grab it by name for include pages ... 
     if (browser ==  "IE"){ 
	 var n_index = findIndex(m_object);
         var m_tmp = 1; 

	 if (typeof(m_index) != "undefined"){
	     m_tmp = m_tmp + m_index;
         }

         var m_tmp_2 = n_index-m_tmp;
	 if (m_tmp_2 >= 0){
	     checkPreviousElement(n_index-m_tmp);
         } 
     }
}

function acceptDecline(m_object){
     if (browser ==  "IE"){
	 if (m_object.value == "decline" || m_object.value == "reject"){
             var n_index = findIndex(m_object);
	     m_elements[n_index].allOk = false;
	     document.getElementById(m_elements[n_index].layer).style.visibility = 'visible';
	 }
         else {
	     checkError(m_object);
         }
     }
}

function checkPhoneNumber(m_object){
       if (browser ==  "IE"){ 
	   var m_phone = /\d{5,}/;
           var m_split = /[^\d]+/;

	 // remove non digit characters and make sure phone contains at least 5 digits ...

	 var m_array = m_object.value.split(m_split); 
	 var m_data =  m_array.join("");
	 if (m_phone.test(m_data) == false){
	     var n_index = findIndex(m_object);
             m_elements[n_index].allOk = false;
             document.getElementById(m_elements[n_index].layer).style.visibility = 'visible';
	 }
         else {
	      checkError(m_object);
         }
       }
}

function askPrintConfirm(){
	 var m_submit = checkValidate();

         if (m_submit == true){
             return confirmPrint();
	 }
         else {
             return m_submit;
	 }
}

function checkSSN(m_object){
     if (browser == "IE"){ 
	 var m_form = document.forms[0];
         var m_number;

         if (typeof(m_object) == "undefined"){
             m_number = /\d{9}/;
         }
         else if (m_object.name == "ssn1"){
                  m_number = /\d{3}/;
         }
         else if (m_object.name == "ssn2"){ 
                  m_number = /\d{2}/;
         }
         else if (m_object.name == "ssn3"){
                  m_number = /\d{4}/; 
         }

         var m_split = /[^\d]+/;

         var m_array = m_object.value.split(m_split);
         var m_data =  m_array.join("");
         if (m_number.test(m_data) == false){
	     if (typeof(m_object) == "undefined"){ // figure out which one is a problem ... 
                 checkSSN(m_form.ssn1);
                 checkSSN(m_form.ssn2);
                 checkSSN(m_form.ssn3);
             }
             else {
		 var n_index = findIndex(m_object);
                 m_elements[n_index].allOk = false;
                 document.getElementById(m_elements[n_index].layer).style.visibility = 'visible';
              }
         }
         else {
	      checkError(m_object);
	 }
     }
}

function checkDateOfBirth(m_object){
    if (browser == "IE"){

         var m_form = document.forms[0];
         var m_showlayer = false;

         if (m_object.name == "month" && m_object.value == "0"){
             m_showlayer = true;
         }

         if (m_object.name == "date" && m_object.value == "0"){
	     m_showlayer = true;
         }

         if (m_object.name == "year"){
             if (parseInt(m_object.value) < 1900){
                 m_showlayer = true;
             }
         
	     if (m_form.date.value == "0"){
                 m_showlayer = true;
             }

             if (m_form.month.value == "0"){
                 m_showlayer = true;
             } 
	 
	 }

         if (m_showlayer == true){
             document.getElementById('layer_date').style.visibility = 'visible';
         }
         else {
             checkError(m_object);
         }
   }
}

function indexChecked(m_object){
         var m_index = -1;

         for(var i=0;i<m_object.length;i++){
             if (m_object[i].checked == true){
                 m_index = i;
                 break;
             }
         }

         return m_index;
}

// page specific functions ...

function validateEmail(m_object){
    if (browser == "IE"){ 
	 var n_index = findIndex(m_object);
         var m_form = document.forms[0].elements;

	 //var em_pattern = /^([^\@]+)@([^\.]+)/; // trying without pattern matching for some browsers ... 
	 //if (em_pattern.test(m_object.value) == false){
	 if ((m_object.value.indexOf(".") == -1) && (m_object.value.indexOf("@") == -1)){
             document.getElementById(m_elements[n_index].layer).style.visibility = 'visible';
             m_elements[n_index].allOk = false;
         }
	 else {
	     if (m_form[n_index+1].value != ""){
		if (trimWhiteSpace(m_form[n_index+1].value) != trimWhiteSpace(m_form[n_index].value)){ 
		    m_elements[n_index+1].allOk = false;
		    document.getElementById(m_elements[n_index+1].layer).style.visibility = 'visible';
	        }
                else {
                    m_elements[n_index+1].allOk = true;
                    document.getElementById(m_elements[n_index+1].layer).style.visibility = 'hidden';
                }
	     }
	     
	     checkError(m_object);
         }
     }
}

function checkLength(m_object){
    if (browser == "IE"){ 
     var n_index = findIndex(m_object);
	 if (m_object.value.length < 5){
             m_elements[n_index].allOk = false;
	     document.getElementById(m_elements[n_index].layer).style.visibility = 'visible'; 
	 }
         else {
	      checkError(m_object);
         }
    }
}

function compareValues(m_object,m_element_1,m_element_2){ // compare object ...
     if (browser == "IE"){ 
	 var m_form = document.forms[0].elements;
         m_elements[m_element_2].allOk = true;
	 
	 if (trimWhiteSpace(m_form[m_element_1].value) != trimWhiteSpace(m_form[m_element_2].value)){ 
	     document.getElementById(m_elements[m_element_2].layer).style.visibility = 'visible';
             m_elements[m_element_2].allOk = false;
         }
         else {
	     checkError(m_object);
	 }
     }
}

function trimWhiteSpace(m_string){
         return m_string.replace(/^\s+/,'').replace(/\s+$/,'');
}

function checkPassword(m_object){
     if (browser == "IE"){
	 var n_index = findIndex(m_object);
         var n_digits = /\d+/;
	 m_elements[n_index].allOk = true; 

	 if ((m_object.value.length > 40 || m_object.value.length < 6) || n_digits.test(m_object.value) == false){
	     m_elements[n_index].allOk = false; 
	     document.getElementById(m_elements[n_index].layer).style.visibility = 'visible';
	 }
         else {
	      checkError(m_object);
	 }
     }
}


function countryStateLayer(m_object){ // pass the index so we do not have to look for it ...
     if (browser == "IE"){
         var m_form = document.forms[0].elements;

	 if (m_form[5].value == "United States"){
	     m_elements[7].allOk = true; // set canada layer to true ... 
	     document.getElementById('layer7').style.visibility = 'hidden'; // and hide it ...
	 }

	 if (m_form[5].value == "Canada"){
	     m_elements[6].allOk = true; // set us layer to true ... 
	     document.getElementById('layer6').style.visibility = 'hidden';
         }

         if (m_form[5].value == "Choose One"){
             m_elements[6].allOk = true; // set us layer to true ...
             m_elements[7].allOk = true; // set canada layer to true ...
             document.getElementById('layer6').style.visibility = 'hidden';
             document.getElementById('layer7').style.visibility = 'hidden';
         }
         warnDependent(m_object);
    }
}

function checkCountry(m_object,m_country_id){
     if (browser == "IE"){	
	 var m_form = document.forms[0].elements;

         if (m_form[m_country_id].value == "United States"){
             m_elements[m_country_id].dependent = 'legal_state';
             m_elements[7].isdependent = false;
             m_elements[7].allOk = true;
             document.getElementById('layer7').style.visibility = 'hidden';
         }
         else if (m_form[m_country_id].value == "Canada"){
             m_elements[m_country_id].dependent = 'legal_province';
             m_elements[6].isdependent = false;
             m_elements[6].allOk = true;
             document.getElementById('layer6').style.visibility = 'hidden'; 
         }
         else { // any other country is ok ...
             m_elements[7].allOk = true;
	     m_elements[6].allOk = true;
	     document.getElementById('layer6').style.visibility = 'hidden'; 
	     document.getElementById('layer7').style.visibility = 'hidden'; 
	 }
	 checkError(m_object);
    }
}
// ib - nc
