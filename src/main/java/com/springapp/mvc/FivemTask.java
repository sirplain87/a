package com.springapp.mvc;

import com.springapp.model.database.Basedata;
import com.springapp.model.database.Fivem;
import com.springapp.utils.DataUtil;
import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.stereotype.Component;

import java.text.SimpleDateFormat;
import java.util.*;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

/**
 * Created by yanzhao on 15/10/21.
 */
@Component
public class FivemTask implements ApplicationContextAware {

    private ApplicationContext applicationContext;

    @Override
    public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
        this.applicationContext = applicationContext;
    }


    private static ExecutorService executorService = Executors.newCachedThreadPool();

    public void getBonus(){

        Logger logger = Logger.getLogger(Bonus.class);


        try{
            SqlSessionTemplate template = applicationContext.getBean("sqlSessionTemplate", SqlSessionTemplate.class);

            List<Basedata> basedatas = template.selectList("mybatis/mapper.BasedataMapper.selectAll");

            logger.info("get bonus start!!!");

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
            int tag =0;
            while (true){
                Calendar cal = Calendar.getInstance();
                int minute = cal.get(Calendar.MINUTE);
                Date date = new Date();

                SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
                String ds = simpleDateFormat.format(date);
                Date mend = simpleDateFormat.parse(ds.split(" ")[0] + " 11:29:00");
                Date astart = simpleDateFormat.parse(ds.split(" ")[0] + " 13:02:00");
                if(cal.getTime().after(mend) && cal.getTime().before(astart)){
                    logger.info("stop td time:" + simpleDateFormat.format(cal.getTime()));

                    if(tag ==0){
                        Date day = simpleDateFormat.parse(ds.split(" ")[0] + " 09:33:30");
                        try{
                            for(String cd : map.keySet()){
                                HashMap params = new HashMap();
                                logger.info("select code " + cd);
                                params.put("day", day);
                                params.put("code", cd);
                                Fivem fivem = template.selectOne("mybatis/mapper.FivemMapper.selectTodayLatestOne", params);
                                logger.info("select code " + cd + "success");
                                if(fivem!=null){
                                    fivem.setHsrate(fivem.getCurzs()/(fivem.getZs()+0.99));
                                    logger.info("calculate fivem hsrate " + fivem.getHsrate());
                                    template.update("mybatis/mapper.FivemMapper.updateByPrimaryKey", fivem);
                                    logger.info("update fivem of code" + cd);
                                }else {
                                    logger.error("get first one fivem of code " + cd + " failed");
                                }

                            }
                            tag =1;
                        }catch (Exception e){
                            logger.error("catch exception", e);
                        }
                    }


                    Thread.sleep(1*60*1000);
                    continue;
                }


                while (minute%5 != 0){
                    cal = Calendar.getInstance();
                    minute = cal.get(Calendar.MINUTE);
                }


                CountDownLatch countDownLatch = new CountDownLatch(10);
                logger.info("five minute task begin");
                long start = System.currentTimeMillis();
                for(int i=0;i<10;i++){
                    executorService.execute(new TestClass(tcodes[i], countDownLatch, map, template));
                }
                countDownLatch.await();
                long end = System.currentTimeMillis();
                System.out.println("cost" + (end - start));
                logger.info("five minute task end");
                Thread.sleep(30*1000);

                logger.info("calculate harate start");

                try{
                    Date hbegin = simpleDateFormat.parse(ds.split(" ")[0] + " 09:29:30");
                    Date hend = simpleDateFormat.parse(ds.split(" ")[0] + " 09:34:30");
                    Date day = simpleDateFormat.parse(ds.split(" ")[0] + " 09:00:30");
                    Date now = new Date();
                    if(now.after(hbegin) && now.before(hend)){
                    }else {
                        for(String cd : map.keySet()){
                            HashMap params = new HashMap();
                            params.put("day", day);
                            params.put("code", cd);
                            List<Fivem> fivems = template.selectList("mybatis/mapper.FivemMapper.selectTodayLatestTwo", params);
                            if(fivems != null && fivems.size() == 2){
                                Fivem one = fivems.get(0);
                                Fivem two = fivems.get(1);
                                one.setHsrate((one.getCurzs()- two.getCurzs())/(one.getZs()+ 0.99));
                                one.setIncr((one.getCurp()-two.getCurp())/one.getLastp());
                                template.update("mybatis/mapper.FivemMapper.updateByPrimaryKey", one);
                            }else {
                                logger.error("get latest two fivem of code " + cd + " failed");
                            }
                        }
                    }

                    logger.info("calculate hsrate end");
                    Thread.sleep(30*1000);
                }catch (Exception e){
                    logger.error("catch Exception:", e);
                }
            }
        }catch (Exception e){
            logger.error("catch exception ", e);
        }
    }

    static class TestClass implements Runnable{

        private List<String> codes;
        private CountDownLatch latch;
        private Map<String,Content> contentMap;
        private SqlSessionTemplate template;

        TestClass(List<String> code, CountDownLatch latch, Map<String,Content> contentMap, SqlSessionTemplate template){
            this.codes = code;
            this.latch = latch;
            this.contentMap = contentMap;
            this.template = template;
        }
        @Override
        public void run() {
            long  total =0;
            Logger logger = Logger.getLogger(TestClass.class);
            for(String s : codes){
                try{
                    String [] params = DataUtil.getCurScData(s);
                    if(params == null || params.length == 0){
                        continue;
                    }

                    Fivem fivem = new Fivem();
                    fivem.setCode(s);
                    fivem.setZs(contentMap.get(s).getZs());
                    fivem.setDay(new Date());

                    fivem.setLastp(Double.valueOf(params[2]));
                    fivem.setCurp(Double.valueOf(params[3]));


                    fivem.setHighp(Double.valueOf(params[4]));
                    fivem.setLowp(Double.valueOf(params[5]));
                    fivem.setStartp(Double.valueOf(params[1]));
                    fivem.setCurbuyp(Double.valueOf(params[6]));
                    fivem.setCurslp(Double.valueOf(params[7]));
                    fivem.setCurzs(Long.parseLong(params[8]));
                    fivem.setCuramount(Double.valueOf(params[9]));
                    fivem.setByonesh(Long.parseLong(params[10]));
                    fivem.setByonep(Double.parseDouble(params[11]));
                    fivem.setBytwosh(Long.parseLong(params[12]));
                    fivem.setBytwop(Double.parseDouble(params[13]));
                    fivem.setBythreesh(Long.parseLong(params[14]));
                    fivem.setBythreep(Double.parseDouble(params[15]));
                    fivem.setByfoursh(Long.parseLong(params[16]));
                    fivem.setByfourp(Double.parseDouble(params[17]));
                    fivem.setByfivesh(Long.parseLong(params[18]));
                    fivem.setByfivep(Double.parseDouble(params[19]));

                    fivem.setSlonesh(Long.parseLong(params[20]));
                    fivem.setSlonep(Double.parseDouble(params[21]));
                    fivem.setSltwosh(Long.parseLong(params[22]));
                    fivem.setSltwop(Double.parseDouble(params[23]));
                    fivem.setSlthreesh(Long.parseLong(params[24]));
                    fivem.setSlthreep(Double.parseDouble(params[25]));
                    fivem.setSlfoursh(Long.parseLong(params[26]));
                    fivem.setSlfourp(Double.parseDouble(params[27]));
                    fivem.setSlfivesh(Long.parseLong(params[28]));
                    fivem.setSlfivep(Double.parseDouble(params[29]));

                    if(fivem.getCurp()!=null && fivem.getLastp()!=null && fivem.getLastp()>0){
                        double rate = (fivem.getCurp()-fivem.getLastp())/fivem.getLastp();
                        fivem.setRate(rate);
                    }

                    if(StringUtils.equals(params[4], "0.00")){
                        fivem.setHang(true);
                    }else {
                        fivem.setHang(false);
                    }

                    template.insert("mybatis/mapper.FivemMapper.insert", fivem);
                }catch (Exception e){
                    logger.error("catch Exception:", e);
                }
            }

            logger.info("thread:" + Thread.currentThread().getName() + ",time:" + System.currentTimeMillis());
            latch.countDown();
        }
    }

}
