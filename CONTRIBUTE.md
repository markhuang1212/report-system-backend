# Report System Backend

> This document is for modifying and contributing the source codes. Read `README.md` first to know how to build and deploy the project.

## Overview

All source codes is written in NodeJS (Typescript). `/front-end` contains the **production version** of the front-end. The source code of the front-end is separated to other projects. `/back-end` contains the **source codes** of the backend. The backend hosts the following contents

* `/admin/{admin_password}`: View the reported contents

APIs for bug report:

* GET `/feedback_id`
* POST `/screenshot`
* POST `/feedback`

APIs for abuse report:

* GET `/abuse_report/feedback_id`
* POST `/abuse_report/screenshot`
* POST `/abuse_report/feedback`

APIs for third-party submission:

* POST `/api/report`

Webpage for bug report:

* GET `/` serves the `front-end/bug_report` folder

Webpage for abuse report: 

* GET `/abuse_report/` serves the `front-end/abuse_report` folder