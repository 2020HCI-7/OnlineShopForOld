package osfo.demo.entity;

import javax.persistence.*;

@Entity
public class Store {
    @Id
    private int dealerid;
    @OneToOne
    @PrimaryKeyJoinColumn(referencedColumnName = "id")
    private Dealer dealer;
    private String address;
    private String phonenumber;

    public void setPhonenumber(String phonenumber) {
        this.phonenumber = phonenumber;
    }

    public void setDealerid(int dealerid) {
        this.dealerid = dealerid;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPhonenumber() {
        return phonenumber;
    }



    public String getAddress() {
        return address;
    }
    public Store()
    {

    }
}
