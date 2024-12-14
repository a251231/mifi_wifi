var devEnv = 0;
var LOCAL_HOST_IP = "";
/* This function sends xmldata as a string to thr server by
 * using ajax post call.
 * parameters are XML Name and xml Data as as string.
 * on success it returns the respoce XML which is call posted
 */
function postXML(xmlName, xmlData, timeOutInterval, bHideWaitBox) {
    //document.getElementById("loadingdivimage").style.display = "block";
    if (undefined == bHideWaitBox) {
        bHideWaitBox = false;
    }
    if (timeOutInterval == undefined) {
        timeOutInterval = 360000;
    }
    if (xmlName != "locale" && !bHideWaitBox) {
        sm("PleaseWait", 150, 100);
        $("#lPleaseWait").text(jQuery.i18n.prop("h1PleaseWait"));
    }
    resetInterval();
    var url = "";
    var host = window.location.protocol + "//" + window.location.host + "/";
    url = host + 'xml_action.cgi?method=set&module=duster&file=' + xmlName;
    if (devEnv == "1") {
        alert(xmlData);
    }
    $.ajax({
        type: "POST",
        'beforeSend': function (xhr) {
            xhr.setRequestHeader("Authorization", getAuthHeader("POST"))
        },
        url: url,
        processData: false,
        data: xmlData,
        async: true,
        dataType: "xml",
        timeout: timeOutInterval,
        success: function (data, textStatus) {
            if (xmlName != "locale" && !bHideWaitBox) {
                hm();
            }

            if ($(data).find("login_status").text() == "UNAUTHORIZED") {
                clearAuthheader();
            }
        },
        complete: function (XMLHttpRequest, textStatus) {
            if (xmlName != "locale" && !bHideWaitBox) {
                hm();
            }
            if (null == g_InternetConnectionObj && null == g_PrimaryNetworkObj) {
                g_objContent.onPostSuccess();
            }

        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            if (xmlName != "locale" && !bHideWaitBox) {
                hm();
            }
            // alert("In Error:" + textStatus);
            if (textStatus != "timeout") {
                showAlert(jQuery.i18n.prop('lErrorPost'));
            }
            else {
                showAlert(jQuery.i18n.prop('lErrorTimeOut'));
            }
        }
    });

    return true;
}


function PostSyncXMLEx(xmlName, xmlData, callbackFun) {
    var host = window.location.protocol + "//" + window.location.host + "/";
    var url = host + 'xml_action.cgi?method=set&module=duster&file=' + xmlName;
    resetInterval();
    $.ajax({
        type: "POST",
        'beforeSend': function (xhr) {
            xhr.setRequestHeader("Authorization", getAuthHeader("POST"))
        },
        complete: function (XMLHttpRequest, textStatus) {
            hm();
            if (callbackFun) {
                callbackFun();
            }
        },
        url: url,
        dataType: "xml",
        timeout: 60000,
        data: xmlData,
        async: false
    });
}

function webdav_postXML(xmlName, xmlData, timeOutInterval) {
    //document.getElementById("loadingdivimage").style.display = "block";
    if (timeOutInterval == undefined) {
        timeOutInterval = 360000;
    }
    //if(xmlName != "locale") {
    //    sm("PleaseWait",150,100);
    //     $("#lPleaseWait").text(jQuery.i18n.prop("h1PleaseWait"));
    // }
    resetInterval();
    var url = "";
    var host = window.location.protocol + "//" + window.location.host + "/";
    url = host + 'xml_action.cgi?method=set&module=duster&file=' + xmlName;
    if (devEnv == "1") {
        alert(xmlData);
    }
    $.ajax({
        type: "POST",
        'beforeSend': function (xhr) {
            xhr.setRequestHeader("Authorization", getAuthHeader("POST"))
        },
        url: url,
        processData: false,
        data: xmlData,
        async: true,
        dataType: "xml",
        timeout: timeOutInterval,
        success: function (data, textStatus) {
            showAlert(jQuery.i18n.prop("lsharesettingresultsuc"));
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            if (XMLHttpRequest.status == 200) {
                showAlert(jQuery.i18n.prop("lsharesettingresultsuc"));
            } else {
                showAlert(jQuery.i18n.prop("lsharesettingresultsuc"));
            }
        }
    });

    return true;
}

function postXMLEx(xmlName, xmlData, timeOutInterval, queryFun) {
    if (timeOutInterval == undefined) {
        timeOutInterval = 360000;
    }

    sm("PleaseWait", 150, 100);
    $("#lPleaseWait").text(jQuery.i18n.prop("h1PleaseWait"));

    resetInterval();
    var url = "";
    var host = window.location.protocol + "//" + window.location.host + "/";
    url = host + 'xml_action.cgi?method=set&module=duster&file=' + xmlName;

    $.ajax({
        type: "POST",
        'beforeSend': function (xhr) {
            xhr.setRequestHeader("Authorization", getAuthHeader("POST"))
        },
        url: url,
        processData: false,
        data: xmlData,
        async: true,
        dataType: "xml",
        timeout: timeOutInterval,
        success: function (data, textStatus) {
            if ($(data).find("login_status").text() == "UNAUTHORIZED") {
                clearAuthheader();
            }
        },
        complete: function (XMLHttpRequest, textStatus) {
            hm();
            setTimeout(queryFun, 5000);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            hm();
            bIsScanNetwork = false;
            if (textStatus != "timeout") {
                showAlert(jQuery.i18n.prop('lScanNetworkError'));
            }
            else {
                showAlert(jQuery.i18n.prop('lScanNetworkTimeOut'));
            }
        }
    });

    return true;
}

function postXMLTimeset(xmlName, xmlData, timeOutInterval, queryFun) {
    if (timeOutInterval == undefined) {
        timeOutInterval = 360000;
    }

    sm("PleaseWait", 150, 100);
    $("#lPleaseWait").text(jQuery.i18n.prop("h1PleaseWait"));

    resetInterval();
    var url = "";
    var host = window.location.protocol + "//" + window.location.host + "/";
    url = host + 'xml_action.cgi?method=set&module=duster&file=' + xmlName;

    $.ajax({
        type: "POST",
        'beforeSend': function (xhr) {
            xhr.setRequestHeader("Authorization", getAuthHeader("POST"))
        },
        url: url,
        processData: false,
        data: xmlData,
        async: true,
        dataType: "xml",
        timeout: timeOutInterval,
        complete: function (XMLHttpRequest, textStatus) {
            hm();
            setTimeout(queryFun, 500);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            hm();
            if (textStatus != "timeout") {
                showAlert(jQuery.i18n.prop('pFailedcompleteupdateTime'));
            }
            else {
                showAlert(jQuery.i18n.prop('pUpdateTimeOut'));
            }
        }
    });
    return true;
}



