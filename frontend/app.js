import express from 'express';
import axios from 'axios';
const app = express();
const PORT = 3000;
app.use(express.json());

app.get('/Bazar', async (req, res) => {
  res.send('Welcome to Bazar');
});

app.get('/Bazar/search/:topic', async (req, res) => {
  try {
    const topic = req.params.topic;
    const type = "topic";

    // Replace localhost with the catalog server container name
    const response = await axios.get('http://catalog-server:4000/catalog_server/query', {
      params: { topic, type }
    });

    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error forwarding request:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/Bazar/info/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const type = "info";
    console.log('id:', id);
    // Replace localhost with the catalog server container name
    const response = await axios.get('http://catalog-server:4000/catalog_server/query', {
      params: { id, type }
    });

    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error forwarding request:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.use('/Bazar/purchase/:id', async (req, res) => {
  const id = req.params.id;

  // Replace localhost with the order server container name
  const response = await axios.post('http://order-server:5000/order_server/purchase', {
    id: id
  });

  if (response.data.success) {
    res.status(200).json(response.data);
  } else {
    if (response.data.cause === "not found") {
      res.status(404).json({ msg: "Book not found" });
    } else {
      res.status(404).json({ msg: "Stock is empty" });
    }
  }
});

app.listen(PORT, () => {
  console.log(`frontend server   is running on  port ${PORT}`);
});
