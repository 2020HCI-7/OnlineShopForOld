package osfo.demo.entity;

import javax.persistence.Entity;
import javax.persistence.Table;

@Entity

public class Consumer extends User {
    public String phonenumber;
    public String wexinOpenid;
    public String neckName;



    public String getPhonenumber() {
        return phonenumber;
    }

    public void setNeckName(String neckName) {
        this.neckName = neckName;
    }

    public void setWexinOpenid(String wexinOpenid) {
        this.wexinOpenid = wexinOpenid;
    }

    public String getWexinOpenid() {
        return wexinOpenid;
    }

    public String getNeckName() {
        return neckName;
    }

    public void setPhonenumber(String phonenumber) {
        this.phonenumber = phonenumber;
    }


    public Consumer()
    {
        setRole("user");
    }
    public Consumer(String username,String password,String neck_name ,String wexin_openid)
    {
        this.neckName=neck_name;
        this.setRole("user");
        this.setUsername(username);
        this.setPassword(password);

    }
}
