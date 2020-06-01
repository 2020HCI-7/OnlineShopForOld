package osfo.demo.entity;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Lob;

@Entity
public class Image {

    @Id
    public Integer id;
    @Lob
    public byte[] image;

    public void setId(Integer id) {
        this.id = id;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }

    public Integer getId() {
        return id;
    }

    public byte[] getImage() {
        return image;
    }
}
