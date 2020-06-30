package osfo.demo.entity;

import javax.persistence.*;
import java.util.Date;

@Entity
public class Userorder {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Integer id;
    public Date date;

    private Integer userId;

    private Integer storeId;

    private Integer addressId;
    private Integer status;
    private String comment;
    public float money;
    public float finalmoney;
    public float man;
    public float jian;
    public void setDate(Date date) {
        this.date = date;
    }

    public void setJian(float jian) {
        this.jian = jian;
    }

    public void setMan(float man) {
        this.man = man;
    }

    public float getJian() {
        return jian;
    }

    public float getMan() {
        return man;
    }

    public Integer getId() {
        return id;
    }

    public Date getDate() {
        return date;
    }

   /* public void setUser(User user) {
        this.user = user;
    }*/

    public void setFinalmoney(float finalmoney) {
        this.finalmoney = finalmoney;
    }

    public float getFinalmoney() {
        return finalmoney;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public void setMoney(float money) {
        this.money = money;
    }

    public float getMoney() {
        return money;
    }

    public Integer getStatus() {
        return status;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public void setAddressId(Integer addressId) {
        this.addressId = addressId;
    }

    public void setStoreId(Integer storeId) {
        this.storeId = storeId;
    }

    public Integer getUserId() {
        return userId;
    }

    public Integer getAddressId() {
        return addressId;
    }

    public Integer getStoreId() {
        return storeId;
    }

    public String getComment() {
        return comment;
    }
}
