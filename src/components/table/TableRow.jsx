import React from 'react'

const TableRow = ({td1, td2}) => {
    return (
        <tr
            className="border-b transition duration-300 ease-in-out hover:bg-neutral-100">
            <td className="whitespace-nowrap px-6 py-4 font-medium">{td1}</td>
            <td className="whitespace-nowrap px-6 py-4 font-normal">{td2}</td>
        </tr>
    )
}

export default TableRow