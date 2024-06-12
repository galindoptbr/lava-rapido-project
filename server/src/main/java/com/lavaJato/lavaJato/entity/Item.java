package com.lavaJato.lavaJato.entity;

import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Document(collection = "item")
@Data
public class Item {

    private String marca;

    private String matricula;

    private Number pagamento;

    private String gorjeta;

    private Boolean foiPago;

    private Date createdAt;
}
