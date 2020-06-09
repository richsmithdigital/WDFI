**SWD 600 AE2**

**Solent Smart Calendar**

Solent calendar is a React JS prototype smart calendar app designed to make students life easier at Solent University. Solent&#39;s industry partners [Dootrix](https://dootrix.com/), a leading mobile app developer, proposed our team with finding a modern solution with a single page web application to solve a problem students are currently facing.

The first task was to identify a problem students face a propose a solution which is documented [here](https://drive.google.com/file/d/1rWRTYK3wN6Reh5geVoi9kNMAigmcO7FI/view?usp=sharing). With this complete, I have made a high-fidelity prototype which can be viewed below and interacted with [here](https://www.figma.com/proto/Yuvx6V0nWz2ua3nLEL2sYh/Solent-Calendar?node-id=1%3A2&amp;viewport=79%2C228%2C0.12670068442821503&amp;scaling=min-zoom). This readme file documents the building process.

![](RackMultipart20200609-4-bdqz2l_html_37dd0eb6ec5c1777.png)

The app is designed to display critical information for a students day to day life, including there classes/timetable and deadlines. Solent university currently runs mostly of Microsoft for its software solutions including authentication and emails; however, it uses a product called [CMISGo](https://www.oneadvanced.com/solutions/cmis-and-cmisgo/) a university-specific solution for timetable and room booking needs. Due to CMISGo being a paid product and not having access to the products API&#39;s and most of Microsoft&#39;s Azure solutions also stuck behind a paywall, a different backend will need to be chosen.

**Project Methodology**

For managing any small or large scale project, it is essential to use a methodology to help keep you and or your team organised and on track. For this project, I chose to use the waterfall methodology, the waterfall is a linear based methodology and as suggested flows down like a waterfall in critical phases. The first phase for this project was the conception phase this encluded taking the brief from Dootrix and using the design thinking methodology to help define the problem and come up with a solution.

**Why Firebase?**

I chose to use Googles Firebase mobile and web back end solution, Firebase is hugely popular right now and has been picked for its ease of use range of built-in features including hosting authentication and real-time database. It also integrates very well with the Google Console and other Google API&#39;s such as Maps and Callendar. One of the significant advantages of Firebase is pricing; everything is effectively free for small apps, and no features are hidden behind a paywall. Unlike Microsoft&#39;s Azure, although Azure is much more powerful with its AI and broader feature set. With Firebase, its pricing is based around scalability with users only need to pay for features once an app gets more extensive and more requests are made. For this app, we will be using a few of there main features, including authentication real-time database/storage, hosting with options to use the Functions feature in the future. Due to not having access to the real university system, this app will create equivalent dummy systems using a mix of Gooogle API&#39;s Calendar, Maps and Events

**Why react?**

For this project, I chose to use React JS a Javascript library built and maintained by Facebook. React is a component-based library which can be summarised as structured building blocks, for example, the header, nav menu and text information all exist as separate components, and React renders them to make the user interface.

![](RackMultipart20200609-4-bdqz2l_html_493e2c0a1241f0c3.png)

Source: [Edureka](https://www.edureka.co/blog/react-components/)

There are a few other popular Javascript libraries I could have used such as Angular; however, I chose React for its excellent built-in state object, state allows the component to hold and re-render information dynamically on the client-side. Also because React is the most popular framework at the time of writing; this has advantages such as lots of support and documentation and an ever-growing package library with NPM allowing features to be added with ease.

**Building the App**

**Set up**

To make set up a lot easier, I started with the [Create React App](https://create-react-app.dev/docs/getting-started/) designed to make set up quick from NPM (node package manager), once this is done I run the command **npm run start** in the project directory to run a localhost development server. I will also use a few tools to make development a little easier, React developer tools is a chrome/edge plugin that gives the developer a breakdown of the app structure and other useful tools such as state. I will also use ES7 in VS code, a plugin that gives snippets to several libraries making development quicker, by auto-completing code, for example, making a new blank react component with shortcuts.

![](RackMultipart20200609-4-bdqz2l_html_c46387ce71243178.png)

Once this is done, I delete most of the boilerplate like images and stock CSS, I then organise my folder structure, create react app gets the basic done for you but is not optimised well for multiple components. I add an assets folder for my assets in the project like images and animations. I then add a config folder for files that connect to other sauces like API configs and Firebase as well for styling. I also set up a services folder specific for Firebase backend management. Finally, I set up views and components; components would hold all the individual components with the views components acting like individual web pages in React.

**Writing the Code**

Okay with all that out of the way, I can begin to write some code. So I&#39;m going to start with the Schedular using Googles Calendar API. First I need to go to the Google console find the API and get a unique API key to communicate with the service, it is worth noting you do need to set up an app in the Google console before you can get this API key. I then create a file called API config in the config folder and place the API key in there. Next, I go to Google calendar select the calendar I want to sync go into settings make sure it is set to public and get the Calendars unique ID, I place this in the config file. I declare the variables to call them to other components when needed.

![](RackMultipart20200609-4-bdqz2l_html_84985a9fb44826a7.png)

To build the component, we need to follow a structure almost like a chain of command for the components. App.js the file that is rendered in the HTML and is at the top of the structure, this will hold the styling components that are constant on all views (pages) such as the header and footer, it will also render all the views, and other vital components I will cover later. I will create my first view component called Schedule and import it into App.js, next I will create an Events component in the components file which I will import into the schedule view. In this component, I&#39;m going to need import and or install a few extra dependencies; Moment for managing dates in the browser and the GAPI library, Googles API client library for Javascript.

I next create a variable called events, set up state with in it as well as time using moment. The next function I will want to be called when the rest of the app has rendered to do this, I will set the compoentDidMount property to run at a set interval. Then define a start function calling the event, that function uses GAPI to call the API key and using my unique calendar id in the API rest URL and will initialise the javascript client. I then need to return the event taking the rest URL using the endpoint of .events which will fetch all events from the calendar.

To make my app more dynamic, I declare a state variable using an if-else statement to change the state, I then set the response for the sate. I do this with three different values of state busy, loading and empty. I then render the response first the moment time and date functions then responses to the different versions of state. Rendering an image and test response if there are no events, a custom loading image while the API is being called and the events detailed, and an image displayed if there is an event coming up. After this, I render a list of upcoming up events if there are any and add a link for users to add there own event with a simple link to the Google calendar. It is worth noting I could use the Calendar API using the events. Insert method but left it out for this demo.

![](RackMultipart20200609-4-bdqz2l_html_693cf15b20300016.png)

With the first component working, I will begin to style and structure the app, to do this, I&#39;m going to use Styled-components. Styled components allow you to use CSS and JS without relying on Class names which can cause errors and clashes, and it just helps keeps CSS separate and straightforward. I style my component using a separate tile component using a subtle floating effect with shadows. I then set my global styles, and a theme component places inside the config file. With this done, I build the header creating a new component called header and rendering it in the main app.js file, using an on click function for a sliding menu linking to all my views, with a filer user info that I will add in later.

I then create a component for the calendar directly importing the calendar from Google with a little styling, with this I add a calendar.view and render it, in the main app. Now I build my main dashboard/home, which renders both the maps and events components to give the students the most direct information.

Auth with Firebase

Now I am going to set up the Firebase authentication; this will include adding a login and signup page as well as displaying the user&#39;s login information in the header. To start, I need to set up my app in the Firebase console and grab the unique configure object and copy it into a Firebase configure file in my config folder and export it, I also enable Google and Email/Password login in the auth settings. This app is only made for individual students so all functions will need to be protected, for this I&#39;m going to build log in and sign up components, I then need to create my hooks to handle if the user is logged in or not. Finaly, I set up my route functions in the app.js file one to re-root the user back to the login if they are not logged in and second the send a logged-in user from the forum to the dash.

**Other features**

I Have some features that did not quite make it using the first prototype like a Map component while this component is live using the Maps API to show the current users location I wanted to link the events to show the calendar as data points. I used a piece of software called [Zappier](https://zapier.com/app/login?next=%2Fapp%2Fdashboard) to add the event into my firebase database; the problem was that events location uses addresses and maps relies on longitude and latitude to set places on the map. After some research, I could have solved this problem with another Google API called [Geocoding](https://developers.google.com/maps/documentation/geocoding/start?utm_source=google&amp;utm_medium=cpc&amp;utm_campaign=FY18-Q2-global-demandgen-paidsearchonnetworkhouseads-cs-maps_contactsal_saf&amp;utm_content=text-ad-none-none-DEV_c-CRE_342735903826-ADGP_Hybrid+%7C+AW+SEM+%7C+SKWS+~+Geocoding+API+EXA-KWID_43700042842851768-kwd-301485311002-userloc_1006986&amp;utm_term=KW_geocoding%20api-ST_geocoding+api&amp;gclid=EAIaIQobChMIh-TV8N_y6QIVVeDtCh1iHAHgEAAYASAAEgKTOvD_BwE) but ran out of time to implement this.

![](RackMultipart20200609-4-bdqz2l_html_68cd6f13beaf25d1.png)

**Hosting the App**

To host the app, I did plan to use Firebases hosting service; however, I ran into a few bugs there seems to be some cache issue with firebase CLI (command line interface). As seen below, the app picked up some remains of a project that no longer exists. Manually selecting the right project, installing and reinstalling the CLI and node did not solve it searching the files came up empty. Due to time constraints, I decided to host the app using a standard hosting server, which did cause the Google auth to stop working, but the email/password remains working. The answer would be to download the repo on another machine, but unfortunately, this project took place during the coronavirus pandemic that wasn&#39;t an option.

![](RackMultipart20200609-4-bdqz2l_html_2fa072b5d628ad45.png)

![](RackMultipart20200609-4-bdqz2l_html_c2d2dc77d0dee7d6.png)

![](RackMultipart20200609-4-bdqz2l_html_af278cb4836a5310.png)

**Collecting feedback**

In the initial research to this project, a survey was carried out by students for feedback on the initial design and features; this survey follows up on that with the prototype. Only 4 students of 12 opted to be contacted back for a follow-up, and 2 got back to me, so the rest were students that volunteered.

The results showed that the functionality showed good promise, 80% said they would find it useful and 20% feeling neutral. 60% of students found that the map functionality proposed to make finding new rooms easier. The design was less favourable, showing a fair room for improvement with 20% preferring the current design and there overall rating between 5-8 out of 10.

The last question simply asked would they prefer this to the current calendar, with only 30% saying yes and 50% undecided. I do believe that finishing the functionality and improving the design closer to the prototype would significantly improve those numbers.

**Finished Product**
http://richsmithdigital.com/

**Survey Results**

![](RackMultipart20200609-4-bdqz2l_html_a7a3e9ce41a5bcb6.png)

![](RackMultipart20200609-4-bdqz2l_html_1541cf5b85750dd7.png)

![](RackMultipart20200609-4-bdqz2l_html_70b1669b5103867b.png)

![](RackMultipart20200609-4-bdqz2l_html_8ae7b4a988e100ad.png)

![](RackMultipart20200609-4-bdqz2l_html_f1e5c821d99c7191.png)

![](RackMultipart20200609-4-bdqz2l_html_328a2f8b69b5edca.png)
