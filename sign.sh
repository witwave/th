# keytool -genkey -alias android.keystore -keyalg RSA -validity 20000 -keystore android.keystore 
ionic build --release
cp platforms/android/ant-build/CordovaApp-release-unsigned.apk CordovaApp-release-unsigned.apk
/usr/lib/jvm/jdk1.6.0_45/bin/jarsigner -verbose -keystore android.keystore -signedjar tianhe.apk  CordovaApp-release-unsigned.apk android.keystore
rm -rf CordovaApp-release-unsigned.apk