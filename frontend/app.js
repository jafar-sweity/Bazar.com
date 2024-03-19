import express from 'express';
import  axios from 'axios';
 

const app = express();
const PORT = 3000;
app.use(express.json());

app.get('/Bazar/search/:topic', async (req, res) => {
    try {
        const id = req.params.topic;
        const response = await axios.get('http://localhost:4000/catalog_server/search', {
            params: { id } 
        });

        res.json(response.data);
    } catch (error) {
        console.error('Error forwarding request:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.use('/Bazar/info/:id',async(req,res)=>{
    try {
        const id = req.params.id;
        const response = await axios.get('http://localhost:4000/catalog_server/info', {
            params: { id } 
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error forwarding request:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
);

app.use('/Bazar/purchase/:id',async(req,res)=>{
    try {
        const id = req.params.id;
        const response = await axios.post('http://localhost:5000/order_server/purchase', {
            params: { id } 
        });
        res.json(response.data);
    }
    catch (error) {
        console.error('Error forwarding request:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
);


app.listen(PORT, () => {
  console.log(`frontend server  is running on  port ${PORT}`);
}   
);
