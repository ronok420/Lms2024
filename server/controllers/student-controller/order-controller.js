const paypal = require("../../helpers/paypal");
const Order = require("../../models/Order");
const Course = require("../../models/Course");
const StudentCourses = require("../../models/StudentCourses");
const dotenv = require('dotenv');
dotenv.config();
 // SSLCommerz payment initialization
 const SSLCommerzPayment = require('sslcommerz-lts')
 const store_id = process.env.STORE_ID;
 const store_passwd =  process.env.STORE_PASS;
 const is_live = false //true for live, false for sandbox
 

// const createOrder = async (req, res) => {
//   try {
//     const {
//       userId,
//       userName,
//       userEmail,
//       orderStatus,
//       paymentMethod,
//       paymentStatus,
//       orderDate,
//       paymentId,
//       payerId,
//       instructorId,
//       instructorName,
//       courseImage,
//       courseTitle,
//       courseId,
//       coursePricing,
//     } = req.body;

//     const create_payment_json = {
//       intent: "sale",
//       payer: {
//         payment_method: "sslEcommerz",
//       },
//       redirect_urls: {
//         return_url: `${process.env.CLIENT_URL}/payment-return`,
//         cancel_url: `${process.env.CLIENT_URL}/payment-cancel`,
//       },
//       transactions: [
//         {
//           item_list: {
//             items: [
//               {
//                 name: courseTitle,
//                 sku: courseId,
//                 price: coursePricing,
//                 currency: "BDT",
//                 quantity: 1,
//               },
//             ],
//           },
//           amount: {
//             currency: "BDT",
//             total: coursePricing.toFixed(2),
//           },
//           description: courseTitle,
//         },
//       ],
//     };

//     paypal.payment.create(create_payment_json, async (error, paymentInfo) => {
//       if (error) {
//         console.log(error);
//         return res.status(500).json({
//           success: false,
//           message: "Error while creating paypal payment!",
//         });
//       } else {
//         const newlyCreatedCourseOrder = new Order({
//           userId,
//           userName,
//           userEmail,
//           orderStatus,
//           paymentMethod,
//           paymentStatus,
//           orderDate,
//           paymentId,
//           payerId,
//           instructorId,
//           instructorName,
//           courseImage,
//           courseTitle,
//           courseId,
//           coursePricing,
//         });

//         await newlyCreatedCourseOrder.save();

//         const approveUrl = paymentInfo.links.find(
//           (link) => link.rel == "approval_url"
//         ).href;

//         res.status(201).json({
//           success: true,
//           data: {
//             approveUrl,
//             orderId: newlyCreatedCourseOrder._id,
//           },
//         });
//       }
//     });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({
//       success: false,
//       message: "Some error occured!",
//     });
//   }
// };


const createOrder = async (req, res) => {
  try {
    const {
      userId,
      userName,
      userEmail,
      orderStatus,
      paymentMethod,
      paymentStatus,
      orderDate,
      paymentId,
   
      instructorId,
      instructorName,
      courseImage,
      courseTitle,
      courseId,
      coursePricing,
      ship_name,
    } = req.body;

   
    const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);

    const data = {
      total_amount: parseFloat(coursePricing).toFixed(2),
      currency: 'BDT',
      tran_id: new Date().getTime().toString(), // Use a unique transaction ID
      success_url:'http://localhost:5173/success',
      

      fail_url: `${process.env.CLIENT_URL}/payment-cancel`,
      cancel_url: `${process.env.CLIENT_URL}/payment-cancel`,
      ipn_url: `${process.env.CLIENT_URL}/ipn`,
      shipping_method: 'Courier',
      product_name: courseTitle,
      product_category: 'Course',
      product_profile: 'general',
      cus_name: userName,
      cus_email: userEmail,
      cus_add1: 'Address Line 1',
      cus_add2: 'Address Line 2',
      cus_city: 'Dhaka',
      cus_state: 'Dhaka',
      cus_postcode: '1000',
      cus_country: 'Bangladesh',
      cus_phone: '01711111111',
      ship_name,
      cus_fax: '01711111111',
      ship_name: 'Customer Name',
      ship_add1: 'Dhaka',
      ship_add2: 'Dhaka',
      ship_city: 'Dhaka',
      ship_state: 'Dhaka',
      ship_postcode: 1000,
      ship_country: 'Bangladesh',
    };
    console.log("api data ", data);
    
    sslcz.init(data).then(async (apiResponse) => {
      // Redirect the user to the payment gateway
      console.log("api response gateway url",apiResponse);
      
      let gatewayPageURL = apiResponse.GatewayPageURL;

      // Create the order in your system
      const newlyCreatedCourseOrder = new Order({
        userId,
        userName,
        userEmail,
        orderStatus,
        paymentMethod: 'SSLCommerz',
        paymentStatus,
        orderDate,
        paymentId: data.tran_id, // Using transaction ID here
        
        instructorId,
        instructorName,
        courseImage,
        courseTitle,
        courseId,
        coursePricing,
        ship_name,
      });

      await newlyCreatedCourseOrder.save();

      res.status(201).json({
        success: true,
        data: { approveUrl: gatewayPageURL, orderId: newlyCreatedCourseOrder._id },
      });
     
       
    }).catch((error) => {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "Error while creating SSLCommerz payment!",
      });
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Some error occurred!",
    });
  }
};




// const capturePaymentAndFinalizeOrder = async (req, res) => {
//   try {
//     const { paymentId, payerId, orderId } = req.body;

//     let order = await Order.findById(orderId);

//     if (!order) {
//       return res.status(404).json({
//         success: false,
//         message: "Order can not be found",
//       });
//     }

