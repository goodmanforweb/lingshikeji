<template>
      <Page :title="$t('m.report')" borderLine padding routerBack='/report'>
          <div class="publicreport flex flex1"  >
            <div class="re-cont block">
              <div class="card">
                <div class="card-hd tcolor">
                  <h2 v-html="cont.title"></h2>
                  <div class="card-hd-info">
                    <img src="../../assets/images/plogo.png" alt="">
                    <p >{{$t("ms.logo")}}</p>
                    <p>{{cont.createtime | format}}</p>
                  </div>
                </div>

                <div class="card-bd tcolor" ref="cardbd"  
                v-html="cont.content" ></div>
              </div>
            </div>
        </div>
    </Page>
</template>
<script>
import util from "../../util";
export default {
  data() {
    return {
      info: [],
      cont: {
        title: '系统升级公告',
              "content":"\u003cp\u003e    亲爱的用户：\u003c/p\u003e\u003cp\u003e    \u0026nbsp;\u003c/p\u003e\u003cp\u003e    Crypto JOY将于2018年11月30日0:00(UTC+8)开始系统升级维护，维护时长预计6个小时，期间将暂停平台一切服务。给您带来的不便，敬请谅解！\u2028\u2028\u003c/p\u003e\u003cp\u003e\u003c/p\u003e\u003cp\u003e\u003cbr/\u003e\u003c/p\u003e\u003cp\u003e    注意：\u2028\u003c/p\u003e\u003cp\u003e\u003cbr/\u003e\u003c/p\u003e\u003cp\u003e    \u2028系统升级的预估时间可能并不准确，我们会在各个社交媒体同步升级进度，您可以通过微信群内的通知关注最新进展。\u2028\u2028\u003c/p\u003e\u003cp\u003e\u003cbr/\u003e\u003c/p\u003e\u003cp\u003e    我们建议您访问官方网站（cjoy.games）及（ipfs.cjoy.games）获得及时推送。\u2028\u003c/p\u003e\u003cp\u003e\u003cbr/\u003e\u003c/p\u003e\u003cp\u003e    感谢您对Crypto JOY团队的支持！\u003c/p\u003e\u003cp\u003e\u003cbr/\u003e\u003c/p\u003e\u003cp\u003e    \u2028\u2028Crypto JOY团队\u2028\u003c/p\u003e\u003cp\u003e    2018年11月29日\u003cbr/\u003e\u003c/p\u003e"

        ,"createtime":"2018-11-29T12:37:30Z"
      },
    };
  }
};
</script>

<style lang="scss">
.publicreport {
  height: 100%;
  .block:hover {
    transform: scale(1)
  }
  .re-cont {
    flex: 1;
    overflow-y: auto;
    .card {
      margin-bottom: 4px;
      padding: 0 16px 16px;
    }
    .card-hd-info {
      font-size: 12px;
      position: relative;
      img {
        width: 30px;
        position: absolute;
        top: 1px;
        left: 0
      }
      p {
        margin-left: 2.6rem
      }
      p:first-of-type {
        margin-bottom: -5px;
      }
    }
    .card-hd {
      border-bottom: 1px solid #ededed;
      margin-bottom: 1.5rem;
    }
    .card-bd {
      transition: height 0.4s linear;
      overflow: hidden;
    }
  }
}

.publicreport .re-cont {
    padding: 0;
    .card {
      border-radius: 0;
    }
    .card-hd-info {
      display: flex;
      justify-content: space-between;
      img {
        width: 20px;
        top: 8px;
      }
    }
  }
</style>


