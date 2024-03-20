import express from 'express';
import data from './database.js'

const app = express();

const PORT = 4000;
app.use(express.json());



app.get('/catalog_server/query', (req, res) => {
  const type = req.query.type; 
  if(type === "info"){
    const id = req.query.id;
    const matchingBooks = data.filter(book => book.id === id);
    try{
    res.status(200).json({"items":matchingBooks});
    }
    catch{
      console.error('Error info', error);
      res.status(500).json({ error: 'Internal Server Error info' });
    }
  }
  else if(type === "topic"){
    const topic = req.query.topic;
    const matchingBooks = data.filter(book => book.topic === topic);
    try{
    res.status(200).json({"items":matchingBooks});
    }
    catch{
      console.error('Error Topic', error);
      res.status(500).json({ error: 'Internal Server Error Topic' });
    }
  }
});
app.post('/catalog_server/update', (req, res) => {
  if(req.body.operation==="decrement"){
  data.forEach(book => {
    if (book.id === req.body.id){
      book.stock = book.stock - 1;
      res.status(200).json({ message: 'Purchase successful' ,success:true,book:book});
  }});
}
}
);
app.listen(PORT, () => {
  console.log(`catalog server  is running on  port ${PORT}`);
}   
);
