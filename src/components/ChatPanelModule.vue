<script>
export default {
    data () {
        return {

        }
    }
}
</script>

<template>
    <div class="chat-panel" chat-type="">
        <div class="chat-panel-header">
            <div>
                <img class="avatar-image" src="" style="width: 40px; height: 40px; min-width: 40px; min-height: 40px;">
                <p></p>
            </div>
            <div>
                <div style="margin: auto 8px;" class="roomNotice">
                    <i class="icon" title="公告"></i></div>
                <div style="margin: auto 8px;" class="roomInfo">
                    <i class="icon" title="关于"></i></div>
            </div>
        </div>
        <div class="message-list">
        </div>
        <div class="toolbar">
            <div>
                <i class="icon" title="表情"></i>
            </div>
            <div>
                <i class="icon" title="图片"></i>
            </div>
            <div>
                <i class="icon" title="代码"></i>
            </div>
            <input type="file" class="image-input" accept="image/png,image/jpeg,image/gif">
        </div>
        <div class="input-box">
            <input type="text" placeholder="输入消息" maxlength="1024">
        </div>
        <div class="float-panel roomInfoPanel" style="right: -340px;">
            <div>
                <span>群设置</span>
                <i class="icon close"></i></div>
            <div class="group-info">
                <div class="content">
                    <span>管理员：</span>
                    <span>无</span></div>
                <div class="content">
                    <span>在线人数：</span>
                    <span class="onlineUsers">人</span>
                </div>
                <div class="userList">
                    
                </div>
                <input type="file" accept="image/*"></div>
            <div class="group-info-exit">
                <button>退出群组</button></div>
        </div>
        <div class="float-panel roomNoticePanel" style="right: -340px;">
            <div>
                <span>群公告</span>
                <i class="icon close"></i>
            </div>
            <div class="group-notice">
                <div>
                    system
                    更新于
                    2017年10月20日 17:43
                </div>
                <div class="content">欢迎各位来到 Emlice </div>
            </div>
        </div>
        <div class="expression" style="opacity: 0; transform: scale(0); display: none;">
            <div class="default-expression">
                <div>
                    <div style="background-position: left 0px; background-image: url(&quot;${baidu_address}&quot;);"></div>
                </div>
                <div>
                    <div style="background-position: left -30px; background-image: url(&quot;${baidu_address}&quot;);"></div>
                </div>
                <div>
                    <div style="background-position: left -60px; background-image: url(&quot;${baidu_address}&quot;);"></div>
                </div>
                <div>
                    <div style="background-position: left -90px; background-image: url(&quot;${baidu_address}&quot;);"></div>
                </div>
                <div>
                    <div style="background-position: left -120px; background-image: url(&quot;${baidu_address}&quot;);"></div>
                </div>
                <div>
                    <div style="background-position: left -150px; background-image: url(&quot;${baidu_address}&quot;);"></div>
                </div>
                <div>
                    <div style="background-position: left -180px; background-image: url(&quot;${baidu_address}&quot;);"></div>
                </div>
                <div>
                    <div style="background-position: left -210px; background-image: url(&quot;${baidu_address}&quot;);"></div>
                </div>
                <div>
                    <div style="background-position: left -240px; background-image: url(&quot;${baidu_address}&quot;);"></div>
                </div>
                <div>
                    <div style="background-position: left -270px; background-image: url(&quot;${baidu_address}&quot;);"></div>
                </div>
                <div>
                    <div style="background-position: left -300px; background-image: url(&quot;${baidu_address}&quot;);"></div>
                </div>
                <div>
                    <div style="background-position: left -330px; background-image: url(&quot;${baidu_address}&quot;);"></div>
                </div>
                <div>
                    <div style="background-position: left -360px; background-image: url(&quot;${baidu_address}&quot;);"></div>
                </div>
                <div>
                    <div style="background-position: left -390px; background-image: url(&quot;${baidu_address}&quot;);"></div>
                </div>
                <div>
                    <div style="background-position: left -420px; background-image: url(&quot;${baidu_address}&quot;);"></div>
                </div>
                <div>
                    <div style="background-position: left -450px; background-image: url(&quot;${baidu_address}&quot;);"></div>
                </div>
                <div>
                    <div style="background-position: left -480px; background-image: url(&quot;${baidu_address}&quot;);"></div>
                </div>
                <div>
                    <div style="background-position: left -510px; background-image: url(&quot;${baidu_address}&quot;);"></div>
                </div>
                <div>
                    <div style="background-position: left -540px; background-image: url(&quot;${baidu_address}&quot;);"></div>
                </div>
                <div>
                    <div style="background-position: left -570px; background-image: url(&quot;${baidu_address}&quot;);"></div>
                </div>
                <div>
                    <div style="background-position: left -600px; background-image: url(&quot;${baidu_address}&quot;);"></div>
                </div>
                <div>
                    <div style="background-position: left -630px; background-image: url(&quot;${baidu_address}&quot;);"></div>
                </div>
                <div>
                    <div style="background-position: left -660px; background-image: url(&quot;${baidu_address}&quot;);"></div>
                </div>
                <div>
                    <div style="background-position: left -690px; background-image: url(&quot;${baidu_address}&quot;);"></div>
                </div>
                <div>
                    <div style="background-position: left -720px; background-image: url(&quot;${baidu_address}&quot;);"></div>
                </div>
                <div>
                    <div style="background-position: left -750px; background-image: url(&quot;${baidu_address}&quot;);"></div>
                </div>
                <div>
                    <div style="background-position: left -780px; background-image: url(&quot;${baidu_address}&quot;);"></div>
                </div>
                <div>
                    <div style="background-position: left -810px; background-image: url(&quot;${baidu_address}&quot;);"></div>
                </div>
                <div>
                    <div style="background-position: left -840px; background-image: url(&quot;${baidu_address}&quot;);"></div>
                </div>
                <div>
                    <div style="background-position: left -870px; background-image: url(&quot;${baidu_address}&quot;);"></div>
                </div>
                <div>
                    <div style="background-position: left -900px; background-image: url(&quot;${baidu_address}&quot;);"></div>
                </div>
                <div>
                    <div style="background-position: left -930px; background-image: url(&quot;${baidu_address}&quot;);"></div>
                </div>
                <div>
                    <div style="background-position: left -960px; background-image: url(&quot;${baidu_address}&quot;);"></div>
                </div>
                <div>
                    <div style="background-position: left -990px; background-image: url(&quot;${baidu_address}&quot;);"></div>
                </div>
                <div>
                    <div style="background-position: left -1020px; background-image: url(&quot;${baidu_address}&quot;);"></div>
                </div>
                <div>
                    <div style="background-position: left -1050px; background-image: url(&quot;${baidu_address}&quot;);"></div>
                </div>
                <div>
                    <div style="background-position: left -1080px; background-image: url(&quot;${baidu_address}&quot;);"></div>
                </div>
                <div>
                    <div style="background-position: left -1110px; background-image: url(&quot;${baidu_address}&quot;);"></div>
                </div>
                <div>
                    <div style="background-position: left -1140px; background-image: url(&quot;${baidu_address}&quot;);"></div>
                </div>
                <div>
                    <div style="background-position: left -1170px; background-image: url(&quot;${baidu_address}&quot;);"></div>
                </div>
                <div>
                    <div style="background-position: left -1200px; background-image: url(&quot;${baidu_address}&quot;);"></div>
                </div>
                <div>
                    <div style="background-position: left -1230px; background-image: url(&quot;${baidu_address}&quot;);"></div>
                </div>
                <div>
                    <div style="background-position: left -1260px; background-image: url(&quot;${baidu_address}&quot;);"></div>
                </div>
                <div>
                    <div style="background-position: left -1290px; background-image: url(&quot;${baidu_address}&quot;);"></div>
                </div>
                <div>
                    <div style="background-position: left -1320px; background-image: url(&quot;${baidu_address}&quot;);"></div>
                </div>
                <div>
                    <div style="background-position: left -1350px; background-image: url(&quot;${baidu_address}&quot;);"></div>
                </div>
                <div>
                    <div style="background-position: left -1380px; background-image: url(&quot;${baidu_address}&quot;);"></div>
                </div>
                <div>
                    <div style="background-position: left -1410px; background-image: url(&quot;${baidu_address}&quot;);"></div>
                </div>
                <div>
                    <div style="background-position: left -1440px; background-image: url(&quot;${baidu_address}&quot;);"></div>
                </div>
                <div>
                    <div style="background-position: left -1470px; background-image: url(&quot;${baidu_address}&quot;);"></div>
                </div>
            </div>
            <div class="select-panel">
                <div class="selected">
                    <img src="https://assets.suisuijiang.com/images/default-expression.f7d7c.png"></div>
                <div class="">
                    <img src="data:image/png;base64,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"></div>
                <div class="">
                    <img src="https://assets.suisuijiang.com/images/collect-expression.05769.png"></div>
            </div>
        </div>
        <div class="code-input" style="opacity: 0; transform: scale(0); display: none;">
            <textarea placeholder="输入要展示的代码"></textarea>
            <div>
                <button class="sendCode">发送</button>
                <button class="cancelCode">取消</button></div>
        </div>
        <div class="user-info" style="opacity: 0; transform: scale(0); display: none;">
            
        </div>
    </div>
</template>
