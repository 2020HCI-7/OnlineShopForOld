package com.oauth.demo.service;

import com.oauth.demo.dao.ConsumerDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class userService {
    @Autowired
    ConsumerDao consumerdao;
    public void testconsumer()
    {
        consumerdao.insertuser();

    }

}
