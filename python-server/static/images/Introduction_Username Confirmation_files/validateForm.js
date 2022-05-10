function checkFormFields(formVal) {

    var result = true;
    var error = "ERROR:\n";

    if (document.getElementById("first_name")!=null && document.getElementById("first_name").value.length==1) {
        error += "First Name is invalid.\n";
        result = false;
    }
    if (document.getElementById("last_name")!=null && document.getElementById("last_name").value.length==1) {
        error += "Last Name is invalid.\n";
        result = false;
    }
    if (document.getElementById("city")!=null) {
        cityField = document.getElementById("city").value;
        if (cityField.length>0 && cityField.search(/[0-9]/)!=-1) {
            error += "City is invalid.\n";
            result = false;
        }
    }
    if (document.getElementById("home_phone")!=null) {
        phoneField = document.getElementById("home_phone").value;
        stripped = phoneField.replace(/[\(\)\.\-\ ]/g, '');
        if (phoneField.length>0 && isNaN(parseInt(stripped))) {
            error += "Primary Phone is invalid.\n";
            result = false;
        }
    }
    if (document.getElementById("work_phone")!=null) {
        phoneField = document.getElementById("work_phone").value;
        stripped = phoneField.replace(/[\(\)\.\-\ ]/g, '');
        if (phoneField.length>0 && isNaN(parseInt(stripped))) {
            error += "Secondary Phone is invalid.\n";
            result = false;
        }
    }
    if (document.getElementById("fax")!=null) {
        phoneField = document.getElementById("fax").value;
        stripped = phoneField.replace(/[\(\)\.\-\ ]/g, '');
        if (phoneField.length>0 && isNaN(parseInt(stripped))) {
            error += "Fax is invalid.\n";
            result = false;
        }
    }
    if (document.getElementById("month")!=null && document.getElementById("date")!=null && document.getElementById("year")!=null) {
        year = document.getElementById("year").value;
        month = document.getElementById("month").value;
        date = document.getElementById("date").value;
            if (!validateDate(date, month, year)) {
                error += "Date of Birth is invalid.\n";
                result = false;
            }
    }
    if (result) {
        if (formVal) {
            return checkValidate();
        }
    }
    else {
        alert(error);
    }

    return result;
}

function validateDate(day, month, year)
{
   var result = true;
   if (!isNaN(year))
   {
      switch(month) 
      {
         case "2" :
            if (year == Math.round(year / 4) * 4)
	    {
	       if (day > 29) {
                  return false;
               }
            }
            else
            {
               if (day > 28) {
                  return false;
               }
            }
            break;	
         case "4" :
            if (day > 30)
            {
               return false;
            }	
            break;
         case "6":
            if (day > 30)
            {
               return false;
            }	
            break;		
         case "9":
            if (day > 30)
            {
               return false;
            }	
            break;
         case "11":
            if (day > 30)
            {
               return false;
            }	
            break;
         default:
            return true;
            break;
      }
   }
   return result;
}

/*     //if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,10})+$/.test(emailObj.value)){ */

function checkEmail(emailObj) {
    var emailVal = trim(emailObj.value);
    if(emailVal.indexOf("@") > 0) {
        return (true);
    }
    return (false);
}

function checkUsernamePrefix(uPrefixObj) {
    if (/^[A-Za-z]{5}$/.test(uPrefixObj.value)){
        return (true);
    }
    return (false);
}

function trim(value) {
    return value.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
}
