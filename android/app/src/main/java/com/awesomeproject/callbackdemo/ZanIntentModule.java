package com.awesomeproject.callbackdemo;

import android.app.Activity;
import android.content.Intent;
import android.text.TextUtils;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.JSApplicationIllegalArgumentException;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by LXH on 17/8/17.
 */

public class ZanIntentModule extends ReactContextBaseJavaModule {

    public ZanIntentModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "ZanIntentModule";
    }

    @Override
    public Map<String, Object> getConstants() {
        final Map<String, Object> constants = new HashMap<>();
        return constants;
    }

    /**
     * js call native to start activity
     *
     * @param toActivityName
     * @param map
     */
    @ReactMethod
    public void startActivity(String toActivityName, ReadableMap map) {
        try {
            Activity currentActivity = getCurrentActivity();
            if (currentActivity != null) {
                Class toActivity = Class.forName(toActivityName);
                Intent intent = new Intent(currentActivity, toActivity);
                intent.putExtra("data", map.toString());
                currentActivity.startActivity(intent);
            }
        } catch (Exception e) {
            throw new JSApplicationIllegalArgumentException(
                    "Could not open Activity : " + e.getMessage());
        }
    }

    @ReactMethod
    public void login(String name, String password, Callback success, Callback failure) {
        try {
            if (TextUtils.isEmpty(name)) {
                failure.invoke("name is empty");
                return;
            }
            if (TextUtils.isEmpty(password)) {
                failure.invoke("password is empty");
                return;
            }
            if (name.equals("lxh") && password.equals("123123")) {
                success.invoke(name);
            } else {
                failure.invoke("login failure-----正确账号为：'lxh','123123'");
            }
        } catch (Exception e) {
            e.printStackTrace();
            failure.invoke(e.getMessage());
        }
    }

    @ReactMethod
    public void login2(String name, String password, Promise promise) {
        try {
            if (TextUtils.isEmpty(name)) {
                promise.reject("-1", "name is empty");
                return;
            }
            if (TextUtils.isEmpty(password)) {
                promise.reject("-2", "password is empty");
                return;
            }
            if (name.equals("lxh") && password.equals("123123")) {
                WritableMap map = Arguments.createMap();
                map.putString("name", name);
                promise.resolve(map);
            } else {
                promise.reject("-3", "login failure");
            }
        } catch (Exception e) {
            e.printStackTrace();
            promise.reject(e);
        }
    }


}
