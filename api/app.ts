import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';

import SettingRoutes from './routes/setting';
import PrintRoutes from './routes/printer';
import UserRoutes from './routes/user';

const app = express();

const connectionString = process.env.NODE_ENV === 'production' ?
process.env.MONGO_ATLAS_SCHEME + '://' + process.env.MONGO_ATLAS_USER + ':' + process.env.MONGO_ATLAS_PW + '@' + process.env.MONGO_ATLAS_HOST :
process.env.MONGO_ATLAS_SCHEME + '://' + process.env.MONGO_ATLAS_HOST + '/opiddb'

mongoose.connect(connectionString,
    {
        socketTimeoutMS: 0,
        readPreference: 'primaryPreferred'
    })
    .then(() => {
        console.log('Connected to database!');
    })
    .catch(err => {
        console.log('Connection failed!');
        console.log(err);
    });
// cors middleware
app.use(cors());
// helmet
const scriptResources = ["'self'"];
const styleResources = ["'self'", "'unsafe-inline'", "http://192.168.23.127", "http://localhost:*"];
const connectResources = ["'self'", "http://192.168.23.127", "http://localhost:*"];
const imageResources = ["'self'", "data:", "http://192.168.23.127", "http://192.168.23.60", "http://localhost:*"]

app.use(helmet.contentSecurityPolicy({
    directives: {
        defaultSrc: ["'self'"],
        scriptSrc: scriptResources,
        styleSrc: styleResources,
        connectSrc: connectResources,
        imgSrc: imageResources,
        upgradeInsecureRequests: null
    }
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PATCH, PUT, DELETE, OPTIONS');
    next();
});

app.use('/api/printer', PrintRoutes);
app.use('/api/settings', SettingRoutes);
app.use('/api/user', UserRoutes);

export default app;