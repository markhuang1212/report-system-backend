import express from 'express'
import cors from 'cors'
import { v4, validate } from 'uuid'
import fs from 'fs'
import path from 'path'
import helmet from 'helmet'
import ServeIndex from 'serve-index'
import appApiMiddleware from './AppApiMiddleware'
import bugReportMiddleware from './BugReportMiddleware'
import abuseReportMiddleware from './AbuseReportMiddleware'

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

const app = express()

const serveIndex =
    ServeIndex(path.join(__dirname, '../temp'), { stylesheet: path.join(__dirname, '../static/admin.css') })


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
app.use('/bug_report', express.static(path.join(__dirname, '../front-end/bug_report')))
app.use('/bug_report/*', (_, res) => res.sendFile(path.join(__dirname, '../front-end/bug_report/index.html')))

app.use('/abuse_report', abuseReportMiddleware)
app.use('/abuse_report', express.static(path.join(__dirname, '../front-end/abuse_report')))
app.use('/abuse_report/*', (_, res) => res.sendFile(path.join(__dirname, '../front-end/abuse_report/index.html')))

app.get('/apis', (req, res) => {
    res.json({
        bug_report: '/bug_report',
        abuse_report: '/abuse_report',
        apis: '/api'
    })
})

app.get('/version', (req, res) => {
    res.json({
        version: '1.1.0',
        version_int: 3
    })
})

app.listen(PORT, '0.0.0.0', () => {
    console.log('listening on port ' + PORT)
})

process.on('uncaughtException', (e) => {
    console.error('Fatal error. Server will terminate.')
    console.error(e)
    process.exit(1)
})