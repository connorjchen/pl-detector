import generateFiles.GenerateHiveFile;

import org.apache.hadoop.util.ProgramDriver;

import autodeploy.createSSH.CreateSSHTrust;
import autodeploy.createuser.CreateUser;



/**
 * liulu5
 * 2013-9-22
 */
public class HadoopToolDriver {

	/**
	 * @param args
	 */
	public static void main(String[] args) {
	    int exitCode = -1;
	    ProgramDriver pgd = new ProgramDriver();
	    try {
	    	pgd.addClass("createuser", CreateUser.class, 
	                   "Create linux user.");
	      pgd.addClass("createsshtrust", CreateSSHTrust.class, 
	                   "Create SSH trust for cluster node.");
	      pgd.addClass("generatehivefile", GenerateHiveFile.class, 
                  		"generate file for hive table.");
	      
//	      pgd.addClass("aggregatewordcount", AggregateWordCount.class, 
//	                   "An Aggregate based map/reduce program that counts the words in the input files.");
//	      pgd.addClass("aggregatewordhist", AggregateWordHistogram.class, 
//	                   "An Aggregate based map/reduce program that computes the histogram of the words in the input files.");
//	      pgd.addClass("grep", Grep.class, 
//	                   "A map/reduce program that counts the matches of a regex in the input.");
//	      pgd.addClass("randomwriter", RandomWriter.class, 
//	                   "A map/reduce program that writes 10GB of random data per node.");
//	      pgd.addClass("randomtextwriter", RandomTextWriter.class, 
//	      "A map/reduce program that writes 10GB of random textual data per node.");
//	      pgd.addClass("sort", Sort.class, "A map/reduce program that sorts the data written by the random writer.");
//	      pgd.addClass("pi", PiEstimator.class, "A map/reduce program that estimates Pi using monte-carlo method.");
//	      pgd.addClass("pentomino", DistributedPentomino.class,
//	      "A map/reduce tile laying program to find solutions to pentomino problems.");
//	      pgd.addClass("secondarysort", SecondarySort.class,
//	                   "An example defining a secondary sort to the reduce.");
//	      pgd.addClass("sudoku", Sudoku.class, "A sudoku solver.");
//	      pgd.addClass("sleep", SleepJob.class, "A job that sleeps at each map and reduce task.");
//	      pgd.addClass("join", Join.class, "A job that effects a join over sorted, equally partitioned datasets");
//	      pgd.addClass("multifilewc", MultiFileWordCount.class, "A job that counts words from several files.");
//	      pgd.addClass("dbcount", DBCountPageView.class, "An example job that count the pageview counts from a database.");
//	      pgd.addClass("teragen", TeraGen.class, "Generate data for the terasort");
//	      pgd.addClass("terasort", TeraSort.class, "Run the terasort");
//	      pgd.addClass("teravalidate", TeraValidate.class, "Checking results of terasort");
	      pgd.driver(args);
	      
	      // Success
	      exitCode = 0;
	    }
	    catch(Throwable e){
	      e.printStackTrace();
	    }
	    
	    System.exit(exitCode);
	  }

}

