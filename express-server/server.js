const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');

// load environment variables
dotenv.config();

const dbPort = process.env.DATABASE_PORT || 27017;
const mongoURL = process.env.DATABASE_URL || "mongodb://localhost";
const serverPort = process.env.SERVER_PORT || 8080;
const googleURL = process.env.GOOGLE_ENDPOINT;
const googleKey = process.env.GOOGLE_API_KEY;

// Middleware
app.use(express.json());
app.use(cors());

// DB
mongoose.connect(`${mongoURL}:${dbPort}/blogs`, 
    { 
        useNewUrlParser: true, 
        useUnifiedTopology: true 
    })
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

// Model
const Blog = mongoose.model('Blog', new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true,
        min: 1
    },
    image: {
        type: String,
        required: false
    },
    coords: {
        lat: { type: Number, required: false },
        lng: { type: Number, required: false }
    },
    address: {
        type: String,
        required: false
    }
},{ timestamps: true }));
  
// RESTful Api

// Add
app.post('/api/blogs', async (req, res) => {
    let city
    if (Object.keys(req.body.coords).length !== 0) {
        city = await getLocationFromCoords(req.body.coords.lat, req.body.coords.lng);
    }

    let blog = new Blog({
        title: req.body.title,
        message: req.body.message,
        image: req.body.image,
        coords: req.body.coords,
        address: city ? city : "No location provided"
    });

    blog = await blog.save();
    res.send(blog);
});
  
// Read
app.get('/api/blogs', async (req, res) => {
    const blogs = await Blog.find();
    res.send(blogs);
});
  
// Update
app.put('/api/blogs/:id', async (req, res) => {
    let city
    if (Object.keys(req.body.coords).length !== 0) {
        city = await getLocationFromCoords(req.body.coords.lat, req.body.coords.lng);
    }
    const blog = await Blog.findByIdAndUpdate(req.params.id, 
    { 
        title: req.body.title,
        message: req.body.message,
        image: req.body.image,
        coords: req.body.coords,
        address: city ? city : "No location provided"
    }, { new: false });
    
    res.send(blog);
});
  
// Delete
app.delete('/api/blogs/:id', async (req, res) => {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    res.send(blog);
});
  

// Server
app.listen(serverPort, () => {
    console.log(`Server is running on port ${serverPort}`);
});

async function getLocationFromCoords(lat, lng) {
    const response = await fetch(`${googleURL}/geocode/json?latlng=${lat},${lng}&key=${googleKey}`);
    const data = await response.json();
    
    const addressComponents = data.results[0].address_components
    const cityComponent = addressComponents.find(component => component.types.includes('locality'));
    const stateComponent = addressComponents.find(component => component.types.includes('administrative_area_level_1'));

    return `${cityComponent.long_name}, ${stateComponent.long_name}`;
}