// Load the Plotly library
import plotly from 'plotly.js-basic-dist';

// Function to read and parse the text file
async function readTextFile(filePath) {
  const response = await fetch(filePath);
  const textData = await response.text();

  // Parse the text data into an array of data points
  const dataPoints = textData.trim().split('\n').map(line => {
    const values = line.split(',');
    const timestamp = new Date(values[0]);
    const values_num = values.slice(1).map(parseFloat);
    return { x: timestamp, y: values_num };
  });

  return dataPoints;
}

// Function to create the graph
function createGraph(dataPoints) {
  const layout = {
    title: 'Graph from Text File',
    xaxis: { title: 'Time' },
    yaxis: { title: 'Value' }
  };

  const traces = dataPoints[0].y.map((_, index) => ({
    x: dataPoints.map(point => point.x),
    y: dataPoints.map(point => point.y[index]),
    type: 'scatter',
    name: `Line ${index + 1}`
  }));

  const data = traces;

  plotly.newPlot('graph-container', data, layout);
}

// Example usage
readTextFile('path/to/text/file.txt')
  .then(createGraph)
  .catch(error => console.error('Error:', error));