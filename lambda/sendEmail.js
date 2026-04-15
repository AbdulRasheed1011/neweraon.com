/**
 * AWS Lambda — Email sender via SES
 * Handles: email verification + password reset links
 *
 * Deploy this file as a Lambda function (Node.js 20.x)
 * Attach an IAM role with permission: ses:SendEmail
 * Expose via API Gateway (HTTP API) — POST /send-email
 *
 * Environment variables to set in Lambda console:
 *   FROM_EMAIL   = noreply@neweraon.com   (must be verified in SES)
 *   ALLOWED_ORIGIN = https://neweraon.com  (your site domain, for CORS)
 */

import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses'

const ses = new SESClient({ region: process.env.AWS_REGION || 'us-east-1' })

const FROM_EMAIL     = process.env.FROM_EMAIL     || 'noreply@neweraon.com'
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || 'https://neweraon.com'

const CORS_HEADERS = {
  'Access-Control-Allow-Origin':  ALLOWED_ORIGIN,
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
}

// ── Email templates ────────────────────────────────────────────────
function verifyEmailTemplate(toName, verifyLink) {
  return {
    subject: 'Verify your email — Abdul.AI',
    html: `
      <!DOCTYPE html>
      <html>
        <body style="margin:0;padding:0;background:#0a0a0f;font-family:'Inter',Arial,sans-serif;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a0f;padding:40px 20px;">
            <tr><td align="center">
              <table width="520" cellpadding="0" cellspacing="0" style="background:#13131a;border:1px solid #2a2a3a;border-radius:16px;overflow:hidden;">
                <!-- Header bar -->
                <tr><td style="height:4px;background:linear-gradient(90deg,#7c3aed,#06b6d4);"></td></tr>
                <!-- Logo -->
                <tr><td style="padding:36px 40px 0;text-align:center;">
                  <div style="font-size:22px;font-weight:900;color:#f1f1f3;letter-spacing:-0.03em;">
                    Abdul<span style="color:#06b6d4;">.</span>AI
                  </div>
                </td></tr>
                <!-- Body -->
                <tr><td style="padding:28px 40px 36px;">
                  <h2 style="color:#f1f1f3;font-size:20px;font-weight:800;margin:0 0 12px;">Verify your email address</h2>
                  <p style="color:#8b8ba7;font-size:14px;line-height:1.75;margin:0 0 28px;">
                    Hi ${toName},<br><br>
                    Thanks for creating an account on Abdul.AI. Click the button below to verify your email address and activate your account.
                  </p>
                  <div style="text-align:center;margin-bottom:28px;">
                    <a href="${verifyLink}"
                      style="display:inline-block;background:linear-gradient(135deg,#7c3aed,#2563eb);color:#fff;text-decoration:none;font-size:15px;font-weight:700;padding:14px 36px;border-radius:10px;">
                      Verify Email Address
                    </a>
                  </div>
                  <p style="color:#5a5a72;font-size:12px;line-height:1.7;margin:0;">
                    Or copy this link into your browser:<br>
                    <a href="${verifyLink}" style="color:#7c3aed;word-break:break-all;">${verifyLink}</a>
                  </p>
                  <hr style="border:none;border-top:1px solid #2a2a3a;margin:24px 0;">
                  <p style="color:#5a5a72;font-size:12px;margin:0;">
                    This link expires in 24 hours. If you did not create an account, you can safely ignore this email.
                  </p>
                </td></tr>
                <!-- Footer -->
                <tr><td style="padding:16px 40px 24px;border-top:1px solid #2a2a3a;text-align:center;">
                  <p style="color:#5a5a72;font-size:12px;margin:0;">
                    Abdul Rasheed &nbsp;·&nbsp; <a href="https://neweraon.com" style="color:#7c3aed;text-decoration:none;">neweraon.com</a>
                  </p>
                </td></tr>
              </table>
            </td></tr>
          </table>
        </body>
      </html>
    `,
    text: `Hi ${toName},\n\nVerify your Abdul.AI email address:\n\n${verifyLink}\n\nThis link expires in 24 hours.\n\n— Abdul Rasheed`,
  }
}

