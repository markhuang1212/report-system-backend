import { v4 } from 'uuid'
import dayjs from 'dayjs'
import fs from 'fs'
import path from 'path'

const DATE_FOLDER_FORMAT = 'YYYY-MM-DD'

if (fs.existsSync(path.join(__dirname, '../temp/abuse_report')) == false) {
    fs.mkdirSync(path.join(__dirname, '../temp/abuse_report'), { recursive: true })
}
if (fs.existsSync(path.join(__dirname, '../temp/bug_report')) == false) {
    fs.mkdirSync(path.join(__dirname, '../temp/bug_report'))
}
if (fs.existsSync(path.join(__dirname, '../temp/api_data')) == false) {
    fs.mkdirSync(path.join(__dirname, '../temp/api_data'))
}

class FeedbackHandlerCoordinator {

    static shared = new FeedbackHandlerCoordinator()

    feedbacks: Map<string, FeedbackHandler> = new Map()

    curr_date?: string = undefined

    mkdirIfNecessary() {
        const curr_date = dayjs().format(DATE_FOLDER_FORMAT)
        if (this.curr_date == curr_date)
            return
        fs.mkdirSync(path.join(__dirname, '../temp/bug_report', curr_date))
        fs.mkdirSync(path.join(__dirname, '../temp/abuse_report', curr_date))
        fs.mkdirSync(path.join(__dirname, '../temp/api_data', curr_date))
        this.curr_date = curr_date
    }

    find(id?: any) {
        if (typeof (id) !== 'string')
            return undefined
        return this.feedbacks.get(id)
    }

    add() {

        this.mkdirIfNecessary()

        const handler = new FeedbackHandler(this.curr_date!)

        this.feedbacks.set(handler.feedback_id, handler)

        setTimeout(() => {
            // Feedback handler will be unavailable after 10 minutes.
            this.feedbacks.delete(handler.feedback_id)
        }, 60 * 1000 * 10)

        return handler

    }

}

class FeedbackHandler {

    date_string: string
    feedback_id: string

    constructor(date_string: string) {
        this.feedback_id = v4()
        this.date_string = date_string
    }

}

export default FeedbackHandlerCoordinator