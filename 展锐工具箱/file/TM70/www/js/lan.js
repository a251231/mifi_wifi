function checkLanMenuIcon (menuName) {
    document.getElementById("lan_menu_dhcp").className = "settings_menu_normal";
    document.getElementById("lan_menu_ip_filter").className = "settings_menu_normal";
    document.getElementById("lan_menu_VPN").className = "settings_menu_normal";
    document.getElementById("lan_menu_qos").className = "settings_menu_normal";
    document.getElementById("lan_menu_port_forward").className = "settings_menu_normal";
    document.getElementById("lan_menu_port_map").className = "settings_menu_normal";

    document.getElementById("text_menu_lan").className = "settings_menu_text_normal";
    document.getElementById("text_menu_ip_filter").className = "settings_menu_text_normal";
    document.getElementById("text_menu_vpn").className = "settings_menu_text_normal";
    document.getElementById("text_menu_qos").className = "settings_menu_text_normal";
    document.getElementById("text_menu_port_forward").className = "settings_menu_text_normal";
    document.getElementById("text_menu_port_map").className = "settings_menu_text_normal";

    hideLanRight();

    switch (menuName) {
        case "lan_menu_dhcp" :
            document.getElementById("lan_menu_dhcp").className = "settings_menu_select";
            document.getElementById("text_menu_lan").className = "settings_menu_text_select";
            document.getElementById("lan_basic").style.display = "block";
            mm_getXMLCfg("lan", setDhcpValue);
            break;
        case "lan_menu_ip_filter" :
            document.getElementById("lan_menu_ip_filter").className = "settings_menu_select";
            document.getElementById("text_menu_ip_filter").className = "settings_menu_text_select";
            document.getElementById("lan_ip_filter").style.display = "block";
            // mm_getXMLCfg("macfilterslist", macFilterGet);
            break;
        case "lan_menu_VPN" :
            document.getElementById("lan_menu_VPN").className = "settings_menu_select";
            document.getElementById("text_menu_vpn").className = "settings_menu_text_select";
            document.getElementById("lan_VPN").style.display = "block";
            // mm_getXMLCfg("getWpsConfig", setWpsValue);
            break;
        case "lan_menu_qos" :
            document.getElementById("lan_menu_qos").className = "settings_menu_select";
            document.getElementById("text_menu_qos").className = "settings_menu_text_select";
            document.getElementById("lan_qos").style.display = "block";
            // 获取后端接口请求
            // mm_getXMLCfg("getTimeOff", setWpsValue);
            break;
        case "lan_menu_port_forward" :
            document.getElementById("lan_menu_port_forward").className = "settings_menu_select";
            document.getElementById("text_menu_port_forward").className = "settings_menu_text_select";
            document.getElementById("lan_port_forward").style.display = "block";
            // mm_getXMLCfg("getWpsConfig", setWpsValue);
            break;
        case "lan_menu_port_map" :
            document.getElementById("lan_menu_port_map").className = "settings_menu_select";
            document.getElementById("text_menu_port_map").className = "settings_menu_text_select";
            document.getElementById("lan_port_map").style.display = "block";
            // mm_getXMLCfg("getWpsConfig", setWpsValue);
            break;

    }
}

function hideLanRight () {
    document.getElementById("lan_basic").style.display = "none";
    document.getElementById("lan_ip_filter").style.display = "none";
    document.getElementById("lan_VPN").style.display = "none";
    document.getElementById("lan_qos").style.display = "none";
    document.getElementById("lan_port_forward").style.display = "none";
    document.getElementById("lan_port_map").style.display = "none";
}