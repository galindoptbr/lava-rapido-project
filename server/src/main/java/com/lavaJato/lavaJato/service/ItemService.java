package com.lavaJato.lavaJato.service;

import com.lavaJato.lavaJato.entity.Item;
import com.lavaJato.lavaJato.repository.ItemRepository;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.pdmodel.PDPageContentStream;
import org.apache.pdfbox.pdmodel.font.PDType1Font;
import org.apache.pdfbox.pdmodel.font.Standard14Fonts;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.List;

@Service
public class ItemService {

    @Autowired
    private ItemRepository itemRepository;

    public Item adicionarItem(Item item) {
        item.setCreatedAt(new Date());
        return itemRepository.save(item);
    }

    public List<Item> listarTodosItens() {
        return itemRepository.findAll();
    }

    public List<Item> gerarRelatorioPorData(String data) {
        LocalDate dia = LocalDate.parse(data);
        Date inicioDoDia = Date.from(dia.atStartOfDay(ZoneId.systemDefault()).toInstant());
        Date fimDoDia = Date.from(dia.plusDays(1).atStartOfDay(ZoneId.systemDefault()).toInstant());
        return itemRepository.findByCreatedAtBetween(inicioDoDia, fimDoDia);
    }

    public byte[] gerarRelatorio(String data) throws IOException {
        List<Item> lista = gerarRelatorioPorData(data);
        double totalPagamento = lista.stream().mapToDouble(item -> item.getPagamento().doubleValue()).sum();
        double totalGorjeta = lista.stream().mapToDouble(item -> Double.parseDouble(item.getGorjeta())).sum();

        try (Workbook workbook = new XSSFWorkbook()) {
            Sheet sheet = workbook.createSheet("Relatório do Dia");

            CellStyle headerCellStyle = workbook.createCellStyle();
            Font headerFont = workbook.createFont();
            headerFont.setColor(IndexedColors.WHITE.getIndex());
            headerFont.setBold(true);
            headerCellStyle.setFont(headerFont);
            headerCellStyle.setFillForegroundColor(IndexedColors.BLUE.getIndex());
            headerCellStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);

            CellStyle oddRowCellStyle = workbook.createCellStyle();
            oddRowCellStyle.setFillForegroundColor(IndexedColors.GREY_25_PERCENT.getIndex());
            oddRowCellStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);

            CellStyle evenRowCellStyle = workbook.createCellStyle();
            evenRowCellStyle.setFillForegroundColor(IndexedColors.WHITE.getIndex());
            evenRowCellStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);

            Row headerRow = sheet.createRow(0);
            String[] headers = {"Marca/Modelo", "Matrícula", "Lavagem", "Valor", "Gorjeta", "Pago"};
            for (int i = 0; i < headers.length; i++) {
                Cell cell = headerRow.createCell(i);
                cell.setCellValue(headers[i]);
                cell.setCellStyle(headerCellStyle);
            }

            int rowNum = 1;
            for (Item item : lista) {
                Row row = sheet.createRow(rowNum++);
                CellStyle rowStyle = (rowNum % 2 == 0) ? evenRowCellStyle : oddRowCellStyle;

                Cell cell0 = row.createCell(0);
                cell0.setCellValue(item.getMarca());
                cell0.setCellStyle(rowStyle);

                Cell cell1 = row.createCell(1);
                cell1.setCellValue(item.getMatricula());
                cell1.setCellStyle(rowStyle);

                Cell cell2 = row.createCell(2);
                cell2.setCellValue("Lavagem");
                cell2.setCellStyle(rowStyle);

                Cell cell3 = row.createCell(3);
                cell3.setCellValue(item.getPagamento().doubleValue());
                cell3.setCellStyle(rowStyle);

                Cell cell4 = row.createCell(4);
                cell4.setCellValue(Double.parseDouble(item.getGorjeta()));
                cell4.setCellStyle(rowStyle);

                Cell cell5 = row.createCell(5);
                cell5.setCellValue(item.getFoiPago() ? "Sim" : "Não");
                cell5.setCellStyle(rowStyle);
            }

            Row totalRow = sheet.createRow(rowNum++);
            totalRow.createCell(0).setCellValue("Total Caixa:");
            totalRow.createCell(1).setCellValue(totalPagamento);
            totalRow.createCell(4).setCellValue("Total Gorjeta:");
            totalRow.createCell(5).setCellValue(totalGorjeta);

            for (int i = 0; i < headers.length; i++) {
                sheet.autoSizeColumn(i);
            }

            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
            workbook.write(outputStream);
            return outputStream.toByteArray();
        }
    }
}

