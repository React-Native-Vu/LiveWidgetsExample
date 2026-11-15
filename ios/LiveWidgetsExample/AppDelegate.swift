import UIKit
import React
import React_RCTAppDelegate
import ReactAppDependencyProvider

@main
class AppDelegate: UIResponder, UIApplicationDelegate {
  var window: UIWindow?

  var reactNativeDelegate: ReactNativeDelegate?
  var reactNativeFactory: RCTReactNativeFactory?

  func application(
    _ application: UIApplication,
    didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]? = nil
  ) -> Bool {
    let delegate = ReactNativeDelegate()
    let factory = RCTReactNativeFactory(delegate: delegate)
    delegate.dependencyProvider = RCTAppDependencyProvider()

    reactNativeDelegate = delegate
    reactNativeFactory = factory

    // Đăng ký nhận APNs Device Token ngay khi khởi chạy ứng dụng
    application.registerForRemoteNotifications()

    // SDK iOS 27 (Xcode 27) bắt buộc dùng UIScene lifecycle (SceneDelegate)
    // để tránh crash `_UIApplicationEvaluateRuntimeIssueForNoSceneLifecycleAdoption`
    return true
  }

  // MARK: - APNs Device Token Callbacks
  func application(
    _ application: UIApplication,
    didRegisterForRemoteNotificationsWithDeviceToken deviceToken: Data
  ) {
    let tokenHex = deviceToken.map { String(format: "%02x", $0) }.joined()
    NotificationCenter.default.post(
      name: Notification.Name("RNLiveWidgetsDidRegisterDeviceToken"),
      object: nil,
      userInfo: ["token": tokenHex]
    )
  }

  func application(
    _ application: UIApplication,
    didFailToRegisterForRemoteNotificationsWithError error: Error
  ) {
    NotificationCenter.default.post(
      name: Notification.Name("RNLiveWidgetsDidFailRegisterDeviceToken"),
      object: nil,
      userInfo: ["error": error.localizedDescription]
    )
  }

  /// SceneDelegate gọi khi scene chính kết nối: tạo window trên scene và khởi chạy React Native.
  func startReactNative(in windowScene: UIWindowScene, launchOptions: [UIApplication.LaunchOptionsKey: Any]?) {
    guard window == nil, let factory = reactNativeFactory else { return }
    let window = UIWindow(windowScene: windowScene)
    self.window = window

    factory.startReactNative(
      withModuleName: "LiveWidgetsExample",
      in: window,
      launchOptions: launchOptions
    )
  }

  // MARK: - UIScene Lifecycle (iOS 27 Ready)
  func application(
    _ application: UIApplication,
    configurationForConnecting connectingSceneSession: UISceneSession,
    options: UIScene.ConnectionOptions
  ) -> UISceneConfiguration {
    let config = UISceneConfiguration(name: "Default Configuration", sessionRole: connectingSceneSession.role)
    config.delegateClass = SceneDelegate.self
    return config
  }
}

// MARK: - SceneDelegate (Bắt buộc cho SDK iOS 27+)
class SceneDelegate: UIResponder, UIWindowSceneDelegate {
  var window: UIWindow?

  func scene(
    _ scene: UIScene,
    willConnectTo session: UISceneSession,
    options connectionOptions: UIScene.ConnectionOptions
  ) {
    guard let windowScene = scene as? UIWindowScene,
          let appDelegate = UIApplication.shared.delegate as? AppDelegate else { return }

    appDelegate.startReactNative(in: windowScene, launchOptions: nil)
    window = appDelegate.window
  }
}

// MARK: - React Native Factory Delegate
class ReactNativeDelegate: RCTDefaultReactNativeFactoryDelegate {
  override func sourceURL(for bridge: RCTBridge) -> URL? {
    self.bundleURL()
  }

  override func bundleURL() -> URL? {
#if DEBUG
    RCTBundleURLProvider.sharedSettings().jsBundleURL(forBundleRoot: "index")
#else
    Bundle.main.url(forResource: "main", withExtension: "jsbundle")
#endif
  }
}

