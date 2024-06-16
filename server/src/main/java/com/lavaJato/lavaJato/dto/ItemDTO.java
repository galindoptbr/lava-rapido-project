package com.lavaJato.lavaJato.dto;

import lombok.Data;

import java.util.Date;

@Data
public class ItemDTO {

    private String marca;

    private String matricula;

    private Number pagamento;

    private String gorjeta;

    private Boolean foiPago;
    private Date createdAt;

}
