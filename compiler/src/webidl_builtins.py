from processor_base import PrototypeCall, DirectCall, NewCall

webidl_calls = {
    "SecurityPolicyViolationEvent": [
        NewCall(constructor='SecurityPolicyViolationEvent', demands=['str', 'TODO_UNKNOWN_TYPE_SecurityPolicyViolationEventInit'], returns='SecurityPolicyViolationEvent'),
    ],
    "drawarraysinstancedbaseinstancewebgl": [
        PrototypeCall(constructor='WEBGL_draw_instanced_base_vertex_base_instance', fn='drawArraysInstancedBaseInstanceWEBGL', demands=['WEBGL_draw_instanced_base_vertex_base_instance', 'TODO_UNKNOWN_TYPE_GLenum', 'TODO_UNKNOWN_TYPE_GLint', 'TODO_UNKNOWN_TYPE_GLsizei', 'TODO_UNKNOWN_TYPE_GLsizei', 'TODO_UNKNOWN_TYPE_GLuint'], returns='None'),
    ],
    "drawelementsinstancedbasevertexbaseinstancewebgl": [
        PrototypeCall(constructor='WEBGL_draw_instanced_base_vertex_base_instance', fn='drawElementsInstancedBaseVertexBaseInstanceWEBGL', demands=['WEBGL_draw_instanced_base_vertex_base_instance', 'TODO_UNKNOWN_TYPE_GLenum', 'TODO_UNKNOWN_TYPE_GLsizei', 'TODO_UNKNOWN_TYPE_GLenum', 'TODO_UNKNOWN_TYPE_GLintptr', 'TODO_UNKNOWN_TYPE_GLsizei', 'TODO_UNKNOWN_TYPE_GLint', 'TODO_UNKNOWN_TYPE_GLuint'], returns='None'),
    ],
    "IntersectionObserver": [
        NewCall(constructor='IntersectionObserver', demands=['TODO_UNKNOWN_TYPE_IntersectionObserverCallback', 'TODO_UNKNOWN_TYPE_IntersectionObserverInit'], returns='IntersectionObserver'),
    ],
    "observe": [
        PrototypeCall(constructor='IntersectionObserver', fn='observe', demands=['IntersectionObserver', 'Element'], returns='None'),
        PrototypeCall(constructor='PerformanceObserver', fn='observe', demands=['PerformanceObserver', 'TODO_UNKNOWN_TYPE_PerformanceObserverInit'], returns='None'),
        PrototypeCall(constructor='ReportingObserver', fn='observe', demands=['ReportingObserver'], returns='None'),
        PrototypeCall(constructor='MutationObserver', fn='observe', demands=['MutationObserver', 'Node', 'TODO_UNKNOWN_TYPE_MutationObserverInit'], returns='None'),
        PrototypeCall(constructor='PressureObserver', fn='observe', demands=['PressureObserver', 'TODO_UNKNOWN_TYPE_PressureSource', 'TODO_UNKNOWN_TYPE_PressureObserverOptions'], returns='None'),
        PrototypeCall(constructor='ResizeObserver', fn='observe', demands=['ResizeObserver', 'Element', 'TODO_UNKNOWN_TYPE_ResizeObserverOptions'], returns='None'),
    ],
    "unobserve": [
        PrototypeCall(constructor='IntersectionObserver', fn='unobserve', demands=['IntersectionObserver', 'Element'], returns='None'),
        PrototypeCall(constructor='PressureObserver', fn='unobserve', demands=['PressureObserver', 'TODO_UNKNOWN_TYPE_PressureSource'], returns='None'),
        PrototypeCall(constructor='ResizeObserver', fn='unobserve', demands=['ResizeObserver', 'Element'], returns='None'),
    ],
    "disconnect": [
        PrototypeCall(constructor='IntersectionObserver', fn='disconnect', demands=['IntersectionObserver'], returns='None'),
        PrototypeCall(constructor='PerformanceObserver', fn='disconnect', demands=['PerformanceObserver'], returns='None'),
        DirectCall(fn='disconnect', receiver='IdentityCredential', demands=['TODO_UNKNOWN_TYPE_IdentityCredentialDisconnectOptions'], returns='None'),
        PrototypeCall(constructor='ReportingObserver', fn='disconnect', demands=['ReportingObserver'], returns='None'),
        PrototypeCall(constructor='MutationObserver', fn='disconnect', demands=['MutationObserver'], returns='None'),
        PrototypeCall(constructor='BluetoothRemoteGATTServer', fn='disconnect', demands=['BluetoothRemoteGATTServer'], returns='None'),
        PrototypeCall(constructor='PressureObserver', fn='disconnect', demands=['PressureObserver'], returns='None'),
        PrototypeCall(constructor='ResizeObserver', fn='disconnect', demands=['ResizeObserver'], returns='None'),
        PrototypeCall(constructor='AudioNode', fn='disconnect', demands=['AudioNode'], returns='None'),
        PrototypeCall(constructor='AudioNode', fn='disconnect', demands=['AudioNode', 'int'], returns='None'),
        PrototypeCall(constructor='AudioNode', fn='disconnect', demands=['AudioNode', 'TODO_UNKNOWN_TYPE_AudioNode'], returns='None'),
        PrototypeCall(constructor='AudioNode', fn='disconnect', demands=['AudioNode', 'TODO_UNKNOWN_TYPE_AudioNode', 'int'], returns='None'),
        PrototypeCall(constructor='AudioNode', fn='disconnect', demands=['AudioNode', 'TODO_UNKNOWN_TYPE_AudioNode', 'int', 'int'], returns='None'),
        PrototypeCall(constructor='AudioNode', fn='disconnect', demands=['AudioNode', 'TODO_UNKNOWN_TYPE_AudioParam'], returns='None'),
        PrototypeCall(constructor='AudioNode', fn='disconnect', demands=['AudioNode', 'TODO_UNKNOWN_TYPE_AudioParam', 'int'], returns='None'),
    ],
    "takerecords": [
        PrototypeCall(constructor='IntersectionObserver', fn='takeRecords', demands=['IntersectionObserver'], returns='TODO_UNKNOWN_TYPE_IntersectionObserverEntry'),
        PrototypeCall(constructor='PerformanceObserver', fn='takeRecords', demands=['PerformanceObserver'], returns='TODO_UNKNOWN_TYPE_PerformanceEntryList'),
        PrototypeCall(constructor='ReportingObserver', fn='takeRecords', demands=['ReportingObserver'], returns='TODO_UNKNOWN_TYPE_ReportList'),
        PrototypeCall(constructor='MutationObserver', fn='takeRecords', demands=['MutationObserver'], returns='TODO_UNKNOWN_TYPE_MutationRecord'),
        PrototypeCall(constructor='PressureObserver', fn='takeRecords', demands=['PressureObserver'], returns='TODO_UNKNOWN_TYPE_PressureRecord'),
    ],
    "IntersectionObserverEntry": [
        NewCall(constructor='IntersectionObserverEntry', demands=['TODO_UNKNOWN_TYPE_IntersectionObserverEntryInit'], returns='IntersectionObserverEntry'),
    ],
    "getclientextensionresults": [
        PrototypeCall(constructor='PublicKeyCredential', fn='getClientExtensionResults', demands=['PublicKeyCredential'], returns='TODO_UNKNOWN_TYPE_AuthenticationExtensionsClientOutputs'),
    ],
    "isconditionalmediationavailable": [
        DirectCall(fn='isConditionalMediationAvailable', receiver='PublicKeyCredential', demands=[], returns='bool'),
        DirectCall(fn='isConditionalMediationAvailable', receiver='Credential', demands=[], returns='bool'),
    ],
    "tojson": [
        PrototypeCall(constructor='PublicKeyCredential', fn='toJSON', demands=['PublicKeyCredential'], returns='TODO_UNKNOWN_TYPE_PublicKeyCredentialJSON'),
        PrototypeCall(constructor='PerformanceEntry', fn='toJSON', demands=['PerformanceEntry'], returns='TODO_UNKNOWN_TYPE_object'),
        PrototypeCall(constructor='PaymentResponse', fn='toJSON', demands=['PaymentResponse'], returns='TODO_UNKNOWN_TYPE_object'),
        PrototypeCall(constructor='URL', fn='toJSON', demands=['URL'], returns='str'),
        PrototypeCall(constructor='PerformanceResourceTiming', fn='toJSON', demands=['PerformanceResourceTiming'], returns='TODO_UNKNOWN_TYPE_object'),
        PrototypeCall(constructor='MediaDeviceInfo', fn='toJSON', demands=['MediaDeviceInfo'], returns='TODO_UNKNOWN_TYPE_object'),
        PrototypeCall(constructor='RTCSessionDescription', fn='toJSON', demands=['RTCSessionDescription'], returns='TODO_UNKNOWN_TYPE_RTCSessionDescriptionInit'),
        PrototypeCall(constructor='RTCIceCandidate', fn='toJSON', demands=['RTCIceCandidate'], returns='TODO_UNKNOWN_TYPE_RTCIceCandidateInit'),
        PrototypeCall(constructor='PushSubscription', fn='toJSON', demands=['PushSubscription'], returns='TODO_UNKNOWN_TYPE_PushSubscriptionJSON'),
        PrototypeCall(constructor='PerformanceServerTiming', fn='toJSON', demands=['PerformanceServerTiming'], returns='TODO_UNKNOWN_TYPE_object'),
        PrototypeCall(constructor='NotRestoredReasonDetails', fn='toJSON', demands=['NotRestoredReasonDetails'], returns='TODO_UNKNOWN_TYPE_object'),
        PrototypeCall(constructor='NotRestoredReasons', fn='toJSON', demands=['NotRestoredReasons'], returns='TODO_UNKNOWN_TYPE_object'),
        PrototypeCall(constructor='VideoColorSpace', fn='toJSON', demands=['VideoColorSpace'], returns='TODO_UNKNOWN_TYPE_VideoColorSpaceInit'),
        PrototypeCall(constructor='NavigatorUAData', fn='toJSON', demands=['NavigatorUAData'], returns='TODO_UNKNOWN_TYPE_UALowEntropyJSON'),
        PrototypeCall(constructor='DigitalCredential', fn='toJSON', demands=['DigitalCredential'], returns='TODO_UNKNOWN_TYPE_object'),
        PrototypeCall(constructor='PressureRecord', fn='toJSON', demands=['PressureRecord'], returns='TODO_UNKNOWN_TYPE_object'),
        PrototypeCall(constructor='PerformanceLongTaskTiming', fn='toJSON', demands=['PerformanceLongTaskTiming'], returns='TODO_UNKNOWN_TYPE_object'),
        PrototypeCall(constructor='TaskAttributionTiming', fn='toJSON', demands=['TaskAttributionTiming'], returns='TODO_UNKNOWN_TYPE_object'),
        PrototypeCall(constructor='DOMPointReadOnly', fn='toJSON', demands=['DOMPointReadOnly'], returns='TODO_UNKNOWN_TYPE_object'),
        PrototypeCall(constructor='DOMRectReadOnly', fn='toJSON', demands=['DOMRectReadOnly'], returns='TODO_UNKNOWN_TYPE_object'),
        PrototypeCall(constructor='DOMQuad', fn='toJSON', demands=['DOMQuad'], returns='TODO_UNKNOWN_TYPE_object'),
        PrototypeCall(constructor='DOMMatrixReadOnly', fn='toJSON', demands=['DOMMatrixReadOnly'], returns='TODO_UNKNOWN_TYPE_object'),
        PrototypeCall(constructor='PerformanceEventTiming', fn='toJSON', demands=['PerformanceEventTiming'], returns='TODO_UNKNOWN_TYPE_object'),
        PrototypeCall(constructor='TrustedHTML', fn='toJSON', demands=['TrustedHTML'], returns='str'),
        PrototypeCall(constructor='TrustedScript', fn='toJSON', demands=['TrustedScript'], returns='str'),
        PrototypeCall(constructor='TrustedScriptURL', fn='toJSON', demands=['TrustedScriptURL'], returns='str'),
        PrototypeCall(constructor='LargestContentfulPaint', fn='toJSON', demands=['LargestContentfulPaint'], returns='TODO_UNKNOWN_TYPE_object'),
        PrototypeCall(constructor='ContactAddress', fn='toJSON', demands=['ContactAddress'], returns='TODO_UNKNOWN_TYPE_object'),
        PrototypeCall(constructor='Performance', fn='toJSON', demands=['Performance'], returns='TODO_UNKNOWN_TYPE_object'),
        PrototypeCall(constructor='PerformancePaintTiming', fn='toJSON', demands=['PerformancePaintTiming'], returns='TODO_UNKNOWN_TYPE_object'),
        PrototypeCall(constructor='PerformanceLongAnimationFrameTiming', fn='toJSON', demands=['PerformanceLongAnimationFrameTiming'], returns='TODO_UNKNOWN_TYPE_object'),
        PrototypeCall(constructor='PerformanceScriptTiming', fn='toJSON', demands=['PerformanceScriptTiming'], returns='TODO_UNKNOWN_TYPE_object'),
        PrototypeCall(constructor='PerformanceNavigationTiming', fn='toJSON', demands=['PerformanceNavigationTiming'], returns='TODO_UNKNOWN_TYPE_object'),
        PrototypeCall(constructor='PerformanceTiming', fn='toJSON', demands=['PerformanceTiming'], returns='TODO_UNKNOWN_TYPE_object'),
        PrototypeCall(constructor='PerformanceNavigation', fn='toJSON', demands=['PerformanceNavigation'], returns='TODO_UNKNOWN_TYPE_object'),
        PrototypeCall(constructor='PerformanceElementTiming', fn='toJSON', demands=['PerformanceElementTiming'], returns='TODO_UNKNOWN_TYPE_object'),
        PrototypeCall(constructor='LayoutShift', fn='toJSON', demands=['LayoutShift'], returns='TODO_UNKNOWN_TYPE_object'),
        PrototypeCall(constructor='GeolocationPosition', fn='toJSON', demands=['GeolocationPosition'], returns='TODO_UNKNOWN_TYPE_object'),
        PrototypeCall(constructor='GeolocationCoordinates', fn='toJSON', demands=['GeolocationCoordinates'], returns='TODO_UNKNOWN_TYPE_object'),
    ],
    "gettransports": [
        PrototypeCall(constructor='AuthenticatorAttestationResponse', fn='getTransports', demands=['AuthenticatorAttestationResponse'], returns='str'),
    ],
    "getauthenticatordata": [
        PrototypeCall(constructor='AuthenticatorAttestationResponse', fn='getAuthenticatorData', demands=['AuthenticatorAttestationResponse'], returns='TODO_UNKNOWN_TYPE_ArrayBuffer'),
    ],
    "getpublickey": [
        PrototypeCall(constructor='AuthenticatorAttestationResponse', fn='getPublicKey', demands=['AuthenticatorAttestationResponse'], returns='TODO_UNKNOWN_TYPE_ArrayBuffer'),
    ],
    "getpublickeyalgorithm": [
        PrototypeCall(constructor='AuthenticatorAttestationResponse', fn='getPublicKeyAlgorithm', demands=['AuthenticatorAttestationResponse'], returns='TODO_UNKNOWN_TYPE_COSEAlgorithmIdentifier'),
    ],
    "open": [
        PrototypeCall(constructor='StorageBucketManager', fn='open', demands=['StorageBucketManager', 'str', 'TODO_UNKNOWN_TYPE_StorageBucketOptions'], returns='TODO_UNKNOWN_TYPE_StorageBucket'),
        PrototypeCall(constructor='SerialPort', fn='open', demands=['SerialPort', 'TODO_UNKNOWN_TYPE_SerialOptions'], returns='None'),
        PrototypeCall(constructor='Window', fn='open', demands=['Window', 'str', 'str', 'str'], returns='TODO_UNKNOWN_TYPE_WindowProxy'),
        PrototypeCall(constructor='MIDIPort', fn='open', demands=['MIDIPort'], returns='TODO_UNKNOWN_TYPE_MIDIPort'),
        PrototypeCall(constructor='HIDDevice', fn='open', demands=['HIDDevice'], returns='None'),
        PrototypeCall(constructor='IDBFactory', fn='open', demands=['IDBFactory', 'str', 'TODO_UNKNOWN_TYPE_unsigned long long'], returns='TODO_UNKNOWN_TYPE_IDBOpenDBRequest'),
        PrototypeCall(constructor='USBDevice', fn='open', demands=['USBDevice'], returns='None'),
        PrototypeCall(constructor='CacheStorage', fn='open', demands=['CacheStorage', 'str'], returns='TODO_UNKNOWN_TYPE_Cache'),
        PrototypeCall(constructor='EyeDropper', fn='open', demands=['EyeDropper', 'TODO_UNKNOWN_TYPE_ColorSelectionOptions'], returns='TODO_UNKNOWN_TYPE_ColorSelectionResult'),
        PrototypeCall(constructor='XMLHttpRequest', fn='open', demands=['XMLHttpRequest', 'TODO_UNKNOWN_TYPE_ByteString', 'str'], returns='None'),
        PrototypeCall(constructor='XMLHttpRequest', fn='open', demands=['XMLHttpRequest', 'TODO_UNKNOWN_TYPE_ByteString', 'str', 'bool', 'str', 'str'], returns='None'),
    ],
    "keys": [
        PrototypeCall(constructor='StorageBucketManager', fn='keys', demands=['StorageBucketManager'], returns='str'),
        PrototypeCall(constructor='Cache', fn='keys', demands=['Cache', 'TODO_UNKNOWN_TYPE_RequestInfo', 'TODO_UNKNOWN_TYPE_CacheQueryOptions'], returns='TODO_UNKNOWN_TYPE_Request'),
        PrototypeCall(constructor='CacheStorage', fn='keys', demands=['CacheStorage'], returns='str'),
    ],
    "delete": [
        PrototypeCall(constructor='StorageBucketManager', fn='delete', demands=['StorageBucketManager', 'str'], returns='None'),
        PrototypeCall(constructor='URLSearchParams', fn='delete', demands=['URLSearchParams', 'str', 'str'], returns='None'),
        PrototypeCall(constructor='SharedStorage', fn='delete', demands=['SharedStorage', 'str', 'TODO_UNKNOWN_TYPE_SharedStorageModifierMethodOptions'], returns='*'),
        PrototypeCall(constructor='XRAnchor', fn='delete', demands=['XRAnchor'], returns='None'),
        PrototypeCall(constructor='ContentIndex', fn='delete', demands=['ContentIndex', 'str'], returns='None'),
        PrototypeCall(constructor='CookieStore', fn='delete', demands=['CookieStore', 'str'], returns='None'),
        PrototypeCall(constructor='CookieStore', fn='delete', demands=['CookieStore', 'TODO_UNKNOWN_TYPE_CookieStoreDeleteOptions'], returns='None'),
        PrototypeCall(constructor='IDBObjectStore', fn='delete', demands=['IDBObjectStore', '*'], returns='TODO_UNKNOWN_TYPE_IDBRequest'),
        PrototypeCall(constructor='IDBCursor', fn='delete', demands=['IDBCursor'], returns='TODO_UNKNOWN_TYPE_IDBRequest'),
        PrototypeCall(constructor='Cache', fn='delete', demands=['Cache', 'TODO_UNKNOWN_TYPE_RequestInfo', 'TODO_UNKNOWN_TYPE_CacheQueryOptions'], returns='bool'),
        PrototypeCall(constructor='CacheStorage', fn='delete', demands=['CacheStorage', 'str'], returns='bool'),
        PrototypeCall(constructor='StylePropertyMap', fn='delete', demands=['StylePropertyMap', 'str'], returns='None'),
        PrototypeCall(constructor='FontFaceSet', fn='delete', demands=['FontFaceSet', 'TODO_UNKNOWN_TYPE_FontFace'], returns='bool'),
        PrototypeCall(constructor='Headers', fn='delete', demands=['Headers', 'TODO_UNKNOWN_TYPE_ByteString'], returns='None'),
        PrototypeCall(constructor='FormData', fn='delete', demands=['FormData', 'str'], returns='None'),
    ],
    "persist": [
        PrototypeCall(constructor='StorageBucket', fn='persist', demands=['StorageBucket'], returns='bool'),
        PrototypeCall(constructor='StorageManager', fn='persist', demands=['StorageManager'], returns='bool'),
        PrototypeCall(constructor='Animation', fn='persist', demands=['Animation'], returns='None'),
    ],
    "persisted": [
        PrototypeCall(constructor='StorageBucket', fn='persisted', demands=['StorageBucket'], returns='bool'),
        PrototypeCall(constructor='StorageManager', fn='persisted', demands=['StorageManager'], returns='bool'),
    ],
    "estimate": [
        PrototypeCall(constructor='StorageBucket', fn='estimate', demands=['StorageBucket'], returns='TODO_UNKNOWN_TYPE_StorageEstimate'),
        PrototypeCall(constructor='StorageAccessHandle', fn='estimate', demands=['StorageAccessHandle'], returns='TODO_UNKNOWN_TYPE_StorageEstimate'),
        PrototypeCall(constructor='StorageManager', fn='estimate', demands=['StorageManager'], returns='TODO_UNKNOWN_TYPE_StorageEstimate'),
    ],
    "setexpires": [
        PrototypeCall(constructor='StorageBucket', fn='setExpires', demands=['StorageBucket', 'TODO_UNKNOWN_TYPE_DOMHighResTimeStamp'], returns='None'),
    ],
    "expires": [
        PrototypeCall(constructor='StorageBucket', fn='expires', demands=['StorageBucket'], returns='TODO_UNKNOWN_TYPE_DOMHighResTimeStamp'),
    ],
    "getdirectory": [
        PrototypeCall(constructor='StorageBucket', fn='getDirectory', demands=['StorageBucket'], returns='TODO_UNKNOWN_TYPE_FileSystemDirectoryHandle'),
        PrototypeCall(constructor='StorageAccessHandle', fn='getDirectory', demands=['StorageAccessHandle'], returns='TODO_UNKNOWN_TYPE_FileSystemDirectoryHandle'),
        PrototypeCall(constructor='FileSystemDirectoryEntry', fn='getDirectory', demands=['FileSystemDirectoryEntry', 'str', 'TODO_UNKNOWN_TYPE_FileSystemFlags', 'TODO_UNKNOWN_TYPE_FileSystemEntryCallback', 'TODO_UNKNOWN_TYPE_ErrorCallback'], returns='None'),
    ],
    "setactionhandler": [
        PrototypeCall(constructor='MediaSession', fn='setActionHandler', demands=['MediaSession', 'TODO_UNKNOWN_TYPE_MediaSessionAction', 'TODO_UNKNOWN_TYPE_MediaSessionActionHandler'], returns='None'),
    ],
    "setpositionstate": [
        PrototypeCall(constructor='MediaSession', fn='setPositionState', demands=['MediaSession', 'TODO_UNKNOWN_TYPE_MediaPositionState'], returns='None'),
    ],
    "setmicrophoneactive": [
        PrototypeCall(constructor='MediaSession', fn='setMicrophoneActive', demands=['MediaSession', 'bool'], returns='None'),
    ],
    "setcameraactive": [
        PrototypeCall(constructor='MediaSession', fn='setCameraActive', demands=['MediaSession', 'bool'], returns='None'),
    ],
    "setscreenshareactive": [
        PrototypeCall(constructor='MediaSession', fn='setScreenshareActive', demands=['MediaSession', 'bool'], returns='None'),
    ],
    "MediaMetadata": [
        NewCall(constructor='MediaMetadata', demands=['TODO_UNKNOWN_TYPE_MediaMetadataInit'], returns='MediaMetadata'),
    ],
    "PerformanceObserver": [
        NewCall(constructor='PerformanceObserver', demands=['TODO_UNKNOWN_TYPE_PerformanceObserverCallback'], returns='PerformanceObserver'),
    ],
    "getentries": [
        PrototypeCall(constructor='PerformanceObserverEntryList', fn='getEntries', demands=['PerformanceObserverEntryList'], returns='TODO_UNKNOWN_TYPE_PerformanceEntryList'),
    ],
    "getentriesbytype": [
        PrototypeCall(constructor='PerformanceObserverEntryList', fn='getEntriesByType', demands=['PerformanceObserverEntryList', 'str'], returns='TODO_UNKNOWN_TYPE_PerformanceEntryList'),
    ],
    "getentriesbyname": [
        PrototypeCall(constructor='PerformanceObserverEntryList', fn='getEntriesByName', demands=['PerformanceObserverEntryList', 'str', 'str'], returns='TODO_UNKNOWN_TYPE_PerformanceEntryList'),
    ],
    "set": [
        PrototypeCall(constructor='CSSFontFeatureValuesMap', fn='set', demands=['CSSFontFeatureValuesMap', 'TODO_UNKNOWN_TYPE_CSSOMString', 'int'], returns='None'),
        PrototypeCall(constructor='URLSearchParams', fn='set', demands=['URLSearchParams', 'str', 'str'], returns='None'),
        PrototypeCall(constructor='SharedStorage', fn='set', demands=['SharedStorage', 'str', 'str', 'TODO_UNKNOWN_TYPE_SharedStorageSetMethodOptions'], returns='*'),
        PrototypeCall(constructor='CookieStore', fn='set', demands=['CookieStore', 'str', 'str'], returns='None'),
        PrototypeCall(constructor='CookieStore', fn='set', demands=['CookieStore', 'TODO_UNKNOWN_TYPE_CookieInit'], returns='None'),
        PrototypeCall(constructor='Table', fn='set', demands=['Table', 'int', '*'], returns='None'),
        PrototypeCall(constructor='StylePropertyMap', fn='set', demands=['StylePropertyMap', 'str', 'TODO_UNKNOWN_TYPE_CSSStyleValue'], returns='None'),
        PrototypeCall(constructor='Headers', fn='set', demands=['Headers', 'TODO_UNKNOWN_TYPE_ByteString', 'TODO_UNKNOWN_TYPE_ByteString'], returns='None'),
        PrototypeCall(constructor='FormData', fn='set', demands=['FormData', 'str', 'str'], returns='None'),
        PrototypeCall(constructor='FormData', fn='set', demands=['FormData', 'str', 'TODO_UNKNOWN_TYPE_Blob', 'str'], returns='None'),
    ],
    "drawarraysinstancedangle": [
        PrototypeCall(constructor='ANGLE_instanced_arrays', fn='drawArraysInstancedANGLE', demands=['ANGLE_instanced_arrays', 'TODO_UNKNOWN_TYPE_GLenum', 'TODO_UNKNOWN_TYPE_GLint', 'TODO_UNKNOWN_TYPE_GLsizei', 'TODO_UNKNOWN_TYPE_GLsizei'], returns='None'),
    ],
    "drawelementsinstancedangle": [
        PrototypeCall(constructor='ANGLE_instanced_arrays', fn='drawElementsInstancedANGLE', demands=['ANGLE_instanced_arrays', 'TODO_UNKNOWN_TYPE_GLenum', 'TODO_UNKNOWN_TYPE_GLsizei', 'TODO_UNKNOWN_TYPE_GLenum', 'TODO_UNKNOWN_TYPE_GLintptr', 'TODO_UNKNOWN_TYPE_GLsizei'], returns='None'),
    ],
    "vertexattribdivisorangle": [
        PrototypeCall(constructor='ANGLE_instanced_arrays', fn='vertexAttribDivisorANGLE', demands=['ANGLE_instanced_arrays', 'TODO_UNKNOWN_TYPE_GLuint', 'TODO_UNKNOWN_TYPE_GLuint'], returns='None'),
    ],
    "ClipboardEvent": [
        NewCall(constructor='ClipboardEvent', demands=['str', 'TODO_UNKNOWN_TYPE_ClipboardEventInit'], returns='ClipboardEvent'),
    ],
    "ClipboardItem": [
        NewCall(constructor='ClipboardItem', demands=['str', 'TODO_UNKNOWN_TYPE_ClipboardItemOptions'], returns='ClipboardItem'),
    ],
    "gettype": [
        PrototypeCall(constructor='ClipboardItem', fn='getType', demands=['ClipboardItem', 'str'], returns='TODO_UNKNOWN_TYPE_Blob'),
    ],
    "supports": [
        DirectCall(fn='supports', receiver='ClipboardItem', demands=['str'], returns='bool'),
        DirectCall(fn='supports', receiver='HTMLScriptElement', demands=['str'], returns='bool'),
        PrototypeCall(constructor='DOMTokenList', fn='supports', demands=['DOMTokenList', 'str'], returns='bool'),
    ],
    "read": [
        PrototypeCall(constructor='Clipboard', fn='read', demands=['Clipboard', 'TODO_UNKNOWN_TYPE_ClipboardUnsanitizedFormats'], returns='TODO_UNKNOWN_TYPE_ClipboardItems'),
        PrototypeCall(constructor='FileSystemSyncAccessHandle', fn='read', demands=['FileSystemSyncAccessHandle', 'TODO_UNKNOWN_TYPE_AllowSharedBufferSource', 'TODO_UNKNOWN_TYPE_FileSystemReadWriteOptions'], returns='TODO_UNKNOWN_TYPE_unsigned long long'),
        PrototypeCall(constructor='ReadableStreamDefaultReader', fn='read', demands=['ReadableStreamDefaultReader'], returns='TODO_UNKNOWN_TYPE_ReadableStreamReadResult'),
        PrototypeCall(constructor='ReadableStreamBYOBReader', fn='read', demands=['ReadableStreamBYOBReader', 'TODO_UNKNOWN_TYPE_ArrayBufferView', 'TODO_UNKNOWN_TYPE_ReadableStreamBYOBReaderReadOptions'], returns='TODO_UNKNOWN_TYPE_ReadableStreamReadResult'),
        DirectCall(fn='read', receiver='GeolocationSensor', demands=['TODO_UNKNOWN_TYPE_ReadOptions'], returns='TODO_UNKNOWN_TYPE_GeolocationSensorReading'),
    ],
    "readtext": [
        PrototypeCall(constructor='Clipboard', fn='readText', demands=['Clipboard'], returns='str'),
    ],
    "write": [
        PrototypeCall(constructor='Clipboard', fn='write', demands=['Clipboard', 'TODO_UNKNOWN_TYPE_ClipboardItems'], returns='None'),
        PrototypeCall(constructor='FileSystemWritableFileStream', fn='write', demands=['FileSystemWritableFileStream', 'TODO_UNKNOWN_TYPE_FileSystemWriteChunkType'], returns='None'),
        PrototypeCall(constructor='FileSystemSyncAccessHandle', fn='write', demands=['FileSystemSyncAccessHandle', 'TODO_UNKNOWN_TYPE_AllowSharedBufferSource', 'TODO_UNKNOWN_TYPE_FileSystemReadWriteOptions'], returns='TODO_UNKNOWN_TYPE_unsigned long long'),
        PrototypeCall(constructor='Writer', fn='write', demands=['Writer', 'str', 'TODO_UNKNOWN_TYPE_WriterWriteOptions'], returns='str'),
        PrototypeCall(constructor='NDEFReader', fn='write', demands=['NDEFReader', 'TODO_UNKNOWN_TYPE_NDEFMessageSource', 'TODO_UNKNOWN_TYPE_NDEFWriteOptions'], returns='None'),
        PrototypeCall(constructor='WritableStreamDefaultWriter', fn='write', demands=['WritableStreamDefaultWriter', '*'], returns='None'),
    ],
    "writetext": [
        PrototypeCall(constructor='Clipboard', fn='writeText', demands=['Clipboard', 'str'], returns='None'),
    ],
    "SnapEvent": [
        NewCall(constructor='SnapEvent', demands=['str', 'TODO_UNKNOWN_TYPE_SnapEventInit'], returns='SnapEvent'),
    ],
    "createobjecturl": [
        PrototypeCall(constructor='StorageAccessHandle', fn='createObjectURL', demands=['StorageAccessHandle', 'TODO_UNKNOWN_TYPE_Blob'], returns='str'),
    ],
    "revokeobjecturl": [
        PrototypeCall(constructor='StorageAccessHandle', fn='revokeObjectURL', demands=['StorageAccessHandle', 'str'], returns='None'),
    ],
    "broadcastchannel": [
        PrototypeCall(constructor='StorageAccessHandle', fn='BroadcastChannel', demands=['StorageAccessHandle', 'str'], returns='TODO_UNKNOWN_TYPE_BroadcastChannel'),
    ],
    "sharedworker": [
        PrototypeCall(constructor='StorageAccessHandle', fn='SharedWorker', demands=['StorageAccessHandle', 'str', 'str'], returns='TODO_UNKNOWN_TYPE_SharedWorker'),
    ],
    "PaymentRequest": [
        NewCall(constructor='PaymentRequest', demands=['TODO_UNKNOWN_TYPE_PaymentMethodData', 'TODO_UNKNOWN_TYPE_PaymentDetailsInit', 'TODO_UNKNOWN_TYPE_PaymentOptions'], returns='PaymentRequest'),
    ],
    "show": [
        PrototypeCall(constructor='PaymentRequest', fn='show', demands=['PaymentRequest', 'TODO_UNKNOWN_TYPE_PaymentDetailsUpdate'], returns='TODO_UNKNOWN_TYPE_PaymentResponse'),
        PrototypeCall(constructor='VirtualKeyboard', fn='show', demands=['VirtualKeyboard'], returns='None'),
        PrototypeCall(constructor='HTMLDialogElement', fn='show', demands=['HTMLDialogElement'], returns='None'),
    ],
    "abort": [
        PrototypeCall(constructor='PaymentRequest', fn='abort', demands=['PaymentRequest'], returns='None'),
        PrototypeCall(constructor='SourceBuffer', fn='abort', demands=['SourceBuffer'], returns='None'),
        PrototypeCall(constructor='IDBTransaction', fn='abort', demands=['IDBTransaction'], returns='None'),
        PrototypeCall(constructor='AbortController', fn='abort', demands=['AbortController', '*'], returns='None'),
        DirectCall(fn='abort', receiver='AbortSignal', demands=['*'], returns='TODO_UNKNOWN_TYPE_AbortSignal'),
        PrototypeCall(constructor='SpeechRecognition', fn='abort', demands=['SpeechRecognition'], returns='None'),
        PrototypeCall(constructor='WritableStream', fn='abort', demands=['WritableStream', '*'], returns='None'),
        PrototypeCall(constructor='WritableStreamDefaultWriter', fn='abort', demands=['WritableStreamDefaultWriter', '*'], returns='None'),
        PrototypeCall(constructor='BackgroundFetchRegistration', fn='abort', demands=['BackgroundFetchRegistration'], returns='bool'),
        PrototypeCall(constructor='XMLHttpRequest', fn='abort', demands=['XMLHttpRequest'], returns='None'),
        PrototypeCall(constructor='FileReader', fn='abort', demands=['FileReader'], returns='None'),
    ],
    "canmakepayment": [
        PrototypeCall(constructor='PaymentRequest', fn='canMakePayment', demands=['PaymentRequest'], returns='bool'),
    ],
    "complete": [
        PrototypeCall(constructor='PaymentResponse', fn='complete', demands=['PaymentResponse', 'TODO_UNKNOWN_TYPE_PaymentComplete', 'TODO_UNKNOWN_TYPE_PaymentCompleteDetails'], returns='None'),
        PrototypeCall(constructor='Subscriber', fn='complete', demands=['Subscriber'], returns='None'),
    ],
    "retry": [
        PrototypeCall(constructor='PaymentResponse', fn='retry', demands=['PaymentResponse', 'TODO_UNKNOWN_TYPE_PaymentValidationErrors'], returns='None'),
    ],
    "PaymentMethodChangeEvent": [
        NewCall(constructor='PaymentMethodChangeEvent', demands=['str', 'TODO_UNKNOWN_TYPE_PaymentMethodChangeEventInit'], returns='PaymentMethodChangeEvent'),
    ],
    "PaymentRequestUpdateEvent": [
        NewCall(constructor='PaymentRequestUpdateEvent', demands=['str', 'TODO_UNKNOWN_TYPE_PaymentRequestUpdateEventInit'], returns='PaymentRequestUpdateEvent'),
    ],
    "updatewith": [
        PrototypeCall(constructor='PaymentRequestUpdateEvent', fn='updateWith', demands=['PaymentRequestUpdateEvent', 'TODO_UNKNOWN_TYPE_PaymentDetailsUpdate'], returns='None'),
    ],
    "cancel": [
        PrototypeCall(constructor='XRHitTestSource', fn='cancel', demands=['XRHitTestSource'], returns='None'),
        PrototypeCall(constructor='XRTransientInputHitTestSource', fn='cancel', demands=['XRTransientInputHitTestSource'], returns='None'),
        PrototypeCall(constructor='SpeechSynthesis', fn='cancel', demands=['SpeechSynthesis'], returns='None'),
        PrototypeCall(constructor='ReadableStream', fn='cancel', demands=['ReadableStream', '*'], returns='None'),
        PrototypeCall(constructor='Animation', fn='cancel', demands=['Animation'], returns='None'),
    ],
    "getpose": [
        PrototypeCall(constructor='XRHitTestResult', fn='getPose', demands=['XRHitTestResult', 'TODO_UNKNOWN_TYPE_XRSpace'], returns='TODO_UNKNOWN_TYPE_XRPose'),
        PrototypeCall(constructor='XRFrame', fn='getPose', demands=['XRFrame', 'TODO_UNKNOWN_TYPE_XRSpace', 'TODO_UNKNOWN_TYPE_XRSpace'], returns='TODO_UNKNOWN_TYPE_XRPose'),
    ],
    "XRRay": [
        NewCall(constructor='XRRay', demands=['TODO_UNKNOWN_TYPE_DOMPointInit', 'TODO_UNKNOWN_TYPE_XRRayDirectionInit'], returns='XRRay'),
        NewCall(constructor='XRRay', demands=['TODO_UNKNOWN_TYPE_XRRigidTransform'], returns='XRRay'),
    ],
    "URL": [
        NewCall(constructor='URL', demands=['str', 'str'], returns='URL'),
    ],
    "parse": [
        DirectCall(fn='parse', receiver='URL', demands=['str', 'str'], returns='URL'),
        DirectCall(fn='parse', receiver='CSSStyleValue', demands=['str', 'str'], returns='TODO_UNKNOWN_TYPE_CSSStyleValue'),
        DirectCall(fn='parse', receiver='CSSNumericValue', demands=['str'], returns='TODO_UNKNOWN_TYPE_CSSNumericValue'),
        DirectCall(fn='parse', receiver='CSSColorValue', demands=['str'], returns='TODO_UNKNOWN_TYPE_CSSColorValue'),
    ],
    "canparse": [
        DirectCall(fn='canParse', receiver='URL', demands=['str', 'str'], returns='bool'),
    ],
    "URLSearchParams": [
        NewCall(constructor='URLSearchParams', demands=['str'], returns='URLSearchParams'),
    ],
    "append": [
        PrototypeCall(constructor='URLSearchParams', fn='append', demands=['URLSearchParams', 'str', 'str'], returns='None'),
        PrototypeCall(constructor='SharedStorage', fn='append', demands=['SharedStorage', 'str', 'str', 'TODO_UNKNOWN_TYPE_SharedStorageModifierMethodOptions'], returns='*'),
        PrototypeCall(constructor='StylePropertyMap', fn='append', demands=['StylePropertyMap', 'str', 'TODO_UNKNOWN_TYPE_CSSStyleValue'], returns='None'),
        PrototypeCall(constructor='GroupEffect', fn='append', demands=['GroupEffect', 'TODO_UNKNOWN_TYPE_AnimationEffect'], returns='None'),
        PrototypeCall(constructor='Headers', fn='append', demands=['Headers', 'TODO_UNKNOWN_TYPE_ByteString', 'TODO_UNKNOWN_TYPE_ByteString'], returns='None'),
        PrototypeCall(constructor='FormData', fn='append', demands=['FormData', 'str', 'str'], returns='None'),
        PrototypeCall(constructor='FormData', fn='append', demands=['FormData', 'str', 'TODO_UNKNOWN_TYPE_Blob', 'str'], returns='None'),
    ],
    "get": [
        PrototypeCall(constructor='URLSearchParams', fn='get', demands=['URLSearchParams', 'str'], returns='str'),
        PrototypeCall(constructor='Sanitizer', fn='get', demands=['Sanitizer'], returns='TODO_UNKNOWN_TYPE_SanitizerConfig'),
        PrototypeCall(constructor='SharedStorage', fn='get', demands=['SharedStorage', 'str'], returns='str'),
        PrototypeCall(constructor='CustomElementRegistry', fn='get', demands=['CustomElementRegistry', 'str'], returns='TODO_UNKNOWN_TYPE_CustomElementConstructor'),
        PrototypeCall(constructor='CredentialsContainer', fn='get', demands=['CredentialsContainer', 'TODO_UNKNOWN_TYPE_CredentialRequestOptions'], returns='TODO_UNKNOWN_TYPE_Credential'),
        PrototypeCall(constructor='CookieStore', fn='get', demands=['CookieStore', 'str'], returns='TODO_UNKNOWN_TYPE_CookieListItem'),
        PrototypeCall(constructor='CookieStore', fn='get', demands=['CookieStore', 'TODO_UNKNOWN_TYPE_CookieStoreGetOptions'], returns='TODO_UNKNOWN_TYPE_CookieListItem'),
        PrototypeCall(constructor='IDBObjectStore', fn='get', demands=['IDBObjectStore', '*'], returns='TODO_UNKNOWN_TYPE_IDBRequest'),
        PrototypeCall(constructor='IDBIndex', fn='get', demands=['IDBIndex', '*'], returns='TODO_UNKNOWN_TYPE_IDBRequest'),
        PrototypeCall(constructor='Table', fn='get', demands=['Table', 'int'], returns='*'),
        PrototypeCall(constructor='Clients', fn='get', demands=['Clients', 'str'], returns='TODO_UNKNOWN_TYPE_Client'),
        PrototypeCall(constructor='StylePropertyMapReadOnly', fn='get', demands=['StylePropertyMapReadOnly', 'str'], returns='None'),
        PrototypeCall(constructor='MediaKeyStatusMap', fn='get', demands=['MediaKeyStatusMap', 'TODO_UNKNOWN_TYPE_BufferSource'], returns='TODO_UNKNOWN_TYPE_MediaKeyStatus'),
        PrototypeCall(constructor='Headers', fn='get', demands=['Headers', 'TODO_UNKNOWN_TYPE_ByteString'], returns='TODO_UNKNOWN_TYPE_ByteString'),
        PrototypeCall(constructor='BackgroundFetchManager', fn='get', demands=['BackgroundFetchManager', 'str'], returns='TODO_UNKNOWN_TYPE_BackgroundFetchRegistration'),
        PrototypeCall(constructor='FormData', fn='get', demands=['FormData', 'str'], returns='TODO_UNKNOWN_TYPE_FormDataEntryValue'),
        PrototypeCall(constructor='XRHand', fn='get', demands=['XRHand', 'TODO_UNKNOWN_TYPE_XRHandJoint'], returns='TODO_UNKNOWN_TYPE_XRJointSpace'),
    ],
    "getall": [
        PrototypeCall(constructor='URLSearchParams', fn='getAll', demands=['URLSearchParams', 'str'], returns='str'),
        PrototypeCall(constructor='ContentIndex', fn='getAll', demands=['ContentIndex'], returns='TODO_UNKNOWN_TYPE_ContentDescription'),
        PrototypeCall(constructor='CookieStore', fn='getAll', demands=['CookieStore', 'str'], returns='TODO_UNKNOWN_TYPE_CookieList'),
        PrototypeCall(constructor='CookieStore', fn='getAll', demands=['CookieStore', 'TODO_UNKNOWN_TYPE_CookieStoreGetOptions'], returns='TODO_UNKNOWN_TYPE_CookieList'),
        PrototypeCall(constructor='IDBObjectStore', fn='getAll', demands=['IDBObjectStore', '*', 'int'], returns='TODO_UNKNOWN_TYPE_IDBRequest'),
        PrototypeCall(constructor='IDBIndex', fn='getAll', demands=['IDBIndex', '*', 'int'], returns='TODO_UNKNOWN_TYPE_IDBRequest'),
        PrototypeCall(constructor='StylePropertyMapReadOnly', fn='getAll', demands=['StylePropertyMapReadOnly', 'str'], returns='TODO_UNKNOWN_TYPE_CSSStyleValue'),
        PrototypeCall(constructor='FormData', fn='getAll', demands=['FormData', 'str'], returns='TODO_UNKNOWN_TYPE_FormDataEntryValue'),
    ],
    "has": [
        PrototypeCall(constructor='URLSearchParams', fn='has', demands=['URLSearchParams', 'str', 'str'], returns='bool'),
        PrototypeCall(constructor='CacheStorage', fn='has', demands=['CacheStorage', 'str'], returns='bool'),
        PrototypeCall(constructor='StylePropertyMapReadOnly', fn='has', demands=['StylePropertyMapReadOnly', 'str'], returns='bool'),
        PrototypeCall(constructor='MediaKeyStatusMap', fn='has', demands=['MediaKeyStatusMap', 'TODO_UNKNOWN_TYPE_BufferSource'], returns='bool'),
        PrototypeCall(constructor='Headers', fn='has', demands=['Headers', 'TODO_UNKNOWN_TYPE_ByteString'], returns='bool'),
        PrototypeCall(constructor='FormData', fn='has', demands=['FormData', 'str'], returns='bool'),
    ],
    "sort": [
        PrototypeCall(constructor='URLSearchParams', fn='sort', demands=['URLSearchParams'], returns='None'),
    ],
    "DeviceOrientationEvent": [
        NewCall(constructor='DeviceOrientationEvent', demands=['str', 'TODO_UNKNOWN_TYPE_DeviceOrientationEventInit'], returns='DeviceOrientationEvent'),
    ],
    "requestpermission": [
        DirectCall(fn='requestPermission', receiver='DeviceOrientationEvent', demands=['bool'], returns='TODO_UNKNOWN_TYPE_PermissionState'),
        DirectCall(fn='requestPermission', receiver='DeviceMotionEvent', demands=[], returns='TODO_UNKNOWN_TYPE_PermissionState'),
        DirectCall(fn='requestPermission', receiver='Notification', demands=['TODO_UNKNOWN_TYPE_NotificationPermissionCallback'], returns='TODO_UNKNOWN_TYPE_NotificationPermission'),
        DirectCall(fn='requestPermission', receiver='IdleDetector', demands=[], returns='TODO_UNKNOWN_TYPE_PermissionState'),
    ],
    "DeviceMotionEvent": [
        NewCall(constructor='DeviceMotionEvent', demands=['str', 'TODO_UNKNOWN_TYPE_DeviceMotionEventInit'], returns='DeviceMotionEvent'),
    ],
    "requestframe": [
        PrototypeCall(constructor='CanvasCaptureMediaStreamTrack', fn='requestFrame', demands=['CanvasCaptureMediaStreamTrack'], returns='None'),
    ],
    "gettitlebararearect": [
        PrototypeCall(constructor='WindowControlsOverlay', fn='getTitlebarAreaRect', demands=['WindowControlsOverlay'], returns='TODO_UNKNOWN_TYPE_DOMRect'),
    ],
    "WindowControlsOverlayGeometryChangeEvent": [
        NewCall(constructor='WindowControlsOverlayGeometryChangeEvent', demands=['str', 'TODO_UNKNOWN_TYPE_WindowControlsOverlayGeometryChangeEventInit'], returns='WindowControlsOverlayGeometryChangeEvent'),
    ],
    "fromelement": [
        DirectCall(fn='fromElement', receiver='RestrictionTarget', demands=['Element'], returns='TODO_UNKNOWN_TYPE_RestrictionTarget'),
        DirectCall(fn='fromElement', receiver='CropTarget', demands=['Element'], returns='TODO_UNKNOWN_TYPE_CropTarget'),
    ],
    "hide": [
        PrototypeCall(constructor='VirtualKeyboard', fn='hide', demands=['VirtualKeyboard'], returns='None'),
    ],
    "Sanitizer": [
        NewCall(constructor='Sanitizer', demands=['TODO_UNKNOWN_TYPE_SanitizerConfig'], returns='Sanitizer'),
    ],
    "allowelement": [
        PrototypeCall(constructor='Sanitizer', fn='allowElement', demands=['Sanitizer', 'TODO_UNKNOWN_TYPE_SanitizerElementWithAttributes'], returns='None'),
    ],
    "removeelement": [
        PrototypeCall(constructor='Sanitizer', fn='removeElement', demands=['Sanitizer', 'TODO_UNKNOWN_TYPE_SanitizerElement'], returns='None'),
    ],
    "replaceelementwithchildren": [
        PrototypeCall(constructor='Sanitizer', fn='replaceElementWithChildren', demands=['Sanitizer', 'TODO_UNKNOWN_TYPE_SanitizerElement'], returns='None'),
    ],
    "allowattribute": [
        PrototypeCall(constructor='Sanitizer', fn='allowAttribute', demands=['Sanitizer', 'TODO_UNKNOWN_TYPE_SanitizerAttribute'], returns='None'),
    ],
    "removeattribute": [
        PrototypeCall(constructor='Sanitizer', fn='removeAttribute', demands=['Sanitizer', 'TODO_UNKNOWN_TYPE_SanitizerAttribute'], returns='None'),
        PrototypeCall(constructor='Element', fn='removeAttribute', demands=['Element', 'str'], returns='None'),
    ],
    "setcomments": [
        PrototypeCall(constructor='Sanitizer', fn='setComments', demands=['Sanitizer', 'bool'], returns='None'),
    ],
    "setdataattributes": [
        PrototypeCall(constructor='Sanitizer', fn='setDataAttributes', demands=['Sanitizer', 'bool'], returns='None'),
    ],
    "removeunsafe": [
        PrototypeCall(constructor='Sanitizer', fn='removeUnsafe', demands=['Sanitizer'], returns='None'),
    ],
    "TextDetector": [
        NewCall(constructor='TextDetector', demands=[], returns='TextDetector'),
    ],
    "detect": [
        PrototypeCall(constructor='TextDetector', fn='detect', demands=['TextDetector', 'TODO_UNKNOWN_TYPE_ImageBitmapSource'], returns='TODO_UNKNOWN_TYPE_DetectedText'),
        PrototypeCall(constructor='FaceDetector', fn='detect', demands=['FaceDetector', 'TODO_UNKNOWN_TYPE_ImageBitmapSource'], returns='TODO_UNKNOWN_TYPE_DetectedFace'),
        PrototypeCall(constructor='BarcodeDetector', fn='detect', demands=['BarcodeDetector', 'TODO_UNKNOWN_TYPE_ImageBitmapSource'], returns='TODO_UNKNOWN_TYPE_DetectedBarcode'),
        PrototypeCall(constructor='LanguageDetector', fn='detect', demands=['LanguageDetector', 'str', 'TODO_UNKNOWN_TYPE_LanguageDetectorDetectOptions'], returns='TODO_UNKNOWN_TYPE_LanguageDetectionResult'),
    ],
    "createqueryext": [
        PrototypeCall(constructor='EXT_disjoint_timer_query', fn='createQueryEXT', demands=['EXT_disjoint_timer_query'], returns='TODO_UNKNOWN_TYPE_WebGLTimerQueryEXT'),
    ],
    "deletequeryext": [
        PrototypeCall(constructor='EXT_disjoint_timer_query', fn='deleteQueryEXT', demands=['EXT_disjoint_timer_query', 'TODO_UNKNOWN_TYPE_WebGLTimerQueryEXT'], returns='None'),
    ],
    "isqueryext": [
        PrototypeCall(constructor='EXT_disjoint_timer_query', fn='isQueryEXT', demands=['EXT_disjoint_timer_query', 'TODO_UNKNOWN_TYPE_WebGLTimerQueryEXT'], returns='bool'),
    ],
    "beginqueryext": [
        PrototypeCall(constructor='EXT_disjoint_timer_query', fn='beginQueryEXT', demands=['EXT_disjoint_timer_query', 'TODO_UNKNOWN_TYPE_GLenum', 'TODO_UNKNOWN_TYPE_WebGLTimerQueryEXT'], returns='None'),
    ],
    "endqueryext": [
        PrototypeCall(constructor='EXT_disjoint_timer_query', fn='endQueryEXT', demands=['EXT_disjoint_timer_query', 'TODO_UNKNOWN_TYPE_GLenum'], returns='None'),
    ],
    "querycounterext": [
        PrototypeCall(constructor='EXT_disjoint_timer_query', fn='queryCounterEXT', demands=['EXT_disjoint_timer_query', 'TODO_UNKNOWN_TYPE_WebGLTimerQueryEXT', 'TODO_UNKNOWN_TYPE_GLenum'], returns='None'),
        PrototypeCall(constructor='EXT_disjoint_timer_query_webgl2', fn='queryCounterEXT', demands=['EXT_disjoint_timer_query_webgl2', 'TODO_UNKNOWN_TYPE_WebGLQuery', 'TODO_UNKNOWN_TYPE_GLenum'], returns='None'),
    ],
    "getqueryext": [
        PrototypeCall(constructor='EXT_disjoint_timer_query', fn='getQueryEXT', demands=['EXT_disjoint_timer_query', 'TODO_UNKNOWN_TYPE_GLenum', 'TODO_UNKNOWN_TYPE_GLenum'], returns='*'),
    ],
    "getqueryobjectext": [
        PrototypeCall(constructor='EXT_disjoint_timer_query', fn='getQueryObjectEXT', demands=['EXT_disjoint_timer_query', 'TODO_UNKNOWN_TYPE_WebGLTimerQueryEXT', 'TODO_UNKNOWN_TYPE_GLenum'], returns='*'),
    ],
    "getrandomvalues": [
        PrototypeCall(constructor='Crypto', fn='getRandomValues', demands=['Crypto', 'TODO_UNKNOWN_TYPE_ArrayBufferView'], returns='TODO_UNKNOWN_TYPE_ArrayBufferView'),
    ],
    "randomuuid": [
        PrototypeCall(constructor='Crypto', fn='randomUUID', demands=['Crypto'], returns='str'),
    ],
    "encrypt": [
        PrototypeCall(constructor='SubtleCrypto', fn='encrypt', demands=['SubtleCrypto', 'TODO_UNKNOWN_TYPE_AlgorithmIdentifier', 'TODO_UNKNOWN_TYPE_CryptoKey', 'TODO_UNKNOWN_TYPE_BufferSource'], returns='TODO_UNKNOWN_TYPE_ArrayBuffer'),
    ],
    "decrypt": [
        PrototypeCall(constructor='SubtleCrypto', fn='decrypt', demands=['SubtleCrypto', 'TODO_UNKNOWN_TYPE_AlgorithmIdentifier', 'TODO_UNKNOWN_TYPE_CryptoKey', 'TODO_UNKNOWN_TYPE_BufferSource'], returns='TODO_UNKNOWN_TYPE_ArrayBuffer'),
    ],
    "sign": [
        PrototypeCall(constructor='SubtleCrypto', fn='sign', demands=['SubtleCrypto', 'TODO_UNKNOWN_TYPE_AlgorithmIdentifier', 'TODO_UNKNOWN_TYPE_CryptoKey', 'TODO_UNKNOWN_TYPE_BufferSource'], returns='TODO_UNKNOWN_TYPE_ArrayBuffer'),
    ],
    "verify": [
        PrototypeCall(constructor='SubtleCrypto', fn='verify', demands=['SubtleCrypto', 'TODO_UNKNOWN_TYPE_AlgorithmIdentifier', 'TODO_UNKNOWN_TYPE_CryptoKey', 'TODO_UNKNOWN_TYPE_BufferSource', 'TODO_UNKNOWN_TYPE_BufferSource'], returns='bool'),
    ],
    "digest": [
        PrototypeCall(constructor='SubtleCrypto', fn='digest', demands=['SubtleCrypto', 'TODO_UNKNOWN_TYPE_AlgorithmIdentifier', 'TODO_UNKNOWN_TYPE_BufferSource'], returns='TODO_UNKNOWN_TYPE_ArrayBuffer'),
    ],
    "generatekey": [
        PrototypeCall(constructor='SubtleCrypto', fn='generateKey', demands=['SubtleCrypto', 'TODO_UNKNOWN_TYPE_AlgorithmIdentifier', 'bool', 'TODO_UNKNOWN_TYPE_KeyUsage'], returns='TODO_UNKNOWN_TYPE_CryptoKey'),
    ],
    "derivekey": [
        PrototypeCall(constructor='SubtleCrypto', fn='deriveKey', demands=['SubtleCrypto', 'TODO_UNKNOWN_TYPE_AlgorithmIdentifier', 'TODO_UNKNOWN_TYPE_CryptoKey', 'TODO_UNKNOWN_TYPE_AlgorithmIdentifier', 'bool', 'TODO_UNKNOWN_TYPE_KeyUsage'], returns='TODO_UNKNOWN_TYPE_CryptoKey'),
    ],
    "derivebits": [
        PrototypeCall(constructor='SubtleCrypto', fn='deriveBits', demands=['SubtleCrypto', 'TODO_UNKNOWN_TYPE_AlgorithmIdentifier', 'TODO_UNKNOWN_TYPE_CryptoKey', 'int'], returns='TODO_UNKNOWN_TYPE_ArrayBuffer'),
    ],
    "importkey": [
        PrototypeCall(constructor='SubtleCrypto', fn='importKey', demands=['SubtleCrypto', 'TODO_UNKNOWN_TYPE_KeyFormat', 'TODO_UNKNOWN_TYPE_BufferSource', 'TODO_UNKNOWN_TYPE_AlgorithmIdentifier', 'bool', 'TODO_UNKNOWN_TYPE_KeyUsage'], returns='TODO_UNKNOWN_TYPE_CryptoKey'),
    ],
    "exportkey": [
        PrototypeCall(constructor='SubtleCrypto', fn='exportKey', demands=['SubtleCrypto', 'TODO_UNKNOWN_TYPE_KeyFormat', 'TODO_UNKNOWN_TYPE_CryptoKey'], returns='TODO_UNKNOWN_TYPE_ArrayBuffer'),
    ],
    "wrapkey": [
        PrototypeCall(constructor='SubtleCrypto', fn='wrapKey', demands=['SubtleCrypto', 'TODO_UNKNOWN_TYPE_KeyFormat', 'TODO_UNKNOWN_TYPE_CryptoKey', 'TODO_UNKNOWN_TYPE_CryptoKey', 'TODO_UNKNOWN_TYPE_AlgorithmIdentifier'], returns='TODO_UNKNOWN_TYPE_ArrayBuffer'),
    ],
    "unwrapkey": [
        PrototypeCall(constructor='SubtleCrypto', fn='unwrapKey', demands=['SubtleCrypto', 'TODO_UNKNOWN_TYPE_KeyFormat', 'TODO_UNKNOWN_TYPE_BufferSource', 'TODO_UNKNOWN_TYPE_CryptoKey', 'TODO_UNKNOWN_TYPE_AlgorithmIdentifier', 'TODO_UNKNOWN_TYPE_AlgorithmIdentifier', 'bool', 'TODO_UNKNOWN_TYPE_KeyUsage'], returns='TODO_UNKNOWN_TYPE_CryptoKey'),
    ],
    "getdepthinmeters": [
        PrototypeCall(constructor='XRCPUDepthInformation', fn='getDepthInMeters', demands=['XRCPUDepthInformation', 'TODO_UNKNOWN_TYPE_float', 'TODO_UNKNOWN_TYPE_float'], returns='TODO_UNKNOWN_TYPE_float'),
    ],
    "MediaStream": [
        NewCall(constructor='MediaStream', demands=[], returns='MediaStream'),
        NewCall(constructor='MediaStream', demands=['TODO_UNKNOWN_TYPE_MediaStream'], returns='MediaStream'),
        NewCall(constructor='MediaStream', demands=['TODO_UNKNOWN_TYPE_MediaStreamTrack'], returns='MediaStream'),
    ],
    "getaudiotracks": [
        PrototypeCall(constructor='MediaStream', fn='getAudioTracks', demands=['MediaStream'], returns='TODO_UNKNOWN_TYPE_MediaStreamTrack'),
    ],
    "getvideotracks": [
        PrototypeCall(constructor='MediaStream', fn='getVideoTracks', demands=['MediaStream'], returns='TODO_UNKNOWN_TYPE_MediaStreamTrack'),
    ],
    "gettracks": [
        PrototypeCall(constructor='MediaStream', fn='getTracks', demands=['MediaStream'], returns='TODO_UNKNOWN_TYPE_MediaStreamTrack'),
    ],
    "gettrackbyid": [
        PrototypeCall(constructor='MediaStream', fn='getTrackById', demands=['MediaStream', 'str'], returns='TODO_UNKNOWN_TYPE_MediaStreamTrack'),
        PrototypeCall(constructor='AudioTrackList', fn='getTrackById', demands=['AudioTrackList', 'str'], returns='TODO_UNKNOWN_TYPE_AudioTrack'),
        PrototypeCall(constructor='VideoTrackList', fn='getTrackById', demands=['VideoTrackList', 'str'], returns='TODO_UNKNOWN_TYPE_VideoTrack'),
        PrototypeCall(constructor='TextTrackList', fn='getTrackById', demands=['TextTrackList', 'str'], returns='TODO_UNKNOWN_TYPE_TextTrack'),
    ],
    "addtrack": [
        PrototypeCall(constructor='MediaStream', fn='addTrack', demands=['MediaStream', 'TODO_UNKNOWN_TYPE_MediaStreamTrack'], returns='None'),
    ],
    "removetrack": [
        PrototypeCall(constructor='MediaStream', fn='removeTrack', demands=['MediaStream', 'TODO_UNKNOWN_TYPE_MediaStreamTrack'], returns='None'),
    ],
    "clone": [
        PrototypeCall(constructor='MediaStream', fn='clone', demands=['MediaStream'], returns='TODO_UNKNOWN_TYPE_MediaStream'),
        PrototypeCall(constructor='MediaStreamTrack', fn='clone', demands=['MediaStreamTrack'], returns='TODO_UNKNOWN_TYPE_MediaStreamTrack'),
        PrototypeCall(constructor='BrowserCaptureMediaStreamTrack', fn='clone', demands=['BrowserCaptureMediaStreamTrack'], returns='TODO_UNKNOWN_TYPE_BrowserCaptureMediaStreamTrack'),
        PrototypeCall(constructor='AudioData', fn='clone', demands=['AudioData'], returns='TODO_UNKNOWN_TYPE_AudioData'),
        PrototypeCall(constructor='VideoFrame', fn='clone', demands=['VideoFrame'], returns='TODO_UNKNOWN_TYPE_VideoFrame'),
        PrototypeCall(constructor='GroupEffect', fn='clone', demands=['GroupEffect'], returns='TODO_UNKNOWN_TYPE_GroupEffect'),
        PrototypeCall(constructor='SequenceEffect', fn='clone', demands=['SequenceEffect'], returns='TODO_UNKNOWN_TYPE_SequenceEffect'),
        PrototypeCall(constructor='Request', fn='clone', demands=['Request'], returns='TODO_UNKNOWN_TYPE_Request'),
        PrototypeCall(constructor='Response', fn='clone', demands=['Response'], returns='TODO_UNKNOWN_TYPE_Response'),
    ],
    "stop": [
        PrototypeCall(constructor='MediaStreamTrack', fn='stop', demands=['MediaStreamTrack'], returns='None'),
        PrototypeCall(constructor='RTCRtpTransceiver', fn='stop', demands=['RTCRtpTransceiver'], returns='None'),
        PrototypeCall(constructor='Window', fn='stop', demands=['Window'], returns='None'),
        PrototypeCall(constructor='HTMLMarqueeElement', fn='stop', demands=['HTMLMarqueeElement'], returns='None'),
        PrototypeCall(constructor='Profiler', fn='stop', demands=['Profiler'], returns='TODO_UNKNOWN_TYPE_ProfilerTrace'),
        PrototypeCall(constructor='MediaRecorder', fn='stop', demands=['MediaRecorder'], returns='None'),
        PrototypeCall(constructor='Sensor', fn='stop', demands=['Sensor'], returns='None'),
        PrototypeCall(constructor='SpeechRecognition', fn='stop', demands=['SpeechRecognition'], returns='None'),
        PrototypeCall(constructor='BluetoothLEScan', fn='stop', demands=['BluetoothLEScan'], returns='None'),
        PrototypeCall(constructor='AudioScheduledSourceNode', fn='stop', demands=['AudioScheduledSourceNode', 'TODO_UNKNOWN_TYPE_double'], returns='None'),
    ],
    "getcapabilities": [
        PrototypeCall(constructor='MediaStreamTrack', fn='getCapabilities', demands=['MediaStreamTrack'], returns='TODO_UNKNOWN_TYPE_MediaTrackCapabilities'),
        PrototypeCall(constructor='InputDeviceInfo', fn='getCapabilities', demands=['InputDeviceInfo'], returns='TODO_UNKNOWN_TYPE_MediaTrackCapabilities'),
        DirectCall(fn='getCapabilities', receiver='RTCRtpSender', demands=['str'], returns='TODO_UNKNOWN_TYPE_RTCRtpCapabilities'),
        DirectCall(fn='getCapabilities', receiver='RTCRtpReceiver', demands=['str'], returns='TODO_UNKNOWN_TYPE_RTCRtpCapabilities'),
    ],
    "getconstraints": [
        PrototypeCall(constructor='MediaStreamTrack', fn='getConstraints', demands=['MediaStreamTrack'], returns='TODO_UNKNOWN_TYPE_MediaTrackConstraints'),
    ],
    "getsettings": [
        PrototypeCall(constructor='MediaStreamTrack', fn='getSettings', demands=['MediaStreamTrack'], returns='TODO_UNKNOWN_TYPE_MediaTrackSettings'),
    ],
    "applyconstraints": [
        PrototypeCall(constructor='MediaStreamTrack', fn='applyConstraints', demands=['MediaStreamTrack', 'TODO_UNKNOWN_TYPE_MediaTrackConstraints'], returns='None'),
    ],
    "MediaStreamTrackEvent": [
        NewCall(constructor='MediaStreamTrackEvent', demands=['str', 'TODO_UNKNOWN_TYPE_MediaStreamTrackEventInit'], returns='MediaStreamTrackEvent'),
    ],
    "OverconstrainedError": [
        NewCall(constructor='OverconstrainedError', demands=['str', 'str'], returns='OverconstrainedError'),
    ],
    "enumeratedevices": [
        PrototypeCall(constructor='MediaDevices', fn='enumerateDevices', demands=['MediaDevices'], returns='TODO_UNKNOWN_TYPE_MediaDeviceInfo'),
    ],
    "DeviceChangeEvent": [
        NewCall(constructor='DeviceChangeEvent', demands=['str', 'TODO_UNKNOWN_TYPE_DeviceChangeEventInit'], returns='DeviceChangeEvent'),
    ],
    "selecturl": [
        PrototypeCall(constructor='SharedStorageWorklet', fn='selectURL', demands=['SharedStorageWorklet', 'str', 'TODO_UNKNOWN_TYPE_SharedStorageUrlWithMetadata', 'TODO_UNKNOWN_TYPE_SharedStorageRunOperationMethodOptions'], returns='TODO_UNKNOWN_TYPE_SharedStorageResponse'),
        PrototypeCall(constructor='SharedStorage', fn='selectURL', demands=['SharedStorage', 'str', 'TODO_UNKNOWN_TYPE_SharedStorageUrlWithMetadata', 'TODO_UNKNOWN_TYPE_SharedStorageRunOperationMethodOptions'], returns='TODO_UNKNOWN_TYPE_SharedStorageResponse'),
    ],
    "run": [
        PrototypeCall(constructor='SharedStorageWorklet', fn='run', demands=['SharedStorageWorklet', 'str', 'TODO_UNKNOWN_TYPE_SharedStorageRunOperationMethodOptions'], returns='*'),
        PrototypeCall(constructor='SharedStorage', fn='run', demands=['SharedStorage', 'str', 'TODO_UNKNOWN_TYPE_SharedStorageRunOperationMethodOptions'], returns='*'),
    ],
    "register": [
        PrototypeCall(constructor='SharedStorageWorkletGlobalScope', fn='register', demands=['SharedStorageWorkletGlobalScope', 'str', 'TODO_UNKNOWN_TYPE_Function'], returns='None'),
        PrototypeCall(constructor='RTCIdentityProviderRegistrar', fn='register', demands=['RTCIdentityProviderRegistrar', 'TODO_UNKNOWN_TYPE_RTCIdentityProvider'], returns='None'),
        PrototypeCall(constructor='ServiceWorkerContainer', fn='register', demands=['ServiceWorkerContainer', 'TODO_UNKNOWN_TYPE_TrustedScriptURL', 'TODO_UNKNOWN_TYPE_RegistrationOptions'], returns='TODO_UNKNOWN_TYPE_ServiceWorkerRegistration'),
        PrototypeCall(constructor='PeriodicSyncManager', fn='register', demands=['PeriodicSyncManager', 'str', 'TODO_UNKNOWN_TYPE_BackgroundSyncOptions'], returns='None'),
        PrototypeCall(constructor='SyncManager', fn='register', demands=['SyncManager', 'str'], returns='None'),
    ],
    "interestgroups": [
        PrototypeCall(constructor='SharedStorageWorkletGlobalScope', fn='interestGroups', demands=['SharedStorageWorkletGlobalScope'], returns='TODO_UNKNOWN_TYPE_StorageInterestGroup'),
    ],
    "SharedStorageSetMethod": [
        NewCall(constructor='SharedStorageSetMethod', demands=['str', 'str', 'TODO_UNKNOWN_TYPE_SharedStorageSetMethodOptions'], returns='SharedStorageSetMethod'),
    ],
    "SharedStorageAppendMethod": [
        NewCall(constructor='SharedStorageAppendMethod', demands=['str', 'str', 'TODO_UNKNOWN_TYPE_SharedStorageModifierMethodOptions'], returns='SharedStorageAppendMethod'),
    ],
    "SharedStorageDeleteMethod": [
        NewCall(constructor='SharedStorageDeleteMethod', demands=['str', 'TODO_UNKNOWN_TYPE_SharedStorageModifierMethodOptions'], returns='SharedStorageDeleteMethod'),
    ],
    "SharedStorageClearMethod": [
        NewCall(constructor='SharedStorageClearMethod', demands=['TODO_UNKNOWN_TYPE_SharedStorageModifierMethodOptions'], returns='SharedStorageClearMethod'),
    ],
    "clear": [
        PrototypeCall(constructor='SharedStorage', fn='clear', demands=['SharedStorage', 'TODO_UNKNOWN_TYPE_SharedStorageModifierMethodOptions'], returns='*'),
        PrototypeCall(constructor='DataTransferItemList', fn='clear', demands=['DataTransferItemList'], returns='None'),
        PrototypeCall(constructor='Storage', fn='clear', demands=['Storage'], returns='None'),
        PrototypeCall(constructor='MIDIOutput', fn='clear', demands=['MIDIOutput'], returns='None'),
        PrototypeCall(constructor='IDBObjectStore', fn='clear', demands=['IDBObjectStore'], returns='TODO_UNKNOWN_TYPE_IDBRequest'),
        PrototypeCall(constructor='HandwritingDrawing', fn='clear', demands=['HandwritingDrawing'], returns='None'),
        PrototypeCall(constructor='HandwritingStroke', fn='clear', demands=['HandwritingStroke'], returns='None'),
        PrototypeCall(constructor='StylePropertyMap', fn='clear', demands=['StylePropertyMap'], returns='None'),
        PrototypeCall(constructor='FontFaceSet', fn='clear', demands=['FontFaceSet'], returns='None'),
        PrototypeCall(constructor='SVGNumberList', fn='clear', demands=['SVGNumberList'], returns='None'),
        PrototypeCall(constructor='SVGLengthList', fn='clear', demands=['SVGLengthList'], returns='None'),
        PrototypeCall(constructor='SVGStringList', fn='clear', demands=['SVGStringList'], returns='None'),
        PrototypeCall(constructor='SVGTransformList', fn='clear', demands=['SVGTransformList'], returns='None'),
        PrototypeCall(constructor='SVGPointList', fn='clear', demands=['SVGPointList'], returns='None'),
    ],
    "batchupdate": [
        PrototypeCall(constructor='SharedStorage', fn='batchUpdate', demands=['SharedStorage', 'TODO_UNKNOWN_TYPE_SharedStorageModifierMethod', 'TODO_UNKNOWN_TYPE_SharedStorageModifierMethodOptions'], returns='*'),
    ],
    "createworklet": [
        PrototypeCall(constructor='SharedStorage', fn='createWorklet', demands=['SharedStorage', 'str', 'TODO_UNKNOWN_TYPE_SharedStorageWorkletOptions'], returns='TODO_UNKNOWN_TYPE_SharedStorageWorklet'),
    ],
    "length": [
        PrototypeCall(constructor='SharedStorage', fn='length', demands=['SharedStorage'], returns='int'),
    ],
    "remainingbudget": [
        PrototypeCall(constructor='SharedStorage', fn='remainingBudget', demands=['SharedStorage'], returns='TODO_UNKNOWN_TYPE_double'),
    ],
    "RTCPeerConnection": [
        NewCall(constructor='RTCPeerConnection', demands=['TODO_UNKNOWN_TYPE_RTCConfiguration'], returns='RTCPeerConnection'),
    ],
    "createoffer": [
        PrototypeCall(constructor='RTCPeerConnection', fn='createOffer', demands=['RTCPeerConnection', 'TODO_UNKNOWN_TYPE_RTCOfferOptions'], returns='TODO_UNKNOWN_TYPE_RTCSessionDescriptionInit'),
        PrototypeCall(constructor='RTCPeerConnection', fn='createOffer', demands=['RTCPeerConnection', 'TODO_UNKNOWN_TYPE_RTCSessionDescriptionCallback', 'TODO_UNKNOWN_TYPE_RTCPeerConnectionErrorCallback', 'TODO_UNKNOWN_TYPE_RTCOfferOptions'], returns='None'),
    ],
    "createanswer": [
        PrototypeCall(constructor='RTCPeerConnection', fn='createAnswer', demands=['RTCPeerConnection', 'TODO_UNKNOWN_TYPE_RTCAnswerOptions'], returns='TODO_UNKNOWN_TYPE_RTCSessionDescriptionInit'),
        PrototypeCall(constructor='RTCPeerConnection', fn='createAnswer', demands=['RTCPeerConnection', 'TODO_UNKNOWN_TYPE_RTCSessionDescriptionCallback', 'TODO_UNKNOWN_TYPE_RTCPeerConnectionErrorCallback'], returns='None'),
    ],
    "setlocaldescription": [
        PrototypeCall(constructor='RTCPeerConnection', fn='setLocalDescription', demands=['RTCPeerConnection', 'TODO_UNKNOWN_TYPE_RTCLocalSessionDescriptionInit'], returns='None'),
        PrototypeCall(constructor='RTCPeerConnection', fn='setLocalDescription', demands=['RTCPeerConnection', 'TODO_UNKNOWN_TYPE_RTCLocalSessionDescriptionInit', 'TODO_UNKNOWN_TYPE_VoidFunction', 'TODO_UNKNOWN_TYPE_RTCPeerConnectionErrorCallback'], returns='None'),
    ],
    "setremotedescription": [
        PrototypeCall(constructor='RTCPeerConnection', fn='setRemoteDescription', demands=['RTCPeerConnection', 'TODO_UNKNOWN_TYPE_RTCSessionDescriptionInit'], returns='None'),
        PrototypeCall(constructor='RTCPeerConnection', fn='setRemoteDescription', demands=['RTCPeerConnection', 'TODO_UNKNOWN_TYPE_RTCSessionDescriptionInit', 'TODO_UNKNOWN_TYPE_VoidFunction', 'TODO_UNKNOWN_TYPE_RTCPeerConnectionErrorCallback'], returns='None'),
    ],
    "addicecandidate": [
        PrototypeCall(constructor='RTCPeerConnection', fn='addIceCandidate', demands=['RTCPeerConnection', 'TODO_UNKNOWN_TYPE_RTCIceCandidateInit'], returns='None'),
        PrototypeCall(constructor='RTCPeerConnection', fn='addIceCandidate', demands=['RTCPeerConnection', 'TODO_UNKNOWN_TYPE_RTCIceCandidateInit', 'TODO_UNKNOWN_TYPE_VoidFunction', 'TODO_UNKNOWN_TYPE_RTCPeerConnectionErrorCallback'], returns='None'),
    ],
    "restartice": [
        PrototypeCall(constructor='RTCPeerConnection', fn='restartIce', demands=['RTCPeerConnection'], returns='None'),
    ],
    "getconfiguration": [
        PrototypeCall(constructor='RTCPeerConnection', fn='getConfiguration', demands=['RTCPeerConnection'], returns='TODO_UNKNOWN_TYPE_RTCConfiguration'),
        PrototypeCall(constructor='MediaKeySystemAccess', fn='getConfiguration', demands=['MediaKeySystemAccess'], returns='TODO_UNKNOWN_TYPE_MediaKeySystemConfiguration'),
        PrototypeCall(constructor='GPUCanvasContext', fn='getConfiguration', demands=['GPUCanvasContext'], returns='TODO_UNKNOWN_TYPE_GPUCanvasConfiguration'),
    ],
    "setconfiguration": [
        PrototypeCall(constructor='RTCPeerConnection', fn='setConfiguration', demands=['RTCPeerConnection', 'TODO_UNKNOWN_TYPE_RTCConfiguration'], returns='None'),
    ],
    "close": [
        PrototypeCall(constructor='RTCPeerConnection', fn='close', demands=['RTCPeerConnection'], returns='None'),
        PrototypeCall(constructor='RTCDataChannel', fn='close', demands=['RTCDataChannel'], returns='None'),
        PrototypeCall(constructor='SerialPort', fn='close', demands=['SerialPort'], returns='None'),
        PrototypeCall(constructor='FileSystemSyncAccessHandle', fn='close', demands=['FileSystemSyncAccessHandle'], returns='None'),
        PrototypeCall(constructor='HTMLDialogElement', fn='close', demands=['HTMLDialogElement', 'str'], returns='None'),
        PrototypeCall(constructor='CloseWatcher', fn='close', demands=['CloseWatcher'], returns='None'),
        PrototypeCall(constructor='Window', fn='close', demands=['Window'], returns='None'),
        PrototypeCall(constructor='ImageBitmap', fn='close', demands=['ImageBitmap'], returns='None'),
        PrototypeCall(constructor='EventSource', fn='close', demands=['EventSource'], returns='None'),
        PrototypeCall(constructor='MessagePort', fn='close', demands=['MessagePort'], returns='None'),
        PrototypeCall(constructor='BroadcastChannel', fn='close', demands=['BroadcastChannel'], returns='None'),
        PrototypeCall(constructor='DedicatedWorkerGlobalScope', fn='close', demands=['DedicatedWorkerGlobalScope'], returns='None'),
        PrototypeCall(constructor='SharedWorkerGlobalScope', fn='close', demands=['SharedWorkerGlobalScope'], returns='None'),
        PrototypeCall(constructor='MIDIPort', fn='close', demands=['MIDIPort'], returns='TODO_UNKNOWN_TYPE_MIDIPort'),
        PrototypeCall(constructor='WebSocket', fn='close', demands=['WebSocket', 'TODO_UNKNOWN_TYPE_unsigned short', 'str'], returns='None'),
        PrototypeCall(constructor='AudioDecoder', fn='close', demands=['AudioDecoder'], returns='None'),
        PrototypeCall(constructor='VideoDecoder', fn='close', demands=['VideoDecoder'], returns='None'),
        PrototypeCall(constructor='AudioEncoder', fn='close', demands=['AudioEncoder'], returns='None'),
        PrototypeCall(constructor='VideoEncoder', fn='close', demands=['VideoEncoder'], returns='None'),
        PrototypeCall(constructor='AudioData', fn='close', demands=['AudioData'], returns='None'),
        PrototypeCall(constructor='VideoFrame', fn='close', demands=['VideoFrame'], returns='None'),
        PrototypeCall(constructor='ImageDecoder', fn='close', demands=['ImageDecoder'], returns='None'),
        PrototypeCall(constructor='HIDDevice', fn='close', demands=['HIDDevice'], returns='None'),
        DirectCall(fn='close', receiver='IdentityProvider', demands=[], returns='None'),
        PrototypeCall(constructor='IDBDatabase', fn='close', demands=['IDBDatabase'], returns='None'),
        PrototypeCall(constructor='USBDevice', fn='close', demands=['USBDevice'], returns='None'),
        PrototypeCall(constructor='WebTransport', fn='close', demands=['WebTransport', 'TODO_UNKNOWN_TYPE_WebTransportCloseInfo'], returns='None'),
        PrototypeCall(constructor='PresentationConnection', fn='close', demands=['PresentationConnection'], returns='None'),
        PrototypeCall(constructor='MediaKeySession', fn='close', demands=['MediaKeySession'], returns='None'),
        PrototypeCall(constructor='ReadableStreamDefaultController', fn='close', demands=['ReadableStreamDefaultController'], returns='None'),
        PrototypeCall(constructor='ReadableByteStreamController', fn='close', demands=['ReadableByteStreamController'], returns='None'),
        PrototypeCall(constructor='WritableStream', fn='close', demands=['WritableStream'], returns='None'),
        PrototypeCall(constructor='WritableStreamDefaultWriter', fn='close', demands=['WritableStreamDefaultWriter'], returns='None'),
        PrototypeCall(constructor='Notification', fn='close', demands=['Notification'], returns='None'),
        PrototypeCall(constructor='AudioContext', fn='close', demands=['AudioContext'], returns='None'),
    ],
    "RTCSessionDescription": [
        NewCall(constructor='RTCSessionDescription', demands=['TODO_UNKNOWN_TYPE_RTCSessionDescriptionInit'], returns='RTCSessionDescription'),
    ],
    "RTCIceCandidate": [
        NewCall(constructor='RTCIceCandidate', demands=['TODO_UNKNOWN_TYPE_RTCLocalIceCandidateInit'], returns='RTCIceCandidate'),
    ],
    "RTCPeerConnectionIceEvent": [
        NewCall(constructor='RTCPeerConnectionIceEvent', demands=['str', 'TODO_UNKNOWN_TYPE_RTCPeerConnectionIceEventInit'], returns='RTCPeerConnectionIceEvent'),
    ],
    "RTCPeerConnectionIceErrorEvent": [
        NewCall(constructor='RTCPeerConnectionIceErrorEvent', demands=['str', 'TODO_UNKNOWN_TYPE_RTCPeerConnectionIceErrorEventInit'], returns='RTCPeerConnectionIceErrorEvent'),
    ],
    "getfingerprints": [
        PrototypeCall(constructor='RTCCertificate', fn='getFingerprints', demands=['RTCCertificate'], returns='TODO_UNKNOWN_TYPE_RTCDtlsFingerprint'),
    ],
    "setparameters": [
        PrototypeCall(constructor='RTCRtpSender', fn='setParameters', demands=['RTCRtpSender', 'TODO_UNKNOWN_TYPE_RTCRtpSendParameters', 'TODO_UNKNOWN_TYPE_RTCSetParameterOptions'], returns='None'),
    ],
    "getparameters": [
        PrototypeCall(constructor='RTCRtpSender', fn='getParameters', demands=['RTCRtpSender'], returns='TODO_UNKNOWN_TYPE_RTCRtpSendParameters'),
        PrototypeCall(constructor='RTCRtpReceiver', fn='getParameters', demands=['RTCRtpReceiver'], returns='TODO_UNKNOWN_TYPE_RTCRtpReceiveParameters'),
        PrototypeCall(constructor='CSSFunctionRule', fn='getParameters', demands=['CSSFunctionRule'], returns='TODO_UNKNOWN_TYPE_FunctionParameter'),
    ],
    "replacetrack": [
        PrototypeCall(constructor='RTCRtpSender', fn='replaceTrack', demands=['RTCRtpSender', 'TODO_UNKNOWN_TYPE_MediaStreamTrack'], returns='None'),
    ],
    "setstreams": [
        PrototypeCall(constructor='RTCRtpSender', fn='setStreams', demands=['RTCRtpSender', 'TODO_UNKNOWN_TYPE_MediaStream'], returns='None'),
    ],
    "getstats": [
        PrototypeCall(constructor='RTCRtpSender', fn='getStats', demands=['RTCRtpSender'], returns='TODO_UNKNOWN_TYPE_RTCStatsReport'),
        PrototypeCall(constructor='RTCRtpReceiver', fn='getStats', demands=['RTCRtpReceiver'], returns='TODO_UNKNOWN_TYPE_RTCStatsReport'),
        PrototypeCall(constructor='WebTransport', fn='getStats', demands=['WebTransport'], returns='TODO_UNKNOWN_TYPE_WebTransportConnectionStats'),
        PrototypeCall(constructor='WebTransportSendStream', fn='getStats', demands=['WebTransportSendStream'], returns='TODO_UNKNOWN_TYPE_WebTransportSendStreamStats'),
        PrototypeCall(constructor='WebTransportSendGroup', fn='getStats', demands=['WebTransportSendGroup'], returns='TODO_UNKNOWN_TYPE_WebTransportSendStreamStats'),
        PrototypeCall(constructor='WebTransportReceiveStream', fn='getStats', demands=['WebTransportReceiveStream'], returns='TODO_UNKNOWN_TYPE_WebTransportReceiveStreamStats'),
    ],
    "getcontributingsources": [
        PrototypeCall(constructor='RTCRtpReceiver', fn='getContributingSources', demands=['RTCRtpReceiver'], returns='TODO_UNKNOWN_TYPE_RTCRtpContributingSource'),
    ],
    "getsynchronizationsources": [
        PrototypeCall(constructor='RTCRtpReceiver', fn='getSynchronizationSources', demands=['RTCRtpReceiver'], returns='TODO_UNKNOWN_TYPE_RTCRtpSynchronizationSource'),
    ],
    "setcodecpreferences": [
        PrototypeCall(constructor='RTCRtpTransceiver', fn='setCodecPreferences', demands=['RTCRtpTransceiver', 'TODO_UNKNOWN_TYPE_RTCRtpCodec'], returns='None'),
    ],
    "getremotecertificates": [
        PrototypeCall(constructor='RTCDtlsTransport', fn='getRemoteCertificates', demands=['RTCDtlsTransport'], returns='TODO_UNKNOWN_TYPE_ArrayBuffer'),
    ],
    "getlocalcandidates": [
        PrototypeCall(constructor='RTCIceTransport', fn='getLocalCandidates', demands=['RTCIceTransport'], returns='TODO_UNKNOWN_TYPE_RTCIceCandidate'),
    ],
    "getremotecandidates": [
        PrototypeCall(constructor='RTCIceTransport', fn='getRemoteCandidates', demands=['RTCIceTransport'], returns='TODO_UNKNOWN_TYPE_RTCIceCandidate'),
    ],
    "getselectedcandidatepair": [
        PrototypeCall(constructor='RTCIceTransport', fn='getSelectedCandidatePair', demands=['RTCIceTransport'], returns='TODO_UNKNOWN_TYPE_RTCIceCandidatePair'),
    ],
    "getlocalparameters": [
        PrototypeCall(constructor='RTCIceTransport', fn='getLocalParameters', demands=['RTCIceTransport'], returns='TODO_UNKNOWN_TYPE_RTCIceParameters'),
    ],
    "getremoteparameters": [
        PrototypeCall(constructor='RTCIceTransport', fn='getRemoteParameters', demands=['RTCIceTransport'], returns='TODO_UNKNOWN_TYPE_RTCIceParameters'),
    ],
    "RTCTrackEvent": [
        NewCall(constructor='RTCTrackEvent', demands=['str', 'TODO_UNKNOWN_TYPE_RTCTrackEventInit'], returns='RTCTrackEvent'),
    ],
    "send": [
        PrototypeCall(constructor='RTCDataChannel', fn='send', demands=['RTCDataChannel', 'str'], returns='None'),
        PrototypeCall(constructor='RTCDataChannel', fn='send', demands=['RTCDataChannel', 'TODO_UNKNOWN_TYPE_Blob'], returns='None'),
        PrototypeCall(constructor='RTCDataChannel', fn='send', demands=['RTCDataChannel', 'TODO_UNKNOWN_TYPE_ArrayBuffer'], returns='None'),
        PrototypeCall(constructor='RTCDataChannel', fn='send', demands=['RTCDataChannel', 'TODO_UNKNOWN_TYPE_ArrayBufferView'], returns='None'),
        PrototypeCall(constructor='MIDIOutput', fn='send', demands=['MIDIOutput', 'TODO_UNKNOWN_TYPE_octet', 'TODO_UNKNOWN_TYPE_DOMHighResTimeStamp'], returns='None'),
        PrototypeCall(constructor='WebSocket', fn='send', demands=['WebSocket', 'TODO_UNKNOWN_TYPE_BufferSource'], returns='None'),
        PrototypeCall(constructor='PresentationConnection', fn='send', demands=['PresentationConnection', 'str'], returns='None'),
        PrototypeCall(constructor='PresentationConnection', fn='send', demands=['PresentationConnection', 'TODO_UNKNOWN_TYPE_Blob'], returns='None'),
        PrototypeCall(constructor='PresentationConnection', fn='send', demands=['PresentationConnection', 'TODO_UNKNOWN_TYPE_ArrayBuffer'], returns='None'),
        PrototypeCall(constructor='PresentationConnection', fn='send', demands=['PresentationConnection', 'TODO_UNKNOWN_TYPE_ArrayBufferView'], returns='None'),
        PrototypeCall(constructor='XMLHttpRequest', fn='send', demands=['XMLHttpRequest', 'Document'], returns='None'),
    ],
    "RTCDataChannelEvent": [
        NewCall(constructor='RTCDataChannelEvent', demands=['str', 'TODO_UNKNOWN_TYPE_RTCDataChannelEventInit'], returns='RTCDataChannelEvent'),
    ],
    "insertdtmf": [
        PrototypeCall(constructor='RTCDTMFSender', fn='insertDTMF', demands=['RTCDTMFSender', 'str', 'int', 'int'], returns='None'),
    ],
    "RTCDTMFToneChangeEvent": [
        NewCall(constructor='RTCDTMFToneChangeEvent', demands=['str', 'TODO_UNKNOWN_TYPE_RTCDTMFToneChangeEventInit'], returns='RTCDTMFToneChangeEvent'),
    ],
    "RTCError": [
        NewCall(constructor='RTCError', demands=['TODO_UNKNOWN_TYPE_RTCErrorInit', 'str'], returns='RTCError'),
    ],
    "RTCErrorEvent": [
        NewCall(constructor='RTCErrorEvent', demands=['str', 'TODO_UNKNOWN_TYPE_RTCErrorEventInit'], returns='RTCErrorEvent'),
    ],
    "timeremaining": [
        PrototypeCall(constructor='IdleDeadline', fn='timeRemaining', demands=['IdleDeadline'], returns='TODO_UNKNOWN_TYPE_DOMHighResTimeStamp'),
    ],
    "ContentVisibilityAutoStateChangeEvent": [
        NewCall(constructor='ContentVisibilityAutoStateChangeEvent', demands=['str', 'TODO_UNKNOWN_TYPE_ContentVisibilityAutoStateChangeEventInit'], returns='ContentVisibilityAutoStateChangeEvent'),
    ],
    "AmbientLightSensor": [
        NewCall(constructor='AmbientLightSensor', demands=['TODO_UNKNOWN_TYPE_SensorOptions'], returns='AmbientLightSensor'),
    ],
    "getports": [
        PrototypeCall(constructor='Serial', fn='getPorts', demands=['Serial'], returns='TODO_UNKNOWN_TYPE_SerialPort'),
    ],
    "requestport": [
        PrototypeCall(constructor='Serial', fn='requestPort', demands=['Serial', 'TODO_UNKNOWN_TYPE_SerialPortRequestOptions'], returns='TODO_UNKNOWN_TYPE_SerialPort'),
    ],
    "getinfo": [
        PrototypeCall(constructor='SerialPort', fn='getInfo', demands=['SerialPort'], returns='TODO_UNKNOWN_TYPE_SerialPortInfo'),
    ],
    "setsignals": [
        PrototypeCall(constructor='SerialPort', fn='setSignals', demands=['SerialPort', 'TODO_UNKNOWN_TYPE_SerialOutputSignals'], returns='None'),
    ],
    "getsignals": [
        PrototypeCall(constructor='SerialPort', fn='getSignals', demands=['SerialPort'], returns='TODO_UNKNOWN_TYPE_SerialInputSignals'),
    ],
    "forget": [
        PrototypeCall(constructor='SerialPort', fn='forget', demands=['SerialPort'], returns='None'),
        PrototypeCall(constructor='HIDDevice', fn='forget', demands=['HIDDevice'], returns='None'),
        PrototypeCall(constructor='BluetoothDevice', fn='forget', demands=['BluetoothDevice'], returns='None'),
        PrototypeCall(constructor='USBDevice', fn='forget', demands=['USBDevice'], returns='None'),
    ],
    "requestpersistenthandle": [
        PrototypeCall(constructor='XRAnchor', fn='requestPersistentHandle', demands=['XRAnchor'], returns='str'),
    ],
    "createcontext": [
        PrototypeCall(constructor='ML', fn='createContext', demands=['ML', 'TODO_UNKNOWN_TYPE_MLContextOptions'], returns='TODO_UNKNOWN_TYPE_MLContext'),
        PrototypeCall(constructor='ML', fn='createContext', demands=['ML', 'TODO_UNKNOWN_TYPE_GPUDevice'], returns='TODO_UNKNOWN_TYPE_MLContext'),
    ],
    "dispatch": [
        PrototypeCall(constructor='MLContext', fn='dispatch', demands=['MLContext', 'TODO_UNKNOWN_TYPE_MLGraph', 'TODO_UNKNOWN_TYPE_MLNamedTensors', 'TODO_UNKNOWN_TYPE_MLNamedTensors'], returns='None'),
    ],
    "createtensor": [
        PrototypeCall(constructor='MLContext', fn='createTensor', demands=['MLContext', 'TODO_UNKNOWN_TYPE_MLTensorDescriptor'], returns='TODO_UNKNOWN_TYPE_MLTensor'),
    ],
    "createconstanttensor": [
        PrototypeCall(constructor='MLContext', fn='createConstantTensor', demands=['MLContext', 'TODO_UNKNOWN_TYPE_MLOperandDescriptor', 'TODO_UNKNOWN_TYPE_AllowSharedBufferSource'], returns='TODO_UNKNOWN_TYPE_MLTensor'),
    ],
    "readtensor": [
        PrototypeCall(constructor='MLContext', fn='readTensor', demands=['MLContext', 'TODO_UNKNOWN_TYPE_MLTensor'], returns='TODO_UNKNOWN_TYPE_ArrayBuffer'),
        PrototypeCall(constructor='MLContext', fn='readTensor', demands=['MLContext', 'TODO_UNKNOWN_TYPE_MLTensor', 'TODO_UNKNOWN_TYPE_AllowSharedBufferSource'], returns='None'),
    ],
    "writetensor": [
        PrototypeCall(constructor='MLContext', fn='writeTensor', demands=['MLContext', 'TODO_UNKNOWN_TYPE_MLTensor', 'TODO_UNKNOWN_TYPE_AllowSharedBufferSource'], returns='None'),
    ],
    "opsupportlimits": [
        PrototypeCall(constructor='MLContext', fn='opSupportLimits', demands=['MLContext'], returns='TODO_UNKNOWN_TYPE_MLOpSupportLimits'),
    ],
    "destroy": [
        PrototypeCall(constructor='MLContext', fn='destroy', demands=['MLContext'], returns='None'),
        PrototypeCall(constructor='MLGraph', fn='destroy', demands=['MLGraph'], returns='None'),
        PrototypeCall(constructor='MLTensor', fn='destroy', demands=['MLTensor'], returns='None'),
        PrototypeCall(constructor='CloseWatcher', fn='destroy', demands=['CloseWatcher'], returns='None'),
        PrototypeCall(constructor='XRCompositionLayer', fn='destroy', demands=['XRCompositionLayer'], returns='None'),
        PrototypeCall(constructor='GPUDevice', fn='destroy', demands=['GPUDevice'], returns='None'),
        PrototypeCall(constructor='GPUBuffer', fn='destroy', demands=['GPUBuffer'], returns='None'),
        PrototypeCall(constructor='GPUTexture', fn='destroy', demands=['GPUTexture'], returns='None'),
        PrototypeCall(constructor='GPUQuerySet', fn='destroy', demands=['GPUQuerySet'], returns='None'),
    ],
    "MLGraphBuilder": [
        NewCall(constructor='MLGraphBuilder', demands=['TODO_UNKNOWN_TYPE_MLContext'], returns='MLGraphBuilder'),
    ],
    "input": [
        PrototypeCall(constructor='MLGraphBuilder', fn='input', demands=['MLGraphBuilder', 'str', 'TODO_UNKNOWN_TYPE_MLOperandDescriptor'], returns='TODO_UNKNOWN_TYPE_MLOperand'),
    ],
    "constant": [
        PrototypeCall(constructor='MLGraphBuilder', fn='constant', demands=['MLGraphBuilder', 'TODO_UNKNOWN_TYPE_MLOperandDescriptor', 'TODO_UNKNOWN_TYPE_AllowSharedBufferSource'], returns='TODO_UNKNOWN_TYPE_MLOperand'),
        PrototypeCall(constructor='MLGraphBuilder', fn='constant', demands=['MLGraphBuilder', 'TODO_UNKNOWN_TYPE_MLOperandDataType', 'TODO_UNKNOWN_TYPE_MLNumber'], returns='TODO_UNKNOWN_TYPE_MLOperand'),
        PrototypeCall(constructor='MLGraphBuilder', fn='constant', demands=['MLGraphBuilder', 'TODO_UNKNOWN_TYPE_MLTensor'], returns='TODO_UNKNOWN_TYPE_MLOperand'),
    ],
    "build": [
        PrototypeCall(constructor='MLGraphBuilder', fn='build', demands=['MLGraphBuilder', 'TODO_UNKNOWN_TYPE_MLNamedOperands'], returns='TODO_UNKNOWN_TYPE_MLGraph'),
    ],
    "JsonLdProcessor": [
        NewCall(constructor='JsonLdProcessor', demands=[], returns='JsonLdProcessor'),
    ],
    "compact": [
        DirectCall(fn='compact', receiver='JsonLdProcessor', demands=['TODO_UNKNOWN_TYPE_JsonLdInput', 'TODO_UNKNOWN_TYPE_JsonLdContext', 'TODO_UNKNOWN_TYPE_JsonLdOptions'], returns='TODO_UNKNOWN_TYPE_JsonLdRecord'),
    ],
    "expand": [
        DirectCall(fn='expand', receiver='JsonLdProcessor', demands=['TODO_UNKNOWN_TYPE_JsonLdInput', 'TODO_UNKNOWN_TYPE_JsonLdOptions'], returns='TODO_UNKNOWN_TYPE_JsonLdRecord'),
    ],
    "flatten": [
        DirectCall(fn='flatten', receiver='JsonLdProcessor', demands=['TODO_UNKNOWN_TYPE_JsonLdInput', 'TODO_UNKNOWN_TYPE_JsonLdContext', 'TODO_UNKNOWN_TYPE_JsonLdOptions'], returns='TODO_UNKNOWN_TYPE_JsonLdRecord'),
    ],
    "fromrdf": [
        DirectCall(fn='fromRdf', receiver='JsonLdProcessor', demands=['TODO_UNKNOWN_TYPE_RdfDataset', 'TODO_UNKNOWN_TYPE_JsonLdOptions'], returns='TODO_UNKNOWN_TYPE_JsonLdRecord'),
    ],
    "tordf": [
        DirectCall(fn='toRdf', receiver='JsonLdProcessor', demands=['TODO_UNKNOWN_TYPE_JsonLdInput', 'TODO_UNKNOWN_TYPE_JsonLdOptions'], returns='TODO_UNKNOWN_TYPE_RdfDataset'),
    ],
    "RdfDataset": [
        NewCall(constructor='RdfDataset', demands=[], returns='RdfDataset'),
    ],
    "add": [
        PrototypeCall(constructor='RdfDataset', fn='add', demands=['RdfDataset', 'str', 'TODO_UNKNOWN_TYPE_RdfGraph'], returns='None'),
        PrototypeCall(constructor='RdfGraph', fn='add', demands=['RdfGraph', 'TODO_UNKNOWN_TYPE_RdfTriple'], returns='None'),
        PrototypeCall(constructor='ContentIndex', fn='add', demands=['ContentIndex', 'TODO_UNKNOWN_TYPE_ContentDescription'], returns='None'),
        PrototypeCall(constructor='HTMLOptionsCollection', fn='add', demands=['HTMLOptionsCollection', 'TODO_UNKNOWN_TYPE_HTMLOptionElement', 'TODO_UNKNOWN_TYPE_HTMLElement'], returns='None'),
        PrototypeCall(constructor='HTMLSelectElement', fn='add', demands=['HTMLSelectElement', 'TODO_UNKNOWN_TYPE_HTMLOptionElement', 'TODO_UNKNOWN_TYPE_HTMLElement'], returns='None'),
        PrototypeCall(constructor='DataTransferItemList', fn='add', demands=['DataTransferItemList', 'str', 'str'], returns='TODO_UNKNOWN_TYPE_DataTransferItem'),
        PrototypeCall(constructor='DataTransferItemList', fn='add', demands=['DataTransferItemList', 'TODO_UNKNOWN_TYPE_File'], returns='TODO_UNKNOWN_TYPE_DataTransferItem'),
        PrototypeCall(constructor='IDBObjectStore', fn='add', demands=['IDBObjectStore', '*', '*'], returns='TODO_UNKNOWN_TYPE_IDBRequest'),
        PrototypeCall(constructor='DOMTokenList', fn='add', demands=['DOMTokenList', 'str'], returns='None'),
        PrototypeCall(constructor='Cache', fn='add', demands=['Cache', 'TODO_UNKNOWN_TYPE_RequestInfo'], returns='None'),
        PrototypeCall(constructor='CSSNumericValue', fn='add', demands=['CSSNumericValue', 'TODO_UNKNOWN_TYPE_CSSNumberish'], returns='TODO_UNKNOWN_TYPE_CSSNumericValue'),
        PrototypeCall(constructor='FontFaceSet', fn='add', demands=['FontFaceSet', 'TODO_UNKNOWN_TYPE_FontFace'], returns='TODO_UNKNOWN_TYPE_FontFaceSet'),
    ],
    "RdfGraph": [
        NewCall(constructor='RdfGraph', demands=[], returns='RdfGraph'),
    ],
    "RdfTriple": [
        NewCall(constructor='RdfTriple', demands=[], returns='RdfTriple'),
    ],
    "RdfLiteral": [
        NewCall(constructor='RdfLiteral', demands=[], returns='RdfLiteral'),
    ],
    "RemoteDocument": [
        NewCall(constructor='RemoteDocument', demands=[], returns='RemoteDocument'),
    ],
    "CapturedMouseEvent": [
        NewCall(constructor='CapturedMouseEvent', demands=['str', 'TODO_UNKNOWN_TYPE_CapturedMouseEventInit'], returns='CapturedMouseEvent'),
    ],
    "subscribe": [
        PrototypeCall(constructor='PushManager', fn='subscribe', demands=['PushManager', 'TODO_UNKNOWN_TYPE_PushSubscriptionOptionsInit'], returns='TODO_UNKNOWN_TYPE_PushSubscription'),
        PrototypeCall(constructor='CookieStoreManager', fn='subscribe', demands=['CookieStoreManager', 'TODO_UNKNOWN_TYPE_CookieStoreGetOptions'], returns='None'),
        PrototypeCall(constructor='Observable', fn='subscribe', demands=['Observable', 'TODO_UNKNOWN_TYPE_ObserverUnion', 'TODO_UNKNOWN_TYPE_SubscribeOptions'], returns='None'),
    ],
    "getsubscription": [
        PrototypeCall(constructor='PushManager', fn='getSubscription', demands=['PushManager'], returns='TODO_UNKNOWN_TYPE_PushSubscription'),
    ],
    "permissionstate": [
        PrototypeCall(constructor='PushManager', fn='permissionState', demands=['PushManager', 'TODO_UNKNOWN_TYPE_PushSubscriptionOptionsInit'], returns='TODO_UNKNOWN_TYPE_PermissionState'),
    ],
    "getkey": [
        PrototypeCall(constructor='PushSubscription', fn='getKey', demands=['PushSubscription', 'TODO_UNKNOWN_TYPE_PushEncryptionKeyName'], returns='TODO_UNKNOWN_TYPE_ArrayBuffer'),
        PrototypeCall(constructor='IDBObjectStore', fn='getKey', demands=['IDBObjectStore', '*'], returns='TODO_UNKNOWN_TYPE_IDBRequest'),
        PrototypeCall(constructor='IDBIndex', fn='getKey', demands=['IDBIndex', '*'], returns='TODO_UNKNOWN_TYPE_IDBRequest'),
    ],
    "unsubscribe": [
        PrototypeCall(constructor='PushSubscription', fn='unsubscribe', demands=['PushSubscription'], returns='bool'),
        PrototypeCall(constructor='CookieStoreManager', fn='unsubscribe', demands=['CookieStoreManager', 'TODO_UNKNOWN_TYPE_CookieStoreGetOptions'], returns='None'),
    ],
    "arraybuffer": [
        PrototypeCall(constructor='PushMessageData', fn='arrayBuffer', demands=['PushMessageData'], returns='TODO_UNKNOWN_TYPE_ArrayBuffer'),
        PrototypeCall(constructor='Blob', fn='arrayBuffer', demands=['Blob'], returns='TODO_UNKNOWN_TYPE_ArrayBuffer'),
    ],
    "blob": [
        PrototypeCall(constructor='PushMessageData', fn='blob', demands=['PushMessageData'], returns='TODO_UNKNOWN_TYPE_Blob'),
        PrototypeCall(constructor='FontData', fn='blob', demands=['FontData'], returns='TODO_UNKNOWN_TYPE_Blob'),
    ],
    "bytes": [
        PrototypeCall(constructor='PushMessageData', fn='bytes', demands=['PushMessageData'], returns='TODO_UNKNOWN_TYPE_Uint8Array'),
        PrototypeCall(constructor='Blob', fn='bytes', demands=['Blob'], returns='TODO_UNKNOWN_TYPE_Uint8Array'),
    ],
    "json": [
        PrototypeCall(constructor='PushMessageData', fn='json', demands=['PushMessageData'], returns='*'),
        DirectCall(fn='json', receiver='Response', demands=['*', 'TODO_UNKNOWN_TYPE_ResponseInit'], returns='TODO_UNKNOWN_TYPE_Response'),
    ],
    "text": [
        PrototypeCall(constructor='PushMessageData', fn='text', demands=['PushMessageData'], returns='str'),
        PrototypeCall(constructor='Blob', fn='text', demands=['Blob'], returns='str'),
    ],
    "PushEvent": [
        NewCall(constructor='PushEvent', demands=['str', 'TODO_UNKNOWN_TYPE_PushEventInit'], returns='PushEvent'),
    ],
    "PushSubscriptionChangeEvent": [
        NewCall(constructor='PushSubscriptionChangeEvent', demands=['str', 'TODO_UNKNOWN_TYPE_PushSubscriptionChangeEventInit'], returns='PushSubscriptionChangeEvent'),
    ],
    "requestwindow": [
        PrototypeCall(constructor='DocumentPictureInPicture', fn='requestWindow', demands=['DocumentPictureInPicture', 'TODO_UNKNOWN_TYPE_DocumentPictureInPictureOptions'], returns='Window'),
    ],
    "DocumentPictureInPictureEvent": [
        NewCall(constructor='DocumentPictureInPictureEvent', demands=['str', 'TODO_UNKNOWN_TYPE_DocumentPictureInPictureEventInit'], returns='DocumentPictureInPictureEvent'),
    ],
    "issameentry": [
        PrototypeCall(constructor='FileSystemHandle', fn='isSameEntry', demands=['FileSystemHandle', 'TODO_UNKNOWN_TYPE_FileSystemHandle'], returns='bool'),
    ],
    "getfile": [
        PrototypeCall(constructor='FileSystemFileHandle', fn='getFile', demands=['FileSystemFileHandle'], returns='TODO_UNKNOWN_TYPE_File'),
        PrototypeCall(constructor='FileSystemDirectoryEntry', fn='getFile', demands=['FileSystemDirectoryEntry', 'str', 'TODO_UNKNOWN_TYPE_FileSystemFlags', 'TODO_UNKNOWN_TYPE_FileSystemEntryCallback', 'TODO_UNKNOWN_TYPE_ErrorCallback'], returns='None'),
    ],
    "createwritable": [
        PrototypeCall(constructor='FileSystemFileHandle', fn='createWritable', demands=['FileSystemFileHandle', 'TODO_UNKNOWN_TYPE_FileSystemCreateWritableOptions'], returns='TODO_UNKNOWN_TYPE_FileSystemWritableFileStream'),
        PrototypeCall(constructor='WebTransportDatagramDuplexStream', fn='createWritable', demands=['WebTransportDatagramDuplexStream', 'TODO_UNKNOWN_TYPE_WebTransportSendOptions'], returns='TODO_UNKNOWN_TYPE_WebTransportDatagramsWritable'),
    ],
    "createsyncaccesshandle": [
        PrototypeCall(constructor='FileSystemFileHandle', fn='createSyncAccessHandle', demands=['FileSystemFileHandle'], returns='TODO_UNKNOWN_TYPE_FileSystemSyncAccessHandle'),
    ],
    "getfilehandle": [
        PrototypeCall(constructor='FileSystemDirectoryHandle', fn='getFileHandle', demands=['FileSystemDirectoryHandle', 'str', 'TODO_UNKNOWN_TYPE_FileSystemGetFileOptions'], returns='TODO_UNKNOWN_TYPE_FileSystemFileHandle'),
    ],
    "getdirectoryhandle": [
        PrototypeCall(constructor='FileSystemDirectoryHandle', fn='getDirectoryHandle', demands=['FileSystemDirectoryHandle', 'str', 'TODO_UNKNOWN_TYPE_FileSystemGetDirectoryOptions'], returns='TODO_UNKNOWN_TYPE_FileSystemDirectoryHandle'),
    ],
    "removeentry": [
        PrototypeCall(constructor='FileSystemDirectoryHandle', fn='removeEntry', demands=['FileSystemDirectoryHandle', 'str', 'TODO_UNKNOWN_TYPE_FileSystemRemoveOptions'], returns='None'),
    ],
    "resolve": [
        PrototypeCall(constructor='FileSystemDirectoryHandle', fn='resolve', demands=['FileSystemDirectoryHandle', 'TODO_UNKNOWN_TYPE_FileSystemHandle'], returns='str'),
        DirectCall(fn='resolve', receiver='IdentityProvider', demands=['str', 'TODO_UNKNOWN_TYPE_IdentityResolveOptions'], returns='None'),
    ],
    "seek": [
        PrototypeCall(constructor='FileSystemWritableFileStream', fn='seek', demands=['FileSystemWritableFileStream', 'TODO_UNKNOWN_TYPE_unsigned long long'], returns='None'),
    ],
    "truncate": [
        PrototypeCall(constructor='FileSystemWritableFileStream', fn='truncate', demands=['FileSystemWritableFileStream', 'TODO_UNKNOWN_TYPE_unsigned long long'], returns='None'),
        PrototypeCall(constructor='FileSystemSyncAccessHandle', fn='truncate', demands=['FileSystemSyncAccessHandle', 'TODO_UNKNOWN_TYPE_unsigned long long'], returns='None'),
    ],
    "getsize": [
        PrototypeCall(constructor='FileSystemSyncAccessHandle', fn='getSize', demands=['FileSystemSyncAccessHandle'], returns='TODO_UNKNOWN_TYPE_unsigned long long'),
    ],
    "flush": [
        PrototypeCall(constructor='FileSystemSyncAccessHandle', fn='flush', demands=['FileSystemSyncAccessHandle'], returns='None'),
        PrototypeCall(constructor='AudioDecoder', fn='flush', demands=['AudioDecoder'], returns='None'),
        PrototypeCall(constructor='VideoDecoder', fn='flush', demands=['VideoDecoder'], returns='None'),
        PrototypeCall(constructor='AudioEncoder', fn='flush', demands=['AudioEncoder'], returns='None'),
        PrototypeCall(constructor='VideoEncoder', fn='flush', demands=['VideoEncoder'], returns='None'),
    ],
    "ProximitySensor": [
        NewCall(constructor='ProximitySensor', demands=['TODO_UNKNOWN_TYPE_SensorOptions'], returns='ProximitySensor'),
    ],
    "registerpaint": [
        PrototypeCall(constructor='PaintWorkletGlobalScope', fn='registerPaint', demands=['PaintWorkletGlobalScope', 'str', 'TODO_UNKNOWN_TYPE_VoidFunction'], returns='None'),
    ],
    "DataCue": [
        NewCall(constructor='DataCue', demands=['TODO_UNKNOWN_TYPE_double', 'TODO_UNKNOWN_TYPE_unrestricted double', '*', 'str'], returns='DataCue'),
    ],
    "query": [
        PrototypeCall(constructor='Permissions', fn='query', demands=['Permissions', 'TODO_UNKNOWN_TYPE_object'], returns='TODO_UNKNOWN_TYPE_PermissionStatus'),
        PrototypeCall(constructor='LockManager', fn='query', demands=['LockManager'], returns='TODO_UNKNOWN_TYPE_LockManagerSnapshot'),
    ],
    "ContentIndexEvent": [
        NewCall(constructor='ContentIndexEvent', demands=['str', 'TODO_UNKNOWN_TYPE_ContentIndexEventInit'], returns='ContentIndexEvent'),
    ],
    "EditContext": [
        NewCall(constructor='EditContext', demands=['TODO_UNKNOWN_TYPE_EditContextInit'], returns='EditContext'),
    ],
    "updatetext": [
        PrototypeCall(constructor='EditContext', fn='updateText', demands=['EditContext', 'int', 'int', 'str'], returns='None'),
    ],
    "updateselection": [
        PrototypeCall(constructor='EditContext', fn='updateSelection', demands=['EditContext', 'int', 'int'], returns='None'),
    ],
    "updatecontrolbounds": [
        PrototypeCall(constructor='EditContext', fn='updateControlBounds', demands=['EditContext', 'TODO_UNKNOWN_TYPE_DOMRect'], returns='None'),
    ],
    "updateselectionbounds": [
        PrototypeCall(constructor='EditContext', fn='updateSelectionBounds', demands=['EditContext', 'TODO_UNKNOWN_TYPE_DOMRect'], returns='None'),
    ],
    "updatecharacterbounds": [
        PrototypeCall(constructor='EditContext', fn='updateCharacterBounds', demands=['EditContext', 'int', 'TODO_UNKNOWN_TYPE_DOMRect'], returns='None'),
    ],
    "attachedelements": [
        PrototypeCall(constructor='EditContext', fn='attachedElements', demands=['EditContext'], returns='TODO_UNKNOWN_TYPE_HTMLElement'),
    ],
    "characterbounds": [
        PrototypeCall(constructor='EditContext', fn='characterBounds', demands=['EditContext'], returns='TODO_UNKNOWN_TYPE_DOMRect'),
    ],
    "TextUpdateEvent": [
        NewCall(constructor='TextUpdateEvent', demands=['str', 'TODO_UNKNOWN_TYPE_TextUpdateEventInit'], returns='TextUpdateEvent'),
    ],
    "TextFormat": [
        NewCall(constructor='TextFormat', demands=['TODO_UNKNOWN_TYPE_TextFormatInit'], returns='TextFormat'),
    ],
    "TextFormatUpdateEvent": [
        NewCall(constructor='TextFormatUpdateEvent', demands=['str', 'TODO_UNKNOWN_TYPE_TextFormatUpdateEventInit'], returns='TextFormatUpdateEvent'),
    ],
    "gettextformats": [
        PrototypeCall(constructor='TextFormatUpdateEvent', fn='getTextFormats', demands=['TextFormatUpdateEvent'], returns='TODO_UNKNOWN_TYPE_TextFormat'),
    ],
    "CharacterBoundsUpdateEvent": [
        NewCall(constructor='CharacterBoundsUpdateEvent', demands=['str', 'TODO_UNKNOWN_TYPE_CharacterBoundsUpdateEventInit'], returns='CharacterBoundsUpdateEvent'),
    ],
    "getregions": [
        PrototypeCall(constructor='NamedFlow', fn='getRegions', demands=['NamedFlow'], returns='Element'),
    ],
    "getcontent": [
        PrototypeCall(constructor='NamedFlow', fn='getContent', demands=['NamedFlow'], returns='Node'),
    ],
    "getregionsbycontent": [
        PrototypeCall(constructor='NamedFlow', fn='getRegionsByContent', demands=['NamedFlow', 'Node'], returns='Element'),
    ],
    "": [
        PrototypeCall(constructor='HTMLAllCollection', fn='', demands=['HTMLAllCollection', 'int'], returns='Element'),
        PrototypeCall(constructor='HTMLOptionsCollection', fn='', demands=['HTMLOptionsCollection', 'int', 'TODO_UNKNOWN_TYPE_HTMLOptionElement'], returns='None'),
        PrototypeCall(constructor='DOMStringMap', fn='', demands=['DOMStringMap', 'str'], returns='str'),
        PrototypeCall(constructor='DOMStringMap', fn='', demands=['DOMStringMap', 'str', 'str'], returns='None'),
        PrototypeCall(constructor='DOMStringMap', fn='', demands=['DOMStringMap', 'str'], returns='None'),
        PrototypeCall(constructor='AudioTrackList', fn='', demands=['AudioTrackList', 'int'], returns='TODO_UNKNOWN_TYPE_AudioTrack'),
        PrototypeCall(constructor='VideoTrackList', fn='', demands=['VideoTrackList', 'int'], returns='TODO_UNKNOWN_TYPE_VideoTrack'),
        PrototypeCall(constructor='TextTrackList', fn='', demands=['TextTrackList', 'int'], returns='TODO_UNKNOWN_TYPE_TextTrack'),
        PrototypeCall(constructor='TextTrackCueList', fn='', demands=['TextTrackCueList', 'int'], returns='TODO_UNKNOWN_TYPE_TextTrackCue'),
        PrototypeCall(constructor='HTMLFormElement', fn='', demands=['HTMLFormElement', 'int'], returns='Element'),
        PrototypeCall(constructor='HTMLFormElement', fn='', demands=['HTMLFormElement', 'str'], returns='TODO_UNKNOWN_TYPE_RadioNodeList'),
        PrototypeCall(constructor='HTMLSelectElement', fn='', demands=['HTMLSelectElement', 'int', 'TODO_UNKNOWN_TYPE_HTMLOptionElement'], returns='None'),
        PrototypeCall(constructor='DataTransferItemList', fn='', demands=['DataTransferItemList', 'int'], returns='TODO_UNKNOWN_TYPE_DataTransferItem'),
        PrototypeCall(constructor='Window', fn='', demands=['Window', 'str'], returns='TODO_UNKNOWN_TYPE_object'),
        PrototypeCall(constructor='SourceBufferList', fn='', demands=['SourceBufferList', 'int'], returns='TODO_UNKNOWN_TYPE_SourceBuffer'),
        PrototypeCall(constructor='ImageTrackList', fn='', demands=['ImageTrackList', 'int'], returns='TODO_UNKNOWN_TYPE_ImageTrack'),
        PrototypeCall(constructor='CSSKeyframesRule', fn='', demands=['CSSKeyframesRule', 'int'], returns='TODO_UNKNOWN_TYPE_CSSKeyframeRule'),
        PrototypeCall(constructor='CSSUnparsedValue', fn='', demands=['CSSUnparsedValue', 'int'], returns='TODO_UNKNOWN_TYPE_CSSUnparsedSegment'),
        PrototypeCall(constructor='CSSUnparsedValue', fn='', demands=['CSSUnparsedValue', 'int', 'TODO_UNKNOWN_TYPE_CSSUnparsedSegment'], returns='None'),
        PrototypeCall(constructor='CSSNumericArray', fn='', demands=['CSSNumericArray', 'int'], returns='TODO_UNKNOWN_TYPE_CSSNumericValue'),
        PrototypeCall(constructor='CSSTransformValue', fn='', demands=['CSSTransformValue', 'int'], returns='TODO_UNKNOWN_TYPE_CSSTransformComponent'),
        PrototypeCall(constructor='CSSTransformValue', fn='', demands=['CSSTransformValue', 'int', 'TODO_UNKNOWN_TYPE_CSSTransformComponent'], returns='None'),
        PrototypeCall(constructor='XRInputSourceArray', fn='', demands=['XRInputSourceArray', 'int'], returns='TODO_UNKNOWN_TYPE_XRInputSource'),
        PrototypeCall(constructor='FontFacePalette', fn='', demands=['FontFacePalette', 'int'], returns='str'),
        PrototypeCall(constructor='FontFacePalettes', fn='', demands=['FontFacePalettes', 'int'], returns='TODO_UNKNOWN_TYPE_FontFacePalette'),
        PrototypeCall(constructor='SVGNumberList', fn='', demands=['SVGNumberList', 'int', 'TODO_UNKNOWN_TYPE_SVGNumber'], returns='None'),
        PrototypeCall(constructor='SVGLengthList', fn='', demands=['SVGLengthList', 'int', 'TODO_UNKNOWN_TYPE_SVGLength'], returns='None'),
        PrototypeCall(constructor='SVGStringList', fn='', demands=['SVGStringList', 'int', 'str'], returns='None'),
        PrototypeCall(constructor='SVGTransformList', fn='', demands=['SVGTransformList', 'int', 'TODO_UNKNOWN_TYPE_SVGTransform'], returns='None'),
        PrototypeCall(constructor='SVGPointList', fn='', demands=['SVGPointList', 'int', 'TODO_UNKNOWN_TYPE_DOMPoint'], returns='None'),
    ],
    "nameditem": [
        PrototypeCall(constructor='HTMLAllCollection', fn='namedItem', demands=['HTMLAllCollection', 'str'], returns='TODO_UNKNOWN_TYPE_HTMLCollection'),
        PrototypeCall(constructor='HTMLFormControlsCollection', fn='namedItem', demands=['HTMLFormControlsCollection', 'str'], returns='TODO_UNKNOWN_TYPE_RadioNodeList'),
        PrototypeCall(constructor='HTMLSelectElement', fn='namedItem', demands=['HTMLSelectElement', 'str'], returns='TODO_UNKNOWN_TYPE_HTMLOptionElement'),
        PrototypeCall(constructor='PluginArray', fn='namedItem', demands=['PluginArray', 'str'], returns='TODO_UNKNOWN_TYPE_Plugin'),
        PrototypeCall(constructor='MimeTypeArray', fn='namedItem', demands=['MimeTypeArray', 'str'], returns='TODO_UNKNOWN_TYPE_MimeType'),
        PrototypeCall(constructor='Plugin', fn='namedItem', demands=['Plugin', 'str'], returns='TODO_UNKNOWN_TYPE_MimeType'),
        PrototypeCall(constructor='HTMLCollection', fn='namedItem', demands=['HTMLCollection', 'str'], returns='Element'),
    ],
    "item": [
        PrototypeCall(constructor='HTMLAllCollection', fn='item', demands=['HTMLAllCollection', 'str'], returns='TODO_UNKNOWN_TYPE_HTMLCollection'),
        PrototypeCall(constructor='DOMStringList', fn='item', demands=['DOMStringList', 'int'], returns='str'),
        PrototypeCall(constructor='HTMLSelectElement', fn='item', demands=['HTMLSelectElement', 'int'], returns='TODO_UNKNOWN_TYPE_HTMLOptionElement'),
        PrototypeCall(constructor='PluginArray', fn='item', demands=['PluginArray', 'int'], returns='TODO_UNKNOWN_TYPE_Plugin'),
        PrototypeCall(constructor='MimeTypeArray', fn='item', demands=['MimeTypeArray', 'int'], returns='TODO_UNKNOWN_TYPE_MimeType'),
        PrototypeCall(constructor='Plugin', fn='item', demands=['Plugin', 'int'], returns='TODO_UNKNOWN_TYPE_MimeType'),
        PrototypeCall(constructor='NodeList', fn='item', demands=['NodeList', 'int'], returns='Node'),
        PrototypeCall(constructor='HTMLCollection', fn='item', demands=['HTMLCollection', 'int'], returns='Element'),
        PrototypeCall(constructor='NamedNodeMap', fn='item', demands=['NamedNodeMap', 'int'], returns='TODO_UNKNOWN_TYPE_Attr'),
        PrototypeCall(constructor='DOMTokenList', fn='item', demands=['DOMTokenList', 'int'], returns='str'),
        PrototypeCall(constructor='SpeechRecognitionResult', fn='item', demands=['SpeechRecognitionResult', 'int'], returns='TODO_UNKNOWN_TYPE_SpeechRecognitionAlternative'),
        PrototypeCall(constructor='SpeechRecognitionResultList', fn='item', demands=['SpeechRecognitionResultList', 'int'], returns='TODO_UNKNOWN_TYPE_SpeechRecognitionResult'),
        PrototypeCall(constructor='SpeechGrammarList', fn='item', demands=['SpeechGrammarList', 'int'], returns='TODO_UNKNOWN_TYPE_SpeechGrammar'),
        PrototypeCall(constructor='DOMRectList', fn='item', demands=['DOMRectList', 'int'], returns='TODO_UNKNOWN_TYPE_DOMRect'),
        PrototypeCall(constructor='TouchList', fn='item', demands=['TouchList', 'int'], returns='TODO_UNKNOWN_TYPE_Touch'),
        PrototypeCall(constructor='AnimationNodeList', fn='item', demands=['AnimationNodeList', 'int'], returns='TODO_UNKNOWN_TYPE_AnimationEffect'),
        PrototypeCall(constructor='MediaList', fn='item', demands=['MediaList', 'int'], returns='TODO_UNKNOWN_TYPE_CSSOMString'),
        PrototypeCall(constructor='StyleSheetList', fn='item', demands=['StyleSheetList', 'int'], returns='TODO_UNKNOWN_TYPE_CSSStyleSheet'),
        PrototypeCall(constructor='CSSRuleList', fn='item', demands=['CSSRuleList', 'int'], returns='TODO_UNKNOWN_TYPE_CSSRule'),
        PrototypeCall(constructor='CSSStyleDeclaration', fn='item', demands=['CSSStyleDeclaration', 'int'], returns='TODO_UNKNOWN_TYPE_CSSOMString'),
        PrototypeCall(constructor='FileList', fn='item', demands=['FileList', 'int'], returns='TODO_UNKNOWN_TYPE_File'),
    ],
    "remove": [
        PrototypeCall(constructor='HTMLOptionsCollection', fn='remove', demands=['HTMLOptionsCollection', 'TODO_UNKNOWN_TYPE_long'], returns='None'),
        PrototypeCall(constructor='HTMLSelectElement', fn='remove', demands=['HTMLSelectElement'], returns='None'),
        PrototypeCall(constructor='HTMLSelectElement', fn='remove', demands=['HTMLSelectElement', 'TODO_UNKNOWN_TYPE_long'], returns='None'),
        PrototypeCall(constructor='DataTransferItemList', fn='remove', demands=['DataTransferItemList', 'int'], returns='None'),
        PrototypeCall(constructor='SourceBuffer', fn='remove', demands=['SourceBuffer', 'TODO_UNKNOWN_TYPE_double', 'TODO_UNKNOWN_TYPE_unrestricted double'], returns='None'),
        PrototypeCall(constructor='DOMTokenList', fn='remove', demands=['DOMTokenList', 'str'], returns='None'),
        PrototypeCall(constructor='MediaKeySession', fn='remove', demands=['MediaKeySession'], returns='None'),
    ],
    "contains": [
        PrototypeCall(constructor='DOMStringList', fn='contains', demands=['DOMStringList', 'str'], returns='bool'),
        PrototypeCall(constructor='Node', fn='contains', demands=['Node', 'Node'], returns='bool'),
        PrototypeCall(constructor='DOMTokenList', fn='contains', demands=['DOMTokenList', 'str'], returns='bool'),
    ],
    "HTMLElement": [
        NewCall(constructor='HTMLElement', demands=[], returns='HTMLElement'),
    ],
    "click": [
        PrototypeCall(constructor='HTMLElement', fn='click', demands=['HTMLElement'], returns='None'),
    ],
    "attachinternals": [
        PrototypeCall(constructor='HTMLElement', fn='attachInternals', demands=['HTMLElement'], returns='TODO_UNKNOWN_TYPE_ElementInternals'),
    ],
    "showpopover": [
        PrototypeCall(constructor='HTMLElement', fn='showPopover', demands=['HTMLElement', 'TODO_UNKNOWN_TYPE_ShowPopoverOptions'], returns='None'),
    ],
    "hidepopover": [
        PrototypeCall(constructor='HTMLElement', fn='hidePopover', demands=['HTMLElement'], returns='None'),
    ],
    "togglepopover": [
        PrototypeCall(constructor='HTMLElement', fn='togglePopover', demands=['HTMLElement', 'TODO_UNKNOWN_TYPE_TogglePopoverOptions'], returns='bool'),
    ],
    "HTMLHtmlElement": [
        NewCall(constructor='HTMLHtmlElement', demands=[], returns='HTMLHtmlElement'),
    ],
    "HTMLHeadElement": [
        NewCall(constructor='HTMLHeadElement', demands=[], returns='HTMLHeadElement'),
    ],
    "HTMLTitleElement": [
        NewCall(constructor='HTMLTitleElement', demands=[], returns='HTMLTitleElement'),
    ],
    "HTMLBaseElement": [
        NewCall(constructor='HTMLBaseElement', demands=[], returns='HTMLBaseElement'),
    ],
    "HTMLLinkElement": [
        NewCall(constructor='HTMLLinkElement', demands=[], returns='HTMLLinkElement'),
    ],
    "HTMLMetaElement": [
        NewCall(constructor='HTMLMetaElement', demands=[], returns='HTMLMetaElement'),
    ],
    "HTMLStyleElement": [
        NewCall(constructor='HTMLStyleElement', demands=[], returns='HTMLStyleElement'),
    ],
    "HTMLBodyElement": [
        NewCall(constructor='HTMLBodyElement', demands=[], returns='HTMLBodyElement'),
    ],
    "HTMLHeadingElement": [
        NewCall(constructor='HTMLHeadingElement', demands=[], returns='HTMLHeadingElement'),
    ],
    "HTMLParagraphElement": [
        NewCall(constructor='HTMLParagraphElement', demands=[], returns='HTMLParagraphElement'),
    ],
    "HTMLHRElement": [
        NewCall(constructor='HTMLHRElement', demands=[], returns='HTMLHRElement'),
    ],
    "HTMLPreElement": [
        NewCall(constructor='HTMLPreElement', demands=[], returns='HTMLPreElement'),
    ],
    "HTMLQuoteElement": [
        NewCall(constructor='HTMLQuoteElement', demands=[], returns='HTMLQuoteElement'),
    ],
    "HTMLOListElement": [
        NewCall(constructor='HTMLOListElement', demands=[], returns='HTMLOListElement'),
    ],
    "HTMLUListElement": [
        NewCall(constructor='HTMLUListElement', demands=[], returns='HTMLUListElement'),
    ],
    "HTMLMenuElement": [
        NewCall(constructor='HTMLMenuElement', demands=[], returns='HTMLMenuElement'),
    ],
    "HTMLLIElement": [
        NewCall(constructor='HTMLLIElement', demands=[], returns='HTMLLIElement'),
    ],
    "HTMLDListElement": [
        NewCall(constructor='HTMLDListElement', demands=[], returns='HTMLDListElement'),
    ],
    "HTMLDivElement": [
        NewCall(constructor='HTMLDivElement', demands=[], returns='HTMLDivElement'),
    ],
    "HTMLAnchorElement": [
        NewCall(constructor='HTMLAnchorElement', demands=[], returns='HTMLAnchorElement'),
    ],
    "HTMLDataElement": [
        NewCall(constructor='HTMLDataElement', demands=[], returns='HTMLDataElement'),
    ],
    "HTMLTimeElement": [
        NewCall(constructor='HTMLTimeElement', demands=[], returns='HTMLTimeElement'),
    ],
    "HTMLSpanElement": [
        NewCall(constructor='HTMLSpanElement', demands=[], returns='HTMLSpanElement'),
    ],
    "HTMLBRElement": [
        NewCall(constructor='HTMLBRElement', demands=[], returns='HTMLBRElement'),
    ],
    "HTMLModElement": [
        NewCall(constructor='HTMLModElement', demands=[], returns='HTMLModElement'),
    ],
    "HTMLPictureElement": [
        NewCall(constructor='HTMLPictureElement', demands=[], returns='HTMLPictureElement'),
    ],
    "HTMLSourceElement": [
        NewCall(constructor='HTMLSourceElement', demands=[], returns='HTMLSourceElement'),
    ],
    "HTMLImageElement": [
        NewCall(constructor='HTMLImageElement', demands=[], returns='HTMLImageElement'),
    ],
    "decode": [
        PrototypeCall(constructor='HTMLImageElement', fn='decode', demands=['HTMLImageElement'], returns='None'),
        PrototypeCall(constructor='AudioDecoder', fn='decode', demands=['AudioDecoder', 'TODO_UNKNOWN_TYPE_EncodedAudioChunk'], returns='None'),
        PrototypeCall(constructor='VideoDecoder', fn='decode', demands=['VideoDecoder', 'TODO_UNKNOWN_TYPE_EncodedVideoChunk'], returns='None'),
        PrototypeCall(constructor='ImageDecoder', fn='decode', demands=['ImageDecoder', 'TODO_UNKNOWN_TYPE_ImageDecodeOptions'], returns='TODO_UNKNOWN_TYPE_ImageDecodeResult'),
        PrototypeCall(constructor='TextDecoder', fn='decode', demands=['TextDecoder', 'TODO_UNKNOWN_TYPE_AllowSharedBufferSource', 'TODO_UNKNOWN_TYPE_TextDecodeOptions'], returns='str'),
    ],
    "HTMLIFrameElement": [
        NewCall(constructor='HTMLIFrameElement', demands=[], returns='HTMLIFrameElement'),
    ],
    "getsvgdocument": [
        PrototypeCall(constructor='HTMLIFrameElement', fn='getSVGDocument', demands=['HTMLIFrameElement'], returns='Document'),
        PrototypeCall(constructor='HTMLEmbedElement', fn='getSVGDocument', demands=['HTMLEmbedElement'], returns='Document'),
        PrototypeCall(constructor='HTMLObjectElement', fn='getSVGDocument', demands=['HTMLObjectElement'], returns='Document'),
    ],
    "HTMLEmbedElement": [
        NewCall(constructor='HTMLEmbedElement', demands=[], returns='HTMLEmbedElement'),
    ],
    "HTMLObjectElement": [
        NewCall(constructor='HTMLObjectElement', demands=[], returns='HTMLObjectElement'),
    ],
    "checkvalidity": [
        PrototypeCall(constructor='HTMLObjectElement', fn='checkValidity', demands=['HTMLObjectElement'], returns='bool'),
        PrototypeCall(constructor='HTMLFormElement', fn='checkValidity', demands=['HTMLFormElement'], returns='bool'),
        PrototypeCall(constructor='HTMLInputElement', fn='checkValidity', demands=['HTMLInputElement'], returns='bool'),
        PrototypeCall(constructor='HTMLButtonElement', fn='checkValidity', demands=['HTMLButtonElement'], returns='bool'),
        PrototypeCall(constructor='HTMLSelectElement', fn='checkValidity', demands=['HTMLSelectElement'], returns='bool'),
        PrototypeCall(constructor='HTMLTextAreaElement', fn='checkValidity', demands=['HTMLTextAreaElement'], returns='bool'),
        PrototypeCall(constructor='HTMLOutputElement', fn='checkValidity', demands=['HTMLOutputElement'], returns='bool'),
        PrototypeCall(constructor='HTMLFieldSetElement', fn='checkValidity', demands=['HTMLFieldSetElement'], returns='bool'),
        PrototypeCall(constructor='ElementInternals', fn='checkValidity', demands=['ElementInternals'], returns='bool'),
    ],
    "reportvalidity": [
        PrototypeCall(constructor='HTMLObjectElement', fn='reportValidity', demands=['HTMLObjectElement'], returns='bool'),
        PrototypeCall(constructor='HTMLFormElement', fn='reportValidity', demands=['HTMLFormElement'], returns='bool'),
        PrototypeCall(constructor='HTMLInputElement', fn='reportValidity', demands=['HTMLInputElement'], returns='bool'),
        PrototypeCall(constructor='HTMLButtonElement', fn='reportValidity', demands=['HTMLButtonElement'], returns='bool'),
        PrototypeCall(constructor='HTMLSelectElement', fn='reportValidity', demands=['HTMLSelectElement'], returns='bool'),
        PrototypeCall(constructor='HTMLTextAreaElement', fn='reportValidity', demands=['HTMLTextAreaElement'], returns='bool'),
        PrototypeCall(constructor='HTMLOutputElement', fn='reportValidity', demands=['HTMLOutputElement'], returns='bool'),
        PrototypeCall(constructor='HTMLFieldSetElement', fn='reportValidity', demands=['HTMLFieldSetElement'], returns='bool'),
        PrototypeCall(constructor='ElementInternals', fn='reportValidity', demands=['ElementInternals'], returns='bool'),
    ],
    "setcustomvalidity": [
        PrototypeCall(constructor='HTMLObjectElement', fn='setCustomValidity', demands=['HTMLObjectElement', 'str'], returns='None'),
        PrototypeCall(constructor='HTMLInputElement', fn='setCustomValidity', demands=['HTMLInputElement', 'str'], returns='None'),
        PrototypeCall(constructor='HTMLButtonElement', fn='setCustomValidity', demands=['HTMLButtonElement', 'str'], returns='None'),
        PrototypeCall(constructor='HTMLSelectElement', fn='setCustomValidity', demands=['HTMLSelectElement', 'str'], returns='None'),
        PrototypeCall(constructor='HTMLTextAreaElement', fn='setCustomValidity', demands=['HTMLTextAreaElement', 'str'], returns='None'),
        PrototypeCall(constructor='HTMLOutputElement', fn='setCustomValidity', demands=['HTMLOutputElement', 'str'], returns='None'),
        PrototypeCall(constructor='HTMLFieldSetElement', fn='setCustomValidity', demands=['HTMLFieldSetElement', 'str'], returns='None'),
    ],
    "HTMLVideoElement": [
        NewCall(constructor='HTMLVideoElement', demands=[], returns='HTMLVideoElement'),
    ],
    "HTMLAudioElement": [
        NewCall(constructor='HTMLAudioElement', demands=[], returns='HTMLAudioElement'),
    ],
    "HTMLTrackElement": [
        NewCall(constructor='HTMLTrackElement', demands=[], returns='HTMLTrackElement'),
    ],
    "load": [
        PrototypeCall(constructor='HTMLMediaElement', fn='load', demands=['HTMLMediaElement'], returns='None'),
        PrototypeCall(constructor='MediaKeySession', fn='load', demands=['MediaKeySession', 'str'], returns='bool'),
        PrototypeCall(constructor='FontFace', fn='load', demands=['FontFace'], returns='TODO_UNKNOWN_TYPE_FontFace'),
        PrototypeCall(constructor='FontFaceSet', fn='load', demands=['FontFaceSet', 'TODO_UNKNOWN_TYPE_CSSOMString', 'TODO_UNKNOWN_TYPE_CSSOMString'], returns='TODO_UNKNOWN_TYPE_FontFace'),
    ],
    "canplaytype": [
        PrototypeCall(constructor='HTMLMediaElement', fn='canPlayType', demands=['HTMLMediaElement', 'str'], returns='TODO_UNKNOWN_TYPE_CanPlayTypeResult'),
    ],
    "fastseek": [
        PrototypeCall(constructor='HTMLMediaElement', fn='fastSeek', demands=['HTMLMediaElement', 'TODO_UNKNOWN_TYPE_double'], returns='None'),
    ],
    "getstartdate": [
        PrototypeCall(constructor='HTMLMediaElement', fn='getStartDate', demands=['HTMLMediaElement'], returns='TODO_UNKNOWN_TYPE_object'),
    ],
    "play": [
        PrototypeCall(constructor='HTMLMediaElement', fn='play', demands=['HTMLMediaElement'], returns='None'),
        PrototypeCall(constructor='Animation', fn='play', demands=['Animation'], returns='None'),
    ],
    "pause": [
        PrototypeCall(constructor='HTMLMediaElement', fn='pause', demands=['HTMLMediaElement'], returns='None'),
        PrototypeCall(constructor='MediaRecorder', fn='pause', demands=['MediaRecorder'], returns='None'),
        PrototypeCall(constructor='SpeechSynthesis', fn='pause', demands=['SpeechSynthesis'], returns='None'),
        PrototypeCall(constructor='Animation', fn='pause', demands=['Animation'], returns='None'),
    ],
    "addtexttrack": [
        PrototypeCall(constructor='HTMLMediaElement', fn='addTextTrack', demands=['HTMLMediaElement', 'TODO_UNKNOWN_TYPE_TextTrackKind', 'str', 'str'], returns='TODO_UNKNOWN_TYPE_TextTrack'),
    ],
    "addcue": [
        PrototypeCall(constructor='TextTrack', fn='addCue', demands=['TextTrack', 'TODO_UNKNOWN_TYPE_TextTrackCue'], returns='None'),
    ],
    "removecue": [
        PrototypeCall(constructor='TextTrack', fn='removeCue', demands=['TextTrack', 'TODO_UNKNOWN_TYPE_TextTrackCue'], returns='None'),
    ],
    "getcuebyid": [
        PrototypeCall(constructor='TextTrackCueList', fn='getCueById', demands=['TextTrackCueList', 'str'], returns='TODO_UNKNOWN_TYPE_TextTrackCue'),
    ],
    "start": [
        PrototypeCall(constructor='TimeRanges', fn='start', demands=['TimeRanges', 'int'], returns='TODO_UNKNOWN_TYPE_double'),
        PrototypeCall(constructor='MessagePort', fn='start', demands=['MessagePort'], returns='None'),
        PrototypeCall(constructor='HTMLMarqueeElement', fn='start', demands=['HTMLMarqueeElement'], returns='None'),
        PrototypeCall(constructor='MediaRecorder', fn='start', demands=['MediaRecorder', 'int'], returns='None'),
        PrototypeCall(constructor='Sensor', fn='start', demands=['Sensor'], returns='None'),
        PrototypeCall(constructor='SpeechRecognition', fn='start', demands=['SpeechRecognition'], returns='None'),
        PrototypeCall(constructor='SpeechRecognition', fn='start', demands=['SpeechRecognition', 'TODO_UNKNOWN_TYPE_MediaStreamTrack'], returns='None'),
        PrototypeCall(constructor='PresentationRequest', fn='start', demands=['PresentationRequest'], returns='TODO_UNKNOWN_TYPE_PresentationConnection'),
        PrototypeCall(constructor='IdleDetector', fn='start', demands=['IdleDetector', 'TODO_UNKNOWN_TYPE_IdleOptions'], returns='None'),
        PrototypeCall(constructor='AudioScheduledSourceNode', fn='start', demands=['AudioScheduledSourceNode', 'TODO_UNKNOWN_TYPE_double'], returns='None'),
        PrototypeCall(constructor='AudioBufferSourceNode', fn='start', demands=['AudioBufferSourceNode', 'TODO_UNKNOWN_TYPE_double', 'TODO_UNKNOWN_TYPE_double', 'TODO_UNKNOWN_TYPE_double'], returns='None'),
    ],
    "end": [
        PrototypeCall(constructor='TimeRanges', fn='end', demands=['TimeRanges', 'int'], returns='TODO_UNKNOWN_TYPE_double'),
        PrototypeCall(constructor='GPUComputePassEncoder', fn='end', demands=['GPUComputePassEncoder'], returns='None'),
        PrototypeCall(constructor='GPURenderPassEncoder', fn='end', demands=['GPURenderPassEncoder'], returns='None'),
        PrototypeCall(constructor='XRSession', fn='end', demands=['XRSession'], returns='None'),
    ],
    "TrackEvent": [
        NewCall(constructor='TrackEvent', demands=['str', 'TODO_UNKNOWN_TYPE_TrackEventInit'], returns='TrackEvent'),
    ],
    "HTMLMapElement": [
        NewCall(constructor='HTMLMapElement', demands=[], returns='HTMLMapElement'),
    ],
    "HTMLAreaElement": [
        NewCall(constructor='HTMLAreaElement', demands=[], returns='HTMLAreaElement'),
    ],
    "HTMLTableElement": [
        NewCall(constructor='HTMLTableElement', demands=[], returns='HTMLTableElement'),
    ],
    "createcaption": [
        PrototypeCall(constructor='HTMLTableElement', fn='createCaption', demands=['HTMLTableElement'], returns='TODO_UNKNOWN_TYPE_HTMLTableCaptionElement'),
    ],
    "deletecaption": [
        PrototypeCall(constructor='HTMLTableElement', fn='deleteCaption', demands=['HTMLTableElement'], returns='None'),
    ],
    "createthead": [
        PrototypeCall(constructor='HTMLTableElement', fn='createTHead', demands=['HTMLTableElement'], returns='TODO_UNKNOWN_TYPE_HTMLTableSectionElement'),
    ],
    "deletethead": [
        PrototypeCall(constructor='HTMLTableElement', fn='deleteTHead', demands=['HTMLTableElement'], returns='None'),
    ],
    "createtfoot": [
        PrototypeCall(constructor='HTMLTableElement', fn='createTFoot', demands=['HTMLTableElement'], returns='TODO_UNKNOWN_TYPE_HTMLTableSectionElement'),
    ],
    "deletetfoot": [
        PrototypeCall(constructor='HTMLTableElement', fn='deleteTFoot', demands=['HTMLTableElement'], returns='None'),
    ],
    "createtbody": [
        PrototypeCall(constructor='HTMLTableElement', fn='createTBody', demands=['HTMLTableElement'], returns='TODO_UNKNOWN_TYPE_HTMLTableSectionElement'),
    ],
    "insertrow": [
        PrototypeCall(constructor='HTMLTableElement', fn='insertRow', demands=['HTMLTableElement', 'TODO_UNKNOWN_TYPE_long'], returns='TODO_UNKNOWN_TYPE_HTMLTableRowElement'),
        PrototypeCall(constructor='HTMLTableSectionElement', fn='insertRow', demands=['HTMLTableSectionElement', 'TODO_UNKNOWN_TYPE_long'], returns='TODO_UNKNOWN_TYPE_HTMLTableRowElement'),
    ],
    "deleterow": [
        PrototypeCall(constructor='HTMLTableElement', fn='deleteRow', demands=['HTMLTableElement', 'TODO_UNKNOWN_TYPE_long'], returns='None'),
        PrototypeCall(constructor='HTMLTableSectionElement', fn='deleteRow', demands=['HTMLTableSectionElement', 'TODO_UNKNOWN_TYPE_long'], returns='None'),
    ],
    "HTMLTableCaptionElement": [
        NewCall(constructor='HTMLTableCaptionElement', demands=[], returns='HTMLTableCaptionElement'),
    ],
    "HTMLTableColElement": [
        NewCall(constructor='HTMLTableColElement', demands=[], returns='HTMLTableColElement'),
    ],
    "HTMLTableSectionElement": [
        NewCall(constructor='HTMLTableSectionElement', demands=[], returns='HTMLTableSectionElement'),
    ],
    "HTMLTableRowElement": [
        NewCall(constructor='HTMLTableRowElement', demands=[], returns='HTMLTableRowElement'),
    ],
    "insertcell": [
        PrototypeCall(constructor='HTMLTableRowElement', fn='insertCell', demands=['HTMLTableRowElement', 'TODO_UNKNOWN_TYPE_long'], returns='TODO_UNKNOWN_TYPE_HTMLTableCellElement'),
    ],
    "deletecell": [
        PrototypeCall(constructor='HTMLTableRowElement', fn='deleteCell', demands=['HTMLTableRowElement', 'TODO_UNKNOWN_TYPE_long'], returns='None'),
    ],
    "HTMLTableCellElement": [
        NewCall(constructor='HTMLTableCellElement', demands=[], returns='HTMLTableCellElement'),
    ],
    "HTMLFormElement": [
        NewCall(constructor='HTMLFormElement', demands=[], returns='HTMLFormElement'),
    ],
    "submit": [
        PrototypeCall(constructor='HTMLFormElement', fn='submit', demands=['HTMLFormElement'], returns='None'),
        PrototypeCall(constructor='GPUQueue', fn='submit', demands=['GPUQueue', 'TODO_UNKNOWN_TYPE_GPUCommandBuffer'], returns='None'),
    ],
    "requestsubmit": [
        PrototypeCall(constructor='HTMLFormElement', fn='requestSubmit', demands=['HTMLFormElement', 'TODO_UNKNOWN_TYPE_HTMLElement'], returns='None'),
    ],
    "reset": [
        PrototypeCall(constructor='HTMLFormElement', fn='reset', demands=['HTMLFormElement'], returns='None'),
        PrototypeCall(constructor='AudioDecoder', fn='reset', demands=['AudioDecoder'], returns='None'),
        PrototypeCall(constructor='VideoDecoder', fn='reset', demands=['VideoDecoder'], returns='None'),
        PrototypeCall(constructor='AudioEncoder', fn='reset', demands=['AudioEncoder'], returns='None'),
        PrototypeCall(constructor='VideoEncoder', fn='reset', demands=['VideoEncoder'], returns='None'),
        PrototypeCall(constructor='ImageDecoder', fn='reset', demands=['ImageDecoder'], returns='None'),
        PrototypeCall(constructor='XSLTProcessor', fn='reset', demands=['XSLTProcessor'], returns='None'),
        PrototypeCall(constructor='USBDevice', fn='reset', demands=['USBDevice'], returns='None'),
        PrototypeCall(constructor='GamepadHapticActuator', fn='reset', demands=['GamepadHapticActuator'], returns='TODO_UNKNOWN_TYPE_GamepadHapticsResult'),
    ],
    "HTMLLabelElement": [
        NewCall(constructor='HTMLLabelElement', demands=[], returns='HTMLLabelElement'),
    ],
    "HTMLInputElement": [
        NewCall(constructor='HTMLInputElement', demands=[], returns='HTMLInputElement'),
    ],
    "stepup": [
        PrototypeCall(constructor='HTMLInputElement', fn='stepUp', demands=['HTMLInputElement', 'TODO_UNKNOWN_TYPE_long'], returns='None'),
    ],
    "stepdown": [
        PrototypeCall(constructor='HTMLInputElement', fn='stepDown', demands=['HTMLInputElement', 'TODO_UNKNOWN_TYPE_long'], returns='None'),
    ],
    "select": [
        PrototypeCall(constructor='HTMLInputElement', fn='select', demands=['HTMLInputElement'], returns='None'),
        PrototypeCall(constructor='HTMLTextAreaElement', fn='select', demands=['HTMLTextAreaElement'], returns='None'),
        PrototypeCall(constructor='ContactsManager', fn='select', demands=['ContactsManager', 'TODO_UNKNOWN_TYPE_ContactProperty', 'TODO_UNKNOWN_TYPE_ContactsSelectOptions'], returns='TODO_UNKNOWN_TYPE_ContactInfo'),
    ],
    "setrangetext": [
        PrototypeCall(constructor='HTMLInputElement', fn='setRangeText', demands=['HTMLInputElement', 'str'], returns='None'),
        PrototypeCall(constructor='HTMLInputElement', fn='setRangeText', demands=['HTMLInputElement', 'str', 'int', 'int', 'TODO_UNKNOWN_TYPE_SelectionMode'], returns='None'),
        PrototypeCall(constructor='HTMLTextAreaElement', fn='setRangeText', demands=['HTMLTextAreaElement', 'str'], returns='None'),
        PrototypeCall(constructor='HTMLTextAreaElement', fn='setRangeText', demands=['HTMLTextAreaElement', 'str', 'int', 'int', 'TODO_UNKNOWN_TYPE_SelectionMode'], returns='None'),
    ],
    "setselectionrange": [
        PrototypeCall(constructor='HTMLInputElement', fn='setSelectionRange', demands=['HTMLInputElement', 'int', 'int', 'str'], returns='None'),
        PrototypeCall(constructor='HTMLTextAreaElement', fn='setSelectionRange', demands=['HTMLTextAreaElement', 'int', 'int', 'str'], returns='None'),
    ],
    "showpicker": [
        PrototypeCall(constructor='HTMLInputElement', fn='showPicker', demands=['HTMLInputElement'], returns='None'),
        PrototypeCall(constructor='HTMLSelectElement', fn='showPicker', demands=['HTMLSelectElement'], returns='None'),
    ],
    "HTMLButtonElement": [
        NewCall(constructor='HTMLButtonElement', demands=[], returns='HTMLButtonElement'),
    ],
    "HTMLSelectElement": [
        NewCall(constructor='HTMLSelectElement', demands=[], returns='HTMLSelectElement'),
    ],
    "HTMLDataListElement": [
        NewCall(constructor='HTMLDataListElement', demands=[], returns='HTMLDataListElement'),
    ],
    "HTMLOptGroupElement": [
        NewCall(constructor='HTMLOptGroupElement', demands=[], returns='HTMLOptGroupElement'),
    ],
    "HTMLOptionElement": [
        NewCall(constructor='HTMLOptionElement', demands=[], returns='HTMLOptionElement'),
    ],
    "HTMLTextAreaElement": [
        NewCall(constructor='HTMLTextAreaElement', demands=[], returns='HTMLTextAreaElement'),
    ],
    "HTMLOutputElement": [
        NewCall(constructor='HTMLOutputElement', demands=[], returns='HTMLOutputElement'),
    ],
    "HTMLProgressElement": [
        NewCall(constructor='HTMLProgressElement', demands=[], returns='HTMLProgressElement'),
    ],
    "HTMLMeterElement": [
        NewCall(constructor='HTMLMeterElement', demands=[], returns='HTMLMeterElement'),
    ],
    "HTMLFieldSetElement": [
        NewCall(constructor='HTMLFieldSetElement', demands=[], returns='HTMLFieldSetElement'),
    ],
    "HTMLLegendElement": [
        NewCall(constructor='HTMLLegendElement', demands=[], returns='HTMLLegendElement'),
    ],
    "HTMLSelectedContentElement": [
        NewCall(constructor='HTMLSelectedContentElement', demands=[], returns='HTMLSelectedContentElement'),
    ],
    "SubmitEvent": [
        NewCall(constructor='SubmitEvent', demands=['str', 'TODO_UNKNOWN_TYPE_SubmitEventInit'], returns='SubmitEvent'),
    ],
    "FormDataEvent": [
        NewCall(constructor='FormDataEvent', demands=['str', 'TODO_UNKNOWN_TYPE_FormDataEventInit'], returns='FormDataEvent'),
    ],
    "HTMLDetailsElement": [
        NewCall(constructor='HTMLDetailsElement', demands=[], returns='HTMLDetailsElement'),
    ],
    "HTMLDialogElement": [
        NewCall(constructor='HTMLDialogElement', demands=[], returns='HTMLDialogElement'),
    ],
    "showmodal": [
        PrototypeCall(constructor='HTMLDialogElement', fn='showModal', demands=['HTMLDialogElement'], returns='None'),
    ],
    "requestclose": [
        PrototypeCall(constructor='HTMLDialogElement', fn='requestClose', demands=['HTMLDialogElement', 'str'], returns='None'),
        PrototypeCall(constructor='CloseWatcher', fn='requestClose', demands=['CloseWatcher'], returns='None'),
    ],
    "HTMLScriptElement": [
        NewCall(constructor='HTMLScriptElement', demands=[], returns='HTMLScriptElement'),
    ],
    "HTMLTemplateElement": [
        NewCall(constructor='HTMLTemplateElement', demands=[], returns='HTMLTemplateElement'),
    ],
    "HTMLSlotElement": [
        NewCall(constructor='HTMLSlotElement', demands=[], returns='HTMLSlotElement'),
    ],
    "assignednodes": [
        PrototypeCall(constructor='HTMLSlotElement', fn='assignedNodes', demands=['HTMLSlotElement', 'TODO_UNKNOWN_TYPE_AssignedNodesOptions'], returns='Node'),
    ],
    "assignedelements": [
        PrototypeCall(constructor='HTMLSlotElement', fn='assignedElements', demands=['HTMLSlotElement', 'TODO_UNKNOWN_TYPE_AssignedNodesOptions'], returns='Element'),
    ],
    "assign": [
        PrototypeCall(constructor='HTMLSlotElement', fn='assign', demands=['HTMLSlotElement', 'Element'], returns='None'),
        PrototypeCall(constructor='Location', fn='assign', demands=['Location', 'str'], returns='None'),
    ],
    "HTMLCanvasElement": [
        NewCall(constructor='HTMLCanvasElement', demands=[], returns='HTMLCanvasElement'),
    ],
    "getcontext": [
        PrototypeCall(constructor='HTMLCanvasElement', fn='getContext', demands=['HTMLCanvasElement', 'str', '*'], returns='TODO_UNKNOWN_TYPE_RenderingContext'),
        PrototypeCall(constructor='OffscreenCanvas', fn='getContext', demands=['OffscreenCanvas', 'TODO_UNKNOWN_TYPE_OffscreenRenderingContextId', '*'], returns='TODO_UNKNOWN_TYPE_OffscreenRenderingContext'),
    ],
    "todataurl": [
        PrototypeCall(constructor='HTMLCanvasElement', fn='toDataURL', demands=['HTMLCanvasElement', 'str', '*'], returns='str'),
    ],
    "toblob": [
        PrototypeCall(constructor='HTMLCanvasElement', fn='toBlob', demands=['HTMLCanvasElement', 'TODO_UNKNOWN_TYPE_BlobCallback', 'str', '*'], returns='None'),
    ],
    "transfercontroltooffscreen": [
        PrototypeCall(constructor='HTMLCanvasElement', fn='transferControlToOffscreen', demands=['HTMLCanvasElement'], returns='TODO_UNKNOWN_TYPE_OffscreenCanvas'),
    ],
    "addcolorstop": [
        PrototypeCall(constructor='CanvasGradient', fn='addColorStop', demands=['CanvasGradient', 'TODO_UNKNOWN_TYPE_double', 'str'], returns='None'),
    ],
    "settransform": [
        PrototypeCall(constructor='CanvasPattern', fn='setTransform', demands=['CanvasPattern', 'TODO_UNKNOWN_TYPE_DOMMatrix2DInit'], returns='None'),
    ],
    "Path2D": [
        NewCall(constructor='Path2D', demands=['TODO_UNKNOWN_TYPE_Path2D'], returns='Path2D'),
    ],
    "addpath": [
        PrototypeCall(constructor='Path2D', fn='addPath', demands=['Path2D', 'TODO_UNKNOWN_TYPE_Path2D', 'TODO_UNKNOWN_TYPE_DOMMatrix2DInit'], returns='None'),
    ],
    "transferfromimagebitmap": [
        PrototypeCall(constructor='ImageBitmapRenderingContext', fn='transferFromImageBitmap', demands=['ImageBitmapRenderingContext', 'TODO_UNKNOWN_TYPE_ImageBitmap'], returns='None'),
    ],
    "OffscreenCanvas": [
        NewCall(constructor='OffscreenCanvas', demands=['TODO_UNKNOWN_TYPE_unsigned long long', 'TODO_UNKNOWN_TYPE_unsigned long long'], returns='OffscreenCanvas'),
    ],
    "transfertoimagebitmap": [
        PrototypeCall(constructor='OffscreenCanvas', fn='transferToImageBitmap', demands=['OffscreenCanvas'], returns='TODO_UNKNOWN_TYPE_ImageBitmap'),
    ],
    "converttoblob": [
        PrototypeCall(constructor='OffscreenCanvas', fn='convertToBlob', demands=['OffscreenCanvas', 'TODO_UNKNOWN_TYPE_ImageEncodeOptions'], returns='TODO_UNKNOWN_TYPE_Blob'),
    ],
    "CustomElementRegistry": [
        NewCall(constructor='CustomElementRegistry', demands=[], returns='CustomElementRegistry'),
    ],
    "define": [
        PrototypeCall(constructor='CustomElementRegistry', fn='define', demands=['CustomElementRegistry', 'str', 'TODO_UNKNOWN_TYPE_CustomElementConstructor', 'TODO_UNKNOWN_TYPE_ElementDefinitionOptions'], returns='None'),
    ],
    "getname": [
        PrototypeCall(constructor='CustomElementRegistry', fn='getName', demands=['CustomElementRegistry', 'TODO_UNKNOWN_TYPE_CustomElementConstructor'], returns='str'),
    ],
    "whendefined": [
        PrototypeCall(constructor='CustomElementRegistry', fn='whenDefined', demands=['CustomElementRegistry', 'str'], returns='TODO_UNKNOWN_TYPE_CustomElementConstructor'),
    ],
    "upgrade": [
        PrototypeCall(constructor='CustomElementRegistry', fn='upgrade', demands=['CustomElementRegistry', 'Node'], returns='None'),
    ],
    "initialize": [
        PrototypeCall(constructor='CustomElementRegistry', fn='initialize', demands=['CustomElementRegistry', 'Node'], returns='None'),
        PrototypeCall(constructor='SVGNumberList', fn='initialize', demands=['SVGNumberList', 'TODO_UNKNOWN_TYPE_SVGNumber'], returns='TODO_UNKNOWN_TYPE_SVGNumber'),
        PrototypeCall(constructor='SVGLengthList', fn='initialize', demands=['SVGLengthList', 'TODO_UNKNOWN_TYPE_SVGLength'], returns='TODO_UNKNOWN_TYPE_SVGLength'),
        PrototypeCall(constructor='SVGStringList', fn='initialize', demands=['SVGStringList', 'str'], returns='str'),
        PrototypeCall(constructor='SVGTransformList', fn='initialize', demands=['SVGTransformList', 'TODO_UNKNOWN_TYPE_SVGTransform'], returns='TODO_UNKNOWN_TYPE_SVGTransform'),
        PrototypeCall(constructor='SVGPointList', fn='initialize', demands=['SVGPointList', 'TODO_UNKNOWN_TYPE_DOMPoint'], returns='TODO_UNKNOWN_TYPE_DOMPoint'),
    ],
    "setformvalue": [
        PrototypeCall(constructor='ElementInternals', fn='setFormValue', demands=['ElementInternals', 'TODO_UNKNOWN_TYPE_File', 'TODO_UNKNOWN_TYPE_File'], returns='None'),
    ],
    "setvalidity": [
        PrototypeCall(constructor='ElementInternals', fn='setValidity', demands=['ElementInternals', 'TODO_UNKNOWN_TYPE_ValidityStateFlags', 'str', 'TODO_UNKNOWN_TYPE_HTMLElement'], returns='None'),
    ],
    "ToggleEvent": [
        NewCall(constructor='ToggleEvent', demands=['str', 'TODO_UNKNOWN_TYPE_ToggleEventInit'], returns='ToggleEvent'),
    ],
    "CommandEvent": [
        NewCall(constructor='CommandEvent', demands=['str', 'TODO_UNKNOWN_TYPE_CommandEventInit'], returns='CommandEvent'),
    ],
    "CloseWatcher": [
        NewCall(constructor='CloseWatcher', demands=['TODO_UNKNOWN_TYPE_CloseWatcherOptions'], returns='CloseWatcher'),
    ],
    "DataTransfer": [
        NewCall(constructor='DataTransfer', demands=[], returns='DataTransfer'),
    ],
    "setdragimage": [
        PrototypeCall(constructor='DataTransfer', fn='setDragImage', demands=['DataTransfer', 'Element', 'TODO_UNKNOWN_TYPE_long', 'TODO_UNKNOWN_TYPE_long'], returns='None'),
    ],
    "getdata": [
        PrototypeCall(constructor='DataTransfer', fn='getData', demands=['DataTransfer', 'str'], returns='str'),
    ],
    "setdata": [
        PrototypeCall(constructor='DataTransfer', fn='setData', demands=['DataTransfer', 'str', 'str'], returns='None'),
    ],
    "cleardata": [
        PrototypeCall(constructor='DataTransfer', fn='clearData', demands=['DataTransfer', 'str'], returns='None'),
    ],
    "getasstring": [
        PrototypeCall(constructor='DataTransferItem', fn='getAsString', demands=['DataTransferItem', 'TODO_UNKNOWN_TYPE_FunctionStringCallback'], returns='None'),
    ],
    "getasfile": [
        PrototypeCall(constructor='DataTransferItem', fn='getAsFile', demands=['DataTransferItem'], returns='TODO_UNKNOWN_TYPE_File'),
    ],
    "DragEvent": [
        NewCall(constructor='DragEvent', demands=['str', 'TODO_UNKNOWN_TYPE_DragEventInit'], returns='DragEvent'),
    ],
    "focus": [
        PrototypeCall(constructor='Window', fn='focus', demands=['Window'], returns='None'),
        PrototypeCall(constructor='WindowClient', fn='focus', demands=['WindowClient'], returns='TODO_UNKNOWN_TYPE_WindowClient'),
    ],
    "blur": [
        PrototypeCall(constructor='Window', fn='blur', demands=['Window'], returns='None'),
    ],
    "alert": [
        PrototypeCall(constructor='Window', fn='alert', demands=['Window'], returns='None'),
        PrototypeCall(constructor='Window', fn='alert', demands=['Window', 'str'], returns='None'),
    ],
    "confirm": [
        PrototypeCall(constructor='Window', fn='confirm', demands=['Window', 'str'], returns='bool'),
    ],
    "prompt": [
        PrototypeCall(constructor='Window', fn='prompt', demands=['Window', 'str', 'str'], returns='str'),
        PrototypeCall(constructor='BeforeInstallPromptEvent', fn='prompt', demands=['BeforeInstallPromptEvent'], returns='TODO_UNKNOWN_TYPE_PromptResponseObject'),
        PrototypeCall(constructor='RemotePlayback', fn='prompt', demands=['RemotePlayback'], returns='None'),
    ],
    "print": [
        PrototypeCall(constructor='Window', fn='print', demands=['Window'], returns='None'),
    ],
    "postmessage": [
        PrototypeCall(constructor='Window', fn='postMessage', demands=['Window', '*', 'str', 'TODO_UNKNOWN_TYPE_object'], returns='None'),
        PrototypeCall(constructor='Window', fn='postMessage', demands=['Window', '*', 'TODO_UNKNOWN_TYPE_WindowPostMessageOptions'], returns='None'),
        PrototypeCall(constructor='MessagePort', fn='postMessage', demands=['MessagePort', '*', 'TODO_UNKNOWN_TYPE_object'], returns='None'),
        PrototypeCall(constructor='MessagePort', fn='postMessage', demands=['MessagePort', '*', 'TODO_UNKNOWN_TYPE_StructuredSerializeOptions'], returns='None'),
        PrototypeCall(constructor='BroadcastChannel', fn='postMessage', demands=['BroadcastChannel', '*'], returns='None'),
        PrototypeCall(constructor='DedicatedWorkerGlobalScope', fn='postMessage', demands=['DedicatedWorkerGlobalScope', '*', 'TODO_UNKNOWN_TYPE_object'], returns='None'),
        PrototypeCall(constructor='DedicatedWorkerGlobalScope', fn='postMessage', demands=['DedicatedWorkerGlobalScope', '*', 'TODO_UNKNOWN_TYPE_StructuredSerializeOptions'], returns='None'),
        PrototypeCall(constructor='Worker', fn='postMessage', demands=['Worker', '*', 'TODO_UNKNOWN_TYPE_object'], returns='None'),
        PrototypeCall(constructor='Worker', fn='postMessage', demands=['Worker', '*', 'TODO_UNKNOWN_TYPE_StructuredSerializeOptions'], returns='None'),
        PrototypeCall(constructor='HTMLPortalElement', fn='postMessage', demands=['HTMLPortalElement', '*', 'TODO_UNKNOWN_TYPE_StructuredSerializeOptions'], returns='None'),
        PrototypeCall(constructor='PortalHost', fn='postMessage', demands=['PortalHost', '*', 'TODO_UNKNOWN_TYPE_StructuredSerializeOptions'], returns='None'),
        PrototypeCall(constructor='ServiceWorker', fn='postMessage', demands=['ServiceWorker', '*', 'TODO_UNKNOWN_TYPE_object'], returns='None'),
        PrototypeCall(constructor='ServiceWorker', fn='postMessage', demands=['ServiceWorker', '*', 'TODO_UNKNOWN_TYPE_StructuredSerializeOptions'], returns='None'),
        PrototypeCall(constructor='Client', fn='postMessage', demands=['Client', '*', 'TODO_UNKNOWN_TYPE_object'], returns='None'),
        PrototypeCall(constructor='Client', fn='postMessage', demands=['Client', '*', 'TODO_UNKNOWN_TYPE_StructuredSerializeOptions'], returns='None'),
    ],
    "replace": [
        PrototypeCall(constructor='Location', fn='replace', demands=['Location', 'str'], returns='None'),
        PrototypeCall(constructor='DOMTokenList', fn='replace', demands=['DOMTokenList', 'str', 'str'], returns='bool'),
        PrototypeCall(constructor='CSSStyleSheet', fn='replace', demands=['CSSStyleSheet', 'str'], returns='TODO_UNKNOWN_TYPE_CSSStyleSheet'),
    ],
    "reload": [
        PrototypeCall(constructor='Location', fn='reload', demands=['Location'], returns='None'),
        PrototypeCall(constructor='Navigation', fn='reload', demands=['Navigation', 'TODO_UNKNOWN_TYPE_NavigationReloadOptions'], returns='TODO_UNKNOWN_TYPE_NavigationResult'),
    ],
    "go": [
        PrototypeCall(constructor='History', fn='go', demands=['History', 'TODO_UNKNOWN_TYPE_long'], returns='None'),
    ],
    "back": [
        PrototypeCall(constructor='History', fn='back', demands=['History'], returns='None'),
        PrototypeCall(constructor='Navigation', fn='back', demands=['Navigation', 'TODO_UNKNOWN_TYPE_NavigationOptions'], returns='TODO_UNKNOWN_TYPE_NavigationResult'),
    ],
    "forward": [
        PrototypeCall(constructor='History', fn='forward', demands=['History'], returns='None'),
        PrototypeCall(constructor='Navigation', fn='forward', demands=['Navigation', 'TODO_UNKNOWN_TYPE_NavigationOptions'], returns='TODO_UNKNOWN_TYPE_NavigationResult'),
    ],
    "pushstate": [
        PrototypeCall(constructor='History', fn='pushState', demands=['History', '*', 'str', 'str'], returns='None'),
    ],
    "replacestate": [
        PrototypeCall(constructor='History', fn='replaceState', demands=['History', '*', 'str', 'str'], returns='None'),
    ],
    "entries": [
        PrototypeCall(constructor='Navigation', fn='entries', demands=['Navigation'], returns='TODO_UNKNOWN_TYPE_NavigationHistoryEntry'),
    ],
    "updatecurrententry": [
        PrototypeCall(constructor='Navigation', fn='updateCurrentEntry', demands=['Navigation', 'TODO_UNKNOWN_TYPE_NavigationUpdateCurrentEntryOptions'], returns='None'),
    ],
    "navigate": [
        PrototypeCall(constructor='Navigation', fn='navigate', demands=['Navigation', 'str', 'TODO_UNKNOWN_TYPE_NavigationNavigateOptions'], returns='TODO_UNKNOWN_TYPE_NavigationResult'),
        PrototypeCall(constructor='WindowClient', fn='navigate', demands=['WindowClient', 'str'], returns='TODO_UNKNOWN_TYPE_WindowClient'),
    ],
    "traverseto": [
        PrototypeCall(constructor='Navigation', fn='traverseTo', demands=['Navigation', 'str', 'TODO_UNKNOWN_TYPE_NavigationOptions'], returns='TODO_UNKNOWN_TYPE_NavigationResult'),
    ],
    "getstate": [
        PrototypeCall(constructor='NavigationHistoryEntry', fn='getState', demands=['NavigationHistoryEntry'], returns='*'),
        PrototypeCall(constructor='NavigationDestination', fn='getState', demands=['NavigationDestination'], returns='*'),
        PrototypeCall(constructor='NavigationPreloadManager', fn='getState', demands=['NavigationPreloadManager'], returns='TODO_UNKNOWN_TYPE_NavigationPreloadState'),
    ],
    "NavigateEvent": [
        NewCall(constructor='NavigateEvent', demands=['str', 'TODO_UNKNOWN_TYPE_NavigateEventInit'], returns='NavigateEvent'),
    ],
    "intercept": [
        PrototypeCall(constructor='NavigateEvent', fn='intercept', demands=['NavigateEvent', 'TODO_UNKNOWN_TYPE_NavigationInterceptOptions'], returns='None'),
    ],
    "scroll": [
        PrototypeCall(constructor='NavigateEvent', fn='scroll', demands=['NavigateEvent'], returns='None'),
    ],
    "NavigationCurrentEntryChangeEvent": [
        NewCall(constructor='NavigationCurrentEntryChangeEvent', demands=['str', 'TODO_UNKNOWN_TYPE_NavigationCurrentEntryChangeEventInit'], returns='NavigationCurrentEntryChangeEvent'),
    ],
    "PopStateEvent": [
        NewCall(constructor='PopStateEvent', demands=['str', 'TODO_UNKNOWN_TYPE_PopStateEventInit'], returns='PopStateEvent'),
    ],
    "HashChangeEvent": [
        NewCall(constructor='HashChangeEvent', demands=['str', 'TODO_UNKNOWN_TYPE_HashChangeEventInit'], returns='HashChangeEvent'),
    ],
    "PageSwapEvent": [
        NewCall(constructor='PageSwapEvent', demands=['str', 'TODO_UNKNOWN_TYPE_PageSwapEventInit'], returns='PageSwapEvent'),
    ],
    "PageRevealEvent": [
        NewCall(constructor='PageRevealEvent', demands=['str', 'TODO_UNKNOWN_TYPE_PageRevealEventInit'], returns='PageRevealEvent'),
    ],
    "PageTransitionEvent": [
        NewCall(constructor='PageTransitionEvent', demands=['str', 'TODO_UNKNOWN_TYPE_PageTransitionEventInit'], returns='PageTransitionEvent'),
    ],
    "ErrorEvent": [
        NewCall(constructor='ErrorEvent', demands=['str', 'TODO_UNKNOWN_TYPE_ErrorEventInit'], returns='ErrorEvent'),
    ],
    "PromiseRejectionEvent": [
        NewCall(constructor='PromiseRejectionEvent', demands=['str', 'TODO_UNKNOWN_TYPE_PromiseRejectionEventInit'], returns='PromiseRejectionEvent'),
    ],
    "DOMParser": [
        NewCall(constructor='DOMParser', demands=[], returns='DOMParser'),
    ],
    "parsefromstring": [
        PrototypeCall(constructor='DOMParser', fn='parseFromString', demands=['DOMParser', 'TODO_UNKNOWN_TYPE_TrustedHTML', 'TODO_UNKNOWN_TYPE_DOMParserSupportedType'], returns='Document'),
    ],
    "XMLSerializer": [
        NewCall(constructor='XMLSerializer', demands=[], returns='XMLSerializer'),
    ],
    "serializetostring": [
        PrototypeCall(constructor='XMLSerializer', fn='serializeToString', demands=['XMLSerializer', 'Node'], returns='str'),
    ],
    "refresh": [
        PrototypeCall(constructor='PluginArray', fn='refresh', demands=['PluginArray'], returns='None'),
    ],
    "ImageData": [
        NewCall(constructor='ImageData', demands=['int', 'int', 'TODO_UNKNOWN_TYPE_ImageDataSettings'], returns='ImageData'),
        NewCall(constructor='ImageData', demands=['TODO_UNKNOWN_TYPE_ImageDataArray', 'int', 'int', 'TODO_UNKNOWN_TYPE_ImageDataSettings'], returns='ImageData'),
    ],
    "MessageEvent": [
        NewCall(constructor='MessageEvent', demands=['str', 'TODO_UNKNOWN_TYPE_MessageEventInit'], returns='MessageEvent'),
    ],
    "initmessageevent": [
        PrototypeCall(constructor='MessageEvent', fn='initMessageEvent', demands=['MessageEvent', 'str', 'bool', 'bool', '*', 'str', 'str', 'TODO_UNKNOWN_TYPE_MessageEventSource', 'TODO_UNKNOWN_TYPE_MessagePort'], returns='None'),
    ],
    "EventSource": [
        NewCall(constructor='EventSource', demands=['str', 'TODO_UNKNOWN_TYPE_EventSourceInit'], returns='EventSource'),
    ],
    "MessageChannel": [
        NewCall(constructor='MessageChannel', demands=[], returns='MessageChannel'),
    ],
    "BroadcastChannel": [
        NewCall(constructor='BroadcastChannel', demands=['str'], returns='BroadcastChannel'),
    ],
    "importscripts": [
        PrototypeCall(constructor='WorkerGlobalScope', fn='importScripts', demands=['WorkerGlobalScope', 'TODO_UNKNOWN_TYPE_TrustedScriptURL'], returns='None'),
    ],
    "Worker": [
        NewCall(constructor='Worker', demands=['TODO_UNKNOWN_TYPE_TrustedScriptURL', 'TODO_UNKNOWN_TYPE_WorkerOptions'], returns='Worker'),
    ],
    "terminate": [
        PrototypeCall(constructor='Worker', fn='terminate', demands=['Worker'], returns='None'),
        PrototypeCall(constructor='PresentationConnection', fn='terminate', demands=['PresentationConnection'], returns='None'),
        PrototypeCall(constructor='TransformStreamDefaultController', fn='terminate', demands=['TransformStreamDefaultController'], returns='None'),
    ],
    "SharedWorker": [
        NewCall(constructor='SharedWorker', demands=['TODO_UNKNOWN_TYPE_TrustedScriptURL', 'str'], returns='SharedWorker'),
    ],
    "addmodule": [
        PrototypeCall(constructor='Worklet', fn='addModule', demands=['Worklet', 'str', 'TODO_UNKNOWN_TYPE_WorkletOptions'], returns='None'),
    ],
    "key": [
        PrototypeCall(constructor='Storage', fn='key', demands=['Storage', 'int'], returns='str'),
    ],
    "getitem": [
        PrototypeCall(constructor='Storage', fn='getItem', demands=['Storage', 'str'], returns='str'),
        PrototypeCall(constructor='SVGNumberList', fn='getItem', demands=['SVGNumberList', 'int'], returns='TODO_UNKNOWN_TYPE_SVGNumber'),
        PrototypeCall(constructor='SVGLengthList', fn='getItem', demands=['SVGLengthList', 'int'], returns='TODO_UNKNOWN_TYPE_SVGLength'),
        PrototypeCall(constructor='SVGStringList', fn='getItem', demands=['SVGStringList', 'int'], returns='str'),
        PrototypeCall(constructor='SVGTransformList', fn='getItem', demands=['SVGTransformList', 'int'], returns='TODO_UNKNOWN_TYPE_SVGTransform'),
        PrototypeCall(constructor='SVGPointList', fn='getItem', demands=['SVGPointList', 'int'], returns='TODO_UNKNOWN_TYPE_DOMPoint'),
    ],
    "setitem": [
        PrototypeCall(constructor='Storage', fn='setItem', demands=['Storage', 'str', 'str'], returns='None'),
    ],
    "removeitem": [
        PrototypeCall(constructor='Storage', fn='removeItem', demands=['Storage', 'str'], returns='None'),
        PrototypeCall(constructor='SVGNumberList', fn='removeItem', demands=['SVGNumberList', 'int'], returns='TODO_UNKNOWN_TYPE_SVGNumber'),
        PrototypeCall(constructor='SVGLengthList', fn='removeItem', demands=['SVGLengthList', 'int'], returns='TODO_UNKNOWN_TYPE_SVGLength'),
        PrototypeCall(constructor='SVGStringList', fn='removeItem', demands=['SVGStringList', 'int'], returns='str'),
        PrototypeCall(constructor='SVGTransformList', fn='removeItem', demands=['SVGTransformList', 'int'], returns='TODO_UNKNOWN_TYPE_SVGTransform'),
        PrototypeCall(constructor='SVGPointList', fn='removeItem', demands=['SVGPointList', 'int'], returns='TODO_UNKNOWN_TYPE_DOMPoint'),
    ],
    "StorageEvent": [
        NewCall(constructor='StorageEvent', demands=['str', 'TODO_UNKNOWN_TYPE_StorageEventInit'], returns='StorageEvent'),
    ],
    "initstorageevent": [
        PrototypeCall(constructor='StorageEvent', fn='initStorageEvent', demands=['StorageEvent', 'str', 'bool', 'bool', 'str', 'str', 'str', 'str', 'TODO_UNKNOWN_TYPE_Storage'], returns='None'),
    ],
    "HTMLMarqueeElement": [
        NewCall(constructor='HTMLMarqueeElement', demands=[], returns='HTMLMarqueeElement'),
    ],
    "HTMLFrameSetElement": [
        NewCall(constructor='HTMLFrameSetElement', demands=[], returns='HTMLFrameSetElement'),
    ],
    "HTMLFrameElement": [
        NewCall(constructor='HTMLFrameElement', demands=[], returns='HTMLFrameElement'),
    ],
    "HTMLDirectoryElement": [
        NewCall(constructor='HTMLDirectoryElement', demands=[], returns='HTMLDirectoryElement'),
    ],
    "HTMLFontElement": [
        NewCall(constructor='HTMLFontElement', demands=[], returns='HTMLFontElement'),
    ],
    "HTMLParamElement": [
        NewCall(constructor='HTMLParamElement', demands=[], returns='HTMLParamElement'),
    ],
    "addsearchprovider": [
        PrototypeCall(constructor='External', fn='AddSearchProvider', demands=['External'], returns='None'),
    ],
    "issearchproviderinstalled": [
        PrototypeCall(constructor='External', fn='IsSearchProviderInstalled', demands=['External'], returns='None'),
    ],
    "FaceDetector": [
        NewCall(constructor='FaceDetector', demands=['TODO_UNKNOWN_TYPE_FaceDetectorOptions'], returns='FaceDetector'),
    ],
    "BarcodeDetector": [
        NewCall(constructor='BarcodeDetector', demands=['TODO_UNKNOWN_TYPE_BarcodeDetectorOptions'], returns='BarcodeDetector'),
    ],
    "getsupportedformats": [
        DirectCall(fn='getSupportedFormats', receiver='BarcodeDetector', demands=[], returns='TODO_UNKNOWN_TYPE_BarcodeFormat'),
    ],
    "MediaSource": [
        NewCall(constructor='MediaSource', demands=[], returns='MediaSource'),
    ],
    "addsourcebuffer": [
        PrototypeCall(constructor='MediaSource', fn='addSourceBuffer', demands=['MediaSource', 'str'], returns='TODO_UNKNOWN_TYPE_SourceBuffer'),
    ],
    "removesourcebuffer": [
        PrototypeCall(constructor='MediaSource', fn='removeSourceBuffer', demands=['MediaSource', 'TODO_UNKNOWN_TYPE_SourceBuffer'], returns='None'),
    ],
    "endofstream": [
        PrototypeCall(constructor='MediaSource', fn='endOfStream', demands=['MediaSource', 'TODO_UNKNOWN_TYPE_EndOfStreamError'], returns='None'),
    ],
    "setliveseekablerange": [
        PrototypeCall(constructor='MediaSource', fn='setLiveSeekableRange', demands=['MediaSource', 'TODO_UNKNOWN_TYPE_double', 'TODO_UNKNOWN_TYPE_double'], returns='None'),
    ],
    "clearliveseekablerange": [
        PrototypeCall(constructor='MediaSource', fn='clearLiveSeekableRange', demands=['MediaSource'], returns='None'),
    ],
    "istypesupported": [
        DirectCall(fn='isTypeSupported', receiver='MediaSource', demands=['str'], returns='bool'),
        DirectCall(fn='isTypeSupported', receiver='ImageDecoder', demands=['str'], returns='bool'),
        DirectCall(fn='isTypeSupported', receiver='MediaRecorder', demands=['str'], returns='bool'),
    ],
    "appendbuffer": [
        PrototypeCall(constructor='SourceBuffer', fn='appendBuffer', demands=['SourceBuffer', 'TODO_UNKNOWN_TYPE_BufferSource'], returns='None'),
    ],
    "changetype": [
        PrototypeCall(constructor='SourceBuffer', fn='changeType', demands=['SourceBuffer', 'str'], returns='None'),
    ],
    "ManagedMediaSource": [
        NewCall(constructor='ManagedMediaSource', demands=[], returns='ManagedMediaSource'),
    ],
    "BufferedChangeEvent": [
        NewCall(constructor='BufferedChangeEvent', demands=['str', 'TODO_UNKNOWN_TYPE_BufferedChangeEventInit'], returns='BufferedChangeEvent'),
    ],
    "request": [
        PrototypeCall(constructor='WakeLock', fn='request', demands=['WakeLock', 'TODO_UNKNOWN_TYPE_WakeLockType'], returns='TODO_UNKNOWN_TYPE_WakeLockSentinel'),
        PrototypeCall(constructor='LockManager', fn='request', demands=['LockManager', 'str', 'TODO_UNKNOWN_TYPE_LockGrantedCallback'], returns='*'),
        PrototypeCall(constructor='LockManager', fn='request', demands=['LockManager', 'str', 'TODO_UNKNOWN_TYPE_LockOptions', 'TODO_UNKNOWN_TYPE_LockGrantedCallback'], returns='*'),
    ],
    "release": [
        PrototypeCall(constructor='WakeLockSentinel', fn='release', demands=['WakeLockSentinel'], returns='None'),
    ],
    "Magnetometer": [
        NewCall(constructor='Magnetometer', demands=['TODO_UNKNOWN_TYPE_MagnetometerSensorOptions'], returns='Magnetometer'),
    ],
    "UncalibratedMagnetometer": [
        NewCall(constructor='UncalibratedMagnetometer', demands=['TODO_UNKNOWN_TYPE_MagnetometerSensorOptions'], returns='UncalibratedMagnetometer'),
    ],
    "TransitionEvent": [
        NewCall(constructor='TransitionEvent', demands=['TODO_UNKNOWN_TYPE_CSSOMString', 'TODO_UNKNOWN_TYPE_TransitionEventInit'], returns='TransitionEvent'),
    ],
    "Profiler": [
        NewCall(constructor='Profiler', demands=['TODO_UNKNOWN_TYPE_ProfilerInitOptions'], returns='Profiler'),
    ],
    "MIDIMessageEvent": [
        NewCall(constructor='MIDIMessageEvent', demands=['str', 'TODO_UNKNOWN_TYPE_MIDIMessageEventInit'], returns='MIDIMessageEvent'),
    ],
    "MIDIConnectionEvent": [
        NewCall(constructor='MIDIConnectionEvent', demands=['str', 'TODO_UNKNOWN_TYPE_MIDIConnectionEventInit'], returns='MIDIConnectionEvent'),
    ],
    "WebSocket": [
        NewCall(constructor='WebSocket', demands=['str', 'str'], returns='WebSocket'),
    ],
    "CloseEvent": [
        NewCall(constructor='CloseEvent', demands=['str', 'TODO_UNKNOWN_TYPE_CloseEventInit'], returns='CloseEvent'),
    ],
    "cropto": [
        PrototypeCall(constructor='BrowserCaptureMediaStreamTrack', fn='cropTo', demands=['BrowserCaptureMediaStreamTrack', 'TODO_UNKNOWN_TYPE_CropTarget'], returns='None'),
    ],
    "AudioDecoder": [
        NewCall(constructor='AudioDecoder', demands=['TODO_UNKNOWN_TYPE_AudioDecoderInit'], returns='AudioDecoder'),
    ],
    "configure": [
        PrototypeCall(constructor='AudioDecoder', fn='configure', demands=['AudioDecoder', 'TODO_UNKNOWN_TYPE_AudioDecoderConfig'], returns='None'),
        PrototypeCall(constructor='VideoDecoder', fn='configure', demands=['VideoDecoder', 'TODO_UNKNOWN_TYPE_VideoDecoderConfig'], returns='None'),
        PrototypeCall(constructor='AudioEncoder', fn='configure', demands=['AudioEncoder', 'TODO_UNKNOWN_TYPE_AudioEncoderConfig'], returns='None'),
        PrototypeCall(constructor='VideoEncoder', fn='configure', demands=['VideoEncoder', 'TODO_UNKNOWN_TYPE_VideoEncoderConfig'], returns='None'),
        PrototypeCall(constructor='GPUCanvasContext', fn='configure', demands=['GPUCanvasContext', 'TODO_UNKNOWN_TYPE_GPUCanvasConfiguration'], returns='None'),
    ],
    "isconfigsupported": [
        DirectCall(fn='isConfigSupported', receiver='AudioDecoder', demands=['TODO_UNKNOWN_TYPE_AudioDecoderConfig'], returns='TODO_UNKNOWN_TYPE_AudioDecoderSupport'),
        DirectCall(fn='isConfigSupported', receiver='VideoDecoder', demands=['TODO_UNKNOWN_TYPE_VideoDecoderConfig'], returns='TODO_UNKNOWN_TYPE_VideoDecoderSupport'),
        DirectCall(fn='isConfigSupported', receiver='AudioEncoder', demands=['TODO_UNKNOWN_TYPE_AudioEncoderConfig'], returns='TODO_UNKNOWN_TYPE_AudioEncoderSupport'),
        DirectCall(fn='isConfigSupported', receiver='VideoEncoder', demands=['TODO_UNKNOWN_TYPE_VideoEncoderConfig'], returns='TODO_UNKNOWN_TYPE_VideoEncoderSupport'),
    ],
    "VideoDecoder": [
        NewCall(constructor='VideoDecoder', demands=['TODO_UNKNOWN_TYPE_VideoDecoderInit'], returns='VideoDecoder'),
    ],
    "AudioEncoder": [
        NewCall(constructor='AudioEncoder', demands=['TODO_UNKNOWN_TYPE_AudioEncoderInit'], returns='AudioEncoder'),
    ],
    "encode": [
        PrototypeCall(constructor='AudioEncoder', fn='encode', demands=['AudioEncoder', 'TODO_UNKNOWN_TYPE_AudioData'], returns='None'),
        PrototypeCall(constructor='VideoEncoder', fn='encode', demands=['VideoEncoder', 'TODO_UNKNOWN_TYPE_VideoFrame', 'TODO_UNKNOWN_TYPE_VideoEncoderEncodeOptions'], returns='None'),
        PrototypeCall(constructor='TextEncoder', fn='encode', demands=['TextEncoder', 'str'], returns='TODO_UNKNOWN_TYPE_Uint8Array'),
    ],
    "VideoEncoder": [
        NewCall(constructor='VideoEncoder', demands=['TODO_UNKNOWN_TYPE_VideoEncoderInit'], returns='VideoEncoder'),
    ],
    "EncodedAudioChunk": [
        NewCall(constructor='EncodedAudioChunk', demands=['TODO_UNKNOWN_TYPE_EncodedAudioChunkInit'], returns='EncodedAudioChunk'),
    ],
    "copyto": [
        PrototypeCall(constructor='EncodedAudioChunk', fn='copyTo', demands=['EncodedAudioChunk', 'TODO_UNKNOWN_TYPE_AllowSharedBufferSource'], returns='None'),
        PrototypeCall(constructor='EncodedVideoChunk', fn='copyTo', demands=['EncodedVideoChunk', 'TODO_UNKNOWN_TYPE_AllowSharedBufferSource'], returns='None'),
        PrototypeCall(constructor='AudioData', fn='copyTo', demands=['AudioData', 'TODO_UNKNOWN_TYPE_AllowSharedBufferSource', 'TODO_UNKNOWN_TYPE_AudioDataCopyToOptions'], returns='None'),
        PrototypeCall(constructor='VideoFrame', fn='copyTo', demands=['VideoFrame', 'TODO_UNKNOWN_TYPE_AllowSharedBufferSource', 'TODO_UNKNOWN_TYPE_VideoFrameCopyToOptions'], returns='TODO_UNKNOWN_TYPE_PlaneLayout'),
    ],
    "EncodedVideoChunk": [
        NewCall(constructor='EncodedVideoChunk', demands=['TODO_UNKNOWN_TYPE_EncodedVideoChunkInit'], returns='EncodedVideoChunk'),
    ],
    "AudioData": [
        NewCall(constructor='AudioData', demands=['TODO_UNKNOWN_TYPE_AudioDataInit'], returns='AudioData'),
    ],
    "allocationsize": [
        PrototypeCall(constructor='AudioData', fn='allocationSize', demands=['AudioData', 'TODO_UNKNOWN_TYPE_AudioDataCopyToOptions'], returns='int'),
        PrototypeCall(constructor='VideoFrame', fn='allocationSize', demands=['VideoFrame', 'TODO_UNKNOWN_TYPE_VideoFrameCopyToOptions'], returns='int'),
    ],
    "VideoFrame": [
        NewCall(constructor='VideoFrame', demands=['TODO_UNKNOWN_TYPE_CanvasImageSource', 'TODO_UNKNOWN_TYPE_VideoFrameInit'], returns='VideoFrame'),
        NewCall(constructor='VideoFrame', demands=['TODO_UNKNOWN_TYPE_AllowSharedBufferSource', 'TODO_UNKNOWN_TYPE_VideoFrameBufferInit'], returns='VideoFrame'),
    ],
    "metadata": [
        PrototypeCall(constructor='VideoFrame', fn='metadata', demands=['VideoFrame'], returns='TODO_UNKNOWN_TYPE_VideoFrameMetadata'),
    ],
    "VideoColorSpace": [
        NewCall(constructor='VideoColorSpace', demands=['TODO_UNKNOWN_TYPE_VideoColorSpaceInit'], returns='VideoColorSpace'),
    ],
    "ImageDecoder": [
        NewCall(constructor='ImageDecoder', demands=['TODO_UNKNOWN_TYPE_ImageDecoderInit'], returns='ImageDecoder'),
    ],
    "getdevices": [
        PrototypeCall(constructor='HID', fn='getDevices', demands=['HID'], returns='TODO_UNKNOWN_TYPE_HIDDevice'),
        PrototypeCall(constructor='Bluetooth', fn='getDevices', demands=['Bluetooth'], returns='TODO_UNKNOWN_TYPE_BluetoothDevice'),
        PrototypeCall(constructor='USB', fn='getDevices', demands=['USB'], returns='TODO_UNKNOWN_TYPE_USBDevice'),
    ],
    "requestdevice": [
        PrototypeCall(constructor='HID', fn='requestDevice', demands=['HID', 'TODO_UNKNOWN_TYPE_HIDDeviceRequestOptions'], returns='TODO_UNKNOWN_TYPE_HIDDevice'),
        PrototypeCall(constructor='Bluetooth', fn='requestDevice', demands=['Bluetooth', 'TODO_UNKNOWN_TYPE_RequestDeviceOptions'], returns='TODO_UNKNOWN_TYPE_BluetoothDevice'),
        PrototypeCall(constructor='USB', fn='requestDevice', demands=['USB', 'TODO_UNKNOWN_TYPE_USBDeviceRequestOptions'], returns='TODO_UNKNOWN_TYPE_USBDevice'),
        PrototypeCall(constructor='GPUAdapter', fn='requestDevice', demands=['GPUAdapter', 'TODO_UNKNOWN_TYPE_GPUDeviceDescriptor'], returns='TODO_UNKNOWN_TYPE_GPUDevice'),
    ],
    "sendreport": [
        PrototypeCall(constructor='HIDDevice', fn='sendReport', demands=['HIDDevice', 'TODO_UNKNOWN_TYPE_octet', 'TODO_UNKNOWN_TYPE_BufferSource'], returns='None'),
    ],
    "sendfeaturereport": [
        PrototypeCall(constructor='HIDDevice', fn='sendFeatureReport', demands=['HIDDevice', 'TODO_UNKNOWN_TYPE_octet', 'TODO_UNKNOWN_TYPE_BufferSource'], returns='None'),
    ],
    "receivefeaturereport": [
        PrototypeCall(constructor='HIDDevice', fn='receiveFeatureReport', demands=['HIDDevice', 'TODO_UNKNOWN_TYPE_octet'], returns='TODO_UNKNOWN_TYPE_DataView'),
    ],
    "HIDConnectionEvent": [
        NewCall(constructor='HIDConnectionEvent', demands=['str', 'TODO_UNKNOWN_TYPE_HIDConnectionEventInit'], returns='HIDConnectionEvent'),
    ],
    "HIDInputReportEvent": [
        NewCall(constructor='HIDInputReportEvent', demands=['str', 'TODO_UNKNOWN_TYPE_HIDInputReportEventInit'], returns='HIDInputReportEvent'),
    ],
    "lock": [
        PrototypeCall(constructor='Keyboard', fn='lock', demands=['Keyboard', 'str'], returns='None'),
        PrototypeCall(constructor='ScreenOrientation', fn='lock', demands=['ScreenOrientation', 'TODO_UNKNOWN_TYPE_OrientationLockType'], returns='None'),
    ],
    "unlock": [
        PrototypeCall(constructor='Keyboard', fn='unlock', demands=['Keyboard'], returns='None'),
        PrototypeCall(constructor='ScreenOrientation', fn='unlock', demands=['ScreenOrientation'], returns='None'),
    ],
    "create": [
        DirectCall(fn='create', receiver='Summarizer', demands=['TODO_UNKNOWN_TYPE_SummarizerCreateOptions'], returns='TODO_UNKNOWN_TYPE_Summarizer'),
        DirectCall(fn='create', receiver='Writer', demands=['TODO_UNKNOWN_TYPE_WriterCreateOptions'], returns='TODO_UNKNOWN_TYPE_Writer'),
        DirectCall(fn='create', receiver='Rewriter', demands=['TODO_UNKNOWN_TYPE_RewriterCreateOptions'], returns='TODO_UNKNOWN_TYPE_Rewriter'),
        PrototypeCall(constructor='CredentialsContainer', fn='create', demands=['CredentialsContainer', 'TODO_UNKNOWN_TYPE_CredentialCreationOptions'], returns='TODO_UNKNOWN_TYPE_Credential'),
        DirectCall(fn='create', receiver='Translator', demands=['TODO_UNKNOWN_TYPE_TranslatorCreateOptions'], returns='TODO_UNKNOWN_TYPE_Translator'),
        DirectCall(fn='create', receiver='LanguageDetector', demands=['TODO_UNKNOWN_TYPE_LanguageDetectorCreateOptions'], returns='TODO_UNKNOWN_TYPE_LanguageDetector'),
    ],
    "availability": [
        DirectCall(fn='availability', receiver='Summarizer', demands=['TODO_UNKNOWN_TYPE_SummarizerCreateCoreOptions'], returns='TODO_UNKNOWN_TYPE_Availability'),
        DirectCall(fn='availability', receiver='Writer', demands=['TODO_UNKNOWN_TYPE_WriterCreateCoreOptions'], returns='TODO_UNKNOWN_TYPE_Availability'),
        DirectCall(fn='availability', receiver='Rewriter', demands=['TODO_UNKNOWN_TYPE_RewriterCreateCoreOptions'], returns='TODO_UNKNOWN_TYPE_Availability'),
        DirectCall(fn='availability', receiver='Translator', demands=['TODO_UNKNOWN_TYPE_TranslatorCreateCoreOptions'], returns='TODO_UNKNOWN_TYPE_Availability'),
        DirectCall(fn='availability', receiver='LanguageDetector', demands=['TODO_UNKNOWN_TYPE_LanguageDetectorCreateCoreOptions'], returns='TODO_UNKNOWN_TYPE_Availability'),
    ],
    "summarize": [
        PrototypeCall(constructor='Summarizer', fn='summarize', demands=['Summarizer', 'str', 'TODO_UNKNOWN_TYPE_SummarizerSummarizeOptions'], returns='str'),
    ],
    "summarizestreaming": [
        PrototypeCall(constructor='Summarizer', fn='summarizeStreaming', demands=['Summarizer', 'str', 'TODO_UNKNOWN_TYPE_SummarizerSummarizeOptions'], returns='TODO_UNKNOWN_TYPE_ReadableStream'),
    ],
    "measureinputusage": [
        PrototypeCall(constructor='Summarizer', fn='measureInputUsage', demands=['Summarizer', 'str', 'TODO_UNKNOWN_TYPE_SummarizerSummarizeOptions'], returns='TODO_UNKNOWN_TYPE_double'),
        PrototypeCall(constructor='Writer', fn='measureInputUsage', demands=['Writer', 'str', 'TODO_UNKNOWN_TYPE_WriterWriteOptions'], returns='TODO_UNKNOWN_TYPE_double'),
        PrototypeCall(constructor='Rewriter', fn='measureInputUsage', demands=['Rewriter', 'str', 'TODO_UNKNOWN_TYPE_RewriterRewriteOptions'], returns='TODO_UNKNOWN_TYPE_double'),
        PrototypeCall(constructor='Translator', fn='measureInputUsage', demands=['Translator', 'str', 'TODO_UNKNOWN_TYPE_TranslatorTranslateOptions'], returns='TODO_UNKNOWN_TYPE_double'),
        PrototypeCall(constructor='LanguageDetector', fn='measureInputUsage', demands=['LanguageDetector', 'str', 'TODO_UNKNOWN_TYPE_LanguageDetectorDetectOptions'], returns='TODO_UNKNOWN_TYPE_double'),
    ],
    "writestreaming": [
        PrototypeCall(constructor='Writer', fn='writeStreaming', demands=['Writer', 'str', 'TODO_UNKNOWN_TYPE_WriterWriteOptions'], returns='TODO_UNKNOWN_TYPE_ReadableStream'),
    ],
    "rewrite": [
        PrototypeCall(constructor='Rewriter', fn='rewrite', demands=['Rewriter', 'str', 'TODO_UNKNOWN_TYPE_RewriterRewriteOptions'], returns='str'),
    ],
    "rewritestreaming": [
        PrototypeCall(constructor='Rewriter', fn='rewriteStreaming', demands=['Rewriter', 'str', 'TODO_UNKNOWN_TYPE_RewriterRewriteOptions'], returns='TODO_UNKNOWN_TYPE_ReadableStream'),
    ],
    "HTMLPortalElement": [
        NewCall(constructor='HTMLPortalElement', demands=[], returns='HTMLPortalElement'),
    ],
    "activate": [
        PrototypeCall(constructor='HTMLPortalElement', fn='activate', demands=['HTMLPortalElement', 'TODO_UNKNOWN_TYPE_PortalActivateOptions'], returns='None'),
    ],
    "PortalActivateEvent": [
        NewCall(constructor='PortalActivateEvent', demands=['str', 'TODO_UNKNOWN_TYPE_PortalActivateEventInit'], returns='PortalActivateEvent'),
    ],
    "adoptpredecessor": [
        PrototypeCall(constructor='PortalActivateEvent', fn='adoptPredecessor', demands=['PortalActivateEvent'], returns='TODO_UNKNOWN_TYPE_HTMLPortalElement'),
    ],
    "RTCIdentityAssertion": [
        NewCall(constructor='RTCIdentityAssertion', demands=['str', 'str'], returns='RTCIdentityAssertion'),
    ],
    "losecontext": [
        PrototypeCall(constructor='WEBGL_lose_context', fn='loseContext', demands=['WEBGL_lose_context'], returns='None'),
    ],
    "restorecontext": [
        PrototypeCall(constructor='WEBGL_lose_context', fn='restoreContext', demands=['WEBGL_lose_context'], returns='None'),
    ],
    "setstddeviation": [
        PrototypeCall(constructor='SVGFEDropShadowElement', fn='setStdDeviation', demands=['SVGFEDropShadowElement', 'TODO_UNKNOWN_TYPE_float', 'TODO_UNKNOWN_TYPE_float'], returns='None'),
        PrototypeCall(constructor='SVGFEGaussianBlurElement', fn='setStdDeviation', demands=['SVGFEGaussianBlurElement', 'TODO_UNKNOWN_TYPE_float', 'TODO_UNKNOWN_TYPE_float'], returns='None'),
    ],
    "decodinginfo": [
        PrototypeCall(constructor='MediaCapabilities', fn='decodingInfo', demands=['MediaCapabilities', 'TODO_UNKNOWN_TYPE_MediaDecodingConfiguration'], returns='TODO_UNKNOWN_TYPE_MediaCapabilitiesDecodingInfo'),
    ],
    "encodinginfo": [
        PrototypeCall(constructor='MediaCapabilities', fn='encodingInfo', demands=['MediaCapabilities', 'TODO_UNKNOWN_TYPE_MediaEncodingConfiguration'], returns='TODO_UNKNOWN_TYPE_MediaCapabilitiesEncodingInfo'),
    ],
    "MediaStreamTrackProcessor": [
        NewCall(constructor='MediaStreamTrackProcessor', demands=['TODO_UNKNOWN_TYPE_MediaStreamTrackProcessorInit'], returns='MediaStreamTrackProcessor'),
    ],
    "VideoTrackGenerator": [
        NewCall(constructor='VideoTrackGenerator', demands=[], returns='VideoTrackGenerator'),
    ],
    "PointerEvent": [
        NewCall(constructor='PointerEvent', demands=['str', 'TODO_UNKNOWN_TYPE_PointerEventInit'], returns='PointerEvent'),
    ],
    "getcoalescedevents": [
        PrototypeCall(constructor='PointerEvent', fn='getCoalescedEvents', demands=['PointerEvent'], returns='TODO_UNKNOWN_TYPE_PointerEvent'),
    ],
    "getpredictedevents": [
        PrototypeCall(constructor='PointerEvent', fn='getPredictedEvents', demands=['PointerEvent'], returns='TODO_UNKNOWN_TYPE_PointerEvent'),
    ],
    "gettotallength": [
        PrototypeCall(constructor='SVGPathElement', fn='getTotalLength', demands=['SVGPathElement'], returns='TODO_UNKNOWN_TYPE_float'),
        PrototypeCall(constructor='SVGGeometryElement', fn='getTotalLength', demands=['SVGGeometryElement'], returns='TODO_UNKNOWN_TYPE_float'),
    ],
    "getpointatlength": [
        PrototypeCall(constructor='SVGPathElement', fn='getPointAtLength', demands=['SVGPathElement', 'TODO_UNKNOWN_TYPE_float'], returns='TODO_UNKNOWN_TYPE_DOMPoint'),
        PrototypeCall(constructor='SVGGeometryElement', fn='getPointAtLength', demands=['SVGGeometryElement', 'TODO_UNKNOWN_TYPE_float'], returns='TODO_UNKNOWN_TYPE_DOMPoint'),
    ],
    "getpathsegmentatlength": [
        PrototypeCall(constructor='SVGPathElement', fn='getPathSegmentAtLength', demands=['SVGPathElement', 'TODO_UNKNOWN_TYPE_float'], returns='TODO_UNKNOWN_TYPE_SVGPathSegment'),
    ],
    "QuotaExceededError": [
        NewCall(constructor='QuotaExceededError', demands=['str', 'TODO_UNKNOWN_TYPE_QuotaExceededErrorOptions'], returns='QuotaExceededError'),
    ],
    "DOMException": [
        NewCall(constructor='DOMException', demands=['str', 'str'], returns='DOMException'),
    ],
    "multidrawarraysinstancedbaseinstancewebgl": [
        PrototypeCall(constructor='WEBGL_multi_draw_instanced_base_vertex_base_instance', fn='multiDrawArraysInstancedBaseInstanceWEBGL', demands=['WEBGL_multi_draw_instanced_base_vertex_base_instance', 'TODO_UNKNOWN_TYPE_GLenum', 'TODO_UNKNOWN_TYPE_Int32Array', 'TODO_UNKNOWN_TYPE_unsigned long long', 'TODO_UNKNOWN_TYPE_Int32Array', 'TODO_UNKNOWN_TYPE_unsigned long long', 'TODO_UNKNOWN_TYPE_Int32Array', 'TODO_UNKNOWN_TYPE_unsigned long long', 'TODO_UNKNOWN_TYPE_Uint32Array', 'TODO_UNKNOWN_TYPE_unsigned long long', 'TODO_UNKNOWN_TYPE_GLsizei'], returns='None'),
    ],
    "multidrawelementsinstancedbasevertexbaseinstancewebgl": [
        PrototypeCall(constructor='WEBGL_multi_draw_instanced_base_vertex_base_instance', fn='multiDrawElementsInstancedBaseVertexBaseInstanceWEBGL', demands=['WEBGL_multi_draw_instanced_base_vertex_base_instance', 'TODO_UNKNOWN_TYPE_GLenum', 'TODO_UNKNOWN_TYPE_Int32Array', 'TODO_UNKNOWN_TYPE_unsigned long long', 'TODO_UNKNOWN_TYPE_GLenum', 'TODO_UNKNOWN_TYPE_Int32Array', 'TODO_UNKNOWN_TYPE_unsigned long long', 'TODO_UNKNOWN_TYPE_Int32Array', 'TODO_UNKNOWN_TYPE_unsigned long long', 'TODO_UNKNOWN_TYPE_Int32Array', 'TODO_UNKNOWN_TYPE_unsigned long long', 'TODO_UNKNOWN_TYPE_Uint32Array', 'TODO_UNKNOWN_TYPE_unsigned long long', 'TODO_UNKNOWN_TYPE_GLsizei'], returns='None'),
    ],
    "IdentityCredentialError": [
        NewCall(constructor='IdentityCredentialError', demands=['str', 'TODO_UNKNOWN_TYPE_IdentityCredentialErrorInit'], returns='IdentityCredentialError'),
    ],
    "getuserinfo": [
        DirectCall(fn='getUserInfo', receiver='IdentityProvider', demands=['TODO_UNKNOWN_TYPE_IdentityProviderConfig'], returns='TODO_UNKNOWN_TYPE_IdentityUserInfo'),
    ],
    "TextDecoder": [
        NewCall(constructor='TextDecoder', demands=['str', 'TODO_UNKNOWN_TYPE_TextDecoderOptions'], returns='TextDecoder'),
    ],
    "TextEncoder": [
        NewCall(constructor='TextEncoder', demands=[], returns='TextEncoder'),
    ],
    "encodeinto": [
        PrototypeCall(constructor='TextEncoder', fn='encodeInto', demands=['TextEncoder', 'str', 'TODO_UNKNOWN_TYPE_Uint8Array'], returns='TODO_UNKNOWN_TYPE_TextEncoderEncodeIntoResult'),
    ],
    "TextDecoderStream": [
        NewCall(constructor='TextDecoderStream', demands=['str', 'TODO_UNKNOWN_TYPE_TextDecoderOptions'], returns='TextDecoderStream'),
    ],
    "TextEncoderStream": [
        NewCall(constructor='TextEncoderStream', demands=[], returns='TextEncoderStream'),
    ],
    "AnimationEvent": [
        NewCall(constructor='AnimationEvent', demands=['TODO_UNKNOWN_TYPE_CSSOMString', 'TODO_UNKNOWN_TYPE_AnimationEventInit'], returns='AnimationEvent'),
    ],
    "appendrule": [
        PrototypeCall(constructor='CSSKeyframesRule', fn='appendRule', demands=['CSSKeyframesRule', 'TODO_UNKNOWN_TYPE_CSSOMString'], returns='None'),
    ],
    "deleterule": [
        PrototypeCall(constructor='CSSKeyframesRule', fn='deleteRule', demands=['CSSKeyframesRule', 'TODO_UNKNOWN_TYPE_CSSOMString'], returns='None'),
        PrototypeCall(constructor='CSSStyleSheet', fn='deleteRule', demands=['CSSStyleSheet', 'int'], returns='None'),
        PrototypeCall(constructor='CSSGroupingRule', fn='deleteRule', demands=['CSSGroupingRule', 'int'], returns='None'),
    ],
    "findrule": [
        PrototypeCall(constructor='CSSKeyframesRule', fn='findRule', demands=['CSSKeyframesRule', 'TODO_UNKNOWN_TYPE_CSSOMString'], returns='TODO_UNKNOWN_TYPE_CSSKeyframeRule'),
    ],
    "XRWebGLBinding": [
        NewCall(constructor='XRWebGLBinding', demands=['TODO_UNKNOWN_TYPE_XRSession', 'TODO_UNKNOWN_TYPE_XRWebGLRenderingContext'], returns='XRWebGLBinding'),
    ],
    "createprojectionlayer": [
        PrototypeCall(constructor='XRWebGLBinding', fn='createProjectionLayer', demands=['XRWebGLBinding', 'TODO_UNKNOWN_TYPE_XRProjectionLayerInit'], returns='TODO_UNKNOWN_TYPE_XRProjectionLayer'),
    ],
    "createquadlayer": [
        PrototypeCall(constructor='XRWebGLBinding', fn='createQuadLayer', demands=['XRWebGLBinding', 'TODO_UNKNOWN_TYPE_XRQuadLayerInit'], returns='TODO_UNKNOWN_TYPE_XRQuadLayer'),
        PrototypeCall(constructor='XRMediaBinding', fn='createQuadLayer', demands=['XRMediaBinding', 'TODO_UNKNOWN_TYPE_HTMLVideoElement', 'TODO_UNKNOWN_TYPE_XRMediaQuadLayerInit'], returns='TODO_UNKNOWN_TYPE_XRQuadLayer'),
    ],
    "createcylinderlayer": [
        PrototypeCall(constructor='XRWebGLBinding', fn='createCylinderLayer', demands=['XRWebGLBinding', 'TODO_UNKNOWN_TYPE_XRCylinderLayerInit'], returns='TODO_UNKNOWN_TYPE_XRCylinderLayer'),
        PrototypeCall(constructor='XRMediaBinding', fn='createCylinderLayer', demands=['XRMediaBinding', 'TODO_UNKNOWN_TYPE_HTMLVideoElement', 'TODO_UNKNOWN_TYPE_XRMediaCylinderLayerInit'], returns='TODO_UNKNOWN_TYPE_XRCylinderLayer'),
    ],
    "createequirectlayer": [
        PrototypeCall(constructor='XRWebGLBinding', fn='createEquirectLayer', demands=['XRWebGLBinding', 'TODO_UNKNOWN_TYPE_XREquirectLayerInit'], returns='TODO_UNKNOWN_TYPE_XREquirectLayer'),
        PrototypeCall(constructor='XRMediaBinding', fn='createEquirectLayer', demands=['XRMediaBinding', 'TODO_UNKNOWN_TYPE_HTMLVideoElement', 'TODO_UNKNOWN_TYPE_XRMediaEquirectLayerInit'], returns='TODO_UNKNOWN_TYPE_XREquirectLayer'),
    ],
    "createcubelayer": [
        PrototypeCall(constructor='XRWebGLBinding', fn='createCubeLayer', demands=['XRWebGLBinding', 'TODO_UNKNOWN_TYPE_XRCubeLayerInit'], returns='TODO_UNKNOWN_TYPE_XRCubeLayer'),
    ],
    "getsubimage": [
        PrototypeCall(constructor='XRWebGLBinding', fn='getSubImage', demands=['XRWebGLBinding', 'TODO_UNKNOWN_TYPE_XRCompositionLayer', 'TODO_UNKNOWN_TYPE_XRFrame', 'TODO_UNKNOWN_TYPE_XREye'], returns='TODO_UNKNOWN_TYPE_XRWebGLSubImage'),
    ],
    "getviewsubimage": [
        PrototypeCall(constructor='XRWebGLBinding', fn='getViewSubImage', demands=['XRWebGLBinding', 'TODO_UNKNOWN_TYPE_XRProjectionLayer', 'TODO_UNKNOWN_TYPE_XRView'], returns='TODO_UNKNOWN_TYPE_XRWebGLSubImage'),
    ],
    "foveateboundtexture": [
        PrototypeCall(constructor='XRWebGLBinding', fn='foveateBoundTexture', demands=['XRWebGLBinding', 'TODO_UNKNOWN_TYPE_GLenum', 'TODO_UNKNOWN_TYPE_float'], returns='None'),
    ],
    "XRMediaBinding": [
        NewCall(constructor='XRMediaBinding', demands=['TODO_UNKNOWN_TYPE_XRSession'], returns='XRMediaBinding'),
    ],
    "XRLayerEvent": [
        NewCall(constructor='XRLayerEvent', demands=['str', 'TODO_UNKNOWN_TYPE_XRLayerEventInit'], returns='XRLayerEvent'),
    ],
    "getrangeat": [
        PrototypeCall(constructor='Selection', fn='getRangeAt', demands=['Selection', 'int'], returns='TODO_UNKNOWN_TYPE_Range'),
    ],
    "addrange": [
        PrototypeCall(constructor='Selection', fn='addRange', demands=['Selection', 'TODO_UNKNOWN_TYPE_Range'], returns='None'),
    ],
    "removerange": [
        PrototypeCall(constructor='Selection', fn='removeRange', demands=['Selection', 'TODO_UNKNOWN_TYPE_Range'], returns='None'),
    ],
    "removeallranges": [
        PrototypeCall(constructor='Selection', fn='removeAllRanges', demands=['Selection'], returns='None'),
    ],
    "empty": [
        PrototypeCall(constructor='Selection', fn='empty', demands=['Selection'], returns='None'),
    ],
    "getcomposedranges": [
        PrototypeCall(constructor='Selection', fn='getComposedRanges', demands=['Selection', 'TODO_UNKNOWN_TYPE_GetComposedRangesOptions'], returns='TODO_UNKNOWN_TYPE_StaticRange'),
    ],
    "collapse": [
        PrototypeCall(constructor='Selection', fn='collapse', demands=['Selection', 'Node', 'int'], returns='None'),
        PrototypeCall(constructor='Range', fn='collapse', demands=['Range', 'bool'], returns='None'),
    ],
    "setposition": [
        PrototypeCall(constructor='Selection', fn='setPosition', demands=['Selection', 'Node', 'int'], returns='None'),
        PrototypeCall(constructor='AudioListener', fn='setPosition', demands=['AudioListener', 'TODO_UNKNOWN_TYPE_float', 'TODO_UNKNOWN_TYPE_float', 'TODO_UNKNOWN_TYPE_float'], returns='None'),
        PrototypeCall(constructor='PannerNode', fn='setPosition', demands=['PannerNode', 'TODO_UNKNOWN_TYPE_float', 'TODO_UNKNOWN_TYPE_float', 'TODO_UNKNOWN_TYPE_float'], returns='None'),
    ],
    "collapsetostart": [
        PrototypeCall(constructor='Selection', fn='collapseToStart', demands=['Selection'], returns='None'),
    ],
    "collapsetoend": [
        PrototypeCall(constructor='Selection', fn='collapseToEnd', demands=['Selection'], returns='None'),
    ],
    "extend": [
        PrototypeCall(constructor='Selection', fn='extend', demands=['Selection', 'Node', 'int'], returns='None'),
    ],
    "setbaseandextent": [
        PrototypeCall(constructor='Selection', fn='setBaseAndExtent', demands=['Selection', 'Node', 'int', 'Node', 'int'], returns='None'),
    ],
    "selectallchildren": [
        PrototypeCall(constructor='Selection', fn='selectAllChildren', demands=['Selection', 'Node'], returns='None'),
    ],
    "modify": [
        PrototypeCall(constructor='Selection', fn='modify', demands=['Selection', 'str', 'str', 'str'], returns='None'),
    ],
    "deletefromdocument": [
        PrototypeCall(constructor='Selection', fn='deleteFromDocument', demands=['Selection'], returns='None'),
    ],
    "containsnode": [
        PrototypeCall(constructor='Selection', fn='containsNode', demands=['Selection', 'Node', 'bool'], returns='bool'),
    ],
    "ReportingObserver": [
        NewCall(constructor='ReportingObserver', demands=['TODO_UNKNOWN_TYPE_ReportingObserverCallback', 'TODO_UNKNOWN_TYPE_ReportingObserverOptions'], returns='ReportingObserver'),
    ],
    "contributetohistogram": [
        PrototypeCall(constructor='PrivateAggregation', fn='contributeToHistogram', demands=['PrivateAggregation', 'TODO_UNKNOWN_TYPE_PAHistogramContribution'], returns='None'),
        PrototypeCall(constructor='RealTimeReporting', fn='contributeToHistogram', demands=['RealTimeReporting', 'TODO_UNKNOWN_TYPE_RealTimeContribution'], returns='None'),
    ],
    "contributetohistogramonevent": [
        PrototypeCall(constructor='PrivateAggregation', fn='contributeToHistogramOnEvent', demands=['PrivateAggregation', 'str', 'str'], returns='None'),
    ],
    "enabledebugmode": [
        PrototypeCall(constructor='PrivateAggregation', fn='enableDebugMode', demands=['PrivateAggregation', 'TODO_UNKNOWN_TYPE_PADebugModeOptions'], returns='None'),
    ],
    "willrequestconditionalcreation": [
        DirectCall(fn='willRequestConditionalCreation', receiver='Credential', demands=[], returns='None'),
    ],
    "store": [
        PrototypeCall(constructor='CredentialsContainer', fn='store', demands=['CredentialsContainer', 'TODO_UNKNOWN_TYPE_Credential'], returns='None'),
    ],
    "preventsilentaccess": [
        PrototypeCall(constructor='CredentialsContainer', fn='preventSilentAccess', demands=['CredentialsContainer'], returns='None'),
    ],
    "PasswordCredential": [
        NewCall(constructor='PasswordCredential', demands=['TODO_UNKNOWN_TYPE_HTMLFormElement'], returns='PasswordCredential'),
        NewCall(constructor='PasswordCredential', demands=['TODO_UNKNOWN_TYPE_PasswordCredentialData'], returns='PasswordCredential'),
    ],
    "FederatedCredential": [
        NewCall(constructor='FederatedCredential', demands=['TODO_UNKNOWN_TYPE_FederatedCredentialInit'], returns='FederatedCredential'),
    ],
    "addlistener": [
        PrototypeCall(constructor='MediaQueryList', fn='addListener', demands=['MediaQueryList', 'TODO_UNKNOWN_TYPE_EventListener'], returns='None'),
    ],
    "removelistener": [
        PrototypeCall(constructor='MediaQueryList', fn='removeListener', demands=['MediaQueryList', 'TODO_UNKNOWN_TYPE_EventListener'], returns='None'),
    ],
    "MediaQueryListEvent": [
        NewCall(constructor='MediaQueryListEvent', demands=['TODO_UNKNOWN_TYPE_CSSOMString', 'TODO_UNKNOWN_TYPE_MediaQueryListEventInit'], returns='MediaQueryListEvent'),
    ],
    "getclientrect": [
        PrototypeCall(constructor='CaretPosition', fn='getClientRect', demands=['CaretPosition'], returns='TODO_UNKNOWN_TYPE_DOMRect'),
    ],
    "gettranslatedshadersource": [
        PrototypeCall(constructor='WEBGL_debug_shaders', fn='getTranslatedShaderSource', demands=['WEBGL_debug_shaders', 'TODO_UNKNOWN_TYPE_WebGLShader'], returns='str'),
    ],
    "NDEFMessage": [
        NewCall(constructor='NDEFMessage', demands=['TODO_UNKNOWN_TYPE_NDEFMessageInit'], returns='NDEFMessage'),
    ],
    "NDEFRecord": [
        NewCall(constructor='NDEFRecord', demands=['TODO_UNKNOWN_TYPE_NDEFRecordInit'], returns='NDEFRecord'),
    ],
    "torecords": [
        PrototypeCall(constructor='NDEFRecord', fn='toRecords', demands=['NDEFRecord'], returns='TODO_UNKNOWN_TYPE_NDEFRecord'),
    ],
    "NDEFReader": [
        NewCall(constructor='NDEFReader', demands=[], returns='NDEFReader'),
    ],
    "scan": [
        PrototypeCall(constructor='NDEFReader', fn='scan', demands=['NDEFReader', 'TODO_UNKNOWN_TYPE_NDEFScanOptions'], returns='None'),
    ],
    "makereadonly": [
        PrototypeCall(constructor='NDEFReader', fn='makeReadOnly', demands=['NDEFReader', 'TODO_UNKNOWN_TYPE_NDEFMakeReadOnlyOptions'], returns='None'),
    ],
    "NDEFReadingEvent": [
        NewCall(constructor='NDEFReadingEvent', demands=['str', 'TODO_UNKNOWN_TYPE_NDEFReadingEventInit'], returns='NDEFReadingEvent'),
    ],
    "PerformanceMark": [
        NewCall(constructor='PerformanceMark', demands=['str', 'TODO_UNKNOWN_TYPE_PerformanceMarkOptions'], returns='PerformanceMark'),
    ],
    "getsubscriptions": [
        PrototypeCall(constructor='CookieStoreManager', fn='getSubscriptions', demands=['CookieStoreManager'], returns='TODO_UNKNOWN_TYPE_CookieStoreGetOptions'),
    ],
    "CookieChangeEvent": [
        NewCall(constructor='CookieChangeEvent', demands=['str', 'TODO_UNKNOWN_TYPE_CookieChangeEventInit'], returns='CookieChangeEvent'),
    ],
    "ExtendableCookieChangeEvent": [
        NewCall(constructor='ExtendableCookieChangeEvent', demands=['str', 'TODO_UNKNOWN_TYPE_ExtendableCookieChangeEventInit'], returns='ExtendableCookieChangeEvent'),
    ],
    "clearoverride": [
        PrototypeCall(constructor='PreferenceObject', fn='clearOverride', demands=['PreferenceObject'], returns='None'),
    ],
    "requestoverride": [
        PrototypeCall(constructor='PreferenceObject', fn='requestOverride', demands=['PreferenceObject', 'str'], returns='None'),
    ],
    "provokingvertexwebgl": [
        PrototypeCall(constructor='WEBGL_provoking_vertex', fn='provokingVertexWEBGL', demands=['WEBGL_provoking_vertex', 'TODO_UNKNOWN_TYPE_GLenum'], returns='None'),
    ],
    "Highlight": [
        NewCall(constructor='Highlight', demands=['TODO_UNKNOWN_TYPE_AbstractRange'], returns='Highlight'),
    ],
    "Gyroscope": [
        NewCall(constructor='Gyroscope', demands=['TODO_UNKNOWN_TYPE_GyroscopeSensorOptions'], returns='Gyroscope'),
    ],
    "IDBVersionChangeEvent": [
        NewCall(constructor='IDBVersionChangeEvent', demands=['str', 'TODO_UNKNOWN_TYPE_IDBVersionChangeEventInit'], returns='IDBVersionChangeEvent'),
    ],
    "deletedatabase": [
        PrototypeCall(constructor='IDBFactory', fn='deleteDatabase', demands=['IDBFactory', 'str'], returns='TODO_UNKNOWN_TYPE_IDBOpenDBRequest'),
    ],
    "databases": [
        PrototypeCall(constructor='IDBFactory', fn='databases', demands=['IDBFactory'], returns='TODO_UNKNOWN_TYPE_IDBDatabaseInfo'),
    ],
    "cmp": [
        PrototypeCall(constructor='IDBFactory', fn='cmp', demands=['IDBFactory', '*', '*'], returns='TODO_UNKNOWN_TYPE_short'),
    ],
    "transaction": [
        PrototypeCall(constructor='IDBDatabase', fn='transaction', demands=['IDBDatabase', 'str', 'TODO_UNKNOWN_TYPE_IDBTransactionMode', 'TODO_UNKNOWN_TYPE_IDBTransactionOptions'], returns='TODO_UNKNOWN_TYPE_IDBTransaction'),
    ],
    "createobjectstore": [
        PrototypeCall(constructor='IDBDatabase', fn='createObjectStore', demands=['IDBDatabase', 'str', 'TODO_UNKNOWN_TYPE_IDBObjectStoreParameters'], returns='TODO_UNKNOWN_TYPE_IDBObjectStore'),
    ],
    "deleteobjectstore": [
        PrototypeCall(constructor='IDBDatabase', fn='deleteObjectStore', demands=['IDBDatabase', 'str'], returns='None'),
    ],
    "put": [
        PrototypeCall(constructor='IDBObjectStore', fn='put', demands=['IDBObjectStore', '*', '*'], returns='TODO_UNKNOWN_TYPE_IDBRequest'),
        PrototypeCall(constructor='Cache', fn='put', demands=['Cache', 'TODO_UNKNOWN_TYPE_RequestInfo', 'TODO_UNKNOWN_TYPE_Response'], returns='None'),
    ],
    "getallkeys": [
        PrototypeCall(constructor='IDBObjectStore', fn='getAllKeys', demands=['IDBObjectStore', '*', 'int'], returns='TODO_UNKNOWN_TYPE_IDBRequest'),
        PrototypeCall(constructor='IDBIndex', fn='getAllKeys', demands=['IDBIndex', '*', 'int'], returns='TODO_UNKNOWN_TYPE_IDBRequest'),
    ],
    "getallrecords": [
        PrototypeCall(constructor='IDBObjectStore', fn='getAllRecords', demands=['IDBObjectStore', 'TODO_UNKNOWN_TYPE_IDBGetAllOptions'], returns='TODO_UNKNOWN_TYPE_IDBRequest'),
        PrototypeCall(constructor='IDBIndex', fn='getAllRecords', demands=['IDBIndex', 'TODO_UNKNOWN_TYPE_IDBGetAllOptions'], returns='TODO_UNKNOWN_TYPE_IDBRequest'),
    ],
    "count": [
        PrototypeCall(constructor='IDBObjectStore', fn='count', demands=['IDBObjectStore', '*'], returns='TODO_UNKNOWN_TYPE_IDBRequest'),
        PrototypeCall(constructor='IDBIndex', fn='count', demands=['IDBIndex', '*'], returns='TODO_UNKNOWN_TYPE_IDBRequest'),
    ],
    "opencursor": [
        PrototypeCall(constructor='IDBObjectStore', fn='openCursor', demands=['IDBObjectStore', '*', 'TODO_UNKNOWN_TYPE_IDBCursorDirection'], returns='TODO_UNKNOWN_TYPE_IDBRequest'),
        PrototypeCall(constructor='IDBIndex', fn='openCursor', demands=['IDBIndex', '*', 'TODO_UNKNOWN_TYPE_IDBCursorDirection'], returns='TODO_UNKNOWN_TYPE_IDBRequest'),
    ],
    "openkeycursor": [
        PrototypeCall(constructor='IDBObjectStore', fn='openKeyCursor', demands=['IDBObjectStore', '*', 'TODO_UNKNOWN_TYPE_IDBCursorDirection'], returns='TODO_UNKNOWN_TYPE_IDBRequest'),
        PrototypeCall(constructor='IDBIndex', fn='openKeyCursor', demands=['IDBIndex', '*', 'TODO_UNKNOWN_TYPE_IDBCursorDirection'], returns='TODO_UNKNOWN_TYPE_IDBRequest'),
    ],
    "index": [
        PrototypeCall(constructor='IDBObjectStore', fn='index', demands=['IDBObjectStore', 'str'], returns='TODO_UNKNOWN_TYPE_IDBIndex'),
    ],
    "createindex": [
        PrototypeCall(constructor='IDBObjectStore', fn='createIndex', demands=['IDBObjectStore', 'str', 'str', 'TODO_UNKNOWN_TYPE_IDBIndexParameters'], returns='TODO_UNKNOWN_TYPE_IDBIndex'),
    ],
    "deleteindex": [
        PrototypeCall(constructor='IDBObjectStore', fn='deleteIndex', demands=['IDBObjectStore', 'str'], returns='None'),
    ],
    "only": [
        DirectCall(fn='only', receiver='IDBKeyRange', demands=['*'], returns='TODO_UNKNOWN_TYPE_IDBKeyRange'),
    ],
    "lowerbound": [
        DirectCall(fn='lowerBound', receiver='IDBKeyRange', demands=['*', 'bool'], returns='TODO_UNKNOWN_TYPE_IDBKeyRange'),
    ],
    "upperbound": [
        DirectCall(fn='upperBound', receiver='IDBKeyRange', demands=['*', 'bool'], returns='TODO_UNKNOWN_TYPE_IDBKeyRange'),
    ],
    "bound": [
        DirectCall(fn='bound', receiver='IDBKeyRange', demands=['*', '*', 'bool', 'bool'], returns='TODO_UNKNOWN_TYPE_IDBKeyRange'),
    ],
    "includes": [
        PrototypeCall(constructor='IDBKeyRange', fn='includes', demands=['IDBKeyRange', '*'], returns='bool'),
    ],
    "advance": [
        PrototypeCall(constructor='IDBCursor', fn='advance', demands=['IDBCursor', 'int'], returns='None'),
    ],
    "continue": [
        PrototypeCall(constructor='IDBCursor', fn='continue', demands=['IDBCursor', '*'], returns='None'),
    ],
    "continueprimarykey": [
        PrototypeCall(constructor='IDBCursor', fn='continuePrimaryKey', demands=['IDBCursor', '*', '*'], returns='None'),
    ],
    "update": [
        PrototypeCall(constructor='IDBCursor', fn='update', demands=['IDBCursor', '*'], returns='TODO_UNKNOWN_TYPE_IDBRequest'),
        PrototypeCall(constructor='ServiceWorkerRegistration', fn='update', demands=['ServiceWorkerRegistration'], returns='TODO_UNKNOWN_TYPE_ServiceWorkerRegistration'),
        PrototypeCall(constructor='MediaKeySession', fn='update', demands=['MediaKeySession', 'TODO_UNKNOWN_TYPE_BufferSource'], returns='None'),
    ],
    "objectstore": [
        PrototypeCall(constructor='IDBTransaction', fn='objectStore', demands=['IDBTransaction', 'str'], returns='TODO_UNKNOWN_TYPE_IDBObjectStore'),
    ],
    "commit": [
        PrototypeCall(constructor='IDBTransaction', fn='commit', demands=['IDBTransaction'], returns='None'),
        PrototypeCall(constructor='WebTransportWriter', fn='commit', demands=['WebTransportWriter'], returns='None'),
    ],
    "startdrawing": [
        PrototypeCall(constructor='HandwritingRecognizer', fn='startDrawing', demands=['HandwritingRecognizer', 'TODO_UNKNOWN_TYPE_HandwritingHints'], returns='TODO_UNKNOWN_TYPE_HandwritingDrawing'),
    ],
    "finish": [
        PrototypeCall(constructor='HandwritingRecognizer', fn='finish', demands=['HandwritingRecognizer'], returns='None'),
        PrototypeCall(constructor='GPUCommandEncoder', fn='finish', demands=['GPUCommandEncoder', 'TODO_UNKNOWN_TYPE_GPUCommandBufferDescriptor'], returns='TODO_UNKNOWN_TYPE_GPUCommandBuffer'),
        PrototypeCall(constructor='GPURenderBundleEncoder', fn='finish', demands=['GPURenderBundleEncoder', 'TODO_UNKNOWN_TYPE_GPURenderBundleDescriptor'], returns='TODO_UNKNOWN_TYPE_GPURenderBundle'),
        PrototypeCall(constructor='Animation', fn='finish', demands=['Animation'], returns='None'),
    ],
    "addstroke": [
        PrototypeCall(constructor='HandwritingDrawing', fn='addStroke', demands=['HandwritingDrawing', 'TODO_UNKNOWN_TYPE_HandwritingStroke'], returns='None'),
    ],
    "removestroke": [
        PrototypeCall(constructor='HandwritingDrawing', fn='removeStroke', demands=['HandwritingDrawing', 'TODO_UNKNOWN_TYPE_HandwritingStroke'], returns='None'),
    ],
    "getstrokes": [
        PrototypeCall(constructor='HandwritingDrawing', fn='getStrokes', demands=['HandwritingDrawing'], returns='TODO_UNKNOWN_TYPE_HandwritingStroke'),
    ],
    "getprediction": [
        PrototypeCall(constructor='HandwritingDrawing', fn='getPrediction', demands=['HandwritingDrawing'], returns='TODO_UNKNOWN_TYPE_HandwritingPrediction'),
    ],
    "HandwritingStroke": [
        NewCall(constructor='HandwritingStroke', demands=[], returns='HandwritingStroke'),
    ],
    "addpoint": [
        PrototypeCall(constructor='HandwritingStroke', fn='addPoint', demands=['HandwritingStroke', 'TODO_UNKNOWN_TYPE_HandwritingPoint'], returns='None'),
    ],
    "getpoints": [
        PrototypeCall(constructor='HandwritingStroke', fn='getPoints', demands=['HandwritingStroke'], returns='TODO_UNKNOWN_TYPE_HandwritingPoint'),
    ],
    "Event": [
        NewCall(constructor='Event', demands=['str', 'TODO_UNKNOWN_TYPE_EventInit'], returns='Event'),
    ],
    "composedpath": [
        PrototypeCall(constructor='Event', fn='composedPath', demands=['Event'], returns='EventTarget'),
    ],
    "stoppropagation": [
        PrototypeCall(constructor='Event', fn='stopPropagation', demands=['Event'], returns='None'),
    ],
    "stopimmediatepropagation": [
        PrototypeCall(constructor='Event', fn='stopImmediatePropagation', demands=['Event'], returns='None'),
    ],
    "preventdefault": [
        PrototypeCall(constructor='Event', fn='preventDefault', demands=['Event'], returns='None'),
    ],
    "initevent": [
        PrototypeCall(constructor='Event', fn='initEvent', demands=['Event', 'str', 'bool', 'bool'], returns='None'),
    ],
    "CustomEvent": [
        NewCall(constructor='CustomEvent', demands=['str', 'TODO_UNKNOWN_TYPE_CustomEventInit'], returns='CustomEvent'),
    ],
    "initcustomevent": [
        PrototypeCall(constructor='CustomEvent', fn='initCustomEvent', demands=['CustomEvent', 'str', 'bool', 'bool', '*'], returns='None'),
    ],
    "EventTarget": [
        NewCall(constructor='EventTarget', demands=[], returns='EventTarget'),
    ],
    "addeventlistener": [
        PrototypeCall(constructor='EventTarget', fn='addEventListener', demands=['EventTarget', 'str', 'TODO_UNKNOWN_TYPE_EventListener', 'TODO_UNKNOWN_TYPE_AddEventListenerOptions'], returns='None'),
    ],
    "removeeventlistener": [
        PrototypeCall(constructor='EventTarget', fn='removeEventListener', demands=['EventTarget', 'str', 'TODO_UNKNOWN_TYPE_EventListener', 'TODO_UNKNOWN_TYPE_EventListenerOptions'], returns='None'),
    ],
    "dispatchevent": [
        PrototypeCall(constructor='EventTarget', fn='dispatchEvent', demands=['EventTarget', 'TODO_UNKNOWN_TYPE_Event'], returns='bool'),
    ],
    "AbortController": [
        NewCall(constructor='AbortController', demands=[], returns='AbortController'),
    ],
    "timeout": [
        DirectCall(fn='timeout', receiver='AbortSignal', demands=['TODO_UNKNOWN_TYPE_unsigned long long'], returns='TODO_UNKNOWN_TYPE_AbortSignal'),
    ],
    "any": [
        DirectCall(fn='any', receiver='AbortSignal', demands=['TODO_UNKNOWN_TYPE_AbortSignal'], returns='TODO_UNKNOWN_TYPE_AbortSignal'),
        DirectCall(fn='any', receiver='TaskSignal', demands=['TODO_UNKNOWN_TYPE_AbortSignal', 'TODO_UNKNOWN_TYPE_TaskSignalAnyInit'], returns='TODO_UNKNOWN_TYPE_TaskSignal'),
    ],
    "throwifaborted": [
        PrototypeCall(constructor='AbortSignal', fn='throwIfAborted', demands=['AbortSignal'], returns='None'),
    ],
    "MutationObserver": [
        NewCall(constructor='MutationObserver', demands=['TODO_UNKNOWN_TYPE_MutationCallback'], returns='MutationObserver'),
    ],
    "getrootnode": [
        PrototypeCall(constructor='Node', fn='getRootNode', demands=['Node', 'TODO_UNKNOWN_TYPE_GetRootNodeOptions'], returns='Node'),
    ],
    "haschildnodes": [
        PrototypeCall(constructor='Node', fn='hasChildNodes', demands=['Node'], returns='bool'),
    ],
    "normalize": [
        PrototypeCall(constructor='Node', fn='normalize', demands=['Node'], returns='None'),
    ],
    "clonenode": [
        PrototypeCall(constructor='Node', fn='cloneNode', demands=['Node', 'bool'], returns='Node'),
    ],
    "isequalnode": [
        PrototypeCall(constructor='Node', fn='isEqualNode', demands=['Node', 'Node'], returns='bool'),
    ],
    "issamenode": [
        PrototypeCall(constructor='Node', fn='isSameNode', demands=['Node', 'Node'], returns='bool'),
    ],
    "comparedocumentposition": [
        PrototypeCall(constructor='Node', fn='compareDocumentPosition', demands=['Node', 'Node'], returns='TODO_UNKNOWN_TYPE_unsigned short'),
    ],
    "lookupprefix": [
        PrototypeCall(constructor='Node', fn='lookupPrefix', demands=['Node', 'str'], returns='str'),
    ],
    "lookupnamespaceuri": [
        PrototypeCall(constructor='Node', fn='lookupNamespaceURI', demands=['Node', 'str'], returns='str'),
    ],
    "isdefaultnamespace": [
        PrototypeCall(constructor='Node', fn='isDefaultNamespace', demands=['Node', 'str'], returns='bool'),
    ],
    "insertbefore": [
        PrototypeCall(constructor='Node', fn='insertBefore', demands=['Node', 'Node', 'Node'], returns='Node'),
    ],
    "appendchild": [
        PrototypeCall(constructor='Node', fn='appendChild', demands=['Node', 'Node'], returns='Node'),
    ],
    "replacechild": [
        PrototypeCall(constructor='Node', fn='replaceChild', demands=['Node', 'Node', 'Node'], returns='Node'),
    ],
    "removechild": [
        PrototypeCall(constructor='Node', fn='removeChild', demands=['Node', 'Node'], returns='Node'),
    ],
    "Document": [
        NewCall(constructor='Document', demands=[], returns='Document'),
    ],
    "getelementsbytagname": [
        PrototypeCall(constructor='Document', fn='getElementsByTagName', demands=['Document', 'str'], returns='TODO_UNKNOWN_TYPE_HTMLCollection'),
        PrototypeCall(constructor='Element', fn='getElementsByTagName', demands=['Element', 'str'], returns='TODO_UNKNOWN_TYPE_HTMLCollection'),
    ],
    "getelementsbytagnamens": [
        PrototypeCall(constructor='Document', fn='getElementsByTagNameNS', demands=['Document', 'str', 'str'], returns='TODO_UNKNOWN_TYPE_HTMLCollection'),
        PrototypeCall(constructor='Element', fn='getElementsByTagNameNS', demands=['Element', 'str', 'str'], returns='TODO_UNKNOWN_TYPE_HTMLCollection'),
    ],
    "getelementsbyclassname": [
        PrototypeCall(constructor='Document', fn='getElementsByClassName', demands=['Document', 'str'], returns='TODO_UNKNOWN_TYPE_HTMLCollection'),
        PrototypeCall(constructor='Element', fn='getElementsByClassName', demands=['Element', 'str'], returns='TODO_UNKNOWN_TYPE_HTMLCollection'),
    ],
    "createelement": [
        PrototypeCall(constructor='Document', fn='createElement', demands=['Document', 'str', 'str'], returns='Element'),
    ],
    "createelementns": [
        PrototypeCall(constructor='Document', fn='createElementNS', demands=['Document', 'str', 'str', 'str'], returns='Element'),
    ],
    "createdocumentfragment": [
        PrototypeCall(constructor='Document', fn='createDocumentFragment', demands=['Document'], returns='TODO_UNKNOWN_TYPE_DocumentFragment'),
    ],
    "createtextnode": [
        PrototypeCall(constructor='Document', fn='createTextNode', demands=['Document', 'str'], returns='TODO_UNKNOWN_TYPE_Text'),
    ],
    "createcdatasection": [
        PrototypeCall(constructor='Document', fn='createCDATASection', demands=['Document', 'str'], returns='TODO_UNKNOWN_TYPE_CDATASection'),
    ],
    "createcomment": [
        PrototypeCall(constructor='Document', fn='createComment', demands=['Document', 'str'], returns='TODO_UNKNOWN_TYPE_Comment'),
    ],
    "createprocessinginstruction": [
        PrototypeCall(constructor='Document', fn='createProcessingInstruction', demands=['Document', 'str', 'str'], returns='TODO_UNKNOWN_TYPE_ProcessingInstruction'),
    ],
    "importnode": [
        PrototypeCall(constructor='Document', fn='importNode', demands=['Document', 'Node', 'bool'], returns='Node'),
    ],
    "adoptnode": [
        PrototypeCall(constructor='Document', fn='adoptNode', demands=['Document', 'Node'], returns='Node'),
    ],
    "createattribute": [
        PrototypeCall(constructor='Document', fn='createAttribute', demands=['Document', 'str'], returns='TODO_UNKNOWN_TYPE_Attr'),
    ],
    "createattributens": [
        PrototypeCall(constructor='Document', fn='createAttributeNS', demands=['Document', 'str', 'str'], returns='TODO_UNKNOWN_TYPE_Attr'),
    ],
    "createevent": [
        PrototypeCall(constructor='Document', fn='createEvent', demands=['Document', 'str'], returns='TODO_UNKNOWN_TYPE_Event'),
    ],
    "createrange": [
        PrototypeCall(constructor='Document', fn='createRange', demands=['Document'], returns='TODO_UNKNOWN_TYPE_Range'),
    ],
    "createnodeiterator": [
        PrototypeCall(constructor='Document', fn='createNodeIterator', demands=['Document', 'Node', 'int', 'TODO_UNKNOWN_TYPE_NodeFilter'], returns='TODO_UNKNOWN_TYPE_NodeIterator'),
    ],
    "createtreewalker": [
        PrototypeCall(constructor='Document', fn='createTreeWalker', demands=['Document', 'Node', 'int', 'TODO_UNKNOWN_TYPE_NodeFilter'], returns='TODO_UNKNOWN_TYPE_TreeWalker'),
    ],
    "createdocumenttype": [
        PrototypeCall(constructor='DOMImplementation', fn='createDocumentType', demands=['DOMImplementation', 'str', 'str', 'str'], returns='TODO_UNKNOWN_TYPE_DocumentType'),
    ],
    "createdocument": [
        PrototypeCall(constructor='DOMImplementation', fn='createDocument', demands=['DOMImplementation', 'str', 'str', 'TODO_UNKNOWN_TYPE_DocumentType'], returns='TODO_UNKNOWN_TYPE_XMLDocument'),
    ],
    "createhtmldocument": [
        PrototypeCall(constructor='DOMImplementation', fn='createHTMLDocument', demands=['DOMImplementation', 'str'], returns='Document'),
    ],
    "hasfeature": [
        PrototypeCall(constructor='DOMImplementation', fn='hasFeature', demands=['DOMImplementation'], returns='bool'),
        PrototypeCall(constructor='EpubReadingSystem', fn='hasFeature', demands=['EpubReadingSystem', 'str', 'str'], returns='bool'),
    ],
    "DocumentFragment": [
        NewCall(constructor='DocumentFragment', demands=[], returns='DocumentFragment'),
    ],
    "hasattributes": [
        PrototypeCall(constructor='Element', fn='hasAttributes', demands=['Element'], returns='bool'),
    ],
    "getattributenames": [
        PrototypeCall(constructor='Element', fn='getAttributeNames', demands=['Element'], returns='str'),
    ],
    "getattribute": [
        PrototypeCall(constructor='Element', fn='getAttribute', demands=['Element', 'str'], returns='str'),
    ],
    "getattributens": [
        PrototypeCall(constructor='Element', fn='getAttributeNS', demands=['Element', 'str', 'str'], returns='str'),
    ],
    "setattribute": [
        PrototypeCall(constructor='Element', fn='setAttribute', demands=['Element', 'str', 'str'], returns='None'),
    ],
    "setattributens": [
        PrototypeCall(constructor='Element', fn='setAttributeNS', demands=['Element', 'str', 'str', 'str'], returns='None'),
    ],
    "removeattributens": [
        PrototypeCall(constructor='Element', fn='removeAttributeNS', demands=['Element', 'str', 'str'], returns='None'),
    ],
    "toggleattribute": [
        PrototypeCall(constructor='Element', fn='toggleAttribute', demands=['Element', 'str', 'bool'], returns='bool'),
    ],
    "hasattribute": [
        PrototypeCall(constructor='Element', fn='hasAttribute', demands=['Element', 'str'], returns='bool'),
    ],
    "hasattributens": [
        PrototypeCall(constructor='Element', fn='hasAttributeNS', demands=['Element', 'str', 'str'], returns='bool'),
    ],
    "getattributenode": [
        PrototypeCall(constructor='Element', fn='getAttributeNode', demands=['Element', 'str'], returns='TODO_UNKNOWN_TYPE_Attr'),
    ],
    "getattributenodens": [
        PrototypeCall(constructor='Element', fn='getAttributeNodeNS', demands=['Element', 'str', 'str'], returns='TODO_UNKNOWN_TYPE_Attr'),
    ],
    "setattributenode": [
        PrototypeCall(constructor='Element', fn='setAttributeNode', demands=['Element', 'TODO_UNKNOWN_TYPE_Attr'], returns='TODO_UNKNOWN_TYPE_Attr'),
    ],
    "setattributenodens": [
        PrototypeCall(constructor='Element', fn='setAttributeNodeNS', demands=['Element', 'TODO_UNKNOWN_TYPE_Attr'], returns='TODO_UNKNOWN_TYPE_Attr'),
    ],
    "removeattributenode": [
        PrototypeCall(constructor='Element', fn='removeAttributeNode', demands=['Element', 'TODO_UNKNOWN_TYPE_Attr'], returns='TODO_UNKNOWN_TYPE_Attr'),
    ],
    "attachshadow": [
        PrototypeCall(constructor='Element', fn='attachShadow', demands=['Element', 'TODO_UNKNOWN_TYPE_ShadowRootInit'], returns='TODO_UNKNOWN_TYPE_ShadowRoot'),
    ],
    "closest": [
        PrototypeCall(constructor='Element', fn='closest', demands=['Element', 'str'], returns='Element'),
    ],
    "matches": [
        PrototypeCall(constructor='Element', fn='matches', demands=['Element', 'str'], returns='bool'),
    ],
    "webkitmatchesselector": [
        PrototypeCall(constructor='Element', fn='webkitMatchesSelector', demands=['Element', 'str'], returns='bool'),
    ],
    "insertadjacentelement": [
        PrototypeCall(constructor='Element', fn='insertAdjacentElement', demands=['Element', 'str', 'Element'], returns='Element'),
    ],
    "insertadjacenttext": [
        PrototypeCall(constructor='Element', fn='insertAdjacentText', demands=['Element', 'str', 'str'], returns='None'),
    ],
    "getnameditem": [
        PrototypeCall(constructor='NamedNodeMap', fn='getNamedItem', demands=['NamedNodeMap', 'str'], returns='TODO_UNKNOWN_TYPE_Attr'),
    ],
    "getnameditemns": [
        PrototypeCall(constructor='NamedNodeMap', fn='getNamedItemNS', demands=['NamedNodeMap', 'str', 'str'], returns='TODO_UNKNOWN_TYPE_Attr'),
    ],
    "setnameditem": [
        PrototypeCall(constructor='NamedNodeMap', fn='setNamedItem', demands=['NamedNodeMap', 'TODO_UNKNOWN_TYPE_Attr'], returns='TODO_UNKNOWN_TYPE_Attr'),
    ],
    "setnameditemns": [
        PrototypeCall(constructor='NamedNodeMap', fn='setNamedItemNS', demands=['NamedNodeMap', 'TODO_UNKNOWN_TYPE_Attr'], returns='TODO_UNKNOWN_TYPE_Attr'),
    ],
    "removenameditem": [
        PrototypeCall(constructor='NamedNodeMap', fn='removeNamedItem', demands=['NamedNodeMap', 'str'], returns='TODO_UNKNOWN_TYPE_Attr'),
    ],
    "removenameditemns": [
        PrototypeCall(constructor='NamedNodeMap', fn='removeNamedItemNS', demands=['NamedNodeMap', 'str', 'str'], returns='TODO_UNKNOWN_TYPE_Attr'),
    ],
    "substringdata": [
        PrototypeCall(constructor='CharacterData', fn='substringData', demands=['CharacterData', 'int', 'int'], returns='str'),
    ],
    "appenddata": [
        PrototypeCall(constructor='CharacterData', fn='appendData', demands=['CharacterData', 'str'], returns='None'),
    ],
    "insertdata": [
        PrototypeCall(constructor='CharacterData', fn='insertData', demands=['CharacterData', 'int', 'str'], returns='None'),
    ],
    "deletedata": [
        PrototypeCall(constructor='CharacterData', fn='deleteData', demands=['CharacterData', 'int', 'int'], returns='None'),
    ],
    "replacedata": [
        PrototypeCall(constructor='CharacterData', fn='replaceData', demands=['CharacterData', 'int', 'int', 'str'], returns='None'),
    ],
    "Text": [
        NewCall(constructor='Text', demands=['str'], returns='Text'),
    ],
    "splittext": [
        PrototypeCall(constructor='Text', fn='splitText', demands=['Text', 'int'], returns='TODO_UNKNOWN_TYPE_Text'),
    ],
    "Comment": [
        NewCall(constructor='Comment', demands=['str'], returns='Comment'),
    ],
    "StaticRange": [
        NewCall(constructor='StaticRange', demands=['TODO_UNKNOWN_TYPE_StaticRangeInit'], returns='StaticRange'),
    ],
    "Range": [
        NewCall(constructor='Range', demands=[], returns='Range'),
    ],
    "setstart": [
        PrototypeCall(constructor='Range', fn='setStart', demands=['Range', 'Node', 'int'], returns='None'),
    ],
    "setend": [
        PrototypeCall(constructor='Range', fn='setEnd', demands=['Range', 'Node', 'int'], returns='None'),
    ],
    "setstartbefore": [
        PrototypeCall(constructor='Range', fn='setStartBefore', demands=['Range', 'Node'], returns='None'),
    ],
    "setstartafter": [
        PrototypeCall(constructor='Range', fn='setStartAfter', demands=['Range', 'Node'], returns='None'),
    ],
    "setendbefore": [
        PrototypeCall(constructor='Range', fn='setEndBefore', demands=['Range', 'Node'], returns='None'),
    ],
    "setendafter": [
        PrototypeCall(constructor='Range', fn='setEndAfter', demands=['Range', 'Node'], returns='None'),
    ],
    "selectnode": [
        PrototypeCall(constructor='Range', fn='selectNode', demands=['Range', 'Node'], returns='None'),
    ],
    "selectnodecontents": [
        PrototypeCall(constructor='Range', fn='selectNodeContents', demands=['Range', 'Node'], returns='None'),
    ],
    "compareboundarypoints": [
        PrototypeCall(constructor='Range', fn='compareBoundaryPoints', demands=['Range', 'TODO_UNKNOWN_TYPE_unsigned short', 'TODO_UNKNOWN_TYPE_Range'], returns='TODO_UNKNOWN_TYPE_short'),
    ],
    "deletecontents": [
        PrototypeCall(constructor='Range', fn='deleteContents', demands=['Range'], returns='None'),
    ],
    "extractcontents": [
        PrototypeCall(constructor='Range', fn='extractContents', demands=['Range'], returns='TODO_UNKNOWN_TYPE_DocumentFragment'),
    ],
    "clonecontents": [
        PrototypeCall(constructor='Range', fn='cloneContents', demands=['Range'], returns='TODO_UNKNOWN_TYPE_DocumentFragment'),
    ],
    "insertnode": [
        PrototypeCall(constructor='Range', fn='insertNode', demands=['Range', 'Node'], returns='None'),
    ],
    "surroundcontents": [
        PrototypeCall(constructor='Range', fn='surroundContents', demands=['Range', 'Node'], returns='None'),
    ],
    "clonerange": [
        PrototypeCall(constructor='Range', fn='cloneRange', demands=['Range'], returns='TODO_UNKNOWN_TYPE_Range'),
    ],
    "detach": [
        PrototypeCall(constructor='Range', fn='detach', demands=['Range'], returns='None'),
        PrototypeCall(constructor='NodeIterator', fn='detach', demands=['NodeIterator'], returns='None'),
    ],
    "ispointinrange": [
        PrototypeCall(constructor='Range', fn='isPointInRange', demands=['Range', 'Node', 'int'], returns='bool'),
    ],
    "comparepoint": [
        PrototypeCall(constructor='Range', fn='comparePoint', demands=['Range', 'Node', 'int'], returns='TODO_UNKNOWN_TYPE_short'),
    ],
    "intersectsnode": [
        PrototypeCall(constructor='Range', fn='intersectsNode', demands=['Range', 'Node'], returns='bool'),
    ],
    "nextnode": [
        PrototypeCall(constructor='NodeIterator', fn='nextNode', demands=['NodeIterator'], returns='Node'),
        PrototypeCall(constructor='TreeWalker', fn='nextNode', demands=['TreeWalker'], returns='Node'),
    ],
    "previousnode": [
        PrototypeCall(constructor='NodeIterator', fn='previousNode', demands=['NodeIterator'], returns='Node'),
        PrototypeCall(constructor='TreeWalker', fn='previousNode', demands=['TreeWalker'], returns='Node'),
    ],
    "parentnode": [
        PrototypeCall(constructor='TreeWalker', fn='parentNode', demands=['TreeWalker'], returns='Node'),
    ],
    "firstchild": [
        PrototypeCall(constructor='TreeWalker', fn='firstChild', demands=['TreeWalker'], returns='Node'),
    ],
    "lastchild": [
        PrototypeCall(constructor='TreeWalker', fn='lastChild', demands=['TreeWalker'], returns='Node'),
    ],
    "previoussibling": [
        PrototypeCall(constructor='TreeWalker', fn='previousSibling', demands=['TreeWalker'], returns='Node'),
    ],
    "nextsibling": [
        PrototypeCall(constructor='TreeWalker', fn='nextSibling', demands=['TreeWalker'], returns='Node'),
    ],
    "toggle": [
        PrototypeCall(constructor='DOMTokenList', fn='toggle', demands=['DOMTokenList', 'str', 'bool'], returns='bool'),
    ],
    "iteratenext": [
        PrototypeCall(constructor='XPathResult', fn='iterateNext', demands=['XPathResult'], returns='Node'),
    ],
    "snapshotitem": [
        PrototypeCall(constructor='XPathResult', fn='snapshotItem', demands=['XPathResult', 'int'], returns='Node'),
    ],
    "evaluate": [
        PrototypeCall(constructor='XPathExpression', fn='evaluate', demands=['XPathExpression', 'Node', 'TODO_UNKNOWN_TYPE_unsigned short', 'TODO_UNKNOWN_TYPE_XPathResult'], returns='TODO_UNKNOWN_TYPE_XPathResult'),
    ],
    "XPathEvaluator": [
        NewCall(constructor='XPathEvaluator', demands=[], returns='XPathEvaluator'),
    ],
    "XSLTProcessor": [
        NewCall(constructor='XSLTProcessor', demands=[], returns='XSLTProcessor'),
    ],
    "importstylesheet": [
        PrototypeCall(constructor='XSLTProcessor', fn='importStylesheet', demands=['XSLTProcessor', 'Node'], returns='None'),
    ],
    "transformtofragment": [
        PrototypeCall(constructor='XSLTProcessor', fn='transformToFragment', demands=['XSLTProcessor', 'Node', 'Document'], returns='TODO_UNKNOWN_TYPE_DocumentFragment'),
    ],
    "transformtodocument": [
        PrototypeCall(constructor='XSLTProcessor', fn='transformToDocument', demands=['XSLTProcessor', 'Node'], returns='Document'),
    ],
    "setparameter": [
        PrototypeCall(constructor='XSLTProcessor', fn='setParameter', demands=['XSLTProcessor', 'str', 'str', '*'], returns='None'),
    ],
    "getparameter": [
        PrototypeCall(constructor='XSLTProcessor', fn='getParameter', demands=['XSLTProcessor', 'str', 'str'], returns='*'),
    ],
    "removeparameter": [
        PrototypeCall(constructor='XSLTProcessor', fn='removeParameter', demands=['XSLTProcessor', 'str', 'str'], returns='None'),
    ],
    "clearparameters": [
        PrototypeCall(constructor='XSLTProcessor', fn='clearParameters', demands=['XSLTProcessor'], returns='None'),
    ],
    "gethighentropyvalues": [
        PrototypeCall(constructor='NavigatorUAData', fn='getHighEntropyValues', demands=['NavigatorUAData', 'str'], returns='TODO_UNKNOWN_TYPE_UADataValues'),
    ],
    "useragentallowsprotocol": [
        DirectCall(fn='userAgentAllowsProtocol', receiver='DigitalCredential', demands=['str'], returns='bool'),
    ],
    "CaptureActionEvent": [
        NewCall(constructor='CaptureActionEvent', demands=['TODO_UNKNOWN_TYPE_CaptureActionEventInit'], returns='CaptureActionEvent'),
    ],
    "registeranimator": [
        PrototypeCall(constructor='AnimationWorkletGlobalScope', fn='registerAnimator', demands=['AnimationWorkletGlobalScope', 'str', 'TODO_UNKNOWN_TYPE_AnimatorInstanceConstructor'], returns='None'),
    ],
    "gettiming": [
        PrototypeCall(constructor='WorkletAnimationEffect', fn='getTiming', demands=['WorkletAnimationEffect'], returns='TODO_UNKNOWN_TYPE_EffectTiming'),
        PrototypeCall(constructor='AnimationEffect', fn='getTiming', demands=['AnimationEffect'], returns='TODO_UNKNOWN_TYPE_EffectTiming'),
    ],
    "getcomputedtiming": [
        PrototypeCall(constructor='WorkletAnimationEffect', fn='getComputedTiming', demands=['WorkletAnimationEffect'], returns='TODO_UNKNOWN_TYPE_ComputedEffectTiming'),
        PrototypeCall(constructor='AnimationEffect', fn='getComputedTiming', demands=['AnimationEffect'], returns='TODO_UNKNOWN_TYPE_ComputedEffectTiming'),
    ],
    "WorkletAnimation": [
        NewCall(constructor='WorkletAnimation', demands=['str', 'TODO_UNKNOWN_TYPE_AnimationEffect', 'TODO_UNKNOWN_TYPE_AnimationTimeline', '*'], returns='WorkletAnimation'),
    ],
    "getchildren": [
        PrototypeCall(constructor='WorkletGroupEffect', fn='getChildren', demands=['WorkletGroupEffect'], returns='TODO_UNKNOWN_TYPE_WorkletAnimationEffect'),
    ],
    "enabledelegations": [
        PrototypeCall(constructor='PaymentManager', fn='enableDelegations', demands=['PaymentManager', 'TODO_UNKNOWN_TYPE_PaymentDelegation'], returns='None'),
    ],
    "CanMakePaymentEvent": [
        NewCall(constructor='CanMakePaymentEvent', demands=['str'], returns='CanMakePaymentEvent'),
    ],
    "respondwith": [
        PrototypeCall(constructor='CanMakePaymentEvent', fn='respondWith', demands=['CanMakePaymentEvent', 'bool'], returns='None'),
        PrototypeCall(constructor='PaymentRequestEvent', fn='respondWith', demands=['PaymentRequestEvent', 'TODO_UNKNOWN_TYPE_PaymentHandlerResponse'], returns='None'),
        PrototypeCall(constructor='FetchEvent', fn='respondWith', demands=['FetchEvent', 'TODO_UNKNOWN_TYPE_Response'], returns='None'),
    ],
    "PaymentRequestEvent": [
        NewCall(constructor='PaymentRequestEvent', demands=['str', 'TODO_UNKNOWN_TYPE_PaymentRequestEventInit'], returns='PaymentRequestEvent'),
    ],
    "openwindow": [
        PrototypeCall(constructor='PaymentRequestEvent', fn='openWindow', demands=['PaymentRequestEvent', 'str'], returns='TODO_UNKNOWN_TYPE_WindowClient'),
        PrototypeCall(constructor='Clients', fn='openWindow', demands=['Clients', 'str'], returns='TODO_UNKNOWN_TYPE_WindowClient'),
    ],
    "changepaymentmethod": [
        PrototypeCall(constructor='PaymentRequestEvent', fn='changePaymentMethod', demands=['PaymentRequestEvent', 'str', 'TODO_UNKNOWN_TYPE_object'], returns='TODO_UNKNOWN_TYPE_PaymentRequestDetailsUpdate'),
    ],
    "changeshippingaddress": [
        PrototypeCall(constructor='PaymentRequestEvent', fn='changeShippingAddress', demands=['PaymentRequestEvent', 'TODO_UNKNOWN_TYPE_AddressInit'], returns='TODO_UNKNOWN_TYPE_PaymentRequestDetailsUpdate'),
    ],
    "changeshippingoption": [
        PrototypeCall(constructor='PaymentRequestEvent', fn='changeShippingOption', demands=['PaymentRequestEvent', 'str'], returns='TODO_UNKNOWN_TYPE_PaymentRequestDetailsUpdate'),
    ],
    "getavailability": [
        PrototypeCall(constructor='Bluetooth', fn='getAvailability', demands=['Bluetooth'], returns='bool'),
        PrototypeCall(constructor='PresentationRequest', fn='getAvailability', demands=['PresentationRequest'], returns='TODO_UNKNOWN_TYPE_PresentationAvailability'),
    ],
    "ValueEvent": [
        NewCall(constructor='ValueEvent', demands=['str', 'TODO_UNKNOWN_TYPE_ValueEventInit'], returns='ValueEvent'),
    ],
    "watchadvertisements": [
        PrototypeCall(constructor='BluetoothDevice', fn='watchAdvertisements', demands=['BluetoothDevice', 'TODO_UNKNOWN_TYPE_WatchAdvertisementsOptions'], returns='None'),
    ],
    "BluetoothAdvertisingEvent": [
        NewCall(constructor='BluetoothAdvertisingEvent', demands=['str', 'TODO_UNKNOWN_TYPE_BluetoothAdvertisingEventInit'], returns='BluetoothAdvertisingEvent'),
    ],
    "connect": [
        PrototypeCall(constructor='BluetoothRemoteGATTServer', fn='connect', demands=['BluetoothRemoteGATTServer'], returns='TODO_UNKNOWN_TYPE_BluetoothRemoteGATTServer'),
        PrototypeCall(constructor='AudioNode', fn='connect', demands=['AudioNode', 'TODO_UNKNOWN_TYPE_AudioNode', 'int', 'int'], returns='TODO_UNKNOWN_TYPE_AudioNode'),
        PrototypeCall(constructor='AudioNode', fn='connect', demands=['AudioNode', 'TODO_UNKNOWN_TYPE_AudioParam', 'int'], returns='None'),
    ],
    "getprimaryservice": [
        PrototypeCall(constructor='BluetoothRemoteGATTServer', fn='getPrimaryService', demands=['BluetoothRemoteGATTServer', 'TODO_UNKNOWN_TYPE_BluetoothServiceUUID'], returns='TODO_UNKNOWN_TYPE_BluetoothRemoteGATTService'),
    ],
    "getprimaryservices": [
        PrototypeCall(constructor='BluetoothRemoteGATTServer', fn='getPrimaryServices', demands=['BluetoothRemoteGATTServer', 'TODO_UNKNOWN_TYPE_BluetoothServiceUUID'], returns='TODO_UNKNOWN_TYPE_BluetoothRemoteGATTService'),
    ],
    "getcharacteristic": [
        PrototypeCall(constructor='BluetoothRemoteGATTService', fn='getCharacteristic', demands=['BluetoothRemoteGATTService', 'TODO_UNKNOWN_TYPE_BluetoothCharacteristicUUID'], returns='TODO_UNKNOWN_TYPE_BluetoothRemoteGATTCharacteristic'),
        DirectCall(fn='getCharacteristic', receiver='BluetoothUUID', demands=['str'], returns='TODO_UNKNOWN_TYPE_UUID'),
    ],
    "getcharacteristics": [
        PrototypeCall(constructor='BluetoothRemoteGATTService', fn='getCharacteristics', demands=['BluetoothRemoteGATTService', 'TODO_UNKNOWN_TYPE_BluetoothCharacteristicUUID'], returns='TODO_UNKNOWN_TYPE_BluetoothRemoteGATTCharacteristic'),
    ],
    "getincludedservice": [
        PrototypeCall(constructor='BluetoothRemoteGATTService', fn='getIncludedService', demands=['BluetoothRemoteGATTService', 'TODO_UNKNOWN_TYPE_BluetoothServiceUUID'], returns='TODO_UNKNOWN_TYPE_BluetoothRemoteGATTService'),
    ],
    "getincludedservices": [
        PrototypeCall(constructor='BluetoothRemoteGATTService', fn='getIncludedServices', demands=['BluetoothRemoteGATTService', 'TODO_UNKNOWN_TYPE_BluetoothServiceUUID'], returns='TODO_UNKNOWN_TYPE_BluetoothRemoteGATTService'),
    ],
    "getdescriptor": [
        PrototypeCall(constructor='BluetoothRemoteGATTCharacteristic', fn='getDescriptor', demands=['BluetoothRemoteGATTCharacteristic', 'TODO_UNKNOWN_TYPE_BluetoothDescriptorUUID'], returns='TODO_UNKNOWN_TYPE_BluetoothRemoteGATTDescriptor'),
        DirectCall(fn='getDescriptor', receiver='BluetoothUUID', demands=['str'], returns='TODO_UNKNOWN_TYPE_UUID'),
    ],
    "getdescriptors": [
        PrototypeCall(constructor='BluetoothRemoteGATTCharacteristic', fn='getDescriptors', demands=['BluetoothRemoteGATTCharacteristic', 'TODO_UNKNOWN_TYPE_BluetoothDescriptorUUID'], returns='TODO_UNKNOWN_TYPE_BluetoothRemoteGATTDescriptor'),
    ],
    "readvalue": [
        PrototypeCall(constructor='BluetoothRemoteGATTCharacteristic', fn='readValue', demands=['BluetoothRemoteGATTCharacteristic'], returns='TODO_UNKNOWN_TYPE_DataView'),
        PrototypeCall(constructor='BluetoothRemoteGATTDescriptor', fn='readValue', demands=['BluetoothRemoteGATTDescriptor'], returns='TODO_UNKNOWN_TYPE_DataView'),
    ],
    "writevalue": [
        PrototypeCall(constructor='BluetoothRemoteGATTCharacteristic', fn='writeValue', demands=['BluetoothRemoteGATTCharacteristic', 'TODO_UNKNOWN_TYPE_BufferSource'], returns='None'),
        PrototypeCall(constructor='BluetoothRemoteGATTDescriptor', fn='writeValue', demands=['BluetoothRemoteGATTDescriptor', 'TODO_UNKNOWN_TYPE_BufferSource'], returns='None'),
    ],
    "writevaluewithresponse": [
        PrototypeCall(constructor='BluetoothRemoteGATTCharacteristic', fn='writeValueWithResponse', demands=['BluetoothRemoteGATTCharacteristic', 'TODO_UNKNOWN_TYPE_BufferSource'], returns='None'),
    ],
    "writevaluewithoutresponse": [
        PrototypeCall(constructor='BluetoothRemoteGATTCharacteristic', fn='writeValueWithoutResponse', demands=['BluetoothRemoteGATTCharacteristic', 'TODO_UNKNOWN_TYPE_BufferSource'], returns='None'),
    ],
    "startnotifications": [
        PrototypeCall(constructor='BluetoothRemoteGATTCharacteristic', fn='startNotifications', demands=['BluetoothRemoteGATTCharacteristic'], returns='TODO_UNKNOWN_TYPE_BluetoothRemoteGATTCharacteristic'),
    ],
    "stopnotifications": [
        PrototypeCall(constructor='BluetoothRemoteGATTCharacteristic', fn='stopNotifications', demands=['BluetoothRemoteGATTCharacteristic'], returns='TODO_UNKNOWN_TYPE_BluetoothRemoteGATTCharacteristic'),
    ],
    "getservice": [
        DirectCall(fn='getService', receiver='BluetoothUUID', demands=['str'], returns='TODO_UNKNOWN_TYPE_UUID'),
    ],
    "canonicaluuid": [
        DirectCall(fn='canonicalUUID', receiver='BluetoothUUID', demands=['int'], returns='TODO_UNKNOWN_TYPE_UUID'),
    ],
    "requestpresenter": [
        PrototypeCall(constructor='Ink', fn='requestPresenter', demands=['Ink', 'TODO_UNKNOWN_TYPE_InkPresenterParam'], returns='TODO_UNKNOWN_TYPE_DelegatedInkTrailPresenter'),
    ],
    "updateinktrailstartpoint": [
        PrototypeCall(constructor='DelegatedInkTrailPresenter', fn='updateInkTrailStartPoint', demands=['DelegatedInkTrailPresenter', 'TODO_UNKNOWN_TYPE_PointerEvent', 'TODO_UNKNOWN_TYPE_InkTrailStyle'], returns='None'),
    ],
    "PressureObserver": [
        NewCall(constructor='PressureObserver', demands=['TODO_UNKNOWN_TYPE_PressureUpdateCallback'], returns='PressureObserver'),
    ],
    "getmanagedconfiguration": [
        PrototypeCall(constructor='NavigatorManagedData', fn='getManagedConfiguration', demands=['NavigatorManagedData', 'str'], returns='str'),
    ],
    "MediaRecorder": [
        NewCall(constructor='MediaRecorder', demands=['TODO_UNKNOWN_TYPE_MediaStream', 'TODO_UNKNOWN_TYPE_MediaRecorderOptions'], returns='MediaRecorder'),
    ],
    "resume": [
        PrototypeCall(constructor='MediaRecorder', fn='resume', demands=['MediaRecorder'], returns='None'),
        PrototypeCall(constructor='SpeechSynthesis', fn='resume', demands=['SpeechSynthesis'], returns='None'),
        PrototypeCall(constructor='AudioContext', fn='resume', demands=['AudioContext'], returns='None'),
        PrototypeCall(constructor='OfflineAudioContext', fn='resume', demands=['OfflineAudioContext'], returns='None'),
    ],
    "requestdata": [
        PrototypeCall(constructor='MediaRecorder', fn='requestData', demands=['MediaRecorder'], returns='None'),
    ],
    "BlobEvent": [
        NewCall(constructor='BlobEvent', demands=['str', 'TODO_UNKNOWN_TYPE_BlobEventInit'], returns='BlobEvent'),
    ],
    "enableioes": [
        PrototypeCall(constructor='OES_draw_buffers_indexed', fn='enableiOES', demands=['OES_draw_buffers_indexed', 'TODO_UNKNOWN_TYPE_GLenum', 'TODO_UNKNOWN_TYPE_GLuint'], returns='None'),
    ],
    "disableioes": [
        PrototypeCall(constructor='OES_draw_buffers_indexed', fn='disableiOES', demands=['OES_draw_buffers_indexed', 'TODO_UNKNOWN_TYPE_GLenum', 'TODO_UNKNOWN_TYPE_GLuint'], returns='None'),
    ],
    "blendequationioes": [
        PrototypeCall(constructor='OES_draw_buffers_indexed', fn='blendEquationiOES', demands=['OES_draw_buffers_indexed', 'TODO_UNKNOWN_TYPE_GLuint', 'TODO_UNKNOWN_TYPE_GLenum'], returns='None'),
    ],
    "blendequationseparateioes": [
        PrototypeCall(constructor='OES_draw_buffers_indexed', fn='blendEquationSeparateiOES', demands=['OES_draw_buffers_indexed', 'TODO_UNKNOWN_TYPE_GLuint', 'TODO_UNKNOWN_TYPE_GLenum', 'TODO_UNKNOWN_TYPE_GLenum'], returns='None'),
    ],
    "blendfuncioes": [
        PrototypeCall(constructor='OES_draw_buffers_indexed', fn='blendFunciOES', demands=['OES_draw_buffers_indexed', 'TODO_UNKNOWN_TYPE_GLuint', 'TODO_UNKNOWN_TYPE_GLenum', 'TODO_UNKNOWN_TYPE_GLenum'], returns='None'),
    ],
    "blendfuncseparateioes": [
        PrototypeCall(constructor='OES_draw_buffers_indexed', fn='blendFuncSeparateiOES', demands=['OES_draw_buffers_indexed', 'TODO_UNKNOWN_TYPE_GLuint', 'TODO_UNKNOWN_TYPE_GLenum', 'TODO_UNKNOWN_TYPE_GLenum', 'TODO_UNKNOWN_TYPE_GLenum', 'TODO_UNKNOWN_TYPE_GLenum'], returns='None'),
    ],
    "colormaskioes": [
        PrototypeCall(constructor='OES_draw_buffers_indexed', fn='colorMaskiOES', demands=['OES_draw_buffers_indexed', 'TODO_UNKNOWN_TYPE_GLuint', 'TODO_UNKNOWN_TYPE_GLboolean', 'TODO_UNKNOWN_TYPE_GLboolean', 'TODO_UNKNOWN_TYPE_GLboolean', 'TODO_UNKNOWN_TYPE_GLboolean'], returns='None'),
    ],
    "UIEvent": [
        NewCall(constructor='UIEvent', demands=['str', 'TODO_UNKNOWN_TYPE_UIEventInit'], returns='UIEvent'),
    ],
    "FocusEvent": [
        NewCall(constructor='FocusEvent', demands=['str', 'TODO_UNKNOWN_TYPE_FocusEventInit'], returns='FocusEvent'),
    ],
    "MouseEvent": [
        NewCall(constructor='MouseEvent', demands=['str', 'TODO_UNKNOWN_TYPE_MouseEventInit'], returns='MouseEvent'),
    ],
    "getmodifierstate": [
        PrototypeCall(constructor='MouseEvent', fn='getModifierState', demands=['MouseEvent', 'str'], returns='bool'),
        PrototypeCall(constructor='KeyboardEvent', fn='getModifierState', demands=['KeyboardEvent', 'str'], returns='bool'),
        PrototypeCall(constructor='TouchEvent', fn='getModifierState', demands=['TouchEvent', 'str'], returns='bool'),
    ],
    "WheelEvent": [
        NewCall(constructor='WheelEvent', demands=['str', 'TODO_UNKNOWN_TYPE_WheelEventInit'], returns='WheelEvent'),
    ],
    "InputEvent": [
        NewCall(constructor='InputEvent', demands=['str', 'TODO_UNKNOWN_TYPE_InputEventInit'], returns='InputEvent'),
    ],
    "KeyboardEvent": [
        NewCall(constructor='KeyboardEvent', demands=['str', 'TODO_UNKNOWN_TYPE_KeyboardEventInit'], returns='KeyboardEvent'),
    ],
    "CompositionEvent": [
        NewCall(constructor='CompositionEvent', demands=['str', 'TODO_UNKNOWN_TYPE_CompositionEventInit'], returns='CompositionEvent'),
    ],
    "inittextevent": [
        PrototypeCall(constructor='TextEvent', fn='initTextEvent', demands=['TextEvent', 'str', 'bool', 'bool', 'Window', 'str'], returns='None'),
    ],
    "SensorErrorEvent": [
        NewCall(constructor='SensorErrorEvent', demands=['str', 'TODO_UNKNOWN_TYPE_SensorErrorEventInit'], returns='SensorErrorEvent'),
    ],
    "USBConnectionEvent": [
        NewCall(constructor='USBConnectionEvent', demands=['str', 'TODO_UNKNOWN_TYPE_USBConnectionEventInit'], returns='USBConnectionEvent'),
    ],
    "USBInTransferResult": [
        NewCall(constructor='USBInTransferResult', demands=['TODO_UNKNOWN_TYPE_USBTransferStatus', 'TODO_UNKNOWN_TYPE_DataView'], returns='USBInTransferResult'),
    ],
    "USBOutTransferResult": [
        NewCall(constructor='USBOutTransferResult', demands=['TODO_UNKNOWN_TYPE_USBTransferStatus', 'int'], returns='USBOutTransferResult'),
    ],
    "USBIsochronousInTransferPacket": [
        NewCall(constructor='USBIsochronousInTransferPacket', demands=['TODO_UNKNOWN_TYPE_USBTransferStatus', 'TODO_UNKNOWN_TYPE_DataView'], returns='USBIsochronousInTransferPacket'),
    ],
    "USBIsochronousInTransferResult": [
        NewCall(constructor='USBIsochronousInTransferResult', demands=['TODO_UNKNOWN_TYPE_USBIsochronousInTransferPacket', 'TODO_UNKNOWN_TYPE_DataView'], returns='USBIsochronousInTransferResult'),
    ],
    "USBIsochronousOutTransferPacket": [
        NewCall(constructor='USBIsochronousOutTransferPacket', demands=['TODO_UNKNOWN_TYPE_USBTransferStatus', 'int'], returns='USBIsochronousOutTransferPacket'),
    ],
    "USBIsochronousOutTransferResult": [
        NewCall(constructor='USBIsochronousOutTransferResult', demands=['TODO_UNKNOWN_TYPE_USBIsochronousOutTransferPacket'], returns='USBIsochronousOutTransferResult'),
    ],
    "selectconfiguration": [
        PrototypeCall(constructor='USBDevice', fn='selectConfiguration', demands=['USBDevice', 'TODO_UNKNOWN_TYPE_octet'], returns='None'),
    ],
    "claiminterface": [
        PrototypeCall(constructor='USBDevice', fn='claimInterface', demands=['USBDevice', 'TODO_UNKNOWN_TYPE_octet'], returns='None'),
    ],
    "releaseinterface": [
        PrototypeCall(constructor='USBDevice', fn='releaseInterface', demands=['USBDevice', 'TODO_UNKNOWN_TYPE_octet'], returns='None'),
    ],
    "selectalternateinterface": [
        PrototypeCall(constructor='USBDevice', fn='selectAlternateInterface', demands=['USBDevice', 'TODO_UNKNOWN_TYPE_octet', 'TODO_UNKNOWN_TYPE_octet'], returns='None'),
    ],
    "controltransferin": [
        PrototypeCall(constructor='USBDevice', fn='controlTransferIn', demands=['USBDevice', 'TODO_UNKNOWN_TYPE_USBControlTransferParameters', 'TODO_UNKNOWN_TYPE_unsigned short'], returns='TODO_UNKNOWN_TYPE_USBInTransferResult'),
    ],
    "controltransferout": [
        PrototypeCall(constructor='USBDevice', fn='controlTransferOut', demands=['USBDevice', 'TODO_UNKNOWN_TYPE_USBControlTransferParameters', 'TODO_UNKNOWN_TYPE_BufferSource'], returns='TODO_UNKNOWN_TYPE_USBOutTransferResult'),
    ],
    "clearhalt": [
        PrototypeCall(constructor='USBDevice', fn='clearHalt', demands=['USBDevice', 'TODO_UNKNOWN_TYPE_USBDirection', 'TODO_UNKNOWN_TYPE_octet'], returns='None'),
    ],
    "transferin": [
        PrototypeCall(constructor='USBDevice', fn='transferIn', demands=['USBDevice', 'TODO_UNKNOWN_TYPE_octet', 'int'], returns='TODO_UNKNOWN_TYPE_USBInTransferResult'),
    ],
    "transferout": [
        PrototypeCall(constructor='USBDevice', fn='transferOut', demands=['USBDevice', 'TODO_UNKNOWN_TYPE_octet', 'TODO_UNKNOWN_TYPE_BufferSource'], returns='TODO_UNKNOWN_TYPE_USBOutTransferResult'),
    ],
    "isochronoustransferin": [
        PrototypeCall(constructor='USBDevice', fn='isochronousTransferIn', demands=['USBDevice', 'TODO_UNKNOWN_TYPE_octet', 'int'], returns='TODO_UNKNOWN_TYPE_USBIsochronousInTransferResult'),
    ],
    "isochronoustransferout": [
        PrototypeCall(constructor='USBDevice', fn='isochronousTransferOut', demands=['USBDevice', 'TODO_UNKNOWN_TYPE_octet', 'TODO_UNKNOWN_TYPE_BufferSource', 'int'], returns='TODO_UNKNOWN_TYPE_USBIsochronousOutTransferResult'),
    ],
    "USBConfiguration": [
        NewCall(constructor='USBConfiguration', demands=['TODO_UNKNOWN_TYPE_USBDevice', 'TODO_UNKNOWN_TYPE_octet'], returns='USBConfiguration'),
    ],
    "USBInterface": [
        NewCall(constructor='USBInterface', demands=['TODO_UNKNOWN_TYPE_USBConfiguration', 'TODO_UNKNOWN_TYPE_octet'], returns='USBInterface'),
    ],
    "USBAlternateInterface": [
        NewCall(constructor='USBAlternateInterface', demands=['TODO_UNKNOWN_TYPE_USBInterface', 'TODO_UNKNOWN_TYPE_octet'], returns='USBAlternateInterface'),
    ],
    "USBEndpoint": [
        NewCall(constructor='USBEndpoint', demands=['TODO_UNKNOWN_TYPE_USBAlternateInterface', 'TODO_UNKNOWN_TYPE_octet', 'TODO_UNKNOWN_TYPE_USBDirection'], returns='USBEndpoint'),
    ],
    "pseudo": [
        PrototypeCall(constructor='CSSPseudoElement', fn='pseudo', demands=['CSSPseudoElement', 'TODO_UNKNOWN_TYPE_CSSOMString'], returns='TODO_UNKNOWN_TYPE_CSSPseudoElement'),
    ],
    "inittimeevent": [
        PrototypeCall(constructor='TimeEvent', fn='initTimeEvent', demands=['TimeEvent', 'str', 'Window', 'TODO_UNKNOWN_TYPE_long'], returns='None'),
    ],
    "getstarttime": [
        PrototypeCall(constructor='SVGAnimationElement', fn='getStartTime', demands=['SVGAnimationElement'], returns='TODO_UNKNOWN_TYPE_float'),
    ],
    "getcurrenttime": [
        PrototypeCall(constructor='SVGAnimationElement', fn='getCurrentTime', demands=['SVGAnimationElement'], returns='TODO_UNKNOWN_TYPE_float'),
    ],
    "getsimpleduration": [
        PrototypeCall(constructor='SVGAnimationElement', fn='getSimpleDuration', demands=['SVGAnimationElement'], returns='TODO_UNKNOWN_TYPE_float'),
    ],
    "beginelement": [
        PrototypeCall(constructor='SVGAnimationElement', fn='beginElement', demands=['SVGAnimationElement'], returns='None'),
    ],
    "beginelementat": [
        PrototypeCall(constructor='SVGAnimationElement', fn='beginElementAt', demands=['SVGAnimationElement', 'TODO_UNKNOWN_TYPE_float'], returns='None'),
    ],
    "endelement": [
        PrototypeCall(constructor='SVGAnimationElement', fn='endElement', demands=['SVGAnimationElement'], returns='None'),
    ],
    "endelementat": [
        PrototypeCall(constructor='SVGAnimationElement', fn='endElementAt', demands=['SVGAnimationElement', 'TODO_UNKNOWN_TYPE_float'], returns='None'),
    ],
    "NavigationEvent": [
        NewCall(constructor='NavigationEvent', demands=['str', 'TODO_UNKNOWN_TYPE_NavigationEventInit'], returns='NavigationEvent'),
    ],
    "framebuffertexturemultiviewovr": [
        PrototypeCall(constructor='OVR_multiview2', fn='framebufferTextureMultiviewOVR', demands=['OVR_multiview2', 'TODO_UNKNOWN_TYPE_GLenum', 'TODO_UNKNOWN_TYPE_GLenum', 'TODO_UNKNOWN_TYPE_WebGLTexture', 'TODO_UNKNOWN_TYPE_GLint', 'TODO_UNKNOWN_TYPE_GLint', 'TODO_UNKNOWN_TYPE_GLsizei'], returns='None'),
    ],
    "Accelerometer": [
        NewCall(constructor='Accelerometer', demands=['TODO_UNKNOWN_TYPE_AccelerometerSensorOptions'], returns='Accelerometer'),
    ],
    "LinearAccelerationSensor": [
        NewCall(constructor='LinearAccelerationSensor', demands=['TODO_UNKNOWN_TYPE_AccelerometerSensorOptions'], returns='LinearAccelerationSensor'),
    ],
    "GravitySensor": [
        NewCall(constructor='GravitySensor', demands=['TODO_UNKNOWN_TYPE_AccelerometerSensorOptions'], returns='GravitySensor'),
    ],
    "WebTransport": [
        NewCall(constructor='WebTransport', demands=['str', 'TODO_UNKNOWN_TYPE_WebTransportOptions'], returns='WebTransport'),
    ],
    "exportkeyingmaterial": [
        PrototypeCall(constructor='WebTransport', fn='exportKeyingMaterial', demands=['WebTransport', 'TODO_UNKNOWN_TYPE_BufferSource', 'TODO_UNKNOWN_TYPE_BufferSource'], returns='TODO_UNKNOWN_TYPE_ArrayBuffer'),
    ],
    "createbidirectionalstream": [
        PrototypeCall(constructor='WebTransport', fn='createBidirectionalStream', demands=['WebTransport', 'TODO_UNKNOWN_TYPE_WebTransportSendStreamOptions'], returns='TODO_UNKNOWN_TYPE_WebTransportBidirectionalStream'),
    ],
    "createunidirectionalstream": [
        PrototypeCall(constructor='WebTransport', fn='createUnidirectionalStream', demands=['WebTransport', 'TODO_UNKNOWN_TYPE_WebTransportSendStreamOptions'], returns='TODO_UNKNOWN_TYPE_WebTransportSendStream'),
    ],
    "createsendgroup": [
        PrototypeCall(constructor='WebTransport', fn='createSendGroup', demands=['WebTransport'], returns='TODO_UNKNOWN_TYPE_WebTransportSendGroup'),
    ],
    "getwriter": [
        PrototypeCall(constructor='WebTransportSendStream', fn='getWriter', demands=['WebTransportSendStream'], returns='TODO_UNKNOWN_TYPE_WebTransportWriter'),
        PrototypeCall(constructor='WritableStream', fn='getWriter', demands=['WritableStream'], returns='TODO_UNKNOWN_TYPE_WritableStreamDefaultWriter'),
    ],
    "atomicwrite": [
        PrototypeCall(constructor='WebTransportWriter', fn='atomicWrite', demands=['WebTransportWriter', '*'], returns='None'),
    ],
    "WebTransportError": [
        NewCall(constructor='WebTransportError', demands=['str', 'TODO_UNKNOWN_TYPE_WebTransportErrorOptions'], returns='WebTransportError'),
    ],
    "Module": [
        NewCall(constructor='Module', demands=['TODO_UNKNOWN_TYPE_BufferSource'], returns='Module'),
    ],
    "exports": [
        DirectCall(fn='exports', receiver='Module', demands=['TODO_UNKNOWN_TYPE_Module'], returns='TODO_UNKNOWN_TYPE_ModuleExportDescriptor'),
    ],
    "imports": [
        DirectCall(fn='imports', receiver='Module', demands=['TODO_UNKNOWN_TYPE_Module'], returns='TODO_UNKNOWN_TYPE_ModuleImportDescriptor'),
    ],
    "customsections": [
        DirectCall(fn='customSections', receiver='Module', demands=['TODO_UNKNOWN_TYPE_Module', 'str'], returns='TODO_UNKNOWN_TYPE_ArrayBuffer'),
    ],
    "Instance": [
        NewCall(constructor='Instance', demands=['TODO_UNKNOWN_TYPE_Module', 'TODO_UNKNOWN_TYPE_object'], returns='Instance'),
    ],
    "Memory": [
        NewCall(constructor='Memory', demands=['TODO_UNKNOWN_TYPE_MemoryDescriptor'], returns='Memory'),
    ],
    "grow": [
        PrototypeCall(constructor='Memory', fn='grow', demands=['Memory', 'int'], returns='int'),
        PrototypeCall(constructor='Table', fn='grow', demands=['Table', 'int', '*'], returns='int'),
    ],
    "tofixedlengthbuffer": [
        PrototypeCall(constructor='Memory', fn='toFixedLengthBuffer', demands=['Memory'], returns='TODO_UNKNOWN_TYPE_ArrayBuffer'),
    ],
    "toresizablebuffer": [
        PrototypeCall(constructor='Memory', fn='toResizableBuffer', demands=['Memory'], returns='TODO_UNKNOWN_TYPE_ArrayBuffer'),
    ],
    "Table": [
        NewCall(constructor='Table', demands=['TODO_UNKNOWN_TYPE_TableDescriptor', '*'], returns='Table'),
    ],
    "Global": [
        NewCall(constructor='Global', demands=['TODO_UNKNOWN_TYPE_GlobalDescriptor', '*'], returns='Global'),
    ],
    "valueof": [
        PrototypeCall(constructor='Global', fn='valueOf', demands=['Global'], returns='*'),
    ],
    "SpeechRecognition": [
        NewCall(constructor='SpeechRecognition', demands=[], returns='SpeechRecognition'),
    ],
    "available": [
        DirectCall(fn='available', receiver='SpeechRecognition', demands=['TODO_UNKNOWN_TYPE_SpeechRecognitionOptions'], returns='TODO_UNKNOWN_TYPE_AvailabilityStatus'),
    ],
    "install": [
        DirectCall(fn='install', receiver='SpeechRecognition', demands=['TODO_UNKNOWN_TYPE_SpeechRecognitionOptions'], returns='bool'),
    ],
    "SpeechRecognitionErrorEvent": [
        NewCall(constructor='SpeechRecognitionErrorEvent', demands=['str', 'TODO_UNKNOWN_TYPE_SpeechRecognitionErrorEventInit'], returns='SpeechRecognitionErrorEvent'),
    ],
    "SpeechRecognitionEvent": [
        NewCall(constructor='SpeechRecognitionEvent', demands=['str', 'TODO_UNKNOWN_TYPE_SpeechRecognitionEventInit'], returns='SpeechRecognitionEvent'),
    ],
    "SpeechGrammarList": [
        NewCall(constructor='SpeechGrammarList', demands=[], returns='SpeechGrammarList'),
    ],
    "addfromuri": [
        PrototypeCall(constructor='SpeechGrammarList', fn='addFromURI', demands=['SpeechGrammarList', 'str', 'TODO_UNKNOWN_TYPE_float'], returns='None'),
    ],
    "addfromstring": [
        PrototypeCall(constructor='SpeechGrammarList', fn='addFromString', demands=['SpeechGrammarList', 'str', 'TODO_UNKNOWN_TYPE_float'], returns='None'),
    ],
    "SpeechRecognitionPhrase": [
        NewCall(constructor='SpeechRecognitionPhrase', demands=['str', 'TODO_UNKNOWN_TYPE_float'], returns='SpeechRecognitionPhrase'),
    ],
    "speak": [
        PrototypeCall(constructor='SpeechSynthesis', fn='speak', demands=['SpeechSynthesis', 'TODO_UNKNOWN_TYPE_SpeechSynthesisUtterance'], returns='None'),
    ],
    "getvoices": [
        PrototypeCall(constructor='SpeechSynthesis', fn='getVoices', demands=['SpeechSynthesis'], returns='TODO_UNKNOWN_TYPE_SpeechSynthesisVoice'),
    ],
    "SpeechSynthesisUtterance": [
        NewCall(constructor='SpeechSynthesisUtterance', demands=['str'], returns='SpeechSynthesisUtterance'),
    ],
    "SpeechSynthesisEvent": [
        NewCall(constructor='SpeechSynthesisEvent', demands=['str', 'TODO_UNKNOWN_TYPE_SpeechSynthesisEventInit'], returns='SpeechSynthesisEvent'),
    ],
    "SpeechSynthesisErrorEvent": [
        NewCall(constructor='SpeechSynthesisErrorEvent', demands=['str', 'TODO_UNKNOWN_TYPE_SpeechSynthesisErrorEventInit'], returns='SpeechSynthesisErrorEvent'),
    ],
    "unregister": [
        PrototypeCall(constructor='ServiceWorkerRegistration', fn='unregister', demands=['ServiceWorkerRegistration'], returns='bool'),
        PrototypeCall(constructor='PeriodicSyncManager', fn='unregister', demands=['PeriodicSyncManager', 'str'], returns='None'),
    ],
    "getregistration": [
        PrototypeCall(constructor='ServiceWorkerContainer', fn='getRegistration', demands=['ServiceWorkerContainer', 'str'], returns='TODO_UNKNOWN_TYPE_ServiceWorkerRegistration'),
    ],
    "getregistrations": [
        PrototypeCall(constructor='ServiceWorkerContainer', fn='getRegistrations', demands=['ServiceWorkerContainer'], returns='TODO_UNKNOWN_TYPE_ServiceWorkerRegistration'),
    ],
    "startmessages": [
        PrototypeCall(constructor='ServiceWorkerContainer', fn='startMessages', demands=['ServiceWorkerContainer'], returns='None'),
    ],
    "enable": [
        PrototypeCall(constructor='NavigationPreloadManager', fn='enable', demands=['NavigationPreloadManager'], returns='None'),
    ],
    "disable": [
        PrototypeCall(constructor='NavigationPreloadManager', fn='disable', demands=['NavigationPreloadManager'], returns='None'),
    ],
    "setheadervalue": [
        PrototypeCall(constructor='NavigationPreloadManager', fn='setHeaderValue', demands=['NavigationPreloadManager', 'TODO_UNKNOWN_TYPE_ByteString'], returns='None'),
    ],
    "skipwaiting": [
        PrototypeCall(constructor='ServiceWorkerGlobalScope', fn='skipWaiting', demands=['ServiceWorkerGlobalScope'], returns='None'),
    ],
    "matchall": [
        PrototypeCall(constructor='Clients', fn='matchAll', demands=['Clients', 'TODO_UNKNOWN_TYPE_ClientQueryOptions'], returns='TODO_UNKNOWN_TYPE_Client'),
        PrototypeCall(constructor='Cache', fn='matchAll', demands=['Cache', 'TODO_UNKNOWN_TYPE_RequestInfo', 'TODO_UNKNOWN_TYPE_CacheQueryOptions'], returns='TODO_UNKNOWN_TYPE_Response'),
        PrototypeCall(constructor='BackgroundFetchRegistration', fn='matchAll', demands=['BackgroundFetchRegistration', 'TODO_UNKNOWN_TYPE_RequestInfo', 'TODO_UNKNOWN_TYPE_CacheQueryOptions'], returns='TODO_UNKNOWN_TYPE_BackgroundFetchRecord'),
    ],
    "claim": [
        PrototypeCall(constructor='Clients', fn='claim', demands=['Clients'], returns='None'),
    ],
    "ExtendableEvent": [
        NewCall(constructor='ExtendableEvent', demands=['str', 'TODO_UNKNOWN_TYPE_ExtendableEventInit'], returns='ExtendableEvent'),
    ],
    "waituntil": [
        PrototypeCall(constructor='ExtendableEvent', fn='waitUntil', demands=['ExtendableEvent', '*'], returns='None'),
    ],
    "InstallEvent": [
        NewCall(constructor='InstallEvent', demands=['str', 'TODO_UNKNOWN_TYPE_ExtendableEventInit'], returns='InstallEvent'),
    ],
    "addroutes": [
        PrototypeCall(constructor='InstallEvent', fn='addRoutes', demands=['InstallEvent', 'TODO_UNKNOWN_TYPE_RouterRule'], returns='None'),
    ],
    "FetchEvent": [
        NewCall(constructor='FetchEvent', demands=['str', 'TODO_UNKNOWN_TYPE_FetchEventInit'], returns='FetchEvent'),
    ],
    "ExtendableMessageEvent": [
        NewCall(constructor='ExtendableMessageEvent', demands=['str', 'TODO_UNKNOWN_TYPE_ExtendableMessageEventInit'], returns='ExtendableMessageEvent'),
    ],
    "match": [
        PrototypeCall(constructor='Cache', fn='match', demands=['Cache', 'TODO_UNKNOWN_TYPE_RequestInfo', 'TODO_UNKNOWN_TYPE_CacheQueryOptions'], returns='TODO_UNKNOWN_TYPE_Response'),
        PrototypeCall(constructor='CacheStorage', fn='match', demands=['CacheStorage', 'TODO_UNKNOWN_TYPE_RequestInfo', 'TODO_UNKNOWN_TYPE_MultiCacheQueryOptions'], returns='TODO_UNKNOWN_TYPE_Response'),
        PrototypeCall(constructor='BackgroundFetchRegistration', fn='match', demands=['BackgroundFetchRegistration', 'TODO_UNKNOWN_TYPE_RequestInfo', 'TODO_UNKNOWN_TYPE_CacheQueryOptions'], returns='TODO_UNKNOWN_TYPE_BackgroundFetchRecord'),
    ],
    "addall": [
        PrototypeCall(constructor='Cache', fn='addAll', demands=['Cache', 'TODO_UNKNOWN_TYPE_RequestInfo'], returns='None'),
    ],
    "PictureInPictureEvent": [
        NewCall(constructor='PictureInPictureEvent', demands=['str', 'TODO_UNKNOWN_TYPE_PictureInPictureEventInit'], returns='PictureInPictureEvent'),
    ],
    "getsupportedprofiles": [
        PrototypeCall(constructor='WEBGL_compressed_texture_astc', fn='getSupportedProfiles', demands=['WEBGL_compressed_texture_astc'], returns='str'),
    ],
    "allowsfeature": [
        PrototypeCall(constructor='PermissionsPolicy', fn='allowsFeature', demands=['PermissionsPolicy', 'str', 'str'], returns='bool'),
    ],
    "features": [
        PrototypeCall(constructor='PermissionsPolicy', fn='features', demands=['PermissionsPolicy'], returns='str'),
    ],
    "allowedfeatures": [
        PrototypeCall(constructor='PermissionsPolicy', fn='allowedFeatures', demands=['PermissionsPolicy'], returns='str'),
    ],
    "getallowlistforfeature": [
        PrototypeCall(constructor='PermissionsPolicy', fn='getAllowlistForFeature', demands=['PermissionsPolicy', 'str'], returns='str'),
    ],
    "parseall": [
        DirectCall(fn='parseAll', receiver='CSSStyleValue', demands=['str', 'str'], returns='TODO_UNKNOWN_TYPE_CSSStyleValue'),
    ],
    "CSSUnparsedValue": [
        NewCall(constructor='CSSUnparsedValue', demands=['TODO_UNKNOWN_TYPE_CSSUnparsedSegment'], returns='CSSUnparsedValue'),
    ],
    "CSSVariableReferenceValue": [
        NewCall(constructor='CSSVariableReferenceValue', demands=['str', 'TODO_UNKNOWN_TYPE_CSSUnparsedValue'], returns='CSSVariableReferenceValue'),
    ],
    "CSSKeywordValue": [
        NewCall(constructor='CSSKeywordValue', demands=['str'], returns='CSSKeywordValue'),
    ],
    "sub": [
        PrototypeCall(constructor='CSSNumericValue', fn='sub', demands=['CSSNumericValue', 'TODO_UNKNOWN_TYPE_CSSNumberish'], returns='TODO_UNKNOWN_TYPE_CSSNumericValue'),
    ],
    "mul": [
        PrototypeCall(constructor='CSSNumericValue', fn='mul', demands=['CSSNumericValue', 'TODO_UNKNOWN_TYPE_CSSNumberish'], returns='TODO_UNKNOWN_TYPE_CSSNumericValue'),
    ],
    "div": [
        PrototypeCall(constructor='CSSNumericValue', fn='div', demands=['CSSNumericValue', 'TODO_UNKNOWN_TYPE_CSSNumberish'], returns='TODO_UNKNOWN_TYPE_CSSNumericValue'),
    ],
    "min": [
        PrototypeCall(constructor='CSSNumericValue', fn='min', demands=['CSSNumericValue', 'TODO_UNKNOWN_TYPE_CSSNumberish'], returns='TODO_UNKNOWN_TYPE_CSSNumericValue'),
    ],
    "max": [
        PrototypeCall(constructor='CSSNumericValue', fn='max', demands=['CSSNumericValue', 'TODO_UNKNOWN_TYPE_CSSNumberish'], returns='TODO_UNKNOWN_TYPE_CSSNumericValue'),
    ],
    "equals": [
        PrototypeCall(constructor='CSSNumericValue', fn='equals', demands=['CSSNumericValue', 'TODO_UNKNOWN_TYPE_CSSNumberish'], returns='bool'),
    ],
    "to": [
        PrototypeCall(constructor='CSSNumericValue', fn='to', demands=['CSSNumericValue', 'str'], returns='TODO_UNKNOWN_TYPE_CSSUnitValue'),
    ],
    "tosum": [
        PrototypeCall(constructor='CSSNumericValue', fn='toSum', demands=['CSSNumericValue', 'str'], returns='TODO_UNKNOWN_TYPE_CSSMathSum'),
    ],
    "type": [
        PrototypeCall(constructor='CSSNumericValue', fn='type', demands=['CSSNumericValue'], returns='TODO_UNKNOWN_TYPE_CSSNumericType'),
    ],
    "CSSUnitValue": [
        NewCall(constructor='CSSUnitValue', demands=['TODO_UNKNOWN_TYPE_double', 'str'], returns='CSSUnitValue'),
    ],
    "CSSMathSum": [
        NewCall(constructor='CSSMathSum', demands=['TODO_UNKNOWN_TYPE_CSSNumberish'], returns='CSSMathSum'),
    ],
    "CSSMathProduct": [
        NewCall(constructor='CSSMathProduct', demands=['TODO_UNKNOWN_TYPE_CSSNumberish'], returns='CSSMathProduct'),
    ],
    "CSSMathNegate": [
        NewCall(constructor='CSSMathNegate', demands=['TODO_UNKNOWN_TYPE_CSSNumberish'], returns='CSSMathNegate'),
    ],
    "CSSMathInvert": [
        NewCall(constructor='CSSMathInvert', demands=['TODO_UNKNOWN_TYPE_CSSNumberish'], returns='CSSMathInvert'),
    ],
    "CSSMathMin": [
        NewCall(constructor='CSSMathMin', demands=['TODO_UNKNOWN_TYPE_CSSNumberish'], returns='CSSMathMin'),
    ],
    "CSSMathMax": [
        NewCall(constructor='CSSMathMax', demands=['TODO_UNKNOWN_TYPE_CSSNumberish'], returns='CSSMathMax'),
    ],
    "CSSMathClamp": [
        NewCall(constructor='CSSMathClamp', demands=['TODO_UNKNOWN_TYPE_CSSNumberish', 'TODO_UNKNOWN_TYPE_CSSNumberish', 'TODO_UNKNOWN_TYPE_CSSNumberish'], returns='CSSMathClamp'),
    ],
    "CSSTransformValue": [
        NewCall(constructor='CSSTransformValue', demands=['TODO_UNKNOWN_TYPE_CSSTransformComponent'], returns='CSSTransformValue'),
    ],
    "tomatrix": [
        PrototypeCall(constructor='CSSTransformValue', fn='toMatrix', demands=['CSSTransformValue'], returns='TODO_UNKNOWN_TYPE_DOMMatrix'),
        PrototypeCall(constructor='CSSTransformComponent', fn='toMatrix', demands=['CSSTransformComponent'], returns='TODO_UNKNOWN_TYPE_DOMMatrix'),
    ],
    "CSSTranslate": [
        NewCall(constructor='CSSTranslate', demands=['TODO_UNKNOWN_TYPE_CSSNumericValue', 'TODO_UNKNOWN_TYPE_CSSNumericValue', 'TODO_UNKNOWN_TYPE_CSSNumericValue'], returns='CSSTranslate'),
    ],
    "CSSRotate": [
        NewCall(constructor='CSSRotate', demands=['TODO_UNKNOWN_TYPE_CSSNumericValue'], returns='CSSRotate'),
        NewCall(constructor='CSSRotate', demands=['TODO_UNKNOWN_TYPE_CSSNumberish', 'TODO_UNKNOWN_TYPE_CSSNumberish', 'TODO_UNKNOWN_TYPE_CSSNumberish', 'TODO_UNKNOWN_TYPE_CSSNumericValue'], returns='CSSRotate'),
    ],
    "CSSScale": [
        NewCall(constructor='CSSScale', demands=['TODO_UNKNOWN_TYPE_CSSNumberish', 'TODO_UNKNOWN_TYPE_CSSNumberish', 'TODO_UNKNOWN_TYPE_CSSNumberish'], returns='CSSScale'),
    ],
    "CSSSkew": [
        NewCall(constructor='CSSSkew', demands=['TODO_UNKNOWN_TYPE_CSSNumericValue', 'TODO_UNKNOWN_TYPE_CSSNumericValue'], returns='CSSSkew'),
    ],
    "CSSSkewX": [
        NewCall(constructor='CSSSkewX', demands=['TODO_UNKNOWN_TYPE_CSSNumericValue'], returns='CSSSkewX'),
    ],
    "CSSSkewY": [
        NewCall(constructor='CSSSkewY', demands=['TODO_UNKNOWN_TYPE_CSSNumericValue'], returns='CSSSkewY'),
    ],
    "CSSPerspective": [
        NewCall(constructor='CSSPerspective', demands=['TODO_UNKNOWN_TYPE_CSSPerspectiveValue'], returns='CSSPerspective'),
    ],
    "CSSMatrixComponent": [
        NewCall(constructor='CSSMatrixComponent', demands=['TODO_UNKNOWN_TYPE_DOMMatrixReadOnly', 'TODO_UNKNOWN_TYPE_CSSMatrixComponentOptions'], returns='CSSMatrixComponent'),
    ],
    "CSSRGB": [
        NewCall(constructor='CSSRGB', demands=['TODO_UNKNOWN_TYPE_CSSColorRGBComp', 'TODO_UNKNOWN_TYPE_CSSColorRGBComp', 'TODO_UNKNOWN_TYPE_CSSColorRGBComp', 'TODO_UNKNOWN_TYPE_CSSColorPercent'], returns='CSSRGB'),
    ],
    "CSSHSL": [
        NewCall(constructor='CSSHSL', demands=['TODO_UNKNOWN_TYPE_CSSColorAngle', 'TODO_UNKNOWN_TYPE_CSSColorPercent', 'TODO_UNKNOWN_TYPE_CSSColorPercent', 'TODO_UNKNOWN_TYPE_CSSColorPercent'], returns='CSSHSL'),
    ],
    "CSSHWB": [
        NewCall(constructor='CSSHWB', demands=['TODO_UNKNOWN_TYPE_CSSNumericValue', 'TODO_UNKNOWN_TYPE_CSSNumberish', 'TODO_UNKNOWN_TYPE_CSSNumberish', 'TODO_UNKNOWN_TYPE_CSSNumberish'], returns='CSSHWB'),
    ],
    "CSSLab": [
        NewCall(constructor='CSSLab', demands=['TODO_UNKNOWN_TYPE_CSSColorPercent', 'TODO_UNKNOWN_TYPE_CSSColorNumber', 'TODO_UNKNOWN_TYPE_CSSColorNumber', 'TODO_UNKNOWN_TYPE_CSSColorPercent'], returns='CSSLab'),
    ],
    "CSSLCH": [
        NewCall(constructor='CSSLCH', demands=['TODO_UNKNOWN_TYPE_CSSColorPercent', 'TODO_UNKNOWN_TYPE_CSSColorPercent', 'TODO_UNKNOWN_TYPE_CSSColorAngle', 'TODO_UNKNOWN_TYPE_CSSColorPercent'], returns='CSSLCH'),
    ],
    "CSSOKLab": [
        NewCall(constructor='CSSOKLab', demands=['TODO_UNKNOWN_TYPE_CSSColorPercent', 'TODO_UNKNOWN_TYPE_CSSColorNumber', 'TODO_UNKNOWN_TYPE_CSSColorNumber', 'TODO_UNKNOWN_TYPE_CSSColorPercent'], returns='CSSOKLab'),
    ],
    "CSSOKLCH": [
        NewCall(constructor='CSSOKLCH', demands=['TODO_UNKNOWN_TYPE_CSSColorPercent', 'TODO_UNKNOWN_TYPE_CSSColorPercent', 'TODO_UNKNOWN_TYPE_CSSColorAngle', 'TODO_UNKNOWN_TYPE_CSSColorPercent'], returns='CSSOKLCH'),
    ],
    "CSSColor": [
        NewCall(constructor='CSSColor', demands=['TODO_UNKNOWN_TYPE_CSSKeywordish', 'TODO_UNKNOWN_TYPE_CSSColorPercent', 'TODO_UNKNOWN_TYPE_CSSNumberish'], returns='CSSColor'),
    ],
    "PointerTimeline": [
        NewCall(constructor='PointerTimeline', demands=['TODO_UNKNOWN_TYPE_PointerTimelineOptions'], returns='PointerTimeline'),
    ],
    "setstatus": [
        PrototypeCall(constructor='NavigatorLogin', fn='setStatus', demands=['NavigatorLogin', 'TODO_UNKNOWN_TYPE_LoginStatus'], returns='None'),
    ],
    "PresentationRequest": [
        NewCall(constructor='PresentationRequest', demands=['str'], returns='PresentationRequest'),
        NewCall(constructor='PresentationRequest', demands=['str'], returns='PresentationRequest'),
    ],
    "reconnect": [
        PrototypeCall(constructor='PresentationRequest', fn='reconnect', demands=['PresentationRequest', 'str'], returns='TODO_UNKNOWN_TYPE_PresentationConnection'),
    ],
    "PresentationConnectionAvailableEvent": [
        NewCall(constructor='PresentationConnectionAvailableEvent', demands=['str', 'TODO_UNKNOWN_TYPE_PresentationConnectionAvailableEventInit'], returns='PresentationConnectionAvailableEvent'),
    ],
    "PresentationConnectionCloseEvent": [
        NewCall(constructor='PresentationConnectionCloseEvent', demands=['str', 'TODO_UNKNOWN_TYPE_PresentationConnectionCloseEventInit'], returns='PresentationConnectionCloseEvent'),
    ],
    "BeforeInstallPromptEvent": [
        NewCall(constructor='BeforeInstallPromptEvent', demands=['str', 'TODO_UNKNOWN_TYPE_EventInit'], returns='BeforeInstallPromptEvent'),
    ],
    "ScrollTimeline": [
        NewCall(constructor='ScrollTimeline', demands=['TODO_UNKNOWN_TYPE_ScrollTimelineOptions'], returns='ScrollTimeline'),
    ],
    "ViewTimeline": [
        NewCall(constructor='ViewTimeline', demands=['TODO_UNKNOWN_TYPE_ViewTimelineOptions'], returns='ViewTimeline'),
    ],
    "DOMPointReadOnly": [
        NewCall(constructor='DOMPointReadOnly', demands=['TODO_UNKNOWN_TYPE_unrestricted double', 'TODO_UNKNOWN_TYPE_unrestricted double', 'TODO_UNKNOWN_TYPE_unrestricted double', 'TODO_UNKNOWN_TYPE_unrestricted double'], returns='DOMPointReadOnly'),
    ],
    "frompoint": [
        DirectCall(fn='fromPoint', receiver='DOMPointReadOnly', demands=['TODO_UNKNOWN_TYPE_DOMPointInit'], returns='TODO_UNKNOWN_TYPE_DOMPointReadOnly'),
        DirectCall(fn='fromPoint', receiver='DOMPoint', demands=['TODO_UNKNOWN_TYPE_DOMPointInit'], returns='TODO_UNKNOWN_TYPE_DOMPoint'),
    ],
    "matrixtransform": [
        PrototypeCall(constructor='DOMPointReadOnly', fn='matrixTransform', demands=['DOMPointReadOnly', 'TODO_UNKNOWN_TYPE_DOMMatrixInit'], returns='TODO_UNKNOWN_TYPE_DOMPoint'),
    ],
    "DOMPoint": [
        NewCall(constructor='DOMPoint', demands=['TODO_UNKNOWN_TYPE_unrestricted double', 'TODO_UNKNOWN_TYPE_unrestricted double', 'TODO_UNKNOWN_TYPE_unrestricted double', 'TODO_UNKNOWN_TYPE_unrestricted double'], returns='DOMPoint'),
    ],
    "DOMRectReadOnly": [
        NewCall(constructor='DOMRectReadOnly', demands=['TODO_UNKNOWN_TYPE_unrestricted double', 'TODO_UNKNOWN_TYPE_unrestricted double', 'TODO_UNKNOWN_TYPE_unrestricted double', 'TODO_UNKNOWN_TYPE_unrestricted double'], returns='DOMRectReadOnly'),
    ],
    "fromrect": [
        DirectCall(fn='fromRect', receiver='DOMRectReadOnly', demands=['TODO_UNKNOWN_TYPE_DOMRectInit'], returns='TODO_UNKNOWN_TYPE_DOMRectReadOnly'),
        DirectCall(fn='fromRect', receiver='DOMRect', demands=['TODO_UNKNOWN_TYPE_DOMRectInit'], returns='TODO_UNKNOWN_TYPE_DOMRect'),
        DirectCall(fn='fromRect', receiver='DOMQuad', demands=['TODO_UNKNOWN_TYPE_DOMRectInit'], returns='TODO_UNKNOWN_TYPE_DOMQuad'),
    ],
    "DOMRect": [
        NewCall(constructor='DOMRect', demands=['TODO_UNKNOWN_TYPE_unrestricted double', 'TODO_UNKNOWN_TYPE_unrestricted double', 'TODO_UNKNOWN_TYPE_unrestricted double', 'TODO_UNKNOWN_TYPE_unrestricted double'], returns='DOMRect'),
    ],
    "DOMQuad": [
        NewCall(constructor='DOMQuad', demands=['TODO_UNKNOWN_TYPE_DOMPointInit', 'TODO_UNKNOWN_TYPE_DOMPointInit', 'TODO_UNKNOWN_TYPE_DOMPointInit', 'TODO_UNKNOWN_TYPE_DOMPointInit'], returns='DOMQuad'),
    ],
    "fromquad": [
        DirectCall(fn='fromQuad', receiver='DOMQuad', demands=['TODO_UNKNOWN_TYPE_DOMQuadInit'], returns='TODO_UNKNOWN_TYPE_DOMQuad'),
    ],
    "getbounds": [
        PrototypeCall(constructor='DOMQuad', fn='getBounds', demands=['DOMQuad'], returns='TODO_UNKNOWN_TYPE_DOMRect'),
    ],
    "DOMMatrixReadOnly": [
        NewCall(constructor='DOMMatrixReadOnly', demands=['str'], returns='DOMMatrixReadOnly'),
    ],
    "frommatrix": [
        DirectCall(fn='fromMatrix', receiver='DOMMatrixReadOnly', demands=['TODO_UNKNOWN_TYPE_DOMMatrixInit'], returns='TODO_UNKNOWN_TYPE_DOMMatrixReadOnly'),
        DirectCall(fn='fromMatrix', receiver='DOMMatrix', demands=['TODO_UNKNOWN_TYPE_DOMMatrixInit'], returns='TODO_UNKNOWN_TYPE_DOMMatrix'),
    ],
    "fromfloat32array": [
        DirectCall(fn='fromFloat32Array', receiver='DOMMatrixReadOnly', demands=['TODO_UNKNOWN_TYPE_Float32Array'], returns='TODO_UNKNOWN_TYPE_DOMMatrixReadOnly'),
        DirectCall(fn='fromFloat32Array', receiver='DOMMatrix', demands=['TODO_UNKNOWN_TYPE_Float32Array'], returns='TODO_UNKNOWN_TYPE_DOMMatrix'),
    ],
    "fromfloat64array": [
        DirectCall(fn='fromFloat64Array', receiver='DOMMatrixReadOnly', demands=['TODO_UNKNOWN_TYPE_Float64Array'], returns='TODO_UNKNOWN_TYPE_DOMMatrixReadOnly'),
        DirectCall(fn='fromFloat64Array', receiver='DOMMatrix', demands=['TODO_UNKNOWN_TYPE_Float64Array'], returns='TODO_UNKNOWN_TYPE_DOMMatrix'),
    ],
    "translate": [
        PrototypeCall(constructor='DOMMatrixReadOnly', fn='translate', demands=['DOMMatrixReadOnly', 'TODO_UNKNOWN_TYPE_unrestricted double', 'TODO_UNKNOWN_TYPE_unrestricted double', 'TODO_UNKNOWN_TYPE_unrestricted double'], returns='TODO_UNKNOWN_TYPE_DOMMatrix'),
        PrototypeCall(constructor='Translator', fn='translate', demands=['Translator', 'str', 'TODO_UNKNOWN_TYPE_TranslatorTranslateOptions'], returns='str'),
    ],
    "scale": [
        PrototypeCall(constructor='DOMMatrixReadOnly', fn='scale', demands=['DOMMatrixReadOnly', 'TODO_UNKNOWN_TYPE_unrestricted double', 'TODO_UNKNOWN_TYPE_unrestricted double', 'TODO_UNKNOWN_TYPE_unrestricted double', 'TODO_UNKNOWN_TYPE_unrestricted double', 'TODO_UNKNOWN_TYPE_unrestricted double', 'TODO_UNKNOWN_TYPE_unrestricted double'], returns='TODO_UNKNOWN_TYPE_DOMMatrix'),
    ],
    "scalenonuniform": [
        PrototypeCall(constructor='DOMMatrixReadOnly', fn='scaleNonUniform', demands=['DOMMatrixReadOnly', 'TODO_UNKNOWN_TYPE_unrestricted double', 'TODO_UNKNOWN_TYPE_unrestricted double'], returns='TODO_UNKNOWN_TYPE_DOMMatrix'),
    ],
    "scale3d": [
        PrototypeCall(constructor='DOMMatrixReadOnly', fn='scale3d', demands=['DOMMatrixReadOnly', 'TODO_UNKNOWN_TYPE_unrestricted double', 'TODO_UNKNOWN_TYPE_unrestricted double', 'TODO_UNKNOWN_TYPE_unrestricted double', 'TODO_UNKNOWN_TYPE_unrestricted double'], returns='TODO_UNKNOWN_TYPE_DOMMatrix'),
    ],
    "rotate": [
        PrototypeCall(constructor='DOMMatrixReadOnly', fn='rotate', demands=['DOMMatrixReadOnly', 'TODO_UNKNOWN_TYPE_unrestricted double', 'TODO_UNKNOWN_TYPE_unrestricted double', 'TODO_UNKNOWN_TYPE_unrestricted double'], returns='TODO_UNKNOWN_TYPE_DOMMatrix'),
    ],
    "rotatefromvector": [
        PrototypeCall(constructor='DOMMatrixReadOnly', fn='rotateFromVector', demands=['DOMMatrixReadOnly', 'TODO_UNKNOWN_TYPE_unrestricted double', 'TODO_UNKNOWN_TYPE_unrestricted double'], returns='TODO_UNKNOWN_TYPE_DOMMatrix'),
    ],
    "rotateaxisangle": [
        PrototypeCall(constructor='DOMMatrixReadOnly', fn='rotateAxisAngle', demands=['DOMMatrixReadOnly', 'TODO_UNKNOWN_TYPE_unrestricted double', 'TODO_UNKNOWN_TYPE_unrestricted double', 'TODO_UNKNOWN_TYPE_unrestricted double', 'TODO_UNKNOWN_TYPE_unrestricted double'], returns='TODO_UNKNOWN_TYPE_DOMMatrix'),
    ],
    "skewx": [
        PrototypeCall(constructor='DOMMatrixReadOnly', fn='skewX', demands=['DOMMatrixReadOnly', 'TODO_UNKNOWN_TYPE_unrestricted double'], returns='TODO_UNKNOWN_TYPE_DOMMatrix'),
    ],
    "skewy": [
        PrototypeCall(constructor='DOMMatrixReadOnly', fn='skewY', demands=['DOMMatrixReadOnly', 'TODO_UNKNOWN_TYPE_unrestricted double'], returns='TODO_UNKNOWN_TYPE_DOMMatrix'),
    ],
    "multiply": [
        PrototypeCall(constructor='DOMMatrixReadOnly', fn='multiply', demands=['DOMMatrixReadOnly', 'TODO_UNKNOWN_TYPE_DOMMatrixInit'], returns='TODO_UNKNOWN_TYPE_DOMMatrix'),
    ],
    "flipx": [
        PrototypeCall(constructor='DOMMatrixReadOnly', fn='flipX', demands=['DOMMatrixReadOnly'], returns='TODO_UNKNOWN_TYPE_DOMMatrix'),
    ],
    "flipy": [
        PrototypeCall(constructor='DOMMatrixReadOnly', fn='flipY', demands=['DOMMatrixReadOnly'], returns='TODO_UNKNOWN_TYPE_DOMMatrix'),
    ],
    "inverse": [
        PrototypeCall(constructor='DOMMatrixReadOnly', fn='inverse', demands=['DOMMatrixReadOnly'], returns='TODO_UNKNOWN_TYPE_DOMMatrix'),
    ],
    "transformpoint": [
        PrototypeCall(constructor='DOMMatrixReadOnly', fn='transformPoint', demands=['DOMMatrixReadOnly', 'TODO_UNKNOWN_TYPE_DOMPointInit'], returns='TODO_UNKNOWN_TYPE_DOMPoint'),
    ],
    "tofloat32array": [
        PrototypeCall(constructor='DOMMatrixReadOnly', fn='toFloat32Array', demands=['DOMMatrixReadOnly'], returns='TODO_UNKNOWN_TYPE_Float32Array'),
    ],
    "tofloat64array": [
        PrototypeCall(constructor='DOMMatrixReadOnly', fn='toFloat64Array', demands=['DOMMatrixReadOnly'], returns='TODO_UNKNOWN_TYPE_Float64Array'),
    ],
    "DOMMatrix": [
        NewCall(constructor='DOMMatrix', demands=['str'], returns='DOMMatrix'),
    ],
    "multiplyself": [
        PrototypeCall(constructor='DOMMatrix', fn='multiplySelf', demands=['DOMMatrix', 'TODO_UNKNOWN_TYPE_DOMMatrixInit'], returns='TODO_UNKNOWN_TYPE_DOMMatrix'),
    ],
    "premultiplyself": [
        PrototypeCall(constructor='DOMMatrix', fn='preMultiplySelf', demands=['DOMMatrix', 'TODO_UNKNOWN_TYPE_DOMMatrixInit'], returns='TODO_UNKNOWN_TYPE_DOMMatrix'),
    ],
    "translateself": [
        PrototypeCall(constructor='DOMMatrix', fn='translateSelf', demands=['DOMMatrix', 'TODO_UNKNOWN_TYPE_unrestricted double', 'TODO_UNKNOWN_TYPE_unrestricted double', 'TODO_UNKNOWN_TYPE_unrestricted double'], returns='TODO_UNKNOWN_TYPE_DOMMatrix'),
    ],
    "scaleself": [
        PrototypeCall(constructor='DOMMatrix', fn='scaleSelf', demands=['DOMMatrix', 'TODO_UNKNOWN_TYPE_unrestricted double', 'TODO_UNKNOWN_TYPE_unrestricted double', 'TODO_UNKNOWN_TYPE_unrestricted double', 'TODO_UNKNOWN_TYPE_unrestricted double', 'TODO_UNKNOWN_TYPE_unrestricted double', 'TODO_UNKNOWN_TYPE_unrestricted double'], returns='TODO_UNKNOWN_TYPE_DOMMatrix'),
    ],
    "scale3dself": [
        PrototypeCall(constructor='DOMMatrix', fn='scale3dSelf', demands=['DOMMatrix', 'TODO_UNKNOWN_TYPE_unrestricted double', 'TODO_UNKNOWN_TYPE_unrestricted double', 'TODO_UNKNOWN_TYPE_unrestricted double', 'TODO_UNKNOWN_TYPE_unrestricted double'], returns='TODO_UNKNOWN_TYPE_DOMMatrix'),
    ],
    "rotateself": [
        PrototypeCall(constructor='DOMMatrix', fn='rotateSelf', demands=['DOMMatrix', 'TODO_UNKNOWN_TYPE_unrestricted double', 'TODO_UNKNOWN_TYPE_unrestricted double', 'TODO_UNKNOWN_TYPE_unrestricted double'], returns='TODO_UNKNOWN_TYPE_DOMMatrix'),
    ],
    "rotatefromvectorself": [
        PrototypeCall(constructor='DOMMatrix', fn='rotateFromVectorSelf', demands=['DOMMatrix', 'TODO_UNKNOWN_TYPE_unrestricted double', 'TODO_UNKNOWN_TYPE_unrestricted double'], returns='TODO_UNKNOWN_TYPE_DOMMatrix'),
    ],
    "rotateaxisangleself": [
        PrototypeCall(constructor='DOMMatrix', fn='rotateAxisAngleSelf', demands=['DOMMatrix', 'TODO_UNKNOWN_TYPE_unrestricted double', 'TODO_UNKNOWN_TYPE_unrestricted double', 'TODO_UNKNOWN_TYPE_unrestricted double', 'TODO_UNKNOWN_TYPE_unrestricted double'], returns='TODO_UNKNOWN_TYPE_DOMMatrix'),
    ],
    "skewxself": [
        PrototypeCall(constructor='DOMMatrix', fn='skewXSelf', demands=['DOMMatrix', 'TODO_UNKNOWN_TYPE_unrestricted double'], returns='TODO_UNKNOWN_TYPE_DOMMatrix'),
    ],
    "skewyself": [
        PrototypeCall(constructor='DOMMatrix', fn='skewYSelf', demands=['DOMMatrix', 'TODO_UNKNOWN_TYPE_unrestricted double'], returns='TODO_UNKNOWN_TYPE_DOMMatrix'),
    ],
    "invertself": [
        PrototypeCall(constructor='DOMMatrix', fn='invertSelf', demands=['DOMMatrix'], returns='TODO_UNKNOWN_TYPE_DOMMatrix'),
    ],
    "setmatrixvalue": [
        PrototypeCall(constructor='DOMMatrix', fn='setMatrixValue', demands=['DOMMatrix', 'str'], returns='TODO_UNKNOWN_TYPE_DOMMatrix'),
    ],
    "createpolicy": [
        PrototypeCall(constructor='TrustedTypePolicyFactory', fn='createPolicy', demands=['TrustedTypePolicyFactory', 'str', 'TODO_UNKNOWN_TYPE_TrustedTypePolicyOptions'], returns='TODO_UNKNOWN_TYPE_TrustedTypePolicy'),
    ],
    "ishtml": [
        PrototypeCall(constructor='TrustedTypePolicyFactory', fn='isHTML', demands=['TrustedTypePolicyFactory', '*'], returns='bool'),
    ],
    "isscript": [
        PrototypeCall(constructor='TrustedTypePolicyFactory', fn='isScript', demands=['TrustedTypePolicyFactory', '*'], returns='bool'),
    ],
    "isscripturl": [
        PrototypeCall(constructor='TrustedTypePolicyFactory', fn='isScriptURL', demands=['TrustedTypePolicyFactory', '*'], returns='bool'),
    ],
    "getattributetype": [
        PrototypeCall(constructor='TrustedTypePolicyFactory', fn='getAttributeType', demands=['TrustedTypePolicyFactory', 'str', 'str', 'str', 'str'], returns='str'),
    ],
    "getpropertytype": [
        PrototypeCall(constructor='TrustedTypePolicyFactory', fn='getPropertyType', demands=['TrustedTypePolicyFactory', 'str', 'str', 'str'], returns='str'),
    ],
    "createhtml": [
        PrototypeCall(constructor='TrustedTypePolicy', fn='createHTML', demands=['TrustedTypePolicy', 'str', '*'], returns='TODO_UNKNOWN_TYPE_TrustedHTML'),
    ],
    "createscript": [
        PrototypeCall(constructor='TrustedTypePolicy', fn='createScript', demands=['TrustedTypePolicy', 'str', '*'], returns='TODO_UNKNOWN_TYPE_TrustedScript'),
    ],
    "createscripturl": [
        PrototypeCall(constructor='TrustedTypePolicy', fn='createScriptURL', demands=['TrustedTypePolicy', 'str', '*'], returns='TODO_UNKNOWN_TYPE_TrustedScriptURL'),
    ],
    "populatematrix": [
        PrototypeCall(constructor='OrientationSensor', fn='populateMatrix', demands=['OrientationSensor', 'TODO_UNKNOWN_TYPE_RotationMatrixType'], returns='None'),
    ],
    "AbsoluteOrientationSensor": [
        NewCall(constructor='AbsoluteOrientationSensor', demands=['TODO_UNKNOWN_TYPE_OrientationSensorOptions'], returns='AbsoluteOrientationSensor'),
    ],
    "RelativeOrientationSensor": [
        NewCall(constructor='RelativeOrientationSensor', demands=['TODO_UNKNOWN_TYPE_OrientationSensorOptions'], returns='RelativeOrientationSensor'),
    ],
    "BluetoothDataFilter": [
        NewCall(constructor='BluetoothDataFilter', demands=['TODO_UNKNOWN_TYPE_BluetoothDataFilterInit'], returns='BluetoothDataFilter'),
    ],
    "BluetoothManufacturerDataFilter": [
        NewCall(constructor='BluetoothManufacturerDataFilter', demands=['TODO_UNKNOWN_TYPE_object'], returns='BluetoothManufacturerDataFilter'),
    ],
    "BluetoothServiceDataFilter": [
        NewCall(constructor='BluetoothServiceDataFilter', demands=['TODO_UNKNOWN_TYPE_object'], returns='BluetoothServiceDataFilter'),
    ],
    "BluetoothLEScanFilter": [
        NewCall(constructor='BluetoothLEScanFilter', demands=['TODO_UNKNOWN_TYPE_BluetoothLEScanFilterInit'], returns='BluetoothLEScanFilter'),
    ],
    "skiptransition": [
        PrototypeCall(constructor='ViewTransition', fn='skipTransition', demands=['ViewTransition'], returns='None'),
    ],
    "createmediakeys": [
        PrototypeCall(constructor='MediaKeySystemAccess', fn='createMediaKeys', demands=['MediaKeySystemAccess'], returns='TODO_UNKNOWN_TYPE_MediaKeys'),
    ],
    "createsession": [
        PrototypeCall(constructor='MediaKeys', fn='createSession', demands=['MediaKeys', 'TODO_UNKNOWN_TYPE_MediaKeySessionType'], returns='TODO_UNKNOWN_TYPE_MediaKeySession'),
    ],
    "getstatusforpolicy": [
        PrototypeCall(constructor='MediaKeys', fn='getStatusForPolicy', demands=['MediaKeys', 'TODO_UNKNOWN_TYPE_MediaKeysPolicy'], returns='TODO_UNKNOWN_TYPE_MediaKeyStatus'),
    ],
    "setservercertificate": [
        PrototypeCall(constructor='MediaKeys', fn='setServerCertificate', demands=['MediaKeys', 'TODO_UNKNOWN_TYPE_BufferSource'], returns='bool'),
    ],
    "generaterequest": [
        PrototypeCall(constructor='MediaKeySession', fn='generateRequest', demands=['MediaKeySession', 'str', 'TODO_UNKNOWN_TYPE_BufferSource'], returns='None'),
    ],
    "MediaKeyMessageEvent": [
        NewCall(constructor='MediaKeyMessageEvent', demands=['str', 'TODO_UNKNOWN_TYPE_MediaKeyMessageEventInit'], returns='MediaKeyMessageEvent'),
    ],
    "MediaEncryptedEvent": [
        NewCall(constructor='MediaEncryptedEvent', demands=['str', 'TODO_UNKNOWN_TYPE_MediaEncryptedEventInit'], returns='MediaEncryptedEvent'),
    ],
    "getproperties": [
        PrototypeCall(constructor='ContactsManager', fn='getProperties', demands=['ContactsManager'], returns='TODO_UNKNOWN_TYPE_ContactProperty'),
    ],
    "ReadableStream": [
        NewCall(constructor='ReadableStream', demands=['TODO_UNKNOWN_TYPE_object', 'TODO_UNKNOWN_TYPE_QueuingStrategy'], returns='ReadableStream'),
    ],
    "from": [
        DirectCall(fn='from', receiver='ReadableStream', demands=['*'], returns='TODO_UNKNOWN_TYPE_ReadableStream'),
        DirectCall(fn='from', receiver='Observable', demands=['*'], returns='TODO_UNKNOWN_TYPE_Observable'),
    ],
    "getreader": [
        PrototypeCall(constructor='ReadableStream', fn='getReader', demands=['ReadableStream', 'TODO_UNKNOWN_TYPE_ReadableStreamGetReaderOptions'], returns='TODO_UNKNOWN_TYPE_ReadableStreamReader'),
    ],
    "pipethrough": [
        PrototypeCall(constructor='ReadableStream', fn='pipeThrough', demands=['ReadableStream', 'TODO_UNKNOWN_TYPE_ReadableWritablePair', 'TODO_UNKNOWN_TYPE_StreamPipeOptions'], returns='TODO_UNKNOWN_TYPE_ReadableStream'),
    ],
    "pipeto": [
        PrototypeCall(constructor='ReadableStream', fn='pipeTo', demands=['ReadableStream', 'TODO_UNKNOWN_TYPE_WritableStream', 'TODO_UNKNOWN_TYPE_StreamPipeOptions'], returns='None'),
    ],
    "tee": [
        PrototypeCall(constructor='ReadableStream', fn='tee', demands=['ReadableStream'], returns='TODO_UNKNOWN_TYPE_ReadableStream'),
    ],
    "ReadableStreamDefaultReader": [
        NewCall(constructor='ReadableStreamDefaultReader', demands=['TODO_UNKNOWN_TYPE_ReadableStream'], returns='ReadableStreamDefaultReader'),
    ],
    "releaselock": [
        PrototypeCall(constructor='ReadableStreamDefaultReader', fn='releaseLock', demands=['ReadableStreamDefaultReader'], returns='None'),
        PrototypeCall(constructor='ReadableStreamBYOBReader', fn='releaseLock', demands=['ReadableStreamBYOBReader'], returns='None'),
        PrototypeCall(constructor='WritableStreamDefaultWriter', fn='releaseLock', demands=['WritableStreamDefaultWriter'], returns='None'),
    ],
    "ReadableStreamBYOBReader": [
        NewCall(constructor='ReadableStreamBYOBReader', demands=['TODO_UNKNOWN_TYPE_ReadableStream'], returns='ReadableStreamBYOBReader'),
    ],
    "enqueue": [
        PrototypeCall(constructor='ReadableStreamDefaultController', fn='enqueue', demands=['ReadableStreamDefaultController', '*'], returns='None'),
        PrototypeCall(constructor='ReadableByteStreamController', fn='enqueue', demands=['ReadableByteStreamController', 'TODO_UNKNOWN_TYPE_ArrayBufferView'], returns='None'),
        PrototypeCall(constructor='TransformStreamDefaultController', fn='enqueue', demands=['TransformStreamDefaultController', '*'], returns='None'),
    ],
    "error": [
        PrototypeCall(constructor='ReadableStreamDefaultController', fn='error', demands=['ReadableStreamDefaultController', '*'], returns='None'),
        PrototypeCall(constructor='ReadableByteStreamController', fn='error', demands=['ReadableByteStreamController', '*'], returns='None'),
        PrototypeCall(constructor='WritableStreamDefaultController', fn='error', demands=['WritableStreamDefaultController', '*'], returns='None'),
        PrototypeCall(constructor='TransformStreamDefaultController', fn='error', demands=['TransformStreamDefaultController', '*'], returns='None'),
        PrototypeCall(constructor='Subscriber', fn='error', demands=['Subscriber', '*'], returns='None'),
        DirectCall(fn='error', receiver='Response', demands=[], returns='TODO_UNKNOWN_TYPE_Response'),
    ],
    "respond": [
        PrototypeCall(constructor='ReadableStreamBYOBRequest', fn='respond', demands=['ReadableStreamBYOBRequest', 'TODO_UNKNOWN_TYPE_unsigned long long'], returns='None'),
    ],
    "respondwithnewview": [
        PrototypeCall(constructor='ReadableStreamBYOBRequest', fn='respondWithNewView', demands=['ReadableStreamBYOBRequest', 'TODO_UNKNOWN_TYPE_ArrayBufferView'], returns='None'),
    ],
    "WritableStream": [
        NewCall(constructor='WritableStream', demands=['TODO_UNKNOWN_TYPE_object', 'TODO_UNKNOWN_TYPE_QueuingStrategy'], returns='WritableStream'),
    ],
    "WritableStreamDefaultWriter": [
        NewCall(constructor='WritableStreamDefaultWriter', demands=['TODO_UNKNOWN_TYPE_WritableStream'], returns='WritableStreamDefaultWriter'),
    ],
    "TransformStream": [
        NewCall(constructor='TransformStream', demands=['TODO_UNKNOWN_TYPE_object', 'TODO_UNKNOWN_TYPE_QueuingStrategy', 'TODO_UNKNOWN_TYPE_QueuingStrategy'], returns='TransformStream'),
    ],
    "ByteLengthQueuingStrategy": [
        NewCall(constructor='ByteLengthQueuingStrategy', demands=['TODO_UNKNOWN_TYPE_QueuingStrategyInit'], returns='ByteLengthQueuingStrategy'),
    ],
    "CountQueuingStrategy": [
        NewCall(constructor='CountQueuingStrategy', demands=['TODO_UNKNOWN_TYPE_QueuingStrategyInit'], returns='CountQueuingStrategy'),
    ],
    "gettags": [
        PrototypeCall(constructor='PeriodicSyncManager', fn='getTags', demands=['PeriodicSyncManager'], returns='str'),
        PrototypeCall(constructor='SyncManager', fn='getTags', demands=['SyncManager'], returns='str'),
    ],
    "PeriodicSyncEvent": [
        NewCall(constructor='PeriodicSyncEvent', demands=['str', 'TODO_UNKNOWN_TYPE_PeriodicSyncEventInit'], returns='PeriodicSyncEvent'),
    ],
    "CSSParserAtRule": [
        NewCall(constructor='CSSParserAtRule', demands=['str', 'TODO_UNKNOWN_TYPE_CSSToken', 'TODO_UNKNOWN_TYPE_CSSParserRule'], returns='CSSParserAtRule'),
    ],
    "CSSParserQualifiedRule": [
        NewCall(constructor='CSSParserQualifiedRule', demands=['TODO_UNKNOWN_TYPE_CSSToken', 'TODO_UNKNOWN_TYPE_CSSParserRule'], returns='CSSParserQualifiedRule'),
    ],
    "CSSParserDeclaration": [
        NewCall(constructor='CSSParserDeclaration', demands=['str', 'TODO_UNKNOWN_TYPE_CSSParserRule'], returns='CSSParserDeclaration'),
    ],
    "CSSParserBlock": [
        NewCall(constructor='CSSParserBlock', demands=['str', 'TODO_UNKNOWN_TYPE_CSSParserValue'], returns='CSSParserBlock'),
    ],
    "CSSParserFunction": [
        NewCall(constructor='CSSParserFunction', demands=['str', 'TODO_UNKNOWN_TYPE_CSSParserValue'], returns='CSSParserFunction'),
    ],
    "registerlayout": [
        PrototypeCall(constructor='LayoutWorkletGlobalScope', fn='registerLayout', demands=['LayoutWorkletGlobalScope', 'str', 'TODO_UNKNOWN_TYPE_VoidFunction'], returns='None'),
    ],
    "intrinsicsizes": [
        PrototypeCall(constructor='LayoutChild', fn='intrinsicSizes', demands=['LayoutChild'], returns='TODO_UNKNOWN_TYPE_IntrinsicSizes'),
    ],
    "layoutnextfragment": [
        PrototypeCall(constructor='LayoutChild', fn='layoutNextFragment', demands=['LayoutChild', 'TODO_UNKNOWN_TYPE_LayoutConstraintsOptions', 'TODO_UNKNOWN_TYPE_ChildBreakToken'], returns='TODO_UNKNOWN_TYPE_LayoutFragment'),
    ],
    "FragmentResult": [
        NewCall(constructor='FragmentResult', demands=['TODO_UNKNOWN_TYPE_FragmentResultOptions'], returns='FragmentResult'),
    ],
    "Touch": [
        NewCall(constructor='Touch', demands=['TODO_UNKNOWN_TYPE_TouchInit'], returns='Touch'),
    ],
    "TouchEvent": [
        NewCall(constructor='TouchEvent', demands=['str', 'TODO_UNKNOWN_TYPE_TouchEventInit'], returns='TouchEvent'),
    ],
    "GroupEffect": [
        NewCall(constructor='GroupEffect', demands=['TODO_UNKNOWN_TYPE_AnimationEffect', 'TODO_UNKNOWN_TYPE_unrestricted double'], returns='GroupEffect'),
    ],
    "prepend": [
        PrototypeCall(constructor='GroupEffect', fn='prepend', demands=['GroupEffect', 'TODO_UNKNOWN_TYPE_AnimationEffect'], returns='None'),
    ],
    "SequenceEffect": [
        NewCall(constructor='SequenceEffect', demands=['TODO_UNKNOWN_TYPE_AnimationEffect', 'TODO_UNKNOWN_TYPE_unrestricted double'], returns='SequenceEffect'),
    ],
    "AnimationPlaybackEvent": [
        NewCall(constructor='AnimationPlaybackEvent', demands=['str', 'TODO_UNKNOWN_TYPE_AnimationPlaybackEventInit'], returns='AnimationPlaybackEvent'),
    ],
    "AnimationTrigger": [
        NewCall(constructor='AnimationTrigger', demands=['TODO_UNKNOWN_TYPE_AnimationTriggerOptions'], returns='AnimationTrigger'),
    ],
    "posttask": [
        PrototypeCall(constructor='Scheduler', fn='postTask', demands=['Scheduler', 'TODO_UNKNOWN_TYPE_SchedulerPostTaskCallback', 'TODO_UNKNOWN_TYPE_SchedulerPostTaskOptions'], returns='*'),
    ],
    "yield": [
        PrototypeCall(constructor='Scheduler', fn='yield', demands=['Scheduler'], returns='None'),
    ],
    "TaskPriorityChangeEvent": [
        NewCall(constructor='TaskPriorityChangeEvent', demands=['str', 'TODO_UNKNOWN_TYPE_TaskPriorityChangeEventInit'], returns='TaskPriorityChangeEvent'),
    ],
    "TaskController": [
        NewCall(constructor='TaskController', demands=['TODO_UNKNOWN_TYPE_TaskControllerInit'], returns='TaskController'),
    ],
    "setpriority": [
        PrototypeCall(constructor='TaskController', fn='setPriority', demands=['TaskController', 'TODO_UNKNOWN_TYPE_TaskPriority'], returns='None'),
        PrototypeCall(constructor='InterestGroupBiddingScriptRunnerGlobalScope', fn='setPriority', demands=['InterestGroupBiddingScriptRunnerGlobalScope', 'TODO_UNKNOWN_TYPE_double'], returns='None'),
    ],
    "getparent": [
        PrototypeCall(constructor='FileSystemEntry', fn='getParent', demands=['FileSystemEntry', 'TODO_UNKNOWN_TYPE_FileSystemEntryCallback', 'TODO_UNKNOWN_TYPE_ErrorCallback'], returns='None'),
    ],
    "createreader": [
        PrototypeCall(constructor='FileSystemDirectoryEntry', fn='createReader', demands=['FileSystemDirectoryEntry'], returns='TODO_UNKNOWN_TYPE_FileSystemDirectoryReader'),
    ],
    "readentries": [
        PrototypeCall(constructor='FileSystemDirectoryReader', fn='readEntries', demands=['FileSystemDirectoryReader', 'TODO_UNKNOWN_TYPE_FileSystemEntriesCallback', 'TODO_UNKNOWN_TYPE_ErrorCallback'], returns='None'),
    ],
    "file": [
        PrototypeCall(constructor='FileSystemFileEntry', fn='file', demands=['FileSystemFileEntry', 'TODO_UNKNOWN_TYPE_FileCallback', 'TODO_UNKNOWN_TYPE_ErrorCallback'], returns='None'),
    ],
    "now": [
        PrototypeCall(constructor='Performance', fn='now', demands=['Performance'], returns='TODO_UNKNOWN_TYPE_DOMHighResTimeStamp'),
    ],
    "WebGLContextEvent": [
        NewCall(constructor='WebGLContextEvent', demands=['str', 'TODO_UNKNOWN_TYPE_WebGLContextEventInit'], returns='WebGLContextEvent'),
    ],
    "HTMLFencedFrameElement": [
        NewCall(constructor='HTMLFencedFrameElement', demands=[], returns='HTMLFencedFrameElement'),
    ],
    "FencedFrameConfig": [
        NewCall(constructor='FencedFrameConfig', demands=['str'], returns='FencedFrameConfig'),
    ],
    "setsharedstoragecontext": [
        PrototypeCall(constructor='FencedFrameConfig', fn='setSharedStorageContext', demands=['FencedFrameConfig', 'str'], returns='None'),
    ],
    "reportevent": [
        PrototypeCall(constructor='Fence', fn='reportEvent', demands=['Fence', 'TODO_UNKNOWN_TYPE_ReportEventType'], returns='None'),
    ],
    "setreporteventdataforautomaticbeacons": [
        PrototypeCall(constructor='Fence', fn='setReportEventDataForAutomaticBeacons', demands=['Fence', 'TODO_UNKNOWN_TYPE_FenceEvent'], returns='None'),
    ],
    "getnestedconfigs": [
        PrototypeCall(constructor='Fence', fn='getNestedConfigs', demands=['Fence'], returns='TODO_UNKNOWN_TYPE_FencedFrameConfig'),
    ],
    "disableuntrustednetwork": [
        PrototypeCall(constructor='Fence', fn='disableUntrustedNetwork', demands=['Fence'], returns='None'),
    ],
    "notifyevent": [
        PrototypeCall(constructor='Fence', fn='notifyEvent', demands=['Fence', 'TODO_UNKNOWN_TYPE_Event'], returns='None'),
    ],
    "Notification": [
        NewCall(constructor='Notification', demands=['str', 'TODO_UNKNOWN_TYPE_NotificationOptions'], returns='Notification'),
    ],
    "NotificationEvent": [
        NewCall(constructor='NotificationEvent', demands=['str', 'TODO_UNKNOWN_TYPE_NotificationEventInit'], returns='NotificationEvent'),
    ],
    "getdetails": [
        PrototypeCall(constructor='DigitalGoodsService', fn='getDetails', demands=['DigitalGoodsService', 'str'], returns='TODO_UNKNOWN_TYPE_ItemDetails'),
    ],
    "listpurchases": [
        PrototypeCall(constructor='DigitalGoodsService', fn='listPurchases', demands=['DigitalGoodsService'], returns='TODO_UNKNOWN_TYPE_PurchaseDetails'),
    ],
    "listpurchasehistory": [
        PrototypeCall(constructor='DigitalGoodsService', fn='listPurchaseHistory', demands=['DigitalGoodsService'], returns='TODO_UNKNOWN_TYPE_PurchaseDetails'),
    ],
    "consume": [
        PrototypeCall(constructor='DigitalGoodsService', fn='consume', demands=['DigitalGoodsService', 'str'], returns='None'),
    ],
    "createvertexarrayoes": [
        PrototypeCall(constructor='OES_vertex_array_object', fn='createVertexArrayOES', demands=['OES_vertex_array_object'], returns='TODO_UNKNOWN_TYPE_WebGLVertexArrayObjectOES'),
    ],
    "deletevertexarrayoes": [
        PrototypeCall(constructor='OES_vertex_array_object', fn='deleteVertexArrayOES', demands=['OES_vertex_array_object', 'TODO_UNKNOWN_TYPE_WebGLVertexArrayObjectOES'], returns='None'),
    ],
    "isvertexarrayoes": [
        PrototypeCall(constructor='OES_vertex_array_object', fn='isVertexArrayOES', demands=['OES_vertex_array_object', 'TODO_UNKNOWN_TYPE_WebGLVertexArrayObjectOES'], returns='TODO_UNKNOWN_TYPE_GLboolean'),
    ],
    "bindvertexarrayoes": [
        PrototypeCall(constructor='OES_vertex_array_object', fn='bindVertexArrayOES', demands=['OES_vertex_array_object', 'TODO_UNKNOWN_TYPE_WebGLVertexArrayObjectOES'], returns='None'),
    ],
    "appendmedium": [
        PrototypeCall(constructor='MediaList', fn='appendMedium', demands=['MediaList', 'TODO_UNKNOWN_TYPE_CSSOMString'], returns='None'),
    ],
    "deletemedium": [
        PrototypeCall(constructor='MediaList', fn='deleteMedium', demands=['MediaList', 'TODO_UNKNOWN_TYPE_CSSOMString'], returns='None'),
    ],
    "CSSStyleSheet": [
        NewCall(constructor='CSSStyleSheet', demands=['TODO_UNKNOWN_TYPE_CSSStyleSheetInit'], returns='CSSStyleSheet'),
    ],
    "insertrule": [
        PrototypeCall(constructor='CSSStyleSheet', fn='insertRule', demands=['CSSStyleSheet', 'TODO_UNKNOWN_TYPE_CSSOMString', 'int'], returns='int'),
        PrototypeCall(constructor='CSSGroupingRule', fn='insertRule', demands=['CSSGroupingRule', 'TODO_UNKNOWN_TYPE_CSSOMString', 'int'], returns='int'),
    ],
    "replacesync": [
        PrototypeCall(constructor='CSSStyleSheet', fn='replaceSync', demands=['CSSStyleSheet', 'str'], returns='None'),
    ],
    "getpropertyvalue": [
        PrototypeCall(constructor='CSSStyleDeclaration', fn='getPropertyValue', demands=['CSSStyleDeclaration', 'TODO_UNKNOWN_TYPE_CSSOMString'], returns='TODO_UNKNOWN_TYPE_CSSOMString'),
    ],
    "getpropertypriority": [
        PrototypeCall(constructor='CSSStyleDeclaration', fn='getPropertyPriority', demands=['CSSStyleDeclaration', 'TODO_UNKNOWN_TYPE_CSSOMString'], returns='TODO_UNKNOWN_TYPE_CSSOMString'),
    ],
    "setproperty": [
        PrototypeCall(constructor='CSSStyleDeclaration', fn='setProperty', demands=['CSSStyleDeclaration', 'TODO_UNKNOWN_TYPE_CSSOMString', 'TODO_UNKNOWN_TYPE_CSSOMString', 'TODO_UNKNOWN_TYPE_CSSOMString'], returns='None'),
    ],
    "removeproperty": [
        PrototypeCall(constructor='CSSStyleDeclaration', fn='removeProperty', demands=['CSSStyleDeclaration', 'TODO_UNKNOWN_TYPE_CSSOMString'], returns='TODO_UNKNOWN_TYPE_CSSOMString'),
    ],
    "ImageCapture": [
        NewCall(constructor='ImageCapture', demands=['TODO_UNKNOWN_TYPE_MediaStreamTrack'], returns='ImageCapture'),
    ],
    "takephoto": [
        PrototypeCall(constructor='ImageCapture', fn='takePhoto', demands=['ImageCapture', 'TODO_UNKNOWN_TYPE_PhotoSettings'], returns='TODO_UNKNOWN_TYPE_Blob'),
    ],
    "getphotocapabilities": [
        PrototypeCall(constructor='ImageCapture', fn='getPhotoCapabilities', demands=['ImageCapture'], returns='TODO_UNKNOWN_TYPE_PhotoCapabilities'),
    ],
    "getphotosettings": [
        PrototypeCall(constructor='ImageCapture', fn='getPhotoSettings', demands=['ImageCapture'], returns='TODO_UNKNOWN_TYPE_PhotoSettings'),
    ],
    "grabframe": [
        PrototypeCall(constructor='ImageCapture', fn='grabFrame', demands=['ImageCapture'], returns='TODO_UNKNOWN_TYPE_ImageBitmap'),
    ],
    "ResizeObserver": [
        NewCall(constructor='ResizeObserver', demands=['TODO_UNKNOWN_TYPE_ResizeObserverCallback'], returns='ResizeObserver'),
    ],
    "URLPattern": [
        NewCall(constructor='URLPattern', demands=['TODO_UNKNOWN_TYPE_URLPatternInput', 'str', 'TODO_UNKNOWN_TYPE_URLPatternOptions'], returns='URLPattern'),
        NewCall(constructor='URLPattern', demands=['TODO_UNKNOWN_TYPE_URLPatternInput', 'TODO_UNKNOWN_TYPE_URLPatternOptions'], returns='URLPattern'),
    ],
    "test": [
        PrototypeCall(constructor='URLPattern', fn='test', demands=['URLPattern', 'TODO_UNKNOWN_TYPE_URLPatternInput', 'str'], returns='bool'),
    ],
    "exec": [
        PrototypeCall(constructor='URLPattern', fn='exec', demands=['URLPattern', 'TODO_UNKNOWN_TYPE_URLPatternInput', 'str'], returns='TODO_UNKNOWN_TYPE_URLPatternResult'),
    ],
    "requestadapter": [
        PrototypeCall(constructor='GPU', fn='requestAdapter', demands=['GPU', 'TODO_UNKNOWN_TYPE_GPURequestAdapterOptions'], returns='TODO_UNKNOWN_TYPE_GPUAdapter'),
    ],
    "getpreferredcanvasformat": [
        PrototypeCall(constructor='GPU', fn='getPreferredCanvasFormat', demands=['GPU'], returns='TODO_UNKNOWN_TYPE_GPUTextureFormat'),
    ],
    "createbuffer": [
        PrototypeCall(constructor='GPUDevice', fn='createBuffer', demands=['GPUDevice', 'TODO_UNKNOWN_TYPE_GPUBufferDescriptor'], returns='TODO_UNKNOWN_TYPE_GPUBuffer'),
        PrototypeCall(constructor='BaseAudioContext', fn='createBuffer', demands=['BaseAudioContext', 'int', 'int', 'TODO_UNKNOWN_TYPE_float'], returns='TODO_UNKNOWN_TYPE_AudioBuffer'),
    ],
    "createtexture": [
        PrototypeCall(constructor='GPUDevice', fn='createTexture', demands=['GPUDevice', 'TODO_UNKNOWN_TYPE_GPUTextureDescriptor'], returns='TODO_UNKNOWN_TYPE_GPUTexture'),
    ],
    "createsampler": [
        PrototypeCall(constructor='GPUDevice', fn='createSampler', demands=['GPUDevice', 'TODO_UNKNOWN_TYPE_GPUSamplerDescriptor'], returns='TODO_UNKNOWN_TYPE_GPUSampler'),
    ],
    "importexternaltexture": [
        PrototypeCall(constructor='GPUDevice', fn='importExternalTexture', demands=['GPUDevice', 'TODO_UNKNOWN_TYPE_GPUExternalTextureDescriptor'], returns='TODO_UNKNOWN_TYPE_GPUExternalTexture'),
    ],
    "createbindgrouplayout": [
        PrototypeCall(constructor='GPUDevice', fn='createBindGroupLayout', demands=['GPUDevice', 'TODO_UNKNOWN_TYPE_GPUBindGroupLayoutDescriptor'], returns='TODO_UNKNOWN_TYPE_GPUBindGroupLayout'),
    ],
    "createpipelinelayout": [
        PrototypeCall(constructor='GPUDevice', fn='createPipelineLayout', demands=['GPUDevice', 'TODO_UNKNOWN_TYPE_GPUPipelineLayoutDescriptor'], returns='TODO_UNKNOWN_TYPE_GPUPipelineLayout'),
    ],
    "createbindgroup": [
        PrototypeCall(constructor='GPUDevice', fn='createBindGroup', demands=['GPUDevice', 'TODO_UNKNOWN_TYPE_GPUBindGroupDescriptor'], returns='TODO_UNKNOWN_TYPE_GPUBindGroup'),
    ],
    "createshadermodule": [
        PrototypeCall(constructor='GPUDevice', fn='createShaderModule', demands=['GPUDevice', 'TODO_UNKNOWN_TYPE_GPUShaderModuleDescriptor'], returns='TODO_UNKNOWN_TYPE_GPUShaderModule'),
    ],
    "createcomputepipeline": [
        PrototypeCall(constructor='GPUDevice', fn='createComputePipeline', demands=['GPUDevice', 'TODO_UNKNOWN_TYPE_GPUComputePipelineDescriptor'], returns='TODO_UNKNOWN_TYPE_GPUComputePipeline'),
    ],
    "createrenderpipeline": [
        PrototypeCall(constructor='GPUDevice', fn='createRenderPipeline', demands=['GPUDevice', 'TODO_UNKNOWN_TYPE_GPURenderPipelineDescriptor'], returns='TODO_UNKNOWN_TYPE_GPURenderPipeline'),
    ],
    "createcomputepipelineasync": [
        PrototypeCall(constructor='GPUDevice', fn='createComputePipelineAsync', demands=['GPUDevice', 'TODO_UNKNOWN_TYPE_GPUComputePipelineDescriptor'], returns='TODO_UNKNOWN_TYPE_GPUComputePipeline'),
    ],
    "createrenderpipelineasync": [
        PrototypeCall(constructor='GPUDevice', fn='createRenderPipelineAsync', demands=['GPUDevice', 'TODO_UNKNOWN_TYPE_GPURenderPipelineDescriptor'], returns='TODO_UNKNOWN_TYPE_GPURenderPipeline'),
    ],
    "createcommandencoder": [
        PrototypeCall(constructor='GPUDevice', fn='createCommandEncoder', demands=['GPUDevice', 'TODO_UNKNOWN_TYPE_GPUCommandEncoderDescriptor'], returns='TODO_UNKNOWN_TYPE_GPUCommandEncoder'),
    ],
    "createrenderbundleencoder": [
        PrototypeCall(constructor='GPUDevice', fn='createRenderBundleEncoder', demands=['GPUDevice', 'TODO_UNKNOWN_TYPE_GPURenderBundleEncoderDescriptor'], returns='TODO_UNKNOWN_TYPE_GPURenderBundleEncoder'),
    ],
    "createqueryset": [
        PrototypeCall(constructor='GPUDevice', fn='createQuerySet', demands=['GPUDevice', 'TODO_UNKNOWN_TYPE_GPUQuerySetDescriptor'], returns='TODO_UNKNOWN_TYPE_GPUQuerySet'),
    ],
    "mapasync": [
        PrototypeCall(constructor='GPUBuffer', fn='mapAsync', demands=['GPUBuffer', 'TODO_UNKNOWN_TYPE_GPUMapModeFlags', 'TODO_UNKNOWN_TYPE_GPUSize64', 'TODO_UNKNOWN_TYPE_GPUSize64'], returns='None'),
    ],
    "getmappedrange": [
        PrototypeCall(constructor='GPUBuffer', fn='getMappedRange', demands=['GPUBuffer', 'TODO_UNKNOWN_TYPE_GPUSize64', 'TODO_UNKNOWN_TYPE_GPUSize64'], returns='TODO_UNKNOWN_TYPE_ArrayBuffer'),
    ],
    "unmap": [
        PrototypeCall(constructor='GPUBuffer', fn='unmap', demands=['GPUBuffer'], returns='None'),
    ],
    "createview": [
        PrototypeCall(constructor='GPUTexture', fn='createView', demands=['GPUTexture', 'TODO_UNKNOWN_TYPE_GPUTextureViewDescriptor'], returns='TODO_UNKNOWN_TYPE_GPUTextureView'),
    ],
    "getcompilationinfo": [
        PrototypeCall(constructor='GPUShaderModule', fn='getCompilationInfo', demands=['GPUShaderModule'], returns='TODO_UNKNOWN_TYPE_GPUCompilationInfo'),
    ],
    "GPUPipelineError": [
        NewCall(constructor='GPUPipelineError', demands=['str', 'TODO_UNKNOWN_TYPE_GPUPipelineErrorInit'], returns='GPUPipelineError'),
    ],
    "beginrenderpass": [
        PrototypeCall(constructor='GPUCommandEncoder', fn='beginRenderPass', demands=['GPUCommandEncoder', 'TODO_UNKNOWN_TYPE_GPURenderPassDescriptor'], returns='TODO_UNKNOWN_TYPE_GPURenderPassEncoder'),
    ],
    "begincomputepass": [
        PrototypeCall(constructor='GPUCommandEncoder', fn='beginComputePass', demands=['GPUCommandEncoder', 'TODO_UNKNOWN_TYPE_GPUComputePassDescriptor'], returns='TODO_UNKNOWN_TYPE_GPUComputePassEncoder'),
    ],
    "copybuffertobuffer": [
        PrototypeCall(constructor='GPUCommandEncoder', fn='copyBufferToBuffer', demands=['GPUCommandEncoder', 'TODO_UNKNOWN_TYPE_GPUBuffer', 'TODO_UNKNOWN_TYPE_GPUBuffer', 'TODO_UNKNOWN_TYPE_GPUSize64'], returns='None'),
        PrototypeCall(constructor='GPUCommandEncoder', fn='copyBufferToBuffer', demands=['GPUCommandEncoder', 'TODO_UNKNOWN_TYPE_GPUBuffer', 'TODO_UNKNOWN_TYPE_GPUSize64', 'TODO_UNKNOWN_TYPE_GPUBuffer', 'TODO_UNKNOWN_TYPE_GPUSize64', 'TODO_UNKNOWN_TYPE_GPUSize64'], returns='None'),
    ],
    "copybuffertotexture": [
        PrototypeCall(constructor='GPUCommandEncoder', fn='copyBufferToTexture', demands=['GPUCommandEncoder', 'TODO_UNKNOWN_TYPE_GPUTexelCopyBufferInfo', 'TODO_UNKNOWN_TYPE_GPUTexelCopyTextureInfo', 'TODO_UNKNOWN_TYPE_GPUExtent3D'], returns='None'),
    ],
    "copytexturetobuffer": [
        PrototypeCall(constructor='GPUCommandEncoder', fn='copyTextureToBuffer', demands=['GPUCommandEncoder', 'TODO_UNKNOWN_TYPE_GPUTexelCopyTextureInfo', 'TODO_UNKNOWN_TYPE_GPUTexelCopyBufferInfo', 'TODO_UNKNOWN_TYPE_GPUExtent3D'], returns='None'),
    ],
    "copytexturetotexture": [
        PrototypeCall(constructor='GPUCommandEncoder', fn='copyTextureToTexture', demands=['GPUCommandEncoder', 'TODO_UNKNOWN_TYPE_GPUTexelCopyTextureInfo', 'TODO_UNKNOWN_TYPE_GPUTexelCopyTextureInfo', 'TODO_UNKNOWN_TYPE_GPUExtent3D'], returns='None'),
    ],
    "clearbuffer": [
        PrototypeCall(constructor='GPUCommandEncoder', fn='clearBuffer', demands=['GPUCommandEncoder', 'TODO_UNKNOWN_TYPE_GPUBuffer', 'TODO_UNKNOWN_TYPE_GPUSize64', 'TODO_UNKNOWN_TYPE_GPUSize64'], returns='None'),
    ],
    "resolvequeryset": [
        PrototypeCall(constructor='GPUCommandEncoder', fn='resolveQuerySet', demands=['GPUCommandEncoder', 'TODO_UNKNOWN_TYPE_GPUQuerySet', 'TODO_UNKNOWN_TYPE_GPUSize32', 'TODO_UNKNOWN_TYPE_GPUSize32', 'TODO_UNKNOWN_TYPE_GPUBuffer', 'TODO_UNKNOWN_TYPE_GPUSize64'], returns='None'),
    ],
    "setpipeline": [
        PrototypeCall(constructor='GPUComputePassEncoder', fn='setPipeline', demands=['GPUComputePassEncoder', 'TODO_UNKNOWN_TYPE_GPUComputePipeline'], returns='None'),
    ],
    "dispatchworkgroups": [
        PrototypeCall(constructor='GPUComputePassEncoder', fn='dispatchWorkgroups', demands=['GPUComputePassEncoder', 'TODO_UNKNOWN_TYPE_GPUSize32', 'TODO_UNKNOWN_TYPE_GPUSize32', 'TODO_UNKNOWN_TYPE_GPUSize32'], returns='None'),
    ],
    "dispatchworkgroupsindirect": [
        PrototypeCall(constructor='GPUComputePassEncoder', fn='dispatchWorkgroupsIndirect', demands=['GPUComputePassEncoder', 'TODO_UNKNOWN_TYPE_GPUBuffer', 'TODO_UNKNOWN_TYPE_GPUSize64'], returns='None'),
    ],
    "setviewport": [
        PrototypeCall(constructor='GPURenderPassEncoder', fn='setViewport', demands=['GPURenderPassEncoder', 'TODO_UNKNOWN_TYPE_float', 'TODO_UNKNOWN_TYPE_float', 'TODO_UNKNOWN_TYPE_float', 'TODO_UNKNOWN_TYPE_float', 'TODO_UNKNOWN_TYPE_float', 'TODO_UNKNOWN_TYPE_float'], returns='None'),
    ],
    "setscissorrect": [
        PrototypeCall(constructor='GPURenderPassEncoder', fn='setScissorRect', demands=['GPURenderPassEncoder', 'TODO_UNKNOWN_TYPE_GPUIntegerCoordinate', 'TODO_UNKNOWN_TYPE_GPUIntegerCoordinate', 'TODO_UNKNOWN_TYPE_GPUIntegerCoordinate', 'TODO_UNKNOWN_TYPE_GPUIntegerCoordinate'], returns='None'),
    ],
    "setblendconstant": [
        PrototypeCall(constructor='GPURenderPassEncoder', fn='setBlendConstant', demands=['GPURenderPassEncoder', 'TODO_UNKNOWN_TYPE_GPUColor'], returns='None'),
    ],
    "setstencilreference": [
        PrototypeCall(constructor='GPURenderPassEncoder', fn='setStencilReference', demands=['GPURenderPassEncoder', 'TODO_UNKNOWN_TYPE_GPUStencilValue'], returns='None'),
    ],
    "beginocclusionquery": [
        PrototypeCall(constructor='GPURenderPassEncoder', fn='beginOcclusionQuery', demands=['GPURenderPassEncoder', 'TODO_UNKNOWN_TYPE_GPUSize32'], returns='None'),
    ],
    "endocclusionquery": [
        PrototypeCall(constructor='GPURenderPassEncoder', fn='endOcclusionQuery', demands=['GPURenderPassEncoder'], returns='None'),
    ],
    "executebundles": [
        PrototypeCall(constructor='GPURenderPassEncoder', fn='executeBundles', demands=['GPURenderPassEncoder', 'TODO_UNKNOWN_TYPE_GPURenderBundle'], returns='None'),
    ],
    "onsubmittedworkdone": [
        PrototypeCall(constructor='GPUQueue', fn='onSubmittedWorkDone', demands=['GPUQueue'], returns='None'),
    ],
    "writebuffer": [
        PrototypeCall(constructor='GPUQueue', fn='writeBuffer', demands=['GPUQueue', 'TODO_UNKNOWN_TYPE_GPUBuffer', 'TODO_UNKNOWN_TYPE_GPUSize64', 'TODO_UNKNOWN_TYPE_AllowSharedBufferSource', 'TODO_UNKNOWN_TYPE_GPUSize64', 'TODO_UNKNOWN_TYPE_GPUSize64'], returns='None'),
    ],
    "writetexture": [
        PrototypeCall(constructor='GPUQueue', fn='writeTexture', demands=['GPUQueue', 'TODO_UNKNOWN_TYPE_GPUTexelCopyTextureInfo', 'TODO_UNKNOWN_TYPE_AllowSharedBufferSource', 'TODO_UNKNOWN_TYPE_GPUTexelCopyBufferLayout', 'TODO_UNKNOWN_TYPE_GPUExtent3D'], returns='None'),
    ],
    "copyexternalimagetotexture": [
        PrototypeCall(constructor='GPUQueue', fn='copyExternalImageToTexture', demands=['GPUQueue', 'TODO_UNKNOWN_TYPE_GPUCopyExternalImageSourceInfo', 'TODO_UNKNOWN_TYPE_GPUCopyExternalImageDestInfo', 'TODO_UNKNOWN_TYPE_GPUExtent3D'], returns='None'),
    ],
    "unconfigure": [
        PrototypeCall(constructor='GPUCanvasContext', fn='unconfigure', demands=['GPUCanvasContext'], returns='None'),
    ],
    "getcurrenttexture": [
        PrototypeCall(constructor='GPUCanvasContext', fn='getCurrentTexture', demands=['GPUCanvasContext'], returns='TODO_UNKNOWN_TYPE_GPUTexture'),
    ],
    "GPUValidationError": [
        NewCall(constructor='GPUValidationError', demands=['str'], returns='GPUValidationError'),
    ],
    "GPUOutOfMemoryError": [
        NewCall(constructor='GPUOutOfMemoryError', demands=['str'], returns='GPUOutOfMemoryError'),
    ],
    "GPUInternalError": [
        NewCall(constructor='GPUInternalError', demands=['str'], returns='GPUInternalError'),
    ],
    "GPUUncapturedErrorEvent": [
        NewCall(constructor='GPUUncapturedErrorEvent', demands=['str', 'TODO_UNKNOWN_TYPE_GPUUncapturedErrorEventInit'], returns='GPUUncapturedErrorEvent'),
    ],
    "EyeDropper": [
        NewCall(constructor='EyeDropper', demands=[], returns='EyeDropper'),
    ],
    "VTTCue": [
        NewCall(constructor='VTTCue', demands=['TODO_UNKNOWN_TYPE_double', 'TODO_UNKNOWN_TYPE_unrestricted double', 'str'], returns='VTTCue'),
    ],
    "getcueashtml": [
        PrototypeCall(constructor='VTTCue', fn='getCueAsHTML', demands=['VTTCue'], returns='TODO_UNKNOWN_TYPE_DocumentFragment'),
    ],
    "VTTRegion": [
        NewCall(constructor='VTTRegion', demands=[], returns='VTTRegion'),
    ],
    "playeffect": [
        PrototypeCall(constructor='GamepadHapticActuator', fn='playEffect', demands=['GamepadHapticActuator', 'TODO_UNKNOWN_TYPE_GamepadHapticEffectType', 'TODO_UNKNOWN_TYPE_GamepadEffectParameters'], returns='TODO_UNKNOWN_TYPE_GamepadHapticsResult'),
    ],
    "GamepadEvent": [
        NewCall(constructor='GamepadEvent', demands=['str', 'TODO_UNKNOWN_TYPE_GamepadEventInit'], returns='GamepadEvent'),
    ],
    "multidrawarrayswebgl": [
        PrototypeCall(constructor='WEBGL_multi_draw', fn='multiDrawArraysWEBGL', demands=['WEBGL_multi_draw', 'TODO_UNKNOWN_TYPE_GLenum', 'TODO_UNKNOWN_TYPE_Int32Array', 'TODO_UNKNOWN_TYPE_unsigned long long', 'TODO_UNKNOWN_TYPE_Int32Array', 'TODO_UNKNOWN_TYPE_unsigned long long', 'TODO_UNKNOWN_TYPE_GLsizei'], returns='None'),
    ],
    "multidrawelementswebgl": [
        PrototypeCall(constructor='WEBGL_multi_draw', fn='multiDrawElementsWEBGL', demands=['WEBGL_multi_draw', 'TODO_UNKNOWN_TYPE_GLenum', 'TODO_UNKNOWN_TYPE_Int32Array', 'TODO_UNKNOWN_TYPE_unsigned long long', 'TODO_UNKNOWN_TYPE_GLenum', 'TODO_UNKNOWN_TYPE_Int32Array', 'TODO_UNKNOWN_TYPE_unsigned long long', 'TODO_UNKNOWN_TYPE_GLsizei'], returns='None'),
    ],
    "multidrawarraysinstancedwebgl": [
        PrototypeCall(constructor='WEBGL_multi_draw', fn='multiDrawArraysInstancedWEBGL', demands=['WEBGL_multi_draw', 'TODO_UNKNOWN_TYPE_GLenum', 'TODO_UNKNOWN_TYPE_Int32Array', 'TODO_UNKNOWN_TYPE_unsigned long long', 'TODO_UNKNOWN_TYPE_Int32Array', 'TODO_UNKNOWN_TYPE_unsigned long long', 'TODO_UNKNOWN_TYPE_Int32Array', 'TODO_UNKNOWN_TYPE_unsigned long long', 'TODO_UNKNOWN_TYPE_GLsizei'], returns='None'),
    ],
    "multidrawelementsinstancedwebgl": [
        PrototypeCall(constructor='WEBGL_multi_draw', fn='multiDrawElementsInstancedWEBGL', demands=['WEBGL_multi_draw', 'TODO_UNKNOWN_TYPE_GLenum', 'TODO_UNKNOWN_TYPE_Int32Array', 'TODO_UNKNOWN_TYPE_unsigned long long', 'TODO_UNKNOWN_TYPE_GLenum', 'TODO_UNKNOWN_TYPE_Int32Array', 'TODO_UNKNOWN_TYPE_unsigned long long', 'TODO_UNKNOWN_TYPE_Int32Array', 'TODO_UNKNOWN_TYPE_unsigned long long', 'TODO_UNKNOWN_TYPE_GLsizei'], returns='None'),
    ],
    "issessionsupported": [
        PrototypeCall(constructor='XRSystem', fn='isSessionSupported', demands=['XRSystem', 'TODO_UNKNOWN_TYPE_XRSessionMode'], returns='bool'),
    ],
    "requestsession": [
        PrototypeCall(constructor='XRSystem', fn='requestSession', demands=['XRSystem', 'TODO_UNKNOWN_TYPE_XRSessionMode', 'TODO_UNKNOWN_TYPE_XRSessionInit'], returns='TODO_UNKNOWN_TYPE_XRSession'),
    ],
    "updaterenderstate": [
        PrototypeCall(constructor='XRSession', fn='updateRenderState', demands=['XRSession', 'TODO_UNKNOWN_TYPE_XRRenderStateInit'], returns='None'),
    ],
    "updatetargetframerate": [
        PrototypeCall(constructor='XRSession', fn='updateTargetFrameRate', demands=['XRSession', 'TODO_UNKNOWN_TYPE_float'], returns='None'),
    ],
    "requestreferencespace": [
        PrototypeCall(constructor='XRSession', fn='requestReferenceSpace', demands=['XRSession', 'TODO_UNKNOWN_TYPE_XRReferenceSpaceType'], returns='TODO_UNKNOWN_TYPE_XRReferenceSpace'),
    ],
    "requestanimationframe": [
        PrototypeCall(constructor='XRSession', fn='requestAnimationFrame', demands=['XRSession', 'TODO_UNKNOWN_TYPE_XRFrameRequestCallback'], returns='int'),
    ],
    "cancelanimationframe": [
        PrototypeCall(constructor='XRSession', fn='cancelAnimationFrame', demands=['XRSession', 'int'], returns='None'),
    ],
    "getviewerpose": [
        PrototypeCall(constructor='XRFrame', fn='getViewerPose', demands=['XRFrame', 'TODO_UNKNOWN_TYPE_XRReferenceSpace'], returns='TODO_UNKNOWN_TYPE_XRViewerPose'),
    ],
    "getoffsetreferencespace": [
        PrototypeCall(constructor='XRReferenceSpace', fn='getOffsetReferenceSpace', demands=['XRReferenceSpace', 'TODO_UNKNOWN_TYPE_XRRigidTransform'], returns='TODO_UNKNOWN_TYPE_XRReferenceSpace'),
    ],
    "requestviewportscale": [
        PrototypeCall(constructor='XRView', fn='requestViewportScale', demands=['XRView', 'TODO_UNKNOWN_TYPE_double'], returns='None'),
    ],
    "XRRigidTransform": [
        NewCall(constructor='XRRigidTransform', demands=['TODO_UNKNOWN_TYPE_DOMPointInit', 'TODO_UNKNOWN_TYPE_DOMPointInit'], returns='XRRigidTransform'),
    ],
    "XRWebGLLayer": [
        NewCall(constructor='XRWebGLLayer', demands=['TODO_UNKNOWN_TYPE_XRSession', 'TODO_UNKNOWN_TYPE_XRWebGLRenderingContext', 'TODO_UNKNOWN_TYPE_XRWebGLLayerInit'], returns='XRWebGLLayer'),
    ],
    "getviewport": [
        PrototypeCall(constructor='XRWebGLLayer', fn='getViewport', demands=['XRWebGLLayer', 'TODO_UNKNOWN_TYPE_XRView'], returns='TODO_UNKNOWN_TYPE_XRViewport'),
    ],
    "getnativeframebufferscalefactor": [
        DirectCall(fn='getNativeFramebufferScaleFactor', receiver='XRWebGLLayer', demands=['TODO_UNKNOWN_TYPE_XRSession'], returns='TODO_UNKNOWN_TYPE_double'),
    ],
    "XRSessionEvent": [
        NewCall(constructor='XRSessionEvent', demands=['str', 'TODO_UNKNOWN_TYPE_XRSessionEventInit'], returns='XRSessionEvent'),
    ],
    "XRInputSourceEvent": [
        NewCall(constructor='XRInputSourceEvent', demands=['str', 'TODO_UNKNOWN_TYPE_XRInputSourceEventInit'], returns='XRInputSourceEvent'),
    ],
    "XRInputSourcesChangeEvent": [
        NewCall(constructor='XRInputSourcesChangeEvent', demands=['str', 'TODO_UNKNOWN_TYPE_XRInputSourcesChangeEventInit'], returns='XRInputSourcesChangeEvent'),
    ],
    "XRReferenceSpaceEvent": [
        NewCall(constructor='XRReferenceSpaceEvent', demands=['str', 'TODO_UNKNOWN_TYPE_XRReferenceSpaceEventInit'], returns='XRReferenceSpaceEvent'),
    ],
    "FontFace": [
        NewCall(constructor='FontFace', demands=['TODO_UNKNOWN_TYPE_CSSOMString', 'TODO_UNKNOWN_TYPE_CSSOMString', 'TODO_UNKNOWN_TYPE_FontFaceDescriptors'], returns='FontFace'),
    ],
    "FontFaceSetLoadEvent": [
        NewCall(constructor='FontFaceSetLoadEvent', demands=['TODO_UNKNOWN_TYPE_CSSOMString', 'TODO_UNKNOWN_TYPE_FontFaceSetLoadEventInit'], returns='FontFaceSetLoadEvent'),
    ],
    "check": [
        PrototypeCall(constructor='FontFaceSet', fn='check', demands=['FontFaceSet', 'TODO_UNKNOWN_TYPE_CSSOMString', 'TODO_UNKNOWN_TYPE_CSSOMString'], returns='bool'),
    ],
    "next": [
        PrototypeCall(constructor='Subscriber', fn='next', demands=['Subscriber', '*'], returns='None'),
    ],
    "addteardown": [
        PrototypeCall(constructor='Subscriber', fn='addTeardown', demands=['Subscriber', 'TODO_UNKNOWN_TYPE_VoidFunction'], returns='None'),
    ],
    "Observable": [
        NewCall(constructor='Observable', demands=['TODO_UNKNOWN_TYPE_SubscribeCallback'], returns='Observable'),
    ],
    "takeuntil": [
        PrototypeCall(constructor='Observable', fn='takeUntil', demands=['Observable', '*'], returns='TODO_UNKNOWN_TYPE_Observable'),
    ],
    "map": [
        PrototypeCall(constructor='Observable', fn='map', demands=['Observable', 'TODO_UNKNOWN_TYPE_Mapper'], returns='TODO_UNKNOWN_TYPE_Observable'),
    ],
    "filter": [
        PrototypeCall(constructor='Observable', fn='filter', demands=['Observable', 'TODO_UNKNOWN_TYPE_Predicate'], returns='TODO_UNKNOWN_TYPE_Observable'),
    ],
    "take": [
        PrototypeCall(constructor='Observable', fn='take', demands=['Observable', 'TODO_UNKNOWN_TYPE_unsigned long long'], returns='TODO_UNKNOWN_TYPE_Observable'),
    ],
    "drop": [
        PrototypeCall(constructor='Observable', fn='drop', demands=['Observable', 'TODO_UNKNOWN_TYPE_unsigned long long'], returns='TODO_UNKNOWN_TYPE_Observable'),
    ],
    "flatmap": [
        PrototypeCall(constructor='Observable', fn='flatMap', demands=['Observable', 'TODO_UNKNOWN_TYPE_Mapper'], returns='TODO_UNKNOWN_TYPE_Observable'),
    ],
    "switchmap": [
        PrototypeCall(constructor='Observable', fn='switchMap', demands=['Observable', 'TODO_UNKNOWN_TYPE_Mapper'], returns='TODO_UNKNOWN_TYPE_Observable'),
    ],
    "inspect": [
        PrototypeCall(constructor='Observable', fn='inspect', demands=['Observable', 'TODO_UNKNOWN_TYPE_ObservableInspectorUnion'], returns='TODO_UNKNOWN_TYPE_Observable'),
    ],
    "catch": [
        PrototypeCall(constructor='Observable', fn='catch', demands=['Observable', 'TODO_UNKNOWN_TYPE_CatchCallback'], returns='TODO_UNKNOWN_TYPE_Observable'),
    ],
    "finally": [
        PrototypeCall(constructor='Observable', fn='finally', demands=['Observable', 'TODO_UNKNOWN_TYPE_VoidFunction'], returns='TODO_UNKNOWN_TYPE_Observable'),
    ],
    "toarray": [
        PrototypeCall(constructor='Observable', fn='toArray', demands=['Observable', 'TODO_UNKNOWN_TYPE_SubscribeOptions'], returns='*'),
    ],
    "foreach": [
        PrototypeCall(constructor='Observable', fn='forEach', demands=['Observable', 'TODO_UNKNOWN_TYPE_Visitor', 'TODO_UNKNOWN_TYPE_SubscribeOptions'], returns='None'),
    ],
    "every": [
        PrototypeCall(constructor='Observable', fn='every', demands=['Observable', 'TODO_UNKNOWN_TYPE_Predicate', 'TODO_UNKNOWN_TYPE_SubscribeOptions'], returns='bool'),
    ],
    "first": [
        PrototypeCall(constructor='Observable', fn='first', demands=['Observable', 'TODO_UNKNOWN_TYPE_SubscribeOptions'], returns='*'),
    ],
    "last": [
        PrototypeCall(constructor='Observable', fn='last', demands=['Observable', 'TODO_UNKNOWN_TYPE_SubscribeOptions'], returns='*'),
    ],
    "find": [
        PrototypeCall(constructor='Observable', fn='find', demands=['Observable', 'TODO_UNKNOWN_TYPE_Predicate', 'TODO_UNKNOWN_TYPE_SubscribeOptions'], returns='*'),
    ],
    "some": [
        PrototypeCall(constructor='Observable', fn='some', demands=['Observable', 'TODO_UNKNOWN_TYPE_Predicate', 'TODO_UNKNOWN_TYPE_SubscribeOptions'], returns='bool'),
    ],
    "reduce": [
        PrototypeCall(constructor='Observable', fn='reduce', demands=['Observable', 'TODO_UNKNOWN_TYPE_Reducer', '*', 'TODO_UNKNOWN_TYPE_SubscribeOptions'], returns='*'),
    ],
    "getbbox": [
        PrototypeCall(constructor='SVGGraphicsElement', fn='getBBox', demands=['SVGGraphicsElement', 'TODO_UNKNOWN_TYPE_SVGBoundingBoxOptions'], returns='TODO_UNKNOWN_TYPE_DOMRect'),
    ],
    "getctm": [
        PrototypeCall(constructor='SVGGraphicsElement', fn='getCTM', demands=['SVGGraphicsElement'], returns='TODO_UNKNOWN_TYPE_DOMMatrix'),
    ],
    "getscreenctm": [
        PrototypeCall(constructor='SVGGraphicsElement', fn='getScreenCTM', demands=['SVGGraphicsElement'], returns='TODO_UNKNOWN_TYPE_DOMMatrix'),
    ],
    "ispointinfill": [
        PrototypeCall(constructor='SVGGeometryElement', fn='isPointInFill', demands=['SVGGeometryElement', 'TODO_UNKNOWN_TYPE_DOMPointInit'], returns='bool'),
    ],
    "ispointinstroke": [
        PrototypeCall(constructor='SVGGeometryElement', fn='isPointInStroke', demands=['SVGGeometryElement', 'TODO_UNKNOWN_TYPE_DOMPointInit'], returns='bool'),
    ],
    "newvaluespecifiedunits": [
        PrototypeCall(constructor='SVGLength', fn='newValueSpecifiedUnits', demands=['SVGLength', 'TODO_UNKNOWN_TYPE_unsigned short', 'TODO_UNKNOWN_TYPE_float'], returns='None'),
        PrototypeCall(constructor='SVGAngle', fn='newValueSpecifiedUnits', demands=['SVGAngle', 'TODO_UNKNOWN_TYPE_unsigned short', 'TODO_UNKNOWN_TYPE_float'], returns='None'),
    ],
    "converttospecifiedunits": [
        PrototypeCall(constructor='SVGLength', fn='convertToSpecifiedUnits', demands=['SVGLength', 'TODO_UNKNOWN_TYPE_unsigned short'], returns='None'),
        PrototypeCall(constructor='SVGAngle', fn='convertToSpecifiedUnits', demands=['SVGAngle', 'TODO_UNKNOWN_TYPE_unsigned short'], returns='None'),
    ],
    "insertitembefore": [
        PrototypeCall(constructor='SVGNumberList', fn='insertItemBefore', demands=['SVGNumberList', 'TODO_UNKNOWN_TYPE_SVGNumber', 'int'], returns='TODO_UNKNOWN_TYPE_SVGNumber'),
        PrototypeCall(constructor='SVGLengthList', fn='insertItemBefore', demands=['SVGLengthList', 'TODO_UNKNOWN_TYPE_SVGLength', 'int'], returns='TODO_UNKNOWN_TYPE_SVGLength'),
        PrototypeCall(constructor='SVGStringList', fn='insertItemBefore', demands=['SVGStringList', 'str', 'int'], returns='str'),
        PrototypeCall(constructor='SVGTransformList', fn='insertItemBefore', demands=['SVGTransformList', 'TODO_UNKNOWN_TYPE_SVGTransform', 'int'], returns='TODO_UNKNOWN_TYPE_SVGTransform'),
        PrototypeCall(constructor='SVGPointList', fn='insertItemBefore', demands=['SVGPointList', 'TODO_UNKNOWN_TYPE_DOMPoint', 'int'], returns='TODO_UNKNOWN_TYPE_DOMPoint'),
    ],
    "replaceitem": [
        PrototypeCall(constructor='SVGNumberList', fn='replaceItem', demands=['SVGNumberList', 'TODO_UNKNOWN_TYPE_SVGNumber', 'int'], returns='TODO_UNKNOWN_TYPE_SVGNumber'),
        PrototypeCall(constructor='SVGLengthList', fn='replaceItem', demands=['SVGLengthList', 'TODO_UNKNOWN_TYPE_SVGLength', 'int'], returns='TODO_UNKNOWN_TYPE_SVGLength'),
        PrototypeCall(constructor='SVGStringList', fn='replaceItem', demands=['SVGStringList', 'str', 'int'], returns='str'),
        PrototypeCall(constructor='SVGTransformList', fn='replaceItem', demands=['SVGTransformList', 'TODO_UNKNOWN_TYPE_SVGTransform', 'int'], returns='TODO_UNKNOWN_TYPE_SVGTransform'),
        PrototypeCall(constructor='SVGPointList', fn='replaceItem', demands=['SVGPointList', 'TODO_UNKNOWN_TYPE_DOMPoint', 'int'], returns='TODO_UNKNOWN_TYPE_DOMPoint'),
    ],
    "appenditem": [
        PrototypeCall(constructor='SVGNumberList', fn='appendItem', demands=['SVGNumberList', 'TODO_UNKNOWN_TYPE_SVGNumber'], returns='TODO_UNKNOWN_TYPE_SVGNumber'),
        PrototypeCall(constructor='SVGLengthList', fn='appendItem', demands=['SVGLengthList', 'TODO_UNKNOWN_TYPE_SVGLength'], returns='TODO_UNKNOWN_TYPE_SVGLength'),
        PrototypeCall(constructor='SVGStringList', fn='appendItem', demands=['SVGStringList', 'str'], returns='str'),
        PrototypeCall(constructor='SVGTransformList', fn='appendItem', demands=['SVGTransformList', 'TODO_UNKNOWN_TYPE_SVGTransform'], returns='TODO_UNKNOWN_TYPE_SVGTransform'),
        PrototypeCall(constructor='SVGPointList', fn='appendItem', demands=['SVGPointList', 'TODO_UNKNOWN_TYPE_DOMPoint'], returns='TODO_UNKNOWN_TYPE_DOMPoint'),
    ],
    "getintersectionlist": [
        PrototypeCall(constructor='SVGSVGElement', fn='getIntersectionList', demands=['SVGSVGElement', 'TODO_UNKNOWN_TYPE_DOMRectReadOnly', 'TODO_UNKNOWN_TYPE_SVGElement'], returns='TODO_UNKNOWN_TYPE_NodeList'),
    ],
    "getenclosurelist": [
        PrototypeCall(constructor='SVGSVGElement', fn='getEnclosureList', demands=['SVGSVGElement', 'TODO_UNKNOWN_TYPE_DOMRectReadOnly', 'TODO_UNKNOWN_TYPE_SVGElement'], returns='TODO_UNKNOWN_TYPE_NodeList'),
    ],
    "checkintersection": [
        PrototypeCall(constructor='SVGSVGElement', fn='checkIntersection', demands=['SVGSVGElement', 'TODO_UNKNOWN_TYPE_SVGElement', 'TODO_UNKNOWN_TYPE_DOMRectReadOnly'], returns='bool'),
    ],
    "checkenclosure": [
        PrototypeCall(constructor='SVGSVGElement', fn='checkEnclosure', demands=['SVGSVGElement', 'TODO_UNKNOWN_TYPE_SVGElement', 'TODO_UNKNOWN_TYPE_DOMRectReadOnly'], returns='bool'),
    ],
    "deselectall": [
        PrototypeCall(constructor='SVGSVGElement', fn='deselectAll', demands=['SVGSVGElement'], returns='None'),
    ],
    "createsvgnumber": [
        PrototypeCall(constructor='SVGSVGElement', fn='createSVGNumber', demands=['SVGSVGElement'], returns='TODO_UNKNOWN_TYPE_SVGNumber'),
    ],
    "createsvglength": [
        PrototypeCall(constructor='SVGSVGElement', fn='createSVGLength', demands=['SVGSVGElement'], returns='TODO_UNKNOWN_TYPE_SVGLength'),
    ],
    "createsvgangle": [
        PrototypeCall(constructor='SVGSVGElement', fn='createSVGAngle', demands=['SVGSVGElement'], returns='TODO_UNKNOWN_TYPE_SVGAngle'),
    ],
    "createsvgpoint": [
        PrototypeCall(constructor='SVGSVGElement', fn='createSVGPoint', demands=['SVGSVGElement'], returns='TODO_UNKNOWN_TYPE_DOMPoint'),
    ],
    "createsvgmatrix": [
        PrototypeCall(constructor='SVGSVGElement', fn='createSVGMatrix', demands=['SVGSVGElement'], returns='TODO_UNKNOWN_TYPE_DOMMatrix'),
    ],
    "createsvgrect": [
        PrototypeCall(constructor='SVGSVGElement', fn='createSVGRect', demands=['SVGSVGElement'], returns='TODO_UNKNOWN_TYPE_DOMRect'),
    ],
    "createsvgtransform": [
        PrototypeCall(constructor='SVGSVGElement', fn='createSVGTransform', demands=['SVGSVGElement'], returns='TODO_UNKNOWN_TYPE_SVGTransform'),
    ],
    "createsvgtransformfrommatrix": [
        PrototypeCall(constructor='SVGSVGElement', fn='createSVGTransformFromMatrix', demands=['SVGSVGElement', 'TODO_UNKNOWN_TYPE_DOMMatrix2DInit'], returns='TODO_UNKNOWN_TYPE_SVGTransform'),
        PrototypeCall(constructor='SVGTransformList', fn='createSVGTransformFromMatrix', demands=['SVGTransformList', 'TODO_UNKNOWN_TYPE_DOMMatrix2DInit'], returns='TODO_UNKNOWN_TYPE_SVGTransform'),
    ],
    "getelementbyid": [
        PrototypeCall(constructor='SVGSVGElement', fn='getElementById', demands=['SVGSVGElement', 'str'], returns='Element'),
    ],
    "suspendredraw": [
        PrototypeCall(constructor='SVGSVGElement', fn='suspendRedraw', demands=['SVGSVGElement', 'int'], returns='int'),
    ],
    "unsuspendredraw": [
        PrototypeCall(constructor='SVGSVGElement', fn='unsuspendRedraw', demands=['SVGSVGElement', 'int'], returns='None'),
    ],
    "unsuspendredrawall": [
        PrototypeCall(constructor='SVGSVGElement', fn='unsuspendRedrawAll', demands=['SVGSVGElement'], returns='None'),
    ],
    "forceredraw": [
        PrototypeCall(constructor='SVGSVGElement', fn='forceRedraw', demands=['SVGSVGElement'], returns='None'),
    ],
    "ShadowAnimation": [
        NewCall(constructor='ShadowAnimation', demands=['TODO_UNKNOWN_TYPE_Animation', 'Element'], returns='ShadowAnimation'),
    ],
    "setmatrix": [
        PrototypeCall(constructor='SVGTransform', fn='setMatrix', demands=['SVGTransform', 'TODO_UNKNOWN_TYPE_DOMMatrix2DInit'], returns='None'),
    ],
    "settranslate": [
        PrototypeCall(constructor='SVGTransform', fn='setTranslate', demands=['SVGTransform', 'TODO_UNKNOWN_TYPE_float', 'TODO_UNKNOWN_TYPE_float'], returns='None'),
    ],
    "setscale": [
        PrototypeCall(constructor='SVGTransform', fn='setScale', demands=['SVGTransform', 'TODO_UNKNOWN_TYPE_float', 'TODO_UNKNOWN_TYPE_float'], returns='None'),
    ],
    "setrotate": [
        PrototypeCall(constructor='SVGTransform', fn='setRotate', demands=['SVGTransform', 'TODO_UNKNOWN_TYPE_float', 'TODO_UNKNOWN_TYPE_float', 'TODO_UNKNOWN_TYPE_float'], returns='None'),
    ],
    "setskewx": [
        PrototypeCall(constructor='SVGTransform', fn='setSkewX', demands=['SVGTransform', 'TODO_UNKNOWN_TYPE_float'], returns='None'),
    ],
    "setskewy": [
        PrototypeCall(constructor='SVGTransform', fn='setSkewY', demands=['SVGTransform', 'TODO_UNKNOWN_TYPE_float'], returns='None'),
    ],
    "consolidate": [
        PrototypeCall(constructor='SVGTransformList', fn='consolidate', demands=['SVGTransformList'], returns='TODO_UNKNOWN_TYPE_SVGTransform'),
    ],
    "getnumberofchars": [
        PrototypeCall(constructor='SVGTextContentElement', fn='getNumberOfChars', demands=['SVGTextContentElement'], returns='TODO_UNKNOWN_TYPE_long'),
    ],
    "getcomputedtextlength": [
        PrototypeCall(constructor='SVGTextContentElement', fn='getComputedTextLength', demands=['SVGTextContentElement'], returns='TODO_UNKNOWN_TYPE_float'),
    ],
    "getsubstringlength": [
        PrototypeCall(constructor='SVGTextContentElement', fn='getSubStringLength', demands=['SVGTextContentElement', 'int', 'int'], returns='TODO_UNKNOWN_TYPE_float'),
    ],
    "getstartpositionofchar": [
        PrototypeCall(constructor='SVGTextContentElement', fn='getStartPositionOfChar', demands=['SVGTextContentElement', 'int'], returns='TODO_UNKNOWN_TYPE_DOMPoint'),
    ],
    "getendpositionofchar": [
        PrototypeCall(constructor='SVGTextContentElement', fn='getEndPositionOfChar', demands=['SVGTextContentElement', 'int'], returns='TODO_UNKNOWN_TYPE_DOMPoint'),
    ],
    "getextentofchar": [
        PrototypeCall(constructor='SVGTextContentElement', fn='getExtentOfChar', demands=['SVGTextContentElement', 'int'], returns='TODO_UNKNOWN_TYPE_DOMRect'),
    ],
    "getrotationofchar": [
        PrototypeCall(constructor='SVGTextContentElement', fn='getRotationOfChar', demands=['SVGTextContentElement', 'int'], returns='TODO_UNKNOWN_TYPE_float'),
    ],
    "getcharnumatposition": [
        PrototypeCall(constructor='SVGTextContentElement', fn='getCharNumAtPosition', demands=['SVGTextContentElement', 'TODO_UNKNOWN_TYPE_DOMPointInit'], returns='TODO_UNKNOWN_TYPE_long'),
    ],
    "selectsubstring": [
        PrototypeCall(constructor='SVGTextContentElement', fn='selectSubString', demands=['SVGTextContentElement', 'int', 'int'], returns='None'),
    ],
    "setorienttoauto": [
        PrototypeCall(constructor='SVGMarkerElement', fn='setOrientToAuto', demands=['SVGMarkerElement'], returns='None'),
    ],
    "setorienttoangle": [
        PrototypeCall(constructor='SVGMarkerElement', fn='setOrientToAngle', demands=['SVGMarkerElement', 'TODO_UNKNOWN_TYPE_SVGAngle'], returns='None'),
    ],
    "GeolocationSensor": [
        NewCall(constructor='GeolocationSensor', demands=['TODO_UNKNOWN_TYPE_GeolocationSensorOptions'], returns='GeolocationSensor'),
    ],
    "InputDeviceCapabilities": [
        NewCall(constructor='InputDeviceCapabilities', demands=['TODO_UNKNOWN_TYPE_InputDeviceCapabilitiesInit'], returns='InputDeviceCapabilities'),
    ],
    "IdleDetector": [
        NewCall(constructor='IdleDetector', demands=[], returns='IdleDetector'),
    ],
    "SyncEvent": [
        NewCall(constructor='SyncEvent', demands=['str', 'TODO_UNKNOWN_TYPE_SyncEventInit'], returns='SyncEvent'),
    ],
    "SFrameTransform": [
        NewCall(constructor='SFrameTransform', demands=['TODO_UNKNOWN_TYPE_SFrameTransformOptions'], returns='SFrameTransform'),
    ],
    "setencryptionkey": [
        PrototypeCall(constructor='SFrameTransform', fn='setEncryptionKey', demands=['SFrameTransform', 'TODO_UNKNOWN_TYPE_CryptoKey', 'TODO_UNKNOWN_TYPE_CryptoKeyID'], returns='None'),
    ],
    "SFrameTransformErrorEvent": [
        NewCall(constructor='SFrameTransformErrorEvent', demands=['str', 'TODO_UNKNOWN_TYPE_SFrameTransformErrorEventInit'], returns='SFrameTransformErrorEvent'),
    ],
    "RTCEncodedVideoFrame": [
        NewCall(constructor='RTCEncodedVideoFrame', demands=['TODO_UNKNOWN_TYPE_RTCEncodedVideoFrame', 'TODO_UNKNOWN_TYPE_RTCEncodedVideoFrameOptions'], returns='RTCEncodedVideoFrame'),
    ],
    "getmetadata": [
        PrototypeCall(constructor='RTCEncodedVideoFrame', fn='getMetadata', demands=['RTCEncodedVideoFrame'], returns='TODO_UNKNOWN_TYPE_RTCEncodedVideoFrameMetadata'),
        PrototypeCall(constructor='RTCEncodedAudioFrame', fn='getMetadata', demands=['RTCEncodedAudioFrame'], returns='TODO_UNKNOWN_TYPE_RTCEncodedAudioFrameMetadata'),
    ],
    "RTCEncodedAudioFrame": [
        NewCall(constructor='RTCEncodedAudioFrame', demands=['TODO_UNKNOWN_TYPE_RTCEncodedAudioFrame', 'TODO_UNKNOWN_TYPE_RTCEncodedAudioFrameOptions'], returns='RTCEncodedAudioFrame'),
    ],
    "generatekeyframe": [
        PrototypeCall(constructor='RTCRtpScriptTransformer', fn='generateKeyFrame', demands=['RTCRtpScriptTransformer', 'str'], returns='TODO_UNKNOWN_TYPE_unsigned long long'),
    ],
    "sendkeyframerequest": [
        PrototypeCall(constructor='RTCRtpScriptTransformer', fn='sendKeyFrameRequest', demands=['RTCRtpScriptTransformer'], returns='None'),
    ],
    "RTCRtpScriptTransform": [
        NewCall(constructor='RTCRtpScriptTransform', demands=['TODO_UNKNOWN_TYPE_Worker', '*', 'TODO_UNKNOWN_TYPE_object'], returns='RTCRtpScriptTransform'),
    ],
    "KeyFrameRequestEvent": [
        NewCall(constructor='KeyFrameRequestEvent', demands=['str', 'str'], returns='KeyFrameRequestEvent'),
    ],
    "drawbufferswebgl": [
        PrototypeCall(constructor='WEBGL_draw_buffers', fn='drawBuffersWEBGL', demands=['WEBGL_draw_buffers', 'TODO_UNKNOWN_TYPE_GLenum'], returns='None'),
    ],
    "watchavailability": [
        PrototypeCall(constructor='RemotePlayback', fn='watchAvailability', demands=['RemotePlayback', 'TODO_UNKNOWN_TYPE_RemotePlaybackAvailabilityCallback'], returns='TODO_UNKNOWN_TYPE_long'),
    ],
    "cancelwatchavailability": [
        PrototypeCall(constructor='RemotePlayback', fn='cancelWatchAvailability', demands=['RemotePlayback', 'TODO_UNKNOWN_TYPE_long'], returns='None'),
    ],
    "Headers": [
        NewCall(constructor='Headers', demands=['TODO_UNKNOWN_TYPE_HeadersInit'], returns='Headers'),
    ],
    "getsetcookie": [
        PrototypeCall(constructor='Headers', fn='getSetCookie', demands=['Headers'], returns='TODO_UNKNOWN_TYPE_ByteString'),
    ],
    "Request": [
        NewCall(constructor='Request', demands=['TODO_UNKNOWN_TYPE_RequestInfo', 'TODO_UNKNOWN_TYPE_RequestInit'], returns='Request'),
    ],
    "Response": [
        NewCall(constructor='Response', demands=['TODO_UNKNOWN_TYPE_BodyInit', 'TODO_UNKNOWN_TYPE_ResponseInit'], returns='Response'),
    ],
    "redirect": [
        DirectCall(fn='redirect', receiver='Response', demands=['str', 'TODO_UNKNOWN_TYPE_unsigned short'], returns='TODO_UNKNOWN_TYPE_Response'),
    ],
    "DocumentTimeline": [
        NewCall(constructor='DocumentTimeline', demands=['TODO_UNKNOWN_TYPE_DocumentTimelineOptions'], returns='DocumentTimeline'),
    ],
    "Animation": [
        NewCall(constructor='Animation', demands=['TODO_UNKNOWN_TYPE_AnimationEffect', 'TODO_UNKNOWN_TYPE_AnimationTimeline'], returns='Animation'),
    ],
    "updateplaybackrate": [
        PrototypeCall(constructor='Animation', fn='updatePlaybackRate', demands=['Animation', 'TODO_UNKNOWN_TYPE_double'], returns='None'),
    ],
    "reverse": [
        PrototypeCall(constructor='Animation', fn='reverse', demands=['Animation'], returns='None'),
    ],
    "commitstyles": [
        PrototypeCall(constructor='Animation', fn='commitStyles', demands=['Animation'], returns='None'),
    ],
    "updatetiming": [
        PrototypeCall(constructor='AnimationEffect', fn='updateTiming', demands=['AnimationEffect', 'TODO_UNKNOWN_TYPE_OptionalEffectTiming'], returns='None'),
    ],
    "KeyframeEffect": [
        NewCall(constructor='KeyframeEffect', demands=['Element', 'TODO_UNKNOWN_TYPE_object', 'TODO_UNKNOWN_TYPE_unrestricted double'], returns='KeyframeEffect'),
        NewCall(constructor='KeyframeEffect', demands=['TODO_UNKNOWN_TYPE_KeyframeEffect'], returns='KeyframeEffect'),
    ],
    "getkeyframes": [
        PrototypeCall(constructor='KeyframeEffect', fn='getKeyframes', demands=['KeyframeEffect'], returns='TODO_UNKNOWN_TYPE_object'),
    ],
    "setkeyframes": [
        PrototypeCall(constructor='KeyframeEffect', fn='setKeyframes', demands=['KeyframeEffect', 'TODO_UNKNOWN_TYPE_object'], returns='None'),
    ],
    "CompressionStream": [
        NewCall(constructor='CompressionStream', demands=['TODO_UNKNOWN_TYPE_CompressionFormat'], returns='CompressionStream'),
    ],
    "DecompressionStream": [
        NewCall(constructor='DecompressionStream', demands=['TODO_UNKNOWN_TYPE_CompressionFormat'], returns='DecompressionStream'),
    ],
    "setconsumer": [
        PrototypeCall(constructor='LaunchQueue', fn='setConsumer', demands=['LaunchQueue', 'TODO_UNKNOWN_TYPE_LaunchConsumer'], returns='None'),
    ],
    "isinputpending": [
        PrototypeCall(constructor='Scheduling', fn='isInputPending', demands=['Scheduling', 'TODO_UNKNOWN_TYPE_IsInputPendingOptions'], returns='bool'),
    ],
    "fetch": [
        PrototypeCall(constructor='BackgroundFetchManager', fn='fetch', demands=['BackgroundFetchManager', 'str', 'TODO_UNKNOWN_TYPE_RequestInfo', 'TODO_UNKNOWN_TYPE_BackgroundFetchOptions'], returns='TODO_UNKNOWN_TYPE_BackgroundFetchRegistration'),
    ],
    "getids": [
        PrototypeCall(constructor='BackgroundFetchManager', fn='getIds', demands=['BackgroundFetchManager'], returns='str'),
    ],
    "BackgroundFetchEvent": [
        NewCall(constructor='BackgroundFetchEvent', demands=['str', 'TODO_UNKNOWN_TYPE_BackgroundFetchEventInit'], returns='BackgroundFetchEvent'),
    ],
    "BackgroundFetchUpdateUIEvent": [
        NewCall(constructor='BackgroundFetchUpdateUIEvent', demands=['str', 'TODO_UNKNOWN_TYPE_BackgroundFetchEventInit'], returns='BackgroundFetchUpdateUIEvent'),
    ],
    "updateui": [
        PrototypeCall(constructor='BackgroundFetchUpdateUIEvent', fn='updateUI', demands=['BackgroundFetchUpdateUIEvent', 'TODO_UNKNOWN_TYPE_BackgroundFetchUIOptions'], returns='None'),
    ],
    "translatestreaming": [
        PrototypeCall(constructor='Translator', fn='translateStreaming', demands=['Translator', 'str', 'TODO_UNKNOWN_TYPE_TranslatorTranslateOptions'], returns='TODO_UNKNOWN_TYPE_ReadableStream'),
    ],
    "XMLHttpRequest": [
        NewCall(constructor='XMLHttpRequest', demands=[], returns='XMLHttpRequest'),
    ],
    "setrequestheader": [
        PrototypeCall(constructor='XMLHttpRequest', fn='setRequestHeader', demands=['XMLHttpRequest', 'TODO_UNKNOWN_TYPE_ByteString', 'TODO_UNKNOWN_TYPE_ByteString'], returns='None'),
    ],
    "getresponseheader": [
        PrototypeCall(constructor='XMLHttpRequest', fn='getResponseHeader', demands=['XMLHttpRequest', 'TODO_UNKNOWN_TYPE_ByteString'], returns='TODO_UNKNOWN_TYPE_ByteString'),
    ],
    "getallresponseheaders": [
        PrototypeCall(constructor='XMLHttpRequest', fn='getAllResponseHeaders', demands=['XMLHttpRequest'], returns='TODO_UNKNOWN_TYPE_ByteString'),
    ],
    "overridemimetype": [
        PrototypeCall(constructor='XMLHttpRequest', fn='overrideMimeType', demands=['XMLHttpRequest', 'str'], returns='None'),
    ],
    "FormData": [
        NewCall(constructor='FormData', demands=['TODO_UNKNOWN_TYPE_HTMLFormElement', 'TODO_UNKNOWN_TYPE_HTMLElement'], returns='FormData'),
    ],
    "ProgressEvent": [
        NewCall(constructor='ProgressEvent', demands=['str', 'TODO_UNKNOWN_TYPE_ProgressEventInit'], returns='ProgressEvent'),
    ],
    "createanalyser": [
        PrototypeCall(constructor='BaseAudioContext', fn='createAnalyser', demands=['BaseAudioContext'], returns='TODO_UNKNOWN_TYPE_AnalyserNode'),
    ],
    "createbiquadfilter": [
        PrototypeCall(constructor='BaseAudioContext', fn='createBiquadFilter', demands=['BaseAudioContext'], returns='TODO_UNKNOWN_TYPE_BiquadFilterNode'),
    ],
    "createbuffersource": [
        PrototypeCall(constructor='BaseAudioContext', fn='createBufferSource', demands=['BaseAudioContext'], returns='TODO_UNKNOWN_TYPE_AudioBufferSourceNode'),
    ],
    "createchannelmerger": [
        PrototypeCall(constructor='BaseAudioContext', fn='createChannelMerger', demands=['BaseAudioContext', 'int'], returns='TODO_UNKNOWN_TYPE_ChannelMergerNode'),
    ],
    "createchannelsplitter": [
        PrototypeCall(constructor='BaseAudioContext', fn='createChannelSplitter', demands=['BaseAudioContext', 'int'], returns='TODO_UNKNOWN_TYPE_ChannelSplitterNode'),
    ],
    "createconstantsource": [
        PrototypeCall(constructor='BaseAudioContext', fn='createConstantSource', demands=['BaseAudioContext'], returns='TODO_UNKNOWN_TYPE_ConstantSourceNode'),
    ],
    "createconvolver": [
        PrototypeCall(constructor='BaseAudioContext', fn='createConvolver', demands=['BaseAudioContext'], returns='TODO_UNKNOWN_TYPE_ConvolverNode'),
    ],
    "createdelay": [
        PrototypeCall(constructor='BaseAudioContext', fn='createDelay', demands=['BaseAudioContext', 'TODO_UNKNOWN_TYPE_double'], returns='TODO_UNKNOWN_TYPE_DelayNode'),
    ],
    "createdynamicscompressor": [
        PrototypeCall(constructor='BaseAudioContext', fn='createDynamicsCompressor', demands=['BaseAudioContext'], returns='TODO_UNKNOWN_TYPE_DynamicsCompressorNode'),
    ],
    "creategain": [
        PrototypeCall(constructor='BaseAudioContext', fn='createGain', demands=['BaseAudioContext'], returns='TODO_UNKNOWN_TYPE_GainNode'),
    ],
    "createiirfilter": [
        PrototypeCall(constructor='BaseAudioContext', fn='createIIRFilter', demands=['BaseAudioContext', 'TODO_UNKNOWN_TYPE_double', 'TODO_UNKNOWN_TYPE_double'], returns='TODO_UNKNOWN_TYPE_IIRFilterNode'),
    ],
    "createoscillator": [
        PrototypeCall(constructor='BaseAudioContext', fn='createOscillator', demands=['BaseAudioContext'], returns='TODO_UNKNOWN_TYPE_OscillatorNode'),
    ],
    "createpanner": [
        PrototypeCall(constructor='BaseAudioContext', fn='createPanner', demands=['BaseAudioContext'], returns='TODO_UNKNOWN_TYPE_PannerNode'),
    ],
    "createperiodicwave": [
        PrototypeCall(constructor='BaseAudioContext', fn='createPeriodicWave', demands=['BaseAudioContext', 'TODO_UNKNOWN_TYPE_float', 'TODO_UNKNOWN_TYPE_float', 'TODO_UNKNOWN_TYPE_PeriodicWaveConstraints'], returns='TODO_UNKNOWN_TYPE_PeriodicWave'),
    ],
    "createscriptprocessor": [
        PrototypeCall(constructor='BaseAudioContext', fn='createScriptProcessor', demands=['BaseAudioContext', 'int', 'int', 'int'], returns='TODO_UNKNOWN_TYPE_ScriptProcessorNode'),
    ],
    "createstereopanner": [
        PrototypeCall(constructor='BaseAudioContext', fn='createStereoPanner', demands=['BaseAudioContext'], returns='TODO_UNKNOWN_TYPE_StereoPannerNode'),
    ],
    "createwaveshaper": [
        PrototypeCall(constructor='BaseAudioContext', fn='createWaveShaper', demands=['BaseAudioContext'], returns='TODO_UNKNOWN_TYPE_WaveShaperNode'),
    ],
    "decodeaudiodata": [
        PrototypeCall(constructor='BaseAudioContext', fn='decodeAudioData', demands=['BaseAudioContext', 'TODO_UNKNOWN_TYPE_ArrayBuffer', 'TODO_UNKNOWN_TYPE_DecodeSuccessCallback', 'TODO_UNKNOWN_TYPE_DecodeErrorCallback'], returns='TODO_UNKNOWN_TYPE_AudioBuffer'),
    ],
    "AudioContext": [
        NewCall(constructor='AudioContext', demands=['TODO_UNKNOWN_TYPE_AudioContextOptions'], returns='AudioContext'),
    ],
    "getoutputtimestamp": [
        PrototypeCall(constructor='AudioContext', fn='getOutputTimestamp', demands=['AudioContext'], returns='TODO_UNKNOWN_TYPE_AudioTimestamp'),
    ],
    "suspend": [
        PrototypeCall(constructor='AudioContext', fn='suspend', demands=['AudioContext'], returns='None'),
        PrototypeCall(constructor='OfflineAudioContext', fn='suspend', demands=['OfflineAudioContext', 'TODO_UNKNOWN_TYPE_double'], returns='None'),
    ],
    "setsinkid": [
        PrototypeCall(constructor='AudioContext', fn='setSinkId', demands=['AudioContext', 'str'], returns='None'),
    ],
    "createmediaelementsource": [
        PrototypeCall(constructor='AudioContext', fn='createMediaElementSource', demands=['AudioContext', 'TODO_UNKNOWN_TYPE_HTMLMediaElement'], returns='TODO_UNKNOWN_TYPE_MediaElementAudioSourceNode'),
    ],
    "createmediastreamsource": [
        PrototypeCall(constructor='AudioContext', fn='createMediaStreamSource', demands=['AudioContext', 'TODO_UNKNOWN_TYPE_MediaStream'], returns='TODO_UNKNOWN_TYPE_MediaStreamAudioSourceNode'),
    ],
    "createmediastreamtracksource": [
        PrototypeCall(constructor='AudioContext', fn='createMediaStreamTrackSource', demands=['AudioContext', 'TODO_UNKNOWN_TYPE_MediaStreamTrack'], returns='TODO_UNKNOWN_TYPE_MediaStreamTrackAudioSourceNode'),
    ],
    "createmediastreamdestination": [
        PrototypeCall(constructor='AudioContext', fn='createMediaStreamDestination', demands=['AudioContext'], returns='TODO_UNKNOWN_TYPE_MediaStreamAudioDestinationNode'),
    ],
    "OfflineAudioContext": [
        NewCall(constructor='OfflineAudioContext', demands=['TODO_UNKNOWN_TYPE_OfflineAudioContextOptions'], returns='OfflineAudioContext'),
        NewCall(constructor='OfflineAudioContext', demands=['int', 'int', 'TODO_UNKNOWN_TYPE_float'], returns='OfflineAudioContext'),
    ],
    "startrendering": [
        PrototypeCall(constructor='OfflineAudioContext', fn='startRendering', demands=['OfflineAudioContext'], returns='TODO_UNKNOWN_TYPE_AudioBuffer'),
    ],
    "OfflineAudioCompletionEvent": [
        NewCall(constructor='OfflineAudioCompletionEvent', demands=['str', 'TODO_UNKNOWN_TYPE_OfflineAudioCompletionEventInit'], returns='OfflineAudioCompletionEvent'),
    ],
    "AudioBuffer": [
        NewCall(constructor='AudioBuffer', demands=['TODO_UNKNOWN_TYPE_AudioBufferOptions'], returns='AudioBuffer'),
    ],
    "getchanneldata": [
        PrototypeCall(constructor='AudioBuffer', fn='getChannelData', demands=['AudioBuffer', 'int'], returns='TODO_UNKNOWN_TYPE_Float32Array'),
    ],
    "copyfromchannel": [
        PrototypeCall(constructor='AudioBuffer', fn='copyFromChannel', demands=['AudioBuffer', 'TODO_UNKNOWN_TYPE_Float32Array', 'int', 'int'], returns='None'),
    ],
    "copytochannel": [
        PrototypeCall(constructor='AudioBuffer', fn='copyToChannel', demands=['AudioBuffer', 'TODO_UNKNOWN_TYPE_Float32Array', 'int', 'int'], returns='None'),
    ],
    "setvalueattime": [
        PrototypeCall(constructor='AudioParam', fn='setValueAtTime', demands=['AudioParam', 'TODO_UNKNOWN_TYPE_float', 'TODO_UNKNOWN_TYPE_double'], returns='TODO_UNKNOWN_TYPE_AudioParam'),
    ],
    "linearramptovalueattime": [
        PrototypeCall(constructor='AudioParam', fn='linearRampToValueAtTime', demands=['AudioParam', 'TODO_UNKNOWN_TYPE_float', 'TODO_UNKNOWN_TYPE_double'], returns='TODO_UNKNOWN_TYPE_AudioParam'),
    ],
    "exponentialramptovalueattime": [
        PrototypeCall(constructor='AudioParam', fn='exponentialRampToValueAtTime', demands=['AudioParam', 'TODO_UNKNOWN_TYPE_float', 'TODO_UNKNOWN_TYPE_double'], returns='TODO_UNKNOWN_TYPE_AudioParam'),
    ],
    "settargetattime": [
        PrototypeCall(constructor='AudioParam', fn='setTargetAtTime', demands=['AudioParam', 'TODO_UNKNOWN_TYPE_float', 'TODO_UNKNOWN_TYPE_double', 'TODO_UNKNOWN_TYPE_float'], returns='TODO_UNKNOWN_TYPE_AudioParam'),
    ],
    "setvaluecurveattime": [
        PrototypeCall(constructor='AudioParam', fn='setValueCurveAtTime', demands=['AudioParam', 'TODO_UNKNOWN_TYPE_float', 'TODO_UNKNOWN_TYPE_double', 'TODO_UNKNOWN_TYPE_double'], returns='TODO_UNKNOWN_TYPE_AudioParam'),
    ],
    "cancelscheduledvalues": [
        PrototypeCall(constructor='AudioParam', fn='cancelScheduledValues', demands=['AudioParam', 'TODO_UNKNOWN_TYPE_double'], returns='TODO_UNKNOWN_TYPE_AudioParam'),
    ],
    "cancelandholdattime": [
        PrototypeCall(constructor='AudioParam', fn='cancelAndHoldAtTime', demands=['AudioParam', 'TODO_UNKNOWN_TYPE_double'], returns='TODO_UNKNOWN_TYPE_AudioParam'),
    ],
    "AnalyserNode": [
        NewCall(constructor='AnalyserNode', demands=['TODO_UNKNOWN_TYPE_BaseAudioContext', 'TODO_UNKNOWN_TYPE_AnalyserOptions'], returns='AnalyserNode'),
    ],
    "getfloatfrequencydata": [
        PrototypeCall(constructor='AnalyserNode', fn='getFloatFrequencyData', demands=['AnalyserNode', 'TODO_UNKNOWN_TYPE_Float32Array'], returns='None'),
    ],
    "getbytefrequencydata": [
        PrototypeCall(constructor='AnalyserNode', fn='getByteFrequencyData', demands=['AnalyserNode', 'TODO_UNKNOWN_TYPE_Uint8Array'], returns='None'),
    ],
    "getfloattimedomaindata": [
        PrototypeCall(constructor='AnalyserNode', fn='getFloatTimeDomainData', demands=['AnalyserNode', 'TODO_UNKNOWN_TYPE_Float32Array'], returns='None'),
    ],
    "getbytetimedomaindata": [
        PrototypeCall(constructor='AnalyserNode', fn='getByteTimeDomainData', demands=['AnalyserNode', 'TODO_UNKNOWN_TYPE_Uint8Array'], returns='None'),
    ],
    "AudioBufferSourceNode": [
        NewCall(constructor='AudioBufferSourceNode', demands=['TODO_UNKNOWN_TYPE_BaseAudioContext', 'TODO_UNKNOWN_TYPE_AudioBufferSourceOptions'], returns='AudioBufferSourceNode'),
    ],
    "setorientation": [
        PrototypeCall(constructor='AudioListener', fn='setOrientation', demands=['AudioListener', 'TODO_UNKNOWN_TYPE_float', 'TODO_UNKNOWN_TYPE_float', 'TODO_UNKNOWN_TYPE_float', 'TODO_UNKNOWN_TYPE_float', 'TODO_UNKNOWN_TYPE_float', 'TODO_UNKNOWN_TYPE_float'], returns='None'),
        PrototypeCall(constructor='PannerNode', fn='setOrientation', demands=['PannerNode', 'TODO_UNKNOWN_TYPE_float', 'TODO_UNKNOWN_TYPE_float', 'TODO_UNKNOWN_TYPE_float'], returns='None'),
    ],
    "AudioProcessingEvent": [
        NewCall(constructor='AudioProcessingEvent', demands=['str', 'TODO_UNKNOWN_TYPE_AudioProcessingEventInit'], returns='AudioProcessingEvent'),
    ],
    "BiquadFilterNode": [
        NewCall(constructor='BiquadFilterNode', demands=['TODO_UNKNOWN_TYPE_BaseAudioContext', 'TODO_UNKNOWN_TYPE_BiquadFilterOptions'], returns='BiquadFilterNode'),
    ],
    "getfrequencyresponse": [
        PrototypeCall(constructor='BiquadFilterNode', fn='getFrequencyResponse', demands=['BiquadFilterNode', 'TODO_UNKNOWN_TYPE_Float32Array', 'TODO_UNKNOWN_TYPE_Float32Array', 'TODO_UNKNOWN_TYPE_Float32Array'], returns='None'),
        PrototypeCall(constructor='IIRFilterNode', fn='getFrequencyResponse', demands=['IIRFilterNode', 'TODO_UNKNOWN_TYPE_Float32Array', 'TODO_UNKNOWN_TYPE_Float32Array', 'TODO_UNKNOWN_TYPE_Float32Array'], returns='None'),
    ],
    "ChannelMergerNode": [
        NewCall(constructor='ChannelMergerNode', demands=['TODO_UNKNOWN_TYPE_BaseAudioContext', 'TODO_UNKNOWN_TYPE_ChannelMergerOptions'], returns='ChannelMergerNode'),
    ],
    "ChannelSplitterNode": [
        NewCall(constructor='ChannelSplitterNode', demands=['TODO_UNKNOWN_TYPE_BaseAudioContext', 'TODO_UNKNOWN_TYPE_ChannelSplitterOptions'], returns='ChannelSplitterNode'),
    ],
    "ConstantSourceNode": [
        NewCall(constructor='ConstantSourceNode', demands=['TODO_UNKNOWN_TYPE_BaseAudioContext', 'TODO_UNKNOWN_TYPE_ConstantSourceOptions'], returns='ConstantSourceNode'),
    ],
    "ConvolverNode": [
        NewCall(constructor='ConvolverNode', demands=['TODO_UNKNOWN_TYPE_BaseAudioContext', 'TODO_UNKNOWN_TYPE_ConvolverOptions'], returns='ConvolverNode'),
    ],
    "DelayNode": [
        NewCall(constructor='DelayNode', demands=['TODO_UNKNOWN_TYPE_BaseAudioContext', 'TODO_UNKNOWN_TYPE_DelayOptions'], returns='DelayNode'),
    ],
    "DynamicsCompressorNode": [
        NewCall(constructor='DynamicsCompressorNode', demands=['TODO_UNKNOWN_TYPE_BaseAudioContext', 'TODO_UNKNOWN_TYPE_DynamicsCompressorOptions'], returns='DynamicsCompressorNode'),
    ],
    "GainNode": [
        NewCall(constructor='GainNode', demands=['TODO_UNKNOWN_TYPE_BaseAudioContext', 'TODO_UNKNOWN_TYPE_GainOptions'], returns='GainNode'),
    ],
    "IIRFilterNode": [
        NewCall(constructor='IIRFilterNode', demands=['TODO_UNKNOWN_TYPE_BaseAudioContext', 'TODO_UNKNOWN_TYPE_IIRFilterOptions'], returns='IIRFilterNode'),
    ],
    "MediaElementAudioSourceNode": [
        NewCall(constructor='MediaElementAudioSourceNode', demands=['TODO_UNKNOWN_TYPE_AudioContext', 'TODO_UNKNOWN_TYPE_MediaElementAudioSourceOptions'], returns='MediaElementAudioSourceNode'),
    ],
    "MediaStreamAudioDestinationNode": [
        NewCall(constructor='MediaStreamAudioDestinationNode', demands=['TODO_UNKNOWN_TYPE_AudioContext', 'TODO_UNKNOWN_TYPE_AudioNodeOptions'], returns='MediaStreamAudioDestinationNode'),
    ],
    "MediaStreamAudioSourceNode": [
        NewCall(constructor='MediaStreamAudioSourceNode', demands=['TODO_UNKNOWN_TYPE_AudioContext', 'TODO_UNKNOWN_TYPE_MediaStreamAudioSourceOptions'], returns='MediaStreamAudioSourceNode'),
    ],
    "MediaStreamTrackAudioSourceNode": [
        NewCall(constructor='MediaStreamTrackAudioSourceNode', demands=['TODO_UNKNOWN_TYPE_AudioContext', 'TODO_UNKNOWN_TYPE_MediaStreamTrackAudioSourceOptions'], returns='MediaStreamTrackAudioSourceNode'),
    ],
    "OscillatorNode": [
        NewCall(constructor='OscillatorNode', demands=['TODO_UNKNOWN_TYPE_BaseAudioContext', 'TODO_UNKNOWN_TYPE_OscillatorOptions'], returns='OscillatorNode'),
    ],
    "setperiodicwave": [
        PrototypeCall(constructor='OscillatorNode', fn='setPeriodicWave', demands=['OscillatorNode', 'TODO_UNKNOWN_TYPE_PeriodicWave'], returns='None'),
    ],
    "PannerNode": [
        NewCall(constructor='PannerNode', demands=['TODO_UNKNOWN_TYPE_BaseAudioContext', 'TODO_UNKNOWN_TYPE_PannerOptions'], returns='PannerNode'),
    ],
    "PeriodicWave": [
        NewCall(constructor='PeriodicWave', demands=['TODO_UNKNOWN_TYPE_BaseAudioContext', 'TODO_UNKNOWN_TYPE_PeriodicWaveOptions'], returns='PeriodicWave'),
    ],
    "StereoPannerNode": [
        NewCall(constructor='StereoPannerNode', demands=['TODO_UNKNOWN_TYPE_BaseAudioContext', 'TODO_UNKNOWN_TYPE_StereoPannerOptions'], returns='StereoPannerNode'),
    ],
    "WaveShaperNode": [
        NewCall(constructor='WaveShaperNode', demands=['TODO_UNKNOWN_TYPE_BaseAudioContext', 'TODO_UNKNOWN_TYPE_WaveShaperOptions'], returns='WaveShaperNode'),
    ],
    "registerprocessor": [
        PrototypeCall(constructor='AudioWorkletGlobalScope', fn='registerProcessor', demands=['AudioWorkletGlobalScope', 'str', 'TODO_UNKNOWN_TYPE_AudioWorkletProcessorConstructor'], returns='None'),
    ],
    "AudioWorkletNode": [
        NewCall(constructor='AudioWorkletNode', demands=['TODO_UNKNOWN_TYPE_BaseAudioContext', 'str', 'TODO_UNKNOWN_TYPE_AudioWorkletNodeOptions'], returns='AudioWorkletNode'),
    ],
    "AudioWorkletProcessor": [
        NewCall(constructor='AudioWorkletProcessor', demands=[], returns='AudioWorkletProcessor'),
    ],
    "Blob": [
        NewCall(constructor='Blob', demands=['TODO_UNKNOWN_TYPE_BlobPart', 'TODO_UNKNOWN_TYPE_BlobPropertyBag'], returns='Blob'),
    ],
    "slice": [
        PrototypeCall(constructor='Blob', fn='slice', demands=['Blob', 'TODO_UNKNOWN_TYPE_long long', 'TODO_UNKNOWN_TYPE_long long', 'str'], returns='TODO_UNKNOWN_TYPE_Blob'),
    ],
    "stream": [
        PrototypeCall(constructor='Blob', fn='stream', demands=['Blob'], returns='TODO_UNKNOWN_TYPE_ReadableStream'),
    ],
    "File": [
        NewCall(constructor='File', demands=['TODO_UNKNOWN_TYPE_BlobPart', 'str', 'TODO_UNKNOWN_TYPE_FilePropertyBag'], returns='File'),
    ],
    "FileReader": [
        NewCall(constructor='FileReader', demands=[], returns='FileReader'),
    ],
    "readasarraybuffer": [
        PrototypeCall(constructor='FileReader', fn='readAsArrayBuffer', demands=['FileReader', 'TODO_UNKNOWN_TYPE_Blob'], returns='None'),
        PrototypeCall(constructor='FileReaderSync', fn='readAsArrayBuffer', demands=['FileReaderSync', 'TODO_UNKNOWN_TYPE_Blob'], returns='TODO_UNKNOWN_TYPE_ArrayBuffer'),
    ],
    "readasbinarystring": [
        PrototypeCall(constructor='FileReader', fn='readAsBinaryString', demands=['FileReader', 'TODO_UNKNOWN_TYPE_Blob'], returns='None'),
        PrototypeCall(constructor='FileReaderSync', fn='readAsBinaryString', demands=['FileReaderSync', 'TODO_UNKNOWN_TYPE_Blob'], returns='str'),
    ],
    "readastext": [
        PrototypeCall(constructor='FileReader', fn='readAsText', demands=['FileReader', 'TODO_UNKNOWN_TYPE_Blob', 'str'], returns='None'),
        PrototypeCall(constructor='FileReaderSync', fn='readAsText', demands=['FileReaderSync', 'TODO_UNKNOWN_TYPE_Blob', 'str'], returns='str'),
    ],
    "readasdataurl": [
        PrototypeCall(constructor='FileReader', fn='readAsDataURL', demands=['FileReader', 'TODO_UNKNOWN_TYPE_Blob'], returns='None'),
        PrototypeCall(constructor='FileReaderSync', fn='readAsDataURL', demands=['FileReaderSync', 'TODO_UNKNOWN_TYPE_Blob'], returns='str'),
    ],
    "FileReaderSync": [
        NewCall(constructor='FileReaderSync', demands=[], returns='FileReaderSync'),
    ],
    "encodeutf8": [
        PrototypeCall(constructor='ProtectedAudienceUtilities', fn='encodeUtf8', demands=['ProtectedAudienceUtilities', 'str'], returns='TODO_UNKNOWN_TYPE_Uint8Array'),
    ],
    "decodeutf8": [
        PrototypeCall(constructor='ProtectedAudienceUtilities', fn='decodeUtf8', demands=['ProtectedAudienceUtilities', 'TODO_UNKNOWN_TYPE_Uint8Array'], returns='str'),
    ],
    "reportadauctionwin": [
        PrototypeCall(constructor='ForDebuggingOnly', fn='reportAdAuctionWin', demands=['ForDebuggingOnly', 'str'], returns='None'),
    ],
    "reportadauctionloss": [
        PrototypeCall(constructor='ForDebuggingOnly', fn='reportAdAuctionLoss', demands=['ForDebuggingOnly', 'str'], returns='None'),
    ],
    "setbid": [
        PrototypeCall(constructor='InterestGroupBiddingScriptRunnerGlobalScope', fn='setBid', demands=['InterestGroupBiddingScriptRunnerGlobalScope', 'TODO_UNKNOWN_TYPE_GenerateBidOutput'], returns='bool'),
    ],
    "setprioritysignalsoverride": [
        PrototypeCall(constructor='InterestGroupBiddingScriptRunnerGlobalScope', fn='setPrioritySignalsOverride', demands=['InterestGroupBiddingScriptRunnerGlobalScope', 'str', 'TODO_UNKNOWN_TYPE_double'], returns='None'),
    ],
    "sendreportto": [
        PrototypeCall(constructor='InterestGroupReportingScriptRunnerGlobalScope', fn='sendReportTo', demands=['InterestGroupReportingScriptRunnerGlobalScope', 'str'], returns='None'),
    ],
    "registeradbeacon": [
        PrototypeCall(constructor='InterestGroupReportingScriptRunnerGlobalScope', fn='registerAdBeacon', demands=['InterestGroupReportingScriptRunnerGlobalScope', 'str'], returns='None'),
    ],
    "registeradmacro": [
        PrototypeCall(constructor='InterestGroupReportingScriptRunnerGlobalScope', fn='registerAdMacro', demands=['InterestGroupReportingScriptRunnerGlobalScope', 'str', 'str'], returns='None'),
    ],
    "queryfeaturesupport": [
        PrototypeCall(constructor='ProtectedAudience', fn='queryFeatureSupport', demands=['ProtectedAudience', 'str'], returns='*'),
    ],
    "CaptureController": [
        NewCall(constructor='CaptureController', demands=[], returns='CaptureController'),
    ],
    "setfocusbehavior": [
        PrototypeCall(constructor='CaptureController', fn='setFocusBehavior', demands=['CaptureController', 'TODO_UNKNOWN_TYPE_CaptureStartFocusBehavior'], returns='None'),
    ],
    "getcurrentposition": [
        PrototypeCall(constructor='Geolocation', fn='getCurrentPosition', demands=['Geolocation', 'TODO_UNKNOWN_TYPE_PositionCallback', 'TODO_UNKNOWN_TYPE_PositionErrorCallback', 'TODO_UNKNOWN_TYPE_PositionOptions'], returns='None'),
    ],
    "watchposition": [
        PrototypeCall(constructor='Geolocation', fn='watchPosition', demands=['Geolocation', 'TODO_UNKNOWN_TYPE_PositionCallback', 'TODO_UNKNOWN_TYPE_PositionErrorCallback', 'TODO_UNKNOWN_TYPE_PositionOptions'], returns='TODO_UNKNOWN_TYPE_long'),
    ],
    "clearwatch": [
        PrototypeCall(constructor='Geolocation', fn='clearWatch', demands=['Geolocation', 'TODO_UNKNOWN_TYPE_long'], returns='None'),
    ],
}
