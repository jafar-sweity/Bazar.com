import express from 'express';
import data from './database.js'

const app = express();

const PORT = 4000;
app.use(express.json());



app.get('/catalog_server/query', (req, res) => {
    
  try {
  res.status(200).send(data);
  }
  catch (error) {
    console.error('Error forwarding request:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }

});

app.post('/catalog_server/update', (req, res) => {

  data.forEach(book => {
    
    if (book.id === req.query.id) {
  
      if (book.stock > 0) {
        
        book.stock = book.stock - 1;
        res.status(200).json({ message: 'Purchase successful' ,success:true,book:book});
      } else {
        res.status(500).json({ error: 'Internal Server Error' });
      }
    }
  });
  

}
);


app.listen(PORT, () => {
  console.log(`catalog server  is running on  port ${PORT}`);
}   
);
