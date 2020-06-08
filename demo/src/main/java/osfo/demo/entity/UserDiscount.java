package osfo.demo.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.util.List;

@Entity
public class UserDiscount {
    @Id
    @GeneratedValue
    public Integer id;
    public Integer userId;
    public Integer discountId;
    public float man;
    public float jian;
    public Integer storeId;

    public void setStoreId(Integer storeId) {
        this.storeId = storeId;
    }

    public Integer getStoreId() {
        return storeId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public void setDiscountId(Integer discountId) {
        this.discountId = discountId;
    }

    public Integer getUserId() {
        return userId;
    }

    public Integer getDiscountId() {
        return discountId;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public void setMan(float man) {
        this.man = man;
    }

    public void setJian(float jian) {
        this.jian = jian;
    }

    public float getMan() {
        return man;
    }

    public float getJian() {
        return jian;
    }
}
