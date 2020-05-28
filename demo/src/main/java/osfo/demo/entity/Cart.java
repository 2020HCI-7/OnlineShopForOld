package osfo.demo.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToOne;

@Entity
public class Cart {
    @Id
    @GeneratedValue
    public Integer id;
    public Integer userId;
    public Integer goodId;
    public float number;

    public float getNumber() {
        return number;
    }

    public Integer getUserId() {
        return userId;
    }

    public Integer getId() {
        return id;
    }

    public Integer getGoodId() {
        return goodId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public void setGoodId(Integer goodId) {
        this.goodId = goodId;
    }

    public void setNumber(float number) {
        this.number = number;
    }
}
