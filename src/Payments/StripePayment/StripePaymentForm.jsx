import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import useAxiosPublic from "@/Hooks/useAxiosPublic";
// import { useLocation } from "react-router-dom";
import useAuth from "@/Hooks/useAuth";
import toast from "react-hot-toast";

const StripePaymentForm = ({contestName, contestPrice, contestId}) => {
    const [error, setError] = useState(null);
    const [clientSecret, setClientSecret] = useState("");
    const stripe = useStripe();
    const elements = useElements();
    const axiosPublic = useAxiosPublic();
    const {user} = useAuth();

    useEffect(() => {
        const createPaymentIntent = async () => {
            const res = await axiosPublic.post("/create-payment-intent", { price: 4 });
            setClientSecret(res.data.clientSecret);
        };
        createPaymentIntent();
    }, [axiosPublic]);

    const handlePayment = async (e) => {
        e.preventDefault();
        if (!stripe || !elements || !clientSecret) {
            return;
        }
        
        const card = elements.getElement(CardElement);
        if (card == null) {
            return;
        }
        
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            setError(error);
        } else {
            console.log('[PaymentMethod]', paymentMethod);
            setError(null); // Clear previous errors if any
            
            const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: user?.displayName || "Name Not Found",
                        email: user?.email || "Email Not Found",
                    },
                },
            });

            if (confirmError) {
                setError(confirmError);
            } else {
                if(paymentIntent.status === "succeeded"){
                    const paymentInfo = {
                        amount: contestPrice,
                        email: user?.email || "Email Not Found",
                        name: user?.displayName || "Name Not Found",
                        photo: user?.photoURL || "Photo Not Found",
                        transactionId: paymentIntent.id,
                        contestName: contestName,
                        contestId: contestId,
                        date: new Date()
                    }
                    axiosPublic.post("/payment", paymentInfo)
                   .then(res => 
                    {
                       if(res){
                        toast.success(`${contestPrice}$ Payment successful`)
                        elements.getElement(CardElement).clear();
                       }
                    }
                   )
                }
            }
        }
    };

    return (
        <div>
            <form className="flex flex-col justify-center py-20" onSubmit={handlePayment}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                {error && <div className="text-red-500 mt-4">{error.message}</div>}
                <Button className="bg-[#3E54A3] hover:bg-[#3E54A3] rounded-[8px] text-white text-lg mt-8" type="submit" disabled={!stripe || !clientSecret}>
                    Pay
                </Button>
            </form>
        </div>
    );
};

export default StripePaymentForm;
