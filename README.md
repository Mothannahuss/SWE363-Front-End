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
In this section we will take a look about the different pages in our application.

## Sign in/Sign up page, Index.html.
1. Our index page is the login page, you can Enter the home page using any email and any password with length of 8 or more. Login valdiation will be done in the backend phase
2. Forget password button will send a password to the entered email. This will be done in the backend phase.
3. Sign up button will open the sign up form and hide the sign in form with using the css property `display: none;`.
   
![image](https://github.com/Mothannahuss/SWE363-Front-End/assets/38408919/c746111c-c566-45d6-a191-f2912b522abf)
![image](https://github.com/Mothannahuss/SWE363-Front-End/assets/38408919/ea791431-5f5d-452d-8282-ee69db950059)

## interest selection
* This page opens if it's your first time signing in to your account, or directly after you sign up. **currently only shows if you signed up using the index page**
* Interest will help our algorithm which events are suitable for our users and this feature will enhance users experiance.
* A user should select the categories that they are most interested in.
* ![image](https://github.com/Mothannahuss/SWE363-Front-End/assets/38408919/4d17b40f-fa99-4bc9-81af-97208039ef7b)

## Home page
* This page uses javascript to swap event when clicking on my feed or explore
* `My feed` is used to catch up with clubs that you have followed and see their new events and activites.
* `Explore` will uses our algorithm with the users interest to select the most suitable events for him and show it up.

![image](https://github.com/Mothannahuss/SWE363-Front-End/assets/38408919/bfa80ebe-3f45-4c8a-8539-5ca47100e5a2)

## Header
* Our header is unified throughout the web application, the left side used for the page title and the right side for navigation.
* The `search button` will diplay a search box to search for a certain event in that page.
* `Menu`, or the navigation menu is used to nevigated throughout the web application
  
  ![image](https://github.com/Mothannahuss/SWE363-Front-End/assets/38408919/3168467c-93f9-4f8d-acb2-47f29ddb1b79)

## My club page
* you can access this page using the header menu, this page will show you a list of all clubs you have followed, you can unfollow them or check them out from there.
  
  ![image](https://github.com/Mothannahuss/SWE363-Front-End/assets/38408919/e39a6834-9cd1-4bad-995a-48274583e39a)

## Saved events page
* this page uses the same script as in the home page, to swap between upcoming and all
* `Upcoming` is used to list all saved event that is yet to come. Event date > current date.
* `All` will shows all event that you have events.
* 
  
 ![image](https://github.com/Mothannahuss/SWE363-Front-End/assets/38408919/323072fa-3532-45ab-8ce6-b1401194f7be)

 ## Browse Page
 * You can access this page using the header menu.
 * This page is used to search for clubs, you can use categories to filter them.

  ![image](https://github.com/Mothannahuss/SWE363-Front-End/assets/38408919/3dd606e5-7372-4a73-8c28-021a6f3ed544)

  ## Notification page
  * You can access this page using the header menu.
  * This page will show you notification regard events of follwed clubs.
  * Notification that are seen for the first time will be in the new tab
  * Old notification will be saved in previous.
    
   ![image](https://github.com/Mothannahuss/SWE363-Front-End/assets/38408919/bb151a47-d773-4799-a14c-2425e8c8b4df)





