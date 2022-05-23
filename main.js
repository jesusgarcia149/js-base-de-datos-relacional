// Sanear el texto que pasa por el formulario
function sanitizeText(text) {
    const pattern = /[<>]/gi;
    const replace = {
        "<": "&lt;",
        ">": "&gt;",
    };

    text = String(text).replace(pattern, (string) => {
        return replace[string];
    });

    return text;
}

// Obtener los datos de los campos del formulario
function getFormData(form) {
    const data = {};

    const names = form.querySelectorAll("[name]");

    for (const field of names) {
        const type = field.type;

        if ((type == "radio" || type == "checkbox") && !field.checked) {
            continue;
        }

        if (!(field.name.length > 0)) continue;

        const { name, value = "" } = field;

        if (!(name.trim().length > 0 || value.trim().length > 0)) {
            continue;
        }

        data[name] = sanitizeText(value.trim());
    }

    form.reset();

    return data;
}

const formProfesor = document.querySelector("#profesor");
const formEstudiante = document.querySelector("#estudiante");
const formNotas = document.querySelector("#notas");

// Formularios:
const consultarProfesor = document.querySelector("#consultar-profesor");
const mostrarProfesor = document.querySelector("#mostrar-profesor");

const btnMostrarProfesor = document.querySelector("#btn-mostrar-lista-profesores");
const mostrarListaProfesores = document.querySelector("#mostrar-lista-profesores");

const consultarEstudiante = document.querySelector("#consultar-estudiante");
const mostrarEstudiante = document.querySelector("#mostrar-estudiante");

const btnMostrarEstudiante = document.querySelector("#btn-mostrar-lista-estudiante");
const mostrarListaEstudiante = document.querySelector("#mostrar-lista-estudiante");

const btnMostrarNotas = document.querySelector("#btn-mostrar-notas");
const mostrarListaNotas = document.querySelector("#mostrar-lista-notas")
// Profesor: Cedula, Nombres, Apellidos, Profesion, Carrera, Materias

const listaProfesores = [];
class Profesor {

    constructor(datosFormualario) {
        const { cedula, nombres, apellidos, profesion, carrera, materias } = datosFormualario;

        this.cedula = cedula;
        this.nombres = nombres;
        this.apellidos = apellidos;
        this.profesion = profesion;
        this.carrera = carrera;
        this.materias = materias;

        this.crearProfesor();

    }

    mostrarInformacionProfesor() {
        return {
            cedula: this.cedula,
            nombres: this.nombres,
            apellidos: this.apellidos,
            profesion: this.profesion,
            carrera: this.carrera,
            materias: this.materias
        }
    }

    crearProfesor() {
        const Estudiante = listaEstudiantes.find(estudiante => estudiante.cedula === this.cedula);
        if (Estudiante) {
            const { nombres, apellidos } = Estudiante;
            alert(`El estudiante ${nombres} ${apellidos} no se puede registrar en el sistema como docente`);
            return;
        }

        const Profesor = listaProfesores.find(docente => docente.cedula === this.cedula);
        if (Profesor) {
            const { nombres, apellidos } = Profesor;
            alert(`El docente ${nombres} ${apellidos} ya se registró previamente en el sistema`);
            return;
        }

        listaProfesores.push({
            cedula: this.cedula,
            nombres: this.nombres,
            apellidos: this.apellidos,
            profesion: this.profesion,
            carrera: this.carrera,
            materias: this.materias
        });
    }

    mostrarListaProfesores() {
        return listaProfesores;
    }

}

// Estudiante: Cedula, Nombres, Apellidos, Carrera, Materias
const listaEstudiantes = [];
class Estudiante {

    constructor(datosFormualario) {
        const { cedula, nombres, apellidos, carrera, materias } = datosFormualario;

        this.cedula = cedula;
        this.nombres = nombres;
        this.apellidos = apellidos;
        this.carrera = carrera;
        this.materias = materias;

        this.crearEstudiante();

    }

    mostrarInformacionEstudiante() {
        return {
            cedula: this.cedula,
            nombres: this.nombres,
            apellidos: this.apellidos,
            carrera: this.carrera,
            materias: this.materias
        }
    }

    crearEstudiante() {
        const Docente = listaProfesores.find(docente => docente.cedula === this.cedula);
        if (Docente) {
            const { nombres, apellidos } = Docente;
            alert(`No se puede registrar como estudiante el docente ${nombres} ${apellidos}`);
            return;
        }

        const Estudiante = listaEstudiantes.find(estudiante => estudiante.cedula === this.cedula);
        if (Estudiante) {
            const { nombres, apellidos } = Estudiante;
            alert(`El estudiante ${nombres} ${apellidos} se encuentra previamente registrado en el sistema`);
            return;
        }

        listaEstudiantes.push({
            cedula: this.cedula,
            nombres: this.nombres,
            apellidos: this.apellidos,
            carrera: this.carrera,
            materias: this.materias
        });
    }

    mostrarListaEstudiantes() {
        return listaEstudiantes;
    }

}

// Notas: Estudiante, Nota1, Nota2, Nota3, Nota4, Promedio
const listaNotas = [];
class Notas {

    constructor(datosFormualario) {
        const { cedula, materia, nota1, nota2, nota3, nota4 } = datosFormualario;

        this.cedula = cedula;
        this.materia = materia;
        this.nota1 = Number(nota1);
        this.nota2 = Number(nota2);
        this.nota3 = Number(nota3);
        this.nota4 = Number(nota4);

        this.crearNota();

    }

    mostrarNota() {
        return {
            cedula: this.cedula,
            materia: this.materia,
            nota1: this.nota1,
            nota2: this.nota2,
            nota3: this.nota3,
            nota4: this.nota4
        }
    }

