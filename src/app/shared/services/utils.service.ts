import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Workbook } from 'exceljs';
import { CustomSnackbarComponent } from '../components/custom-snackbar/custom-snackbar.component';
const fs = require("file-saver")
@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(
    private snackbar: MatSnackBar
  ) { }

  alertDialog(args: {icon: string, label: string}) {
    this.snackbar.openFromComponent(CustomSnackbarComponent, {
      data: {
        icon: args.icon,
        label: args.label
      },
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "bottom",
      panelClass: ['snackbar-success']
    })
  }

  exportExcel(excelData: any) {
    //Title, Header & Data
    const title = excelData.title;
    const header = excelData.headers
    const data = excelData.data;
    const columnColorNumber = excelData.columnColorNumber
    const titleMergeCell = {
      from: excelData.titleMergeCell.from,
      to: excelData.titleMergeCell.to
    }

    //Create a workbook with a worksheet
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Report');

    //Add Row and formatting
    worksheet.mergeCells(titleMergeCell.from, titleMergeCell.to);
    let titleRow = worksheet.getCell('A1');
    titleRow.value = title
    titleRow.font = {
      name: 'Calibri',
      size: 16,
      underline: 'single',
      bold: true,
      color: { argb: '303030' }
    }
    titleRow.alignment = { vertical: 'middle', horizontal: 'center' }

    // Date
    // worksheet.mergeCells('G1:H4');
    let d = new Date();
    let date = d.toLocaleDateString()


    //Adding Header Row
    let headerRow = worksheet.addRow(header);
    headerRow.eachCell((cell, number) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: '303030' },
        bgColor: { argb: '  ' }
      }
      cell.font = {
        bold: true,
        color: { argb: 'FFFFFF' },
        size: 12
      }
    })

    // Adding Data with Conditional Formatting
    data.forEach((d: any) => {
      worksheet.addRow(d);
    });

    worksheet.getColumn(3).width = 20;
    worksheet.addRow([]);


    //Generate & Save Excel File
    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, title + '.xlsx');
    })

  }
}
