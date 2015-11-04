package com.springapp.mvc;

import com.springapp.model.database.Basedata;
import com.springapp.model.database.Morningp;
import com.springapp.utils.DataUtil;
import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.stereotype.Component;

import java.text.SimpleDateFormat;
import java.util.*;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

/**
 * Created by yanzhao on 15/9/30.
 */

@Component
public class MorningTask implements ApplicationContextAware {

    private ApplicationContext applicationContext;

    @Override
    public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
        this.applicationContext = applicationContext;
    }

    private ExecutorService executors = Executors.newCachedThreadPool();

    public void execute(){
        Logger logger = Logger.getLogger(MorningTask.class);
        try{
            SqlSessionTemplate template = applicationContext.getBean("sqlSessionTemplate", SqlSessionTemplate.class);
            List<Basedata> basedatas = template.selectList("mybatis/mapper.BasedataMapper.selectAll");

            SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");

            while (true){
                String [] p = DataUtil.getCurScData("601857");
                if(p == null || p.length == 0){
                    continue;
                }
                String day = p[30] + " " + p[31];
                String [] ds = simpleDateFormat.format(new Date()).split(" ");
                if(simpleDateFormat.parse(day).after(simpleDateFormat.parse(ds[0] + " 09:26:30"))){
                    break;
                }
                Thread.sleep(1000);
            }

            Map<String,Content> map = new HashMap<String, Content>();
            List<String> [] tcodes  = new List [10];
            for(Basedata bd : basedatas){
                Content c = new Content();
                c.setCode(bd.getCode());
                c.setZs(bd.getZs());
                map.put(bd.getCode(), c);
            }

            int j=0;
            for(String s: map.keySet()){
                int idx = j%10;
                List<String> ts = tcodes[idx];
                if(ts == null){
                    ts = new ArrayList<String>();
                    tcodes[idx] = ts;
                }
                ts.add(s);
                j++;
            }

            logger.info("morningp task start: " + System.currentTimeMillis());


            CountDownLatch countDownLatch = new CountDownLatch(10);
            logger.info("morning task begin");
            long start = System.currentTimeMillis();
            for(int i=0;i<10;i++){
                executors.execute(new TestClass(tcodes[i], countDownLatch, map, template));
            }
            countDownLatch.await();
            long end = System.currentTimeMillis();
            System.out.println("cost" + (end - start));
            logger.info("morningp task end: " + System.currentTimeMillis());
        }catch (Exception e){
            logger.error("morning task catch Exception:", e);
        }
    }



    public static void main(String[] args) throws Exception {
        ClassPathXmlApplicationContext applicationContext = new ClassPathXmlApplicationContext("classpath:ApplicationContext.xml");

//        DOMConfigurator.configure("classpath:");
        SqlSessionTemplate template = applicationContext.getBean("sqlSessionTemplate", SqlSessionTemplate.class);

        List<Basedata> basedatas = template.selectList("mybatis/mapper.BasedataMapper.selectAll");

        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");

        Logger logger = Logger.getLogger(MorningTask.class);



        while (true){
            String [] p = DataUtil.getCurScData("601857");
            if(p == null || p.length == 0){
                continue;
            }
            String day = p[30] + " " + p[31];
            String [] ds = simpleDateFormat.format(new Date()).split(" ");
            if(simpleDateFormat.parse(day).after(simpleDateFormat.parse(ds[0] + " 09:25:01"))){
                break;
            }
            Thread.sleep(1000);
        }

        logger.info("time");

        for(Basedata basedata : basedatas){
            String [] params = DataUtil.getCurScData(basedata.getCode());
            if(params == null || params.length == 0){
                continue;
            }

            Morningp morningp = new Morningp();
            morningp.setCode(basedata.getCode());
            morningp.setZs(basedata.getZs());
            morningp.setDay(new Date());

            morningp.setLastp(Double.valueOf(params[2]));
            morningp.setCurp(Double.valueOf(params[3]));
            morningp.setHighp(Double.valueOf(params[4]));
            morningp.setLowp(Double.valueOf(params[5]));
            morningp.setStartp(Double.valueOf(params[1]));
            morningp.setCurbuyp(Double.valueOf(params[6]));
            morningp.setCurslp(Double.valueOf(params[7]));
            morningp.setCurzs(Long.parseLong(params[8]));
            morningp.setCuramount(Double.valueOf(params[9]));
            morningp.setByonesh(Long.parseLong(params[10]));
            morningp.setByonep(Double.parseDouble(params[11]));
            morningp.setBytwosh(Long.parseLong(params[12]));
            morningp.setBytwop(Double.parseDouble(params[13]));
            morningp.setBythreesh(Long.parseLong(params[14]));
            morningp.setBythreep(Double.parseDouble(params[15]));
            morningp.setByfoursh(Long.parseLong(params[16]));
            morningp.setByfourp(Double.parseDouble(params[17]));
            morningp.setByfivesh(Long.parseLong(params[18]));
            morningp.setByfivep(Double.parseDouble(params[19]));

            morningp.setSlonesh(Long.parseLong(params[20]));
            morningp.setSlonep(Double.parseDouble(params[21]));
            morningp.setSltwosh(Long.parseLong(params[22]));
            morningp.setSltwop(Double.parseDouble(params[23]));
            morningp.setSlthreesh(Long.parseLong(params[24]));
            morningp.setSlthreep(Double.parseDouble(params[25]));
            morningp.setSlfoursh(Long.parseLong(params[26]));
            morningp.setSlfourp(Double.parseDouble(params[27]));
            morningp.setSlfivesh(Long.parseLong(params[28]));
            morningp.setSlfivep(Double.parseDouble(params[29]));

            if(morningp.getCurp()!=null && morningp.getLastp()!=null && morningp.getLastp()>0){
                double rate = (morningp.getCurp()-morningp.getLastp())/morningp.getLastp();
                morningp.setRate(rate);
            }

            if(StringUtils.equals(params[4], "0.00")){
                morningp.setHang(true);
            }else {
                morningp.setHang(false);
            }

        }
    }

    private class TestClass implements Runnable {

        private List<String> tcode ;
        private CountDownLatch countDownLatch;
        private Map<String, Content> map;
        private SqlSessionTemplate template;
        public TestClass(List<String> tcode, CountDownLatch countDownLatch, Map<String, Content> map, SqlSessionTemplate template) {
            this.tcode = tcode;
            this.countDownLatch = countDownLatch;
            this.map = map;
            this.template = template;
        }


        @Override
        public void run() {


            for(String code : tcode){
                String [] params = DataUtil.getCurScData(code);
                if(params == null || params.length == 0){
                    continue;
                }

                Morningp morningp = new Morningp();
                morningp.setCode(code);
                morningp.setZs(map.get(code).getZs());
                morningp.setDay(new Date());

                morningp.setLastp(Double.valueOf(params[2]));
                morningp.setCurp(Double.valueOf(params[3]));

                morningp.setHighp(Double.valueOf(params[4]));
                morningp.setLowp(Double.valueOf(params[5]));
                morningp.setStartp(Double.valueOf(params[1]));
                morningp.setCurbuyp(Double.valueOf(params[6]));
                morningp.setCurslp(Double.valueOf(params[7]));
                morningp.setCurzs(Long.parseLong(params[8]));
                morningp.setCuramount(Double.valueOf(params[9]));
                morningp.setByonesh(Long.parseLong(params[10]));
                morningp.setByonep(Double.parseDouble(params[11]));
                morningp.setBytwosh(Long.parseLong(params[12]));
                morningp.setBytwop(Double.parseDouble(params[13]));
                morningp.setBythreesh(Long.parseLong(params[14]));
                morningp.setBythreep(Double.parseDouble(params[15]));
                morningp.setByfoursh(Long.parseLong(params[16]));
                morningp.setByfourp(Double.parseDouble(params[17]));
                morningp.setByfivesh(Long.parseLong(params[18]));
                morningp.setByfivep(Double.parseDouble(params[19]));

                morningp.setSlonesh(Long.parseLong(params[20]));
                morningp.setSlonep(Double.parseDouble(params[21]));
                morningp.setSltwosh(Long.parseLong(params[22]));
                morningp.setSltwop(Double.parseDouble(params[23]));
                morningp.setSlthreesh(Long.parseLong(params[24]));
                morningp.setSlthreep(Double.parseDouble(params[25]));
                morningp.setSlfoursh(Long.parseLong(params[26]));
                morningp.setSlfourp(Double.parseDouble(params[27]));
                morningp.setSlfivesh(Long.parseLong(params[28]));
                morningp.setSlfivep(Double.parseDouble(params[29]));

                if(morningp.getCurp()!=null && morningp.getLastp()!=null && morningp.getLastp()>0){
                    double rate = (morningp.getCurp()-morningp.getLastp())/morningp.getLastp();
                    morningp.setRate(rate);
                }

                if(StringUtils.equals(params[4], "0.00")){
                    morningp.setHang(true);
                }else {
                    morningp.setHang(false);
                }

                template.insert("mybatis/mapper.MorningpMapper.insert", morningp);
                countDownLatch.countDown();
            }

        }
    }
}
