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
@CrossOrigin("*")
@RequestMapping("/api/itens")
public class ItemController {

    @Autowired
    private ItemService itemService;

    @PostMapping("/adicionar")
    public Item adicionarItem(@RequestBody Item item) {
        return itemService.adicionarItem(item);
    }

    @GetMapping("/listar")
    public List<Item> listarValores(@RequestParam String data) {
        return itemService.gerarRelatorioPorData(data);
    }

    @GetMapping("/gerar-relatorio")
    public void gerarRelatorioExcel(@RequestParam String data, HttpServletResponse response) throws IOException {
        byte[] excelContent = itemService.gerarRelatorio(data);
        response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        response.setHeader("Content-Disposition", "attachment; filename=Relatorio_" +
                LocalDate.parse(data).format(DateTimeFormatter.ofPattern("dd_MM_yyyy")) + ".xlsx");
        response.getOutputStream().write(excelContent);
    }
}
