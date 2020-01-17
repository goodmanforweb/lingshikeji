class slider {
  constructor(ctx) {
    this.ctx = ctx;
  }
  init() {
    this.calcSize();
    this.createTick();
    this.moveLeft([1, 2]);
    this.addListener();
  }
  calcSize() {
    const slide = (this.slide = this.ctx.$refs.game);
    slide.classList.add("tran");
    const slideInitWidth = this.ctx.$refs.slidebox.clientWidth;
    const slideWidth = Math.round(slideInitWidth / 3.5);
    const slideNumbers = (this.slideNumbers = slide.children.length);


    const slideMargin = 32;

    [...this.ctx.$refs.noclick.children].forEach(el => {
      el.style.width = (slideInitWidth - (slideMargin * 3 + slideWidth * 2)) / 2 + 'px';
    })
    const slideBoxWidth =
      slideNumbers * slideWidth + (slideNumbers - 1) * slideMargin;
    [...slide.children].forEach((dm, index) => {
      dm.style.width = `${slideWidth}px`;
      dm.setAttribute("index", index);
    });
    slide.style.width = `${slideBoxWidth}px`;

    //计算显示多少
    const showX = (slideInitWidth - (slideWidth * 2 + slideMargin * 3)) / 2;
    this.moveX = slideWidth - showX;

    this.perMoveX = slideWidth + slideMargin;
    this.activeIndex = [1, 2];
  }
  move(type) {
    this.tick && clearInterval(this.tick);
    const config = {
      prev: () => {
        this.moveLeftHandle();
      },
      next: () => {
        this.moveRightHandle();
      }
    } [type]();
  }
  moveLeft(param) {
    const activeIndex = param || this.activeIndex;
    this.slide.style.transform = `translate3d(-${this.moveX +
      this.perMoveX * (activeIndex[0] - 1)}px, 0, 0)`;
    this.slide.style.webkitTransform = `translate3d(-${this.moveX +
      this.perMoveX * (activeIndex[0] - 1)}px,0,0)`;
    [...this.slide.children].forEach((dm, index) => {
      activeIndex.includes(index) ?
        dm.classList.remove("disable") :
        dm.classList.add("disable");
    });
  }
  moveRightHandle() {
    this.activeIndex = this.activeIndex.map(el => el - 1);
    if (this.activeIndex[0] == 0) {
      this.slide.classList.remove("tran");
      this.slide.insertBefore(
        this.slide.lastElementChild,
        this.slide.firstElementChild
      );
      this.activeIndex = this.activeIndex.map(el => el + 2);

      this.moveLeft();
      this.slide.clientWidth;

      this.slide.classList.add("tran");
      this.activeIndex = this.activeIndex.map(el => el - 1);
      this.moveRight();
    } else {
      this.moveRight();
    }
  }
  moveRight(param) {
    const activeIndex = param || this.activeIndex;
    this.slide.style.transform = `translate3d(-${this.moveX +
      this.perMoveX * (activeIndex[0] - 1)}px, 0, 0)`;
    this.slide.style.webkitTransform = `translate3d(-${this.moveX +
      this.perMoveX * (activeIndex[0] - 1)}px,0,0)`;
    [...this.slide.children].forEach((dm, index) => {
      activeIndex.includes(index) ?
        dm.classList.remove("disable") :
        dm.classList.add("disable");
    });
  }
  moveLeftHandle() {
    this.activeIndex = this.activeIndex.map(el => el + 1);
    //不够了
    if (this.activeIndex[0] >= this.slideNumbers - 2) {
      this.slide.classList.remove("tran");
      this.slide.appendChild(this.slide.firstElementChild);
      this.activeIndex = this.activeIndex.map(el => el - 2);

      this.moveLeft();
      this.slide.clientWidth;

      this.slide.classList.add("tran");
      this.activeIndex = this.activeIndex.map(el => el + 1);
      this.moveLeft();
    } else {
      this.moveLeft();
    }
  }
  createTick() {
    // this.tick = setInterval(() => {
    //   this.moveLeftHandle();
    // }, 3000);
  }
  addListener() {
    const enterHoverHandle = (this.enterHoverHandle = () => {
      console.log("add");
      clearInterval(this.tick);
    });
    const leaveHoverHandle = (this.leaveHoverHandle = () => {
      console.log("fff");
      this.createTick();
    });

    this.resize = () => {
      this.calcSize();
    };
    this.clickHandle = e => {
      let target = e.target;
      if (target.className.indexOf("cube") == -1) {
        target = target.parentElement;
        while (target.className.indexOf("cube") == -1) {
          target = target.parentElement;
        }
      }
      if (target.tagName == "HTML") return false;
      let targetindex = null;
      [...this.slide.children].find((el, index) => {
        el == target && (targetindex = index);
      });
      if (targetindex != null) {
        if (this.activeIndex[0] > targetindex) {
          console.log("左边");
          this.moveRightHandle();
        } else if (this.activeIndex[1] < targetindex) {
          console.log("右边");
          this.moveLeftHandle();
        }
      }
    };
    window.addEventListener("resize", this.resize, false);
    this.slide.addEventListener("mouseenter", enterHoverHandle, false);
    this.slide.addEventListener("mouseleave", leaveHoverHandle, false);
    this.slide.addEventListener("click", this.clickHandle, false);
  }
  destroy() {
    window.removeEventListener("resize", this.resize, false);
    this.slide.removeEventListener("mouseenter", this.addHoverHandle, false);
    this.slide.removeEventListener("mouseleave", this.leaveHoverHandle, false);
    this.slide.removeEventListener("click", this.clickHandle, false);
  }
}

export default slider;