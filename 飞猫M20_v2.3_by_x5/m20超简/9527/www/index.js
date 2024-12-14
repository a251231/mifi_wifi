const baseUrl = "http://" + window.location.hostname + ":9527/";
let socThmZoneValue = 0; 
layui.use(function () {
  var element = layui.element;
  var table = layui.table;
  var form = layui.form;

  // hash 地址定位
  var hashName = "tabid"; // hash 名称
  var layid = location.hash.replace(new RegExp("^#" + hashName + "="), ""); // 获取 lay-id 值
  // 初始切换
  element.tabChange("test-hash", layid);
  // 切换事件
  element.on("tab(test-hash)", function (obj) {
    location.hash = hashName + "=" + this.getAttribute("lay-id");
  });

  // 当前页和每页条数
  var currentPage = 1;
  var limit = 10;
  function fetchSMSData() {
    fetch(baseUrl + "api/sms/getsms", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ page: currentPage, limit: limit }), // 发送当前页
    })
      .then((response) => response.json())
      .then((data) => {
        const totalCount = data.count || 0;
        const totalPages = Math.ceil(totalCount / limit);

        // 更新统计信息
        document.getElementById("smsCount").innerText = "条数: " + totalCount;
        document.getElementById("totalPages").innerText =
          "页数: " + totalPages;
        document.getElementById("itemsPerPage").innerText = "每页: " + limit;

        // 更新分页下拉菜单
        const pageSelect = document.getElementById("pageSelect");
        pageSelect.innerHTML = "";
        for (let i = 1; i <= totalPages; i++) {
          const option = document.createElement("option");
          option.value = i;
          option.textContent = i;
          pageSelect.appendChild(option);
        }
        pageSelect.value = currentPage;

        // 渲染layui的下拉菜单
        layui.form.render("select");

        // 渲染表格函数
        function renderTable(smsData) {
          table.render({
            elem: "#smsTable",
            data: smsData,
            page: false,
            cols: [
              [
                { type: "checkbox", fixed: "left" },
                { field: "content", title: "内容", minWidth: 220 },
                { field: "sender", title: "发件人", minWidth: 150 },
                {
                  field: "sent_time",
                  title: "时间",
                  minWidth: 180,
                  templet: function (d) { return d.sent_time ? new Date(d.sent_time).toLocaleString() : "-"; },
                },
              ],
            ],
          });
        }

        // 判断是否有数据
        renderTable(totalCount > 0 ? data.sms : []); // 如果有数据渲染，否则渲染空表格

        // 更新按钮状态
        document.getElementById("prevPage").disabled = currentPage === 1;
        document.getElementById("nextPage").disabled = currentPage * limit >= totalCount;
      })
      .catch((error) => {
        // console.error('短信数据请求失败:', error);
      });
  }
  document.getElementById("other_atcmd").onclick = function () {
    layer.open({
      type: 1,
      title: "常用AT命令",
      shadeClose: true,
      area: ["auto", "400px"],
      content:
        "<div style='margin:10px'>" +
        "查询限速：AT+CGEQOSRDP" +
        "<br>" +
        "查询限速：AT+C5GQOSRDP" +
        "<br>" +
        '修改IMEI0：AT+SPIMEI=0,"861234567654321"' +
        "<br>" +
        '修改IMEI1：AT+SPIMEI=1,"861234567654321"' +
        "<br>" +
        "查询ICCID：AT+CCID" +
        "<br>" +
        "查询IMEI：AT+GSN" +
        "<br>" +
        "查询IMEI：AT+SPIMEI?" +
        "</div>",
    });
  };
  // 页面加载时获取当前配置
  function fetchConfigData() {
    fetch(baseUrl + "api/sms/forward/getconfig")
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          document.getElementById("pushplus_forward").checked = data.pushplus.pushplus_forward === 1;
          document.getElementById("pushplus_channel").value = data.pushplus.pushplus_channel;
          document.getElementById("pushplus_token").value = data.pushplus.pushplus_token;
          document.getElementById("pushplus_channel_code").value = data.pushplus.pushplus_channel_code;
          document.getElementById("sms_forward").checked = data.sms.sms_forward === 1;
          document.getElementById("to_num").value = data.sms.to;
          form.render();
        }
      })
      .catch((error) => {
        console.error("fetchConfigData err", error);
      });
  }
  function fetchForwardLogs() {
    fetch(baseUrl + "api/sms/forward/getlogs")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.text();
      })
      .then((data) => {
        const logTextarea = document.getElementById("logTextarea");
        logTextarea.value = data;
      })
      .catch((error) => {
        console.error("fetchForwardLogs err:", error);
      });
  }
  function deleteForwardLogs() {
    fetch(baseUrl + "api/sms/forward/deletelogs", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success === 0) {
          layer.msg("日志删除成功");
          fetchForwardLogs();
        } else {
          layer.msg("日志删除失败");
        }
      })
      .catch((error) => {
        console.error("deleteForwardLogs err:", error);
      });
  }

  function fetchTempData() {
    fetch(baseUrl + "api/sys/temp")
      .then((response) => response.json())
      .then((data) => {
        const thermalZones = data.temp;
        const tempTableBody = document.getElementById("tempTableBody");
        tempTableBody.innerHTML = "";
  
        Object.entries(thermalZones).forEach(([key, value]) => {
          if (key.includes("soc-thmzone")) {
            socThmZoneValue = value; // 如果 key 包含 "soc-thmzone"，将其对应的 value 保存到全局变量
          }
  
          const row = document.createElement("tr");
          row.innerHTML = `<td>${key}</td>
                            <td>${(value / 1000).toFixed(2)} °C</td>`;
          tempTableBody.appendChild(row);
        });
      })
      .catch((error) => {
        console.error("fetchTempData err", error);
      });
  }
  function fetchBatteryData() {
    fetch(baseUrl + "api/sys/battery")
      .then((response) => response.json())
      .then((data) => {
        if (data.success === 1) {
          document.getElementById("charge_stop").checked = data.stop
            ? false
            : true;
          const batteryDatas = data.data;
          const batteryTableBody = document.getElementById("batteryTableBody");
          batteryTableBody.innerHTML = "";
          Object.entries(batteryDatas).forEach(([key, value]) => {
            const row = document.createElement("tr");
            row.innerHTML = `<td>${key}</td>
                                <td>${value}</td>`;
            batteryTableBody.appendChild(row);
          });
        } else {
          // 无电池机型自动隐藏电池信息
          document.getElementById("bat_li").style.display = "none";
        }
      })
      .catch((error) => {
        console.error("fetchBatteryData err", error);
      });
  }
  // 发送短信的函数
  function sendSMS() {
    const toNum = document.getElementById("ToNumInput").value;
    const textContent = document.getElementById("Text_Content").value;

    if (!toNum || !textContent) {
      layer.msg("请填写收件人和短信内容！"); // 提示用户输入内容
      return;
    }

    layer.msg("正在发送短信...");
    const payload = {
      to: toNum,
      text: textContent,
    };

    fetch(baseUrl + "api/sms/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          layer.msg("发送成功");
        } else {
          layer.msg("发送失败：" + data.msg);
        }
      })
      .catch((error) => {
        console.error("sendSMS err:", error);
      });
  }


  // 发送短信按钮事件监听
  document.getElementById("sendSMSBtn").onclick = sendSMS;

  function deletLogs() {
    layer.confirm(
      "确定要删除转发日志吗？",
      { icon: 3, title: "确认" },
      function (index) {
        deleteForwardLogs();
        layer.close(index);
      }
    );
  }

  document.getElementById("deleteLogsButton").addEventListener("click", deletLogs);

  //选页
  document.getElementById("pageSelect").addEventListener("change", function () {
    currentPage = parseInt(this.value);
    fetchSMSData();
  });
  //分页
  document
    .getElementById("limitSelect")
    .addEventListener("change", function () {
      limit = parseInt(this.value);
      fetchSMSData();
    });
  // 删除选中短信
  document.getElementById("deleteSelected").onclick = function () {
    var checkStatus = table.checkStatus("smsTable");
    var selectedIds = checkStatus.data.map((item) => item.id);

    if (selectedIds.length === 0) {
      layer.msg("请先选择要删除的短信。");
      return;
    }
    layer.confirm(
      "确认删除选中信息？",
      {
        icon: 3,
        btn: ["确定", "取消"],
      },
      function () {
        fetch(baseUrl + "api/sms/delete", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ids: selectedIds }),
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.success) {
              layer.msg("删除成功！");
              currentPage = 1;
              fetchSMSData();
            } else {
              layer.msg("删除失败。");
            }
          })
          .catch((error) => {
            console.error("Error deleting SMS:", error);
          });
      },
      function () {
        layer.msg("删除取消。");
      }
    );
  };
  //删除短信数据库，清空
  document.getElementById("delete_SMS_DB").onclick = function () {
    layer.confirm(
      "确认清空所有信息？",
      {
        icon: 3,
        btn: ["确定", "取消"],
      },
      function () {
        fetch(baseUrl + "api/sms/delete/smsdb", {
          method: "GET",
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.success === 0) {
              layer.msg("短信清空成功");
            } else {
              layer.msg("短信清空失败");
            }
            fetchSMSData();
          })
          .catch((error) => {
            console.error("delete_SMS_DB err:", error);
          });
      },
      function () {
        layer.msg("取消。");
      }
    );
  };

  // 刷新短信按钮事件
  document.getElementById("refreshData").onclick = function () {
    fetchSMSData(); // 重新获取短信数据
    layer.msg("已刷新");
  };
  // 翻页按钮事件
  document.getElementById("prevPage").onclick = function () {
    if (currentPage > 1) {
      currentPage--;
      fetchSMSData();
    }
  };
  document.getElementById("nextPage").onclick = function () {
    currentPage++;
    fetchSMSData();
  };

  //发送at指令
  document.getElementById("sendAtCommandBtn").onclick = function () {
    const commandInput = document.getElementById("atCommandInput").value;
    const responseBox = document.getElementById("atCommandResponse");

    if (commandInput === "") {
      layer.msg("请输入一个 AT 命令！");
      return;
    }
    const requestData = {
      cmd: commandInput,
    };
    fetch(baseUrl + "api/at", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => response.text())
      .then((data) => {
        // 将文本响应结果显示在 textarea 中，向前追加
        responseBox.value =
          commandInput + "\n" + data + "\n" + responseBox.value;
      })
      .catch((error) => {
        console.error("Error sending AT command:", error);
        responseBox.value =
          commandInput + "\n" + "发送失败：" + error + "\n" + responseBox.value;
      });
  };



  // 初始调用获取短信数据
  fetchTempData();
  fetchSMSData();
  fetchConfigData();
  fetchForwardLogs();
  fetchBatteryData();
  sysinfo();
  //自动刷新
  setInterval(function () {
    fetchTempData();
    fetchBatteryData();
    fetchForwardLogs();
    sysinfo();
  }, 3000);



 


  //表单提交事件监听
  form.on("submit(saveConfig)", function () {
    var smsForwardToken = document.getElementById("pushplus_token").value;
    var smsForwardChannelCode = document.getElementById(
      "pushplus_channel_code"
    ).value;
    var smsForwardChannel = document.getElementById("pushplus_channel").value;
    var to_num = document.getElementById("to_num").value;

    if (
      smsForwardChannel === "webhook" &&
      smsForwardChannelCode.trim() === ""
    ) {
      layer.msg("选择webhook时渠道编码不能为空！");
      return false;
    }

    var configData = {
      pushplus_forward: document.getElementById("pushplus_forward").checked
        ? 1
        : 0,
      pushplus_channel: smsForwardChannel,
      pushplus_token: smsForwardToken,
      pushplus_channel_code: smsForwardChannelCode,
      sms_forward: document.getElementById("sms_forward").checked ? 1 : 0,
      to: to_num,
    };

    fetch(baseUrl + "api/sms/forward/setconfig", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(configData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          layer.msg("保存配置成功");
        } else {
          layer.msg("保存配置失败");
        }
      })
      .catch((error) => {
        console.error("saveConfig err:", error);
      });

    return false;
  });

  form.on("switch(charge_stop)", function (data) {
    const isChecked = data.elem.checked; // 获取开关状态
    const postData = {
      stop: isChecked ? 0 : 1,
    };
    fetch(baseUrl + "api/sys/stop_charge", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("网络响应错误");
        }
        return response.json();
      })
      .then((data) => {
        fetchBatteryData();
      })
      .catch((error) => { console.error("charge_stop err:", error) });
  });
});

