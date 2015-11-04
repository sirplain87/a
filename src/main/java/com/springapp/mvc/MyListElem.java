package com.springapp.mvc;

import java.util.Date;

/**
 * Created by yanzhao on 15/8/4.
 */
public class MyListElem {
    private int index;
    private Date date;
    private long curTt;
    private Double curR;
    private Double prevp;
    private Double totalr;
    private Double curp;

    public int getIndex() {
        return index;
    }

    public void setIndex(int index) {
        this.index = index;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public long getCurTt() {
        return curTt;
    }

    public void setCurTt(long curTt) {
        this.curTt = curTt;
    }

    public Double getCurR() {
        return curR;
    }

    public void setCurR(Double curR) {
        this.curR = curR;
    }

    public Double getPrevp() {
        return prevp;
    }

    public void setPrevp(Double prevp) {
        this.prevp = prevp;
    }

    public Double getTotalr() {
        return totalr;
    }

    public void setTotalr(Double totalr) {
        this.totalr = totalr;
    }

    public Double getCurp() {
        return curp;
    }

    public void setCurp(Double curp) {
        this.curp = curp;
    }
}
