import express, { Router } from "express";
import { Types } from "./Types";
import FeedbackHandlerCoordinator from "./FeedbackHandler";
import fs from 'fs'
import path from 'path'


const bugReportMiddleware = Router()

bugReportMiddleware.post('/screenshot', (req, res) => {

})
bugReportMiddleware.post('/feedback', (req, res) => {

})

export default bugReportMiddleware