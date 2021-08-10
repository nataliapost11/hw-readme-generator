// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs');
const generateMarkdown = require('./utils/generateMarkdown');

// Create an array of questions for user input
const questions = [
    {
        type: 'input',
        name: 'title',
        message: 'What is title of your projec?',
    },
    {
        type: 'input',
        name: 'description',
        message: 'Enter your project description',
    },
    {
        type: 'input',
        name: 'installInstructions',
        message: 'Enter the installation instructions',
    },
    {
        type: 'input',
        name: 'appUsage',
        message: 'Enter the usage information',
    },
    {
        type: 'input',
        name: 'howToContribute',
        message: 'Enter the contribution guidelines',
    },
    {
        type: 'input',
        name: 'testInstructions',
        message: 'Enter the test instructions',
    },
    {
        type: 'list',
        message: 'Choose a license type for the application',
        name: 'licenseType',
        choices: ['MIT', 'Apache 2.0', 'MPL 2.0'],
    },
    {
        type: 'input',
        name: 'gitHubUser',
        message: 'What is your GitHub username?',
    },
    {
        type: 'input',
        name: 'userEmail',
        message: 'What is your email address?',
        validate: function (email) {
            // Regex mail check (return true if valid mail)
            const isValid = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+([^<>()\.,;:\s@\"]{2,}|[\d\.]+))$/.test(email);
            return isValid ? true : "Enter a valid email address";
        }
    }
];

// Function to write README file
function writeToFile(fileName, data) { 
    const content = generateMarkdown(data);
    fs.writeFile(fileName, content, (err) =>
        err ? console.log(err) : console.log('Success!')
    );
}

// Function to initialize app
function init() {
    inquirer
        .prompt(questions)
        .then((data) => {
            const filename = `README.md`;
            writeToFile(filename, data);
        });
}

// Function call to initialize app
init();