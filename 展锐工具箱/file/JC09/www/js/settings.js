var menustatus = "";
var imei = "";
var swVersion = "";

function checkSettingsHtml(htmlName) {
    document.getElementById('settings_right').innerHTML = "";
    document.getElementById('settings_right').innerHTML = callProductHTML("html/setting_router.html");
}

function checkSettingMenuIcon(menuName) {
     if (menuName === menustatus) {
         switch (menuName) {
             //case "setting_menu_internet":
             //    document.getElementById("internet_child_menu").style.display = "none";
             //    document.getElementById("img_menu_internet").src = "../images/main/more_nav_arrow_down.png";
             //    menustatus = ""
             //    break;
             //case "setting_menu_wifi" :
             //    document.getElementById("wifi_child_menu").style.display = "none";
             //    document.getElementById("img_menu_wifi").src = "../images/main/more_nav_arrow_down.png";
             //    menustatus = ""
             //    break;
             case "setting_menu_firewall":
                 document.getElementById("firewall_child_menu").style.display = "none";
                 document.getElementById("img_menu_firewall").src = "../images/main/more_nav_arrow_down.png";
                 menustatus = ""
                 break;
             //case "setting_menu_system":
             //    document.getElementById("system_child_menu").style.display = "none";
             //    document.getElementById("img_menu_system").src = "../images/main/more_nav_arrow_down.png";
             //    menustatus = ""
             //    break;
         }
         return;
     }
    document.getElementById("settings_menu_router").className = "settings_menu_normal";
    document.getElementById("setting_menu_update").className = "settings_menu_normal";
    document.getElementById("internet_child_menu").style.display = "none";
    // document.getElementById("wifi_child_menu").style.display = "none";
    document.getElementById("firewall_child_menu").style.display = "none";
    // document.getElementById("system_child_menu").style.display = "none";
    document.getElementById("setting_menu_lan").className = "settings_menu_normal";
    document.getElementById("setting_menu_password").className = "settings_menu_normal";
    document.getElementById("setting_menu_internet_time").className = "settings_menu_normal";
    document.getElementById("setting_menu_recovery").className = "settings_menu_normal";
    document.getElementById("setting_menu_vpn").className = "settings_menu_normal";
    document.getElementById("setting_menu_port").className = "settings_menu_normal";
    document.getElementById("setting_menu_advanced").className = "settings_menu_normal";

    document.getElementById("text_menu_router").className = "settings_menu_text_normal";
    document.getElementById("text_menu_update").className = "settings_menu_text_normal";
    document.getElementById("text_menu_lan").className = "settings_menu_text_normal";
    document.getElementById("text_menu_password").className = "settings_menu_text_normal";
    document.getElementById("text_menu_internet_time").className = "settings_menu_text_normal";
    document.getElementById("text_menu_recovery").className = "settings_menu_text_normal";
    document.getElementById("text_menu_vpn").className = "settings_menu_text_normal";
    document.getElementById("text_menu_port").className = "settings_menu_text_normal";
    document.getElementById("text_menu_advanced").className = "settings_menu_text_normal";

    document.getElementById("img_menu_internet").src = "../images/main/more_nav_arrow_down.png";
    //document.getElementById("img_menu_wifi").src = "../images/main/more_nav_arrow_down.png";
    //document.getElementById("img_menu_firewall").src = "../images/main/more_nav_arrow_down.png";
    document.getElementById("img_menu_system").src = "../images/main/more_nav_arrow_down.png";

    if (menuName === "settings_menu_router") {
        document.getElementById(menuName).className = "settings_menu_select";
        document.getElementById("text_menu_router").className = "settings_menu_text_select";
        hideSettingRight();
        document.getElementById("settings_router").style.display = "block";
        stone_getXMLCfg("sysinfo", setRouterValue);
    } else if (menuName === "setting_menu_update") {
        document.getElementById(menuName).className = "settings_menu_select";
        document.getElementById("text_menu_update").className = "settings_menu_text_select";
        hideSettingRight();
        document.getElementById("setting_update").style.display = "block";
    } else if (menuName === "setting_menu_lan") {
        document.getElementById(menuName).className = "settings_menu_select";
        document.getElementById("text_menu_lan").className = "settings_menu_text_select";
        hideSettingRight();
        document.getElementById("internet_LAN").style.display = "block";
        stone_getXMLCfg("lan", setDhcpValue);
    } else if (menuName === "setting_menu_internet") {
        document.getElementById("internet_child_menu").style.display = "block";
        document.getElementById("img_menu_internet").src = "../images/main/more_nav_arrow_up.png";
        menustatus = menuName;
    } else if (menuName === "setting_menu_wifi") {
        document.getElementById("wifi_child_menu").style.display = "block";
        document.getElementById("img_menu_wifi").src = "../images/main/more_nav_arrow_up.png";
        menustatus = menuName;
    } else if (menuName === "setting_menu_firewall") {
        document.getElementById("firewall_child_menu").style.display = "block";
        document.getElementById("img_menu_firewall").src = "../images/main/more_nav_arrow_up.png";
        menustatus = menuName;
    } else if (menuName === "setting_menu_system") {
        document.getElementById("system_child_menu").style.display = "block";
        document.getElementById("img_menu_system").src = "../images/main/more_nav_arrow_up.png";
        menustatus = menuName;
    } else if (menuName === "setting_menu_password") {
        document.getElementById(menuName).className = "settings_menu_select";
        document.getElementById("text_menu_password").className = "settings_menu_text_select";
        hideSettingRight();
        document.getElementById("system_password").style.display = "block";
    } else if (menuName === "setting_menu_internet_time") {
        document.getElementById(menuName).className = "settings_menu_select";
        document.getElementById("text_menu_internet_time").className = "settings_menu_text_select";
        hideSettingRight();
        document.getElementById("system_internet_time").style.display = "block";
        stone_getXMLCfg("timestatus", systemTimeGet);
    } else if (menuName === "setting_menu_recovery") {
        document.getElementById(menuName).className = "settings_menu_select";
        document.getElementById("text_menu_recovery").className = "settings_menu_text_select";
        hideSettingRight();
        document.getElementById("system_recovery").style.display = "block";
    } else if (menuName === "setting_menu_vpn") {
        document.getElementById(menuName).className = "settings_menu_select";
        document.getElementById("text_menu_vpn").className = "settings_menu_text_select";
        hideSettingRight();
        document.getElementById("system_vpn").style.display = "block";
	} else if (menuName === "setting_menu_port") {
        document.getElementById(menuName).className = "settings_menu_select";
        document.getElementById("text_menu_port").className = "settings_menu_text_select";
        hideSettingRight();
        document.getElementById("system_port").style.display = "block";
		stone_getXMLCfg("getPortInfo", getPortInfo);
    } else if (menuName === 'setting_menu_advanced') {
        document.getElementById(menuName).className = "settings_menu_select";
        document.getElementById("text_menu_advanced").className = "settings_menu_text_select";
        hideSettingRight();
        document.getElementById("system_advanced").style.display = "block";
    }
}

