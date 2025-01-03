// Import required modules
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth-routes/index");
const mediaRoutes = require("./routes/instructor-routes/media-routes");
const instructorCourseRoutes = require("./routes/instructor-routes/course-routes");
const studentViewCourseRoutes = require("./routes/student-routes/course-routes");
const studentViewOrderRoutes = require("./routes/student-routes/order-routes");
const studentCoursesRoutes = require("./routes/student-routes/student-courses-routes");
const studentCourseProgressRoutes = require("./routes/student-routes/course-progress-routes");
//sllecommerz   import
const SSLCommerzPayment = require('sslcommerz-lts');
const store_id = process.env.STORE_ID;
const store_passwd =  process.env.STORE_PASS;
const is_live = false //true for live, false for sandbox


// Initialize environment variables
dotenv.config();

// Create an Express application
const app = express();

// Define a port
const PORT = process.env.PORT || 5001;

// app.use(cors());

// CORS configuration
// app.use(cors())
app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:5173",  // Adjust this URL if needed
  // origin: "*",
  methods: ["GET", "POST", "DELETE", "PUT"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));



app.use(express.json());

//database connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("mongodb is connected"))
  .catch((e) => console.log(e));


 //routes configuration
  app.use("/auth", authRoutes);
  app.use("/media", mediaRoutes);

  app.use("/instructor/course", instructorCourseRoutes);
app.use("/student/course", studentViewCourseRoutes);
app.use("/student/order", studentViewOrderRoutes);
app.use("/student/courses-bought", studentCoursesRoutes);
app.use("/student/course-progress", studentCourseProgressRoutes);

app.post("/course/details/buy/:id", async (req,res)=>{
  const tran_id = new mongoose.Types.ObjectId().toString();
 const product=req.body;
 const totalAmount = parseFloat(product.price);
  const data = {
    total_amount: totalAmount,
    currency: 'BDT',
    tran_id: tran_id, // use unique tran_id for each api call
    success_url: `http://localhost:${process.env.PORT}/success/${tran_id}`,
    fail_url: 'http://localhost:3030/fail',
    cancel_url: 'http://localhost:3030/cancel',
    ipn_url: 'http://localhost:3030/ipn',
    shipping_method: 'Courier',
    product_name: 'Computer.',
    product_category: 'Electronic',
    product_profile: 'general',
    cus_name: product.name,
    cus_email: 'customer@example.com',
    cus_add1: 'Dhaka',
    cus_add2: 'Dhaka',
    cus_city: 'Dhaka',
    cus_state: 'Dhaka',
    cus_postcode: '1000',
    cus_country: 'Bangladesh',
    cus_phone: '01711111111',
    cus_fax: '01711111111',
    ship_name: 'Customer Name',
    ship_add1: 'Dhaka',
    ship_add2: 'Dhaka',
    ship_city: 'Dhaka',
    ship_state: 'Dhaka',
    ship_postcode: 1000,
    ship_country: 'Bangladesh',
};
console.log("ssl data:",data);

const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live)
sslcz.init(data).then(apiResponse => {
    // Redirect the user to payment gateway
    console.log("api respose",apiResponse);
    
    let GatewayPageURL = apiResponse.GatewayPageURL
    res.send({url:GatewayPageURL});
    console.log('Redirecting to: ', GatewayPageURL)
});

})

// app.post("https://sandbox.sslcommerz.com/gwprocess/v4/undefined/payment-return",async(req,res)=>{
//   console.log("Transaction ID:", req.params.id); // Correctly access the 'id' parameter
//   // res.send("Success route hit");
//   res.redirect(`http://localhost:5173/payment-return`);
//   // res.redirect(`${process.env.CLIENT_URL}/payment-return`);
  
  
// })



app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).json({
    success: false,
    message: "Something went wrong",
  });
});

app.listen(PORT, () => {
  console.log(`Server is now running on port ${PORT}`);
});








