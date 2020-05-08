package osfo.demo.entity;

import javax.persistence.*;

@Entity
public class Address {
    @Id
    @GeneratedValue
    private Integer userid;
    @OneToOne

    private User user;
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

    public void setUser(User user) {
        this.user = user;
    }

    public void setUserid(Integer userid) {
        this.userid = userid;
    }

    public String getAddress() {
        return address;
    }

    public String getPhonenumber() {
        return phonenumber;
    }

    public Integer getUserid() {
        return userid;
    }

    public String getReceivername() {
        return receivername;
    }

    public User getUser() {
        return user;
    }
}
