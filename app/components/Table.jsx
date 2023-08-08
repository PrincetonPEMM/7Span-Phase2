// import React from "react";

// const Table = (columns) => {
//   return (
//     <div className="relative">
//       <table className="table shadow pc-divide-y pc-divide-gray-200">
//         <thead className="pc-font-medium">
//           <tr>
//             {columns?.map((item, index) => (
//               <th
//                 className="pc-min-w-[160px] pc-px-6 pc-py-3 pc-text-left pc-text-sm pc-font-medium pc-uppercase pc-tracking-wider pc-text-primary-500"
//                 key={index}
//               >
//                 {getTableTitle({ item: item })}
//               </th>
//             ))}
//             {view && (
//               <th className="pc-min-w-[190px] pc-px-6 pc-py-3 pc-text-center pc-text-sm pc-font-medium pc-uppercase pc-tracking-wider pc-text-primary-500">
//                 {showHeading}
//               </th>
//             )}
//             {actions && (
//               <th className="pc-min-w-[160px] pc-px-6 pc-py-3 pc-text-center pc-text-sm pc-font-medium pc-uppercase pc-tracking-wider pc-text-primary-500">
//                 Actions
//               </th>
//             )}
//           </tr>
//         </thead>
//         <tbody className="pc-min-h-[300px] pc-divide-y pc-divide-gray-200 pc-bg-white pc-text-sm pc-font-light pc-text-slate-500">
//           {rows?.length
//             ? rows?.map((event, index) => (
//                 <tr key={index}>
//                   {columns.map((item, itemIndex) => {
//                     return (
//                       <td
//                         className="pc-max-w-xs pc-whitespace-normal pc-break-words pc-px-6 pc-py-4"
//                         key={index + itemIndex}
//                       >
//                         {getTableValue({
//                           event: event,
//                           item: item,
//                         }) || (event[item.value] === 0 ? "0" : "-")}
//                       </td>
//                     );
//                   })}
//                   {view && (
//                     <td className="pc-text-center">
//                       <div className="pc-flex pc-items-center pc-justify-center">
//                         <button
//                           onClick={() => showRow(event.id)}
//                           className="pc-p-1"
//                         >
//                           <MdiEyeOutline className="pc-h-5 pc-w-5" />
//                         </button>
//                       </div>
//                     </td>
//                   )}
//                   {actions && (
//                     <td className="pc-text-center">
//                       <div className="pc-flex pc-items-center pc-justify-center pc-gap-1">
//                         {edit ? (
//                           <button
//                             onClick={() => editRow(event.id)}
//                             className="pc-p-1"
//                           >
//                             <MdiPencilOutline className="pc-h-5 pc-w-5" />
//                           </button>
//                         ) : null}

//                         {destroy ? (
//                           <button
//                             onClick={() => deleteRow(event.id)}
//                             className="pc-p-1"
//                           >
//                             <MdiDelete className="pc-h-5 pc-w-5 hover:pc-text-red-500" />
//                           </button>
//                         ) : null}
//                       </div>
//                     </td>
//                   )}
//                 </tr>
//               ))
//             : // <tr>
//               //   {columns.map((item, itemIndex) => {
//               //     if (Math.floor((columns.length + count) / 2) === itemIndex) {
//               //       return (
//               //         <td
//               //           className="pc-whitespace-nowrap pc-px-6 pc-py-4"
//               //           key={itemIndex}
//               //         >
//               //           <div className="pc-flex pc-w-full pc-items-center pc-justify-center pc-gap-2 pc-text-center">
//               //             <span className="pc-block pc-h-0.5 pc-w-8  pc-rounded-l-full pc-bg-gradient-to-l pc-from-gray-300 pc-to-gray-100"></span>
//               //             <span>No Record Found</span>
//               //             <span className="pc-block pc-h-0.5 pc-w-8  pc-rounded-l-full pc-bg-gradient-to-r pc-from-gray-300 pc-to-gray-100"></span>
//               //           </div>
//               //         </td>
//               //       );
//               //     } else {
//               //       return (
//               //         <td
//               //           className="pc-whitespace-nowrap pc-px-6 pc-py-4"
//               //           key={itemIndex}
//               //         ></td>
//               //       );
//               //     }
//               //   })}
//               // </tr>
//               null}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Table;
