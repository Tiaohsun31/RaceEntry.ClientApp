<template>
  <Layout>
      <section id="mainContainer">
        <article class="col-box info-container">
          <div class="box-top">
            <div class="title">會員方案一覽</div>
            <div class="title-line"></div>
          </div>

          <div class="tableBtn-area hidden"></div>

          <table
            cellpadding="1"
            cellspacing="1"
            class="tableBox hasTitle"
            style="width: 100%"
          >
            <thead>
              <tr>
                <th><span>可使用功能</span></th>
                <th><div>免費會員</div></th>
                <th><div>付費會員</div></th>
                <th><div>高級會員 (月租)</div></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div>網頁主機空間</div>
                  <p class="describe-content">(提供免費網頁存放空間)</p>
                </td>
                <td><i class="fa-solid fa-check"></i></td>
                <td><i class="fa-solid fa-check"></i></td>
                <td><i class="fa-solid fa-check"></i></td>
              </tr>
              <tr>
                <td>
                  <div>即時客服支援</div>
                  <p class="describe-content">(網頁相關技術支援)</p>
                </td>
                <td><i class="fa-solid fa-check"></i></td>
                <td><i class="fa-solid fa-check"></i></td>
                <td><i class="fa-solid fa-check"></i></td>
              </tr>
              <tr>
                <td>
                  <div>創建活動</div>
                  <p class="describe-content">(自行創建活動)</p>
                </td>
                <td><i class="fa-solid fa-check"></i></td>
                <td><i class="fa-solid fa-check"></i></td>
                <td><i class="fa-solid fa-check"></i></td>
              </tr>
              <tr>
                <td>
                  <div>後台管理</div>
                  <p class="describe-content">(提供圖形化數據後台)</p>
                </td>
                <td><i class="fa-solid fa-check"></i></td>
                <td><i class="fa-solid fa-check"></i></td>
                <td><i class="fa-solid fa-check"></i></td>
              </tr>
              <tr>
                <td>
                  <div>頁面編輯</div>
                  <p class="describe-content">(可自行編輯各活動頁面)</p>
                </td>
                <td><i class="fa-solid fa-check"></i></td>
                <td><i class="fa-solid fa-check"></i></td>
                <td><i class="fa-solid fa-check"></i></td>
              </tr>
              <tr>
                <td>
                  上傳功能
                  <p class="describe-content">(上傳檔案功能)</p>
                </td>
                <td><i class="fa-solid fa-check"></i></td>
                <td><i class="fa-solid fa-check"></i></td>
                <td><i class="fa-solid fa-check"></i></td>
              </tr>
              <tr>
                <td>
                  <div>整合 Google Analytics</div>
                  <p class="describe-content">(網站流量統計服務)</p>
                </td>
                <td><i class="fa-solid fa-xmark"></i></td>
                <td><i class="fa-solid fa-check"></i></td>
                <td><i class="fa-solid fa-check"></i></td>
              </tr>
              <tr>
                <td>
                  <div>金流支援</div>
                  <p class="describe-content">(提供參賽者報名後的付款功能)</p>
                </td>
                <td><i class="fa-solid fa-xmark"></i></td>
                <td><i class="fa-solid fa-check"></i></td>
                <td><i class="fa-solid fa-check"></i></td>
              </tr>
              <tr>
                <td>
                  物流支援
                  <p class="describe-content">(協助寄送參賽者物資)</p>
                </td>
                <td><i class="fa-solid fa-xmark"></i></td>
                <td><i class="fa-solid fa-check"></i></td>
                <td><i class="fa-solid fa-check"></i></td>
              </tr>
              <tr>
                <td>
                  活動相簿
                  <p class="describe-content">(活動專屬相簿頁面)</p>
                </td>
                <td><i class="fa-solid fa-xmark"></i></td>
                <td><i class="fa-solid fa-check"></i></td>
                <td><i class="fa-solid fa-check"></i></td>
              </tr>

              <tr>
                <td>
                  多元化頁面
                  <div>
                    <a
                      class="tdBtn"
                      href="https://demo.focusline.com.tw/style1"
                      target="_blank"
                      >風格參考</a
                    >
                  </div>
                </td>
                <td><i class="fa-solid fa-xmark"></i></td>
                <td><i class="fa-solid fa-check"></i></td>
                <td><i class="fa-solid fa-check"></i></td>
              </tr>

              <tr>
                <td>簡訊寄送</td>
                <td><i class="fa-solid fa-xmark"></i></td>
                <td><i class="fa-solid fa-check"></i></td>
                <td><i class="fa-solid fa-check"></i></td>
              </tr>
              <tr>
                <td>EDM寄送</td>
                <td><i class="fa-solid fa-xmark"></i></td>
                <td><i class="fa-solid fa-check"></i></td>
                <td><i class="fa-solid fa-check"></i></td>
              </tr>
              <tr>
                <td>客製化官網</td>
                <td><i class="fa-solid fa-xmark"></i></td>
                <td><i class="fa-solid fa-xmark"></i></td>
                <td><i class="fa-solid fa-check"></i></td>
              </tr>
              <tr>
                <td></td>
                <td><button class="checkPlanBtn">註冊會員</button></td>
                <td><button class="checkPlanBtn">訂購方案</button></td>
                <td><button class="checkPlanBtn">訂購方案</button></td>
              </tr>
            </tbody>
          </table>
        </article>
      </section>
  </Layout>
