package osfo.demo.entity;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import javax.persistence.*;

@Entity

public class Store {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Integer id;

    @OneToOne
    private Dealer dealer;
    private String address;
    private String phonenumber;

    public void setPhonenumber(String phonenumber) {
        this.phonenumber = phonenumber;
    }

    public Integer getId() {
        return id;
    }

    public void setDealer(Dealer dealer) {
        this.dealer = dealer;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPhonenumber() {
        return phonenumber;
    }

    public Dealer getDealer() {
        return dealer;
    }

    public String getAddress() {
        return address;
    }
    public Store()
    {

    }
}