var systemTimeTimeoutId;
function checkSettingMenu2Icon(menuName) {
    document.getElementById("internet_menu_LAN").className = "settings_menu2_normal";
    document.getElementById("internet_menu_IPV6").className = "settings_menu2_normal";
    // document.getElementById("internet_menu_Qos").className = "settings_menu2_normal";
    // document.getElementById("wifi_menu_advanced").className = "settings_menu2_normal";
    // document.getElementById("wifi_menu_access_control").className = "settings_menu2_normal";
    // document.getElementById("wifi_menu_WPS").className = "settings_menu2_normal";
    // document.getElementById("wifi_menu_relay").className = "settings_menu2_normal";
    document.getElementById("firewall_menu_mac").className = "settings_menu2_normal";
    document.getElementById("firewall_menu_ip").className = "settings_menu2_normal";
    document.getElementById("firewall_menu_url").className = "settings_menu2_normal";
    document.getElementById("firewall_menu_advanced").className = "settings_menu2_normal";
    // document.getElementById("system_menu_password").className = "settings_menu2_normal";
    // document.getElementById("system_menu_internet_time").className = "settings_menu2_normal";
    // document.getElementById("system_menu_system_log").className = "settings_menu2_normal";
    // document.getElementById("system_menu_recovery").className = "settings_menu2_normal";
    // document.getElementById("system_menu_tr069").className = "settings_menu2_normal";

    document.getElementById("internet_text_LAN").className = "settings_menu2_text_normal";
    document.getElementById("internet_text_IPV6").className = "settings_menu2_text_normal";
    // document.getElementById("internet_text_Qos").className = "settings_menu2_text_normal";
    // document.getElementById("wifi_text_advanced").className = "settings_menu2_text_normal";
    // document.getElementById("wifi_text_access_control").className = "settings_menu2_text_normal";
    // document.getElementById("wifi_text_WPS").className = "settings_menu2_text_normal";
    // document.getElementById("wifi_text_relay").className = "settings_menu2_text_normal";
    document.getElementById("firewall_text_mac").className = "settings_menu2_text_normal";
    document.getElementById("firewall_text_ip").className = "settings_menu2_text_normal";
    document.getElementById("firewall_text_url").className = "settings_menu2_text_normal";
    document.getElementById("firewall_text_advanced").className = "settings_menu2_text_normal";
    // document.getElementById("system_text_password").className = "settings_menu2_text_normal";
    // document.getElementById("system_text_internet_time").className = "settings_menu2_text_normal";
    // document.getElementById("system_text_system_log").className = "settings_menu2_text_normal";
    // document.getElementById("system_text_recovery").className = "settings_menu2_text_normal";
    // document.getElementById("system_text_tr069").className = "settings_menu2_text_normal";

    // for (let i = 0; i < 14; i++) {
    //     $("#settings_right")[0].children[i].style = "display: none"
    // }
    hideSettingRight();
    clearTimeout(systemTimeTimeoutId);

    switch (menuName) {
        case "internet_menu_LAN":
            document.getElementById("internet_menu_LAN").className = "settings_menu2_select";
            document.getElementById("internet_text_LAN").className = "settings_menu2_text_select";
            document.getElementById("internet_LAN").style.display = "block";
            stone_getXMLCfg("lan", setDhcpValue);
            break;
        case "internet_menu_IPV6":
            document.getElementById("internet_menu_IPV6").className = "settings_menu2_select";
            document.getElementById("internet_text_IPV6").className = "settings_menu2_text_select";
            document.getElementById("internet_IPV6").style.display = "block";
            break;
        case "internet_menu_Qos":
            document.getElementById("internet_menu_Qos").className = "settings_menu2_select";
            document.getElementById("internet_text_Qos").className = "settings_menu2_text_select";
            document.getElementById("internet_Qos").style.display = "block";
            stone_getXMLCfg("qosLimitGet", setQosValue);
            break;
        // case "wifi_menu_advanced" :
        //     document.getElementById("wifi_menu_advanced").className = "settings_menu2_select";
        //     document.getElementById("wifi_text_advanced").className = "settings_menu2_text_select";
        //     document.getElementById("wifi_advanced").style.display = "block";
        //     break;
        // case "wifi_menu_access_control" :
        //     document.getElementById("wifi_menu_access_control").className = "settings_menu2_select";
        //     document.getElementById("wifi_text_access_control").className = "settings_menu2_text_select";
        //     document.getElementById("wifi_access_control").style.display = "block";
        //     stone_getXMLCfg("macFilterGet", macFilterGet);
        //     break;
        // case "wifi_menu_WPS" :
        //     document.getElementById("wifi_menu_WPS").className = "settings_menu2_select";
        //     document.getElementById("wifi_text_WPS").className = "settings_menu2_text_select";
        //     document.getElementById("wifi_WPS").style.display = "block";
        //     stone_getXMLCfg("getWpsConfig", setWpsValue);
        //     break;
        // case "wifi_menu_relay" :
        //     document.getElementById("wifi_menu_relay").className = "settings_menu2_select";
        //     document.getElementById("wifi_text_relay").className = "settings_menu2_text_select";
        //     document.getElementById("wifi_relay").style.display = "block";
        //     break;
        case "firewall_menu_mac":
            document.getElementById("firewall_menu_mac").className = "settings_menu2_select";
            document.getElementById("firewall_text_mac").className = "settings_menu2_text_select";
            document.getElementById("firewall_MAC").style.display = "block";
            stone_getXMLCfg("macfilterslist", firewallMacFilterGet);
            break;
        case "firewall_menu_ip":
            document.getElementById("firewall_menu_ip").className = "settings_menu2_select";
            document.getElementById("firewall_text_ip").className = "settings_menu2_text_select";
            document.getElementById("firewall_IP").style.display = "block";
            stone_getXMLCfg("ipFilterGet", firewallIpFilterGet);
            break;
        case "firewall_menu_url":
            document.getElementById("firewall_menu_url").className = "settings_menu2_select";
            document.getElementById("firewall_text_url").className = "settings_menu2_text_select";
            document.getElementById("firewall_URL").style.display = "block";
            stone_getXMLCfg("urlFilterGet", firewallUrlFilterGet);
            break;
        case "firewall_menu_advanced":
            document.getElementById("firewall_menu_advanced").className = "settings_menu2_select";
            document.getElementById("firewall_text_advanced").className = "settings_menu2_text_select";
            document.getElementById("firewall_advanced").style.display = "block";
            stone_getXMLCfg("antiDdosGet", antiDdosGet);
            break;
        case "system_menu_password":
            document.getElementById("system_menu_password").className = "settings_menu2_select";
            document.getElementById("system_text_password").className = "settings_menu2_text_select";
            document.getElementById("system_password").style.display = "block";
            break;
        case "system_menu_internet_time":
            document.getElementById("system_menu_internet_time").className = "settings_menu2_select";
            document.getElementById("system_text_internet_time").className = "settings_menu2_text_select";
            document.getElementById("system_internet_time").style.display = "block";
            stone_getXMLCfg("timestatus", systemTimeGet);
            systemTimeTimeoutId = setInterval('setTimeout("stone_getXMLCfg(\'timestatus\', systemTimeGet)",0)', 1000 * 60);
            break;
        case "system_menu_system_log":
            document.getElementById("system_menu_system_log").className = "settings_menu2_select";
            document.getElementById("system_text_system_log").className = "settings_menu2_text_select";
            document.getElementById("system_system_log").style.display = "block";
            stone_getXMLCfg("systemLogGet", systemLogGet);
            break;
        case "system_menu_recovery":
            document.getElementById("system_menu_recovery").className = "settings_menu2_select";
            document.getElementById("system_text_recovery").className = "settings_menu2_text_select";
            document.getElementById("system_recovery").style.display = "block";
            break;
        case "system_menu_vpn":
            document.getElementById("system_menu_vpn").className = "settings_menu2_select";
            document.getElementById("system_text_vpn").className = "settings_menu2_text_select";
            document.getElementById("system_vpn").style.display = "block";
            break;
        case "system_menu_port":
            document.getElementById("system_menu_port").className = "settings_menu2_select";
            document.getElementById("system_text_port").className = "settings_menu2_text_select";
            document.getElementById("system_port").style.display = "block";
            break;
        case "system_menu_tr069":
            document.getElementById("system_menu_tr069").className = "settings_menu2_select";
            document.getElementById("system_text_tr069").className = "settings_menu2_text_select";
            document.getElementById("system_tr069").style.display = "block";
            break;

    }
}

