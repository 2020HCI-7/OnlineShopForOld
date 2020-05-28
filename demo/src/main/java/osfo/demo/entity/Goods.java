package osfo.demo.entity;


import javax.persistence.*;

import javax.persistence.*;

@Entity

public class Goods {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Integer id;

    private Integer storeId;
    private float normalPrice;
    private float leastPrice;
    private String goodname;
    private String description;
    private float storage;



    public void setDescription(String description) {
        this.description = description;
    }

    public void setGoodname(String goodname) {
        this.goodname = goodname;
    }



    public void setStorage(float storage) {
        this.storage = storage;
    }

    public void setStoreId(Integer storeId) {
        this.storeId = storeId;
    }

    public Integer getStoreId() {
        return storeId;
    }

    public Integer getId() {
        return id;
    }

    public void setLeastPrice(float leastPrice) {
        this.leastPrice = leastPrice;
    }

    public void setNormalPrice(float normalPrice) {
        this.normalPrice = normalPrice;
    }

    public float getNormalPrice() {
        return normalPrice;
    }

    public float getLeastPrice() {
        return leastPrice;
    }

    public float getStorage() {
        return storage;
    }



    public String getDescription() {
        return description;
    }

    public String getGoodname() {
        return goodname;
    }

}
