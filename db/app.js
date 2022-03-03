const main = async () => {
    const { data } = require('./data');
    const { Client } = require('pg');
    const client = new Client(data);
    await client.connect();

    const res = await client.query('select * from test');
    console.log(res.rows[0]);
    await client.end();
}

main();
