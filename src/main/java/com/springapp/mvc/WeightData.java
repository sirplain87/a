package com.springapp.mvc;

import com.alibaba.fastjson.JSON;
import com.springapp.model.database.Basedata;
import com.springapp.model.database.Price;
import com.springapp.model.database.Weight;
import org.apache.log4j.Logger;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by yanzhao on 15/8/16.
 */
@Service
public class WeightData implements ApplicationContextAware {
    private ApplicationContext applicationContext;
    @Override
    public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
        this.applicationContext = applicationContext;

    }

    public void execute(){
        SqlSessionTemplate template = applicationContext.getBean("sqlSessionTemplate", SqlSessionTemplate.class);
        List<Basedata> basedatas = template.selectList("mybatis/mapper.BasedataMapper.selectAll");

        Logger logger = Logger.getLogger(WeightData.class);

        logger.info("weight data statistic begin");
        for(Basedata basedata : basedatas){
            String code = basedata.getCode();
            List<Price> prices = template.selectList("mybatis/mapper.PriceMapper.selectListofTen", code);
            if(prices == null || prices.size() == 0){
                continue;
            }
            int decr=0;
            int incre = 0;

            double rate = 0.0;

            for(Price price : prices){
                if(price.getHang()){
                    break;
                }
                if(price.getStartp()!=null && price.getEnd()!=null){
                    if(price.getEnd()< price.getStartp()){
                        rate += (price.getEnd()-price.getPrevp())/price.getPrevp();

                        decr++;
                    }else if(price.getEnd()> price.getStartp()){
                        break;
                    }else if(price.getHigh()!=null && price.getPrevp()!=null){
                        //检查是否跌停
                        if(price.getEnd() < price.getPrevp()){
                            decr++;
                            rate += (price.getEnd()-price.getPrevp())/price.getPrevp();

                        }else {
                            break;
                        }
                    }
                }

            }


            for(Price price : prices){
                if(price.getHang()){
                    break;
                }
                if(price.getStartp()!=null && price.getEnd()!=null){
                    if(price.getEnd()> price.getStartp()){
                        incre++;
//                        rate += (price.getEnd()-price.getPrevp())/price.getPrevp();
                    }else if(price.getEnd() < price.getStartp()){
                        break;
                    }else if(price.getHigh()!=null && price.getPrevp()!=null){
                        //检查是否跌停
                        if(price.getEnd() > price.getPrevp()){
                            incre++;
//                            rate += (price.getEnd()-price.getPrevp())/price.getPrevp();
                        }else {
                            break;
                        }
                    }
                }
            }
            Weight weight = new Weight();
            weight.setCode(code);
            weight.setDay(new Date());
            weight.setDecr(decr);
            weight.setRate(rate);
            weight.setIncre(incre);

            logger.info(JSON.toJSONString(weight));
            template.insert("mybatis/mapper.WeightMapper.insert", weight);

        }

    }

    public static void main(String [] args)throws Exception{
        ClassPathXmlApplicationContext applicationContext = new ClassPathXmlApplicationContext("classpath:ApplicationContext.xml");

        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-ddhh:mm:ss");
        Date date = dateFormat.parse(args[0]);

//        DOMConfigurator.configure("classpath:");
        SqlSessionTemplate template = applicationContext.getBean("sqlSessionTemplate", SqlSessionTemplate.class);
        List<Basedata> basedatas = template.selectList("mybatis/mapper.BasedataMapper.selectAll");

        Map<String,Object> params = new HashMap<String, Object>();
        params.put("day", date);


        for(Basedata basedata : basedatas){
            String code = basedata.getCode();

            params.put("code", code);
            List<Price> prices = template.selectList("mybatis/mapper.PriceMapper.selectListofTenAndDate", params);
            if(prices == null || prices.size() == 0){
                continue;
            }
            int decr=0;
            int incre = 0;
            double rate = 0.0;

            for(Price price : prices){
                if(price.getHang()){
                    break;
                }
                if(price.getStartp()!=null && price.getEnd()!=null){
                    if(price.getEnd()< price.getStartp()){
                        decr++;
                        rate += (price.getEnd()-price.getPrevp())/price.getPrevp();
                    }else if(price.getEnd()> price.getStartp()){
                        break;
                    }else if(price.getHigh()!=null && price.getPrevp()!=null){
                        //检查是否跌停
                        if(price.getEnd() < price.getPrevp()){
                            decr++;
                            rate += (price.getEnd()-price.getPrevp())/price.getPrevp();
                        }else {
                            break;
                        }
                    }
                }
            }

            for(Price price : prices){
                if(price.getHang()){
                    break;
                }
                if(price.getStartp()!=null && price.getEnd()!=null){
                    if(price.getEnd()> price.getStartp()){
                        incre++;
//                        rate += (price.getEnd()-price.getPrevp())/price.getPrevp();
                    }else if(price.getEnd() < price.getStartp()){
                        break;
                    }else if(price.getHigh()!=null && price.getPrevp()!=null){
                        //检查是否跌停
                        if(price.getEnd() > price.getPrevp()){
                            incre++;
//                            rate += (price.getEnd()-price.getPrevp())/price.getPrevp();
                        }else {
                            break;
                        }
                    }
                }
            }

            Weight weight = new Weight();
            weight.setCode(code);
            weight.setDay(date);
            weight.setDecr(decr);
            weight.setRate(rate);
            weight.setIncre(incre);
            template.insert("mybatis/mapper.WeightMapper.insert", weight);

        }
    }

}
