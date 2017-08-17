package com.awesomeproject.callbackdemo;

import android.os.Bundle;
import android.support.annotation.Nullable;
import android.view.View;
import android.widget.Toast;

import com.awesomeproject.R;
import com.facebook.react.ReactActivity;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

/**
 * Created by LXH on 17/8/17.
 */

public class CallbackActivity extends ReactActivity {

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.callbacklayout);

        String data = getIntent().getStringExtra("data");
        Toast.makeText(getApplicationContext(), data + "", Toast.LENGTH_LONG).show();

        findViewById(R.id.nativeCallJs).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                WritableMap params = Arguments.createMap();
                params.putString("key","lxh");
                sendEvent(getReactInstanceManager().getCurrentReactContext(), "eventName", params);
            }
        });


    }

    private void sendEvent(ReactContext reactContext, String eventName, @Nullable WritableMap params) {

        reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, params);
    }


}
