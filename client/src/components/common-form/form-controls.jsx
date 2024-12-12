// // import { Input } from "../ui/input";
// // import { Label } from "../ui/label";
// // import {
// //   Select,
// //   SelectContent,
// //   SelectItem,
// //   SelectTrigger,
// //   SelectValue,
// // } from "../ui/select";
// // import { Textarea } from "../ui/textarea";

// // function FormControls({ formControls = [], formData, setFormData }) {
// //   function renderComponentByType(getControlItem) {
// //     let element = null;
// //     const currentControlItemValue = formData[getControlItem.name] || "";

// //     switch (getControlItem.componentType) {
// //       case "input":
// //         element = (
// //           <Input
// //             id={getControlItem.name}
// //             name={getControlItem.name}
// //             placeholder={getControlItem.placeholder}
// //             type={getControlItem.type}
// //             value={currentControlItemValue}
// //             onChange={(event) =>
// //               setFormData({
// //                 ...formData,
// //                 [getControlItem.name]: event.target.value,
// //               })
// //             }
// //           />
// //         );
// //         break;
// //       case "select":
// //         element = (
// //           <Select
// //             onValueChange={(value) =>
// //               setFormData({
// //                 ...formData,
// //                 [getControlItem.name]: value,
// //               })
// //             }
// //             value={currentControlItemValue}
// //           >
// //             <SelectTrigger className="w-full">
// //               <SelectValue placeholder={getControlItem.label} />
// //             </SelectTrigger>
// //             <SelectContent>
// //               {getControlItem.options && getControlItem.options.length > 0
// //                 ? getControlItem.options.map((optionItem) => (
// //                     <SelectItem key={optionItem.id} value={optionItem.id}>
// //                       {optionItem.label}
// //                     </SelectItem>
// //                   ))
// //                 : null}
// //             </SelectContent>
// //           </Select>
// //         );
// //         break;
// //       case "textarea":
// //         element = (
// //           <Textarea
// //             id={getControlItem.name}
// //             name={getControlItem.name}
// //             placeholder={getControlItem.placeholder}
// //             value={currentControlItemValue}
// //             onChange={(event) =>
// //               setFormData({
// //                 ...formData,
// //                 [getControlItem.name]: event.target.value,
// //               })
// //             }
// //           />
// //         );
// //         break;

// //       default:
// //         element = (
// //           <Input
// //             id={getControlItem.name}
// //             name={getControlItem.name}
// //             placeholder={getControlItem.placeholder}
// //             type={getControlItem.type}
// //             value={currentControlItemValue}
// //             onChange={(event) =>
// //               setFormData({
// //                 ...formData,
// //                 [getControlItem.name]: event.target.value,
// //               })
// //             }
// //           />
// //         );
// //         break;
// //     }

// //     return element;
// //   }

// //   return (
// //     <div className="flex flex-col gap-3">
// //       {formControls.map((controleItem) => (
// //         <div key={controleItem.name}>
// //           <Label htmlFor={controleItem.name}>{controleItem.label}</Label>
// //           {renderComponentByType(controleItem)}
// //         </div>
// //       ))}
// //     </div>
// //   );
// // }

// // export default FormControls;
// import { Input } from "../ui/input";
// import { Label } from "../ui/label";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "../ui/select";
// import { Textarea } from "../ui/textarea";

// function FormControls({ formControls = [], formData, setFormData }) {
//   function renderComponentByType(getControlItem) {
//     let element = null;
//     // const currentControlItemValue = formData[getControlItem.name] || "";

//     switch (getControlItem.componentType) {
//       case "input":
//         element = (
//           <Input
//             id={getControlItem.name}
//             name={getControlItem.name}
//             placeholder={getControlItem.placeholder}
//             type={getControlItem.type}
            
           
//           />
//         );
//         break;
//       case "select":
//         element = (
//           <Select >
//             <SelectTrigger className="w-full">
//               <SelectValue placeholder={getControlItem.label} />
//             </SelectTrigger>
//             <SelectContent>
//               {getControlItem.options && getControlItem.options.length > 0
//                 ? getControlItem.options.map((optionItem) => (
//                     <SelectItem key={optionItem.id} value={optionItem.id}>
//                       {optionItem.label}
//                     </SelectItem>
//                   ))
//                 : null}
//             </SelectContent>
//           </Select>
//         );
//         break;
//       case "textarea":
//         element = (
//           <Textarea
//             id={getControlItem.name}
//             name={getControlItem.name}
//             placeholder={getControlItem.placeholder}
           
//           />
//         );
//         break;

//       default:
//         element = (
//           <Input
//             id={getControlItem.name}
//             name={getControlItem.name}
//             placeholder={getControlItem.placeholder}
//             type={getControlItem.type}
           
//           />
//         );
//         break;
//     }

//     return element;
//   }

//   return (
//     <div className="flex flex-col gap-3">
//       {formControls.map((controleItem) => (
//         <div key={controleItem.name}>
//           <Label htmlFor={controleItem.name}>{controleItem.label}</Label>
//           {renderComponentByType(controleItem)}
//         </div>
//       ))}
//     </div>
//   );
// }

// export default FormControls;
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";

function FormControls({ formControls = [], formData, setFormData }) {
  function renderComponentByType(getControlItem) {
    let element = null;
    const currentControlItemValue = formData[getControlItem.name] || "";

    switch (getControlItem.componentType) {
      case "input":
        element = (
          <Input
            id={getControlItem.name}
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            type={getControlItem.type}
            value={currentControlItemValue}
            onChange={(event) =>
              setFormData({
                ...formData,
                [getControlItem.name]: event.target.value,
              })
            }
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        );
        break;
      case "select":
        element = (
          <Select
          onValueChange={(value) =>
                          setFormData({
                            ...formData,
                            [getControlItem.name]: value,
                          })
                        }
                        value={currentControlItemValue}>
            <SelectTrigger className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <SelectValue placeholder={getControlItem.label} />
            </SelectTrigger>
            <SelectContent className="bg-white border border-gray-300 rounded-lg shadow-lg">
              {getControlItem.options && getControlItem.options.length > 0
                ? getControlItem.options.map((optionItem) => (
                    <SelectItem
                      key={optionItem.id}
                      value={optionItem.id}
                      className="px-4 py-2 hover:bg-blue-50 cursor-pointer"
                    >
                      {optionItem.label}
                    </SelectItem>
                  ))
                : null}
            </SelectContent>
          </Select>
        );
        break;
      case "textarea":
        element = (
          <Textarea
            id={getControlItem.name}
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            value={currentControlItemValue}
            onChange={(event) =>
              setFormData({
                ...formData,
                [getControlItem.name]: event.target.value,
              })
            }
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        );
        break;

      default:
        element = (
          <Input
            id={getControlItem.name}
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            type={getControlItem.type}
            value={currentControlItemValue}
            onChange={(event) =>
              setFormData({
                ...formData,
                [getControlItem.name]: event.target.value,
              })
            }
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        );
        break;
    }

    return element;
  }

  return (
    <div className="flex flex-col gap-4 p-4 bg-gray-50 rounded-lg shadow-md">
      {formControls.map((controlItem) => (
        <div key={controlItem.name} className="flex flex-col">
          <Label htmlFor={controlItem.name} className="mb-1 text-gray-700 font-semibold">
            {controlItem.label}
          </Label>
          {renderComponentByType(controlItem)}
        </div>
      ))}
    </div>
  );
}

export default FormControls;
