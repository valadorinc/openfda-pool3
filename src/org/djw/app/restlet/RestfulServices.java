package org.djw.app.restlet;

import org.djw.app.restletresources.*;
import org.restlet.Application;
import org.restlet.Restlet;
import org.restlet.routing.Router;
/**
 * 
 * @author dwhite
 *
 */
public class RestfulServices extends Application {
	@Override
	public synchronized Restlet createInboundRoot() {
		Router router = new Router(getContext());
//		router.attach("/login/{userName}/{password}", LoginResource.class);
//		router.attach("/user/{userID}", UserResource.class);
//		router.attach("/sales", SalesTestResource.class);
//		router.attach("/orders/{ClientID}", OrderResource.class);
//		router.attach("/orders/{ClientID}/{OrderID}", OrderResource.class);
//		router.attach("/customer", CustomerResource.class);
//		router.attach("/customer/{CustomerID}", CustomerResource.class);		
//		router.attach("/json", jsonResource.class);
//		router.attach("/tabletest", TableTestResource.class);
//		router.attach("/bp", BPResource.class);
//		router.attach("/bp/{chart}",BPResource.class);
		router.attach("/test", TestResource.class);  //Test the resource. Returns success json
		router.attach("/test/{Error}", TestResource.class);  //Test the resource. Returns error json
		//router.attach("/testdbobjectchart", TestDBObjectChartResource.class);  //Test the dbobject resource.
		router.attach("/adhoc", AdHocDBResource.class);
		router.attach("/format/{format}/{sql}", FormatTestResource.class);  
		router.attach("/djwTools", InfoResource.class);  
		
		router.attach("/fda/lookup/{lookuptype}", LookupResource.class);
		router.attach("/fda/search/reaction/{reactionlist}/{limit}", OpenFDAResource.class);
		router.attach("/fda/search/drug/{druglist}/{limit}", FDADrugResource.class);
		
		return router;
	}

}
