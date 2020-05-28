package osfo.demo.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToOne;

@Entity
public class OrderItem {

    Integer userorderId;

    Integer goodId;
    @Id
    @GeneratedValue
    private Integer id;
    private float number;

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
