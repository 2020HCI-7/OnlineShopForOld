package osfo.demo.entity;

import javax.persistence.*;

@Entity
public class OrderItem {

    Integer userorderId;

    Integer goodId;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private float goodprice;
    private String goodname;
    private float number;

    public void setGoodname(String goodname) {
        this.goodname = goodname;
    }

    public void setGoodprice(float goodprice) {
        this.goodprice = goodprice;
    }

    public float getGoodprice() {
        return goodprice;
    }

    public String getGoodname() {
        return goodname;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getGoodId() {
        return goodId;
    }

    public void setNumber(float number) {
        this.number = number;
    }

    public void setUserorderId(Integer userorderId) {
        this.userorderId = userorderId;
    }

    public Integer getId() {
        return id;
    }

    public float getNumber() {
        return number;
    }

    public void setGoodId(Integer goodId) {
        this.goodId = goodId;
    }

    public Integer getUserorderId() {
        return userorderId;
    }
}
