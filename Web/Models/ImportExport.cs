﻿using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using NPOI.SS.UserModel;
using NPOI.SS.Util;
using NPOI.XSSF.UserModel;
using CoronaGlass.Core.Models;
using Web.Models;


namespace VralumGlassWeb.Data
{
	public class ImportExport
	{
        public IList<ManagementDefect> Import(byte[] data)
        {
            var result = new List<ManagementDefect>();
            using (var ms = new MemoryStream(data))
            {
                var wb = new XSSFWorkbook(ms);
                ISheet excelSheet = wb.GetSheetAt(0);

                for (var i = 1; i <= excelSheet.LastRowNum; i++)
                {
                    try
                    {
                        IRow row = excelSheet.GetRow(i);
                        result.Add(new ManagementDefect
                        {
                            CustomerId = row.GetCell(0).ToString(),
                            City = row.GetCell(1).ToString(),
                            Address = row.GetCell(2).ToString(),
                            Building = row.GetCell(3).ToString(),
                            Apartment = int.Parse(row.GetCell(4).ToString()),
                            GlassBroken = bool.Parse(row.GetCell(5).ToString()),
                            ScratchedAluminum = bool.Parse(row.GetCell(6).ToString()),
                            Other = bool.Parse(row.GetCell(7).ToString()),
                            Description = row.GetCell(8).ToString(),
                            Sizes = row.GetCell(9).ToString().Split(',')
                        });
                    }
                    catch { }
                }
            }

            return result;
        }

        public IList<CoronaSnippet> ImportSnippets(byte[] data)
        {
            var result = new List<CoronaSnippet>();
            using (var ms = new MemoryStream(data))
            {
                var wb = new XSSFWorkbook(ms);
                ISheet excelSheet = wb.GetSheetAt(0);

                for (var i = 0; i <= excelSheet.LastRowNum; i++)
                {
                    try
                    {
                        IRow row = excelSheet.GetRow(i);
                        if (float.TryParse(row.GetCell(0).ToString(), out var length))
                        {
                            result.Add(new CoronaSnippet(length)
                            {
                                Apartment = row.GetCell(1)?.ToString(),
                                Floor = row.GetCell(2)?.ToString(),
                                Columns = row.GetCell(3)?.ToString()
                            });
                        }
                    }
                    catch(Exception e)
                    {
                        Trace.TraceError(e.Message);
                    }
                }
            }

            return result;
        }

        public byte[] Export(IList<ManagementDefect> defects)
        {
            using (var fs = new MemoryStream())
            {
                var workbook = new XSSFWorkbook();
                ISheet excelSheet = workbook.CreateSheet("Defects");
                IRow row = excelSheet.CreateRow(0);

                row.CreateCell(0).SetCellValue("ID");
                row.CreateCell(1).SetCellValue("City");
                row.CreateCell(2).SetCellValue("Address");
                row.CreateCell(3).SetCellValue("Building");
                row.CreateCell(4).SetCellValue("Apartment");
                row.CreateCell(5).SetCellValue("Glass broken/cracked");
                row.CreateCell(6).SetCellValue("Scratched in aluminum");
                row.CreateCell(7).SetCellValue("Other");
                row.CreateCell(8).SetCellValue("Description");
                row.CreateCell(9).SetCellValue("Sizes");

                for (var i = 0; i < defects.Count; i++)
                {
                    var c = defects[i];
                    row = excelSheet.CreateRow(i + 1);
                    row.CreateCell(0).SetCellValue(c.CustomerId);
                    row.CreateCell(1).SetCellValue(c.City);
                    row.CreateCell(2).SetCellValue(c.Address);
                    row.CreateCell(3).SetCellValue(c.Building);
                    row.CreateCell(4).SetCellValue($"{c.Apartment}");
                    row.CreateCell(5).SetCellValue($"{c.GlassBroken}");
                    row.CreateCell(6).SetCellValue($"{c.ScratchedAluminum}");
                    row.CreateCell(7).SetCellValue($"{c.Other}");
                    row.CreateCell(8).SetCellValue(c.Description);
                    row.CreateCell(9).SetCellValue(string.Join(',', c.Sizes));
                }

                workbook.Write(fs);

                return fs.ToArray();
            }
        }

        public byte[] Export(IList<Plank> planks, float free, int planReserve)
		{
			using (var fs = new MemoryStream())
			{
				var workbook = new XSSFWorkbook();
				ISheet excelSheet = workbook.CreateSheet("Planks");
				IRow row = excelSheet.CreateRow(0);

				row.CreateCell(0).SetCellValue("Plank Length");
				row.CreateCell(1).SetCellValue("Snippet [Floor/Apartment]");

				for (var i = 0; i < planks.Count; i++)
				{
					var plank = planks[i];
					row = excelSheet.CreateRow(i + 1);
					row.CreateCell(0).SetCellValue($"{plank.OriginalLength + planReserve}");
					row.CreateCell(1).SetCellValue(string.Join(", ", plank.Cuts));
				}

				workbook.Write(fs);

				return fs.ToArray();
			}
		}
            
