# README #

This boilerplate is still quite messy. But its because of need to test every functionality. 
Let's say this is Beta version. 

But we are at the end, so we will clean project files in nearest feature. 


## Technology Stack ##

List of the technlogies used and tested in this boilerplate:

1. SASS
2. PUG
3. ES6
4. TypeScript
5. jQuery
6. Bootstrap
7. Font-awesome


## How it's working? ##

After runing `npm run dev` or `npm run prod` files from `src` folder will go to the `dist` folder. 
And from this output folder, webpage should be viewed in the browser.


If you will have to create new files, just put them all into `src` folder ( and proper subfolder ;) )


## How to run ##

1. Clone repo
2. Run these commends in terminal:
    1. `npm install`
    2. `npm run dev`      
    3. `npm run serv`
    4. `npm run prod`


There are other npm scripts available in `package.json`:
```
npm run dev            ## To get developers version ( no minimalizing CSS )
npm run serv           ## For working with server build ( live reload with HMR )
npm run clean          ## Just clean 'prod' folder
npm run prod           ## To get the producion version, fully optimized
```

As mentioned before, all these scripts are available in the `package.json` file



### Workflow ###

As default, you should write in TypeScript. 

Main file is `entry.ts` located in `/src/ts/` path.

You can import other TypeScript or pure JS files into this main file.


But if you preffer to use only ES6 from begginig, you can change this easily:
* Open file `webpack.config.js`
* Find object `entry` 
* You can change main (`entry.ts`) file to `./src/js/entry.js` or add new one and provide propper path.