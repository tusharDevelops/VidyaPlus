import { toast } from "react-hot-toast";
import { studentEndpoints } from "../apis";
import { apiConnector } from "../apiConnector";
import rzpLogo from "../../assets/Logo/Logo-Full-Dark.png"
import { setPaymentLoading } from "../../redux/slices/courseSlice";
import { resetCart } from "../../redux/slices/cartSlice";

const {COURSE_PAYMENT_API, COURSE_VERIFY_API, SEND_PAYMENT_SUCCESS_EMAIL_API} = studentEndpoints;

// Load the Razorpay checkout script into the DOM
function loadScript(src) {
    return new Promise((resolve) => {
        const script = document.createElement("script")
        script.src = src;
        script.onload = () => resolve(true)
        script.onerror = () => resolve(false)
        document.body.appendChild(script);
    })
}

export async function buyCourse(token, courses, userDetails, navigate, dispatch) {
    const toastId = toast.loading("Initiating payment...");
    try {
        // Load Razorpay SDK
        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
        if (!res) {
            toast.error("RazorPay SDK failed to load. Check your internet connection.");
            return;
        }

        // Create order on backend
        const orderResponse = await apiConnector("POST", COURSE_PAYMENT_API,
            { courses },
            { Authorization: `Bearer ${token}` }
        )

        if (!orderResponse.data.success) {
            throw new Error(orderResponse.data.message);
        }

        const orderData = orderResponse.data.message;

        // Open Razorpay checkout
        const options = {
            // Key comes from the backend order or REACT_APP_ prefixed env var
            key: process.env.REACT_APP_RAZORPAY_KEY || "rzp_test_ST5Blq7saSnx34",
            currency: orderData.currency,
            amount: `${orderData.amount}`,
            order_id: orderData.id,
            name: "VidyaPlus",
            description: "Thank You for Purchasing the Course",
            image: rzpLogo,
            prefill: {
                name: `${userDetails.firstName} ${userDetails.lastName}`,
                email: userDetails.email,
            },
            handler: function(response) {
                // Send payment success email
                sendPaymentSuccessEmail(response, orderData.amount, token);
                // Verify payment & enroll student
                verifyPayment({ ...response, courses }, token, navigate, dispatch);
            },
        }

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
        paymentObject.on("payment.failed", function(response) {
            toast.error("Payment failed. Please try again.");
            console.error("Razorpay payment failed:", response.error);
        })

    } catch (error) {
        console.log("PAYMENT API ERROR.....", error);
        toast.error(error?.message || "Could not initiate payment. Please try again.");
    }
    toast.dismiss(toastId);
}

async function sendPaymentSuccessEmail(response, amount, token) {
    try {
        await apiConnector("POST", SEND_PAYMENT_SUCCESS_EMAIL_API, {
            orderId: response.razorpay_order_id,
            paymentId: response.razorpay_payment_id,
            amount,
        }, {
            Authorization: `Bearer ${token}`
        })
    } catch (error) {
        console.log("PAYMENT SUCCESS EMAIL ERROR....", error);
    }
}

async function verifyPayment(bodyData, token, navigate, dispatch) {
    const toastId = toast.loading("Verifying payment....");
    dispatch(setPaymentLoading(true));
    try {
        const response = await apiConnector("POST", COURSE_VERIFY_API, bodyData, {
            Authorization: `Bearer ${token}`,
        })

        if (!response.data.success) {
            throw new Error(response.data.message);
        }
        toast.success("Payment successful! You are now enrolled in the course.");
        navigate("/dashboard/enrolled-courses");
        dispatch(resetCart());
    } catch (error) {
        console.log("PAYMENT VERIFY ERROR....", error);
        toast.error("Could not verify payment. Please contact support.");
    }
    toast.dismiss(toastId);
    dispatch(setPaymentLoading(false));
}