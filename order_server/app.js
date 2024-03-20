import express from 'express';
import order from './listOrder.js';
import axios from 'axios';

const app = express();

const PORT = 5000;
app.use(express.json());





app.post('/order_server/purchase', async(req, res) => {
    
  const id = req.body.id;
 console.log('wwwwwwwww id ',id);
  
try {
  const response = await axios.get('http://localhost:4000/catalog_server/query', {
            params: { id } 
        });

  const matchingBooks = response.data.filter(book => book.id == id);

  // find the book id from matchingBooks array
  const matchingBooksid = matchingBooks[0].id;
  console.log('matchingBooksid',matchingBooksid);
  

      //if book is available then update the stock and purchase
      if(matchingBooks[0].id > 0 || matchingBooks[0] != null){
  const purchase = await axios.post('http://localhost:4000/catalog_server/update', {
            matchingBooksid: matchingBooksid
        });
      if(purchase.data.success){
        // push to order bookname and bookid and timestamp and remaining stock
        order.push({ bookId:matchingBooksid,bookname:matchingBooks[0].name, timestamp: new Date(),remainingStock:matchingBooks.stock });
        
        res.status(200).json({ message: 'Purchase successful' ,success:true,book:matchingBooks});
      }
      else{
        res.status(500).json({ error: '' });
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
