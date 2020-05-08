package com.oauth.demo.entity;

import javax.persistence.*;

@Entity
@Inheritance(strategy = InheritanceType.JOINED)

public class User {
    @Id
    @GeneratedValue
    private Integer id;
    private String username;
    private String password;
    private Integer status;

    public Integer getId() {
        return id;
    }

    public Integer getStatus() {
        return status;
    }

    public String getPassword() {
        return password;
    }

    public String getUsername() {
        return username;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public void setUsername(String username) {
        this.username = username;
    }
    public User(String username,String password,Integer status)
    {
        username=username;
        password=password;
        status=status;
    }
    public User()
    {

    }
}
