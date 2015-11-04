package com.springapp.utils;

import java.net.URL;
import java.util.Date;
import java.util.TimeZone;

/**
 * Created by yanzhao on 15/8/5.
 */
public class TimeUtil {

    public static Date getBjTimeFromNet()throws Exception{

        TimeZone.setDefault(TimeZone.getTimeZone("GMT+8")); // 时区设置

        String pattern = "yyyy-MM-dd hh:mm:ss";//这是日期格式
        java.text.SimpleDateFormat df = new java.text.SimpleDateFormat(pattern);//设定日期格式
        java.util.Date date;
        java.net.URL url=new URL("http://www.bjtime.cn");//取得资源对象
        java.net.URLConnection uc=url.openConnection();//生成连接对象
        uc.connect(); //发出连接
        long ld=uc.getDate(); //取得网站日期时间
        date=new Date(ld); //转换为标准时间对象
        String bjTime = df.format(date);
        System.out.println("北京时间:"+bjTime);
        Date dt = new Date();
        System.out.println("北京时间" + dt);
        return date;
    }

    public static void main(String [] args)throws Exception{
        while (true){
            System.out.println(HttpClientUtils.doGet("http://123.57.59.230:8080/untitled1/dt?cd=1234000760028477", null));
            Thread.sleep(15000);
        }
    }
}
