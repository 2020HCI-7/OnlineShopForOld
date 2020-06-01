package osfo.demo.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import osfo.demo.entity.Image;
import osfo.demo.repo.imageRepo;

import java.util.Optional;

@Repository
public class imageDao {
    @Autowired
    imageRepo imagerepo;
    public Optional<Image> getimage(Integer imageid)
    {
        return imagerepo.findById(imageid);
    }
    public void uploadimage(Image image)
    {
        imagerepo.save(image);
    }

}
