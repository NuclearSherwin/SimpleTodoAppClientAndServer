const express = require('express');
const app = express();
const cors = require('cors');
const pg_conn = require('./db');
const { application } = require('express');


// middleware
app.use(cors());
app.use(express.json());

// create a todo
app.post('/todos', async (req, res) => {
    try {
        console.log(req.body);
        const { description } = req.body;
        const newTodo = await pg_conn.query(
            `INSERT INTO todo (description) VALUES($1) RETURNING *`,
            [description]
        );

        res.json(newTodo.rows[0]);
    } catch (err) {
        console.log(err.message);
    }
});


// get all todos
app.get('/todos', async (req, res) => {
    try {
        const allTodos = await pg_conn.query(`SELECT * FROM todo`);
        res.json(allTodos.rows);
    }
    catch (err) {
        console.error(err.messages);
    }
});

// get a todo
app.get('/todos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const todo = await pg_conn.query(
            `SELECT * FROM todo WHERE todo_id = $1`,
            [id]
        );

        res.json(todo.rows[0]);
    } catch (err) {
        console.log(err);
    }
})

// edit a todo
app.put('/todos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { description } = req.body;
        const updateTodo = await pg_conn.query(
            `UPDATE todo SET description = $1 WHERE todo_id = $2`,
            [description, id]
        );

        res.json("Todo was updated!");
    } catch (err) {
        console.log(err);
    }
});


// delete a todo
app.delete('/todos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deleteTodo = await pg_conn.query(
            `DELETE FROM todo WHERE todo_id = $1`,
            [id]
        );

        res.json("Todo was deleted!");

    } catch (err) {
        console.log(err);
    }
});

app.listen(5000, () => {
    console.log('Server has started on port 5000');
})