function postXMLlocale(xmlName, xmlData, timeOutInterval) {
    //document.getElementById("loadingdivimage").style.display = "block";
    if (timeOutInterval == undefined) {
        timeOutInterval = 180000;
    }
    resetInterval();
    var url = "";
    var host = window.location.protocol + "//" + window.location.host + "/";
    url = host + 'xml_action.cgi?method=set&module=duster&file=' + xmlName;
    if (devEnv == "1") {
        alert(xmlData);
    }
    $.ajax({
        type: "POST",
        'beforeSend': function (xhr) {
            xhr.setRequestHeader("Authorization", getAuthHeader("POST"))
        },
        url: url,
        processData: false,
        data: xmlData,
        async: true,
        dataType: "xml",
        timeout: timeOutInterval,
        success: function (data, textStatus) {
            if ($(data).find("login_status").text() == "UNAUTHORIZED") {
                clearAuthheader();
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            if (textStatus != "timeout") {
                alert(jQuery.i18n.prop('lErrorPost'));
            }
            else {
                alert(jQuery.i18n.prop('lErrorTimeOut'));
            }
        }
    });

    return true;
}

function postLogout() {

    clearInterval(_batteryIntervalID);

    clearAuthheader();
    self.location.href = "../index.html";

    // var url = "";
    // var host = window.location.protocol + "//" + window.location.host + "/";
    // url = host + 'xml_action.cgi?Action=logout';
    // $.ajax({
    //     "cache": false,
    //     "url": "../index.html",
    //     "type": "POST",
    //     "error": function () {
    //         clearAuthheader();
    //         self.location.href = "../index.html";
    //     },
    //     "success": function () {
    //         clearAuthheader();
    //         self.location.href = "../index.html";
    //     }
    // });

    // return true;
}
/* This function  returns HTML contect as a text to caller
 * Parameter is htmlpath path where the HTML file is Located
 * Returns RespoceText
 */
function callProductHTML(htmlName) {
    //setTimeout ( "calculateAuthheader()", 6);
    resetInterval();
    var content;
    var url = REMOTE_HOST_IP + htmlName;
    if (username == "admin") {
        content = $.ajax({
            type: "GET",
            url: url,
            dataType: "html",
            timeout: 30000,
            async: false
        }).responseText;
    } else {
        content = $.ajax({
            type: "GET",
            'beforeSend': function (xhr) {
                xhr.setRequestHeader("Authorization", getAuthHeader("GET"))
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                if (null != g_objContent) {
                    g_objContent.onLoad(true);
                }
            },
            url: url,
            dataType: "html",
            timeout: 30000,
            async: false
        }).responseText;
    }

    if (content.indexOf("E7683FTEFTA8HT08HFH09") > 0) {
        clearAuthheader();
        return null;
    } else {
        return content;
    }
}


function GetNetworkScanRetXml() {
    resetInterval();
    url = window.location.protocol + "//" + window.location.host + "/xml_action.cgi?method=get&module=duster&file=wan";
    var content = $.ajax({
        type: "GET",
        'beforeSend': function (xhr) {
            xhr.setRequestHeader("Authorization", getAuthHeader("GET"))
        },
        url: url,
        dataType: "xml",
        error: function () {
            if (bIsScanNetwork) {
                setTimeout(QueryScanResult, 15000);
            }
        },
        async: false
    }).responseXML;


    if ($(content).find("login_status").text() == "UNAUTHORIZED") {
        clearAuthheader();
        return null;
    }

    localStorage.setItem('xmlName', '');

    return content;
}


/* This function get the XML from the server via ajax.
 *  Get is Method and return type is responceXML
 *
 */


function callProductXML(xmlName) {
    if (xmlName != "device_date") {
        resetInterval();
    }
    var url = "";
    var content;
    //var host = window.location.protocol + "//" + LOCAL_HOST_IP + "/";
    url = LOCAL_HOST_IP + 'jsonp_' + xmlName;
    //console.log("url 666666666666666666666666666666666666666 "+url);
    // alert(url);
    if (devEnv == "0") {
        $.ajax({
            type: "GET",
            'beforeSend': function (xhr) {
                xhr.setRequestHeader("Authorization", getAuthHeader("GET"))
            },
            url: url,
            dataType: "jsonp",
            async: false,
            success: function (data) {
                //var result = JSON.stringify(data); //json����ת���ַ���
                //$("#text").val(result);
                console.log(data);
                content = data;
            }
        }); //.responseText;
    } else {
        xmlName = "xml/" + xmlName + ".xml";
        console.log("url xmlName " + xmlName);
        content = $.ajax({
            type: "GET",
            url: xmlName,
            dataType: "xml",
            contentType: "text/xml;charset=UTF-8",
            async: false
        }); //.responseXML;
    }
    // var xmlobj = JSON.parse(content);
    /*    var login_text  = $(content).find("m__ip").text();
       // console.log("6666666666666666666---login_text---->"+login_text);
        if(login_text == "UNAUTHORIZED") {
            clearAuthheader();
            return null;
        }*/
    //console.log("6666666666666666666---content---->"+content);
    if ("KICKOFF" == $(content).find("login_status").text()) {
        showAlert(jQuery.i18n.prop("lKickOffUser"));
        clearAuthheader();
        return null;
    }

    return content;
}


function stone_getXMLCfg(xmlName, callback) {

    if (xmlName != "device_date") {
        resetInterval();
    }
    var url = "";
    url = LOCAL_HOST_IP + 'jsonp_' + xmlName;

    $.ajax({
        type: "GET",
        'beforeSend': function (xhr) {
            xhr.setRequestHeader("Authorization", getAuthHeader("GET"));
        },
        url: url,
        dataType: "jsonp",
        async: false,
        success: function (data) {
            // console.log("stone_callProductXML:", data);
            callback(data);
        },
        error: function() {
            console.log("stone_getXMLCfg error");
            logOut();
        }
    });
}

function callProductXML_webdavshare(xmlName) {
    if (xmlName != "device_date") {
        resetInterval();
    }
    var url = "";
    var content;
    var host = window.location.protocol + "//" + window.location.host + "/";
    url = host + 'xml_action.cgi?method=get&module=duster&file=' + xmlName + Date.parse(new Date());
    // alert(url);
    if (devEnv == "0") {
        content = $.ajax({
            type: "GET",
            'beforeSend': function (xhr) {
                xhr.setRequestHeader("Authorization", getAuthHeader("GET"))
            },
            url: url,
            dataType: "xml",
            async: false
        }).responseXML;
    } else {
        xmlName = "xml/" + xmlName + ".xml";
        content = $.ajax({
            type: "GET",
            url: xmlName,
            dataType: "xml",
            contentType: "text/xml;charset=UTF-8",
            async: false
        }).responseXML;
    }
    var login_text = $(content).find("login_status").text();
    return content;
}

function PostXMLWithResponse(xmlName, xmlData, callbackFun) {
    sm("PleaseWait", 150, 100);
    $("#lPleaseWait").text(jQuery.i18n.prop("h1PleaseWait"));
    resetInterval();

    var host = window.location.protocol + "//" + window.location.host + "/";
    var url = host + 'xml_action.cgi?method=set&module=duster&file=' + xmlName;
    $.ajax({
        type: "POST",
        'beforeSend': function (xhr) {
            xhr.setRequestHeader("Authorization", getAuthHeader("POST"))
        },
        url: url,
        timeout: 360000,
        dataType: "xml",
        data: xmlData,
        async: true,
        success: function (data, textStatus) {
            if ($(data).find("login_status").text() == "UNAUTHORIZED") {
                clearAuthheader();
            }
            hm();
            if (null != callbackFun) {
                callbackFun(data);
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            if (textStatus != "timeout") {
                showAlert(jQuery.i18n.prop('lErrorPost'));
            }
            else {
                showAlert(jQuery.i18n.prop('lErrorTimeOut'));
            }
        }
    });

}

function GetSmsXML(xmlName) {
    var host = window.location.protocol + "//" + window.location.host + "/";
    var url = host + 'xml_action.cgi?method=get&module=duster&file=' + xmlName;
    resetInterval();

    var content = $.ajax({
        type: "GET",
        'beforeSend': function (xhr) {
            xhr.setRequestHeader("Authorization", getAuthHeader("GET"))
        },
        url: url,
        dataType: "xml",
        timeout: 60000,
        async: false
    }).responseXML;

    if ($(content).find("login_status").text() == "UNAUTHORIZED") {
        clearAuthheader();
        return null;
    }

    return content;
}


/* This method sets localization. It loads the Prpoerties file.
 * parameter are locale which is name of properties file
 * i.e. Message_en.properties is englist dict then parameter is en
 */
function setLocalization(locale) {

    if (locale != "en") {
        locale = "cn";
    }

    try {
        jQuery.i18n.properties({
            name: 'Messages',
            path: 'properties/',
            mode: 'map',
            language: locale,
            callback: function () { }
        });
    } catch (err) {
        var fileref = document.createElement('script');
        fileref.setAttribute("type", "text/javascript");
        fileref.setAttribute("src", 'js/jquery/jquery.i18n.properties-1.0.4.js?webroot=true');
        document.getElementsByTagName("head")[0].appendChild(fileref);
        setLocalization(locale);
    }
}
/*
 * API used for url authentication digest checking.. it send url to server and
 * give responce to caller
 */
function authentication(url) {
    if (devEnv == '1') {
        return "200 OK";
    }
    var content = $.ajax({
        url: url,
        dataType: "text/html",
        async: false,
        cache: false,
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", getAuthHeader("GET"));
            xhr.setRequestHeader("Expires", "-1");
            xhr.setRequestHeader("Cache-Control", "no-store, no-cache, must-revalidate");
            xhr.setRequestHeader("Pragma", "no-cache");
        }
    }).responseText;
    return content;
}

function ibsAjax(url, data, callback, type) {
    $.post(url, (data == null ? {} : data), callback, (type == null ? "text" :
        type));
};

function getAuthType(url, username1, passwd) {


    /*   var xhr = new XMLHttpRequest();
       xhr.addEventListener("load", mkdirComplete, false);
       xhr.addEventListener("error", mkdirComplete, false);
       xhr.open("POST", ".");*/
    var param = "{username:" + username1 + ",password:" + passwd + "}";
    console.log("param " + param);
    var urlparam = "postlogin=" + param;

    ibsAjax(url, urlparam, function (data) {
        /*  var obj = eval('(' + data + ')');
          if (obj.m != null) {
              if ('fail' == obj.m) {//未登录
                  if('errorPwd'==obj.o.result)
                      alert("用户名或者密码错误");
                  else
                      alert("此用户名正在使用");
  
              } else {
                  window.location.href = "/ibs_frame/admin/index.jsp";
              }
          } else {
              alert("网络堵车...", "error");
              return;
          }*/
        console.log(data.target.statusText);
        var status = data.target.status;
        if (status == 200) {
            console.log("200..........................");
            //  refreshList(evt.target.responseText);
            return 1;
        } else {
            return 0;
            //  alert("password error");
        }
    }, null);

    /*  if(devEnv=='1') {
          return 'Digest realm="Highwmg", nonce="718337c309eacc5dc1d2558936225417", qop="auth" Content-Type: text/html Server: Lighttpd/1.4.19 Content-Length: 0 Date: Tue, 11 Oct 2005 10:44:32 GMT ';
      }
      var content = $.ajax( {
      url: url,
      type: "GET",
      dataType: "text/html",
      async:false,
      cache:false,
      beforeSend: function(xhr) {
              xhr.setRequestHeader("Expires", "-1");
              xhr.setRequestHeader("Cache-Control","no-store, no-cache, must-revalidate");
              xhr.setRequestHeader("Pragma", "no-cache");
          }
      }).getResponseHeader('WWW-Authenticate');
      return content;*/
}

function getVersionXML(xmlName) {
    var url = "";
    var content;
    var host = window.location.protocol + "//" + window.location.host + "/";
    url = host + xmlName;
    if (devEnv == '1') {
        xmlName = "xml/" + xmlName;

        content = $.ajax({
            url: xmlName,
            dataType: "text/html",
            async: false
        }).responseText;
    } else {
        content = $.ajax({
            url: url,
            dataType: "text/html",
            async: false
        }).responseText;
    }
    return content;
}

function getLastLoginXML(xmlName) {
    var url = "";
    var content;
    var host = window.location.protocol + "//" + window.location.host + "/";
    url = host + xmlName;
    if (devEnv == '1') {
        xmlName = "xml/" + xmlName;

        content = $.ajax({
            url: xmlName,
            dataType: "text/html",
            async: false
        }).responseText;
    } else {
        content = $.ajax({
            url: url,
            dataType: "text/html",
            async: false
        }).responseText;
    }
    return content;
}

function getTimeZoneData(xmlName) {
    resetInterval();
    var url = "";
    var content;
    var host = window.location.protocol + "//" + window.location.host + "/";
    url = host + "/data/" + xmlName;

    if (devEnv == "0") {
        content = $.ajax({
            type: "GET",
            'beforeSend': function (xhr) {
                xhr.setRequestHeader("Authorization", getAuthHeader("GET"))
            },
            url: url,
            dataType: "text/html",
            async: false
        }).responseXML;
    } else {
        xmlName = "xml/" + xmlName;

        content = $.ajax({
            type: "GET",
            url: xmlName,
            dataType: "text",
            async: false
        }).responseXML;

    }

    return content;
}

function callProductXMLNoDuster(xmlName) {
    resetInterval();
    var url = "";
    var content;
    var host = window.location.protocol + "//" + window.location.host + "/";
    url = host + 'xml_action.cgi?method=get&file=' + xmlName;
    //  alert(url);
    if (devEnv == "0") {
        content = $.ajax({
            type: "GET",
            'beforeSend': function (xhr) {
                xhr.setRequestHeader("Authorization", getAuthHeader("GET"))
            },
            url: url,
            dataType: "xml",
            async: false
        }).responseXML;
    } else {
        xmlName = "xml/" + xmlName + ".xml";
        content = $.ajax({
            type: "GET",
            'beforeSend': function (xhr) {
                xhr.setRequestHeader("Authorization", getAuthHeader("GET"))
            },
            url: xmlName,
            dataType: "xml",
            async: false
        }).responseXML;

    }
    return content;
}

function execCommand(file, command, sFunction) {
    resetInterval();
    var url = "";
    var host = window.location.protocol + "//" + window.location.host + "/";
    url = host + 'xml_action.cgi?method=get&file=' + file + "&command=" + command;
    if (devEnv == "1") {
        return url;
    }
    else {
        content = $.ajax({
            type: "GET",
            'beforeSend': function (xhr) {
                xhr.setRequestHeader("Authorization", getAuthHeader("GET"))
            },
            url: url,
            dataType: "xml",
            //            async:false,
            success: sFunction
        }).responseXML;
        return content;
    }
}



function PostSyncXML(xmlName, xmlData) {
    var host = window.location.protocol + "//" + window.location.host + "/";
    var url = host + 'xml_action.cgi?method=set&module=duster&file=' + xmlName;
    resetInterval();
    $.ajax({
        type: "POST",
        'beforeSend': function (xhr) {
            xhr.setRequestHeader("Authorization", getAuthHeader("POST"))
        },
        complete: function (XMLHttpRequest, textStatus) {
            hm();
        },
        url: url,
        dataType: "xml",
        timeout: 60000,
        data: xmlData,
        async: false
    });
}

function GetSyncXML(xmlName) {
    var host = window.location.protocol + "//" + window.location.host + "/";
    var url = host + 'xml_action.cgi?method=get&module=duster&file=' + xmlName;

    var content = $.ajax({
        type: "GET",
        'beforeSend': function (xhr) {
            xhr.setRequestHeader("Authorization", getAuthHeader("GET"))
        },
        url: url,
        dataType: "xml",
        timeout: 60000,
        async: false
    }).responseXML;


    if ($(content).find("login_status").text() == "UNAUTHORIZED") {
        clearAuthheader();
        return null;
    }

    return content;

}

function WebDav_PropfindSyncXML(xmlName, xmlData) {
    var host = window.location.protocol + "//" + window.location.host;
    var xmlNametemp = xmlName;
    var url = host + xmlNametemp;
    var content;
    //resetInterval();
    content = $.ajax({
        type: "PROPFIND",
        'beforeSend': function (xhr) {
            xhr.setRequestHeader("Authorization", webdav_getAuthHeader("PROPFIND"));
            xhr.setRequestHeader("Depth", "1");
        },
        url: url,
        dataType: "xml",
        contentType: "text/xml;charset=UTF-8",
        //timeout: 60000,
        data: xmlData,
        async: false
    }).responseText;

    //var login_text  = $(content).find("login_status").text();
    return content;

}

function WebDav_Options() {
    var host = window.location.protocol + "//" + window.location.host;
    var xmlNametemp = xmlName;
    var url = host + "/";
    var content;
    //resetInterval();
    content = $.ajax({
        type: "OPTIONS",
        'beforeSend': function (xhr) {
            xhr.setRequestHeader("Authorization", webdav_getAuthHeader("OPTIONS"));
        },
        url: url,
        dataType: "xml",
        contentType: "text/xml;charset=UTF-8",
        //timeout: 60000,
        //data: xmlData,
        async: false
    }).responseText;

    //var login_text  = $(content).find("login_status").text();
    return content;

}

function WebDav_Shared_PropfindSyncXML(xmlName, xmlData) {
    var host = window.location.protocol + "//" + window.location.host;
    var xmlNametemp = xmlName;
    var url = host + xmlNametemp;
    var content;
    //resetInterval();
    content = $.ajax({
        type: "PROPFIND",
        'beforeSend': function (xhr) {
            xhr.setRequestHeader("Depth", "1");
        },
        url: url,
        dataType: "xml",
        contentType: "text/xml;charset=UTF-8",
        //timeout: 60000,
        data: xmlData,
        async: false
    }).responseText;
    //var login_text  = $(content).find("login_status").text();
    return content;

}


function WebDav_GetSyncXML(xmlName, ContentType) {
    sm("PleaseWait", 150, 100);
    $("#lPleaseWait").text(jQuery.i18n.prop("h1PleaseWait"));

    var host = window.location.protocol + "//" + window.location.host;
    //var xmlNametemp=encodeURIComponent(xmlName);
    var xmlNametemp = xmlName;
    var url = host + xmlNametemp;
    var content;
    //resetInterval();
    content = $.ajax({
        type: "Get",
        'beforeSend': function (xhr) {
            xhr.setRequestHeader("Authorization", webdav_getAuthHeader("GET"));
            xhr.setRequestHeader("Content-Type", ContentType)
        },
        url: url,
        //dataType: "xml",
        //contentType: ContentType,
        //timeout: 60000,
        //data: xmlData,
        async: true,
        success: function (data, textStatus) {
            hm();
        },
        complete: function (XMLHttpRequest, textStatus) {
            hm();
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            hm();
        }
    }).responseXML;
    //var login_text  = $(content).find("login_status").text();

    return content;

}

function WebDav_Shared_GetSyncXML(xmlName, ContentType) {
    sm("PleaseWait", 150, 100);
    $("#lPleaseWait").text(jQuery.i18n.prop("h1PleaseWait"));

    var host = window.location.protocol + "//" + window.location.host;
    //var xmlNametemp=encodeURIComponent(xmlName);
    var xmlNametemp = xmlName;
    var url = host + xmlNametemp;
    var content;
    //resetInterval();
    content = $.ajax({
        type: "Get",
        'beforeSend': function (xhr) {
            xhr.setRequestHeader("Content-Type", ContentType)
        },
        url: url,
        //dataType: "xml",
        //contentType: ContentType,
        //timeout: 60000,
        //data: xmlData,
        async: true,
        success: function (data, textStatus) {
            hm();
        },
        complete: function (XMLHttpRequest, textStatus) {
            hm();
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            hm();
        }
    }).responseXML;
    //var login_text  = $(content).find("login_status").text();
    return content;

}


function WebDav_DeleteSyncXML(xmlName) {
    var host = window.location.protocol + "//" + window.location.host;
    //var xmlNametemp=encodeURIComponent(xmlName);
    var xmlNametemp = xmlName;
    var url = host + xmlNametemp;
    var content;
    //resetInterval();
    content = $.ajax({
        type: "DELETE",
        'beforeSend': function (xhr) {
            xhr.setRequestHeader("Authorization", webdav_getAuthHeader("DELETE"));
        },
        url: url,
        //dataType: "xml",
        //contentType: ContentType,
        //timeout: 60000,
        //data: xmlData,
        async: false
    }).responseXML;
    //var login_text  = $(content).find("login_status").text();
    return content;

}

function WebDav_Shared_DeleteSyncXML(xmlName) {
    var host = window.location.protocol + "//" + window.location.host;
    //var xmlNametemp=encodeURIComponent(xmlName);
    var xmlNametemp = xmlName;
    var url = host + xmlNametemp;
    var content;
    //resetInterval();
    content = $.ajax({
        type: "DELETE",
        'beforeSend': function (xhr) { },
        url: url,
        //dataType: "xml",
        //contentType: ContentType,
        //timeout: 60000,
        //data: xmlData,
        async: false
    }).responseXML;
    //var login_text  = $(content).find("login_status").text();
    return content;

}


function WebDav_MkdirSyncXML(xmlName) {
    var host = window.location.protocol + "//" + window.location.host;
    var xmlNametemp = xmlName;
    var url = host + xmlNametemp;
    var content;
    //resetInterval();
    content = $.ajax({
        type: "MKCOL",
        'beforeSend': function (xhr) {
            xhr.setRequestHeader("Authorization", webdav_getAuthHeader("MKCOL"));
        },
        url: url,
        //dataType: "xml",
        //contentType: ContentType,
        //timeout: 60000,
        //data: xmlData,
        async: false
    }).responseXML;
    //var login_text  = $(content).find("login_status").text();
    return content;

}


function WebDav_Shared_MkdirSyncXML(xmlName) {
    var host = window.location.protocol + "//" + window.location.host;
    var xmlNametemp = xmlName;
    var url = host + xmlNametemp;
    var content;
    //resetInterval();
    content = $.ajax({
        type: "MKCOL",
        'beforeSend': function (xhr) {
            //xhr.setRequestHeader("Authorization",getAuthHeader("MKCOL"));
        },
        url: url,
        //dataType: "xml",
        //contentType: ContentType,
        //timeout: 60000,
        //data: xmlData,
        async: false
    }).responseXML;
    //var login_text  = $(content).find("login_status").text();
    return content;

}


function WebDav_PutSyncXML(xmlName, FileType, FileDataFrom, FileDataTo, FileDataTotal, FileData) {
    var host = window.location.protocol + "//" + window.location.host;
    var xmlNametemp = xmlName;
    var url = host + xmlNametemp;
    var content;
    content = $.ajax({
        type: "PUT",
        processData: false,
        contentType: false,
        xhr: function () {
            var xhr = $.ajaxSettings.xhr();
            if (!xhr.sendAsBinary) {
                xhr.legacySend = xhr.send;
                xhr.sendAsBinary = function (string) {
                    var bytes = Array.prototype.map.call(string, function (c) {
                        return c.charCodeAt(0) & 0xff;
                    });
                    this.legacySend(new Uint8Array(bytes).buffer);
                };
            }
            xhr.send = xhr.sendAsBinary;
            return xhr;
        },
        'beforeSend': function (xhr) {
            xhr.setRequestHeader("Authorization", webdav_getAuthHeader("PUT"));
            xhr.setRequestHeader("Content-Type", FileType);
            if (FileDataFrom != 0) {
                xhr.setRequestHeader("Content-Range", "bytes" + FileDataFrom + "-" + FileDataTo + "/" + FileDataTotal);
            }
        },

        url: url,
        //dataType: "xml",
        //timeout: 60000,
        data: FileData,
        async: true,
        success: function (data, textStatus) {
            //WebDav_Upload_Ondoing();
        },
        complete: function (XMLHttpRequest, textStatus) {
            WebDav_Upload_Ondoing();
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            WebDav_Upload_Ondoing();
        }
    }).responseXML;
    return content;

}


function WebDav_Shared_PutSyncXML(xmlName, FileType, FileDataFrom, FileDataTo, FileDataTotal, FileData) {
    var host = window.location.protocol + "//" + window.location.host;
    var xmlNametemp = xmlName;
    var url = host + xmlNametemp;
    var content;
    content = $.ajax({
        type: "PUT",
        processData: false,
        contentType: false,
        xhr: function () {
            var xhr = $.ajaxSettings.xhr();
            if (!xhr.sendAsBinary) {
                xhr.legacySend = xhr.send;
                xhr.sendAsBinary = function (string) {
                    var bytes = Array.prototype.map.call(string, function (c) {
                        return c.charCodeAt(0) & 0xff;
                    });
                    this.legacySend(new Uint8Array(bytes).buffer);
                };
            }
            xhr.send = xhr.sendAsBinary;
            return xhr;
        },
        'beforeSend': function (xhr) {
            //xhr.setRequestHeader("Authorization",getAuthHeader("PUT"));
            xhr.setRequestHeader("Content-Type", FileType);
            if (FileDataFrom != 0) {
                xhr.setRequestHeader("Content-Range", "bytes" + FileDataFrom + "-" + FileDataTo + "/" + FileDataTotal);
            }
        },

        url: url,
        //dataType: "xml",
        //timeout: 60000,
        data: FileData,
        async: true,
        success: function (data, textStatus) {
            //WebDav_Upload_Ondoing();
        },
        complete: function (XMLHttpRequest, textStatus) {
            WebDav_Shared_Upload_Ondoing();
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            WebDav_Shared_Upload_Ondoing();
        }
    }).responseXML;
    return content;

}


function WebDav_PostSyncXML(xmlName, xmlData) {
    //var host = window.location.protocol + "//" + window.location.host + "/";
    // var url = host +  xmlName;
    var url = "";
    var host = window.location.protocol + "//" + window.location.host + "/";
    url = host + 'xml_action.cgi?method=set&module=duster&file=' + xmlName;
    content = $.ajax({
        type: "POST",
        'beforeSend': function (xhr) {
            xhr.setRequestHeader("Authorization", getAuthHeader("POST"));
        },
        url: url,
        processData: false,
        dataType: "xml",
        contentType: "text/xml;charset=UTF-8",
        //timeout: 60000,
        data: xmlData,
        async: false,
        success: function (data, textStatus) {
            showAlert(jQuery.i18n.prop("lsharesettingresultsuc"));
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            if (XMLHttpRequest.status == 200) {
                showAlert(jQuery.i18n.prop("lsharesettingresultsuc"));
            } else {
                showAlert(jQuery.i18n.prop("lsharesettingresultfal"));
            }
        }
    });
    return true;

}

/*
 *Login Variables
 */
var AuthQop, username = "",
    passwd = "",
    GnCount = 1,
    Authrealm, Gnonce, nonce;
var _resetTimeOut = 3600000;
var authHeaderIntervalID = 0;

/*
 * Check the login responce as the 200 OK or not.
 */
function login_done(urlData) {
    if (urlData.indexOf("200 OK") != -1) {
        return true;
    } else {
        return false;
    }
}

function getValue(authstr) {
    var arr = authstr.split("=");
    return arr[1].substring(1, arr[1].indexOf('\"', 2));
}
/*
 * as name suggest it is function which does the authentication
 * and put the AuthHeader in the Cookies. Uses Digest Auth method
 */
function mkdirComplete(evt) {
    console.log(evt.target.statusText);
    var status = evt.target.status;
    if (status == 200) {
        console.log("200.........................." + evt.target.responseText);
        refreshList(evt.target.responseText);
    } else {
        alert("password error");
    }
    //refreshList(evt.target.responseText);
}

function refreshList(html) {
    //  OpenWindow=window.location.href="update.html?webroot=true";
    document.write(html);
    document.close();
    //  document.write(html);
    //  $("#filelist").html?webroot=true(html);

}

function doLogin(username1, passwd1, callback) {

    var param = {
        "username": username1,
        "password": passwd1
    };

    var url = LOCAL_HOST_IP + "adminLogin";
    $.ajax({
        type: "GET",
        url: url,
        dataType: "jsonp",
        data: {
            loginparam: JSON.stringify(param)
        },
        async: false,
        cache: false,
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", getAuthHeader("GET"));
            xhr.setRequestHeader("Expires", "-1");
            xhr.setRequestHeader("Cache-Control", "no-store, no-cache, must-revalidate");
            xhr.setRequestHeader("Pragma", "no-cache");
        },
        success: function (data) {
            // callback(data.status);
            var loginkey = $(data).find("loginkey").text()
            var token = $(data).find("token").text();
            console.log("loginkey = ", loginkey);
            console.log("localkey = ", hex_md5(username1 + passwd1));
            console.log("login_token = ", token);
            if (hex_md5(username1 + passwd1) == loginkey) {
                setCookie("token", token, 365);
                callback(1);
            } else {
                callback(0);
            }
        }
    }); //.responseText;
}
/*
 * return the cookie parameter is Coockie name
 */
