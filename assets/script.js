// Get a reference to the #add-employees-btn element
const addEmployeesBtn = document.querySelector('#add-employees-btn');

// Collect employee data
const collectEmployees = () => {
  console.log("checking for employees...");
  const employeeList = JSON.parse(window.localStorage.getItem("employeeList")) || [];
  console.log(employeeList);
  if (employeeList.length <= 0) {
    console.log("no employees yet!");
  }

  return employeeList;
};

// Create and store a new employee
const createNewEmployee = () => {
  const employee = {
    firstName: prompt("What's your first name?"),
    lastName: prompt("What's your last name?"),
    salary: prompt("What's your yearly salary?"),
  };

  if (!employee.firstName || !employee.lastName || !employee.salary) {
    alert("Invalid employee detected, please try again!");
    return;
  }

  if (employee.firstName.length < 3 || employee.firstName.length > 40 || employee.lastName.length < 3 || employee.lastName.length > 40) {
    alert("First name and last name must be greater than 3 and less than 40 characters!");
    return;
  }

  const parsedSalary = parseFloat(employee.salary);
  if (isNaN(parsedSalary)) {
    alert("Salary is not a valid number, please input an actual number!");
    return;
  }

  employee.salary = parsedSalary;

  const employeeList = collectEmployees(); // Collect existing employees
  employeeList.push(employee);            // Add the new employee

  window.localStorage.setItem("employeeList", JSON.stringify(employeeList)); // Save updated list
  
  return employee;  // Return the new employee (optional, depending on use case)
};

// Display the average salary
const displayAverageSalary = () => {
  const employeesList = collectEmployees();
  if (employeesList.length === 0) {
    console.log("No employees to calculate salary.");
    return;
  }

  let sum = 0;
  for (let i = 0; i < employeesList.length; i++) {
    const currentEmployee = employeesList[i];
    sum += currentEmployee.salary;
  }

  const averageCalculated = sum / employeesList.length;
  console.log(`Average Salary: ${averageCalculated}`);
};

// Select and display a random employee
const getRandomEmployee = (employeesArray) => {
  if (employeesArray.length === 0) {
    console.log("No employees available to pick a random one.");
    return null;
  }
  const randomEmployee = employeesArray[Math.floor(Math.random() * employeesArray.length)];
  console.log("Random Employee:", randomEmployee);
  return randomEmployee;
};

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
};

// Track employee data and update UI
const trackEmployeeData = () => {
  const employees = collectEmployees();  // Get employees from local storage
  console.table(employees);

  displayAverageSalary();  // Display average salary

  console.log('==============================');

  getRandomEmployee(employees);  // Log a random employee

  employees.sort((a, b) => a.lastName.localeCompare(b.lastName));  // Sort employees by last name

  displayEmployees(employees);  // Display employees in the table
};

// Event handler that creates a new employee and tracks employee data
const handleAddEmployees = () => {
  createNewEmployee();  // Create a new employee
  trackEmployeeData();  // Update the employee table and display info
};

// Add event listener to 'Add Employees' button
addEmployeesBtn.addEventListener('click', handleAddEmployees);

