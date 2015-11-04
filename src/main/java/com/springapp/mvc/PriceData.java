package com.springapp.mvc;

import com.springapp.model.database.Basedata;
import com.springapp.model.database.Price;
import com.springapp.utils.DataUtil;
import org.apache.commons.lang3.StringUtils;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.List;

/**
 * Created by yanzhao on 15/8/12.
 */
@Service
public class PriceData implements ApplicationContextAware {

    private ApplicationContext applicationContext;

    public void execute()throws Exception{

        SqlSessionTemplate template = applicationContext.getBean("sqlSessionTemplate", SqlSessionTemplate.class);
        List<Basedata> basedatas = template.selectList("mybatis/mapper.BasedataMapper.selectAll");

        for(Basedata basedata : basedatas){
            String [] params = DataUtil.getCurScData(basedata.getCode());
            if(params == null || params.length == 0){
                continue;
            }

            Price price = new Price();
            price.setCode(basedata.getCode());
            String day = params[params.length-3];
            String time = params[params.length-2];
            SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
            System.out.println(day + " " + time);
            price.setDay(simpleDateFormat.parse(day + " " + time));
            price.setPrevp(Double.valueOf(params[2]));
            price.setEnd(Double.valueOf(params[3]));
            price.setHigh(Double.valueOf(params[4]));
            price.setLow(Double.valueOf(params[5]));
            price.setStartp(Double.valueOf(params[1]));
            price.setZs(Long.parseLong(params[8]));
            if(StringUtils.equals(params[4], "0.00")){
                price.setHang(true);
            }else {
                price.setHang(false);
            }

            template.insert("mybatis/mapper.PriceMapper.insert", price);
        }
    }

    @Override
    public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
        this.applicationContext = applicationContext;
    }
}
