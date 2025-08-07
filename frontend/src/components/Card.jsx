import React from 'react';
export default function Expenditure({ title, amount, icon, bgColor = "bg-white" }) {
    return (
        < div className={`flex flex-col justify-center items-center w-[100%] h-[100%] shadow-lg  shadow-black rounded-lg  ${bgColor}`}>
             <h3 className="text-lg font-semibold text-gray-800 mb-2">
        {icon} {title}
      </h3>
      <p className={`${amount} > 0 ? text-gray-600 : text-red-600`}>₹ {Math.abs(amount)}</p>
    </div>
       
    )
}
