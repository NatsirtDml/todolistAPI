const knex = require('knex')({
    client: 'mysql',
    connection: {
      host : 'localhost',
      port : 3306,
      user : 'trd',
      password : 'trd',
      database : 'tododb'
    }
  });


const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const port = 3000


// parse application/json
app.use(bodyParser.json())
app.use(cors())

app.get('/todo', async(req, res) => {
  const todos = await knex("todo");
  res.send(todos);
});

app.delete('/todo/:id', async (req,res) => {
  const id = req.params.id;
  await knex("todo").where({id}).del();
  res.send(id);
})

app.put("/todo", async(req,res) =>{
  try {
    const todo = req.body.todo;
    const id =  await knex("todo").insert({todo}, ["id"])
    res.send(id)
  } catch(err) {
    res.sendStatus(500).send(err)
  }

})

app.post("/todo/check/:id/:value", async(req,res) => {
  const id = req.params.id;
  const checked = Boolean(req.params.value);
  await knex("todo").where({id}).update({checked})
  res.send(id)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


// async function insert() {
//   await knex("todo").insert({todo :"Coucou"})
//   await knex("todo").where({id: 1}).update({checked: true})
//   await knex("todo").where({id: 1}).del()
// }

// async function toto() {
//   const rep = await knex("todo");
//   console.log(rep);
// }

  //Création et modification table

// async function toto() {
//   await knex.schema.alterTable('todo',t => {
//     // t.dropColumn("checked");
//     t.boolean("checked").alter().defaultTo(false).notNullable();

//   })
    // await knex.schema.createTable('todo',t => {
    //     t.smallint("id").primary().notNullable();
    //     t.string("todo").notNullable();
    //   })
// console.log("Fonction finie");
// }

// insert();