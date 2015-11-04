package com.springapp.mvc;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

/**
 * Created by yanzhao on 15/10/8.
 */
public class Ptask implements ApplicationContextAware{

    private ApplicationContext applicationContext;

    @Override
    public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
        this.applicationContext = applicationContext;
    }

    public void execute(){
        SqlSessionTemplate sqlSession = (SqlSessionTemplate)applicationContext.getBean("sqlSessionTemplate");
        final List<BasicData> basicDataList = sqlSession.selectList("mybatis/mapper.BasedataMapper.selectAll");

        ExecutorService executorService = Executors.newFixedThreadPool(10);

        List<String []> strings = new ArrayList<String[]>();
        int len = basicDataList.size()/10;
        for(int i=0;i<10;i++){
            final List<BasicData> basicDatas = basicDataList.subList(i*len, i==9?(i+1)*len:basicDataList.size());
            executorService.execute(new Runnable() {
                @Override
                public void run() {
                    for(int j=0;j<basicDatas.size();j++){

                    }
                }
            });
        }
    }


}