function resetPasswordTemplate(toName, resetLink) {
  return {
    subject: 'Reset your password — Abdul.AI',
    html: `
      <!DOCTYPE html>
      <html>
        <body style="margin:0;padding:0;background:#0a0a0f;font-family:'Inter',Arial,sans-serif;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a0f;padding:40px 20px;">
            <tr><td align="center">
              <table width="520" cellpadding="0" cellspacing="0" style="background:#13131a;border:1px solid #2a2a3a;border-radius:16px;overflow:hidden;">
                <tr><td style="height:4px;background:linear-gradient(90deg,#7c3aed,#06b6d4);"></td></tr>
                <tr><td style="padding:36px 40px 0;text-align:center;">
                  <div style="font-size:22px;font-weight:900;color:#f1f1f3;letter-spacing:-0.03em;">
                    Abdul<span style="color:#06b6d4;">.</span>AI
                  </div>
                </td></tr>
                <tr><td style="padding:28px 40px 36px;">
                  <h2 style="color:#f1f1f3;font-size:20px;font-weight:800;margin:0 0 12px;">Reset your password</h2>
                  <p style="color:#8b8ba7;font-size:14px;line-height:1.75;margin:0 0 28px;">
                    Hi ${toName},<br><br>
                    We received a request to reset the password for your Abdul.AI account. Click the button below to choose a new password.
                  </p>
                  <div style="text-align:center;margin-bottom:28px;">
                    <a href="${resetLink}"
                      style="display:inline-block;background:linear-gradient(135deg,#7c3aed,#2563eb);color:#fff;text-decoration:none;font-size:15px;font-weight:700;padding:14px 36px;border-radius:10px;">
                      Reset Password
                    </a>
                  </div>
                  <p style="color:#5a5a72;font-size:12px;line-height:1.7;margin:0;">
                    Or copy this link into your browser:<br>
                    <a href="${resetLink}" style="color:#7c3aed;word-break:break-all;">${resetLink}</a>
                  </p>
                  <hr style="border:none;border-top:1px solid #2a2a3a;margin:24px 0;">
                  <p style="color:#5a5a72;font-size:12px;margin:0;">
                    This link expires in 1 hour. If you did not request a password reset, ignore this email — your account is safe.
                  </p>
                </td></tr>
                <tr><td style="padding:16px 40px 24px;border-top:1px solid #2a2a3a;text-align:center;">
                  <p style="color:#5a5a72;font-size:12px;margin:0;">
                    Abdul Rasheed &nbsp;·&nbsp; <a href="https://neweraon.com" style="color:#7c3aed;text-decoration:none;">neweraon.com</a>
                  </p>
                </td></tr>
              </table>
            </td></tr>
          </table>
        </body>
      </html>
    `,
    text: `Hi ${toName},\n\nReset your Abdul.AI password:\n\n${resetLink}\n\nThis link expires in 1 hour. If you didn't request this, ignore this email.\n\n— Abdul Rasheed`,
  }
}

// ── Lambda handler ─────────────────────────────────────────────────
export const handler = async (event) => {
  // Handle CORS preflight
  if (event.requestContext?.http?.method === 'OPTIONS') {
    return { statusCode: 200, headers: CORS_HEADERS, body: '' }
  }

  try {
    const body = JSON.parse(event.body || '{}')
    const { type, toEmail, toName, link } = body

    // Validate input
    if (!type || !toEmail || !toName || !link) {
      return {
        statusCode: 400,
        headers: CORS_HEADERS,
        body: JSON.stringify({ error: 'Missing required fields: type, toEmail, toName, link' }),
      }
    }
    if (!['verify', 'reset'].includes(type)) {
      return {
        statusCode: 400,
        headers: CORS_HEADERS,
        body: JSON.stringify({ error: 'type must be "verify" or "reset"' }),
      }
    }

    // Build email content
    const template = type === 'verify'
      ? verifyEmailTemplate(toName, link)
      : resetPasswordTemplate(toName, link)

    // Send via SES
    await ses.send(new SendEmailCommand({
      Source:      `Abdul Rasheed <${FROM_EMAIL}>`,
      Destination: { ToAddresses: [toEmail] },
      Message: {
        Subject: { Data: template.subject, Charset: 'UTF-8' },
        Body: {
          Html: { Data: template.html, Charset: 'UTF-8' },
          Text: { Data: template.text, Charset: 'UTF-8' },
        },
      },
    }))

    return {
      statusCode: 200,
      headers: CORS_HEADERS,
      body: JSON.stringify({ success: true }),
    }
  } catch (err) {
    console.error('SES send error:', err)
    return {
      statusCode: 500,
      headers: CORS_HEADERS,
      body: JSON.stringify({ error: 'Failed to send email', detail: err.message }),
    }
  }
}
