"use strict";

window.addEventListener('load', loadCourses);

function loadCourses() {
    //Variabler
    let list = document.getElementById("courseList");
    let nameEl = document.getElementById("name");
    let codeEl = document.getElementById("code");
    let progressionEl = document.getElementById("progression");
    let syllabusEl = document.getElementById("syllabus");
    list.innerHTML = "";
    
    //Tömmer input-fälten
    nameEl.value = "";
    codeEl.value = "";
    progressionEl.value = "";
    syllabusEl.value = "";

    //Skriver ut alla inmatade kurser
    fetch('http://charlotteranemo.se/REST/courses.php')
    .then(response => response.json())
    .then(data => 
        data.forEach(course =>
            list.innerHTML += `<tr><td>${course.name}</td><td>${course.code}</td><td>${course.progression}</td><td><a target="_blank" href="${course.syllabus}">Webblänk</a></td><td><button class="smallBtn" onclick="deleteCourse(${course.id})">Radera</button></td><td><button class="smallBtn" onclick="updateCourse('${course.id}', '${course.name}', '${course.code}', '${course.progression}', '${course.syllabus}')">Uppdatera</button></td></tr>`));
}

//Matar in den gamla datan i inputfälten för enklare uppdatering
function updateCourse(id, name, code, progression, syllabus) {
    let nameEl = document.getElementById("name");
    let codeEl = document.getElementById("code");
    let progressionEl = document.getElementById("progression");
    let syllabusEl = document.getElementById("syllabus");
    let updateBtn = document.getElementById("updateBtn");

    nameEl.value = name;
    codeEl.value = code;
    progressionEl.value = progression;
    syllabusEl.value = syllabus;

    updateBtn.innerHTML = `<button onclick="postUpdate('${id}')">Uppdatera</button>`
}

function postUpdate(id) {
    let nameEl = document.getElementById("name");
    let codeEl = document.getElementById("code");
    let progressionEl = document.getElementById("progression");
    let syllabusEl = document.getElementById("syllabus");

    //Tar värdena från inputfälten och uppdaterar med PUT
    let name = nameEl.value;
    let code = codeEl.value;
    let progression = progressionEl.value;
    let syllabus = syllabusEl.value;

    let course = {'name' : name, 'code' : code, 'progression' : progression, 'syllabus' : syllabus};

    fetch('http://charlotteranemo.se/REST/courses.php?id=' + id,
    {method: 'PUT', body: JSON.stringify(course)})
    .then(response => response.json())
    .then(data => loadCourses());
}

//Raderar kursen med id = id
function deleteCourse(id) {
    fetch('http://charlotteranemo.se/REST/courses.php?id=' + id,
    {method: 'DELETE'})
    .then(response => response.json())
    .then(data => loadCourses());
}

//Lägger till en kurs
function addCourse() {
    let nameEl = document.getElementById("name");
    let codeEl = document.getElementById("code");
    let progressionEl = document.getElementById("progression");
    let syllabusEl = document.getElementById("syllabus");

    let name = nameEl.value;
    let code = codeEl.value;
    let progression = progressionEl.value;
    let syllabus = syllabusEl.value;

    let course = {'name' : name, 'code' : code, 'progression' : progression, 'syllabus' : syllabus};

    fetch('http://charlotteranemo.se/REST/courses.php',
    {method: 'POST', body: JSON.stringify(course)})
    .then(response => response.json())
    .then(data => loadCourses());
}