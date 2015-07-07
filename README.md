###(A) Assign A Leader  
Valador follows the Agile Scrum methodology for design and development.  During the kick-off meeting for this Project, Valador assigned Kevin Sadeghian as the Product Owner, then worked to define the scope of the project based on the RFQ content.  Mr. Sadeghian is a Certified Scrum Product Owner (CSPO) and was provided with the authority and responsibility to complete the Project; and was held accountable for the quality and timeliness of the final prototype and accompanying artifacts.

###(B) Multidisciplinary Team 
Valador assembled a team which included the following Valador employees:

|Labor Category|GSA Labor Category|Name|
|---|---|---|
|Product Manager|Program Manager|Kevin Sadeghian|
|Technical Architect|Senior Systems Engineer|Ben Franzini|
|Interaction Designer/User Researcher/Usability Tester|Senior Developer|Philip Stroh|
|Visual Designer|Software Engineer|Paulo Ordoveza|
|Front End Web Developer|Developer|Philip Stroh, Paulo Ordoveza|
|Back End Web Developer|Developer|David White|
|DevOps Engineer|Software Engineer|David White|

Each of these individuals has different skillsets and varying years of experience. The resource estimates for each team member were calculated, factored into the project budget, documented in the project PMP and approved by Valador’s CEO to ensure availability throughout the project.

Additionally, Valador set up workspace for the duration of the project in one of our conference rooms.  The room was equipped with four computers (each with two monitors), a projector, and a whiteboard.  For the majority of the Project the team worked in the conference room and held all Sprint related meetings in the same workspace.  This allowed problems to be solved quickly and developers to collaborate when they ran into a roadblock.  This was especially important for this Project given the short duration.  Mr. Franzini was working remotely from out of state so the team utilized Skype, Webex meetings, and teleconferences to included him in the collaborative working process. 

###(C) User-Centric Prototype Design Process
Immediately following the kick-off meeting, Valador held a brief focus group with five employees who were present in the office but not involved in the project to understand what people need and determine how the openFDA data could be used.  The Project team explained the available data sets and asked the focus group what they would find useful in a system.  Several possible ideas came from the group and throughout the meeting a consensus was reached that the reactionRX was the most appropriate and useful application for the group; additionally, these same employees (focus group / Stakeholders) later evaluated the User Interface mock-ups and suggested changes that would make it easier to use and more visually appealing during the first sprint review, once a Minimum Viable Product was available.

###(D) Human-Centered Design Techniques
In addition to the focus group mentioned above, Valador involved a number of users in the prototype design to incorporate their feedback to design possible experience use cases from start to finish.  Our goal was to make a user-friendly prototype.  We interviewed users to gather real feedback. 

###(E) Design Style Guide
Valador used our internal style guide to develop the design and related artifacts. Our design team focused on creating a simple and intuitive design which was later validated through usability testing and additional focus group sessions. 

###(F) Usability Tests
During the design phase, Valador performed usability testing with the same group of 5 people who participated in the focus group following the kick-off meeting.  The group was asked to evaluate the Design prototype for usability and provided feedback that was implemented in the design and development phases of the project.  The project team frequently involved these stakeholders/people, specifically during sprint planning, sprint reviews, and ad-hoc as needed, in order to continuously have a clear understanding of their needs and requirements; feedback received from the focus groups was used to inform subsequent sprints.

###(G) Interactive Approach
Valador followed our development approach based on the Agile Scrum methodology.  This method promotes disciplined project management with frequent review of the product, involvement of stakeholders/users, and flexible adaptation of the requirements. Teamwork, self-organization, and accountability are encouraged to allow for rapid delivery of high-quality software and a business approach that aligns development with customer/user needs. Valador followed the project kick-of meeting with a user focus group to help understand what people need to ensure requirements were developed to address the whole experience, from start to finish. Our Product Owner prioritized the Product Backlog which contained features, requirements, bug fixes or other development tasks. The items in the Product Backlog were contributed by the entire team, focus group, and stakeholders but controlled by the Product Owner to set overall priorities in the development schedule. 

