package osfo.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import osfo.demo.entity.User;
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
    @PreAuthorize("hasRole('dealer')")
    @RequestMapping(value="/store/create")
    public Object createstore(@RequestParam("address") String address,@RequestParam("phone") String phone)
    {
        Integer id=((User) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getId();
        return storeservice.savestore(id,address,phone);
    }
    @PreAuthorize("hasRole('dealer')")
    @RequestMapping(value="/store/get")
    public Object getstore()
    {
        Integer id=((User) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getId();
        return storeservice.getstorebydealerid(id);
    }
}