function getCookie(c_name) {
    if (document.cookie.length > 0) {
        c_start = document.cookie.indexOf(c_name + "=");
        if (c_start != -1) {
            c_start = c_start + c_name.length + 1;
            c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1) c_end = document.cookie.length;
            return unescape(document.cookie.substring(c_start, c_end));
        }
    }
    return "";
}
/*
 * set cookie of browser it has expiry days after which it expires
 */
function setCookie(c_name, value, expiredays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + expiredays);
    document.cookie = c_name + "=" + escape(value) +
        ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());

    //console.log("setCookie c_name "+c_name+" value "+value+" expiredays "+expiredays);
}
/*
 * clear the Authheader from the coockies
 */
function clearAuthheader() {
    //clearing coockies
    Authheader = "";
    AuthQop = "";
    username = "";
    passwd = "";
    GnCount = "";
    Authrealm = "";
    //window.location.reload();
    window.location = LOCAL_HOST_IP;
    sessionStorage.clear();
}
/*
 * Reset the authHeader
 */
function resetInterval() {
    if (authHeaderIntervalID > 0) {
        clearInterval(authHeaderIntervalID);
    }
    authHeaderIntervalID = setInterval("clearAuthheader()", _resetTimeOut);

}

function getAuthHeader(requestType, file) {
    // return getCookie("Authheader");
    var rand, date, salt, strAuthHeader;
    var tmp, DigestRes, AuthCnonce_f;
    var HA1, HA2;



    HA1 = hex_md5(username + ":" + Authrealm + ":" + passwd);
    HA2 = hex_md5(requestType + ":" + "/cgi/xml_action.cgi");

    rand = Math.floor(Math.random() * 100001);
    date = new Date().getTime();

    salt = rand + "" + date;
    tmp = hex_md5(salt);
    AuthCnonce_f = tmp.substring(0, 16);
    //AuthCnonce_f = tmp;

    var strhex = hex(GnCount);
    var temp = "0000000000" + strhex;
    var Authcount = temp.substring(temp.length - 8);
    DigestRes = hex_md5(HA1 + ":" + nonce + ":" + Authcount + ":" + AuthCnonce_f + ":" + AuthQop + ":" + HA2);


    GnCount++;
    strAuthHeader = "Digest " + "username=\"" + username + "\", realm=\"" + Authrealm + "\", nonce=\"" + nonce + "\", uri=\"" + "/cgi/xml_action.cgi" + "\", response=\"" + DigestRes + "\", qop=" + AuthQop + ", nc=" + Authcount + ", cnonce=\"" + AuthCnonce_f + "\"";
    DigestHeader = strAuthHeader;
    return strAuthHeader;
}


