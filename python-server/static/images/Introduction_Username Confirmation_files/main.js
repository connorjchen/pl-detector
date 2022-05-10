var spacer    = "          \n";
var errPrefix = "Your application has the following errors:\n\n"
var errSufix  = "\nPlease correct and re-submit.\n\n"

function printPage() {
	window.print();
}

function getHelp(loc) {
	redirect = "http://www.interactivebrokers.com/html/help/contact.html?registration";
	window.open(redirect,'Help','');
}

function getProgress() {	
	loc     = window.location.href;
	if(loc.indexOf("Registration.") > 0)
	{
		currLoc = loc.substring(0,loc.indexOf("Registration."+13));
	}
        if(loc.indexOf("Registration_v2.") > 0)
	{
	        currLoc = loc.substring(0,loc.indexOf("Registration_v2."+16));
	}
        if(loc.indexOf("IBServletUtils.") > 0)
	{
		currLoc = loc.substring(0,loc.indexOf("IBServletUtils."+15));
        }
        if(loc.indexOf("AccountAccess.") > 0)
	{
	        currLoc = loc.substring(0,loc.indexOf("AccountAccess."+14));
	}
	currLoc += currLoc + "Registration.formProgress";
	window.location = currLoc;
}
/*
function getProgress() {	
	loc     = window.location.href;
	if(loc.indexOf("WizardServlet") > 0 || loc.indexOf("Registration_v2") > 0)
	{
		//alert("New Process");
		currLoc = loc.substring(0,loc.indexOf("Registration_v2."+16));
		currLoc += currLoc + "Registration_v2.formProgress";
		window.location = currLoc;
	}
	else
	{
		//alert("Old Process");
		currLoc = loc.substring(0,loc.indexOf("Registration."+13));
		currLoc += currLoc + "Registration.formProgress";
		window.location = currLoc;

	}	
}
*/
function pageBack() {
	document.forms[0].action.value = "PAGE_BACK";
	document.forms[0].submit();
}

function back() {
        document.forms[0].action.value = "BACK";
        document.forms[0].submit();

}

function confirmPrint() {
	var ans = confirm("You must print this document for pen signature or request that IB send you this document by mail for pen signature at the end of this application process. If you wish to proceed to the next page click 'OK', otherwise click 'Cancel'.");
	if(ans) {
		removeCookie();
		return true;	
	} else {
		return false;
	}
}

function printConfirm() {
	var ans = confirm("You must print this document for pen signature or request that IB send you this document by mail for pen signature at the end of this application process. If you wish to proceed to the next page click 'OK', otherwise click 'Cancel'.");
	if(ans) {
		removeCookie();
		return true;	
	} else {
		return false;
	}
}

function processLogout() {
	if(true) {
		loc     = window.location.href;
		currLoc = loc.substring(0,loc.indexOf("Registration."+13));
		currLoc += currLoc + "AccountAccess.Logout?";
		window.location=currLoc;
	} 
}

function finance_logout() {
	if(true) {
		removeCookie();
		loc     = window.location.href;
		currLoc = loc.substring(0,loc.indexOf("Registration."+13));
		currLoc += currLoc + "../../Universal/servlet/AccountAccess.Logout?";
		window.location=currLoc;
	} 
}


function logout() {
	if(true) {
		loc     = window.location.href;
		currLoc = loc.substring(0,loc.indexOf("Registration."+13));
		currLoc += currLoc + "AccountAccess.Logout?";
		window.location=currLoc;
	} 
}

function invalidEmail(str) {
	if((str.indexOf(".") > 0) && (str.indexOf("@") > 0)) {
		return false;
	} else {
		return true;
	}
}	

function fillNameBlock(fn,ln,mi,s) {
	f = document.forms[0];	

	f.first_name.value     = fn;
	f.last_name.value      = ln;
        if (f.middle_initial!=null)
	f.middle_initial.value = mi;
        if(f.suffix!=null)
	f.suffix.value		   = s;
}

function fillAddressBlock(s1,s2,c,s,z) {
	f = document.forms[0];	

	f.street.value		= s1;
	f.street2.value		= s2;
	f.city.value		= c;
	f.state.value		= s;
	f.postal_code.value = z;
}

function fillPhoneBlock(hp,wp,fx) {
	f = document.forms[0];	

	f.home_phone.value  = hp;
	f.work_phone.value  = wp;
	f.fax.value			= fx;
}

