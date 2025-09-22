---
title: Email / SMTP Troubleshooting
categories: [Self-Hosted]
description: >
  This guide explains how to diagnose email sending issues in Layer5 Cloud deployments using the enhanced debug logging and testing features. 
---

# Email Debugging Guide for Layer5 Cloud

This guide explains how to diagnose email sending issues in Layer5 Cloud deployments using the enhanced debug logging and testing features.

## Overview

Email issues in Layer5 Cloud can occur due to various reasons including SMTP configuration problems, template errors, recipient validation issues, or network connectivity problems. This guide provides comprehensive debugging tools and techniques.

## Debug Log Levels

To enable email debugging, set the `LOG_LEVEL` environment variable to `5` (Debug) or `6` (Trace):

```bash
# In config.env or environment variables
LOG_LEVEL=5
```

## Testing Email Configuration

### 1. Email Configuration Test Endpoint

Test the basic email configuration without sending actual emails:

```bash
curl -X GET "https://your-domain.com/api/system/email/test"
```

**Expected Response (Success):**
```json
{
  "status": "success",
  "message": "Email configuration is valid",
  "timestamp": "1695312000",
  "smtp_host": "smtp.gmail.com",
  "smtp_port": "587",
  "smtp_username": "your-email@domain.com"
}
```

**Expected Response (Error):**
```json
{
  "error": "Email configuration test failed: SMTP_HOST environment variable is not set"
}
```

### 2. Authenticated Email Send Test (Provider Admin Only)

Send an actual test email to verify end-to-end email functionality. This endpoint requires authentication and provider admin role:

```bash
curl -X POST "https://cloud.layer5.io/api/system/email/test" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "to": "test@example.com",
    "subject": "Layer5 Cloud Email Test"
  }'
```

**Request Body:**
```json
{
  "to": "test@example.com",
  "subject": "Layer5 Cloud Email Test (optional)"
}
```

**Expected Response (Success):**
```json
{
  "status": "success",
  "message": "Test email sent successfully",
  "timestamp": "1695312000",
  "sent_to": "test@example.com"
}
```

**Expected Response (Error - Unauthorized):**
```json
{
  "error": "Unauthorized: provider admin role required"
}
```

**Expected Response (Error - Invalid Email):**
```json
{
  "error": "Invalid email address format"
}
```

**Expected Response (Error - Email Configuration):**
```json
{
  "error": "Email configuration validation failed: SMTP authentication failed"
}
```

### 3. Required Environment Variables

Ensure all SMTP environment variables are properly configured:

```bash
# Required SMTP Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USERNAME=your-email@domain.com
SMTP_PASSWORD=your-app-password
```

## Debug Log Examples

When `LOG_LEVEL=5`, you'll see detailed debug logs for email operations:

### 1. SMTP Configuration Validation

```log
DEBUG SMTP Configuration Debug host=smtp.gmail.com port=587 username=user@domain.com password_set=true password_length=16
```

### 2. Template Processing

```log
DEBUG Email template parsing template_paths=[email-templates/meshery-cloud/email.body.gotmpl, ...] template_count=5 base_template_path=email-templates/meshery-cloud/email.body.gotmpl
DEBUG Email template parsed successfully template_name=email.body.gotmpl
DEBUG Executing email template email_type=welcome recipients=user@example.com has_org_vars=true org_name=MyOrg
DEBUG Email template executed successfully body_length=2048 email_type=welcome
```

### 3. Email Construction and Sending

```log
DEBUG Email construction completed final_email_size=2156 has_cc=false cc_count=0 recipient_count=1
DEBUG Attempting SMTP send smtp_endpoint=smtp.gmail.com:587 from_user=sender@domain.com to_recipients=[user@example.com] email_size_bytes=2156
INFO Email sent successfully recipients=user@example.com subject="Welcome to Layer5 Cloud"
```

### 4. Error Scenarios

```log
ERROR SMTP send failed - detailed error info error_type=*net.OpError error_message="dial tcp: lookup smtp.gmail.com: no such host" smtp_host=smtp.gmail.com smtp_port=587 smtp_username=sender@domain.com recipients=[user@example.com]
```

