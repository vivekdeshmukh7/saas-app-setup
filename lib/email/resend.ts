import { Resend } from 'resend'

export const resend = new Resend(process.env.RESEND_API_KEY)

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${process.env.NEXT_PUBLIC_SITE_URL}/auth/verify?token=${token}`
  
  await resend.emails.send({
    from: 'no-reply@yourdomain.com',
    to: email,
    subject: 'Verify your email',
    html: `Click <a href="${confirmLink}">here</a> to verify your email address.`
  })
}

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `${process.env.NEXT_PUBLIC_SITE_URL}/auth/reset-password?token=${token}`
  
  await resend.emails.send({
    from: 'no-reply@yourdomain.com',
    to: email,
    subject: 'Reset your password',
    html: `Click <a href="${resetLink}">here</a> to reset your password.`
  })
}