        public byte[] Export2(string projectName, IList<Plank> planks, float free, decimal columnSum, double clipWeight, decimal column6300Count, double columnWeight, int plankReserve)
        {
            using (var fs = new MemoryStream())
            {
                var workbook = new XSSFWorkbook();
                ISheet excelSheet = workbook.CreateSheet("Stock Optimization");

                //excelSheet.SetColumnWidth(0, 5000);
                excelSheet.SetColumnWidth(1, 5000);
                excelSheet.SetColumnWidth(2, 10000);
                excelSheet.SetColumnWidth(3, 5000);

                ICellStyle styleHeader = workbook.CreateCellStyle();
                
                // Header Style
                styleHeader.FillForegroundColor = IndexedColors.RoyalBlue.Index;
                styleHeader.FillPattern = FillPattern.SolidForeground;
                styleHeader.Alignment = HorizontalAlignment.Center;

                // Font 
                XSSFFont hFontWhite = (XSSFFont)workbook.CreateFont();
                //hFontWhite.FontHeightInPoints = 12;
                hFontWhite.Boldweight = (short)FontBoldWeight.Bold;
                hFontWhite.FontName = "Calibri";
                hFontWhite.Color = IndexedColors.White.Index;
                styleHeader.SetFont(hFontWhite);


                ICellStyle styleHeader1 = workbook.CreateCellStyle();
                styleHeader1.Alignment = HorizontalAlignment.Center;
                // Font 
                XSSFFont hFontBlack = (XSSFFont)workbook.CreateFont();
                //hFontBlack.FontHeightInPoints = 13;
                hFontBlack.Boldweight = (short)FontBoldWeight.Bold; ;
                hFontBlack.FontName = "Calibri";
                hFontBlack.Color = IndexedColors.Black.Index;
                styleHeader1.SetFont(hFontBlack);

                ICellStyle borderStyle = workbook.CreateCellStyle();
                borderStyle.Alignment = HorizontalAlignment.Center;
                borderStyle.BorderTop = BorderStyle.Thin;
                borderStyle.BorderBottom = BorderStyle.Double;
                borderStyle.TopBorderColor = IndexedColors.RoyalBlue.Index;
                borderStyle.BottomBorderColor = IndexedColors.RoyalBlue.Index;
                //borderStyle.SetFont(hFontBlack);

                ICellStyle boldStyle = workbook.CreateCellStyle();
                boldStyle.SetFont(hFontBlack);

                ICellStyle alignmentStyle = workbook.CreateCellStyle();
                alignmentStyle.Alignment = HorizontalAlignment.Center;

                ICellStyle sStyleGreen = workbook.CreateCellStyle();
                sStyleGreen.Alignment = HorizontalAlignment.Center;
                // Font 
                XSSFFont hFontGreen = (XSSFFont)workbook.CreateFont();
                hFontGreen.Color = IndexedColors.Green.Index;
                sStyleGreen.SetFont(hFontGreen);

                ICellStyle sStyleRed = workbook.CreateCellStyle();
                sStyleRed.Alignment = HorizontalAlignment.Center;
                // Font 
                XSSFFont hFontRed = (XSSFFont)workbook.CreateFont();
                hFontRed.Color = IndexedColors.Red.Index;
                sStyleRed.SetFont(hFontRed);

                ICellStyle dataStyle = workbook.CreateCellStyle();
                dataStyle.Alignment = HorizontalAlignment.Center;

                var rowNumber = 0;

                IRow row = excelSheet.CreateRow(rowNumber++);
                ICell cell = row.CreateCell(3);
                cell.SetCellValue(DateTime.Now.ToString("dd/MM/yyyy hh:mm"));
                cell.CellStyle = dataStyle;

                row = excelSheet.CreateRow(rowNumber++);
                var cra = new CellRangeAddress(1, 1, 0, 3);
                excelSheet.AddMergedRegion(cra);
                cell = row.CreateCell(0);
                cell.SetCellValue(projectName);
                cell.CellStyle = styleHeader1;

                row = excelSheet.CreateRow(rowNumber++);

                row = excelSheet.CreateRow(rowNumber++);
                cell = row.CreateCell(1); cell.SetCellValue("Columns"); cell.CellStyle = styleHeader;
                row = excelSheet.CreateRow(rowNumber++);
                cell = row.CreateCell(1); cell.SetCellValue($"6300 X {column6300Count}"); cell.CellStyle = sStyleGreen;
                row = excelSheet.CreateRow(rowNumber++);
                cell = row.CreateCell(0); cell.SetCellValue("Total:"); cell.CellStyle = boldStyle;
                cell = row.CreateCell(1); cell.SetCellValue($"{6300 * column6300Count} mm"); cell.CellStyle = borderStyle;

                if (column6300Count > 0)
                {
                    row = excelSheet.CreateRow(rowNumber++);
                    cell = row.CreateCell(0); cell.SetCellValue("Quantity:"); cell.CellStyle = boldStyle;
                    cell = row.CreateCell(1); cell.SetCellValue($"{columnSum} pcs."); cell.CellStyle = alignmentStyle;

                    row = excelSheet.CreateRow(rowNumber++);
                    cell = row.CreateCell(0); cell.SetCellValue("Weight:"); cell.CellStyle = boldStyle;
                    cell = row.CreateCell(1); cell.SetCellValue($"{((6300 * column6300Count / 1000) * (decimal)columnWeight):.00} kg"); cell.CellStyle = alignmentStyle;
                }

                row = excelSheet.CreateRow(rowNumber++);

                row = excelSheet.CreateRow(rowNumber++);
                cell = row.CreateCell(1);
                cell.SetCellValue("Stocks");
                cell.CellStyle = styleHeader;
                cell = row.CreateCell(2);
                cell.SetCellValue("Snippets [Floor/Apartment]");
                cell.CellStyle = styleHeader;
                cell = row.CreateCell(3);
                cell.SetCellValue("Waste");
                cell.CellStyle = styleHeader;

                float totalLength = 0;
                foreach (var group in planks.GroupBy(p => p.OriginalLength))
                {
                    row = excelSheet.CreateRow(rowNumber++);
                    var length = group.Key + plankReserve;
                    var count = group.Count();
                    totalLength += length * count;

                    cell = row.CreateCell(1);
                    cell.SetCellValue($"{length} X {count}");
                    cell.CellStyle = sStyleGreen;

                    foreach (var plank in group)
                    {
						row = excelSheet.CreateRow(rowNumber++);
                        row.CreateCell(2).SetCellValue(string.Join(", ", plank.Cuts));

                        cell = row.CreateCell(3, CellType.Numeric);
                        cell.SetCellValue(plank.FreeLength);
                        cell.CellStyle = sStyleRed;
                    }
                }

                if (totalLength > 0)
                {
                    row = excelSheet.CreateRow(rowNumber++);
                    cell = row.CreateCell(0); cell.SetCellValue("Total:"); cell.CellStyle = boldStyle;
                    cell = row.CreateCell(1); cell.SetCellValue($"{totalLength} mm"); cell.CellStyle = borderStyle;
                    cell = row.CreateCell(2); cell.CellStyle = borderStyle;
                    cell = row.CreateCell(3); cell.SetCellValue($"{free} mm ({(free * 100 / totalLength):.00}%)"); cell.CellStyle = borderStyle;

                    row = excelSheet.CreateRow(rowNumber);
                    cell = row.CreateCell(0); cell.SetCellValue("Weight:"); cell.CellStyle = boldStyle;
                    cell = row.CreateCell(1); cell.SetCellValue($"{((totalLength / 1000) * clipWeight):.00} kg"); cell.CellStyle = alignmentStyle;
                    cell = row.CreateCell(3); cell.SetCellValue($"{((free / 1000) * clipWeight):.00} kg"); cell.CellStyle = alignmentStyle;
                }

                workbook.Write(fs);

                return fs.ToArray();
            }
        }

