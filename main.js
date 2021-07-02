var tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];

var count = localStorage.getItem('counter') || 0;

function listarTarefas() {
    var ul = document.getElementById('tarefas');
    ul.innerHTML = ""
    tarefas.forEach((t) => {
        if (!t.arquivada) {
            let li = document.createElement('li')
            li.setAttribute('id', t.id)
            let check = document.createElement('input')
            check.setAttribute('type', 'checkbox')
            check.onclick = function() {
                markAsComplete(t.id)
            }
            check.checked = t.concluida;
            if (t.concluida) {
                li.classList.add('concluida')
            }
            let button = document.createElement('button')
            button.classList.add('arquivar')
            button.innerHTML = '&#10005;'

            button.onclick = function() {
                markAsArchived(t.id)
            }
            li.append(check)

            let p = document.createElement('p')
            p.innerText = t.texto
            li.append(p)

            li.append(button)
            ul.append(li)
        }
    })
}

function markAsComplete(idTarefa) {
    for (let i = 0; i < tarefas.length; i++) {
        if (tarefas[i].id === idTarefa) {
            tarefas[i].concluida = !tarefas[i].concluida;
            localStorage.setItem('tarefas', JSON.stringify(tarefas))
            listarTarefas()
        }
    }
}

function markAsArchived(idTarefa) {
    for (let i = 0; i < tarefas.length; i++) {
        if (tarefas[i].id === idTarefa) {
            tarefas[i].arquivada = !tarefas[i].arquivada;
            localStorage.setItem('tarefas', JSON.stringify(tarefas))
            listarTarefas()
        }
    }
}

function adicionarTarefa() {
    let input = prompt("Tarefa");
    if (input !== null & input !== "") {
        tarefas.push({
            texto: input,
            concluida: false,
            arquivada: false,
            id: count
        })
        count++
        localStorage.setItem('counter', count)
        localStorage.setItem('tarefas', JSON.stringify(tarefas))
        listarTarefas()
    }
}

function docReady(fn) {
    if (document.readyState === "complete" || document.readyState === "interactive") {
        setTimeout(fn, 1);
    } else {
        document.addEventListener("DOMContentLoaded", fn);
    }
}

docReady(listarTarefas)