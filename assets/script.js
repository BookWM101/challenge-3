// Get a reference to the #add-employees-btn element
const addEmployeesBtn = document.querySelector('#add-employees-btn');

// Collect employee data
const collectEmployees = () => {
  console.log("checking for employees...");
  const employeeList = window.localStorage.getItem("employeeList") || []
  console.log(employeeList);
  if (employeeList.length <= 0) {
    console.log("no employees yet!");
  }

  return employeeList;
}

const createNewEmployee = () => {
  // TODO: Get user input to create and return an array of employee object//
  const employee = {
    firstName: prompt("What's your first name?"),
    lastName: prompt("What's your last name?"),
    salary: prompt("What's your yearly salary?"),
  }
  //  return employeeTable.push(employee); //Asking and typing in employee works, but it won't show the employee on the screen!//
  if (!employee.firstName || !employee.lastName || !employee.salary) {
    alert("Invalid employee Detected, pleae try again!");
    return
  }

  if (employee.firstName.length < 3 && employee.firstName.length > 40 || employee.lastName.length < 3 && employee.lastName.length > 40) {
    alert("First name and last name must be greater than three an less than 40!");
    return
  }

  const parseSalary = Number.parseFloat(employee.salary);
  console.log(parseSalary);
  if (typeof parseSalary !== "number") {
    alert("Salary is not a valid number, please input an actual number!");
    return
  }

  employee.salary = parseSalary;
  return employee;
}

// Display the average salary // HAVEN'T FINISHED YET, NEED TO ADD A FOR LOOP! //
const displayAverageSalary = () => { 
  const employeesList = collectEmployees();
  let sum = 0;
  for (let i = 0; i < employeesList.length; i++) {
    const currentEmployee = employeesList[i];
    sum+=currentEmployee.salary;
    console.log(sum);
  }
  // TODO: Calculate and display the average salary//
  console.log(employeesList);
  const averageCalculated = sum / employeesList.length;
  console.log({averageCalculated});
  // const average = (sum) => {
  // }
  //console.log(average());
};
console.log(displayAverageSalary());

// Select a random employee
const getRandomEmployee = (employeesArray) => {
  // TODO: Select and display a random employee
  return employeesArray[Math.floor(Math.random() * employeesArray.length)];
}

/*
  ====================
  STARTER CODE
  Do not modify any of the code below this line:
*/

// Display employee data in an HTML table
const displayEmployees = (employeesArray) => {
  // Get the employee table
  const employeeTable = document.querySelector('#employee-table');

  // Clear the employee table
  employeeTable.innerHTML = '';

  // Loop through the employee data and create a row for each employee
  for (let i = 0; i < employeesArray.length; i++) {
    const currentEmployee = employeesArray[i];

    const newTableRow = document.createElement("tr");

    const firstNameCell = document.createElement("td");
    firstNameCell.textContent = currentEmployee.firstName;
    newTableRow.append(firstNameCell);

    const lastNameCell = document.createElement("td");
    lastNameCell.textContent = currentEmployee.lastName;
    newTableRow.append(lastNameCell);

    const salaryCell = document.createElement("td");
    // Format the salary as currency
    salaryCell.textContent = currentEmployee.salary.toLocaleString("en-US", {
      style: "currency",
      currency: "USD"
    });

    newTableRow.append(salaryCell);

    employeeTable.append(newTableRow);
  }
}

const trackEmployeeData = () => {
  const employees = collectEmployees();

  console.table(employees);

  displayAverageSalary(employees);

  console.log('==============================');

  getRandomEmployee(employees);

  employees.sort(function (a, b) {
    if (a.lastName < b.lastName) {
      return -1;
    } else {
      return 1;
    }
  });

  displayEmployees(employees);
}

// Add event listener to 'Add Employees' button
addEmployeesBtn.addEventListener('click', trackEmployeeData);
addEmployeesBtn.addEventListener('click', createNewEmployee);
