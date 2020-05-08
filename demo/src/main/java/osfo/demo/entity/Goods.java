package osfo.demo.entity;


import javax.persistence.*;

import javax.persistence.*;

@Entity

public class Goods {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @OneToOne
    private Store store;
    private float normal_price;
    private float least_price;
    private String goodname;
    private String description;
    private float storage;


    public void setDescription(String description) {
        this.description = description;
    }

    public void setGoodname(String goodname) {
        this.goodname = goodname;
    }

    public void setLeast_price(float least_price) {
        this.least_price = least_price;
    }

    public void setNormal_price(float normal_price) {
        this.normal_price = normal_price;
    }

    public void setStorage(float storage) {
        this.storage = storage;
    }

    public void setStore(Store store) {
        this.store = store;
    }

    public Integer getId() {
        return id;
    }

    public float getLeast_price() {
        return least_price;
    }

    public float getNormal_price() {
        return normal_price;
    }

    public float getStorage() {
        return storage;
    }

    public Store getStore() {
        return store;
    }

    public String getDescription() {
        return description;
    }

    public String getGoodname() {
        return goodname;
    }

}
