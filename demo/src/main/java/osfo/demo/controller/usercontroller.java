package osfo.demo.controller;

import org.hibernate.validator.constraints.pl.REGON;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import osfo.demo.entity.*;
import osfo.demo.service.userService;

import javax.annotation.Resource;
import java.util.List;

@RestController
public class usercontroller {
    @Resource
    userService userservice;


    @RequestMapping("/register/consumer")
    public Object userregister(@RequestBody Consumer consumer, @RequestParam(value="code")String code)
    {
        return userservice.register(consumer, code);
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

    @RequestMapping(value="/address/getbyid")
    public Object getaddrbyid(@RequestParam("addressid") Integer id)
    {
        return userservice.getaddressbyid(id);
    }


    @RequestMapping(value="/consumer/edit")
    public Object setconsumer(@RequestBody Consumer consumer)
    {

        return userservice.editconsumer(consumer);
    }
    @RequestMapping(value="/dealer/edit")
    public Object setconsumer(@RequestBody Dealer dealer)
    {
        return userservice.editdealer(dealer);
    }
    @RequestMapping(value="/user/adddiscount")
    public Object adddiscount(@RequestBody Discount discount)
    {
        Integer userid=((User) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getId();
        return userservice.useradddiscount(userid,discount);

    }
    @RequestMapping(value="/consumer/info")
    public Object consumerinfo()
    {
        Integer userid=((User) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getId();
        System.out.println(SecurityContextHolder.getContext().getAuthentication().getPrincipal());
        return userservice.getconsumerinfo(userid);
    }
    @RequestMapping(value="/user/info")
    public Object userinfo()
    {
        Integer userid=((User) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getId();
        System.out.println(SecurityContextHolder.getContext().getAuthentication().getPrincipal());
        return userservice.getuserinfo(userid);
    }

}
