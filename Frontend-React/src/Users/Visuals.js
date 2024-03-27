import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./visual.css"
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  Tooltip,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  AreaChart,
  Area,
} from 'recharts';

const Visuals = () => {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({
    endYear: '',
    topics: '',
    sector: '',
    region: '',
    pestle: '',
    source: '',
    swot: '',
  });
  const [selectedColumn, setSelectedColumn] = useState('');

  const fetchData = async () => {
    try {
      const response = await axios.get('https://mern-crud-ngi2.onrender.com/api/data', { params: filters });
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // eslint-disable-next-line no-unused-vars
  const handleFilterChange = (filterName, value) => {
    setFilters((prevFilters) => ({ ...prevFilters, [filterName]: value }));
  };

  const handleColumnChange = (column) => {
    setSelectedColumn(column);
  };

  useEffect(() => {
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  // Example of data transformation for pie chart
  const pieChartData = data.map((item) => ({ name: item[selectedColumn], value: item.relevance }));

  // Example of data transformation for bar chart
  const barChartData = data.map((item) => ({ name: item[selectedColumn], relevance: item.relevance }));

  // Example of data transformation for line chart
  const lineChartData = data.map((item) => ({ name: item[selectedColumn], intensity: item.intensity }));

  // Example of data transformation for scatter chart
  const scatterChartData = data.map((item) => ({
    x: item[selectedColumn],
    y: item.intensity,
    name: item.country,
  }));

 
  const radarChartData = data.map((item) => ({ name: item[selectedColumn], value: item.relevance }));

 
  const areaChartData = data.map((item) => ({ name: item[selectedColumn], intensity: item.intensity }));

  return (
    <div className="container mt-2" style={{width:"100%",backgroundColor:"linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%);"}}>
      <div className="mb-3" style={{backgroundColor:"linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%);"}}>
        <h1 htmlFor="columnSelection" className="form-label mt-2 mb-2">Visulaization Of Data</h1>
        <select
          id="columnSelection"
          className="form-select"
          value={selectedColumn}
          onChange={(e) => handleColumnChange(e.target.value)}
          style={{textTransform:"capitalize",background:"linear-gradient(to top, #ffffff 0%, #ace0f9 100%)",color:"black"}}
        >
          {Object.keys(data[0] || {}).map((column, index) => (
            <option style={{textTransform:"capitalize"}} key={index} value={column}>
              {column}
            </option>
          ))}
        </select>
      </div>

      {selectedColumn && (
        <div className="row row-cols-2 row-cols-md-1 "   >
          <div className="col mb-4 sty"  >
            <h2>Pie Chart</h2>
            <PieChart width={400} height={400}>
              <Pie
                data={pieChartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                label
              >
                {pieChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={`#${index}8884d8`} />
                ))}
              </Pie>
            </PieChart>
          </div>

          <div className="col mb-4 sty" >
            <h2>Bar Chart</h2>
            <BarChart width={600} height={300} data={barChartData}>
              <Bar dataKey="relevance" fill="#8884d8" />
            </BarChart>
          </div>

          <div className="col mb-4 sty" >
            <h2>Line Chart</h2>
            <LineChart width={600} height={430} data={lineChartData}>
              <Line type="monotone" dataKey="intensity" stroke="#8884d8" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
            </LineChart>
          </div>

          <div className="col mb-4 sty" >
            <h2>Scatter Chart</h2>
            <ScatterChart width={600} height={430}>
              <XAxis type="number" dataKey="x" name={selectedColumn} />
              <YAxis type="number" dataKey="y" name="Intensity" />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} />
              <Scatter name="A Scatter" data={scatterChartData} fill="#8884d8" />
            </ScatterChart>
          </div>

          <div className="col mb-4 sty">
            <h2>Radar Chart</h2>
            <RadarChart width={600} height={430} data={radarChartData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="name" />
              <PolarRadiusAxis />
              <Radar name={selectedColumn} dataKey="value" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
            </RadarChart>
          </div>

          <div className="col mb-4 sty" >
            <h2>Area Chart</h2>
            <AreaChart width={600} height={430} data={areaChartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="intensity" stroke="#8884d8" fill="#8884d8" />
            </AreaChart>
          </div>
        </div>
      )}
    </div>
  );
};

export default Visuals;
