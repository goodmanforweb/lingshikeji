<template>
     <Kjbox class="steps">
            <div class="step-i">
                <div class="step">
                <div class="step-icon">step 1</div>
                <div class="cont" v-html="$t('ms.step1')">
                   
                </div>
                <p class="center"><img src="../assets/images/arrow.png" alt=""></p>
            </div>
            <div class="step">
                <div class="step-icon">step 2</div>
                <div class="cont"  v-html="$t('ms.step2')">
                                    </div>
                <p class="center"><img src="../assets/images/arrow.png" alt=""></p>
            </div>
            <div class="step">
                <div class="step-icon">step 3</div>
                <div class="cont"  v-html="$t('ms.step3')">
                               </div>
                <p class="center"><img src="../assets/images/arrow.png" alt=""></p>
            </div>
            <div class="step">
                <div class="step-icon">step 4</div>
                <div class="cont"  v-html="$t('ms.step4')">
                                    </div>
            </div>
            </div>
    </Kjbox>
</template>

<style lang="scss" >
.steps {
  .step {
    margin: 2rem 0;
    > img {
      max-width: 110px;
    }
    p {
      img {
        width: 30px;
      }
    }
  }
  .step:first-of-type {
    margin-top: 0;
  }
  .step-icon {
    background: url(../assets/images/stepbk.png) no-repeat left center;
    background-size: contain;
    font-family: "zyzt";
    color: rgba(255, 255, 255, 0.8);
    width: 10rem;
    height: 2rem;
    line-height: 2rem;
    font-size: 1.5rem;
    text-indent: 1.3em;
  }
  .step-i {
    padding: 2rem;
  }
  .cont {
    margin: 3rem 0;
  }
}
</style>

