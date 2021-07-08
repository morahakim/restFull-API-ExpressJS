const express = require("express");
const app = express();
const port = 3000

const pool = require("./db");
app.use(express.json()) //req.body


//ROUTES

//get all todos
app.get("/todo", async (req, res) => {
    try {
        const allTodos = await pool.query("SELECT * FROM todo");
        res.json(allTodos.rows);
    } catch (err) {
        console.error(err.message);
    }
});

//get a todo
app.get("/todo/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1",[
            id
        ]);
        res.json(todo.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

//update a todo
app.put("/todo/:id", async(req, res) => {
    try {
        const { id } = req.params; //WHERE
        const { description } = req.body; //SET
        const updateTodo = await pool.query(
            "UPDATE todo SET description = $1 WHERE todo_id = $2",
            [description, id]
        );

        res.json("Todo was updated");
    } catch (err) {
        console.error(err.message)
    }
});

//delete a todo
app.delete("/todo/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deleteTodo = await pool.query(
            "DELETE FROM todo WHERE todo_id = $1",
            [id]
        );
        res.json("catatan berhasil dihapus");
    } catch (err) {
        console.error(err.message)
    }
})

//create a todo
app.post("/todo", async(req, res) => {
    try {
        const { description } = req.body;
        const newTodo = await pool.query(
            "INSERT INTO todo (description) VALUES ($1) RETURNING *",
            [description]
        );

        res.json(newTodo.rows[0]);
    } catch (err) {
        console.error(err.message)
    }
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })

  module.exports = app