package com.lavaJato.lavaJato.repository;

import com.lavaJato.lavaJato.entity.Item;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@Repository
public interface ItemRepository extends MongoRepository<Item, String> {
    List<Item> findByCreatedAtBetween(Date inicioDoDia, Date fimDoDia);
}