        public byte[] Export(IList<Customer> customers)
		{
			using (var fs = new MemoryStream())
			{
				var workbook = new XSSFWorkbook();
				ISheet excelSheet = workbook.CreateSheet("Customers");
				IRow row = excelSheet.CreateRow(0);

				row.CreateCell(0).SetCellValue("ID");
				row.CreateCell(1).SetCellValue("First Name");
			    row.CreateCell(2).SetCellValue("Last Name");
			    row.CreateCell(3).SetCellValue("Identity Number");
			    row.CreateCell(4).SetCellValue("Age");
			    row.CreateCell(5).SetCellValue("Email");
			    row.CreateCell(6).SetCellValue("Address");
			    row.CreateCell(7).SetCellValue("City");
			    row.CreateCell(8).SetCellValue("Persons As Home");
			    row.CreateCell(9).SetCellValue("Key Received");
			    row.CreateCell(10).SetCellValue("Project Entr.");
			    row.CreateCell(11).SetCellValue("Constructor");

                for (var i = 0; i < customers.Count; i++)
				{
					var c = customers[i];
					row = excelSheet.CreateRow(i + 1);
					row.CreateCell(0).SetCellValue(c.CustomerId);
					row.CreateCell(1).SetCellValue(c.Name);
				    row.CreateCell(2).SetCellValue(c.Surname);
				    row.CreateCell(3).SetCellValue(c.Identity);
				    row.CreateCell(4).SetCellValue($"{c.Age}");
				    row.CreateCell(5).SetCellValue(c.Email);
				    row.CreateCell(6).SetCellValue(c.Address);
				    row.CreateCell(7).SetCellValue(c.City);
				    row.CreateCell(8).SetCellValue($"{c.PersonsAtHome}");
				    row.CreateCell(9).SetCellValue(c.KeyReceived.ToString("dd/MM/yyyy"));
				    row.CreateCell(10).SetCellValue(c.ProjectName);
				    row.CreateCell(11).SetCellValue(c.Constructor);
                }

				workbook.Write(fs);

				return fs.ToArray();
			}
		}
	}
}