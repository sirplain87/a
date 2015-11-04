package com.springapp.mvc;

import com.alibaba.fastjson.JSON;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by yanzhao on 15/8/12.
 */
public class TestTask {

    public void test(){
        System.out.println("this is a test");
    }

    public static void main(String [] args){

        Double d = new Double(1000);

        System.out.println(d);
        System.out.println(String.format("%.2f", d));
        String ds = String.format("%.2f", d);
        System.out.println(Double.valueOf(ds));

        Map<String, Object> params = new HashMap<String, Object>();
        BigDecimal bd = new BigDecimal(ds);
        params.put("ds",bd);
        double dd = bd.setScale(2, BigDecimal.ROUND_HALF_UP).doubleValue();

        System.out.println(bd.setScale(2).doubleValue());

        System.out.println(Math.random());
        System.out.println(JSON.toJSONString(params));
    }



}
