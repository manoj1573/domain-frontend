export const env = {
    // RAZORPAY_KEY : "rzp_test_qF9raF9hCLJIqv",
    RAZORPAY_KEY: "rzp_live_fD7GzfsSLYcwhn",
    // BASE_URL: "http://localhost:4000/api/v1"
    BASE_URL: "https://domain-backend.onrender.com/api/v1"
}

let isTimeUp = false;
let isSaleStarted = false;
let bundleName = null;

export const getBundleName = ()=>{
    return bundleName;
}

export const setBundleName = (val)=>{
    bundleName = val
}

export const getTimeUp = ()=>{
    return isTimeUp;
}

export const setTimeUp = (val)=>{
    isTimeUp = val
}

export const getSaleStatus = ()=>{
    return isSaleStarted;
}

export const setSaleStatus = (val)=>{
    isSaleStarted = val
}