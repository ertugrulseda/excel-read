import './App.css';
import React from 'react';
import ExcelJS from "exceljs";

const App = () => {

   const fileSelected = async (event)=>{
       const workbook = new ExcelJS.Workbook();
       const file = event.target.files[0];
       const data = await file.arrayBuffer();
       await workbook.xlsx.load(data);
   }

	return (
		<div className="App">
			<label> Choose an excel </label>
			<input type="file"
             id="excel" 
             name="excel" 
             accept=".xlsx, .xls"
             onChange ={fileSelected} />
		</div>
	);
};

export default App;
