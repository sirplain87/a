package com.springapp.mvc;

import com.springapp.model.database.Basedata;
import com.springapp.model.database.Price;
import com.springapp.model.database.Weight;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by yanzhao on 15/9/15.
 */
public class WeightFour {

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
            List<Price> prices = template.selectList("mybatis/mapper.PriceMapper.selectListofTenAndDate", params);
            if (prices == null || prices.size() == 0) {
                continue;
            }
            int decr = 0;
            double rate = 0.0;


            for (Price price : prices) {
                if (price.getHang()) {
                    break;
                }
                if (price.getStartp() != null && price.getEnd() != null) {
                    rate = (price.getEnd() - price.getPrevp()) / price.getPrevp();

                    if (price.getEnd() < price.getStartp() && rate < -0.01) {
                        decr++;
                    } else if (price.getEnd() < price.getStartp() && rate >= -0.01) {

                    } else if (price.getEnd() > price.getStartp()) {
                        break;
                    } else if (price.getHigh() != null && price.getPrevp() != null) {
                        if (price.getEnd() < price.getPrevp() && rate < -0.01) {
                            decr++;
                        } else {
                            break;
                        }
                    }
                }
            }

            if (decr >= 4) {
                System.out.println(code + "------------------" + decr);
            }


            Weight weight = new Weight();
            weight.setCode(code);
            weight.setDay(date);
            weight.setDecr(decr);
            weight.setRate(rate);
//            template.insert("mybatis/mapper.WeightMapper.insert", weight);

        }

        System.out.println("get weight four end");
    }
}
