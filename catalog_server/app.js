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

    if(matchingBooks!=null)
     res.json({"Book":matchingBooks});
    else{
      res.json({msg:"Book not Found"}); 
    }  
  }
  else if(type === "topic"){
    const topic = req.query.topic;
    const matchingBooks = data.filter(book => book.topic === topic);

    if(matchingBooks!=null)
      res.json({"items":matchingBooks});
    else{
      res.json({msg:"Book not Found"}); 
    }
  }
});
app.post('/catalog_server/update', (req, res) => {
  if(req.body.operation==="decrement"){
    data[req.body.id-1].stock--;
    res.json({ message: 'Stock Decremented' ,success:true, data:data[req.body.id-1] });
}});
app.listen(PORT, () => {
  console.log(`catalog server  is running on  port ${PORT}`);
}   
);