function hideSettingRight() {
    document.getElementById("settings_router").style.display = "none";
    document.getElementById("setting_update").style.display = "none";
    document.getElementById("internet_LAN").style.display = "none";
    document.getElementById("internet_IPV6").style.display = "none";
    document.getElementById("internet_Qos").style.display = "none";
    // document.getElementById("wifi_advanced").style.display = "none";
    // document.getElementById("wifi_access_control").style.display = "none";
    // document.getElementById("wifi_WPS").style.display = "none";
    // document.getElementById("wifi_relay").style.display = "none";
    document.getElementById("firewall_MAC").style.display = "none";
    document.getElementById("firewall_IP").style.display = "none";
    document.getElementById("firewall_URL").style.display = "none";
    document.getElementById("firewall_advanced").style.display = "none";
    document.getElementById("system_password").style.display = "none";
    document.getElementById("system_internet_time").style.display = "none";
    document.getElementById("system_system_log").style.display = "none";
    document.getElementById("system_recovery").style.display = "none";
    document.getElementById("system_vpn").style.display = "none";
    document.getElementById("system_port").style.display = "none";
    document.getElementById("system_tr069").style.display = "none";
    document.getElementById("system_advanced").style.display = "none";
}

function detectVersion() {
    stone_getXMLCfg("checkNewVersion", getUploadValue);
}

//获取wifi访问控制页面回调
function macFilterGet(content) {
    var xml = content;
    console.log("macFilterGet xml:", xml);

    var mode = $(xml).find("macStatus").text();
    _allMac = $(xml).find("allMac").text();
    var blacklist = _allMac.split(',', 10);
    var list = document.getElementsByName("blackList");

    $("#MACSelect").val(mode);
    for (var i = 0; i < list.length; i++) {
        document.getElementsByName("blackList")[i].value = "";
    }

    if (!(blacklist.length === 0 || "" == blacklist)) {
        console.log("libin blacklist.length is ", blacklist.length);
        for (var i = 0; i < blacklist.length; i++) {
            document.getElementsByName("blackList")[i].value = blacklist[i];
        }
    }

    changeFilter();
}

function changeFilter() {
    var mode = $("#MACSelect").val();
    var list = document.getElementsByName("blackList");
    if (mode == 0) {
        for (var i = 0; i < list.length; i++) {
            document.getElementsByName("blackList")[i].disabled = "disabled";
            document.getElementsByName("blackList")[i].style.backgroundColor = "#e6e6e6";
        }
    } else {
        for (var i = 0; i < list.length; i++) {
            document.getElementsByName("blackList")[i].disabled = "";
            document.getElementsByName("blackList")[i].style.backgroundColor = "";
        }
    }
}

function macFilterSet() {
    var mode = $("#MACSelect").val();
    var list = document.getElementsByName("blackList");
    var blacklist = new Array();

    for (var i = 0; i < list.length; i++) {
        if (list[i].value.toString() === "") {
            continue;
        }
        if (isMacAddress(list[i].value.toString())) {
            blacklist.push({ "mac": list[i].value.toString() });
        } else {
            alert(I18N("j", "macAddErr"));
            return;
        }
    }

    console.log("blacklist.length=", blacklist.length, "mode = ", mode);
    if (mode > 0 && blacklist.length <= 0) {
        alert(I18N("j", "macAddNotEmpty"));
        return;
    }

    var wifi_type = 0;
    if (DISPLAY_WIFI_2G == "block" && DISPLAY_WIFI_5G == "block") {
        wifi_type = 2;
    } else if (DISPLAY_WIFI_5G == "block") {
        wifi_type = 1;
    } else {
        wifi_type = 0;
    }

    var macList = {
        "mode": mode,
        "wifi_type": wifi_type,
        "blacklist": blacklist
    }

    var url = LOCAL_HOST_IP + "wirelessmacfilters";
    $.ajax({
        url: url,
        dataType: "jsonp",
        data: { macList: JSON.stringify(macList) },
        async: false,
        cache: false,
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", getAuthHeader("GET"));
            xhr.setRequestHeader("Expires", "-1");
            xhr.setRequestHeader("Cache-Control", "no-store, no-cache, must-revalidate");
            xhr.setRequestHeader("Pragma", "no-cache");
        },
        success: function (content) {
            var obj = content;
            console.log("state " + JSON.stringify(obj));
            var state = obj.state;
            console.log("state " + state);
            if (state === 1) {
                alert(I18N("j", "setSuccess"));
            } else {
                alert(I18N("j", "setFail"));
            }
        }
    });
}

//获取wps页面信息回调
function setWpsValue(content) {
    var xml = content;
    console.log("setWpsValue xml:", xml);
    var wpsStatus = $(xml).find("status").text();
    var wifiSelect = $(xml).find("wifiSelect").text();

    if (wpsStatus === "1") {
        document.getElementById("wps_switch").checked = true;
    } else {
        document.getElementById("wps_switch").checked = false;
    }
    if (wifiSelect === "1") {
        document.getElementById("wifiSelect1").checked = true;
    } else {
        document.getElementById("wifiSelect2").checked = true;
    }
}

function changeWpsConfig() {
    var status;
    var wifiSelect;
    if ($('#wps_switch').is(':checked')) {
        status = 1
    } else {
        status = 0
    }
    wifiSelect = $('input[name=wifiSelect]:checked').val()

    var wpsConf = {
        "status": status,
        "wifiSelect": parseInt(wifiSelect)
    }

    var url = LOCAL_HOST_IP + "changeWpsConfig";
    $.ajax({
        url: url,
        dataType: "jsonp",
        data: { wpsConf: JSON.stringify(wpsConf) },
        async: false,
        cache: false,
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", getAuthHeader("GET"));
            xhr.setRequestHeader("Expires", "-1");
            xhr.setRequestHeader("Cache-Control", "no-store, no-cache, must-revalidate");
            xhr.setRequestHeader("Pragma", "no-cache");
        },
        success: function (content) {
            var obj = content;
            console.log("state " + JSON.stringify(obj));
            var state = obj.state;
            console.log("state " + state);
            if (state === 1) {
                alert(I18N("j", "setSuccess"));
            } else {
                alert(I18N("j", "setFail"));
            }
        }
    });
}

//获取系统时间页面信息回调
function systemTimeGet(content) {
    var xml = content;
    console.log("systemTimeGet xml:", xml);

    var systemTimeString = $(xml).find("time").text();
    var auto = $(xml).find("isAutoTimezone").text() == "true" ? 1 : 0;
    var timeZone = $(xml).find("timezone").text();
    var networkStatus = 1;

    if (auto === 1) {
        document.getElementById("autoTimeZone").checked = true;
    } else {
        document.getElementById("autoTimeZone").checked = false;
    }
    if (timeZone == "CST") {
        $("#timeZone").val("GMT+8");
    } else if (timeZone !== "") {
        $("#timeZone").val(timeZone);
    } else {
        $("#timeZone").val("GMT");
    }
    setLabelValue("systemTime", systemTimeString);

    if (networkStatus === 1) {
        document.getElementById("systemTimeStatus").style.display = "none";
    } else {
        document.getElementById("systemTimeStatus").style.display = "block";
    }
}

