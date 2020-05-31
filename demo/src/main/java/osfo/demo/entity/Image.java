package osfo.demo.entity;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class Image {

    @Id
    public Integer id;
    public Byte[] image;

    public void setId(Integer id) {
        this.id = id;
    }

    public void setImage(Byte[] image) {
        this.image = image;
    }

    public Integer getId() {
        return id;
    }

    public Byte[] getImage() {
        return image;
    }
}
