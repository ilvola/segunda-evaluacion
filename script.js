const students = [];
const tableBody = document.querySelector("#studentsTable tbody");
const promedioAlumnos = document.getElementById("promedioAlumnos");
const alumnosAprobadosSpan = document.getElementById("alumnosAprobados");
const alumnosReprobadosSpan = document.getElementById("alumnosReprobados");

function getTodayDateString() {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
}

const dateInput = document.getElementById("date");

dateInput.value = getTodayDateString();
document.getElementById("studentform").addEventListener("submit", function(e){
    e.preventDefault();

    const name = document.getElementById("name").value.trim();

    const lastname = document.getElementById("lastname").value.trim();

    const grade = parseFloat(document.getElementById("grade").value);

    const date = document.getElementById("date").value;
    if (!name || !lastname || isNaN(grade) || grade < 1 || grade > 7 || !date) {
        alert("Error: datos incorrectos");
        return;
    }
    const student = { name, lastname, grade, date };

    students.push(student);
    addStudentToTable(student);
    promedio();
    this.reset();
    dateInput.value = getTodayDateString();
});


function addStudentToTable(student) {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td data-label="Nombre">${student.name}</td>
        <td data-label="Apellido">${student.lastname}</td>
        <td data-label="Calificación">${student.grade.toFixed(1)}</td>
        <td data-label="Fecha">${student.date}</td>
        <td data-label="Acciones">
            <button class="action-btn edit-btn">Editar</button>
            <button class="delete-btn">Eliminar</button>
        </td>
    `;
    row.querySelector(".edit-btn").addEventListener("click", () => EditarEstudiante(student, row));
    row.querySelector(".delete-btn").addEventListener("click", () => {
        if (confirm("¿Estás seguro de que deseas eliminar este estudiante?")) {
            borrarEstudiante(student, row);
        }
    });
    tableBody.appendChild(row);
}
function borrarEstudiante(student, row) {
    const index = students.indexOf(student);
    if (index > -1) {
        students.splice(index, 1);
    }
    row.remove();
    promedio();
}

function promedio() {
    if (students.length === 0) {
        promedioAlumnos.innerHTML = "Promedio de notas: 0.0<br>Alumnos aprobados: 0<br>Alumnos reprobados: 0";
        return;
    }
    const total = students.reduce((suma, prom) => suma + prom.grade, 0);
    const avg = total / students.length;

  
    let aprobados = 0;
    let reprobados = 0;
    students.forEach(student => {
        if (student.grade >= 4.0) {
            aprobados++;
        } else {
            reprobados++;
        }
    });

    promedioAlumnos.innerHTML = `
        Promedio de notas: ${avg.toFixed(2)}<br>
        Alumnos aprobados: ${aprobados}<br>
        Alumnos reprobados: ${reprobados}
    `;
}


function EditarEstudiante(student, row) {
    row.innerHTML = `
        <td data-label="Nombre"><input type="text" class="edit-name" value="${student.name}" /></td>
        <td data-label="Apellido"><input type="text" class="edit-lastname" value="${student.lastname}" /></td>
        <td data-label="Calificación"><input type="number" min="1" max="7" step="0.1" class="edit-grade" value="${student.grade.toFixed(1)}" /></td>
        <td data-label="Fecha"><input type="date" class="edit-date" value="${student.date}" /></td>
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
        alert("Error: datos incorrectos al editar");
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
        <td data-label="Nombre">${student.name}</td>
        <td data-label="Apellido">${student.lastname}</td>
        <td data-label="Calificación">${student.grade.toFixed(1)}</td>
        <td data-label="Fecha">${student.date}</td>
        <td data-label="Acciones">
            <button class="action-btn edit-btn">Editar</button>
            <button class="delete-btn">Eliminar</button>
        </td>
    `;
    row.querySelector(".edit-btn").addEventListener("click", () => EditarEstudiante(student, row));
    row.querySelector(".delete-btn").addEventListener("click", () => {
        if (confirm("¿Estás seguro de que deseas eliminar este estudiante?")) {
            borrarEstudiante(student, row);
        }
    });
}