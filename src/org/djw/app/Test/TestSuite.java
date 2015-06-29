package org.djw.app.Test;

import java.util.ArrayList;

public class TestSuite {

	public static void main(String[] args) {
		boolean RunSilent = true;
		boolean runTest = false;
		String TestResult = "FAIL";
		int TotalTested = 0;
		int TotalPassed = 0;
		int TotalFailed = 0;

		if (args.length <= 0){
			System.out.println("usage: TestSuite [configFile] [-options] ([testModule])");
			System.out.println("options: -s  silent. only returns overall result");
			System.out.println("options: -v  verbose. returns human readable output.");
			runTest = false;
		} else {
			runTest = true;
		}
		try{
			String opt = args[1];
			if (opt.equals("-s")){
				RunSilent = true;
			}
			if (opt.equals("-v")){
				RunSilent = false;
			}
		} catch (Exception x){
		}

		if (runTest){
			if (!RunSilent) System.out.println("================== ApplicationRx Test Suite ==================");
			try{
				String ConfigFile = args[0]; 
				Config config = new Config();
				String ServerKey = config.getConfigValue(ConfigFile, "server_key");
				String ServiceURL = config.getConfigValue(ConfigFile, "service_url");
				ArrayList<String> FailedModules = new ArrayList<String>();
				
				String TestLookupPartial = config.getConfigValue(ConfigFile, "test_lookup_partial");
				String TestLookupMatch = config.getConfigValue(ConfigFile, "test_lookup_match");
				TestLookup testLookup = new TestLookup();
				String TestLookupURL = ServiceURL + "/fda/" + ServerKey + "/lookup/drugs/" + TestLookupPartial;
				boolean testDrugPartial = testLookup.testDrugPartial(TestLookupURL, TestLookupPartial, TestLookupMatch);
				TotalTested++;
				if (testDrugPartial){
					TotalPassed++;
				} else {
					TotalFailed++;
					FailedModules.add("testLookup");
				}
				
				
				if (TotalFailed == 0) TestResult = "PASS";
				if (!RunSilent) System.out.println("================== Statistics ==================");
				if (!RunSilent) System.out.println("Modules Tested: " + TotalTested);
				if (!RunSilent) System.out.println("Modules Passed: " + TotalPassed);
				if (!RunSilent) System.out.println("Modules Failed: " + TotalFailed);
				if (!RunSilent && TotalFailed > 0) System.out.println("Failed Modules: " + FailedModules.toString());
			} catch (Exception e){
				System.out.println("TestSuite: an error has occurred: " + e);
				TestResult = "FAIL";
			}
		}
		if (RunSilent) {
			System.out.println(TestResult);
		} else {
			System.out.println("OVERALL RESULT: " + TestResult);
		}
	}

}
