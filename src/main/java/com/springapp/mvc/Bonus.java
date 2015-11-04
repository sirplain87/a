package com.springapp.mvc;

import com.alibaba.fastjson.JSON;
import com.springapp.model.database.Basedata;
import com.springapp.model.database.Candidate;
import com.springapp.model.database.Hsrate;
import com.springapp.model.database.Price;
import com.springapp.utils.DataUtil;
import org.apache.log4j.Logger;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.*;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

/**
 * Created by yanzhao on 15/8/3.
 */
@Service
public class Bonus implements ApplicationContextAware {

    private static ExecutorService executorService = Executors.newCachedThreadPool();

    private ApplicationContext context;


    public void getBonus() throws Exception{

        SqlSessionTemplate template = context.getBean("sqlSessionTemplate", SqlSessionTemplate.class);

        List<Basedata> basedatas = template.selectList("mybatis/mapper.BasedataMapper.selectAll");

        Logger logger = Logger.getLogger(Bonus.class);
        logger.info("get bonus start!!!");

        String line = null;
        Map<String,Content> map = new HashMap<String, Content>();
        List<String> [] tcodes  = new List [10];
        for(Basedata bd : basedatas){
            Content c = new Content();
            c.setCode(bd.getCode());
            c.setCurId(0);
            c.setZs(bd.getZs());
            List<MyListElem> mles = new ArrayList<MyListElem>();
            c.setElemList(mles);
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
        while (true){
            Calendar cal = Calendar.getInstance();
            int minute = cal.get(Calendar.MINUTE);

            while (minute%5 != 0){
                cal = Calendar.getInstance();
                minute = cal.get(Calendar.MINUTE);
            }


            CountDownLatch countDownLatch = new CountDownLatch(10);
            long start = System.currentTimeMillis();
            for(int i=0;i<10;i++){
                executorService.execute(new TestClass(tcodes[i], countDownLatch, map, template));
            }
            countDownLatch.await();
            long end = System.currentTimeMillis();
            System.out.println("cost" + (end - start));
            for(String cd : map.keySet()){
                Content content = map.get(cd);
                int id = content.getCurId();
                if(id == 0){//跳过第一个没有意义的
                    continue;
                }
                List<MyListElem> myListElems = content.getElemList();
                if(myListElems.size()>0){
                    MyListElem myListElem = myListElems.get(id);
                    if(myListElem != null){
                        Hsrate hsrate1 = new Hsrate();
                        hsrate1.setRate(myListElem.getCurR());
                        hsrate1.setCode(cd);
                        hsrate1.setDate(myListElem.getDate());
                        hsrate1.setCurs(myListElem.getCurTt());
                        hsrate1.setPrevp(myListElem.getPrevp());
                        hsrate1.setTotalr(myListElem.getTotalr());
                        hsrate1.setCurp(myListElem.getCurp());
                        template.insert("mybatis/mapper.HsrateMapper.insert", hsrate1);
                    }
                }

            }
            logger.info("okkkkkkkkkkkkkkkkkkkkk");
            Thread.sleep(1*60*1000);
        }
    }

    @Override
    public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
        this.context = applicationContext;
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
                String [] params = DataUtil.getCurScData(s);
                if(params == null || params.length == 0){
                    continue;
                }


                Content c = contentMap.get(s);
                MyListElem elem = null;
                List<MyListElem> mle = c.getElemList();
                long prev;
                if(mle.size() == 0){
                    SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
                    String dts = df.format(new Date());
                    String [] ts = dts.split(" ");
                    String time = ts[0] + " 00:00:00";
                    Date date = new Date();
                    try{
                        date = df.parse(time);
                    }catch (Exception e){
                        System.out.println("解析日期出现异常");
                    }
                    //查找最新的记录的
                    Map<String,Object> map = new HashMap<String, Object>();
                    map.put("date", date);
                    map.put("code", s);
                    System.out.print(JSON.toJSONString(map));
                    Hsrate hsrate = template.selectOne("mybatis/mapper.HsrateMapper.selectTodayLatest", map);
                    if(hsrate == null){
                        elem = new MyListElem();
                        c.getElemList().add(elem);
                        elem.setCurR(0d);
                        elem.setCurTt(total);
                        elem.setDate(new Date());
                        elem.setIndex(0);
                        c.setCurId(0);
                    }else {
                        elem = new MyListElem();
                        c.getElemList().add(elem);
                        elem.setCurR(0d);
                        elem.setCurTt(hsrate.getCurs());
                        elem.setDate(new Date());
                        elem.setIndex(0);
                        c.setCurId(0);
                    }

                }else {
                    elem = c.getElemList().get(c.getCurId());
                    prev = elem.getCurTt();
                    total = Long.parseLong(params[8]);
                    Double prevp = Double.parseDouble(params[2]);
                    Double curp = Double.parseDouble(params[3]);
                    Double start = Double.parseDouble(params[1]);
                    //计算hs率
                    double hs = (total-prev)*100.00/c.getZs();//todo
                    double totalr = total*100/c.getZs();
                    Date dt = new Date();
                    SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
                    if(hs >= 1){
                        logger.info("warn:" + s + "," + hs + " " + simpleDateFormat.format(dt));//codemap
                    }

                    MyListElem nw = new MyListElem();
                    nw.setCurR(hs);
                    nw.setIndex(elem.getIndex() + 1);
                    nw.setDate(new Date());
                    nw.setCurTt(total);
                    nw.setPrevp(prevp);
                    nw.setTotalr(totalr);
                    nw.setCurp(curp);
                    c.getElemList().add(nw);
                    c.setCurId(elem.getIndex() + 1);

                    double decrate = (curp-prevp)/prev;

                    if(curp<start && decrate<-0.03 && decrate>-0.08){
                        try{
                            String dts = simpleDateFormat.format(dt);
                            Date begin = simpleDateFormat.parse(dts.split(" ")[0] + " 14:53:50");

                            Date end = simpleDateFormat.parse(dts.split(" ")[0] + " 14:57:50");

                            String code = c.getCode();
                            if(dt.after(begin) && end.after(dt)){
                                Price price = template.selectOne("mybatis/mapper.PriceMapper.selectLatestOne", code);
                                if(price!=null &&!price.getHang() && price.getStartp()>price.getEnd() && price.getZs()<total){
                                    Candidate candidate = new Candidate();
                                    candidate.setCode(code);
                                    candidate.setDay(new Date());
                                    candidate.setEndp(curp);
                                    double decrease = (curp-prevp)/prevp;
                                    double percent = total/price.getZs();
                                    candidate.setDecrease(decrease);
                                    candidate.setRate(percent);
                                    candidate.setZs(total);
                                    candidate.setPrevs(price.getZs());
                                    candidate.setPercent(percent);
                                    template.insert("mybatis/mapper.CandidateMapper.insert",candidate);
                                }
                            }
                        }catch (Exception e){
                            logger.warn("get candidate catch exception:", e);
                        }

                    }


                }

            }

            logger.info("thread:" + Thread.currentThread().getName() + ",time:" + System.currentTimeMillis());
            latch.countDown();
        }
    }

}