The “Sprint” is a development cycle where a set of items from the Product Backlog are fully completed. It begins with a Sprint Planning Meeting where the team breaks Product Backlog items down into subtasks, estimates their effort, and decides on how many Product Backlog items can be added to the Sprint backlog to be completed during a Sprint. As development takes place on the items in the Sprint Backlog, daily “standup” meetings, or scrums, are held during which each team member shares what tasks they worked on the previous day, what tasks they will work on during the current day and what impediments are preventing them from completing their tasks. The Product Owner’s (Project Manager’s) job is to remove these impediments. 
By the end of the Sprint, an operational, fully demonstrable product is created including the items that were defined in the Sprint Backlog. A Sprint Review is held with the customer to demonstrate the product, receive feedback and re-prioritize Product Backlog as necessary. If the customer is satisfied with the product of the Sprint and believes it can be used in a production environment, they can choose to make it a final release product. After the Sprint Review, the team holds a Sprint Retrospective for the purpose of process improvement including discussing what could be done better in future Sprints and making plans for implementing those improvements. A Sprint Planning Meeting follows the Retrospective and the process begins again.

This iterative approach allows the Customer to use and evaluate the system early and frequently throughout the overall schedule. Because all iterations end with a demonstrable release, the development team stays focused on producing results, and frequent reviews help ensure that the project stays on schedule.

This Project included three Sprints.  Given the short timeframe, feedback was solicited from both team members and other Valador employees (ie. Stakeholders/Users) during each Sprint.  The Product Owner was ultimately responsible for the end result.  Valador used Target Process to keep track of the requirements and tasks to be implemented in the solution. 

###(H) Multiple Devices Compatibility Using Responsive Design
Valador created a design prototype that works on any device with a web browser. Due to the short development timeframe, only Google Chrome for desktop browsers and Safari on iOS devices were tested.    The design prototype incorporates responsive design, which allows the prototype to work on mobile devices with any size screen, as long as the device is running a compatible browser. 

###(I) Technologies
Valador used the following open-source technologies in the development of the prototype:
*	Bootstrap
*	PHP
*	Google Charts
*	Ajax
*	jQuery
*	MySQL
*	Java
*	Restlet
*	Eclipse
*	Git
*	Jenkins
*	JSP
*	Tomcat

###(J) Infrastructure as a Service (IaaS)
Valador deployed the prototype on Amazon Web Services Infrastructure as a Service (IaaS).  We used EC2 servers, configured to our needs to host the development, testing, and production platforms. 

###(K) Unit Tests
Unit tests were created to test application modules and compiled into test suite which was integrated into the CI environment.  Unit test configurations are stored in a config file which is used to easily change test parameters and/or expected results when applicable.  All builds are automatically run through the test suite by the CI tool and marked as pass or fail.

###(L) Continuous Integration 
Valador chose Jenkins for our CI tool deployed on the EC2 servers which was linked to our git repository on GitHub for automatic builds when code was checked into the master branch.

###(M) Configuration Management
Valador chose git as our configuration management tool.  We made use of GitHub for the origin repository and managed branches through pull requests.  

###(N) Continuous Monitoring
Valador deployed the prototype on Amazon AWS platform which is fully FedRAMP certified. Tools like CloudWatch provide continuous monitoring of logs and metrics collection which work in concert with application frameworks to provide alarm thresholds and alerts. 


###(O) Deploy in a Container
The application is deployed as a Docker image.  Valador uploaded versions to Dockerhub. Unfortunately the site was experiencing problems so we have placed the image [here](http://pool3.valador.net/18F/valador_pool3.tar). 

###(P) Installation Documentation
Valador included an installation guide:  See [Github document](https://github.com/valadorinc/openfda-pool3/blob/master/docs/InstallGuide_pool3.txt).

###(Q)  Openly Licensed Prototype and Platforms 
The prototype and underlying platforms used to create and run the prototype are openly licensed and free of charge.  These include:  
*	Bootstrap
*	PHP
*	Google Charts
*	Ajax
*	JQuery
*	MySQL
*	AngularJS
*	Java
*	Restlet 2.x
*	Eclipse
*	Git
*	Jenkins
*	Linux



