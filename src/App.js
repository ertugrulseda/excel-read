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
			arr = [ ...arr, { make: item[1], model: item[2], price: item[3] ,"license plate number":item[4]} ];
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
					<input type="file" ref={fileInp} className="inp-excel"  accept=".xlsx, .xls" onChange={fileSelected} />
					<button className="btn-clear" onClick={clear}>Clear</button>
				</div>
				<div className="ag-theme-alpine" style={{ height: 400, width: 800 }}>
					<AgGridReact  rowData={rowData}>
						<AgGridColumn field="make" />
						<AgGridColumn field="model" />
						<AgGridColumn field="price" />
						<AgGridColumn field="license plate number" />
					</AgGridReact>
				</div>
			</div>
		</div>
	);
};

export default App;
