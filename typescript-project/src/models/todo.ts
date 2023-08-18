class Todo {
    id: string;
    text: string;

    constructor(todoText: string) {
        this.text = todoText;
        this.id = new Date().toISOString() + Math.random();
    }
}

export default Todo;