import express, { Router } from "express";
import { Types } from "./Types";
import FeedbackHandlerCoordinator from "./FeedbackHandler";
import fs from 'fs'
import path from 'path'
import getFeedbackId from "./getFeedbackId";
import postScreenshot from "./postScreenshot";


const bugReportMiddleware = Router()

bugReportMiddleware.use(getFeedbackId)

bugReportMiddleware.use(postScreenshot('bug_report'))

bugReportMiddleware.use('/feedback', express.json())
bugReportMiddleware.post('/feedback', (req, res) => {
    const body = req.body as Types.BugReportClientRequest
    const handler = FeedbackHandlerCoordinator.shared.find(body.feedback_id)

    if (handler === undefined) {
        res.status(500).end()
        return
    }

    const feedback: Types.BugReportServerItem = {
        submit_date: new Date(),
        submit_ip: req.ip,
        feedback_description: body.feedback_description,
        feedback_id: body.feedback_id,
        feedback_email: body.feedback_email,
        feedback_name: body.feedback_name,
        feedback_phone: body.feedback_phone
    }

    fs.writeFileSync(path.join(__dirname, '../temp/bug_report', handler!.date_string, `${handler!.feedback_id}.json`), JSON.stringify(feedback, undefined, 4))

    res.status(200).end()

})

export default bugReportMiddleware