# University Clubs Central
University Clubs Central, is a project aimed at centralizing 
the engagement of students with university clubs and 
extracurricular activities. This digital hub seeks to gather all 
club-related information, including activities, 
announcements, and events, into a single, easily navigable 
platform. By doing so, it promises to enhance students' 

# Notes
* This project is made and intended to be used in a mobile device, therefore it is recommended to use Chrome dev tools to inspect it using a mobile preset
* This project used the **bootstrap framework**
# Application pages
In this section, we will take a look at the different pages in our application.

## Sign in/Sign up page, Index.html.
1. Our index page is the login page, you can Enter the home page using any email and any password with a length of 8 or more. Login validation will be done in the backend phase
2. Forget password button will send a password to the entered email. This will be done in the backend phase.
3. The sign-up button will open the signup form and hide the sign-in form by using the CSS property `display: none;`.
   
![image](https://github.com/Mothannahuss/SWE363-Front-End/assets/38408919/c746111c-c566-45d6-a191-f2912b522abf)
![image](https://github.com/Mothannahuss/SWE363-Front-End/assets/38408919/ea791431-5f5d-452d-8282-ee69db950059)

## interest selection
* This page opens if it's your first time signing in to your account, or directly after you sign up. **Currently only shows if you signed up using the index page**
* Interest will help our algorithm which events are suitable for our users and this feature will enhance the user's experience.
* A user should select the categories that they are most interested in.
* ![image](https://github.com/Mothannahuss/SWE363-Front-End/assets/38408919/4d17b40f-fa99-4bc9-81af-97208039ef7b)

## Home page
* This page uses javascript to swap events when clicking on my feed or explore
* `My feed` is used to catch up with clubs that you have followed and see their new events and activities.
* `Explore` will use our algorithm with the user's interest to select the most suitable events for him and show them up.

![image](https://github.com/Mothannahuss/SWE363-Front-End/assets/38408919/bfa80ebe-3f45-4c8a-8539-5ca47100e5a2)

## Header
* Our header is unified throughout the web application, the left side is used for the page title, and the right side for navigation.
* The `search button` will display a search box to search for a certain event on that page.
* `Menu`, or the navigation menu is used to navigate throughout the web application
  
  ![image](https://github.com/Mothannahuss/SWE363-Front-End/assets/38408919/3168467c-93f9-4f8d-acb2-47f29ddb1b79)

## My club page
* you can access this page using the header menu, this page will show you a list of all clubs you have followed, you can unfollow them or check them out from there.
  
  ![image](https://github.com/Mothannahuss/SWE363-Front-End/assets/38408919/e39a6834-9cd1-4bad-995a-48274583e39a)

## Saved events page
* this page uses the same script as in the home page, to swap between upcoming and all
* `Upcoming` is used to list all saved events that are yet to come. Event date > current date.
* `All` will show all events that you have events.
  
  
 ![image](https://github.com/Mothannahuss/SWE363-Front-End/assets/38408919/323072fa-3532-45ab-8ce6-b1401194f7be)

 ## Browse Page
 * You can access this page using the header menu.
 * This page is used to search for clubs, you can use categories to filter them.

  ![image](https://github.com/Mothannahuss/SWE363-Front-End/assets/38408919/3dd606e5-7372-4a73-8c28-021a6f3ed544)

  ## Notification page
  * You can access this page using the header menu.
  * This page will show you notifications regarding events of followed clubs.
  * Notifications that are seen for the first time will be in the new tab
  * Old notifications will be saved in the previous.
    
   ![image](https://github.com/Mothannahuss/SWE363-Front-End/assets/38408919/bb151a47-d773-4799-a14c-2425e8c8b4df)
   
   ## Settings page
   * Settings will enable the users to change account-specific settings, notifications, and interest settings
   * Account settings will be implemented in the backend phase as this information is linked to the database.
   * Notification is a `Checkbox` that will activate/deactivate send notification.
   * If the user likes to change his interest, this button will redirect him to a page that will make him able to do so.

![image](https://github.com/Mothannahuss/SWE363-Front-End/assets/38408919/8b7f4a8b-1e4c-435c-be48-00a25ea9f355)

   ## My profile page
   * This page is only accessible by clubs, each club will have a profile page that they can edit information in the About tab, or use to post new posts.
   * This page is identical to the profile page that the user will see, except that the follow button is changed to the `edit profile` button
   * On this page, you can open the menu and see a new button `new post` which will allow you access to the new post page.
     
   ![image](https://github.com/Mothannahuss/SWE363-Front-End/assets/38408919/1fe631db-f30d-451b-9531-4e410fc90c71)

   ## profile page
   * Each club has its page, this page is accessed by clicking a club name in an event card or from browse clubs.
   * The user can follow the club, see all the club events, check their About page, and check how many users follow that club.
     
     ![image](https://github.com/Mothannahuss/SWE363-Front-End/assets/38408919/c338086a-7c32-46ff-80a0-57f98507eb2f)
     ![image](https://github.com/Mothannahuss/SWE363-Front-End/assets/38408919/82fe4611-fb49-40f2-9140-b1e2229e4f85)
## New post page
* this page can be used by clubs to post new events.
* It uses a form that will send information the the backend server that will store the information in the database
* Clubs should use Google's form/ or any other form service that they prefer and add a registration URL that directs users to that form
  
* ![image](https://github.com/Mothannahuss/SWE363-Front-End/assets/38408919/70b29140-beba-4733-b0ad-cec01abea360)

# CSS
In this section, we will discuss various important CSS implementations

## font setting
* We uses `Inter` font family in our application
* All headers uses font weight 600 **Semi-Bold**
  
## Colors
* Background color is always `White`
* for light blue we uses `#4178f3`
* for dark blue we uses `#1b08da`








