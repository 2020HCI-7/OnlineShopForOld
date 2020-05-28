package osfo.demo.controller;

import org.hibernate.validator.constraints.pl.REGON;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import osfo.demo.entity.Address;
import osfo.demo.entity.Consumer;
import osfo.demo.entity.Dealer;
import osfo.demo.entity.User;
import osfo.demo.service.userService;

import javax.annotation.Resource;
import java.util.List;

@RestController
public class usercontroller {
    @Resource
    userService userservice;


    @RequestMapping("/register/consumer")
    public Object userregister(@RequestBody Consumer consumer)
    {

        return userservice.register(consumer);

    }
    @RequestMapping("/register/dealer")
    public Object dealerregister(@RequestBody Dealer dealer)
    {

        return userservice.register1(dealer);

    }
    @RequestMapping(value ="/address/add")
    public Object addaddress(@RequestBody Address address)
    {
        address.setUserId(((User) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getId());
        return userservice.addaddress(address);
    }
    @RequestMapping(value="/address/getbyuserid")
    public Object getaddrbyuserid()
    {
        return userservice.getaddressbyuserid(((User) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getId());
    }

}
