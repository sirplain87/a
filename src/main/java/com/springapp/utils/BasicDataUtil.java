package com.springapp.utils;

import com.alibaba.fastjson.JSON;
import com.springapp.model.database.Basedata;
import com.springapp.mvc.Content;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by yanzhao on 15/8/12.
 */
public class BasicDataUtil {

    public static void main(String [] args)throws Exception{

        ClassPathXmlApplicationContext applicationContext = new ClassPathXmlApplicationContext("classpath:ApplicationContext.xml");

        SqlSessionTemplate template = applicationContext.getBean("sqlSessionTemplate", SqlSessionTemplate.class);
        FileInputStream stream = new FileInputStream(new File("/Users/yanzhao/Desktop/gg.html"));
        InputStreamReader reader = new InputStreamReader(stream, "utf-8");
        BufferedReader bufferedReader = new BufferedReader(reader);

        String line = null;
        Map<String,Content> map = new HashMap<String, Content>();
        List<String>[] tcodes  = new List [10];
        while ((line = bufferedReader.readLine()) != null){
            String [] params = line.split(" ");
            Basedata basedata = new Basedata();
            basedata.setCode(params[2]);
            basedata.setLink(params[0]);
            basedata.setName(params[1]);
            basedata.setZs(Long.parseLong(params[4]));
            basedata.setZsabbre(params[3]);
            System.out.println(JSON.toJSON(basedata));

            template.insert("mybatis/mapper.BasedataMapper.insert", basedata);

        }
    }
}
