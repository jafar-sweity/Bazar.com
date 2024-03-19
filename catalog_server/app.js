import express from 'express';
import data from '../database.js'

const app = express();

const PORT = 4000;
app.use(express.json());



app.get('/catalog_server/search', (req, res) => {
    
    
  const topic = req.query.id;
  const matchingBooks = data.filter(book => book.topic === topic);
  res.json({"items":matchingBooks.map(book => ({ id: book.id, name: book.name }))});

});

app.get('/catalog_server/info', (req, res) => {
    
  const id = req.query.id;
  const matchingBooks = data.filter(book => book.id === id);
  res.json({"item":matchingBooks.map(book => ({  name: book.name ,stock:book.stock,cost:book.cost}))});
}
);


app.listen(PORT, () => {
  console.log(`catalog server  is running on  port ${PORT}`);
}   
);