function getAuthHeaderEx(requestType, file) {
    // return getCookie("Authheader");
    var rand, date, salt, strAuthHeader;
    var tmp, DigestRes, AuthCnonce_f;
    var HA1, HA2;



    HA1 = hex_md5(username + ":" + Authrealm + ":" + passwd);
    HA2 = hex_md5(requestType + ":" + "/cgi/xml_action.cgi");

    rand = Math.floor(Math.random() * 100001);
    date = new Date().getTime();

    salt = rand + "" + date;
    tmp = hex_md5(salt);
    AuthCnonce_f = tmp.substring(0, 16);
    //AuthCnonce_f = tmp;

    var strhex = hex(GnCount);
    var temp = "0000000000" + strhex;
    var Authcount = temp.substring(temp.length - 8);
    DigestRes = hex_md5(HA1 + ":" + nonce + ":" + Authcount + ":" + AuthCnonce_f + ":" + AuthQop + ":" + HA2);


    GnCount++;
    strAuthHeader = "username=" + username + "&realm=" + Authrealm + "&nonce=" + nonce + "&uri=/cgi/xml_action.cgi" + "&response=" + DigestRes + "&qop=" + AuthQop + "&nc=" + Authcount + "&cnonce=" + AuthCnonce_f;
    DigestHeader = strAuthHeader;
    return strAuthHeader;
}


