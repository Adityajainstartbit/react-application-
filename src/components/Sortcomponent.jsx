import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './sortcomponent.css'

function Sortcomponent({ SetSortValue}) {
  const [sortBy, setSortBy] = useState('sort_title');
  const [sortValue, setSortValue,] = useState('A-Z');

  const handleSortByChange = (value) => {
      if (value === 'sort_title') {
      setSortBy(`sort_title`);
      setSortValue(`A-Z`);
      SetSortValue(`sort_title=asc`);
    } else {
      setSortBy(`sort_created`);
      setSortValue(`Newest First`);
      SetSortValue(`sort_created_at=asc`);
    }
  };

  const handleSortValueChange = (value) => {
    setSortValue(value);
    SetSortValue(`${sortBy}=${value}`)
  };

  return (
    <Card style={{ width: '8rem', cursor: 'pointer', marginLeft: '250px', marginTop: '5px' }} className='sortingdata'>

      <Card.Header>Sort By</Card.Header>
      <ListGroup variant="flush">
        <Form.Check
          type="radio"
          label="Product Title"
          id="productTitleRadio"
          checked={sortBy === 'sort_title'}
          onChange={() => handleSortByChange('sort_title')}
        />
        <Form.Check
          type="radio"
          label="Created At"
          id="createdAtRadio"
          checked={sortBy === 'sort_created'}
          onChange={() => handleSortByChange('sort_created')}
        />
       <hr style={{ marginTop: '0px', marginBottom: '0px' }} />

        {sortBy === 'sort_title' && (
          <>
          
             <Button
              variant={sortValue === 'asc' ? 'info' : ''}
              onClick={() => handleSortValueChange('asc')}
           
              
            >
           
                
              A-Z
            </Button>
            <hr style={{marginTop: '0px', marginBottom: '0px'}}/>
            <Button
              variant={sortValue === 'desc' ? 'info' : ''}
              onClick={() => handleSortValueChange('desc')}
            
       
            >
       
              Z-A
            </Button>
          
          </>
        )}
        {sortBy === 'sort_created' && (
          <>
             <Button
              variant={sortValue === 'asc' ? 'info' : ''}
              onClick={() => handleSortValueChange('asc')}
            >
              Newest First
             
             
            </Button>
            <hr style={{marginTop: '0px', marginBottom: '0px'}}/>
            <Button
              variant={sortValue === 'desc' ? 'info' : ''}
              onClick={() => handleSortValueChange('desc')}
            >
              Oldest First
             
            </Button>
          </>
        )}
      </ListGroup>
    </Card>
  );
}

export default Sortcomponent;

