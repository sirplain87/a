package com.springapp.mvc;

import com.springapp.model.database.Weight;
import com.springapp.utils.DataUtil;
import com.springapp.utils.HttpClientUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by yanzhao on 15/9/4.
 */
@Service
public class BuyTask implements ApplicationContextAware{
    private ApplicationContext applicationContext;
    private int toBuy =10;
    @Override
    public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
        this.applicationContext = applicationContext;
    }

    public void execute()throws Exception{
        SqlSessionTemplate sqlSessionTemplate = applicationContext.getBean("sqlSessionTemplate", SqlSessionTemplate.class);

        Logger logger = Logger.getLogger(BuyTask.class);
        logger.info("buy task begin");
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
        Weight wt = sqlSessionTemplate.selectOne("mybatis/mapper.WeightMapper.selectLatestOne");
        String  s = simpleDateFormat.format(wt.getDay());
        String [] ss = s.split(" ");
        String starts = ss[0] + " 06:22:06";
        String ends = ss[0] + " 20:22:06";

        Date start = simpleDateFormat.parse(starts);
        Date end = simpleDateFormat.parse(ends);

        Map<String,Object> map = new HashMap<String, Object>();
        map.put("start", start);
        map.put("end", end);

        List<Weight> weights = sqlSessionTemplate.selectList("mybatis/mapper.WeightMapper.selectByRateDesc", map);
        int count = 0;
        for(Weight weight : weights){
            String [] params = DataUtil.getCurScData(weight.getCode());
            if(params == null || params.length == 0){
                continue;
            }

            if(StringUtils.equals(params[4], "0.00")){//当前停牌的不处理
                continue;
            }
            double curp = Double.valueOf(params[3]);
            double startp = Double.valueOf(params[1]);
            if(curp<=startp || curp>100){//价格大于100的不处理
                continue;
            }

            String money = HttpClientUtils.doGet("http://localhost:8080/untitled1/queryFunds", null);
            logger.info("current enable money is " + money);
            Double md = Double.valueOf(money);
            if(md>10000){
                Map<String,String> args = new HashMap<String, String>();
                args.put("cd", weight.getCode());
                HttpClientUtils.doPost4Form("http://localhost:8080/untitled1/stbyByDesc", args);//todo
                logger.info("do buy code " + weight.getCode() + ",date " + simpleDateFormat.format(new Date()));
                count++;
            }else {
                break;
            }


//            String day = params[params.length-3];
//            String time = params[params.length-2];
//            SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
//            System.out.println(day + " " + time);
//            price.setDay(simpleDateFormat.parse(day + " " + time));
//            price.setPrevp(Double.valueOf(params[2]));
//            price.setEnd();
//            price.setHigh(Double.valueOf(params[4]));
//            price.setLow(Double.valueOf(params[5]));
//            price.setStartp();
//            price.setZs(Long.parseLong(params[8]));

        }
    }
}
