import { Router } from "express";
import { Types } from "./Types";
import FeedbackHandlerCoordinator from "./FeedbackHandler";
import fs from 'fs'
import path from 'path'

function postScreenshot(folderName: string) {
    const router = Router()
    router.post('/screenshot', (req, res) => {
        const uploaded_name = path.basename(req.headers['screenshot_name'] as string)
        const feedback_id = req.headers['feedback_id']
        const handler = FeedbackHandlerCoordinator.shared.find(feedback_id)
        if (handler == undefined) {
            res.json({
                code: 1,
                msg: 'Invalid Feedback Id'
            })
            return
        }
    
        console.log(`Screenshot for Feedback ${feedback_id} uploading`)
    
        const filename = `${feedback_id}-${uploaded_name}`
        const ws = fs.createWriteStream(path.join(__dirname, '../temp', folderName, handler!.date_string, filename))

        req.pipe(ws)
    
        ws.on('close', () => {
            res.status(200)
            res.end()
            console.log(`Screenshot for Feedback ${req.headers['feedback_id']} uploaded`)
        })
    
        ws.on('error', e => {
            console.error('connection error when uploading screenshot.')
        })
        
    })
    return router
}

export default postScreenshot