function systemTimeSet() {
    var systemTime = new Date().getTime();
    var auto
    if ($('#autoTimeZone').is(':checked')) {
        auto = 1
    } else {
        auto = 0
    }
    var timeZone = $.trim($('#timeZone').val());
    if (timeZone.includes("+")) {
        timeZone = timeZone.replace("+", "-");
    } else if (timeZone.includes("-")) {
        timeZone = timeZone.replace("-", " ");
    } else {
        timeZone = "GMT 0";
    }

    var selecttimezone = {
        "isAutoTimezone": auto,
        "timezone": timeZone
    }

    var url = LOCAL_HOST_IP + "selecttimezone";
    $.ajax({
        url: url,
        dataType: "jsonp",
        data: { selecttimezone: JSON.stringify(selecttimezone) },
        async: false,
        cache: false,
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", getAuthHeader("GET"));
            xhr.setRequestHeader("Expires", "-1");
            xhr.setRequestHeader("Cache-Control", "no-store, no-cache, must-revalidate");
            xhr.setRequestHeader("Pragma", "no-cache");
        },
        success: function (content) {
            var obj = content;
            console.log("state " + JSON.stringify(obj));
            var state = obj.state;
            console.log("state " + state);
            if (state === 1) {
                stone_getXMLCfg("timestatus", systemTimeGet);
                alert(I18N("j", "setSuccess"));
            } else {
                alert(I18N("j", "setFail"));
            }
        }
    });
}

//获取防火墙-MAC地址过滤页面信息回调
function firewallMacFilterGet(content) {
    var xml = content;
    console.log("firewallMacFilterGet xml:", xml);

    var mode = xml['mode'].toString();
    var blacklist = xml['blacklist'];
    var list = document.getElementsByName("sfmMACBlackList");

    $("#sfmMACSelect").val(mode);
    if (blacklist.length === 0) {
        for (var i = 0; i < list.length; i++) {
            document.getElementsByName("sfmMACBlackList")[i].value = "";
        }
    } else {
        for (var j = 0; j < blacklist.length && j < list.length; j++) {
            document.getElementsByName("sfmMACBlackList")[j].value = blacklist[j].mac.toString();
        }
    }

    changeFilter();
}

function firewallMacFilterSet() {
    var mode = $("#sfmMACSelect").val();
    var list = document.getElementsByName("sfmMACBlackList");
    var blacklist = new Array();
    for (var i = 0; i < list.length; i++) {
        if (list[i].value.toString() === "") {
            continue;
        }
        if (isMacAddress(list[i].value.toString())) {
            blacklist.push({ "mac": list[i].value.toString() });
        } else {
            alert(I18N("j", "macAddErr"));
            return;
        }
    }

    var macList = {
        "mode": mode,
        "blacklist": blacklist
    }

    var url = LOCAL_HOST_IP + "macFilterSet";
    $.ajax({
        url: url,
        dataType: "jsonp",
        data: { macList: JSON.stringify(macList) },
        async: false,
        cache: false,
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", getAuthHeader("GET"));
            xhr.setRequestHeader("Expires", "-1");
            xhr.setRequestHeader("Cache-Control", "no-store, no-cache, must-revalidate");
            xhr.setRequestHeader("Pragma", "no-cache");
        },
        success: function (content) {
            var obj = content;
            console.log("state " + JSON.stringify(obj));
            var state = obj.state;
            console.log("state " + state);
            if (state === 1) {
                alert(I18N("j", "setSuccess"));
            } else {
                alert(I18N("j", "setFail"));
            }
        }
    });
}

//获取防火墙-IP地址过滤页面信息回调
function firewallIpFilterGet(content) {
    var xml = content;
    console.log("firewallIPFilterGet xml:", xml);

    var mode = $(xml).find("mode").text();
    _allMac = $(xml).find("blacklist").text();

    var blacklist = _allMac.split(',', 10);
    var list = document.getElementsByName("sfiIPBlackList");

    $("#sfiIPSelect").val(mode);
    if (blacklist.length === 0 || "" == blacklist) {
        for (var i = 0; i < list.length; i++) {
            document.getElementsByName("sfiIPBlackList")[i].value = "";
        }
    } else {
        for (var j = 0; j < blacklist.length; j++) {
            document.getElementsByName("sfiIPBlackList")[j].value = blacklist[j];
        }
    }
    changeIpFilter();
}

function changeIpFilter() {
    var mode = $("#sfiIPSelect").val();
    var list = document.getElementsByName("sfiIPBlackList");
    if (mode == 0) {
        for (var i = 0; i < list.length; i++) {
            document.getElementsByName("sfiIPBlackList")[i].disabled = "disabled";
            document.getElementsByName("sfiIPBlackList")[i].style.backgroundColor = "#e6e6e6";
        }
    } else {
        for (var i = 0; i < list.length; i++) {
            document.getElementsByName("sfiIPBlackList")[i].disabled = "";
            document.getElementsByName("sfiIPBlackList")[i].style.backgroundColor = "";
        }
    }
}

function firewallIpFilterSet() {
    var mode = $("#sfiIPSelect").val();
    var list = document.getElementsByName("sfiIPBlackList");
    var blacklist = new Array();
    for (var i = 0; i < list.length; i++) {
        if (list[i].value.toString() === "") {
            continue;
        }
 
        blacklist.push({ "ip": list[i].value.toString() });
    }

    var ipList = {
        "mode": mode,
        "blacklist": blacklist
    }

    var url = LOCAL_HOST_IP + "ipFilterSet";
    $.ajax({
        url: url,
        dataType: "jsonp",
        data: { ipList: JSON.stringify(ipList) },
        async: false,
        cache: false,
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", getAuthHeader("GET"));
            xhr.setRequestHeader("Expires", "-1");
            xhr.setRequestHeader("Cache-Control", "no-store, no-cache, must-revalidate");
            xhr.setRequestHeader("Pragma", "no-cache");
        },
        success: function (content) {
            var obj = content;
            console.log("state " + JSON.stringify(obj));
            var state = obj.state;
            console.log("state " + state);
            if (state === 1) {
                alert(I18N("j", "setSuccess"));
            } else {
                alert(I18N("j", "setFail"));
            }
        }
    });
}

//获取防火墙-URL地址过滤页面信息回调
function firewallUrlFilterGet(content) {
    var xml = content;
    console.log("firewallUrlFilterGet xml:", xml);

    var mode = xml['mode'].toString();
    var blacklist = xml['blacklist'];
    var list = document.getElementsByName("sfuURLBlackList");

    $("#sfuURLSelect").val(mode);
    if (blacklist.length === 0) {
        for (var i = 0; i < list.length; i++) {
            document.getElementsByName("sfuURLBlackList")[i].value = "";
        }
    } else {
        for (var j = 0; j < blacklist.length && j < list.length; j++) {
            document.getElementsByName("sfuURLBlackList")[j].value = blacklist[j].url.toString();
        }
    }
}

function firewallUrlFilterSet() {
    var mode = $("#sfuURLSelect").val();
    var list = document.getElementsByName("sfuURLBlackList");
    var blacklist = new Array();
    for (var i = 0; i < list.length; i++) {
        if (list[i].value.toString() === "") {
            continue;
        }
        if (isURL(list[i].value.toString())) {
            blacklist.push({ "url": list[i].value.toString() });
        } else {
            alert(I18N("j", "urlAddErr"));
            return;
        }
    }

    var urlList = {
        "mode": mode,
        "blacklist": blacklist
    }

    var url = LOCAL_HOST_IP + "urlFilterSet";
    $.ajax({
        url: url,
        dataType: "jsonp",
        data: { urlList: JSON.stringify(urlList) },
        async: false,
        cache: false,
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", getAuthHeader("GET"));
            xhr.setRequestHeader("Expires", "-1");
            xhr.setRequestHeader("Cache-Control", "no-store, no-cache, must-revalidate");
            xhr.setRequestHeader("Pragma", "no-cache");
        },
        success: function (content) {
            var obj = content;
            console.log("state " + JSON.stringify(obj));
            var state = obj.state;
            console.log("state " + state);
            if (state === 1) {
                alert(I18N("j", "setSuccess"));
            } else {
                alert(I18N("j", "setFail"));
            }
        }
    });
}

