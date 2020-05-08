package com.oauth.demo.dao;

import com.oauth.demo.entity.Consumer;
import com.oauth.demo.repo.consumerRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;


import java.util.List;

@Repository
public class ConsumerDao {

    @Autowired
    consumerRepo consumerrepo;
    public Consumer getconsumerbyid(Integer id)
    {
        if(consumerrepo.findById(id).isPresent())
        {
            return consumerrepo.getOne(id);
        }
        return new Consumer();


    }
    public void insertuser()
    {
        Consumer consumer=new Consumer();
        consumer.setNeck_name("shenruien");
        consumer.setPhonenumber("123456");
        consumer.setWexin_openid("123456");
        consumer.setPassword("123456");
        consumer.setStatus(1);
        consumer.setUsername("shenruien");

        consumerrepo.save(consumer);
    }
}
