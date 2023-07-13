import { stripe } from "@/src/lib/stripe";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const priceId = "price_1NSwASEvFbNqaaSpOCxNRNor";

  const successUrl = `${process.env.NEXT_URL}/success`;
  const cancelUrl = `${process.env.NEXT_URL}/`;

  const checkoutSession = await stripe.checkout.sessions.create({
    success_url: successUrl,
    cancel_url: cancelUrl,
    mode: "payment",
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
  });

  return response.status(201).json({
    checkoutUrl: checkoutSession.url,
  });
}
