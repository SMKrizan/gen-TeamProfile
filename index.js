// access npm modules
const inquirer = require('inquirer');

// an empty array is created to hold data for a newly initialized team.
const teamData = [];

// file generation
const generateHTML = require('./src/roster-template.js');
const { writeFile, copyFile } = require('./utils/generateRoster.js');
// generateHTML.printData(teamData);

// access core library modules
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const Manager = require('./lib/Manager');


// user content required for new team initialization
const initializeTeam = () => {
    console.log(`
    ============================================
    Answer these questions to set up a new team:
    ============================================
    `)

    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: "Team manager's name (required): ",
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log("Please enter the team manager's name");
                    return false;
                }
            }
        },
        {
            type: 'number',
            name: 'id',
            message: "Team manager's employee ID (required): ",
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log("Please enter the team manager's employee ID");
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'email',
            message: "Team manager's employee email (required): ",
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log("Please enter the team manager's employee email");
                    return false;
                }
            }
        },
        {
            type: 'number',
            name: 'office',
            message: "Team manager's office number (required): ",
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log("Please enter the team manager's office number");
                    return false;
                }
            }
        }
    ])
        .then(managerData => {
            const manager = new Manager(managerData.name, managerData.id, managerData.email, managerData.office)
            teamData.push(manager)
            addOrFinalize()
        })
};
initializeTeam()

const addOrFinalize = () => {
    return inquirer
        .prompt([
            {
                type: 'list',
                name: 'addOrComplete',
                message: 'Would you like to add a team member or finalize this team?',
                choices: ['Engineer', 'Intern', 'Finalize team']
            }
        ])
        .then(selection => {
            if (selection.addOrComplete === 'Engineer') {
                addEngineer();
            } else if (selection.addOrComplete === 'Intern') {
                addIntern();
            } else {
                finalizeTeam();
            }
        })
};

// captures data returned from 'initializeTeam' and calls itself recursively for as many team members required
const addEngineer = engineerData => {
    console.log(`
    ====================================================
    Answer the following to add an Engineer to the team:
    ====================================================
    `);

        // If this the the first project being entered, an array for holding 'project' data is created. Otherwise, added projects will be added to existing array property.
        if (!teamData.engineerData) {
            teamData.engineerData = [];
        }

    return inquirer
        .prompt([
            {
                type: 'input',
                name: 'name',
                message: "Engineer's name: ",
                validate: nameInput => {
                    if (nameInput) {
                        return true;
                    } else {
                        console.log("Please enter engineer's name.");
                        return false;
                    }
                }
            },
            {
                type: 'number',
                name: 'id',
                message: "Engineer's employee ID (required): ",
                validate: nameInput => {
                    if (nameInput) {
                        return true;
                    } else {
                        console.log("Please enter engineer's employee ID.");
                        return false;
                    }
                }
            },
            {
                type: 'input',
                name: 'email',
                message: "Engineer's employee email (required): ",
                validate: nameInput => {
                    if (nameInput) {
                        return true;
                    } else {
                        console.log("Please enter Engineer's employee email.");
                        return false;
                    }
                }
            },
            {
                type: 'input',
                name: 'github',
                message: "Engineer's GitHub username (required): ",
                validate: nameInput => {
                    if (nameInput) {
                        return true;
                    } else {
                        console.log("Please enter Engineer's GitHub username.");
                        return false;
                    }
                }
            }
        ])
        // new member data is pushed to the 'teamData' array and a final dataset is returned to 'initializeTeam' as 'teamData'
        .then(engineerData => {
            const engineer = new Engineer(engineerData.name, engineerData.id, engineerData.email, engineerData.github)
            teamData.engineerData.push(engineer)
            console.log('engineerData:', engineerData)
            console.log('engineer:', engineer)
            addOrFinalize()
        })
}

const addIntern = internData => {
    console.log(`
    ====================================================
    Answer the following to add an Intern to the team:
    ====================================================
    `);

    // If this the the first project being entered, an array for holding 'project' data is created. Otherwise, added projects will be added to existing array property.
    if (!teamData.internData) {
        teamData.internData = [];
    }

    return inquirer
        .prompt([
            {
                type: 'input',
                name: 'name',
                message: "Intern's name: ",
                validate: nameInput => {
                    if (nameInput) {
                        return true;
                    } else {
                        console.log("Please enter intern's name");
                        return false;
                    }
                }
            },
            {
                type: 'number',
                name: 'id',
                message: "Intern's employee ID (required): ",
                validate: nameInput => {
                    if (nameInput) {
                        return true;
                    } else {
                        console.log("Please enter intern's employee ID");
                        return false;
                    }
                }
            },
            {
                type: 'input',
                name: 'email',
                message: "Intern's employee email (required): ",
                validate: nameInput => {
                    if (nameInput) {
                        return true;
                    } else {
                        console.log("Please enter Intern's employee email");
                        return false;
                    }
                }
            },
            {
                type: 'input',
                name: 'school',
                message: "Intern's school (required): ",
                validate: nameInput => {
                    if (nameInput) {
                        return true;
                    } else {
                        console.log("Please enter intern's school");
                        return false;
                    }
                }
            }
        ])
        // new member data is pushed to the 'teamData' array and a final dataset is returned to 'initializeTeam' as 'teamData'
        .then(internData => {
            const intern = new Intern(internData.name, internData.id, internData.email, internData.school)
            teamData.internData.push(intern)
            console.log('internData:', internData)
            console.log('intern:', intern)
            addOrFinalize()
        })
}

// passes final input array for page generation
function finalizeTeam() {
    console.log(teamData)
    // data passes to 'roster-template.js' which integrates the data into a string of HTML...
    const integrateData = generateHTML(teamData)
    // ...which is then written to file via 'generateRoster.js'
    writeFile(integrateData)
        .then(console.log("Your roster has been created."))
    copyFile(integrateData)
        .then(console.log("The stylesheet has been applied."))
}


// const mockData = [
//     new Manager(
//         'Eve Jones',
//         34567,
//         'ejones@work.org',
//         1234
//     ),
//     new Engineer(
//         'Tom Jones',
//         12334,
//         'tjones@work.org',
//         'tjones'
//     ),
//     new Engineer(
//         'Elsa Tomay',
//         12674,
//         'etomay@work.org',
//         'etomay'
//     ),
//     new Intern(
//         'Jules Verne',
//         78901,
//         'jverne@work.org',
//         'University of Wisconsin'
//     )
// ]


// function finalizeTeam() {
//     console.log(teamData)
//     const integrateData = generateHTML(teamData)
//     writeFile(integrateData)
// }

// finalizeTeam();
// const teamData = mockData;

// const generateHTML = require('./src/roster-template.js');
// const { writeFile, copyFile } = require('./utils/generateRoster.js');
