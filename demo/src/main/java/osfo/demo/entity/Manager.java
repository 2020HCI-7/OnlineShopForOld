package osfo.demo.entity;

import javax.persistence.Entity;

@Entity
public class Manager extends User {
    public String phonenum;

    public String getPhonenum() {
        return phonenum;
    }

    public void setPhonenum(String phonenum) {
        this.phonenum = phonenum;
    }
    public Manager()
    {
        setRole("manager");
    }
}
