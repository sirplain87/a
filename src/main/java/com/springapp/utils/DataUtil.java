package com.springapp.utils;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Created by yanzhao on 15/8/11.
 */
public class DataUtil {

    public static String [] getCurScData(String cd){
        String urlsh = "http://hq.sinajs.cn/list=sh";
        String urlsz = "http://hq.sinajs.cn/list=sz";

        String requestUrl = (cd.startsWith("0")? urlsz:urlsh) + cd;

        String response = null;
        int retry = 0;
        do{
            try{
                if(retry++>3){
                    break;
                }
                response = HttpClientUtils.doGet(requestUrl, null);
            }catch (Exception e){
                System.out.println("exception");
            }
        }while (response == null);

        Pattern p = Pattern.compile("\"(.+?)\"");
        Matcher matcher = p.matcher(response);
        String [] params ;
        if(matcher.find()) {
            params = matcher.group(1).split(",");
            return params;
        }else {
            return null;
        }
    }
}
