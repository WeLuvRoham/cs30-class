// Data Organization
// Roham Arab
// Date
//
// Extra for Experts:
// used objects and arrays to store student data
// made a delete mode to delete students from the list
// created a delete button that toggles delete mode on and off
// implemented bootstrap for styling
// used html and javascript together

//-------------------Plan-------------------
// Make a data organizor with something to input student names and grades
// have the list of students come up and make it so you can edit or insert new students and grades
//and add a search feature to search up certain students

//very extra: create delete mode where you can delete students by clicking on their row

//defining the array
const studentList = [];
// a simple incremental id generator for students
let nextId = 1;
// whether delete mode is active
let deleteModeActive = false;
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
    id: nextId++,
    name: inputName,
    sex: inputSex,
    grade: inputGrade
  };
  
  studentList.push(student);
  addToTable(student);
  document.getElementById("studentForm").reset();
}

function addToTable(student){
  // create a row and populate cells
  const tableBody = document.querySelector('#studentList tbody');
  const row = tableBody.insertRow();
  // store the student id on the row so we can find it later
  row.dataset.id = student.id;

  const nameCell = row.insertCell();
  const sexCell = row.insertCell();
  const gradeCell = row.insertCell();

  nameCell.textContent = student.name;
  sexCell.textContent = student.sex;
  gradeCell.textContent = student.grade;

  // when delete mode is active, clicking the row deletes that student
  row.addEventListener('click', (e) => {
    // if delete mode is on, delete this student
    if (deleteModeActive) {
      deleteStudentById(student.id);
    }
  });
}

function deleteStudentById(id) {
  const index = studentList.findIndex(s => s.id === id);
  if (index === -1) return;
  // remove from data
  studentList.splice(index, 1);
  // remove from DOM
  const tableBody = document.querySelector('#studentList tbody');
  const row = tableBody.querySelector(`tr[data-id="${id}"]`);
  if (row) row.remove();
}

function deleteMode() {
  deleteModeActive = !deleteModeActive;
  const btn = document.getElementById('deleteBtn');
  if (!btn) return;
  if (deleteModeActive) {
    // indicate active delete mode
    btn.classList.remove('btn-primary');
    btn.classList.add('btn-danger');
    btn.textContent = 'Delete: ON (click a row)';
    document.body.style.cursor = 'crosshair';
  } else {
    // back to normal
    btn.classList.remove('btn-danger');
    btn.classList.add('btn-primary');
    btn.textContent = 'Delete';
    document.body.style.cursor = 'default';
  }
}


