if(NOT TARGET hermes-engine::libhermes)
add_library(hermes-engine::libhermes SHARED IMPORTED)
set_target_properties(hermes-engine::libhermes PROPERTIES
    IMPORTED_LOCATION "/Users/tt/.gradle/caches/8.11.1/transforms/ff0c61f300c488d380974fb7e40836e0/transformed/jetified-hermes-android-0.80.3-debug/prefab/modules/libhermes/libs/android.armeabi-v7a/libhermes.so"
    INTERFACE_INCLUDE_DIRECTORIES "/Users/tt/.gradle/caches/8.11.1/transforms/ff0c61f300c488d380974fb7e40836e0/transformed/jetified-hermes-android-0.80.3-debug/prefab/modules/libhermes/include"
    INTERFACE_LINK_LIBRARIES ""
)
endif()

