package osfo.demo.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToOne;

@Entity
public class OderItem {
    @OneToOne
    Userorder userorder;
    @OneToOne
    Goods good;
    @Id
    @GeneratedValue
    private Integer id;
    private float number;

    public void setId(Integer id) {
        this.id = id;
    }

    public void setGood(Goods good) {
        this.good = good;
    }

    public void setNumber(float number) {
        this.number = number;
    }

    public void setUserorder(Userorder userorder) {
        this.userorder = userorder;
    }

    public Integer getId() {
        return id;
    }

    public float getNumber() {
        return number;
    }

    public Goods getGood() {
        return good;
    }

    public Userorder getUserorder() {
        return userorder;
    }
    
}
