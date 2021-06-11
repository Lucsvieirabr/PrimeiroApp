var tarefas = [{
        texto: 'Socar o rocha',
        state: true,
        arquivada: false
    },
    {
        texto: 'Ver no Diarinho se o cara foi preso',
        state: false,
        arquivada: false
    },
    {
        texto: 'Olhar o valor da shibacoin',
        state: false,
        arquivada: false
    }
];

function addtask(content, ischecked) {
    let checkstate = ischecked || false
    let ul = document.getElementById('tarefas');
    let li = document.createElement('li')
    let checkbox = document.createElement('input')
    checkbox.setAttribute('type', 'checkbox')
    checkbox.checked = checkstate
    li.append(checkbox)
    li.append(content)
    ul.append(li)
}

function listarTarefas() {
    tarefas.forEach((t) => {
        addtask(t.texto, t.state);


    })
}

function ButtonaddTask() {
    let input = document.getElementById("newTask").value;
    tarefas.push({

        texto: input,
        state: false,
        arquivada: false

    })
    addtask(input);


}

function docReady(fn) {
    // see if DOM is already available
    if (document.readyState === "complete" || document.readyState === "interactive") {
        // call on next available tick
        setTimeout(fn, 1);
    } else {
        document.addEventListener("DOMContentLoaded", fn);
    }
}
docReady(listarTarefas)