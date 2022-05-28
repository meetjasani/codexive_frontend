const protocol = process.env.REACT_APP_PROTOCOL;
const host = process.env.REACT_APP_HOST;
const port = process.env.REACT_APP_PORT;
const trailUrl = process.env.REACT_APP_TRAILURL;
console.log(process.env);
const hostUrl = `${protocol}://${host}${port ? ':' + port : ''}/`;
const endpoint = `${protocol}://${host}${(port ? ':' + port : '')}/${trailUrl}`;

const variables = {
    protocol: protocol,
    host: host,
    port: port,
    apiUrl: trailUrl,
    endpoint: endpoint,
    hostUrl: hostUrl
}

export default variables




