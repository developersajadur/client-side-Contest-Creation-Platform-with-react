import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import StripePaymentForm from "./StripePaymentForm";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
const StripePayment = () => {
    return (
        <div>
          
            <Elements stripe={stripePromise}>
        <StripePaymentForm></StripePaymentForm>
            </Elements>
        </div>
    );
};

export default StripePayment;