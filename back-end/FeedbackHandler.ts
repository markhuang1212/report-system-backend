import { v4 } from 'uuid'
import dayjs from 'dayjs'
import fs from 'fs'
import path from 'path'

const DATE_FOLDER_FORMAT = 'YYYY-MM-DD'

if (fs.existsSync(path.join(__dirname, '../temp')) == false) {
    fs.mkdirSync(path.join(__dirname, '../temp'))
}

class FeedbackHandlerCoordinator {

    static shared = new FeedbackHandlerCoordinator()

    feedbacks: Map<string, FeedbackHandler> = new Map()

    curr_date?: string = undefined

    mkdirIfNecessary() {
        const curr_date = dayjs().format(DATE_FOLDER_FORMAT)
        if (this.curr_date == curr_date)
            return
        if (fs.existsSync(path.join(__dirname, '../temp', curr_date)) == true) {
            this.curr_date = curr_date
            return
        }
        fs.mkdirSync(path.join(__dirname, '../temp', curr_date))
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