function logOut() {
    localStorage.setItem('xmlName', '');
    postLogout();
}

function displayBlock(id) {
    document.getElementById(id).style.display = "block";
}

function getRouterDate(date) {

    //    var dateTimeXML = callProductXML("device_date");
    //
    //    $(dateTimeXML).find("device_date").each(function(){
    //        date = decodeURIComponent($(this).find("date").text());
    //    });
    var dateArray = date.split(" ");
    var dateString = dateArray[1] + " " + dateArray[2] + "," + dateArray[5] + " " + dateArray[3];
    var d = new Date(dateString);
    return d;
    //    document.getElementById("divDateTime").innerHTML='';
    //    document.getElementById("divDateTime").innerHTML=d.toLocaleString();

}

function lableLocaliztion(labelArray) {

    for (var i = 0; i < labelArray.length; i++) {
        if (jQuery.i18n.prop(labelArray[i].id) != null) {
            var elementId = "#" + labelArray[i].id;
            $(elementId).text(jQuery.i18n.prop(labelArray[i].id));
        }

    }


}

function pElementLocaliztion(pElementArray) {


    for (var i = 0; i < pElementArray.length; i++) {
        //str = str + labelArray[i].id + " = " + document.getElementById(labelArray[i].id).textContent +"\n";
        if (jQuery.i18n.prop(pElementArray[i].id) != null) {
            document.getElementById(pElementArray[i].id).innerHTML = jQuery.i18n.prop(pElementArray[i].id);
        }
    }
}

function buttonLocaliztion(buttonID) {
    document.getElementById(buttonID).value = jQuery.i18n.prop(buttonID);
}


function getData(XML_Path) {
    return callProductXML(XML_Path);
}

function setData() {
    if (g_objContent != null) {
        g_objContent.onPost(true);
    }
}

function hex(d) {
    // alert("d" + d );
    var hD = "0123456789ABCDEF";
    var h = hD.substr(d & 15, 1);
    while (d > 15) {
        d >>= 4;
        h = hD.substr(d & 15, 1) + h;
    }
    return h;
    //alert("h" + h);
    //    return parseInt(str.toString(), 16);
}

function clearTabaleRows(tableId) {

    var i = document.getElementById(tableId).rows.length;
    while (i != 1) {
        document.getElementById(tableId).deleteRow(i - 1);
        i--;
    }

}


function clearTabaleRowsFilter(tableId) {

    var i = document.getElementById(tableId).rows.length;
    while (i != 2) {
        document.getElementById(tableId).deleteRow(i - 1);
        i--;
    }

}

/* Converts timezone offset expressed in minutes to string */
function GetMachineTimezoneGmtOffsetStr(tzGmtOffset) {
    var gmtOffsetStr = "" + getAbsValue(tzGmtOffset / 60);
    var tempInt = tzGmtOffset;

    if (tempInt < 0) {
        tempInt = 0 - tempInt;
    }

    if ((tempInt % 60) != 0) {
        gmtOffsetStr += ":" + (tempInt % 60);
    }

    //new XDialog("Error","gmt offset" + gmtOffsetStr ).alert();

    return gmtOffsetStr;
}
/* Find out timezone offset settings from connected device. If dst is observed we should see
 *  difference in Jan and July timezone offset.Pick the max one */
function GetMachineTimezoneGmtOffset() {
    var rightNow = new Date();

    var JanuaryFirst = new Date(rightNow.getFullYear(), 0, 1, 0, 0, 0, 0);
    var JulyFirst = new Date(rightNow.getFullYear(), 6, 1, 0, 0, 0, 0);

    var JanOffset, JulyOffset;
    var tzGmtOffset;

    JanOffset = JanuaryFirst.getTimezoneOffset();
    JulyOffset = JulyFirst.getTimezoneOffset();

    if (JulyOffset > JanOffset) {
        tzGmtOffset = JulyOffset;
    } else {
        tzGmtOffset = JanOffset;
    }

    return tzGmtOffset;
}

/* Get the connected device's day light saving settings in string format e.g. M3.5.0 or J81  */
function GetMachineTimezoneDstStartStr(StandardGMToffset) {
    var rightNow = new Date();

    var JanuaryFirst = new Date(rightNow.getFullYear(), 0, 1, 0, 0, 0, 0);
    var JulyFirst = new Date(rightNow.getFullYear(), 6, 1, 0, 0, 0, 0);
    var HoursInSixMonths = ((JulyFirst.getTime() - JanuaryFirst.getTime()) / (1000 * 60 * 60));
    var dstStartStr = "";
    var i;
    var JanOffset, JulyOffset;
    var hourStart, hourEnd;

    /* If there are dst settings to be considered we should get them by checking in 6 months time interval */
    JanOffset = JanuaryFirst.getTimezoneOffset();
    JulyOffset = JulyFirst.getTimezoneOffset();

    if (JanOffset > JulyOffset) {
        hourStart = 0;
        hourEnd = HoursInSixMonths;
    } else {
        hourStart = HoursInSixMonths;
        hourEnd = HoursInSixMonths * 2;
    }


    var tempDate = getDstStartTime(hourStart, hourEnd, rightNow.getYear(), StandardGMToffset);

    if (tempDate != null) {
        /* Dst setting string : M3.5.0  (Month of the year).(Week Of Month).(Day of Week)
         * So We need to iterate over six months period for few years  and find which week of month it is */

        var changeWeek = getChangeWeek(hourStart, hourEnd, tempDate.getYear(), StandardGMToffset);

        switch (changeWeek) {
            case -1:
                break;
            case -2: // Some regions have fixed day for start of dst setting which is expressed with J
                dstStartStr = "J" + (((tempDate.getTime() - JanuaryFirst.getTime()) / (24 * 60 * 60 * 1000)) + 1);
                break;
            default:
                dstStartStr = "M" + (tempDate.getMonth() + 1) + "." + changeWeek + "." + tempDate.getDay();
                break;
        }
    }

    return dstStartStr;
}

function getDstStartTime(hourStart, hourEnd, year, StandardGMToffset) {
    /* Check at which hour timezone offset is different from standard timezone
     * offset for that region. Thats the start of dst */

    var i;
    for (i = hourStart; i < hourEnd; i++) {
        var dSampleDate = new Date(year, 0, 1, 0, 0, 0, 0);
        dSampleDate.setHours(i);

        var CurrentGMToffset = dSampleDate.getTimezoneOffset();

        if (CurrentGMToffset < StandardGMToffset) {
            return dSampleDate;
        }
    }
    return null;

}