//获取防火墙-高级设置页面信息回调
function antiDdosGet(content) {
    var xml = content;
    console.log("antiDdosGet xml:", xml);

    if (xml['antiDdos'] === 1) {
        document.getElementById("firewallAdvancedSwitch").checked = true;
    } else {
        document.getElementById("firewallAdvancedSwitch").checked = false;
    }
}

function antiDdosSet() {
    var antiDdos;
    if ($('#firewallAdvancedSwitch').is(':checked')) {
        antiDdos = 1
    } else {
        antiDdos = 0
    }

    var ddos = {
        "antiDdos": antiDdos
    }

    var url = LOCAL_HOST_IP + "antiDdosSet";
    $.ajax({
        url: url,
        dataType: "jsonp",
        data: { ddos: JSON.stringify(ddos) },
        async: false,
        cache: false,
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", getAuthHeader("GET"));
            xhr.setRequestHeader("Expires", "-1");
            xhr.setRequestHeader("Cache-Control", "no-store, no-cache, must-revalidate");
            xhr.setRequestHeader("Pragma", "no-cache");
        },
        success: function (content) {
            var obj = content;
            console.log("state " + JSON.stringify(obj));
            var state = obj.state;
            console.log("state " + state);
            if (state === 1) {
                alert(I18N("j", "setSuccess"));
            } else {
                alert(I18N("j", "setFail"));
            }
        }
    });
}

function timestampToTime(timestamp, targetTimezone) {
    timestamp = timestamp ? timestamp : null;
    let date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    let localTimeZone = date.getTimezoneOffset();
    let newTimestamp = timestamp * 1000 + localTimeZone * 60 * 1000 - (targetTimezone * 60 * 60 * 1000)
    date = new Date(newTimestamp);
    let Y = date.getFullYear() + '-';
    let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    let D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
    let h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
    let m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
    let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
    return Y + M + D + " " + h + m + s;
}

//修改用户名和密码
function setNewPassword() {
    var myUsername = $('#setting_username').val();
    var newpsd = $('#setting_new_psd').val();
    var newpsdsec = $('#setting_new_second').val();

    if ($.trim(myUsername) === "") {
        alert(I18N("j", "usernameEmpty"));
        return;
    }

    if (myUsername.indexOf(" ") !== -1) {
        alert(I18N("j", "usernameSpace"));
        return false;
    }

    if (newpsd.indexOf(" ") !== -1 || newpsdsec.indexOf(" ") !== -1) {
        alert(I18N("j", "psdSpace"));
        return false;
    }

    if (!isNumberOrLetter(myUsername)) {
        alert(I18N("j", "notStandard"));
        return false;
    }
    if (myUsername.length > 20 || myUsername.length < 4) {
        alert(I18N("j", "usernameLength"));
        return false;
    }
    if ($.trim(newpsd) === "" || $.trim(newpsdsec) === "") {
        alert(I18N("j", "psdEmpty"));
        return;
    }

    if (!isNumberOrLetter(newpsd) || !isNumberOrLetter(newpsd)) {
        alert(I18N("j", "psdCharacters"));
        return;
    }

    if ($.trim(newpsd).length < 4 || $.trim(newpsd).length > 20 || $.trim(newpsdsec).length < 4 || $.trim(newpsdsec).length > 20) {
        alert(I18N("j", "numLength"));
        return;
    }

    if ($.trim(newpsd) === $.trim(newpsdsec)) {
        var modifyparam = {
            "username": myUsername,
            "password": newpsd
        };

        var url = LOCAL_HOST_IP + "quickSetUser";
        $.ajax({
            url: url,
            dataType: "jsonp",
            data: { modifyparam: JSON.stringify(modifyparam) },
            async: false,
            cache: false,
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Authorization", getAuthHeader("GET"));
                xhr.setRequestHeader("Expires", "-1");
                xhr.setRequestHeader("Cache-Control", "no-store, no-cache, must-revalidate");
                xhr.setRequestHeader("Pragma", "no-cache");
            },
            success: function (data) {
                console.log("data = ", data);
                var state = data.state;
                console.log("state " + state);
                if (state === 1) {
                    alert(I18N("j", "setSuccess"));
                    document.getElementById("setting_username").value = "";
                    document.getElementById("setting_new_psd").value = "";
                    document.getElementById("setting_new_second").value = "";
                    logOut();
                } else {
                    alert(I18N("j", "setFail"));
                }
            }
        });//.responseText;
    } else {
        alert(I18N("j", "psdInconsistent"));
        return;
    }
}

//获取局域网DHCP页面数据回调
function setDhcpValue(content) {
    var xml = content;
    console.log("getDhcpCfg xml:", xml);

    var ip = $(xml).find("m__ip").text();

    var dhcp_default_range_start, range_start;

    var dhcp_default_range_end, range_end;

    ip_address = ip.split(".");
    dhcp_default_range_start = $(xml).find("start_ip").text();
    range_start = dhcp_default_range_start.split(".");

    dhcp_default_range_end = $(xml).find("end_ip").text();
    range_end = dhcp_default_range_end.split(".");

    $("#lan_ip_2").val(ip_address[2]);
    $("#lan_ip_3").val(ip_address[3]);
    document.getElementById("lanIpStart").innerHTML = range_start[0] + "." + range_start[1] + "." + range_start[2] + ".";
    $("#lan_ip_start").val(range_start[3]);
    document.getElementById("lanIpEnd").innerHTML = range_end[0] + "." + range_end[1] + "." + range_end[2] + ".";
    $("#lan_ip_end").val(range_end[3]);
}

function changeLanIp() {
    let lan_Ip_2 = $("#lan_ip_2").val();
    console.log("lan_Ip_2", lan_Ip_2);
    document.getElementById("lanIpStart").innerHTML = "192.168." + lan_Ip_2 +  ".";
    document.getElementById("lanIpEnd").innerHTML = "192.168." + lan_Ip_2 + ".";
}

//获取Qos页面数据回调
function setQosValue(content) {
    var qosEnabled = content['qosEnabled'].toString();
    var limitList = content['limitList'];

    if (qosEnabled === "on") {
        document.getElementById("system_Qos_status").checked = true;
    } else {
        document.getElementById("system_Qos_status").checked = false;
    }

    let tab = document.getElementById("QosLimitTable");
    let rows = tab.rows;
    let rowNum = rows.length
    if (rowNum > 2) {
        for (let j = 2; j < rows.length; j++) {
            tab.deleteRow(j);
            rowNum = rowNum - 1;
        }
    }
    if (limitList.length > 0) {
        for (let i = 0; i < limitList.length; i++) {
            let ip = limitList[i].ip.toString();
            let download = limitList[i].download.toString();
            let upload = limitList[i].upload.toString();
            qosAddTable(ip, download, upload)
        }
    }

}

function qosLimitSet() {
    let qosEnabled;
    if ($('#system_Qos_status').is(':checked')) {
        qosEnabled = "on";
    } else {
        qosEnabled = "off";
    }

    let limitList = new Array();

    let tab = document.getElementById("QosLimitTable");
    let rows = tab.rows;

    for (let i = 2; i < rows.length; i++) {
        let cells = rows[i].cells;
        let ip = cells[1].innerHTML.toString();
        let download = cells[2].innerHTML;
        let upload = cells[3].innerHTML;
        limitList.push({ "ip": ip, "download": parseInt(download), "upload": parseInt(upload) });
    }

    var qos =
    {
        "qosEnabled": qosEnabled,
        "limitList": limitList,
    }
    var url = LOCAL_HOST_IP + "qosLimitSet";
    $.ajax({
        url: url,
        dataType: "jsonp",
        data: { qos: JSON.stringify(qos) },
        async: false,
        cache: false,
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", getAuthHeader("GET"));
            xhr.setRequestHeader("Expires", "-1");
            xhr.setRequestHeader("Cache-Control", "no-store, no-cache, must-revalidate");
            xhr.setRequestHeader("Pragma", "no-cache");
        },
        success: function (content) {
            var state = content.state;
            if (state === 1) {
                alert(I18N("j", "setSuccess"));
            } else {
                alert(I18N("j", "setFail"));
            }
        }
    });
}

