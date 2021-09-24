import React from 'react'

function TableHeader({headers}) {

    const renderHeaders =(value)=>{
        return (
            <>
                  <th key={value.field}>{value.name}</th>
            </>
        )
    }
    return (
        <>
             <thead>
                <tr>
                      {headers?.map(renderHeaders)}
                </tr>
        </thead>
        </>
    )
}

export default TableHeader
