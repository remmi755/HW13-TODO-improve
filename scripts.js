let list = document.getElementById('list');
let btnCreate = document.getElementById('btn')
let btnFind = document.getElementById('find')
let input = document.getElementById('input')
let form = document.getElementById('form')

class TodoList {
    constructor(el) {
        this.todos = [];
        this.findTodos = []
        this.el = el;
        this.el.addEventListener('click', (e) => {
            let elemTarget = e.target.closest('li')
            let id = elemTarget.dataset.id
            if (e.target.className === 'set-status') {
                this.changeStatus(id)
                this.changeColor(elemTarget)
            } else if (e.target.className === 'delete-task') {
                elemTarget.remove()
                this.removeTodo(id)
            }
        })
    }

    addTodo(todo) {
        this.todos.push(todo);
    }

    removeTodo(id) {
        this.todos = this.todos.filter((el) => {
            return el.id !== id;
        });
    }

    getTodos(arr) {
        return arr;
    }

    changeStatus(id) {

        let index = this.todos.findIndex((el) => el.id === id);
        this.todos[index].status = !this.todos[index].status;

    }

    changeColor(el) {
        el.classList.toggle('active')
    }

    render(arr) {
        let lis = '';
        for (let el of arr) {
            if (!el) {
                return;
            }
            lis += `<li  class="no-active" data-status="${el.status}" data-id="${el.id}">${el.value}<button class = "set-status">Change status</button><button class="delete-task">Delete</button></li>`;
        }
        this.el.innerHTML = lis;
    }

    findTasks() {
        this.str = input.value
        this.findTodos = todo1.todos.filter(it => it.value.includes(this.str))
        return this.findTodos
    }

    showRightColor() {
        let matches = document.querySelectorAll("li[data-status = 'true']");
        matches.forEach(function (el) {
            el.classList.add('active')
        })
    }
}

class Task {
    constructor() {
        this.value = input.value;
        this.status = false;
        this.id = Math.random().toString(36).substr(2, 9);
    }
}

let todo1 = new TodoList(list);

form.addEventListener('click', function (e) {
    if (e.target === btnCreate) {
        if (input.value !== '') {
            todo1.addTodo(new Task());
            todo1.render(todo1.todos)
            todo1.showRightColor()
            input.value = ''
        }
    } else if (e.target === btnFind) {
        todo1.findTasks()
        todo1.render(todo1.findTodos)
        todo1.showRightColor()
        input.value = ''
    }
})