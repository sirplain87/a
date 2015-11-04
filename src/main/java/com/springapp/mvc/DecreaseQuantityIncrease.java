package com.springapp.mvc;

import com.springapp.model.database.Basedata;
import com.springapp.model.database.Price;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by yanzhao on 15/9/23.
 */
public class DecreaseQuantityIncrease {
    public static void main(String[] args) throws Exception {
        ClassPathXmlApplicationContext applicationContext = new ClassPathXmlApplicationContext("classpath:ApplicationContext.xml");

        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-ddhh:mm:ss");
        Date date = dateFormat.parse(args[0]);

//        DOMConfigurator.configure("classpath:");
        SqlSessionTemplate template = applicationContext.getBean("sqlSessionTemplate", SqlSessionTemplate.class);
        List<Basedata> basedatas = template.selectList("mybatis/mapper.BasedataMapper.selectAll");

        Map<String, Object> params = new HashMap<String, Object>();
        params.put("day", date);


        for (Basedata basedata : basedatas) {
            String code = basedata.getCode();

            params.put("code", code);
            List<Price> prices = template.selectList("mybatis/mapper.PriceMapper.selectListofTwoAndDate", params);
            if (prices == null || prices.size() != 2) {
                continue;
            }
            int decr = 0;
            Price price1 = prices.get(0);
            Price price2 = prices.get(1);

            if(price2.getZs()!=null && price2.getZs()!=0){
                double rate = price1.getZs()/(price2.getZs()+0.00);
                double hsr = price1.getZs()/(basedata.getZs()+0.00);

                if(price1.getEnd()<price1.getStartp() && price1.getStartp()<price2.getEnd() && rate>1.5 && hsr>0.1){
                    System.out.println(code + "------------------" + rate);

                }
            }


        }

        System.out.println("get weight four end");
    }
}
