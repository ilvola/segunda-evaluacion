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
});


const tableBody=document.querySelector("#studentsTable tbody");
function addStudentToTable(student){
    const row=document.createElement("tr")
    row.innerHTML=
`<td>${student.name}</td>
<td>${student.lastname}</td>
<td>${student.grade}</td>`
tableBody.appendChild(row);
}






