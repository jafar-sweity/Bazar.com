import express from 'express';
import  axios from 'axios';
const app = express();
const PORT = 3000;
app.use(express.json());
app.get('/Bazar/search/:topic', async (req, res) => {
    try {
        const topic = req.params.topic;
        const type = "topic";
        const response = await axios.get('http://localhost:4000/catalog_server/query', {
            params: { topic, type } 
        });
       res.status(200).json(response.data);
    } catch (error) {
        console.error('Error forwarding request:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
app.get('/Bazar/info/:id',async(req,res)=>{
    try {
        const id = req.params.id;
        const type = "info";
        const response = await axios.get('http://localhost:4000/catalog_server/query', {
            params: { id, type } 
        });
        res.status(200).json(response.data);
    } catch (error) {
        console.error('Error forwarding request:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
);
app.use('/Bazar/purchase/:id',async(req,res)=>{
    const id = req.params.id;
    const response = await axios.post('http://localhost:5000/order_server/purchase', {
        id: id});
    if(response.data.success){
        res.status(200).json(response.data);
    }
    else{
        if(response.data.cause==="not found"){
            res.status(404).json({msg:"Book not found"});
        }
        else{
            res.status(404).json({msg:"Stock is empty"});
        }
    }
}
);
app.listen(PORT, () => {
  console.log(`frontend server  is running on  port ${PORT}`);
}   
);
