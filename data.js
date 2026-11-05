/**
 * 资产总库配置文件 (已包含 Props、Emits、Slots 全结构化规格)
 */
const DOCS_DATA = [
    {
        category: "Vue公共组件",
        icon: "component",
        items: [
            {
                id: "lazy-scroll-list",
                name: "LazyScrollList 懒加载长列表",
                tag: "lazy-scroll-list",
                label: "滚动分页",
                desc: "基于 uni-app scroll-view 封装的自适应分页长列表。支持自动根据上方元素计算可视区域高度、触底分页加载、下拉刷新、内置空状态及底部 Loading / 没有更多了状态展示。",
                isGlobal: true,
                importStatement: "",
                props: [
                    { name: "height", type: "String", default: "'auto'", desc: "容器高度。为 'auto' 时会基于 windowHeight 自动计算；若传入具体值（如 '500px'）则直接应用" },
                    { name: "upperSelector", type: "String", default: "''", desc: "上方元素选择器（支持多个逗号分隔，如 '.header, .tab-bar'），内部自动获取其真实高度并在总视窗中减除" },
                    { name: "offset", type: "Number", default: "0", desc: "额外高度偏移量 (px)，在减完 upperSelector 后再额外扣除的高度" },
                    { name: "loading", type: "Boolean", default: "false", desc: "是否处于触底加载中状态（为 true 时底部显示旋转 Loading 图标和文字）" },
                    { name: "finished", type: "Boolean", default: "false", desc: "数据是否已全部加载完成（为 true 时底部显示‘没有更多了’，且不再触发 loadMore）" },
                    { name: "isEmpty", type: "Boolean", default: "false", desc: "数据是否为空（为 true 时展示居中空状态占位，并自动隐藏底部状态栏）" },
                    { name: "refresherEnabled", type: "Boolean", default: "false", desc: "是否开启下拉刷新功能" },
                    { name: "refresherTriggered", type: "Boolean", default: "false", desc: "下拉刷新复位状态控制器。当刷新接口完成时，父组件需将其设为 false 以复位控件" },
                    { name: "lowerThreshold", type: "Number", default: "50", desc: "距底部多远时触发 loadMore 事件，单位 px" },
                    { name: "emptyText", type: "String", default: "'暂无相关数据'", desc: "内置空状态展示的文字描述" },
                    { name: "loadingText", type: "String", default: "'加载中...'", desc: "底部加载中的提示文字" },
                    { name: "finishedText", type: "String", default: "'没有更多了'", desc: "底部加载完成的提示文字" }
                ],
                emits: [
                    { name: "loadMore", args: "无", desc: "滚动触底时触发。仅当 loading=false、finished=false、isEmpty=false 时才会派发" },
                    { name: "refresh", args: "无", desc: "用户手势下拉刷新到位后触发，通常在此重置 page=1 并重新请求数据" }
                ],
                slots: [
                    { name: "default", desc: "长列表渲染主体内容插槽" },
                    { name: "empty", desc: "自定义空数据插槽（覆盖组件自带的缺省图与文字）" }
                ],
                exampleCode: `<template>
  <view class="page">
    <view class="filter-header">筛选栏</view>

    <!-- 全局组件：直接使用标签，无需 import -->
    <lazy-scroll-list
      upper-selector=".filter-header"
      :loading="loading"
      :finished="finished"
      :is-empty="dataList.length === 0 && !loading"
      :refresher-enabled="true"
      :refresher-triggered="refreshing"
      @loadMore="handleLoadMore"
      @refresh="handleRefresh"
    >
      <view v-for="item in dataList" :key="item.id" class="card">
        <text>{{ item.title }}</text>
      </view>
    </lazy-scroll-list>
  </view>
</template>`
            },
            {
                id: "ls-navbar",
                name: "ls-navbar 自定义导航栏",
                tag: "ls-navbar",
                label: "顶部导航",
                desc: "适配微信小程序胶囊及各端系统状态栏（statusBarHeight）的固定顶部导航。自带同高度物理占位容器，支持智能返回、品牌标与右侧操作插槽。",
                isGlobal: true,
                importStatement: "",
                props: [
                    { name: "title", type: "String", default: "'校点巡拍'", desc: "导航栏居左/居中展示的标题文案" },
                    { name: "back", type: "Boolean", default: "false", desc: "是否展示左侧返回键（图标为 u-icon arrow-left）" },
                    { name: "home", type: "Boolean", default: "false", desc: "是否展示主页 Home 图标按钮" },
                    { name: "showLogo", type: "Boolean", default: "true", desc: "是否在标题左侧显示橙标 Logo 品牌图" },
                    { name: "placeholder", type: "Boolean", default: "true", desc: "是否开启物理高度占位，杜绝业务内容被 fixed 导航遮挡" },
                    { name: "bgColor", type: "String", default: "'#ffffff'", desc: "导航栏整体背景颜色" }
                ],
                emits: [
                    { name: "back", args: "无", desc: "点击返回按钮时触发。若父组件未监听，内部自动执行 uni.navigateBack()；若单页无历史记录则自动 reLaunch 到主页" }
                ],
                slots: [
                    { name: "right", desc: "导航栏右侧插槽，用于放置分享按钮、搜索入口或业务操作群" }
                ],
                exampleCode: `<template>
  <view class="page">
    <!-- 全局组件：带返回键，开启物理高度防遮挡 -->
    <ls-navbar 
      title="记录详情" 
      :back="true"
      :show-logo="false"
      bg-color="#ffffff"
    >
      <template #right>
        <button size="mini" @tap="doShare">分享</button>
      </template>
    </ls-navbar>

    <view class="content">内容区不会被导航栏遮挡</view>
  </view>
</template>`
            },
            {
                id: "oss-image-upload",
                name: "OssImageUpload 图片上传",
                tag: "oss-image-upload",
                label: "图片上传",
                desc: "基于阿里云 OSS 封装的移动端图片上传组件。支持 v-model 双向同步、单张大小限制校验、多图并发上传、点击大图预览与长按触发弹窗确认删除。",
                isGlobal: false,
                importStatement: `import OssImageUpload from '@/components/upload.vue';`,
                props: [
                    { name: "value / v-model", type: "Array", default: "() => []", desc: "已上传图片文件列表数组，内部元素需包含 url 属性，如 [{ url: 'https://...' }]" },
                    { name: "maxCount", type: "Number", default: "5", desc: "最多允许上传的图片张数上限" },
                    { name: "minCount", type: "Number", default: "0", desc: "最少要求上传的图片张数" },
                    { name: "maxSize", type: "Number", default: "15", desc: "单张图片最大体积（单位：MB），超出时自动弹 Toast 拦截并阻止上传" },
                    { name: "ossPath", type: "String", default: "'userImage'", desc: "指定上传至 OSS 存储桶中的目标文件夹目录名" },
                    { name: "concurrent", type: "Boolean", default: "true", desc: "是否开启多图并发同时上传。false 为队列逐张顺序上传" },
                    { name: "disabled", type: "Boolean", default: "false", desc: "是否禁用全部交互（禁用后不可点击上传、不可长按删除）" },
                    { name: "showText", type: "Boolean", default: "true", desc: "是否展示上传方块内的文字提示" },
                    { name: "uploadText", type: "String", default: "'点击上传'", desc: "上传方块内的文案" },
                    { name: "chooseOptions", type: "Object", default: "{ sizeType: ['original', 'compressed'], sourceType: ['album', 'camera'] }", desc: "透传给 uni.chooseImage 的配置项" }
                ],
                emits: [
                    { name: "input", args: "(newList: Array)", desc: "用于支持 v-model 双向绑定的核心更新事件" },
                    { name: "success", args: "(newList: Array)", desc: "图片上传成功后触发，返回最新的完整图片列表" },
                    { name: "remove", args: "(newList: Array, removeIndex: Number)", desc: "用户长按并确认删除图片后触发" },
                    { name: "progress", args: "({ progress: Number, index: Number })", desc: "上传进度回调" },
                    { name: "error", args: "(err: Error)", desc: "上传过程发生异常时的错误抛出" }
                ],
                slots: [
                    { name: "default", desc: "自定义上传加号区域的外观样式" }
                ],
                exampleCode: `<template>
  <view class="form-container">
    <oss-image-upload
      v-model="photos"
      :max-count="3"
      :max-size="10"
      oss-path="audit/credentials"
      @success="onUploadSuccess"
    />
  </view>
</template>

<script>
import OssImageUpload from '@/components/upload.vue';

export default {
  components: { OssImageUpload },
  data() {
    return { photos: [] };
  },
  methods: {
    onUploadSuccess(list) { console.log('最新图片：', list); }
  }
};
<\/script>`
            },
            {
                id: "oss-video-upload",
                name: "OssVideoUpload 视频上传",
                tag: "oss-video-upload",
                label: "视频上传",
                desc: "基于阿里云 OSS 封装的移动端视频上传组件。支持 v-model 双向同步、视频时长角标、点击唤起内置弹窗播放预览、长按模态框确认删除、大小与时长双重拦截校验。",
                isGlobal: false,
                importStatement: `import OssVideoUpload from '@/components/videoUpload.vue';`,
                props: [
                    { name: "value / v-model", type: "Array", default: "() => []", desc: "已上传视频文件列表，元素结构示例: [{ url: '...', thumb: '封面图', duration: 32, name: '...' }]" },
                    { name: "maxCount", type: "Number", default: "3", desc: "最多允许上传的视频数量上限" },
                    { name: "minCount", type: "Number", default: "0", desc: "最少要求上传的视频数量" },
                    { name: "maxSize", type: "Number", default: "50", desc: "单文件大小限制（单位：MB），超出时触发 Toast 拦截" },
                    { name: "maxDuration", type: "Number", default: "0", desc: "视频最大时长限制（单位：秒），0 为不限制时长；超出时拦截并提示" },
                    { name: "ossPath", type: "String", default: "'userVideo'", desc: "指定上传至 OSS 存储桶中的目标文件夹目录名" },
                    { name: "concurrent", type: "Boolean", default: "false", desc: "是否并发上传。视频体积大，默认 false 串行上传更稳定" },
                    { name: "disabled", type: "Boolean", default: "false", desc: "是否禁用全部交互（禁用后不可点击上传、不可长按删除）" },
                    { name: "showText", type: "Boolean", default: "true", desc: "是否展示上传方块内的文字提示" },
                    { name: "uploadText", type: "String", default: "'点击上传视频'", desc: "上传方块提示文案" },
                    { name: "chooseOptions", type: "Object", default: "{ sourceType: ['album', 'camera'], maxDuration: 60 }", desc: "透传给 uni.chooseVideo 的拍摄或相册选择配置" }
                ],
                emits: [
                    { name: "input", args: "(newList: Array)", desc: "用于支持 v-model 双向绑定的核心更新事件" },
                    { name: "success", args: "(newList: Array)", desc: "视频上传成功后触发，返回最新的完整视频列表" },
                    { name: "remove", args: "(newList: Array, removeIndex: Number)", desc: "用户长按并确认删除视频后触发" },
                    { name: "progress", args: "({ progress: Number, index: Number })", desc: "视频上传进度回调" },
                    { name: "error", args: "(err: Error)", desc: "上传异常或文件校验失败时触发" }
                ],
                slots: [
                    { name: "default", desc: "自定义上传加号区域外观样式" }
                ],
                exampleCode: `<template>
  <view class="form-container">
    <text class="label">录制视频佐证：</text>

    <!-- 按需引入视频上传组件 -->
    <oss-video-upload
      v-model="videoList"
      :max-count="1"
      :max-size="100"
      :max-duration="60"
      oss-path="audit/videos"
      @success="onVideoSuccess"
      @remove="onVideoRemoved"
    />
  </view>
</template>

<script>
import OssVideoUpload from '@/components/videoUpload.vue';

export default {
  components: {
    OssVideoUpload
  },
  data() {
    return {
      videoList: [
        // { url: 'https://...', thumb: 'https://...', duration: 15 }
      ]
    };
  },
  methods: {
    onVideoSuccess(list) {
      console.log('上传成功，当前视频列表：', list);
    },
    onVideoRemoved(newList, index) {
      console.log('移除了第', index, '个视频');
    }
  }
};
<\/script>`
            },
            {
                id: "su-empty",
                name: "su-empty 空状态占位",
                tag: "su-empty",
                label: "空缺省图",
                desc: "通用轻量级数据空缺省组件。用于列表数据为空、网络无连接或检索无结果时的友好视觉反馈，自带统一尺寸图片与自定义插槽。",
                isGlobal: false,
                importStatement: `import SuEmpty from '@/components/noData.vue';`,
                props: [
                    { name: "text", type: "String", default: "'暂无数据'", desc: "缺省提示文案" },
                    { name: "image", type: "String", default: "'http://.../empty/data.png'", desc: "缺省图片地址（默认在组件内加载 /static/home/noData.png）" },
                    { name: "mode", type: "String", default: "'data'", desc: "模式形态类型" }
                ],
                emits: [],
                slots: [
                    { name: "default", desc: "默认插槽，用于替代 text 文案，支持放入自定义操作按钮（如‘重新加载’）" }
                ],
                exampleCode: `<template>
  <view class="container">
    <su-empty v-if="orderList.length === 0" text="暂无相关订单" />
  </view>
</template>

<script>
import SuEmpty from '@/components/noData.vue';

export default {
  components: { SuEmpty },
  data() {
    return { orderList: [] };
  }
};
<\/script>`
            }
        ]
    },
    {
        category: "Mixins混入",
        icon: "copy",
        items: [
            {
                id: "oss-upload-mixin",
                name: "ossUpload 阿里云直传混入",
                label: "OSS直传",
                desc: "基于阿里云 OSS 客户端直传的 Vue Mixin。内置 STS 凭证管理与防并发重复拉取机制（提前 5 分钟自动刷新凭证）、单文件底层直传、多图并发/串行上传、全局加权进度计算及随机防重名处理。",
                isGlobal: false,
                importStatement: `import ossUpload from '@/utils/upload.js';`,
                props: [
                    {
                        name: "chooseAndUploadImage(options, progressCb, concurrent, Osspath)",
                        type: "Method (Promise)",
                        default: "-",
                        desc: "【高频核心】唤起相册选图并直接上传到 OSS。参数说明：options(选图配置，如count)、progressCb(进度回调:(overallPercent, countStr))、concurrent(是否并发，默认true)、Osspath(上传子目录)"
                    },
                    {
                        name: "uploadFileToOss(file, progressCb, Osspath)",
                        type: "Method (Promise)",
                        default: "-",
                        desc: "底层单文件直传方法。入参包含临时路径的 file 对象与存储路径，返回包含 { url, fileName, fullFileName, status, index } 的结果对象"
                    },
                    {
                        name: "getOssConfig(Osspath)",
                        type: "Method (Promise)",
                        default: "-",
                        desc: "获取最新有效的 STS 临时凭据，内部已做失效检测，5分钟内有效则直接命中缓存"
                    },
                    {
                        name: "ossConfig",
                        type: "Data Object",
                        default: "{ accessKeyId, signature, ... }",
                        desc: "Mixin 注入的主体响应式数据，存放当前生效的 STS 认证信息"
                    }
                ],
                emits: [
                    {
                        name: "chooseAndUploadImage -> resolve(results)",
                        args: "results: Array<{ url, fileName, fullFileName, status, index }>",
                        desc: "所有选定图片直传 OSS 完成，按原始选图顺序排列返回包含公网访问 url 的数组"
                    },
                    {
                        name: "progressCallback(overall, count)",
                        args: "overall: '正在上传 80%', count: '正在上传 2/3'",
                        desc: "直传期间的总体进度与张数进度提示回调"
                    }
                ],
                slots: [],
                exampleCode: `<script>
import ossUpload from '@/utils/upload.js';

export default {
  // 1. 混入 Mixin
  mixins: [ossUpload],
  data() {
    return {
      uploadedUrls: []
    };
  },
  methods: {
    // 2. 业务中一键调用选图并直传
    async handleChoosePhoto() {
      try {
        const results = await this.chooseAndUploadImage(
          { count: 3 }, // 最多选3张
          (percent, text) => {
            console.log(percent, text); // 打印进度，如 '正在上传 50%', '正在上传 1/2'
          },
          true,          // 开启多图并发上传
          'user/avatar'  // OSS 存储目录
        );

        // 获取上传成功后的公网图片链接
        this.uploadedUrls = results.map(item => item.url);
        console.log('上传成功：', this.uploadedUrls);
      } catch (err) {
        console.error('上传中断或失败：', err);
      }
    }
  }
};
<\/script>`
            },
            {
                id: "phone-auth-mixin",
                name: "phoneAuthMixin 微信手机号授权混入",
                label: "手机号授权",
                desc: "专用于微信小程序一键获取并安全存储手机号的公共 Mixin。内置 open-type='getPhoneNumber' 开放能力回调、用户拒绝拦截提示、向后端发送动态 code 换取真实手机号、本地持久化缓存（user_phone_number）以及成功向外派发事件。",
                isGlobal: false,
                importStatement: `import phoneAuthMixin from '@/utils/phoneAuthMixin.js';`,
                props: [
                    {
                        name: "phoneNumber",
                        type: "Data String",
                        default: "''",
                        desc: "已授权成功的手机号响应式变量，组件 created 阶段会自动尝试从本地缓存读取"
                    },
                    {
                        name: "onGetPhoneNumber(e)",
                        type: "Method (Event)",
                        default: "-",
                        desc: "【核心绑定】微信授权按钮 @getphonenumber 必须绑定的方法，内置拒绝授权拦截与 code 获取"
                    },
                    {
                        name: "clearPhoneAuth()",
                        type: "Method",
                        default: "-",
                        desc: "清空当前组件中的 phoneNumber 并移除本地缓存中的 'user_phone_number'"
                    },
                    {
                        name: "initPhoneNumber()",
                        type: "Method",
                        default: "-",
                        desc: "主动从本地缓存中重新读取并刷新 phoneNumber"
                    }
                ],
                emits: [
                    {
                        name: "auth-success",
                        args: "(phoneNumber: String)",
                        desc: "向后端成功换取真实手机号后对外派发的通知事件，参数为解密后的完整手机号码"
                    },
                    {
                        name: "update:show",
                        args: "(show: Boolean = false)",
                        desc: "授权成功后自动派发，常用于支持 :show.sync 语法糖自动关闭外层弹出的授权弹窗"
                    }
                ],
                slots: [],
                exampleCode: `<template>
  <view class="auth-box">
    <!-- 如果已拿到手机号，直接展示 -->
    <view v-if="phoneNumber" class="phone-show">
      已绑定手机：{{ phoneNumber }}
    </view>

    <!-- 微信官方授权按钮：必须携带 open-type 并绑定 Mixin 内置的 onGetPhoneNumber -->
    <button 
      v-else 
      type="primary" 
      open-type="getPhoneNumber" 
      @getphonenumber="onGetPhoneNumber"
    >
      微信一键绑定手机号
    </button>
  </view>
</template>

<script>
import phoneAuthMixin from '@/utils/phoneAuthMixin.js';

export default {
  // 1. 注册混入
  mixins: [phoneAuthMixin],
  methods: {
    // 2. 如果在弹窗等子组件中使用，可监听其派发的成功事件
    // @auth-success="handleAuthSuccess"
    handleAuthSuccess(phone) {
      console.log('获取到最新授权手机号：', phone);
      // 继续下一步业务操作，例如刷新用户个人资料
    }
  }
};
<\/script>`
            }
        ]
    },
    {
        category: "工具JS",
        icon: "file-code",
        items: [
            {
                id: "wx-silent-login",
                name: "wxLogin 微信静默登录",
                label: "静默登录",
                desc: "微信小程序一键免密静默登录工具函数。自动调用 uni.login 获取临时 code，换取后端 openid/token 并自动持久化存储（setToken），返回包含 token 的 Promise，全流程内置 Loading 与错误 Toast 拦截提示。",
                isGlobal: false,
                importStatement: `import wxLogin from '@/utils/login.js';`,
                props: [
                    { name: "入参", type: "无", default: "无", desc: "函数无需传递任何参数，直接调用 wxLogin() 即可" },
                    { name: "返回值", type: "Promise<String>", default: "-", desc: "Promise 成功时 resolve 返回后端的授权 token 字符串；失败 reject 异常" }
                ],
                emits: [
                    { name: "resolve(token)", args: "token: String", desc: "静默登录成功，已自动调用 setToken 写入本地缓存，返回最新 token" },
                    { name: "reject(err)", args: "err: Object | String", desc: "获取 wx.code 失败或后端接口异常抛出" }
                ],
                slots: [],
                exampleCode: `import wxLogin from '@/utils/login.js';

export default {
  methods: {
    // 页面初始化或接口 401 时发起静默登录
    async handleSilentLogin() {
      try {
        const token = await wxLogin();
        console.log('登录成功，已自动持久化 Token:', token);
        // 继续拉取用户信息或业务数据
        this.getUserProfile();
      } catch (err) {
        console.error('登录失败：', err);
      }
    }
  }
};`
            }
        ]
    }
];