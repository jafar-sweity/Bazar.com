import express from 'express';

const app = express();

const PORT = 4000;
app.use(express.json());



app.get('/catalog_server/search', (req, res) => {
    console.log(req.query.id);
    res.json({ message: 'Handled in catalog server' });
});

app.get('/catalog_server/info', (req, res) => {
    
    res.send('Catalog Server');
}
);


app.listen(PORT, () => {
  console.log(`frontend server  is running on  port ${PORT}`);
}   
);
