// const ADODB = require('node-adodb');
import ADODB from 'node-adodb';

class AccessDB {
    code;
    connstring;
    connection: ADODB.open;

    constructor(code: string, connstring: string){
        ADODB.PATH = 'adodb.js'
        this.code = code;
        this.connstring = connstring;
    }

    open(){
        if(!this.connection){
            this.connection = ADODB.open(this.connstring);
        }

        return this.connection;
    }
}

export default AccessDB;