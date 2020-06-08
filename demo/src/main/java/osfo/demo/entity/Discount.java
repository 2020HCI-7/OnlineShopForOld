package osfo.demo.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Discount {
    @Id
    @GeneratedValue
    public Integer id;
    public Integer storeId;
    public float man;
    public float jian;

    public Integer getId() {
        return id;
    }

    public Integer getStoreId() {
        return storeId;
    }

    public float getJian() {
        return jian;
    }

    public float getMan() {
        return man;
    }

    public void setStoreId(Integer storeId) {
        this.storeId = storeId;
    }

    public void setJian(float jian) {
        this.jian = jian;
    }

    public void setMan(float man) {
        this.man = man;
    }
}
