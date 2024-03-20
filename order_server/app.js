import express from 'express';
import order from './listOrder.js';
import axios from 'axios';
const app = express();
const PORT = 5000;
app.use(express.json());
app.post('/order_server/purchase', async(req, res) => {
  const id = req.body.id;
  const type = "info";
try {
  const response = await axios.get('http://localhost:4000/catalog_server/query', {
            params: { id, type } 
        });
      //if book is available then update the stock and purchase
      if(response.data.items[0].stock > 0 && response.data != null){
        const operation = "decrement";
        console.log(id);
  const purchase = await axios.post('http://localhost:4000/catalog_server/update', {
            id: id, operation: operation
        });
      if(purchase.data.success){
        // push to order bookname and bookid and timestamp and remaining stock
        order.push({ bookId:response.data.id,bookname:response.data.title, timestamp: new Date(),remainingStock:response.data.stock });
        res.status(200).json({ message: 'Purchase successful',success:true});
      }
      else{
        res.status(500).json({ error: 'Purchase Failed' });
      }
    }
    else{
      res.status(500).json({ error: 'Book not in stock' });
    }
}catch (error) {
    console.error('Error forwarding request:', error);
    res.status(500).json({ error: 'Internal Server Error' });
}
}
);
app.listen(PORT, () => {
  console.log(`order server  is running on  port ${PORT}`);
}   
);
