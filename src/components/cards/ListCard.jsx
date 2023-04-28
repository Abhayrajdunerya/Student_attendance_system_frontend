import React from 'react'

const ListCard = ({name, rollNo, email, gender, role}) => {
    return (
        <div className="p-2 lg:w-1/3 md:w-1/2 w-full">
            <div className="h-full flex items-center border-gray-200 bg-white border p-4 shadow rounded-lg">
                <div className="flex-grow">
                    <h2 className="text-gray-900 title-font font-medium">Name: {name}</h2>
                    {role==='student' ? <p className="text-gray-500">Roll no.: {rollNo}</p> : 
                        <p className="text-gray-500">Phone no.: {rollNo} </p>
                    }
                    <p className="text-gray-500">Email: {email}</p>
                    <p className="text-gray-500">Gender: {gender}</p>
                </div>
            </div>
        </div>
    )
}

export default ListCard