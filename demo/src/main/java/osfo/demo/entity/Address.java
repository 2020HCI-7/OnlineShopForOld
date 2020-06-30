package osfo.demo.entity;

import javax.persistence.*;

@Entity
public class Address {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;


    private Integer userId;
    private String address;
    private String phonenumber;
    private String receivername;

    public void setAddress(String address) {
        this.address = address;
    }

    public void setPhonenumber(String phonenumber) {
        this.phonenumber = phonenumber;
    }

    public void setReceivername(String receivername) {
        this.receivername = receivername;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }


    public String getAddress() {
        return address;
    }

    public String getPhonenumber() {
        return phonenumber;
    }



    public String getReceivername() {
        return receivername;
    }

    public Integer getUserId() {
        return userId;
    }

    public Integer getId() {
        return id;
    }
}
