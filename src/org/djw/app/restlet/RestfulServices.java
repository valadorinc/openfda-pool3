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
		router.attach("/test", TestResource.class);  //Test the resource. Returns success json
		router.attach("/test/{Error}", TestResource.class);  //Test the resource. Returns error json
		router.attach("/djwTools", InfoResource.class);  
		router.attach("/fda/lookup/{lookuptype}", LookupResource.class);
		router.attach("/fda/lookup/{lookuptype}/{partial}", LookupResource.class);
		router.attach("/fda/search/reaction/{reactionlist}/{limit}", OpenFDAResource.class);
		router.attach("/fda/search/drug/{druglist}/{limit}", FDADrugResource.class);
		router.attach("/fda/chart/{ResultType}/{ThingList}", ChartResource.class);
		
		return router;
	}

}