## Flow Emails (Kratos Integration)

Flow emails (registration, password recovery, etc.) use a separate logging mechanism. When debugging flow emails, look for logs with `[DEBUG]` and `[ERROR]` prefixes:

```log
[DEBUG] Flow email attempt - Host: smtp.gmail.com, Port: 587, Username: sender@domain.com, Password set: true
[DEBUG] Flow email - Subject template: valid/email-recover-subject.gotmpl, Body template: valid/email-recover.html, Recipient: user@example.com
[DEBUG] Flow email subject template parsed successfully
[DEBUG] Flow email subject generated: Recover access to your account
[DEBUG] Flow email body generated, length: 1024
[DEBUG] Flow email constructed, total size: 1200 bytes
[DEBUG] Flow email attempting send to SMTP: smtp.gmail.com:587
[SUCCESS] Flow email sent successfully to: user@example.com
```

## Common Issues and Solutions

### 1. SMTP Configuration Errors

**Issue:** `SMTP configuration error: SMTP_HOST is empty`

**Solution:** 
- Verify all SMTP environment variables are set
- Check that environment variables are properly loaded in your deployment
- Use the test endpoint to validate configuration

### 2. Authentication Failures

**Issue:** `SMTP authentication failed for user 'sender@domain.com'`

**Solution:**
- Verify SMTP username and password are correct
- For Gmail, use App Passwords instead of regular passwords
- Check if 2FA is enabled and properly configured

### 3. Template Errors

**Issue:** `Email template missing or inaccessible`

**Solution:**
- Verify email template files exist in `config/email-templates/`
- Check file permissions
- Validate template syntax and required variables

### 4. Recipient Validation Errors

**Issue:** `Email recipient validation failed`

**Solution:**
- Verify email addresses are valid and properly formatted
- Check for empty recipient lists
- Validate email addresses contain `@` symbol

### 5. Network Connectivity Issues

**Issue:** `dial tcp: lookup smtp.gmail.com: no such host`

**Solution:**
- Check network connectivity to SMTP server
- Verify firewall rules allow SMTP traffic
- Test DNS resolution for SMTP host

## Development Mode

In development environment (`ENVIRONMENT=development`), email content is logged instead of being sent:

```log
INFO Development mode - Email details recipients=user@example.com subject="Test Email" body="<html>...</html>"
```

## Error Codes Reference

| Error Code | Description | Common Causes |
|------------|-------------|---------------|
| meshery_cloud-1092 | Failed to send email | Network issues, SMTP server down |
| meshery_cloud-1144 | SMTP authentication failed | Invalid credentials |
| meshery_cloud-1145 | SMTP send mail error | Server rejection, quota exceeded |
| meshery_cloud-1146 | SMTP configuration error | Missing environment variables |
| meshery_cloud-1147 | Email template missing | Template files not found |
| meshery_cloud-1148 | Email recipient validation failed | Invalid email addresses |

## Monitoring and Alerting

Consider setting up monitoring for email-related metrics:

1. **Email Send Success Rate**: Monitor successful vs failed email sends
2. **SMTP Response Times**: Track SMTP server response times
3. **Template Processing Time**: Monitor email template rendering performance
4. **Configuration Validation**: Regular health checks for email configuration

## Best Practices

1. **Use Debug Logs Sparingly**: Only enable debug logging when troubleshooting
2. **Secure Credentials**: Never log SMTP passwords in plaintext
3. **Regular Testing**: Use the test endpoint to validate configuration regularly
4. **Monitor Quotas**: Keep track of email service provider quotas and limits
5. **Template Validation**: Test email templates thoroughly before deployment

## Troubleshooting Checklist

- [ ] Check `LOG_LEVEL` is set to 5 or 6 for debug logging
- [ ] Verify all SMTP environment variables are configured
- [ ] Test email configuration using `/api/system/email/test` endpoint
- [ ] Check network connectivity to SMTP server
- [ ] Validate email template files exist and are accessible
- [ ] Verify recipient email addresses are valid
- [ ] Check SMTP server logs for additional error details
- [ ] Monitor email service provider quotas and limits
