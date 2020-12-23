import express, { Router } from "express";
import { Types } from "./Types";
import FeedbackHandlerCoordinator from "./FeedbackHandler";
import fs from 'fs'
import path from 'path'

const appApiMiddleware = Router()

appApiMiddleware.use('/report', express.json())
appApiMiddleware.post('/report', (req, res) => {
    const body: Types.APIReportFrontendRequest = req.body
    const handler = FeedbackHandlerCoordinator.shared.add()
    const feedback: Types.APIReportServerItem = {
        submit_date: new Date(),
        submit_ip: req.ip,
        feedback_id: handler.feedback_id,
        feedback_description: body.feedback_description,
        feedback_afid: body.feedback_afid,
    }

    fs.writeFileSync(path.join(__dirname, '../temp', handler.date_string, `${handler.feedback_id}.json`), JSON.stringify(feedback, undefined, 4))

    res.json({
        code: 0,
        msg: 'success'
    })
})

export default appApiMiddleware