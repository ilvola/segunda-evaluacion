const students=[]

document.getElementById("studentform").addEventListener("submit",function(e){
e.preventDefault();   

    const name=document.getElementById("name").value.trim();
    const  lastname=document.getElementById("lastname").value.trim();
    const grade=parseFloat(document.getElementById("grade").value);
    const todayStr = new Date().toISOString().split('T')[0];

//validacion de los datos
    if(!name || !lastname || isNaN(grade) || grade<1 || grade>7){
        alert("error datos incorrectos")
        return
    }
    
    //guardar los datos en el array (se crea un objeto para juntar los datos y que entre en el array)
    
    const student={name,lastname,grade}
    students.push(student)
 //   console.log(students)
addStudentToTable(student)
promedio();
    this.reset()
});


const tableBody=document.querySelector("#studentsTable tbody");
function addStudentToTable(student){
    const row=document.createElement("tr")
    row.innerHTML=
`<td>${student.name}</td>
<td>${student.lastname}</td>
<td>${student.grade}</td>
<td data-label="Fecha">${student.date}</td>
<td data-label="Acciones">
<button class="action-btn edit-btn">Editar</button>
<td><button class="delete-btn">Eliminar</button></td>
`;

row.querySelector(".edit-btn").addEventListener("click",function (){
    EditarEstudiante(student, row);
})

row.querySelector(".delete-btn").addEventListener("click",function(){
    borrarEstudiante(student,row);

})
tableBody.appendChild(row);
}

function borrarEstudiante(student,row){
    console.log("Borrar")
    const index=students.indexOf(student);
    if(index > -1){
        students.splice(index,1);
    }


    promedio();
    row.remove();
}


function promedio(){
    if(students.length === 0){
        promedioAlumnos.textContent = "Promedio de notas: 0.0";
        return;
    }
    const total = students.reduce((suma, prom) => suma + prom.grade, 0);
    const avg = total / students.length;
    promedioAlumnos.textContent = `Promedio de notas: ${avg.toFixed(2)}`;
}

function EditarEstudiante(student, row) {
    // Replace table cells with inputs for editing
    row.innerHTML = `
        <td data-label="Nombre"><input type="text" value="${escapeHtml(student.name)}" class="edit-name" /></td>
        <td data-label="Apellido"><input type="text" value="${escapeHtml(student.lastname)}" class="edit-lastname" /></td>
        <td data-label="Calificación"><input type="number" min="1" max="7" step="0.1" value="${student.grade}" class="edit-grade" /></td>
        <td data-label="Fecha"><input type="date" value="${student.date}" class="edit-date" /></td>
        <td data-label="Acciones">
            <button class="action-btn save-btn">Guardar</button>
            <button class="action-btn cancel-btn">Cancelar</button>
        </td>
    `;

    row.querySelector(".save-btn").addEventListener("click", () => guardarCambios(student, row));
    row.querySelector(".cancel-btn").addEventListener("click", () => cancelarCambios(student, row));
}

function guardarCambios(student, row) {
    const newName = row.querySelector(".edit-name").value.trim();
    const newLastname = row.querySelector(".edit-lastname").value.trim();
    const newGrade = parseFloat(row.querySelector(".edit-grade").value);
    const newDate = row.querySelector(".edit-date").value;
    if (!newName || !newLastname || isNaN(newGrade) || newGrade < 1 || newGrade > 7 || !newDate) {
        alert("Error: Datos incorrectos al editar");
        return;
    }
    student.name = newName;
    student.lastname = newLastname;
    student.grade = newGrade;
    student.date = newDate;
    rebuildRow(student, row);
    promedio();
}

function cancelarCambios(student, row) {
    rebuildRow(student, row);
}
function rebuildRow(student, row) {
    row.innerHTML = `
        <td data-label="Nombre">${escapeHtml(student.name)}</td>
        <td data-label="Apellido">${escapeHtml(student.lastname)}</td>
        <td data-label="Calificación">${student.grade}</td>
        <td data-label="Fecha">${student.date}</td>
        <td data-label="Acciones">
            <button class="action-btn edit-btn">Editar</button>
            <button class="action-btn delete-btn">Eliminar</button>
        </td>
    `;
    row.querySelector(".edit-btn").addEventListener("click", () => EditarEstudiante(student, row));
    row.querySelector(".delete-btn").addEventListener("click", () => {
        if (confirm("¿Estás seguro de que deseas eliminar este estudiante?")) {
            borrarEstudiante(student, row);
        }
    });
}