function addNewQos() {
    let ip = $("#QosIPAddress").val();
    let download = parseInt($("#QosDownload").val());
    let upload = parseInt($("#QosUpload").val());
    if (!isIPv4(ip)) {
        alert(I18N("j", "ipAddErr"));
        return;
    }
    if (!isNumber(download) || !isNumber(upload)) {
        alert(I18N("j", "qosNumErr"));
        return;
    }

    qosAddTable(ip, download, upload)

}

function qosAddTable(ip, down, up) {
    let tab = document.getElementById("QosLimitTable");

    tab.innerHTML +=
        "<tr style='background: #FFFFFF; height: 40px'>" +
        "<td style='text-align: center'>" +
        "<img src='../images/login/pin_select.png'>" +
        "</td>" +
        "<td>" + ip + "</td>" +
        "<td>" + down + "Mb/s" + "</td>" +
        "<td>" + up + "Mb/s" + "</td>" +
        "<td style='text-align: center' onclick='deleteRow(this)'>" +
        "<img src='../images/main/icon_delete.png' >" +
        "</td>" +
        "</tr>";
}

// 动态删除表格的行
function deleteRow(node) {
    // 第一个 parentNode获取到当前td
    // 第二个 parentNode获取到tr
    // 第三个 parentNode获取到当前table
    var table = node.parentNode.parentNode.parentNode;
    var tr = node.parentNode.parentNode;
    table.removeChild(tr);
}

//局域网DHCP页面数据上传
function changeDhcpCfg() {
    var ipaddr_2 = $("#lan_ip_2").val();
    var dhcpIpaddr = "192.168." + ipaddr_2 + ".1";
    var start = parseInt($("#lan_ip_start").val());
    var end = parseInt($("#lan_ip_end").val());
    var start_str=$("#lan_ip_start").val();
    var end_str=$("#lan_ip_end").val();

    if (!isNumber(start_str) || !isNumber(end_str)) {
        alert(I18N("j", "dhcpMustNum"));
        return;
    }

    console.log("dhcpIpaddr=", dhcpIpaddr);
    if (!isIPv4(dhcpIpaddr)) {
        alert(I18N("j", "notStandard"));
        return;
    }
    var ipaddr1 = parseInt(dhcpIpaddr.split(".")[0]);
    var ipaddr2 = parseInt(dhcpIpaddr.split(".")[1]);
    var ipaddr3 = parseInt(dhcpIpaddr.split(".")[2]);
    var ipaddr4 = parseInt(dhcpIpaddr.split(".")[3]);

    if (!isNumber(start) || !isNumber(end)) {
        alert(I18N("j", "dhcpMustNum"));
        return;
    }

    if (dhcpIpaddr === "" || $("#lan_ip_start").val() === "" || $("#lan_ip_end").val() === "") {
        alert(I18N("j", "unfilledData"));
        return;
    }

    if (ipaddr4 >= start && ipaddr4 <= end) {
        alert(I18N("j", "gatewayBetween"));
        return;
    }

    if (ipaddr4 < 1 || ipaddr4 > 254) {
        alert(I18N("j", "gatewayRange"));
        return;
    }

    if (start < 2 || start > 254 || end < 2 || end > 254) {
        alert(I18N("j", "dhcpRange"));
        return;
    }

    if (start >= end) {
        alert(I18N("j", "dhcpAdds"));
        return;
    }

    var dhcpStart = ipaddr1 + "." + ipaddr2 + "." + ipaddr3 + "." + start;
    var dhcpEnd = ipaddr1 + "." + ipaddr2 + "." + ipaddr3 + "." + end;

    var param =
    {
        "lan_ipaddr": dhcpIpaddr,
        "dhcpStart": dhcpStart,
        "dhcpEnd": dhcpEnd
    };

    var url = LOCAL_HOST_IP + "changeDhcpCfg";
    $.ajax({
        url: url,
        dataType: "jsonp",
        data: { dhcpCfg: JSON.stringify(param) },
        async: false,
        cache: false,
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", getAuthHeader("GET"));
            xhr.setRequestHeader("Expires", "-1");
            xhr.setRequestHeader("Cache-Control", "no-store, no-cache, must-revalidate");
            xhr.setRequestHeader("Pragma", "no-cache");
        },
        success: function (content) {
            var obj = content;
            console.log("state " + JSON.stringify(obj));
            var state = obj.state;
            if (state === 1) {
                alert(I18N("j", "zRebootIntroduce"));
                logOut();
            } else {
                alert(I18N("j", "setFail"));
            }
        },
        complete: function(XMLHttpRequest, state) {
            window.location.href = "http://" + dhcpIpaddr;
        }
    });
}

//DHCP页面取消
function dhcpCancle() {
    stone_getXMLCfg("lan", setDhcpValue);
}

//获取升级页面数据回调
var newVersion = "";
var sha256sum = "";
var downloadAddr = "";
function getUploadValue(content) {
    var xml = content;
    console.log("getUploadValue xml:", xml);

    if (xml.state == 0) {
        document.getElementById("suLatestVersion").innerHTML = I18N("j", "suLatestVersion");
        document.getElementById("button_detectVersion").style.display = "block";
        document.getElementById("button_onLineUpdate").style.display = "none";
        alert(I18N("j", "suLatestVersion"));
    } else if (xml.state == 2) {
        document.getElementById("suLatestVersion").innerHTML = I18N("j", "suLatestVersion");
        document.getElementById("button_detectVersion").style.display = "block";
        document.getElementById("button_onLineUpdate").style.display = "none";
        alert(I18N("j", "updateLowBattery"));
    } else {
        document.getElementById("suLatestVersion").innerHTML = I18N("j", "suLatestVersion2");
        document.getElementById("button_detectVersion").style.display = "none";
        document.getElementById("button_onLineUpdate").style.display = "block";
        alert(I18N("j", "suLatestVersion2"));
    }

}

function onLineUpdate() {
    alert(I18N("j", "updating"));
    var updateParam =
    {
        "newVersion": newVersion,
        "downloadAddr": downloadAddr,
        "sha256sum": sha256sum
    };

    var url = LOCAL_HOST_IP + "onlineUpdate";
    $.ajax({
        url: url,
        dataType: "jsonp",
        data: { updateParam: JSON.stringify(updateParam) },
        async: false,
        cache: false,
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", getAuthHeader("GET"));
            xhr.setRequestHeader("Expires", "-1");
            xhr.setRequestHeader("Cache-Control", "no-store, no-cache, must-revalidate");
            xhr.setRequestHeader("Pragma", "no-cache");
        },
        success: function (content) {
            var obj = content;
            console.log("state " + JSON.stringify(obj));
            var state = obj.state;
            if (state === 1) {
                alert(I18N("j", "updateSuccess"));
                logOut();
            } else {
                alert(I18N("j", "updateFail"));
            }
        }
    });
}

