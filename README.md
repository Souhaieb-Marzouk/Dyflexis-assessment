# Dyflexis-assessment
## Assessment Description:
### UI Testing Assignment:
   - The purpose is to develop some test scripts to cover the different functionalities of the following website: [Automation Testing](https://automationintesting.online/)
### API Testing Assignment:
   - The purpose is to develop some test scripts to cover the different methods interacting with the following API: [Restful Booker](https://restful-booker.herokuapp.com/apidoc/index.html)

## Installation:
- This project was developped using Visual Studio.
- Before creating the project, I installed NodeJs and Gitbash to using them during the development and executing the scripts. (I used the latest versions from the official websites)
- Here is the following commands used to create and configure the project:
```
# npm init
```
```
# npm install --save-dev cypress@12.6.0
// I started using Cypress 12.6.0 then I upgraded to 12.7.0
```
Also I installed the following plugings using Visual Studio Extensions to facilitate the coding a little bit (optional):
- ES6 Mocha Snippets
- Material Icon Theme
- Code Runner

Also I installed the "cypress-xpath" dependency so I could use the xpath as selector for few objects.
I used the following steps to install the "cypress-xpath" dependency:
   - We need to use the following Plugin: https://www.npmjs.com/package/@cypress/xpath
   - Run the following command: ```npm install --save-dev @cypress/xpath```
   - Inside the e2e.js file (Located inside the support folder), you simply need to add (Which is already done in this project):
   ```require('@cypress/xpath');```

__Notes__:
- In the "cypress.config.js" file, I added the following line to "*.js" files directly instead of "*.cy.js" ```specPattern: "cypress/e2e/**/*.{js,jsx,ts,tsx,feature}",```
As you can find some other lines related to video and screenshots:
   - It will take video of the execution in case the test cases are running successfully in Cypress Cloud (__two videos are already uploaded in the project, so you can have a look of the execution__).
   - It will take screenshots in case the test case is failing during the execution

## Usage
To run the test scripts locally, you need to execute the following command with Bash terminal:
```./node_modules/.bin/cypress open```

In this case a new window will open as the following:
![image](https://user-images.githubusercontent.com/9935463/221966610-1fd18485-bb5e-4c61-ab49-65e695d201f2.png)

Select the "E2E Testing" option then select which browser you want to use (for my case I have Chrome, Firefox, Edge and Electron)
![image](https://user-images.githubusercontent.com/9935463/221967044-f884a0e8-6865-47bb-b24e-e1c5de2de517.png)

Then, the test scripts will be displayed, and all you need to do is to select which script you want to execute:
![image](https://user-images.githubusercontent.com/9935463/221967402-6e81ddaa-8003-4c63-bfe3-d43aa09a19cd.png)

And then the execution will start immediately:
![image](https://user-images.githubusercontent.com/9935463/221968249-751283d6-d197-4f53-9a4e-fb9cdac866c4.png)
![image](https://user-images.githubusercontent.com/9935463/221970691-ff4b4c42-a4a2-4f2b-9bc8-c090673ac35c.png)

