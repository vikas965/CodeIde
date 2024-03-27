import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './visual.css';

const Showdata = () => {
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [selectedColumn, setSelectedColumn] = useState('');
  const [sortOrder, setSortOrder] = useState('ascending');
  // eslint-disable-next-line no-unused-vars
  const [filters, setFilters] = useState({
    endYear: '',
    topics: '',
    sector: '',
    region: '',
    pestle: '',
    source: '',
    swot: '',
  });

  const fetchData = async () => {
    try {
      let params = {};

      // Apply filters
      for (let key in filters) {
        if (filters[key] !== '') {
          params[key] = filters[key];
        }
      }

      // Apply sorting
      if (selectedColumn) {
        params.sort = sortOrder;
        params.column = selectedColumn;
      }

      const response = await axios.get('https://mern-crud-ngi2.onrender.com/api/data', { params });
      setData(response.data);

      if (response.data.length > 0) {
        const firstItem = response.data[0];
        const columnNames = Object.keys(firstItem).filter((column) => column !== '_id');
        setColumns(columnNames);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleColumnChange = (column) => {
    if (column === selectedColumn) {
      setSortOrder(sortOrder === 'ascending' ? 'descending' : 'ascending');
    } else {
      setSelectedColumn(column);
      setSortOrder('ascending');
    }
  };

  useEffect(() => {
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedColumn, sortOrder, filters]);

  return (
    <div className="container mt-2">
      <h1 className="text-center mb-4">Data Table</h1>
      <h3 className="text-center mb-4">Sort the table data by clicking on column </h3>

      {/* Table */}
      <div className="table-responsive" style={{ backgroundColor: 'transparent' }}>
        <table className="table table-bordered rounded " style={{ backgroundColor: 'transparent', color: 'blue', borderRadius: '7px' }}>
          <thead className="thead-dark">
            <tr style={{ backgroundColor: 'transparent', color: 'blue' }}>
              <th>S_NO</th>
              {columns.map((column, index) => (
                <th
                  style={{ textTransform: 'uppercase', cursor: 'pointer' }}
                  key={index}
                  onClick={() => handleColumnChange(column)}
                >
                  {column}{' '}
                  {selectedColumn === column && (
                    <span>{sortOrder === 'ascending' ? '▲' : '▼'}</span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item, rowIndex) => (
              <tr key={rowIndex}>
                <td>{rowIndex + 1}</td>
                {columns.map((column, colIndex) => (
                  <td key={colIndex} style={{ maxWidth: '150px', overflow: 'hidden' }}>
                    {column === 'url' ? (
                      <span className="text-truncate">{item[column]}</span>
                    ) : (
                      item[column]
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Showdata;
