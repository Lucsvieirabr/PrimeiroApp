var id = localStorage['count'] || 0;
id = JSON.parse(id)

function changeState(content, state) {

    let Array = JSON.parse(localStorage['tasks'])
    Array.forEach((a) => {
        if (a.texto === content) {
            a.state = state
            localStorage.setItem('tasks', JSON.stringify(Array))
            return

        }


    })
}

function SaveArrayDatas(KeytoSave, Content) {

    if (localStorage[KeytoSave] === undefined) {
        let Array = [Content]
        localStorage.setItem(KeytoSave, JSON.stringify(Array))
        return
    }
    let Array = JSON.parse(localStorage[KeytoSave])
    Array.push(Content)
    localStorage.setItem(KeytoSave, JSON.stringify(Array))

}


function addtask(content, ischecked, count) {
    let checkstate = ischecked || false
    let ul = document.getElementById('tarefas');
    let li = document.createElement('li')
    let delbutton = document.createElement('button')
    delbutton.setAttribute('class', 'DelButonn')
    delbutton.setAttribute('onclick', `DeleteTask(${count})`)
    delbutton.onclick = function() { DeleteTask(count) }
    delbutton.innerHTML = '&#10006;'
    let checkbox = document.createElement('input')
    checkbox.setAttribute('type', 'checkbox')
    checkbox.checked = checkstate
    checkbox.onclick = function() { changeState(content, checkbox.checked) };
    li.setAttribute("id", `${count}`)
    li.append(checkbox)
    li.append(content)
    li.append(delbutton)
    ul.append(li)

}

function DeleteTask(count) {

    let Array = JSON.parse(localStorage['tasks'])
    Array.forEach((a) => {
        if (a.id === count) {
            if (count === 1) return Array.shift()
            return Array.splice(count);
        }
    })
    if (Array.length === 0) localStorage.setItem('count', JSON.stringify(0))
    localStorage.setItem('tasks', JSON.stringify(Array))
    listarTarefas()

}

function listarTarefas() {
    let ul = document.getElementById('tarefas')
    ul.innerHTML = ""
    if (localStorage['tasks'] === undefined) return
    let Array = JSON.parse(localStorage['tasks'])
    Array.forEach((a) => {
        addtask(a.texto, a.state, a.id);


    })
}

function ButtonaddTask() {
    let input = document.getElementById("newTask").value;
    if (input == "") return alert("Tarefa vazia !!!")
    if (localStorage['tasks'] === undefined) {
        let Array = [{
            texto: input,
            state: false,
            arquivada: false,
            id: id
        }]
        id = +1
        localStorage.setItem('count', JSON.stringify(id))
        localStorage.setItem('tasks', JSON.stringify(Array))
        addtask(input, undefined, id)
        document.getElementById("newTask").value = ""
        return
    }
    let Array = JSON.parse(localStorage['tasks'])
    Array.push({
        texto: input,
        state: false,
        arquivada: false,
        id: id
    })
    id += 1
    localStorage.setItem('count', JSON.stringify(id))
    localStorage.setItem('tasks', JSON.stringify(Array))
    addtask(input, undefined, id)
    document.getElementById("newTask").value = ""
    return
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