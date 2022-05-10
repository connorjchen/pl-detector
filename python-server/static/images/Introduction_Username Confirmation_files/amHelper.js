// Open a new window
var win = null;
function NewWindow(mypage, myname, w, h, pos, infocus) 
{
    if (pos == "random") {
        myleft = (screen.width) ? Math.floor(Math.random() * (screen.width-w)):100;
        mytop = (screen.height) ? Math.floor(Math.random() * ((screen.height-h)-75)):100;
    }
    if (pos == "center") {
        myleft = (screen.width) ? (screen.width-w) / 2:100;
        mytop = (screen.height) ? (screen.height-h) / 2:100;
    } else if ((pos !='center' && pos != "random") || pos == null) {
        myleft = 0; 
        mytop = 20;
    }
    settings = "width=" + w + ", height=" + h + ",top=" + mytop + ",left=" + myleft + ", scrollbars=yes, location=no, directories=no, status=no, menubar=no, toolbar=no, resizable=yes";
    win = window.open(mypage, myname, settings);
    win.focus();
}
function openChat(theURL, theName) { 
    window.open(theURL, theName, 'height=561px,width=826px,menubar=no,toolbar=no,scrollbars=no,resizable=yes,status=yes');
}
function openNewWin(theURL, theName) {
    window.open(theURL, theName, 'height=800px,width=1200px,menubar=no,toolbar=no,scrollbars=yes,resizable=yes,status=yes');
}
function setMessage(message) {
    status = message;
}
function setStatus(message) {
    status = message;
    setTimeout('setMessage("'+message+'")',1);
}
// Auto Tab Function
var isNN = (navigator.appName.indexOf("Netscape")!=-1);
function autoTab(input,len, e) {
    var keyCode = (isNN) ? e.which : e.keyCode; 
    var filter = (isNN) ? [0,8,9] : [0,8,9,16,17,18,37,38,39,40,46];
    if(input.value.length >= len && !containsElement(filter,keyCode)) {
        input.value = input.value.slice(0, len);
        input.form[(getIndex(input)+1) % input.form.length].focus();
    }
    
    function containsElement(arr, ele) {
        var found = false, index = 0;
        while(!found && index < arr.length)
        if(arr[index] == ele)
        found = true;
        else
        index++;
        return found;
    }
    function getIndex(input) {
        var index = -1, i = 0, found = false;
        while (i < input.form.length && index == -1)
        if (input.form[i] == input)index = i;
        else i++;
        return index;
    }
    return true;
}
function confirmSMAPrint() {
    var ans = confirm("You must print this document for pen signature.  If you wish to proceed to the next page click 'OK', otherwise click 'Cancel'.");
    if(ans)
    {
        return true;
    } else 
    {
        return false;
    }
}
function confirm_m() {
    var ans = confirm("Please print this document for your records. If you wish to proceed to the next page click 'OK', otherwise click 'Cancel' to print.");
    if(ans)
    {
        removeCookie();
        return true;
    } else 
    {
        return false;
    }
}
function uPrefixNA(uPrefix) {
    var i;
    var formOK = true;
    var prefixesNA = new Array("trade","paper","david","chris","steve","edemo","fdemo","mdemo","pdemo","idemo","money","peter","ibsym","james","abcde","hisib","frank","jason","zhang", "batuc","kevin","andre","brian","scott","testt","dtest","lucky","stock","henry","simon","zheng","tiger","huang","danny","larry","qwert","tests","ccpma","qoppa","cheng","angel","testo","green","rober","roger","xxxxx","marco","tride","alpha","jerry","ttest","tommy","billy","aaaaa","marti","georg","harry","jimmy","chang","laura","advis","teste","itest");
                           
    var uPrefix = uPrefix.toLowerCase();
    for (i in prefixesNA) {
        if (uPrefix==prefixesNA[i]) {
            alert("Please select a different username prefix.");
            formOK = false;
            break;
        }
    }
    return formOK;
}
function FlashWrite(url,width,height)
{     
     document.write('<OBJECT classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"');
     document.write('  codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,40,0"');
     document.write('  WIDTH=' + width + ' HEIGHT=' + height + '>');
     document.write(' <PARAM NAME=movie VALUE="' + url + '"> <PARAM NAME=quality VALUE=high> <PARAM NAME=bgcolor VALUE=#FFFFFF> <PARAM NAME=wmode VALUE=transparent> ');
     document.write(' <EMBED src="' + url + '" quality=high wmode=transparent bgcolor=#FFFFFF  ' );
     document.write(' swLiveConnect=FALSE WIDTH=' + width + ' HEIGHT=' + height);
     document.write(' TYPE="application/x-shockwave-flash" PLUGINSPAGE="http://www.macromedia.com/go/getflashplayer">');
     document.write(' </EMBED></OBJECT>');
}

var httpRequest;

