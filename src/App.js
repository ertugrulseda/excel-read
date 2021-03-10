import './App.css';
import React, { useState,useRef } from 'react';
import ExcelJS from 'exceljs';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

const App = () => {
	const [ rowData, setRowData ] = useState([]);
	const fileInp = useRef(null);

	const fileSelected = async (event) => {
		const workbook = new ExcelJS.Workbook();
		const file = event.target.files[0];
		const data = await file.arrayBuffer();
		await workbook.xlsx.load(data);
		const worksheet = workbook.getWorksheet('Sayfa1');
		let objRange = worksheet.getSheetValues();
		let arr = [];
		objRange.forEach((item) => {
			arr = [ ...arr, { make: item[1], model: item[2], price: item[3] } ];
		});
		setRowData(arr);
	};
	const clear =() =>{
		fileInp.current.value='';
		setRowData([]);
	};

	return (
		<div className="App">
			<div className="Content">
				<div className="file-input">
					<label> Choose an excel </label>
					<input type="file" ref={fileInp} id="excel" name="excel" accept=".xlsx, .xls" onChange={fileSelected} />
					<button onClick={clear}>Clear</button>
				</div>
				<div className="ag-theme-alpine" style={{ height: 400, width: 600 }}>
					<AgGridReact  rowData={rowData}>
						<AgGridColumn field="make" />
						<AgGridColumn field="model" />
						<AgGridColumn field="price" />
					</AgGridReact>
				</div>
			</div>
		</div>
	);
};

export default App;
