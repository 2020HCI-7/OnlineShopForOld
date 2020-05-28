package osfo.demo.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import java.util.Date;

@Entity
public class Userorder {
    @Id
    @GeneratedValue
    public Integer id;
    public Date date;

    private Integer userId;

    private Integer storeId;

    private Integer addressId;
    private Integer status;
    private String comment;
    public void setDate(Date date) {
        this.date = date;
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



    public void setId(Integer id) {
        this.id = id;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public void setComment(String comment) {
        this.comment = comment;
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
