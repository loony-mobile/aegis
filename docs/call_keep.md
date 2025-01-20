React Native CallKeep is a library used to handle call-related actions in React Native applications by integrating with native phone call functionality on iOS and Android. It is typically used for implementing VoIP functionality. Below is a guide on how to set it up and use it effectively:

---

### **Installation**

1. Install the library:

   ```bash
   npm install react-native-callkeep
   ```

   Or using Yarn:

   ```bash
   yarn add react-native-callkeep
   ```

2. Link the package:

   - For React Native 0.60+, it uses auto-linking.
   - For older versions, you need to link it manually:
     ```bash
     react-native link react-native-callkeep
     ```

3. Add required permissions and configurations for each platform.

---

### **Platform-Specific Setup**

#### iOS

1. Modify your `Info.plist` file:

   ```xml
   <key>NSBluetoothPeripheralUsageDescription</key>
   <string>We need Bluetooth access to connect to audio devices.</string>
   <key>UIBackgroundModes</key>
   <array>
       <string>audio</string>
       <string>voip</string>
   </array>
   ```

2. Enable VoIP capability:

   - Open your project in Xcode.
   - Go to **Signing & Capabilities**.
   - Add the **VoIP** capability.

3. Add push notification handling for VoIP notifications if required.

---

#### Android

1. Modify `AndroidManifest.xml`:

   ```xml
   <uses-permission android:name="android.permission.SYSTEM_ALERT_WINDOW" />
   <uses-permission android:name="android.permission.BLUETOOTH" />
   ```

2. Register the CallKeep module in your `MainApplication.java`:

   ```java
   import io.wazo.callkeep.RNCallKeepPackage;
   ```

3. Set up Foreground Service to handle calls.

---

### **Basic Usage**

1. **Initialize CallKeep**
   Import and configure CallKeep:

   ```javascript
   import RNCallKeep from 'react-native-callkeep';

   const options = {
     ios: {
       appName: 'YourAppName',
     },
     android: {
       alertTitle: 'Permissions required',
       alertDescription: 'This application needs to access your phone accounts',
       cancelButton: 'Cancel',
       okButton: 'OK',
       additionalPermissions: [],
       selfManaged: false, // Set true if using self-managed calls
     },
   };

   RNCallKeep.setup(options)
     .then(() => console.log('CallKeep initialized'))
     .catch(err => console.error('CallKeep setup error:', err));
   ```

2. **Display Incoming Call**
   Use the `displayIncomingCall` method:

   ```javascript
   RNCallKeep.displayIncomingCall(
     'uuid', // Unique identifier for the call
     'callerId', // Caller ID or number
     'Caller Name', // Display name
     'numberType', // Type (e.g., mobile)
     true, // Indicates whether it's a video call
   );
   ```

3. **Start a Call**
   To start an outgoing call:

   ```javascript
   RNCallKeep.startCall('uuid', 'callerId', 'Caller Name');
   ```

4. **End a Call**
   Use the `endCall` method:

   ```javascript
   RNCallKeep.endCall('uuid');
   ```

5. **Handle Events**
   Listen to CallKeep events:

   ```javascript
   import {DeviceEventEmitter} from 'react-native';

   DeviceEventEmitter.addListener(
     'RNCallKeepDidReceiveStartCallAction',
     data => {
       console.log('Start call:', data);
     },
   );

   DeviceEventEmitter.addListener('RNCallKeepPerformAnswerCallAction', data => {
     console.log('Answer call:', data);
   });

   DeviceEventEmitter.addListener('RNCallKeepPerformEndCallAction', data => {
     console.log('End call:', data);
   });
   ```

---

### **Debugging Tips**

- Use logs to debug setup issues, especially for native configurations.
- Ensure VoIP permissions are correctly configured in `Info.plist` and `AndroidManifest.xml`.
- Test on physical devices as call-related functionalities often don’t work well on emulators.

---

This setup should get you started with **react-native-callkeep**. Adjust based on your VoIP server implementation and call logic requirements.
