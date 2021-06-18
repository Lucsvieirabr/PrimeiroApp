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


function addtask(content, ischecked) {
    let checkstate = ischecked || false
    let ul = document.getElementById('tarefas');
    let li = document.createElement('li')
    let checkbox = document.createElement('input')
    checkbox.setAttribute('type', 'checkbox')
    checkbox.checked = checkstate
    checkbox.setAttribute('onclick', 'changeState(content, checkbox.checked)')
    checkbox.onclick = function() { changeState(content, checkbox.checked) };
    li.append(checkbox)
    li.append(content)
    ul.append(li)

}

function listarTarefas() {

    if (localStorage['tasks'] === undefined) return
    let Array = JSON.parse(localStorage['tasks'])
    Array.forEach((a) => {
        addtask(a.texto, a.state);


    })
}

function ButtonaddTask() {
    let input = document.getElementById("newTask").value;
    if (input == "") return alert("Tarefa vazia !!!")
    if (localStorage['tasks'] === undefined) {
        let Array = [{
            texto: input,
            state: false,
            arquivada: false
        }]
        localStorage.setItem('tasks', JSON.stringify(Array))
        addtask(input)
        document.getElementById("newTask").value = ""
        return
    }
    let Array = JSON.parse(localStorage['tasks'])
    Array.push({
        texto: input,
        state: false,
        arquivada: false
    })
    localStorage.setItem('tasks', JSON.stringify(Array))
    addtask(input)
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