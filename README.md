# Shoppingify Firebase

This is a reworking of a legacy DevChallenges project I completed with [React](https://github.com/jdegand/shoppingify-frontend).  I may be able to reuse some CSS styling from that project or I may start from scratch.  

## Built With

- [Angular](https://angular.dev)
- [Angular CLI](https://github.com/angular/angular-cli) version 17.3.6.
- [Angular Fire](https://github.com/angular/angularfire)

## Thoughts

- Firebase doesn't return observables.  It returns promises. You can convert the response back to an Observable with `from`.  Use `toSignal`?   
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
- Queries find documents in a single collection.  
- Root-level collections are good for many-to-many relationships.

## Continued Development

- Guards
- Tests
- Replace `getRawValue` in the register and login submit functions?  

## Useful Resources

- [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API) - IndexedDB API
- [YouTube](https://www.youtube.com/watch?v=586O934xrhQ) - Angular Firebase Authentication - Implement Auth in Minutes
- [YouTube](https://www.youtube.com/watch?v=0ihoworuX4o&t=662s) - How to Connect Firebase to Angular Project - Do It Right
- [Firebase Docs](https://firebase.google.com/docs/firestore/data-model) - data model
- [YouTube](https://www.youtube.com/watch?v=jm66TSlVtcc) - Model Relational Data in Firestore NoSQL
- [YouTube](https://www.youtube.com/watch?v=o7d5Zeic63s) - Maps, Arrays and Subcollections, Oh My! | Get to know Cloud Firestore #4
- [Stack Overflow](https://stackoverflow.com/questions/66547171/getting-timestamp-creation-date-from-firebase-doc-where-it-is-not-saved-manuall) - getting timestamp creation date from firebase doc where it is not saved manuall
- [Blog](https://www.fcodelabs.com/blogs/this-is-how-we-write-firebase-cloud-functions#:~:text=A%20collection%20name%20is%20always,the%20name%20of%20the%20collection) - this is how we write firebase cloud functions
