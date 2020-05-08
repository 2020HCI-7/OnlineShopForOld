package osfo.demo.entity;

import javax.persistence.*;

@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)

public class User {
    @Id
    @GeneratedValue
    @Column(name = "id")
    private Integer id;
    private String username;
    private String password;
    private Integer status;
    private String role;

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public Integer getId() {
        return id;
    }

    public Integer getStatus() {
        return status;
    }

    public String getPassword() {
        return password;
    }

    public String getUsername() {
        return username;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public void setUsername(String username) {
        this.username = username;
    }
    public User(String username,String password,Integer status)
    {
        username=username;
        password=password;
        status=status;
    }
    public User()
    {

    }
}