</template>

<script setup>
  import { ref, onMounted } from "vue";

  const TabletMode = ref(false);

  //網頁載入及resize的時候執行更新網頁寬度判斷，並執行表格重製函式
  function resizeWidth() {
    let windowWidth = window.innerWidth;

    if (windowWidth <= 768) {
      TabletMode.value = true;
      setTableColspan();
      setTableCss();
      setTableButton();
    } else {
      TabletMode.value = false;
      setTableColspan();
      setTableCss();
      setTableButton();
    }
  }

  //設置表格中的合併儲存格(只針對利用範本產生的表格)
  function setTableColspan() {
    if (TabletMode.value) {
      let tableList = Array.apply(null, document.querySelectorAll(".tableBox"));

      tableList.forEach((table) => {
        //選到所有tr標籤
        let rows = table.querySelectorAll("tbody>tr");

        // 對tr標籤做迴圈
        for (let i = 0; i < rows.length; i++) {
          //拿到tr內的td標籤
          let cells = rows[i].getElementsByTagName("td");

          // 對td標籤做迴圈
          for (let j = 0; j < cells.length; j++) {
            //找到有colspan屬性的td標籤
            if (cells[j].hasAttribute("colspan")) {
              //拿到那個td的colspan數量，內容，並在他身上加上dataset

              let attributeArray = Array.apply(null, cells[j].attributes);

              let colspan = cells[j].getAttribute("colspan");
              let colValue = cells[j].innerHTML;
              cells[j].setAttribute("data-colspan", colspan);

              //創造新的td標籤並且把他加到當前表格中
              for (let k = 1; k < colspan; k++) {
                let newCell = document.createElement("td");
                newCell.innerHTML = colValue;

                //確認保有原來的表格樣式
                attributeArray.forEach((e) => {
                  let name = e.name;
                  let value = e.value;
                  newCell.setAttribute(name, value);
                });

                //將創建的td標籤加入表格，並移除colspan屬性
                newCell.removeAttribute("colspan");
                rows[i].insertBefore(newCell, cells[j + k]);
              }

              //拿掉原有td標籤的colspan屬性
              cells[j].removeAttribute("colspan");
            }
          }
        }
      });
    } else {
      //選到所有tr標籤
      let rows = document.querySelectorAll("tbody>tr");

      // 對tr標籤做迴圈
      for (let i = 0; i < rows.length; i++) {
        //拿到tr內的td標籤
        let cells = rows[i].getElementsByTagName("td");

        // td做迴圈
        for (let j = 0; j < cells.length; j++) {
          //找到有data-colspan屬性的td標籤
          if (cells[j].hasAttribute("data-colspan")) {
            //拿到那個td的colspan數量後，移除data-colspan
            let colspan = cells[j].getAttribute("data-colspan");
            cells[j].setAttribute("colspan", colspan);
            cells[j].removeAttribute("data-colspan");

            //刪掉在那之後的元素
            for (let k = 1; k < colspan; k++) {
              rows[i].deleteCell(j + 1);
            }
          }
        }
      }
    }
  }

  //在Tablet情況下不顯示過多表格(只針對利用範本產生的表格)
  function setTableCss() {
    //在Tablet情況改變樣式
    if (TabletMode.value) {
      //顯示所有tableBtnArea
      let tableBtnAreaList = Array.apply(
        null,
        document.querySelectorAll(".tableBtn-area")
      );

      tableBtnAreaList.forEach((tableBtnArea) => {
        tableBtnArea.classList.remove("hidden");
      });

      let tableList = Array.apply(null, document.querySelectorAll(".tableBox"));

      let hasTitle = false;
      //對表格list進行迴圈，拿到頁面裡面所有表格
      tableList.forEach((table) => {
        if (table.classList.contains("hasTitle")) {
          hasTitle = true;
        } else {
          hasTitle = false;
        }

        let rows = Array.apply(null, table.querySelectorAll("tr"));

        rows.forEach((row) => {
          let thArray = Array.apply(null, row.querySelectorAll("th"));

          thArray.forEach((item, index) => {
            if (hasTitle) {
              if (index > 1) {
                item.style.display = "none";
              }
            } else {
              if (index > 0) {
                item.style.display = "none";
              }
            }
          });

          let tdArray = Array.apply(null, row.querySelectorAll("td"));
          tdArray.forEach((item, index) => {
            if (hasTitle) {
              if (index > 1) {
                item.style.display = "none";
              }
            } else {
              if (index > 0) {
                item.style.display = "none";
              }
            }
          });
        });
      });
    }

    //一般Web的情況下
    else {
      //隱藏所有tableBtnArea
      let tableBtnAreaList = Array.apply(
        null,
        document.querySelectorAll(".tableBtn-area")
      );

      tableBtnAreaList.forEach((tableBtnArea) => {
        tableBtnArea.classList.add("hidden");
      });

      //顯示所有表格
      let rows = Array.apply(null, document.querySelectorAll("tr"));

      rows.forEach((row) => {
        let thArray = Array.apply(null, row.querySelectorAll("th"));

        thArray.forEach((item, index) => {
          if (index >= 1) {
            item.style.display = "";
          }
        });

        let tdArray = Array.apply(null, row.querySelectorAll("td"));
        tdArray.forEach((item, index) => {
          if (index >= 1) {
            item.style.display = "";
          }
        });
      });
    }
  }

  //在Tablet情況下設定表格按鈕
  function setTableButton() {
    if (TabletMode.value) {
      //抓取所有info-container
      let infoContainer = Array.apply(
        null,
        document.querySelectorAll(".info-container")
      );

      //對所有info-container做迴圈
      infoContainer.forEach((infoItem) => {
        //看裡面有沒有表格屬性的元素
        let tableList = Array.apply(
          null,
          infoItem.querySelectorAll(".tableBox")
        );

        //如果有表格執行下列函式
        if (!tableList.length == 0) {
          //抓到有表格屬性容器內事先準備好的按鈕區域
          const tableBtnArea = infoItem.querySelector(".tableBtn-area");

          //清空表格內所有按鈕
          if (tableBtnArea) {
            let tableBtnAreaArray = Array.apply(
              null,
              tableBtnArea.querySelectorAll("button")
            );

            tableBtnAreaArray.forEach((tableBtn) => {
              tableBtn.remove();
            });
          }

          let hasTitle = false;

          //對表格進行迴圈，拿到title的列表
          tableList.forEach((table) => {
            let titleList = Array.apply(
              null,
              table.querySelectorAll("thead>tr")
            );

            if (table.classList.contains("hasTitle")) {
              hasTitle = true;
            }

            if (!titleList.length == 0) {
              titleList.forEach((item) => {
                let thList = Array.apply(null, item.querySelectorAll("th"));

                let titleArray = [];

                thList.forEach((th) => {
                  titleArray.push(th.textContent);
                });

                //為了要加上css，build之後好像可以不用加，需要試試看
                let originalTable = table.innerHTML;
                let tableAttribute = Array.apply(null, table.attributes);
                let attrName;
                let attrValue;

                //為了要加上css，build之後好像可以不用加，需要試試看
                tableAttribute.forEach((attr) => {
                  if (attr.name.includes("data")) {
                    attrName = attr.name;
                    attrValue = attr.value;
                  }
                });

                titleArray.forEach((title, index) => {
                  //不製作標題行的button
                  let btn = document.createElement("button");

                  btn.innerHTML = title;
                  btn.setAttribute(attrName, attrValue);
                  btn.setAttribute("data-index", index);

                  // let btnAttrArray = Array.apply(null, btn.attributes);

                  // btnAttrArray.forEach(attrItem=>{

                  //   if (attrItem.localName == 'undefined') {
                  //     btn.removeAttribute('undefined')
                  //   }
                  // })

                  if (hasTitle) {
                    if (index == 1) {
                      btn.classList.add("active");
                    }
                  } else {
                    if (index == 0) {
                      btn.classList.add("active");
                    }
                  }

                  //建立按鈕點擊事件
                  btn.addEventListener("click", function (event) {
                    const trList = Array.apply(
                      null,
                      table.querySelectorAll("tr")
                    );

                    let newBtnList = Array.apply(
                      null,
                      tableBtnArea.querySelectorAll("button")
                    );

                    newBtnList.forEach((item) => {
                      item.classList.remove("active");
                    });

                    let clickedBtn = event.target;
                    clickedBtn.classList.add("active");
                    let btnIndex = clickedBtn.dataset.index;

                    trList.forEach((tr) => {
                      const thList = Array.apply(
                        null,
                        tr.querySelectorAll("th")
                      );

                      if (hasTitle) {
                        thList.forEach((thTag, index) => {
                          if (index == btnIndex || index == 0) {
                            thTag.style.display = "";
                          } else {
                            thTag.style.display = "none";
                          }
                        });
                      } else {
                        thList.forEach((thTag, index) => {
                          if (index == btnIndex) {
                            thTag.style.display = "";
                          } else {
                            thTag.style.display = "none";
                          }
                        });
                      }
                    });

                    trList.forEach((tr) => {
                      const tdList = Array.apply(
                        null,
                        tr.querySelectorAll("td")
                      );

                      if (hasTitle) {
                        tdList.forEach((tdTag, index) => {
                          if (index == btnIndex || index == 0) {
                            tdTag.style.display = "";
                          } else {
                            tdTag.style.display = "none";
                          }
                        });
                      } else {
                        tdList.forEach((tdTag, index) => {
                          if (index == btnIndex) {
                            tdTag.style.display = "";
                          } else {
                            tdTag.style.display = "none";
                          }
                        });
                      }
                    });
                  });
                  if (hasTitle) {
                    if (index > 0) {
                      tableBtnArea.appendChild(btn);
                    }
                  } else {
                    tableBtnArea.appendChild(btn);
                  }
                });
              });
            }
          });
        }
      });
    } else {
      //抓取所有info-container
      let infoContainer = Array.apply(
        null,
        document.querySelectorAll(".info-container")
      );

      //對所有info-container做迴圈
      infoContainer.forEach((infoItem) => {
        //看裡面有沒有表格屬性的元素
        let tableList = Array.apply(
          null,
          infoItem.querySelectorAll(".tableBox")
        );

        //如果有表格執行下列函式
        if (!tableList.length == 0) {
          //抓到有表格屬性容器內事先準備好的按鈕區域
          const tableBtnArea = infoItem.querySelector(".tableBtn-area");

          //清空表格內所有按鈕
          if (tableBtnArea) {
            let tableBtnAreaArray = Array.apply(
              null,
              tableBtnArea.querySelectorAll("button")
            );

            tableBtnAreaArray.forEach((tableBtn) => {
              tableBtn.remove();
            });
          }
        }
      });
    }
  }

  onMounted(() => {
    resizeWidth();
    window.addEventListener("resize", resizeWidth);
  });
