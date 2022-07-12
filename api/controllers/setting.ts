import { Request, Response } from 'express';
import Setting from '../models/setting';

export function GetSettings(req: Request, res: Response) {
    Setting.findOne({ code: req.body.code }).then(foundSettings => {
        res.status(200).json({
            ok: true,
            settings: foundSettings.value
        })
    }).catch(error => {
        console.log(error)
        res.status(500).json({
            ok: false,
            message: 'Cannot retrieve settings for: ' + req.body.code
        })
    })
}