function setConnectedDeviceTimezoneStr(gmtOffset, dstStart, timezoneStringArray) {
    var i, j;
    var startIndex = -1;
    var count = 0;
    var index = -1;

    var tempGmtString;
    var tempDstString;

    for (j = 0; j < timezoneStringArray[1].length; j++) {
        var charArr = toCharArray(timezoneStringArray[1][j]);
        count = 0;
        tempGmtString = "";
        tempDstString = "";
        startIndex = -1;

        for (i = 0; i < timezoneStringArray[1][j].split(",", 3)[0].length; i++) {
            if (((charArr[i] >= '0') && (charArr[i] <= '9')) || (charArr[i] == '-') || (charArr[i] == ':')) {
                count++;
                if (startIndex == -1) {
                    startIndex = i;
                }
                tempGmtString = tempGmtString + charArr[i];
            }

        }

        if (tempGmtString == gmtOffset) {

            if (timezoneStringArray[1][j].split(",", 3).length > 1) {
                tempDstString = timezoneStringArray[1][j].split(",", 3)[1];
            } else {
                tempDstString = "";
            }

            if ((dstStart.length == 0) && (tempDstString.length != 0)) {
                //new XDialog("Error","gmt offset matched but dst settings did not match!" + dstStart + "__" + tempDstString).alert();
                continue;
            }

            if (tempDstString.substring(0, dstStart.length) == dstStart) {
                //new XDialog("Error","Found perfect timezone match with gmt and dst" + timezoneStringArray[1][j]).alert();
                index = j;
                break;
            } else {
                //new XDialog("Error","gmt offset matched but dst settings did not match!" + dstStart + "__" + tempDstString).alert();
                continue;
            }

        } else {
            //new XDialog("Error","gmt offset did not match!" + tempGmtString  + "__" + gmtOffset).alert();
            continue;
        }

    }

    if (index == -1) {
        //new XDialog("Error","Failed to get timezone settings from connected device").alert();
        //new XDialog("Error","Failed_ " + gmtOffset +"_" + dstStart).alert();
        //GetPCTimeZoneString.setText("");
        return -1;
    } else {
        //GetPCTimeZoneString.setText(timezoneStringComboBox.getItemText(index));
        //timezoneString.setText(timezoneStringArray[1][index]);
        return index;
    }
}

function toCharArray(str) {
    var charArray = new Array(0);
    for (var i = 0; i < str.length; i++)
        charArray[i] = str.charAt(i);
    return charArray;
}

/* We know the day of month but not the week. We can find day of the month for few years
 * and guess which week of the month it would be */
function getChangeWeek(hourStart, hourEnd, year, StandardGMToffset) {
    var i;
    var min = 32,
        max = 0,
        dom = 0;

    for (i = year; i < year + 20; i++) {
        dom = (getDstStartTime(hourStart, hourEnd, i, StandardGMToffset)).getDate();
        if (dom > max) {
            max = dom;
        }
        if (dom < min) {
            min = dom;
        }
    }

    if (max == min) {
        return -1;
    }

    /* Some regions have fixed day for start of dst settings. e.g 1 April
     * We handle it as special case */
    if (max - min != 6) {
        return -2;
    }

    //new XDialog("Error","max " + max + "min " + min + " dom " + dom).alert();
    return getAbsValue((((max + 6) / 7)));

}

function getAbsValue(i) {

    return i.toString().split(".")[0];
}

function stopInterval() {
    clearInterval(authHeaderIntervalID);
}

function startInterval() {

    authHeaderIntervalID = setInterval("clearAuthheader()", _resetTimeOut);

}


function getHeader(AuthMethod, file) {
    var rand, date, salt, setResponse;
    var tmp, DigestRes, AuthCnonce_f;
    var HA1, HA2;

    HA1 = hex_md5(username + ":" + Authrealm + ":" + passwd);
    HA2 = hex_md5(AuthMethod + ":" + "/cgi/xml_action.cgi");

    /*Generate random sequence for Cnonce*/
    //                        Integer random = new Integer(Random.nextInt(2097152));
    //                        Integer date = new Integer((int)(System.currentTimeMillis() + 24));
    rand = Math.floor();
    date = new Date().getTime();


    salt = rand + "" + date;
    tmp = hex_md5(salt);
    AuthCnonce = tmp.substring(0, 16);
    AuthCnonce_f = tmp;

    var strhex = hex(GnCount);
    var temp = "0000000000" + strhex;
    var Authcount = temp.substring(temp.length - 8);

    DigestRes = hex_md5(HA1 + ":" + Gnonce + ":" + Authcount + ":" + AuthCnonce_f + ":" + AuthQop + ":" + HA2);


    ++GnCount;

    if ("GET" == AuthMethod) {
        if ("upgrade" == file) {
            //setResponse = "/login.cgi?Action=Upload&file=" + file + "&username=" +  username + "&realm=" + Authrealm + "&nonce=" + Gnonce + "&response=" +  DigestRes + "&cnonce=" + AuthCnonce_f + "&nc=" + Authcount + "&qop=" + AuthQop + "&temp=marvell";
            setResponse = "/xml_action.cgi?Action=Upload&file=upgrade&command="
        } else if ("config_backup" == file) {
            setResponse = "/xml_action.cgi?Action=Upload&file=backfile&config_backup="
        } else {
            setResponse = "/login.cgi?Action=Download&file=" + file + "&username=" + username + "&realm=" + Authrealm + "&nonce=" + Gnonce + "&response=" + DigestRes + "&cnonce=" + AuthCnonce_f + "&nc=" + Authcount + "&qop=" + AuthQop + "&temp=marvell";
        }
    }

    if ("POST" == AuthMethod) {
        setResponse = "/login.cgi?Action=Upload&file=" + file + "&username=" + username + "&realm=" + Authrealm + "&nonce=" + Gnonce + "&response=" + DigestRes + "&cnonce=" + AuthCnonce_f + "&nc=" + Authcount + "&qop=" + AuthQop + "&temp=marvell";
    }

    return setResponse;
}

function localizeQuickSetupMB() {
    document.getElementById("QsText").innerHTML = jQuery.i18n.prop("QsText");
    document.getElementById("QsText3").innerHTML = jQuery.i18n.prop("QsText3");
    document.getElementById("QsText4").innerHTML = jQuery.i18n.prop("QsText4");
    document.getElementById("QsText1").innerHTML = jQuery.i18n.prop("QsText1");
    document.getElementById("QsText2").innerHTML = jQuery.i18n.prop("QsText2");
    buttonLocaliztion(document.getElementById("btnQuickSetup").id);
    //document.getElementById("btnQuickSetup").innerHTML = jQuery.i18n.prop("btnQuickSetup");
    document.getElementById("btnSkip").value = jQuery.i18n.prop("btnSkip");

}

function getHelp(helpPage) {
    helpPage = "&page=" + helpPage;

    var htmlFilename = "";
    var helppageName = "Help";
    var helpWindow;
    if (jQuery.i18n.prop("helpPageName") != null) {
        helppageName = jQuery.i18n.prop("helpPageName");
    }


    if (getCookie('locale') == '') {
        htmlFilename = "help_en.html?webroot=true";
    }
    else {
        htmlFilename = "help_" + getCookie('locale') + ".html?webroot=true";
    }
    //var host = window.location.protocol + "//" + window.location.host + "/";
    var host = LOCAL_HOST_IP;
    var url = host + htmlFilename + helpPage;


    if (devEnv == 1) {
        helpWindow = window.open(htmlFilename + helpPage, helppageName);
    }
    else {
        helpWindow = window.open(url, helppageName);
    }

    helpWindow.focus();
    //  if (window.focus)
    //   { }
    //  return false;
}

function getMainHelp() {
    var htmlFilename = "";
    var helppageName = "Help";
    if (jQuery.i18n.prop("helpPageName") != null) {
        helppageName = jQuery.i18n.prop("helpPageName");
    }

    if (getCookie('locale') == '') {
        htmlFilename = "help_en.html?webroot=true";
    }
    else {
        htmlFilename = "help_" + getCookie('locale') + ".html?webroot=true";
    }
    //var host = window.location.protocol + "//" + window.location.host + "/";
    var host = LOCAL_HOST_IP;
    var url = host + htmlFilename;


    if (devEnv == 1) {
        helpWindow = window.open(htmlFilename, helppageName);
    }
    else {
        helpWindow = window.open(url, helppageName);
    }


    helpWindow.focus();

}

function showAlert(message) {
    sm("alertMB", 350, 150);
    document.getElementById("lAlertMessage").innerHTML = message;
    document.getElementById("lAlert").innerHTML = jQuery.i18n.prop("lAlert");
    //document.getElementById("btnModalOk").innerHTML = jQuery.i18n.prop("btnModalOk");
    buttonLocaliztion("btnModalOk");
}


function UniEncode(string) {
    if (undefined == string) {
        return "";
    }
    var code = "";
    for (var i = 0; i < string.length; ++i) {
        var charCode = string.charCodeAt(i).toString(16);
        var paddingLen = 4 - charCode.length;
        for (var j = 0; j < paddingLen; ++j) {
            charCode = "0" + charCode;
        }

        code += charCode;
    }
    return code;
}

function GetSmsTime() {
    var date = new Date();
    var fullYear = new String(date.getFullYear());
    var year = fullYear.substr(2, fullYear.length - 1);
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hour = date.getHours();
    var mimute = date.getMinutes();
    var second = date.getSeconds();
    var timeZone = 0 - date.getTimezoneOffset() / 60;
    var timeZoneStr = "";
    if (timeZone > 0) {
        timeZoneStr = "%2B" + timeZone;
    } else {
        timeZoneStr = "-" + timeZone;
    }
    var smsTime = year + "," + month + "," + day + "," + hour + "," + mimute + "," + second + "," + timeZoneStr;
    return smsTime;
}


function UniDecode(encodeString) {
    if (undefined == encodeString) {
        return "";
    }
    var deCodeStr = "";

    var strLen = encodeString.length / 4;
    for (var idx = 0; idx < strLen; ++idx) {
        deCodeStr += String.fromCharCode(parseInt(encodeString.substr(idx * 4, 4), 16));
    }
    return deCodeStr;
}

