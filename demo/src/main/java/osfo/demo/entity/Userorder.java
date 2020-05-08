package osfo.demo.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import java.util.Date;

@Entity
public class Userorder {
    @Id
    @GeneratedValue
    public Integer id;
    public Date date;
    @OneToOne
    private User user;
    @OneToOne
    private Dealer dealer;
    @OneToOne
    private Address address;
    private Integer status;
    private String comment;
    public void setDate(Date date) {
        this.date = date;
    }

    public Integer getId() {
        return id;
    }

    public Date getDate() {
        return date;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public void setAddress(Address address) {
        this.address = address;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public void setDealer(Dealer dealer) {
        this.dealer = dealer;
    }

    public User getUser() {
        return user;
    }

    public Integer getStatus() {
        return status;
    }

    public Address getAddress() {
        return address;
    }

    public Dealer getDealer() {
        return dealer;
    }

    public String getComment() {
        return comment;
    }
}
