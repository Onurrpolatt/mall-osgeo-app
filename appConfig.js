var developmentDatabase = {
    postgres: {
    host: 'localhost',
    port: 5432,
    database: 'database_name',
    user: 'postgres',
    password: 'postgres'
    }
    }
    
    var connectionString = "postgres://lvhmmqmsqwmoir:5424f211067aae7449526072894803521e340ff2f49e2b369c85b9cf2c4c32bf@ec2-54-165-184-219.compute-1.amazonaws.com:5432/dbfhgkrdv3tr32?ssl=true";
    if (process.env.NODE_ENV == 'production') {
    //Production mode
    if (process.env.DATABASE_URL) {
    developmentDatabase =
    parseConnectionString(process.env.DATABASE_URL);
    } else {
    console.log("process.env.DATABASE_URL empty, connectionStringvariable used");
    developmentDatabase = parseConnectionString(connectionString);
    }
    }else{
    //Development mode
    developmentDatabase = parseConnectionString(connectionString);
    }
    function parseConnectionString(connectionString) {
    if (connectionString) {
    var myRegexp = /(\w+):(\w+)@(.+):(\w+)\/(\w+)/g;
    var match = myRegexp.exec(connectionString);
    if (match.length == 6) {
    developmentDatabase.postgres.user = match[1];
    developmentDatabase.postgres.password = match[2];
    developmentDatabase.postgres.host = match[3];
    developmentDatabase.postgres.port = Number(match[4]);
    developmentDatabase.postgres.database = match[5];
    developmentDatabase.postgres.ssl = true;

    return developmentDatabase;
    }
    }
    console.log("connectionString cannot be parsed");
    return null;
    }
    module.exports = {
    hostname: "https://adorable-strudel-ec3fb4.netlify.app",
    port: 5656,
    database: {
    postgres: developmentDatabase.postgres
    }
    }
