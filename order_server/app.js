import express from 'express';
import data from '../database.js'

const app = express();

const PORT = 5000;
app.use(express.json());





app.post('/order_server/purchase', (req, res) => {
    
  const id = req.query.id;

  //decrment stock
    const book = data.find(book => book.id === id);
    if(!book)
    {

    }

    if (book.stock > 0) {
        book.stock--;
        res.json({ success: true });
    } else {
        res.json({ success: false });
    }

//     orders.push({ bookId, timestamp: new Date() });
//   fs.appendFile('orders.log', ${bookId},${new Date()}\n, err => {
//     if (err) {
//       console.error('Error writing to order log:', err);
//     }
//   });
// can use json not file system
  
  
}
);


app.listen(PORT, () => {
  console.log(`catalog server  is running on  port ${PORT}`);
}   
);
