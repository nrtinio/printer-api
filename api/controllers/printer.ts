// const AccessDB = require('../middleware/accessdb');
// const Setting = require('../models/setting');
import AccessDB from '../middleware/accessdb';
import Setting from '../models/setting';
import { Request, Response } from 'express';

async function Push(req: Request, res: Response) {
    const code = req.body.dbcode;
    const data = req.body.data;

    if(!code){
        res.status(400).json({
            ok: false,
            message: 'Database code is missing'
        });
    }

    if(!data || !data.length || data.length < 1){
        res.status(400).json({
            ok: false,
            message: 'Data is missing or in an incorrect format'
        });
    }

    if(data.length > 30){
        res.status(400).json({
            ok: false,
            message: 'Data exceeds the maximum allowed fields (30)'
        });
    }

    try {
        const setting = await Setting.findOne({code:"MATICADBOPTS"});

        const db = (setting.value as {code:string, name:string, value:string}[]).find(value => value.code === code);

        const currentAccessDB = new AccessDB(db.code, db.value);

        const connection = currentAccessDB.open();

        let updateQuery = `UPDATE tblDelegates SET `;

        for(let i = 1; i<data.length;i++){
            updateQuery += `field${i+1}= ${JSON.stringify(data[i])}`;

            updateQuery += `, `;
        }

        updateQuery += `EntryNotes='Entry updated by ${req.userData.email} via API on ${new Date()}' WHERE field1 = '${data[0]}'`;

        let insertQuery = `INSERT INTO tblDelegates (`;

        for(let i = 0; i<data.length; i++){
            insertQuery += `field${i+1}`;

            insertQuery += `, `
        }

        insertQuery += `EntryNotes) VALUES (`;

        for(const value of data){
            insertQuery += `${JSON.stringify(value)}`;

            insertQuery += `, `
        }

        insertQuery += `"Entry inserted by ${req.userData.email} via API on ${new Date()}")`;

        const selectQuery = `SELECT COUNT(*) AS cnt FROM tblDelegates WHERE field1 = "${data[0]}"`;

        const selectResult:[{cnt: string}] = await connection.query(selectQuery);

        // exists
        if (parseInt(selectResult[0].cnt, 10) > 0) {
            const updateResult = await connection.execute(updateQuery);

            res.status(201).json({
                ok: true,
                message: 'Data updated successfully'
            });
        } else {
            const insertResult = await connection.execute(insertQuery);

            res.status(201).json({
                ok: true,
                message: 'Data inserted successfully'
            });
        }
    } catch (err) {
        console.log(err)

        console.log('Error in pushing to printer: ' + JSON.stringify(err))

        res.status(500).json({
            ok: false,
            message: 'Push to printer failed'
        });
    }
}

export default { Push };