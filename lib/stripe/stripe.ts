import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-07-30.basil',
  typescript: true,
})

export const getStripeCustomer = async (email: string) => {
  const customers = await stripe.customers.list({ email })
  return customers.data[0]?.id
}

export const createStripeCustomer = async (email: string) => {
  const customer = await stripe.customers.create({ email })
  return customer.id
}

export const createStripeSubscription = async (
  customerId: string,
  priceId: string
) => {
  return await stripe.subscriptions.create({
    customer: customerId,
    items: [{ price: priceId }],
    payment_behavior: 'default_incomplete',
    payment_settings: { save_default_payment_method: 'on_subscription' },
    expand: ['latest_invoice.payment_intent'],
  })
}
