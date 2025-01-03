// import { Card, CardHeader, CardTitle } from "@/components/ui/card";
// import { captureAndFinalizePaymentService } from "@/services";
// import { useEffect } from "react";
// import { useLocation } from "react-router-dom";

// function PaymentReturnPage() {
//   const location = useLocation();
//   const params = new URLSearchParams(location.search);
//   const paymentReturn = params.get("payment-return");
//   console.log("ssl_id",paymentReturn);
  


//   useEffect(() => {
//     if (paymentReturn) {
//       async function capturePayment() {
//         const orderId = JSON.parse(sessionStorage.getItem("currentOrderId"));

//         const response = await captureAndFinalizePaymentService( orderId );
   
        


//         if (response?.success) {
//           sessionStorage.removeItem("currentOrderId");
//           window.location.href = "/student-courses";
//           console.log("payment response  ",response);
//         }
//         else{
//           console.log("payment response fail  ");
//         }
//       }

//       capturePayment();
//     }
//   }, [paymentReturn ]);

//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle>Processing payment... Please wait</CardTitle>
//       </CardHeader>
//     </Card>
//   );
// }

// export default PaymentReturnPage;


import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { captureAndFinalizePaymentService } from "@/services";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function PaymentReturnPage() {
  const location = useLocation();

  useEffect(() => {
    // Match the pathname exactly with "/payment-return"
    if (location.pathname === "/payment-return") {
      console.log("Path matches '/payment-return'. Proceeding with payment logic.");

      async function capturePayment() {
        try {
          // Fetch order ID from session storage
          const orderId = JSON.parse(sessionStorage.getItem("currentOrderId"));
          if (!orderId) {
            console.error("No current order ID found.");
            return;
          }

          // Call the payment service
          const response = await captureAndFinalizePaymentService(orderId);

          if (response?.success) {
            console.log("Payment was successful!", response);
            sessionStorage.removeItem("currentOrderId");
            setTimeout(() => {
              window.location.href = "/student-courses"; // Redirect after 2 seconds
            }, 2000);
          } else {
            console.error("Payment failed:", response);
          }
        } catch (error) {
          console.error("Error during payment capture:", error);
        }
      }

      capturePayment();
    } else {
      console.log("Path does not match '/payment-return'. Doing nothing.");
    }
  }, [location.pathname]); // Only re-run if the pathname changes

  return (
    <Card>
      <CardHeader>
        <CardTitle>Processing payment... Please wait</CardTitle>
      </CardHeader>
    </Card>
  );
}

export default PaymentReturnPage;
