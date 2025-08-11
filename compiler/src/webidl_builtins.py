from processor_base import PrototypeCall, DirectCall, NewCall

webidl_calls = {
    "SecurityPolicyViolationEvent": [
        NewCall(constructor='SecurityPolicyViolationEvent', demands=['str'], returns='SecurityPolicyViolationEvent'),
        NewCall(constructor='SecurityPolicyViolationEvent', demands=['str', 'SecurityPolicyViolationEventInit'], returns='SecurityPolicyViolationEvent'),
    ],
    "drawArraysInstancedBaseInstanceWEBGL": [
        PrototypeCall(constructor='WEBGL_draw_instanced_base_vertex_base_instance', fn='drawArraysInstancedBaseInstanceWEBGL', demands=['WEBGL_draw_instanced_base_vertex_base_instance', 'GLenum', 'GLint', 'GLsizei', 'GLsizei', 'GLuint'], returns='None'),
    ],
    "drawElementsInstancedBaseVertexBaseInstanceWEBGL": [
        PrototypeCall(constructor='WEBGL_draw_instanced_base_vertex_base_instance', fn='drawElementsInstancedBaseVertexBaseInstanceWEBGL', demands=['WEBGL_draw_instanced_base_vertex_base_instance', 'GLenum', 'GLsizei', 'GLenum', 'GLintptr', 'GLsizei', 'GLint', 'GLuint'], returns='None'),
    ],
    "IntersectionObserver": [
        NewCall(constructor='IntersectionObserver', demands=['IntersectionObserverCallback'], returns='IntersectionObserver'),
        NewCall(constructor='IntersectionObserver', demands=['IntersectionObserverCallback', 'IntersectionObserverInit'], returns='IntersectionObserver'),
    ],
    "observe": [
        PrototypeCall(constructor='IntersectionObserver', fn='observe', demands=['IntersectionObserver', 'Element'], returns='None'),
        PrototypeCall(constructor='PerformanceObserver', fn='observe', demands=['PerformanceObserver'], returns='None'),
        PrototypeCall(constructor='PerformanceObserver', fn='observe', demands=['PerformanceObserver', 'PerformanceObserverInit'], returns='None'),
        PrototypeCall(constructor='ReportingObserver', fn='observe', demands=['ReportingObserver'], returns='None'),
        PrototypeCall(constructor='MutationObserver', fn='observe', demands=['MutationObserver', 'Node'], returns='None'),
        PrototypeCall(constructor='MutationObserver', fn='observe', demands=['MutationObserver', 'Node', 'MutationObserverInit'], returns='None'),
        PrototypeCall(constructor='PressureObserver', fn='observe', demands=['PressureObserver', 'PressureSource'], returns='None'),
        PrototypeCall(constructor='PressureObserver', fn='observe', demands=['PressureObserver', 'PressureSource', 'PressureObserverOptions'], returns='None'),
        PrototypeCall(constructor='ResizeObserver', fn='observe', demands=['ResizeObserver', 'Element'], returns='None'),
        PrototypeCall(constructor='ResizeObserver', fn='observe', demands=['ResizeObserver', 'Element', 'ResizeObserverOptions'], returns='None'),
    ],
    "unobserve": [
        PrototypeCall(constructor='IntersectionObserver', fn='unobserve', demands=['IntersectionObserver', 'Element'], returns='None'),
        PrototypeCall(constructor='PressureObserver', fn='unobserve', demands=['PressureObserver', 'PressureSource'], returns='None'),
        PrototypeCall(constructor='ResizeObserver', fn='unobserve', demands=['ResizeObserver', 'Element'], returns='None'),
    ],
    "disconnect": [
        PrototypeCall(constructor='IntersectionObserver', fn='disconnect', demands=['IntersectionObserver'], returns='None'),
        PrototypeCall(constructor='PerformanceObserver', fn='disconnect', demands=['PerformanceObserver'], returns='None'),
        DirectCall(fn='disconnect', receiver='IdentityCredential', demands=['IdentityCredentialDisconnectOptions'], returns='None'),
        PrototypeCall(constructor='ReportingObserver', fn='disconnect', demands=['ReportingObserver'], returns='None'),
        PrototypeCall(constructor='MutationObserver', fn='disconnect', demands=['MutationObserver'], returns='None'),
        PrototypeCall(constructor='BluetoothRemoteGATTServer', fn='disconnect', demands=['BluetoothRemoteGATTServer'], returns='None'),
        PrototypeCall(constructor='PressureObserver', fn='disconnect', demands=['PressureObserver'], returns='None'),
        PrototypeCall(constructor='ResizeObserver', fn='disconnect', demands=['ResizeObserver'], returns='None'),
        PrototypeCall(constructor='AudioNode', fn='disconnect', demands=['AudioNode'], returns='None'),
        PrototypeCall(constructor='AudioNode', fn='disconnect', demands=['AudioNode', 'int'], returns='None'),
        PrototypeCall(constructor='AudioNode', fn='disconnect', demands=['AudioNode', 'AudioNode'], returns='None'),
        PrototypeCall(constructor='AudioNode', fn='disconnect', demands=['AudioNode', 'AudioNode', 'int'], returns='None'),
        PrototypeCall(constructor='AudioNode', fn='disconnect', demands=['AudioNode', 'AudioNode', 'int', 'int'], returns='None'),
        PrototypeCall(constructor='AudioNode', fn='disconnect', demands=['AudioNode', 'AudioParam'], returns='None'),
        PrototypeCall(constructor='AudioNode', fn='disconnect', demands=['AudioNode', 'AudioParam', 'int'], returns='None'),
    ],
    "takeRecords": [
        PrototypeCall(constructor='IntersectionObserver', fn='takeRecords', demands=['IntersectionObserver'], returns='IntersectionObserverEntry'),
        PrototypeCall(constructor='PerformanceObserver', fn='takeRecords', demands=['PerformanceObserver'], returns='PerformanceEntryList'),
        PrototypeCall(constructor='ReportingObserver', fn='takeRecords', demands=['ReportingObserver'], returns='ReportList'),
        PrototypeCall(constructor='MutationObserver', fn='takeRecords', demands=['MutationObserver'], returns='MutationRecord'),
        PrototypeCall(constructor='PressureObserver', fn='takeRecords', demands=['PressureObserver'], returns='PressureRecord'),
    ],
    "IntersectionObserverEntry": [
        NewCall(constructor='IntersectionObserverEntry', demands=['IntersectionObserverEntryInit'], returns='IntersectionObserverEntry'),
    ],
    "getClientExtensionResults": [
        PrototypeCall(constructor='PublicKeyCredential', fn='getClientExtensionResults', demands=['PublicKeyCredential'], returns='AuthenticationExtensionsClientOutputs'),
    ],
    "isConditionalMediationAvailable": [
        DirectCall(fn='isConditionalMediationAvailable', receiver='PublicKeyCredential', demands=[], returns='bool'),
        DirectCall(fn='isConditionalMediationAvailable', receiver='Credential', demands=[], returns='bool'),
    ],
    "toJSON": [
        PrototypeCall(constructor='PublicKeyCredential', fn='toJSON', demands=['PublicKeyCredential'], returns='PublicKeyCredentialJSON'),
        PrototypeCall(constructor='PerformanceEntry', fn='toJSON', demands=['PerformanceEntry'], returns='object'),
        PrototypeCall(constructor='PaymentResponse', fn='toJSON', demands=['PaymentResponse'], returns='object'),
        PrototypeCall(constructor='URL', fn='toJSON', demands=['URL'], returns='str'),
        PrototypeCall(constructor='PerformanceResourceTiming', fn='toJSON', demands=['PerformanceResourceTiming'], returns='object'),
        PrototypeCall(constructor='MediaDeviceInfo', fn='toJSON', demands=['MediaDeviceInfo'], returns='object'),
        PrototypeCall(constructor='RTCSessionDescription', fn='toJSON', demands=['RTCSessionDescription'], returns='RTCSessionDescriptionInit'),
        PrototypeCall(constructor='RTCIceCandidate', fn='toJSON', demands=['RTCIceCandidate'], returns='RTCIceCandidateInit'),
        PrototypeCall(constructor='PushSubscription', fn='toJSON', demands=['PushSubscription'], returns='PushSubscriptionJSON'),
        PrototypeCall(constructor='PerformanceServerTiming', fn='toJSON', demands=['PerformanceServerTiming'], returns='object'),
        PrototypeCall(constructor='NotRestoredReasonDetails', fn='toJSON', demands=['NotRestoredReasonDetails'], returns='object'),
        PrototypeCall(constructor='NotRestoredReasons', fn='toJSON', demands=['NotRestoredReasons'], returns='object'),
        PrototypeCall(constructor='VideoColorSpace', fn='toJSON', demands=['VideoColorSpace'], returns='VideoColorSpaceInit'),
        PrototypeCall(constructor='NavigatorUAData', fn='toJSON', demands=['NavigatorUAData'], returns='UALowEntropyJSON'),
        PrototypeCall(constructor='DigitalCredential', fn='toJSON', demands=['DigitalCredential'], returns='object'),
        PrototypeCall(constructor='PressureRecord', fn='toJSON', demands=['PressureRecord'], returns='object'),
        PrototypeCall(constructor='PerformanceLongTaskTiming', fn='toJSON', demands=['PerformanceLongTaskTiming'], returns='object'),
        PrototypeCall(constructor='TaskAttributionTiming', fn='toJSON', demands=['TaskAttributionTiming'], returns='object'),
        PrototypeCall(constructor='DOMPointReadOnly', fn='toJSON', demands=['DOMPointReadOnly'], returns='object'),
        PrototypeCall(constructor='DOMRectReadOnly', fn='toJSON', demands=['DOMRectReadOnly'], returns='object'),
        PrototypeCall(constructor='DOMQuad', fn='toJSON', demands=['DOMQuad'], returns='object'),
        PrototypeCall(constructor='DOMMatrixReadOnly', fn='toJSON', demands=['DOMMatrixReadOnly'], returns='object'),
        PrototypeCall(constructor='PerformanceEventTiming', fn='toJSON', demands=['PerformanceEventTiming'], returns='object'),
        PrototypeCall(constructor='TrustedHTML', fn='toJSON', demands=['TrustedHTML'], returns='str'),
        PrototypeCall(constructor='TrustedScript', fn='toJSON', demands=['TrustedScript'], returns='str'),
        PrototypeCall(constructor='TrustedScriptURL', fn='toJSON', demands=['TrustedScriptURL'], returns='str'),
        PrototypeCall(constructor='LargestContentfulPaint', fn='toJSON', demands=['LargestContentfulPaint'], returns='object'),
        PrototypeCall(constructor='ContactAddress', fn='toJSON', demands=['ContactAddress'], returns='object'),
        PrototypeCall(constructor='Performance', fn='toJSON', demands=['Performance'], returns='object'),
        PrototypeCall(constructor='PerformancePaintTiming', fn='toJSON', demands=['PerformancePaintTiming'], returns='object'),
        PrototypeCall(constructor='PerformanceLongAnimationFrameTiming', fn='toJSON', demands=['PerformanceLongAnimationFrameTiming'], returns='object'),
        PrototypeCall(constructor='PerformanceScriptTiming', fn='toJSON', demands=['PerformanceScriptTiming'], returns='object'),
        PrototypeCall(constructor='PerformanceNavigationTiming', fn='toJSON', demands=['PerformanceNavigationTiming'], returns='object'),
        PrototypeCall(constructor='PerformanceTiming', fn='toJSON', demands=['PerformanceTiming'], returns='object'),
        PrototypeCall(constructor='PerformanceNavigation', fn='toJSON', demands=['PerformanceNavigation'], returns='object'),
        PrototypeCall(constructor='PerformanceElementTiming', fn='toJSON', demands=['PerformanceElementTiming'], returns='object'),
        PrototypeCall(constructor='LayoutShift', fn='toJSON', demands=['LayoutShift'], returns='object'),
        PrototypeCall(constructor='GeolocationPosition', fn='toJSON', demands=['GeolocationPosition'], returns='object'),
        PrototypeCall(constructor='GeolocationCoordinates', fn='toJSON', demands=['GeolocationCoordinates'], returns='object'),
    ],
    "getTransports": [
        PrototypeCall(constructor='AuthenticatorAttestationResponse', fn='getTransports', demands=['AuthenticatorAttestationResponse'], returns='str'),
    ],
    "getAuthenticatorData": [
        PrototypeCall(constructor='AuthenticatorAttestationResponse', fn='getAuthenticatorData', demands=['AuthenticatorAttestationResponse'], returns='ArrayBuffer'),
    ],
    "getPublicKey": [
        PrototypeCall(constructor='AuthenticatorAttestationResponse', fn='getPublicKey', demands=['AuthenticatorAttestationResponse'], returns='ArrayBuffer'),
    ],
    "getPublicKeyAlgorithm": [
        PrototypeCall(constructor='AuthenticatorAttestationResponse', fn='getPublicKeyAlgorithm', demands=['AuthenticatorAttestationResponse'], returns='COSEAlgorithmIdentifier'),
    ],
    "open": [
        PrototypeCall(constructor='StorageBucketManager', fn='open', demands=['StorageBucketManager', 'str'], returns='StorageBucket'),
        PrototypeCall(constructor='StorageBucketManager', fn='open', demands=['StorageBucketManager', 'str', 'StorageBucketOptions'], returns='StorageBucket'),
        PrototypeCall(constructor='SerialPort', fn='open', demands=['SerialPort', 'SerialOptions'], returns='None'),
        PrototypeCall(constructor='Window', fn='open', demands=['Window'], returns='WindowProxy'),
        PrototypeCall(constructor='Window', fn='open', demands=['Window', 'str'], returns='WindowProxy'),
        PrototypeCall(constructor='Window', fn='open', demands=['Window', 'str', 'str'], returns='WindowProxy'),
        PrototypeCall(constructor='Window', fn='open', demands=['Window', 'str', 'str', 'str'], returns='WindowProxy'),
        PrototypeCall(constructor='MIDIPort', fn='open', demands=['MIDIPort'], returns='MIDIPort'),
        PrototypeCall(constructor='HIDDevice', fn='open', demands=['HIDDevice'], returns='None'),
        PrototypeCall(constructor='IDBFactory', fn='open', demands=['IDBFactory', 'str'], returns='IDBOpenDBRequest'),
        PrototypeCall(constructor='IDBFactory', fn='open', demands=['IDBFactory', 'str', 'int'], returns='IDBOpenDBRequest'),
        PrototypeCall(constructor='USBDevice', fn='open', demands=['USBDevice'], returns='None'),
        PrototypeCall(constructor='CacheStorage', fn='open', demands=['CacheStorage', 'str'], returns='Cache'),
        PrototypeCall(constructor='EyeDropper', fn='open', demands=['EyeDropper'], returns='ColorSelectionResult'),
        PrototypeCall(constructor='EyeDropper', fn='open', demands=['EyeDropper', 'ColorSelectionOptions'], returns='ColorSelectionResult'),
        PrototypeCall(constructor='XMLHttpRequest', fn='open', demands=['XMLHttpRequest', 'str', 'str'], returns='None'),
        PrototypeCall(constructor='XMLHttpRequest', fn='open', demands=['XMLHttpRequest', 'str', 'str', 'bool'], returns='None'),
        PrototypeCall(constructor='XMLHttpRequest', fn='open', demands=['XMLHttpRequest', 'str', 'str', 'bool', 'str'], returns='None'),
        PrototypeCall(constructor='XMLHttpRequest', fn='open', demands=['XMLHttpRequest', 'str', 'str', 'bool', 'str', 'str'], returns='None'),
    ],
    "keys": [
        PrototypeCall(constructor='StorageBucketManager', fn='keys', demands=['StorageBucketManager'], returns='str'),
        PrototypeCall(constructor='Cache', fn='keys', demands=['Cache'], returns='Request'),
        PrototypeCall(constructor='Cache', fn='keys', demands=['Cache', 'RequestInfo'], returns='Request'),
        PrototypeCall(constructor='Cache', fn='keys', demands=['Cache', 'RequestInfo', 'CacheQueryOptions'], returns='Request'),
        PrototypeCall(constructor='CacheStorage', fn='keys', demands=['CacheStorage'], returns='str'),
    ],
    "delete": [
        PrototypeCall(constructor='StorageBucketManager', fn='delete', demands=['StorageBucketManager', 'str'], returns='None'),
        PrototypeCall(constructor='URLSearchParams', fn='delete', demands=['URLSearchParams', 'str'], returns='None'),
        PrototypeCall(constructor='URLSearchParams', fn='delete', demands=['URLSearchParams', 'str', 'str'], returns='None'),
        PrototypeCall(constructor='SharedStorage', fn='delete', demands=['SharedStorage', 'str'], returns='*'),
        PrototypeCall(constructor='SharedStorage', fn='delete', demands=['SharedStorage', 'str', 'SharedStorageModifierMethodOptions'], returns='*'),
        PrototypeCall(constructor='XRAnchor', fn='delete', demands=['XRAnchor'], returns='None'),
        PrototypeCall(constructor='ContentIndex', fn='delete', demands=['ContentIndex', 'str'], returns='None'),
        PrototypeCall(constructor='CookieStore', fn='delete', demands=['CookieStore', 'str'], returns='None'),
        PrototypeCall(constructor='CookieStore', fn='delete', demands=['CookieStore', 'CookieStoreDeleteOptions'], returns='None'),
        PrototypeCall(constructor='IDBObjectStore', fn='delete', demands=['IDBObjectStore', '*'], returns='IDBRequest'),
        PrototypeCall(constructor='IDBCursor', fn='delete', demands=['IDBCursor'], returns='IDBRequest'),
        PrototypeCall(constructor='Cache', fn='delete', demands=['Cache', 'RequestInfo'], returns='bool'),
        PrototypeCall(constructor='Cache', fn='delete', demands=['Cache', 'RequestInfo', 'CacheQueryOptions'], returns='bool'),
        PrototypeCall(constructor='CacheStorage', fn='delete', demands=['CacheStorage', 'str'], returns='bool'),
        PrototypeCall(constructor='StylePropertyMap', fn='delete', demands=['StylePropertyMap', 'str'], returns='None'),
        PrototypeCall(constructor='FontFaceSet', fn='delete', demands=['FontFaceSet', 'FontFace'], returns='bool'),
        PrototypeCall(constructor='Headers', fn='delete', demands=['Headers', 'str'], returns='None'),
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
        PrototypeCall(constructor='StorageBucket', fn='estimate', demands=['StorageBucket'], returns='StorageEstimate'),
        PrototypeCall(constructor='StorageAccessHandle', fn='estimate', demands=['StorageAccessHandle'], returns='StorageEstimate'),
        PrototypeCall(constructor='StorageManager', fn='estimate', demands=['StorageManager'], returns='StorageEstimate'),
    ],
    "setExpires": [
        PrototypeCall(constructor='StorageBucket', fn='setExpires', demands=['StorageBucket', 'float'], returns='None'),
    ],
    "expires": [
        PrototypeCall(constructor='StorageBucket', fn='expires', demands=['StorageBucket'], returns='float'),
    ],
    "getDirectory": [
        PrototypeCall(constructor='StorageBucket', fn='getDirectory', demands=['StorageBucket'], returns='FileSystemDirectoryHandle'),
        PrototypeCall(constructor='StorageAccessHandle', fn='getDirectory', demands=['StorageAccessHandle'], returns='FileSystemDirectoryHandle'),
        PrototypeCall(constructor='FileSystemDirectoryEntry', fn='getDirectory', demands=['FileSystemDirectoryEntry'], returns='None'),
        PrototypeCall(constructor='FileSystemDirectoryEntry', fn='getDirectory', demands=['FileSystemDirectoryEntry', 'str'], returns='None'),
        PrototypeCall(constructor='FileSystemDirectoryEntry', fn='getDirectory', demands=['FileSystemDirectoryEntry', 'str', 'FileSystemFlags'], returns='None'),
        PrototypeCall(constructor='FileSystemDirectoryEntry', fn='getDirectory', demands=['FileSystemDirectoryEntry', 'str', 'FileSystemFlags', 'FileSystemEntryCallback'], returns='None'),
        PrototypeCall(constructor='FileSystemDirectoryEntry', fn='getDirectory', demands=['FileSystemDirectoryEntry', 'str', 'FileSystemFlags', 'FileSystemEntryCallback', 'ErrorCallback'], returns='None'),
    ],
    "setActionHandler": [
        PrototypeCall(constructor='MediaSession', fn='setActionHandler', demands=['MediaSession', 'MediaSessionAction', 'MediaSessionActionHandler'], returns='None'),
    ],
    "setPositionState": [
        PrototypeCall(constructor='MediaSession', fn='setPositionState', demands=['MediaSession'], returns='None'),
        PrototypeCall(constructor='MediaSession', fn='setPositionState', demands=['MediaSession', 'MediaPositionState'], returns='None'),
    ],
    "setMicrophoneActive": [
        PrototypeCall(constructor='MediaSession', fn='setMicrophoneActive', demands=['MediaSession', 'bool'], returns='None'),
    ],
    "setCameraActive": [
        PrototypeCall(constructor='MediaSession', fn='setCameraActive', demands=['MediaSession', 'bool'], returns='None'),
    ],
    "setScreenshareActive": [
        PrototypeCall(constructor='MediaSession', fn='setScreenshareActive', demands=['MediaSession', 'bool'], returns='None'),
    ],
    "MediaMetadata": [
        NewCall(constructor='MediaMetadata', demands=[], returns='MediaMetadata'),
        NewCall(constructor='MediaMetadata', demands=['MediaMetadataInit'], returns='MediaMetadata'),
    ],
    "PerformanceObserver": [
        NewCall(constructor='PerformanceObserver', demands=['PerformanceObserverCallback'], returns='PerformanceObserver'),
    ],
    "getEntries": [
        PrototypeCall(constructor='PerformanceObserverEntryList', fn='getEntries', demands=['PerformanceObserverEntryList'], returns='PerformanceEntryList'),
    ],
    "getEntriesByType": [
        PrototypeCall(constructor='PerformanceObserverEntryList', fn='getEntriesByType', demands=['PerformanceObserverEntryList', 'str'], returns='PerformanceEntryList'),
    ],
    "getEntriesByName": [
        PrototypeCall(constructor='PerformanceObserverEntryList', fn='getEntriesByName', demands=['PerformanceObserverEntryList', 'str'], returns='PerformanceEntryList'),
        PrototypeCall(constructor='PerformanceObserverEntryList', fn='getEntriesByName', demands=['PerformanceObserverEntryList', 'str', 'str'], returns='PerformanceEntryList'),
    ],
    "set": [
        PrototypeCall(constructor='CSSFontFeatureValuesMap', fn='set', demands=['CSSFontFeatureValuesMap', 'CSSOMString', 'int'], returns='None'),
        PrototypeCall(constructor='URLSearchParams', fn='set', demands=['URLSearchParams', 'str', 'str'], returns='None'),
        PrototypeCall(constructor='SharedStorage', fn='set', demands=['SharedStorage', 'str', 'str'], returns='*'),
        PrototypeCall(constructor='SharedStorage', fn='set', demands=['SharedStorage', 'str', 'str', 'SharedStorageSetMethodOptions'], returns='*'),
        PrototypeCall(constructor='CookieStore', fn='set', demands=['CookieStore', 'str', 'str'], returns='None'),
        PrototypeCall(constructor='CookieStore', fn='set', demands=['CookieStore', 'CookieInit'], returns='None'),
        PrototypeCall(constructor='Table', fn='set', demands=['Table', 'int'], returns='None'),
        PrototypeCall(constructor='Table', fn='set', demands=['Table', 'int', '*'], returns='None'),
        PrototypeCall(constructor='StylePropertyMap', fn='set', demands=['StylePropertyMap', 'str', 'CSSStyleValue'], returns='None'),
        PrototypeCall(constructor='Headers', fn='set', demands=['Headers', 'str', 'str'], returns='None'),
        PrototypeCall(constructor='FormData', fn='set', demands=['FormData', 'str', 'str'], returns='None'),
        PrototypeCall(constructor='FormData', fn='set', demands=['FormData', 'str', 'Blob'], returns='None'),
        PrototypeCall(constructor='FormData', fn='set', demands=['FormData', 'str', 'Blob', 'str'], returns='None'),
    ],
    "drawArraysInstancedANGLE": [
        PrototypeCall(constructor='ANGLE_instanced_arrays', fn='drawArraysInstancedANGLE', demands=['ANGLE_instanced_arrays', 'GLenum', 'GLint', 'GLsizei', 'GLsizei'], returns='None'),
    ],
    "drawElementsInstancedANGLE": [
        PrototypeCall(constructor='ANGLE_instanced_arrays', fn='drawElementsInstancedANGLE', demands=['ANGLE_instanced_arrays', 'GLenum', 'GLsizei', 'GLenum', 'GLintptr', 'GLsizei'], returns='None'),
    ],
    "vertexAttribDivisorANGLE": [
        PrototypeCall(constructor='ANGLE_instanced_arrays', fn='vertexAttribDivisorANGLE', demands=['ANGLE_instanced_arrays', 'GLuint', 'GLuint'], returns='None'),
    ],
    "ClipboardEvent": [
        NewCall(constructor='ClipboardEvent', demands=['str'], returns='ClipboardEvent'),
        NewCall(constructor='ClipboardEvent', demands=['str', 'ClipboardEventInit'], returns='ClipboardEvent'),
    ],
    "ClipboardItem": [
        NewCall(constructor='ClipboardItem', demands=['str'], returns='ClipboardItem'),
        NewCall(constructor='ClipboardItem', demands=['str', 'ClipboardItemOptions'], returns='ClipboardItem'),
    ],
    "getType": [
        PrototypeCall(constructor='ClipboardItem', fn='getType', demands=['ClipboardItem', 'str'], returns='Blob'),
    ],
    "supports": [
        DirectCall(fn='supports', receiver='ClipboardItem', demands=['str'], returns='bool'),
        DirectCall(fn='supports', receiver='HTMLScriptElement', demands=['str'], returns='bool'),
        PrototypeCall(constructor='DOMTokenList', fn='supports', demands=['DOMTokenList', 'str'], returns='bool'),
    ],
    "read": [
        PrototypeCall(constructor='Clipboard', fn='read', demands=['Clipboard'], returns='ClipboardItems'),
        PrototypeCall(constructor='Clipboard', fn='read', demands=['Clipboard', 'ClipboardUnsanitizedFormats'], returns='ClipboardItems'),
        PrototypeCall(constructor='FileSystemSyncAccessHandle', fn='read', demands=['FileSystemSyncAccessHandle', 'AllowSharedBufferSource'], returns='int'),
        PrototypeCall(constructor='FileSystemSyncAccessHandle', fn='read', demands=['FileSystemSyncAccessHandle', 'AllowSharedBufferSource', 'FileSystemReadWriteOptions'], returns='int'),
        PrototypeCall(constructor='ReadableStreamDefaultReader', fn='read', demands=['ReadableStreamDefaultReader'], returns='ReadableStreamReadResult'),
        PrototypeCall(constructor='ReadableStreamBYOBReader', fn='read', demands=['ReadableStreamBYOBReader', 'ArrayBufferView'], returns='ReadableStreamReadResult'),
        PrototypeCall(constructor='ReadableStreamBYOBReader', fn='read', demands=['ReadableStreamBYOBReader', 'ArrayBufferView', 'ReadableStreamBYOBReaderReadOptions'], returns='ReadableStreamReadResult'),
        DirectCall(fn='read', receiver='GeolocationSensor', demands=[], returns='GeolocationSensorReading'),
        DirectCall(fn='read', receiver='GeolocationSensor', demands=['ReadOptions'], returns='GeolocationSensorReading'),
    ],
    "readText": [
        PrototypeCall(constructor='Clipboard', fn='readText', demands=['Clipboard'], returns='str'),
    ],
    "write": [
        PrototypeCall(constructor='Clipboard', fn='write', demands=['Clipboard', 'ClipboardItems'], returns='None'),
        PrototypeCall(constructor='FileSystemWritableFileStream', fn='write', demands=['FileSystemWritableFileStream', 'FileSystemWriteChunkType'], returns='None'),
        PrototypeCall(constructor='FileSystemSyncAccessHandle', fn='write', demands=['FileSystemSyncAccessHandle', 'AllowSharedBufferSource'], returns='int'),
        PrototypeCall(constructor='FileSystemSyncAccessHandle', fn='write', demands=['FileSystemSyncAccessHandle', 'AllowSharedBufferSource', 'FileSystemReadWriteOptions'], returns='int'),
        PrototypeCall(constructor='Writer', fn='write', demands=['Writer', 'str'], returns='str'),
        PrototypeCall(constructor='Writer', fn='write', demands=['Writer', 'str', 'WriterWriteOptions'], returns='str'),
        PrototypeCall(constructor='NDEFReader', fn='write', demands=['NDEFReader', 'NDEFMessageSource'], returns='None'),
        PrototypeCall(constructor='NDEFReader', fn='write', demands=['NDEFReader', 'NDEFMessageSource', 'NDEFWriteOptions'], returns='None'),
        PrototypeCall(constructor='WritableStreamDefaultWriter', fn='write', demands=['WritableStreamDefaultWriter'], returns='None'),
        PrototypeCall(constructor='WritableStreamDefaultWriter', fn='write', demands=['WritableStreamDefaultWriter', '*'], returns='None'),
    ],
    "writeText": [
        PrototypeCall(constructor='Clipboard', fn='writeText', demands=['Clipboard', 'str'], returns='None'),
    ],
    "SnapEvent": [
        NewCall(constructor='SnapEvent', demands=['str'], returns='SnapEvent'),
        NewCall(constructor='SnapEvent', demands=['str', 'SnapEventInit'], returns='SnapEvent'),
    ],
    "createObjectURL": [
        PrototypeCall(constructor='StorageAccessHandle', fn='createObjectURL', demands=['StorageAccessHandle', 'Blob'], returns='str'),
    ],
    "revokeObjectURL": [
        PrototypeCall(constructor='StorageAccessHandle', fn='revokeObjectURL', demands=['StorageAccessHandle', 'str'], returns='None'),
    ],
    "BroadcastChannel": [
        PrototypeCall(constructor='StorageAccessHandle', fn='BroadcastChannel', demands=['StorageAccessHandle', 'str'], returns='BroadcastChannel'),
        NewCall(constructor='BroadcastChannel', demands=['str'], returns='BroadcastChannel'),
    ],
    "SharedWorker": [
        PrototypeCall(constructor='StorageAccessHandle', fn='SharedWorker', demands=['StorageAccessHandle', 'str'], returns='SharedWorker'),
        PrototypeCall(constructor='StorageAccessHandle', fn='SharedWorker', demands=['StorageAccessHandle', 'str', 'str'], returns='SharedWorker'),
        NewCall(constructor='SharedWorker', demands=['TrustedScriptURL'], returns='SharedWorker'),
        NewCall(constructor='SharedWorker', demands=['TrustedScriptURL', 'str'], returns='SharedWorker'),
    ],
    "PaymentRequest": [
        NewCall(constructor='PaymentRequest', demands=['PaymentMethodData', 'PaymentDetailsInit'], returns='PaymentRequest'),
        NewCall(constructor='PaymentRequest', demands=['PaymentMethodData', 'PaymentDetailsInit', 'PaymentOptions'], returns='PaymentRequest'),
    ],
    "show": [
        PrototypeCall(constructor='PaymentRequest', fn='show', demands=['PaymentRequest'], returns='PaymentResponse'),
        PrototypeCall(constructor='PaymentRequest', fn='show', demands=['PaymentRequest', 'PaymentDetailsUpdate'], returns='PaymentResponse'),
        PrototypeCall(constructor='VirtualKeyboard', fn='show', demands=['VirtualKeyboard'], returns='None'),
        PrototypeCall(constructor='HTMLDialogElement', fn='show', demands=['HTMLDialogElement'], returns='None'),
    ],
    "abort": [
        PrototypeCall(constructor='PaymentRequest', fn='abort', demands=['PaymentRequest'], returns='None'),
        PrototypeCall(constructor='SourceBuffer', fn='abort', demands=['SourceBuffer'], returns='None'),
        PrototypeCall(constructor='IDBTransaction', fn='abort', demands=['IDBTransaction'], returns='None'),
        PrototypeCall(constructor='AbortController', fn='abort', demands=['AbortController'], returns='None'),
        PrototypeCall(constructor='AbortController', fn='abort', demands=['AbortController', '*'], returns='None'),
        DirectCall(fn='abort', receiver='AbortSignal', demands=[], returns='AbortSignal'),
        DirectCall(fn='abort', receiver='AbortSignal', demands=['*'], returns='AbortSignal'),
        PrototypeCall(constructor='SpeechRecognition', fn='abort', demands=['SpeechRecognition'], returns='None'),
        PrototypeCall(constructor='WritableStream', fn='abort', demands=['WritableStream'], returns='None'),
        PrototypeCall(constructor='WritableStream', fn='abort', demands=['WritableStream', '*'], returns='None'),
        PrototypeCall(constructor='WritableStreamDefaultWriter', fn='abort', demands=['WritableStreamDefaultWriter'], returns='None'),
        PrototypeCall(constructor='WritableStreamDefaultWriter', fn='abort', demands=['WritableStreamDefaultWriter', '*'], returns='None'),
        PrototypeCall(constructor='BackgroundFetchRegistration', fn='abort', demands=['BackgroundFetchRegistration'], returns='bool'),
        PrototypeCall(constructor='XMLHttpRequest', fn='abort', demands=['XMLHttpRequest'], returns='None'),
        PrototypeCall(constructor='FileReader', fn='abort', demands=['FileReader'], returns='None'),
    ],
    "canMakePayment": [
        PrototypeCall(constructor='PaymentRequest', fn='canMakePayment', demands=['PaymentRequest'], returns='bool'),
    ],
    "complete": [
        PrototypeCall(constructor='PaymentResponse', fn='complete', demands=['PaymentResponse'], returns='None'),
        PrototypeCall(constructor='PaymentResponse', fn='complete', demands=['PaymentResponse', 'PaymentComplete'], returns='None'),
        PrototypeCall(constructor='PaymentResponse', fn='complete', demands=['PaymentResponse', 'PaymentComplete', 'PaymentCompleteDetails'], returns='None'),
        PrototypeCall(constructor='Subscriber', fn='complete', demands=['Subscriber'], returns='None'),
    ],
    "retry": [
        PrototypeCall(constructor='PaymentResponse', fn='retry', demands=['PaymentResponse'], returns='None'),
        PrototypeCall(constructor='PaymentResponse', fn='retry', demands=['PaymentResponse', 'PaymentValidationErrors'], returns='None'),
    ],
    "PaymentMethodChangeEvent": [
        NewCall(constructor='PaymentMethodChangeEvent', demands=['str'], returns='PaymentMethodChangeEvent'),
        NewCall(constructor='PaymentMethodChangeEvent', demands=['str', 'PaymentMethodChangeEventInit'], returns='PaymentMethodChangeEvent'),
    ],
    "PaymentRequestUpdateEvent": [
        NewCall(constructor='PaymentRequestUpdateEvent', demands=['str'], returns='PaymentRequestUpdateEvent'),
        NewCall(constructor='PaymentRequestUpdateEvent', demands=['str', 'PaymentRequestUpdateEventInit'], returns='PaymentRequestUpdateEvent'),
    ],
    "updateWith": [
        PrototypeCall(constructor='PaymentRequestUpdateEvent', fn='updateWith', demands=['PaymentRequestUpdateEvent', 'PaymentDetailsUpdate'], returns='None'),
    ],
    "cancel": [
        PrototypeCall(constructor='XRHitTestSource', fn='cancel', demands=['XRHitTestSource'], returns='None'),
        PrototypeCall(constructor='XRTransientInputHitTestSource', fn='cancel', demands=['XRTransientInputHitTestSource'], returns='None'),
        PrototypeCall(constructor='SpeechSynthesis', fn='cancel', demands=['SpeechSynthesis'], returns='None'),
        PrototypeCall(constructor='ReadableStream', fn='cancel', demands=['ReadableStream'], returns='None'),
        PrototypeCall(constructor='ReadableStream', fn='cancel', demands=['ReadableStream', '*'], returns='None'),
        PrototypeCall(constructor='Animation', fn='cancel', demands=['Animation'], returns='None'),
    ],
    "getPose": [
        PrototypeCall(constructor='XRHitTestResult', fn='getPose', demands=['XRHitTestResult', 'XRSpace'], returns='XRPose'),
        PrototypeCall(constructor='XRFrame', fn='getPose', demands=['XRFrame', 'XRSpace', 'XRSpace'], returns='XRPose'),
    ],
    "XRRay": [
        NewCall(constructor='XRRay', demands=[], returns='XRRay'),
        NewCall(constructor='XRRay', demands=['DOMPointInit'], returns='XRRay'),
        NewCall(constructor='XRRay', demands=['DOMPointInit', 'XRRayDirectionInit'], returns='XRRay'),
        NewCall(constructor='XRRay', demands=['XRRigidTransform'], returns='XRRay'),
    ],
    "URL": [
        NewCall(constructor='URL', demands=['str'], returns='URL'),
        NewCall(constructor='URL', demands=['str', 'str'], returns='URL'),
    ],
    "parse": [
        DirectCall(fn='parse', receiver='URL', demands=['str'], returns='URL'),
        DirectCall(fn='parse', receiver='URL', demands=['str', 'str'], returns='URL'),
        DirectCall(fn='parse', receiver='CSSStyleValue', demands=['str', 'str'], returns='CSSStyleValue'),
        DirectCall(fn='parse', receiver='CSSNumericValue', demands=['str'], returns='CSSNumericValue'),
        DirectCall(fn='parse', receiver='CSSColorValue', demands=['str'], returns='CSSColorValue'),
    ],
    "canParse": [
        DirectCall(fn='canParse', receiver='URL', demands=['str'], returns='bool'),
        DirectCall(fn='canParse', receiver='URL', demands=['str', 'str'], returns='bool'),
    ],
    "URLSearchParams": [
        NewCall(constructor='URLSearchParams', demands=[], returns='URLSearchParams'),
        NewCall(constructor='URLSearchParams', demands=['str'], returns='URLSearchParams'),
    ],
    "append": [
        PrototypeCall(constructor='URLSearchParams', fn='append', demands=['URLSearchParams', 'str', 'str'], returns='None'),
        PrototypeCall(constructor='SharedStorage', fn='append', demands=['SharedStorage', 'str', 'str'], returns='*'),
        PrototypeCall(constructor='SharedStorage', fn='append', demands=['SharedStorage', 'str', 'str', 'SharedStorageModifierMethodOptions'], returns='*'),
        PrototypeCall(constructor='StylePropertyMap', fn='append', demands=['StylePropertyMap', 'str', 'CSSStyleValue'], returns='None'),
        PrototypeCall(constructor='GroupEffect', fn='append', demands=['GroupEffect', 'AnimationEffect'], returns='None'),
        PrototypeCall(constructor='Headers', fn='append', demands=['Headers', 'str', 'str'], returns='None'),
        PrototypeCall(constructor='FormData', fn='append', demands=['FormData', 'str', 'str'], returns='None'),
        PrototypeCall(constructor='FormData', fn='append', demands=['FormData', 'str', 'Blob'], returns='None'),
        PrototypeCall(constructor='FormData', fn='append', demands=['FormData', 'str', 'Blob', 'str'], returns='None'),
    ],
    "get": [
        PrototypeCall(constructor='URLSearchParams', fn='get', demands=['URLSearchParams', 'str'], returns='str'),
        PrototypeCall(constructor='Sanitizer', fn='get', demands=['Sanitizer'], returns='SanitizerConfig'),
        PrototypeCall(constructor='SharedStorage', fn='get', demands=['SharedStorage', 'str'], returns='str'),
        PrototypeCall(constructor='CustomElementRegistry', fn='get', demands=['CustomElementRegistry', 'str'], returns='CustomElementConstructor'),
        PrototypeCall(constructor='CredentialsContainer', fn='get', demands=['CredentialsContainer'], returns='Credential'),
        PrototypeCall(constructor='CredentialsContainer', fn='get', demands=['CredentialsContainer', 'CredentialRequestOptions'], returns='Credential'),
        PrototypeCall(constructor='CookieStore', fn='get', demands=['CookieStore', 'str'], returns='CookieListItem'),
        PrototypeCall(constructor='CookieStore', fn='get', demands=['CookieStore'], returns='CookieListItem'),
        PrototypeCall(constructor='CookieStore', fn='get', demands=['CookieStore', 'CookieStoreGetOptions'], returns='CookieListItem'),
        PrototypeCall(constructor='IDBObjectStore', fn='get', demands=['IDBObjectStore', '*'], returns='IDBRequest'),
        PrototypeCall(constructor='IDBIndex', fn='get', demands=['IDBIndex', '*'], returns='IDBRequest'),
        PrototypeCall(constructor='Table', fn='get', demands=['Table', 'int'], returns='*'),
        PrototypeCall(constructor='Clients', fn='get', demands=['Clients', 'str'], returns='Client'),
        PrototypeCall(constructor='StylePropertyMapReadOnly', fn='get', demands=['StylePropertyMapReadOnly', 'str'], returns='None'),
        PrototypeCall(constructor='MediaKeyStatusMap', fn='get', demands=['MediaKeyStatusMap', 'BufferSource'], returns='MediaKeyStatus'),
        PrototypeCall(constructor='Headers', fn='get', demands=['Headers', 'str'], returns='str'),
        PrototypeCall(constructor='BackgroundFetchManager', fn='get', demands=['BackgroundFetchManager', 'str'], returns='BackgroundFetchRegistration'),
        PrototypeCall(constructor='FormData', fn='get', demands=['FormData', 'str'], returns='FormDataEntryValue'),
        PrototypeCall(constructor='XRHand', fn='get', demands=['XRHand', 'XRHandJoint'], returns='XRJointSpace'),
    ],
    "getAll": [
        PrototypeCall(constructor='URLSearchParams', fn='getAll', demands=['URLSearchParams', 'str'], returns='str'),
        PrototypeCall(constructor='ContentIndex', fn='getAll', demands=['ContentIndex'], returns='ContentDescription'),
        PrototypeCall(constructor='CookieStore', fn='getAll', demands=['CookieStore', 'str'], returns='CookieList'),
        PrototypeCall(constructor='CookieStore', fn='getAll', demands=['CookieStore'], returns='CookieList'),
        PrototypeCall(constructor='CookieStore', fn='getAll', demands=['CookieStore', 'CookieStoreGetOptions'], returns='CookieList'),
        PrototypeCall(constructor='IDBObjectStore', fn='getAll', demands=['IDBObjectStore'], returns='IDBRequest'),
        PrototypeCall(constructor='IDBObjectStore', fn='getAll', demands=['IDBObjectStore', '*'], returns='IDBRequest'),
        PrototypeCall(constructor='IDBObjectStore', fn='getAll', demands=['IDBObjectStore', '*', 'int'], returns='IDBRequest'),
        PrototypeCall(constructor='IDBIndex', fn='getAll', demands=['IDBIndex'], returns='IDBRequest'),
        PrototypeCall(constructor='IDBIndex', fn='getAll', demands=['IDBIndex', '*'], returns='IDBRequest'),
        PrototypeCall(constructor='IDBIndex', fn='getAll', demands=['IDBIndex', '*', 'int'], returns='IDBRequest'),
        PrototypeCall(constructor='StylePropertyMapReadOnly', fn='getAll', demands=['StylePropertyMapReadOnly', 'str'], returns='CSSStyleValue'),
        PrototypeCall(constructor='FormData', fn='getAll', demands=['FormData', 'str'], returns='FormDataEntryValue'),
    ],
    "has": [
        PrototypeCall(constructor='URLSearchParams', fn='has', demands=['URLSearchParams', 'str'], returns='bool'),
        PrototypeCall(constructor='URLSearchParams', fn='has', demands=['URLSearchParams', 'str', 'str'], returns='bool'),
        PrototypeCall(constructor='CacheStorage', fn='has', demands=['CacheStorage', 'str'], returns='bool'),
        PrototypeCall(constructor='StylePropertyMapReadOnly', fn='has', demands=['StylePropertyMapReadOnly', 'str'], returns='bool'),
        PrototypeCall(constructor='MediaKeyStatusMap', fn='has', demands=['MediaKeyStatusMap', 'BufferSource'], returns='bool'),
        PrototypeCall(constructor='Headers', fn='has', demands=['Headers', 'str'], returns='bool'),
        PrototypeCall(constructor='FormData', fn='has', demands=['FormData', 'str'], returns='bool'),
    ],
    "sort": [
        PrototypeCall(constructor='URLSearchParams', fn='sort', demands=['URLSearchParams'], returns='None'),
    ],
    "DeviceOrientationEvent": [
        NewCall(constructor='DeviceOrientationEvent', demands=['str'], returns='DeviceOrientationEvent'),
        NewCall(constructor='DeviceOrientationEvent', demands=['str', 'DeviceOrientationEventInit'], returns='DeviceOrientationEvent'),
    ],
    "requestPermission": [
        DirectCall(fn='requestPermission', receiver='DeviceOrientationEvent', demands=[], returns='PermissionState'),
        DirectCall(fn='requestPermission', receiver='DeviceOrientationEvent', demands=['bool'], returns='PermissionState'),
        DirectCall(fn='requestPermission', receiver='DeviceMotionEvent', demands=[], returns='PermissionState'),
        DirectCall(fn='requestPermission', receiver='Notification', demands=[], returns='NotificationPermission'),
        DirectCall(fn='requestPermission', receiver='Notification', demands=['NotificationPermissionCallback'], returns='NotificationPermission'),
        DirectCall(fn='requestPermission', receiver='IdleDetector', demands=[], returns='PermissionState'),
    ],
    "DeviceMotionEvent": [
        NewCall(constructor='DeviceMotionEvent', demands=['str'], returns='DeviceMotionEvent'),
        NewCall(constructor='DeviceMotionEvent', demands=['str', 'DeviceMotionEventInit'], returns='DeviceMotionEvent'),
    ],
    "requestFrame": [
        PrototypeCall(constructor='CanvasCaptureMediaStreamTrack', fn='requestFrame', demands=['CanvasCaptureMediaStreamTrack'], returns='None'),
    ],
    "getTitlebarAreaRect": [
        PrototypeCall(constructor='WindowControlsOverlay', fn='getTitlebarAreaRect', demands=['WindowControlsOverlay'], returns='DOMRect'),
    ],
    "WindowControlsOverlayGeometryChangeEvent": [
        NewCall(constructor='WindowControlsOverlayGeometryChangeEvent', demands=['str', 'WindowControlsOverlayGeometryChangeEventInit'], returns='WindowControlsOverlayGeometryChangeEvent'),
    ],
    "fromElement": [
        DirectCall(fn='fromElement', receiver='RestrictionTarget', demands=['Element'], returns='RestrictionTarget'),
        DirectCall(fn='fromElement', receiver='CropTarget', demands=['Element'], returns='CropTarget'),
    ],
    "hide": [
        PrototypeCall(constructor='VirtualKeyboard', fn='hide', demands=['VirtualKeyboard'], returns='None'),
    ],
    "Sanitizer": [
        NewCall(constructor='Sanitizer', demands=[], returns='Sanitizer'),
        NewCall(constructor='Sanitizer', demands=['SanitizerConfig'], returns='Sanitizer'),
    ],
    "allowElement": [
        PrototypeCall(constructor='Sanitizer', fn='allowElement', demands=['Sanitizer', 'SanitizerElementWithAttributes'], returns='None'),
    ],
    "removeElement": [
        PrototypeCall(constructor='Sanitizer', fn='removeElement', demands=['Sanitizer', 'SanitizerElement'], returns='None'),
    ],
    "replaceElementWithChildren": [
        PrototypeCall(constructor='Sanitizer', fn='replaceElementWithChildren', demands=['Sanitizer', 'SanitizerElement'], returns='None'),
    ],
    "allowAttribute": [
        PrototypeCall(constructor='Sanitizer', fn='allowAttribute', demands=['Sanitizer', 'SanitizerAttribute'], returns='None'),
    ],
    "removeAttribute": [
        PrototypeCall(constructor='Sanitizer', fn='removeAttribute', demands=['Sanitizer', 'SanitizerAttribute'], returns='None'),
        PrototypeCall(constructor='Element', fn='removeAttribute', demands=['Element', 'str'], returns='None'),
    ],
    "setComments": [
        PrototypeCall(constructor='Sanitizer', fn='setComments', demands=['Sanitizer', 'bool'], returns='None'),
    ],
    "setDataAttributes": [
        PrototypeCall(constructor='Sanitizer', fn='setDataAttributes', demands=['Sanitizer', 'bool'], returns='None'),
    ],
    "removeUnsafe": [
        PrototypeCall(constructor='Sanitizer', fn='removeUnsafe', demands=['Sanitizer'], returns='None'),
    ],
    "TextDetector": [
        NewCall(constructor='TextDetector', demands=[], returns='TextDetector'),
    ],
    "detect": [
        PrototypeCall(constructor='TextDetector', fn='detect', demands=['TextDetector', 'ImageBitmapSource'], returns='DetectedText'),
        PrototypeCall(constructor='FaceDetector', fn='detect', demands=['FaceDetector', 'ImageBitmapSource'], returns='DetectedFace'),
        PrototypeCall(constructor='BarcodeDetector', fn='detect', demands=['BarcodeDetector', 'ImageBitmapSource'], returns='DetectedBarcode'),
        PrototypeCall(constructor='LanguageDetector', fn='detect', demands=['LanguageDetector', 'str'], returns='LanguageDetectionResult'),
        PrototypeCall(constructor='LanguageDetector', fn='detect', demands=['LanguageDetector', 'str', 'LanguageDetectorDetectOptions'], returns='LanguageDetectionResult'),
    ],
    "createQueryEXT": [
        PrototypeCall(constructor='EXT_disjoint_timer_query', fn='createQueryEXT', demands=['EXT_disjoint_timer_query'], returns='WebGLTimerQueryEXT'),
    ],
    "deleteQueryEXT": [
        PrototypeCall(constructor='EXT_disjoint_timer_query', fn='deleteQueryEXT', demands=['EXT_disjoint_timer_query', 'WebGLTimerQueryEXT'], returns='None'),
    ],
    "isQueryEXT": [
        PrototypeCall(constructor='EXT_disjoint_timer_query', fn='isQueryEXT', demands=['EXT_disjoint_timer_query', 'WebGLTimerQueryEXT'], returns='bool'),
    ],
    "beginQueryEXT": [
        PrototypeCall(constructor='EXT_disjoint_timer_query', fn='beginQueryEXT', demands=['EXT_disjoint_timer_query', 'GLenum', 'WebGLTimerQueryEXT'], returns='None'),
    ],
    "endQueryEXT": [
        PrototypeCall(constructor='EXT_disjoint_timer_query', fn='endQueryEXT', demands=['EXT_disjoint_timer_query', 'GLenum'], returns='None'),
    ],
    "queryCounterEXT": [
        PrototypeCall(constructor='EXT_disjoint_timer_query', fn='queryCounterEXT', demands=['EXT_disjoint_timer_query', 'WebGLTimerQueryEXT', 'GLenum'], returns='None'),
        PrototypeCall(constructor='EXT_disjoint_timer_query_webgl2', fn='queryCounterEXT', demands=['EXT_disjoint_timer_query_webgl2', 'WebGLQuery', 'GLenum'], returns='None'),
    ],
    "getQueryEXT": [
        PrototypeCall(constructor='EXT_disjoint_timer_query', fn='getQueryEXT', demands=['EXT_disjoint_timer_query', 'GLenum', 'GLenum'], returns='*'),
    ],
    "getQueryObjectEXT": [
        PrototypeCall(constructor='EXT_disjoint_timer_query', fn='getQueryObjectEXT', demands=['EXT_disjoint_timer_query', 'WebGLTimerQueryEXT', 'GLenum'], returns='*'),
    ],
    "getRandomValues": [
        PrototypeCall(constructor='Crypto', fn='getRandomValues', demands=['Crypto', 'ArrayBufferView'], returns='ArrayBufferView'),
    ],
    "randomUUID": [
        PrototypeCall(constructor='Crypto', fn='randomUUID', demands=['Crypto'], returns='str'),
    ],
    "encrypt": [
        PrototypeCall(constructor='SubtleCrypto', fn='encrypt', demands=['SubtleCrypto', 'AlgorithmIdentifier', 'CryptoKey', 'BufferSource'], returns='ArrayBuffer'),
    ],
    "decrypt": [
        PrototypeCall(constructor='SubtleCrypto', fn='decrypt', demands=['SubtleCrypto', 'AlgorithmIdentifier', 'CryptoKey', 'BufferSource'], returns='ArrayBuffer'),
    ],
    "sign": [
        PrototypeCall(constructor='SubtleCrypto', fn='sign', demands=['SubtleCrypto', 'AlgorithmIdentifier', 'CryptoKey', 'BufferSource'], returns='ArrayBuffer'),
    ],
    "verify": [
        PrototypeCall(constructor='SubtleCrypto', fn='verify', demands=['SubtleCrypto', 'AlgorithmIdentifier', 'CryptoKey', 'BufferSource', 'BufferSource'], returns='bool'),
    ],
    "digest": [
        PrototypeCall(constructor='SubtleCrypto', fn='digest', demands=['SubtleCrypto', 'AlgorithmIdentifier', 'BufferSource'], returns='ArrayBuffer'),
    ],
    "generateKey": [
        PrototypeCall(constructor='SubtleCrypto', fn='generateKey', demands=['SubtleCrypto', 'AlgorithmIdentifier', 'bool', 'KeyUsage'], returns='CryptoKey'),
    ],
    "deriveKey": [
        PrototypeCall(constructor='SubtleCrypto', fn='deriveKey', demands=['SubtleCrypto', 'AlgorithmIdentifier', 'CryptoKey', 'AlgorithmIdentifier', 'bool', 'KeyUsage'], returns='CryptoKey'),
    ],
    "deriveBits": [
        PrototypeCall(constructor='SubtleCrypto', fn='deriveBits', demands=['SubtleCrypto', 'AlgorithmIdentifier', 'CryptoKey'], returns='ArrayBuffer'),
        PrototypeCall(constructor='SubtleCrypto', fn='deriveBits', demands=['SubtleCrypto', 'AlgorithmIdentifier', 'CryptoKey', 'int'], returns='ArrayBuffer'),
    ],
    "importKey": [
        PrototypeCall(constructor='SubtleCrypto', fn='importKey', demands=['SubtleCrypto', 'KeyFormat', 'BufferSource', 'AlgorithmIdentifier', 'bool', 'KeyUsage'], returns='CryptoKey'),
    ],
    "exportKey": [
        PrototypeCall(constructor='SubtleCrypto', fn='exportKey', demands=['SubtleCrypto', 'KeyFormat', 'CryptoKey'], returns='ArrayBuffer'),
    ],
    "wrapKey": [
        PrototypeCall(constructor='SubtleCrypto', fn='wrapKey', demands=['SubtleCrypto', 'KeyFormat', 'CryptoKey', 'CryptoKey', 'AlgorithmIdentifier'], returns='ArrayBuffer'),
    ],
    "unwrapKey": [
        PrototypeCall(constructor='SubtleCrypto', fn='unwrapKey', demands=['SubtleCrypto', 'KeyFormat', 'BufferSource', 'CryptoKey', 'AlgorithmIdentifier', 'AlgorithmIdentifier', 'bool', 'KeyUsage'], returns='CryptoKey'),
    ],
    "getDepthInMeters": [
        PrototypeCall(constructor='XRCPUDepthInformation', fn='getDepthInMeters', demands=['XRCPUDepthInformation', 'float', 'float'], returns='float'),
    ],
    "MediaStream": [
        NewCall(constructor='MediaStream', demands=[], returns='MediaStream'),
        NewCall(constructor='MediaStream', demands=['MediaStream'], returns='MediaStream'),
        NewCall(constructor='MediaStream', demands=['MediaStreamTrack'], returns='MediaStream'),
    ],
    "getAudioTracks": [
        PrototypeCall(constructor='MediaStream', fn='getAudioTracks', demands=['MediaStream'], returns='MediaStreamTrack'),
    ],
    "getVideoTracks": [
        PrototypeCall(constructor='MediaStream', fn='getVideoTracks', demands=['MediaStream'], returns='MediaStreamTrack'),
    ],
    "getTracks": [
        PrototypeCall(constructor='MediaStream', fn='getTracks', demands=['MediaStream'], returns='MediaStreamTrack'),
    ],
    "getTrackById": [
        PrototypeCall(constructor='MediaStream', fn='getTrackById', demands=['MediaStream', 'str'], returns='MediaStreamTrack'),
        PrototypeCall(constructor='AudioTrackList', fn='getTrackById', demands=['AudioTrackList', 'str'], returns='AudioTrack'),
        PrototypeCall(constructor='VideoTrackList', fn='getTrackById', demands=['VideoTrackList', 'str'], returns='VideoTrack'),
        PrototypeCall(constructor='TextTrackList', fn='getTrackById', demands=['TextTrackList', 'str'], returns='TextTrack'),
    ],
    "addTrack": [
        PrototypeCall(constructor='MediaStream', fn='addTrack', demands=['MediaStream', 'MediaStreamTrack'], returns='None'),
    ],
    "removeTrack": [
        PrototypeCall(constructor='MediaStream', fn='removeTrack', demands=['MediaStream', 'MediaStreamTrack'], returns='None'),
    ],
    "clone": [
        PrototypeCall(constructor='MediaStream', fn='clone', demands=['MediaStream'], returns='MediaStream'),
        PrototypeCall(constructor='MediaStreamTrack', fn='clone', demands=['MediaStreamTrack'], returns='MediaStreamTrack'),
        PrototypeCall(constructor='BrowserCaptureMediaStreamTrack', fn='clone', demands=['BrowserCaptureMediaStreamTrack'], returns='BrowserCaptureMediaStreamTrack'),
        PrototypeCall(constructor='AudioData', fn='clone', demands=['AudioData'], returns='AudioData'),
        PrototypeCall(constructor='VideoFrame', fn='clone', demands=['VideoFrame'], returns='VideoFrame'),
        PrototypeCall(constructor='GroupEffect', fn='clone', demands=['GroupEffect'], returns='GroupEffect'),
        PrototypeCall(constructor='SequenceEffect', fn='clone', demands=['SequenceEffect'], returns='SequenceEffect'),
        PrototypeCall(constructor='Request', fn='clone', demands=['Request'], returns='Request'),
        PrototypeCall(constructor='Response', fn='clone', demands=['Response'], returns='Response'),
    ],
    "stop": [
        PrototypeCall(constructor='MediaStreamTrack', fn='stop', demands=['MediaStreamTrack'], returns='None'),
        PrototypeCall(constructor='RTCRtpTransceiver', fn='stop', demands=['RTCRtpTransceiver'], returns='None'),
        PrototypeCall(constructor='Window', fn='stop', demands=['Window'], returns='None'),
        PrototypeCall(constructor='HTMLMarqueeElement', fn='stop', demands=['HTMLMarqueeElement'], returns='None'),
        PrototypeCall(constructor='Profiler', fn='stop', demands=['Profiler'], returns='ProfilerTrace'),
        PrototypeCall(constructor='MediaRecorder', fn='stop', demands=['MediaRecorder'], returns='None'),
        PrototypeCall(constructor='Sensor', fn='stop', demands=['Sensor'], returns='None'),
        PrototypeCall(constructor='SpeechRecognition', fn='stop', demands=['SpeechRecognition'], returns='None'),
        PrototypeCall(constructor='BluetoothLEScan', fn='stop', demands=['BluetoothLEScan'], returns='None'),
        PrototypeCall(constructor='AudioScheduledSourceNode', fn='stop', demands=['AudioScheduledSourceNode'], returns='None'),
        PrototypeCall(constructor='AudioScheduledSourceNode', fn='stop', demands=['AudioScheduledSourceNode', 'float'], returns='None'),
    ],
    "getCapabilities": [
        PrototypeCall(constructor='MediaStreamTrack', fn='getCapabilities', demands=['MediaStreamTrack'], returns='MediaTrackCapabilities'),
        PrototypeCall(constructor='InputDeviceInfo', fn='getCapabilities', demands=['InputDeviceInfo'], returns='MediaTrackCapabilities'),
        DirectCall(fn='getCapabilities', receiver='RTCRtpSender', demands=['str'], returns='RTCRtpCapabilities'),
        DirectCall(fn='getCapabilities', receiver='RTCRtpReceiver', demands=['str'], returns='RTCRtpCapabilities'),
    ],
    "getConstraints": [
        PrototypeCall(constructor='MediaStreamTrack', fn='getConstraints', demands=['MediaStreamTrack'], returns='MediaTrackConstraints'),
    ],
    "getSettings": [
        PrototypeCall(constructor='MediaStreamTrack', fn='getSettings', demands=['MediaStreamTrack'], returns='MediaTrackSettings'),
    ],
    "applyConstraints": [
        PrototypeCall(constructor='MediaStreamTrack', fn='applyConstraints', demands=['MediaStreamTrack'], returns='None'),
        PrototypeCall(constructor='MediaStreamTrack', fn='applyConstraints', demands=['MediaStreamTrack', 'MediaTrackConstraints'], returns='None'),
    ],
    "MediaStreamTrackEvent": [
        NewCall(constructor='MediaStreamTrackEvent', demands=['str', 'MediaStreamTrackEventInit'], returns='MediaStreamTrackEvent'),
    ],
    "OverconstrainedError": [
        NewCall(constructor='OverconstrainedError', demands=['str'], returns='OverconstrainedError'),
        NewCall(constructor='OverconstrainedError', demands=['str', 'str'], returns='OverconstrainedError'),
    ],
    "enumerateDevices": [
        PrototypeCall(constructor='MediaDevices', fn='enumerateDevices', demands=['MediaDevices'], returns='MediaDeviceInfo'),
    ],
    "DeviceChangeEvent": [
        NewCall(constructor='DeviceChangeEvent', demands=['str'], returns='DeviceChangeEvent'),
        NewCall(constructor='DeviceChangeEvent', demands=['str', 'DeviceChangeEventInit'], returns='DeviceChangeEvent'),
    ],
    "selectURL": [
        PrototypeCall(constructor='SharedStorageWorklet', fn='selectURL', demands=['SharedStorageWorklet', 'str', 'SharedStorageUrlWithMetadata'], returns='SharedStorageResponse'),
        PrototypeCall(constructor='SharedStorageWorklet', fn='selectURL', demands=['SharedStorageWorklet', 'str', 'SharedStorageUrlWithMetadata', 'SharedStorageRunOperationMethodOptions'], returns='SharedStorageResponse'),
        PrototypeCall(constructor='SharedStorage', fn='selectURL', demands=['SharedStorage', 'str', 'SharedStorageUrlWithMetadata'], returns='SharedStorageResponse'),
        PrototypeCall(constructor='SharedStorage', fn='selectURL', demands=['SharedStorage', 'str', 'SharedStorageUrlWithMetadata', 'SharedStorageRunOperationMethodOptions'], returns='SharedStorageResponse'),
    ],
    "run": [
        PrototypeCall(constructor='SharedStorageWorklet', fn='run', demands=['SharedStorageWorklet', 'str'], returns='*'),
        PrototypeCall(constructor='SharedStorageWorklet', fn='run', demands=['SharedStorageWorklet', 'str', 'SharedStorageRunOperationMethodOptions'], returns='*'),
        PrototypeCall(constructor='SharedStorage', fn='run', demands=['SharedStorage', 'str'], returns='*'),
        PrototypeCall(constructor='SharedStorage', fn='run', demands=['SharedStorage', 'str', 'SharedStorageRunOperationMethodOptions'], returns='*'),
    ],
    "register": [
        PrototypeCall(constructor='SharedStorageWorkletGlobalScope', fn='register', demands=['SharedStorageWorkletGlobalScope', 'str', 'Function'], returns='None'),
        PrototypeCall(constructor='RTCIdentityProviderRegistrar', fn='register', demands=['RTCIdentityProviderRegistrar', 'RTCIdentityProvider'], returns='None'),
        PrototypeCall(constructor='ServiceWorkerContainer', fn='register', demands=['ServiceWorkerContainer', 'TrustedScriptURL'], returns='ServiceWorkerRegistration'),
        PrototypeCall(constructor='ServiceWorkerContainer', fn='register', demands=['ServiceWorkerContainer', 'TrustedScriptURL', 'RegistrationOptions'], returns='ServiceWorkerRegistration'),
        PrototypeCall(constructor='PeriodicSyncManager', fn='register', demands=['PeriodicSyncManager', 'str'], returns='None'),
        PrototypeCall(constructor='PeriodicSyncManager', fn='register', demands=['PeriodicSyncManager', 'str', 'BackgroundSyncOptions'], returns='None'),
        PrototypeCall(constructor='SyncManager', fn='register', demands=['SyncManager', 'str'], returns='None'),
    ],
    "interestGroups": [
        PrototypeCall(constructor='SharedStorageWorkletGlobalScope', fn='interestGroups', demands=['SharedStorageWorkletGlobalScope'], returns='StorageInterestGroup'),
    ],
    "SharedStorageSetMethod": [
        NewCall(constructor='SharedStorageSetMethod', demands=['str', 'str'], returns='SharedStorageSetMethod'),
        NewCall(constructor='SharedStorageSetMethod', demands=['str', 'str', 'SharedStorageSetMethodOptions'], returns='SharedStorageSetMethod'),
    ],
    "SharedStorageAppendMethod": [
        NewCall(constructor='SharedStorageAppendMethod', demands=['str', 'str'], returns='SharedStorageAppendMethod'),
        NewCall(constructor='SharedStorageAppendMethod', demands=['str', 'str', 'SharedStorageModifierMethodOptions'], returns='SharedStorageAppendMethod'),
    ],
    "SharedStorageDeleteMethod": [
        NewCall(constructor='SharedStorageDeleteMethod', demands=['str'], returns='SharedStorageDeleteMethod'),
        NewCall(constructor='SharedStorageDeleteMethod', demands=['str', 'SharedStorageModifierMethodOptions'], returns='SharedStorageDeleteMethod'),
    ],
    "SharedStorageClearMethod": [
        NewCall(constructor='SharedStorageClearMethod', demands=[], returns='SharedStorageClearMethod'),
        NewCall(constructor='SharedStorageClearMethod', demands=['SharedStorageModifierMethodOptions'], returns='SharedStorageClearMethod'),
    ],
    "clear": [
        PrototypeCall(constructor='SharedStorage', fn='clear', demands=['SharedStorage'], returns='*'),
        PrototypeCall(constructor='SharedStorage', fn='clear', demands=['SharedStorage', 'SharedStorageModifierMethodOptions'], returns='*'),
        PrototypeCall(constructor='DataTransferItemList', fn='clear', demands=['DataTransferItemList'], returns='None'),
        PrototypeCall(constructor='Storage', fn='clear', demands=['Storage'], returns='None'),
        PrototypeCall(constructor='MIDIOutput', fn='clear', demands=['MIDIOutput'], returns='None'),
        PrototypeCall(constructor='IDBObjectStore', fn='clear', demands=['IDBObjectStore'], returns='IDBRequest'),
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
    "batchUpdate": [
        PrototypeCall(constructor='SharedStorage', fn='batchUpdate', demands=['SharedStorage', 'SharedStorageModifierMethod'], returns='*'),
        PrototypeCall(constructor='SharedStorage', fn='batchUpdate', demands=['SharedStorage', 'SharedStorageModifierMethod', 'SharedStorageModifierMethodOptions'], returns='*'),
    ],
    "createWorklet": [
        PrototypeCall(constructor='SharedStorage', fn='createWorklet', demands=['SharedStorage', 'str'], returns='SharedStorageWorklet'),
        PrototypeCall(constructor='SharedStorage', fn='createWorklet', demands=['SharedStorage', 'str', 'SharedStorageWorkletOptions'], returns='SharedStorageWorklet'),
    ],
    "length": [
        PrototypeCall(constructor='SharedStorage', fn='length', demands=['SharedStorage'], returns='int'),
    ],
    "remainingBudget": [
        PrototypeCall(constructor='SharedStorage', fn='remainingBudget', demands=['SharedStorage'], returns='float'),
    ],
    "RTCPeerConnection": [
        NewCall(constructor='RTCPeerConnection', demands=[], returns='RTCPeerConnection'),
        NewCall(constructor='RTCPeerConnection', demands=['RTCConfiguration'], returns='RTCPeerConnection'),
    ],
    "createOffer": [
        PrototypeCall(constructor='RTCPeerConnection', fn='createOffer', demands=['RTCPeerConnection'], returns='RTCSessionDescriptionInit'),
        PrototypeCall(constructor='RTCPeerConnection', fn='createOffer', demands=['RTCPeerConnection', 'RTCOfferOptions'], returns='RTCSessionDescriptionInit'),
        PrototypeCall(constructor='RTCPeerConnection', fn='createOffer', demands=['RTCPeerConnection', 'RTCSessionDescriptionCallback', 'RTCPeerConnectionErrorCallback'], returns='None'),
        PrototypeCall(constructor='RTCPeerConnection', fn='createOffer', demands=['RTCPeerConnection', 'RTCSessionDescriptionCallback', 'RTCPeerConnectionErrorCallback', 'RTCOfferOptions'], returns='None'),
    ],
    "createAnswer": [
        PrototypeCall(constructor='RTCPeerConnection', fn='createAnswer', demands=['RTCPeerConnection'], returns='RTCSessionDescriptionInit'),
        PrototypeCall(constructor='RTCPeerConnection', fn='createAnswer', demands=['RTCPeerConnection', 'RTCAnswerOptions'], returns='RTCSessionDescriptionInit'),
        PrototypeCall(constructor='RTCPeerConnection', fn='createAnswer', demands=['RTCPeerConnection', 'RTCSessionDescriptionCallback', 'RTCPeerConnectionErrorCallback'], returns='None'),
    ],
    "setLocalDescription": [
        PrototypeCall(constructor='RTCPeerConnection', fn='setLocalDescription', demands=['RTCPeerConnection'], returns='None'),
        PrototypeCall(constructor='RTCPeerConnection', fn='setLocalDescription', demands=['RTCPeerConnection', 'RTCLocalSessionDescriptionInit'], returns='None'),
        PrototypeCall(constructor='RTCPeerConnection', fn='setLocalDescription', demands=['RTCPeerConnection', 'RTCLocalSessionDescriptionInit', 'VoidFunction', 'RTCPeerConnectionErrorCallback'], returns='None'),
    ],
    "setRemoteDescription": [
        PrototypeCall(constructor='RTCPeerConnection', fn='setRemoteDescription', demands=['RTCPeerConnection', 'RTCSessionDescriptionInit'], returns='None'),
        PrototypeCall(constructor='RTCPeerConnection', fn='setRemoteDescription', demands=['RTCPeerConnection', 'RTCSessionDescriptionInit', 'VoidFunction', 'RTCPeerConnectionErrorCallback'], returns='None'),
    ],
    "addIceCandidate": [
        PrototypeCall(constructor='RTCPeerConnection', fn='addIceCandidate', demands=['RTCPeerConnection'], returns='None'),
        PrototypeCall(constructor='RTCPeerConnection', fn='addIceCandidate', demands=['RTCPeerConnection', 'RTCIceCandidateInit'], returns='None'),
        PrototypeCall(constructor='RTCPeerConnection', fn='addIceCandidate', demands=['RTCPeerConnection', 'RTCIceCandidateInit', 'VoidFunction', 'RTCPeerConnectionErrorCallback'], returns='None'),
    ],
    "restartIce": [
        PrototypeCall(constructor='RTCPeerConnection', fn='restartIce', demands=['RTCPeerConnection'], returns='None'),
    ],
    "getConfiguration": [
        PrototypeCall(constructor='RTCPeerConnection', fn='getConfiguration', demands=['RTCPeerConnection'], returns='RTCConfiguration'),
        PrototypeCall(constructor='MediaKeySystemAccess', fn='getConfiguration', demands=['MediaKeySystemAccess'], returns='MediaKeySystemConfiguration'),
        PrototypeCall(constructor='GPUCanvasContext', fn='getConfiguration', demands=['GPUCanvasContext'], returns='GPUCanvasConfiguration'),
    ],
    "setConfiguration": [
        PrototypeCall(constructor='RTCPeerConnection', fn='setConfiguration', demands=['RTCPeerConnection'], returns='None'),
        PrototypeCall(constructor='RTCPeerConnection', fn='setConfiguration', demands=['RTCPeerConnection', 'RTCConfiguration'], returns='None'),
    ],
    "close": [
        PrototypeCall(constructor='RTCPeerConnection', fn='close', demands=['RTCPeerConnection'], returns='None'),
        PrototypeCall(constructor='RTCDataChannel', fn='close', demands=['RTCDataChannel'], returns='None'),
        PrototypeCall(constructor='SerialPort', fn='close', demands=['SerialPort'], returns='None'),
        PrototypeCall(constructor='FileSystemSyncAccessHandle', fn='close', demands=['FileSystemSyncAccessHandle'], returns='None'),
        PrototypeCall(constructor='HTMLDialogElement', fn='close', demands=['HTMLDialogElement'], returns='None'),
        PrototypeCall(constructor='HTMLDialogElement', fn='close', demands=['HTMLDialogElement', 'str'], returns='None'),
        PrototypeCall(constructor='CloseWatcher', fn='close', demands=['CloseWatcher'], returns='None'),
        PrototypeCall(constructor='Window', fn='close', demands=['Window'], returns='None'),
        PrototypeCall(constructor='ImageBitmap', fn='close', demands=['ImageBitmap'], returns='None'),
        PrototypeCall(constructor='EventSource', fn='close', demands=['EventSource'], returns='None'),
        PrototypeCall(constructor='MessagePort', fn='close', demands=['MessagePort'], returns='None'),
        PrototypeCall(constructor='BroadcastChannel', fn='close', demands=['BroadcastChannel'], returns='None'),
        PrototypeCall(constructor='DedicatedWorkerGlobalScope', fn='close', demands=['DedicatedWorkerGlobalScope'], returns='None'),
        PrototypeCall(constructor='SharedWorkerGlobalScope', fn='close', demands=['SharedWorkerGlobalScope'], returns='None'),
        PrototypeCall(constructor='MIDIPort', fn='close', demands=['MIDIPort'], returns='MIDIPort'),
        PrototypeCall(constructor='WebSocket', fn='close', demands=['WebSocket'], returns='None'),
        PrototypeCall(constructor='WebSocket', fn='close', demands=['WebSocket', 'unsigned short'], returns='None'),
        PrototypeCall(constructor='WebSocket', fn='close', demands=['WebSocket', 'unsigned short', 'str'], returns='None'),
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
        PrototypeCall(constructor='WebTransport', fn='close', demands=['WebTransport'], returns='None'),
        PrototypeCall(constructor='WebTransport', fn='close', demands=['WebTransport', 'WebTransportCloseInfo'], returns='None'),
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
        NewCall(constructor='RTCSessionDescription', demands=['RTCSessionDescriptionInit'], returns='RTCSessionDescription'),
    ],
    "RTCIceCandidate": [
        NewCall(constructor='RTCIceCandidate', demands=[], returns='RTCIceCandidate'),
        NewCall(constructor='RTCIceCandidate', demands=['RTCLocalIceCandidateInit'], returns='RTCIceCandidate'),
    ],
    "RTCPeerConnectionIceEvent": [
        NewCall(constructor='RTCPeerConnectionIceEvent', demands=['str'], returns='RTCPeerConnectionIceEvent'),
        NewCall(constructor='RTCPeerConnectionIceEvent', demands=['str', 'RTCPeerConnectionIceEventInit'], returns='RTCPeerConnectionIceEvent'),
    ],
    "RTCPeerConnectionIceErrorEvent": [
        NewCall(constructor='RTCPeerConnectionIceErrorEvent', demands=['str', 'RTCPeerConnectionIceErrorEventInit'], returns='RTCPeerConnectionIceErrorEvent'),
    ],
    "getFingerprints": [
        PrototypeCall(constructor='RTCCertificate', fn='getFingerprints', demands=['RTCCertificate'], returns='RTCDtlsFingerprint'),
    ],
    "setParameters": [
        PrototypeCall(constructor='RTCRtpSender', fn='setParameters', demands=['RTCRtpSender', 'RTCRtpSendParameters'], returns='None'),
        PrototypeCall(constructor='RTCRtpSender', fn='setParameters', demands=['RTCRtpSender', 'RTCRtpSendParameters', 'RTCSetParameterOptions'], returns='None'),
    ],
    "getParameters": [
        PrototypeCall(constructor='RTCRtpSender', fn='getParameters', demands=['RTCRtpSender'], returns='RTCRtpSendParameters'),
        PrototypeCall(constructor='RTCRtpReceiver', fn='getParameters', demands=['RTCRtpReceiver'], returns='RTCRtpReceiveParameters'),
        PrototypeCall(constructor='CSSFunctionRule', fn='getParameters', demands=['CSSFunctionRule'], returns='FunctionParameter'),
    ],
    "replaceTrack": [
        PrototypeCall(constructor='RTCRtpSender', fn='replaceTrack', demands=['RTCRtpSender', 'MediaStreamTrack'], returns='None'),
    ],
    "setStreams": [
        PrototypeCall(constructor='RTCRtpSender', fn='setStreams', demands=['RTCRtpSender', 'MediaStream'], returns='None'),
    ],
    "getStats": [
        PrototypeCall(constructor='RTCRtpSender', fn='getStats', demands=['RTCRtpSender'], returns='RTCStatsReport'),
        PrototypeCall(constructor='RTCRtpReceiver', fn='getStats', demands=['RTCRtpReceiver'], returns='RTCStatsReport'),
        PrototypeCall(constructor='WebTransport', fn='getStats', demands=['WebTransport'], returns='WebTransportConnectionStats'),
        PrototypeCall(constructor='WebTransportSendStream', fn='getStats', demands=['WebTransportSendStream'], returns='WebTransportSendStreamStats'),
        PrototypeCall(constructor='WebTransportSendGroup', fn='getStats', demands=['WebTransportSendGroup'], returns='WebTransportSendStreamStats'),
        PrototypeCall(constructor='WebTransportReceiveStream', fn='getStats', demands=['WebTransportReceiveStream'], returns='WebTransportReceiveStreamStats'),
    ],
    "getContributingSources": [
        PrototypeCall(constructor='RTCRtpReceiver', fn='getContributingSources', demands=['RTCRtpReceiver'], returns='RTCRtpContributingSource'),
    ],
    "getSynchronizationSources": [
        PrototypeCall(constructor='RTCRtpReceiver', fn='getSynchronizationSources', demands=['RTCRtpReceiver'], returns='RTCRtpSynchronizationSource'),
    ],
    "setCodecPreferences": [
        PrototypeCall(constructor='RTCRtpTransceiver', fn='setCodecPreferences', demands=['RTCRtpTransceiver', 'RTCRtpCodec'], returns='None'),
    ],
    "getRemoteCertificates": [
        PrototypeCall(constructor='RTCDtlsTransport', fn='getRemoteCertificates', demands=['RTCDtlsTransport'], returns='ArrayBuffer'),
    ],
    "getLocalCandidates": [
        PrototypeCall(constructor='RTCIceTransport', fn='getLocalCandidates', demands=['RTCIceTransport'], returns='RTCIceCandidate'),
    ],
    "getRemoteCandidates": [
        PrototypeCall(constructor='RTCIceTransport', fn='getRemoteCandidates', demands=['RTCIceTransport'], returns='RTCIceCandidate'),
    ],
    "getSelectedCandidatePair": [
        PrototypeCall(constructor='RTCIceTransport', fn='getSelectedCandidatePair', demands=['RTCIceTransport'], returns='RTCIceCandidatePair'),
    ],
    "getLocalParameters": [
        PrototypeCall(constructor='RTCIceTransport', fn='getLocalParameters', demands=['RTCIceTransport'], returns='RTCIceParameters'),
    ],
    "getRemoteParameters": [
        PrototypeCall(constructor='RTCIceTransport', fn='getRemoteParameters', demands=['RTCIceTransport'], returns='RTCIceParameters'),
    ],
    "RTCTrackEvent": [
        NewCall(constructor='RTCTrackEvent', demands=['str', 'RTCTrackEventInit'], returns='RTCTrackEvent'),
    ],
    "send": [
        PrototypeCall(constructor='RTCDataChannel', fn='send', demands=['RTCDataChannel', 'str'], returns='None'),
        PrototypeCall(constructor='RTCDataChannel', fn='send', demands=['RTCDataChannel', 'Blob'], returns='None'),
        PrototypeCall(constructor='RTCDataChannel', fn='send', demands=['RTCDataChannel', 'ArrayBuffer'], returns='None'),
        PrototypeCall(constructor='RTCDataChannel', fn='send', demands=['RTCDataChannel', 'ArrayBufferView'], returns='None'),
        PrototypeCall(constructor='MIDIOutput', fn='send', demands=['MIDIOutput', 'int'], returns='None'),
        PrototypeCall(constructor='MIDIOutput', fn='send', demands=['MIDIOutput', 'int', 'float'], returns='None'),
        PrototypeCall(constructor='WebSocket', fn='send', demands=['WebSocket', 'BufferSource'], returns='None'),
        PrototypeCall(constructor='PresentationConnection', fn='send', demands=['PresentationConnection', 'str'], returns='None'),
        PrototypeCall(constructor='PresentationConnection', fn='send', demands=['PresentationConnection', 'Blob'], returns='None'),
        PrototypeCall(constructor='PresentationConnection', fn='send', demands=['PresentationConnection', 'ArrayBuffer'], returns='None'),
        PrototypeCall(constructor='PresentationConnection', fn='send', demands=['PresentationConnection', 'ArrayBufferView'], returns='None'),
        PrototypeCall(constructor='XMLHttpRequest', fn='send', demands=['XMLHttpRequest'], returns='None'),
        PrototypeCall(constructor='XMLHttpRequest', fn='send', demands=['XMLHttpRequest', 'Document'], returns='None'),
    ],
    "RTCDataChannelEvent": [
        NewCall(constructor='RTCDataChannelEvent', demands=['str', 'RTCDataChannelEventInit'], returns='RTCDataChannelEvent'),
    ],
    "insertDTMF": [
        PrototypeCall(constructor='RTCDTMFSender', fn='insertDTMF', demands=['RTCDTMFSender', 'str'], returns='None'),
        PrototypeCall(constructor='RTCDTMFSender', fn='insertDTMF', demands=['RTCDTMFSender', 'str', 'int'], returns='None'),
        PrototypeCall(constructor='RTCDTMFSender', fn='insertDTMF', demands=['RTCDTMFSender', 'str', 'int', 'int'], returns='None'),
    ],
    "RTCDTMFToneChangeEvent": [
        NewCall(constructor='RTCDTMFToneChangeEvent', demands=['str'], returns='RTCDTMFToneChangeEvent'),
        NewCall(constructor='RTCDTMFToneChangeEvent', demands=['str', 'RTCDTMFToneChangeEventInit'], returns='RTCDTMFToneChangeEvent'),
    ],
    "RTCError": [
        NewCall(constructor='RTCError', demands=['RTCErrorInit'], returns='RTCError'),
        NewCall(constructor='RTCError', demands=['RTCErrorInit', 'str'], returns='RTCError'),
    ],
    "RTCErrorEvent": [
        NewCall(constructor='RTCErrorEvent', demands=['str', 'RTCErrorEventInit'], returns='RTCErrorEvent'),
    ],
    "timeRemaining": [
        PrototypeCall(constructor='IdleDeadline', fn='timeRemaining', demands=['IdleDeadline'], returns='float'),
    ],
    "ContentVisibilityAutoStateChangeEvent": [
        NewCall(constructor='ContentVisibilityAutoStateChangeEvent', demands=['str'], returns='ContentVisibilityAutoStateChangeEvent'),
        NewCall(constructor='ContentVisibilityAutoStateChangeEvent', demands=['str', 'ContentVisibilityAutoStateChangeEventInit'], returns='ContentVisibilityAutoStateChangeEvent'),
    ],
    "AmbientLightSensor": [
        NewCall(constructor='AmbientLightSensor', demands=[], returns='AmbientLightSensor'),
        NewCall(constructor='AmbientLightSensor', demands=['SensorOptions'], returns='AmbientLightSensor'),
    ],
    "getPorts": [
        PrototypeCall(constructor='Serial', fn='getPorts', demands=['Serial'], returns='SerialPort'),
    ],
    "requestPort": [
        PrototypeCall(constructor='Serial', fn='requestPort', demands=['Serial'], returns='SerialPort'),
        PrototypeCall(constructor='Serial', fn='requestPort', demands=['Serial', 'SerialPortRequestOptions'], returns='SerialPort'),
    ],
    "getInfo": [
        PrototypeCall(constructor='SerialPort', fn='getInfo', demands=['SerialPort'], returns='SerialPortInfo'),
    ],
    "setSignals": [
        PrototypeCall(constructor='SerialPort', fn='setSignals', demands=['SerialPort'], returns='None'),
        PrototypeCall(constructor='SerialPort', fn='setSignals', demands=['SerialPort', 'SerialOutputSignals'], returns='None'),
    ],
    "getSignals": [
        PrototypeCall(constructor='SerialPort', fn='getSignals', demands=['SerialPort'], returns='SerialInputSignals'),
    ],
    "forget": [
        PrototypeCall(constructor='SerialPort', fn='forget', demands=['SerialPort'], returns='None'),
        PrototypeCall(constructor='HIDDevice', fn='forget', demands=['HIDDevice'], returns='None'),
        PrototypeCall(constructor='BluetoothDevice', fn='forget', demands=['BluetoothDevice'], returns='None'),
        PrototypeCall(constructor='USBDevice', fn='forget', demands=['USBDevice'], returns='None'),
    ],
    "requestPersistentHandle": [
        PrototypeCall(constructor='XRAnchor', fn='requestPersistentHandle', demands=['XRAnchor'], returns='str'),
    ],
    "createContext": [
        PrototypeCall(constructor='ML', fn='createContext', demands=['ML'], returns='MLContext'),
        PrototypeCall(constructor='ML', fn='createContext', demands=['ML', 'MLContextOptions'], returns='MLContext'),
        PrototypeCall(constructor='ML', fn='createContext', demands=['ML', 'GPUDevice'], returns='MLContext'),
    ],
    "dispatch": [
        PrototypeCall(constructor='MLContext', fn='dispatch', demands=['MLContext', 'MLGraph', 'MLNamedTensors', 'MLNamedTensors'], returns='None'),
    ],
    "createTensor": [
        PrototypeCall(constructor='MLContext', fn='createTensor', demands=['MLContext', 'MLTensorDescriptor'], returns='MLTensor'),
    ],
    "createConstantTensor": [
        PrototypeCall(constructor='MLContext', fn='createConstantTensor', demands=['MLContext', 'MLOperandDescriptor', 'AllowSharedBufferSource'], returns='MLTensor'),
    ],
    "readTensor": [
        PrototypeCall(constructor='MLContext', fn='readTensor', demands=['MLContext', 'MLTensor'], returns='ArrayBuffer'),
        PrototypeCall(constructor='MLContext', fn='readTensor', demands=['MLContext', 'MLTensor', 'AllowSharedBufferSource'], returns='None'),
    ],
    "writeTensor": [
        PrototypeCall(constructor='MLContext', fn='writeTensor', demands=['MLContext', 'MLTensor', 'AllowSharedBufferSource'], returns='None'),
    ],
    "opSupportLimits": [
        PrototypeCall(constructor='MLContext', fn='opSupportLimits', demands=['MLContext'], returns='MLOpSupportLimits'),
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
        NewCall(constructor='MLGraphBuilder', demands=['MLContext'], returns='MLGraphBuilder'),
    ],
    "input": [
        PrototypeCall(constructor='MLGraphBuilder', fn='input', demands=['MLGraphBuilder', 'str', 'MLOperandDescriptor'], returns='MLOperand'),
    ],
    "constant": [
        PrototypeCall(constructor='MLGraphBuilder', fn='constant', demands=['MLGraphBuilder', 'MLOperandDescriptor', 'AllowSharedBufferSource'], returns='MLOperand'),
        PrototypeCall(constructor='MLGraphBuilder', fn='constant', demands=['MLGraphBuilder', 'MLOperandDataType', 'MLNumber'], returns='MLOperand'),
        PrototypeCall(constructor='MLGraphBuilder', fn='constant', demands=['MLGraphBuilder', 'MLTensor'], returns='MLOperand'),
    ],
    "build": [
        PrototypeCall(constructor='MLGraphBuilder', fn='build', demands=['MLGraphBuilder', 'MLNamedOperands'], returns='MLGraph'),
    ],
    "JsonLdProcessor": [
        NewCall(constructor='JsonLdProcessor', demands=[], returns='JsonLdProcessor'),
    ],
    "compact": [
        DirectCall(fn='compact', receiver='JsonLdProcessor', demands=['JsonLdInput'], returns='JsonLdRecord'),
        DirectCall(fn='compact', receiver='JsonLdProcessor', demands=['JsonLdInput', 'JsonLdContext'], returns='JsonLdRecord'),
        DirectCall(fn='compact', receiver='JsonLdProcessor', demands=['JsonLdInput', 'JsonLdContext', 'JsonLdOptions'], returns='JsonLdRecord'),
    ],
    "expand": [
        DirectCall(fn='expand', receiver='JsonLdProcessor', demands=['JsonLdInput'], returns='JsonLdRecord'),
        DirectCall(fn='expand', receiver='JsonLdProcessor', demands=['JsonLdInput', 'JsonLdOptions'], returns='JsonLdRecord'),
    ],
    "flatten": [
        DirectCall(fn='flatten', receiver='JsonLdProcessor', demands=['JsonLdInput'], returns='JsonLdRecord'),
        DirectCall(fn='flatten', receiver='JsonLdProcessor', demands=['JsonLdInput', 'JsonLdContext'], returns='JsonLdRecord'),
        DirectCall(fn='flatten', receiver='JsonLdProcessor', demands=['JsonLdInput', 'JsonLdContext', 'JsonLdOptions'], returns='JsonLdRecord'),
    ],
    "fromRdf": [
        DirectCall(fn='fromRdf', receiver='JsonLdProcessor', demands=['RdfDataset'], returns='JsonLdRecord'),
        DirectCall(fn='fromRdf', receiver='JsonLdProcessor', demands=['RdfDataset', 'JsonLdOptions'], returns='JsonLdRecord'),
    ],
    "toRdf": [
        DirectCall(fn='toRdf', receiver='JsonLdProcessor', demands=['JsonLdInput'], returns='RdfDataset'),
        DirectCall(fn='toRdf', receiver='JsonLdProcessor', demands=['JsonLdInput', 'JsonLdOptions'], returns='RdfDataset'),
    ],
    "RdfDataset": [
        NewCall(constructor='RdfDataset', demands=[], returns='RdfDataset'),
    ],
    "add": [
        PrototypeCall(constructor='RdfDataset', fn='add', demands=['RdfDataset', 'str', 'RdfGraph'], returns='None'),
        PrototypeCall(constructor='RdfGraph', fn='add', demands=['RdfGraph', 'RdfTriple'], returns='None'),
        PrototypeCall(constructor='ContentIndex', fn='add', demands=['ContentIndex', 'ContentDescription'], returns='None'),
        PrototypeCall(constructor='HTMLOptionsCollection', fn='add', demands=['HTMLOptionsCollection', 'HTMLOptionElement'], returns='None'),
        PrototypeCall(constructor='HTMLOptionsCollection', fn='add', demands=['HTMLOptionsCollection', 'HTMLOptionElement', 'HTMLElement'], returns='None'),
        PrototypeCall(constructor='HTMLSelectElement', fn='add', demands=['HTMLSelectElement', 'HTMLOptionElement'], returns='None'),
        PrototypeCall(constructor='HTMLSelectElement', fn='add', demands=['HTMLSelectElement', 'HTMLOptionElement', 'HTMLElement'], returns='None'),
        PrototypeCall(constructor='DataTransferItemList', fn='add', demands=['DataTransferItemList', 'str', 'str'], returns='DataTransferItem'),
        PrototypeCall(constructor='DataTransferItemList', fn='add', demands=['DataTransferItemList', 'File'], returns='DataTransferItem'),
        PrototypeCall(constructor='IDBObjectStore', fn='add', demands=['IDBObjectStore', '*'], returns='IDBRequest'),
        PrototypeCall(constructor='IDBObjectStore', fn='add', demands=['IDBObjectStore', '*', '*'], returns='IDBRequest'),
        PrototypeCall(constructor='DOMTokenList', fn='add', demands=['DOMTokenList', 'str'], returns='None'),
        PrototypeCall(constructor='Cache', fn='add', demands=['Cache', 'RequestInfo'], returns='None'),
        PrototypeCall(constructor='CSSNumericValue', fn='add', demands=['CSSNumericValue', 'CSSNumberish'], returns='CSSNumericValue'),
        PrototypeCall(constructor='FontFaceSet', fn='add', demands=['FontFaceSet', 'FontFace'], returns='FontFaceSet'),
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
        NewCall(constructor='CapturedMouseEvent', demands=['str'], returns='CapturedMouseEvent'),
        NewCall(constructor='CapturedMouseEvent', demands=['str', 'CapturedMouseEventInit'], returns='CapturedMouseEvent'),
    ],
    "subscribe": [
        PrototypeCall(constructor='PushManager', fn='subscribe', demands=['PushManager'], returns='PushSubscription'),
        PrototypeCall(constructor='PushManager', fn='subscribe', demands=['PushManager', 'PushSubscriptionOptionsInit'], returns='PushSubscription'),
        PrototypeCall(constructor='CookieStoreManager', fn='subscribe', demands=['CookieStoreManager', 'CookieStoreGetOptions'], returns='None'),
        PrototypeCall(constructor='Observable', fn='subscribe', demands=['Observable'], returns='None'),
        PrototypeCall(constructor='Observable', fn='subscribe', demands=['Observable', 'ObserverUnion'], returns='None'),
        PrototypeCall(constructor='Observable', fn='subscribe', demands=['Observable', 'ObserverUnion', 'SubscribeOptions'], returns='None'),
    ],
    "getSubscription": [
        PrototypeCall(constructor='PushManager', fn='getSubscription', demands=['PushManager'], returns='PushSubscription'),
    ],
    "permissionState": [
        PrototypeCall(constructor='PushManager', fn='permissionState', demands=['PushManager'], returns='PermissionState'),
        PrototypeCall(constructor='PushManager', fn='permissionState', demands=['PushManager', 'PushSubscriptionOptionsInit'], returns='PermissionState'),
    ],
    "getKey": [
        PrototypeCall(constructor='PushSubscription', fn='getKey', demands=['PushSubscription', 'PushEncryptionKeyName'], returns='ArrayBuffer'),
        PrototypeCall(constructor='IDBObjectStore', fn='getKey', demands=['IDBObjectStore', '*'], returns='IDBRequest'),
        PrototypeCall(constructor='IDBIndex', fn='getKey', demands=['IDBIndex', '*'], returns='IDBRequest'),
    ],
    "unsubscribe": [
        PrototypeCall(constructor='PushSubscription', fn='unsubscribe', demands=['PushSubscription'], returns='bool'),
        PrototypeCall(constructor='CookieStoreManager', fn='unsubscribe', demands=['CookieStoreManager', 'CookieStoreGetOptions'], returns='None'),
    ],
    "arrayBuffer": [
        PrototypeCall(constructor='PushMessageData', fn='arrayBuffer', demands=['PushMessageData'], returns='ArrayBuffer'),
        PrototypeCall(constructor='Blob', fn='arrayBuffer', demands=['Blob'], returns='ArrayBuffer'),
    ],
    "blob": [
        PrototypeCall(constructor='PushMessageData', fn='blob', demands=['PushMessageData'], returns='Blob'),
        PrototypeCall(constructor='FontData', fn='blob', demands=['FontData'], returns='Blob'),
    ],
    "bytes": [
        PrototypeCall(constructor='PushMessageData', fn='bytes', demands=['PushMessageData'], returns='Uint8Array'),
        PrototypeCall(constructor='Blob', fn='bytes', demands=['Blob'], returns='Uint8Array'),
    ],
    "json": [
        PrototypeCall(constructor='PushMessageData', fn='json', demands=['PushMessageData'], returns='*'),
        DirectCall(fn='json', receiver='Response', demands=['*'], returns='Response'),
        DirectCall(fn='json', receiver='Response', demands=['*', 'ResponseInit'], returns='Response'),
    ],
    "text": [
        PrototypeCall(constructor='PushMessageData', fn='text', demands=['PushMessageData'], returns='str'),
        PrototypeCall(constructor='Blob', fn='text', demands=['Blob'], returns='str'),
    ],
    "PushEvent": [
        NewCall(constructor='PushEvent', demands=['str'], returns='PushEvent'),
        NewCall(constructor='PushEvent', demands=['str', 'PushEventInit'], returns='PushEvent'),
    ],
    "PushSubscriptionChangeEvent": [
        NewCall(constructor='PushSubscriptionChangeEvent', demands=['str'], returns='PushSubscriptionChangeEvent'),
        NewCall(constructor='PushSubscriptionChangeEvent', demands=['str', 'PushSubscriptionChangeEventInit'], returns='PushSubscriptionChangeEvent'),
    ],
    "requestWindow": [
        PrototypeCall(constructor='DocumentPictureInPicture', fn='requestWindow', demands=['DocumentPictureInPicture'], returns='Window'),
        PrototypeCall(constructor='DocumentPictureInPicture', fn='requestWindow', demands=['DocumentPictureInPicture', 'DocumentPictureInPictureOptions'], returns='Window'),
    ],
    "DocumentPictureInPictureEvent": [
        NewCall(constructor='DocumentPictureInPictureEvent', demands=['str', 'DocumentPictureInPictureEventInit'], returns='DocumentPictureInPictureEvent'),
    ],
    "isSameEntry": [
        PrototypeCall(constructor='FileSystemHandle', fn='isSameEntry', demands=['FileSystemHandle', 'FileSystemHandle'], returns='bool'),
    ],
    "getFile": [
        PrototypeCall(constructor='FileSystemFileHandle', fn='getFile', demands=['FileSystemFileHandle'], returns='File'),
        PrototypeCall(constructor='FileSystemDirectoryEntry', fn='getFile', demands=['FileSystemDirectoryEntry'], returns='None'),
        PrototypeCall(constructor='FileSystemDirectoryEntry', fn='getFile', demands=['FileSystemDirectoryEntry', 'str'], returns='None'),
        PrototypeCall(constructor='FileSystemDirectoryEntry', fn='getFile', demands=['FileSystemDirectoryEntry', 'str', 'FileSystemFlags'], returns='None'),
        PrototypeCall(constructor='FileSystemDirectoryEntry', fn='getFile', demands=['FileSystemDirectoryEntry', 'str', 'FileSystemFlags', 'FileSystemEntryCallback'], returns='None'),
        PrototypeCall(constructor='FileSystemDirectoryEntry', fn='getFile', demands=['FileSystemDirectoryEntry', 'str', 'FileSystemFlags', 'FileSystemEntryCallback', 'ErrorCallback'], returns='None'),
    ],
    "createWritable": [
        PrototypeCall(constructor='FileSystemFileHandle', fn='createWritable', demands=['FileSystemFileHandle'], returns='FileSystemWritableFileStream'),
        PrototypeCall(constructor='FileSystemFileHandle', fn='createWritable', demands=['FileSystemFileHandle', 'FileSystemCreateWritableOptions'], returns='FileSystemWritableFileStream'),
        PrototypeCall(constructor='WebTransportDatagramDuplexStream', fn='createWritable', demands=['WebTransportDatagramDuplexStream'], returns='WebTransportDatagramsWritable'),
        PrototypeCall(constructor='WebTransportDatagramDuplexStream', fn='createWritable', demands=['WebTransportDatagramDuplexStream', 'WebTransportSendOptions'], returns='WebTransportDatagramsWritable'),
    ],
    "createSyncAccessHandle": [
        PrototypeCall(constructor='FileSystemFileHandle', fn='createSyncAccessHandle', demands=['FileSystemFileHandle'], returns='FileSystemSyncAccessHandle'),
    ],
    "getFileHandle": [
        PrototypeCall(constructor='FileSystemDirectoryHandle', fn='getFileHandle', demands=['FileSystemDirectoryHandle', 'str'], returns='FileSystemFileHandle'),
        PrototypeCall(constructor='FileSystemDirectoryHandle', fn='getFileHandle', demands=['FileSystemDirectoryHandle', 'str', 'FileSystemGetFileOptions'], returns='FileSystemFileHandle'),
    ],
    "getDirectoryHandle": [
        PrototypeCall(constructor='FileSystemDirectoryHandle', fn='getDirectoryHandle', demands=['FileSystemDirectoryHandle', 'str'], returns='FileSystemDirectoryHandle'),
        PrototypeCall(constructor='FileSystemDirectoryHandle', fn='getDirectoryHandle', demands=['FileSystemDirectoryHandle', 'str', 'FileSystemGetDirectoryOptions'], returns='FileSystemDirectoryHandle'),
    ],
    "removeEntry": [
        PrototypeCall(constructor='FileSystemDirectoryHandle', fn='removeEntry', demands=['FileSystemDirectoryHandle', 'str'], returns='None'),
        PrototypeCall(constructor='FileSystemDirectoryHandle', fn='removeEntry', demands=['FileSystemDirectoryHandle', 'str', 'FileSystemRemoveOptions'], returns='None'),
    ],
    "resolve": [
        PrototypeCall(constructor='FileSystemDirectoryHandle', fn='resolve', demands=['FileSystemDirectoryHandle', 'FileSystemHandle'], returns='str'),
        DirectCall(fn='resolve', receiver='IdentityProvider', demands=['str'], returns='None'),
        DirectCall(fn='resolve', receiver='IdentityProvider', demands=['str', 'IdentityResolveOptions'], returns='None'),
    ],
    "seek": [
        PrototypeCall(constructor='FileSystemWritableFileStream', fn='seek', demands=['FileSystemWritableFileStream', 'int'], returns='None'),
    ],
    "truncate": [
        PrototypeCall(constructor='FileSystemWritableFileStream', fn='truncate', demands=['FileSystemWritableFileStream', 'int'], returns='None'),
        PrototypeCall(constructor='FileSystemSyncAccessHandle', fn='truncate', demands=['FileSystemSyncAccessHandle', 'int'], returns='None'),
    ],
    "getSize": [
        PrototypeCall(constructor='FileSystemSyncAccessHandle', fn='getSize', demands=['FileSystemSyncAccessHandle'], returns='int'),
    ],
    "flush": [
        PrototypeCall(constructor='FileSystemSyncAccessHandle', fn='flush', demands=['FileSystemSyncAccessHandle'], returns='None'),
        PrototypeCall(constructor='AudioDecoder', fn='flush', demands=['AudioDecoder'], returns='None'),
        PrototypeCall(constructor='VideoDecoder', fn='flush', demands=['VideoDecoder'], returns='None'),
        PrototypeCall(constructor='AudioEncoder', fn='flush', demands=['AudioEncoder'], returns='None'),
        PrototypeCall(constructor='VideoEncoder', fn='flush', demands=['VideoEncoder'], returns='None'),
    ],
    "ProximitySensor": [
        NewCall(constructor='ProximitySensor', demands=[], returns='ProximitySensor'),
        NewCall(constructor='ProximitySensor', demands=['SensorOptions'], returns='ProximitySensor'),
    ],
    "registerPaint": [
        PrototypeCall(constructor='PaintWorkletGlobalScope', fn='registerPaint', demands=['PaintWorkletGlobalScope', 'str', 'VoidFunction'], returns='None'),
    ],
    "DataCue": [
        NewCall(constructor='DataCue', demands=['float', 'float', '*'], returns='DataCue'),
        NewCall(constructor='DataCue', demands=['float', 'float', '*', 'str'], returns='DataCue'),
    ],
    "query": [
        PrototypeCall(constructor='Permissions', fn='query', demands=['Permissions', 'object'], returns='PermissionStatus'),
        PrototypeCall(constructor='LockManager', fn='query', demands=['LockManager'], returns='LockManagerSnapshot'),
    ],
    "ContentIndexEvent": [
        NewCall(constructor='ContentIndexEvent', demands=['str', 'ContentIndexEventInit'], returns='ContentIndexEvent'),
    ],
    "EditContext": [
        NewCall(constructor='EditContext', demands=[], returns='EditContext'),
        NewCall(constructor='EditContext', demands=['EditContextInit'], returns='EditContext'),
    ],
    "updateText": [
        PrototypeCall(constructor='EditContext', fn='updateText', demands=['EditContext', 'int', 'int', 'str'], returns='None'),
    ],
    "updateSelection": [
        PrototypeCall(constructor='EditContext', fn='updateSelection', demands=['EditContext', 'int', 'int'], returns='None'),
    ],
    "updateControlBounds": [
        PrototypeCall(constructor='EditContext', fn='updateControlBounds', demands=['EditContext', 'DOMRect'], returns='None'),
    ],
    "updateSelectionBounds": [
        PrototypeCall(constructor='EditContext', fn='updateSelectionBounds', demands=['EditContext', 'DOMRect'], returns='None'),
    ],
    "updateCharacterBounds": [
        PrototypeCall(constructor='EditContext', fn='updateCharacterBounds', demands=['EditContext', 'int', 'DOMRect'], returns='None'),
    ],
    "attachedElements": [
        PrototypeCall(constructor='EditContext', fn='attachedElements', demands=['EditContext'], returns='HTMLElement'),
    ],
    "characterBounds": [
        PrototypeCall(constructor='EditContext', fn='characterBounds', demands=['EditContext'], returns='DOMRect'),
    ],
    "TextUpdateEvent": [
        NewCall(constructor='TextUpdateEvent', demands=['str'], returns='TextUpdateEvent'),
        NewCall(constructor='TextUpdateEvent', demands=['str', 'TextUpdateEventInit'], returns='TextUpdateEvent'),
    ],
    "TextFormat": [
        NewCall(constructor='TextFormat', demands=[], returns='TextFormat'),
        NewCall(constructor='TextFormat', demands=['TextFormatInit'], returns='TextFormat'),
    ],
    "TextFormatUpdateEvent": [
        NewCall(constructor='TextFormatUpdateEvent', demands=['str'], returns='TextFormatUpdateEvent'),
        NewCall(constructor='TextFormatUpdateEvent', demands=['str', 'TextFormatUpdateEventInit'], returns='TextFormatUpdateEvent'),
    ],
    "getTextFormats": [
        PrototypeCall(constructor='TextFormatUpdateEvent', fn='getTextFormats', demands=['TextFormatUpdateEvent'], returns='TextFormat'),
    ],
    "CharacterBoundsUpdateEvent": [
        NewCall(constructor='CharacterBoundsUpdateEvent', demands=['str'], returns='CharacterBoundsUpdateEvent'),
        NewCall(constructor='CharacterBoundsUpdateEvent', demands=['str', 'CharacterBoundsUpdateEventInit'], returns='CharacterBoundsUpdateEvent'),
    ],
    "getRegions": [
        PrototypeCall(constructor='NamedFlow', fn='getRegions', demands=['NamedFlow'], returns='Element'),
    ],
    "getContent": [
        PrototypeCall(constructor='NamedFlow', fn='getContent', demands=['NamedFlow'], returns='Node'),
    ],
    "getRegionsByContent": [
        PrototypeCall(constructor='NamedFlow', fn='getRegionsByContent', demands=['NamedFlow', 'Node'], returns='Element'),
    ],
    "": [
        PrototypeCall(constructor='HTMLAllCollection', fn='', demands=['HTMLAllCollection', 'int'], returns='Element'),
        PrototypeCall(constructor='HTMLOptionsCollection', fn='', demands=['HTMLOptionsCollection', 'int', 'HTMLOptionElement'], returns='None'),
        PrototypeCall(constructor='DOMStringMap', fn='', demands=['DOMStringMap', 'str'], returns='str'),
        PrototypeCall(constructor='DOMStringMap', fn='', demands=['DOMStringMap', 'str', 'str'], returns='None'),
        PrototypeCall(constructor='DOMStringMap', fn='', demands=['DOMStringMap', 'str'], returns='None'),
        PrototypeCall(constructor='AudioTrackList', fn='', demands=['AudioTrackList', 'int'], returns='AudioTrack'),
        PrototypeCall(constructor='VideoTrackList', fn='', demands=['VideoTrackList', 'int'], returns='VideoTrack'),
        PrototypeCall(constructor='TextTrackList', fn='', demands=['TextTrackList', 'int'], returns='TextTrack'),
        PrototypeCall(constructor='TextTrackCueList', fn='', demands=['TextTrackCueList', 'int'], returns='TextTrackCue'),
        PrototypeCall(constructor='HTMLFormElement', fn='', demands=['HTMLFormElement', 'int'], returns='Element'),
        PrototypeCall(constructor='HTMLFormElement', fn='', demands=['HTMLFormElement', 'str'], returns='RadioNodeList'),
        PrototypeCall(constructor='HTMLSelectElement', fn='', demands=['HTMLSelectElement', 'int', 'HTMLOptionElement'], returns='None'),
        PrototypeCall(constructor='DataTransferItemList', fn='', demands=['DataTransferItemList', 'int'], returns='DataTransferItem'),
        PrototypeCall(constructor='Window', fn='', demands=['Window', 'str'], returns='object'),
        PrototypeCall(constructor='SourceBufferList', fn='', demands=['SourceBufferList', 'int'], returns='SourceBuffer'),
        PrototypeCall(constructor='ImageTrackList', fn='', demands=['ImageTrackList', 'int'], returns='ImageTrack'),
        PrototypeCall(constructor='CSSKeyframesRule', fn='', demands=['CSSKeyframesRule', 'int'], returns='CSSKeyframeRule'),
        PrototypeCall(constructor='CSSUnparsedValue', fn='', demands=['CSSUnparsedValue', 'int'], returns='CSSUnparsedSegment'),
        PrototypeCall(constructor='CSSUnparsedValue', fn='', demands=['CSSUnparsedValue', 'int', 'CSSUnparsedSegment'], returns='None'),
        PrototypeCall(constructor='CSSNumericArray', fn='', demands=['CSSNumericArray', 'int'], returns='CSSNumericValue'),
        PrototypeCall(constructor='CSSTransformValue', fn='', demands=['CSSTransformValue', 'int'], returns='CSSTransformComponent'),
        PrototypeCall(constructor='CSSTransformValue', fn='', demands=['CSSTransformValue', 'int', 'CSSTransformComponent'], returns='None'),
        PrototypeCall(constructor='XRInputSourceArray', fn='', demands=['XRInputSourceArray', 'int'], returns='XRInputSource'),
        PrototypeCall(constructor='FontFacePalette', fn='', demands=['FontFacePalette', 'int'], returns='str'),
        PrototypeCall(constructor='FontFacePalettes', fn='', demands=['FontFacePalettes', 'int'], returns='FontFacePalette'),
        PrototypeCall(constructor='SVGNumberList', fn='', demands=['SVGNumberList', 'int', 'SVGNumber'], returns='None'),
        PrototypeCall(constructor='SVGLengthList', fn='', demands=['SVGLengthList', 'int', 'SVGLength'], returns='None'),
        PrototypeCall(constructor='SVGStringList', fn='', demands=['SVGStringList', 'int', 'str'], returns='None'),
        PrototypeCall(constructor='SVGTransformList', fn='', demands=['SVGTransformList', 'int', 'SVGTransform'], returns='None'),
        PrototypeCall(constructor='SVGPointList', fn='', demands=['SVGPointList', 'int', 'DOMPoint'], returns='None'),
    ],
    "namedItem": [
        PrototypeCall(constructor='HTMLAllCollection', fn='namedItem', demands=['HTMLAllCollection', 'str'], returns='HTMLCollection'),
        PrototypeCall(constructor='HTMLFormControlsCollection', fn='namedItem', demands=['HTMLFormControlsCollection', 'str'], returns='RadioNodeList'),
        PrototypeCall(constructor='HTMLSelectElement', fn='namedItem', demands=['HTMLSelectElement', 'str'], returns='HTMLOptionElement'),
        PrototypeCall(constructor='PluginArray', fn='namedItem', demands=['PluginArray', 'str'], returns='Plugin'),
        PrototypeCall(constructor='MimeTypeArray', fn='namedItem', demands=['MimeTypeArray', 'str'], returns='MimeType'),
        PrototypeCall(constructor='Plugin', fn='namedItem', demands=['Plugin', 'str'], returns='MimeType'),
        PrototypeCall(constructor='HTMLCollection', fn='namedItem', demands=['HTMLCollection', 'str'], returns='Element'),
    ],
    "item": [
        PrototypeCall(constructor='HTMLAllCollection', fn='item', demands=['HTMLAllCollection'], returns='HTMLCollection'),
        PrototypeCall(constructor='HTMLAllCollection', fn='item', demands=['HTMLAllCollection', 'str'], returns='HTMLCollection'),
        PrototypeCall(constructor='DOMStringList', fn='item', demands=['DOMStringList', 'int'], returns='str'),
        PrototypeCall(constructor='HTMLSelectElement', fn='item', demands=['HTMLSelectElement', 'int'], returns='HTMLOptionElement'),
        PrototypeCall(constructor='PluginArray', fn='item', demands=['PluginArray', 'int'], returns='Plugin'),
        PrototypeCall(constructor='MimeTypeArray', fn='item', demands=['MimeTypeArray', 'int'], returns='MimeType'),
        PrototypeCall(constructor='Plugin', fn='item', demands=['Plugin', 'int'], returns='MimeType'),
        PrototypeCall(constructor='NodeList', fn='item', demands=['NodeList', 'int'], returns='Node'),
        PrototypeCall(constructor='HTMLCollection', fn='item', demands=['HTMLCollection', 'int'], returns='Element'),
        PrototypeCall(constructor='NamedNodeMap', fn='item', demands=['NamedNodeMap', 'int'], returns='Attr'),
        PrototypeCall(constructor='DOMTokenList', fn='item', demands=['DOMTokenList', 'int'], returns='str'),
        PrototypeCall(constructor='SpeechRecognitionResult', fn='item', demands=['SpeechRecognitionResult', 'int'], returns='SpeechRecognitionAlternative'),
        PrototypeCall(constructor='SpeechRecognitionResultList', fn='item', demands=['SpeechRecognitionResultList', 'int'], returns='SpeechRecognitionResult'),
        PrototypeCall(constructor='SpeechGrammarList', fn='item', demands=['SpeechGrammarList', 'int'], returns='SpeechGrammar'),
        PrototypeCall(constructor='DOMRectList', fn='item', demands=['DOMRectList', 'int'], returns='DOMRect'),
        PrototypeCall(constructor='TouchList', fn='item', demands=['TouchList', 'int'], returns='Touch'),
        PrototypeCall(constructor='AnimationNodeList', fn='item', demands=['AnimationNodeList', 'int'], returns='AnimationEffect'),
        PrototypeCall(constructor='MediaList', fn='item', demands=['MediaList', 'int'], returns='CSSOMString'),
        PrototypeCall(constructor='StyleSheetList', fn='item', demands=['StyleSheetList', 'int'], returns='CSSStyleSheet'),
        PrototypeCall(constructor='CSSRuleList', fn='item', demands=['CSSRuleList', 'int'], returns='CSSRule'),
        PrototypeCall(constructor='CSSStyleDeclaration', fn='item', demands=['CSSStyleDeclaration', 'int'], returns='CSSOMString'),
        PrototypeCall(constructor='FileList', fn='item', demands=['FileList', 'int'], returns='File'),
    ],
    "remove": [
        PrototypeCall(constructor='HTMLOptionsCollection', fn='remove', demands=['HTMLOptionsCollection', 'int'], returns='None'),
        PrototypeCall(constructor='HTMLSelectElement', fn='remove', demands=['HTMLSelectElement'], returns='None'),
        PrototypeCall(constructor='HTMLSelectElement', fn='remove', demands=['HTMLSelectElement', 'int'], returns='None'),
        PrototypeCall(constructor='DataTransferItemList', fn='remove', demands=['DataTransferItemList', 'int'], returns='None'),
        PrototypeCall(constructor='SourceBuffer', fn='remove', demands=['SourceBuffer', 'float', 'float'], returns='None'),
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
    "attachInternals": [
        PrototypeCall(constructor='HTMLElement', fn='attachInternals', demands=['HTMLElement'], returns='ElementInternals'),
    ],
    "showPopover": [
        PrototypeCall(constructor='HTMLElement', fn='showPopover', demands=['HTMLElement'], returns='None'),
        PrototypeCall(constructor='HTMLElement', fn='showPopover', demands=['HTMLElement', 'ShowPopoverOptions'], returns='None'),
    ],
    "hidePopover": [
        PrototypeCall(constructor='HTMLElement', fn='hidePopover', demands=['HTMLElement'], returns='None'),
    ],
    "togglePopover": [
        PrototypeCall(constructor='HTMLElement', fn='togglePopover', demands=['HTMLElement'], returns='bool'),
        PrototypeCall(constructor='HTMLElement', fn='togglePopover', demands=['HTMLElement', 'TogglePopoverOptions'], returns='bool'),
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
        PrototypeCall(constructor='AudioDecoder', fn='decode', demands=['AudioDecoder', 'EncodedAudioChunk'], returns='None'),
        PrototypeCall(constructor='VideoDecoder', fn='decode', demands=['VideoDecoder', 'EncodedVideoChunk'], returns='None'),
        PrototypeCall(constructor='ImageDecoder', fn='decode', demands=['ImageDecoder'], returns='ImageDecodeResult'),
        PrototypeCall(constructor='ImageDecoder', fn='decode', demands=['ImageDecoder', 'ImageDecodeOptions'], returns='ImageDecodeResult'),
        PrototypeCall(constructor='TextDecoder', fn='decode', demands=['TextDecoder'], returns='str'),
        PrototypeCall(constructor='TextDecoder', fn='decode', demands=['TextDecoder', 'AllowSharedBufferSource'], returns='str'),
        PrototypeCall(constructor='TextDecoder', fn='decode', demands=['TextDecoder', 'AllowSharedBufferSource', 'TextDecodeOptions'], returns='str'),
    ],
    "HTMLIFrameElement": [
        NewCall(constructor='HTMLIFrameElement', demands=[], returns='HTMLIFrameElement'),
    ],
    "getSVGDocument": [
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
    "checkValidity": [
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
    "reportValidity": [
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
    "setCustomValidity": [
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
        PrototypeCall(constructor='FontFace', fn='load', demands=['FontFace'], returns='FontFace'),
        PrototypeCall(constructor='FontFaceSet', fn='load', demands=['FontFaceSet', 'CSSOMString'], returns='FontFace'),
        PrototypeCall(constructor='FontFaceSet', fn='load', demands=['FontFaceSet', 'CSSOMString', 'CSSOMString'], returns='FontFace'),
    ],
    "canPlayType": [
        PrototypeCall(constructor='HTMLMediaElement', fn='canPlayType', demands=['HTMLMediaElement', 'str'], returns='CanPlayTypeResult'),
    ],
    "fastSeek": [
        PrototypeCall(constructor='HTMLMediaElement', fn='fastSeek', demands=['HTMLMediaElement', 'float'], returns='None'),
    ],
    "getStartDate": [
        PrototypeCall(constructor='HTMLMediaElement', fn='getStartDate', demands=['HTMLMediaElement'], returns='object'),
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
    "addTextTrack": [
        PrototypeCall(constructor='HTMLMediaElement', fn='addTextTrack', demands=['HTMLMediaElement', 'TextTrackKind'], returns='TextTrack'),
        PrototypeCall(constructor='HTMLMediaElement', fn='addTextTrack', demands=['HTMLMediaElement', 'TextTrackKind', 'str'], returns='TextTrack'),
        PrototypeCall(constructor='HTMLMediaElement', fn='addTextTrack', demands=['HTMLMediaElement', 'TextTrackKind', 'str', 'str'], returns='TextTrack'),
    ],
    "addCue": [
        PrototypeCall(constructor='TextTrack', fn='addCue', demands=['TextTrack', 'TextTrackCue'], returns='None'),
    ],
    "removeCue": [
        PrototypeCall(constructor='TextTrack', fn='removeCue', demands=['TextTrack', 'TextTrackCue'], returns='None'),
    ],
    "getCueById": [
        PrototypeCall(constructor='TextTrackCueList', fn='getCueById', demands=['TextTrackCueList', 'str'], returns='TextTrackCue'),
    ],
    "start": [
        PrototypeCall(constructor='TimeRanges', fn='start', demands=['TimeRanges', 'int'], returns='float'),
        PrototypeCall(constructor='MessagePort', fn='start', demands=['MessagePort'], returns='None'),
        PrototypeCall(constructor='HTMLMarqueeElement', fn='start', demands=['HTMLMarqueeElement'], returns='None'),
        PrototypeCall(constructor='MediaRecorder', fn='start', demands=['MediaRecorder'], returns='None'),
        PrototypeCall(constructor='MediaRecorder', fn='start', demands=['MediaRecorder', 'int'], returns='None'),
        PrototypeCall(constructor='Sensor', fn='start', demands=['Sensor'], returns='None'),
        PrototypeCall(constructor='SpeechRecognition', fn='start', demands=['SpeechRecognition'], returns='None'),
        PrototypeCall(constructor='SpeechRecognition', fn='start', demands=['SpeechRecognition', 'MediaStreamTrack'], returns='None'),
        PrototypeCall(constructor='PresentationRequest', fn='start', demands=['PresentationRequest'], returns='PresentationConnection'),
        PrototypeCall(constructor='IdleDetector', fn='start', demands=['IdleDetector'], returns='None'),
        PrototypeCall(constructor='IdleDetector', fn='start', demands=['IdleDetector', 'IdleOptions'], returns='None'),
        PrototypeCall(constructor='AudioScheduledSourceNode', fn='start', demands=['AudioScheduledSourceNode'], returns='None'),
        PrototypeCall(constructor='AudioScheduledSourceNode', fn='start', demands=['AudioScheduledSourceNode', 'float'], returns='None'),
        PrototypeCall(constructor='AudioBufferSourceNode', fn='start', demands=['AudioBufferSourceNode'], returns='None'),
        PrototypeCall(constructor='AudioBufferSourceNode', fn='start', demands=['AudioBufferSourceNode', 'float'], returns='None'),
        PrototypeCall(constructor='AudioBufferSourceNode', fn='start', demands=['AudioBufferSourceNode', 'float', 'float'], returns='None'),
        PrototypeCall(constructor='AudioBufferSourceNode', fn='start', demands=['AudioBufferSourceNode', 'float', 'float', 'float'], returns='None'),
    ],
    "end": [
        PrototypeCall(constructor='TimeRanges', fn='end', demands=['TimeRanges', 'int'], returns='float'),
        PrototypeCall(constructor='GPUComputePassEncoder', fn='end', demands=['GPUComputePassEncoder'], returns='None'),
        PrototypeCall(constructor='GPURenderPassEncoder', fn='end', demands=['GPURenderPassEncoder'], returns='None'),
        PrototypeCall(constructor='XRSession', fn='end', demands=['XRSession'], returns='None'),
    ],
    "TrackEvent": [
        NewCall(constructor='TrackEvent', demands=['str'], returns='TrackEvent'),
        NewCall(constructor='TrackEvent', demands=['str', 'TrackEventInit'], returns='TrackEvent'),
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
    "createCaption": [
        PrototypeCall(constructor='HTMLTableElement', fn='createCaption', demands=['HTMLTableElement'], returns='HTMLTableCaptionElement'),
    ],
    "deleteCaption": [
        PrototypeCall(constructor='HTMLTableElement', fn='deleteCaption', demands=['HTMLTableElement'], returns='None'),
    ],
    "createTHead": [
        PrototypeCall(constructor='HTMLTableElement', fn='createTHead', demands=['HTMLTableElement'], returns='HTMLTableSectionElement'),
    ],
    "deleteTHead": [
        PrototypeCall(constructor='HTMLTableElement', fn='deleteTHead', demands=['HTMLTableElement'], returns='None'),
    ],
    "createTFoot": [
        PrototypeCall(constructor='HTMLTableElement', fn='createTFoot', demands=['HTMLTableElement'], returns='HTMLTableSectionElement'),
    ],
    "deleteTFoot": [
        PrototypeCall(constructor='HTMLTableElement', fn='deleteTFoot', demands=['HTMLTableElement'], returns='None'),
    ],
    "createTBody": [
        PrototypeCall(constructor='HTMLTableElement', fn='createTBody', demands=['HTMLTableElement'], returns='HTMLTableSectionElement'),
    ],
    "insertRow": [
        PrototypeCall(constructor='HTMLTableElement', fn='insertRow', demands=['HTMLTableElement'], returns='HTMLTableRowElement'),
        PrototypeCall(constructor='HTMLTableElement', fn='insertRow', demands=['HTMLTableElement', 'int'], returns='HTMLTableRowElement'),
        PrototypeCall(constructor='HTMLTableSectionElement', fn='insertRow', demands=['HTMLTableSectionElement'], returns='HTMLTableRowElement'),
        PrototypeCall(constructor='HTMLTableSectionElement', fn='insertRow', demands=['HTMLTableSectionElement', 'int'], returns='HTMLTableRowElement'),
    ],
    "deleteRow": [
        PrototypeCall(constructor='HTMLTableElement', fn='deleteRow', demands=['HTMLTableElement', 'int'], returns='None'),
        PrototypeCall(constructor='HTMLTableSectionElement', fn='deleteRow', demands=['HTMLTableSectionElement', 'int'], returns='None'),
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
    "insertCell": [
        PrototypeCall(constructor='HTMLTableRowElement', fn='insertCell', demands=['HTMLTableRowElement'], returns='HTMLTableCellElement'),
        PrototypeCall(constructor='HTMLTableRowElement', fn='insertCell', demands=['HTMLTableRowElement', 'int'], returns='HTMLTableCellElement'),
    ],
    "deleteCell": [
        PrototypeCall(constructor='HTMLTableRowElement', fn='deleteCell', demands=['HTMLTableRowElement', 'int'], returns='None'),
    ],
    "HTMLTableCellElement": [
        NewCall(constructor='HTMLTableCellElement', demands=[], returns='HTMLTableCellElement'),
    ],
    "HTMLFormElement": [
        NewCall(constructor='HTMLFormElement', demands=[], returns='HTMLFormElement'),
    ],
    "submit": [
        PrototypeCall(constructor='HTMLFormElement', fn='submit', demands=['HTMLFormElement'], returns='None'),
        PrototypeCall(constructor='GPUQueue', fn='submit', demands=['GPUQueue', 'GPUCommandBuffer'], returns='None'),
    ],
    "requestSubmit": [
        PrototypeCall(constructor='HTMLFormElement', fn='requestSubmit', demands=['HTMLFormElement'], returns='None'),
        PrototypeCall(constructor='HTMLFormElement', fn='requestSubmit', demands=['HTMLFormElement', 'HTMLElement'], returns='None'),
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
        PrototypeCall(constructor='GamepadHapticActuator', fn='reset', demands=['GamepadHapticActuator'], returns='GamepadHapticsResult'),
    ],
    "HTMLLabelElement": [
        NewCall(constructor='HTMLLabelElement', demands=[], returns='HTMLLabelElement'),
    ],
    "HTMLInputElement": [
        NewCall(constructor='HTMLInputElement', demands=[], returns='HTMLInputElement'),
    ],
    "stepUp": [
        PrototypeCall(constructor='HTMLInputElement', fn='stepUp', demands=['HTMLInputElement'], returns='None'),
        PrototypeCall(constructor='HTMLInputElement', fn='stepUp', demands=['HTMLInputElement', 'int'], returns='None'),
    ],
    "stepDown": [
        PrototypeCall(constructor='HTMLInputElement', fn='stepDown', demands=['HTMLInputElement'], returns='None'),
        PrototypeCall(constructor='HTMLInputElement', fn='stepDown', demands=['HTMLInputElement', 'int'], returns='None'),
    ],
    "select": [
        PrototypeCall(constructor='HTMLInputElement', fn='select', demands=['HTMLInputElement'], returns='None'),
        PrototypeCall(constructor='HTMLTextAreaElement', fn='select', demands=['HTMLTextAreaElement'], returns='None'),
        PrototypeCall(constructor='ContactsManager', fn='select', demands=['ContactsManager', 'ContactProperty'], returns='ContactInfo'),
        PrototypeCall(constructor='ContactsManager', fn='select', demands=['ContactsManager', 'ContactProperty', 'ContactsSelectOptions'], returns='ContactInfo'),
    ],
    "setRangeText": [
        PrototypeCall(constructor='HTMLInputElement', fn='setRangeText', demands=['HTMLInputElement', 'str'], returns='None'),
        PrototypeCall(constructor='HTMLInputElement', fn='setRangeText', demands=['HTMLInputElement', 'str', 'int', 'int'], returns='None'),
        PrototypeCall(constructor='HTMLInputElement', fn='setRangeText', demands=['HTMLInputElement', 'str', 'int', 'int', 'SelectionMode'], returns='None'),
        PrototypeCall(constructor='HTMLTextAreaElement', fn='setRangeText', demands=['HTMLTextAreaElement', 'str'], returns='None'),
        PrototypeCall(constructor='HTMLTextAreaElement', fn='setRangeText', demands=['HTMLTextAreaElement', 'str', 'int', 'int'], returns='None'),
        PrototypeCall(constructor='HTMLTextAreaElement', fn='setRangeText', demands=['HTMLTextAreaElement', 'str', 'int', 'int', 'SelectionMode'], returns='None'),
    ],
    "setSelectionRange": [
        PrototypeCall(constructor='HTMLInputElement', fn='setSelectionRange', demands=['HTMLInputElement', 'int', 'int'], returns='None'),
        PrototypeCall(constructor='HTMLInputElement', fn='setSelectionRange', demands=['HTMLInputElement', 'int', 'int', 'str'], returns='None'),
        PrototypeCall(constructor='HTMLTextAreaElement', fn='setSelectionRange', demands=['HTMLTextAreaElement', 'int', 'int'], returns='None'),
        PrototypeCall(constructor='HTMLTextAreaElement', fn='setSelectionRange', demands=['HTMLTextAreaElement', 'int', 'int', 'str'], returns='None'),
    ],
    "showPicker": [
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
        NewCall(constructor='SubmitEvent', demands=['str'], returns='SubmitEvent'),
        NewCall(constructor='SubmitEvent', demands=['str', 'SubmitEventInit'], returns='SubmitEvent'),
    ],
    "FormDataEvent": [
        NewCall(constructor='FormDataEvent', demands=['str', 'FormDataEventInit'], returns='FormDataEvent'),
    ],
    "HTMLDetailsElement": [
        NewCall(constructor='HTMLDetailsElement', demands=[], returns='HTMLDetailsElement'),
    ],
    "HTMLDialogElement": [
        NewCall(constructor='HTMLDialogElement', demands=[], returns='HTMLDialogElement'),
    ],
    "showModal": [
        PrototypeCall(constructor='HTMLDialogElement', fn='showModal', demands=['HTMLDialogElement'], returns='None'),
    ],
    "requestClose": [
        PrototypeCall(constructor='HTMLDialogElement', fn='requestClose', demands=['HTMLDialogElement'], returns='None'),
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
    "assignedNodes": [
        PrototypeCall(constructor='HTMLSlotElement', fn='assignedNodes', demands=['HTMLSlotElement'], returns='Node'),
        PrototypeCall(constructor='HTMLSlotElement', fn='assignedNodes', demands=['HTMLSlotElement', 'AssignedNodesOptions'], returns='Node'),
    ],
    "assignedElements": [
        PrototypeCall(constructor='HTMLSlotElement', fn='assignedElements', demands=['HTMLSlotElement'], returns='Element'),
        PrototypeCall(constructor='HTMLSlotElement', fn='assignedElements', demands=['HTMLSlotElement', 'AssignedNodesOptions'], returns='Element'),
    ],
    "assign": [
        PrototypeCall(constructor='HTMLSlotElement', fn='assign', demands=['HTMLSlotElement', 'Element'], returns='None'),
        PrototypeCall(constructor='Location', fn='assign', demands=['Location', 'str'], returns='None'),
    ],
    "HTMLCanvasElement": [
        NewCall(constructor='HTMLCanvasElement', demands=[], returns='HTMLCanvasElement'),
    ],
    "getContext": [
        PrototypeCall(constructor='HTMLCanvasElement', fn='getContext', demands=['HTMLCanvasElement', 'str'], returns='RenderingContext'),
        PrototypeCall(constructor='HTMLCanvasElement', fn='getContext', demands=['HTMLCanvasElement', 'str', '*'], returns='RenderingContext'),
        PrototypeCall(constructor='OffscreenCanvas', fn='getContext', demands=['OffscreenCanvas', 'OffscreenRenderingContextId'], returns='OffscreenRenderingContext'),
        PrototypeCall(constructor='OffscreenCanvas', fn='getContext', demands=['OffscreenCanvas', 'OffscreenRenderingContextId', '*'], returns='OffscreenRenderingContext'),
    ],
    "toDataURL": [
        PrototypeCall(constructor='HTMLCanvasElement', fn='toDataURL', demands=['HTMLCanvasElement'], returns='str'),
        PrototypeCall(constructor='HTMLCanvasElement', fn='toDataURL', demands=['HTMLCanvasElement', 'str'], returns='str'),
        PrototypeCall(constructor='HTMLCanvasElement', fn='toDataURL', demands=['HTMLCanvasElement', 'str', '*'], returns='str'),
    ],
    "toBlob": [
        PrototypeCall(constructor='HTMLCanvasElement', fn='toBlob', demands=['HTMLCanvasElement', 'BlobCallback'], returns='None'),
        PrototypeCall(constructor='HTMLCanvasElement', fn='toBlob', demands=['HTMLCanvasElement', 'BlobCallback', 'str'], returns='None'),
        PrototypeCall(constructor='HTMLCanvasElement', fn='toBlob', demands=['HTMLCanvasElement', 'BlobCallback', 'str', '*'], returns='None'),
    ],
    "transferControlToOffscreen": [
        PrototypeCall(constructor='HTMLCanvasElement', fn='transferControlToOffscreen', demands=['HTMLCanvasElement'], returns='OffscreenCanvas'),
    ],
    "addColorStop": [
        PrototypeCall(constructor='CanvasGradient', fn='addColorStop', demands=['CanvasGradient', 'float', 'str'], returns='None'),
    ],
    "setTransform": [
        PrototypeCall(constructor='CanvasPattern', fn='setTransform', demands=['CanvasPattern'], returns='None'),
        PrototypeCall(constructor='CanvasPattern', fn='setTransform', demands=['CanvasPattern', 'DOMMatrix2DInit'], returns='None'),
    ],
    "Path2D": [
        NewCall(constructor='Path2D', demands=[], returns='Path2D'),
        NewCall(constructor='Path2D', demands=['Path2D'], returns='Path2D'),
    ],
    "addPath": [
        PrototypeCall(constructor='Path2D', fn='addPath', demands=['Path2D', 'Path2D'], returns='None'),
        PrototypeCall(constructor='Path2D', fn='addPath', demands=['Path2D', 'Path2D', 'DOMMatrix2DInit'], returns='None'),
    ],
    "transferFromImageBitmap": [
        PrototypeCall(constructor='ImageBitmapRenderingContext', fn='transferFromImageBitmap', demands=['ImageBitmapRenderingContext', 'ImageBitmap'], returns='None'),
    ],
    "OffscreenCanvas": [
        NewCall(constructor='OffscreenCanvas', demands=['int', 'int'], returns='OffscreenCanvas'),
    ],
    "transferToImageBitmap": [
        PrototypeCall(constructor='OffscreenCanvas', fn='transferToImageBitmap', demands=['OffscreenCanvas'], returns='ImageBitmap'),
    ],
    "convertToBlob": [
        PrototypeCall(constructor='OffscreenCanvas', fn='convertToBlob', demands=['OffscreenCanvas'], returns='Blob'),
        PrototypeCall(constructor='OffscreenCanvas', fn='convertToBlob', demands=['OffscreenCanvas', 'ImageEncodeOptions'], returns='Blob'),
    ],
    "CustomElementRegistry": [
        NewCall(constructor='CustomElementRegistry', demands=[], returns='CustomElementRegistry'),
    ],
    "define": [
        PrototypeCall(constructor='CustomElementRegistry', fn='define', demands=['CustomElementRegistry', 'str', 'CustomElementConstructor'], returns='None'),
        PrototypeCall(constructor='CustomElementRegistry', fn='define', demands=['CustomElementRegistry', 'str', 'CustomElementConstructor', 'ElementDefinitionOptions'], returns='None'),
    ],
    "getName": [
        PrototypeCall(constructor='CustomElementRegistry', fn='getName', demands=['CustomElementRegistry', 'CustomElementConstructor'], returns='str'),
    ],
    "whenDefined": [
        PrototypeCall(constructor='CustomElementRegistry', fn='whenDefined', demands=['CustomElementRegistry', 'str'], returns='CustomElementConstructor'),
    ],
    "upgrade": [
        PrototypeCall(constructor='CustomElementRegistry', fn='upgrade', demands=['CustomElementRegistry', 'Node'], returns='None'),
    ],
    "initialize": [
        PrototypeCall(constructor='CustomElementRegistry', fn='initialize', demands=['CustomElementRegistry', 'Node'], returns='None'),
        PrototypeCall(constructor='SVGNumberList', fn='initialize', demands=['SVGNumberList', 'SVGNumber'], returns='SVGNumber'),
        PrototypeCall(constructor='SVGLengthList', fn='initialize', demands=['SVGLengthList', 'SVGLength'], returns='SVGLength'),
        PrototypeCall(constructor='SVGStringList', fn='initialize', demands=['SVGStringList', 'str'], returns='str'),
        PrototypeCall(constructor='SVGTransformList', fn='initialize', demands=['SVGTransformList', 'SVGTransform'], returns='SVGTransform'),
        PrototypeCall(constructor='SVGPointList', fn='initialize', demands=['SVGPointList', 'DOMPoint'], returns='DOMPoint'),
    ],
    "setFormValue": [
        PrototypeCall(constructor='ElementInternals', fn='setFormValue', demands=['ElementInternals', 'File'], returns='None'),
        PrototypeCall(constructor='ElementInternals', fn='setFormValue', demands=['ElementInternals', 'File', 'File'], returns='None'),
    ],
    "setValidity": [
        PrototypeCall(constructor='ElementInternals', fn='setValidity', demands=['ElementInternals'], returns='None'),
        PrototypeCall(constructor='ElementInternals', fn='setValidity', demands=['ElementInternals', 'ValidityStateFlags'], returns='None'),
        PrototypeCall(constructor='ElementInternals', fn='setValidity', demands=['ElementInternals', 'ValidityStateFlags', 'str'], returns='None'),
        PrototypeCall(constructor='ElementInternals', fn='setValidity', demands=['ElementInternals', 'ValidityStateFlags', 'str', 'HTMLElement'], returns='None'),
    ],
    "ToggleEvent": [
        NewCall(constructor='ToggleEvent', demands=['str'], returns='ToggleEvent'),
        NewCall(constructor='ToggleEvent', demands=['str', 'ToggleEventInit'], returns='ToggleEvent'),
    ],
    "CommandEvent": [
        NewCall(constructor='CommandEvent', demands=['str'], returns='CommandEvent'),
        NewCall(constructor='CommandEvent', demands=['str', 'CommandEventInit'], returns='CommandEvent'),
    ],
    "CloseWatcher": [
        NewCall(constructor='CloseWatcher', demands=[], returns='CloseWatcher'),
        NewCall(constructor='CloseWatcher', demands=['CloseWatcherOptions'], returns='CloseWatcher'),
    ],
    "DataTransfer": [
        NewCall(constructor='DataTransfer', demands=[], returns='DataTransfer'),
    ],
    "setDragImage": [
        PrototypeCall(constructor='DataTransfer', fn='setDragImage', demands=['DataTransfer', 'Element', 'int', 'int'], returns='None'),
    ],
    "getData": [
        PrototypeCall(constructor='DataTransfer', fn='getData', demands=['DataTransfer', 'str'], returns='str'),
    ],
    "setData": [
        PrototypeCall(constructor='DataTransfer', fn='setData', demands=['DataTransfer', 'str', 'str'], returns='None'),
    ],
    "clearData": [
        PrototypeCall(constructor='DataTransfer', fn='clearData', demands=['DataTransfer'], returns='None'),
        PrototypeCall(constructor='DataTransfer', fn='clearData', demands=['DataTransfer', 'str'], returns='None'),
    ],
    "getAsString": [
        PrototypeCall(constructor='DataTransferItem', fn='getAsString', demands=['DataTransferItem', 'FunctionStringCallback'], returns='None'),
    ],
    "getAsFile": [
        PrototypeCall(constructor='DataTransferItem', fn='getAsFile', demands=['DataTransferItem'], returns='File'),
    ],
    "DragEvent": [
        NewCall(constructor='DragEvent', demands=['str'], returns='DragEvent'),
        NewCall(constructor='DragEvent', demands=['str', 'DragEventInit'], returns='DragEvent'),
    ],
    "focus": [
        PrototypeCall(constructor='Window', fn='focus', demands=['Window'], returns='None'),
        PrototypeCall(constructor='WindowClient', fn='focus', demands=['WindowClient'], returns='WindowClient'),
    ],
    "blur": [
        PrototypeCall(constructor='Window', fn='blur', demands=['Window'], returns='None'),
    ],
    "alert": [
        PrototypeCall(constructor='Window', fn='alert', demands=['Window'], returns='None'),
        PrototypeCall(constructor='Window', fn='alert', demands=['Window', 'str'], returns='None'),
    ],
    "confirm": [
        PrototypeCall(constructor='Window', fn='confirm', demands=['Window'], returns='bool'),
        PrototypeCall(constructor='Window', fn='confirm', demands=['Window', 'str'], returns='bool'),
    ],
    "prompt": [
        PrototypeCall(constructor='Window', fn='prompt', demands=['Window'], returns='str'),
        PrototypeCall(constructor='Window', fn='prompt', demands=['Window', 'str'], returns='str'),
        PrototypeCall(constructor='Window', fn='prompt', demands=['Window', 'str', 'str'], returns='str'),
        PrototypeCall(constructor='BeforeInstallPromptEvent', fn='prompt', demands=['BeforeInstallPromptEvent'], returns='PromptResponseObject'),
        PrototypeCall(constructor='RemotePlayback', fn='prompt', demands=['RemotePlayback'], returns='None'),
    ],
    "print": [
        PrototypeCall(constructor='Window', fn='print', demands=['Window'], returns='None'),
    ],
    "postMessage": [
        PrototypeCall(constructor='Window', fn='postMessage', demands=['Window', '*', 'str'], returns='None'),
        PrototypeCall(constructor='Window', fn='postMessage', demands=['Window', '*', 'str', 'object'], returns='None'),
        PrototypeCall(constructor='Window', fn='postMessage', demands=['Window', '*'], returns='None'),
        PrototypeCall(constructor='Window', fn='postMessage', demands=['Window', '*', 'WindowPostMessageOptions'], returns='None'),
        PrototypeCall(constructor='MessagePort', fn='postMessage', demands=['MessagePort', '*', 'object'], returns='None'),
        PrototypeCall(constructor='MessagePort', fn='postMessage', demands=['MessagePort', '*'], returns='None'),
        PrototypeCall(constructor='MessagePort', fn='postMessage', demands=['MessagePort', '*', 'StructuredSerializeOptions'], returns='None'),
        PrototypeCall(constructor='BroadcastChannel', fn='postMessage', demands=['BroadcastChannel', '*'], returns='None'),
        PrototypeCall(constructor='DedicatedWorkerGlobalScope', fn='postMessage', demands=['DedicatedWorkerGlobalScope', '*', 'object'], returns='None'),
        PrototypeCall(constructor='DedicatedWorkerGlobalScope', fn='postMessage', demands=['DedicatedWorkerGlobalScope', '*'], returns='None'),
        PrototypeCall(constructor='DedicatedWorkerGlobalScope', fn='postMessage', demands=['DedicatedWorkerGlobalScope', '*', 'StructuredSerializeOptions'], returns='None'),
        PrototypeCall(constructor='Worker', fn='postMessage', demands=['Worker', '*', 'object'], returns='None'),
        PrototypeCall(constructor='Worker', fn='postMessage', demands=['Worker', '*'], returns='None'),
        PrototypeCall(constructor='Worker', fn='postMessage', demands=['Worker', '*', 'StructuredSerializeOptions'], returns='None'),
        PrototypeCall(constructor='HTMLPortalElement', fn='postMessage', demands=['HTMLPortalElement', '*'], returns='None'),
        PrototypeCall(constructor='HTMLPortalElement', fn='postMessage', demands=['HTMLPortalElement', '*', 'StructuredSerializeOptions'], returns='None'),
        PrototypeCall(constructor='PortalHost', fn='postMessage', demands=['PortalHost', '*'], returns='None'),
        PrototypeCall(constructor='PortalHost', fn='postMessage', demands=['PortalHost', '*', 'StructuredSerializeOptions'], returns='None'),
        PrototypeCall(constructor='ServiceWorker', fn='postMessage', demands=['ServiceWorker', '*', 'object'], returns='None'),
        PrototypeCall(constructor='ServiceWorker', fn='postMessage', demands=['ServiceWorker', '*'], returns='None'),
        PrototypeCall(constructor='ServiceWorker', fn='postMessage', demands=['ServiceWorker', '*', 'StructuredSerializeOptions'], returns='None'),
        PrototypeCall(constructor='Client', fn='postMessage', demands=['Client', '*', 'object'], returns='None'),
        PrototypeCall(constructor='Client', fn='postMessage', demands=['Client', '*'], returns='None'),
        PrototypeCall(constructor='Client', fn='postMessage', demands=['Client', '*', 'StructuredSerializeOptions'], returns='None'),
    ],
    "replace": [
        PrototypeCall(constructor='Location', fn='replace', demands=['Location', 'str'], returns='None'),
        PrototypeCall(constructor='DOMTokenList', fn='replace', demands=['DOMTokenList', 'str', 'str'], returns='bool'),
        PrototypeCall(constructor='CSSStyleSheet', fn='replace', demands=['CSSStyleSheet', 'str'], returns='CSSStyleSheet'),
    ],
    "reload": [
        PrototypeCall(constructor='Location', fn='reload', demands=['Location'], returns='None'),
        PrototypeCall(constructor='Navigation', fn='reload', demands=['Navigation'], returns='NavigationResult'),
        PrototypeCall(constructor='Navigation', fn='reload', demands=['Navigation', 'NavigationReloadOptions'], returns='NavigationResult'),
    ],
    "go": [
        PrototypeCall(constructor='History', fn='go', demands=['History'], returns='None'),
        PrototypeCall(constructor='History', fn='go', demands=['History', 'int'], returns='None'),
    ],
    "back": [
        PrototypeCall(constructor='History', fn='back', demands=['History'], returns='None'),
        PrototypeCall(constructor='Navigation', fn='back', demands=['Navigation'], returns='NavigationResult'),
        PrototypeCall(constructor='Navigation', fn='back', demands=['Navigation', 'NavigationOptions'], returns='NavigationResult'),
    ],
    "forward": [
        PrototypeCall(constructor='History', fn='forward', demands=['History'], returns='None'),
        PrototypeCall(constructor='Navigation', fn='forward', demands=['Navigation'], returns='NavigationResult'),
        PrototypeCall(constructor='Navigation', fn='forward', demands=['Navigation', 'NavigationOptions'], returns='NavigationResult'),
    ],
    "pushState": [
        PrototypeCall(constructor='History', fn='pushState', demands=['History', '*', 'str'], returns='None'),
        PrototypeCall(constructor='History', fn='pushState', demands=['History', '*', 'str', 'str'], returns='None'),
    ],
    "replaceState": [
        PrototypeCall(constructor='History', fn='replaceState', demands=['History', '*', 'str'], returns='None'),
        PrototypeCall(constructor='History', fn='replaceState', demands=['History', '*', 'str', 'str'], returns='None'),
    ],
    "entries": [
        PrototypeCall(constructor='Navigation', fn='entries', demands=['Navigation'], returns='NavigationHistoryEntry'),
    ],
    "updateCurrentEntry": [
        PrototypeCall(constructor='Navigation', fn='updateCurrentEntry', demands=['Navigation', 'NavigationUpdateCurrentEntryOptions'], returns='None'),
    ],
    "navigate": [
        PrototypeCall(constructor='Navigation', fn='navigate', demands=['Navigation', 'str'], returns='NavigationResult'),
        PrototypeCall(constructor='Navigation', fn='navigate', demands=['Navigation', 'str', 'NavigationNavigateOptions'], returns='NavigationResult'),
        PrototypeCall(constructor='WindowClient', fn='navigate', demands=['WindowClient', 'str'], returns='WindowClient'),
    ],
    "traverseTo": [
        PrototypeCall(constructor='Navigation', fn='traverseTo', demands=['Navigation', 'str'], returns='NavigationResult'),
        PrototypeCall(constructor='Navigation', fn='traverseTo', demands=['Navigation', 'str', 'NavigationOptions'], returns='NavigationResult'),
    ],
    "getState": [
        PrototypeCall(constructor='NavigationHistoryEntry', fn='getState', demands=['NavigationHistoryEntry'], returns='*'),
        PrototypeCall(constructor='NavigationDestination', fn='getState', demands=['NavigationDestination'], returns='*'),
        PrototypeCall(constructor='NavigationPreloadManager', fn='getState', demands=['NavigationPreloadManager'], returns='NavigationPreloadState'),
    ],
    "NavigateEvent": [
        NewCall(constructor='NavigateEvent', demands=['str', 'NavigateEventInit'], returns='NavigateEvent'),
    ],
    "intercept": [
        PrototypeCall(constructor='NavigateEvent', fn='intercept', demands=['NavigateEvent'], returns='None'),
        PrototypeCall(constructor='NavigateEvent', fn='intercept', demands=['NavigateEvent', 'NavigationInterceptOptions'], returns='None'),
    ],
    "scroll": [
        PrototypeCall(constructor='NavigateEvent', fn='scroll', demands=['NavigateEvent'], returns='None'),
    ],
    "NavigationCurrentEntryChangeEvent": [
        NewCall(constructor='NavigationCurrentEntryChangeEvent', demands=['str', 'NavigationCurrentEntryChangeEventInit'], returns='NavigationCurrentEntryChangeEvent'),
    ],
    "PopStateEvent": [
        NewCall(constructor='PopStateEvent', demands=['str'], returns='PopStateEvent'),
        NewCall(constructor='PopStateEvent', demands=['str', 'PopStateEventInit'], returns='PopStateEvent'),
    ],
    "HashChangeEvent": [
        NewCall(constructor='HashChangeEvent', demands=['str'], returns='HashChangeEvent'),
        NewCall(constructor='HashChangeEvent', demands=['str', 'HashChangeEventInit'], returns='HashChangeEvent'),
    ],
    "PageSwapEvent": [
        NewCall(constructor='PageSwapEvent', demands=['str'], returns='PageSwapEvent'),
        NewCall(constructor='PageSwapEvent', demands=['str', 'PageSwapEventInit'], returns='PageSwapEvent'),
    ],
    "PageRevealEvent": [
        NewCall(constructor='PageRevealEvent', demands=['str'], returns='PageRevealEvent'),
        NewCall(constructor='PageRevealEvent', demands=['str', 'PageRevealEventInit'], returns='PageRevealEvent'),
    ],
    "PageTransitionEvent": [
        NewCall(constructor='PageTransitionEvent', demands=['str'], returns='PageTransitionEvent'),
        NewCall(constructor='PageTransitionEvent', demands=['str', 'PageTransitionEventInit'], returns='PageTransitionEvent'),
    ],
    "ErrorEvent": [
        NewCall(constructor='ErrorEvent', demands=['str'], returns='ErrorEvent'),
        NewCall(constructor='ErrorEvent', demands=['str', 'ErrorEventInit'], returns='ErrorEvent'),
    ],
    "PromiseRejectionEvent": [
        NewCall(constructor='PromiseRejectionEvent', demands=['str', 'PromiseRejectionEventInit'], returns='PromiseRejectionEvent'),
    ],
    "DOMParser": [
        NewCall(constructor='DOMParser', demands=[], returns='DOMParser'),
    ],
    "parseFromString": [
        PrototypeCall(constructor='DOMParser', fn='parseFromString', demands=['DOMParser', 'TrustedHTML', 'DOMParserSupportedType'], returns='Document'),
    ],
    "XMLSerializer": [
        NewCall(constructor='XMLSerializer', demands=[], returns='XMLSerializer'),
    ],
    "serializeToString": [
        PrototypeCall(constructor='XMLSerializer', fn='serializeToString', demands=['XMLSerializer', 'Node'], returns='str'),
    ],
    "refresh": [
        PrototypeCall(constructor='PluginArray', fn='refresh', demands=['PluginArray'], returns='None'),
    ],
    "ImageData": [
        NewCall(constructor='ImageData', demands=['int', 'int'], returns='ImageData'),
        NewCall(constructor='ImageData', demands=['int', 'int', 'ImageDataSettings'], returns='ImageData'),
        NewCall(constructor='ImageData', demands=['ImageDataArray', 'int'], returns='ImageData'),
        NewCall(constructor='ImageData', demands=['ImageDataArray', 'int', 'int'], returns='ImageData'),
        NewCall(constructor='ImageData', demands=['ImageDataArray', 'int', 'int', 'ImageDataSettings'], returns='ImageData'),
    ],
    "MessageEvent": [
        NewCall(constructor='MessageEvent', demands=['str'], returns='MessageEvent'),
        NewCall(constructor='MessageEvent', demands=['str', 'MessageEventInit'], returns='MessageEvent'),
    ],
    "initMessageEvent": [
        PrototypeCall(constructor='MessageEvent', fn='initMessageEvent', demands=['MessageEvent', 'str'], returns='None'),
        PrototypeCall(constructor='MessageEvent', fn='initMessageEvent', demands=['MessageEvent', 'str', 'bool'], returns='None'),
        PrototypeCall(constructor='MessageEvent', fn='initMessageEvent', demands=['MessageEvent', 'str', 'bool', 'bool'], returns='None'),
        PrototypeCall(constructor='MessageEvent', fn='initMessageEvent', demands=['MessageEvent', 'str', 'bool', 'bool', '*'], returns='None'),
        PrototypeCall(constructor='MessageEvent', fn='initMessageEvent', demands=['MessageEvent', 'str', 'bool', 'bool', '*', 'str'], returns='None'),
        PrototypeCall(constructor='MessageEvent', fn='initMessageEvent', demands=['MessageEvent', 'str', 'bool', 'bool', '*', 'str', 'str'], returns='None'),
        PrototypeCall(constructor='MessageEvent', fn='initMessageEvent', demands=['MessageEvent', 'str', 'bool', 'bool', '*', 'str', 'str', 'MessageEventSource'], returns='None'),
        PrototypeCall(constructor='MessageEvent', fn='initMessageEvent', demands=['MessageEvent', 'str', 'bool', 'bool', '*', 'str', 'str', 'MessageEventSource', 'MessagePort'], returns='None'),
    ],
    "EventSource": [
        NewCall(constructor='EventSource', demands=['str'], returns='EventSource'),
        NewCall(constructor='EventSource', demands=['str', 'EventSourceInit'], returns='EventSource'),
    ],
    "MessageChannel": [
        NewCall(constructor='MessageChannel', demands=[], returns='MessageChannel'),
    ],
    "importScripts": [
        PrototypeCall(constructor='WorkerGlobalScope', fn='importScripts', demands=['WorkerGlobalScope', 'TrustedScriptURL'], returns='None'),
    ],
    "Worker": [
        NewCall(constructor='Worker', demands=['TrustedScriptURL'], returns='Worker'),
        NewCall(constructor='Worker', demands=['TrustedScriptURL', 'WorkerOptions'], returns='Worker'),
    ],
    "terminate": [
        PrototypeCall(constructor='Worker', fn='terminate', demands=['Worker'], returns='None'),
        PrototypeCall(constructor='PresentationConnection', fn='terminate', demands=['PresentationConnection'], returns='None'),
        PrototypeCall(constructor='TransformStreamDefaultController', fn='terminate', demands=['TransformStreamDefaultController'], returns='None'),
    ],
    "addModule": [
        PrototypeCall(constructor='Worklet', fn='addModule', demands=['Worklet', 'str'], returns='None'),
        PrototypeCall(constructor='Worklet', fn='addModule', demands=['Worklet', 'str', 'WorkletOptions'], returns='None'),
    ],
    "key": [
        PrototypeCall(constructor='Storage', fn='key', demands=['Storage', 'int'], returns='str'),
    ],
    "getItem": [
        PrototypeCall(constructor='Storage', fn='getItem', demands=['Storage', 'str'], returns='str'),
        PrototypeCall(constructor='SVGNumberList', fn='getItem', demands=['SVGNumberList', 'int'], returns='SVGNumber'),
        PrototypeCall(constructor='SVGLengthList', fn='getItem', demands=['SVGLengthList', 'int'], returns='SVGLength'),
        PrototypeCall(constructor='SVGStringList', fn='getItem', demands=['SVGStringList', 'int'], returns='str'),
        PrototypeCall(constructor='SVGTransformList', fn='getItem', demands=['SVGTransformList', 'int'], returns='SVGTransform'),
        PrototypeCall(constructor='SVGPointList', fn='getItem', demands=['SVGPointList', 'int'], returns='DOMPoint'),
    ],
    "setItem": [
        PrototypeCall(constructor='Storage', fn='setItem', demands=['Storage', 'str', 'str'], returns='None'),
    ],
    "removeItem": [
        PrototypeCall(constructor='Storage', fn='removeItem', demands=['Storage', 'str'], returns='None'),
        PrototypeCall(constructor='SVGNumberList', fn='removeItem', demands=['SVGNumberList', 'int'], returns='SVGNumber'),
        PrototypeCall(constructor='SVGLengthList', fn='removeItem', demands=['SVGLengthList', 'int'], returns='SVGLength'),
        PrototypeCall(constructor='SVGStringList', fn='removeItem', demands=['SVGStringList', 'int'], returns='str'),
        PrototypeCall(constructor='SVGTransformList', fn='removeItem', demands=['SVGTransformList', 'int'], returns='SVGTransform'),
        PrototypeCall(constructor='SVGPointList', fn='removeItem', demands=['SVGPointList', 'int'], returns='DOMPoint'),
    ],
    "StorageEvent": [
        NewCall(constructor='StorageEvent', demands=['str'], returns='StorageEvent'),
        NewCall(constructor='StorageEvent', demands=['str', 'StorageEventInit'], returns='StorageEvent'),
    ],
    "initStorageEvent": [
        PrototypeCall(constructor='StorageEvent', fn='initStorageEvent', demands=['StorageEvent', 'str'], returns='None'),
        PrototypeCall(constructor='StorageEvent', fn='initStorageEvent', demands=['StorageEvent', 'str', 'bool'], returns='None'),
        PrototypeCall(constructor='StorageEvent', fn='initStorageEvent', demands=['StorageEvent', 'str', 'bool', 'bool'], returns='None'),
        PrototypeCall(constructor='StorageEvent', fn='initStorageEvent', demands=['StorageEvent', 'str', 'bool', 'bool', 'str'], returns='None'),
        PrototypeCall(constructor='StorageEvent', fn='initStorageEvent', demands=['StorageEvent', 'str', 'bool', 'bool', 'str', 'str'], returns='None'),
        PrototypeCall(constructor='StorageEvent', fn='initStorageEvent', demands=['StorageEvent', 'str', 'bool', 'bool', 'str', 'str', 'str'], returns='None'),
        PrototypeCall(constructor='StorageEvent', fn='initStorageEvent', demands=['StorageEvent', 'str', 'bool', 'bool', 'str', 'str', 'str', 'str'], returns='None'),
        PrototypeCall(constructor='StorageEvent', fn='initStorageEvent', demands=['StorageEvent', 'str', 'bool', 'bool', 'str', 'str', 'str', 'str', 'Storage'], returns='None'),
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
    "AddSearchProvider": [
        PrototypeCall(constructor='External', fn='AddSearchProvider', demands=['External'], returns='None'),
    ],
    "IsSearchProviderInstalled": [
        PrototypeCall(constructor='External', fn='IsSearchProviderInstalled', demands=['External'], returns='None'),
    ],
    "FaceDetector": [
        NewCall(constructor='FaceDetector', demands=[], returns='FaceDetector'),
        NewCall(constructor='FaceDetector', demands=['FaceDetectorOptions'], returns='FaceDetector'),
    ],
    "BarcodeDetector": [
        NewCall(constructor='BarcodeDetector', demands=[], returns='BarcodeDetector'),
        NewCall(constructor='BarcodeDetector', demands=['BarcodeDetectorOptions'], returns='BarcodeDetector'),
    ],
    "getSupportedFormats": [
        DirectCall(fn='getSupportedFormats', receiver='BarcodeDetector', demands=[], returns='BarcodeFormat'),
    ],
    "MediaSource": [
        NewCall(constructor='MediaSource', demands=[], returns='MediaSource'),
    ],
    "addSourceBuffer": [
        PrototypeCall(constructor='MediaSource', fn='addSourceBuffer', demands=['MediaSource', 'str'], returns='SourceBuffer'),
    ],
    "removeSourceBuffer": [
        PrototypeCall(constructor='MediaSource', fn='removeSourceBuffer', demands=['MediaSource', 'SourceBuffer'], returns='None'),
    ],
    "endOfStream": [
        PrototypeCall(constructor='MediaSource', fn='endOfStream', demands=['MediaSource'], returns='None'),
        PrototypeCall(constructor='MediaSource', fn='endOfStream', demands=['MediaSource', 'EndOfStreamError'], returns='None'),
    ],
    "setLiveSeekableRange": [
        PrototypeCall(constructor='MediaSource', fn='setLiveSeekableRange', demands=['MediaSource', 'float', 'float'], returns='None'),
    ],
    "clearLiveSeekableRange": [
        PrototypeCall(constructor='MediaSource', fn='clearLiveSeekableRange', demands=['MediaSource'], returns='None'),
    ],
    "isTypeSupported": [
        DirectCall(fn='isTypeSupported', receiver='MediaSource', demands=['str'], returns='bool'),
        DirectCall(fn='isTypeSupported', receiver='ImageDecoder', demands=['str'], returns='bool'),
        DirectCall(fn='isTypeSupported', receiver='MediaRecorder', demands=['str'], returns='bool'),
    ],
    "appendBuffer": [
        PrototypeCall(constructor='SourceBuffer', fn='appendBuffer', demands=['SourceBuffer', 'BufferSource'], returns='None'),
    ],
    "changeType": [
        PrototypeCall(constructor='SourceBuffer', fn='changeType', demands=['SourceBuffer', 'str'], returns='None'),
    ],
    "ManagedMediaSource": [
        NewCall(constructor='ManagedMediaSource', demands=[], returns='ManagedMediaSource'),
    ],
    "BufferedChangeEvent": [
        NewCall(constructor='BufferedChangeEvent', demands=['str'], returns='BufferedChangeEvent'),
        NewCall(constructor='BufferedChangeEvent', demands=['str', 'BufferedChangeEventInit'], returns='BufferedChangeEvent'),
    ],
    "request": [
        PrototypeCall(constructor='WakeLock', fn='request', demands=['WakeLock'], returns='WakeLockSentinel'),
        PrototypeCall(constructor='WakeLock', fn='request', demands=['WakeLock', 'WakeLockType'], returns='WakeLockSentinel'),
        PrototypeCall(constructor='LockManager', fn='request', demands=['LockManager', 'str', 'LockGrantedCallback'], returns='*'),
        PrototypeCall(constructor='LockManager', fn='request', demands=['LockManager', 'str', 'LockOptions', 'LockGrantedCallback'], returns='*'),
    ],
    "release": [
        PrototypeCall(constructor='WakeLockSentinel', fn='release', demands=['WakeLockSentinel'], returns='None'),
    ],
    "Magnetometer": [
        NewCall(constructor='Magnetometer', demands=[], returns='Magnetometer'),
        NewCall(constructor='Magnetometer', demands=['MagnetometerSensorOptions'], returns='Magnetometer'),
    ],
    "UncalibratedMagnetometer": [
        NewCall(constructor='UncalibratedMagnetometer', demands=[], returns='UncalibratedMagnetometer'),
        NewCall(constructor='UncalibratedMagnetometer', demands=['MagnetometerSensorOptions'], returns='UncalibratedMagnetometer'),
    ],
    "TransitionEvent": [
        NewCall(constructor='TransitionEvent', demands=['CSSOMString'], returns='TransitionEvent'),
        NewCall(constructor='TransitionEvent', demands=['CSSOMString', 'TransitionEventInit'], returns='TransitionEvent'),
    ],
    "Profiler": [
        NewCall(constructor='Profiler', demands=['ProfilerInitOptions'], returns='Profiler'),
    ],
    "MIDIMessageEvent": [
        NewCall(constructor='MIDIMessageEvent', demands=['str'], returns='MIDIMessageEvent'),
        NewCall(constructor='MIDIMessageEvent', demands=['str', 'MIDIMessageEventInit'], returns='MIDIMessageEvent'),
    ],
    "MIDIConnectionEvent": [
        NewCall(constructor='MIDIConnectionEvent', demands=['str'], returns='MIDIConnectionEvent'),
        NewCall(constructor='MIDIConnectionEvent', demands=['str', 'MIDIConnectionEventInit'], returns='MIDIConnectionEvent'),
    ],
    "WebSocket": [
        NewCall(constructor='WebSocket', demands=['str'], returns='WebSocket'),
        NewCall(constructor='WebSocket', demands=['str', 'str'], returns='WebSocket'),
    ],
    "CloseEvent": [
        NewCall(constructor='CloseEvent', demands=['str'], returns='CloseEvent'),
        NewCall(constructor='CloseEvent', demands=['str', 'CloseEventInit'], returns='CloseEvent'),
    ],
    "cropTo": [
        PrototypeCall(constructor='BrowserCaptureMediaStreamTrack', fn='cropTo', demands=['BrowserCaptureMediaStreamTrack', 'CropTarget'], returns='None'),
    ],
    "AudioDecoder": [
        NewCall(constructor='AudioDecoder', demands=['AudioDecoderInit'], returns='AudioDecoder'),
    ],
    "configure": [
        PrototypeCall(constructor='AudioDecoder', fn='configure', demands=['AudioDecoder', 'AudioDecoderConfig'], returns='None'),
        PrototypeCall(constructor='VideoDecoder', fn='configure', demands=['VideoDecoder', 'VideoDecoderConfig'], returns='None'),
        PrototypeCall(constructor='AudioEncoder', fn='configure', demands=['AudioEncoder', 'AudioEncoderConfig'], returns='None'),
        PrototypeCall(constructor='VideoEncoder', fn='configure', demands=['VideoEncoder', 'VideoEncoderConfig'], returns='None'),
        PrototypeCall(constructor='GPUCanvasContext', fn='configure', demands=['GPUCanvasContext', 'GPUCanvasConfiguration'], returns='None'),
    ],
    "isConfigSupported": [
        DirectCall(fn='isConfigSupported', receiver='AudioDecoder', demands=['AudioDecoderConfig'], returns='AudioDecoderSupport'),
        DirectCall(fn='isConfigSupported', receiver='VideoDecoder', demands=['VideoDecoderConfig'], returns='VideoDecoderSupport'),
        DirectCall(fn='isConfigSupported', receiver='AudioEncoder', demands=['AudioEncoderConfig'], returns='AudioEncoderSupport'),
        DirectCall(fn='isConfigSupported', receiver='VideoEncoder', demands=['VideoEncoderConfig'], returns='VideoEncoderSupport'),
    ],
    "VideoDecoder": [
        NewCall(constructor='VideoDecoder', demands=['VideoDecoderInit'], returns='VideoDecoder'),
    ],
    "AudioEncoder": [
        NewCall(constructor='AudioEncoder', demands=['AudioEncoderInit'], returns='AudioEncoder'),
    ],
    "encode": [
        PrototypeCall(constructor='AudioEncoder', fn='encode', demands=['AudioEncoder', 'AudioData'], returns='None'),
        PrototypeCall(constructor='VideoEncoder', fn='encode', demands=['VideoEncoder', 'VideoFrame'], returns='None'),
        PrototypeCall(constructor='VideoEncoder', fn='encode', demands=['VideoEncoder', 'VideoFrame', 'VideoEncoderEncodeOptions'], returns='None'),
        PrototypeCall(constructor='TextEncoder', fn='encode', demands=['TextEncoder'], returns='Uint8Array'),
        PrototypeCall(constructor='TextEncoder', fn='encode', demands=['TextEncoder', 'str'], returns='Uint8Array'),
    ],
    "VideoEncoder": [
        NewCall(constructor='VideoEncoder', demands=['VideoEncoderInit'], returns='VideoEncoder'),
    ],
    "EncodedAudioChunk": [
        NewCall(constructor='EncodedAudioChunk', demands=['EncodedAudioChunkInit'], returns='EncodedAudioChunk'),
    ],
    "copyTo": [
        PrototypeCall(constructor='EncodedAudioChunk', fn='copyTo', demands=['EncodedAudioChunk', 'AllowSharedBufferSource'], returns='None'),
        PrototypeCall(constructor='EncodedVideoChunk', fn='copyTo', demands=['EncodedVideoChunk', 'AllowSharedBufferSource'], returns='None'),
        PrototypeCall(constructor='AudioData', fn='copyTo', demands=['AudioData', 'AllowSharedBufferSource', 'AudioDataCopyToOptions'], returns='None'),
        PrototypeCall(constructor='VideoFrame', fn='copyTo', demands=['VideoFrame', 'AllowSharedBufferSource'], returns='PlaneLayout'),
        PrototypeCall(constructor='VideoFrame', fn='copyTo', demands=['VideoFrame', 'AllowSharedBufferSource', 'VideoFrameCopyToOptions'], returns='PlaneLayout'),
    ],
    "EncodedVideoChunk": [
        NewCall(constructor='EncodedVideoChunk', demands=['EncodedVideoChunkInit'], returns='EncodedVideoChunk'),
    ],
    "AudioData": [
        NewCall(constructor='AudioData', demands=['AudioDataInit'], returns='AudioData'),
    ],
    "allocationSize": [
        PrototypeCall(constructor='AudioData', fn='allocationSize', demands=['AudioData', 'AudioDataCopyToOptions'], returns='int'),
        PrototypeCall(constructor='VideoFrame', fn='allocationSize', demands=['VideoFrame'], returns='int'),
        PrototypeCall(constructor='VideoFrame', fn='allocationSize', demands=['VideoFrame', 'VideoFrameCopyToOptions'], returns='int'),
    ],
    "VideoFrame": [
        NewCall(constructor='VideoFrame', demands=['CanvasImageSource'], returns='VideoFrame'),
        NewCall(constructor='VideoFrame', demands=['CanvasImageSource', 'VideoFrameInit'], returns='VideoFrame'),
        NewCall(constructor='VideoFrame', demands=['AllowSharedBufferSource', 'VideoFrameBufferInit'], returns='VideoFrame'),
    ],
    "metadata": [
        PrototypeCall(constructor='VideoFrame', fn='metadata', demands=['VideoFrame'], returns='VideoFrameMetadata'),
    ],
    "VideoColorSpace": [
        NewCall(constructor='VideoColorSpace', demands=[], returns='VideoColorSpace'),
        NewCall(constructor='VideoColorSpace', demands=['VideoColorSpaceInit'], returns='VideoColorSpace'),
    ],
    "ImageDecoder": [
        NewCall(constructor='ImageDecoder', demands=['ImageDecoderInit'], returns='ImageDecoder'),
    ],
    "getDevices": [
        PrototypeCall(constructor='HID', fn='getDevices', demands=['HID'], returns='HIDDevice'),
        PrototypeCall(constructor='Bluetooth', fn='getDevices', demands=['Bluetooth'], returns='BluetoothDevice'),
        PrototypeCall(constructor='USB', fn='getDevices', demands=['USB'], returns='USBDevice'),
    ],
    "requestDevice": [
        PrototypeCall(constructor='HID', fn='requestDevice', demands=['HID', 'HIDDeviceRequestOptions'], returns='HIDDevice'),
        PrototypeCall(constructor='Bluetooth', fn='requestDevice', demands=['Bluetooth'], returns='BluetoothDevice'),
        PrototypeCall(constructor='Bluetooth', fn='requestDevice', demands=['Bluetooth', 'RequestDeviceOptions'], returns='BluetoothDevice'),
        PrototypeCall(constructor='USB', fn='requestDevice', demands=['USB', 'USBDeviceRequestOptions'], returns='USBDevice'),
        PrototypeCall(constructor='GPUAdapter', fn='requestDevice', demands=['GPUAdapter'], returns='GPUDevice'),
        PrototypeCall(constructor='GPUAdapter', fn='requestDevice', demands=['GPUAdapter', 'GPUDeviceDescriptor'], returns='GPUDevice'),
    ],
    "sendReport": [
        PrototypeCall(constructor='HIDDevice', fn='sendReport', demands=['HIDDevice', 'int', 'BufferSource'], returns='None'),
    ],
    "sendFeatureReport": [
        PrototypeCall(constructor='HIDDevice', fn='sendFeatureReport', demands=['HIDDevice', 'int', 'BufferSource'], returns='None'),
    ],
    "receiveFeatureReport": [
        PrototypeCall(constructor='HIDDevice', fn='receiveFeatureReport', demands=['HIDDevice', 'int'], returns='DataView'),
    ],
    "HIDConnectionEvent": [
        NewCall(constructor='HIDConnectionEvent', demands=['str', 'HIDConnectionEventInit'], returns='HIDConnectionEvent'),
    ],
    "HIDInputReportEvent": [
        NewCall(constructor='HIDInputReportEvent', demands=['str', 'HIDInputReportEventInit'], returns='HIDInputReportEvent'),
    ],
    "lock": [
        PrototypeCall(constructor='Keyboard', fn='lock', demands=['Keyboard'], returns='None'),
        PrototypeCall(constructor='Keyboard', fn='lock', demands=['Keyboard', 'str'], returns='None'),
        PrototypeCall(constructor='ScreenOrientation', fn='lock', demands=['ScreenOrientation', 'OrientationLockType'], returns='None'),
    ],
    "unlock": [
        PrototypeCall(constructor='Keyboard', fn='unlock', demands=['Keyboard'], returns='None'),
        PrototypeCall(constructor='ScreenOrientation', fn='unlock', demands=['ScreenOrientation'], returns='None'),
    ],
    "create": [
        DirectCall(fn='create', receiver='Summarizer', demands=[], returns='Summarizer'),
        DirectCall(fn='create', receiver='Summarizer', demands=['SummarizerCreateOptions'], returns='Summarizer'),
        DirectCall(fn='create', receiver='Writer', demands=[], returns='Writer'),
        DirectCall(fn='create', receiver='Writer', demands=['WriterCreateOptions'], returns='Writer'),
        DirectCall(fn='create', receiver='Rewriter', demands=[], returns='Rewriter'),
        DirectCall(fn='create', receiver='Rewriter', demands=['RewriterCreateOptions'], returns='Rewriter'),
        PrototypeCall(constructor='CredentialsContainer', fn='create', demands=['CredentialsContainer'], returns='Credential'),
        PrototypeCall(constructor='CredentialsContainer', fn='create', demands=['CredentialsContainer', 'CredentialCreationOptions'], returns='Credential'),
        DirectCall(fn='create', receiver='Translator', demands=['TranslatorCreateOptions'], returns='Translator'),
        DirectCall(fn='create', receiver='LanguageDetector', demands=[], returns='LanguageDetector'),
        DirectCall(fn='create', receiver='LanguageDetector', demands=['LanguageDetectorCreateOptions'], returns='LanguageDetector'),
    ],
    "availability": [
        DirectCall(fn='availability', receiver='Summarizer', demands=[], returns='Availability'),
        DirectCall(fn='availability', receiver='Summarizer', demands=['SummarizerCreateCoreOptions'], returns='Availability'),
        DirectCall(fn='availability', receiver='Writer', demands=[], returns='Availability'),
        DirectCall(fn='availability', receiver='Writer', demands=['WriterCreateCoreOptions'], returns='Availability'),
        DirectCall(fn='availability', receiver='Rewriter', demands=[], returns='Availability'),
        DirectCall(fn='availability', receiver='Rewriter', demands=['RewriterCreateCoreOptions'], returns='Availability'),
        DirectCall(fn='availability', receiver='Translator', demands=['TranslatorCreateCoreOptions'], returns='Availability'),
        DirectCall(fn='availability', receiver='LanguageDetector', demands=[], returns='Availability'),
        DirectCall(fn='availability', receiver='LanguageDetector', demands=['LanguageDetectorCreateCoreOptions'], returns='Availability'),
    ],
    "summarize": [
        PrototypeCall(constructor='Summarizer', fn='summarize', demands=['Summarizer', 'str'], returns='str'),
        PrototypeCall(constructor='Summarizer', fn='summarize', demands=['Summarizer', 'str', 'SummarizerSummarizeOptions'], returns='str'),
    ],
    "summarizeStreaming": [
        PrototypeCall(constructor='Summarizer', fn='summarizeStreaming', demands=['Summarizer', 'str'], returns='ReadableStream'),
        PrototypeCall(constructor='Summarizer', fn='summarizeStreaming', demands=['Summarizer', 'str', 'SummarizerSummarizeOptions'], returns='ReadableStream'),
    ],
    "measureInputUsage": [
        PrototypeCall(constructor='Summarizer', fn='measureInputUsage', demands=['Summarizer', 'str'], returns='float'),
        PrototypeCall(constructor='Summarizer', fn='measureInputUsage', demands=['Summarizer', 'str', 'SummarizerSummarizeOptions'], returns='float'),
        PrototypeCall(constructor='Writer', fn='measureInputUsage', demands=['Writer', 'str'], returns='float'),
        PrototypeCall(constructor='Writer', fn='measureInputUsage', demands=['Writer', 'str', 'WriterWriteOptions'], returns='float'),
        PrototypeCall(constructor='Rewriter', fn='measureInputUsage', demands=['Rewriter', 'str'], returns='float'),
        PrototypeCall(constructor='Rewriter', fn='measureInputUsage', demands=['Rewriter', 'str', 'RewriterRewriteOptions'], returns='float'),
        PrototypeCall(constructor='Translator', fn='measureInputUsage', demands=['Translator', 'str'], returns='float'),
        PrototypeCall(constructor='Translator', fn='measureInputUsage', demands=['Translator', 'str', 'TranslatorTranslateOptions'], returns='float'),
        PrototypeCall(constructor='LanguageDetector', fn='measureInputUsage', demands=['LanguageDetector', 'str'], returns='float'),
        PrototypeCall(constructor='LanguageDetector', fn='measureInputUsage', demands=['LanguageDetector', 'str', 'LanguageDetectorDetectOptions'], returns='float'),
    ],
    "writeStreaming": [
        PrototypeCall(constructor='Writer', fn='writeStreaming', demands=['Writer', 'str'], returns='ReadableStream'),
        PrototypeCall(constructor='Writer', fn='writeStreaming', demands=['Writer', 'str', 'WriterWriteOptions'], returns='ReadableStream'),
    ],
    "rewrite": [
        PrototypeCall(constructor='Rewriter', fn='rewrite', demands=['Rewriter', 'str'], returns='str'),
        PrototypeCall(constructor='Rewriter', fn='rewrite', demands=['Rewriter', 'str', 'RewriterRewriteOptions'], returns='str'),
    ],
    "rewriteStreaming": [
        PrototypeCall(constructor='Rewriter', fn='rewriteStreaming', demands=['Rewriter', 'str'], returns='ReadableStream'),
        PrototypeCall(constructor='Rewriter', fn='rewriteStreaming', demands=['Rewriter', 'str', 'RewriterRewriteOptions'], returns='ReadableStream'),
    ],
    "HTMLPortalElement": [
        NewCall(constructor='HTMLPortalElement', demands=[], returns='HTMLPortalElement'),
    ],
    "activate": [
        PrototypeCall(constructor='HTMLPortalElement', fn='activate', demands=['HTMLPortalElement'], returns='None'),
        PrototypeCall(constructor='HTMLPortalElement', fn='activate', demands=['HTMLPortalElement', 'PortalActivateOptions'], returns='None'),
    ],
    "PortalActivateEvent": [
        NewCall(constructor='PortalActivateEvent', demands=['str'], returns='PortalActivateEvent'),
        NewCall(constructor='PortalActivateEvent', demands=['str', 'PortalActivateEventInit'], returns='PortalActivateEvent'),
    ],
    "adoptPredecessor": [
        PrototypeCall(constructor='PortalActivateEvent', fn='adoptPredecessor', demands=['PortalActivateEvent'], returns='HTMLPortalElement'),
    ],
    "RTCIdentityAssertion": [
        NewCall(constructor='RTCIdentityAssertion', demands=['str', 'str'], returns='RTCIdentityAssertion'),
    ],
    "loseContext": [
        PrototypeCall(constructor='WEBGL_lose_context', fn='loseContext', demands=['WEBGL_lose_context'], returns='None'),
    ],
    "restoreContext": [
        PrototypeCall(constructor='WEBGL_lose_context', fn='restoreContext', demands=['WEBGL_lose_context'], returns='None'),
    ],
    "setStdDeviation": [
        PrototypeCall(constructor='SVGFEDropShadowElement', fn='setStdDeviation', demands=['SVGFEDropShadowElement', 'float', 'float'], returns='None'),
        PrototypeCall(constructor='SVGFEGaussianBlurElement', fn='setStdDeviation', demands=['SVGFEGaussianBlurElement', 'float', 'float'], returns='None'),
    ],
    "decodingInfo": [
        PrototypeCall(constructor='MediaCapabilities', fn='decodingInfo', demands=['MediaCapabilities', 'MediaDecodingConfiguration'], returns='MediaCapabilitiesDecodingInfo'),
    ],
    "encodingInfo": [
        PrototypeCall(constructor='MediaCapabilities', fn='encodingInfo', demands=['MediaCapabilities', 'MediaEncodingConfiguration'], returns='MediaCapabilitiesEncodingInfo'),
    ],
    "MediaStreamTrackProcessor": [
        NewCall(constructor='MediaStreamTrackProcessor', demands=['MediaStreamTrackProcessorInit'], returns='MediaStreamTrackProcessor'),
    ],
    "VideoTrackGenerator": [
        NewCall(constructor='VideoTrackGenerator', demands=[], returns='VideoTrackGenerator'),
    ],
    "PointerEvent": [
        NewCall(constructor='PointerEvent', demands=['str'], returns='PointerEvent'),
        NewCall(constructor='PointerEvent', demands=['str', 'PointerEventInit'], returns='PointerEvent'),
    ],
    "getCoalescedEvents": [
        PrototypeCall(constructor='PointerEvent', fn='getCoalescedEvents', demands=['PointerEvent'], returns='PointerEvent'),
    ],
    "getPredictedEvents": [
        PrototypeCall(constructor='PointerEvent', fn='getPredictedEvents', demands=['PointerEvent'], returns='PointerEvent'),
    ],
    "getTotalLength": [
        PrototypeCall(constructor='SVGPathElement', fn='getTotalLength', demands=['SVGPathElement'], returns='float'),
        PrototypeCall(constructor='SVGGeometryElement', fn='getTotalLength', demands=['SVGGeometryElement'], returns='float'),
    ],
    "getPointAtLength": [
        PrototypeCall(constructor='SVGPathElement', fn='getPointAtLength', demands=['SVGPathElement', 'float'], returns='DOMPoint'),
        PrototypeCall(constructor='SVGGeometryElement', fn='getPointAtLength', demands=['SVGGeometryElement', 'float'], returns='DOMPoint'),
    ],
    "getPathSegmentAtLength": [
        PrototypeCall(constructor='SVGPathElement', fn='getPathSegmentAtLength', demands=['SVGPathElement', 'float'], returns='SVGPathSegment'),
    ],
    "QuotaExceededError": [
        NewCall(constructor='QuotaExceededError', demands=[], returns='QuotaExceededError'),
        NewCall(constructor='QuotaExceededError', demands=['str'], returns='QuotaExceededError'),
        NewCall(constructor='QuotaExceededError', demands=['str', 'QuotaExceededErrorOptions'], returns='QuotaExceededError'),
    ],
    "DOMException": [
        NewCall(constructor='DOMException', demands=[], returns='DOMException'),
        NewCall(constructor='DOMException', demands=['str'], returns='DOMException'),
        NewCall(constructor='DOMException', demands=['str', 'str'], returns='DOMException'),
    ],
    "multiDrawArraysInstancedBaseInstanceWEBGL": [
        PrototypeCall(constructor='WEBGL_multi_draw_instanced_base_vertex_base_instance', fn='multiDrawArraysInstancedBaseInstanceWEBGL', demands=['WEBGL_multi_draw_instanced_base_vertex_base_instance', 'GLenum', 'Int32Array', 'int', 'Int32Array', 'int', 'Int32Array', 'int', 'Uint32Array', 'int', 'GLsizei'], returns='None'),
    ],
    "multiDrawElementsInstancedBaseVertexBaseInstanceWEBGL": [
        PrototypeCall(constructor='WEBGL_multi_draw_instanced_base_vertex_base_instance', fn='multiDrawElementsInstancedBaseVertexBaseInstanceWEBGL', demands=['WEBGL_multi_draw_instanced_base_vertex_base_instance', 'GLenum', 'Int32Array', 'int', 'GLenum', 'Int32Array', 'int', 'Int32Array', 'int', 'Int32Array', 'int', 'Uint32Array', 'int', 'GLsizei'], returns='None'),
    ],
    "IdentityCredentialError": [
        NewCall(constructor='IdentityCredentialError', demands=[], returns='IdentityCredentialError'),
        NewCall(constructor='IdentityCredentialError', demands=['str'], returns='IdentityCredentialError'),
        NewCall(constructor='IdentityCredentialError', demands=['str', 'IdentityCredentialErrorInit'], returns='IdentityCredentialError'),
    ],
    "getUserInfo": [
        DirectCall(fn='getUserInfo', receiver='IdentityProvider', demands=['IdentityProviderConfig'], returns='IdentityUserInfo'),
    ],
    "TextDecoder": [
        NewCall(constructor='TextDecoder', demands=[], returns='TextDecoder'),
        NewCall(constructor='TextDecoder', demands=['str'], returns='TextDecoder'),
        NewCall(constructor='TextDecoder', demands=['str', 'TextDecoderOptions'], returns='TextDecoder'),
    ],
    "TextEncoder": [
        NewCall(constructor='TextEncoder', demands=[], returns='TextEncoder'),
    ],
    "encodeInto": [
        PrototypeCall(constructor='TextEncoder', fn='encodeInto', demands=['TextEncoder', 'str', 'Uint8Array'], returns='TextEncoderEncodeIntoResult'),
    ],
    "TextDecoderStream": [
        NewCall(constructor='TextDecoderStream', demands=[], returns='TextDecoderStream'),
        NewCall(constructor='TextDecoderStream', demands=['str'], returns='TextDecoderStream'),
        NewCall(constructor='TextDecoderStream', demands=['str', 'TextDecoderOptions'], returns='TextDecoderStream'),
    ],
    "TextEncoderStream": [
        NewCall(constructor='TextEncoderStream', demands=[], returns='TextEncoderStream'),
    ],
    "AnimationEvent": [
        NewCall(constructor='AnimationEvent', demands=['CSSOMString'], returns='AnimationEvent'),
        NewCall(constructor='AnimationEvent', demands=['CSSOMString', 'AnimationEventInit'], returns='AnimationEvent'),
    ],
    "appendRule": [
        PrototypeCall(constructor='CSSKeyframesRule', fn='appendRule', demands=['CSSKeyframesRule', 'CSSOMString'], returns='None'),
    ],
    "deleteRule": [
        PrototypeCall(constructor='CSSKeyframesRule', fn='deleteRule', demands=['CSSKeyframesRule', 'CSSOMString'], returns='None'),
        PrototypeCall(constructor='CSSStyleSheet', fn='deleteRule', demands=['CSSStyleSheet', 'int'], returns='None'),
        PrototypeCall(constructor='CSSGroupingRule', fn='deleteRule', demands=['CSSGroupingRule', 'int'], returns='None'),
    ],
    "findRule": [
        PrototypeCall(constructor='CSSKeyframesRule', fn='findRule', demands=['CSSKeyframesRule', 'CSSOMString'], returns='CSSKeyframeRule'),
    ],
    "XRWebGLBinding": [
        NewCall(constructor='XRWebGLBinding', demands=['XRSession', 'XRWebGLRenderingContext'], returns='XRWebGLBinding'),
    ],
    "createProjectionLayer": [
        PrototypeCall(constructor='XRWebGLBinding', fn='createProjectionLayer', demands=['XRWebGLBinding'], returns='XRProjectionLayer'),
        PrototypeCall(constructor='XRWebGLBinding', fn='createProjectionLayer', demands=['XRWebGLBinding', 'XRProjectionLayerInit'], returns='XRProjectionLayer'),
    ],
    "createQuadLayer": [
        PrototypeCall(constructor='XRWebGLBinding', fn='createQuadLayer', demands=['XRWebGLBinding'], returns='XRQuadLayer'),
        PrototypeCall(constructor='XRWebGLBinding', fn='createQuadLayer', demands=['XRWebGLBinding', 'XRQuadLayerInit'], returns='XRQuadLayer'),
        PrototypeCall(constructor='XRMediaBinding', fn='createQuadLayer', demands=['XRMediaBinding', 'HTMLVideoElement'], returns='XRQuadLayer'),
        PrototypeCall(constructor='XRMediaBinding', fn='createQuadLayer', demands=['XRMediaBinding', 'HTMLVideoElement', 'XRMediaQuadLayerInit'], returns='XRQuadLayer'),
    ],
    "createCylinderLayer": [
        PrototypeCall(constructor='XRWebGLBinding', fn='createCylinderLayer', demands=['XRWebGLBinding'], returns='XRCylinderLayer'),
        PrototypeCall(constructor='XRWebGLBinding', fn='createCylinderLayer', demands=['XRWebGLBinding', 'XRCylinderLayerInit'], returns='XRCylinderLayer'),
        PrototypeCall(constructor='XRMediaBinding', fn='createCylinderLayer', demands=['XRMediaBinding', 'HTMLVideoElement'], returns='XRCylinderLayer'),
        PrototypeCall(constructor='XRMediaBinding', fn='createCylinderLayer', demands=['XRMediaBinding', 'HTMLVideoElement', 'XRMediaCylinderLayerInit'], returns='XRCylinderLayer'),
    ],
    "createEquirectLayer": [
        PrototypeCall(constructor='XRWebGLBinding', fn='createEquirectLayer', demands=['XRWebGLBinding'], returns='XREquirectLayer'),
        PrototypeCall(constructor='XRWebGLBinding', fn='createEquirectLayer', demands=['XRWebGLBinding', 'XREquirectLayerInit'], returns='XREquirectLayer'),
        PrototypeCall(constructor='XRMediaBinding', fn='createEquirectLayer', demands=['XRMediaBinding', 'HTMLVideoElement'], returns='XREquirectLayer'),
        PrototypeCall(constructor='XRMediaBinding', fn='createEquirectLayer', demands=['XRMediaBinding', 'HTMLVideoElement', 'XRMediaEquirectLayerInit'], returns='XREquirectLayer'),
    ],
    "createCubeLayer": [
        PrototypeCall(constructor='XRWebGLBinding', fn='createCubeLayer', demands=['XRWebGLBinding'], returns='XRCubeLayer'),
        PrototypeCall(constructor='XRWebGLBinding', fn='createCubeLayer', demands=['XRWebGLBinding', 'XRCubeLayerInit'], returns='XRCubeLayer'),
    ],
    "getSubImage": [
        PrototypeCall(constructor='XRWebGLBinding', fn='getSubImage', demands=['XRWebGLBinding', 'XRCompositionLayer', 'XRFrame'], returns='XRWebGLSubImage'),
        PrototypeCall(constructor='XRWebGLBinding', fn='getSubImage', demands=['XRWebGLBinding', 'XRCompositionLayer', 'XRFrame', 'XREye'], returns='XRWebGLSubImage'),
    ],
    "getViewSubImage": [
        PrototypeCall(constructor='XRWebGLBinding', fn='getViewSubImage', demands=['XRWebGLBinding', 'XRProjectionLayer', 'XRView'], returns='XRWebGLSubImage'),
    ],
    "foveateBoundTexture": [
        PrototypeCall(constructor='XRWebGLBinding', fn='foveateBoundTexture', demands=['XRWebGLBinding', 'GLenum', 'float'], returns='None'),
    ],
    "XRMediaBinding": [
        NewCall(constructor='XRMediaBinding', demands=['XRSession'], returns='XRMediaBinding'),
    ],
    "XRLayerEvent": [
        NewCall(constructor='XRLayerEvent', demands=['str', 'XRLayerEventInit'], returns='XRLayerEvent'),
    ],
    "getRangeAt": [
        PrototypeCall(constructor='Selection', fn='getRangeAt', demands=['Selection', 'int'], returns='Range'),
    ],
    "addRange": [
        PrototypeCall(constructor='Selection', fn='addRange', demands=['Selection', 'Range'], returns='None'),
    ],
    "removeRange": [
        PrototypeCall(constructor='Selection', fn='removeRange', demands=['Selection', 'Range'], returns='None'),
    ],
    "removeAllRanges": [
        PrototypeCall(constructor='Selection', fn='removeAllRanges', demands=['Selection'], returns='None'),
    ],
    "empty": [
        PrototypeCall(constructor='Selection', fn='empty', demands=['Selection'], returns='None'),
    ],
    "getComposedRanges": [
        PrototypeCall(constructor='Selection', fn='getComposedRanges', demands=['Selection'], returns='StaticRange'),
        PrototypeCall(constructor='Selection', fn='getComposedRanges', demands=['Selection', 'GetComposedRangesOptions'], returns='StaticRange'),
    ],
    "collapse": [
        PrototypeCall(constructor='Selection', fn='collapse', demands=['Selection', 'Node'], returns='None'),
        PrototypeCall(constructor='Selection', fn='collapse', demands=['Selection', 'Node', 'int'], returns='None'),
        PrototypeCall(constructor='Range', fn='collapse', demands=['Range'], returns='None'),
        PrototypeCall(constructor='Range', fn='collapse', demands=['Range', 'bool'], returns='None'),
    ],
    "setPosition": [
        PrototypeCall(constructor='Selection', fn='setPosition', demands=['Selection', 'Node'], returns='None'),
        PrototypeCall(constructor='Selection', fn='setPosition', demands=['Selection', 'Node', 'int'], returns='None'),
        PrototypeCall(constructor='AudioListener', fn='setPosition', demands=['AudioListener', 'float', 'float', 'float'], returns='None'),
        PrototypeCall(constructor='PannerNode', fn='setPosition', demands=['PannerNode', 'float', 'float', 'float'], returns='None'),
    ],
    "collapseToStart": [
        PrototypeCall(constructor='Selection', fn='collapseToStart', demands=['Selection'], returns='None'),
    ],
    "collapseToEnd": [
        PrototypeCall(constructor='Selection', fn='collapseToEnd', demands=['Selection'], returns='None'),
    ],
    "extend": [
        PrototypeCall(constructor='Selection', fn='extend', demands=['Selection', 'Node'], returns='None'),
        PrototypeCall(constructor='Selection', fn='extend', demands=['Selection', 'Node', 'int'], returns='None'),
    ],
    "setBaseAndExtent": [
        PrototypeCall(constructor='Selection', fn='setBaseAndExtent', demands=['Selection', 'Node', 'int', 'Node', 'int'], returns='None'),
    ],
    "selectAllChildren": [
        PrototypeCall(constructor='Selection', fn='selectAllChildren', demands=['Selection', 'Node'], returns='None'),
    ],
    "modify": [
        PrototypeCall(constructor='Selection', fn='modify', demands=['Selection'], returns='None'),
        PrototypeCall(constructor='Selection', fn='modify', demands=['Selection', 'str'], returns='None'),
        PrototypeCall(constructor='Selection', fn='modify', demands=['Selection', 'str', 'str'], returns='None'),
        PrototypeCall(constructor='Selection', fn='modify', demands=['Selection', 'str', 'str', 'str'], returns='None'),
    ],
    "deleteFromDocument": [
        PrototypeCall(constructor='Selection', fn='deleteFromDocument', demands=['Selection'], returns='None'),
    ],
    "containsNode": [
        PrototypeCall(constructor='Selection', fn='containsNode', demands=['Selection', 'Node'], returns='bool'),
        PrototypeCall(constructor='Selection', fn='containsNode', demands=['Selection', 'Node', 'bool'], returns='bool'),
    ],
    "ReportingObserver": [
        NewCall(constructor='ReportingObserver', demands=['ReportingObserverCallback'], returns='ReportingObserver'),
        NewCall(constructor='ReportingObserver', demands=['ReportingObserverCallback', 'ReportingObserverOptions'], returns='ReportingObserver'),
    ],
    "contributeToHistogram": [
        PrototypeCall(constructor='PrivateAggregation', fn='contributeToHistogram', demands=['PrivateAggregation', 'PAHistogramContribution'], returns='None'),
        PrototypeCall(constructor='RealTimeReporting', fn='contributeToHistogram', demands=['RealTimeReporting', 'RealTimeContribution'], returns='None'),
    ],
    "contributeToHistogramOnEvent": [
        PrototypeCall(constructor='PrivateAggregation', fn='contributeToHistogramOnEvent', demands=['PrivateAggregation', 'str', 'str'], returns='None'),
    ],
    "enableDebugMode": [
        PrototypeCall(constructor='PrivateAggregation', fn='enableDebugMode', demands=['PrivateAggregation'], returns='None'),
        PrototypeCall(constructor='PrivateAggregation', fn='enableDebugMode', demands=['PrivateAggregation', 'PADebugModeOptions'], returns='None'),
    ],
    "willRequestConditionalCreation": [
        DirectCall(fn='willRequestConditionalCreation', receiver='Credential', demands=[], returns='None'),
    ],
    "store": [
        PrototypeCall(constructor='CredentialsContainer', fn='store', demands=['CredentialsContainer', 'Credential'], returns='None'),
    ],
    "preventSilentAccess": [
        PrototypeCall(constructor='CredentialsContainer', fn='preventSilentAccess', demands=['CredentialsContainer'], returns='None'),
    ],
    "PasswordCredential": [
        NewCall(constructor='PasswordCredential', demands=['HTMLFormElement'], returns='PasswordCredential'),
        NewCall(constructor='PasswordCredential', demands=['PasswordCredentialData'], returns='PasswordCredential'),
    ],
    "FederatedCredential": [
        NewCall(constructor='FederatedCredential', demands=['FederatedCredentialInit'], returns='FederatedCredential'),
    ],
    "addListener": [
        PrototypeCall(constructor='MediaQueryList', fn='addListener', demands=['MediaQueryList', 'EventListener'], returns='None'),
    ],
    "removeListener": [
        PrototypeCall(constructor='MediaQueryList', fn='removeListener', demands=['MediaQueryList', 'EventListener'], returns='None'),
    ],
    "MediaQueryListEvent": [
        NewCall(constructor='MediaQueryListEvent', demands=['CSSOMString'], returns='MediaQueryListEvent'),
        NewCall(constructor='MediaQueryListEvent', demands=['CSSOMString', 'MediaQueryListEventInit'], returns='MediaQueryListEvent'),
    ],
    "getClientRect": [
        PrototypeCall(constructor='CaretPosition', fn='getClientRect', demands=['CaretPosition'], returns='DOMRect'),
    ],
    "getTranslatedShaderSource": [
        PrototypeCall(constructor='WEBGL_debug_shaders', fn='getTranslatedShaderSource', demands=['WEBGL_debug_shaders', 'WebGLShader'], returns='str'),
    ],
    "NDEFMessage": [
        NewCall(constructor='NDEFMessage', demands=['NDEFMessageInit'], returns='NDEFMessage'),
    ],
    "NDEFRecord": [
        NewCall(constructor='NDEFRecord', demands=['NDEFRecordInit'], returns='NDEFRecord'),
    ],
    "toRecords": [
        PrototypeCall(constructor='NDEFRecord', fn='toRecords', demands=['NDEFRecord'], returns='NDEFRecord'),
    ],
    "NDEFReader": [
        NewCall(constructor='NDEFReader', demands=[], returns='NDEFReader'),
    ],
    "scan": [
        PrototypeCall(constructor='NDEFReader', fn='scan', demands=['NDEFReader'], returns='None'),
        PrototypeCall(constructor='NDEFReader', fn='scan', demands=['NDEFReader', 'NDEFScanOptions'], returns='None'),
    ],
    "makeReadOnly": [
        PrototypeCall(constructor='NDEFReader', fn='makeReadOnly', demands=['NDEFReader'], returns='None'),
        PrototypeCall(constructor='NDEFReader', fn='makeReadOnly', demands=['NDEFReader', 'NDEFMakeReadOnlyOptions'], returns='None'),
    ],
    "NDEFReadingEvent": [
        NewCall(constructor='NDEFReadingEvent', demands=['str', 'NDEFReadingEventInit'], returns='NDEFReadingEvent'),
    ],
    "PerformanceMark": [
        NewCall(constructor='PerformanceMark', demands=['str'], returns='PerformanceMark'),
        NewCall(constructor='PerformanceMark', demands=['str', 'PerformanceMarkOptions'], returns='PerformanceMark'),
    ],
    "getSubscriptions": [
        PrototypeCall(constructor='CookieStoreManager', fn='getSubscriptions', demands=['CookieStoreManager'], returns='CookieStoreGetOptions'),
    ],
    "CookieChangeEvent": [
        NewCall(constructor='CookieChangeEvent', demands=['str'], returns='CookieChangeEvent'),
        NewCall(constructor='CookieChangeEvent', demands=['str', 'CookieChangeEventInit'], returns='CookieChangeEvent'),
    ],
    "ExtendableCookieChangeEvent": [
        NewCall(constructor='ExtendableCookieChangeEvent', demands=['str'], returns='ExtendableCookieChangeEvent'),
        NewCall(constructor='ExtendableCookieChangeEvent', demands=['str', 'ExtendableCookieChangeEventInit'], returns='ExtendableCookieChangeEvent'),
    ],
    "clearOverride": [
        PrototypeCall(constructor='PreferenceObject', fn='clearOverride', demands=['PreferenceObject'], returns='None'),
    ],
    "requestOverride": [
        PrototypeCall(constructor='PreferenceObject', fn='requestOverride', demands=['PreferenceObject', 'str'], returns='None'),
    ],
    "provokingVertexWEBGL": [
        PrototypeCall(constructor='WEBGL_provoking_vertex', fn='provokingVertexWEBGL', demands=['WEBGL_provoking_vertex', 'GLenum'], returns='None'),
    ],
    "Highlight": [
        NewCall(constructor='Highlight', demands=['AbstractRange'], returns='Highlight'),
    ],
    "Gyroscope": [
        NewCall(constructor='Gyroscope', demands=[], returns='Gyroscope'),
        NewCall(constructor='Gyroscope', demands=['GyroscopeSensorOptions'], returns='Gyroscope'),
    ],
    "IDBVersionChangeEvent": [
        NewCall(constructor='IDBVersionChangeEvent', demands=['str'], returns='IDBVersionChangeEvent'),
        NewCall(constructor='IDBVersionChangeEvent', demands=['str', 'IDBVersionChangeEventInit'], returns='IDBVersionChangeEvent'),
    ],
    "deleteDatabase": [
        PrototypeCall(constructor='IDBFactory', fn='deleteDatabase', demands=['IDBFactory', 'str'], returns='IDBOpenDBRequest'),
    ],
    "databases": [
        PrototypeCall(constructor='IDBFactory', fn='databases', demands=['IDBFactory'], returns='IDBDatabaseInfo'),
    ],
    "cmp": [
        PrototypeCall(constructor='IDBFactory', fn='cmp', demands=['IDBFactory', '*', '*'], returns='short'),
    ],
    "transaction": [
        PrototypeCall(constructor='IDBDatabase', fn='transaction', demands=['IDBDatabase', 'str'], returns='IDBTransaction'),
        PrototypeCall(constructor='IDBDatabase', fn='transaction', demands=['IDBDatabase', 'str', 'IDBTransactionMode'], returns='IDBTransaction'),
        PrototypeCall(constructor='IDBDatabase', fn='transaction', demands=['IDBDatabase', 'str', 'IDBTransactionMode', 'IDBTransactionOptions'], returns='IDBTransaction'),
    ],
    "createObjectStore": [
        PrototypeCall(constructor='IDBDatabase', fn='createObjectStore', demands=['IDBDatabase', 'str'], returns='IDBObjectStore'),
        PrototypeCall(constructor='IDBDatabase', fn='createObjectStore', demands=['IDBDatabase', 'str', 'IDBObjectStoreParameters'], returns='IDBObjectStore'),
    ],
    "deleteObjectStore": [
        PrototypeCall(constructor='IDBDatabase', fn='deleteObjectStore', demands=['IDBDatabase', 'str'], returns='None'),
    ],
    "put": [
        PrototypeCall(constructor='IDBObjectStore', fn='put', demands=['IDBObjectStore', '*'], returns='IDBRequest'),
        PrototypeCall(constructor='IDBObjectStore', fn='put', demands=['IDBObjectStore', '*', '*'], returns='IDBRequest'),
        PrototypeCall(constructor='Cache', fn='put', demands=['Cache', 'RequestInfo', 'Response'], returns='None'),
    ],
    "getAllKeys": [
        PrototypeCall(constructor='IDBObjectStore', fn='getAllKeys', demands=['IDBObjectStore'], returns='IDBRequest'),
        PrototypeCall(constructor='IDBObjectStore', fn='getAllKeys', demands=['IDBObjectStore', '*'], returns='IDBRequest'),
        PrototypeCall(constructor='IDBObjectStore', fn='getAllKeys', demands=['IDBObjectStore', '*', 'int'], returns='IDBRequest'),
        PrototypeCall(constructor='IDBIndex', fn='getAllKeys', demands=['IDBIndex'], returns='IDBRequest'),
        PrototypeCall(constructor='IDBIndex', fn='getAllKeys', demands=['IDBIndex', '*'], returns='IDBRequest'),
        PrototypeCall(constructor='IDBIndex', fn='getAllKeys', demands=['IDBIndex', '*', 'int'], returns='IDBRequest'),
    ],
    "getAllRecords": [
        PrototypeCall(constructor='IDBObjectStore', fn='getAllRecords', demands=['IDBObjectStore'], returns='IDBRequest'),
        PrototypeCall(constructor='IDBObjectStore', fn='getAllRecords', demands=['IDBObjectStore', 'IDBGetAllOptions'], returns='IDBRequest'),
        PrototypeCall(constructor='IDBIndex', fn='getAllRecords', demands=['IDBIndex'], returns='IDBRequest'),
        PrototypeCall(constructor='IDBIndex', fn='getAllRecords', demands=['IDBIndex', 'IDBGetAllOptions'], returns='IDBRequest'),
    ],
    "count": [
        PrototypeCall(constructor='IDBObjectStore', fn='count', demands=['IDBObjectStore'], returns='IDBRequest'),
        PrototypeCall(constructor='IDBObjectStore', fn='count', demands=['IDBObjectStore', '*'], returns='IDBRequest'),
        PrototypeCall(constructor='IDBIndex', fn='count', demands=['IDBIndex'], returns='IDBRequest'),
        PrototypeCall(constructor='IDBIndex', fn='count', demands=['IDBIndex', '*'], returns='IDBRequest'),
    ],
    "openCursor": [
        PrototypeCall(constructor='IDBObjectStore', fn='openCursor', demands=['IDBObjectStore'], returns='IDBRequest'),
        PrototypeCall(constructor='IDBObjectStore', fn='openCursor', demands=['IDBObjectStore', '*'], returns='IDBRequest'),
        PrototypeCall(constructor='IDBObjectStore', fn='openCursor', demands=['IDBObjectStore', '*', 'IDBCursorDirection'], returns='IDBRequest'),
        PrototypeCall(constructor='IDBIndex', fn='openCursor', demands=['IDBIndex'], returns='IDBRequest'),
        PrototypeCall(constructor='IDBIndex', fn='openCursor', demands=['IDBIndex', '*'], returns='IDBRequest'),
        PrototypeCall(constructor='IDBIndex', fn='openCursor', demands=['IDBIndex', '*', 'IDBCursorDirection'], returns='IDBRequest'),
    ],
    "openKeyCursor": [
        PrototypeCall(constructor='IDBObjectStore', fn='openKeyCursor', demands=['IDBObjectStore'], returns='IDBRequest'),
        PrototypeCall(constructor='IDBObjectStore', fn='openKeyCursor', demands=['IDBObjectStore', '*'], returns='IDBRequest'),
        PrototypeCall(constructor='IDBObjectStore', fn='openKeyCursor', demands=['IDBObjectStore', '*', 'IDBCursorDirection'], returns='IDBRequest'),
        PrototypeCall(constructor='IDBIndex', fn='openKeyCursor', demands=['IDBIndex'], returns='IDBRequest'),
        PrototypeCall(constructor='IDBIndex', fn='openKeyCursor', demands=['IDBIndex', '*'], returns='IDBRequest'),
        PrototypeCall(constructor='IDBIndex', fn='openKeyCursor', demands=['IDBIndex', '*', 'IDBCursorDirection'], returns='IDBRequest'),
    ],
    "index": [
        PrototypeCall(constructor='IDBObjectStore', fn='index', demands=['IDBObjectStore', 'str'], returns='IDBIndex'),
    ],
    "createIndex": [
        PrototypeCall(constructor='IDBObjectStore', fn='createIndex', demands=['IDBObjectStore', 'str', 'str'], returns='IDBIndex'),
        PrototypeCall(constructor='IDBObjectStore', fn='createIndex', demands=['IDBObjectStore', 'str', 'str', 'IDBIndexParameters'], returns='IDBIndex'),
    ],
    "deleteIndex": [
        PrototypeCall(constructor='IDBObjectStore', fn='deleteIndex', demands=['IDBObjectStore', 'str'], returns='None'),
    ],
    "only": [
        DirectCall(fn='only', receiver='IDBKeyRange', demands=['*'], returns='IDBKeyRange'),
    ],
    "lowerBound": [
        DirectCall(fn='lowerBound', receiver='IDBKeyRange', demands=['*'], returns='IDBKeyRange'),
        DirectCall(fn='lowerBound', receiver='IDBKeyRange', demands=['*', 'bool'], returns='IDBKeyRange'),
    ],
    "upperBound": [
        DirectCall(fn='upperBound', receiver='IDBKeyRange', demands=['*'], returns='IDBKeyRange'),
        DirectCall(fn='upperBound', receiver='IDBKeyRange', demands=['*', 'bool'], returns='IDBKeyRange'),
    ],
    "bound": [
        DirectCall(fn='bound', receiver='IDBKeyRange', demands=['*', '*'], returns='IDBKeyRange'),
        DirectCall(fn='bound', receiver='IDBKeyRange', demands=['*', '*', 'bool'], returns='IDBKeyRange'),
        DirectCall(fn='bound', receiver='IDBKeyRange', demands=['*', '*', 'bool', 'bool'], returns='IDBKeyRange'),
    ],
    "includes": [
        PrototypeCall(constructor='IDBKeyRange', fn='includes', demands=['IDBKeyRange', '*'], returns='bool'),
    ],
    "advance": [
        PrototypeCall(constructor='IDBCursor', fn='advance', demands=['IDBCursor', 'int'], returns='None'),
    ],
    "continue": [
        PrototypeCall(constructor='IDBCursor', fn='continue', demands=['IDBCursor'], returns='None'),
        PrototypeCall(constructor='IDBCursor', fn='continue', demands=['IDBCursor', '*'], returns='None'),
    ],
    "continuePrimaryKey": [
        PrototypeCall(constructor='IDBCursor', fn='continuePrimaryKey', demands=['IDBCursor', '*', '*'], returns='None'),
    ],
    "update": [
        PrototypeCall(constructor='IDBCursor', fn='update', demands=['IDBCursor', '*'], returns='IDBRequest'),
        PrototypeCall(constructor='ServiceWorkerRegistration', fn='update', demands=['ServiceWorkerRegistration'], returns='ServiceWorkerRegistration'),
        PrototypeCall(constructor='MediaKeySession', fn='update', demands=['MediaKeySession', 'BufferSource'], returns='None'),
    ],
    "objectStore": [
        PrototypeCall(constructor='IDBTransaction', fn='objectStore', demands=['IDBTransaction', 'str'], returns='IDBObjectStore'),
    ],
    "commit": [
        PrototypeCall(constructor='IDBTransaction', fn='commit', demands=['IDBTransaction'], returns='None'),
        PrototypeCall(constructor='WebTransportWriter', fn='commit', demands=['WebTransportWriter'], returns='None'),
    ],
    "startDrawing": [
        PrototypeCall(constructor='HandwritingRecognizer', fn='startDrawing', demands=['HandwritingRecognizer'], returns='HandwritingDrawing'),
        PrototypeCall(constructor='HandwritingRecognizer', fn='startDrawing', demands=['HandwritingRecognizer', 'HandwritingHints'], returns='HandwritingDrawing'),
    ],
    "finish": [
        PrototypeCall(constructor='HandwritingRecognizer', fn='finish', demands=['HandwritingRecognizer'], returns='None'),
        PrototypeCall(constructor='GPUCommandEncoder', fn='finish', demands=['GPUCommandEncoder'], returns='GPUCommandBuffer'),
        PrototypeCall(constructor='GPUCommandEncoder', fn='finish', demands=['GPUCommandEncoder', 'GPUCommandBufferDescriptor'], returns='GPUCommandBuffer'),
        PrototypeCall(constructor='GPURenderBundleEncoder', fn='finish', demands=['GPURenderBundleEncoder'], returns='GPURenderBundle'),
        PrototypeCall(constructor='GPURenderBundleEncoder', fn='finish', demands=['GPURenderBundleEncoder', 'GPURenderBundleDescriptor'], returns='GPURenderBundle'),
        PrototypeCall(constructor='Animation', fn='finish', demands=['Animation'], returns='None'),
    ],
    "addStroke": [
        PrototypeCall(constructor='HandwritingDrawing', fn='addStroke', demands=['HandwritingDrawing', 'HandwritingStroke'], returns='None'),
    ],
    "removeStroke": [
        PrototypeCall(constructor='HandwritingDrawing', fn='removeStroke', demands=['HandwritingDrawing', 'HandwritingStroke'], returns='None'),
    ],
    "getStrokes": [
        PrototypeCall(constructor='HandwritingDrawing', fn='getStrokes', demands=['HandwritingDrawing'], returns='HandwritingStroke'),
    ],
    "getPrediction": [
        PrototypeCall(constructor='HandwritingDrawing', fn='getPrediction', demands=['HandwritingDrawing'], returns='HandwritingPrediction'),
    ],
    "HandwritingStroke": [
        NewCall(constructor='HandwritingStroke', demands=[], returns='HandwritingStroke'),
    ],
    "addPoint": [
        PrototypeCall(constructor='HandwritingStroke', fn='addPoint', demands=['HandwritingStroke', 'HandwritingPoint'], returns='None'),
    ],
    "getPoints": [
        PrototypeCall(constructor='HandwritingStroke', fn='getPoints', demands=['HandwritingStroke'], returns='HandwritingPoint'),
    ],
    "Event": [
        NewCall(constructor='Event', demands=['str'], returns='Event'),
        NewCall(constructor='Event', demands=['str', 'EventInit'], returns='Event'),
    ],
    "composedPath": [
        PrototypeCall(constructor='Event', fn='composedPath', demands=['Event'], returns='EventTarget'),
    ],
    "stopPropagation": [
        PrototypeCall(constructor='Event', fn='stopPropagation', demands=['Event'], returns='None'),
    ],
    "stopImmediatePropagation": [
        PrototypeCall(constructor='Event', fn='stopImmediatePropagation', demands=['Event'], returns='None'),
    ],
    "preventDefault": [
        PrototypeCall(constructor='Event', fn='preventDefault', demands=['Event'], returns='None'),
    ],
    "initEvent": [
        PrototypeCall(constructor='Event', fn='initEvent', demands=['Event', 'str'], returns='None'),
        PrototypeCall(constructor='Event', fn='initEvent', demands=['Event', 'str', 'bool'], returns='None'),
        PrototypeCall(constructor='Event', fn='initEvent', demands=['Event', 'str', 'bool', 'bool'], returns='None'),
    ],
    "CustomEvent": [
        NewCall(constructor='CustomEvent', demands=['str'], returns='CustomEvent'),
        NewCall(constructor='CustomEvent', demands=['str', 'CustomEventInit'], returns='CustomEvent'),
    ],
    "initCustomEvent": [
        PrototypeCall(constructor='CustomEvent', fn='initCustomEvent', demands=['CustomEvent', 'str'], returns='None'),
        PrototypeCall(constructor='CustomEvent', fn='initCustomEvent', demands=['CustomEvent', 'str', 'bool'], returns='None'),
        PrototypeCall(constructor='CustomEvent', fn='initCustomEvent', demands=['CustomEvent', 'str', 'bool', 'bool'], returns='None'),
        PrototypeCall(constructor='CustomEvent', fn='initCustomEvent', demands=['CustomEvent', 'str', 'bool', 'bool', '*'], returns='None'),
    ],
    "EventTarget": [
        NewCall(constructor='EventTarget', demands=[], returns='EventTarget'),
    ],
    "addEventListener": [
        PrototypeCall(constructor='EventTarget', fn='addEventListener', demands=['EventTarget', 'str', 'EventListener'], returns='None'),
        PrototypeCall(constructor='EventTarget', fn='addEventListener', demands=['EventTarget', 'str', 'EventListener', 'AddEventListenerOptions'], returns='None'),
    ],
    "removeEventListener": [
        PrototypeCall(constructor='EventTarget', fn='removeEventListener', demands=['EventTarget', 'str', 'EventListener'], returns='None'),
        PrototypeCall(constructor='EventTarget', fn='removeEventListener', demands=['EventTarget', 'str', 'EventListener', 'EventListenerOptions'], returns='None'),
    ],
    "dispatchEvent": [
        PrototypeCall(constructor='EventTarget', fn='dispatchEvent', demands=['EventTarget', 'Event'], returns='bool'),
    ],
    "AbortController": [
        NewCall(constructor='AbortController', demands=[], returns='AbortController'),
    ],
    "timeout": [
        DirectCall(fn='timeout', receiver='AbortSignal', demands=['int'], returns='AbortSignal'),
    ],
    "any": [
        DirectCall(fn='any', receiver='AbortSignal', demands=['AbortSignal'], returns='AbortSignal'),
        DirectCall(fn='any', receiver='TaskSignal', demands=['AbortSignal'], returns='TaskSignal'),
        DirectCall(fn='any', receiver='TaskSignal', demands=['AbortSignal', 'TaskSignalAnyInit'], returns='TaskSignal'),
    ],
    "throwIfAborted": [
        PrototypeCall(constructor='AbortSignal', fn='throwIfAborted', demands=['AbortSignal'], returns='None'),
    ],
    "MutationObserver": [
        NewCall(constructor='MutationObserver', demands=['MutationCallback'], returns='MutationObserver'),
    ],
    "getRootNode": [
        PrototypeCall(constructor='Node', fn='getRootNode', demands=['Node'], returns='Node'),
        PrototypeCall(constructor='Node', fn='getRootNode', demands=['Node', 'GetRootNodeOptions'], returns='Node'),
    ],
    "hasChildNodes": [
        PrototypeCall(constructor='Node', fn='hasChildNodes', demands=['Node'], returns='bool'),
    ],
    "normalize": [
        PrototypeCall(constructor='Node', fn='normalize', demands=['Node'], returns='None'),
    ],
    "cloneNode": [
        PrototypeCall(constructor='Node', fn='cloneNode', demands=['Node'], returns='Node'),
        PrototypeCall(constructor='Node', fn='cloneNode', demands=['Node', 'bool'], returns='Node'),
    ],
    "isEqualNode": [
        PrototypeCall(constructor='Node', fn='isEqualNode', demands=['Node', 'Node'], returns='bool'),
    ],
    "isSameNode": [
        PrototypeCall(constructor='Node', fn='isSameNode', demands=['Node', 'Node'], returns='bool'),
    ],
    "compareDocumentPosition": [
        PrototypeCall(constructor='Node', fn='compareDocumentPosition', demands=['Node', 'Node'], returns='unsigned short'),
    ],
    "lookupPrefix": [
        PrototypeCall(constructor='Node', fn='lookupPrefix', demands=['Node', 'str'], returns='str'),
    ],
    "lookupNamespaceURI": [
        PrototypeCall(constructor='Node', fn='lookupNamespaceURI', demands=['Node', 'str'], returns='str'),
    ],
    "isDefaultNamespace": [
        PrototypeCall(constructor='Node', fn='isDefaultNamespace', demands=['Node', 'str'], returns='bool'),
    ],
    "insertBefore": [
        PrototypeCall(constructor='Node', fn='insertBefore', demands=['Node', 'Node', 'Node'], returns='Node'),
    ],
    "appendChild": [
        PrototypeCall(constructor='Node', fn='appendChild', demands=['Node', 'Node'], returns='Node'),
    ],
    "replaceChild": [
        PrototypeCall(constructor='Node', fn='replaceChild', demands=['Node', 'Node', 'Node'], returns='Node'),
    ],
    "removeChild": [
        PrototypeCall(constructor='Node', fn='removeChild', demands=['Node', 'Node'], returns='Node'),
    ],
    "Document": [
        NewCall(constructor='Document', demands=[], returns='Document'),
    ],
    "getElementsByTagName": [
        PrototypeCall(constructor='Document', fn='getElementsByTagName', demands=['Document', 'str'], returns='HTMLCollection'),
        PrototypeCall(constructor='Element', fn='getElementsByTagName', demands=['Element', 'str'], returns='HTMLCollection'),
    ],
    "getElementsByTagNameNS": [
        PrototypeCall(constructor='Document', fn='getElementsByTagNameNS', demands=['Document', 'str', 'str'], returns='HTMLCollection'),
        PrototypeCall(constructor='Element', fn='getElementsByTagNameNS', demands=['Element', 'str', 'str'], returns='HTMLCollection'),
    ],
    "getElementsByClassName": [
        PrototypeCall(constructor='Document', fn='getElementsByClassName', demands=['Document', 'str'], returns='HTMLCollection'),
        PrototypeCall(constructor='Element', fn='getElementsByClassName', demands=['Element', 'str'], returns='HTMLCollection'),
    ],
    "createElement": [
        PrototypeCall(constructor='Document', fn='createElement', demands=['Document', 'str'], returns='Element'),
        PrototypeCall(constructor='Document', fn='createElement', demands=['Document', 'str', 'str'], returns='Element'),
    ],
    "createElementNS": [
        PrototypeCall(constructor='Document', fn='createElementNS', demands=['Document', 'str', 'str'], returns='Element'),
        PrototypeCall(constructor='Document', fn='createElementNS', demands=['Document', 'str', 'str', 'str'], returns='Element'),
    ],
    "createDocumentFragment": [
        PrototypeCall(constructor='Document', fn='createDocumentFragment', demands=['Document'], returns='DocumentFragment'),
    ],
    "createTextNode": [
        PrototypeCall(constructor='Document', fn='createTextNode', demands=['Document', 'str'], returns='Text'),
    ],
    "createCDATASection": [
        PrototypeCall(constructor='Document', fn='createCDATASection', demands=['Document', 'str'], returns='CDATASection'),
    ],
    "createComment": [
        PrototypeCall(constructor='Document', fn='createComment', demands=['Document', 'str'], returns='Comment'),
    ],
    "createProcessingInstruction": [
        PrototypeCall(constructor='Document', fn='createProcessingInstruction', demands=['Document', 'str', 'str'], returns='ProcessingInstruction'),
    ],
    "importNode": [
        PrototypeCall(constructor='Document', fn='importNode', demands=['Document', 'Node'], returns='Node'),
        PrototypeCall(constructor='Document', fn='importNode', demands=['Document', 'Node', 'bool'], returns='Node'),
    ],
    "adoptNode": [
        PrototypeCall(constructor='Document', fn='adoptNode', demands=['Document', 'Node'], returns='Node'),
    ],
    "createAttribute": [
        PrototypeCall(constructor='Document', fn='createAttribute', demands=['Document', 'str'], returns='Attr'),
    ],
    "createAttributeNS": [
        PrototypeCall(constructor='Document', fn='createAttributeNS', demands=['Document', 'str', 'str'], returns='Attr'),
    ],
    "createEvent": [
        PrototypeCall(constructor='Document', fn='createEvent', demands=['Document', 'str'], returns='Event'),
    ],
    "createRange": [
        PrototypeCall(constructor='Document', fn='createRange', demands=['Document'], returns='Range'),
    ],
    "createNodeIterator": [
        PrototypeCall(constructor='Document', fn='createNodeIterator', demands=['Document', 'Node'], returns='NodeIterator'),
        PrototypeCall(constructor='Document', fn='createNodeIterator', demands=['Document', 'Node', 'int'], returns='NodeIterator'),
        PrototypeCall(constructor='Document', fn='createNodeIterator', demands=['Document', 'Node', 'int', 'NodeFilter'], returns='NodeIterator'),
    ],
    "createTreeWalker": [
        PrototypeCall(constructor='Document', fn='createTreeWalker', demands=['Document', 'Node'], returns='TreeWalker'),
        PrototypeCall(constructor='Document', fn='createTreeWalker', demands=['Document', 'Node', 'int'], returns='TreeWalker'),
        PrototypeCall(constructor='Document', fn='createTreeWalker', demands=['Document', 'Node', 'int', 'NodeFilter'], returns='TreeWalker'),
    ],
    "createDocumentType": [
        PrototypeCall(constructor='DOMImplementation', fn='createDocumentType', demands=['DOMImplementation', 'str', 'str', 'str'], returns='DocumentType'),
    ],
    "createDocument": [
        PrototypeCall(constructor='DOMImplementation', fn='createDocument', demands=['DOMImplementation', 'str', 'str'], returns='XMLDocument'),
        PrototypeCall(constructor='DOMImplementation', fn='createDocument', demands=['DOMImplementation', 'str', 'str', 'DocumentType'], returns='XMLDocument'),
    ],
    "createHTMLDocument": [
        PrototypeCall(constructor='DOMImplementation', fn='createHTMLDocument', demands=['DOMImplementation'], returns='Document'),
        PrototypeCall(constructor='DOMImplementation', fn='createHTMLDocument', demands=['DOMImplementation', 'str'], returns='Document'),
    ],
    "hasFeature": [
        PrototypeCall(constructor='DOMImplementation', fn='hasFeature', demands=['DOMImplementation'], returns='bool'),
        PrototypeCall(constructor='EpubReadingSystem', fn='hasFeature', demands=['EpubReadingSystem', 'str'], returns='bool'),
        PrototypeCall(constructor='EpubReadingSystem', fn='hasFeature', demands=['EpubReadingSystem', 'str', 'str'], returns='bool'),
    ],
    "DocumentFragment": [
        NewCall(constructor='DocumentFragment', demands=[], returns='DocumentFragment'),
    ],
    "hasAttributes": [
        PrototypeCall(constructor='Element', fn='hasAttributes', demands=['Element'], returns='bool'),
    ],
    "getAttributeNames": [
        PrototypeCall(constructor='Element', fn='getAttributeNames', demands=['Element'], returns='str'),
    ],
    "getAttribute": [
        PrototypeCall(constructor='Element', fn='getAttribute', demands=['Element', 'str'], returns='str'),
    ],
    "getAttributeNS": [
        PrototypeCall(constructor='Element', fn='getAttributeNS', demands=['Element', 'str', 'str'], returns='str'),
    ],
    "setAttribute": [
        PrototypeCall(constructor='Element', fn='setAttribute', demands=['Element', 'str', 'str'], returns='None'),
    ],
    "setAttributeNS": [
        PrototypeCall(constructor='Element', fn='setAttributeNS', demands=['Element', 'str', 'str', 'str'], returns='None'),
    ],
    "removeAttributeNS": [
        PrototypeCall(constructor='Element', fn='removeAttributeNS', demands=['Element', 'str', 'str'], returns='None'),
    ],
    "toggleAttribute": [
        PrototypeCall(constructor='Element', fn='toggleAttribute', demands=['Element', 'str'], returns='bool'),
        PrototypeCall(constructor='Element', fn='toggleAttribute', demands=['Element', 'str', 'bool'], returns='bool'),
    ],
    "hasAttribute": [
        PrototypeCall(constructor='Element', fn='hasAttribute', demands=['Element', 'str'], returns='bool'),
    ],
    "hasAttributeNS": [
        PrototypeCall(constructor='Element', fn='hasAttributeNS', demands=['Element', 'str', 'str'], returns='bool'),
    ],
    "getAttributeNode": [
        PrototypeCall(constructor='Element', fn='getAttributeNode', demands=['Element', 'str'], returns='Attr'),
    ],
    "getAttributeNodeNS": [
        PrototypeCall(constructor='Element', fn='getAttributeNodeNS', demands=['Element', 'str', 'str'], returns='Attr'),
    ],
    "setAttributeNode": [
        PrototypeCall(constructor='Element', fn='setAttributeNode', demands=['Element', 'Attr'], returns='Attr'),
    ],
    "setAttributeNodeNS": [
        PrototypeCall(constructor='Element', fn='setAttributeNodeNS', demands=['Element', 'Attr'], returns='Attr'),
    ],
    "removeAttributeNode": [
        PrototypeCall(constructor='Element', fn='removeAttributeNode', demands=['Element', 'Attr'], returns='Attr'),
    ],
    "attachShadow": [
        PrototypeCall(constructor='Element', fn='attachShadow', demands=['Element', 'ShadowRootInit'], returns='ShadowRoot'),
    ],
    "closest": [
        PrototypeCall(constructor='Element', fn='closest', demands=['Element', 'str'], returns='Element'),
    ],
    "matches": [
        PrototypeCall(constructor='Element', fn='matches', demands=['Element', 'str'], returns='bool'),
    ],
    "webkitMatchesSelector": [
        PrototypeCall(constructor='Element', fn='webkitMatchesSelector', demands=['Element', 'str'], returns='bool'),
    ],
    "insertAdjacentElement": [
        PrototypeCall(constructor='Element', fn='insertAdjacentElement', demands=['Element', 'str', 'Element'], returns='Element'),
    ],
    "insertAdjacentText": [
        PrototypeCall(constructor='Element', fn='insertAdjacentText', demands=['Element', 'str', 'str'], returns='None'),
    ],
    "getNamedItem": [
        PrototypeCall(constructor='NamedNodeMap', fn='getNamedItem', demands=['NamedNodeMap', 'str'], returns='Attr'),
    ],
    "getNamedItemNS": [
        PrototypeCall(constructor='NamedNodeMap', fn='getNamedItemNS', demands=['NamedNodeMap', 'str', 'str'], returns='Attr'),
    ],
    "setNamedItem": [
        PrototypeCall(constructor='NamedNodeMap', fn='setNamedItem', demands=['NamedNodeMap', 'Attr'], returns='Attr'),
    ],
    "setNamedItemNS": [
        PrototypeCall(constructor='NamedNodeMap', fn='setNamedItemNS', demands=['NamedNodeMap', 'Attr'], returns='Attr'),
    ],
    "removeNamedItem": [
        PrototypeCall(constructor='NamedNodeMap', fn='removeNamedItem', demands=['NamedNodeMap', 'str'], returns='Attr'),
    ],
    "removeNamedItemNS": [
        PrototypeCall(constructor='NamedNodeMap', fn='removeNamedItemNS', demands=['NamedNodeMap', 'str', 'str'], returns='Attr'),
    ],
    "substringData": [
        PrototypeCall(constructor='CharacterData', fn='substringData', demands=['CharacterData', 'int', 'int'], returns='str'),
    ],
    "appendData": [
        PrototypeCall(constructor='CharacterData', fn='appendData', demands=['CharacterData', 'str'], returns='None'),
    ],
    "insertData": [
        PrototypeCall(constructor='CharacterData', fn='insertData', demands=['CharacterData', 'int', 'str'], returns='None'),
    ],
    "deleteData": [
        PrototypeCall(constructor='CharacterData', fn='deleteData', demands=['CharacterData', 'int', 'int'], returns='None'),
    ],
    "replaceData": [
        PrototypeCall(constructor='CharacterData', fn='replaceData', demands=['CharacterData', 'int', 'int', 'str'], returns='None'),
    ],
    "Text": [
        NewCall(constructor='Text', demands=[], returns='Text'),
        NewCall(constructor='Text', demands=['str'], returns='Text'),
    ],
    "splitText": [
        PrototypeCall(constructor='Text', fn='splitText', demands=['Text', 'int'], returns='Text'),
    ],
    "Comment": [
        NewCall(constructor='Comment', demands=[], returns='Comment'),
        NewCall(constructor='Comment', demands=['str'], returns='Comment'),
    ],
    "StaticRange": [
        NewCall(constructor='StaticRange', demands=['StaticRangeInit'], returns='StaticRange'),
    ],
    "Range": [
        NewCall(constructor='Range', demands=[], returns='Range'),
    ],
    "setStart": [
        PrototypeCall(constructor='Range', fn='setStart', demands=['Range', 'Node', 'int'], returns='None'),
    ],
    "setEnd": [
        PrototypeCall(constructor='Range', fn='setEnd', demands=['Range', 'Node', 'int'], returns='None'),
    ],
    "setStartBefore": [
        PrototypeCall(constructor='Range', fn='setStartBefore', demands=['Range', 'Node'], returns='None'),
    ],
    "setStartAfter": [
        PrototypeCall(constructor='Range', fn='setStartAfter', demands=['Range', 'Node'], returns='None'),
    ],
    "setEndBefore": [
        PrototypeCall(constructor='Range', fn='setEndBefore', demands=['Range', 'Node'], returns='None'),
    ],
    "setEndAfter": [
        PrototypeCall(constructor='Range', fn='setEndAfter', demands=['Range', 'Node'], returns='None'),
    ],
    "selectNode": [
        PrototypeCall(constructor='Range', fn='selectNode', demands=['Range', 'Node'], returns='None'),
    ],
    "selectNodeContents": [
        PrototypeCall(constructor='Range', fn='selectNodeContents', demands=['Range', 'Node'], returns='None'),
    ],
    "compareBoundaryPoints": [
        PrototypeCall(constructor='Range', fn='compareBoundaryPoints', demands=['Range', 'unsigned short', 'Range'], returns='short'),
    ],
    "deleteContents": [
        PrototypeCall(constructor='Range', fn='deleteContents', demands=['Range'], returns='None'),
    ],
    "extractContents": [
        PrototypeCall(constructor='Range', fn='extractContents', demands=['Range'], returns='DocumentFragment'),
    ],
    "cloneContents": [
        PrototypeCall(constructor='Range', fn='cloneContents', demands=['Range'], returns='DocumentFragment'),
    ],
    "insertNode": [
        PrototypeCall(constructor='Range', fn='insertNode', demands=['Range', 'Node'], returns='None'),
    ],
    "surroundContents": [
        PrototypeCall(constructor='Range', fn='surroundContents', demands=['Range', 'Node'], returns='None'),
    ],
    "cloneRange": [
        PrototypeCall(constructor='Range', fn='cloneRange', demands=['Range'], returns='Range'),
    ],
    "detach": [
        PrototypeCall(constructor='Range', fn='detach', demands=['Range'], returns='None'),
        PrototypeCall(constructor='NodeIterator', fn='detach', demands=['NodeIterator'], returns='None'),
    ],
    "isPointInRange": [
        PrototypeCall(constructor='Range', fn='isPointInRange', demands=['Range', 'Node', 'int'], returns='bool'),
    ],
    "comparePoint": [
        PrototypeCall(constructor='Range', fn='comparePoint', demands=['Range', 'Node', 'int'], returns='short'),
    ],
    "intersectsNode": [
        PrototypeCall(constructor='Range', fn='intersectsNode', demands=['Range', 'Node'], returns='bool'),
    ],
    "nextNode": [
        PrototypeCall(constructor='NodeIterator', fn='nextNode', demands=['NodeIterator'], returns='Node'),
        PrototypeCall(constructor='TreeWalker', fn='nextNode', demands=['TreeWalker'], returns='Node'),
    ],
    "previousNode": [
        PrototypeCall(constructor='NodeIterator', fn='previousNode', demands=['NodeIterator'], returns='Node'),
        PrototypeCall(constructor='TreeWalker', fn='previousNode', demands=['TreeWalker'], returns='Node'),
    ],
    "parentNode": [
        PrototypeCall(constructor='TreeWalker', fn='parentNode', demands=['TreeWalker'], returns='Node'),
    ],
    "firstChild": [
        PrototypeCall(constructor='TreeWalker', fn='firstChild', demands=['TreeWalker'], returns='Node'),
    ],
    "lastChild": [
        PrototypeCall(constructor='TreeWalker', fn='lastChild', demands=['TreeWalker'], returns='Node'),
    ],
    "previousSibling": [
        PrototypeCall(constructor='TreeWalker', fn='previousSibling', demands=['TreeWalker'], returns='Node'),
    ],
    "nextSibling": [
        PrototypeCall(constructor='TreeWalker', fn='nextSibling', demands=['TreeWalker'], returns='Node'),
    ],
    "toggle": [
        PrototypeCall(constructor='DOMTokenList', fn='toggle', demands=['DOMTokenList', 'str'], returns='bool'),
        PrototypeCall(constructor='DOMTokenList', fn='toggle', demands=['DOMTokenList', 'str', 'bool'], returns='bool'),
    ],
    "iterateNext": [
        PrototypeCall(constructor='XPathResult', fn='iterateNext', demands=['XPathResult'], returns='Node'),
    ],
    "snapshotItem": [
        PrototypeCall(constructor='XPathResult', fn='snapshotItem', demands=['XPathResult', 'int'], returns='Node'),
    ],
    "evaluate": [
        PrototypeCall(constructor='XPathExpression', fn='evaluate', demands=['XPathExpression', 'Node'], returns='XPathResult'),
        PrototypeCall(constructor='XPathExpression', fn='evaluate', demands=['XPathExpression', 'Node', 'unsigned short'], returns='XPathResult'),
        PrototypeCall(constructor='XPathExpression', fn='evaluate', demands=['XPathExpression', 'Node', 'unsigned short', 'XPathResult'], returns='XPathResult'),
    ],
    "XPathEvaluator": [
        NewCall(constructor='XPathEvaluator', demands=[], returns='XPathEvaluator'),
    ],
    "XSLTProcessor": [
        NewCall(constructor='XSLTProcessor', demands=[], returns='XSLTProcessor'),
    ],
    "importStylesheet": [
        PrototypeCall(constructor='XSLTProcessor', fn='importStylesheet', demands=['XSLTProcessor', 'Node'], returns='None'),
    ],
    "transformToFragment": [
        PrototypeCall(constructor='XSLTProcessor', fn='transformToFragment', demands=['XSLTProcessor', 'Node', 'Document'], returns='DocumentFragment'),
    ],
    "transformToDocument": [
        PrototypeCall(constructor='XSLTProcessor', fn='transformToDocument', demands=['XSLTProcessor', 'Node'], returns='Document'),
    ],
    "setParameter": [
        PrototypeCall(constructor='XSLTProcessor', fn='setParameter', demands=['XSLTProcessor', 'str', 'str', '*'], returns='None'),
    ],
    "getParameter": [
        PrototypeCall(constructor='XSLTProcessor', fn='getParameter', demands=['XSLTProcessor', 'str', 'str'], returns='*'),
    ],
    "removeParameter": [
        PrototypeCall(constructor='XSLTProcessor', fn='removeParameter', demands=['XSLTProcessor', 'str', 'str'], returns='None'),
    ],
    "clearParameters": [
        PrototypeCall(constructor='XSLTProcessor', fn='clearParameters', demands=['XSLTProcessor'], returns='None'),
    ],
    "getHighEntropyValues": [
        PrototypeCall(constructor='NavigatorUAData', fn='getHighEntropyValues', demands=['NavigatorUAData', 'str'], returns='UADataValues'),
    ],
    "userAgentAllowsProtocol": [
        DirectCall(fn='userAgentAllowsProtocol', receiver='DigitalCredential', demands=['str'], returns='bool'),
    ],
    "CaptureActionEvent": [
        NewCall(constructor='CaptureActionEvent', demands=[], returns='CaptureActionEvent'),
        NewCall(constructor='CaptureActionEvent', demands=['CaptureActionEventInit'], returns='CaptureActionEvent'),
    ],
    "registerAnimator": [
        PrototypeCall(constructor='AnimationWorkletGlobalScope', fn='registerAnimator', demands=['AnimationWorkletGlobalScope', 'str', 'AnimatorInstanceConstructor'], returns='None'),
    ],
    "getTiming": [
        PrototypeCall(constructor='WorkletAnimationEffect', fn='getTiming', demands=['WorkletAnimationEffect'], returns='EffectTiming'),
        PrototypeCall(constructor='AnimationEffect', fn='getTiming', demands=['AnimationEffect'], returns='EffectTiming'),
    ],
    "getComputedTiming": [
        PrototypeCall(constructor='WorkletAnimationEffect', fn='getComputedTiming', demands=['WorkletAnimationEffect'], returns='ComputedEffectTiming'),
        PrototypeCall(constructor='AnimationEffect', fn='getComputedTiming', demands=['AnimationEffect'], returns='ComputedEffectTiming'),
    ],
    "WorkletAnimation": [
        NewCall(constructor='WorkletAnimation', demands=['str'], returns='WorkletAnimation'),
        NewCall(constructor='WorkletAnimation', demands=['str', 'AnimationEffect'], returns='WorkletAnimation'),
        NewCall(constructor='WorkletAnimation', demands=['str', 'AnimationEffect', 'AnimationTimeline'], returns='WorkletAnimation'),
        NewCall(constructor='WorkletAnimation', demands=['str', 'AnimationEffect', 'AnimationTimeline', '*'], returns='WorkletAnimation'),
    ],
    "getChildren": [
        PrototypeCall(constructor='WorkletGroupEffect', fn='getChildren', demands=['WorkletGroupEffect'], returns='WorkletAnimationEffect'),
    ],
    "enableDelegations": [
        PrototypeCall(constructor='PaymentManager', fn='enableDelegations', demands=['PaymentManager', 'PaymentDelegation'], returns='None'),
    ],
    "CanMakePaymentEvent": [
        NewCall(constructor='CanMakePaymentEvent', demands=['str'], returns='CanMakePaymentEvent'),
    ],
    "respondWith": [
        PrototypeCall(constructor='CanMakePaymentEvent', fn='respondWith', demands=['CanMakePaymentEvent', 'bool'], returns='None'),
        PrototypeCall(constructor='PaymentRequestEvent', fn='respondWith', demands=['PaymentRequestEvent', 'PaymentHandlerResponse'], returns='None'),
        PrototypeCall(constructor='FetchEvent', fn='respondWith', demands=['FetchEvent', 'Response'], returns='None'),
    ],
    "PaymentRequestEvent": [
        NewCall(constructor='PaymentRequestEvent', demands=['str'], returns='PaymentRequestEvent'),
        NewCall(constructor='PaymentRequestEvent', demands=['str', 'PaymentRequestEventInit'], returns='PaymentRequestEvent'),
    ],
    "openWindow": [
        PrototypeCall(constructor='PaymentRequestEvent', fn='openWindow', demands=['PaymentRequestEvent', 'str'], returns='WindowClient'),
        PrototypeCall(constructor='Clients', fn='openWindow', demands=['Clients', 'str'], returns='WindowClient'),
    ],
    "changePaymentMethod": [
        PrototypeCall(constructor='PaymentRequestEvent', fn='changePaymentMethod', demands=['PaymentRequestEvent', 'str'], returns='PaymentRequestDetailsUpdate'),
        PrototypeCall(constructor='PaymentRequestEvent', fn='changePaymentMethod', demands=['PaymentRequestEvent', 'str', 'object'], returns='PaymentRequestDetailsUpdate'),
    ],
    "changeShippingAddress": [
        PrototypeCall(constructor='PaymentRequestEvent', fn='changeShippingAddress', demands=['PaymentRequestEvent'], returns='PaymentRequestDetailsUpdate'),
        PrototypeCall(constructor='PaymentRequestEvent', fn='changeShippingAddress', demands=['PaymentRequestEvent', 'AddressInit'], returns='PaymentRequestDetailsUpdate'),
    ],
    "changeShippingOption": [
        PrototypeCall(constructor='PaymentRequestEvent', fn='changeShippingOption', demands=['PaymentRequestEvent', 'str'], returns='PaymentRequestDetailsUpdate'),
    ],
    "getAvailability": [
        PrototypeCall(constructor='Bluetooth', fn='getAvailability', demands=['Bluetooth'], returns='bool'),
        PrototypeCall(constructor='PresentationRequest', fn='getAvailability', demands=['PresentationRequest'], returns='PresentationAvailability'),
    ],
    "ValueEvent": [
        NewCall(constructor='ValueEvent', demands=['str'], returns='ValueEvent'),
        NewCall(constructor='ValueEvent', demands=['str', 'ValueEventInit'], returns='ValueEvent'),
    ],
    "watchAdvertisements": [
        PrototypeCall(constructor='BluetoothDevice', fn='watchAdvertisements', demands=['BluetoothDevice'], returns='None'),
        PrototypeCall(constructor='BluetoothDevice', fn='watchAdvertisements', demands=['BluetoothDevice', 'WatchAdvertisementsOptions'], returns='None'),
    ],
    "BluetoothAdvertisingEvent": [
        NewCall(constructor='BluetoothAdvertisingEvent', demands=['str', 'BluetoothAdvertisingEventInit'], returns='BluetoothAdvertisingEvent'),
    ],
    "connect": [
        PrototypeCall(constructor='BluetoothRemoteGATTServer', fn='connect', demands=['BluetoothRemoteGATTServer'], returns='BluetoothRemoteGATTServer'),
        PrototypeCall(constructor='AudioNode', fn='connect', demands=['AudioNode', 'AudioNode'], returns='AudioNode'),
        PrototypeCall(constructor='AudioNode', fn='connect', demands=['AudioNode', 'AudioNode', 'int'], returns='AudioNode'),
        PrototypeCall(constructor='AudioNode', fn='connect', demands=['AudioNode', 'AudioNode', 'int', 'int'], returns='AudioNode'),
        PrototypeCall(constructor='AudioNode', fn='connect', demands=['AudioNode', 'AudioParam'], returns='None'),
        PrototypeCall(constructor='AudioNode', fn='connect', demands=['AudioNode', 'AudioParam', 'int'], returns='None'),
    ],
    "getPrimaryService": [
        PrototypeCall(constructor='BluetoothRemoteGATTServer', fn='getPrimaryService', demands=['BluetoothRemoteGATTServer', 'BluetoothServiceUUID'], returns='BluetoothRemoteGATTService'),
    ],
    "getPrimaryServices": [
        PrototypeCall(constructor='BluetoothRemoteGATTServer', fn='getPrimaryServices', demands=['BluetoothRemoteGATTServer'], returns='BluetoothRemoteGATTService'),
        PrototypeCall(constructor='BluetoothRemoteGATTServer', fn='getPrimaryServices', demands=['BluetoothRemoteGATTServer', 'BluetoothServiceUUID'], returns='BluetoothRemoteGATTService'),
    ],
    "getCharacteristic": [
        PrototypeCall(constructor='BluetoothRemoteGATTService', fn='getCharacteristic', demands=['BluetoothRemoteGATTService', 'BluetoothCharacteristicUUID'], returns='BluetoothRemoteGATTCharacteristic'),
        DirectCall(fn='getCharacteristic', receiver='BluetoothUUID', demands=['str'], returns='UUID'),
    ],
    "getCharacteristics": [
        PrototypeCall(constructor='BluetoothRemoteGATTService', fn='getCharacteristics', demands=['BluetoothRemoteGATTService'], returns='BluetoothRemoteGATTCharacteristic'),
        PrototypeCall(constructor='BluetoothRemoteGATTService', fn='getCharacteristics', demands=['BluetoothRemoteGATTService', 'BluetoothCharacteristicUUID'], returns='BluetoothRemoteGATTCharacteristic'),
    ],
    "getIncludedService": [
        PrototypeCall(constructor='BluetoothRemoteGATTService', fn='getIncludedService', demands=['BluetoothRemoteGATTService', 'BluetoothServiceUUID'], returns='BluetoothRemoteGATTService'),
    ],
    "getIncludedServices": [
        PrototypeCall(constructor='BluetoothRemoteGATTService', fn='getIncludedServices', demands=['BluetoothRemoteGATTService'], returns='BluetoothRemoteGATTService'),
        PrototypeCall(constructor='BluetoothRemoteGATTService', fn='getIncludedServices', demands=['BluetoothRemoteGATTService', 'BluetoothServiceUUID'], returns='BluetoothRemoteGATTService'),
    ],
    "getDescriptor": [
        PrototypeCall(constructor='BluetoothRemoteGATTCharacteristic', fn='getDescriptor', demands=['BluetoothRemoteGATTCharacteristic', 'BluetoothDescriptorUUID'], returns='BluetoothRemoteGATTDescriptor'),
        DirectCall(fn='getDescriptor', receiver='BluetoothUUID', demands=['str'], returns='UUID'),
    ],
    "getDescriptors": [
        PrototypeCall(constructor='BluetoothRemoteGATTCharacteristic', fn='getDescriptors', demands=['BluetoothRemoteGATTCharacteristic'], returns='BluetoothRemoteGATTDescriptor'),
        PrototypeCall(constructor='BluetoothRemoteGATTCharacteristic', fn='getDescriptors', demands=['BluetoothRemoteGATTCharacteristic', 'BluetoothDescriptorUUID'], returns='BluetoothRemoteGATTDescriptor'),
    ],
    "readValue": [
        PrototypeCall(constructor='BluetoothRemoteGATTCharacteristic', fn='readValue', demands=['BluetoothRemoteGATTCharacteristic'], returns='DataView'),
        PrototypeCall(constructor='BluetoothRemoteGATTDescriptor', fn='readValue', demands=['BluetoothRemoteGATTDescriptor'], returns='DataView'),
    ],
    "writeValue": [
        PrototypeCall(constructor='BluetoothRemoteGATTCharacteristic', fn='writeValue', demands=['BluetoothRemoteGATTCharacteristic', 'BufferSource'], returns='None'),
        PrototypeCall(constructor='BluetoothRemoteGATTDescriptor', fn='writeValue', demands=['BluetoothRemoteGATTDescriptor', 'BufferSource'], returns='None'),
    ],
    "writeValueWithResponse": [
        PrototypeCall(constructor='BluetoothRemoteGATTCharacteristic', fn='writeValueWithResponse', demands=['BluetoothRemoteGATTCharacteristic', 'BufferSource'], returns='None'),
    ],
    "writeValueWithoutResponse": [
        PrototypeCall(constructor='BluetoothRemoteGATTCharacteristic', fn='writeValueWithoutResponse', demands=['BluetoothRemoteGATTCharacteristic', 'BufferSource'], returns='None'),
    ],
    "startNotifications": [
        PrototypeCall(constructor='BluetoothRemoteGATTCharacteristic', fn='startNotifications', demands=['BluetoothRemoteGATTCharacteristic'], returns='BluetoothRemoteGATTCharacteristic'),
    ],
    "stopNotifications": [
        PrototypeCall(constructor='BluetoothRemoteGATTCharacteristic', fn='stopNotifications', demands=['BluetoothRemoteGATTCharacteristic'], returns='BluetoothRemoteGATTCharacteristic'),
    ],
    "getService": [
        DirectCall(fn='getService', receiver='BluetoothUUID', demands=['str'], returns='UUID'),
    ],
    "canonicalUUID": [
        DirectCall(fn='canonicalUUID', receiver='BluetoothUUID', demands=['int'], returns='UUID'),
    ],
    "requestPresenter": [
        PrototypeCall(constructor='Ink', fn='requestPresenter', demands=['Ink'], returns='DelegatedInkTrailPresenter'),
        PrototypeCall(constructor='Ink', fn='requestPresenter', demands=['Ink', 'InkPresenterParam'], returns='DelegatedInkTrailPresenter'),
    ],
    "updateInkTrailStartPoint": [
        PrototypeCall(constructor='DelegatedInkTrailPresenter', fn='updateInkTrailStartPoint', demands=['DelegatedInkTrailPresenter', 'PointerEvent', 'InkTrailStyle'], returns='None'),
    ],
    "PressureObserver": [
        NewCall(constructor='PressureObserver', demands=['PressureUpdateCallback'], returns='PressureObserver'),
    ],
    "getManagedConfiguration": [
        PrototypeCall(constructor='NavigatorManagedData', fn='getManagedConfiguration', demands=['NavigatorManagedData', 'str'], returns='str'),
    ],
    "MediaRecorder": [
        NewCall(constructor='MediaRecorder', demands=['MediaStream'], returns='MediaRecorder'),
        NewCall(constructor='MediaRecorder', demands=['MediaStream', 'MediaRecorderOptions'], returns='MediaRecorder'),
    ],
    "resume": [
        PrototypeCall(constructor='MediaRecorder', fn='resume', demands=['MediaRecorder'], returns='None'),
        PrototypeCall(constructor='SpeechSynthesis', fn='resume', demands=['SpeechSynthesis'], returns='None'),
        PrototypeCall(constructor='AudioContext', fn='resume', demands=['AudioContext'], returns='None'),
        PrototypeCall(constructor='OfflineAudioContext', fn='resume', demands=['OfflineAudioContext'], returns='None'),
    ],
    "requestData": [
        PrototypeCall(constructor='MediaRecorder', fn='requestData', demands=['MediaRecorder'], returns='None'),
    ],
    "BlobEvent": [
        NewCall(constructor='BlobEvent', demands=['str', 'BlobEventInit'], returns='BlobEvent'),
    ],
    "enableiOES": [
        PrototypeCall(constructor='OES_draw_buffers_indexed', fn='enableiOES', demands=['OES_draw_buffers_indexed', 'GLenum', 'GLuint'], returns='None'),
    ],
    "disableiOES": [
        PrototypeCall(constructor='OES_draw_buffers_indexed', fn='disableiOES', demands=['OES_draw_buffers_indexed', 'GLenum', 'GLuint'], returns='None'),
    ],
    "blendEquationiOES": [
        PrototypeCall(constructor='OES_draw_buffers_indexed', fn='blendEquationiOES', demands=['OES_draw_buffers_indexed', 'GLuint', 'GLenum'], returns='None'),
    ],
    "blendEquationSeparateiOES": [
        PrototypeCall(constructor='OES_draw_buffers_indexed', fn='blendEquationSeparateiOES', demands=['OES_draw_buffers_indexed', 'GLuint', 'GLenum', 'GLenum'], returns='None'),
    ],
    "blendFunciOES": [
        PrototypeCall(constructor='OES_draw_buffers_indexed', fn='blendFunciOES', demands=['OES_draw_buffers_indexed', 'GLuint', 'GLenum', 'GLenum'], returns='None'),
    ],
    "blendFuncSeparateiOES": [
        PrototypeCall(constructor='OES_draw_buffers_indexed', fn='blendFuncSeparateiOES', demands=['OES_draw_buffers_indexed', 'GLuint', 'GLenum', 'GLenum', 'GLenum', 'GLenum'], returns='None'),
    ],
    "colorMaskiOES": [
        PrototypeCall(constructor='OES_draw_buffers_indexed', fn='colorMaskiOES', demands=['OES_draw_buffers_indexed', 'GLuint', 'GLboolean', 'GLboolean', 'GLboolean', 'GLboolean'], returns='None'),
    ],
    "UIEvent": [
        NewCall(constructor='UIEvent', demands=['str'], returns='UIEvent'),
        NewCall(constructor='UIEvent', demands=['str', 'UIEventInit'], returns='UIEvent'),
    ],
    "FocusEvent": [
        NewCall(constructor='FocusEvent', demands=['str'], returns='FocusEvent'),
        NewCall(constructor='FocusEvent', demands=['str', 'FocusEventInit'], returns='FocusEvent'),
    ],
    "MouseEvent": [
        NewCall(constructor='MouseEvent', demands=['str'], returns='MouseEvent'),
        NewCall(constructor='MouseEvent', demands=['str', 'MouseEventInit'], returns='MouseEvent'),
    ],
    "getModifierState": [
        PrototypeCall(constructor='MouseEvent', fn='getModifierState', demands=['MouseEvent', 'str'], returns='bool'),
        PrototypeCall(constructor='KeyboardEvent', fn='getModifierState', demands=['KeyboardEvent', 'str'], returns='bool'),
        PrototypeCall(constructor='TouchEvent', fn='getModifierState', demands=['TouchEvent', 'str'], returns='bool'),
    ],
    "WheelEvent": [
        NewCall(constructor='WheelEvent', demands=['str'], returns='WheelEvent'),
        NewCall(constructor='WheelEvent', demands=['str', 'WheelEventInit'], returns='WheelEvent'),
    ],
    "InputEvent": [
        NewCall(constructor='InputEvent', demands=['str'], returns='InputEvent'),
        NewCall(constructor='InputEvent', demands=['str', 'InputEventInit'], returns='InputEvent'),
    ],
    "KeyboardEvent": [
        NewCall(constructor='KeyboardEvent', demands=['str'], returns='KeyboardEvent'),
        NewCall(constructor='KeyboardEvent', demands=['str', 'KeyboardEventInit'], returns='KeyboardEvent'),
    ],
    "CompositionEvent": [
        NewCall(constructor='CompositionEvent', demands=['str'], returns='CompositionEvent'),
        NewCall(constructor='CompositionEvent', demands=['str', 'CompositionEventInit'], returns='CompositionEvent'),
    ],
    "initTextEvent": [
        PrototypeCall(constructor='TextEvent', fn='initTextEvent', demands=['TextEvent', 'str'], returns='None'),
        PrototypeCall(constructor='TextEvent', fn='initTextEvent', demands=['TextEvent', 'str', 'bool'], returns='None'),
        PrototypeCall(constructor='TextEvent', fn='initTextEvent', demands=['TextEvent', 'str', 'bool', 'bool'], returns='None'),
        PrototypeCall(constructor='TextEvent', fn='initTextEvent', demands=['TextEvent', 'str', 'bool', 'bool', 'Window'], returns='None'),
        PrototypeCall(constructor='TextEvent', fn='initTextEvent', demands=['TextEvent', 'str', 'bool', 'bool', 'Window', 'str'], returns='None'),
    ],
    "SensorErrorEvent": [
        NewCall(constructor='SensorErrorEvent', demands=['str', 'SensorErrorEventInit'], returns='SensorErrorEvent'),
    ],
    "USBConnectionEvent": [
        NewCall(constructor='USBConnectionEvent', demands=['str', 'USBConnectionEventInit'], returns='USBConnectionEvent'),
    ],
    "USBInTransferResult": [
        NewCall(constructor='USBInTransferResult', demands=['USBTransferStatus'], returns='USBInTransferResult'),
        NewCall(constructor='USBInTransferResult', demands=['USBTransferStatus', 'DataView'], returns='USBInTransferResult'),
    ],
    "USBOutTransferResult": [
        NewCall(constructor='USBOutTransferResult', demands=['USBTransferStatus'], returns='USBOutTransferResult'),
        NewCall(constructor='USBOutTransferResult', demands=['USBTransferStatus', 'int'], returns='USBOutTransferResult'),
    ],
    "USBIsochronousInTransferPacket": [
        NewCall(constructor='USBIsochronousInTransferPacket', demands=['USBTransferStatus'], returns='USBIsochronousInTransferPacket'),
        NewCall(constructor='USBIsochronousInTransferPacket', demands=['USBTransferStatus', 'DataView'], returns='USBIsochronousInTransferPacket'),
    ],
    "USBIsochronousInTransferResult": [
        NewCall(constructor='USBIsochronousInTransferResult', demands=['USBIsochronousInTransferPacket'], returns='USBIsochronousInTransferResult'),
        NewCall(constructor='USBIsochronousInTransferResult', demands=['USBIsochronousInTransferPacket', 'DataView'], returns='USBIsochronousInTransferResult'),
    ],
    "USBIsochronousOutTransferPacket": [
        NewCall(constructor='USBIsochronousOutTransferPacket', demands=['USBTransferStatus'], returns='USBIsochronousOutTransferPacket'),
        NewCall(constructor='USBIsochronousOutTransferPacket', demands=['USBTransferStatus', 'int'], returns='USBIsochronousOutTransferPacket'),
    ],
    "USBIsochronousOutTransferResult": [
        NewCall(constructor='USBIsochronousOutTransferResult', demands=['USBIsochronousOutTransferPacket'], returns='USBIsochronousOutTransferResult'),
    ],
    "selectConfiguration": [
        PrototypeCall(constructor='USBDevice', fn='selectConfiguration', demands=['USBDevice', 'int'], returns='None'),
    ],
    "claimInterface": [
        PrototypeCall(constructor='USBDevice', fn='claimInterface', demands=['USBDevice', 'int'], returns='None'),
    ],
    "releaseInterface": [
        PrototypeCall(constructor='USBDevice', fn='releaseInterface', demands=['USBDevice', 'int'], returns='None'),
    ],
    "selectAlternateInterface": [
        PrototypeCall(constructor='USBDevice', fn='selectAlternateInterface', demands=['USBDevice', 'int', 'int'], returns='None'),
    ],
    "controlTransferIn": [
        PrototypeCall(constructor='USBDevice', fn='controlTransferIn', demands=['USBDevice', 'USBControlTransferParameters', 'unsigned short'], returns='USBInTransferResult'),
    ],
    "controlTransferOut": [
        PrototypeCall(constructor='USBDevice', fn='controlTransferOut', demands=['USBDevice', 'USBControlTransferParameters'], returns='USBOutTransferResult'),
        PrototypeCall(constructor='USBDevice', fn='controlTransferOut', demands=['USBDevice', 'USBControlTransferParameters', 'BufferSource'], returns='USBOutTransferResult'),
    ],
    "clearHalt": [
        PrototypeCall(constructor='USBDevice', fn='clearHalt', demands=['USBDevice', 'USBDirection', 'int'], returns='None'),
    ],
    "transferIn": [
        PrototypeCall(constructor='USBDevice', fn='transferIn', demands=['USBDevice', 'int', 'int'], returns='USBInTransferResult'),
    ],
    "transferOut": [
        PrototypeCall(constructor='USBDevice', fn='transferOut', demands=['USBDevice', 'int', 'BufferSource'], returns='USBOutTransferResult'),
    ],
    "isochronousTransferIn": [
        PrototypeCall(constructor='USBDevice', fn='isochronousTransferIn', demands=['USBDevice', 'int', 'int'], returns='USBIsochronousInTransferResult'),
    ],
    "isochronousTransferOut": [
        PrototypeCall(constructor='USBDevice', fn='isochronousTransferOut', demands=['USBDevice', 'int', 'BufferSource', 'int'], returns='USBIsochronousOutTransferResult'),
    ],
    "USBConfiguration": [
        NewCall(constructor='USBConfiguration', demands=['USBDevice', 'int'], returns='USBConfiguration'),
    ],
    "USBInterface": [
        NewCall(constructor='USBInterface', demands=['USBConfiguration', 'int'], returns='USBInterface'),
    ],
    "USBAlternateInterface": [
        NewCall(constructor='USBAlternateInterface', demands=['USBInterface', 'int'], returns='USBAlternateInterface'),
    ],
    "USBEndpoint": [
        NewCall(constructor='USBEndpoint', demands=['USBAlternateInterface', 'int', 'USBDirection'], returns='USBEndpoint'),
    ],
    "pseudo": [
        PrototypeCall(constructor='CSSPseudoElement', fn='pseudo', demands=['CSSPseudoElement', 'CSSOMString'], returns='CSSPseudoElement'),
    ],
    "initTimeEvent": [
        PrototypeCall(constructor='TimeEvent', fn='initTimeEvent', demands=['TimeEvent', 'str', 'Window', 'int'], returns='None'),
    ],
    "getStartTime": [
        PrototypeCall(constructor='SVGAnimationElement', fn='getStartTime', demands=['SVGAnimationElement'], returns='float'),
    ],
    "getCurrentTime": [
        PrototypeCall(constructor='SVGAnimationElement', fn='getCurrentTime', demands=['SVGAnimationElement'], returns='float'),
    ],
    "getSimpleDuration": [
        PrototypeCall(constructor='SVGAnimationElement', fn='getSimpleDuration', demands=['SVGAnimationElement'], returns='float'),
    ],
    "beginElement": [
        PrototypeCall(constructor='SVGAnimationElement', fn='beginElement', demands=['SVGAnimationElement'], returns='None'),
    ],
    "beginElementAt": [
        PrototypeCall(constructor='SVGAnimationElement', fn='beginElementAt', demands=['SVGAnimationElement', 'float'], returns='None'),
    ],
    "endElement": [
        PrototypeCall(constructor='SVGAnimationElement', fn='endElement', demands=['SVGAnimationElement'], returns='None'),
    ],
    "endElementAt": [
        PrototypeCall(constructor='SVGAnimationElement', fn='endElementAt', demands=['SVGAnimationElement', 'float'], returns='None'),
    ],
    "NavigationEvent": [
        NewCall(constructor='NavigationEvent', demands=['str'], returns='NavigationEvent'),
        NewCall(constructor='NavigationEvent', demands=['str', 'NavigationEventInit'], returns='NavigationEvent'),
    ],
    "framebufferTextureMultiviewOVR": [
        PrototypeCall(constructor='OVR_multiview2', fn='framebufferTextureMultiviewOVR', demands=['OVR_multiview2', 'GLenum', 'GLenum', 'WebGLTexture', 'GLint', 'GLint', 'GLsizei'], returns='None'),
    ],
    "Accelerometer": [
        NewCall(constructor='Accelerometer', demands=[], returns='Accelerometer'),
        NewCall(constructor='Accelerometer', demands=['AccelerometerSensorOptions'], returns='Accelerometer'),
    ],
    "LinearAccelerationSensor": [
        NewCall(constructor='LinearAccelerationSensor', demands=[], returns='LinearAccelerationSensor'),
        NewCall(constructor='LinearAccelerationSensor', demands=['AccelerometerSensorOptions'], returns='LinearAccelerationSensor'),
    ],
    "GravitySensor": [
        NewCall(constructor='GravitySensor', demands=[], returns='GravitySensor'),
        NewCall(constructor='GravitySensor', demands=['AccelerometerSensorOptions'], returns='GravitySensor'),
    ],
    "WebTransport": [
        NewCall(constructor='WebTransport', demands=['str'], returns='WebTransport'),
        NewCall(constructor='WebTransport', demands=['str', 'WebTransportOptions'], returns='WebTransport'),
    ],
    "exportKeyingMaterial": [
        PrototypeCall(constructor='WebTransport', fn='exportKeyingMaterial', demands=['WebTransport', 'BufferSource'], returns='ArrayBuffer'),
        PrototypeCall(constructor='WebTransport', fn='exportKeyingMaterial', demands=['WebTransport', 'BufferSource', 'BufferSource'], returns='ArrayBuffer'),
    ],
    "createBidirectionalStream": [
        PrototypeCall(constructor='WebTransport', fn='createBidirectionalStream', demands=['WebTransport'], returns='WebTransportBidirectionalStream'),
        PrototypeCall(constructor='WebTransport', fn='createBidirectionalStream', demands=['WebTransport', 'WebTransportSendStreamOptions'], returns='WebTransportBidirectionalStream'),
    ],
    "createUnidirectionalStream": [
        PrototypeCall(constructor='WebTransport', fn='createUnidirectionalStream', demands=['WebTransport'], returns='WebTransportSendStream'),
        PrototypeCall(constructor='WebTransport', fn='createUnidirectionalStream', demands=['WebTransport', 'WebTransportSendStreamOptions'], returns='WebTransportSendStream'),
    ],
    "createSendGroup": [
        PrototypeCall(constructor='WebTransport', fn='createSendGroup', demands=['WebTransport'], returns='WebTransportSendGroup'),
    ],
    "getWriter": [
        PrototypeCall(constructor='WebTransportSendStream', fn='getWriter', demands=['WebTransportSendStream'], returns='WebTransportWriter'),
        PrototypeCall(constructor='WritableStream', fn='getWriter', demands=['WritableStream'], returns='WritableStreamDefaultWriter'),
    ],
    "atomicWrite": [
        PrototypeCall(constructor='WebTransportWriter', fn='atomicWrite', demands=['WebTransportWriter'], returns='None'),
        PrototypeCall(constructor='WebTransportWriter', fn='atomicWrite', demands=['WebTransportWriter', '*'], returns='None'),
    ],
    "WebTransportError": [
        NewCall(constructor='WebTransportError', demands=[], returns='WebTransportError'),
        NewCall(constructor='WebTransportError', demands=['str'], returns='WebTransportError'),
        NewCall(constructor='WebTransportError', demands=['str', 'WebTransportErrorOptions'], returns='WebTransportError'),
    ],
    "Module": [
        NewCall(constructor='Module', demands=['BufferSource'], returns='Module'),
    ],
    "exports": [
        DirectCall(fn='exports', receiver='Module', demands=['Module'], returns='ModuleExportDescriptor'),
    ],
    "imports": [
        DirectCall(fn='imports', receiver='Module', demands=['Module'], returns='ModuleImportDescriptor'),
    ],
    "customSections": [
        DirectCall(fn='customSections', receiver='Module', demands=['Module', 'str'], returns='ArrayBuffer'),
    ],
    "Instance": [
        NewCall(constructor='Instance', demands=['Module'], returns='Instance'),
        NewCall(constructor='Instance', demands=['Module', 'object'], returns='Instance'),
    ],
    "Memory": [
        NewCall(constructor='Memory', demands=['MemoryDescriptor'], returns='Memory'),
    ],
    "grow": [
        PrototypeCall(constructor='Memory', fn='grow', demands=['Memory', 'int'], returns='int'),
        PrototypeCall(constructor='Table', fn='grow', demands=['Table', 'int'], returns='int'),
        PrototypeCall(constructor='Table', fn='grow', demands=['Table', 'int', '*'], returns='int'),
    ],
    "toFixedLengthBuffer": [
        PrototypeCall(constructor='Memory', fn='toFixedLengthBuffer', demands=['Memory'], returns='ArrayBuffer'),
    ],
    "toResizableBuffer": [
        PrototypeCall(constructor='Memory', fn='toResizableBuffer', demands=['Memory'], returns='ArrayBuffer'),
    ],
    "Table": [
        NewCall(constructor='Table', demands=['TableDescriptor'], returns='Table'),
        NewCall(constructor='Table', demands=['TableDescriptor', '*'], returns='Table'),
    ],
    "Global": [
        NewCall(constructor='Global', demands=['GlobalDescriptor'], returns='Global'),
        NewCall(constructor='Global', demands=['GlobalDescriptor', '*'], returns='Global'),
    ],
    "valueOf": [
        PrototypeCall(constructor='Global', fn='valueOf', demands=['Global'], returns='*'),
    ],
    "SpeechRecognition": [
        NewCall(constructor='SpeechRecognition', demands=[], returns='SpeechRecognition'),
    ],
    "available": [
        DirectCall(fn='available', receiver='SpeechRecognition', demands=['SpeechRecognitionOptions'], returns='AvailabilityStatus'),
    ],
    "install": [
        DirectCall(fn='install', receiver='SpeechRecognition', demands=['SpeechRecognitionOptions'], returns='bool'),
    ],
    "SpeechRecognitionErrorEvent": [
        NewCall(constructor='SpeechRecognitionErrorEvent', demands=['str', 'SpeechRecognitionErrorEventInit'], returns='SpeechRecognitionErrorEvent'),
    ],
    "SpeechRecognitionEvent": [
        NewCall(constructor='SpeechRecognitionEvent', demands=['str', 'SpeechRecognitionEventInit'], returns='SpeechRecognitionEvent'),
    ],
    "SpeechGrammarList": [
        NewCall(constructor='SpeechGrammarList', demands=[], returns='SpeechGrammarList'),
    ],
    "addFromURI": [
        PrototypeCall(constructor='SpeechGrammarList', fn='addFromURI', demands=['SpeechGrammarList', 'str'], returns='None'),
        PrototypeCall(constructor='SpeechGrammarList', fn='addFromURI', demands=['SpeechGrammarList', 'str', 'float'], returns='None'),
    ],
    "addFromString": [
        PrototypeCall(constructor='SpeechGrammarList', fn='addFromString', demands=['SpeechGrammarList', 'str'], returns='None'),
        PrototypeCall(constructor='SpeechGrammarList', fn='addFromString', demands=['SpeechGrammarList', 'str', 'float'], returns='None'),
    ],
    "SpeechRecognitionPhrase": [
        NewCall(constructor='SpeechRecognitionPhrase', demands=['str'], returns='SpeechRecognitionPhrase'),
        NewCall(constructor='SpeechRecognitionPhrase', demands=['str', 'float'], returns='SpeechRecognitionPhrase'),
    ],
    "speak": [
        PrototypeCall(constructor='SpeechSynthesis', fn='speak', demands=['SpeechSynthesis', 'SpeechSynthesisUtterance'], returns='None'),
    ],
    "getVoices": [
        PrototypeCall(constructor='SpeechSynthesis', fn='getVoices', demands=['SpeechSynthesis'], returns='SpeechSynthesisVoice'),
    ],
    "SpeechSynthesisUtterance": [
        NewCall(constructor='SpeechSynthesisUtterance', demands=[], returns='SpeechSynthesisUtterance'),
        NewCall(constructor='SpeechSynthesisUtterance', demands=['str'], returns='SpeechSynthesisUtterance'),
    ],
    "SpeechSynthesisEvent": [
        NewCall(constructor='SpeechSynthesisEvent', demands=['str', 'SpeechSynthesisEventInit'], returns='SpeechSynthesisEvent'),
    ],
    "SpeechSynthesisErrorEvent": [
        NewCall(constructor='SpeechSynthesisErrorEvent', demands=['str', 'SpeechSynthesisErrorEventInit'], returns='SpeechSynthesisErrorEvent'),
    ],
    "unregister": [
        PrototypeCall(constructor='ServiceWorkerRegistration', fn='unregister', demands=['ServiceWorkerRegistration'], returns='bool'),
        PrototypeCall(constructor='PeriodicSyncManager', fn='unregister', demands=['PeriodicSyncManager', 'str'], returns='None'),
    ],
    "getRegistration": [
        PrototypeCall(constructor='ServiceWorkerContainer', fn='getRegistration', demands=['ServiceWorkerContainer'], returns='ServiceWorkerRegistration'),
        PrototypeCall(constructor='ServiceWorkerContainer', fn='getRegistration', demands=['ServiceWorkerContainer', 'str'], returns='ServiceWorkerRegistration'),
    ],
    "getRegistrations": [
        PrototypeCall(constructor='ServiceWorkerContainer', fn='getRegistrations', demands=['ServiceWorkerContainer'], returns='ServiceWorkerRegistration'),
    ],
    "startMessages": [
        PrototypeCall(constructor='ServiceWorkerContainer', fn='startMessages', demands=['ServiceWorkerContainer'], returns='None'),
    ],
    "enable": [
        PrototypeCall(constructor='NavigationPreloadManager', fn='enable', demands=['NavigationPreloadManager'], returns='None'),
    ],
    "disable": [
        PrototypeCall(constructor='NavigationPreloadManager', fn='disable', demands=['NavigationPreloadManager'], returns='None'),
    ],
    "setHeaderValue": [
        PrototypeCall(constructor='NavigationPreloadManager', fn='setHeaderValue', demands=['NavigationPreloadManager', 'str'], returns='None'),
    ],
    "skipWaiting": [
        PrototypeCall(constructor='ServiceWorkerGlobalScope', fn='skipWaiting', demands=['ServiceWorkerGlobalScope'], returns='None'),
    ],
    "matchAll": [
        PrototypeCall(constructor='Clients', fn='matchAll', demands=['Clients'], returns='Client'),
        PrototypeCall(constructor='Clients', fn='matchAll', demands=['Clients', 'ClientQueryOptions'], returns='Client'),
        PrototypeCall(constructor='Cache', fn='matchAll', demands=['Cache'], returns='Response'),
        PrototypeCall(constructor='Cache', fn='matchAll', demands=['Cache', 'RequestInfo'], returns='Response'),
        PrototypeCall(constructor='Cache', fn='matchAll', demands=['Cache', 'RequestInfo', 'CacheQueryOptions'], returns='Response'),
        PrototypeCall(constructor='BackgroundFetchRegistration', fn='matchAll', demands=['BackgroundFetchRegistration'], returns='BackgroundFetchRecord'),
        PrototypeCall(constructor='BackgroundFetchRegistration', fn='matchAll', demands=['BackgroundFetchRegistration', 'RequestInfo'], returns='BackgroundFetchRecord'),
        PrototypeCall(constructor='BackgroundFetchRegistration', fn='matchAll', demands=['BackgroundFetchRegistration', 'RequestInfo', 'CacheQueryOptions'], returns='BackgroundFetchRecord'),
    ],
    "claim": [
        PrototypeCall(constructor='Clients', fn='claim', demands=['Clients'], returns='None'),
    ],
    "ExtendableEvent": [
        NewCall(constructor='ExtendableEvent', demands=['str'], returns='ExtendableEvent'),
        NewCall(constructor='ExtendableEvent', demands=['str', 'ExtendableEventInit'], returns='ExtendableEvent'),
    ],
    "waitUntil": [
        PrototypeCall(constructor='ExtendableEvent', fn='waitUntil', demands=['ExtendableEvent', '*'], returns='None'),
    ],
    "InstallEvent": [
        NewCall(constructor='InstallEvent', demands=['str'], returns='InstallEvent'),
        NewCall(constructor='InstallEvent', demands=['str', 'ExtendableEventInit'], returns='InstallEvent'),
    ],
    "addRoutes": [
        PrototypeCall(constructor='InstallEvent', fn='addRoutes', demands=['InstallEvent', 'RouterRule'], returns='None'),
    ],
    "FetchEvent": [
        NewCall(constructor='FetchEvent', demands=['str', 'FetchEventInit'], returns='FetchEvent'),
    ],
    "ExtendableMessageEvent": [
        NewCall(constructor='ExtendableMessageEvent', demands=['str'], returns='ExtendableMessageEvent'),
        NewCall(constructor='ExtendableMessageEvent', demands=['str', 'ExtendableMessageEventInit'], returns='ExtendableMessageEvent'),
    ],
    "match": [
        PrototypeCall(constructor='Cache', fn='match', demands=['Cache', 'RequestInfo'], returns='Response'),
        PrototypeCall(constructor='Cache', fn='match', demands=['Cache', 'RequestInfo', 'CacheQueryOptions'], returns='Response'),
        PrototypeCall(constructor='CacheStorage', fn='match', demands=['CacheStorage', 'RequestInfo'], returns='Response'),
        PrototypeCall(constructor='CacheStorage', fn='match', demands=['CacheStorage', 'RequestInfo', 'MultiCacheQueryOptions'], returns='Response'),
        PrototypeCall(constructor='BackgroundFetchRegistration', fn='match', demands=['BackgroundFetchRegistration', 'RequestInfo'], returns='BackgroundFetchRecord'),
        PrototypeCall(constructor='BackgroundFetchRegistration', fn='match', demands=['BackgroundFetchRegistration', 'RequestInfo', 'CacheQueryOptions'], returns='BackgroundFetchRecord'),
    ],
    "addAll": [
        PrototypeCall(constructor='Cache', fn='addAll', demands=['Cache', 'RequestInfo'], returns='None'),
    ],
    "PictureInPictureEvent": [
        NewCall(constructor='PictureInPictureEvent', demands=['str', 'PictureInPictureEventInit'], returns='PictureInPictureEvent'),
    ],
    "getSupportedProfiles": [
        PrototypeCall(constructor='WEBGL_compressed_texture_astc', fn='getSupportedProfiles', demands=['WEBGL_compressed_texture_astc'], returns='str'),
    ],
    "allowsFeature": [
        PrototypeCall(constructor='PermissionsPolicy', fn='allowsFeature', demands=['PermissionsPolicy', 'str'], returns='bool'),
        PrototypeCall(constructor='PermissionsPolicy', fn='allowsFeature', demands=['PermissionsPolicy', 'str', 'str'], returns='bool'),
    ],
    "features": [
        PrototypeCall(constructor='PermissionsPolicy', fn='features', demands=['PermissionsPolicy'], returns='str'),
    ],
    "allowedFeatures": [
        PrototypeCall(constructor='PermissionsPolicy', fn='allowedFeatures', demands=['PermissionsPolicy'], returns='str'),
    ],
    "getAllowlistForFeature": [
        PrototypeCall(constructor='PermissionsPolicy', fn='getAllowlistForFeature', demands=['PermissionsPolicy', 'str'], returns='str'),
    ],
    "parseAll": [
        DirectCall(fn='parseAll', receiver='CSSStyleValue', demands=['str', 'str'], returns='CSSStyleValue'),
    ],
    "CSSUnparsedValue": [
        NewCall(constructor='CSSUnparsedValue', demands=['CSSUnparsedSegment'], returns='CSSUnparsedValue'),
    ],
    "CSSVariableReferenceValue": [
        NewCall(constructor='CSSVariableReferenceValue', demands=['str'], returns='CSSVariableReferenceValue'),
        NewCall(constructor='CSSVariableReferenceValue', demands=['str', 'CSSUnparsedValue'], returns='CSSVariableReferenceValue'),
    ],
    "CSSKeywordValue": [
        NewCall(constructor='CSSKeywordValue', demands=['str'], returns='CSSKeywordValue'),
    ],
    "sub": [
        PrototypeCall(constructor='CSSNumericValue', fn='sub', demands=['CSSNumericValue', 'CSSNumberish'], returns='CSSNumericValue'),
    ],
    "mul": [
        PrototypeCall(constructor='CSSNumericValue', fn='mul', demands=['CSSNumericValue', 'CSSNumberish'], returns='CSSNumericValue'),
    ],
    "div": [
        PrototypeCall(constructor='CSSNumericValue', fn='div', demands=['CSSNumericValue', 'CSSNumberish'], returns='CSSNumericValue'),
    ],
    "min": [
        PrototypeCall(constructor='CSSNumericValue', fn='min', demands=['CSSNumericValue', 'CSSNumberish'], returns='CSSNumericValue'),
    ],
    "max": [
        PrototypeCall(constructor='CSSNumericValue', fn='max', demands=['CSSNumericValue', 'CSSNumberish'], returns='CSSNumericValue'),
    ],
    "equals": [
        PrototypeCall(constructor='CSSNumericValue', fn='equals', demands=['CSSNumericValue', 'CSSNumberish'], returns='bool'),
    ],
    "to": [
        PrototypeCall(constructor='CSSNumericValue', fn='to', demands=['CSSNumericValue', 'str'], returns='CSSUnitValue'),
    ],
    "toSum": [
        PrototypeCall(constructor='CSSNumericValue', fn='toSum', demands=['CSSNumericValue', 'str'], returns='CSSMathSum'),
    ],
    "type": [
        PrototypeCall(constructor='CSSNumericValue', fn='type', demands=['CSSNumericValue'], returns='CSSNumericType'),
    ],
    "CSSUnitValue": [
        NewCall(constructor='CSSUnitValue', demands=['float', 'str'], returns='CSSUnitValue'),
    ],
    "CSSMathSum": [
        NewCall(constructor='CSSMathSum', demands=['CSSNumberish'], returns='CSSMathSum'),
    ],
    "CSSMathProduct": [
        NewCall(constructor='CSSMathProduct', demands=['CSSNumberish'], returns='CSSMathProduct'),
    ],
    "CSSMathNegate": [
        NewCall(constructor='CSSMathNegate', demands=['CSSNumberish'], returns='CSSMathNegate'),
    ],
    "CSSMathInvert": [
        NewCall(constructor='CSSMathInvert', demands=['CSSNumberish'], returns='CSSMathInvert'),
    ],
    "CSSMathMin": [
        NewCall(constructor='CSSMathMin', demands=['CSSNumberish'], returns='CSSMathMin'),
    ],
    "CSSMathMax": [
        NewCall(constructor='CSSMathMax', demands=['CSSNumberish'], returns='CSSMathMax'),
    ],
    "CSSMathClamp": [
        NewCall(constructor='CSSMathClamp', demands=['CSSNumberish', 'CSSNumberish', 'CSSNumberish'], returns='CSSMathClamp'),
    ],
    "CSSTransformValue": [
        NewCall(constructor='CSSTransformValue', demands=['CSSTransformComponent'], returns='CSSTransformValue'),
    ],
    "toMatrix": [
        PrototypeCall(constructor='CSSTransformValue', fn='toMatrix', demands=['CSSTransformValue'], returns='DOMMatrix'),
        PrototypeCall(constructor='CSSTransformComponent', fn='toMatrix', demands=['CSSTransformComponent'], returns='DOMMatrix'),
    ],
    "CSSTranslate": [
        NewCall(constructor='CSSTranslate', demands=['CSSNumericValue', 'CSSNumericValue'], returns='CSSTranslate'),
        NewCall(constructor='CSSTranslate', demands=['CSSNumericValue', 'CSSNumericValue', 'CSSNumericValue'], returns='CSSTranslate'),
    ],
    "CSSRotate": [
        NewCall(constructor='CSSRotate', demands=['CSSNumericValue'], returns='CSSRotate'),
        NewCall(constructor='CSSRotate', demands=['CSSNumberish', 'CSSNumberish', 'CSSNumberish', 'CSSNumericValue'], returns='CSSRotate'),
    ],
    "CSSScale": [
        NewCall(constructor='CSSScale', demands=['CSSNumberish', 'CSSNumberish'], returns='CSSScale'),
        NewCall(constructor='CSSScale', demands=['CSSNumberish', 'CSSNumberish', 'CSSNumberish'], returns='CSSScale'),
    ],
    "CSSSkew": [
        NewCall(constructor='CSSSkew', demands=['CSSNumericValue', 'CSSNumericValue'], returns='CSSSkew'),
    ],
    "CSSSkewX": [
        NewCall(constructor='CSSSkewX', demands=['CSSNumericValue'], returns='CSSSkewX'),
    ],
    "CSSSkewY": [
        NewCall(constructor='CSSSkewY', demands=['CSSNumericValue'], returns='CSSSkewY'),
    ],
    "CSSPerspective": [
        NewCall(constructor='CSSPerspective', demands=['CSSPerspectiveValue'], returns='CSSPerspective'),
    ],
    "CSSMatrixComponent": [
        NewCall(constructor='CSSMatrixComponent', demands=['DOMMatrixReadOnly'], returns='CSSMatrixComponent'),
        NewCall(constructor='CSSMatrixComponent', demands=['DOMMatrixReadOnly', 'CSSMatrixComponentOptions'], returns='CSSMatrixComponent'),
    ],
    "CSSRGB": [
        NewCall(constructor='CSSRGB', demands=['CSSColorRGBComp', 'CSSColorRGBComp', 'CSSColorRGBComp'], returns='CSSRGB'),
        NewCall(constructor='CSSRGB', demands=['CSSColorRGBComp', 'CSSColorRGBComp', 'CSSColorRGBComp', 'CSSColorPercent'], returns='CSSRGB'),
    ],
    "CSSHSL": [
        NewCall(constructor='CSSHSL', demands=['CSSColorAngle', 'CSSColorPercent', 'CSSColorPercent'], returns='CSSHSL'),
        NewCall(constructor='CSSHSL', demands=['CSSColorAngle', 'CSSColorPercent', 'CSSColorPercent', 'CSSColorPercent'], returns='CSSHSL'),
    ],
    "CSSHWB": [
        NewCall(constructor='CSSHWB', demands=['CSSNumericValue', 'CSSNumberish', 'CSSNumberish'], returns='CSSHWB'),
        NewCall(constructor='CSSHWB', demands=['CSSNumericValue', 'CSSNumberish', 'CSSNumberish', 'CSSNumberish'], returns='CSSHWB'),
    ],
    "CSSLab": [
        NewCall(constructor='CSSLab', demands=['CSSColorPercent', 'CSSColorNumber', 'CSSColorNumber'], returns='CSSLab'),
        NewCall(constructor='CSSLab', demands=['CSSColorPercent', 'CSSColorNumber', 'CSSColorNumber', 'CSSColorPercent'], returns='CSSLab'),
    ],
    "CSSLCH": [
        NewCall(constructor='CSSLCH', demands=['CSSColorPercent', 'CSSColorPercent', 'CSSColorAngle'], returns='CSSLCH'),
        NewCall(constructor='CSSLCH', demands=['CSSColorPercent', 'CSSColorPercent', 'CSSColorAngle', 'CSSColorPercent'], returns='CSSLCH'),
    ],
    "CSSOKLab": [
        NewCall(constructor='CSSOKLab', demands=['CSSColorPercent', 'CSSColorNumber', 'CSSColorNumber'], returns='CSSOKLab'),
        NewCall(constructor='CSSOKLab', demands=['CSSColorPercent', 'CSSColorNumber', 'CSSColorNumber', 'CSSColorPercent'], returns='CSSOKLab'),
    ],
    "CSSOKLCH": [
        NewCall(constructor='CSSOKLCH', demands=['CSSColorPercent', 'CSSColorPercent', 'CSSColorAngle'], returns='CSSOKLCH'),
        NewCall(constructor='CSSOKLCH', demands=['CSSColorPercent', 'CSSColorPercent', 'CSSColorAngle', 'CSSColorPercent'], returns='CSSOKLCH'),
    ],
    "CSSColor": [
        NewCall(constructor='CSSColor', demands=['CSSKeywordish', 'CSSColorPercent'], returns='CSSColor'),
        NewCall(constructor='CSSColor', demands=['CSSKeywordish', 'CSSColorPercent', 'CSSNumberish'], returns='CSSColor'),
    ],
    "PointerTimeline": [
        NewCall(constructor='PointerTimeline', demands=[], returns='PointerTimeline'),
        NewCall(constructor='PointerTimeline', demands=['PointerTimelineOptions'], returns='PointerTimeline'),
    ],
    "setStatus": [
        PrototypeCall(constructor='NavigatorLogin', fn='setStatus', demands=['NavigatorLogin', 'LoginStatus'], returns='None'),
    ],
    "PresentationRequest": [
        NewCall(constructor='PresentationRequest', demands=['str'], returns='PresentationRequest'),
        NewCall(constructor='PresentationRequest', demands=['str'], returns='PresentationRequest'),
    ],
    "reconnect": [
        PrototypeCall(constructor='PresentationRequest', fn='reconnect', demands=['PresentationRequest', 'str'], returns='PresentationConnection'),
    ],
    "PresentationConnectionAvailableEvent": [
        NewCall(constructor='PresentationConnectionAvailableEvent', demands=['str', 'PresentationConnectionAvailableEventInit'], returns='PresentationConnectionAvailableEvent'),
    ],
    "PresentationConnectionCloseEvent": [
        NewCall(constructor='PresentationConnectionCloseEvent', demands=['str', 'PresentationConnectionCloseEventInit'], returns='PresentationConnectionCloseEvent'),
    ],
    "BeforeInstallPromptEvent": [
        NewCall(constructor='BeforeInstallPromptEvent', demands=['str'], returns='BeforeInstallPromptEvent'),
        NewCall(constructor='BeforeInstallPromptEvent', demands=['str', 'EventInit'], returns='BeforeInstallPromptEvent'),
    ],
    "ScrollTimeline": [
        NewCall(constructor='ScrollTimeline', demands=[], returns='ScrollTimeline'),
        NewCall(constructor='ScrollTimeline', demands=['ScrollTimelineOptions'], returns='ScrollTimeline'),
    ],
    "ViewTimeline": [
        NewCall(constructor='ViewTimeline', demands=[], returns='ViewTimeline'),
        NewCall(constructor='ViewTimeline', demands=['ViewTimelineOptions'], returns='ViewTimeline'),
    ],
    "DOMPointReadOnly": [
        NewCall(constructor='DOMPointReadOnly', demands=[], returns='DOMPointReadOnly'),
        NewCall(constructor='DOMPointReadOnly', demands=['float'], returns='DOMPointReadOnly'),
        NewCall(constructor='DOMPointReadOnly', demands=['float', 'float'], returns='DOMPointReadOnly'),
        NewCall(constructor='DOMPointReadOnly', demands=['float', 'float', 'float'], returns='DOMPointReadOnly'),
        NewCall(constructor='DOMPointReadOnly', demands=['float', 'float', 'float', 'float'], returns='DOMPointReadOnly'),
    ],
    "fromPoint": [
        DirectCall(fn='fromPoint', receiver='DOMPointReadOnly', demands=[], returns='DOMPointReadOnly'),
        DirectCall(fn='fromPoint', receiver='DOMPointReadOnly', demands=['DOMPointInit'], returns='DOMPointReadOnly'),
        DirectCall(fn='fromPoint', receiver='DOMPoint', demands=[], returns='DOMPoint'),
        DirectCall(fn='fromPoint', receiver='DOMPoint', demands=['DOMPointInit'], returns='DOMPoint'),
    ],
    "matrixTransform": [
        PrototypeCall(constructor='DOMPointReadOnly', fn='matrixTransform', demands=['DOMPointReadOnly'], returns='DOMPoint'),
        PrototypeCall(constructor='DOMPointReadOnly', fn='matrixTransform', demands=['DOMPointReadOnly', 'DOMMatrixInit'], returns='DOMPoint'),
    ],
    "DOMPoint": [
        NewCall(constructor='DOMPoint', demands=[], returns='DOMPoint'),
        NewCall(constructor='DOMPoint', demands=['float'], returns='DOMPoint'),
        NewCall(constructor='DOMPoint', demands=['float', 'float'], returns='DOMPoint'),
        NewCall(constructor='DOMPoint', demands=['float', 'float', 'float'], returns='DOMPoint'),
        NewCall(constructor='DOMPoint', demands=['float', 'float', 'float', 'float'], returns='DOMPoint'),
    ],
    "DOMRectReadOnly": [
        NewCall(constructor='DOMRectReadOnly', demands=[], returns='DOMRectReadOnly'),
        NewCall(constructor='DOMRectReadOnly', demands=['float'], returns='DOMRectReadOnly'),
        NewCall(constructor='DOMRectReadOnly', demands=['float', 'float'], returns='DOMRectReadOnly'),
        NewCall(constructor='DOMRectReadOnly', demands=['float', 'float', 'float'], returns='DOMRectReadOnly'),
        NewCall(constructor='DOMRectReadOnly', demands=['float', 'float', 'float', 'float'], returns='DOMRectReadOnly'),
    ],
    "fromRect": [
        DirectCall(fn='fromRect', receiver='DOMRectReadOnly', demands=[], returns='DOMRectReadOnly'),
        DirectCall(fn='fromRect', receiver='DOMRectReadOnly', demands=['DOMRectInit'], returns='DOMRectReadOnly'),
        DirectCall(fn='fromRect', receiver='DOMRect', demands=[], returns='DOMRect'),
        DirectCall(fn='fromRect', receiver='DOMRect', demands=['DOMRectInit'], returns='DOMRect'),
        DirectCall(fn='fromRect', receiver='DOMQuad', demands=[], returns='DOMQuad'),
        DirectCall(fn='fromRect', receiver='DOMQuad', demands=['DOMRectInit'], returns='DOMQuad'),
    ],
    "DOMRect": [
        NewCall(constructor='DOMRect', demands=[], returns='DOMRect'),
        NewCall(constructor='DOMRect', demands=['float'], returns='DOMRect'),
        NewCall(constructor='DOMRect', demands=['float', 'float'], returns='DOMRect'),
        NewCall(constructor='DOMRect', demands=['float', 'float', 'float'], returns='DOMRect'),
        NewCall(constructor='DOMRect', demands=['float', 'float', 'float', 'float'], returns='DOMRect'),
    ],
    "DOMQuad": [
        NewCall(constructor='DOMQuad', demands=[], returns='DOMQuad'),
        NewCall(constructor='DOMQuad', demands=['DOMPointInit'], returns='DOMQuad'),
        NewCall(constructor='DOMQuad', demands=['DOMPointInit', 'DOMPointInit'], returns='DOMQuad'),
        NewCall(constructor='DOMQuad', demands=['DOMPointInit', 'DOMPointInit', 'DOMPointInit'], returns='DOMQuad'),
        NewCall(constructor='DOMQuad', demands=['DOMPointInit', 'DOMPointInit', 'DOMPointInit', 'DOMPointInit'], returns='DOMQuad'),
    ],
    "fromQuad": [
        DirectCall(fn='fromQuad', receiver='DOMQuad', demands=[], returns='DOMQuad'),
        DirectCall(fn='fromQuad', receiver='DOMQuad', demands=['DOMQuadInit'], returns='DOMQuad'),
    ],
    "getBounds": [
        PrototypeCall(constructor='DOMQuad', fn='getBounds', demands=['DOMQuad'], returns='DOMRect'),
    ],
    "DOMMatrixReadOnly": [
        NewCall(constructor='DOMMatrixReadOnly', demands=[], returns='DOMMatrixReadOnly'),
        NewCall(constructor='DOMMatrixReadOnly', demands=['str'], returns='DOMMatrixReadOnly'),
    ],
    "fromMatrix": [
        DirectCall(fn='fromMatrix', receiver='DOMMatrixReadOnly', demands=[], returns='DOMMatrixReadOnly'),
        DirectCall(fn='fromMatrix', receiver='DOMMatrixReadOnly', demands=['DOMMatrixInit'], returns='DOMMatrixReadOnly'),
        DirectCall(fn='fromMatrix', receiver='DOMMatrix', demands=[], returns='DOMMatrix'),
        DirectCall(fn='fromMatrix', receiver='DOMMatrix', demands=['DOMMatrixInit'], returns='DOMMatrix'),
    ],
    "fromFloat32Array": [
        DirectCall(fn='fromFloat32Array', receiver='DOMMatrixReadOnly', demands=['Float32Array'], returns='DOMMatrixReadOnly'),
        DirectCall(fn='fromFloat32Array', receiver='DOMMatrix', demands=['Float32Array'], returns='DOMMatrix'),
    ],
    "fromFloat64Array": [
        DirectCall(fn='fromFloat64Array', receiver='DOMMatrixReadOnly', demands=['Float64Array'], returns='DOMMatrixReadOnly'),
        DirectCall(fn='fromFloat64Array', receiver='DOMMatrix', demands=['Float64Array'], returns='DOMMatrix'),
    ],
    "translate": [
        PrototypeCall(constructor='DOMMatrixReadOnly', fn='translate', demands=['DOMMatrixReadOnly'], returns='DOMMatrix'),
        PrototypeCall(constructor='DOMMatrixReadOnly', fn='translate', demands=['DOMMatrixReadOnly', 'float'], returns='DOMMatrix'),
        PrototypeCall(constructor='DOMMatrixReadOnly', fn='translate', demands=['DOMMatrixReadOnly', 'float', 'float'], returns='DOMMatrix'),
        PrototypeCall(constructor='DOMMatrixReadOnly', fn='translate', demands=['DOMMatrixReadOnly', 'float', 'float', 'float'], returns='DOMMatrix'),
        PrototypeCall(constructor='Translator', fn='translate', demands=['Translator', 'str'], returns='str'),
        PrototypeCall(constructor='Translator', fn='translate', demands=['Translator', 'str', 'TranslatorTranslateOptions'], returns='str'),
    ],
    "scale": [
        PrototypeCall(constructor='DOMMatrixReadOnly', fn='scale', demands=['DOMMatrixReadOnly'], returns='DOMMatrix'),
        PrototypeCall(constructor='DOMMatrixReadOnly', fn='scale', demands=['DOMMatrixReadOnly', 'float'], returns='DOMMatrix'),
        PrototypeCall(constructor='DOMMatrixReadOnly', fn='scale', demands=['DOMMatrixReadOnly', 'float', 'float'], returns='DOMMatrix'),
        PrototypeCall(constructor='DOMMatrixReadOnly', fn='scale', demands=['DOMMatrixReadOnly', 'float', 'float', 'float'], returns='DOMMatrix'),
        PrototypeCall(constructor='DOMMatrixReadOnly', fn='scale', demands=['DOMMatrixReadOnly', 'float', 'float', 'float', 'float'], returns='DOMMatrix'),
        PrototypeCall(constructor='DOMMatrixReadOnly', fn='scale', demands=['DOMMatrixReadOnly', 'float', 'float', 'float', 'float', 'float'], returns='DOMMatrix'),
        PrototypeCall(constructor='DOMMatrixReadOnly', fn='scale', demands=['DOMMatrixReadOnly', 'float', 'float', 'float', 'float', 'float', 'float'], returns='DOMMatrix'),
    ],
    "scaleNonUniform": [
        PrototypeCall(constructor='DOMMatrixReadOnly', fn='scaleNonUniform', demands=['DOMMatrixReadOnly'], returns='DOMMatrix'),
        PrototypeCall(constructor='DOMMatrixReadOnly', fn='scaleNonUniform', demands=['DOMMatrixReadOnly', 'float'], returns='DOMMatrix'),
        PrototypeCall(constructor='DOMMatrixReadOnly', fn='scaleNonUniform', demands=['DOMMatrixReadOnly', 'float', 'float'], returns='DOMMatrix'),
    ],
    "scale3d": [
        PrototypeCall(constructor='DOMMatrixReadOnly', fn='scale3d', demands=['DOMMatrixReadOnly'], returns='DOMMatrix'),
        PrototypeCall(constructor='DOMMatrixReadOnly', fn='scale3d', demands=['DOMMatrixReadOnly', 'float'], returns='DOMMatrix'),
        PrototypeCall(constructor='DOMMatrixReadOnly', fn='scale3d', demands=['DOMMatrixReadOnly', 'float', 'float'], returns='DOMMatrix'),
        PrototypeCall(constructor='DOMMatrixReadOnly', fn='scale3d', demands=['DOMMatrixReadOnly', 'float', 'float', 'float'], returns='DOMMatrix'),
        PrototypeCall(constructor='DOMMatrixReadOnly', fn='scale3d', demands=['DOMMatrixReadOnly', 'float', 'float', 'float', 'float'], returns='DOMMatrix'),
    ],
    "rotate": [
        PrototypeCall(constructor='DOMMatrixReadOnly', fn='rotate', demands=['DOMMatrixReadOnly'], returns='DOMMatrix'),
        PrototypeCall(constructor='DOMMatrixReadOnly', fn='rotate', demands=['DOMMatrixReadOnly', 'float'], returns='DOMMatrix'),
        PrototypeCall(constructor='DOMMatrixReadOnly', fn='rotate', demands=['DOMMatrixReadOnly', 'float', 'float'], returns='DOMMatrix'),
        PrototypeCall(constructor='DOMMatrixReadOnly', fn='rotate', demands=['DOMMatrixReadOnly', 'float', 'float', 'float'], returns='DOMMatrix'),
    ],
    "rotateFromVector": [
        PrototypeCall(constructor='DOMMatrixReadOnly', fn='rotateFromVector', demands=['DOMMatrixReadOnly'], returns='DOMMatrix'),
        PrototypeCall(constructor='DOMMatrixReadOnly', fn='rotateFromVector', demands=['DOMMatrixReadOnly', 'float'], returns='DOMMatrix'),
        PrototypeCall(constructor='DOMMatrixReadOnly', fn='rotateFromVector', demands=['DOMMatrixReadOnly', 'float', 'float'], returns='DOMMatrix'),
    ],
    "rotateAxisAngle": [
        PrototypeCall(constructor='DOMMatrixReadOnly', fn='rotateAxisAngle', demands=['DOMMatrixReadOnly'], returns='DOMMatrix'),
        PrototypeCall(constructor='DOMMatrixReadOnly', fn='rotateAxisAngle', demands=['DOMMatrixReadOnly', 'float'], returns='DOMMatrix'),
        PrototypeCall(constructor='DOMMatrixReadOnly', fn='rotateAxisAngle', demands=['DOMMatrixReadOnly', 'float', 'float'], returns='DOMMatrix'),
        PrototypeCall(constructor='DOMMatrixReadOnly', fn='rotateAxisAngle', demands=['DOMMatrixReadOnly', 'float', 'float', 'float'], returns='DOMMatrix'),
        PrototypeCall(constructor='DOMMatrixReadOnly', fn='rotateAxisAngle', demands=['DOMMatrixReadOnly', 'float', 'float', 'float', 'float'], returns='DOMMatrix'),
    ],
    "skewX": [
        PrototypeCall(constructor='DOMMatrixReadOnly', fn='skewX', demands=['DOMMatrixReadOnly'], returns='DOMMatrix'),
        PrototypeCall(constructor='DOMMatrixReadOnly', fn='skewX', demands=['DOMMatrixReadOnly', 'float'], returns='DOMMatrix'),
    ],
    "skewY": [
        PrototypeCall(constructor='DOMMatrixReadOnly', fn='skewY', demands=['DOMMatrixReadOnly'], returns='DOMMatrix'),
        PrototypeCall(constructor='DOMMatrixReadOnly', fn='skewY', demands=['DOMMatrixReadOnly', 'float'], returns='DOMMatrix'),
    ],
    "multiply": [
        PrototypeCall(constructor='DOMMatrixReadOnly', fn='multiply', demands=['DOMMatrixReadOnly'], returns='DOMMatrix'),
        PrototypeCall(constructor='DOMMatrixReadOnly', fn='multiply', demands=['DOMMatrixReadOnly', 'DOMMatrixInit'], returns='DOMMatrix'),
    ],
    "flipX": [
        PrototypeCall(constructor='DOMMatrixReadOnly', fn='flipX', demands=['DOMMatrixReadOnly'], returns='DOMMatrix'),
    ],
    "flipY": [
        PrototypeCall(constructor='DOMMatrixReadOnly', fn='flipY', demands=['DOMMatrixReadOnly'], returns='DOMMatrix'),
    ],
    "inverse": [
        PrototypeCall(constructor='DOMMatrixReadOnly', fn='inverse', demands=['DOMMatrixReadOnly'], returns='DOMMatrix'),
    ],
    "transformPoint": [
        PrototypeCall(constructor='DOMMatrixReadOnly', fn='transformPoint', demands=['DOMMatrixReadOnly'], returns='DOMPoint'),
        PrototypeCall(constructor='DOMMatrixReadOnly', fn='transformPoint', demands=['DOMMatrixReadOnly', 'DOMPointInit'], returns='DOMPoint'),
    ],
    "toFloat32Array": [
        PrototypeCall(constructor='DOMMatrixReadOnly', fn='toFloat32Array', demands=['DOMMatrixReadOnly'], returns='Float32Array'),
    ],
    "toFloat64Array": [
        PrototypeCall(constructor='DOMMatrixReadOnly', fn='toFloat64Array', demands=['DOMMatrixReadOnly'], returns='Float64Array'),
    ],
    "DOMMatrix": [
        NewCall(constructor='DOMMatrix', demands=[], returns='DOMMatrix'),
        NewCall(constructor='DOMMatrix', demands=['str'], returns='DOMMatrix'),
    ],
    "multiplySelf": [
        PrototypeCall(constructor='DOMMatrix', fn='multiplySelf', demands=['DOMMatrix'], returns='DOMMatrix'),
        PrototypeCall(constructor='DOMMatrix', fn='multiplySelf', demands=['DOMMatrix', 'DOMMatrixInit'], returns='DOMMatrix'),
    ],
    "preMultiplySelf": [
        PrototypeCall(constructor='DOMMatrix', fn='preMultiplySelf', demands=['DOMMatrix'], returns='DOMMatrix'),
        PrototypeCall(constructor='DOMMatrix', fn='preMultiplySelf', demands=['DOMMatrix', 'DOMMatrixInit'], returns='DOMMatrix'),
    ],
    "translateSelf": [
        PrototypeCall(constructor='DOMMatrix', fn='translateSelf', demands=['DOMMatrix'], returns='DOMMatrix'),
        PrototypeCall(constructor='DOMMatrix', fn='translateSelf', demands=['DOMMatrix', 'float'], returns='DOMMatrix'),
        PrototypeCall(constructor='DOMMatrix', fn='translateSelf', demands=['DOMMatrix', 'float', 'float'], returns='DOMMatrix'),
        PrototypeCall(constructor='DOMMatrix', fn='translateSelf', demands=['DOMMatrix', 'float', 'float', 'float'], returns='DOMMatrix'),
    ],
    "scaleSelf": [
        PrototypeCall(constructor='DOMMatrix', fn='scaleSelf', demands=['DOMMatrix'], returns='DOMMatrix'),
        PrototypeCall(constructor='DOMMatrix', fn='scaleSelf', demands=['DOMMatrix', 'float'], returns='DOMMatrix'),
        PrototypeCall(constructor='DOMMatrix', fn='scaleSelf', demands=['DOMMatrix', 'float', 'float'], returns='DOMMatrix'),
        PrototypeCall(constructor='DOMMatrix', fn='scaleSelf', demands=['DOMMatrix', 'float', 'float', 'float'], returns='DOMMatrix'),
        PrototypeCall(constructor='DOMMatrix', fn='scaleSelf', demands=['DOMMatrix', 'float', 'float', 'float', 'float'], returns='DOMMatrix'),
        PrototypeCall(constructor='DOMMatrix', fn='scaleSelf', demands=['DOMMatrix', 'float', 'float', 'float', 'float', 'float'], returns='DOMMatrix'),
        PrototypeCall(constructor='DOMMatrix', fn='scaleSelf', demands=['DOMMatrix', 'float', 'float', 'float', 'float', 'float', 'float'], returns='DOMMatrix'),
    ],
    "scale3dSelf": [
        PrototypeCall(constructor='DOMMatrix', fn='scale3dSelf', demands=['DOMMatrix'], returns='DOMMatrix'),
        PrototypeCall(constructor='DOMMatrix', fn='scale3dSelf', demands=['DOMMatrix', 'float'], returns='DOMMatrix'),
        PrototypeCall(constructor='DOMMatrix', fn='scale3dSelf', demands=['DOMMatrix', 'float', 'float'], returns='DOMMatrix'),
        PrototypeCall(constructor='DOMMatrix', fn='scale3dSelf', demands=['DOMMatrix', 'float', 'float', 'float'], returns='DOMMatrix'),
        PrototypeCall(constructor='DOMMatrix', fn='scale3dSelf', demands=['DOMMatrix', 'float', 'float', 'float', 'float'], returns='DOMMatrix'),
    ],
    "rotateSelf": [
        PrototypeCall(constructor='DOMMatrix', fn='rotateSelf', demands=['DOMMatrix'], returns='DOMMatrix'),
        PrototypeCall(constructor='DOMMatrix', fn='rotateSelf', demands=['DOMMatrix', 'float'], returns='DOMMatrix'),
        PrototypeCall(constructor='DOMMatrix', fn='rotateSelf', demands=['DOMMatrix', 'float', 'float'], returns='DOMMatrix'),
        PrototypeCall(constructor='DOMMatrix', fn='rotateSelf', demands=['DOMMatrix', 'float', 'float', 'float'], returns='DOMMatrix'),
    ],
    "rotateFromVectorSelf": [
        PrototypeCall(constructor='DOMMatrix', fn='rotateFromVectorSelf', demands=['DOMMatrix'], returns='DOMMatrix'),
        PrototypeCall(constructor='DOMMatrix', fn='rotateFromVectorSelf', demands=['DOMMatrix', 'float'], returns='DOMMatrix'),
        PrototypeCall(constructor='DOMMatrix', fn='rotateFromVectorSelf', demands=['DOMMatrix', 'float', 'float'], returns='DOMMatrix'),
    ],
    "rotateAxisAngleSelf": [
        PrototypeCall(constructor='DOMMatrix', fn='rotateAxisAngleSelf', demands=['DOMMatrix'], returns='DOMMatrix'),
        PrototypeCall(constructor='DOMMatrix', fn='rotateAxisAngleSelf', demands=['DOMMatrix', 'float'], returns='DOMMatrix'),
        PrototypeCall(constructor='DOMMatrix', fn='rotateAxisAngleSelf', demands=['DOMMatrix', 'float', 'float'], returns='DOMMatrix'),
        PrototypeCall(constructor='DOMMatrix', fn='rotateAxisAngleSelf', demands=['DOMMatrix', 'float', 'float', 'float'], returns='DOMMatrix'),
        PrototypeCall(constructor='DOMMatrix', fn='rotateAxisAngleSelf', demands=['DOMMatrix', 'float', 'float', 'float', 'float'], returns='DOMMatrix'),
    ],
    "skewXSelf": [
        PrototypeCall(constructor='DOMMatrix', fn='skewXSelf', demands=['DOMMatrix'], returns='DOMMatrix'),
        PrototypeCall(constructor='DOMMatrix', fn='skewXSelf', demands=['DOMMatrix', 'float'], returns='DOMMatrix'),
    ],
    "skewYSelf": [
        PrototypeCall(constructor='DOMMatrix', fn='skewYSelf', demands=['DOMMatrix'], returns='DOMMatrix'),
        PrototypeCall(constructor='DOMMatrix', fn='skewYSelf', demands=['DOMMatrix', 'float'], returns='DOMMatrix'),
    ],
    "invertSelf": [
        PrototypeCall(constructor='DOMMatrix', fn='invertSelf', demands=['DOMMatrix'], returns='DOMMatrix'),
    ],
    "setMatrixValue": [
        PrototypeCall(constructor='DOMMatrix', fn='setMatrixValue', demands=['DOMMatrix', 'str'], returns='DOMMatrix'),
    ],
    "createPolicy": [
        PrototypeCall(constructor='TrustedTypePolicyFactory', fn='createPolicy', demands=['TrustedTypePolicyFactory', 'str'], returns='TrustedTypePolicy'),
        PrototypeCall(constructor='TrustedTypePolicyFactory', fn='createPolicy', demands=['TrustedTypePolicyFactory', 'str', 'TrustedTypePolicyOptions'], returns='TrustedTypePolicy'),
    ],
    "isHTML": [
        PrototypeCall(constructor='TrustedTypePolicyFactory', fn='isHTML', demands=['TrustedTypePolicyFactory', '*'], returns='bool'),
    ],
    "isScript": [
        PrototypeCall(constructor='TrustedTypePolicyFactory', fn='isScript', demands=['TrustedTypePolicyFactory', '*'], returns='bool'),
    ],
    "isScriptURL": [
        PrototypeCall(constructor='TrustedTypePolicyFactory', fn='isScriptURL', demands=['TrustedTypePolicyFactory', '*'], returns='bool'),
    ],
    "getAttributeType": [
        PrototypeCall(constructor='TrustedTypePolicyFactory', fn='getAttributeType', demands=['TrustedTypePolicyFactory', 'str', 'str'], returns='str'),
        PrototypeCall(constructor='TrustedTypePolicyFactory', fn='getAttributeType', demands=['TrustedTypePolicyFactory', 'str', 'str', 'str'], returns='str'),
        PrototypeCall(constructor='TrustedTypePolicyFactory', fn='getAttributeType', demands=['TrustedTypePolicyFactory', 'str', 'str', 'str', 'str'], returns='str'),
    ],
    "getPropertyType": [
        PrototypeCall(constructor='TrustedTypePolicyFactory', fn='getPropertyType', demands=['TrustedTypePolicyFactory', 'str', 'str'], returns='str'),
        PrototypeCall(constructor='TrustedTypePolicyFactory', fn='getPropertyType', demands=['TrustedTypePolicyFactory', 'str', 'str', 'str'], returns='str'),
    ],
    "createHTML": [
        PrototypeCall(constructor='TrustedTypePolicy', fn='createHTML', demands=['TrustedTypePolicy', 'str', '*'], returns='TrustedHTML'),
    ],
    "createScript": [
        PrototypeCall(constructor='TrustedTypePolicy', fn='createScript', demands=['TrustedTypePolicy', 'str', '*'], returns='TrustedScript'),
    ],
    "createScriptURL": [
        PrototypeCall(constructor='TrustedTypePolicy', fn='createScriptURL', demands=['TrustedTypePolicy', 'str', '*'], returns='TrustedScriptURL'),
    ],
    "populateMatrix": [
        PrototypeCall(constructor='OrientationSensor', fn='populateMatrix', demands=['OrientationSensor', 'RotationMatrixType'], returns='None'),
    ],
    "AbsoluteOrientationSensor": [
        NewCall(constructor='AbsoluteOrientationSensor', demands=[], returns='AbsoluteOrientationSensor'),
        NewCall(constructor='AbsoluteOrientationSensor', demands=['OrientationSensorOptions'], returns='AbsoluteOrientationSensor'),
    ],
    "RelativeOrientationSensor": [
        NewCall(constructor='RelativeOrientationSensor', demands=[], returns='RelativeOrientationSensor'),
        NewCall(constructor='RelativeOrientationSensor', demands=['OrientationSensorOptions'], returns='RelativeOrientationSensor'),
    ],
    "BluetoothDataFilter": [
        NewCall(constructor='BluetoothDataFilter', demands=[], returns='BluetoothDataFilter'),
        NewCall(constructor='BluetoothDataFilter', demands=['BluetoothDataFilterInit'], returns='BluetoothDataFilter'),
    ],
    "BluetoothManufacturerDataFilter": [
        NewCall(constructor='BluetoothManufacturerDataFilter', demands=[], returns='BluetoothManufacturerDataFilter'),
        NewCall(constructor='BluetoothManufacturerDataFilter', demands=['object'], returns='BluetoothManufacturerDataFilter'),
    ],
    "BluetoothServiceDataFilter": [
        NewCall(constructor='BluetoothServiceDataFilter', demands=[], returns='BluetoothServiceDataFilter'),
        NewCall(constructor='BluetoothServiceDataFilter', demands=['object'], returns='BluetoothServiceDataFilter'),
    ],
    "BluetoothLEScanFilter": [
        NewCall(constructor='BluetoothLEScanFilter', demands=[], returns='BluetoothLEScanFilter'),
        NewCall(constructor='BluetoothLEScanFilter', demands=['BluetoothLEScanFilterInit'], returns='BluetoothLEScanFilter'),
    ],
    "skipTransition": [
        PrototypeCall(constructor='ViewTransition', fn='skipTransition', demands=['ViewTransition'], returns='None'),
    ],
    "createMediaKeys": [
        PrototypeCall(constructor='MediaKeySystemAccess', fn='createMediaKeys', demands=['MediaKeySystemAccess'], returns='MediaKeys'),
    ],
    "createSession": [
        PrototypeCall(constructor='MediaKeys', fn='createSession', demands=['MediaKeys'], returns='MediaKeySession'),
        PrototypeCall(constructor='MediaKeys', fn='createSession', demands=['MediaKeys', 'MediaKeySessionType'], returns='MediaKeySession'),
    ],
    "getStatusForPolicy": [
        PrototypeCall(constructor='MediaKeys', fn='getStatusForPolicy', demands=['MediaKeys'], returns='MediaKeyStatus'),
        PrototypeCall(constructor='MediaKeys', fn='getStatusForPolicy', demands=['MediaKeys', 'MediaKeysPolicy'], returns='MediaKeyStatus'),
    ],
    "setServerCertificate": [
        PrototypeCall(constructor='MediaKeys', fn='setServerCertificate', demands=['MediaKeys', 'BufferSource'], returns='bool'),
    ],
    "generateRequest": [
        PrototypeCall(constructor='MediaKeySession', fn='generateRequest', demands=['MediaKeySession', 'str', 'BufferSource'], returns='None'),
    ],
    "MediaKeyMessageEvent": [
        NewCall(constructor='MediaKeyMessageEvent', demands=['str', 'MediaKeyMessageEventInit'], returns='MediaKeyMessageEvent'),
    ],
    "MediaEncryptedEvent": [
        NewCall(constructor='MediaEncryptedEvent', demands=['str'], returns='MediaEncryptedEvent'),
        NewCall(constructor='MediaEncryptedEvent', demands=['str', 'MediaEncryptedEventInit'], returns='MediaEncryptedEvent'),
    ],
    "getProperties": [
        PrototypeCall(constructor='ContactsManager', fn='getProperties', demands=['ContactsManager'], returns='ContactProperty'),
    ],
    "ReadableStream": [
        NewCall(constructor='ReadableStream', demands=[], returns='ReadableStream'),
        NewCall(constructor='ReadableStream', demands=['object'], returns='ReadableStream'),
        NewCall(constructor='ReadableStream', demands=['object', 'QueuingStrategy'], returns='ReadableStream'),
    ],
    "from": [
        DirectCall(fn='from', receiver='ReadableStream', demands=['*'], returns='ReadableStream'),
        DirectCall(fn='from', receiver='Observable', demands=['*'], returns='Observable'),
    ],
    "getReader": [
        PrototypeCall(constructor='ReadableStream', fn='getReader', demands=['ReadableStream'], returns='ReadableStreamReader'),
        PrototypeCall(constructor='ReadableStream', fn='getReader', demands=['ReadableStream', 'ReadableStreamGetReaderOptions'], returns='ReadableStreamReader'),
    ],
    "pipeThrough": [
        PrototypeCall(constructor='ReadableStream', fn='pipeThrough', demands=['ReadableStream', 'ReadableWritablePair'], returns='ReadableStream'),
        PrototypeCall(constructor='ReadableStream', fn='pipeThrough', demands=['ReadableStream', 'ReadableWritablePair', 'StreamPipeOptions'], returns='ReadableStream'),
    ],
    "pipeTo": [
        PrototypeCall(constructor='ReadableStream', fn='pipeTo', demands=['ReadableStream', 'WritableStream'], returns='None'),
        PrototypeCall(constructor='ReadableStream', fn='pipeTo', demands=['ReadableStream', 'WritableStream', 'StreamPipeOptions'], returns='None'),
    ],
    "tee": [
        PrototypeCall(constructor='ReadableStream', fn='tee', demands=['ReadableStream'], returns='ReadableStream'),
    ],
    "ReadableStreamDefaultReader": [
        NewCall(constructor='ReadableStreamDefaultReader', demands=['ReadableStream'], returns='ReadableStreamDefaultReader'),
    ],
    "releaseLock": [
        PrototypeCall(constructor='ReadableStreamDefaultReader', fn='releaseLock', demands=['ReadableStreamDefaultReader'], returns='None'),
        PrototypeCall(constructor='ReadableStreamBYOBReader', fn='releaseLock', demands=['ReadableStreamBYOBReader'], returns='None'),
        PrototypeCall(constructor='WritableStreamDefaultWriter', fn='releaseLock', demands=['WritableStreamDefaultWriter'], returns='None'),
    ],
    "ReadableStreamBYOBReader": [
        NewCall(constructor='ReadableStreamBYOBReader', demands=['ReadableStream'], returns='ReadableStreamBYOBReader'),
    ],
    "enqueue": [
        PrototypeCall(constructor='ReadableStreamDefaultController', fn='enqueue', demands=['ReadableStreamDefaultController'], returns='None'),
        PrototypeCall(constructor='ReadableStreamDefaultController', fn='enqueue', demands=['ReadableStreamDefaultController', '*'], returns='None'),
        PrototypeCall(constructor='ReadableByteStreamController', fn='enqueue', demands=['ReadableByteStreamController', 'ArrayBufferView'], returns='None'),
        PrototypeCall(constructor='TransformStreamDefaultController', fn='enqueue', demands=['TransformStreamDefaultController'], returns='None'),
        PrototypeCall(constructor='TransformStreamDefaultController', fn='enqueue', demands=['TransformStreamDefaultController', '*'], returns='None'),
    ],
    "error": [
        PrototypeCall(constructor='ReadableStreamDefaultController', fn='error', demands=['ReadableStreamDefaultController'], returns='None'),
        PrototypeCall(constructor='ReadableStreamDefaultController', fn='error', demands=['ReadableStreamDefaultController', '*'], returns='None'),
        PrototypeCall(constructor='ReadableByteStreamController', fn='error', demands=['ReadableByteStreamController'], returns='None'),
        PrototypeCall(constructor='ReadableByteStreamController', fn='error', demands=['ReadableByteStreamController', '*'], returns='None'),
        PrototypeCall(constructor='WritableStreamDefaultController', fn='error', demands=['WritableStreamDefaultController'], returns='None'),
        PrototypeCall(constructor='WritableStreamDefaultController', fn='error', demands=['WritableStreamDefaultController', '*'], returns='None'),
        PrototypeCall(constructor='TransformStreamDefaultController', fn='error', demands=['TransformStreamDefaultController'], returns='None'),
        PrototypeCall(constructor='TransformStreamDefaultController', fn='error', demands=['TransformStreamDefaultController', '*'], returns='None'),
        PrototypeCall(constructor='Subscriber', fn='error', demands=['Subscriber', '*'], returns='None'),
        DirectCall(fn='error', receiver='Response', demands=[], returns='Response'),
    ],
    "respond": [
        PrototypeCall(constructor='ReadableStreamBYOBRequest', fn='respond', demands=['ReadableStreamBYOBRequest', 'int'], returns='None'),
    ],
    "respondWithNewView": [
        PrototypeCall(constructor='ReadableStreamBYOBRequest', fn='respondWithNewView', demands=['ReadableStreamBYOBRequest', 'ArrayBufferView'], returns='None'),
    ],
    "WritableStream": [
        NewCall(constructor='WritableStream', demands=[], returns='WritableStream'),
        NewCall(constructor='WritableStream', demands=['object'], returns='WritableStream'),
        NewCall(constructor='WritableStream', demands=['object', 'QueuingStrategy'], returns='WritableStream'),
    ],
    "WritableStreamDefaultWriter": [
        NewCall(constructor='WritableStreamDefaultWriter', demands=['WritableStream'], returns='WritableStreamDefaultWriter'),
    ],
    "TransformStream": [
        NewCall(constructor='TransformStream', demands=[], returns='TransformStream'),
        NewCall(constructor='TransformStream', demands=['object'], returns='TransformStream'),
        NewCall(constructor='TransformStream', demands=['object', 'QueuingStrategy'], returns='TransformStream'),
        NewCall(constructor='TransformStream', demands=['object', 'QueuingStrategy', 'QueuingStrategy'], returns='TransformStream'),
    ],
    "ByteLengthQueuingStrategy": [
        NewCall(constructor='ByteLengthQueuingStrategy', demands=['QueuingStrategyInit'], returns='ByteLengthQueuingStrategy'),
    ],
    "CountQueuingStrategy": [
        NewCall(constructor='CountQueuingStrategy', demands=['QueuingStrategyInit'], returns='CountQueuingStrategy'),
    ],
    "getTags": [
        PrototypeCall(constructor='PeriodicSyncManager', fn='getTags', demands=['PeriodicSyncManager'], returns='str'),
        PrototypeCall(constructor='SyncManager', fn='getTags', demands=['SyncManager'], returns='str'),
    ],
    "PeriodicSyncEvent": [
        NewCall(constructor='PeriodicSyncEvent', demands=['str', 'PeriodicSyncEventInit'], returns='PeriodicSyncEvent'),
    ],
    "CSSParserAtRule": [
        NewCall(constructor='CSSParserAtRule', demands=['str', 'CSSToken'], returns='CSSParserAtRule'),
        NewCall(constructor='CSSParserAtRule', demands=['str', 'CSSToken', 'CSSParserRule'], returns='CSSParserAtRule'),
    ],
    "CSSParserQualifiedRule": [
        NewCall(constructor='CSSParserQualifiedRule', demands=['CSSToken'], returns='CSSParserQualifiedRule'),
        NewCall(constructor='CSSParserQualifiedRule', demands=['CSSToken', 'CSSParserRule'], returns='CSSParserQualifiedRule'),
    ],
    "CSSParserDeclaration": [
        NewCall(constructor='CSSParserDeclaration', demands=['str'], returns='CSSParserDeclaration'),
        NewCall(constructor='CSSParserDeclaration', demands=['str', 'CSSParserRule'], returns='CSSParserDeclaration'),
    ],
    "CSSParserBlock": [
        NewCall(constructor='CSSParserBlock', demands=['str', 'CSSParserValue'], returns='CSSParserBlock'),
    ],
    "CSSParserFunction": [
        NewCall(constructor='CSSParserFunction', demands=['str', 'CSSParserValue'], returns='CSSParserFunction'),
    ],
    "registerLayout": [
        PrototypeCall(constructor='LayoutWorkletGlobalScope', fn='registerLayout', demands=['LayoutWorkletGlobalScope', 'str', 'VoidFunction'], returns='None'),
    ],
    "intrinsicSizes": [
        PrototypeCall(constructor='LayoutChild', fn='intrinsicSizes', demands=['LayoutChild'], returns='IntrinsicSizes'),
    ],
    "layoutNextFragment": [
        PrototypeCall(constructor='LayoutChild', fn='layoutNextFragment', demands=['LayoutChild', 'LayoutConstraintsOptions', 'ChildBreakToken'], returns='LayoutFragment'),
    ],
    "FragmentResult": [
        NewCall(constructor='FragmentResult', demands=[], returns='FragmentResult'),
        NewCall(constructor='FragmentResult', demands=['FragmentResultOptions'], returns='FragmentResult'),
    ],
    "Touch": [
        NewCall(constructor='Touch', demands=['TouchInit'], returns='Touch'),
    ],
    "TouchEvent": [
        NewCall(constructor='TouchEvent', demands=['str'], returns='TouchEvent'),
        NewCall(constructor='TouchEvent', demands=['str', 'TouchEventInit'], returns='TouchEvent'),
    ],
    "GroupEffect": [
        NewCall(constructor='GroupEffect', demands=['AnimationEffect'], returns='GroupEffect'),
        NewCall(constructor='GroupEffect', demands=['AnimationEffect', 'float'], returns='GroupEffect'),
    ],
    "prepend": [
        PrototypeCall(constructor='GroupEffect', fn='prepend', demands=['GroupEffect', 'AnimationEffect'], returns='None'),
    ],
    "SequenceEffect": [
        NewCall(constructor='SequenceEffect', demands=['AnimationEffect'], returns='SequenceEffect'),
        NewCall(constructor='SequenceEffect', demands=['AnimationEffect', 'float'], returns='SequenceEffect'),
    ],
    "AnimationPlaybackEvent": [
        NewCall(constructor='AnimationPlaybackEvent', demands=['str'], returns='AnimationPlaybackEvent'),
        NewCall(constructor='AnimationPlaybackEvent', demands=['str', 'AnimationPlaybackEventInit'], returns='AnimationPlaybackEvent'),
    ],
    "AnimationTrigger": [
        NewCall(constructor='AnimationTrigger', demands=[], returns='AnimationTrigger'),
        NewCall(constructor='AnimationTrigger', demands=['AnimationTriggerOptions'], returns='AnimationTrigger'),
    ],
    "postTask": [
        PrototypeCall(constructor='Scheduler', fn='postTask', demands=['Scheduler', 'SchedulerPostTaskCallback'], returns='*'),
        PrototypeCall(constructor='Scheduler', fn='postTask', demands=['Scheduler', 'SchedulerPostTaskCallback', 'SchedulerPostTaskOptions'], returns='*'),
    ],
    "yield": [
        PrototypeCall(constructor='Scheduler', fn='yield', demands=['Scheduler'], returns='None'),
    ],
    "TaskPriorityChangeEvent": [
        NewCall(constructor='TaskPriorityChangeEvent', demands=['str', 'TaskPriorityChangeEventInit'], returns='TaskPriorityChangeEvent'),
    ],
    "TaskController": [
        NewCall(constructor='TaskController', demands=[], returns='TaskController'),
        NewCall(constructor='TaskController', demands=['TaskControllerInit'], returns='TaskController'),
    ],
    "setPriority": [
        PrototypeCall(constructor='TaskController', fn='setPriority', demands=['TaskController', 'TaskPriority'], returns='None'),
        PrototypeCall(constructor='InterestGroupBiddingScriptRunnerGlobalScope', fn='setPriority', demands=['InterestGroupBiddingScriptRunnerGlobalScope', 'float'], returns='None'),
    ],
    "getParent": [
        PrototypeCall(constructor='FileSystemEntry', fn='getParent', demands=['FileSystemEntry'], returns='None'),
        PrototypeCall(constructor='FileSystemEntry', fn='getParent', demands=['FileSystemEntry', 'FileSystemEntryCallback'], returns='None'),
        PrototypeCall(constructor='FileSystemEntry', fn='getParent', demands=['FileSystemEntry', 'FileSystemEntryCallback', 'ErrorCallback'], returns='None'),
    ],
    "createReader": [
        PrototypeCall(constructor='FileSystemDirectoryEntry', fn='createReader', demands=['FileSystemDirectoryEntry'], returns='FileSystemDirectoryReader'),
    ],
    "readEntries": [
        PrototypeCall(constructor='FileSystemDirectoryReader', fn='readEntries', demands=['FileSystemDirectoryReader', 'FileSystemEntriesCallback'], returns='None'),
        PrototypeCall(constructor='FileSystemDirectoryReader', fn='readEntries', demands=['FileSystemDirectoryReader', 'FileSystemEntriesCallback', 'ErrorCallback'], returns='None'),
    ],
    "file": [
        PrototypeCall(constructor='FileSystemFileEntry', fn='file', demands=['FileSystemFileEntry', 'FileCallback'], returns='None'),
        PrototypeCall(constructor='FileSystemFileEntry', fn='file', demands=['FileSystemFileEntry', 'FileCallback', 'ErrorCallback'], returns='None'),
    ],
    "now": [
        PrototypeCall(constructor='Performance', fn='now', demands=['Performance'], returns='float'),
    ],
    "WebGLContextEvent": [
        NewCall(constructor='WebGLContextEvent', demands=['str'], returns='WebGLContextEvent'),
        NewCall(constructor='WebGLContextEvent', demands=['str', 'WebGLContextEventInit'], returns='WebGLContextEvent'),
    ],
    "HTMLFencedFrameElement": [
        NewCall(constructor='HTMLFencedFrameElement', demands=[], returns='HTMLFencedFrameElement'),
    ],
    "FencedFrameConfig": [
        NewCall(constructor='FencedFrameConfig', demands=['str'], returns='FencedFrameConfig'),
    ],
    "setSharedStorageContext": [
        PrototypeCall(constructor='FencedFrameConfig', fn='setSharedStorageContext', demands=['FencedFrameConfig', 'str'], returns='None'),
    ],
    "reportEvent": [
        PrototypeCall(constructor='Fence', fn='reportEvent', demands=['Fence'], returns='None'),
        PrototypeCall(constructor='Fence', fn='reportEvent', demands=['Fence', 'ReportEventType'], returns='None'),
    ],
    "setReportEventDataForAutomaticBeacons": [
        PrototypeCall(constructor='Fence', fn='setReportEventDataForAutomaticBeacons', demands=['Fence'], returns='None'),
        PrototypeCall(constructor='Fence', fn='setReportEventDataForAutomaticBeacons', demands=['Fence', 'FenceEvent'], returns='None'),
    ],
    "getNestedConfigs": [
        PrototypeCall(constructor='Fence', fn='getNestedConfigs', demands=['Fence'], returns='FencedFrameConfig'),
    ],
    "disableUntrustedNetwork": [
        PrototypeCall(constructor='Fence', fn='disableUntrustedNetwork', demands=['Fence'], returns='None'),
    ],
    "notifyEvent": [
        PrototypeCall(constructor='Fence', fn='notifyEvent', demands=['Fence', 'Event'], returns='None'),
    ],
    "Notification": [
        NewCall(constructor='Notification', demands=['str'], returns='Notification'),
        NewCall(constructor='Notification', demands=['str', 'NotificationOptions'], returns='Notification'),
    ],
    "NotificationEvent": [
        NewCall(constructor='NotificationEvent', demands=['str', 'NotificationEventInit'], returns='NotificationEvent'),
    ],
    "getDetails": [
        PrototypeCall(constructor='DigitalGoodsService', fn='getDetails', demands=['DigitalGoodsService', 'str'], returns='ItemDetails'),
    ],
    "listPurchases": [
        PrototypeCall(constructor='DigitalGoodsService', fn='listPurchases', demands=['DigitalGoodsService'], returns='PurchaseDetails'),
    ],
    "listPurchaseHistory": [
        PrototypeCall(constructor='DigitalGoodsService', fn='listPurchaseHistory', demands=['DigitalGoodsService'], returns='PurchaseDetails'),
    ],
    "consume": [
        PrototypeCall(constructor='DigitalGoodsService', fn='consume', demands=['DigitalGoodsService', 'str'], returns='None'),
    ],
    "createVertexArrayOES": [
        PrototypeCall(constructor='OES_vertex_array_object', fn='createVertexArrayOES', demands=['OES_vertex_array_object'], returns='WebGLVertexArrayObjectOES'),
    ],
    "deleteVertexArrayOES": [
        PrototypeCall(constructor='OES_vertex_array_object', fn='deleteVertexArrayOES', demands=['OES_vertex_array_object', 'WebGLVertexArrayObjectOES'], returns='None'),
    ],
    "isVertexArrayOES": [
        PrototypeCall(constructor='OES_vertex_array_object', fn='isVertexArrayOES', demands=['OES_vertex_array_object', 'WebGLVertexArrayObjectOES'], returns='GLboolean'),
    ],
    "bindVertexArrayOES": [
        PrototypeCall(constructor='OES_vertex_array_object', fn='bindVertexArrayOES', demands=['OES_vertex_array_object', 'WebGLVertexArrayObjectOES'], returns='None'),
    ],
    "appendMedium": [
        PrototypeCall(constructor='MediaList', fn='appendMedium', demands=['MediaList', 'CSSOMString'], returns='None'),
    ],
    "deleteMedium": [
        PrototypeCall(constructor='MediaList', fn='deleteMedium', demands=['MediaList', 'CSSOMString'], returns='None'),
    ],
    "CSSStyleSheet": [
        NewCall(constructor='CSSStyleSheet', demands=[], returns='CSSStyleSheet'),
        NewCall(constructor='CSSStyleSheet', demands=['CSSStyleSheetInit'], returns='CSSStyleSheet'),
    ],
    "insertRule": [
        PrototypeCall(constructor='CSSStyleSheet', fn='insertRule', demands=['CSSStyleSheet', 'CSSOMString'], returns='int'),
        PrototypeCall(constructor='CSSStyleSheet', fn='insertRule', demands=['CSSStyleSheet', 'CSSOMString', 'int'], returns='int'),
        PrototypeCall(constructor='CSSGroupingRule', fn='insertRule', demands=['CSSGroupingRule', 'CSSOMString'], returns='int'),
        PrototypeCall(constructor='CSSGroupingRule', fn='insertRule', demands=['CSSGroupingRule', 'CSSOMString', 'int'], returns='int'),
    ],
    "replaceSync": [
        PrototypeCall(constructor='CSSStyleSheet', fn='replaceSync', demands=['CSSStyleSheet', 'str'], returns='None'),
    ],
    "getPropertyValue": [
        PrototypeCall(constructor='CSSStyleDeclaration', fn='getPropertyValue', demands=['CSSStyleDeclaration', 'CSSOMString'], returns='CSSOMString'),
    ],
    "getPropertyPriority": [
        PrototypeCall(constructor='CSSStyleDeclaration', fn='getPropertyPriority', demands=['CSSStyleDeclaration', 'CSSOMString'], returns='CSSOMString'),
    ],
    "setProperty": [
        PrototypeCall(constructor='CSSStyleDeclaration', fn='setProperty', demands=['CSSStyleDeclaration', 'CSSOMString', 'CSSOMString'], returns='None'),
        PrototypeCall(constructor='CSSStyleDeclaration', fn='setProperty', demands=['CSSStyleDeclaration', 'CSSOMString', 'CSSOMString', 'CSSOMString'], returns='None'),
    ],
    "removeProperty": [
        PrototypeCall(constructor='CSSStyleDeclaration', fn='removeProperty', demands=['CSSStyleDeclaration', 'CSSOMString'], returns='CSSOMString'),
    ],
    "ImageCapture": [
        NewCall(constructor='ImageCapture', demands=['MediaStreamTrack'], returns='ImageCapture'),
    ],
    "takePhoto": [
        PrototypeCall(constructor='ImageCapture', fn='takePhoto', demands=['ImageCapture'], returns='Blob'),
        PrototypeCall(constructor='ImageCapture', fn='takePhoto', demands=['ImageCapture', 'PhotoSettings'], returns='Blob'),
    ],
    "getPhotoCapabilities": [
        PrototypeCall(constructor='ImageCapture', fn='getPhotoCapabilities', demands=['ImageCapture'], returns='PhotoCapabilities'),
    ],
    "getPhotoSettings": [
        PrototypeCall(constructor='ImageCapture', fn='getPhotoSettings', demands=['ImageCapture'], returns='PhotoSettings'),
    ],
    "grabFrame": [
        PrototypeCall(constructor='ImageCapture', fn='grabFrame', demands=['ImageCapture'], returns='ImageBitmap'),
    ],
    "ResizeObserver": [
        NewCall(constructor='ResizeObserver', demands=['ResizeObserverCallback'], returns='ResizeObserver'),
    ],
    "URLPattern": [
        NewCall(constructor='URLPattern', demands=['URLPatternInput', 'str'], returns='URLPattern'),
        NewCall(constructor='URLPattern', demands=['URLPatternInput', 'str', 'URLPatternOptions'], returns='URLPattern'),
        NewCall(constructor='URLPattern', demands=[], returns='URLPattern'),
        NewCall(constructor='URLPattern', demands=['URLPatternInput'], returns='URLPattern'),
        NewCall(constructor='URLPattern', demands=['URLPatternInput', 'URLPatternOptions'], returns='URLPattern'),
    ],
    "test": [
        PrototypeCall(constructor='URLPattern', fn='test', demands=['URLPattern'], returns='bool'),
        PrototypeCall(constructor='URLPattern', fn='test', demands=['URLPattern', 'URLPatternInput'], returns='bool'),
        PrototypeCall(constructor='URLPattern', fn='test', demands=['URLPattern', 'URLPatternInput', 'str'], returns='bool'),
    ],
    "exec": [
        PrototypeCall(constructor='URLPattern', fn='exec', demands=['URLPattern'], returns='URLPatternResult'),
        PrototypeCall(constructor='URLPattern', fn='exec', demands=['URLPattern', 'URLPatternInput'], returns='URLPatternResult'),
        PrototypeCall(constructor='URLPattern', fn='exec', demands=['URLPattern', 'URLPatternInput', 'str'], returns='URLPatternResult'),
    ],
    "requestAdapter": [
        PrototypeCall(constructor='GPU', fn='requestAdapter', demands=['GPU'], returns='GPUAdapter'),
        PrototypeCall(constructor='GPU', fn='requestAdapter', demands=['GPU', 'GPURequestAdapterOptions'], returns='GPUAdapter'),
    ],
    "getPreferredCanvasFormat": [
        PrototypeCall(constructor='GPU', fn='getPreferredCanvasFormat', demands=['GPU'], returns='GPUTextureFormat'),
    ],
    "createBuffer": [
        PrototypeCall(constructor='GPUDevice', fn='createBuffer', demands=['GPUDevice', 'GPUBufferDescriptor'], returns='GPUBuffer'),
        PrototypeCall(constructor='BaseAudioContext', fn='createBuffer', demands=['BaseAudioContext', 'int', 'int', 'float'], returns='AudioBuffer'),
    ],
    "createTexture": [
        PrototypeCall(constructor='GPUDevice', fn='createTexture', demands=['GPUDevice', 'GPUTextureDescriptor'], returns='GPUTexture'),
    ],
    "createSampler": [
        PrototypeCall(constructor='GPUDevice', fn='createSampler', demands=['GPUDevice'], returns='GPUSampler'),
        PrototypeCall(constructor='GPUDevice', fn='createSampler', demands=['GPUDevice', 'GPUSamplerDescriptor'], returns='GPUSampler'),
    ],
    "importExternalTexture": [
        PrototypeCall(constructor='GPUDevice', fn='importExternalTexture', demands=['GPUDevice', 'GPUExternalTextureDescriptor'], returns='GPUExternalTexture'),
    ],
    "createBindGroupLayout": [
        PrototypeCall(constructor='GPUDevice', fn='createBindGroupLayout', demands=['GPUDevice', 'GPUBindGroupLayoutDescriptor'], returns='GPUBindGroupLayout'),
    ],
    "createPipelineLayout": [
        PrototypeCall(constructor='GPUDevice', fn='createPipelineLayout', demands=['GPUDevice', 'GPUPipelineLayoutDescriptor'], returns='GPUPipelineLayout'),
    ],
    "createBindGroup": [
        PrototypeCall(constructor='GPUDevice', fn='createBindGroup', demands=['GPUDevice', 'GPUBindGroupDescriptor'], returns='GPUBindGroup'),
    ],
    "createShaderModule": [
        PrototypeCall(constructor='GPUDevice', fn='createShaderModule', demands=['GPUDevice', 'GPUShaderModuleDescriptor'], returns='GPUShaderModule'),
    ],
    "createComputePipeline": [
        PrototypeCall(constructor='GPUDevice', fn='createComputePipeline', demands=['GPUDevice', 'GPUComputePipelineDescriptor'], returns='GPUComputePipeline'),
    ],
    "createRenderPipeline": [
        PrototypeCall(constructor='GPUDevice', fn='createRenderPipeline', demands=['GPUDevice', 'GPURenderPipelineDescriptor'], returns='GPURenderPipeline'),
    ],
    "createComputePipelineAsync": [
        PrototypeCall(constructor='GPUDevice', fn='createComputePipelineAsync', demands=['GPUDevice', 'GPUComputePipelineDescriptor'], returns='GPUComputePipeline'),
    ],
    "createRenderPipelineAsync": [
        PrototypeCall(constructor='GPUDevice', fn='createRenderPipelineAsync', demands=['GPUDevice', 'GPURenderPipelineDescriptor'], returns='GPURenderPipeline'),
    ],
    "createCommandEncoder": [
        PrototypeCall(constructor='GPUDevice', fn='createCommandEncoder', demands=['GPUDevice'], returns='GPUCommandEncoder'),
        PrototypeCall(constructor='GPUDevice', fn='createCommandEncoder', demands=['GPUDevice', 'GPUCommandEncoderDescriptor'], returns='GPUCommandEncoder'),
    ],
    "createRenderBundleEncoder": [
        PrototypeCall(constructor='GPUDevice', fn='createRenderBundleEncoder', demands=['GPUDevice', 'GPURenderBundleEncoderDescriptor'], returns='GPURenderBundleEncoder'),
    ],
    "createQuerySet": [
        PrototypeCall(constructor='GPUDevice', fn='createQuerySet', demands=['GPUDevice', 'GPUQuerySetDescriptor'], returns='GPUQuerySet'),
    ],
    "mapAsync": [
        PrototypeCall(constructor='GPUBuffer', fn='mapAsync', demands=['GPUBuffer', 'GPUMapModeFlags'], returns='None'),
        PrototypeCall(constructor='GPUBuffer', fn='mapAsync', demands=['GPUBuffer', 'GPUMapModeFlags', 'GPUSize64'], returns='None'),
        PrototypeCall(constructor='GPUBuffer', fn='mapAsync', demands=['GPUBuffer', 'GPUMapModeFlags', 'GPUSize64', 'GPUSize64'], returns='None'),
    ],
    "getMappedRange": [
        PrototypeCall(constructor='GPUBuffer', fn='getMappedRange', demands=['GPUBuffer'], returns='ArrayBuffer'),
        PrototypeCall(constructor='GPUBuffer', fn='getMappedRange', demands=['GPUBuffer', 'GPUSize64'], returns='ArrayBuffer'),
        PrototypeCall(constructor='GPUBuffer', fn='getMappedRange', demands=['GPUBuffer', 'GPUSize64', 'GPUSize64'], returns='ArrayBuffer'),
    ],
    "unmap": [
        PrototypeCall(constructor='GPUBuffer', fn='unmap', demands=['GPUBuffer'], returns='None'),
    ],
    "createView": [
        PrototypeCall(constructor='GPUTexture', fn='createView', demands=['GPUTexture'], returns='GPUTextureView'),
        PrototypeCall(constructor='GPUTexture', fn='createView', demands=['GPUTexture', 'GPUTextureViewDescriptor'], returns='GPUTextureView'),
    ],
    "getCompilationInfo": [
        PrototypeCall(constructor='GPUShaderModule', fn='getCompilationInfo', demands=['GPUShaderModule'], returns='GPUCompilationInfo'),
    ],
    "GPUPipelineError": [
        NewCall(constructor='GPUPipelineError', demands=['str'], returns='GPUPipelineError'),
        NewCall(constructor='GPUPipelineError', demands=['str', 'GPUPipelineErrorInit'], returns='GPUPipelineError'),
    ],
    "beginRenderPass": [
        PrototypeCall(constructor='GPUCommandEncoder', fn='beginRenderPass', demands=['GPUCommandEncoder', 'GPURenderPassDescriptor'], returns='GPURenderPassEncoder'),
    ],
    "beginComputePass": [
        PrototypeCall(constructor='GPUCommandEncoder', fn='beginComputePass', demands=['GPUCommandEncoder'], returns='GPUComputePassEncoder'),
        PrototypeCall(constructor='GPUCommandEncoder', fn='beginComputePass', demands=['GPUCommandEncoder', 'GPUComputePassDescriptor'], returns='GPUComputePassEncoder'),
    ],
    "copyBufferToBuffer": [
        PrototypeCall(constructor='GPUCommandEncoder', fn='copyBufferToBuffer', demands=['GPUCommandEncoder', 'GPUBuffer', 'GPUBuffer'], returns='None'),
        PrototypeCall(constructor='GPUCommandEncoder', fn='copyBufferToBuffer', demands=['GPUCommandEncoder', 'GPUBuffer', 'GPUBuffer', 'GPUSize64'], returns='None'),
        PrototypeCall(constructor='GPUCommandEncoder', fn='copyBufferToBuffer', demands=['GPUCommandEncoder', 'GPUBuffer', 'GPUSize64', 'GPUBuffer', 'GPUSize64'], returns='None'),
        PrototypeCall(constructor='GPUCommandEncoder', fn='copyBufferToBuffer', demands=['GPUCommandEncoder', 'GPUBuffer', 'GPUSize64', 'GPUBuffer', 'GPUSize64', 'GPUSize64'], returns='None'),
    ],
    "copyBufferToTexture": [
        PrototypeCall(constructor='GPUCommandEncoder', fn='copyBufferToTexture', demands=['GPUCommandEncoder', 'GPUTexelCopyBufferInfo', 'GPUTexelCopyTextureInfo', 'GPUExtent3D'], returns='None'),
    ],
    "copyTextureToBuffer": [
        PrototypeCall(constructor='GPUCommandEncoder', fn='copyTextureToBuffer', demands=['GPUCommandEncoder', 'GPUTexelCopyTextureInfo', 'GPUTexelCopyBufferInfo', 'GPUExtent3D'], returns='None'),
    ],
    "copyTextureToTexture": [
        PrototypeCall(constructor='GPUCommandEncoder', fn='copyTextureToTexture', demands=['GPUCommandEncoder', 'GPUTexelCopyTextureInfo', 'GPUTexelCopyTextureInfo', 'GPUExtent3D'], returns='None'),
    ],
    "clearBuffer": [
        PrototypeCall(constructor='GPUCommandEncoder', fn='clearBuffer', demands=['GPUCommandEncoder', 'GPUBuffer'], returns='None'),
        PrototypeCall(constructor='GPUCommandEncoder', fn='clearBuffer', demands=['GPUCommandEncoder', 'GPUBuffer', 'GPUSize64'], returns='None'),
        PrototypeCall(constructor='GPUCommandEncoder', fn='clearBuffer', demands=['GPUCommandEncoder', 'GPUBuffer', 'GPUSize64', 'GPUSize64'], returns='None'),
    ],
    "resolveQuerySet": [
        PrototypeCall(constructor='GPUCommandEncoder', fn='resolveQuerySet', demands=['GPUCommandEncoder', 'GPUQuerySet', 'GPUSize32', 'GPUSize32', 'GPUBuffer', 'GPUSize64'], returns='None'),
    ],
    "setPipeline": [
        PrototypeCall(constructor='GPUComputePassEncoder', fn='setPipeline', demands=['GPUComputePassEncoder', 'GPUComputePipeline'], returns='None'),
    ],
    "dispatchWorkgroups": [
        PrototypeCall(constructor='GPUComputePassEncoder', fn='dispatchWorkgroups', demands=['GPUComputePassEncoder', 'GPUSize32'], returns='None'),
        PrototypeCall(constructor='GPUComputePassEncoder', fn='dispatchWorkgroups', demands=['GPUComputePassEncoder', 'GPUSize32', 'GPUSize32'], returns='None'),
        PrototypeCall(constructor='GPUComputePassEncoder', fn='dispatchWorkgroups', demands=['GPUComputePassEncoder', 'GPUSize32', 'GPUSize32', 'GPUSize32'], returns='None'),
    ],
    "dispatchWorkgroupsIndirect": [
        PrototypeCall(constructor='GPUComputePassEncoder', fn='dispatchWorkgroupsIndirect', demands=['GPUComputePassEncoder', 'GPUBuffer', 'GPUSize64'], returns='None'),
    ],
    "setViewport": [
        PrototypeCall(constructor='GPURenderPassEncoder', fn='setViewport', demands=['GPURenderPassEncoder', 'float', 'float', 'float', 'float', 'float', 'float'], returns='None'),
    ],
    "setScissorRect": [
        PrototypeCall(constructor='GPURenderPassEncoder', fn='setScissorRect', demands=['GPURenderPassEncoder', 'GPUIntegerCoordinate', 'GPUIntegerCoordinate', 'GPUIntegerCoordinate', 'GPUIntegerCoordinate'], returns='None'),
    ],
    "setBlendConstant": [
        PrototypeCall(constructor='GPURenderPassEncoder', fn='setBlendConstant', demands=['GPURenderPassEncoder', 'GPUColor'], returns='None'),
    ],
    "setStencilReference": [
        PrototypeCall(constructor='GPURenderPassEncoder', fn='setStencilReference', demands=['GPURenderPassEncoder', 'GPUStencilValue'], returns='None'),
    ],
    "beginOcclusionQuery": [
        PrototypeCall(constructor='GPURenderPassEncoder', fn='beginOcclusionQuery', demands=['GPURenderPassEncoder', 'GPUSize32'], returns='None'),
    ],
    "endOcclusionQuery": [
        PrototypeCall(constructor='GPURenderPassEncoder', fn='endOcclusionQuery', demands=['GPURenderPassEncoder'], returns='None'),
    ],
    "executeBundles": [
        PrototypeCall(constructor='GPURenderPassEncoder', fn='executeBundles', demands=['GPURenderPassEncoder', 'GPURenderBundle'], returns='None'),
    ],
    "onSubmittedWorkDone": [
        PrototypeCall(constructor='GPUQueue', fn='onSubmittedWorkDone', demands=['GPUQueue'], returns='None'),
    ],
    "writeBuffer": [
        PrototypeCall(constructor='GPUQueue', fn='writeBuffer', demands=['GPUQueue', 'GPUBuffer', 'GPUSize64', 'AllowSharedBufferSource'], returns='None'),
        PrototypeCall(constructor='GPUQueue', fn='writeBuffer', demands=['GPUQueue', 'GPUBuffer', 'GPUSize64', 'AllowSharedBufferSource', 'GPUSize64'], returns='None'),
        PrototypeCall(constructor='GPUQueue', fn='writeBuffer', demands=['GPUQueue', 'GPUBuffer', 'GPUSize64', 'AllowSharedBufferSource', 'GPUSize64', 'GPUSize64'], returns='None'),
    ],
    "writeTexture": [
        PrototypeCall(constructor='GPUQueue', fn='writeTexture', demands=['GPUQueue', 'GPUTexelCopyTextureInfo', 'AllowSharedBufferSource', 'GPUTexelCopyBufferLayout', 'GPUExtent3D'], returns='None'),
    ],
    "copyExternalImageToTexture": [
        PrototypeCall(constructor='GPUQueue', fn='copyExternalImageToTexture', demands=['GPUQueue', 'GPUCopyExternalImageSourceInfo', 'GPUCopyExternalImageDestInfo', 'GPUExtent3D'], returns='None'),
    ],
    "unconfigure": [
        PrototypeCall(constructor='GPUCanvasContext', fn='unconfigure', demands=['GPUCanvasContext'], returns='None'),
    ],
    "getCurrentTexture": [
        PrototypeCall(constructor='GPUCanvasContext', fn='getCurrentTexture', demands=['GPUCanvasContext'], returns='GPUTexture'),
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
        NewCall(constructor='GPUUncapturedErrorEvent', demands=['str', 'GPUUncapturedErrorEventInit'], returns='GPUUncapturedErrorEvent'),
    ],
    "EyeDropper": [
        NewCall(constructor='EyeDropper', demands=[], returns='EyeDropper'),
    ],
    "VTTCue": [
        NewCall(constructor='VTTCue', demands=['float', 'float', 'str'], returns='VTTCue'),
    ],
    "getCueAsHTML": [
        PrototypeCall(constructor='VTTCue', fn='getCueAsHTML', demands=['VTTCue'], returns='DocumentFragment'),
    ],
    "VTTRegion": [
        NewCall(constructor='VTTRegion', demands=[], returns='VTTRegion'),
    ],
    "playEffect": [
        PrototypeCall(constructor='GamepadHapticActuator', fn='playEffect', demands=['GamepadHapticActuator', 'GamepadHapticEffectType'], returns='GamepadHapticsResult'),
        PrototypeCall(constructor='GamepadHapticActuator', fn='playEffect', demands=['GamepadHapticActuator', 'GamepadHapticEffectType', 'GamepadEffectParameters'], returns='GamepadHapticsResult'),
    ],
    "GamepadEvent": [
        NewCall(constructor='GamepadEvent', demands=['str', 'GamepadEventInit'], returns='GamepadEvent'),
    ],
    "multiDrawArraysWEBGL": [
        PrototypeCall(constructor='WEBGL_multi_draw', fn='multiDrawArraysWEBGL', demands=['WEBGL_multi_draw', 'GLenum', 'Int32Array', 'int', 'Int32Array', 'int', 'GLsizei'], returns='None'),
    ],
    "multiDrawElementsWEBGL": [
        PrototypeCall(constructor='WEBGL_multi_draw', fn='multiDrawElementsWEBGL', demands=['WEBGL_multi_draw', 'GLenum', 'Int32Array', 'int', 'GLenum', 'Int32Array', 'int', 'GLsizei'], returns='None'),
    ],
    "multiDrawArraysInstancedWEBGL": [
        PrototypeCall(constructor='WEBGL_multi_draw', fn='multiDrawArraysInstancedWEBGL', demands=['WEBGL_multi_draw', 'GLenum', 'Int32Array', 'int', 'Int32Array', 'int', 'Int32Array', 'int', 'GLsizei'], returns='None'),
    ],
    "multiDrawElementsInstancedWEBGL": [
        PrototypeCall(constructor='WEBGL_multi_draw', fn='multiDrawElementsInstancedWEBGL', demands=['WEBGL_multi_draw', 'GLenum', 'Int32Array', 'int', 'GLenum', 'Int32Array', 'int', 'Int32Array', 'int', 'GLsizei'], returns='None'),
    ],
    "isSessionSupported": [
        PrototypeCall(constructor='XRSystem', fn='isSessionSupported', demands=['XRSystem', 'XRSessionMode'], returns='bool'),
    ],
    "requestSession": [
        PrototypeCall(constructor='XRSystem', fn='requestSession', demands=['XRSystem', 'XRSessionMode'], returns='XRSession'),
        PrototypeCall(constructor='XRSystem', fn='requestSession', demands=['XRSystem', 'XRSessionMode', 'XRSessionInit'], returns='XRSession'),
    ],
    "updateRenderState": [
        PrototypeCall(constructor='XRSession', fn='updateRenderState', demands=['XRSession'], returns='None'),
        PrototypeCall(constructor='XRSession', fn='updateRenderState', demands=['XRSession', 'XRRenderStateInit'], returns='None'),
    ],
    "updateTargetFrameRate": [
        PrototypeCall(constructor='XRSession', fn='updateTargetFrameRate', demands=['XRSession', 'float'], returns='None'),
    ],
    "requestReferenceSpace": [
        PrototypeCall(constructor='XRSession', fn='requestReferenceSpace', demands=['XRSession', 'XRReferenceSpaceType'], returns='XRReferenceSpace'),
    ],
    "requestAnimationFrame": [
        PrototypeCall(constructor='XRSession', fn='requestAnimationFrame', demands=['XRSession', 'XRFrameRequestCallback'], returns='int'),
    ],
    "cancelAnimationFrame": [
        PrototypeCall(constructor='XRSession', fn='cancelAnimationFrame', demands=['XRSession', 'int'], returns='None'),
    ],
    "getViewerPose": [
        PrototypeCall(constructor='XRFrame', fn='getViewerPose', demands=['XRFrame', 'XRReferenceSpace'], returns='XRViewerPose'),
    ],
    "getOffsetReferenceSpace": [
        PrototypeCall(constructor='XRReferenceSpace', fn='getOffsetReferenceSpace', demands=['XRReferenceSpace', 'XRRigidTransform'], returns='XRReferenceSpace'),
    ],
    "requestViewportScale": [
        PrototypeCall(constructor='XRView', fn='requestViewportScale', demands=['XRView', 'float'], returns='None'),
    ],
    "XRRigidTransform": [
        NewCall(constructor='XRRigidTransform', demands=[], returns='XRRigidTransform'),
        NewCall(constructor='XRRigidTransform', demands=['DOMPointInit'], returns='XRRigidTransform'),
        NewCall(constructor='XRRigidTransform', demands=['DOMPointInit', 'DOMPointInit'], returns='XRRigidTransform'),
    ],
    "XRWebGLLayer": [
        NewCall(constructor='XRWebGLLayer', demands=['XRSession', 'XRWebGLRenderingContext'], returns='XRWebGLLayer'),
        NewCall(constructor='XRWebGLLayer', demands=['XRSession', 'XRWebGLRenderingContext', 'XRWebGLLayerInit'], returns='XRWebGLLayer'),
    ],
    "getViewport": [
        PrototypeCall(constructor='XRWebGLLayer', fn='getViewport', demands=['XRWebGLLayer', 'XRView'], returns='XRViewport'),
    ],
    "getNativeFramebufferScaleFactor": [
        DirectCall(fn='getNativeFramebufferScaleFactor', receiver='XRWebGLLayer', demands=['XRSession'], returns='float'),
    ],
    "XRSessionEvent": [
        NewCall(constructor='XRSessionEvent', demands=['str', 'XRSessionEventInit'], returns='XRSessionEvent'),
    ],
    "XRInputSourceEvent": [
        NewCall(constructor='XRInputSourceEvent', demands=['str', 'XRInputSourceEventInit'], returns='XRInputSourceEvent'),
    ],
    "XRInputSourcesChangeEvent": [
        NewCall(constructor='XRInputSourcesChangeEvent', demands=['str', 'XRInputSourcesChangeEventInit'], returns='XRInputSourcesChangeEvent'),
    ],
    "XRReferenceSpaceEvent": [
        NewCall(constructor='XRReferenceSpaceEvent', demands=['str', 'XRReferenceSpaceEventInit'], returns='XRReferenceSpaceEvent'),
    ],
    "FontFace": [
        NewCall(constructor='FontFace', demands=['CSSOMString', 'CSSOMString'], returns='FontFace'),
        NewCall(constructor='FontFace', demands=['CSSOMString', 'CSSOMString', 'FontFaceDescriptors'], returns='FontFace'),
    ],
    "FontFaceSetLoadEvent": [
        NewCall(constructor='FontFaceSetLoadEvent', demands=['CSSOMString'], returns='FontFaceSetLoadEvent'),
        NewCall(constructor='FontFaceSetLoadEvent', demands=['CSSOMString', 'FontFaceSetLoadEventInit'], returns='FontFaceSetLoadEvent'),
    ],
    "check": [
        PrototypeCall(constructor='FontFaceSet', fn='check', demands=['FontFaceSet', 'CSSOMString'], returns='bool'),
        PrototypeCall(constructor='FontFaceSet', fn='check', demands=['FontFaceSet', 'CSSOMString', 'CSSOMString'], returns='bool'),
    ],
    "next": [
        PrototypeCall(constructor='Subscriber', fn='next', demands=['Subscriber', '*'], returns='None'),
    ],
    "addTeardown": [
        PrototypeCall(constructor='Subscriber', fn='addTeardown', demands=['Subscriber', 'VoidFunction'], returns='None'),
    ],
    "Observable": [
        NewCall(constructor='Observable', demands=['SubscribeCallback'], returns='Observable'),
    ],
    "takeUntil": [
        PrototypeCall(constructor='Observable', fn='takeUntil', demands=['Observable', '*'], returns='Observable'),
    ],
    "map": [
        PrototypeCall(constructor='Observable', fn='map', demands=['Observable', 'Mapper'], returns='Observable'),
    ],
    "filter": [
        PrototypeCall(constructor='Observable', fn='filter', demands=['Observable', 'Predicate'], returns='Observable'),
    ],
    "take": [
        PrototypeCall(constructor='Observable', fn='take', demands=['Observable', 'int'], returns='Observable'),
    ],
    "drop": [
        PrototypeCall(constructor='Observable', fn='drop', demands=['Observable', 'int'], returns='Observable'),
    ],
    "flatMap": [
        PrototypeCall(constructor='Observable', fn='flatMap', demands=['Observable', 'Mapper'], returns='Observable'),
    ],
    "switchMap": [
        PrototypeCall(constructor='Observable', fn='switchMap', demands=['Observable', 'Mapper'], returns='Observable'),
    ],
    "inspect": [
        PrototypeCall(constructor='Observable', fn='inspect', demands=['Observable'], returns='Observable'),
        PrototypeCall(constructor='Observable', fn='inspect', demands=['Observable', 'ObservableInspectorUnion'], returns='Observable'),
    ],
    "catch": [
        PrototypeCall(constructor='Observable', fn='catch', demands=['Observable', 'CatchCallback'], returns='Observable'),
    ],
    "finally": [
        PrototypeCall(constructor='Observable', fn='finally', demands=['Observable', 'VoidFunction'], returns='Observable'),
    ],
    "toArray": [
        PrototypeCall(constructor='Observable', fn='toArray', demands=['Observable'], returns='*'),
        PrototypeCall(constructor='Observable', fn='toArray', demands=['Observable', 'SubscribeOptions'], returns='*'),
    ],
    "forEach": [
        PrototypeCall(constructor='Observable', fn='forEach', demands=['Observable', 'Visitor'], returns='None'),
        PrototypeCall(constructor='Observable', fn='forEach', demands=['Observable', 'Visitor', 'SubscribeOptions'], returns='None'),
    ],
    "every": [
        PrototypeCall(constructor='Observable', fn='every', demands=['Observable', 'Predicate'], returns='bool'),
        PrototypeCall(constructor='Observable', fn='every', demands=['Observable', 'Predicate', 'SubscribeOptions'], returns='bool'),
    ],
    "first": [
        PrototypeCall(constructor='Observable', fn='first', demands=['Observable'], returns='*'),
        PrototypeCall(constructor='Observable', fn='first', demands=['Observable', 'SubscribeOptions'], returns='*'),
    ],
    "last": [
        PrototypeCall(constructor='Observable', fn='last', demands=['Observable'], returns='*'),
        PrototypeCall(constructor='Observable', fn='last', demands=['Observable', 'SubscribeOptions'], returns='*'),
    ],
    "find": [
        PrototypeCall(constructor='Observable', fn='find', demands=['Observable', 'Predicate'], returns='*'),
        PrototypeCall(constructor='Observable', fn='find', demands=['Observable', 'Predicate', 'SubscribeOptions'], returns='*'),
    ],
    "some": [
        PrototypeCall(constructor='Observable', fn='some', demands=['Observable', 'Predicate'], returns='bool'),
        PrototypeCall(constructor='Observable', fn='some', demands=['Observable', 'Predicate', 'SubscribeOptions'], returns='bool'),
    ],
    "reduce": [
        PrototypeCall(constructor='Observable', fn='reduce', demands=['Observable', 'Reducer'], returns='*'),
        PrototypeCall(constructor='Observable', fn='reduce', demands=['Observable', 'Reducer', '*'], returns='*'),
        PrototypeCall(constructor='Observable', fn='reduce', demands=['Observable', 'Reducer', '*', 'SubscribeOptions'], returns='*'),
    ],
    "getBBox": [
        PrototypeCall(constructor='SVGGraphicsElement', fn='getBBox', demands=['SVGGraphicsElement'], returns='DOMRect'),
        PrototypeCall(constructor='SVGGraphicsElement', fn='getBBox', demands=['SVGGraphicsElement', 'SVGBoundingBoxOptions'], returns='DOMRect'),
    ],
    "getCTM": [
        PrototypeCall(constructor='SVGGraphicsElement', fn='getCTM', demands=['SVGGraphicsElement'], returns='DOMMatrix'),
    ],
    "getScreenCTM": [
        PrototypeCall(constructor='SVGGraphicsElement', fn='getScreenCTM', demands=['SVGGraphicsElement'], returns='DOMMatrix'),
    ],
    "isPointInFill": [
        PrototypeCall(constructor='SVGGeometryElement', fn='isPointInFill', demands=['SVGGeometryElement'], returns='bool'),
        PrototypeCall(constructor='SVGGeometryElement', fn='isPointInFill', demands=['SVGGeometryElement', 'DOMPointInit'], returns='bool'),
    ],
    "isPointInStroke": [
        PrototypeCall(constructor='SVGGeometryElement', fn='isPointInStroke', demands=['SVGGeometryElement'], returns='bool'),
        PrototypeCall(constructor='SVGGeometryElement', fn='isPointInStroke', demands=['SVGGeometryElement', 'DOMPointInit'], returns='bool'),
    ],
    "newValueSpecifiedUnits": [
        PrototypeCall(constructor='SVGLength', fn='newValueSpecifiedUnits', demands=['SVGLength', 'unsigned short', 'float'], returns='None'),
        PrototypeCall(constructor='SVGAngle', fn='newValueSpecifiedUnits', demands=['SVGAngle', 'unsigned short', 'float'], returns='None'),
    ],
    "convertToSpecifiedUnits": [
        PrototypeCall(constructor='SVGLength', fn='convertToSpecifiedUnits', demands=['SVGLength', 'unsigned short'], returns='None'),
        PrototypeCall(constructor='SVGAngle', fn='convertToSpecifiedUnits', demands=['SVGAngle', 'unsigned short'], returns='None'),
    ],
    "insertItemBefore": [
        PrototypeCall(constructor='SVGNumberList', fn='insertItemBefore', demands=['SVGNumberList', 'SVGNumber', 'int'], returns='SVGNumber'),
        PrototypeCall(constructor='SVGLengthList', fn='insertItemBefore', demands=['SVGLengthList', 'SVGLength', 'int'], returns='SVGLength'),
        PrototypeCall(constructor='SVGStringList', fn='insertItemBefore', demands=['SVGStringList', 'str', 'int'], returns='str'),
        PrototypeCall(constructor='SVGTransformList', fn='insertItemBefore', demands=['SVGTransformList', 'SVGTransform', 'int'], returns='SVGTransform'),
        PrototypeCall(constructor='SVGPointList', fn='insertItemBefore', demands=['SVGPointList', 'DOMPoint', 'int'], returns='DOMPoint'),
    ],
    "replaceItem": [
        PrototypeCall(constructor='SVGNumberList', fn='replaceItem', demands=['SVGNumberList', 'SVGNumber', 'int'], returns='SVGNumber'),
        PrototypeCall(constructor='SVGLengthList', fn='replaceItem', demands=['SVGLengthList', 'SVGLength', 'int'], returns='SVGLength'),
        PrototypeCall(constructor='SVGStringList', fn='replaceItem', demands=['SVGStringList', 'str', 'int'], returns='str'),
        PrototypeCall(constructor='SVGTransformList', fn='replaceItem', demands=['SVGTransformList', 'SVGTransform', 'int'], returns='SVGTransform'),
        PrototypeCall(constructor='SVGPointList', fn='replaceItem', demands=['SVGPointList', 'DOMPoint', 'int'], returns='DOMPoint'),
    ],
    "appendItem": [
        PrototypeCall(constructor='SVGNumberList', fn='appendItem', demands=['SVGNumberList', 'SVGNumber'], returns='SVGNumber'),
        PrototypeCall(constructor='SVGLengthList', fn='appendItem', demands=['SVGLengthList', 'SVGLength'], returns='SVGLength'),
        PrototypeCall(constructor='SVGStringList', fn='appendItem', demands=['SVGStringList', 'str'], returns='str'),
        PrototypeCall(constructor='SVGTransformList', fn='appendItem', demands=['SVGTransformList', 'SVGTransform'], returns='SVGTransform'),
        PrototypeCall(constructor='SVGPointList', fn='appendItem', demands=['SVGPointList', 'DOMPoint'], returns='DOMPoint'),
    ],
    "getIntersectionList": [
        PrototypeCall(constructor='SVGSVGElement', fn='getIntersectionList', demands=['SVGSVGElement', 'DOMRectReadOnly', 'SVGElement'], returns='NodeList'),
    ],
    "getEnclosureList": [
        PrototypeCall(constructor='SVGSVGElement', fn='getEnclosureList', demands=['SVGSVGElement', 'DOMRectReadOnly', 'SVGElement'], returns='NodeList'),
    ],
    "checkIntersection": [
        PrototypeCall(constructor='SVGSVGElement', fn='checkIntersection', demands=['SVGSVGElement', 'SVGElement', 'DOMRectReadOnly'], returns='bool'),
    ],
    "checkEnclosure": [
        PrototypeCall(constructor='SVGSVGElement', fn='checkEnclosure', demands=['SVGSVGElement', 'SVGElement', 'DOMRectReadOnly'], returns='bool'),
    ],
    "deselectAll": [
        PrototypeCall(constructor='SVGSVGElement', fn='deselectAll', demands=['SVGSVGElement'], returns='None'),
    ],
    "createSVGNumber": [
        PrototypeCall(constructor='SVGSVGElement', fn='createSVGNumber', demands=['SVGSVGElement'], returns='SVGNumber'),
    ],
    "createSVGLength": [
        PrototypeCall(constructor='SVGSVGElement', fn='createSVGLength', demands=['SVGSVGElement'], returns='SVGLength'),
    ],
    "createSVGAngle": [
        PrototypeCall(constructor='SVGSVGElement', fn='createSVGAngle', demands=['SVGSVGElement'], returns='SVGAngle'),
    ],
    "createSVGPoint": [
        PrototypeCall(constructor='SVGSVGElement', fn='createSVGPoint', demands=['SVGSVGElement'], returns='DOMPoint'),
    ],
    "createSVGMatrix": [
        PrototypeCall(constructor='SVGSVGElement', fn='createSVGMatrix', demands=['SVGSVGElement'], returns='DOMMatrix'),
    ],
    "createSVGRect": [
        PrototypeCall(constructor='SVGSVGElement', fn='createSVGRect', demands=['SVGSVGElement'], returns='DOMRect'),
    ],
    "createSVGTransform": [
        PrototypeCall(constructor='SVGSVGElement', fn='createSVGTransform', demands=['SVGSVGElement'], returns='SVGTransform'),
    ],
    "createSVGTransformFromMatrix": [
        PrototypeCall(constructor='SVGSVGElement', fn='createSVGTransformFromMatrix', demands=['SVGSVGElement'], returns='SVGTransform'),
        PrototypeCall(constructor='SVGSVGElement', fn='createSVGTransformFromMatrix', demands=['SVGSVGElement', 'DOMMatrix2DInit'], returns='SVGTransform'),
        PrototypeCall(constructor='SVGTransformList', fn='createSVGTransformFromMatrix', demands=['SVGTransformList'], returns='SVGTransform'),
        PrototypeCall(constructor='SVGTransformList', fn='createSVGTransformFromMatrix', demands=['SVGTransformList', 'DOMMatrix2DInit'], returns='SVGTransform'),
    ],
    "getElementById": [
        PrototypeCall(constructor='SVGSVGElement', fn='getElementById', demands=['SVGSVGElement', 'str'], returns='Element'),
    ],
    "suspendRedraw": [
        PrototypeCall(constructor='SVGSVGElement', fn='suspendRedraw', demands=['SVGSVGElement', 'int'], returns='int'),
    ],
    "unsuspendRedraw": [
        PrototypeCall(constructor='SVGSVGElement', fn='unsuspendRedraw', demands=['SVGSVGElement', 'int'], returns='None'),
    ],
    "unsuspendRedrawAll": [
        PrototypeCall(constructor='SVGSVGElement', fn='unsuspendRedrawAll', demands=['SVGSVGElement'], returns='None'),
    ],
    "forceRedraw": [
        PrototypeCall(constructor='SVGSVGElement', fn='forceRedraw', demands=['SVGSVGElement'], returns='None'),
    ],
    "ShadowAnimation": [
        NewCall(constructor='ShadowAnimation', demands=['Animation', 'Element'], returns='ShadowAnimation'),
    ],
    "setMatrix": [
        PrototypeCall(constructor='SVGTransform', fn='setMatrix', demands=['SVGTransform'], returns='None'),
        PrototypeCall(constructor='SVGTransform', fn='setMatrix', demands=['SVGTransform', 'DOMMatrix2DInit'], returns='None'),
    ],
    "setTranslate": [
        PrototypeCall(constructor='SVGTransform', fn='setTranslate', demands=['SVGTransform', 'float', 'float'], returns='None'),
    ],
    "setScale": [
        PrototypeCall(constructor='SVGTransform', fn='setScale', demands=['SVGTransform', 'float', 'float'], returns='None'),
    ],
    "setRotate": [
        PrototypeCall(constructor='SVGTransform', fn='setRotate', demands=['SVGTransform', 'float', 'float', 'float'], returns='None'),
    ],
    "setSkewX": [
        PrototypeCall(constructor='SVGTransform', fn='setSkewX', demands=['SVGTransform', 'float'], returns='None'),
    ],
    "setSkewY": [
        PrototypeCall(constructor='SVGTransform', fn='setSkewY', demands=['SVGTransform', 'float'], returns='None'),
    ],
    "consolidate": [
        PrototypeCall(constructor='SVGTransformList', fn='consolidate', demands=['SVGTransformList'], returns='SVGTransform'),
    ],
    "getNumberOfChars": [
        PrototypeCall(constructor='SVGTextContentElement', fn='getNumberOfChars', demands=['SVGTextContentElement'], returns='int'),
    ],
    "getComputedTextLength": [
        PrototypeCall(constructor='SVGTextContentElement', fn='getComputedTextLength', demands=['SVGTextContentElement'], returns='float'),
    ],
    "getSubStringLength": [
        PrototypeCall(constructor='SVGTextContentElement', fn='getSubStringLength', demands=['SVGTextContentElement', 'int', 'int'], returns='float'),
    ],
    "getStartPositionOfChar": [
        PrototypeCall(constructor='SVGTextContentElement', fn='getStartPositionOfChar', demands=['SVGTextContentElement', 'int'], returns='DOMPoint'),
    ],
    "getEndPositionOfChar": [
        PrototypeCall(constructor='SVGTextContentElement', fn='getEndPositionOfChar', demands=['SVGTextContentElement', 'int'], returns='DOMPoint'),
    ],
    "getExtentOfChar": [
        PrototypeCall(constructor='SVGTextContentElement', fn='getExtentOfChar', demands=['SVGTextContentElement', 'int'], returns='DOMRect'),
    ],
    "getRotationOfChar": [
        PrototypeCall(constructor='SVGTextContentElement', fn='getRotationOfChar', demands=['SVGTextContentElement', 'int'], returns='float'),
    ],
    "getCharNumAtPosition": [
        PrototypeCall(constructor='SVGTextContentElement', fn='getCharNumAtPosition', demands=['SVGTextContentElement'], returns='int'),
        PrototypeCall(constructor='SVGTextContentElement', fn='getCharNumAtPosition', demands=['SVGTextContentElement', 'DOMPointInit'], returns='int'),
    ],
    "selectSubString": [
        PrototypeCall(constructor='SVGTextContentElement', fn='selectSubString', demands=['SVGTextContentElement', 'int', 'int'], returns='None'),
    ],
    "setOrientToAuto": [
        PrototypeCall(constructor='SVGMarkerElement', fn='setOrientToAuto', demands=['SVGMarkerElement'], returns='None'),
    ],
    "setOrientToAngle": [
        PrototypeCall(constructor='SVGMarkerElement', fn='setOrientToAngle', demands=['SVGMarkerElement', 'SVGAngle'], returns='None'),
    ],
    "GeolocationSensor": [
        NewCall(constructor='GeolocationSensor', demands=[], returns='GeolocationSensor'),
        NewCall(constructor='GeolocationSensor', demands=['GeolocationSensorOptions'], returns='GeolocationSensor'),
    ],
    "InputDeviceCapabilities": [
        NewCall(constructor='InputDeviceCapabilities', demands=[], returns='InputDeviceCapabilities'),
        NewCall(constructor='InputDeviceCapabilities', demands=['InputDeviceCapabilitiesInit'], returns='InputDeviceCapabilities'),
    ],
    "IdleDetector": [
        NewCall(constructor='IdleDetector', demands=[], returns='IdleDetector'),
    ],
    "SyncEvent": [
        NewCall(constructor='SyncEvent', demands=['str', 'SyncEventInit'], returns='SyncEvent'),
    ],
    "SFrameTransform": [
        NewCall(constructor='SFrameTransform', demands=[], returns='SFrameTransform'),
        NewCall(constructor='SFrameTransform', demands=['SFrameTransformOptions'], returns='SFrameTransform'),
    ],
    "setEncryptionKey": [
        PrototypeCall(constructor='SFrameTransform', fn='setEncryptionKey', demands=['SFrameTransform', 'CryptoKey'], returns='None'),
        PrototypeCall(constructor='SFrameTransform', fn='setEncryptionKey', demands=['SFrameTransform', 'CryptoKey', 'CryptoKeyID'], returns='None'),
    ],
    "SFrameTransformErrorEvent": [
        NewCall(constructor='SFrameTransformErrorEvent', demands=['str', 'SFrameTransformErrorEventInit'], returns='SFrameTransformErrorEvent'),
    ],
    "RTCEncodedVideoFrame": [
        NewCall(constructor='RTCEncodedVideoFrame', demands=['RTCEncodedVideoFrame'], returns='RTCEncodedVideoFrame'),
        NewCall(constructor='RTCEncodedVideoFrame', demands=['RTCEncodedVideoFrame', 'RTCEncodedVideoFrameOptions'], returns='RTCEncodedVideoFrame'),
    ],
    "getMetadata": [
        PrototypeCall(constructor='RTCEncodedVideoFrame', fn='getMetadata', demands=['RTCEncodedVideoFrame'], returns='RTCEncodedVideoFrameMetadata'),
        PrototypeCall(constructor='RTCEncodedAudioFrame', fn='getMetadata', demands=['RTCEncodedAudioFrame'], returns='RTCEncodedAudioFrameMetadata'),
    ],
    "RTCEncodedAudioFrame": [
        NewCall(constructor='RTCEncodedAudioFrame', demands=['RTCEncodedAudioFrame'], returns='RTCEncodedAudioFrame'),
        NewCall(constructor='RTCEncodedAudioFrame', demands=['RTCEncodedAudioFrame', 'RTCEncodedAudioFrameOptions'], returns='RTCEncodedAudioFrame'),
    ],
    "generateKeyFrame": [
        PrototypeCall(constructor='RTCRtpScriptTransformer', fn='generateKeyFrame', demands=['RTCRtpScriptTransformer'], returns='int'),
        PrototypeCall(constructor='RTCRtpScriptTransformer', fn='generateKeyFrame', demands=['RTCRtpScriptTransformer', 'str'], returns='int'),
    ],
    "sendKeyFrameRequest": [
        PrototypeCall(constructor='RTCRtpScriptTransformer', fn='sendKeyFrameRequest', demands=['RTCRtpScriptTransformer'], returns='None'),
    ],
    "RTCRtpScriptTransform": [
        NewCall(constructor='RTCRtpScriptTransform', demands=['Worker'], returns='RTCRtpScriptTransform'),
        NewCall(constructor='RTCRtpScriptTransform', demands=['Worker', '*'], returns='RTCRtpScriptTransform'),
        NewCall(constructor='RTCRtpScriptTransform', demands=['Worker', '*', 'object'], returns='RTCRtpScriptTransform'),
    ],
    "KeyFrameRequestEvent": [
        NewCall(constructor='KeyFrameRequestEvent', demands=['str'], returns='KeyFrameRequestEvent'),
        NewCall(constructor='KeyFrameRequestEvent', demands=['str', 'str'], returns='KeyFrameRequestEvent'),
    ],
    "drawBuffersWEBGL": [
        PrototypeCall(constructor='WEBGL_draw_buffers', fn='drawBuffersWEBGL', demands=['WEBGL_draw_buffers', 'GLenum'], returns='None'),
    ],
    "watchAvailability": [
        PrototypeCall(constructor='RemotePlayback', fn='watchAvailability', demands=['RemotePlayback', 'RemotePlaybackAvailabilityCallback'], returns='int'),
    ],
    "cancelWatchAvailability": [
        PrototypeCall(constructor='RemotePlayback', fn='cancelWatchAvailability', demands=['RemotePlayback'], returns='None'),
        PrototypeCall(constructor='RemotePlayback', fn='cancelWatchAvailability', demands=['RemotePlayback', 'int'], returns='None'),
    ],
    "Headers": [
        NewCall(constructor='Headers', demands=[], returns='Headers'),
        NewCall(constructor='Headers', demands=['HeadersInit'], returns='Headers'),
    ],
    "getSetCookie": [
        PrototypeCall(constructor='Headers', fn='getSetCookie', demands=['Headers'], returns='str'),
    ],
    "Request": [
        NewCall(constructor='Request', demands=['RequestInfo'], returns='Request'),
        NewCall(constructor='Request', demands=['RequestInfo', 'RequestInit'], returns='Request'),
    ],
    "Response": [
        NewCall(constructor='Response', demands=[], returns='Response'),
        NewCall(constructor='Response', demands=['BodyInit'], returns='Response'),
        NewCall(constructor='Response', demands=['BodyInit', 'ResponseInit'], returns='Response'),
    ],
    "redirect": [
        DirectCall(fn='redirect', receiver='Response', demands=['str'], returns='Response'),
        DirectCall(fn='redirect', receiver='Response', demands=['str', 'unsigned short'], returns='Response'),
    ],
    "DocumentTimeline": [
        NewCall(constructor='DocumentTimeline', demands=[], returns='DocumentTimeline'),
        NewCall(constructor='DocumentTimeline', demands=['DocumentTimelineOptions'], returns='DocumentTimeline'),
    ],
    "Animation": [
        NewCall(constructor='Animation', demands=[], returns='Animation'),
        NewCall(constructor='Animation', demands=['AnimationEffect'], returns='Animation'),
        NewCall(constructor='Animation', demands=['AnimationEffect', 'AnimationTimeline'], returns='Animation'),
    ],
    "updatePlaybackRate": [
        PrototypeCall(constructor='Animation', fn='updatePlaybackRate', demands=['Animation', 'float'], returns='None'),
    ],
    "reverse": [
        PrototypeCall(constructor='Animation', fn='reverse', demands=['Animation'], returns='None'),
    ],
    "commitStyles": [
        PrototypeCall(constructor='Animation', fn='commitStyles', demands=['Animation'], returns='None'),
    ],
    "updateTiming": [
        PrototypeCall(constructor='AnimationEffect', fn='updateTiming', demands=['AnimationEffect'], returns='None'),
        PrototypeCall(constructor='AnimationEffect', fn='updateTiming', demands=['AnimationEffect', 'OptionalEffectTiming'], returns='None'),
    ],
    "KeyframeEffect": [
        NewCall(constructor='KeyframeEffect', demands=['Element', 'object'], returns='KeyframeEffect'),
        NewCall(constructor='KeyframeEffect', demands=['Element', 'object', 'float'], returns='KeyframeEffect'),
        NewCall(constructor='KeyframeEffect', demands=['KeyframeEffect'], returns='KeyframeEffect'),
    ],
    "getKeyframes": [
        PrototypeCall(constructor='KeyframeEffect', fn='getKeyframes', demands=['KeyframeEffect'], returns='object'),
    ],
    "setKeyframes": [
        PrototypeCall(constructor='KeyframeEffect', fn='setKeyframes', demands=['KeyframeEffect', 'object'], returns='None'),
    ],
    "CompressionStream": [
        NewCall(constructor='CompressionStream', demands=['CompressionFormat'], returns='CompressionStream'),
    ],
    "DecompressionStream": [
        NewCall(constructor='DecompressionStream', demands=['CompressionFormat'], returns='DecompressionStream'),
    ],
    "setConsumer": [
        PrototypeCall(constructor='LaunchQueue', fn='setConsumer', demands=['LaunchQueue', 'LaunchConsumer'], returns='None'),
    ],
    "isInputPending": [
        PrototypeCall(constructor='Scheduling', fn='isInputPending', demands=['Scheduling'], returns='bool'),
        PrototypeCall(constructor='Scheduling', fn='isInputPending', demands=['Scheduling', 'IsInputPendingOptions'], returns='bool'),
    ],
    "fetch": [
        PrototypeCall(constructor='BackgroundFetchManager', fn='fetch', demands=['BackgroundFetchManager', 'str', 'RequestInfo'], returns='BackgroundFetchRegistration'),
        PrototypeCall(constructor='BackgroundFetchManager', fn='fetch', demands=['BackgroundFetchManager', 'str', 'RequestInfo', 'BackgroundFetchOptions'], returns='BackgroundFetchRegistration'),
    ],
    "getIds": [
        PrototypeCall(constructor='BackgroundFetchManager', fn='getIds', demands=['BackgroundFetchManager'], returns='str'),
    ],
    "BackgroundFetchEvent": [
        NewCall(constructor='BackgroundFetchEvent', demands=['str', 'BackgroundFetchEventInit'], returns='BackgroundFetchEvent'),
    ],
    "BackgroundFetchUpdateUIEvent": [
        NewCall(constructor='BackgroundFetchUpdateUIEvent', demands=['str', 'BackgroundFetchEventInit'], returns='BackgroundFetchUpdateUIEvent'),
    ],
    "updateUI": [
        PrototypeCall(constructor='BackgroundFetchUpdateUIEvent', fn='updateUI', demands=['BackgroundFetchUpdateUIEvent'], returns='None'),
        PrototypeCall(constructor='BackgroundFetchUpdateUIEvent', fn='updateUI', demands=['BackgroundFetchUpdateUIEvent', 'BackgroundFetchUIOptions'], returns='None'),
    ],
    "translateStreaming": [
        PrototypeCall(constructor='Translator', fn='translateStreaming', demands=['Translator', 'str'], returns='ReadableStream'),
        PrototypeCall(constructor='Translator', fn='translateStreaming', demands=['Translator', 'str', 'TranslatorTranslateOptions'], returns='ReadableStream'),
    ],
    "XMLHttpRequest": [
        NewCall(constructor='XMLHttpRequest', demands=[], returns='XMLHttpRequest'),
    ],
    "setRequestHeader": [
        PrototypeCall(constructor='XMLHttpRequest', fn='setRequestHeader', demands=['XMLHttpRequest', 'str', 'str'], returns='None'),
    ],
    "getResponseHeader": [
        PrototypeCall(constructor='XMLHttpRequest', fn='getResponseHeader', demands=['XMLHttpRequest', 'str'], returns='str'),
    ],
    "getAllResponseHeaders": [
        PrototypeCall(constructor='XMLHttpRequest', fn='getAllResponseHeaders', demands=['XMLHttpRequest'], returns='str'),
    ],
    "overrideMimeType": [
        PrototypeCall(constructor='XMLHttpRequest', fn='overrideMimeType', demands=['XMLHttpRequest', 'str'], returns='None'),
    ],
    "FormData": [
        NewCall(constructor='FormData', demands=[], returns='FormData'),
        NewCall(constructor='FormData', demands=['HTMLFormElement'], returns='FormData'),
        NewCall(constructor='FormData', demands=['HTMLFormElement', 'HTMLElement'], returns='FormData'),
    ],
    "ProgressEvent": [
        NewCall(constructor='ProgressEvent', demands=['str'], returns='ProgressEvent'),
        NewCall(constructor='ProgressEvent', demands=['str', 'ProgressEventInit'], returns='ProgressEvent'),
    ],
    "createAnalyser": [
        PrototypeCall(constructor='BaseAudioContext', fn='createAnalyser', demands=['BaseAudioContext'], returns='AnalyserNode'),
    ],
    "createBiquadFilter": [
        PrototypeCall(constructor='BaseAudioContext', fn='createBiquadFilter', demands=['BaseAudioContext'], returns='BiquadFilterNode'),
    ],
    "createBufferSource": [
        PrototypeCall(constructor='BaseAudioContext', fn='createBufferSource', demands=['BaseAudioContext'], returns='AudioBufferSourceNode'),
    ],
    "createChannelMerger": [
        PrototypeCall(constructor='BaseAudioContext', fn='createChannelMerger', demands=['BaseAudioContext'], returns='ChannelMergerNode'),
        PrototypeCall(constructor='BaseAudioContext', fn='createChannelMerger', demands=['BaseAudioContext', 'int'], returns='ChannelMergerNode'),
    ],
    "createChannelSplitter": [
        PrototypeCall(constructor='BaseAudioContext', fn='createChannelSplitter', demands=['BaseAudioContext'], returns='ChannelSplitterNode'),
        PrototypeCall(constructor='BaseAudioContext', fn='createChannelSplitter', demands=['BaseAudioContext', 'int'], returns='ChannelSplitterNode'),
    ],
    "createConstantSource": [
        PrototypeCall(constructor='BaseAudioContext', fn='createConstantSource', demands=['BaseAudioContext'], returns='ConstantSourceNode'),
    ],
    "createConvolver": [
        PrototypeCall(constructor='BaseAudioContext', fn='createConvolver', demands=['BaseAudioContext'], returns='ConvolverNode'),
    ],
    "createDelay": [
        PrototypeCall(constructor='BaseAudioContext', fn='createDelay', demands=['BaseAudioContext'], returns='DelayNode'),
        PrototypeCall(constructor='BaseAudioContext', fn='createDelay', demands=['BaseAudioContext', 'float'], returns='DelayNode'),
    ],
    "createDynamicsCompressor": [
        PrototypeCall(constructor='BaseAudioContext', fn='createDynamicsCompressor', demands=['BaseAudioContext'], returns='DynamicsCompressorNode'),
    ],
    "createGain": [
        PrototypeCall(constructor='BaseAudioContext', fn='createGain', demands=['BaseAudioContext'], returns='GainNode'),
    ],
    "createIIRFilter": [
        PrototypeCall(constructor='BaseAudioContext', fn='createIIRFilter', demands=['BaseAudioContext', 'float', 'float'], returns='IIRFilterNode'),
    ],
    "createOscillator": [
        PrototypeCall(constructor='BaseAudioContext', fn='createOscillator', demands=['BaseAudioContext'], returns='OscillatorNode'),
    ],
    "createPanner": [
        PrototypeCall(constructor='BaseAudioContext', fn='createPanner', demands=['BaseAudioContext'], returns='PannerNode'),
    ],
    "createPeriodicWave": [
        PrototypeCall(constructor='BaseAudioContext', fn='createPeriodicWave', demands=['BaseAudioContext', 'float', 'float'], returns='PeriodicWave'),
        PrototypeCall(constructor='BaseAudioContext', fn='createPeriodicWave', demands=['BaseAudioContext', 'float', 'float', 'PeriodicWaveConstraints'], returns='PeriodicWave'),
    ],
    "createScriptProcessor": [
        PrototypeCall(constructor='BaseAudioContext', fn='createScriptProcessor', demands=['BaseAudioContext'], returns='ScriptProcessorNode'),
        PrototypeCall(constructor='BaseAudioContext', fn='createScriptProcessor', demands=['BaseAudioContext', 'int'], returns='ScriptProcessorNode'),
        PrototypeCall(constructor='BaseAudioContext', fn='createScriptProcessor', demands=['BaseAudioContext', 'int', 'int'], returns='ScriptProcessorNode'),
        PrototypeCall(constructor='BaseAudioContext', fn='createScriptProcessor', demands=['BaseAudioContext', 'int', 'int', 'int'], returns='ScriptProcessorNode'),
    ],
    "createStereoPanner": [
        PrototypeCall(constructor='BaseAudioContext', fn='createStereoPanner', demands=['BaseAudioContext'], returns='StereoPannerNode'),
    ],
    "createWaveShaper": [
        PrototypeCall(constructor='BaseAudioContext', fn='createWaveShaper', demands=['BaseAudioContext'], returns='WaveShaperNode'),
    ],
    "decodeAudioData": [
        PrototypeCall(constructor='BaseAudioContext', fn='decodeAudioData', demands=['BaseAudioContext', 'ArrayBuffer'], returns='AudioBuffer'),
        PrototypeCall(constructor='BaseAudioContext', fn='decodeAudioData', demands=['BaseAudioContext', 'ArrayBuffer', 'DecodeSuccessCallback'], returns='AudioBuffer'),
        PrototypeCall(constructor='BaseAudioContext', fn='decodeAudioData', demands=['BaseAudioContext', 'ArrayBuffer', 'DecodeSuccessCallback', 'DecodeErrorCallback'], returns='AudioBuffer'),
    ],
    "AudioContext": [
        NewCall(constructor='AudioContext', demands=[], returns='AudioContext'),
        NewCall(constructor='AudioContext', demands=['AudioContextOptions'], returns='AudioContext'),
    ],
    "getOutputTimestamp": [
        PrototypeCall(constructor='AudioContext', fn='getOutputTimestamp', demands=['AudioContext'], returns='AudioTimestamp'),
    ],
    "suspend": [
        PrototypeCall(constructor='AudioContext', fn='suspend', demands=['AudioContext'], returns='None'),
        PrototypeCall(constructor='OfflineAudioContext', fn='suspend', demands=['OfflineAudioContext', 'float'], returns='None'),
    ],
    "setSinkId": [
        PrototypeCall(constructor='AudioContext', fn='setSinkId', demands=['AudioContext', 'str'], returns='None'),
    ],
    "createMediaElementSource": [
        PrototypeCall(constructor='AudioContext', fn='createMediaElementSource', demands=['AudioContext', 'HTMLMediaElement'], returns='MediaElementAudioSourceNode'),
    ],
    "createMediaStreamSource": [
        PrototypeCall(constructor='AudioContext', fn='createMediaStreamSource', demands=['AudioContext', 'MediaStream'], returns='MediaStreamAudioSourceNode'),
    ],
    "createMediaStreamTrackSource": [
        PrototypeCall(constructor='AudioContext', fn='createMediaStreamTrackSource', demands=['AudioContext', 'MediaStreamTrack'], returns='MediaStreamTrackAudioSourceNode'),
    ],
    "createMediaStreamDestination": [
        PrototypeCall(constructor='AudioContext', fn='createMediaStreamDestination', demands=['AudioContext'], returns='MediaStreamAudioDestinationNode'),
    ],
    "OfflineAudioContext": [
        NewCall(constructor='OfflineAudioContext', demands=['OfflineAudioContextOptions'], returns='OfflineAudioContext'),
        NewCall(constructor='OfflineAudioContext', demands=['int', 'int', 'float'], returns='OfflineAudioContext'),
    ],
    "startRendering": [
        PrototypeCall(constructor='OfflineAudioContext', fn='startRendering', demands=['OfflineAudioContext'], returns='AudioBuffer'),
    ],
    "OfflineAudioCompletionEvent": [
        NewCall(constructor='OfflineAudioCompletionEvent', demands=['str', 'OfflineAudioCompletionEventInit'], returns='OfflineAudioCompletionEvent'),
    ],
    "AudioBuffer": [
        NewCall(constructor='AudioBuffer', demands=['AudioBufferOptions'], returns='AudioBuffer'),
    ],
    "getChannelData": [
        PrototypeCall(constructor='AudioBuffer', fn='getChannelData', demands=['AudioBuffer', 'int'], returns='Float32Array'),
    ],
    "copyFromChannel": [
        PrototypeCall(constructor='AudioBuffer', fn='copyFromChannel', demands=['AudioBuffer', 'Float32Array', 'int'], returns='None'),
        PrototypeCall(constructor='AudioBuffer', fn='copyFromChannel', demands=['AudioBuffer', 'Float32Array', 'int', 'int'], returns='None'),
    ],
    "copyToChannel": [
        PrototypeCall(constructor='AudioBuffer', fn='copyToChannel', demands=['AudioBuffer', 'Float32Array', 'int'], returns='None'),
        PrototypeCall(constructor='AudioBuffer', fn='copyToChannel', demands=['AudioBuffer', 'Float32Array', 'int', 'int'], returns='None'),
    ],
    "setValueAtTime": [
        PrototypeCall(constructor='AudioParam', fn='setValueAtTime', demands=['AudioParam', 'float', 'float'], returns='AudioParam'),
    ],
    "linearRampToValueAtTime": [
        PrototypeCall(constructor='AudioParam', fn='linearRampToValueAtTime', demands=['AudioParam', 'float', 'float'], returns='AudioParam'),
    ],
    "exponentialRampToValueAtTime": [
        PrototypeCall(constructor='AudioParam', fn='exponentialRampToValueAtTime', demands=['AudioParam', 'float', 'float'], returns='AudioParam'),
    ],
    "setTargetAtTime": [
        PrototypeCall(constructor='AudioParam', fn='setTargetAtTime', demands=['AudioParam', 'float', 'float', 'float'], returns='AudioParam'),
    ],
    "setValueCurveAtTime": [
        PrototypeCall(constructor='AudioParam', fn='setValueCurveAtTime', demands=['AudioParam', 'float', 'float', 'float'], returns='AudioParam'),
    ],
    "cancelScheduledValues": [
        PrototypeCall(constructor='AudioParam', fn='cancelScheduledValues', demands=['AudioParam', 'float'], returns='AudioParam'),
    ],
    "cancelAndHoldAtTime": [
        PrototypeCall(constructor='AudioParam', fn='cancelAndHoldAtTime', demands=['AudioParam', 'float'], returns='AudioParam'),
    ],
    "AnalyserNode": [
        NewCall(constructor='AnalyserNode', demands=['BaseAudioContext'], returns='AnalyserNode'),
        NewCall(constructor='AnalyserNode', demands=['BaseAudioContext', 'AnalyserOptions'], returns='AnalyserNode'),
    ],
    "getFloatFrequencyData": [
        PrototypeCall(constructor='AnalyserNode', fn='getFloatFrequencyData', demands=['AnalyserNode', 'Float32Array'], returns='None'),
    ],
    "getByteFrequencyData": [
        PrototypeCall(constructor='AnalyserNode', fn='getByteFrequencyData', demands=['AnalyserNode', 'Uint8Array'], returns='None'),
    ],
    "getFloatTimeDomainData": [
        PrototypeCall(constructor='AnalyserNode', fn='getFloatTimeDomainData', demands=['AnalyserNode', 'Float32Array'], returns='None'),
    ],
    "getByteTimeDomainData": [
        PrototypeCall(constructor='AnalyserNode', fn='getByteTimeDomainData', demands=['AnalyserNode', 'Uint8Array'], returns='None'),
    ],
    "AudioBufferSourceNode": [
        NewCall(constructor='AudioBufferSourceNode', demands=['BaseAudioContext'], returns='AudioBufferSourceNode'),
        NewCall(constructor='AudioBufferSourceNode', demands=['BaseAudioContext', 'AudioBufferSourceOptions'], returns='AudioBufferSourceNode'),
    ],
    "setOrientation": [
        PrototypeCall(constructor='AudioListener', fn='setOrientation', demands=['AudioListener', 'float', 'float', 'float', 'float', 'float', 'float'], returns='None'),
        PrototypeCall(constructor='PannerNode', fn='setOrientation', demands=['PannerNode', 'float', 'float', 'float'], returns='None'),
    ],
    "AudioProcessingEvent": [
        NewCall(constructor='AudioProcessingEvent', demands=['str', 'AudioProcessingEventInit'], returns='AudioProcessingEvent'),
    ],
    "BiquadFilterNode": [
        NewCall(constructor='BiquadFilterNode', demands=['BaseAudioContext'], returns='BiquadFilterNode'),
        NewCall(constructor='BiquadFilterNode', demands=['BaseAudioContext', 'BiquadFilterOptions'], returns='BiquadFilterNode'),
    ],
    "getFrequencyResponse": [
        PrototypeCall(constructor='BiquadFilterNode', fn='getFrequencyResponse', demands=['BiquadFilterNode', 'Float32Array', 'Float32Array', 'Float32Array'], returns='None'),
        PrototypeCall(constructor='IIRFilterNode', fn='getFrequencyResponse', demands=['IIRFilterNode', 'Float32Array', 'Float32Array', 'Float32Array'], returns='None'),
    ],
    "ChannelMergerNode": [
        NewCall(constructor='ChannelMergerNode', demands=['BaseAudioContext'], returns='ChannelMergerNode'),
        NewCall(constructor='ChannelMergerNode', demands=['BaseAudioContext', 'ChannelMergerOptions'], returns='ChannelMergerNode'),
    ],
    "ChannelSplitterNode": [
        NewCall(constructor='ChannelSplitterNode', demands=['BaseAudioContext'], returns='ChannelSplitterNode'),
        NewCall(constructor='ChannelSplitterNode', demands=['BaseAudioContext', 'ChannelSplitterOptions'], returns='ChannelSplitterNode'),
    ],
    "ConstantSourceNode": [
        NewCall(constructor='ConstantSourceNode', demands=['BaseAudioContext'], returns='ConstantSourceNode'),
        NewCall(constructor='ConstantSourceNode', demands=['BaseAudioContext', 'ConstantSourceOptions'], returns='ConstantSourceNode'),
    ],
    "ConvolverNode": [
        NewCall(constructor='ConvolverNode', demands=['BaseAudioContext'], returns='ConvolverNode'),
        NewCall(constructor='ConvolverNode', demands=['BaseAudioContext', 'ConvolverOptions'], returns='ConvolverNode'),
    ],
    "DelayNode": [
        NewCall(constructor='DelayNode', demands=['BaseAudioContext'], returns='DelayNode'),
        NewCall(constructor='DelayNode', demands=['BaseAudioContext', 'DelayOptions'], returns='DelayNode'),
    ],
    "DynamicsCompressorNode": [
        NewCall(constructor='DynamicsCompressorNode', demands=['BaseAudioContext'], returns='DynamicsCompressorNode'),
        NewCall(constructor='DynamicsCompressorNode', demands=['BaseAudioContext', 'DynamicsCompressorOptions'], returns='DynamicsCompressorNode'),
    ],
    "GainNode": [
        NewCall(constructor='GainNode', demands=['BaseAudioContext'], returns='GainNode'),
        NewCall(constructor='GainNode', demands=['BaseAudioContext', 'GainOptions'], returns='GainNode'),
    ],
    "IIRFilterNode": [
        NewCall(constructor='IIRFilterNode', demands=['BaseAudioContext', 'IIRFilterOptions'], returns='IIRFilterNode'),
    ],
    "MediaElementAudioSourceNode": [
        NewCall(constructor='MediaElementAudioSourceNode', demands=['AudioContext', 'MediaElementAudioSourceOptions'], returns='MediaElementAudioSourceNode'),
    ],
    "MediaStreamAudioDestinationNode": [
        NewCall(constructor='MediaStreamAudioDestinationNode', demands=['AudioContext'], returns='MediaStreamAudioDestinationNode'),
        NewCall(constructor='MediaStreamAudioDestinationNode', demands=['AudioContext', 'AudioNodeOptions'], returns='MediaStreamAudioDestinationNode'),
    ],
    "MediaStreamAudioSourceNode": [
        NewCall(constructor='MediaStreamAudioSourceNode', demands=['AudioContext', 'MediaStreamAudioSourceOptions'], returns='MediaStreamAudioSourceNode'),
    ],
    "MediaStreamTrackAudioSourceNode": [
        NewCall(constructor='MediaStreamTrackAudioSourceNode', demands=['AudioContext', 'MediaStreamTrackAudioSourceOptions'], returns='MediaStreamTrackAudioSourceNode'),
    ],
    "OscillatorNode": [
        NewCall(constructor='OscillatorNode', demands=['BaseAudioContext'], returns='OscillatorNode'),
        NewCall(constructor='OscillatorNode', demands=['BaseAudioContext', 'OscillatorOptions'], returns='OscillatorNode'),
    ],
    "setPeriodicWave": [
        PrototypeCall(constructor='OscillatorNode', fn='setPeriodicWave', demands=['OscillatorNode', 'PeriodicWave'], returns='None'),
    ],
    "PannerNode": [
        NewCall(constructor='PannerNode', demands=['BaseAudioContext'], returns='PannerNode'),
        NewCall(constructor='PannerNode', demands=['BaseAudioContext', 'PannerOptions'], returns='PannerNode'),
    ],
    "PeriodicWave": [
        NewCall(constructor='PeriodicWave', demands=['BaseAudioContext'], returns='PeriodicWave'),
        NewCall(constructor='PeriodicWave', demands=['BaseAudioContext', 'PeriodicWaveOptions'], returns='PeriodicWave'),
    ],
    "StereoPannerNode": [
        NewCall(constructor='StereoPannerNode', demands=['BaseAudioContext'], returns='StereoPannerNode'),
        NewCall(constructor='StereoPannerNode', demands=['BaseAudioContext', 'StereoPannerOptions'], returns='StereoPannerNode'),
    ],
    "WaveShaperNode": [
        NewCall(constructor='WaveShaperNode', demands=['BaseAudioContext'], returns='WaveShaperNode'),
        NewCall(constructor='WaveShaperNode', demands=['BaseAudioContext', 'WaveShaperOptions'], returns='WaveShaperNode'),
    ],
    "registerProcessor": [
        PrototypeCall(constructor='AudioWorkletGlobalScope', fn='registerProcessor', demands=['AudioWorkletGlobalScope', 'str', 'AudioWorkletProcessorConstructor'], returns='None'),
    ],
    "AudioWorkletNode": [
        NewCall(constructor='AudioWorkletNode', demands=['BaseAudioContext', 'str'], returns='AudioWorkletNode'),
        NewCall(constructor='AudioWorkletNode', demands=['BaseAudioContext', 'str', 'AudioWorkletNodeOptions'], returns='AudioWorkletNode'),
    ],
    "AudioWorkletProcessor": [
        NewCall(constructor='AudioWorkletProcessor', demands=[], returns='AudioWorkletProcessor'),
    ],
    "Blob": [
        NewCall(constructor='Blob', demands=[], returns='Blob'),
        NewCall(constructor='Blob', demands=['BlobPart'], returns='Blob'),
        NewCall(constructor='Blob', demands=['BlobPart', 'BlobPropertyBag'], returns='Blob'),
    ],
    "slice": [
        PrototypeCall(constructor='Blob', fn='slice', demands=['Blob'], returns='Blob'),
        PrototypeCall(constructor='Blob', fn='slice', demands=['Blob', 'long long'], returns='Blob'),
        PrototypeCall(constructor='Blob', fn='slice', demands=['Blob', 'long long', 'long long'], returns='Blob'),
        PrototypeCall(constructor='Blob', fn='slice', demands=['Blob', 'long long', 'long long', 'str'], returns='Blob'),
    ],
    "stream": [
        PrototypeCall(constructor='Blob', fn='stream', demands=['Blob'], returns='ReadableStream'),
    ],
    "File": [
        NewCall(constructor='File', demands=['BlobPart', 'str'], returns='File'),
        NewCall(constructor='File', demands=['BlobPart', 'str', 'FilePropertyBag'], returns='File'),
    ],
    "FileReader": [
        NewCall(constructor='FileReader', demands=[], returns='FileReader'),
    ],
    "readAsArrayBuffer": [
        PrototypeCall(constructor='FileReader', fn='readAsArrayBuffer', demands=['FileReader', 'Blob'], returns='None'),
        PrototypeCall(constructor='FileReaderSync', fn='readAsArrayBuffer', demands=['FileReaderSync', 'Blob'], returns='ArrayBuffer'),
    ],
    "readAsBinaryString": [
        PrototypeCall(constructor='FileReader', fn='readAsBinaryString', demands=['FileReader', 'Blob'], returns='None'),
        PrototypeCall(constructor='FileReaderSync', fn='readAsBinaryString', demands=['FileReaderSync', 'Blob'], returns='str'),
    ],
    "readAsText": [
        PrototypeCall(constructor='FileReader', fn='readAsText', demands=['FileReader', 'Blob'], returns='None'),
        PrototypeCall(constructor='FileReader', fn='readAsText', demands=['FileReader', 'Blob', 'str'], returns='None'),
        PrototypeCall(constructor='FileReaderSync', fn='readAsText', demands=['FileReaderSync', 'Blob'], returns='str'),
        PrototypeCall(constructor='FileReaderSync', fn='readAsText', demands=['FileReaderSync', 'Blob', 'str'], returns='str'),
    ],
    "readAsDataURL": [
        PrototypeCall(constructor='FileReader', fn='readAsDataURL', demands=['FileReader', 'Blob'], returns='None'),
        PrototypeCall(constructor='FileReaderSync', fn='readAsDataURL', demands=['FileReaderSync', 'Blob'], returns='str'),
    ],
    "FileReaderSync": [
        NewCall(constructor='FileReaderSync', demands=[], returns='FileReaderSync'),
    ],
    "encodeUtf8": [
        PrototypeCall(constructor='ProtectedAudienceUtilities', fn='encodeUtf8', demands=['ProtectedAudienceUtilities', 'str'], returns='Uint8Array'),
    ],
    "decodeUtf8": [
        PrototypeCall(constructor='ProtectedAudienceUtilities', fn='decodeUtf8', demands=['ProtectedAudienceUtilities', 'Uint8Array'], returns='str'),
    ],
    "reportAdAuctionWin": [
        PrototypeCall(constructor='ForDebuggingOnly', fn='reportAdAuctionWin', demands=['ForDebuggingOnly', 'str'], returns='None'),
    ],
    "reportAdAuctionLoss": [
        PrototypeCall(constructor='ForDebuggingOnly', fn='reportAdAuctionLoss', demands=['ForDebuggingOnly', 'str'], returns='None'),
    ],
    "setBid": [
        PrototypeCall(constructor='InterestGroupBiddingScriptRunnerGlobalScope', fn='setBid', demands=['InterestGroupBiddingScriptRunnerGlobalScope'], returns='bool'),
        PrototypeCall(constructor='InterestGroupBiddingScriptRunnerGlobalScope', fn='setBid', demands=['InterestGroupBiddingScriptRunnerGlobalScope', 'GenerateBidOutput'], returns='bool'),
    ],
    "setPrioritySignalsOverride": [
        PrototypeCall(constructor='InterestGroupBiddingScriptRunnerGlobalScope', fn='setPrioritySignalsOverride', demands=['InterestGroupBiddingScriptRunnerGlobalScope', 'str'], returns='None'),
        PrototypeCall(constructor='InterestGroupBiddingScriptRunnerGlobalScope', fn='setPrioritySignalsOverride', demands=['InterestGroupBiddingScriptRunnerGlobalScope', 'str', 'float'], returns='None'),
    ],
    "sendReportTo": [
        PrototypeCall(constructor='InterestGroupReportingScriptRunnerGlobalScope', fn='sendReportTo', demands=['InterestGroupReportingScriptRunnerGlobalScope', 'str'], returns='None'),
    ],
    "registerAdBeacon": [
        PrototypeCall(constructor='InterestGroupReportingScriptRunnerGlobalScope', fn='registerAdBeacon', demands=['InterestGroupReportingScriptRunnerGlobalScope', 'str'], returns='None'),
    ],
    "registerAdMacro": [
        PrototypeCall(constructor='InterestGroupReportingScriptRunnerGlobalScope', fn='registerAdMacro', demands=['InterestGroupReportingScriptRunnerGlobalScope', 'str', 'str'], returns='None'),
    ],
    "queryFeatureSupport": [
        PrototypeCall(constructor='ProtectedAudience', fn='queryFeatureSupport', demands=['ProtectedAudience', 'str'], returns='*'),
    ],
    "CaptureController": [
        NewCall(constructor='CaptureController', demands=[], returns='CaptureController'),
    ],
    "setFocusBehavior": [
        PrototypeCall(constructor='CaptureController', fn='setFocusBehavior', demands=['CaptureController', 'CaptureStartFocusBehavior'], returns='None'),
    ],
    "getCurrentPosition": [
        PrototypeCall(constructor='Geolocation', fn='getCurrentPosition', demands=['Geolocation', 'PositionCallback'], returns='None'),
        PrototypeCall(constructor='Geolocation', fn='getCurrentPosition', demands=['Geolocation', 'PositionCallback', 'PositionErrorCallback'], returns='None'),
        PrototypeCall(constructor='Geolocation', fn='getCurrentPosition', demands=['Geolocation', 'PositionCallback', 'PositionErrorCallback', 'PositionOptions'], returns='None'),
    ],
    "watchPosition": [
        PrototypeCall(constructor='Geolocation', fn='watchPosition', demands=['Geolocation', 'PositionCallback'], returns='int'),
        PrototypeCall(constructor='Geolocation', fn='watchPosition', demands=['Geolocation', 'PositionCallback', 'PositionErrorCallback'], returns='int'),
        PrototypeCall(constructor='Geolocation', fn='watchPosition', demands=['Geolocation', 'PositionCallback', 'PositionErrorCallback', 'PositionOptions'], returns='int'),
    ],
    "clearWatch": [
        PrototypeCall(constructor='Geolocation', fn='clearWatch', demands=['Geolocation', 'int'], returns='None'),
    ],
}
