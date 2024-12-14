function checkWifiMenuIcon(menuName) {
    document.getElementById("wifi_menu_basic").className = "settings_menu_normal";
    document.getElementById("wifi_menu_access_control").className = "settings_menu_normal";
    document.getElementById("wifi_menu_WPS").className = "settings_menu_normal";
    // document.getElementById("wifi_menu_time_off").className = "settings_menu_normal";
    document.getElementById("wifi_menu_visitor").className = "settings_menu_normal";

    document.getElementById("wifi_text_basic").className = "settings_menu_text_normal";
    document.getElementById("wifi_text_access_control").className = "settings_menu_text_normal";
    document.getElementById("wifi_text_WPS").className = "settings_menu_text_normal";
    // document.getElementById("wifi_text_time_off").className = "settings_menu_text_normal";
    document.getElementById("wifi_text_visitor").className = "settings_menu_text_normal";
    switch (menuName) {
        case "wifi_menu_basic":
            document.getElementById("wifi_menu_basic").className = "settings_menu_select";
            document.getElementById("wifi_text_basic").className = "settings_menu_text_select";
            hideWifiRight();
            document.getElementById("wifi_basic").style.display = "block";
            if (DISPLAY_WIFI_2G == "block") {
                $.ajax({
                    type: "GET",
                    'beforeSend': function (xhr) {
                        xhr.setRequestHeader("Authorization", getAuthHeader("GET"));
                    },
                    url: LOCAL_HOST_IP + 'jsonp_24g_wifi_info',
                    dataType: "jsonp",
                    data: { act_mode: SWITCH_WIFI_2G },
                    async: false,
                    success: function (data) {
                        $("#wifi_psd2G").val("");
                        setWifiInfo(data, 0);
                    }
                });
            }
            if (DISPLAY_WIFI_5G == "block") {
                $.ajax({
                    type: "GET",
                    'beforeSend': function (xhr) {
                        xhr.setRequestHeader("Authorization", getAuthHeader("GET"));
                    },
                    url: LOCAL_HOST_IP + 'jsonp_5g_wifi_info',
                    dataType: "jsonp",
                    data: { act_mode: SWITCH_WIFI_5G },
                    async: false,
                    success: function (data) {
                        $("#wifi_psd5G").val("");
                        setWifiInfo(data, 1);
                    }
                });
            }
            break;
        case "wifi_menu_access_control":
            document.getElementById("wifi_menu_access_control").className = "settings_menu_select";
            document.getElementById("wifi_text_access_control").className = "settings_menu_text_select";
            hideWifiRight();
            document.getElementById("wifi_access_control").style.display = "block";

            var wifi_type = 0;
            if (DISPLAY_WIFI_2G == "block" && DISPLAY_WIFI_5G == "block") {
                wifi_type = 2;
            } else if (DISPLAY_WIFI_5G == "block") {
                wifi_type = 1;
            } else {
                wifi_type = 0;
            }
            $.ajax({
                type: "GET",
                'beforeSend': function (xhr) {
                    xhr.setRequestHeader("Authorization", getAuthHeader("GET"));
                },
                url: LOCAL_HOST_IP + 'jsonp_macfilterslist',
                dataType: "jsonp",
                data: { wifi_type: wifi_type },
                async: false,
                success: function (data) {
                    macFilterGet(data);
                }
            });
            break;
        case "wifi_menu_WPS":
            document.getElementById("wifi_menu_WPS").className = "settings_menu_select";
            document.getElementById("wifi_text_WPS").className = "settings_menu_text_select";
            hideWifiRight();
            document.getElementById("wifi_WPS").style.display = "block";
            $.ajax({
                type: "GET",
                'beforeSend': function (xhr) {
                    xhr.setRequestHeader("Authorization", getAuthHeader("GET"));
                },
                url: LOCAL_HOST_IP + 'jsonp_wps_info',
                dataType: "jsonp",
                async: false,
                success: function (data) {
                    setWpsValue(data);
                }
            });
            break;
        case "wifi_menu_time_off":
            document.getElementById("wifi_menu_time_off").className = "settings_menu_select";
            document.getElementById("wifi_text_time_off").className = "settings_menu_text_select";
            hideWifiRight();
            document.getElementById("wifi_time_off").style.display = "block";
            // 获取后端接口请求
            // stone_getXMLCfg("getTimeOff", setWpsValue);
            break;
        case "wifi_menu_visitor":
            document.getElementById("wifi_menu_visitor").className = "settings_menu_select";
            document.getElementById("wifi_text_visitor").className = "settings_menu_text_select";
            hideWifiRight();
            document.getElementById("wifi_visitor").style.display = "block";
            // stone_getXMLCfg("getWpsConfig", setWpsValue);
            break;

    }
}

function hideWifiRight() {
    document.getElementById("wifi_basic").style.display = "none";
    document.getElementById("wifi_access_control").style.display = "none";
    document.getElementById("wifi_WPS").style.display = "none";
    document.getElementById("wifi_time_off").style.display = "none";
    document.getElementById("wifi_visitor").style.display = "none";
}

var show2G = false
function show2GPassword() {
    if (show2G) {
        document.getElementById("wifi_psd2G").type = "password";
        document.getElementById("show2GPassword").src = "../images/login/login_password_no.png";
        show2G = false;
    } else {
        document.getElementById("wifi_psd2G").type = "text";
        document.getElementById("show2GPassword").src = "../images/login/login_password_yes.png";
        show2G = true;
    }
}

var show5G = false
function show5GPassword() {
    if (show5G) {
        document.getElementById("wifi_psd5G").type = "password";
        document.getElementById("show5GPassword").src = "../images/login/login_password_no.png";
        show5G = false;
    } else {
        document.getElementById("wifi_psd5G").type = "text";
        document.getElementById("show5GPassword").src = "../images/login/login_password_yes.png";
        show5G = true;
    }
}

function visitorOpen(e) {
    if (e.checked == true) {
        document.getElementById("wifi_visitor_open").style.display = "block";
    } else {
        document.getElementById("wifi_visitor_open").style.display = "none";
    }
}

var xml_psd2G = "";
var xml_psd5G = "";
function getTmpData2G(content) {
    xml_psd2G = content;
}
function getTmpData5G(content) {
    xml_psd5G = content;
}

function securityChange(index) {
    if (index == 1) {
        if ($('#wifi_safety_strategy2G').val() == 0) {
            $("#wifi_psd2G").val("");
            $("#wifi_psd2G").attr("disabled", "disabled");
            $("#wifi_psd2G").css("background-color", "#e6e6e6");
        } else {
            var wifiPasswd2G = $(xml_psd2G).find("wifi24GPassword").text();
            $("#wifi_psd2G").val(wifiPasswd2G);
            $("#wifi_psd2G").removeAttr("disabled");
            $("#wifi_psd2G").css("background-color", "");
        }
    }
    if (index == 2) {
        if ($('#wifi_safety_strategy5G').val() == 0) {
            $("#wifi_psd5G").val("");
            $("#wifi_psd5G").attr("disabled", "disabled");
            $("#wifi_psd5G").css("background-color", "#e6e6e6");
        } else {
            var wifiPasswd5G = $(xml_psd5G).find("wifi5GPassword").text();
            $("#wifi_psd5G").val(wifiPasswd5G);
            $("#wifi_psd5G").removeAttr("disabled");
            $("#wifi_psd5G").css("background-color", "");
        }
    }
}
