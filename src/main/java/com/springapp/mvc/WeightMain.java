package com.springapp.mvc;

import com.alibaba.fastjson.JSON;
import com.springapp.model.database.Price;
import com.springapp.model.database.Weight;
import org.apache.ibatis.session.RowBounds;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by yanzhao on 15/9/29.
 */
public class WeightMain {

    public static void main(String[] args) throws Exception {
        ClassPathXmlApplicationContext applicationContext = new ClassPathXmlApplicationContext("classpath:ApplicationContext.xml");

//        DOMConfigurator.configure("classpath:");
        SqlSessionTemplate template = applicationContext.getBean("sqlSessionTemplate", SqlSessionTemplate.class);
        int count = template.selectOne("mybatis/mapper.WeightMapper.selectCount");

        int pages = count/5000;

        for(int i=2; i<=pages ; i++){
            System.out.println(i);
            List<Weight> weights = template.selectList("mybatis/mapper.WeightMapper.selectPages", null, new RowBounds(i*5000, 5000));

            for(Weight w : weights){
                if(w.getIncre() != null){
                    continue;
                }else {
                    Map<String, Object> params = new HashMap<String, Object>();
                    params.put("day", w.getDay());
                    params.put("code", w.getCode());
                    List<Price> prices = template.selectList("mybatis/mapper.PriceMapper.selectListofTenAndDate", params);

                    if(prices == null || prices.size() == 0){
                        continue;
                    }
                    int incre = 0;


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

                    w.setIncre(incre);
                    //更新
                    template.update("mybatis/mapper.WeightMapper.updateByPrimaryKey", w);
                    System.out.println(JSON.toJSONString(w));
                }
            }
        }
        System.out.println("get weight four end");
    }
}
