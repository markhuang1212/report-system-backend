import { Router } from "express";
import FeedbackHandlerCoordinator from "./FeedbackHandler";


const getFeedbackId = Router()
getFeedbackId.get('/feedback_id', (req, res) => {
    const handler = FeedbackHandlerCoordinator.shared.add()
    res.json({
        code: 0,
        msg: 'success',
        data: {
            feedback_id: handler.feedback_id
        }
    })
})


export default getFeedbackId