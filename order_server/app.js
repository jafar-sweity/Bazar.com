import express from 'express';
import order from './listOrder.js';
import axios from 'axios';

const app = express();

const PORT = 5000;
app.use(express.json());





app.post('/order_server/purchase', async(req, res) => {
    
  const id = req.query.id;
 console.log('wwwwwwwww id ',id);
  
try {
  const response = await axios.get('http://localhost:4000/catalog_server/query', {
            params: { id } 
        });
  
  const matchingBooks = response.data.filter(book => book.id === id);
console.log(matchingBooks);
  const matchingBooksid=matchingBooks.id;
      //if book is available then update the stock and purchase
      if(matchingBooks.stock > 0 || matchingBooks != null){
      console.log('hrlooooooooooooooooooooooooooooooooooooooo');
  const purchase = await axios.post('http://localhost:4000/catalog_server/update', {
            params: { matchingBooksid} 
        });
  
      if(purchase.success){
        // push to order bookname and bookid and timestamp and remaining stock
        order.push({ bookId:matchingBooksid,bookname:matchingBooks.name, timestamp: new Date(),remainingStock:matchingBooks.stock });
        
        res.status(200).json({ message: 'Purchase successful' ,success:true,book:matchingBooks});
      }
      else{
        res.status(500).json({ error: 'Internal1 Server Error' });
      }
    }
    else{
      res.status(500).json({ error: 'Book not in stock' });
    }

}catch (error) {
    console.error('Error forwarding request:', error);
    res.status(500).json({ error: 'Internal3 Server Error' });
}



  
}
);


app.listen(PORT, () => {
  console.log(`order server  is running on  port ${PORT}`);
}   
);
