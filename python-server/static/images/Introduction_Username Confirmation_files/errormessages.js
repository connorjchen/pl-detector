function getErrorMapping(m_element){

         switch(m_element)
	 {
	   case "email_address" :
		 return "Invalid email address."
                 break;
           case "email_address2" : 
		 return "Confirmed email address doesn't match."
		 break;
	   case "password" :
		 return "Password must be 6 to 40 characters with at least one alpha and one numeric digit."
		 break;
	   case "password2" :
                 return "Confirmed Password doesn't match password.";
	         break;
	   case "usernamePrefix" :
		 return "Username pre-fix must be five characters."
	         break;
	   case "legal_state" :
		 return "Required."
		 break;
           case "legal_province" :
	         return "Required."
		 break;
	   case "countryResidential" :
		 return "Required."
		 break;
	   case "legal_country" :
			 return "Required."
			 break;
	   case "required" :
	         return "Required."
		 break;
	   case "token" : 
	         return "Required."
                 break;
	   case "currency" :
                 return "You must select a base currency."
	         break; 
	   case "capability" :
	         return "You must select an Account Capability." 
	         break; 
	   case "toplayer" :
	         return "Please complete all missing fields."
		 break;
	   case "tenants_none" :
	         return "You must enter Tenants in common percents." 
	         break; 
	   case "tenants_per" :
		 return "Your tenants in common percents must equal 100%"
	         break; 
	   case "owner_type" :
		 return "You must choose a beneficial owner."
		 break;
	   case "ira_type" :
		 return "You must select an IRA Type."
		 break;
	   case "joint_type" :
		 return "You must select a Joint Type."
		 break;
	   case "continue" :
		 return "In order to continue, you must accept the terms."
	         break;
	   case "type" :
		 return "You must select a customer type."
	         break; 
	   case "phone_num" :
		 return "Please verify phone number."
                 break;	  
	   case "trade_per" :
		 return "You must select at least one trading product in a single country."
	         break; 
	   case  "joint_account" :
		 return "You must select a Joint type."
	         break; 
	   case "how_found" :
		 return "You must choose 1 selection."
	         break;
	   case "invalid" :
		 return "Invalid."
		 break;
	   case "accept_continue" : 
                 return "In order to continue, you must accept the terms."	  
                 break;
	   case "must_accept" :
		 return "You must accept."
		 break;
	   case "deposit" : 
	         return "You must choose a deposit or transfer method."
		 break;
	   case "exchange_info" :
		 return "Please specify."
		 break;
	   case "omissions" :
		 return "Please scroll up to fill in missing information."
	         break; 
	   case "mdata" :
		 return "Must agree, if you are non-professional."
	         break; 
	   case "blank" : 
	         return "";
		 break;
	   default :
		return "Please verify information."
	        break;
	 }
}
