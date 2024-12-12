// import { Button } from "../ui/button";
// import FormControls from "./form-controls";

// function CommonForm({
//   handleSubmit,
//   buttonText,
//   formControls = [],
//   formData,
//   setFormData,
//   isButtonDisabled = false,
// }) {
//   return (
//     <form onSubmit={handleSubmit}>
//       {/* render form controls here */}
//       <FormControls
//         formControls={formControls}
//         formData={formData}
//         setFormData={setFormData}
//       />
//       <Button disabled={isButtonDisabled} type="submit" className="mt-5 w-full">
//         {buttonText || "Submit"}
//       </Button>
//     </form>
//   );
// }

// export default CommonForm;
import { Button } from "../ui/button";
import FormControls from "./form-controls";


function CommonForm({
  handleSubmit,
  buttonText,
  formControls = [],
  formData,
  setFormData,
  isButtonDisabled = false,
}) {
  return (
    <form onSubmit={handleSubmit}>
      {/* render form controls here */}
      <FormControls
        formControls={formControls}
        formData={formData}
        setFormData={setFormData}
      />
     
      <Button disabled={isButtonDisabled} type="submit"    className="mt-5 w-full bg-slate-600 hover:bg-gray-900 text-white disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
       
    
        {buttonText || "Submit"}
      </Button>
    </form>
  );
}

export default CommonForm;

