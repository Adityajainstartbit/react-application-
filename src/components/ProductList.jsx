import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import Card from 'react-bootstrap/Card';
import Dropdown from 'react-bootstrap/Dropdown';
import DatePicker from 'react-datepicker'
import Button from 'react-bootstrap/Button';
import "react-datepicker/dist/react-datepicker.css";
import Spinner from 'react-bootstrap/Spinner';
import {
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBBadge,
  MDBPagination,
  MDBPaginationItem,
  MDBPaginationLink,
} from 'mdb-react-ui-kit'; 
import './search.css'
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import Sortcomponent from './Sortcomponent';

function ProductList({ events }) {
  const [startDate, setStartDate] = useState(new Date());
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(events.pagination.pages);
  const [events1, setEventsData] = useState(events.products);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryValue, setCategoryValue] = useState('');
  const [filtericon, setfiltericon]= useState(false)
  const [sortingData,setSortingData] = useState('')
  const [isLoading, setIsLoading] = useState(false);



  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
   
    fetchData();
 
  }, [currentPage,searchQuery, categoryValue,sortingData,startDate]);

  const fetchData = async () => {
    setIsLoading(true); 
    const token = localStorage.getItem('token');
    const response = await fetch(`https://rails-api-t9q0.onrender.com/api/v1/productdetails?page=${currentPage}&pageSize=10&q[title_cont]=${searchQuery}&category_name=${categoryValue}&${sortingData}&create_date=${startDate}`, {
      headers: {
        'Content-Type': 'application/json', 
        'Authorization': `Bearer ${token}`, 
      },
    });
    const events2 = await response.json();
 
    console.log("length of array", events2.product);
    setTotalPages(events2.pagination.pages);

   
    setEventsData(events2.products);
    setIsLoading(false); 
   
  };
  const onfiltericon = () =>{
    setfiltericon(prevState => !prevState); 
  }
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1); 

  };

  const handleCategoryChange = (eventKey) => {
    setCategoryValue(eventKey);
    setCurrentPage(1);
  };
  
  const handleSortValueChangeHandle= (value)=>{
   setSortingData(value)
  }
  const handleDateChange = (date)=>
    {
       setStartDate(date)
       setCurrentPage(1); 
    }
    const handleResetFilter = () => {
      setStartDate('');
      setCurrentPage(''); 
      setSearchQuery('');
      setCategoryValue('');




    }
  return (
    <>

        

      
          <Card className='container mt-3 mb-3'>
                  <div className=" mt-3">
                    <div className='row'>
                      <div className='col-md-4 col-12'>
            
                        <input
                          type="text"
                          value={searchQuery}
                          onChange={handleSearchChange}
                          placeholder="Search..."
                          className="search-input"
                        />
                              <span className="filter-icon" style={{cursor:'pointer'}}>
                                 <FilterAltIcon onClick={onfiltericon} />
                              </span>
                          
                      </div>
                            <div className='col-md-8 col-12 mt-md-0 mt-3'>
                              <div className='row align-items-center'>
                                <div className='col-md-2 col-4 mb-3'>
                                
                                  <span className='category-dropdown'>
                                    <Dropdown onSelect={handleCategoryChange}>
                                      <Dropdown.Toggle variant="" id="dropdown-basic">
                                    
                                      {categoryValue ||'Category'}
                                      </Dropdown.Toggle>

                                      <Dropdown.Menu>
                                      <Dropdown.Item eventKey="Baby">Baby</Dropdown.Item>
                                      <Dropdown.Item eventKey="Shoes">Shoes</Dropdown.Item>
                                      <Dropdown.Item eventKey="Games">Games</Dropdown.Item>
                                      <Dropdown.Item eventKey="Beauty">Beauty</Dropdown.Item>
                                      <Dropdown.Item eventKey="Computers">Computers</Dropdown.Item>
                                      <Dropdown.Item eventKey="Tools">Tools</Dropdown.Item>
                                      <Dropdown.Item eventKey="Electronics">Electronics</Dropdown.Item>
                                      <Dropdown.Item eventKey="Sports">Sports</Dropdown.Item>
                                      <Dropdown.Item eventKey="Clothing">Clothing</Dropdown.Item>
                                      <Dropdown.Item eventKey="Books">Books</Dropdown.Item>
                                      <Dropdown.Item eventKey="Industrial">Industrial</Dropdown.Item>
                                      <Dropdown.Item eventKey="Health">Health</Dropdown.Item>
                                      <Dropdown.Item eventKey="Grocery">Grocery</Dropdown.Item>
                                      </Dropdown.Menu>
                                    </Dropdown>
                                  </span>
                                </div>
                                <div className='col-md-6 col-12 mb-3'>
                                  <DatePicker 
                                  showIcon
                                  selected={startDate}
                                  onChange={(date) => setStartDate(date)}
                                    icon={
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="1em"
                                        height="1em"
                                        viewBox="0 0 48 48"
                                        style={{ marginTop: '3px' }}>
                                        <mask id="ipSApplication0">
                                          <g fill="none" stroke="#fff" strokeLinejoin="round" strokeWidth="4">
                                            <path strokeLinecap="round" d="M40.04 22v20h-32V22"></path>
                                            <path
                                              fill="#fff"
                                              d="M5.842 13.777C4.312 17.737 7.263 22 11.51 22c3.314 0 6.019-2.686 6.019-6a6 6 0 0 0 6 6h1.018a6 6 0 0 0 6-6c0 3.314 2.706 6 6.02 6c4.248 0 7.201-4.265 5.67-8.228L39.234 6H8.845l-3.003 7.777Z"
                                            ></path>
                                          </g>
                                        </mask>
                                          <path
                                            fill="currentColor"
                                            d="M0 0h48v48H0z"
                                            mask="url(#ipSApplication0)"
                                          ></path>
                                      </svg>
                                    }
                                  />
                                   
                                </div>
                                    <div className='col-md-2 col-12'>
                                      <Button variant="light" className='mb-3' onClick={handleResetFilter}>Reset</Button>
                                    </div>
                                              {isLoading &&   <Spinner animation="border" role="status">
                                                <span className="visually-hidden">Loading...</span>
                                              </Spinner>}
                              </div>
                            </div>
                    </div>
                  </div>
                <div className='container'>
                  {filtericon && <Sortcomponent  SetSortValue={handleSortValueChangeHandle}/>}
                </div>
            {events1.length !== 0 ? ( 
                <Card.Body>
                  <div className="table-responsive">
                    <MDBTable align='middle' className='container mt-2 table-responsive'>
                        <MDBTableHead>
                            <tr>
                            <th scope='col'></th>
                            <th scope='col'>Title</th>
                            <th scope='col'>Description</th>
                            <th scope='col'>Status</th>
                            <th scope='col'>Category</th>
                            <th scope='col'>Created At</th>
                        
                            </tr>
                        </MDBTableHead>
                        <MDBTableBody>
                            {events1.map(product => (
                            <tr key={product.id}>
                                <td>
                                <img
                                    src={product.image} 
                                    alt={product.title}
                                    style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '50%' }}
                                />
                                </td>
                                <td>{product.title}</td>
                                <td>{product.description}</td>
                                <td>
                                <MDBBadge color={product.status ? 'success' : 'warning'} pill>
                                    {product.status ? 'Active' : 'Inactive'}
                                </MDBBadge>
                                </td>
                                <td>{product.category}</td> 
                                <td>{dayjs(product.created_at).format("DD MMM YYYY")}</td> 
                                
                            </tr>
                            ))}
                        </MDBTableBody>
                    </MDBTable>
                  </div>
                </Card.Body>
            
                ) : (
                  <p style={{ textAlign: 'center', marginTop: '20px' }}>No matched product</p>

                )}
                <div className='row'>
                  <div className='col-md-12 col-12'>
                {events1.length !== 0 && (
                  <MDBPagination className='mb-3' size='sm' circle center>
                    <MDBPaginationItem disabled={currentPage === 1}>
                      <MDBPaginationLink onClick={() => handlePageChange(currentPage - 1)} tabIndex={-1} aria-disabled='true'>
                        Previous
                      </MDBPaginationLink>
                    </MDBPaginationItem>

                    {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                      <MDBPaginationItem key={page} active={currentPage === page}>
                        <MDBPaginationLink onClick={() => handlePageChange(page)}  style={{ cursor: 'pointer', margin: '0 5px' }}>{page}</MDBPaginationLink>
                      </MDBPaginationItem>
                    ))}

                    <MDBPaginationItem disabled={currentPage === totalPages}>
                      <MDBPaginationLink onClick={() => handlePageChange(currentPage + 1)}>Next</MDBPaginationLink>
                    </MDBPaginationItem>
                  </MDBPagination>
                
                )}
                </div>
               </div>
        </Card>
    </>
  );
}

export default ProductList;