//获取路由器页面信息回调
function setRouterValue(content) {
    var xml = content;
    console.log("sysinfo xml:", xml);

    var basicDeviceModel = $(xml).find("devicemodel").text();
    var basicDeviceSn = $(xml).find("serialnumber").text();
    var basicSwVersion = $(xml).find("swersion").text();
    var basicHwVersion = $(xml).find("hwversion").text();
    var basicImei = $(xml).find("imei").text();
    var ipv4Mac = $(xml).find("ipv4mac").text();
    var ipv4RouterIp = $(xml).find("ipv4address").text();
    var ipv4NetMask = $(xml).find("ipv4mask").text();
    var ipv6LinkLocalAddr = $(xml).find("ipv6linklocal").text();
    var ipv6RouterIp = $(xml).find("ipv6address").text();
    var systemUpTime = $(xml).find("runningtime").text();
    var systemBuildTime = $(xml).find("buildtime").text();
    var systemCpuUsage = $(xml).find("cpu").text();
    var systemFreeMem = (parseInt($(xml).find("availablememory").text()) / 1024).toFixed(0);
    var systemTotalMem = (parseInt($(xml).find("totalmemory").text()) / 1024).toFixed(0);
    var suUpdateTime = I18N("j", "suUpdateVersion") + basicSwVersion + "  " + systemBuildTime + " " + I18N("j", "suUpdate");
    if (basicImei === "" || basicImei === "Not Available") {
        basicImei = "898622196000001" //imei必须加入后台白名单
    }
    swVersion = basicSwVersion;

    setLabelValue("router_deviceModel", basicDeviceModel);
    setLabelValue("router_deviceSn", basicDeviceSn);
    setLabelValue("router_swVersion", basicSwVersion);
    setLabelValue("router_hwVersion", basicHwVersion);
    setLabelValue("router_imei", basicImei);
    setLabelValue("ipv4_mac", ipv4Mac);
    setLabelValue("ipv4_routerIp", ipv4RouterIp);
    setLabelValue("ipv4_netMask", ipv4NetMask);
    setLabelValue("ipv6_linkLocalAddr", ipv6LinkLocalAddr);
    setLabelValue("ipv6_routerIp", ipv6RouterIp);
    setLabelValue("system_upTIme", systemUpTime);
    setLabelValue("system_buildTime", systemBuildTime);
    setLabelValue("system_cpuUsage", systemCpuUsage + "%");
    setLabelValue("system_freeMem", systemFreeMem + "MB");
    setLabelValue("system_totalMem", systemTotalMem + "MB");
    setLabelValue("suUpdateTime", suUpdateTime);
}

function rebootOK_callback(content) {
    alert(I18N("j", "rebootSuccess"));
}

function powerOffOK_callback(content) {
    alert(I18N("j", "poweroffSuccess"));
    logOut();
}

function OnRebootOK() {
    console.log("OnRebootOK");

    if (confirm(I18N("j", "confirmLAN"))) {
        stone_getXMLCfg("reset", rebootOK_callback);
    }
}

function PowerOffOK() {
    console.log("PowerOffOK");

    if (confirm(I18N("j", "confirmShut"))) {
        stone_getXMLCfg("power_off", powerOffOK_callback);
    }
}

//重启设备弹窗确认修改
function confirmRecovery() {
    if (confirm(I18N("j", "confirmRecovery"))) {
        OnRecoveryOK();
        return true;
    }
    return false;
}

//恢复出厂设置回调
function recovery_callback(content) {
    alert(I18N("j", "setSuccess"));
    logOut();
}

function OnRecoveryOK() {
    stone_getXMLCfg("recovery_system", recovery_callback);
}

//上传升级包文件
function local_update(content) {
    var uploadFile = document.getElementById("btcheckupdateslocal");
    var xml = content;
    console.log("local update xml:", xml);

    if (uploadFile.value === "") {
        alert(I18N("j", "selectFile"));
    } else if (xml.state == 2) {
        alert(I18N("j", "updateLowBattery"));
    } else if (uploadFile.files[0].size > 1024 * 1024 && uploadFile.files[0].size < (100 * 1024 * 1024)) {
        try {
            if (window.FileReader) {
                var fReader = new FileReader();
                var xhreq = createHttpRequest();
                xhreq.onreadystatechange = function () {
                    if (xhreq.readyState === 4) {
                        if (xhreq.status === 200) {
                            alert(I18N("j", "setSuccess"));
                            document.getElementById("btcheckupdateslocal").value = "";
                            document.getElementById("update_filename").innerHTML = I18N("j", "updateFilename");
                            //logOut();
                        } else {
                            alert(I18N("j", "setFail"));
                        }
                    }
                }
                fReader.onload = function (e) {
                    xhreq.open("POST", "/jsonp_otaUpdate", true);
                    xhreq.setRequestHeader("Content-type", "application/octet-stream");
                    xhreq.setRequestHeader("uploadfile_name", encodeURI(uploadFile.files[0].name));
                    xhreq.send(this.result);
                }
                fReader.readAsArrayBuffer(uploadFile.files[0]);
            } else {
                alert(I18N("j", "supportFile"));
            }
        } catch (e) {
            alert(I18N("j", "loadFail"));
        }
    } else {
        alert(I18N("j", "fileSize"));
    }
}

function localupdateStarted() {
    stone_getXMLCfg("otaUpdate", local_update);
}

function createHttpRequest() {
    var xmlHttp = null;
    try {
        xmlHttp = new XMLHttpRequest();
    } catch (e) {
        try {
            xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            try {
                xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e) {
                alert(I18N("j", "noAjax"));
            }
        }
    }
    return xmlHttp;
}

function getFileName() {
    var filename = document.getElementById("btcheckupdateslocal").value;
    if (filename === undefined || filename === "") {
        document.getElementById("update_filename").innerHTML = "点击此处上传文件";
    } else {
        var fn = filename.substring(filename.lastIndexOf("\\") + 1);
        document.getElementById("update_filename").innerHTML = fn; //将截取后的文件名填充到span中
    }
}

//获取系统日志状态回调
function systemLogGet(content) {
    var xml = content;

    if (xml['status'] === 1) {
        document.getElementById("system_log_status").checked = true;
    } else {
        document.getElementById("system_log_status").checked = false;
    }
}

function systemLogSet() {
    var status;
    if ($('#system_log_status').is(':checked')) {
        status = 1
    } else {
        status = 0
    }

    var logSet = {
        "status": status
    }

    var url = LOCAL_HOST_IP + "systemLogSet";
    $.ajax({
        url: url,
        dataType: "jsonp",
        data: { logSet: JSON.stringify(logSet) },
        async: false,
        cache: false,
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", getAuthHeader("GET"));
            xhr.setRequestHeader("Expires", "-1");
            xhr.setRequestHeader("Cache-Control", "no-store, no-cache, must-revalidate");
            xhr.setRequestHeader("Pragma", "no-cache");
        },
        success: function (content) {
            var obj = content;
            console.log("state " + JSON.stringify(obj));
            var state = obj.state;
            console.log("state " + state);
            if (state === 1) {
                alert(I18N("j", "setSuccess"));
            } else {
                alert(I18N("j", "setFail"));
            }
        }
    });
}

var ntp_zone_index = 4;

function ntp_entry(name, value) {
    this.name = name;
    this.value = value;
}

function setTimeZone(field, value) {
    field.selectedIndex = 4;
    for (i = 0; i < field.options.length; i++) {
        if (field.options[i].value == value) {
            field.options[i].selected = true;
            break;
        }
    }

}

var is_update=0;
var portIndexOpen;
var port_table_data;
var select_index = 0;
var setStatus = false;

function addPort(index){
    let table = document.getElementById("PortListTable");
    let rows = table.rows.length;
    if (rows > 10) {
        alert(I18N("j", "portLongToast"));
        return;
    }

    if (index >= 0) {
        $('#input_exter').val(port_table_data[index].ex_port);
        $('#input_inter').val(port_table_data[index].int_port);
        $('#input_ip').val(port_table_data[index].int_ip);
    }

    portIndexOpen = layer.open({
        type: 1,
        title: [I18N("j", "sidPort"),'font-size: 21px;font-weight:550;padding: 0px;text-align: center;'],
        area: ['660px', '400px'], //宽高
        offset:'150px',
        content: $('#add_port'), //这里content是一个DOM，注意：最好该元素要存放在body最外层，否则可能被其它的相对元素所影响
        cancel: function(){
            document.getElementById("add_port").style.display = "none";
        }
    });
}

