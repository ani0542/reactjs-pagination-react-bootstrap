import React, { useEffect, useState, useMemo } from "react";
import Paginations from "./Paginations"
import Searchs from './Searchs'
import TableHeader from "./TableHeader";


function DataTable() {

    const [comments, setComments] = useState([]);
    const [totalItems, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 50;

    console.log(currentPage,'currentPage')

        const headers = [
            { name: "No#", field: "id", sortable: false },
            { name: "Name", field: "name", sortable: true },
            { name: "Email", field: "email", sortable: true },
            { name: "Comment", field: "body", sortable: false }
        ];


      useEffect(() => {
        const getData = () => {
            // showLoader();

            fetch("https://jsonplaceholder.typicode.com/comments")
                .then(response => response.json())
                .then(json => {
                    // hideLoader();
                    setComments(json);
                    // console.log(json);
                });
        };

        getData();
    }, []);


    // console.log(comments,'comments')


    const renderCommentsData =(value)=>{
        return (
            <>
                               <tr>
                                    <th scope="row" key={value.id}>
                                        {value.id}
                                    </th>
                                    <td>{value.name}</td>
                                    <td>{value.email}</td>
                                    <td>{value.body}</td>
                                </tr> 
            </>
        )
    }



    const commentsData = useMemo(() => {

        let computedComments = comments;
        // console.log(computedComments.length,'computedComments.length')
        setTotalItems(computedComments.length);
        return computedComments.slice(
            (currentPage - 1) * ITEMS_PER_PAGE,
            (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
        );
  
    }, [comments,currentPage]);

    
    return (
        <>
                <div className="row w-100">
                <div className="col mb-3 col-12 text-center">
                    <div className="row">
                        <div className="col-md-6">
                           
                            <Paginations
                                total={totalItems}
                                itemsPerPage={ITEMS_PER_PAGE}
                                currentPage={currentPage}
                                onPageChange={page => setCurrentPage(page)}
                            />
                            
                        </div>
                        <div className="col-md-6 d-flex flex-row-reverse">
                            {/* <Search
                                onSearch={value => {
                                    setSearch(value);
                                    setCurrentPage(1);
                                }}
                            /> */}
                            <Searchs/>
                        </div>
                    </div>

                    <table className="table table-striped">
                        {/* <TableHeader
                            headers={headers}
                            onSorting={(field, order) =>
                                setSorting({ field, order })
                            }
                        /> */}
                        <TableHeader
                          headers={headers}
                        />
                        <tbody>
                           
                            {
                                commentsData.map(renderCommentsData)
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default DataTable
