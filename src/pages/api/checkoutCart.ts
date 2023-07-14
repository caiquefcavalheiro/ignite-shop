import { stripe } from "@/src/lib/stripe";
import { NextApiRequest, NextApiResponse } from "next";

interface Product {
  id: string;
  name: string;
  imageUrl: string;
  price: number;
}

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const { cart } = request.body;

  if (request.method !== "POST") {
    return response.status(405).json({ error: "Method not allowed" });
  }

  if (cart.length < 1) {
    return response.status(404).json({ error: "Empty Cart" });
  }

  const successUrl = `${process.env.NEXT_URL}/success?session_id={CHECKOUT_SESSION_ID}`;
  const cancelUrl = `${process.env.NEXT_URL}/`;

  const lineItems = cart.map((product: Product) => {
    return {
      price: product.id,
      quantity: 1,
    };
  });

  const checkoutSession = await stripe.checkout.sessions.create({
    success_url: successUrl,
    cancel_url: cancelUrl,
    mode: "payment",
    line_items: [...lineItems],
  });

  return response.status(201).json({
    checkoutUrl: checkoutSession.url,
  });
}