function setPortInfo(){
    console.log("setPortInfo");

    var mprotocol = $('#protocolSelect').val();
    var mexport = $('#input_exter').val();
    var mintport = $('#input_inter').val();
    var mintip = $('#input_ip').val();
    var send_proto=null;

    if(mprotocol==0){
        send_proto="tcp";
    }else{
        send_proto="udp";
    }

    if (!isIPv4(mintip)) {
        alert(I18N("j", "portIpError"));
        setStatus = false;
        return false;
    }
    if (!isNumber(mexport) || !isNumber(mintport)) {
        alert(I18N("j", "portNumberError"));
        setStatus = false;
        return false;
    }
    setStatus = true;

    var portParam = {
        "mprotocol": send_proto,
        "mexport": mexport,
        "mintport": mintport,
        "mintip": mintip,
    }

    var url = LOCAL_HOST_IP + "setPortInfo";
    $.ajax({
        url: url,
        dataType: "jsonp",
        data: { portParam: JSON.stringify(portParam) },
        async: false,
        cache: false,
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", getAuthHeader("GET"));
            xhr.setRequestHeader("Expires", "-1");
            xhr.setRequestHeader("Cache-Control", "no-store, no-cache, must-revalidate");
            xhr.setRequestHeader("Pragma", "no-cache");
        },
        success: function (content) {
            console.log("issucess state " + content);
            var obj = content;
            console.log("state " + JSON.stringify(obj));
            var state = obj.state;
            console.log("state " + state);
            if (state === 1) {
                alert(I18N("j", "setSuccess"));
            } else {
                alert(I18N("j", "setFail"));
            }
        }
    });
}

function getPortInfo() {
    console.log("getPortINfo");
    stone_getXMLCfg("getPortInfo", port_callback);
}

function port_callback(data) {
    var xml = data;
    console.log("port_callback xml:", xml);
    //xml = JSON.parse('{"data":[{"order":"1","ex_port":"22","int_port":"80","int_ip":"192.168.1.1","protocol":"tcp","enable":"1"}]}');
    var arrayTableData = xml["data"];

    console.log("port_callback arrayTableData:", arrayTableData);
    var tableConnectedDevice = document.getElementById('PortListTable');
    var tBodytableConnectedDevice = tableConnectedDevice.getElementsByTagName('tbody')[0];

    var len=tableConnectedDevice.rows.length;
    console.log("port_callback table length:", len);
    while(len!=1){
        tableConnectedDevice.deleteRow(len-1);
        len--;
    }

    for (var i = 0; i < arrayTableData.length; i++)
    {
        var trow = getPortDataRow(arrayTableData[i], i); //定义一个方法,返回tr数据
        tBodytableConnectedDevice.appendChild(trow);
    }
}

function getPortDataRow(data, i) {
    var row = document.createElement('tr'); //创建行
    row.style = "background: #FFFFFF; height: 60px";
    console.log("getPortDataRow row:", i);
    console.log("getPortDataRow data:", data);
    var idCell = document.createElement('td'); //创建第一列id
    idCell.innerHTML = i + 1; //填充数据
    idCell.style = "text-align: center;width: 40px;";
    row.appendChild(idCell); //加入行  ，下面类似

    var ex_portCell = document.createElement('td');//创建第二列外部端口
    ex_portCell.innerHTML = data.ex_port;
    ex_portCell.style = "text-align: center;width: 130px;";
    row.appendChild(ex_portCell);

    var int_portCell = document.createElement('td');//创建第三列内部端口
    int_portCell.innerHTML = data.int_port;
    int_portCell.style = "text-align: center;width: 130px;";
    row.appendChild(int_portCell);

    var int_ipCell = document.createElement('td');//创建第四列内部IP
    int_ipCell.innerHTML = data.int_ip;
    int_ipCell.style = "text-align: center;width: 130px;";
    row.appendChild(int_ipCell);

    var protocolCell = document.createElement('td');//创建第五列协议
    protocolCell.innerHTML = data.protocol;
    protocolCell.style = "text-align: center;width: 94px;";
    row.appendChild(protocolCell);

    //var board = document.getElementById("board");
    var actionCell = document.createElement("td");
    //var btn1 = document.createElement("img");
    //btn1.type = "button";
    //btn1.value = "edit";
    //btn1.src="../images/mobile/icon_edit.png"
    //    btn1.onclick=updatePortClick;
    var btn2 = document.createElement("img");
    btn2.type = "button";
    btn2.value = "delete";
    btn2.style = "margin-left:10px";
    btn2.src="../images/mobile/icon_delete.png"
        btn2.onclick=deletPortClick;

    //var object = actionCell.appendChild(btn1);
    var object2 = actionCell.appendChild(btn2);
    actionCell.style = "text-align: center;width: 110px";
    row.appendChild(actionCell);
    return row;
}

function updatePortClick(){
    port_table_click();
    console.log("btn1click");
    var curindex = select_index - 1;
    is_update=1;
    console.log("curindex="+curindex);
    addPort(curindex);
}

function deletPortClick(){
    port_table_click();
    var curindex = select_index-1;
    if(curindex<=0){
        curindex=0;
    }

    var deleParam = {
        "dele_index": curindex,
    }

    var url = LOCAL_HOST_IP + "delePortInfo";
    $.ajax({
        url: url,
        dataType: "jsonp",
        data: { deleParam: JSON.stringify(deleParam) },
        async: false,
        cache: false,
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", getAuthHeader("GET"));
            xhr.setRequestHeader("Expires", "-1");
            xhr.setRequestHeader("Cache-Control", "no-store, no-cache, must-revalidate");
            xhr.setRequestHeader("Pragma", "no-cache");
        },
        success: function (content) {
            console.log("issucess state " + content);
            var obj = content;
            console.log("state " + JSON.stringify(obj));
            var state = obj.state;
            console.log("state " + state);
            if (state === 1) {
                alert(I18N("j", "setSuccess"));
            } else {
                alert(I18N("j", "setFail"));
            }
        }
    });

    layer.close(portIndexOpen);
    document.getElementById("add_port").style.display = "none";
    stone_getXMLCfg("getPortInfo", port_callback);
}

function port_table_click(){
    var td = event.srcElement;
    var line=td.parentElement.parentElement.rowIndex;
    var index=td.parentElement.cellIndex;
    console.log("port_table_click:"+line+"/"+index);
    select_index=line;
}

function updatePortInfo(){
    console.log("updatePortInfo");
    var mexport = $('#input_exter').val();
    var mintport = $('#input_inter').val();
    var mintip = $('#input_ip').val();
    var send_proto=null;
    var curindex=select_index-1;
    if(curindex<0){
        curindex=0;
    }

    if (!isIPv4(mintip)) {
        alert(I18N("j", "portIpError"));
        setStatus = false;
        return false;
    }
    if (!isNumber(mexport) || !isNumber(mintport)) {
        alert(I18N("j", "portNumberError"));
        setStatus = false;
        return false;
    }
    setStatus = true;
    return true;
}

function cancelPort(){
    layer.close(portIndexOpen);
    document.getElementById("add_port").style.display = "none";
    is_update = 0;
    stone_getXMLCfg("getPortInfo", port_callback);
}

function okPort(){
    if(is_update == 1){
        updatePortInfo();
    } else {
        setPortInfo();
    }
    is_update = 0;
    if (setStatus) {
        layer.close(portIndexOpen);
        document.getElementById("add_port").style.display = "none";
    }
    stone_getXMLCfg("getPortInfo", port_callback);
}
