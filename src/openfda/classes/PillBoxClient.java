package openfda.classes;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.URL;
import java.net.URLConnection;
import java.nio.charset.Charset;
import java.util.Enumeration;

import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;
import org.djw.app.restletresources.LookupResource;
import org.djw.tools.utils.GeneralUtils;
import org.json.JSONException;
import org.json.JSONObject;
import org.json.JSONStringer;
import org.restlet.data.MediaType;
import org.restlet.ext.json.JsonRepresentation;
import org.restlet.representation.Representation;
import org.restlet.resource.ClientResource;
/**
 * 
 * @author dwhite
 *
 */
public class PillBoxClient {
	final static Logger logger = Logger.getLogger(LookupResource.class);

	/**
	 * RestClient is used to consume restful services.
	 */
	public PillBoxClient(){}
	
	/**
	 * Posts data to a restful service.
	 * @param ServiceURI String
	 * @param req HttpServletRequest
	 * @return JSONObject
	 * @throws JSONException
	 * @throws IOException
	 */
//	public JSONObject postService(String ServiceURI, HttpServletRequest req) throws JSONException, IOException{
//		JSONObject replyJson = new JSONObject();
//		JSONStringer jsRequest = new JSONStringer();
//		JSONStringer js = new JSONStringer();
//	    String ServiceURL = "";
//	    if (GeneralUtils.getConfigPropValue("dailymed_service") != null){
//	    	ServiceURL = GeneralUtils.getConfigPropValue("dailymed_service");
//	    }
//
//		try {
//			js.object();
//			jsRequest.object();
//			Enumeration<?> en = req.getParameterNames();
//	        while (en.hasMoreElements()) {
//	            String paramName = (String) en.nextElement();
//	            String paramVal = req.getParameter(paramName);
//	            jsRequest.key(paramName).value(paramVal);
//	        }
//			jsRequest.endObject();
//			js.key("request").value(jsRequest);
//			js.endObject();
//		} catch (JSONException e1) {
//			e1.printStackTrace();
//		}
//		ClientResource requestResource = new ClientResource(ServiceURL + ServiceURI);
//		Representation rep;
//		rep = new JsonRepresentation(js);
//		rep.setMediaType(MediaType.APPLICATION_JSON);
//		Representation reply = requestResource.post(rep);
//		String replyText = reply.getText();
//		reply.write(System.out);
//		if (reply.getMediaType().equals(new MediaType("application/json"))) {
//			JSONObject jsObj = new JSONObject(replyText);
//			replyJson = jsObj;
//		}
//		reply.release();
//		return replyJson;
//	}
	
	/**
	 * Gets data from a restful service using http get
	 * @param ServiceURI
	 * @return JSONObject
	 * @throws JSONException
	 * @throws IOException
	 */
	public String getService(String ServiceURI) throws JSONException, IOException{
		JSONObject replyJson = new JSONObject();
	    String ServiceURL = "";
	    if (GeneralUtils.getConfigPropValue("pillbox_service") != null){
	    	ServiceURL = GeneralUtils.getConfigPropValue("pillbox_service");
	    }
	    String myURL = ServiceURL + ServiceURI;

	    String urlString = ServiceURL + ServiceURI;
	    URL url = new URL(urlString);
	    URLConnection conn = url.openConnection();
	    InputStream is = conn.getInputStream();
	    
	    String reply = is.toString();
	    		
logger.debug("Requested URL:" + myURL);
//		StringBuilder sb = new StringBuilder();
//		URLConnection urlConn = null;
//		InputStreamReader in = null;
//		try {
//			URL url = new URL(myURL);
//			urlConn = url.openConnection();
//			if (urlConn != null)
//				urlConn.setReadTimeout(60 * 1000);
//			if (urlConn != null && urlConn.getInputStream() != null) {
//				in = new InputStreamReader(urlConn.getInputStream(),
//						Charset.defaultCharset());
//				BufferedReader bufferedReader = new BufferedReader(in);
//				if (bufferedReader != null) {
//					int cp;
//					while ((cp = bufferedReader.read()) != -1) {
//						sb.append((char) cp);
//					}
//					bufferedReader.close();
//				}
//			}
//		in.close();
//		} catch (Exception e) {
//			throw new RuntimeException("Exception while calling URL:"+ myURL, e);
//		} 
 
//		try {
//			String sResponse = sb.toString();
////			String newline = System.getProperty("line.separator");
////			sResponse = sResponse.replace(newline, "");
//			replyJson = new JSONObject(sResponse);
//		} catch (Exception ex){
//			logger.fatal("unable to parse json: " + ex);
//		}

		return reply;
	}

}
