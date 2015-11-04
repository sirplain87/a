package com.springapp.mvc;

import com.alibaba.fastjson.JSON;
import com.springapp.model.database.Basedata;
import com.springapp.utils.HttpClientUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.stereotype.Component;

import java.io.*;
import java.util.List;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Created by yanzhao on 15/8/3.
 */
@Component
public class BasicData implements ApplicationContextAware{

    private ApplicationContext applicationContext;

    private ExecutorService executorService = Executors.newCachedThreadPool();

    public void execute(){

        Logger logger = Logger.getLogger(Basedata.class);
        SqlSessionTemplate template = applicationContext.getBean("sqlSessionTemplate", SqlSessionTemplate.class);
        List<Basedata> basedatas = template.selectList("mybatis/mapper.BasedataMapper.selectAll");

        for(Basedata basedata : basedatas) {

            String response = null;
            int retry = 0;
            do{
                try{
                    if(retry++>3){
                        break;
                    }
                    response = HttpClientUtils.doGetGB(basedata.getLink(), null);
                }catch (Exception e){
                    System.out.println("exception");
                }
            }while (response == null);

            if(StringUtils.isBlank(response)){
                logger.info(basedata.getCode() + " response is null");
                continue;
            }


            //matcher1.group(1)

            Document document = Jsoup.parse(response);
            Element element = document.getElementById("rtp2");
            org.jsoup.nodes.Node element1 = element.childNode(1).childNode(15).childNode(1);
            String title = element1.attr("title");
            Pattern number = Pattern.compile("\\d+(\\.\\d+)?");
            String [] gb = number.split(title);
            Matcher matcher2 = number.matcher(title);
            Long total = null;
            if(matcher2.find()){
                if(StringUtils.equals(title, "0.000")){
                    logger.info(basedata.getCode() + " title is :" + title);
                    continue;
                }
                String tt = null;
                Float f = Float.parseFloat(matcher2.group(0));
                if(StringUtils.equals(gb[1], "万")){
                    tt = matcher2.group(0) + "万";
                    total = new Float(f * 10000.00).longValue();
                }else if(StringUtils.equals(gb[1], "亿")){
                    tt = matcher2.group(0) + "亿";
                    total = new Float(f*100000000.00).longValue();
                }
                String before = JSON.toJSONString(basedata);
//                logger.info("before:" + JSON.toJSONString(basedata));
                if(!total.equals(basedata.getZs())){
                    basedata.setZs(total);
                    basedata.setZsabbre(tt);
                    template.update("mybatis/mapper.BasedataMapper.updateByPrimaryKey", basedata);
                    logger.info(before+ "||" + JSON.toJSONString(basedata));
                }
            }

        }

        logger.info("update basic data end !!!!!");


    }


    public static void main(String [] args)throws Exception{
        Pattern pattern1 = Pattern.compile("href=\"(.+?)\">(.+?)</");
        Pattern pattern2 = Pattern.compile("[0|6][0-9]{5}");
        FileInputStream stream = new FileInputStream(new File("/Users/yanzhao/Desktop/code.html"));
        InputStreamReader reader = new InputStreamReader(stream);
        BufferedReader bufferedReader = new BufferedReader(reader);
        String line = null;

        FileOutputStream outputStream = new FileOutputStream(new File("/Users/yanzhao/Desktop/gg.html"));
        OutputStreamWriter outputStreamWriter = new OutputStreamWriter(outputStream, "utf-8");
        BufferedWriter bufferedWriter = new BufferedWriter(outputStreamWriter);


        while ((line = bufferedReader.readLine()) != null){
            if(StringUtils.isBlank(line)){
                continue;
            }

            try{
                Matcher matcher = pattern1.matcher(line);
                if(matcher.find()){
                    String url = matcher.group(1);
                    String name = matcher.group(2);
                    Matcher matcher1 = pattern2.matcher(name);
                    if(matcher1.find()){
                        String response = null;
                        int retry = 0;
                        do{
                            try{
                                if(retry++>3){
                                    break;
                                }
                                response = HttpClientUtils.doGetGB(url, null);
                            }catch (Exception e){
                                System.out.println("exception");
                            }
                        }while (response == null);


                        //matcher1.group(1)

                        Document document = Jsoup.parse(response);
                        Element element = document.getElementById("rtp2");
                        org.jsoup.nodes.Node element1 = element.childNode(1).childNode(15).childNode(1);
                        System.out.println(element1.attr("title"));
                        String title = element1.attr("title");
                        Pattern number = Pattern.compile("\\d+(\\.\\d+)?");
                        String [] gb = number.split(title);
                        Matcher matcher2 = number.matcher(title);
                        Long total = null;
                        if(matcher2.find()){
                            if(StringUtils.equals(title, "0.000")){
                                continue;
                            }
                            String tt = null;
                            System.out.println(url + " " + name + " " + matcher1.group(0) + " " + title);
                            Float f = Float.parseFloat(matcher2.group(0));
                            System.out.println(gb[1]);
                            if(StringUtils.equals(gb[1], "万")){
                                tt = matcher2.group(0) + "万";
                                total = new Float(f * 10000.00).longValue();
                            }else if(StringUtils.equals(gb[1], "亿")){
                                tt = matcher2.group(0) + "亿";
                                total = new Float(f*100000000.00).longValue();
                            }
                            StringBuffer buffer = new StringBuffer();
                            buffer.append(url).append(" ").append(name).append(" ").append(matcher1.group(0)).append(" ").append(tt).append(" ").append(String.valueOf(total)).append("\n");
                            bufferedWriter.write(buffer.toString());
                            System.out.println(buffer.toString());
                        }
                    }
                }
            }catch (Exception e){
                System.out.println("catch Exception: " + line);
                e.printStackTrace();
            }
        }

        outputStream.flush();
        outputStream.close();
    }

    @Override
    public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
        this.applicationContext = applicationContext;
    }
}