//     order.paymentStatus = "paid";
//     order.orderStatus = "confirmed";
//     order.paymentId = paymentId;
//     order.payerId = payerId;

//     await order.save();

//     //update out student course model
//     const studentCourses = await StudentCourses.findOne({
//       userId: order.userId,
//     });

//     if (studentCourses) {
//       studentCourses.courses.push({
//         courseId: order.courseId,
//         title: order.courseTitle,
//         instructorId: order.instructorId,
//         instructorName: order.instructorName,
//         dateOfPurchase: order.orderDate,
//         courseImage: order.courseImage,
//       });

//       await studentCourses.save();
//     } else {
//       const newStudentCourses = new StudentCourses({
//         userId: order.userId,
//         courses: [
//           {
//             courseId: order.courseId,
//             title: order.courseTitle,
//             instructorId: order.instructorId,
//             instructorName: order.instructorName,
//             dateOfPurchase: order.orderDate,
//             courseImage: order.courseImage,
//           },
//         ],
//       });

//       await newStudentCourses.save();
//     }

//     //update the course schema students
//     await Course.findByIdAndUpdate(order.courseId, {
//       $addToSet: {
//         students: {
//           studentId: order.userId,
//           studentName: order.userName,
//           studentEmail: order.userEmail,
//           paidAmount: order.coursePricing,
//         },
//       },
//     });

//     res.status(200).json({
//       success: true,
//       message: "Order confirmed",
//       data: order,
//     });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({
//       success: false,
//       message: "Some error occured!",
//     });
//   }
// };

// const capturePaymentAndFinalizeOrder = async (req, res) => {
//   try {
//     const { orderId } = req.body;

//     let order = await Order.findById(orderId);

//     if (!order) {
//       return res.status(404).json({
//         success: false,
//         message: "Order cannot be found",
//       });
//     }

//     // Depending on SSLCommerz, you might also want to verify the payment status if applicable.
//     // This could be an additional step if you'd like to check the payment status with SSLCommerz.

//     order.paymentStatus = "paid"; // Update payment status
//     order.orderStatus = "confirmed"; // Update order status
//     order.paymentId = paymentId; // Use transaction ID from body
//    // This might be relevant to SSLCommerz, but typically you'd store user details

//     await order.save();

//     // Update student courses
//     const studentCourses = await StudentCourses.findOne({ userId: order.userId });

//     if (studentCourses) {
//       studentCourses.courses.push({
//         courseId: order.courseId,
//         title: order.courseTitle,
//         instructorId: order.instructorId,
//         instructorName: order.instructorName,
//         dateOfPurchase: order.orderDate,
//         courseImage: order.courseImage,
//       });
//       await studentCourses.save();
//     } else {
//       const newStudentCourses = new StudentCourses({
//         userId: order.userId,
//         courses: [
//           {
//             courseId: order.courseId,
//             title: order.courseTitle,
//             instructorId: order.instructorId,
//             instructorName: order.instructorName,
//             dateOfPurchase: order.orderDate,
//             courseImage: order.courseImage,
//           },
//         ],
//       });
//       await newStudentCourses.save();
//     }

//     // Update the course schema students
//     await Course.findByIdAndUpdate(order.courseId, {
//       $addToSet: {
//         students: {
//           studentId: order.userId,
//           studentName: order.userName,
//           studentEmail: order.userEmail,
//           paidAmount: order.coursePricing,
//         },
//       },
//     });

//     res.status(200).json({
//       success: true,
//       message: "Order confirmed",
//       data: order,
//     });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({
//       success: false,
//       message: "Some error occurred!",
//     });
//   }
// };

const capturePaymentAndFinalizeOrder = async (req, res) => {
  try {
    const { orderId } = req.body;

    if (!orderId) {
      return res.status(400).json({
        success: false,
        message: "Invalid request: orderId is required",
      });
    }

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    // Check if paymentId is provided or generated
    const paymentId = req.body.paymentId || "default-payment-id"; // Example logic
    if (!paymentId) {
      return res.status(400).json({
        success: false,
        message: "Payment ID is required",
      });
    }

    order.paymentStatus = "paid";
    order.orderStatus = "confirmed";
    order.paymentId = paymentId;

    await order.save();

    // Update student courses
    const studentCourses = await StudentCourses.findOne({ userId: order.userId });

    if (studentCourses) {
      studentCourses.courses.push({
        courseId: order.courseId,
        title: order.courseTitle,
        instructorId: order.instructorId,
        instructorName: order.instructorName,
        dateOfPurchase: order.orderDate,
        courseImage: order.courseImage,
      });
      await studentCourses.save();
    } else {
      const newStudentCourses = new StudentCourses({
        userId: order.userId,
        courses: [
          {
            courseId: order.courseId,
            title: order.courseTitle,
            instructorId: order.instructorId,
            instructorName: order.instructorName,
            dateOfPurchase: order.orderDate,
            courseImage: order.courseImage,
          },
        ],
      });
      await newStudentCourses.save();
    }

    // Update the course schema students
    await Course.findByIdAndUpdate(order.courseId, {
      $addToSet: {
        students: {
          studentId: order.userId,
          studentName: order.userName,
          studentEmail: order.userEmail,
          paidAmount: order.coursePricing,
        },
      },
    });

    res.status(200).json({
      success: true,
      message: "Order confirmed",
      data: order,
    });
  } catch (err) {
    console.error("Error in capturePaymentAndFinalizeOrder:", err.message, err.stack);
    res.status(500).json({
      success: false,
      message: "Some error occurred!",
      error: err.message, // Include the actual error message for debugging
    });
  }
};


module.exports = { createOrder, capturePaymentAndFinalizeOrder };
