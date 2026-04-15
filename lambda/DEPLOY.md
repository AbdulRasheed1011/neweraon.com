# Lambda Deployment Guide — AWS SES Email Sender

## What this does
Sends verification and password reset emails via AWS SES from `noreply@neweraon.com`.

---

## Step 1 — Verify your domain/email in SES

1. Go to **AWS Console → SES → Verified Identities**
2. Click **Create Identity**
3. Choose **Domain** → enter `neweraon.com`
4. Add the DNS records shown to your domain (in Route 53 / Namecheap / Cloudflare)
5. Wait for status to show **Verified** (usually a few minutes)

> While in SES Sandbox mode, you can only send to verified emails.
> Request **production access** (Moving out of Sandbox) to send to anyone.

---

## Step 2 — Create the Lambda function

1. Go to **AWS Console → Lambda → Create function**
2. Choose **Author from scratch**
3. Settings:
   - Name: `neweraon-send-email`
   - Runtime: **Node.js 20.x**
   - Architecture: x86_64
4. Click **Create function**

---

## Step 3 — Upload the code

1. In the Lambda console, click **Upload from → .zip file**
2. First create the zip locally:
   ```bash
   cd lambda
   npm install
   zip -r function.zip .
   ```
3. Upload `function.zip`
4. Set **Handler** to: `sendEmail.handler`
5. Set **Module type** to: ES Module (or add `"type":"module"` — already in package.json)

---

## Step 4 — Set environment variables in Lambda

In Lambda → Configuration → Environment variables, add:

| Key | Value |
|-----|-------|
| `FROM_EMAIL` | `noreply@neweraon.com` |
| `ALLOWED_ORIGIN` | `https://neweraon.com` |
| `AWS_REGION` | `us-east-1` (or your region) |

---

## Step 5 — Attach SES permissions to Lambda

1. In Lambda → Configuration → Permissions → click the **Execution role** link
2. In IAM, click **Add permissions → Attach policies**
3. Click **Create inline policy** → JSON tab → paste:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": "ses:SendEmail",
      "Resource": "*"
    }
  ]
}
```
4. Name it `SESsendEmail` → Save

---

## Step 6 — Create API Gateway

1. Go to **AWS Console → API Gateway → Create API**
2. Choose **HTTP API** (simpler, cheaper)
3. Click **Add integration → Lambda** → select `neweraon-send-email`
4. API name: `neweraon-email-api`
5. Click **Next** → configure route:
   - Method: `POST`
   - Resource path: `/send-email`
6. Stage: `$default` → **Create**
7. Copy the **Invoke URL** — looks like:
   `https://xxxxxxxxxx.execute-api.us-east-1.amazonaws.com`

---

## Step 7 — Update .env

Paste the full URL + `/send-email` into your `.env`:

```env
VITE_SES_API_URL=https://xxxxxxxxxx.execute-api.us-east-1.amazonaws.com/send-email
```

Restart `npm run dev` — email verification and password reset will now work via SES.
