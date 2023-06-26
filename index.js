const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');


const app = express();
app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));




//Connnecting server
main().catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/university');
  console.log("Server connected!");
}



//All models of Admin, Student, Professor


//create schema of course model you have to store details
const course = new mongoose.Schema({
  course_name: {
    type: String,
    require: true,
    unique: true
  },
  credit: {
    type: Number,
    require: true
  },
  faculty: {
    type: String,
    require: true
  },
  description: String
});

//create course model in mongodb server
const Course = mongoose.model("Course", course);



//create schema of administrator model you have to store details
const admin = new mongoose.Schema({
  role: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
    unique: true
  },
  education: String,
  per_email: {
    type: String,
    required: true,
  },
  number: {
    type: Number,
    require: true
  },
  birth_date: Date,
  col_email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

//create Adminitartor model in mongodb server
const Administrator = mongoose.model("Administrator", admin);



//create schema of student model you have to store details
const stu = new mongoose.Schema({
  role: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
    unique: true
  },
  education: String,
  per_email: {
    type: String,
    required: true,
  },
  number: {
    type: Number,
    require: true
  },
  birth_date: Date,
  col_email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});


//create student model in mongodb server 
const Student = mongoose.model("Student", stu);



//create schema of professor model you have to store details
const pro = new mongoose.Schema({
  role: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
    unique: true
  },
  education: String,
  per_email: {
    type: String,
    required: true,
  },
  number: {
    type: Number,
    require: true
  },
  birth_date: Date,
  col_email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

//create professor model in mongodb server
const Professor = mongoose.model("Professor", pro);










//all get methods of link 

//get method of sign_in page
app.get('/Sign_in', (req, res) => {
  res.render("Sign_in");
});


//get request of Admin_dashboard
app.get('/Admin_dashboard', admin_dash ,(req, res) => {
  // res.render("Admin_dashboard");
});


//get request of Admin_register
app.get('/Admin_register', (req, res) => {
  res.render("Admin_add_stu_pro");
});


//get request of Student_dashboard
app.get('/Student_dashboard', student_dash , (req, res) => {
  res.render("Student_dashboard");
});


//get request of Uni_Resources
app.get('/Uni_Resources', (req, res) => {
  res.render("Uni_Resources");
});


//get request of Course Directory
app.get('/course_directory', add_course, async (req, res) => {
  // const cou = await Course.find();
  // res.render("course_directory", {cou});
});


//get request of Add_new_course
app.get('/add_new_course', (req, res) => {
  res.render("add_new_course");
});


//get request of professor_dashboard
app.get('/professor_dashboard', professor_dash ,(req, res) => {
  res.render("professor_dashboard");
});




//all post methos of link
let email = "";
let role = "";
//post method of sign_in page
app.post('/Sign_in', async (req, res) => {
  role = req.body.role;
  email = req.body.email;
  let password = req.body.password;
  console.log(role + " " + email + " " + password);

  if (role === "Student") {
    const user = await Student.findOne({ col_email: req.body.email });
    if (user) {
      let DB_password = user.password;
      let DB_role = user.role;
      if (password === DB_password && DB_role === role) {
        res.redirect("Student_dashboard");
      }
      else {
        res.render("invalid_email_password");
      }
    }
    else {
      res.render("user_not_found");
    }
  }

  if (role === "Professor") {
    const user = await Professor.findOne({ col_email: req.body.email });
    if (user) {
      let DB_password = user.password;
      let DB_role = user.role;
      if (password === DB_password && DB_role === role) {
        res.redirect("professor_dashboard");
      }
      else {
        res.render("invalid_email_password");
      }
    }
    else {
      res.render("user_not_found");
    }
  }

  if (role === "Administrator") {
    const user = await Administrator.findOne({ col_email: req.body.email });
    if (user) {
      let DB_password = user.password;
      let DB_role = user.role;
      if (password === DB_password && DB_role === role) {
        res.redirect("Admin_dashboard");
      }
      else {
        res.render("invalid_email_password");
      }
    }
    else {
      res.render("user_not_found");
    }
  }
});


//post request of Admin_register
app.post('/Admin_register', (req, res) => {
  let role = req.body.role;

  if (role === "Student") {
    const user = new Student({
      role: req.body.role,
      name: req.body.name,
      education: req.body.Education_Background,
      per_email: req.body.per_email,
      number: req.body.mobile_number,
      birth_date: req.body.birthday,
      col_email: req.body.col_email,
      password: req.body.password
    });
    user.save();
  }

  if (role === "Professor") {
    const user = new Professor({
      role: role,
      name: req.body.name,
      education: req.body.Education_Background,
      per_email: req.body.per_email,
      number: req.body.mobile_number,
      birth_date: req.body.birthday,
      col_email: req.body.col_email,
      password: req.body.password
    });
    user.save();
  }

  if (role === "Adminitrator") {
    const user = new Administrator({
      role: role,
      name: req.body.name,
      education: req.body.Education_Background,
      per_email: req.body.per_email,
      number: req.body.mobile_number,
      birth_date: req.body.birthday,
      col_email: req.body.col_email,
      password: req.body.password
    });
    user.save();
  }

  console.log("data is successfully stored in database");
  res.render("Admin_dashboard");

});


//post request of Add New Course 
app.post("/add_new_course", (req, res) => {
  const cou = new Course({
    course_name: req.body.cou_name,
    credit: req.body.credit,
    faculty: req.body.faculty,
    description: req.body.description
  });
  cou.save();
  console.log("New course is added Successfully!");
  res.render("Admin_dashboard");
});





//All type of Middleware are here



//Course Directory Middleware
// console.log(email + " hii " + role);
async function add_course(req, res, next) {
  if (role === "Administrator") {
    const cou = await Course.find();
    res.render("admin_course_directory", { cou });
  }
  else {
    // console.log("ronak");
    // res.render("course_directory");
    const cou = await Course.find();
    res.render("course_directory", { cou });
  }
}


//Admin_dashboard middleware
async function admin_dash(req, res, next) {
  // console.log(email + " he");
  if(email===null || email === undefined || email===""){
    res.render("sign_first");
  }
  else{
    res.render("Admin_dashboard");
  }
}


//Student_dashboard middleware
async function student_dash(req, res, next) {
  // console.log(email + " he");
  if(email===null || email === undefined || email===""){
    res.render("sign_first");
  }
  else{
    res.render("Student_dashboard");
  }
}


//Professor_dashboard middleware
async function professor_dash(req, res, next) {
  // console.log(email + " he");
  if(email===null || email === undefined || email===""){
    res.render("sign_first");
  }
  else{
    res.render("professor_dashboard");
  }
}










//server running on 3000 port
app.listen(3000, function () {
  console.log("server is started on port 3000!");
});