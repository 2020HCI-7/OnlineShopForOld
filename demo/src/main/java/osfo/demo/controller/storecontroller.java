package osfo.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import osfo.demo.service.storeService;

@RestController
public class storecontroller {
    @Autowired
    storeService storeservice;
    @RequestMapping(value="/store/getall")
    public Object getallstore()
    {
        return storeservice.getallstore();
    }
}
