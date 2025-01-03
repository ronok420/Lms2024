// import InstructorCourses from "@/components/instructor-view/courses";
import InstructorCourses from "@/components/instructor-view/courses";
import InstructorDashboard from "@/components/instructor-view/dashboard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { AuthContext } from "@/context/auth-context";
import { BarChart, Book, BookCheck, LogOut } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import AddNewCoursePage from "./add-new-course";
import { fetchInstructorCourseListService } from "@/services";
import { InstructorContext } from "@/context/instructor-context";
import { courseCurriculumInitialFormData, courseLandingInitialFormData } from "@/config";



function InstructorDashboardpage() {

  const [activeTab, setActiveTab] = useState("dashboard");
  const { resetCredentials } = useContext(AuthContext);
  const { instructorCoursesList, 
    setInstructorCoursesList,
    setCurrentEditedCourseId,
    setCourseLandingFormData,
    setCourseCurriculumFormData,
   } =
    useContext(InstructorContext);

  async function fetchAllCourses() {
    const response = await fetchInstructorCourseListService();
    if (response?.success) setInstructorCoursesList(response?.data);
  }

  useEffect(() => {
    fetchAllCourses();
  }, []);

 
  const menuItems = [
    {
      icon: BarChart,
      label: "Dashboard",
      value: "dashboard",
      component: <InstructorDashboard  listOfCourses={instructorCoursesList}/>,
    },
    {
      icon: Book,
      label: "Courses",
      value: "courses",
      component: <InstructorCourses listOfCourses={instructorCoursesList} />,
    },
    {
      icon: BookCheck,
      label: "CreateCourses",
      value: "create-courses",
      component: <AddNewCoursePage  />,
    },
    {
      icon: LogOut,
      label: "Logout",
      value: "logout",
      component: null,
    },
  ];

  function handleLogout() {
    resetCredentials();
    sessionStorage.clear();
  }
  
  // console.log(instructorCoursesList, "instructorCoursesList");

  return (
    <div className="flex flex-col bg-gray-100 h-full w-full min-h-screen">
      <aside className="w-64 bg-white shadow-md hidden md:block">
        <div className="p-4">
          <h2 className="text-2xl font-bold mb-4">Instructor View</h2>
          <nav>
            {menuItems.map((menuItem) => (
              <Button
                className="w-full justify-start mb-2"
                key={menuItem.value}
                variant={activeTab === menuItem.value ? "secondary" : "ghost"}
                // onClick={
                //   menuItem.value === "logout"    
                //     ? handleLogout
                //     : () => setActiveTab(menuItem.value)
                
                // }
                onClick={() => {
                  if (menuItem.value === "logout") {
                    handleLogout();
                  } else {
                    setActiveTab(menuItem.value);
                    if (menuItem.value === "create-courses") {
                      setCurrentEditedCourseId(null);
                      setCourseLandingFormData(courseLandingInitialFormData);
                      setCourseCurriculumFormData(courseCurriculumInitialFormData);
                    }
                  }
                }}
              >
                <menuItem.icon className="mr-2 h-4 w-4" />
                {menuItem.label}
              </Button>
            ))}
          </nav>
        </div>
      </aside>
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            {menuItems.map((menuItem) => (
              <TabsContent key={menuItem.value} value={menuItem.value}>
                {menuItem.component !== null ? menuItem.component : null}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </main>
      
   
    </div>
  );
}

export default InstructorDashboardpage;
