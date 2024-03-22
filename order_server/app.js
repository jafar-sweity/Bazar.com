import express from 'express';
import order from './listOrder.js';
import axios from 'axios';
const app = express();
const PORT = 5000;
app.use(express.json());
app.post('/order_server/purchase', async(req, res) => {
  const id = req.body.id;
  const type = "info";
  try{
  const response = await axios.get('http://catalog-server:4000/catalog_server/query', {
      params: { id, type }
    });
  //if book is available then update the stock and purchase
  if(response.data.Book[0].stock > 0){
    const operation = "decrement";
    const response = await axios.get('http://catalog-server:4000/catalog_server/query', {
    id: id, operation: operation});
    // push to order bookname and bookid and timestamp and remaining stock
    order.push({ bookId:purchase.data.data.id,bookname:purchase.data.data.title, timestamp: new Date(),remainingStock:purchase.data.data.stock });
    res.json({ message: 'Purchase successful',success:true,list:order});
  }
  else{
    res.json({ error: 'Book not in stock',cause:"empty",success:false});
  }  
  }
  catch{
    res.json({ error: 'ID not found',cause:"not found",success:false});
  }
      
}
);
app.listen(PORT, () => {
  console.log(`order server  is running on  port ${PORT}`);
}   
);