    crearNota() {
        const Persona = listaEstudiantes.find(persona => persona.cedula === this.cedula);

        if (!Persona) {
            alert(`No hay personas registrada con la cédula ${this.cedula}`);
            return;
        }

        listaNotas.push({
            cedula: this.cedula,
            materia: this.materia,
            nota1: this.nota1,
            nota2: this.nota2,
            nota3: this.nota3,
            nota4: this.nota4,
            promedio: (this.nota1 + this.nota2 + this.nota3 + this.nota4) / 4
        });
    }

    mostrarNotas() {
        return listaNotas;
    }

}

// FUNCIONES:
// - MOSTRAR INFORMACION DE ESTUDIANTE
// - MOSTRAR LISTA DE ESTUDIANTES
// - MOSTRAR INFORMACION DE PROFESOR
// - MOSTRAR LISTA DE PROFESORES
// - MOSTRAR NOTAS POR ESTUDIANTE POR MATERIA JUNTO A SU PROMEDIO

if (formProfesor) {
    formProfesor.addEventListener("submit", function (e) {
        e.preventDefault();

        const profesor = new Profesor(getFormData(this));

        console.log(profesor.mostrarListaProfesores());
    });
}


if (formEstudiante) {
    formEstudiante.addEventListener("submit", function (e) {
        e.preventDefault();

        const estudiante = new Estudiante(getFormData(this));

        console.log(estudiante.mostrarListaEstudiantes());
    });
}

if (formNotas) {
    formNotas.addEventListener("submit", function (e) {
        e.preventDefault();

        const notas = new Notas(getFormData(this));

        console.log(notas.mostrarNotas());
    });
}

/**
 * 
 * @param {HTMLTBodyElement} tbody 
 */
const rellenarCuerpo = (tbody, data) => {
    if (!tbody) return;

    const tr = document.createElement("tr");

    data.forEach(persona => {
        const { cedula, nombres, apellidos, profesion, carrera, materias } = persona;
        const row = tr.cloneNode(false);

        if (profesion) {
            row.innerHTML += `
                <td>${cedula}</td>
                <td>${nombres}</td>
                <td>${apellidos}</td>
                <td>${profesion}</td>
                <td>${carrera}</td>
                <td>${materias}</td>
            `;

            tbody.appendChild(row);
            return;
        }

        row.innerHTML += `
            <td>${cedula}</td>
            <td>${nombres}</td>
            <td>${apellidos}</td>
            <td>${carrera}</td>
            <td>${materias}</td>
        `;

        tbody.appendChild(row);
    });
};


const mostrarPersonas = (target, data) => {
    if (!target || !Array.isArray(data)) return;

    target.textContent = "";

    data.forEach(persona => {
        const { cedula, nombres, apellidos } = persona;

        const row = `
            <tr>
                <td>${cedula}</td>
                <td>${nombres}</td>
                <td>${apellidos}</td>
            </tr>
        `.trim();

        target.innerHTML += row;
    });
}

// Array [ {…} ]
// 0: Object { cedula: "2618149", materia: "ciencias", nota1: 51, … }
// cedula: "2618149"
// materia: "ciencias"
// nota1: 51
// nota2: 14
// nota3: 16
// nota4: 18
// promedio: 24.75
const mostrarNotas = (target, data) => {
    if (!target || !Array.isArray(data)) return;

    target.textContent = "";

    data.forEach(notas => {
        const { cedula, materia, nota1, nota2, nota3, nota4, promedio = 0 } = notas;
        const Persona = listaEstudiantes.find(persona => persona.cedula === cedula);


        if (!Persona) {
            const row = `
                <tr>
                    <td colspan="9">No hay estudiantes registrados en el sistema</td>
                </tr>
            `;
            
            target.innerHTML += row;

            return;
        }

        const {nombres, apellidos} = Persona;

        const row = `
            <tr>
                <td>${cedula}</td>
                <td>${nombres}</td>
                <td>${apellidos}</td>
                <td>${materia}</td>
                <td>${nota1}</td>
                <td>${nota2}</td>
                <td>${nota3}</td>
                <td>${nota4}</td>
                <td>${promedio}</td>
            </tr>
        `.trim();

        target.innerHTML += row;
    });
}

if (consultarProfesor) {
    consultarProfesor.addEventListener("submit", function (e) {
        e.preventDefault();
        
        const { cedulaProfesor } = getFormData(this);

        if (mostrarProfesor) {
            rellenarCuerpo(mostrarProfesor, listaProfesores.filter(persona => {
                return persona.cedula === cedulaProfesor;
            }));
        }
    });
}

if (consultarEstudiante) {
    consultarEstudiante.addEventListener("submit", function(e) {
        e.preventDefault();

        const { cedulaEstudiante } = getFormData(this);

        if (mostrarEstudiante) {
            rellenarCuerpo(mostrarEstudiante, listaEstudiantes.filter(persona => {
                return persona.cedula === cedulaEstudiante;
            }));
        }
    });
}

if (btnMostrarProfesor && mostrarListaProfesores) {
    btnMostrarProfesor.addEventListener("click", function() {
        mostrarPersonas(mostrarListaProfesores, listaProfesores);
    });
}

if (btnMostrarEstudiante && mostrarListaEstudiante) {
    btnMostrarEstudiante.addEventListener("click", function() {
        mostrarPersonas(mostrarListaEstudiante, listaEstudiantes);
    });
}

if (btnMostrarNotas && mostrarListaNotas) {
    btnMostrarNotas.addEventListener("click", function() {
        mostrarNotas(mostrarListaNotas, listaNotas);
    });
}
