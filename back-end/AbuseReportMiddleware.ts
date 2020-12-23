import express, { Router } from "express";
import { Types } from "./Types";
import FeedbackHandlerCoordinator from "./FeedbackHandler";
import fs from 'fs'
import path from 'path'
import getFeedbackId from "./getFeedbackId";
import postScreenshot from "./postScreenshot";


const abuseReportMiddleware = Router()

abuseReportMiddleware.use(getFeedbackId)

abuseReportMiddleware.use(postScreenshot('abuse_report'))

abuseReportMiddleware.use('/feedback', express.json())
abuseReportMiddleware.post('/feedback', (req, res) => {
    const body = req.body as Types.AbuseReportClientRequest
    const handler = FeedbackHandlerCoordinator.shared.find(body.feedback_id)

    if (handler === undefined) {
        console.log('/abuse_report/feedback failed')
        res.status(500).end()
        return
    }

    const feedback: Types.AbuseReportServerItem = {
        submit_date: new Date(),
        submit_ip: req.ip,
        feedback_description: body.feedback_description,
        feedback_id: body.feedback_id,
        feedback_category: body.feedback_category,
        feedback_email: body.feedback_email,
        feedback_name: body.feedback_name,
        feedback_phone: body.feedback_phone
    }

    fs.writeFileSync(path.join(__dirname, '../temp/abuse_report', handler!.date_string, `${handler!.feedback_id}.json`), JSON.stringify(feedback, undefined, 4))

    res.status(200).end()

})

export default abuseReportMiddleware