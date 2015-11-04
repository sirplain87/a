package com.springapp.mvc;

import java.util.List;

/**
 * Created by yanzhao on 15/8/4.
 */
public class Content {
    private long zs;
    private String code;
    private int curId;

    private List<MyListElem> elemList;

    public long getZs() {
        return zs;
    }

    public void setZs(long zs) {
        this.zs = zs;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public int getCurId() {
        return curId;
    }

    public void setCurId(int curId) {
        this.curId = curId;
    }

    public List<MyListElem> getElemList() {
        return elemList;
    }

    public void setElemList(List<MyListElem> elemList) {
        this.elemList = elemList;
    }
}
