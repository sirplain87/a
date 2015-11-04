package com.springapp.utils;

import com.alibaba.fastjson.JSON;
import com.springapp.model.database.Price;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import java.io.*;
import java.util.List;

/**
 * Created by yanzhao on 15/8/12.
 */
public class Dbmigrate {
    public static  void main(String [] args)throws Exception{
        ClassPathXmlApplicationContext classPathXmlApplicationContext = new ClassPathXmlApplicationContext("classpath:ApplicationContext.xml");
        SqlSessionTemplate template = classPathXmlApplicationContext.getBean("sqlSessionTemplate", SqlSessionTemplate.class);
//        fromdb(template);
        todb(template);

    }

    private static void fromdb(SqlSessionTemplate template)throws Exception{
        FileOutputStream fileOutputStream = new FileOutputStream("/Users/yanzhao/Desktop/prices.json");
        OutputStreamWriter outputStreamWriter = new OutputStreamWriter(fileOutputStream);
        BufferedWriter bufferedWriter = new BufferedWriter(outputStreamWriter);
        List<Price> priceList = template.selectList("mybatis/mapper.PriceMapper.selectAll");
        for(Price pr : priceList){
            bufferedWriter.write(JSON.toJSONString(pr) + "\n");
        }

        bufferedWriter.flush();

        outputStreamWriter.flush();

        fileOutputStream.flush();
        fileOutputStream.close();

    }

    private static void todb(SqlSessionTemplate template)throws Exception{
        FileInputStream fileInputStream = new FileInputStream(new File("/Users/yanzhao/Desktop/prices.json"));
        InputStreamReader inputStreamReader = new InputStreamReader(fileInputStream);
        BufferedReader bufferedReader = new BufferedReader(inputStreamReader);
        String line = null;
        while ((line = bufferedReader.readLine())!=null){
            Price price = JSON.parseObject(line,Price.class);
            price.setId(null);
            template.insert("mybatis/mapper.PriceMapper.insert", price);
        }
    }
}
