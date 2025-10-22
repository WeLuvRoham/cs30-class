// Data Organization
// Roham Arab
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

//-------------------Plan-------------------
// Make a data organizor with something to input student names and grades
// have the list of students come up and make it so you can edit or insert new students and grades
//and add a search feature to search up certain students

//very extra: make it so you can sort by name or by grade

//defining the array
const studentList = [];
//input value defs
let inputName;
let inputSex;
let inputGrade;





function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
}

function addStudent(){
  let inputName = document.getElementById('name').value;
  let inputSex = document.getElementById('sex').value;
  let inputGrade = document.getElementById('grade').value;

  const student = {
    name: inputName,
    sex: inputSex,
    grade: inputGrade
  };
  
  studentList.push(student);
  addToTable(student);
  document.getElementById("studentForm").reset();
}

function addToTable(student){
  const table = document.getElementById('studentList').getElementsByTagName('tbody')[0];
  const newRow = table.insertRow();
  
  const nameCell = newRow.insertCell();
  const sexCell = newRow.insertCell();
  const gradeCell = newRow.insertCell();
  
  nameCell.textContent = student.name;
  sexCell.textContent = student.sex;
  gradeCell.textContent = student.grade;
  const tableBody = document.querySelector("#studentList tbody");
  const row = tableBody.insertRow();


  row.appendChild(cell1);
  row.appendChild(cell2);
  row.appendChild(cell3);
  tableBody.appendChild(row);
}


