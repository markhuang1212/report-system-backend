## API the BACK-END provide

### Get `/version`

```json
{
    "version": "1.0.1",
    "version_int": 1
}
```

### Get `/apis`

```json
{
    "bug_report": "/bug_report",
    "abuse_report": "abuse_report",
    "api": "/api"
}
```

### Post `/api/report`

```json
{
    "feedback_afid": "string",
    "feedback_description": "string"
}
```

### Webpage `/bug_report`

### Webpage `/abuse_report`