function fillSSN(s1,s2,s3) {
	f = document.forms[0];	

	f.ssn1.value  = s1;
	f.ssn2.value  = s2;
	f.ssn3.value  = s3;
}

function selectCorrect(formObj, selectedValue) {
    if(typeof formObj != 'undefined'){

	for(i=0;i<formObj.length;i++) {
		if(formObj[i].value == selectedValue) {
			formObj[i].selected = true;
			break;
		}
	}
    }
}

function radioCorrect(formObj, selectedValue) {
	for(i=0;i<formObj.length;i++) {
		if(formObj[i].value == selectedValue) {
			formObj[i].checked = true;
			break;
		}
	}
}

function getCookieVal(offset){
 var endstr = document.cookie.indexOf(";",offset);
 if(endstr==-1){
	 endstr = document.cookie.length;
 }
 return unescape(document.cookie.substring(offset,endstr));
}

function getCookie(name){
	var arg  = name + "=";
	var alen = arg.length;
	var clen = document.cookie.length;
	var i=0;
	while (i<clen){
			var j =i +alen;
			if(document.cookie.substring(i,j) == arg){
					return getCookieVal(j);
			}
			i = document.cookie.indexOf(" ",i)+1;
			if(i==0)break;
	}
	return null;
}
function removeCookie(){
	var expdate = new Date();
	var name  ="SCCWACCREDENTIAL";
	var value = getCookie(name);
	if(value){
		document.cookie =name+"="+value+"; domain=.interactivebrokers.com; path=/; expires=Fri, 02-Jan-1970 00:00:01 GMT";
	}
}

function echeck(str) 
{

	var at="@"
	var dot="."
	var lat=str.indexOf(at)
	var lstr=str.length
	var ldot=str.indexOf(dot)
	if (str.indexOf(at)==-1){
	   alert("Invalid E-mail ID")
	   return false
	}
	if (str.indexOf(at)==-1 || str.indexOf(at)==0 || str.indexOf(at)==lstr){
	   alert("Invalid E-mail ID")
	   return false
	}

	if (str.indexOf(dot)==-1 || str.indexOf(dot)==0 || str.indexOf(dot)==lstr){
	    alert("Invalid E-mail ID")
	    return false
	}

	 if (str.indexOf(at,(lat+1))!=-1){
	    alert("Invalid E-mail ID")
	    return false
	 }

	 if (str.substring(lat-1,lat)==dot || str.substring(lat+1,lat+2)==dot){
	    alert("Invalid E-mail ID")
	    return false
	 }

	 if (str.indexOf(dot,(lat+2))==-1){
	    alert("Invalid E-mail ID")
	    return false
	 }
		
	 if (str.indexOf(" ")!=-1){
	    alert("Invalid E-mail ID")
	    return false
	 }

	 return true					
}

/********************************************************/
function set_Cookie(name, value) {
      var exp = new Date();
      var myValue = "";
      expirationDate = exp.getTime();
      exp.setTime(expirationDate);
      document.cookie = name + "=" + value + ";path=/";
}

function get_Cookie(name) {
   var dc = document.cookie;
   var prefix = name + "=";
   var begin = dc.indexOf("; " + prefix);

   if (begin == -1) {
       begin = dc.indexOf(prefix);
       if (begin != 0) return null;
   } else
       begin += 2;
       var end = document.cookie.indexOf(";", begin);

       if (end == -1)
           end = dc.length;

       return unescape(dc.substring(begin + prefix.length, end));
}
/********************************************************/
  function submitLocale(sLocale)
  {
      var pickLocale=document.getElementById('pickLocale');

      if (pickLocale == undefined)
      {
          document.getElementById("flagIconCell").style.display = "none";
          document.getElementById("noLocaleMsgCell").style.display = "";
          setTimeout(function()
          {
              document.getElementById("flagIconCell").style.display = "";
              document.getElementById("noLocaleMsgCell").style.display = "none";
          }, 3000);
      }
      else
      {
          setCustomerServiceLang(sLocale);

          if (sLocale.indexOf("zh") == -1)
              sLocale = sLocale.split("_")[0];
          
          pickLocale.locale.value=sLocale;
          pickLocale.submit();
      }
  }
  
