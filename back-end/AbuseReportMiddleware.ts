import express, { Router } from "express";
import { Types } from "./Types";
import FeedbackHandlerCoordinator from "./FeedbackHandler";
import fs from 'fs'
import path from 'path'


const abuseReportMiddleware = Router()

abuseReportMiddleware.post('/screenshot', (req, res) => {

})
abuseReportMiddleware.post('/feedback', (req, res) => {

})

export default abuseReportMiddleware