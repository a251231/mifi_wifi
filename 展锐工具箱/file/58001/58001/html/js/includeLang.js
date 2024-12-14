function detectLanguage()
{
	// stone_getXMLCfg("languageGet", getLanguage);
	language = localStorage.getItem('language');
	if (language == "" || language == null) {
		language = DEFAULT_LANGUAGE;
	}
	// Detect Language
	// if (localStorage.getItem('language') === null)
	// {
	// 	InitLANG("en-us");
	// }
	// else
	// {
		//InitLANG(localStorage.language);
		InitLANG(language);
	// }
}
var LOCAL_HOST_IP = "/";
var language;
detectLanguage();
// function getLanguage (content) {
// 	var xml = content;
// 	console.log("getLanguage xml:", xml);

// 	language = xml["language"];
// 	localStorage.setItem('language', language);
// }
