const Category = require("../models/category");

//category ka handler function
exports.createCategory = async(req,res)=>{
    try {
        const{name,description} = req.body;
        //validation krlo
        if(!name || !description){
            return res.status(400).json({
                success:false,
                message:'All fields are required',
            });
        }


        //create entry in DB
        const categoryDetails = await Category.create({name,description});

        console.log(categoryDetails);
            //return response

            return res.status(200).json({
                success:true,
                message:"category Created Successfully",
            });



    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message,
        });
    }

};


exports.showAllCategories = async(req,res)=>{
    try {
        const allCategory  = await Category.find({}, {name: true, description:true});
        return res.status(200).json({
            success:true,
            message:"All categories returned successfully",
            data:allCategory,
        });
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message,
        });
    }
    
};

exports.categoryPageDetails = async (req, res) => {
    try {
      const { categoryId } = req.body;
  
      // Get courses for the specified category
      const selectedCategory = await Category.findById(categoryId)
        .populate({
          path: "courses",
          populate:{
            path: "instructor",
            model: 'User', // replace 'Instructor' with 'User'
            select: 'firstName lastName' 
          }
        })
        .exec();
    //console.log(selectedCategory);
      // Handle the case when the category is not found
      if (!selectedCategory) {
      //  console.log("Category not found.");
        return res
          .status(404)
          .json({ success: false, message: "Category not found" });
      }
      // Handle the case when there are no courses
      if (selectedCategory.courses.length === 0) {
       // console.log("No courses found for the selected category.");
        return res.status(404).json({
          success: false,
          message: "No courses found for the selected category.",
        });
      }
  
      const selectedCourses = selectedCategory.courses;
  
      // Get courses for other categories
      const categoriesExceptSelected = await Category.find({
        _id: { $ne: categoryId },
      }).populate("courses").exec();
      let differentCategory = [];
      for (const category of categoriesExceptSelected) {
        differentCategory.push(...category.courses);//
      }
      //or
      //const differentCourses = categoriesExceptSelected.flatMap(category => category.courses);
  
  
      // Get top-selling courses across all categories
      const allCategories = await Category.find().populate("courses");
      const allCourses = allCategories.flatMap((category) => category.courses);//similarly can be donewith above methods
      const mostSellingCourses = allCourses
        .sort((a, b) => b.sold - a.sold)
        .slice(0, 10);
  
      res.status(200).json({
        success: true,
        data: {
          selectedCategory,
          differentCategory,
          mostSellingCourses,
        },
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
    }
  };
  

  //const allCategories = await Category.find().populate("courses");

// This line queries the database to find all categories using the Category.find() method. The result is an array of category documents. Then, populate("courses") is used to populate the courses field in each category document with the actual courses data. This means that each category object in the allCategories array will contain an array of courses associated with it.

// const allCourses = allCategories.flatMap((category) => category.courses);

// After fetching all categories and their associated courses, 
//this line flattens the array of arrays of courses into a single
// array containing all courses across all categories.
// The flatMap() method is used here to achieve this. 
//For each category in the allCategories array, the category.
//courses array is extracted and added to the allCourses array. This results in a flat array of all courses.

// const mostSellingCourses = allCourses .sort((a, b) => b.sold - a.sold) .slice(0, 10);

// This line sorts the allCourses array based on the number of sales (sold property) in descending order (b - a sorts in descending order, a - b sorts in ascending order). Then, slice(0, 10) is used to extract the top 10 courses from the sorted array, i.e., the courses with the highest number of sales. The resulting array mostSellingCourses contains the top-selling courses across all categories, sorted from highest to lowest sales, limited to 10 courses.
