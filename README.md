# Deploy JSON Server to Vercel with Firebase as a Database

A javascript implementation to deploy [JSON Server](https://github.com/typicode/json-server) to [Vercel](https://vercel.com), using [Firebase](https://console.firebase.google.com/) as a simple DataBase storage to allow you to run fake REST API online!

![Powered by Vercel](https://images.ctfassets.net/e5382hct74si/78Olo8EZRdUlcDUFQvnzG7/fa4cdb6dc04c40fceac194134788a0e2/1618983297-powered-by-vercel.svg)

## How to setup the project


### Firebase Realtime Database Setup

###### Create a Firebase Project
1. Login into [Firebase Console](https://console.firebase.google.com/) with your google account.
2. Click on "**Add project**" and follow the prompts to create a new project.

###### Add Realtime Database to Your Project

3. In the Firebase Console, select your project.
4. In the left-hand menu, click on "**Build**" and then "**Realtime Database**."
5. Click on "**Create Database**."
6. Select your preferred location and set the database to "**Start in test mode**" (you can change the rules later).

###### Set Up Firebase in Your Project

7. Click on the gear icon next to "**Project Overview**" and select "**Project settings**."
8. Go to the "**Service accounts**" tab.
9. Click on "**Generate new private key**" and download the JSON file. This file will be used to Authenticate the json-server app with Firebase.
**Important!**: Store the generated file in a *config* folder in your root app, or save it for later use with **environment variables**.

###### Upload your DB.json file to firebase realtime database

11. Click on the three dots on the right-hand side of the database toolbar.
12. Select "**Import JSON.**"
13. Choose your `db.json` file and click "**Open**" to upload it.

### Vercel Deployment Setup

###### Setup Vercel
1. Clone this repository.
2. Update or use the default [`db.json`](./db.json) in the repository.
3. Sign Up or login into [Vercel](https://vercel.com).
4. From the Vercel dashboard, click "**+ New Project**" then "**Import**" your repository.
5. In the "**Configure Project**" screen, configure Environment Variables. 

###### Adding Environment variables
6. Under "**Environment Variables**", add the following variables and fill the values from the generated config file in firebase. *See :[ Set Up Firebase in Your Project](#set-up-firebase-in-your-project)*
    - FIREBASE_PROJECT_ID
    - FIREBASE_PRIVATE_KEY
    - FIREBASE_CLIENT_EMAIL

7. Leave everything else default and click "**Deploy**".
8. Save and Wait until deployment is done, and your own JSON server is ready to serve!
```
Note: If you have already deployed your project to vercel:
    - Then Go to your "Vercel project dashboard".
    - Navigate to the "Settings" tab.
    - Add your "Environment Variables".

```
## Default `db.json`

```json
{
  "posts": [
    { "id": 1, "title": "json-server", "author": "typicode" },
    { "id": 2, "title": "Learning JSON", "author": "student" }
  ],
  "comments": [
    { "id": 1, "body": "some comment", "postId": 1 },
    { "id": 2, "body": "another comment", "postId": 1 },
    { "id": 3, "body": "great post!", "postId": 2 }
  ],
  "profile": { "name": "typicode" }
}
```

##  Using Json-Server

### 1. Filter 
filter by category:

    /productos?category=comida
 #### Concatenate more fields
filter by 2 categories:

     `/productos?category=comida&category=tecnologia`

### 2. _expand
Usar _expand para relaciones de uno-a-uno (one-to-one relationship).

    /requisito-requerimientos?_expand=requerimiento

#### Concatenate more fields
    /requerimientos?_expand=puesto&_expand=empresa

### 3. _embed
Usar _embed para relaciones de uno-a-varios (one-to-many relationship). Un requerimiento puede  tener varios requerimientos asociados

    /requerimientos?_embed=requisito-requerimientos

## Attribution

Part of the code in this project was adapted from **[kitloong](https://github.com/kitloong/json-server-vercel)**'s work.
## Reference

1. https://github.com/typicode/json-server
2. https://vercel.com


