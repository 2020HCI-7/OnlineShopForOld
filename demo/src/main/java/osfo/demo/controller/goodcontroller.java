package osfo.demo.controller;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import osfo.demo.entity.Goods;
import osfo.demo.entity.User;
import osfo.demo.service.goodService;
import osfo.demo.util.restapi.asrdemo.AsrMain;
import osfo.demo.util.restapi.response;
import sun.tools.jar.CommandLine;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.sound.sampled.AudioFileFormat;
import javax.sound.sampled.AudioFormat;
import javax.sound.sampled.AudioInputStream;
import javax.sound.sampled.AudioSystem;
import java.io.*;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

@RestController
public class goodcontroller {
    public String filepath="/home/admin/";
    @Autowired
    goodService goodservice;
    @RequestMapping(value="/goods/getbydealerid")
    public Object getgoodsbystoreid(@RequestParam("storeid") Integer id)
    {
        return goodservice.getgoodsbystoreid(id);
    }
    @RequestMapping(value="/goods/getallgood")
    public Object getallgood()
    {

        return goodservice.getallgoods();
    }
    @PreAuthorize("hasRole('dealer')")
    @RequestMapping(value="/goods/addgood")
    public Object addgood(@RequestBody Goods good)
    {
        Integer id=((User) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getId();

        return goodservice.addgood(id,good);

    }

    @RequestMapping(value="/goods/uploadimg")
    public Object uploadimg(HttpServletRequest request, HttpServletResponse response)
    {
        MultipartHttpServletRequest mprequest = (MultipartHttpServletRequest) request;
        request.getParameter("id");
        MultipartFile multipartFile=mprequest.getFile("file");
        // 2.获得文件扩展名
        String extOfFile = getExtOfFile(multipartFile);
        System.out.println(extOfFile);
        // 3.保存到本地
        BufferedOutputStream bos = null;
        String filename = null;
        String tmpname=null;
        try {
            File dir = new File(filepath+"image");
            if (!dir.exists()) {// 判断文件目录是否存在
                System.out.println("123");
                dir.mkdirs();
            }
            filename = request.getParameter("id") + ".myimage"
                    ;

            bos = new BufferedOutputStream(new FileOutputStream(filepath+"image/" + filename));

            bos.write(multipartFile.getBytes());
            bos.flush();



            return new response(true,"",null);

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

    @RequestMapping(value="/goods/getimg",produces = {MediaType.IMAGE_JPEG_VALUE, MediaType.IMAGE_PNG_VALUE})
    public Object getimg(@RequestParam("id") String id) throws Exception
    {
        File file=new File(filepath+"image/" + id+".myimage");

        FileInputStream inputStream = new FileInputStream(file);
        byte[] bytes = new byte[inputStream.available()];
        inputStream.read(bytes, 0, inputStream.available());
        return bytes;



    }
    @RequestMapping(value="/goods/getbysound")
    public Object getgoodsbysound(HttpServletRequest request, HttpServletResponse response)
    {
        MultipartHttpServletRequest mprequest = (MultipartHttpServletRequest) request;
        MultipartFile multipartFile=mprequest.getFile("file");
        // 2.获得文件扩展名
        String extOfFile = getExtOfFile(multipartFile);
        System.out.println(extOfFile);
        // 3.保存到本地
        BufferedOutputStream bos = null;
        String filename = null;
        String tmpname=null;
        try {
            File dir = new File(filepath+"audio");
            if (!dir.exists()) {// 判断文件目录是否存在
                System.out.println("123");
                dir.mkdirs();
            }
            filename = new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) + (int) (Math.random() * 1000) + "."
                    + extOfFile;
            tmpname=new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) + (int) (Math.random() * 1000) + ".wav"
                    ;
            bos = new BufferedOutputStream(new FileOutputStream(filepath+"audio/" + filename));

            bos.write(multipartFile.getBytes());
            bos.flush();

            Runtime rt = Runtime.getRuntime();
            Process pr = rt.exec("ffmpeg -i "+filepath+"audio/" + filename+" -ar 16000 -acodec pcm_s16le "+filepath+"audio/" +tmpname);
            while(pr.isAlive())
            {

            }
            System.out.println(multipartFile.getSize());
            AsrMain tmp=new AsrMain(filepath+"audio/" + tmpname);

            JSONObject convert=new JSONObject(tmp.run());
            String name=convert.getJSONArray("result").getString(0);
            name=name.substring(0,name.length()-1);
            System.out.println(name);
            return  goodservice.getgoodsbyname(name);

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
