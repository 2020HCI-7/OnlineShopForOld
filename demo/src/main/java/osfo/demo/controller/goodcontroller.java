package osfo.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import osfo.demo.service.goodService;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;

@RestController
public class goodcontroller {
    @Autowired
    goodService goodservice;
    @RequestMapping(value="/goods/getbydealerid")
    public Object getgoodsbydealerid(@RequestParam("dealerid") Integer id)
    {
        return goodservice.getgoodsbydealerid(id);
    }
    @RequestMapping(value="/goods/getbtsound")
    public Object getgoodsbysound(HttpServletRequest request, HttpServletResponse response)
    {
        MultipartHttpServletRequest mprequest = (MultipartHttpServletRequest) request;
        MultipartFile multipartFile=mprequest.getFile("file");
        // 2.获得文件扩展名
        String extOfFile = getExtOfFile(multipartFile);
        // 3.保存到本地
        BufferedOutputStream bos = null;
        String filename = null;
        try {
            File dir = new File("file_save_path");
            if (!dir.exists()) {// 判断文件目录是否存在
                dir.mkdirs();
            }
            filename = new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) + (int) (Math.random() * 1000) + "."
                    + extOfFile;
            bos = new BufferedOutputStream(new FileOutputStream("file_save_path" + filename));
            bos.write(multipartFile.getBytes());

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (bos != null) {
                try {
                    bos.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }

        }
        return 0;

    }
    public String getExtOfFile(MultipartFile multipartFile) {
        // 获取文件的 名称.扩展名
        String oldName = multipartFile.getOriginalFilename();
        String extensionName = "";
        // 获取原来的扩展名
        if ((oldName != null) && (oldName.length() > 0)) {
            int dot = oldName.lastIndexOf('.');
            if ((dot > -1) && (dot < (oldName.length() - 1))) {
                extensionName = oldName.substring(dot+1);
            }
        }
        return extensionName;
    }


}
