package com.springapp.mvc;

/**
 * Created by yanzhao on 15/6/17.
 */
public enum TestEnum {
    TESTONE("testone"),
    TESTTWO("testtwo");
    private String value;
    TestEnum(String v) {this.value = v;}
    public String getValue(){
        return value;
    }
}