</script>

<style lang="scss" scoped>
  @import "@/scss/common";
  @import "@/scss/mixin";
  @import "@/scss/variable";
  @import "@/scss/reset";

  #mainContainer {
      a{
        text-decoration: none;
      }
      width: 100%;
      max-width: 1024px;
      margin: 50px auto 50px;
      padding: 0 20px;

      @include pad {
        padding: 0 20px;
      }
      .col-box {
        font-size: $infoSize;
        color: $lightfontcolor;
        @include flex(flex-start, flex-start);
        flex-direction: column;
        width: 100%;
        padding: 40px 0;

        .box-top {
          width: 100%;

          .title {
            width: 100%;
            font-size: $h4;
            font-weight: 500;
            color: $darkfontcolor;
          }

          .title-line {
            margin-top: 10px;
            width: 70px;
            height: 3px;
            background: $maincolor;
            margin-bottom: 40px;
          }
        }

        .tableBtn-area {
          width: 100%;
          display: flex;
          flex-wrap: wrap;
          button {
            padding: 5px 20px;
            margin: 5px 5px;
            font-size: $h6;
            font-weight: 500;
            color:white;
            background: $lightfontcolor;
            border: none;
            border-radius: 45px;
            &:hover {
              color:white;
              background: $maincolor;
            }
          }

          .active {
            color:white;
            background: $maincolor;
          }
        }

        .hidden {
          display: none !important;
        }

        table,
        th,
        td {
          border: 1px solid $tableline;
        }

        .tableBox,
        .tablebox2 {
          thead tr {
            th {
              background: $mainhovercolor;
              color:white;
              &:first-of-type {
                width: 200px;
              }
              width: calc((100% - 100px) / 3);
            }

            position: sticky;
            top: 69px;

            @include pad {
              position: static;
            }
          }
          tbody tr {
            &:nth-child(2n) {
              background: $tablebg;
            }
            td {
              color: $darkfontcolor;
              font-weight: 500;
            }
            .tdTitle {
              color: $lightfontcolor;
            }
          }

          tr {
            td,
            th {
              padding: 10px;
              text-align: center;
              i {
                font-size: $h3;
              }

              p {
                margin: unset;
              }
            }
          }

          .tdBtn {
            margin-top: 5px;
            border: 2px solid $mainhovercolor;
            color: $mainhovercolor;
            padding: 2px 10px;
            font-size: 14px;
            border-radius: 15px;
            display: inline-block;
            cursor: pointer;

            &:hover {
              background: $mainhovercolor;
              color: white;
            }
          }

          .checkPlanBtn {
            background: $maincolor;
            border: none;
            padding: 5px 15px;
            border-radius: 20px;
            color: white;
            box-shadow: 0 0 5px $blackshadow;
            &:hover {
              transform: translateY(-3px);
              background: $mainhovercolor;
            }
          }

          .describe-content {
            color: $lightfontcolor;
            font-size: 14px;
          }

          .fa-xmark {
            color: $lightfontcolor;
          }

          .fa-check {
            color: $maincolor;
          }
        }
      }
    }
</style>
