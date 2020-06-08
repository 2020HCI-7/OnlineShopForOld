package com.oauth.demo.entity;

import javax.persistence.Entity;
import javax.persistence.Table;

@Entity

public class Consumer extends User {
    String phonenumber;
    String wexin_openid;
    String neck_name;

    public String getNeck_name() {
        return neck_name;
    }

    public String getPhonenumber() {
        return phonenumber;
    }

    public String getWexin_openid() {
        return wexin_openid;
    }

    public void setNeck_name(String neck_name) {
        this.neck_name = neck_name;
    }

    public void setPhonenumber(String phonenumber) {
        this.phonenumber = phonenumber;
    }

    public void setWexin_openid(String wexin_openid) {
        this.wexin_openid = wexin_openid;
    }
    public Consumer()
    {

    }
}
