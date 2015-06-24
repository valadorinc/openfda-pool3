package openfda.classes;

import org.djw.tools.utils.GeneralUtils;

public class ServerAuth {

	public ServerAuth(){}
	
	public boolean authenticate(String ServerKey){
		boolean Success = false;
		String StoredKey = "";
		if (GeneralUtils.getConfigPropValue("server_key") != null){
			StoredKey = GeneralUtils.getConfigPropValue("server_key");
	    }
		if (StoredKey.equals(ServerKey)){
			Success = true;
		} else {
			Success = false;
		}
		return Success;
	}
	public String getKey(){
		String StoredKey = "";
		if (GeneralUtils.getConfigPropValue("server_key") != null){
			StoredKey = GeneralUtils.getConfigPropValue("server_key");
	    }
		return StoredKey;
	}
}