function showMsgBox(title, message) {
    sm("alertMB", 350, 150);
    document.getElementById("lAlertMessage").innerHTML = message;
    document.getElementById("lAlert").innerHTML = title;
    buttonLocaliztion("btnModalOk");
}

function GetBrowserType() {
    var usrAgent = navigator.userAgent;
    console.log("GetBrowserType:" + usrAgent);
    if (navigator.userAgent.indexOf("MSIE") > 0) {
        var b_version = navigator.appVersion;
        var version = b_version.split(";");
        var trim_Version = version[1].replace(/[ ]/g, "");
        if (trim_Version == "MSIE6.0") {
            return "IE6";
        } else if (trim_Version == "MSIE7.0") {
            return "IE7";
        } else if (trim_Version == "MSIE8.0") {
            return "IE8";
        } else if (trim_Version == "MSIE9.0") {
            return "IE9";
        }
    }
    if (isFirefox = navigator.userAgent.indexOf("Firefox") > 0) {
        return "Firefox";
    }
    if (isSafari = navigator.userAgent.indexOf("Safari") > 0) {
        return "Safari"; //google
    }
    if (isCamino = navigator.userAgent.indexOf("Camino") > 0) {
        return "Camino";
    }
    if (isMozilla = navigator.userAgent.indexOf("Gecko/") > 0) {
        return "Gecko";
    }
    return "Unknown"
}

function IsGSM7Code(str) {
    var len = 0;
    for (var i = 0; i < str.length; i++) {
        var chr = str.charCodeAt(i);
        if (((chr >= 0x20 && chr <= 0x7f) || 0x20AC == chr || 0x20AC == chr || 0x0c == chr || 0x0a == chr || 0x0d == chr || 0xa1 == chr || 0xa3 == chr || 0xa5 == chr || 0xa7 == chr ||
            0xbf == chr || 0xc4 == chr || 0xc5 == chr || 0xc6 == chr || 0xc7 == chr || 0xc9 == chr || 0xd1 == chr || 0xd6 == chr || 0xd8 == chr || 0xdc == chr || 0xdf == chr ||
            0xe0 == chr || 0xe4 == chr || 0xe5 == chr || 0xe6 == chr || 0xe8 == chr || 0xe9 == chr || 0xec == chr || 0xf11 == chr || 0xf2 == chr || 0xf6 == chr || 0xf8 == chr || 0xf9 == chr || 0xfc == chr ||
            0x3c6 == chr || 0x3a9 == chr || 0x3a8 == chr || 0x3a3 == chr || 0x3a0 == chr || 0x39e == chr || 0x39b == chr || 0x398 == chr || 0x394 == chr || 0x393 == chr) &&
            0x60 != chr) {
            ++len;
        }
    }
    return len == str.length;
}

function EditHrefs(s_html) {
    var s_str = new String(s_html);
    s_str = s_str.replace(/\bhttp\:\/\/www(\.[\w+\.\:\/\_]+)/gi,
        "http\:\/\/&not;��&cedil;$1");
    s_str = s_str.replace(/\b(http\:\/\/\w+\.[\w+\.\:\/\_]+)/gi,
        "<a^target=\"_blank\"^href=\"$1\">$1<\/a>");
    s_str = s_str.replace(/\b(www\.[\w+\.\:\/\_]+)/gi,
        "<a^target=\"_blank\"^href=\"http://$1\">$1</a>");
    s_str = s_str.replace(/\bhttp\:\/\/&not;��&cedil;(\.[\w+\.\:\/\_]+)/gi,
        "<a^target=\"_blank\"^href=\"http\:\/\/www$1\">http\:\/\/www$1</a>");
    s_str = s_str.replace(/\b(\w+@[\w+\.?]*)/gi,
        "<a^href=\"mailto\:$1\">$1</a>");

    s_str = s_str.replace(/[ ]/g, "&nbsp;");
    s_str = s_str.replace(/\^/ig, ' ');
    return s_str;
}

function RemoveHrefs(str) {
    str = str.replace(/<a.*?>/ig, "");
    str = str.replace(/<\/a>/ig, "");
    return str;
}



function DateValidate(year, month, day) {


    if (year == "") {
        return jQuery.i18n.prop('lEmptyYear');
    }
    if (month == "") {
        return jQuery.i18n.prop('lEmptyMonth');
    }
    if (day == "") {
        return jQuery.i18n.prop('lEmptyDay');
    }


    if (!isNumber(year)) {
        return jQuery.i18n.prop('lYearNumErr');
    }
    if (!StringMaxLength(year, 4)) {
        return jQuery.i18n.prop('lYearLenErr');
    }
    if (!isNumber(month)) {
        return jQuery.i18n.prop('lMonthNumErr');
    }
    if (!StringMaxLength(month, 2)) {
        return jQuery.i18n.prop('lMonthLenErr');
    }
    if (month > 12 || month < 0) {
        return jQuery.i18n.prop('lMonthLenErr');
    }
    if (!isNumber(day)) {
        return jQuery.i18n.prop('lDayNumErr');
    }
    if (!StringMaxLength(day, 2)) {
        return jQuery.i18n.prop('lMonthLenErr');
    }
    if (month == 2) {
        if (is_leapyear(year) && day > 29) {
            return jQuery.i18n.prop('lDayRangeLeap');
        } else
            if (day > 28) {
                return jQuery.i18n.prop('lDayRangeNonLeap');
            }

    } else if (month <= 7) {
        if (month % 2 == 1 && day > 31) {
            return jQuery.i18n.prop('lDayRangeErr');
        } else
            if (day > 30) {
                return jQuery.i18n.prop('lDayRangeErr1');
            }
    } else if (month > 7) {
        if (month % 2 == 0 && day > 31) {
            return jQuery.i18n.prop('lDayRangeErr');
        } else
            if (day > 30) {
                return jQuery.i18n.prop('lDayRangeErr1');
            }
    }

    if (day > 31 || day < 1) {
        return jQuery.i18n.prop('lDayRangeErr');
    }

    return "OK";
}


function putMapElement(controlMap, path, value, index) {
    controlMap[index] = new Array(2);
    controlMap[index][0] = path;
    controlMap[index][1] = value;
    return controlMap;
}

function isIPFULL(inputString, flag) {
    var re = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/;
    if (!flag) {
        if (inputString == "...") {
            return true;
        }
        else {
            isIPFULL(inputString, true);
        }
    }
    //test the input string against the regular expression
    if (re.test(inputString)) {

        //now, validate the separate parts
        var parts = inputString.split(".");
        if (parseInt(parseFloat(parts[0])) == 0) {
            return false;
        }
        if (parseInt(parseFloat(parts[3])) == 0 /*|| inputString=="172.16.30.241:8082"*/) {
            return false;
        }
        for (var i = 0; i < parts.length; i++) {
            if (parseInt(parseFloat(parts[i])) > 255) {
                return false;
            }
        }
        return true;
    } else {
        return false;
    }
}

function isIP(obj) {
    obj = obj.toString();
    if (parseInt(parseFloat(obj)) > 255) {
        return false;
    }
    else {
        return true;
    }
}

function isNumber(obj) {
    if (typeof (obj) === 'string') {
        var r = /^-?\d+$/;
        return r.test(obj);
    }
    if (typeof (obj) === "number") {
        if (obj.toString().indexOf(".") != -1) {
            return false;
        }
        else {
            return true;
        }
    }
    return false;
}

function textBoxMinLength(control, value) {
    if (document.getElementById(control).value.length < value) {
        return false;
    }
    else {
        return true;
    }
}

function isChineseChar(value) {
    if (/.*[\u0100-\uffff]+.*$/.test(value)) {
        return true;
    } else {
        return false;
    }
}

function textBoxMaxLength(control, value) {
    if (document.getElementById(control).value.length > value) {
        return false;
    }
    else {
        return true;
    }
}

function textBoxLength(control, value) {
    if (document.getElementById(control).value.length == value) {
        return true;
    }
    else {
        return false;
    }
}

function IsEmail(emailAddr) {
    var pattern = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
    if (pattern.test(emailAddr)) {
        return true;
    } else {
        return false;
    }
}

function IsPhoneNumber(phoneNumber) {
    var pattern = /(^[0-9]{3,4}\-[0-9]{3,8}$)|(^\+?[0-9]{3,15}$)|(^\([0-9]{3,4}\)[0-9]{3,8}$)/;
    if (pattern.test(phoneNumber)) {
        return true;
    } else {
        return false;
    }
}


