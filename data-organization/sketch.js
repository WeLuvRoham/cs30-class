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
//defining student object
const student = {
  name: inputName,
  sex: inputSex,
  grade: inputGrade
};



function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
}

function addStudent(){
  let inputName = document.getElementById('name')
  let inputSex = document.getElementById('sex')
  let inputGrade = document.getElementById('grade')

  studentList.push(student)
}


