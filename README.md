# Shoppingify Firebase

This is a reworking of a legacy [DevChallenges](https://legacy.devchallenges.io/challenges/mGd5VpbO4JnzU6I9l96x) project I completed with [React](https://github.com/jdegand/shoppingify-frontend).

## Built With

- [Angular](https://angular.dev)
- [Angular CLI](https://github.com/angular/angular-cli) version 17.3.6.
- [Angular Fire](https://github.com/angular/angularfire)
- [PrimeNG](https://primeng.org)

## Thoughts

- Firebase doesn't return observables.  It returns promises. You can convert the response to an Observable with `from`.  Use `toSignal`?   
- Angular Fire does a lot of the work for you.  
- Firebase uses `IndexedDB` to store a key to remember the logged-in user. 
- Cloud Firestore is schemaless.   
- If you want to delete documents in subcollections when deleting a parent document, you must do so manually.
- Firebase doesn't return the whole object of newly saved objects.
- Need to do a lot of planning and prototyping of data structure in Firebase, as you are billed by the number of reads and writes you perform.
- You have to balance query efficiency, data consistency, data duplication, and scalability.  
- "Snippet" fields can be a useful way to limit reads, but you can run into syncing issues.  
- Queries find documents in a single collection only.  
- You can't retrieve a partial document.  
- You can't easily delete subcollections.  
- Queries are shallow. 
- Root-level collections are good for many-to-many relationships.
- PrimeNG has some chart functionality so that is one reason I decided to use it instead of Angular Material.
- PrimeNG menu components have limited vertical orientation options.  It would be nice to have `orientation` available to all menus, but I believe animations would break if you try to use most menu components in a vertical position. See this [Github discussion](https://github.com/orgs/primefaces/discussions/1134) for the limitations of the `TabMenu` component. 
- `MegaMenu`, `TieredMenu`, and `Dock` can be used vertically.
- Adding a `tooltip` to `MenuItems` in the `TieredMenu` component does not work?  I looked in the source code and the TieredMenu component has the `pTooltip` directive.  
- You can't use a `title` attribute for a tooltip either.  See this [Github issue](https://github.com/primefaces/primeng/issues/14217).
- `Object.keys` does not work inside an Angular template.
- Could use a sidepanel or a modal for the new item form.  
- Since I am using a dropdown for the category input and it is the last input of the form, it might not be good to use a modal for the form.
- Use a router-outlet for the cart and the new item form?  An advantage of using router outlet would be always having a correct URL path.
- The original DevChallenges design does not take into account mobile design.  Having separate URL paths would help translate the design to mobile.
- Used CSS layers to have a CSS reset without overwriting the PrimeNG component styles.  
- Could use nested document references for the category field.  Since I always need that data, I don't think that would be a good idea.  I need to look more into populating document references with Firebase, but it doesn't seem as easy as Mongoose with its `populate` function.
- Firebase doesn't recommend saving arrays.  I would want to save an array of items and a name for the shopping list object.  In the prior app, past shopping lists are not allowed to be updated so the drawbacks of arrays really does not apply.  
- If I were to allow lists to be edited, I would need to change how I am saving the list items.  Then a user can update the status of an item (purchased or not).
- When the input loses focus, there will be text overlap caused by the PrimeNG `FloatLabel`.  Might look into replacing it or maintaining focus on the input when there is any text in the input.
- I included a simple bar chart to see the total amount of items needed from all lists.  
- I need to look into filtering items based on saved list date.  
- AngularFire documentation is quite poor.  Issues have been filed, but not much has been done in years.  Issues get closed and the documentation stays outdated.  Even the official firebase website documentation seems outdated. 
- This [issue about documentation](https://github.com/angular/angularfire/issues/3110) opened in 2022 does not even seemed to have been looked at by a core maintainer.  This [issue](https://github.com/angular/angularfire/issues/3446) makes it plain that Google is not treating AngularFire as a core library.

## Continued Development

- PrimeFlex?  Using CDN temporarily -> if I keep it, I will install it properly.
- TypeScript fixes
- ESLint
- Tests
- Replace `getRawValue` in the register and login submit functions?  
- Lists need a status -> active or completed.

## Useful Resources

- [Blog](https://piccalil.li/blog/a-more-modern-css-reset/) - CSS Reset
- [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API) - IndexedDB API
- [YouTube](https://www.youtube.com/watch?v=586O934xrhQ) - Angular Firebase Authentication - Implement Auth in Minutes
- [YouTube](https://www.youtube.com/watch?v=0ihoworuX4o&t=662s) - How to Connect Firebase to Angular Project - Do It Right
- [Firebase Docs](https://firebase.google.com/docs/firestore/data-model) - data model
- [YouTube](https://www.youtube.com/watch?v=jm66TSlVtcc) - Model Relational Data in Firestore NoSQL
- [YouTube](https://www.youtube.com/watch?v=o7d5Zeic63s) - Maps, Arrays and Subcollections, Oh My! | Get to know Cloud Firestore #4
- [Stack Overflow](https://stackoverflow.com/questions/66547171/getting-timestamp-creation-date-from-firebase-doc-where-it-is-not-saved-manuall) - getting timestamp creation date from firebase doc where it is not saved manuall
- [Blog](https://www.fcodelabs.com/blogs/this-is-how-we-write-firebase-cloud-functions#:~:text=A%20collection%20name%20is%20always,the%20name%20of%20the%20collection) - this is how we write firebase cloud functions
- [YouTube](https://www.youtube.com/watch?v=QZlV3029dFk) - Angular 17 Crud Operation with Firebase
- [Medium](https://medium.com/@haseenakhader.uk/angular-reactive-form-using-primeng-and-its-validation-8baf6b9e7ed4) - angular reactive form using primeng and its validation
- [BezKoder](https://www.bezkoder.com/angular-16-firebase-crud/) - angular 16 firebase crud
- [Blog](https://www.djamware.com/post/5b74e54f80aca74669894413/ionic-angular-tutorial-firebase-realtime-crud-mobile-app#add-list) - ionic angular tutorial firebase realtime crud mobile app
- [YouTube](https://www.youtube.com/watch?v=Dn1AzYfeotA) - Basic To-Do App using AngularFire v17 Compat
- [Firebase Docs](https://firebase.google.com/docs/firestore/manage-data/enable-offline) - enable offline
- [Github Docs](https://github.com/angular/angularfire/blob/master/docs/version-7-upgrade.md) - angularfire version 7 upgrade
- [Github](https://github.com/aaronksaunders/angular-fire-crud) - angular fire crud
- [Medium](https://medium.com/@haseenakhader.uk/angular-reactive-form-using-primeng-and-its-validation-8baf6b9e7ed4) - angular reactive form using primeng and its validation
- [Forum](https://www.webdesignerforum.co.uk/topic/47379-should-a-button-go-inside-or-outside-a-fieldset/) - should a button go inside or outside a fieldset
- [Github](https://github.com/primefaces/primeng/issues/13496) - Menu & TrieredMenu - add option to inject custom icons by template or model #13496
- [Reddit](https://www.reddit.com/r/Angular2/comments/1090x9c/ngdeep_alternatives/?rdt=52856) - ngdeep alternatives
- [Stack Overflow](https://stackoverflow.com/questions/35534959/access-key-and-value-of-object-using-ngfor) - access key and value of object using ngfor
- [Stack Overflow](https://stackoverflow.com/questions/31490713/iterate-over-object-in-angular) - iterate over object in angular
- [Stack Overflow](https://stackoverflow.com/questions/78023327/how-to-iterate-over-object-in-angular-17-with-new-for) - how to iterate over object in angular 17 with new for
- [Stack Overflow](https://stackoverflow.com/questions/16174182/typescript-looping-through-a-dictionary) - typescript looping through a dictionary
- [Stack Overflow](https://stackoverflow.com/questions/47834222/display-map-content-in-angular-4-template) - display map content in angular 4 
- [Dev.to](https://dev.to/imkrunalkanojiya/firebase-v9-firestore-adddoc-and-setdoc-method-examples-nhe) - firebase v9 firestore adddoc and setdoc method examples
- [YouTube](https://www.youtube.com/watch?v=6W6gycuhiN0&t=4110s) - Signals Unleashed: The Full Guide
- [Github](https://github.com/DeborahK/Angular-Signals) - Angular Signals
- [YouTube](https://www.youtube.com/watch?v=BepIvG91GzM&t=494s) - How I imported a local JSON into a Firestore collection.
- [Stack Overflow](https://stackoverflow.com/questions/42041531/save-array-of-object-to-firebase-without-getting-0-1-2-as-key) - save array of object to firebase without getting 0 1 2 as key
- [Stack Overflow](https://stackoverflow.com/questions/48446261/force-routerlink-to-refresh-component) - force routerlink to refresh component
- [Github](https://github.com/angular/angularfire/blob/master/site/src/auth/route-guards.md) - angularfire route guards
- [Dev.to](https://dev.to/jdgamble555/angular-12-with-firebase-9-49a0) - angular 12 with firebase 9