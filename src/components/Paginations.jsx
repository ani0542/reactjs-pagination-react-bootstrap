import React, { useEffect, useMemo, useState } from 'react'
import Pagination from 'react-bootstrap/Pagination'


function Paginations({total,itemsPerPage,currentPage=1,onPageChange}) {

    // console.log(onPageChange,'onPageChange')
    console.log(total,'total')

    const [totalPages, setTotalPages] = useState(0);
    console.log(totalPages,'totalPages')

    useEffect(() => {
        if (total > 0 && itemsPerPage > 0)
            setTotalPages(Math.ceil(total / itemsPerPage));
    }, [total, itemsPerPage]);
    

    const paginationItems = useMemo(() => {
        const pages = [];

        for (let i = 1; i <= totalPages; i++) {
            pages.push(
                <Pagination.Item
                    key={i}
                    active={i === currentPage}
                    onClick={() => onPageChange(i)}
                >
                    {i}
                </Pagination.Item>
            );
        }

        return pages;
    }, [totalPages,currentPage]);


   
    // console.log(paginationItems,'paginationItems')

    if (totalPages === 0) return null;

    return (
        <>
              <Pagination>
                    <Pagination.Prev
                        onClick={() => onPageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    />
                         {paginationItems}
                    <Pagination.Next
                        onClick={() => onPageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    />
                </Pagination>
        </>
    )
}

export default Paginations
