import express from 'express'
import cors from 'cors'
import { v4, validate } from 'uuid'
import fs from 'fs'
import path from 'path'
import helmet from 'helmet'
import FeedbackHandlerCoordinator from './FeedbackHandler'
import ServeIndex from 'serve-index'
import appApiMiddleware from './AppApiMiddleware'
import bugReportMiddleware from './BugReportMiddleware'
import abuseReportMiddleware from './AbuseReportMiddleware'

const app = express()
const serveIndex = ServeIndex(path.join(__dirname, '../temp'), { stylesheet: path.join(__dirname, '../static/admin.css') })

const SCREENSHOT_SIZE_LIMIT_BYTES = 8192

let PORT: number
let CORS: string
let VERSION: string
let VERSION_INT: number
let PASSWORD: string

try {
    const envJson = fs.readFileSync(path.join(__dirname, '../env.json'), 'utf-8')
    const packageJson = fs.readFileSync(path.join(__dirname, '../package.json'), 'utf-8')
    const envObj = JSON.parse(envJson)
    const packageObj = JSON.parse(packageJson)
    PORT = parseInt(envObj.port)
    CORS = process.env.NODE_ENV == 'development' ? '*' : envObj.cors
    VERSION = packageObj.version
    VERSION_INT = packageObj.version_int
    PASSWORD = envObj.password
} catch {
    console.error('Fatal error: cannot load env.json properly')
    process.exit(1)
}

app.use(helmet.hidePoweredBy())

app.use(cors({
    origin: CORS
}))

app.use('/admin/:password/', (req, res, next) => {
    if (req.params['password'] == PASSWORD) {
        next()
    } else {
        res.json({
            code: 1,
            msg: 'Unauthorized'
        })
    }
})
app.use('/admin/:password/', serveIndex, express.static(path.join(__dirname, '../temp')))

app.use('/api', appApiMiddleware)
app.use('/bug_report', bugReportMiddleware)
app.use('/abuse_report', abuseReportMiddleware)

app.listen(PORT, '0.0.0.0', () => {
    console.log('listening on port ' + PORT)
})

process.on('uncaughtException', (e) => {
    console.error('Fatal error. Server will terminate.')
    console.error(e)
    process.exit(1)
})