import axios from 'axios';
import http from 'http';
import https from 'https';

const poolConfig = {
    keepAlive: true, // a parameter used to keep the socket alive
    maxSockets: 50, // maximum concurrent connections in single host
    maxFreeSockets: 10, // max idle connecrtion to be in active
    timeout: 60000, // max time to keep the active socket open
}

const httpAgent = new http.Agent(poolConfig);
const httpsAgent = new https.Agent(poolConfig);

const client = axios.create({
    httpAgent,
    httpsAgent,
    timeout: 5000, // to timeout if API call takes more than 5sec
})

export default client;