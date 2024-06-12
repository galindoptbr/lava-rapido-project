package com.lavaJato.lavaJato.service;

import com.lavaJato.lavaJato.entity.Item;
import com.lavaJato.lavaJato.repository.ItemRepository;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.pdmodel.PDPageContentStream;
import org.apache.pdfbox.pdmodel.font.PDType1Font;
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

    public byte[] gerarPDFRelatorioDiario() throws IOException {
        List<Item> lista = gerarRelatorioDiario();
        double totalPagamento = lista.stream().mapToDouble(item -> item.getPagamento().doubleValue()).sum();
        double totalGorjeta = lista.stream().mapToDouble(item -> Double.parseDouble(item.getGorjeta())).sum();

        try (PDDocument document = new PDDocument()) {
            PDPage page = new PDPage();
            document.addPage(page);

            try (PDPageContentStream contentStream = new PDPageContentStream(document, page)) {

                contentStream.beginText();
                contentStream.newLineAtOffset(14, 750);
                contentStream.showText("Relatório do Dia");
                contentStream.endText();

                contentStream.beginText();
                contentStream.newLineAtOffset(14, 730);
                contentStream.showText("Data: " + LocalDate.now().format(DateTimeFormatter.ofPattern("dd/MM/yyyy")));
                contentStream.endText();

                // Cabeçalho da tabela
                contentStream.beginText();
                contentStream.newLineAtOffset(14, 710);
                contentStream.showText("Marca/Modelo | Matrícula | Lavagem | Valor | Gorjeta | Pago");
                contentStream.endText();

                // Dados da tabela
                int yPosition = 690;
                for (Item item : lista) {
                    contentStream.beginText();
                    contentStream.newLineAtOffset(14, yPosition);
                    contentStream.showText(item.getMarca() + " | " + item.getMatricula() + " | " + "Lavagem" + " | € " +
                            String.format("%.2f", item.getPagamento().doubleValue()) + " | € " +
                            String.format("%.2f", Double.parseDouble(item.getGorjeta())) + " | " +
                            (item.getFoiPago() ? "Sim" : "Não"));
                    contentStream.endText();
                    yPosition -= 20;
                }

                yPosition -= 10;
                contentStream.beginText();
                contentStream.newLineAtOffset(14, yPosition);
                contentStream.showText("Total Caixa: € " + String.format("%.2f", totalPagamento));
                contentStream.endText();

                yPosition -= 20;
                contentStream.beginText();
                contentStream.newLineAtOffset(14, yPosition);
                contentStream.showText("Total Gorjeta: € " + String.format("%.2f", totalGorjeta));
                contentStream.endText();
            }

            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
            document.save(outputStream);
            return outputStream.toByteArray();
        }
    }
}
