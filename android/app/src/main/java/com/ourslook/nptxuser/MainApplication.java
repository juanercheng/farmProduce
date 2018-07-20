package com.ourslook.nptxuser;

import android.app.Application;
import cn.jpush.reactnativejpush.JPushPackage;
import com.facebook.react.ReactApplication;
import org.reactnative.camera.RNCameraPackage;
import com.beefe.picker.PickerViewPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.imagepicker.ImagePickerPackage;
import org.lovebing.reactnative.baidumap.BaiduMapPackage;

import com.umeng.commonsdk.UMConfigure;
import com.ourslook.nptxuser.DplusReactPackage;
import com.ourslook.nptxuser.RNUMConfigure;

import java.util.Arrays;
import java.util.List;

import com.facebook.react.ReactActivity;
//import com.umeng.analytics.MobclickAgent;
//import com.umeng.analytics.MobclickAgent.EScenarioType;
import com.ourslook.nptxuser.AlipayPackage;
import com.theweflex.react.WeChatPackage;

public class MainApplication extends Application implements ReactApplication {

    // 设置为 true 将不会弹出 toast
    private boolean SHUTDOWN_TOAST = false;
    // 设置为 true 将不会打印 log
    private boolean SHUTDOWN_LOG = false;

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new RNCameraPackage(),
            new PickerViewPackage()
          ,new ImagePickerPackage(),
           new JPushPackage(SHUTDOWN_TOAST, SHUTDOWN_LOG),
           new DplusReactPackage()  //友盟统计
          ,new AlipayPackage()
          ,new WeChatPackage()
          , new BaiduMapPackage(getApplicationContext())
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
    RNUMConfigure.init(this, "5ac46f898f4a9d6a010001f3", "Umeng", UMConfigure.DEVICE_TYPE_PHONE,
            "");
//    MobclickAgent.setSessionContinueMillis(1000);
//    MobclickAgent.setScenarioType(this, EScenarioType.E_DUM_NORMAL);
  }
//
//  public void onResume() {
//    super.onResume();
//    MobclickAgent.onResume(this);
//  }
//  protected void onPause() {
//    super.onPause();
//    MobclickAgent.onPause(this);
//  }
}
