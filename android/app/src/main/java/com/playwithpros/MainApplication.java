package com.playwithpros;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.hauvo.compress.RNCompressPackage;
import com.reactlibrary.RNVideoEditorPackage;
import com.rnfs.RNFSPackage;
import com.lwansbrough.RCTCamera.RCTCameraPackage;
import com.greatdroid.reactnative.media.MediaKitPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new RNCompressPackage(),
            new RNVideoEditorPackage(),
            new RNFSPackage(),
            new RCTCameraPackage(),
            new MediaKitPackage()
      );
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
  }
}
