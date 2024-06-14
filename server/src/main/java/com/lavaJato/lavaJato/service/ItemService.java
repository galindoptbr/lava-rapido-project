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

    public List<Item> gerarRelatorioDiario() {
        LocalDate hoje = LocalDate.now();
        Date inicioDoDia = Date.from(hoje.atStartOfDay(ZoneId.systemDefault()).toInstant());
        Date fimDoDia = Date.from(hoje.plusDays(1).atStartOfDay(ZoneId.systemDefault()).toInstant());
        return itemRepository.findByCreatedAtBetween(inicioDoDia, fimDoDia);
    }

    public byte[] gerarRelatorio() throws IOException {
        List<Item> lista = gerarRelatorioDiario();
        double totalPagamento = lista.stream().mapToDouble(item -> item.getPagamento().doubleValue()).sum();
        double totalGorjeta = lista.stream().mapToDouble(item -> Double.parseDouble(item.getGorjeta())).sum();

        try (Workbook workbook = new XSSFWorkbook()) {
            Sheet sheet = workbook.createSheet("Relatório do Dia");

            CellStyle headerCellStyle = workbook.createCellStyle();
            Font headerFont = workbook.createFont();
            headerFont.setBold(true);
            headerCellStyle.setFont(headerFont);

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

                row.createCell(0).setCellValue(item.getMarca());
                row.createCell(1).setCellValue(item.getMatricula());
                row.createCell(2).setCellValue("Lavagem");
                row.createCell(3).setCellValue(item.getPagamento().doubleValue());
                row.createCell(4).setCellValue(Double.parseDouble(item.getGorjeta()));
                row.createCell(5).setCellValue(item.getFoiPago() ? "Sim" : "Não");
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
