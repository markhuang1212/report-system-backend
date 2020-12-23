declare namespace Types {

    interface BugReportClientRequest {
        feedback_id: string
        feedback_name: string
        feedback_email: string
        feedback_description: string
        feedback_phone: string
        feedback_category: string
    }

    interface AbuseReportClientRequest {
        feedback_id: string
        feedback_name: string
        feedback_email: string
        feedback_description: string
        feedback_phone: string
        feedback_category: string
    }

    interface BugReportServerItem {
        submit_date: Date
        submit_ip: string
        feedback_id: string
        feedback_name?: string
        feedback_email?: string
        feedback_description: string
        feedback_phone?: string
        feedback_category?: string

        feedback_afid?: string
    }

    interface AbuseReportServerItem {
        submit_date: Date
        submit_ip: string
        feedback_id: string
        feedback_name?: string
        feedback_email?: string
        feedback_description: string
        feedback_phone?: string
        feedback_category?: string

        feedback_afid?: string
    }

    interface APIReportFrontendRequest {
        feedback_afid: string
        feedback_description: string
    }

    interface APIReportServerItem {
        submit_date: Date
        submit_ip: string
        feedback_id: string
        feedback_afid: string
        feedback_description: string
    }

}

export type { Types }