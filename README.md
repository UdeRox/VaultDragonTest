# VaultDragonTest
Node Coding test project for VaultDragon

# Prerequisites
 NodeJs(v10.0.0), NPM(v5.6.0), MongoDB(db version v3.4.2)

# Setup
Go to the VaultDragonTest directory
> run "npm install"

# Development
This project uses the EditorConfig
http://editorconfig.org/

This project uses ESLint for source code standards
https://eslint.org/
> "npm run eslint -s"  

Code Coverage
> "npm run coverage" (Coverage report: coverage/index.html)

Run Test
> "npm test"

# Run with different environment config files
* Production : NODE_ENV=prod node server.js
* Development : nodemon server.js
* QA : NODE_ENV=qa node server.js