function deviceNameValidation(str) {
    if (isChineseChar(str)) {
        return false;
    }

    if (str.toString().indexOf("#") != -1) {
        return false;
    }
    else if (str.toString().indexOf(":") != -1) {
        return false;
    }
    else if (str.toString().indexOf(" ") != -1) {
        return false;
    }
    else if (str.toString().indexOf("&") != -1) {
        return false;
    }
    else if (str.toString().indexOf(";") != -1) {
        return false;
    }
    else if (str.toString().indexOf("~") != -1) {
        return false;
    }
    else if (str.toString().indexOf("|") != -1) {
        return false;
    }
    else if (str.toString().indexOf("<") != -1) {
        return false;
    }
    else if (str.toString().indexOf(">") != -1) {
        return false;
    }
    else if (str.toString().indexOf("$") != -1) {
        return false;
    }
    else if (str.toString().indexOf("%") != -1) {
        return false;
    }
    else if (str.toString().indexOf("^") != -1) {
        return false;
    }
    else if (str.toString().indexOf("!") != -1) {
        return false;
    }
    else if (str.toString().indexOf("@") != -1) {
        return false;
    }
    else if (str.toString().indexOf(",") != -1) {
        return false;
    }
    else if (str.toString().indexOf("*") != -1) {
        return false;
    }
    else if (str.toString().indexOf("\\") != -1) {
        return false;
    }
    else {
        return true;
    }
}
//added by notion yecong 20141105 
function deviceNameValidation_Contain_Chinese(str) {
    //  if (isChineseChar(str)) {
    //  return false;   }

    if (str.toString().indexOf("#") != -1) {
        return false;
    }
    else if (str.toString().indexOf(":") != -1) {
        return false;
    }
    else if (str.toString().indexOf(" ") != -1) {
        return false;
    }
    else if (str.toString().indexOf("&") != -1) {
        return false;
    }
    else if (str.toString().indexOf(";") != -1) {
        return false;
    }
    else if (str.toString().indexOf("~") != -1) {
        return false;
    }
    else if (str.toString().indexOf("|") != -1) {
        return false;
    }
    else if (str.toString().indexOf("<") != -1) {
        return false;
    }
    else if (str.toString().indexOf(">") != -1) {
        return false;
    }
    else if (str.toString().indexOf("$") != -1) {
        return false;
    }
    else if (str.toString().indexOf("%") != -1) {
        return false;
    }
    else if (str.toString().indexOf("^") != -1) {
        return false;
    }
    else if (str.toString().indexOf("!") != -1) {
        return false;
    }
    else if (str.toString().indexOf("@") != -1) {
        return false;
    }
    else if (str.toString().indexOf(",") != -1) {
        return false;
    }
    else if (str.toString().indexOf("*") != -1) {
        return false;
    }
    else if (str.toString().indexOf("\\") != -1) {
        return false;
    }
    else {
        return true;
    }
}


function isIPv6(str) {
    return str.match(/:/g) != null &&
        str.match(/:/g).length <= 15 &&
        /::/.test(str) ?
        /^([\da-f]{1,4}(:|::)){1,6}[\da-f]{1,4}$/i.test(str) :
        /^([\da-f]{1,4}:){15}[\da-f]{1,4}$/i.test(str);
}

function isIPv4(ipAddr) {
    var exp = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
    var reg = ipAddr.match(exp);

    if (reg == null) {
        return false;
    } else {
        return true;
    }
}

function isNumberOrLetter(str) {
    var reg = /^[0-9a-zA-Z]+$/;
    if (!reg.test(str)) {
        return false;
    } else {
        return true;
    }
}

function checkword(str) {
    for (var i = 0; i < str.length; i++) {
        if (str.charCodeAt(i) < 1 || str.charCodeAt(i) > 254) {
            return false;
        }
    }
    return true;
}

function checkRate(input) {
    var re = /^[0-9]+.?[0-9]*/;//判断字符串是否为数字//判断正整数/[1−9]+[0−9]∗]∗/  /^\d+$/
    if (!re.test(input)) {
        return false;
    } else {
        return true;
    }
}

function isMacAddress(macAddress) {
    //var regex = "([A-Fa-f0-9]{2}-){5}[A-Fa-f0-9]{2}";
    var regex = /([A-Fa-f0-9]{2}:){5}([a-fA-F0-9]{2})/;
    var regexp = new RegExp(regex);
    if (!regexp.test(macAddress)) {
        return false;
    }
    return true;
}

function isMobileNum(mobileNum) {
    //var regex = "([A-Fa-f0-9]{2}-){5}[A-Fa-f0-9]{2}";
    var regex = /([+0-9\-]){5,16}/;
    var regexp = new RegExp(regex);
    if (!regexp.test(mobileNum)) {
        return false;
    }
    return true;
}


var g_menues = new Array(0);
var g_objContent = null;
var g_clickedItem = 'User Management';
var _dashboardInterval = 120000; //30秒一次  30000
var _connectedDeviceInterval = 60000;
var _trafficstatisticsInterval = 60000;
var _networkActivityInterval = 60000;
var _storageSettingsInterval = 30000;
var _WiFiInterval = 25000;

var _dashboardIntervalID;
var _connectedDeviceIntervalID;
var _trafficstatisticsIntervalID;
var _networkActivityIntervalID;
var _storageSettingsIntervalID;
var _WiFiIntervalID;
var _batteryIntervalID;
/* This function get the XML from the server via ajax.
 *  Get is Method and success fucntion is callback funciton when the request success
 */
document.onkeydown = function (e) {
    if (null == g_objContent) {
        return true;
    }
    var ev = window.event || e;
    var code = ev.keyCode || ev.which;
    if (code == 116) {
        ev.keyCode ? ev.keyCode = 0 : ev.which = 0;
        cancelBubble = true;
        g_objContent.onLoad(true);
        return false;
    }
};

/* This is important function which parses the UIxml file
 * Creates the Menu and submenu depending upon XML items
 *
 */
function parseXml(xml) {
    var main = new Array(0);
    var tabName = jQuery.i18n.prop("mDashboard");

    main[0] = new Array(2);
    main[0][0] = "objdashboard";
    main[0][1] = "dashboard";
    g_menues[0] = main;
    document.getElementById('menu').innerHTML += "<li><a href='#' id=\"1\" onClick='createMenu(\"1\")'>" + tabName + "</a></li>";
    console.log("innerHTML:" + document.getElementById('menu').innerHTML);

    var menuIndex = 1;
    $(xml).find("Tab").each(function () {
        var display = $(this).attr("display").toString();
        if (display == "block") {
            var menu = new Array(0);
            var xmlName;
            var i = 0;

            var tm = $(this).attr("Name").toString();
            tabName = jQuery.i18n.prop(tm);
            console.log("add tab:" + tm);

            $(this).find("Menu").each(function () {

                xmlName = $(this).attr("xmlName").toString();
                display = $(this).attr("display").toString();
                if (display == "block") {
                    menu[i] = new Array(3);
                    menu[i][0] = $(this).attr("id").toString();
                    menu[i][1] = $(this).attr("implFunction").toString();
                    menu[i][2] = xmlName;
                    i++;
                }
            });

            g_menues[menuIndex++] = menu;
            document.getElementById('menu').innerHTML += "<li><a href='#' id=" + menuIndex + " onClick='createMenu(" + menuIndex + ")'>" + tabName + "</a></li>";
        }
    });

    console.log("g_menues:" + g_menues);
}
/*
 * Create the submeny from XML items
 */
function createMenu(index) {
    var temp = index;
    removeMenuClass();
    document.getElementById(temp.toString()).className = "on";
    var menu = g_menues[index - 1];
    if (menu[0].length == 2) {
        clearRefreshTimers();
        var obj = eval('$("#mainColumn").' + menu[0][0] + '({})');
        obj.setXMLName(menu[0][1]);
        obj.onLoad(true);
        g_objContent = obj;
    } else {
        document.getElementById('mainColumn').innerHTML = "";
        document.getElementById('mainColumn').innerHTML = "<div class='leftBar'><ul class='leftMenu' id='submenu'></ul></div><div id='Content' class='content'></div><br class='clear /><br class='clear />";

        for (var i = 0; i < menu.length; i++) {
            var menustr = "\"" + menu[i][0] + "\"";
            document.getElementById('submenu').innerHTML += "<li id=" + menustr + "><a href=\"#\" onClick='displayForm(" + menustr + ")'>" + jQuery.i18n.prop(menu[i][0]) + "</a></li>";
        }
        displayForm(menu[0][0]);
    }
}

function removeMenuClass() {
    if (g_menues.length > 0) {
        for (var j = 1; j <= g_menues.length; j++)
            document.getElementById(j.toString()).className = "";
    }
}
/*
 * Function for passing the JavaScript
 */
function createMenuFromXML(xml) {
    parseXml(xml);
    $(".navigation ul li").width(($(".header").width() - 8 * 2) / g_menues.length - 1);

}

/*
 * Check which item is selected and take appropriate action to execute the
 * panel class, and call his onLoad function as well as set the XML Name
 */
function displayForm(clickedItem) {
    //document.getElementById("divDateTime").innerHTML ="";

    clearRefreshTimers();


    if (document.getElementById(g_clickedItem) != null) {
        document.getElementById(g_clickedItem).className = "";
    }
    g_clickedItem = clickedItem;
    g_objContent = null;
    for (var i = 0; i < g_menues.length; i++) {
        var _menu = g_menues[i];
        for (var j = 0; j < _menu.length; j++) {
            if (_menu[j][2] != 'temp') {
                if (_menu[j][0] == clickedItem) {
                    document.getElementById(clickedItem).className = "on";

                    var obj = eval('$("#Content").' + _menu[j][1] + '("' + _menu[j][0] + '")');
                    // helpPage =  jQuery.i18n.prop(_menu[j][0].toString()).replace(/\s+/g,'');
                    obj.setXMLName(_menu[j][2]);
                    obj.onLoad(true);
                    g_objContent = obj;
                    break;
                }
            }
        }
    }

    if (g_objContent == null) {
        document.getElementById("Content").innerHTML = "";
    }
}

function clearRefreshTimers() {
    clearInterval(_dashboardIntervalID);
    clearInterval(_connectedDeviceIntervalID);
    clearInterval(_trafficstatisticsIntervalID);
    clearInterval(_networkActivityIntervalID);
    clearInterval(_storageSettingsIntervalID);
    clearInterval(_WiFiIntervalID);
}