function submitLocale2(sLocale)
{
    parent.frames['navigation'].changeLang(sLocale);
    parent.frames['header'].changeLang(sLocale);

    var currentSelection = parent.frames['navigation'].currentSelection;
    //console.log(currentSelection);

    $.ajax(
    {
        type        :   "POST",
        url         :   "../servlet/AccountAccess.HomePageServlet",
        data        :   "action=SetSessionLanguage&locale=" + sLocale,
        complete    :   function(jqXHR, textStatus)
                        {
                            var menuEntry = $("#" + currentSelection, parent.frames['navigation'].document);
                            $(menuEntry).parent().submit();
                        }
    });
}
  
  function highlightThis(imgId,imgName, flagsArray){
      for(i=0;i<flagsArray.length;i++){
          imgOffName = "flag_"+flagsArray[i].split("_")[1];
          document.getElementById('langSupImg'+i).src="/Universal/images/newMenu_v3/"+imgOffName+"_off.png";
      }
      if(document.getElementById(imgId)){
          document.getElementById(imgId).src="/Universal/images/newMenu_v3/"+imgName+"_on.png";
      }
  }
  
    function highlightThis2(imgId,imgName, flagsArray,eventName){
        
      for(i=0;i<flagsArray.length;i++){
          imgOffName = "flag_"+flagsArray[i].split("_")[1];
          var id = 'langSupImg'+i;
          if(id!=imgId){
              document.getElementById(id).src="/Universal/images/newMenu_v3/"+imgOffName+"_off.png";
              if(eventName == 'click'){
                  $("#"+id).removeClass('click');
              }
          }
      }
      
      var selectedImage = document.getElementById(imgId);
      if(selectedImage){
          selectedImage.src="/Universal/images/newMenu_v3/"+imgName+"_on.png";
          if(eventName == 'click'){   
              $("#"+imgId).addClass("click");
          }
      }
  }
  
  function highlightThisMouseOut(flagsArray){
      
      for(i=0;i<flagsArray.length;i++){
          imgOffName = "flag_"+flagsArray[i].split("_")[1];
          if($('#langSupImg'+i).hasClass('click')){
              document.getElementById('langSupImg'+i).src="/Universal/images/newMenu_v3/"+imgOffName+"_on.png";
          }else{
              document.getElementById('langSupImg'+i).src="/Universal/images/newMenu_v3/"+imgOffName+"_off.png";
          }
      }
  }
  

// Call for Anuj API to set Language Code
function setCustomerServiceLang(sLocale)
{
    // Valid Values for submission (EN|FR|DE|IT|CN|JP|ES|RU|NL|PT|TW)
    if (sLocale.indexOf("_") > 0)
    {
        if ((sLocale.indexOf("zh") == -1) && (sLocale.indexOf("ja") == -1))
            sLocale = sLocale.split("_")[0];
        else
            sLocale = sLocale.split("_")[1];
    }
    sLocale = sLocale.toUpperCase();

    var pickLocale = document.getElementById('pickLocale');
   
   if(pickLocale){
        var userName = pickLocale.theUserName.value;
        var acctNum = pickLocale.theAcctNum.value;
        var xmlSource = "<CustomerPreferencesRequest src=\"MSGCENTER\" user=\"" + userName + "\" action=\"set\" acctID=\"" + acctNum + "\"><PREFCLASS CLS=\"LANGUAGE\"><PREF PT=\"LANG1\" LANG=\"" + sLocale + "\"/></PREFCLASS></CustomerPreferencesRequest>";
        var source = "UNIVERSAL";
        var dropDir = "/home/users/csprod/webRequests/inbox/prefServ";
        var rmiURL = "";
        var envString = pickLocale.envString.value;
        if (envString == "development")
            rmiURL = "//dev200:2047/CustomerPreferencesService";
        else
            rmiURL = "//ny5ibop1:49485/CustomerPreferencesService";
        
        if (acctNum.length <= 0)
            return;
        
        $.ajax({
            type        :       "GET",
            url         :       "/Universal/servlet/CustomerService.Test",
            data        :       "info=" + xmlSource + "&source=" + source + "&rmiUrl=" + rmiURL + "&dropDir=" + dropDir,
            dataType    :       "text"
        });
    }
}

function loginTypeDriver() {
    var loginType = $("select#loginType");
    if (!loginType.length) {
        return;
    }
    
    if (loginType.val() == "1") {
        $("tbody#forwardToContainter").show();
    } else {
        $("tbody#forwardToContainter").hide();
        $("select#forwardTo").val("");
    }
}