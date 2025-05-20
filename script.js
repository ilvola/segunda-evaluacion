const students=[]

document.getElementById("studentform").addEventListener("submit",function(e){
e.preventDefault();   

    const name=document.getElementById("name").value.trim();
    const  lastname=document.getElementById("lastname").value.trim();
    const grade=parseFloat(document.getElementById("grade").value);


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
<td><button class="delete-btn">Eliminar</button></td>
`;
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


