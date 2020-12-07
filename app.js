const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const employeeQuestions = [
  {
    name: "name",
    message: "Name?"
  },
  {
    name: "id",
    message: "Id?"
  },
  {
    name: "email",
    message: "Email?"
  },
  {
    name: "type",
    type: "list",
    choices: ["Manager", "Engineer", "Intern"],
    message: "Employee type?"
  }
]

const managerQuestions = [
   {
     name: "officeNumber",
     message: "Office #?"
   }
]

const engineerQuestions = [
   {
     name: "github",
     message: "Github acc?"
   }
]

const internQuestions = [
   {
     name: "school",
     message: "School?"
   }
]

const doneQuestion = [
    {
        type: "confirm",
        name: "done",
        message: "Done adding?"
    }
]

async function getEmployeeData() {
  var employees = [];
  var done = false;

  while (!done) {
      var employeeData = await inquirer.prompt(employeeQuestions);
      var name = employeeData["name"];
      var type = employeeData["type"];
      var id = employeeData["id"];
      var email = employeeData["email"];
      if (type == "Manager") {
         var managerData = await inquirer.prompt(managerQuestions);
         employees.push(new Manager(name, id, email, managerData.officeNumber));
      } else if (type == "Engineer") {
        var engineerData = await inquirer.prompt(engineerQuestions);
        employees.push(new Engineer(name, id, email, engineerData.github));
      } else {
        var internData = await inquirer.prompt(internQuestions);
        employees.push(new Intern(name, id, email, internData.github));
      }
      var doneData = await inquirer.prompt(doneQuestion);
      done = doneData.done;
  }

  return employees;
}

async function init() {
  var employees = await getEmployeeData();
  const output = await render(employees);
  fs.writeFile("./team.html", output, function (err) {
      if (err) return console.log(err);
  });
}

init();
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
