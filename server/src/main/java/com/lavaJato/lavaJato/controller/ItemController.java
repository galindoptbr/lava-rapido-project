package com.lavaJato.lavaJato.controller;

import com.lavaJato.lavaJato.entity.Item;
import com.lavaJato.lavaJato.service.ItemService;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

@RestController
@RequestMapping("/api/itens")
public class ItemController {

    @Autowired
    private ItemService itemService;

    @PostMapping("/adicionar")
    public Item adicionarItem(@RequestBody Item item) {
        return itemService.adicionarItem(item);
    }

    @GetMapping("/listar")
    public List<Item> listarTodosItens() {
        return itemService.listarTodosItens();
    }

    @GetMapping("/gerar-relatorio-pdf")
    public void gerarRelatorioPDF(HttpServletResponse response) throws IOException {
        byte[] pdfContent = itemService.gerarPDFRelatorioDiario();
        response.setContentType("application/pdf");
        response.setHeader("Content-Disposition", "attachment; filename=Relatorio_" +
                LocalDate.now().format(DateTimeFormatter.ofPattern("dd_MM_yyyy")) + ".pdf");
        response.getOutputStream().write(pdfContent);
    }
}
