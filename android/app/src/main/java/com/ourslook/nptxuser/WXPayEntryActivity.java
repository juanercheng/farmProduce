package com.ourslook.nptxuser;

import android.app.Activity;
import android.os.Bundle;

import com.theweflex.react.WeChatModule;

/**
 * Created by chengjuan 18-1-11
 */

public class WXPayEntryActivity extends Activity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        WeChatModule.handleIntent(getIntent());
        finish();
    }
}