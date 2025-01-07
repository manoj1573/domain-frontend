import { endDate } from './counter.js';
import { env } from './utils.js';

const availNowBtn = document.getElementsByClassName('pay-now');

const buyPackage = (user_details) => {
    axios.post(env.BASE_URL + "/payment/capturePayment",{
        bundleName:user_details.bundleName, 
        isTimeUp:user_details.isTimeUp, 
        amount:user_details.amount
    })
    .then((orderResponse) => {
        // console.log("Payment Response: ",orderResponse);
        if(!orderResponse.data.success)
            throw new Error(orderResponse.data.message);

            const options = {
                key: env.RAZORPAY_KEY,
                currency: orderResponse.data.data.currency,
                amount: orderResponse.data.data.amount,
                order_id: orderResponse.data.data.id,
                name: "Maverick",
                // image: rzpLogo,
                prefill:{
                    name: user_details.name,
                    email: user_details.email,
                    phone: user_details.phone,
                    address: user_details.address,
                },
                handler: function(response){
                    // console.log(response);
                    sendPaymentSuccessEmail(
                        {...response,name:user_details.name,email: user_details.email},
                        orderResponse.data.data.amount
                    );
                    verifyPayment({...response,name:user_details.name,email: user_details.email});
                }
            }
            var rzp1 = new Razorpay(options);
            rzp1.open();
            rzp1.on("payment.failed",(response)=>{
                // toast.error("Oops! Payment Failed");
                console.log(response.error);
            })
    },
    (err)=>{console.log("PAYMENT API ERROR.......",err);});
}

//send payment successfull mail
function sendPaymentSuccessEmail(response,amount){
    axios.post(env.BASE_URL + "/payment/sendPaymentSuccessEmail",
        {
            orderId: response.razorpay_order_id,
            paymentId: response.razorpay_payment_id,
            amount: amount,
            name: response.name,
            email: response.email
        }
    ).then(
        (response)=>{
            // console.log("PAYMENT SUCCESS EMAIL RESPONSE....",response)
        },
        (err)=>{
            console.log("PAYMENT SUCCESS EMAIL ERROR....",err);
        }
    );
}

//verify the payment to enroll the student
function verifyPayment(bodyData){
    // console.log(response);
    axios.post(env.BASE_URL + "/payment/verifySignature",bodyData).then(
        (response)=>{
            if(!response.data.success)
                throw new Error(response.data.message);

            // console.log("PAYMENT VERIFY API RESPONSE....",response);
        },
        (err)=>{
            console.log("PAYMENT VERIFY API RESPONSE....",err);
        }
    );
}

// document.addEventListener("DOMContentLoaded", function () {
// });
// timerInterval();

Array.from(availNowBtn).forEach(btn => btn.addEventListener('click',(e)=>{
        e.preventDefault();
        // setBundleName(btn.getAttribute('bundle-name'));
        // bundleName = getBundleName();
        // console.log(bundleName)
        location.href = "checkout.html"
    }));


document.getElementById('rzp-button1').addEventListener("click",function(e){
    e.preventDefault();
    
    let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    let phoneRegex = /^(?:\d{10}|\w+@\w+\.\w{2,3})$/;

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const address = document.getElementById("address").value;
    const bundleName = document.getElementById("bundle-name").value;

    if(!name || !email || !phone || !address){
        alert("Fill Complete Details")
        return;
    }
    
    
    if (!emailRegex.test(email)) {
        alert("Invalid Email address");
        return;
    }
    
    if (!phoneRegex.test(phone)) {
        alert("Invalid Phone Number");
        return;
    }

    if(!bundleName){
        alert("Please Select bundle Name you want to buy")
        return;
    }

    console.log(endDate < Date.now())
    buyPackage({name,email,phone,address,amount:99,bundleName,isTimeUp: endDate < Date.now() ? true : false});
});