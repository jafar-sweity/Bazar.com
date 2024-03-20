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
      console.error('Book not found', error);
      res.status(500).json({ error: 'Book not found' });
    }
  }
  else if(type === "topic"){
    const topic = req.query.topic;
    const matchingBooks = data.filter(book => book.topic === topic);
    try{
    res.status(200).json({"items":matchingBooks});
    }
    catch{
      console.error('No books under this topic', error);
      res.status(500).json({ error: 'No books under this topic' });
    }
  }
});
app.post('/catalog_server/update', (req, res) => {
  console.log(data[req.body.id].stock);
  if(req.body.operation==="decrement"){
    if(data[req.body.id].stock>0){
      data[req.body.id].stock--;
      res.status(200).json({ message: 'Stock Decremented' ,success:true});
}
else{
  res.status(500).json({ error: 'Stock empty' });
}}});
app.listen(PORT, () => {
  console.log(`catalog server  is running on  port ${PORT}`);
}   
);