function getHttpRequest() 
{
    try 
    {
        httpRequest = new XMLHttpRequest();
    }
    catch (e)
    {
        try
        {
            httpRequest = new ActiveXObject("Msxml2.XMLHTTP");
        }
        catch (e)
        {
            try
            {
                httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
            }
            catch (e)
            {
                //alert("Browser does not support AJAX!");
                return false;
            }
        }
    }
    return httpRequest;
}
function getClients(str)
{
    if (str.length<4) 
    {
        document.getElementById("clientDiv").innerHTML="";
        return;
    }

    httpRequest = getHttpRequest();

    if (httpRequest==null)
    {
        alert("Please upgrade your browser.");
        return;
    }

    var url = '../servlet/IBrokerClientMngmnt.formClientSummary\?action=GET_CLIENTS\&acctIdStr='+str;

    httpRequest.open("GET", url, true);
    httpRequest.onreadystatechange = function() {processClients(); } ;
    httpRequest.send(null);
}
function processClients()
{
    if (httpRequest.readyState == 4)
    {
        if(httpRequest.status == 200)
        {
            //get the data sent by the servlet
            //alert(httpRequest.responseText);
            var clientArray = httpRequest.responseText.split(",");

            //Update the HTML
            updateClientsHTML(clientArray);
        }
        else
        {
            alert("Error loading page\n"+ httpRequest.status +":"+ httpRequest.statusText);
        }
    }
}
function updateClientsHTML(clientArray) 
{
    var clientDiv = document.getElementById("clientDiv");
    clientDiv.style.visibility = 'visible';
    clientDiv.innerHTML="";
    var html = [];
    if (clientArray.length > 0)
    {
        for (i=0; i < clientArray.length; i++)
        {
            var clientAcctId = clientArray[i].replace(/^\s*|\s(?=\s)|\s*$/g, '');
            if (clientAcctId.length>0 && clientAcctId.substring(0,1)=='U') {
                //var liclickHTML = '<li><a href=\"#gotoDiv\" onclick=\"getClientInfo(\''+clientAcctId+'\')\">' + clientAcctId + '</a></li>';
                var liclickHTML = '<li><a href=\"#gotoDiv\" onclick=\"setClientAccount(\''+clientAcctId+'\')\">' + clientAcctId + '</a></li>';
                html[html.length] = liclickHTML;                
            }
            else {
                clientDiv.innerHTML="";
                clientDiv.style.visibility = 'hidden';
                return;
            }
        }
        clientDiv.innerHTML = '<ul>' + html.join('') + '</ul>';
    }
    if (html.length==0) {
        clientDiv.innerHTML="";
        clientDiv.style.visibility = 'hidden';
    }
}
function setClientAccount(clientSelected)
{
    document.getElementById("switchAccountId_t").value=clientSelected;
    var clientDiv = document.getElementById("clientDiv");
    clientDiv.innerHTML="";
    clientDiv.style.visibility = 'hidden';
}
function checkUncheck(which, obj)
{
    var searchVal;
    if(which.substring(0, 1) == '|')
	searchVal = '$=\'' + which + '\'';
    else
	searchVal = '^=\'' + which + '\'';

    var checkBoxes = $("input:checkbox[id" + searchVal + "]");
    $(checkBoxes).not(":disabled").attr('checked', $(obj).is(':checked'));
    $(checkBoxes).change();
}

function clickCheckBox(obj){
    $(obj).closest('td').next('td').find('input:checkbox').click();
}

function processClosedAccountsOption(theForm) {
    if (theForm.includeClosedAccounts.checked == true ) {
        document.closedAccountsForm.includeClosedAccounts.value = "T";
    } else {
        document.closedAccountsForm.includeClosedAccounts.value = "F";
    }
    document.closedAccountsForm.submit();
} 

function openVideo(vCode){
    var videoWin = window.open("","finWindow","width=645,height=560,scrollbars=1,resizable=1")
    var html = "<object classid='clsid:D27CDB6E-AE6D-11cf-96B8-444553540000' width='640' height='554' id='viddler_"+vCode+"'>"
                    +"<param name='flashvars' value='disablebranding=t' /><param name='movie' value='http://www.viddler.com/simple/"+vCode+"/' />"
                    +"<param name='allowScriptAccess' value='always' /><param name='allowFullScreen' value='true'/>"
                    +"<embed src='http://www.viddler.com/simple/"+vCode+"/' width='640' height='554' type='application/x-shockwave-flash' allowScriptAccess='always' flashvars='disablebranding=t'  allowFullScreen='true' name='viddler_"+vCode+"'></embed>"
                    +"</object>'";
    if(vCode!=""){
        videoWin.document.open();
        videoWin.document.write(html);
    }
}

function openIBVideo(vCode){
    var videoWin = window.open("http://individuals.interactivebrokers.com/images/common/videos/"+vCode,"helpWindow","width=1000,height=630,scrollbars=1,resizable=1")
}

function doSubmit() {
    doSubmit(null);
}

function doSubmit(frmObj) {
    if(frmObj == null)
	frmObj = document.getElementById('userform');

    if(typeof(warningConsent) != "undefined" && !hasConsent)
        warningConsent(doSubmit, frmObj);
    else {
	if(typeof(preSubmit) != "undefined")
	    if(!preSubmit())
		return;

	if(frmObj.onsubmit())
	    doFinalSubmit(frmObj);
    }
}

function doFinalSubmit(frmObj) {
    if (typeof blockFinalSubmit == "undefined") {
        frmObj.submit();
    } else {
        setTimeout(function() { doFinalSubmit(frmObj) }, 500);
    }
}

if(!Array.indexOf){ // ie does not support Array.indexOf
        Array.prototype.indexOf = function(obj){
            for(var i=0;i<this.length;i++){
                if(this[i]==obj){
                    return i;
                }
            }
            return -1;
        }
}