function sysinfo(){
  fetch(baseUrl+'api/sysinfo')
  .then(response => {
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      return response.json();
  })
  .then(data => {
      const sysInfoDiv = document.getElementById('sysinfo');
      const totalMemoryMB = (data.sys.total_memory / (1024 * 1024)).toFixed(2);
      const freeMemoryMB = (data.sys.free_memory / (1024 * 1024)).toFixed(2);
      const uptime = data.sys.uptime;
      const days = Math.floor(uptime / 86400);
      const hours = Math.floor((uptime % 86400) / 3600);
      const minutes = Math.floor((uptime % 3600) / 60);
      const b64info=data.sys.info;
      const decodedInfo = base64ToUtf8(b64info);
 
      sysInfoDiv.innerHTML = `
          <p><strong>QCI等级 : </strong> ${data.ambr.qci}</p>
          <br>
          <p><strong>下行速率 : </strong> ${data.ambr.dl / 1000} Mbps</p>
          <br>
          <p><strong>上行速率 : </strong> ${data.ambr.ul / 1000} Mbps</p>
          <br>
          <p><strong>soc 温度 : </strong> ${(socThmZoneValue / 1000).toFixed(2)}°C</p>
          <br>
          <p><strong>运行时间 : </strong> ${days} 天 ${hours} 小时 ${minutes} 分 </p>
          <br>
          <p><strong>运行内存 : </strong> ${totalMemoryMB} MB</p>
          <br>
          <p><strong>可用内存 : </strong> ${freeMemoryMB} MB</p>
          <br>
          <p><strong>后台版本 : </strong> ${data.sys.ver}</p>
          <br>
          <p><strong>内核版本 : </strong> ${data.sys.kernel_version}</p>
          <br>
          
      `;
  })
  .catch(error => {
      console.log('sysinfo err:', error);
  });
}
function base64ToUtf8(base64Str) {
  const binaryStr = atob(base64Str);
  const len = binaryStr.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
      bytes[i] = binaryStr.charCodeAt(i);
  }
  const utf8Str = new TextDecoder('utf-8').decode(bytes);
  return utf8Str;
}


const mypage = `<div style="padding: 20px;">
                        <p>加入9527后台交流群获取文件与教程</p><br>
                        <p>群号 : <b>875059111</b></p>
                        <br><br>
                        <input type="checkbox" id="dontShowAgain"> 不再显示此弹窗
                        <br><br><br>
                        <button id="closeButton" class="layui-btn layui-btn">关闭</button>
                    </div>`;
const mytitle = "欢迎使用9527后台";



document.addEventListener("DOMContentLoaded", () => {
  const showPopup = localStorage.getItem("showPopup") !== "false";

  if (showPopup) {
    openPopup();
  }
});

function openPopup() {
  layer.open({
    type: 1,
    title: mytitle,
    content: mypage,
    area: ["auto", "300px"],
    success: function (layero, index) {
      document.getElementById("closeButton").onclick = function () {
        layer.close(index);
      };
      document.getElementById("dontShowAgain").onclick = function () {
        if (this.checked) {
          localStorage.setItem("showPopup", "false");
        } else {
          localStorage.setItem("showPopup", "true");
        }
      };
    },
  });
}

 