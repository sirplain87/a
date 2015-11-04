package com.springapp.mvc;

import org.springframework.context.support.ClassPathXmlApplicationContext;

/**
 * Created by yanzhao on 15/8/12.
 */
public class StartMain {
    public static void main(String [] args){
        ClassPathXmlApplicationContext applicationContext = new ClassPathXmlApplicationContext("classpath:ApplicationContext.xml");
    }
}
