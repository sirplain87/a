package com.springapp.utils;

import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPool;
import redis.clients.jedis.JedisPoolConfig;

/**
 * Created by yanzhao on 15/8/3.
 */
public class JedisUtil {
    private static JedisPool jedisPool;

    private static final int MAX_CONNECTION = 2000;

    private static final String HOST = "127.0.0.1";

    private static final int PORT = 6379;
    static {
        JedisPoolConfig config = new JedisPoolConfig();
        config.setBlockWhenExhausted(true);
        config.setMaxTotal(MAX_CONNECTION);

        jedisPool = new JedisPool(config, HOST, PORT);
    }

    public static String get(String key){
        Jedis jedis = jedisPool.getResource();

        String value = jedis.get(key);
        return value;
    }

    public static void set(String key, String value){
        Jedis jedis = jedisPool.getResource();
        jedis.set(key, value);
    }

}
