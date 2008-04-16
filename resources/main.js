/* Common.js */

/******************************************************************************/
/******************************************************************************/

function tryit(m)
{
	try
	{
		eval(m);
	}
	catch(e)
	{
		showError("tryit", e);
		//top.location = 'error.html?e=' + msg;
	}
}

/******************************************************************************/

function showMsg(msg)
{

	if(window.external && window.external.MediaCenter)
		window.external.MediaCenter.Dialog(msg, "", 1, 5, false);
	else
		alert(msg);
}

/******************************************************************************/

var gShowErrors = false;

function enableErrors(/*boolean*/ enable)
{
	gShowErrors = enable;
}

/******************************************************************************/

function showError(loc, e)
{
	var msg;

	if(isUndefined(e.message))
		msg = e.toString();
	else
		msg = e.name + ": " + e.message;

	msg = loc + ": caught: " + msg;

	DebugOut(msg);

	if(!gShowErrors)
		return;

	if(window.external && window.external.MediaCenter)
		window.external.MediaCenter.Dialog(msg, "Error", 1, 5, false);
	else
		alert(msg);
}

/******************************************************************************/
/******************************************************************************/

function isAlien(a)
{
	return isObject(a) && typeof a.constructor != 'function';
}

/******************************************************************************/

function isArray(a)
{
	return isObject(a) && a.constructor == Array;
}

/******************************************************************************/

function isBoolean(a)
{
	return typeof a == 'boolean';
}

/******************************************************************************/

function isDate(a)
{
	return (typeof a == 'object') && a.getTime;
}

/******************************************************************************/

/* isEmpty(a) returns true if a is an object or array or function containing no enumerable members. */
function isEmpty(o)
{
	var i, v;
	if (isObject(o))
	{
		for (i in o)
		{
			v = o[i];
			if (isUndefined(v) && isFunction(v))
			{
				return false;
			}
		}
	}
	return true;
}

/******************************************************************************/

function isFunction(a)
{
	return typeof a == 'function';
}

/******************************************************************************/

function isNull(a)
{
	return typeof a == 'object' && !a;
}

/******************************************************************************/

function isNumber(a)
{
	return typeof a == 'number' && isFinite(a);
}

/******************************************************************************/

function isObject(a)
{
	return (a && typeof a == 'object') || isFunction(a);
}

/******************************************************************************/

function isString(a)
{
	return typeof a == 'string';
}

/******************************************************************************/

function isUndefined(a)
{
	return typeof a == 'undefined';
}

/******************************************************************************/

//function isNull(value)
//{
//	if((value == undefined) || (value == null))
//		return true;
//	return false;
//}

function testNull(value, defaultValue)
{
	return isNull(value) ? defaultValue : value;
}

/******************************************************************************/

function validateStrNotNull(str, method)
{
	if(str == undefined)
		throw testNull(method, "Unknown") + ":validateStrNotNull: is undefined";

	if(str == null)
		throw testNull(method, "Unknown") + ":validateStrNotNull: is null";
}

/******************************************************************************/

function testStrHasLen(str)
{
	if(!isString(str))
		return false;

	return (str.length > 0);
}

/******************************************************************************/

function validateStrHasLen(str, method)
{
	if(str == undefined)
		throw testNull(method, "Unknown") + ":validateStrHasLen: is undefined";

	if(str == null)
		throw testNull(method, "Unknown") + ":validateStrHasLen: is null";

	if(str.length == undefined)
		throw testNull(method, "Unknown") + ":validateStrHasLen: length is undefined";

	if(str.length == 0)
		throw testNull(method, "Unknown") + ":validateStrHasLen: length == 0";
}

/******************************************************************************/

function testStrIsAllNumbers(str)
{
	return /^\d+$/.test(str);
}

/******************************************************************************/
/******************************************************************************/

function getClassNameBase(curr)
{
	if(curr == undefined)
		return '';

	var parts = curr.split('_');
	if(parts.length != 2)
		return curr;
	return parts[0];
}

/******************************************************************************/

function buildClassName(curr, ext)
{
	if(curr == undefined)
		return '';

	var parts = curr.split('_');
	if(parts.length != 2)
		return curr;
	return parts[0] + '_' + ext;
}

/******************************************************************************/

function checkClassName(obj, classNameExt)
{
	if(obj.className == undefined)
		return;

	var className = obj.className;
	var newName = buildClassName(className, classNameExt)
	if(newName != className)
		obj.className = newName;
}

/******************************************************************************/

/*object*/ function findObjectWithID(/*object */ obj)
{
	var testObj = obj;

	if(!isObject(obj))
		return null;

	while(true)
	{
		if(testStrHasLen(testObj.id))
			return testObj;

		if(isObject(testObj.parentElement))
			testObj = testObj.parentElement;
		else
			return null;
	}
}

/******************************************************************************/

/*void*/ function setStyleDisplay(/*object*/ oObj, /*bool*/ show)
{
	var newDisplay = (show) ? 'inline' : 'none';

	// only change display if new value, resetting to same value seems to effect the focus.
	if(oObj && oObj.style)
		if(oObj.style.display != newDisplay)
			oObj.style.display = newDisplay;

}

/******************************************************************************/
/******************************************************************************/

function compareStrings(lhs, rhs)
{
	if(!lhs)
		lhs = "";
	if(!rhs)
		rhs = "";

	if(lhs == rhs)
		return 0;
	if(lhs < rhs)
		return -1;
	return 1;
}

/******************************************************************************/

function compareStringsIgnoreCase(lhs, rhs)
{
	return compareStrings((lhs ? lhs.toUpperCase() : lhs), (rhs ? rhs.toUpperCase() : rhs));
}

/******************************************************************************/

function compareNumbers(lhs, rhs)
{
	if(!lhs)
		lhs = 0;
	if(!rhs)
		rhs = 0;

	if(lhs == rhs)
		return 0;
	if(lhs < rhs)
		return -1;
	return 1;
}

/******************************************************************************/

function compareDates(lhs, rhs)
{
	if(!lhs)
		lhs = (new Date());
	if(!rhs)
		rhs = (new Date());

	if(lhs == rhs)
		return 0;
	if(lhs < rhs)
		return -1;
	return 1;
}

/******************************************************************************/
/******************************************************************************/

function arrayIndexOf(arr, item)
{
	for(var i = 0; i < arr.length; i++)
		if(item == arr[i])
			return i;

	return -1;
}

/******************************************************************************/

function arrayIndexOfByCmpr(arr, itemComparer)
{
	for(var i = 0; i < arr.length; i++)
		if(itemComparer.compare(arr[i]) == 0)
			return i;

	return -1;
}

/******************************************************************************/

function arrayFindItemByCmpr(arr, itemComparer)
{
	for(var i = 0; i < arr.length; i++)
		if(itemComparer.compare(arr[i]) == 0)
			return arr[i];

	return null;
}

/******************************************************************************/

function arrayRemoveByCmpr(arr, itemComparer)
{
	var pos = arrayIndexOfByCmpr(arr, itemComparer);

	if(pos < 0)
		return;

	arr.splice(pos, 1);
}

/******************************************************************************/
/******************************************************************************/

/*Event*/ function getEvent(/*Event*/ evt)
{
	if(isObject(evt))
		return evt;
	return event;
}

/******************************************************************************/

/*Object*/ function getEventSource(/*Event*/ evt)
{
	if(isObject(evt))
	{
		if(isObject(evt.target))
			return evt.target;
		if(isObject(evt.srcElement))
			return evt.srcElement;
	}

	return null;
}

/******************************************************************************/

/*int*/ function getEventKeyCode(/*Event*/ evt)
{
	if(isObject(evt))
	{
		if(evt.keyCode)
			return evt.keyCode;
		if(evt.which)
			return evt.which;
	}

	return 0;
}

/******************************************************************************/

//TODO IE ONLY
///*void*/ function setEventKeyCode(/*Event*/ evt, /*int*/ newKeyCode)
//{
//	if(isObject(evt))
//	{
//		if(evt.keyCode)
//			evt.keyCode = newKeyCode;
//		else if(evt.which)
//			evt.which = newKeyCode;
//	}
//}

/******************************************************************************/

function isEventKeyCodeNavigation(/*int*/ key)
{
	return (key == ek_Backspace)
		|| (key == ek_Tab)
		|| (key == ek_Escape)
		|| (key == ek_Select)
		|| (key == ek_Back)
		|| (key == ek_NextValue)
		|| (key == ek_PrevValue)
		|| (key == ek_UpButton)
		|| (key == ek_DownButton)
		|| (key == ek_LeftButton)
		|| (key == ek_RightButton)
		|| (key == ek_PageUp)
		|| (key == ek_PageUp);
}

/******************************************************************************/

function stopEventPropagation(evt)
{
	if(!isObject(evt) && isObject(event))
		evt = event;
	if(isObject(evt))
	{
		if(isFunction(evt.stopPropagation))
			evt.stopPropagation();
		else if(isBoolean(evt.cancelBubble))
			evt.cancelBubble = true;
	}
}

/******************************************************************************/
/******************************************************************************/

function getWindowInnerWidth()
{
	// all except Explorer
	if(self && self.innerHeight)
		return self.innerWidth;

	// Explorer 6 Strict Mode
	if(document.documentElement && document.documentElement.clientHeight)
		return document.documentElement.clientWidth;

	// other Explorers
	if(document.body && document.body.clientWidth)
		return document.body.clientWidth;

	throw "getWindowInnerWidth: can't get width";
}

/******************************************************************************/

function getWindowInnerHeight()
{
	// all except Explorer
	if(self && self.innerHeight)
		return self.innerHeight;

	// Explorer 6 Strict Mode
	if(document.documentElement && document.documentElement.clientHeight)
		return document.documentElement.clientHeight;

	// other Explorers
	if(document.body)
		return document.body.clientHeight;

	throw "getWindowInnerHeight: can't get height";
}

/******************************************************************************/
/******************************************************************************/

function getElementWidth(obj)
{
	if(!obj)
		return 0;

	if(window.getComputedStyle)
	{
		try
		{
			var objStyle = window.getComputedStyle(obj, null);
			if(objStyle && objStyle.width && (objStyle.width.length > 0))
			{
				var pxPos = objStyle.width.lastIndexOf("px");
				if(pxPos > 0)
					return parseInt(objStyle.width.substring(0, pxPos));

				return parseInt(objStyle.width);
			}
		}
		catch(e)
		{
		}
	}

	if(obj.style && obj.style.pixelWidth)
	{
		return obj.style.pixelWidth;
	}
	
	return 0;
}

/******************************************************************************/
/******************************************************************************/

/*string*/ function determineFileExtFromURL(/*string*/ url)
{
	if(!testStrHasLen(url))
		return null;

	var dotPos = url.lastIndexOf(".");
	if(dotPos < 0)
		return null;

	if(url.lastIndexOf("/") >= dotPos)
		return null;

	var paramPos = url.lastIndexOf("?");
	if(paramPos >= dotPos)
		return url.substring(dotPos, paramPos);

	return url.substring(dotPos);
}

/******************************************************************************/
/******************************************************************************/

/*XMLHttp*/ function createXMLHttpRequest()
{
	var xmlHttp = null;

	if (window.ActiveXObject) // IE
	{
		xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	else if(window.XMLHttpRequest) // Mozilla, Safari, ...
	{
		xmlHttp = new XMLHttpRequest();
		if(xmlHttp.overrideMimeType)
			xmlHttp.overrideMimeType('text/xml');
	}

	return xmlHttp;
}

/******************************************************************************/

/*XMLDocument*/ function createXmlDocument(data)
{
	var xmlDoc = null;

	if (window.ActiveXObject) // IE
	{
		xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
		xmlDoc.async = "false";
		xmlDoc.loadXML(data);
	}
	else // others
	{
		var domParser = new DOMParser();
		xmlDoc = domParser.parseFromString(data, "text/xml");
	}

	return xmlDoc;
}

/******************************************************************************/
/******************************************************************************/
/* Debugger.js */

/******************************************************************************/
/******************************************************************************/

var gDebuggerID = "Debugger";
var gDebugOutID = "Debugger_Out";
var gDebugOn = false;
var gDebugLines = new Array();
var gDebugCount = 0;

/******************************************************************************/

function DebugOn(on)
{
	gDebugOn = on ? true : false;

	setStyleDisplay(document.getElementById(gDebuggerID), gDebugOn);
}

function DebugOut(msg)
{
	try
	{
		if(!gDebugOn)
			return;

		gDebugCount++;
		gDebugLines.push("" + gDebugCount + ": " + msg);
		if(gDebugLines.length > 35)
			gDebugLines.splice(0, 1);

		var txt = "";
		for(var i = 0; i < gDebugLines.length; i++)
			txt += gDebugLines[i] + "<br>";

		document.getElementById(gDebugOutID).innerHTML = txt;
	}
	catch(e)
	{
	}
}

/******************************************************************************/

function DebugShow()
{
	var obj = document.getElementById(gDebugOutID);
	setStyleDisplay(obj, (obj.style.display == 'none'));
}

/******************************************************************************/

function DebugClear()
{
	gDebugLines = new Array();
	gDebugCount = 0;
	document.getElementById(gDebugOutID).innerHTML = "";
}

/******************************************************************************/
/******************************************************************************/
/* DateTimeUtil.js */

/******************************************************************************/
/******************************************************************************/


/* DateTimeFormat */
var dtf_ISO8601_Date = 0;			// CCYY-MM-DD
var dtf_ISO8601_DateTime = 1;		// CCYY-MM-DDThh:mm:ss
//var dtf_M_D_YY = 2;				// 2/3/04
var dtf_M_D_YYYY = 3;				// 2/3/2004
var dtf_M_YY = 4;					// 2/04
var dtf_M_D = 5;					// 2/3
//var dtf_M_D_YYYY_H_MM_AM = x;		// 2/3/2004 1:05 PM
//var dtf_M_D_YYYY_H_MM_SS_AM = x;	// 2/3/2004 1:05:07 PM
var dtf_M_D_H_MM_AM = 7;			// 2/3 1:05 PM
//var dtf_H_AM = 8;					// 1 PM
var dtf_Ha = 9;						// 1p
//var dtf_H_MM_AM = 10;				// 1:05 PM
var dtf_H_MMa = 11;					// 1:05p

var DateSeparator = "/";
var TimeSeparator = ":";

var DaysOfWeekShort = new Array("Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat");
var DaysOfWeekLong = new Array("Sunday", "Monday", "Tuesday", "Wedneday", "Thursday", "Friday", "Saturday");

var MillsPerDay = (24 * 60 * 60 * 1000);

/******************************************************************************/

/*string*/ function dateTimeToString(/*Date*/ dateTime, /*DateTimeFormat*/ format, /*boolean*/ showInUTC)
{
	if(!isDate(dateTime))
		return "";

	var year;
	var month;
	var day;
	var hour;
	var minute;
	var secs;
	var isPM;
	var timeStr;
	var minStr;

	if((format == dtf_ISO8601_Date) || (format == dtf_ISO8601_DateTime))
		showInUTC = true;

	if(showInUTC)
	{
		year = dateTime.getUTCFullYear();
		month = dateTime.getUTCMonth() + 1;
		day = dateTime.getUTCDate();

		hour = dateTime.getUTCHours();
		minute = dateTime.getUTCMinutes();
		secs = dateTime.getUTCSeconds();
	}
	else
	{
		year = dateTime.getFullYear();
		month = dateTime.getMonth() + 1;
		day = dateTime.getDate();

		hour = dateTime.getHours();
		minute = dateTime.getMinutes();
		secs = dateTime.getSeconds();
	}

	isPM = (hour >= 12);
	if(format != dtf_ISO8601_DateTime)
	{
		if(hour == 0)
			hour = 12;
		else if(hour > 12)
			hour -= 12;
	}

	minStr = prefixZeroToNum(minute);

	switch(format)
	{
		case dtf_ISO8601_Date:
			timeStr = year + "-" + prefixZeroToNum(month) + "-" + prefixZeroToNum(day);
			break;

		case dtf_ISO8601_DateTime:
			timeStr = year + "-" + prefixZeroToNum(month) + "-" + prefixZeroToNum(day) + "T" + prefixZeroToNum(hour)
				+ ":" + minStr + ":" + prefixZeroToNum(secs) + "Z";
			break;

		case dtf_M_D_YYYY:
			timeStr = month + DateSeparator + day + DateSeparator + year;
			break;

		case dtf_M_YY:
			timeStr = month + DateSeparator + (((year % 100) < 10) ? "0" : "") + (year % 100);
			break;

		case dtf_M_D:
			timeStr = month + DateSeparator + day;
			break;

		case dtf_M_D_H_MM_AM:
			timeStr = month + DateSeparator + day + " " + hour + TimeSeparator + minStr + " " + getAMPM(isPM, true);
			break;

		case dtf_Ha:
			timeStr = hour + getAMPM(isPM, false);
			break;

		case dtf_H_MMa:
			timeStr = hour + TimeSeparator + minStr + getAMPM(isPM, false);
			break;
	}

	return timeStr;
}

/******************************************************************************/

/*string*/ function dayOfWeekToString(/*int*/ dayOfWeek, /*bool*/ longFormat)
{
	return (longFormat) ? DaysOfWeekLong[dayOfWeek] : DaysOfWeekShort[dayOfWeek];
}

/******************************************************************************/

/*string*/ function getAMPM(/*bool*/ isPM, /*bool*/ longFormat)
{
	if(isPM)
		return (longFormat) ? "pm" : "p";
	return (longFormat) ? "am" : "a";
}

/******************************************************************************/

/*string*/ function prefixZeroToNum(/*int*/ num)
{
	if(num < 10)
		return "0" + num;

	return "" + num;
}

/******************************************************************************/

/*Date*/ function ISO8601DateFromString(/*string*/ value)
{
	if(!testStrHasLen(value))
		return null;

	var parts = value.split("-");
	if(parts.length == 3)
	{
		var year = parseInt(parts[0], 10);
		var month = parseInt(parts[1], 10);
		var day = parseInt(parts[2], 10);

		return new Date(Date.UTC(year, month - 1, day));
	}

	throw "ISO8601DateFromString: cannot parse date(" + value + ")";
}

/******************************************************************************/

/*Date*/ function ISO8601DateTimeFromString(/*string*/ value)
{
	if(!testStrHasLen(value))
		return null;

	var year = 0;
	var month = 0;
	var day = 0;

	var parts = value.split("T");
	if(parts.length == 1)
	{
		return ISO8601DateFromString(value);
	}
	else if(parts.length == 2)
	{
		var datePart = ISO8601DateFromString(parts[0]);
		var timePart = ISO8601TimeFromString(parts[1]);

		var dateValue = new Date(0);
		dateValue.setTime(datePart.getTime() + timePart);
		return dateValue;
	}

	throw "ISO8601DateTimeFromString: cannot parse date(" + value + ")";
}

/******************************************************************************/

/*int ticks*/ function ISO8601TimeFromString(/*string*/ value)
{
	if(!testStrHasLen(value))
		return 0;

	if(value.length >= 8)
	{
		var timeZoneTicks = 0;

		if(value.length > 8)
			timeZoneTicks = ISO8601TimeZoneFromString(value.substr(8));

		var timePart = value.substr(0,8);
		var parts = value.substr(0,8).split(":");
		if(parts.length == 3)
		{
			var hour = parseInt(parts[0], 10);
			var minute = parseInt(parts[1], 10);
			var second = parseInt(parts[2], 10);

			return (hour * 3600000) + (minute * 60000) + (second * 1000) + timeZoneTicks;
		}

	}

	throw "ISO8601TimeFromString: cannot parse time(" + value + ")";
}

/******************************************************************************/

/*int ticks*/ function ISO8601TimeZoneFromString(/*string*/ value)
{
	if(!testStrHasLen(value))
		return 0;

	if(value.length == 1)
	{
		if(value == "Z")
			return 0;
	}
	else if(value.length == 6)
	{
		var parts = value.substr(1,5).split(":");
		if(parts.length == 2)
		{
			var hour = parseInt(parts[0], 10);
			var minute = parseInt(parts[1], 10);

			var tzValue = (hour * 3600000) + (minute * 60000);

			if(value.substr(0,1) == "-")
				return tzValue;
			if(value.substr(0,1) == "+")
				return tzValue * -1;
		}
	}

	return 0;
}

/******************************************************************************/
/******************************************************************************/
/* Cookie.js */

/******************************************************************************/
/******************************************************************************/

function setCookie(name, value, sessionOnly, expires, path, domain, secure)
{
	var tenYearExpires = new Date((new Date()).getTime() + 315360000000);	//expires in 10 years

	var curCookie = name + "=" + encodeURIComponent(value);

	if(!sessionOnly)
		curCookie += ("; expires=" + ((expires)
			? expires.toGMTString() : tenYearExpires.toGMTString()));

	curCookie += "; path=" + ((path) ? path : "/")
		+ ((domain) ? "; domain=" + domain : "")
		+ ((secure) ? "; secure" : "");

	document.cookie = curCookie;
}

/******************************************************************************/

function getCookie(name)
{
	var dc = document.cookie;
	var prefix = name + "=";

	var begin = dc.indexOf("; " + prefix);
	if(begin == -1)
	{
		begin = dc.indexOf(prefix);
		if (begin != 0)
			return null;
	}
	else
		begin += 2;

	var end = document.cookie.indexOf(";", begin);
	if(end == -1)
		end = dc.length;

	return decodeURIComponent(dc.substring(begin + prefix.length, end));
}

/******************************************************************************/

function deleteCookie(name, path, domain)
{
	if(getCookie(name))
	{
		var delCookie = name + "="
			+ "; path=" + ((path) ? path : "/")
			+ ((domain) ? "; domain=" + domain : "")
			+ "; expires=" + (new Date(0)).toGMTString();

		document.cookie = delCookie;
	}
}

/******************************************************************************/
/******************************************************************************/
/* NameValuePair.js */

/******************************************************************************/
/******************************************************************************/

function NameValuePair(name, value)
{
	this.Name = null;
	this.Value = null;

	if(testStrHasLen(name))
		this.Name = name;
	if(testStrHasLen(value))
		this.Value = value;
}

/******************************************************************************/
/******************************************************************************/
/* NameValuePairCmpr.js */

/******************************************************************************/
/******************************************************************************/

function NameValuePairCmpr(/*string*/ name)
{
	this.Name = name;
}

/******************************************************************************/

/*int*/ NameValuePairCmpr.prototype.compare = function(oNameValuePair)
{
	if(this.Name == oNameValuePair.Name)
		return 0;
	if(this.Name < oNameValuePair.Name)
		return -1;
	return 1;
}

/******************************************************************************/
/******************************************************************************/
/* Money.js */

/******************************************************************************/
/******************************************************************************/

var CurrencyIDMaxLength = 3;

var cur_USD = "USD";

/******************************************************************************/

function Money(reader)
{
	this.CurrencyID = null;
	this.Amount = null;

	if(reader != undefined)
		this.readFrom(reader);
}

/******************************************************************************/

/*void*/ Money.prototype.readFrom = function(/*DataReader*/ reader)
{
	this.CurrencyID = reader.readString("CurrencyID", CurrencyIDMaxLength);
	this.Amount = reader.readDouble("Amount");
}

/******************************************************************************/

/*void*/ Money.prototype.writeTo = function(/*DataWriter*/ writer)
{
	writer.writeString("CurrencyID", this.CurrencyID, CurrencyIDMaxLength);
	writer.writeDouble("Amount", this.Amount);
}

/******************************************************************************/
/******************************************************************************/
/* MainApp.js */

/******************************************************************************/
/******************************************************************************/

/* Event Keys */
var ek_Backspace = 8;
var ek_Tab = 9;
var ek_Escape = 27;
var ek_Select = 256;
var ek_Back = 257;
var ek_NextValue = 258;
var ek_PrevValue = 259;
var ek_UpButton = 260;
var ek_DownButton = 261;
var ek_LeftButton = 262;
var ek_RightButton = 263;
var ek_PageUp = 264;
var ek_PageDown = 265;

/* Colors */
var g_Color_White = "#F0F0F0";
var g_Color_Black = "#101010";

/******************************************************************************/

var gMainApp = null;

/******************************************************************************/
/******************************************************************************/

function onRemoteEvent(keyCode)
{
	// for the numerics on the Remote, MCE returns both "keypress" and "onremote" events, causing double chars.
	// so "eat" the numerics from the Remote, they'll be handled by "keypress" event.
	if((keyCode >= 48) && (keyCode <= 57))
		return true;

	return !MainAppOnRemoteEvent(keyCode, event);
}

/******************************************************************************/

function onScaleEvent(vScale)
{
	document.getElementById("ScaleText").innerHTML = vScale;
	if(isString(document.body.style.zoom))
		document.body.style.zoom = vScale;
}

/******************************************************************************/

function DoScale()
{
	MainApp.getThe().onScale();
}

/******************************************************************************/
/******************************************************************************/

MainApp.getThe = function()
{
	if(gMainApp == null)
		gMainApp = new MainApp();
	return gMainApp;
}

/******************************************************************************/

function MainApp()
{
	this.fInit = false;
	this.fScreenList = new Array();
	this.fSession = null;
	this.fMainTable = null;
	this.fMainPopup = null;
//	this.fScreenTitle = null;
//	this.fScreenTitleImageDiv = null;
//	this.fScreenTitleImage = null;
	this.fFirstMouseMove = false;
}

/******************************************************************************/
/******************************************************************************/

/*void*/ MainApp.prototype.reset = function()
{
	this.closeAllScreens();
	this.fSession = Session.newInstance();
}

/******************************************************************************/

/*void*/ MainApp.prototype.init = function()
{
	if(this.fInit)
		return;
	this.fInit = true;
	//DebugOn(true);

	document.onkeyup = MainAppOnKeyUp;
	document.onkeydown = MainAppOnKeyDown;
	document.onkeypress = MainAppOnKeyPress;
	window.onresize = MainAppOnResize;

	//document.body.scroll = "no";
	//document.body.focus();

	this.fMainTable = document.getElementById("MainTable");
	this.fMainPopup = document.getElementById("MainPopup");
//	this.fScreenTitle = document.getElementById("ScreenTitle");
//	this.fScreenTitleImageDiv = document.getElementById("ScreenTitleImageDiv");
//	this.fScreenTitleImage = document.getElementById("ScreenTitleImage");

	this.updateMainBodyDivHeight();
	this.updateMainPopupPosition();
	enableErrors(false);
	window.setTimeout("MainAppIdle()", 500);
	this.reset();
}

/******************************************************************************/

/*vod*/ MainApp.prototype.updateMainBodyDivHeight = function()
{
	var oMainBodyDiv = document.getElementById("MainBodyDiv");
	var oAppTable = document.getElementById("AppTable");

	if(oMainBodyDiv && oAppTable)
	{
		var extra = 40; //border & footer
		if (oMainBodyDiv.offsetTop == 0)
			extra += 20;	//fudge for IE

		var newDivHeight = getWindowInnerHeight() - extra - oAppTable.offsetTop;
		oAppTable.style.height = newDivHeight + "px";
		oMainBodyDiv.style.height = newDivHeight + "px";
	}
}

/******************************************************************************/

/*vod*/ MainApp.prototype.updateMainPopupPosition = function()
{
	if(this.fMainPopup && this.fMainPopup.style)
	{
		var width = getElementWidth(this.fMainPopup);
		if(width > 0)
			this.fMainPopup.style.left = ((getWindowInnerWidth() / 2) - (width / 2)) + "px";
	}
}

/******************************************************************************/

/*void*/ MainApp.prototype.openPopup = function()
{
	this.closeAllScreens();
	setStyleDisplay(this.fMainPopup, true);
}

/******************************************************************************/

/*void*/ MainApp.prototype.closePopup = function()
{
	this.closeAllScreens();
	setStyleDisplay(this.fMainPopup, false);
}

/******************************************************************************/

/*Screen*/ MainApp.prototype.openScreen = function(/*Screen*/ oScreen)
{
	var oCurScreen = null;

	if(this.fScreenList.length > 0)
		oCurScreen = this.fScreenList[this.fScreenList.length - 1];

	this.fScreenList.push(oScreen);

	this.fFirstMouseMove = true;
//	this.showScreenTitle(oScreen);
	oScreen.moveTo(this.fMainTable.offsetLeft, this.fMainTable.offsetTop);
	oScreen.show(true);
	oScreen.setFocus(true);

	if(oCurScreen != null)
	{
		oCurScreen.show(false);
//		oCurScreen.setFocus(false);
	}

	return oScreen;
}

/******************************************************************************/

/*void*/ MainApp.prototype.closeScreen = function(/*int*/ screenID)
{
	var oScreen;
	var pos = -1;

	// search for screenID, hiding all
	for(var i = 0; i < this.fScreenList.length; i++)
	{
		oScreen = this.fScreenList[i];
		oScreen.show(false);

		if(oScreen.ScreenID == screenID)
			pos = i;
	}

	if(pos >= 0)
		this.fScreenList.splice(pos, 1);

	if(this.fScreenList.length > 0)
	{
		oScreen = this.fScreenList[this.fScreenList.length - 1];
//		this.showScreenTitle(oScreen);
		oScreen.show(true);
		oScreen.setFocus(true);
	}
}

/******************************************************************************/

/*void*/ MainApp.prototype.closeAllScreens = function()
{
	for(var i = this.fScreenList.length - 1; i >= 0; i--)
		this.fScreenList[i].close();
}

/******************************************************************************/

/*Screen*/ MainApp.prototype.findScreen = function(/*string */ screenID)
{
	for(var i = 0; i < this.fScreenList.length; i++)
		if(this.fScreenList[i].ScreenID == screenID)
			return this.fScreenList[i];

	return null;
}

/******************************************************************************/

/*Screen*/ MainApp.prototype.getScreen = function(/*string */ screenID)
{
	var oScreen = this.findScreen(screenID);

	if(oScreen != null)
		return oScreen;

	throw "MainApp.getScreen: can't find screen, ID(" + screenID + ")";
}

/******************************************************************************/

///*void*/ MainApp.prototype.showScreenTitle = function(/*Screen*/ oScreen)
//{
//	if(oScreen.ScreenTitleImage && (oScreen.ScreenTitleImage.length > 0))
//	{
//		this.fScreenTitleImage.src = "images/" + oScreen.ScreenTitleImage;
//		setStyleDisplay(this.fScreenTitleImageDiv, true);
//		setStyleDisplay(this.fScreenTitle, false);
//	}
//	else
//	{
//		this.fScreenTitle.innerHTML = oScreen.ScreenTitle;
//		setStyleDisplay(this.fScreenTitle, true);
//		setStyleDisplay(this.fScreenTitleImageDiv, false);
//	}
//}

/******************************************************************************/

/*void*/ MainApp.prototype.onResize = function()
{
	if(this.fScreenList.length > 0)
	{
		var oCurScreen = this.fScreenList[this.fScreenList.length - 1];
		oCurScreen.moveTo(this.fMainTable.offsetLeft, this.fMainTable.offsetTop);
	}
}

/******************************************************************************/

/*void*/ MainApp.prototype.onScale = function()
{
// scale to the current window size
//		var newScale = (document.body.style.zoom.length > 0)
//			? ((document.body.style.zoom * document.body.clientWidth) / 1024)
//			: (document.body.clientWidth / 1024);
//
//		onScaleEvent(newScale);

	// toggle on scaling on and off
	var newScale = "";

	if(isString(document.body.style.zoom) && (document.body.style.zoom.length == 0))
	{
		var horzScale = document.body.getBoundingClientRect().right / 1024;
		var vertScale = document.body.getBoundingClientRect().bottom / 768;

		newScale = (horzScale > vertScale) ? vertScale : horzScale;
	}

	onScaleEvent(newScale);
	this.onResize();
}

/******************************************************************************/

/*void*/ MainApp.prototype.key = function(/*int*/ keyCode, /*Event*/ evt)
{
	if(this.fScreenList.length > 0)
	{
		var oScreen = this.fScreenList[this.fScreenList.length - 1];
		var handled = oScreen.key(keyCode, evt);

		// if going back and all screens have been closed, return control to browser
		if((keyCode == ek_Back) && (this.fScreenList.length == 0))
			return false;
		if((keyCode == ek_Escape) && (this.fScreenList.length == 0))
			return false;

		//IE converts a Backspace into the <Back> button, if we have an open screen, don't pass event to IE
//		if((keyCode == ek_Backspace) && (this.fScreenList.length > 0))
//			handled = true;
		//IE don't let IE/MCE handle Tab key
//		if(keyCode == ek_Tab)
//			handled = true;

		if(!handled)
			;	//TODO: beep sound

		return handled;
	}

	return false;
}

/******************************************************************************/

/*void*/ MainApp.prototype.idle = function()
{
	// If fFirstMouseMove has not yet been cleared, clear it.  IE and non full-screen MCE don't get the bogus
	// mouse move events.
	if(this.fFirstMouseMove)
		this.fFirstMouseMove = false;

	if(this.fScreenList.length > 0)
	{
		var oScreen = this.fScreenList[this.fScreenList.length - 1];

		oScreen.idle();
	}
}

/******************************************************************************/

/*void*/ MainApp.prototype.mouseClick = function(/*string*/ controlID)
{
	if(this.fScreenList.length > 0)
	{
		var oScreen = this.fScreenList[this.fScreenList.length - 1];

		oScreen.mouseClick(controlID);
	}
}

/******************************************************************************/

/*void*/ MainApp.prototype.mouseMove = function(/*string*/ controlID)
{
	// One MCX and full-screen MCE at console, a bogus mouse move event if shifting focus to center of screen.
	// Need to "eat" first event, subsequent events are valid.
	if(this.fFirstMouseMove)
	{
		this.fFirstMouseMove = false;
		return;
	}

	if(this.fScreenList.length > 0)
	{
		var oScreen = this.fScreenList[this.fScreenList.length - 1];

		oScreen.mouseMove(controlID);
	}
}

/******************************************************************************/

/*void*/ MainApp.prototype.focusEvent = function(/*string*/ controlID)
{
	if(this.fScreenList.length > 0)
	{
		var oScreen = this.fScreenList[this.fScreenList.length - 1];

		oScreen.focusEvent(controlID);
	}
}


/******************************************************************************/

/*void*/ MainApp.prototype.blurEvent = function(/*string*/ controlID)
{
	if(this.fScreenList.length > 0)
	{
		var oScreen = this.fScreenList[this.fScreenList.length - 1];

		oScreen.blurEvent(controlID);
	}
}

/******************************************************************************/

/*Session*/ MainApp.prototype.getSession = function()
{
	return this.fSession;
}

/******************************************************************************/
/******************************************************************************/

function MainAppOnKeyDown(evt)
{
	evt = getEvent(evt);
	var keyCode = getEventKeyCode(evt);
	if((keyCode == 8)
			|| (keyCode == 9)
			|| (keyCode == 13)
			|| ((keyCode >= 33) && (keyCode <= 34))
			|| ((keyCode >= 37) && (keyCode <= 40)))
		return MainAppOnRemoteEvent(keyCode, evt);
	return true;
}

/******************************************************************************/

function MainAppOnKeyUp()
{
	return true;
}

/******************************************************************************/

function MainAppOnKeyPress(evt)
{
	evt = getEvent(evt);
	var keyCode = getEventKeyCode(evt);
	if((keyCode != 8)
			&& (keyCode != 9)
			&& (keyCode != 13)
			&& !((keyCode >= 33) && (keyCode <= 34))
			&& !((keyCode >= 37) && (keyCode <= 40))
			&& !((keyCode >= 63232) && (keyCode <= 63235)))
		return MainAppOnRemoteEvent(keyCode, evt);
	return true;
}

/******************************************************************************/

function MainAppOnRemoteEvent(keyCode, evt)
{
	try
	{
		if(!WaitScreen_isOpen())
			return !MainApp.getThe().key(MainAppMapKey(keyCode), evt);
	}
	catch(e)
	{
		showError("MainAppOnRemoteEvent", e);
	}

	return true;
}

/******************************************************************************/

function MainAppMapKey(key)
{
	if(key == 13)
		key = ek_Select;
	else if(key == 166)
		key = ek_Back;
	else if(key == 33)
		key = ek_PageUp;
	else if(key == 34)
		key = ek_PageDown;
	else if((key == 37) || (key == 63234))
		key = ek_LeftButton;
	else if((key == 38) || (key == 63232))
		key = ek_UpButton;
	else if((key == 39) || (key == 63235))
		key = ek_RightButton;
	else if((key == 40) || (key == 63233))
		key = ek_DownButton;

	return key;
}

/******************************************************************************/

function MainAppIdle()
{
	window.setTimeout("MainAppIdle()", 500);
	try
	{
		MainApp.getThe().idle();
	}
	catch(e)
	{
		showError("MainAppIdle", e);
	}
}

/******************************************************************************/

function MainAppOnMouseClick(evt)
{
	try
	{
		if(!WaitScreen_isOpen())
		{
			evt = getEvent(evt);
			var obj = getEventSource(evt);
			obj = findObjectWithID(obj);
			if(obj != null)
				MainApp.getThe().mouseClick(obj.id);
		}
	}
	catch(e)
	{
		showError("MainAppOnMouseClick", e);
	}
}

/******************************************************************************/

function MainAppOnMouseOver(evt)
{
	try
	{
		evt = getEvent(evt);
		var obj = getEventSource(evt);
		obj = findObjectWithID(obj);
		if(obj != null)
			MainApp.getThe().mouseMove(obj.id);
	}
	catch(e)
	{
		showError("MainAppOnMouseOver", e);
	}
}

/******************************************************************************/

function MainAppOnFocus(evt)
{
	try
	{
		evt = getEvent(evt);
		var obj = getEventSource(evt);
		obj = findObjectWithID(obj);
		if(obj != null)
			MainApp.getThe().focusEvent(obj.id);
	}
	catch(e)
	{
		showError("MainAppOnFocus", e);
	}
}

/******************************************************************************/

function MainAppOnBlur(evt)
{
	try
	{
		evt = getEvent(evt);
		var obj = getEventSource(evt);
		obj = findObjectWithID(obj);
		if(obj != null)
			MainApp.getThe().blurEvent(obj.id);
	}
	catch(e)
	{
		showError("MainAppOnBlur", e);
	}
}

/******************************************************************************/

function MainAppOnResize()
{
	try
	{
		MainApp.getThe().onResize();
	}
	catch(e)
	{
		showError("MainAppOnMouseOver", e);
	}
}

/******************************************************************************/
/******************************************************************************/
/* Screen */

/******************************************************************************/
/******************************************************************************/

function Screen()
{
	this.ScreenID = null;
	this.ScreenTitle = "";
	this.ScreenTitleImage = "";
	this.fContainerControl = null;
}

/******************************************************************************/

/*booealn*/ Screen.prototype.isOpen = function()
{
	return (MainApp.getThe().findScreen(this.ScreenID) != null);
}

/******************************************************************************/

/*void*/ Screen.prototype.close = function()
{
	MainApp.getThe().closeScreen(this.ScreenID);
}

/******************************************************************************/

/*void*/ Screen.prototype.newControl = function(oControl)
{
	this.fContainerControl.newControl(oControl);
}

/******************************************************************************/

/*Control*/ Screen.prototype.findControl = function(/*string*/ controlID)
{
	if(this.fContainerControl != null)
		return this.fContainerControl.findControl(controlID);
	return null;
}

/******************************************************************************/

/*Control*/ Screen.prototype.getControl = function(/*string*/ controlID)
{
	return this.fContainerControl.getControl(controlID);
}

/******************************************************************************/

/*Control*/ Screen.prototype.deleteControl = function(/*string*/ controlID)
{
	return this.fContainerControl.deleteControl(controlID);
}

/******************************************************************************/

/*void*/ Screen.prototype.moveTo = function(/*int*/ left, /*int*/ top)
{
	this.fContainerControl.moveTo(left, top);
}

/******************************************************************************/

/*void*/ Screen.prototype.show = function(show)
{
	this.fContainerControl.show(show);
}

/******************************************************************************/

/*void*/ Screen.prototype.setFocus = function(/*boolean*/ set)
{
	this.fContainerControl.setFocus(set);
}

/******************************************************************************/

/*void*/ Screen.prototype.focusControl = function(/*string*/ controlID, /*boolean*/ set)
{
	this.fContainerControl.focusControl(controlID, set);
}

/******************************************************************************/

/*boolean*/ Screen.prototype.key = function(/*int*/ keyCode, /*Event*/ evt)
{
	if(this.fContainerControl.key(keyCode, evt))
		return true;

	if((keyCode == ek_Back) || (keyCode == ek_Escape))
	{
		this.close();
		return true;
	}

	return false;
}

/******************************************************************************/

/*void*/ Screen.prototype.idle = function()
{
	this.fContainerControl.idle();
}

/******************************************************************************/

/*void*/ Screen.prototype.mouseClick = function(/*string*/ controlID)
{
	this.fContainerControl.mouseClick(controlID);
}

/******************************************************************************/

/*void*/ Screen.prototype.mouseMove = function(/*bool buttonDown,*/ controlID)
{
	this.fContainerControl.mouseMove(controlID);
}

/******************************************************************************/

/*void*/ Screen.prototype.focusEvent = function(/*string*/ controlID)
{
	this.fContainerControl.focusEvent(controlID);
}

/******************************************************************************/

/*void*/ Screen.prototype.blurEvent = function(/*string*/ controlID)
{
	this.fContainerControl.blurEvent(controlID);
}

/******************************************************************************/

/*void*/ Screen.prototype.onButton = function(/*string*/ controlID)
{
	// default action is to proceed to the next field
	this.key(ek_DownButton, null);
}

/******************************************************************************/

/*void*/ Screen.prototype.onFocus = function(/*string*/ controlID)
{
}

/******************************************************************************/

/*void*/ Screen.prototype.onListItem = function(/*string*/ controlID)
{
}

/******************************************************************************/
/******************************************************************************/
/* Control */

/******************************************************************************/
/******************************************************************************/

function Control()
{
	this.ControlID = null;
	this.ScreenID = null;
	this.fUIObj = null;
	this.fEnabled = true;
	this.fFocused = false;
}

/******************************************************************************/

/*Screen*/ Control.prototype.getScreen = function()
{
	return MainApp.getThe().getScreen(this.ScreenID);
}

/******************************************************************************/

/*void*/ Control.prototype.show = function(show)
{
	setStyleDisplay(this.fUIObj, show);
}

/******************************************************************************/

/*boolean*/ Control.prototype.isEnabled = function() { return this.fEnabled; }

/******************************************************************************/

/*void*/ Control.prototype.setEnabled = function(/*boolean*/ enable)
{
	this.fEnabled = enable;
}

/******************************************************************************/

/*boolean*/ Control.prototype.canFocus = function() { return this.fEnabled; }

/******************************************************************************/

/*boolean*/ Control.prototype.hasFocus = function() { return this.fFocused; }

/******************************************************************************/

/*void*/ Control.prototype.setFocus = function(/*boolean*/ set)
{
}

/******************************************************************************/

/*void*/ Control.prototype.focusEvent = function(/*string*/ controlID)
{
}

/******************************************************************************/

/*void*/ Control.prototype.blurEvent = function(/*string*/ controlID)
{
}

/******************************************************************************/

/*boolean*/ Control.prototype.hasControl = function(/*string*/ controlID)
{
	return this.ControlID == controlID;
}

/******************************************************************************/

/*boolean*/ Control.prototype.key = function(/*int*/ key, /*Event*/ evt)
{
	return false;
}

/******************************************************************************/

/*void*/ Control.prototype.idle = function()
{
}

/******************************************************************************/

/*void*/ Control.prototype.mouseClick = function(/*string*/ controlID)
{
}

/******************************************************************************/

/*void*/ Control.prototype.mouseMove = function(/*bool buttonDown,*/ controlID)
{
}

/******************************************************************************/
/******************************************************************************/
/* ContainerControl.js */

/******************************************************************************/
/******************************************************************************/

function ContainerControl(/*int*/ controlID, /*int*/ left, /*int*/ top)
{
	if(controlID)	// default ctor will be called by inherited objects
		this.init(controlID, left, top);
}

/******************************************************************************/

/*void*/ ContainerControl.prototype.init = function(/*int*/ controlID, /*int*/ left, /*int*/ top)
{
	this.ControlID = controlID;
	this.fUIObj = document.getElementById(controlID);
	if(this.fUIObj == null)
		throw "ContainerControl::ctor(controlID): Can't find UI object, ID(" + controlID + ")";
	this.fLeft = left;
	this.fTop = top;
	this.fControlArray = new Array();
	this.fFocusedControlPos = -1;
	this.DefaultFocusControlID = null;
	this.onNavigate = new Function("return null;");
}

/******************************************************************************/

/*void*/ ContainerControl.prototype.moveTo = function(/*int*/ left, /*int*/ top)
{
	this.fUIObj.style.left = (this.fLeft + left) + "px";
	this.fUIObj.style.top = (this.fTop + top) + "px";
}

/******************************************************************************/

/*void*/ ContainerControl.prototype.show = function(show)
{
	setStyleDisplay(this.fUIObj, show);
}

/******************************************************************************/

/*boolean*/ ContainerControl.prototype.isEnabled = function() { return true; }

/******************************************************************************/

/*void*/ ContainerControl.prototype.newControl = function(oControl)
{
	this.fControlArray[this.fControlArray.length] = oControl;
}

/******************************************************************************/

/*boolean*/ ContainerControl.prototype.hasControl = function(/*string*/ controlID)
{
	if(this.ControlID == controlID)
		return true;

	return (this.findControl(controlID) != null);
}

/******************************************************************************/

/*Control*/ ContainerControl.prototype.findControl = function(controlID)
{
	var oControl;

	for(var i = 0; i < this.fControlArray.length; i++)
	{
		oControl = this.fControlArray[i];
		if(oControl.hasControl(controlID))
			return oControl;
	}

	return null;
}

/******************************************************************************/

/*Control*/ ContainerControl.prototype.findControlPos = function(controlID)
{
	var oControl;

	for(var i = 0; i < this.fControlArray.length; i++)
	{
		oControl = this.fControlArray[i];
		if(oControl.hasControl(controlID))
			return i;
	}

	return -1;
}

/******************************************************************************/

/*Control*/ ContainerControl.prototype.getControl = function(controlID)
{
	var oControl = this.findControl(controlID);

	if(oControl != null)
		return oControl;

	throw "ContainerControl.getControl: Invalid ControlID(" + controlID + ")";
}

/******************************************************************************/

/*void*/ ContainerControl.prototype.deleteControl = function(controlID)
{
	var oControl;

	for(var i = 0; i < this.fControlArray.length; i++)
	{
		oControl = this.fControlArray[i];
		if(oControl.ControlID == controlID)
		{
			this.fControlArray.splice(i, 1);
			if(this.fFocusedControlPos >= this.fControlArray.length)
				this.fFocusedControlPos = this.fControlArray.length - 1;
			return;
		}
	}

	throw "ContainerControl.deleteControl: Invalid ControlID(" + controlID + ")";
}

/******************************************************************************/

/*boolean*/ ContainerControl.prototype.loadData = function(/*object*/ oData)
{
	return true;
}

/******************************************************************************/

/*boolean*/ ContainerControl.prototype.unloadData = function(/*object*/ oData)
{
	return true;
}

/******************************************************************************/

/*boolean*/ ContainerControl.prototype.canFocus = function()
{
	var oControl;

	for(var i = 0; i < this.fControlArray.length; i++)
	{
		oControl = this.fControlArray[i];
		if(oControl.canFocus())
			return true;
	}

	return false;
}

/******************************************************************************/

/*boolean*/ ContainerControl.prototype.hasFocus = function()
{
	var oControl;

	for(var i = 0; i < this.fControlArray.length; i++)
	{
		oControl = this.fControlArray[i];
		if(oControl.hasFocus())
			return true;
	}

	return false;
}

/******************************************************************************/

/*void*/ ContainerControl.prototype.setFocus = function(/*boolean*/ set, /*string*/ controlID)
{
	var oControl;

	// was a control ID specified
	if(controlID)
	{
		if(this.ControlID != controlID)
		{
			oControl = this.findControl(controlID)
			if(oControl != null)
				this.focusControl(controlID, set);
		}
		return;
	}

	// does any control already has the focus?
	oControl = this.findFocusedControl();
	if(oControl != null)
	{
		if(oControl.canFocus())		// check canFocus in case control became disabled
		{
			//oControl.setFocus(set);
			return;
		}
		this.fFocusedControlPos = -1;	// clear focused control
	}

	// was a "default" control specified?
	if(this.DefaultFocusControlID)
	{
		oControl = this.findControl(this.DefaultFocusControlID);
		if(oControl != null)
		{
			if(oControl.canFocus())		// check canFocus in case control became disabled
			{
				this.focusControl(this.DefaultFocusControlID, set);
				return;
			}
		}
	}

	// if setting, give first child the focus
	if(set)
	{
		for(var i = 0; i < this.fControlArray.length; i++)
		{
			oControl = this.fControlArray[i];
			if(oControl.canFocus())
			{
				this.focusControl(oControl.ControlID, true);
				break;
			}
		}
	}
}

/******************************************************************************/

/*Control*/ ContainerControl.prototype.findFocusedControl = function()
{
	if(this.fFocusedControlPos >= 0)
		return this.fControlArray[this.fFocusedControlPos];

	return null;
}

/******************************************************************************/

/*void*/ ContainerControl.prototype.focusControl = function(/*string*/ controlID, /*boolean*/ set)
{
	var oControl;
	var pos;

	pos = this.findControlPos(controlID);
	if(pos < 0)
		return;
	oControl = this.fControlArray[pos];
	if(!oControl.canFocus())
		return;

	if(set)
	{
		if(this.fFocusedControlPos >= 0)
			this.fControlArray[this.fFocusedControlPos].setFocus(false);

		this.fFocusedControlPos = pos;
		oControl.setFocus(true);
	}
	else
		oControl.setFocus(false);
}

/******************************************************************************/

/*boolean*/ ContainerControl.prototype.key = function(/*int*/ keyCode, /*Event*/ evt)
{
	var oCurControl = null;
	var focusedPos = this.fFocusedControlPos;
	var nextfocusPos = -1;

	if(focusedPos != -1)
	{
		oCurControl = this.fControlArray[focusedPos];
		if(oCurControl.key(keyCode, evt))
			return true;

		var nextControlID = this.onNavigate(oCurControl.ControlID, keyCode);
		if(nextControlID != null)
			nextfocusPos = this.findControlPos(nextControlID);
	}

	if(nextfocusPos == -1)
	{
		if((keyCode == ek_DownButton) || ((keyCode == ek_Tab) && !evt.shiftKey))
		{
			for(var i = focusedPos + 1; i < this.fControlArray.length; i++)
				if(this.fControlArray[i].canFocus())
				{
					nextfocusPos = i;
					break;
				}
		}

		if((keyCode == ek_UpButton) || ((keyCode == ek_Tab) && evt.shiftKey))
		{
			for(var i = focusedPos - 1; i >= 0; i--)
				if(this.fControlArray[i].canFocus())
				{
					nextfocusPos = i;
					break;
				}
		}
	}

	if(nextfocusPos != -1)
	{
		if(oCurControl != null)
			oCurControl.setFocus(false);
		this.fFocusedControlPos = nextfocusPos;
		this.fControlArray[nextfocusPos].setFocus(true);
		return true;
	}

	return false;
}

/******************************************************************************/

/*void*/ ContainerControl.prototype.idle = function()
{
	var focusedPos = this.fFocusedControlPos;
	if(focusedPos != -1)
		(this.fControlArray[focusedPos]).idle();
}

/******************************************************************************/

/*void*/ ContainerControl.prototype.mouseClick = function(/*string*/ controlID)
{
	var oControl = this.findControl(controlID);

	if((oControl != null) && oControl.isEnabled())
		oControl.mouseClick(controlID);
}

/******************************************************************************/

//TODO: needs to recursively setFocus()
/*void*/ ContainerControl.prototype.mouseMove = function(/*bool buttonDown,*/ controlID)
{
/*
	if(buttonDown)
		return;
*/

	var oControl;

	for(var i = 0; i < this.fControlArray.length; i++)
	{
		oControl = this.fControlArray[i];

		if (oControl.hasControl(controlID))
		{
//			if(oControl.canFocus())
//			{
//				var oFocusedControl = this.findFocusedControl();
//
//				if(!oControl.hasFocus() || (oFocusedControl == null)
//					|| (oFocusedControl.ControlID != oControl.ControlID))
//				{
//					if((oFocusedControl != null)
//							&& (oFocusedControl.ControlID != oControl.ControlID))
//						oFocusedControl.setFocus(false);
//
//					this.fFocusedControlPos = i;
//					oControl.setFocus(true);
//				}
//			}
			oControl.mouseMove(/*bool buttonDown,*/ controlID)

			return;
		}
	}
}

/******************************************************************************/

/*void*/ ContainerControl.prototype.focusEvent = function(/*string*/ controlID)
{
	var oControl = this.findControl(controlID);
	if((oControl != null) && oControl.canFocus())
	{
		this.fFocusedControlPos = this.findControlPos(oControl.ControlID);
		oControl.focusEvent(controlID);
	}
}

/******************************************************************************/

/*void*/ ContainerControl.prototype.blurEvent = function(/*string*/ controlID)
{
	var oControl = this.findControl(controlID);
	if(oControl != null)
		oControl.blurEvent(controlID);
}

/******************************************************************************/
/******************************************************************************/
/* ButtonControl */

/******************************************************************************/
/******************************************************************************/

ButtonControl.prototype = new Control();
ButtonControl.prototype.constructor = ButtonControl;

/******************************************************************************/

function ButtonControl(/*string*/ controlID, /*string*/ screenID)
{
	this.ControlID = controlID;
	this.ScreenID = screenID;
	this.fUIObj = document.getElementById(controlID);
	if(this.fUIObj == null)
		throw "ButtonControl::ctor(controlID): Can't find UI object, ID(" + controlID + ")";
	this.fUIObj.onmouseover = MainAppOnMouseOver;
	this.fUIObj.onclick = MainAppOnMouseClick;
	this.fUIObj.onfocus = MainAppOnFocus;
	this.fUIObj.onblur = MainAppOnBlur;
	this.fUIObjFrame = document.getElementById(controlID + "_Frame");

	checkClassName(this.fUIObj, 'normal');
	if(this.fUIObjFrame != null)
		checkClassName(this.fUIObjFrame, 'normal');

	this.fFocused = false;
	this.setFocus(false);
}

/******************************************************************************/

/*void*/ ButtonControl.prototype.setText = function(/*string*/ text)
{
	this.fUIObj.innerHTML = text;
}

/******************************************************************************/

/*void*/ ButtonControl.prototype.setEnabled = function(/*boolean*/ enable)
{
	this.fEnabled = enable;
	checkClassName(this.fUIObj, this.fEnabled ? (this.fFocused ? 'hilite' : 'normal') : 'disabled');
	if(this.fUIObjFrame != null)
		checkClassName(this.fUIObjFrame, this.fEnabled ? (this.fFocused ? 'hilite' : 'normal') : 'disabled');
}

/******************************************************************************/

/*void*/ ButtonControl.prototype.setFocus = function(/*boolean*/ set)
{
	if(set)
		this.fUIObj.focus();
}

/******************************************************************************/

/*void*/ ButtonControl.prototype.focusEvent = function(/*string*/ controlID)
{
	var wasFocused = this.fFocused;
	checkClassName(this.fUIObj, 'hilite');
	if(this.fUIObjFrame != null)
		checkClassName(this.fUIObjFrame, 'hilite');
	this.fFocused = true;
	if(!wasFocused)
		this.getScreen().onFocus(this.ControlID);
}

/******************************************************************************/

/*void*/ ButtonControl.prototype.blurEvent = function(/*string*/ controlID)
{
	checkClassName(this.fUIObj, 'normal');
	if(this.fUIObjFrame != null)
		checkClassName(this.fUIObjFrame, 'normal');
	this.fFocused = false;
}

/******************************************************************************/

/*boolean*/ ButtonControl.prototype.key = function(/*int*/ key, /*Event*/ evt)
{
	if(key == ek_Select)
	{
		this.getScreen().onButton(this.ControlID);
		return true;
	}

	return Control.prototype.key.call(this, key, evt);
}

/******************************************************************************/

/*void*/ ButtonControl.prototype.mouseClick = function(/*string*/ controlID)
{
	this.getScreen().onButton(this.ControlID);
}

/******************************************************************************/
/******************************************************************************/
/* EditControl */

/******************************************************************************/
/******************************************************************************/

/* EditControlType */
var ect_AlphaNumeric = 0;		// all upper and lower A - Z and 0 - 9
var ect_UpperAlphaNumeric = 1;	// upper only A - Z and 0 - 9
var ect_Numeric = 2;			// only 0 - 9

/******************************************************************************/

EditControl.AlphaNumericValidCharArray = null;
EditControl.UpperAlphaNumericValidCharArray = null;
EditControl.NumericValidCharArray = null;

/******************************************************************************/

EditControl.prototype = new Control();
EditControl.prototype.constructor = EditControl;

/******************************************************************************/

function EditControl(/*string*/ controlID, /*string*/ screenID, /*int*/ fieldSize, /*int*/ maxLength)
{
	this.ControlID = controlID;
	this.ScreenID = screenID;
	this.fUIObj = document.getElementById(controlID);
	if(this.fUIObj == null)
		throw "EditControl::ctor(controlID): Can't find UI object, ID(" + controlID + ")";
//	this.fUIObj.onmouseover = MainAppOnMouseOver;
//	this.fUIObj.onclick = MainAppOnMouseClick;
	this.fUIObj.onfocus = MainAppOnFocus;
	this.fUIObj.onblur = MainAppOnBlur;
	this.fUIObj.size = fieldSize;
	this.fUIObj.maxLength = maxLength;
	this.fUIObj.value = "";
	this.fFocused = false;
	this.Type = ect_UpperAlphaNumeric;
//TODO?	this.AutoButton = false;

	this.setFocus(false);
}

/******************************************************************************/

/*string*/ EditControl.prototype.getText = function()
{
	return this.fUIObj.value;
}

/******************************************************************************/

/*void*/ EditControl.prototype.setText = function(/*string*/ text)
{
	this.fUIObj.value = (testStrHasLen(text) ? text : "");
}

/******************************************************************************/

/*void*/ EditControl.prototype.setFieldSize = function(/*int*/ fieldSize, /*int*/ maxLength)
{
	this.fUIObj.size = fieldSize;
	this.fUIObj.maxLength = maxLength;
}

/******************************************************************************/

/*Array*/ EditControl.prototype.getValidCharArray = function(/*EditControlType*/ editControlType)
{
	var invalidAlphaUpper = false;
	var invalidAlphaLower = false;
	var includeNumeric = false;
	var includeSpecial = false;

	if(editControlType == ect_AlphaNumeric)
	{
		if(EditControl.AlphaNumericValidCharArray != null)
			return EditControl.AlphaNumericValidCharArray;

		invalidAlphaUpper = true;
		invalidAlphaLower = true;
		includeNumeric = true;
		includeSpecial = true;
	}
	else if(editControlType == ect_UpperAlphaNumeric)
	{
		if(EditControl.UpperAlphaNumericValidCharArray != null)
			return EditControl.UpperAlphaNumericValidCharArray;

		invalidAlphaUpper = true;
		includeNumeric = true;
		includeSpecial = true;
	}
	else if(editControlType == ect_Numeric)
	{
		if(EditControl.NumericValidCharArray != null)
			return EditControl.NumericValidCharArray;

		includeNumeric = true;
	}
	else
		throw "EditControl.getValidCharArray: Invalid fType(" + editControlType + ")";

	var arr;
	var ch;

	arr = new Array();

	if(invalidAlphaUpper)
	{
		for(ch = 65; ch <= 90; ch++)
			arr.push(ch);
	}
	if(invalidAlphaLower)
	{
		for(ch = 97; ch <= 122; ch++)
			arr.push(ch);
	}
	if(includeNumeric)
	{
		for(ch = 48; ch <= 57; ch++)
			arr.push(ch);
	}
	if(includeSpecial)
	{
		arr.push(32);	// space
		arr.push(64);	// @
		arr.push(46);	// .
		arr.push(45);	//-
		arr.push(33);	//!
		arr.push(34);	//"
		arr.push(35);	//#
		arr.push(36);	//$
		arr.push(37);	//%
		arr.push(38);	//&
		arr.push(39);	//'
		arr.push(40);	//(
		arr.push(41);	//)
		arr.push(42);	//*
		arr.push(43);	//+
		arr.push(44);	//,
		arr.push(47);	///
		arr.push(58);	//:
		arr.push(59);	//;
		arr.push(60);	//<
		arr.push(61);	//=
		arr.push(62);	//>
		arr.push(63);	//?
		arr.push(91);	//[
		arr.push(92);	//\
		arr.push(93);	//]
		arr.push(94);	//^
		arr.push(95);	//_
		arr.push(96);	//`
		arr.push(123);	//{
		arr.push(124);	//|
		arr.push(125);	//}
		arr.push(126);	//~
	}

	if(editControlType == ect_AlphaNumeric)
		EditControl.AlphaNumericValidCharArray = arr;
	else if(editControlType == ect_UpperAlphaNumeric)
		EditControl.UpperAlphaNumericValidCharArray = arr;
	else if(editControlType == ect_Numeric)
		EditControl.NumericValidCharArray = arr;

	return arr;
}

/******************************************************************************/

/*void*/ EditControl.prototype.setFocus = function(/*boolean*/ set)
{
	if(set)
	{
		this.fUIObj.focus();
		this.fUIObj.select();
	}
}

/******************************************************************************/

/*void*/ EditControl.prototype.focusEvent = function(/*string*/ controlID)
{
	var wasFocused = this.fFocused;
	this.fFocused = true;
	if(!wasFocused)
		this.getScreen().onFocus(this.ControlID);
}

/******************************************************************************/

/*void*/ EditControl.prototype.blurEvent = function(/*string*/ controlID)
{
	this.fFocused = false;
}

/******************************************************************************/

/*boolean*/ EditControl.prototype.key = function(/*int*/ key, /*Event*/ evt)
{
//	var validCharArray = this.getValidCharArray(this.Type);
//	var pos;

	if(key == ek_Select)
	{
		this.getScreen().onButton(this.ControlID);
		return true;
	}

	//TODO Giving up, too hard to get it correct on different browsers
	return false;

//	if(evt && (evt.altKey || evt.ctrlKey))
//		return false;
//	if(isEventKeyCodeNavigation(key))
//		return false;
//
//	// force upper case
//	if(this.Type == ect_UpperAlphaNumeric)
//	{
//		if ((key >= 97) && (key <= 122))
//		{
//			key -= 32;
//			setEventKeyCode(evt, key);
//		}
//	}
//
//	pos = arrayIndexOf(validCharArray, key);
//	if(pos >= 0)
//	{
//
//
////TODO?		if(this.AutoButton && (this.fText.length == this.MaxLength))
////TODO?			this.getScreen().onButton(this.ControlID);
//
//		return false;	//let default handler deal
//	}
//
//	//stopEventPropagation(evt);
//	return true;
}

/******************************************************************************/
/******************************************************************************/
/* ListControl */

/******************************************************************************/
/******************************************************************************/

ListControl.prototype = new Control();
ListControl.prototype.constructor = ListControl;

/******************************************************************************/

function ListControl(/*string*/ controlID, /*string*/ screenID,
	/*ListControlRowItemList*/ oRowItemList)
{
	if(controlID)	// default ctor will be called by inherited objects
		this.init(controlID, screenID, oRowItemList);
}

/******************************************************************************/

/*void*/ ListControl.prototype.init = function(/*string*/ controlID, /*string*/ screenID,
	/*ListControlRowItemList*/ oRowItemList)
{
	this.ControlID = controlID;
	this.ScreenID = screenID;
	this.fUIObj = document.getElementById(controlID);
	if(this.fUIObj == null)
		throw "ListControl::ctor(controlID): Can't find UI object, ID(" + controlID + ")";
	this.fUIObj.onmouseover = MainAppOnMouseOver;
	this.fUIObj.onclick = MainAppOnMouseClick;
	this.fUIObj.onfocus = MainAppOnFocus;
	this.fUIObj.onblur = MainAppOnBlur;
	this.fFocused = false;
	this.fFocusedItem = null;			// focused item, null if no focused item

	this.fRowItemList = oRowItemList;
	this.createRows();

	this.drawItems(false);
//	this.setFocus(false);
}

/******************************************************************************/

/*void*/ ListControl.prototype.createRows = function()
{
	this.deleteRows();

	this.fRowList = new Array();
	for(var i = 0; i < this.getItemCount(); i++)
	{
		this.fRowList.push(new ListControlRow(this.ControlID, i, this.fRowItemList));
	}
}

/******************************************************************************/

/*void*/ ListControl.prototype.deleteRows = function()
{
	var oBody = document.getElementById(this.ControlID + "_Body");
	for(var i = oBody.rows.length - 1; i >= 0; i--)
		oBody.deleteRow(i);
}

/******************************************************************************/

/*void*/ ListControl.prototype.recalcAfterDataChange = function(/*boolean*/ reset)
{
	this.createRows();
	this.drawItems(true);
}

/******************************************************************************/

/*ListControlRow*/ ListControl.prototype.findRow = function(controlID)
{
	var oRow;

	for(var i = 0; i < this.fRowList.length; i++)
	{
		oRow = this.fRowList[i];
		if(oRow.hasControl(controlID))
			return oRow;
	}

	return null;
}

/******************************************************************************/

/*int*/ ListControl.prototype.findRowPos = function(controlID)
{
	var oRow;

	for(var i = 0; i < this.fRowList.length; i++)
	{
		oRow = this.fRowList[i];
		if(oRow.hasControl(controlID))
			return i;
	}

	return -1;
}

/******************************************************************************/

/*void*/ ListControl.prototype.setFocus = function(/*boolean*/ set)
{
	var wasFocused = this.fFocused;
	this.fFocused = set;

	if(set && !wasFocused)
		this.getScreen().onFocus(this.ControlID);

	if(set)
	{
		if(this.fFocusedItem != null)
			this.fFocusedItem.setFocus(true);
		else
		{
			if(this.getItemCount() > 0)
				this.setFocusedItem(this.fRowList[0]);
		}
	}
	else
	{
		if(this.fFocusedItem != null)
			this.fFocusedItem.setFocus(false);
	}
}

/******************************************************************************/

/*int*/ ListControl.prototype.getFocusedItemPos = function()
{
	if(this.fFocusedItem != null)
		return this.findRowPos(this.fFocusedItem.ControlID);

	return -1;
}

/******************************************************************************/

/*void*/ ListControl.prototype.setFocusedItem = function(/*ListControlRow*/ oRow)
{
	if(this.fFocusedItem != null)
	{
		if((oRow != null) && (this.fFocusedItem.ControlID == oRow.ControlID))
		{
			this.getScreen().onListItem(this.ControlID);
			return;
		}

		this.fFocusedItem.setFocus(false);
		this.fFocusedItem = null;
	}

	this.fFocusedItem = oRow;
	if(this.fFocusedItem != null)
	{
		this.fFocusedItem.setFocus(true);
		this.getScreen().onListItem(this.ControlID);
	}
}

/******************************************************************************/

/*void*/ ListControl.prototype.setFocusedItemByPos = function(/*int*/ focusedItem)
{
	if((focusedItem >= 0) && (focusedItem < this.getItemCount()))
		this.setFocusedItem(this.fRowList[focusedItem]);
}

/******************************************************************************/

/*void*/ ListControl.prototype.drawItems = function(/*boolean*/ showFocus)
{
	//this.recalcBottomItemFromTopItem();

	var rowIndex = 0;
	var oRow;
	var focusedControlID = null;

	if(this.fFocusedItem != null)
		focusedControlID = this.fFocusedItem.ControlID;

	for(var dataIndex = 0; dataIndex < this.getItemCount(); dataIndex++)
	{
		oRow = this.fRowList[rowIndex];
		this.drawItem(dataIndex, oRow);
		if(showFocus && (oRow.ControlID == focusedControlID))
			oRow.setFocus(true);
		else
			oRow.show(true);
		rowIndex++;
	}

	for(; rowIndex < this.fRowList.length; rowIndex++)
	{
		oRow = this.fRowList[rowIndex];
		oRow.clearRowItems();
		oRow.show(false);
	}
}

/******************************************************************************/

/*boolean*/ ListControl.prototype.hasControl = function(/*string*/ controlID)
{
	if(this.ControlID == controlID)
		return true;

	for(var i = 0; i < this.fRowList.length; i++)
		if(this.fRowList[i].hasControl(controlID))
			return true;

	return false;
}


/******************************************************************************/

/*int*/ ListControl.prototype.getItemCount = function()
{
	throw "ListControl.getItemCount: this method should be overridden";
}

/******************************************************************************/

/*void*/ ListControl.prototype.drawItem = function(/*int*/ item, /*ListControlRow*/ oRow)
{
	throw "ListControl.drawItem: this method should be overridden";
}

/******************************************************************************/

/*boolean*/ ListControl.prototype.key = function(/*int*/ key, /*Event*/ evt)
{
	if(key == ek_Select)
	{
		this.getScreen().onButton(this.ControlID);
		return true;
	}

//	var focusedItem = -1;
//
//	if(this.fFocusedItem != null)
//		focusedItem = this.findRowPos(this.fFocusedItem.ControlID);
//
//	if(key == ek_DownButton)
//	{
//		if(focusedItem < this.getItemCount() - 1)
//			focusedItem++;
//		else
//			return false;
//
//		this.setFocusedItem(this.fRowList[focusedItem]);
//		return true;
//	}
//
//	if(key == ek_UpButton)
//	{
//		if(focusedItem > 0)
//			--focusedItem;
//		else
//			return false;
//
//		this.setFocusedItem(this.fRowList[focusedItem]);
//		return true;
//	}

//	if(key == ek_PageDown)
//	{
//		var itemCount = this.getItemCount();
//		var pageCount = (this.fBottomItem - this.fTopItem + 1);
//
//		this.fBottomItem += pageCount;
//		if(this.fBottomItem >= itemCount)
//			this.fBottomItem = itemCount - 1;
//		focusedItem += pageCount;
//		if(focusedItem >= itemCount)
//			focusedItem = itemCount - 1;
//		this.recalcTopItemFromBottomItem();
//
//		this.drawItems(true);
//		this.drawUpIcon(false);
//		this.drawDownIcon(false);
//		this.setFocusedItem((focusedItem >= 0) ? this.fRowList[focusedItem - this.fTopItem] : null);
//		this.drawCount();
//
//		return true;
//	}

//	if(key == ek_PageUp)
//	{
//		var pageCount = (this.fBottomItem - this.fTopItem + 1);
//
//		this.fTopItem -= pageCount;
//		if(this.fTopItem < 0)
//			this.fTopItem = 0;
//		focusedItem -= pageCount;
//		if(focusedItem < 0)
//			focusedItem = 0;
//		this.recalcBottomItemFromTopItem();
//
//		this.drawItems(true);
//		this.drawUpIcon(false);
//		this.drawDownIcon(false);
//		this.setFocusedItem((focusedItem >= 0) ? this.fRowList[focusedItem - this.fTopItem] : null);
//		this.drawCount();
//
//		return true;
//	}

	return false;
}

/******************************************************************************/

/*void*/ ListControl.prototype.mouseClick = function(/*string*/ controlID)
{
	var rowPos = this.findRowPos(controlID);
	if((rowPos >= 0) && (rowPos < this.getItemCount()))
		this.getScreen().onButton(this.ControlID);
}

/******************************************************************************/

/*void*/ ListControl.prototype.mouseMove = function(/*bool buttonDown,*/ controlID)
{
	// check rows
	var rowPos = this.findRowPos(controlID);
	if((rowPos >= 0) && (rowPos < this.getItemCount()))
	{
		this.setFocusedItem(this.fRowList[rowPos]);
		//return;
	}
}

/******************************************************************************/
/******************************************************************************/
/* ListControlRow */

/******************************************************************************/
/******************************************************************************/

function ListControlRow(/*string*/ controlID, /*int*/ rowIndex,
	/*ListControlRowItemList*/ oRowItemList)
{
	this.ControlID = controlID + "_" + new String(rowIndex);
	this.RowIndex = rowIndex;

	var oBody = document.getElementById(controlID + "_Body");

	this.fUIObj = oBody.insertRow(-1);
	this.fUIObj.className = "listCtrRow_normal";

	this.fRowItemList = oRowItemList;
	for(var i = 0; i < this.fRowItemList.length; i++)
	{
		var oRowItem = this.fRowItemList[i];

		var oCell = this.fUIObj.insertCell(-1);
		oCell.id = this.getRowItemControlID(i);
		oCell.className = oRowItem.ClassName;

		oCell.style.width = oRowItem.Width;
		checkClassName(oCell, 'normal');
	}
}

/******************************************************************************/

/*void*/ ListControlRow.prototype.setFocus = function(/*boolean*/ set)
{
	checkClassName(this.fUIObj, set ? 'hilite' : 'normal');

	for(var i = 0; i < this.fRowItemList.length; i++)
		this.focusRowItem(i, set);

//TODO	if(set)
//TODO		this.fUIObj.focus();
}

/******************************************************************************/

/*void*/ ListControlRow.prototype.show = function(/*boolean*/ show)
{
	checkClassName(this.fUIObj, show ? 'normal' : 'hide');
}

/******************************************************************************/

/*boolean*/ ListControlRow.prototype.hasControl = function(/*string*/ controlID)
{
	if(this.ControlID == controlID)
		return true;

	for(var i = 0; i < this.fRowItemList.length; i++)
		if(this.getRowItemControlID(i) == controlID)
			return true;

	return false;
}

/******************************************************************************/

/*string*/ ListControlRow.prototype.getRowItemControlID = function(/*int*/ rowItemIndex)
{
	if(rowItemIndex >= this.fRowItemList.length)
		throw "ListControlRow::getRowItemControlID: rowItemIndex(" + rowItemIndex + ") >= this.fRowItemList.length(" + this.fRowItemList.length + ")";

	var oRowItem = this.fRowItemList[rowItemIndex];
	return this.ControlID + "_" + oRowItem.Name;
}

/******************************************************************************/

/*object*/ ListControlRow.prototype.getRowItemObj = function(/*int*/ rowItemIndex)
{
	var controlID = this.getRowItemControlID(rowItemIndex);
	var oUIObj = document.getElementById(controlID);

	if(oUIObj == null)
		throw "ListControlRow::getRowItemObj: Can't find UI object, ID(" + controlID + ")";

	return oUIObj;
}

/******************************************************************************/

/*void*/ ListControlRow.prototype.drawRowItem = function(/*int*/ rowItemIndex, /*string*/ value)
{
	var oUIObj = this.getRowItemObj(rowItemIndex);

	oUIObj.innerHTML = value;
}

/******************************************************************************/

/*void*/ ListControlRow.prototype.focusRowItem = function(/*int*/ rowItemIndex, /*string*/ set)
{
	var oUIObj = this.getRowItemObj(rowItemIndex);

	checkClassName(oUIObj, set ? 'hilite' : 'normal');
}

/******************************************************************************/

/*void*/ ListControlRow.prototype.clearRowItems = function()
{
	var oUIObj;

	for(var i = 0; i < this.fRowItemList.length; i++)
	{
		oUIObj = this.getRowItemObj(i);
		oUIObj.innerHTML = "";
	}
}

/******************************************************************************/
/******************************************************************************/
/* ListControlRowItem */

/******************************************************************************/
/******************************************************************************/

function ListControlRowItem(/*string*/ name, /*int*/ width, /*string*/ className)
{
	this.Name = name;
	this.Width = width;
	this.ClassName = className;
}

/******************************************************************************/
/******************************************************************************/
/* CheckControl */

/******************************************************************************/
/******************************************************************************/

CheckControl.prototype = new Control();
CheckControl.prototype.constructor = CheckControl;

/******************************************************************************/

function CheckControl(/*string*/ controlID, /*string*/ screenID)
{
	this.ControlID = controlID;
	this.ScreenID = screenID;
	this.fUIObj = document.getElementById(controlID);
	if(this.fUIObj == null)
		throw "CheckControl::ctor(controlID): Can't find UI object, ID(" + controlID + ")";
//	this.fUIObj.onmouseover = MainAppOnMouseOver;
//	this.fUIObj.onclick = MainAppOnMouseClick;
	this.fUIObj.onfocus = MainAppOnFocus;
	this.fUIObj.onblur = MainAppOnBlur;
	this.fFocused = false;

	this.setFocus(false);
}

/******************************************************************************/

/*boolean*/ CheckControl.prototype.getChecked = function()
{
	return this.fUIObj.checked;
}

/******************************************************************************/

/*void*/ CheckControl.prototype.setChecked = function(/*boolean*/ checked)
{
	this.fUIObj.checked = (checked ? true : false);
}

/******************************************************************************/

/*void*/ CheckControl.prototype.setFocus = function(/*boolean*/ set)
{
	if(set)
		this.fUIObj.focus();
}

/******************************************************************************/

/*void*/ CheckControl.prototype.focusEvent = function(/*string*/ controlID)
{
	var wasFocused = this.fFocused;
	this.fFocused = true;
	if(!wasFocused)
		this.getScreen().onFocus(this.ControlID);
}

/******************************************************************************/

/*void*/ CheckControl.prototype.blurEvent = function(/*string*/ controlID)
{
	this.fFocused = false;
}

/******************************************************************************/
/******************************************************************************/
/* TextControl */

/******************************************************************************/
/******************************************************************************/

TextControl.prototype = new Control();
TextControl.prototype.constructor = TextControl;

/******************************************************************************/

function TextControl(/*string*/ controlID, /*string*/ screenID)
{
	this.ControlID = controlID;
	this.ScreenID = screenID;
	this.fUIObj = document.getElementById(controlID);
	if(this.fUIObj == null)
		throw "TextControl::ctor(controlID): Can't find UI object, ID(" + controlID + ")";
	this.fFocused = false;

	this.setText("");
	this.setFocus(false);
	this.show(true);
}

/******************************************************************************/

/*void*/ TextControl.prototype.setText = function(/*string*/ text)
{
	this.fUIObj.innerHTML = (testStrHasLen(text) ? text : "");
}

/******************************************************************************/

/*boolean*/ TextControl.prototype.canFocus = function() { return false; }

/******************************************************************************/
/******************************************************************************/
/* ImageControl */

/******************************************************************************/
/******************************************************************************/

ImageControl.prototype = new Control();
ImageControl.prototype.constructor = ImageControl;

/******************************************************************************/

function ImageControl(/*string*/ controlID, /*string*/ screenID)
{
	this.ControlID = controlID;
	this.ScreenID = screenID;
	this.fUIObj = document.getElementById(controlID);
	if(this.fUIObj == null)
		throw "ImageControl::ctor(controlID): Can't find UI object, ID(" + controlID + ")";
	this.fFocused = false;

	this.setFocus(false);
	this.show(true);
}

/******************************************************************************/

/*void*/ ImageControl.prototype.setSource = function(/*string*/ src)
{
	this.fUIObj.src = src;
}

/******************************************************************************/

/*boolean*/ ImageControl.prototype.canFocus = function() { return false; }

/******************************************************************************/
/******************************************************************************/
/* XmlDataReader */

/******************************************************************************/
/******************************************************************************/

function XmlDataReader(xmlDocument)
{
	this.fDocument = xmlDocument;
	this.fCurNodeList = new Array();
	this.fCurNodeList.push(this.fDocument);
}

/******************************************************************************/

/*Node*/ XmlDataReader.prototype.findChildNode = function(/*string*/ fieldName)
{
	if(this.fCurNodeList.length == 0)
		throw "XmlDataReader.findChildNode: No current node";

	var nodeList = this.fCurNodeList[this.fCurNodeList.length - 1].childNodes;
	var node;

	for(var i = 0; i < nodeList.length; i++)
	{
		node = nodeList.item(i);
		if(node.nodeName == fieldName)
			return node;
	}

	return null;
}

/******************************************************************************/

/*Array*/ XmlDataReader.prototype.findChildNodes = function(/*string*/ fieldName)
{
	if(this.fCurNodeList.length == 0)
		throw "XmlDataReader.findChildNodes: No current node";

	var nodeList = this.fCurNodeList[this.fCurNodeList.length - 1].childNodes;
	var nodes = new Array();
	var node;

	for(var i = 0; i < nodeList.length; i++)
	{
		node = nodeList.item(i);
		if(node.nodeName == fieldName)
			nodes.push(node);
	}

	return nodes;
}

/******************************************************************************/

/*string*/ XmlDataReader.prototype.getNodeText = function(/*Node*/ node)
{
	var nodeList = node.childNodes;
	var childNode;

	for(var i = 0; i < nodeList.length; i++)
	{
		childNode = nodeList.item(i);
		if(childNode.nodeType == 3 /*TEXT_NODE*/)
			return childNode.nodeValue;
	}

	return null;
}

/******************************************************************************/
/* Read a Short. May return null */

/*int*/ XmlDataReader.prototype.readShort = function(/*string*/ fieldName)
{
	var data = this.internalReadString(fieldName);

	if(data == null)
		return null;

	return parseInt(data, 10);
}

/******************************************************************************/
/* Read a Integer. May return null */

/*int*/ XmlDataReader.prototype.readInt = function(/*string*/ fieldName)
{
	var data = this.internalReadString(fieldName);

	if(data == null)
		return null;

	return parseInt(data, 10);
}

/******************************************************************************/
/* Read a Double. May return null */

/*float*/ XmlDataReader.prototype.readDouble = function(/*string*/ fieldName)
{
	var data = this.internalReadString(fieldName);

	if(data == null)
		return null;

	return parseFloat(data);
}

/******************************************************************************/
/* Internal read a String. May return null */

/*string*/ XmlDataReader.prototype.internalReadString = function(/*string*/ fieldName)
{
	var node = this.findChildNode(fieldName);
	if(node == null)
		return null;

	var data = this.getNodeText(node);
	if (data == null)
		return null;

	if(data.length == 0)
		return null;

	return data;
}

/******************************************************************************/
/* Read a String. May return null */

/*string*/ XmlDataReader.prototype.readString = function(/*string*/ fieldName,
	/*int*/ maxLength)
{
	var data = this.internalReadString(fieldName);
	if(data == null)
		return null;
	var len = data.length;

	if(len > maxLength)
		throw "XmlDataReader.readString: invalid len(" + len + "), maxLength(" + maxLength + ")";

	return data;
}

/******************************************************************************/
/* Read a Date, no Time component. May return null */

/*string*/ XmlDataReader.prototype.readDate = function(/*string*/ fieldName)
{
	var data = this.internalReadString(fieldName);

	if(data == null)
		return null;

	return ISO8601DateFromString(data);
}

/******************************************************************************/
/* Read a Date with a Time component. May return null */

/*string*/ XmlDataReader.prototype.readDateTime = function(/*string*/ fieldName)
{
	var data = this.internalReadString(fieldName);

	if(data == null)
		return null;

	return ISO8601DateTimeFromString(data);
}

/******************************************************************************/
/* Read a Boolean. May return null */

/*int*/ XmlDataReader.prototype.readBoolean = function(/*string*/ fieldName)
{
	var data = this.internalReadString(fieldName);

	if(data == null)
		return null;

	return ((data == "true") || (data == "0"));
}

/******************************************************************************/
/* Read an Object. May return null */

/*Readable*/ XmlDataReader.prototype.readObject = function(/*string*/ fieldName,
	/*Constructor*/ ctorDataFiler)
{
	var node = this.findChildNode(fieldName);
	if(node == null)
		return null;

	this.fCurNodeList.push(node);
	var readable = new ctorDataFiler(this);
	this.fCurNodeList.pop();

	return readable;
}

/******************************************************************************/
/* Read a list of complex Objects. */

/*Array*/ XmlDataReader.prototype.readList = function(/*string*/ fieldName,
	/*Constructor*/ itemCtorDataFiler)
{
	var list = new Array();

	var nodes = this.findChildNodes(fieldName);
	if(nodes.length == 0)
		return list;

	for(var i = 0; i < nodes.length; i++)
	{
		var node = nodes[i];
		this.fCurNodeList.push(node);
		var readable = new itemCtorDataFiler(this);
		list.push(readable);
		this.fCurNodeList.pop();
	}

	return list;
}

/******************************************************************************/
/* Read a list of Strings (or non-complex items than can be constructed from a sting). */

/*Array*/ XmlDataReader.prototype.readStringList = function(/*string*/ fieldName,
	/*Constructor*/ itemCtorDataFiler)
{
	var list = new Array();

	var nodes = this.findChildNodes(fieldName);
	if(nodes.length == 0)
		return list;

	for(var i = 0; i < nodes.length; i++)
	{
		var node = nodes[i];
		var readable = new itemCtorDataFiler(this.getNodeText(node));
		list.push(readable);
	}

	return list;
}

/******************************************************************************/
/******************************************************************************/
/* XmlDataWriter */

/******************************************************************************/
/******************************************************************************/

//TODO: see the webapi version, uses OutputStream for writing
function XmlDataWriter()
{
	this.fStream = '';

	var characterEncoding = "UTF-8";
	this.writeStartDocument(characterEncoding);
}

/******************************************************************************/

/*void*/ XmlDataWriter.prototype.toString = function()
{
	return this.fStream;
}

/******************************************************************************/

/*void*/ XmlDataWriter.prototype.writeStartDocument = function(/*string*/ encoding)
{
	this.internalWriteString('<?xml version="1.0" encoding="' + encoding + '"?>');
}

/******************************************************************************/

/*Node*/ XmlDataWriter.prototype.internalWriteString = function(/*string*/ data)
{
	this.fStream += data;
}

/******************************************************************************/

/*string*/ XmlDataWriter.prototype.escapeString = function(str)
{
	if(str.indexOf("&") >= 0)
		str = str.replace("&", "&amp;");
	if(str.indexOf("<") >= 0)
		str = str.replace("<", "&lt;");

	return str;
}

/******************************************************************************/
/* Write an opending XML element tag */

/*void*/ XmlDataWriter.prototype.writeStartElement = function(/*string*/ name)
{
	this.internalWriteString("<");
	this.internalWriteString(name);
	this.internalWriteString(">");
}

/******************************************************************************/
/* Write a closing XML element tag */

/*void*/ XmlDataWriter.prototype.writeEndElement = function(/*string*/ name)
{
	this.internalWriteString("</");
	this.internalWriteString(name);
	this.internalWriteString(">");
}

/******************************************************************************/
/* Write opening and closing XML element with value */

/*void*/ XmlDataWriter.prototype.writeElement = function(/*string*/ name, /*string*/ value)
{
	if(!testStrHasLen(value))
		return;

	this.writeStartElement(name);
	this.internalWriteString(this.escapeString(value));
	this.writeEndElement(name);
}

/******************************************************************************/
/* Write an Short */

/*void*/ XmlDataWriter.prototype.writeShort = function(/*string*/ fieldName, /*int*/ data)
{
	if(isNull(data) || isUndefined(data))
		return;

	this.writeElement(fieldName, data.toString());
}

/******************************************************************************/
/* Write an Integer */

/*void*/ XmlDataWriter.prototype.writeInt = function(/*string*/ fieldName, /*int*/ data)
{
	if(isNull(data) || isUndefined(data))
		return;

	this.writeElement(fieldName, data.toString());
}

/******************************************************************************/
/* Write an Double */

/*void*/ XmlDataWriter.prototype.writeDouble = function(/*string*/ fieldName, /*float*/ data)
{
	if(isNull(data) || isUndefined(data))
		return;

	this.writeElement(fieldName, data.toString());
}

/******************************************************************************/
/* Write a String */

/*void*/ XmlDataWriter.prototype.writeString = function(/*string*/ fieldName,
	/*string*/ data, /*int*/ maxLength)
{
	var len = testStrHasLen(data) ? data.length : 0;
	if(len > maxLength)
		throw new String("invalid len(" + len + "), maxLength(" + maxLength + ")");

	this.writeElement(fieldName, data);
}

/******************************************************************************/
/* Write a date, no Time component */

/*void*/ XmlDataWriter.prototype.writeDate = function(/*string*/ fieldName,
	/*Date*/ data)
{
	if(isNull(data) || isUndefined(data))
		return;

	this.writeElement(fieldName, dateTimeToString(data, dtf_ISO8601_Date));
}

/******************************************************************************/
/* Write a Date with a Time component */

/*void*/ XmlDataWriter.prototype.writeDateTime = function(/*string*/ fieldName,
	/*Date*/ data)
{
	if(isNull(data) || isUndefined(data))
		return;

	this.writeElement(fieldName, dateTimeToString(data, dtf_ISO8601_DateTime));
}

/******************************************************************************/
/* Write a Boolean */

/*void*/ XmlDataWriter.prototype.writeBoolean = function(/*string*/ fieldName,
	/*int*/ data)
{
	if(isNull(data) || isUndefined(data))
		return;

	this.writeElement(fieldName, data ? "true" : "false");
}

/******************************************************************************/
/* Write a complex Object */

/*void*/ XmlDataWriter.prototype.writeObject = function(/*string*/ fieldName,
	/*Writeable*/ data)
{
	if(isNull(data))
		return;

	this.writeStartElement(fieldName);
	data.writeTo(this);
	this.writeEndElement(fieldName);
}

/******************************************************************************/
/* Write a list of complex Objects */

/*void*/ XmlDataWriter.prototype.writeList = function(/*String*/ fieldName,
	/*Array*/ data)
{
	for(var i = 0; i < data.length; i++)
		this.writeObject(fieldName, data[i]);
}

/******************************************************************************/
/* Write a list of Strings (or non-complex items than can be converted to a sting) */

/*void*/ XmlDataWriter.prototype.writeStringList = function(/*string*/ fieldName,
	/*Array*/ data, /*int*/ maxLength)
{
	for(var i = 0; i < data.length; i++)
		this.writeString(fieldName, data[i].toString(), maxLength);
}

/******************************************************************************/
/******************************************************************************/
/* WaitScreen.js */

/******************************************************************************/
/******************************************************************************/

WaitScreen.ScreenID = "Wait001";

var gWaitScreen = null;
var gWaitScreenCount = 0;

/******************************************************************************/

WaitScreen.newInstance = function()
{
	if(!document.getElementById(WaitScreen.ScreenID))	//is WaitScreen available
		return null;
	if(gWaitScreenCount == 0)
		gWaitScreen = new WaitScreen();
	gWaitScreenCount++;
	return gWaitScreen;
}

/******************************************************************************/

function WaitScreen()
{
	this.ScreenID = WaitScreen.ScreenID;

	this.fContainerControl = new ContainerControl(this.ScreenID, 0, 0);

	// adjust position
	var mainTable = document.getElementById("MainTable");
	this.fContainerControl.moveTo(mainTable.offsetLeft, mainTable.offsetTop);

	setTimeout('WaitScreen_show()', 500);	//show after 1 second
}

/******************************************************************************/

/*boolean*/ function WaitScreen_isOpen()
{
	return (gWaitScreen != null);
}

/******************************************************************************/

/*void*/ function WaitScreen_show()
{
	if(gWaitScreen)
		gWaitScreen.fContainerControl.show(true);
}

/******************************************************************************/

/*void*/ function WaitScreen_close()
{
	if(gWaitScreen)
		gWaitScreen.close();
}

/******************************************************************************/

/*void*/ WaitScreen.prototype.close = function()
{
	if(gWaitScreenCount > 0)
		gWaitScreenCount--;
	if(gWaitScreenCount == 0)
	{
		this.fContainerControl.show(false);
		gWaitScreen = null;
	}
}

/******************************************************************************/
/******************************************************************************/
/* MediaPlayerScreen.js */

/******************************************************************************/
/******************************************************************************/

MediaPlayerScreen.ScreenID = "Player001";
MediaPlayerScreen.MediaPlayerID = "Player001_MediaPlayer";

/******************************************************************************/

MediaPlayerScreen.newInstance = function(/*string*/ url, /*string*/ useApp)
{
	var oScreen = MainApp.getThe().openScreen(new MediaPlayerScreen(url, useApp));
	oScreen.playMedia();
	return oScreen;
}

/******************************************************************************/

MediaPlayerScreen.prototype = new Screen();
MediaPlayerScreen.prototype.constructor = MediaPlayerScreen;

/******************************************************************************/

function MediaPlayerScreen(/*string*/ url, /*string*/ useApp)
{
	this.fURL = url;
	this.fUseApp = useApp;
	this.ScreenID = MediaPlayerScreen.ScreenID;

	this.fContainerControl = new ContainerControl(this.ScreenID, 12, 42);

	this.fMediaPlayer = document.getElementById(MediaPlayerScreen.MediaPlayerID);
	if(this.fMediaPlayer == null)
		throw "MediaPlayerScreen::ctor(url): Can't find UI object, ID(" + MediaPlayerScreen.MediaPlayerID + ")";

	this.fPlayerSource = this.buildPlayerURL();
}

/******************************************************************************/

/*void*/ MediaPlayerScreen.prototype.close = function()
{
	this.fMediaPlayer.style.visibility = "hidden";
	this.fMediaPlayer.src = "";

	Screen.prototype.close.call(this);
}

/******************************************************************************/

/*void*/ MediaPlayerScreen.prototype.playMedia = function()
{
	if(testStrHasLen(this.fPlayerSource))
	{
		this.fMediaPlayer.src = this.fPlayerSource;
		this.fMediaPlayer.style.visibility = "visible";
	}
	else
		showMsg("I don't know how to play this Show.");
}

/******************************************************************************/

/*string*/ MediaPlayerScreen.prototype.buildPlayerURL = function()
{
	if(Application_QuickTimePlayer == this.fUseApp)
		return "playQuickTime.jsp?url=" + this.fURL;

	if(Application_WindowsMediaPlayer == this.fUseApp)
		return "playWindowsMedia.jsp?url=" + this.fURL;

	return null;
}

/******************************************************************************/
/******************************************************************************/
/* PageMenu */

/******************************************************************************/
/******************************************************************************/

var gCurMenuCookie = "curMenu";

/******************************************************************************/

function initMenu(curMenu)
{
	if(!testStrHasLen(curMenu))
		curMenu = getCookie(gCurMenuCookie);
	if(testStrHasLen(curMenu))
		hilightMenu(curMenu + "_");
}

/******************************************************************************/

function hilightMenu(rowID)
{
	rowID = buildClassName(rowID, "Row");
	var oRow = document.getElementById(rowID);
	if(oRow)
		checkClassName(oRow, "hilite");
	rowID = buildClassName(rowID, "Link");
	var oLink = document.getElementById(rowID);
	if(oLink)
		checkClassName(oLink, "hilite");

	deleteCookie(gCurMenuCookie);
	setCookie(gCurMenuCookie, getClassNameBase(rowID), true);
}

/******************************************************************************/

function onMenuClick(evt, oItem)
{
	hilightMenu(oItem.id);
	stopEventPropagation(evt);
}

/******************************************************************************/

function onMenuRowClick(evt, oItem)
{
	var linkID = buildClassName(oItem.id, "Link");
	var oLink = document.getElementById(linkID);
	if(oLink)
	{
		hilightMenu(oItem.id);
		stopEventPropagation(evt);
		document.location = oLink.href;
	}
}

/******************************************************************************/

function onMenuClickScript(evt, oItem, fnc)
{
	setCookie(gCurMenuCookie, getClassNameBase(oItem.id), true);
	stopEventPropagation(evt);
	eval(fnc);
}

/******************************************************************************/

function onMenuRowClickScript(evt, oItem, fnc)
{
	var linkID = buildClassName(oItem.id, "Link");
	var oLink = document.getElementById(linkID);
	if(oLink)
	{
		setCookie(gCurMenuCookie, getClassNameBase(oItem.id), true);
		stopEventPropagation(evt);
		eval(fnc);
	}
}

/******************************************************************************/
/******************************************************************************/
/* PageHeader */

/******************************************************************************/
/******************************************************************************/

function headerCheckFields()
{
	var oMainApp = MainApp.getThe();
	var oSession = oMainApp.getSession();
	var isUserLoggedOn = oSession.isUserLoggedOn();

	var oUIObj = document.getElementById("HeaderLogon")
	setStyleDisplay(oUIObj, !isUserLoggedOn);

	oUIObj = document.getElementById("HeaderUser");
	oUIObj.innerHTML = (isUserLoggedOn && oSession.haveUserID()) ? oSession.getUserID() : "";
	setStyleDisplay(oUIObj, isUserLoggedOn);

	oUIObj = document.getElementById("HeaderRegister");
	setStyleDisplay(oUIObj, !isUserLoggedOn);

	oUIObj = document.getElementById("HeaderLogout");
	setStyleDisplay(oUIObj, isUserLoggedOn);
}

/******************************************************************************/

function headerLogout()
{
	var oMainApp = MainApp.getThe();
	var oSession = oMainApp.getSession();
	oSession.logoffDataSettings();
	oMainApp.reset();

	document.location = "../index.jsp";
}

/******************************************************************************/
/******************************************************************************/
/* TextListControl.js */

/******************************************************************************/
/******************************************************************************/

TextListControl.prototype = new ListControl();
TextListControl.prototype.constructor = ListControl;

/******************************************************************************/

function TextListControl(/*string*/ controlID, /*string*/ screenID,
	/*ListControlRowItemList*/ oRowItemList, /*Array*/ nameValuePairList)
{
	this.NameValuePairList = nameValuePairList;

	ListControl.prototype.init.call(this, controlID, screenID, oRowItemList);
}

/******************************************************************************/

/*void*/ TextListControl.prototype.setFocusedItemByName = function(/*string*/ name)
{
	var pos = arrayIndexOfByCmpr(this.NameValuePairList, new NameValuePairCmpr(name));
	this.setFocusedItemByPos(pos);
}

/******************************************************************************/

/*NameValuePair*/ TextListControl.prototype.getFocusedItemValue = function()
{
	var focusedItem = this.getFocusedItemPos();
	if((focusedItem >= 0) && (focusedItem < this.NameValuePairList.length))
		return this.NameValuePairList[focusedItem];

	return null;
}

/******************************************************************************/

/*int*/ TextListControl.prototype.getItemCount = function()
{
	return this.NameValuePairList.length;
}

/******************************************************************************/

/*void*/ TextListControl.prototype.drawItem = function(/*int*/ item,
	/*ListControlRow*/ oRow)
{
	var nameValuePair = this.NameValuePairList[item];

	oRow.drawRowItem(0, nameValuePair.Value);
}

/******************************************************************************/
/******************************************************************************/
/* ShowProviderListControl.js */

/******************************************************************************/
/******************************************************************************/

ShowProviderListControl.prototype = new ListControl();
ShowProviderListControl.prototype.constructor = ListControl;

/******************************************************************************/

function ShowProviderListControl(/*string*/ controlID, /*string*/ screenID,
	/*ListControlRowItemList*/ oRowItemList, /*Array*/ showProviderList)
{
	this.initShowProviderItemList(showProviderList);

	ListControl.prototype.init.call(this, controlID, screenID, oRowItemList);
}

/******************************************************************************/

/*void*/ ShowProviderListControl.prototype.initShowProviderItemList = function(/*Array*/ showProviderList)
{
	var showProvider;
	var showCost;
	var list = new Array();

	if(showProviderList)
	{
		for(var i = 0; i < showProviderList.length; i++)
		{
			showProvider = showProviderList[i];

			for(var j = 0; j < showProvider.ShowCostList.length; j++)
			{
				showCost = showProvider.ShowCostList[j];

				list.push(ShowProviderItem.newInstance(showProvider.ProviderID, showCost));
			}
		}
	}

	this.ShowProviderItemList = list;
}

/******************************************************************************/

/*void*/ ShowProviderListControl.prototype.setShowProviderList = function(
	/*Array*/ showProviderList, /*boolean*/ reset)
{
	this.initShowProviderItemList(showProviderList);
	this.recalcAfterDataChange(reset);
}

/******************************************************************************/

/*ShowProviderItem*/ ShowProviderListControl.prototype.getFocusedItemValue = function()
{
	var focusedItem = this.getFocusedItemPos();
	if((focusedItem >= 0) && (focusedItem < this.ShowProviderItemList.length))
		return this.ShowProviderItemList[focusedItem];

	return null;
}

/******************************************************************************/

/*int*/ ShowProviderListControl.prototype.getItemCount = function()
{
	return this.ShowProviderItemList.length;
}

/******************************************************************************/

/*void*/ ShowProviderListControl.prototype.drawItem = function(/*int*/ item,
	/*ListControlRow*/ oRow)
{
	var showProviderItem = this.ShowProviderItemList[item];
	var showCost = showProviderItem.ShowCost;

	oRow.drawRowItem(0, showProviderItem.Provider.Name);
	oRow.drawRowItem(1, showCost.formatRental());
	oRow.drawRowItem(2, showCost.CostDisplay);
}

/******************************************************************************/
/******************************************************************************/
/* ShowProviderItem.js */

/******************************************************************************/
/******************************************************************************/

ShowProviderItem.newInstance = function(/*ProviderID*/ providerID, /*ShowCost*/ showCost)
{
	return new ShowProviderItem(providerID, showCost);
}

/******************************************************************************/

function ShowProviderItem(/*ProviderID*/ providerID, /*ShowCost*/ showCost)
{
	var oSession = MainApp.getThe().getSession();

	this.Provider = oSession.getProvider(providerID);
	this.ShowCost = showCost;
}

/******************************************************************************/
/******************************************************************************/
/* Session.js */

/******************************************************************************/
/******************************************************************************/

var DownloadStatus_NotStarted = "NotStarted";
var DownloadStatus_InProgress = "InProgress";
var DownloadStatus_Completed = "Completed";

var Application_QuickTimePlayer = "qt";
var Application_WindowsMediaPlayer = "wm";
var Application_InternetExplorer = "ie";

var FileExtensions_QuickTime = [".mov", ".mp4", ".m4v", ".m4a"];
var FileExtensions_WindowsMedia = [".wmv", ".wma", ".avi", ".asf", ".mp3", ".wav"];

Session.UserIDCookie = "user";
Session.UserPasswordCookie = "password";
Session.RememberPasswordCookie = "remember";
Session.SessionDataCookie = "sess";
Session.MemberIDCookie = "MemberId";	//TODO remove after Member code has been updated to Player

/******************************************************************************/

Session.newInstance = function()
{
	var session = new Session();

	session.loadAppSettings();

	return session;
}

/******************************************************************************/

function Session()
{
	this.fDownloadServiceMgr = null;
	this.checkInstall();

	this.fNetworkURL = "http://" + location.hostname + "/inetvod/playerapi/xml";
	this.fCryptoAPIURL = "http://" + location.hostname + "/inetvod/cryptoapi";
	this.CanPingServer = false;

	this.fPlayer = null;

	this.fUserID = null;
	this.fUserPassword = null;
	this.fRememberPassword = false;
	this.fGuestAccess = false;
	this.fSessionData = null;
	this.fSessionExpires = null;
	this.fMemberID = null;	//TODO remove after Member code has been updated to Player
	this.fMemberPrefs = null;
	this.fMemberProviderList = new Array();

	this.IncludeAdult = ina_Never;
	this.CanAccessAdult = false;

	this.fIsSystemDataLoaded = false;
	this.fProviderList = null;
	this.fCategoryList = null;
	this.fRatingList = null;

	this.fLastProviderID = null;
}

/******************************************************************************/

/*boolean*/ Session.prototype.loadAppSettings = function()
{
	this.fPlayer = Player.newInstance();

	this.fPlayer.ManufacturerID = "inetvod";
	this.fPlayer.ModelNo = "webapp";
	this.fPlayer.SerialNo = "9876543210";
	this.fPlayer.Version = "0.0.0001";
}

/******************************************************************************/

/*string*/ Session.prototype.getNetworkURL = function()
{
	return this.fNetworkURL;
}

/******************************************************************************/

/*string*/ Session.prototype.getCryptoAPIURL = function()
{
	return this.fCryptoAPIURL;
}

/******************************************************************************/

/*boolean*/ Session.prototype.isUserLoggedOn = function()
{
	return (testStrHasLen(this.fSessionData) && !this.fGuestAccess)
		|| testStrHasLen(this.fMemberID);	//TODO remove after Member code has been updated to Player
}

/******************************************************************************/

/*boolean*/ Session.prototype.haveUserID = function()
{
	return testStrHasLen(this.fUserID);
}

/******************************************************************************/

/*string*/ Session.prototype.getUserID = function()
{
	return this.fUserID;
}

/******************************************************************************/

/*boolean*/ Session.prototype.haveUserPassword = function()
{
	return testStrHasLen(this.fUserPassword);
}

/******************************************************************************/

/*boolean*/ Session.prototype.isGuestAccess = function()
{
	return this.fGuestAccess;
}

/******************************************************************************/

/*void*/ Session.prototype.clearLogonInfo = function()
{
	this.fUserID = null;
	this.fUserPassword = null;
	this.fGuestAccess = false;
	this.fSessionData = null;
	this.fSessionExpires = null;
	this.fMemberID = null;	//TODO remove after Member code has been updated to Player
}

/******************************************************************************/

/*boolean*/ Session.prototype.haveSessionData = function()
{
	return testStrHasLen(this.fSessionData);
}

/******************************************************************************/

/*boolean*/ Session.prototype.isSystemDataLoaded = function()
{
	return this.fIsSystemDataLoaded;
}

/******************************************************************************/

/*ProviderList*/ Session.prototype.getProviderList = function()
{
	return this.fProviderList;
}

/******************************************************************************/

/*Provider*/ Session.prototype.getProvider = function(/*string*/ providerID)
{
	var provider = arrayFindItemByCmpr(this.fProviderList, new ProviderIDCmpr(providerID));

	if(provider != null)
		return provider;

	throw "Session.getProvider: can't find ProviderID(" + providerID + ")";
}

/******************************************************************************/

/*string*/ Session.prototype.getProviderName = function(/*string*/ providerID)
{
	if(Provider.AllProvidersID == providerID)
		return Provider.AllProvidersName;

	return this.getProvider(providerID).Name;
}

/******************************************************************************/

/*CategoryList*/ Session.prototype.getCategoryList = function()
{
	return this.fCategoryList;
}

/******************************************************************************/

/*string*/ Session.prototype.getCategoryName = function(/*string*/ categoryID)
{
	if(categoryID == Category.AllCategoriesID)
		return Category.AllCategoriesName;

	for(var i = 0; i < this.fCategoryList.length; i++)
		if(this.fCategoryList[i].CategoryID == categoryID)
			return this.fCategoryList[i].Name;

	throw "Session.getCategoryName: can't find CategoryID(" + categoryID + ")";
}

/******************************************************************************/

/*string*/ Session.prototype.getCategoryNames = function(/*Array*/ categoryIDList)
{
	var names = "";

	for(var i = 0; i < categoryIDList.length; i++)
	{
		if(names.length > 0)
			names += ", ";
		names += this.getCategoryName(categoryIDList[i]);
	}

	return names;
}

/******************************************************************************/

/*RatingList*/ Session.prototype.getRatingList = function()
{
	return this.fRatingList;
}

/******************************************************************************/

/*string*/ Session.prototype.getRatingName = function(/*string*/ ratingID)
{
	if(ratingID == Rating.AllRatingsID)
		return Rating.AllRatingsName;

	for(var i = 0; i < this.fRatingList.length; i++)
		if(this.fRatingList[i].RatingID == ratingID)
			return this.fRatingList[i].Name;

	throw "Session.getRatingName: can't find RatingID(" + ratingID + ")";
}

/******************************************************************************/

/*boolean*/ Session.prototype.checkInstall = function()
{
	if(this.fDownloadServiceMgr == null)
	{
		try
		{
			this.fDownloadServiceMgr = new ActiveXObject("iNetVOD.MCE.Gateway.DownloadServiceMgr");

			this.fPlayer.SerialNo = this.fDownloadServiceMgr.getPlayerSerialNo();
		}
		catch(ignore) {}
	}

	return this.fDownloadServiceMgr != null;
}

/******************************************************************************/

/*boolean*/ Session.prototype.loadDataSettings = function()
{
	this.fUserID = getCookie(Session.UserIDCookie);
	this.fUserPassword = getCookie(Session.UserPasswordCookie);
	this.fRememberPassword = (getCookie(Session.RememberPasswordCookie) == "true");

	if(!testStrHasLen(this.fUserPassword))
		this.fRememberPassword = false;

	var sessionStore = SessionStore.newInstanceFromXmlString(getCookie(Session.SessionDataCookie));
	if(sessionStore)
	{
		this.fGuestAccess = sessionStore.GuestAccess;

		if((new Date()).getTime() < sessionStore.SessionExpires)
		{
			this.fSessionData = sessionStore.SessionData;
			this.fSessionExpires = sessionStore.SessionExpires;
		}

		this.fMemberPrefs = sessionStore.MemberPrefs;
		this.fMemberProviderList = sessionStore.MemberProviderList;

		this.IncludeAdult = this.fMemberPrefs.IncludeAdult;
		this.CanAccessAdult = sessionStore.CanAccessAdult;
	}

	this.fMemberID = getCookie(Session.MemberIDCookie);	//TODO remove after Member code has been updated to Player

	return testStrHasLen(this.fUserID);
}

/******************************************************************************/

/*boolean*/ Session.prototype.saveDataSettings = function()
{
	if(this.fDownloadServiceMgr != null)
	{
		this.fDownloadServiceMgr.setUserCredentials(this.fUserID, this.fUserPassword,
			this.fRememberPassword);
		this.fDownloadServiceMgr.processNow();
	}

	deleteCookie(Session.UserIDCookie);
	deleteCookie(Session.UserPasswordCookie);
	deleteCookie(Session.RememberPasswordCookie);

	if(testStrHasLen(this.fUserID))
		setCookie(Session.UserIDCookie, this.fUserID, false);
	if(testStrHasLen(this.fUserPassword))
		setCookie(Session.UserPasswordCookie, this.fUserPassword, !this.fRememberPassword);
	if(this.fRememberPassword)
		setCookie(Session.RememberPasswordCookie, "true", true);

	var sessionStore = new SessionStore();
	sessionStore.GuestAccess = this.fGuestAccess;
	sessionStore.SessionData = this.fSessionData;
	if(testStrHasLen(this.fSessionData))
		sessionStore.SessionExpires = this.fSessionExpires;
	sessionStore.MemberPrefs = this.fMemberPrefs;
	sessionStore.MemberProviderList = this.fMemberProviderList;
	sessionStore.CanAccessAdult = this.CanAccessAdult;

	deleteCookie(Session.SessionDataCookie);
	setCookie(Session.SessionDataCookie, SessionStore.toXmlString(sessionStore), true);

	deleteCookie(Session.MemberIDCookie);		//TODO remove after Member code has been updated to Player
	if(testStrHasLen(this.fMemberID))
		setCookie(Session.MemberIDCookie, this.fMemberID, true);	//TODO remove after Member code has been updated to Player
	return true;
}

/******************************************************************************/

/*void*/ Session.prototype.logoffDataSettings = function()
{
	this.fUserPassword = null;
	this.fRememberPassword = false;

	this.fGuestAccess = false;
	this.fSessionData = null;
	this.fSessionExpires = null;
	this.fMemberID = null;	//TODO remove after Member code has been updated to Player

	deleteCookie(Session.UserPasswordCookie);
	deleteCookie(Session.RememberPasswordCookie);
	deleteCookie(Session.SessionDataCookie);
	deleteCookie(Session.MemberIDCookie);		///TODO remove after Member code has been updated to Player
}

/******************************************************************************/

/*void*/ Session.prototype.resetDataSettings = function()
{
	if(this.fDownloadServiceMgr != null)
		this.fDownloadServiceMgr.setUserCredentials("", "", false);

	deleteCookie(Session.UserIDCookie);
	deleteCookie(Session.UserPasswordCookie);
	deleteCookie(Session.RememberPasswordCookie);
	deleteCookie(Session.SessionDataCookie);
	deleteCookie(Session.MemberIDCookie);		///TODO remove after Member code has been updated to Player
}

/******************************************************************************/

/*void*/ Session.prototype.showRequestError = function(/*string*/ message)
{
	if(!testStrHasLen(message))
		showMsg("An error occurred trying to communicate with the Storm servers. Please try again.");
	else
		showMsg(message);
}

/******************************************************************************/

/*void*/ Session.prototype.callbackCaller = function(/*object*/ data,
	/*StatusCode*/ statusCode, /*string*/ statusMessage)
{
	if(isObject(this.CallerCallback) && isFunction(this.CallerCallback.Callback))
	{
		try
		{
			this.CallerCallback.Callback(data, statusCode, statusMessage);
		}
		catch(e)
		{
			showError("Session.callbackCaller", e);
		}
	}
	else if(isFunction(this.CallerCallback))
	{
		try
		{
			this.CallerCallback(data, statusCode, statusMessage);
		}
		catch(e)
		{
			showError("Session.callbackCaller", e);
		}
	}
}

/******************************************************************************/

/*void*/ Session.prototype.pingServer = function(/*object*/ callbackObj)
{
	WaitScreen.newInstance();
	this.Callback = Session.prototype.pingServerResponse;
	this.CallerCallback = callbackObj;
	DataRequestor.newInstance().startRequest(PingRqst.newInstance(), this);
}

/******************************************************************************/

/*void*/ Session.prototype.pingServerResponse = function(/*PingResp*/ pingResp,
	/*StatusCode*/ statusCode, /*string*/ statusMessage)
{
	WaitScreen_close();
	if(statusCode == sc_Success)
	{
		this.CanPingServer = true;
		this.callbackCaller(null, statusCode, statusMessage);
		return;
	}

	this.showRequestError(statusMessage);
	this.callbackCaller(null, statusCode, statusMessage);
}

/******************************************************************************/

/*void*/ Session.prototype.signon = function(/*object*/ callbackObj,
	/*string*/ userID, /*string*/ password, /*boolean*/ rememberPassword)
{
	if(testStrHasLen(userID))
		this.fUserID = userID;
	if(testStrHasLen(password))
		this.fUserPassword = CryptoAPI.newInstance().digest(password);
	if(isBoolean(rememberPassword))
		this.fRememberPassword = rememberPassword;

	if(!testStrHasLen(this.fUserID))
		throw "Session::signon: Missing UserID";
	if(!testStrHasLen(this.fUserPassword))
		throw "Session::signon: Missing UserPassword";

	var signonRqst;

	signonRqst = SignonRqst.newInstance();
	signonRqst.UserID = this.fUserID;
	signonRqst.Password = this.fUserPassword;
	signonRqst.Player = this.fPlayer;

	WaitScreen.newInstance();
	this.Callback = Session.prototype.signonResponse;
	this.CallerCallback = callbackObj;
	DataRequestor.newInstance().startRequest(signonRqst, this);
}

/******************************************************************************/

/*void*/ Session.prototype.signonResponse = function(/*SignonResp*/ signonResp,
	/*StatusCode*/ statusCode, /*string*/ statusMessage)
{
	WaitScreen_close();
	if(statusCode == sc_Success)
	{
		this.fGuestAccess = false;
		this.fSessionData = signonResp.SessionData;
		this.fSessionExpires = signonResp.SessionExpires;
		this.fMemberPrefs = signonResp.MemberState.MemberPrefs;
		this.IncludeAdult = this.fMemberPrefs.IncludeAdult;
		this.CanAccessAdult = (this.IncludeAdult == ina_Always);
		this.fMemberProviderList = signonResp.MemberState.MemberProviderList;

		this.callbackCaller(null, statusCode, statusMessage);
		return;
	}
	else if(statusCode == sc_InvalidUserIDPassword)
		this.fUserPassword = null;

	this.showRequestError(statusMessage);
	this.callbackCaller(null, statusCode, statusMessage);
}

/******************************************************************************/

/*boolean*/ Session.prototype.isMemberOfProvider = function(/*string*/ providerID)
{
	return(arrayFindItemByCmpr(this.fMemberProviderList, new ProviderIDCmpr(providerID)) != null)
}

/******************************************************************************/

/*void*/ Session.prototype.loadSystemData = function(/*object*/ callbackObj)
{
	WaitScreen.newInstance();
	this.Callback = Session.prototype.loadSystemDataResponse;
	this.CallerCallback = callbackObj;
	DataRequestor.newInstance(this.fSessionData).startRequest(SystemDataRqst.newInstance(), this);
}

/******************************************************************************/

/*void*/ Session.prototype.loadSystemDataResponse = function(/*SystemDataResp*/ systemDataResp,
	/*StatusCode*/ statusCode, /*string*/ statusMessage)
{
	WaitScreen_close();
	if(statusCode == sc_Success)
	{
		this.fProviderList = systemDataResp.ProviderList;
		this.fCategoryList = systemDataResp.CategoryList;
		this.fRatingList = systemDataResp.RatingList;

		this.fIsSystemDataLoaded = true;
		this.callbackCaller(null, statusCode, statusMessage);
		return;
	}

	this.showRequestError(statusMessage);
	this.callbackCaller(null, statusCode, statusMessage);
}

/******************************************************************************/

/*void*/ Session.prototype.enableAdultAccess = function(/*object*/ callbackObj,
	/*string*/ password)
{
	var enableAdultAccessRqst;

	enableAdultAccessRqst = EnableAdultAccessRqst.newInstance();
	enableAdultAccessRqst.Password = CryptoAPI.newInstance().digest(password);

	WaitScreen.newInstance();
	this.Callback = Session.prototype.enableAdultAccessResponse;
	this.CallerCallback = callbackObj;
	DataRequestor.newInstance(this.fSessionData).startRequest(enableAdultAccessRqst, this);
}

/******************************************************************************/

/*void*/ Session.prototype.enableAdultAccessResponse = function(
	/*EnableAdultAccessResp*/ enableAdultAccessResp, /*StatusCode*/ statusCode,
	/*string*/ statusMessage)
{
	WaitScreen_close();
	if(statusCode == sc_Success)
	{
		this.CanAccessAdult = true;
		this.callbackCaller(null, statusCode, statusMessage);
		return;
	}

	this.showRequestError(statusMessage);
	this.callbackCaller(null, statusCode, statusMessage);
}

/******************************************************************************/

/*void*/ Session.prototype.showSearch = function(/*object*/ callbackObj,
	/*SearchData*/ searchData)
{
	var showSearchRqst;

	var providerIDList = new Array();
	var categoryIDList = new Array();
	var ratingIDList = new Array();

	if(searchData.ProviderID != Provider.AllProvidersID)
		providerIDList.push(searchData.ProviderID);
	if(searchData.CategoryID != Category.AllCategoriesID)
		categoryIDList.push(searchData.CategoryID);
	if(searchData.RatingID != Rating.AllRatingsID)
		ratingIDList.push(searchData.RatingID);

	showSearchRqst = ShowSearchRqst.newInstance();
	showSearchRqst.Search = searchData.Search;
	showSearchRqst.ProviderIDList = providerIDList;
	showSearchRqst.CategoryIDList = categoryIDList;
	showSearchRqst.RatingIDList = ratingIDList;

	WaitScreen.newInstance();
	this.Callback = Session.prototype.showSearchResponse;
	this.CallerCallback = callbackObj;
	DataRequestor.newInstance(this.fSessionData).startRequest(showSearchRqst, this);
}

/******************************************************************************/

/*void*/ Session.prototype.showSearchResponse = function(/*ShowSearchResp*/ showSearchResp,
	/*StatusCode*/ statusCode, /*string*/ statusMessage)
{
	WaitScreen_close();
	if(statusCode == sc_Success)
	{
		if(showSearchResp.ReachedMax)
			showMsg("Over " + ShowSearchRqst.MaxResults + " shows were found.  Please try narrowing your search criteria.");

		this.callbackCaller(showSearchResp.ShowSearchList, statusCode, statusMessage);
		return;
	}

	this.showRequestError(statusMessage);
	this.callbackCaller(null, statusCode, statusMessage);
}

/******************************************************************************/

/*void*/ Session.prototype.showDetail = function(/*object*/ callbackObj,
	/*string*/ showID)
{
	var showDetailRqst;

	showDetailRqst = ShowDetailRqst.newInstance();
	showDetailRqst.ShowID = showID;

	WaitScreen.newInstance();
	this.Callback = Session.prototype.showDetailResponse;
	this.CallerCallback = callbackObj;
	DataRequestor.newInstance(this.fSessionData).startRequest(showDetailRqst, this);
}

/******************************************************************************/

/*void*/ Session.prototype.showDetailResponse = function(/*ShowDetailResp*/ showDetailResp,
	/*StatusCode*/ statusCode, /*string*/ statusMessage)
{
	WaitScreen_close();
	if(statusCode == sc_Success)
	{
		this.callbackCaller(showDetailResp.ShowDetail, statusCode, statusMessage);
		return;
	}

	this.showRequestError(statusMessage);
	this.callbackCaller(null, statusCode, statusMessage);
}

/******************************************************************************/

/*void*/ Session.prototype.providerEnroll = function(/*object*/ callbackObj, /*string*/ providerID)
{
	var providerEnrollRqst;

	providerEnrollRqst = ProviderEnrollRqst.newInstance();
	providerEnrollRqst.ProviderID = providerID;

	this.fLastProviderID = providerID;

	WaitScreen.newInstance();
	this.Callback = Session.prototype.providerEnrollResponse;
	this.CallerCallback = callbackObj;
	DataRequestor.newInstance(this.fSessionData).startRequest(providerEnrollRqst, this);
}

/******************************************************************************/

/*void*/ Session.prototype.providerEnrollResponse = function(/*ProviderEnrollResp*/ providerEnrollResp,
	/*StatusCode*/ statusCode, /*string*/ statusMessage)
{
	WaitScreen_close();
	if(statusCode == sc_Success)
	{
		this.fMemberProviderList.push(MemberProvider.newInstance(this.fLastProviderID));

		this.callbackCaller(null, statusCode, statusMessage);
		return;
	}

	this.showRequestError(statusMessage);
	this.callbackCaller(null, statusCode, statusMessage);
}

/******************************************************************************/

/*StatusCode*/ Session.prototype.setProvider = function(/*object*/ callbackObj,
	/*string*/ providerID, /*string*/ userID, /*string*/ password)
{
	var setProviderRqst;

	//TODO: encrypt UserID and Password

	setProviderRqst = SetProviderRqst.newInstance();
	setProviderRqst.ProviderID = providerID;
	setProviderRqst.UserID = userID;
	setProviderRqst.Password = password;

	this.fLastProviderID = providerID;

	WaitScreen.newInstance();
	this.Callback = Session.prototype.setProviderResponse;
	this.CallerCallback = callbackObj;
	DataRequestor.newInstance(this.fSessionData).startRequest(setProviderRqst, this);
}

/******************************************************************************/

/*void*/ Session.prototype.setProviderResponse = function(/*SetProviderResp*/ setProviderResp,
	/*StatusCode*/ statusCode, /*string*/ statusMessage)
{
	WaitScreen_close();
	if(statusCode == sc_Success)
	{
		if(arrayFindItemByCmpr(this.fMemberProviderList, new ProviderIDCmpr(this.fLastProviderID)) == null)
			this.fMemberProviderList.push(MemberProvider.newInstance(this.fLastProviderID));

		this.callbackCaller(null, statusCode, statusMessage);
		return;
	}

	this.showRequestError(statusMessage);
	this.callbackCaller(null, statusCode, statusMessage);
}

/******************************************************************************/

/*void*/ Session.prototype.checkShowAvail = function(/*object*/ callbackObj,
	/*string*/ showID, /*string*/ providerID, /*ShowCost*/ showCost)
{
	var checkShowAvailRqst;

	checkShowAvailRqst = CheckShowAvailRqst.newInstance();
	checkShowAvailRqst.ShowID = showID;
	checkShowAvailRqst.ProviderID = providerID;
	checkShowAvailRqst.ShowCost = showCost;

	WaitScreen.newInstance();
	this.Callback = Session.prototype.checkShowAvailResponse;
	this.CallerCallback = callbackObj;
	DataRequestor.newInstance(this.fSessionData).startRequest(checkShowAvailRqst, this);
}

/******************************************************************************/

/*void*/ Session.prototype.checkShowAvailResponse = function(/*CheckShowAvailResp*/ checkShowAvailResp,
	/*StatusCode*/ statusCode, /*string*/ statusMessage)
{
	WaitScreen_close();
	if(statusCode == sc_Success)
	{
		this.callbackCaller(checkShowAvailResp, statusCode, statusMessage);
		return;
	}

	this.showRequestError(statusMessage);
	this.callbackCaller(null, statusCode, statusMessage);
}

/******************************************************************************/

/*void*/ Session.prototype.rentShow = function(/*object*/ callbackObj, /*string*/ showID,
	/*string*/ providerID, /*ShowCost*/ oApprovedCost)
{
	var rentShowRqst;

	rentShowRqst = RentShowRqst.newInstance();
	rentShowRqst.ShowID = showID;
	rentShowRqst.ProviderID = providerID;
	rentShowRqst.ApprovedCost = oApprovedCost;

	WaitScreen.newInstance();
	this.Callback = Session.prototype.rentShowResponse;
	this.CallerCallback = callbackObj;
	DataRequestor.newInstance(this.fSessionData).startRequest(rentShowRqst, this);
}

/******************************************************************************/

/*void*/ Session.prototype.rentShowResponse = function(/*RentShowResp*/ rentShowResp,
	/*StatusCode*/ statusCode, /*string*/ statusMessage)
{
	WaitScreen_close();
	if(statusCode == sc_Success)
	{
		if(this.fDownloadServiceMgr != null)
			this.fDownloadServiceMgr.processNow();
		this.callbackCaller(rentShowResp, statusCode, statusMessage);
		return;
	}

	this.showRequestError(statusMessage);
	this.callbackCaller(null, statusCode, statusMessage);
}

/******************************************************************************/

/*void*/ Session.prototype.rentedShowList = function(/*object*/ callbackObj)
{
	var rentedShowListRqst;

	rentedShowListRqst = RentedShowListRqst.newInstance();

	WaitScreen.newInstance();
	this.Callback = Session.prototype.rentedShowListResponse;
	this.CallerCallback = callbackObj;
	DataRequestor.newInstance(this.fSessionData).startRequest(rentedShowListRqst, this);
}

/******************************************************************************/

/*void*/ Session.prototype.rentedShowListResponse = function(/*RentedShowListResp*/ rentedShowListResp,
	/*StatusCode*/ statusCode, /*string*/ statusMessage)
{
	WaitScreen_close();
	if(statusCode == sc_Success)
	{
		this.callbackCaller(rentedShowListResp.RentedShowSearchList, statusCode, statusMessage);
		return;
	}

	this.showRequestError(statusMessage);
	this.callbackCaller(null, statusCode, statusMessage);
}

/******************************************************************************/

/*void*/ Session.prototype.rentedShow = function(/*object*/ callbackObj, /*string*/ rentedShowID)
{
	var rentedShowRqst;

	rentedShowRqst = RentedShowRqst.newInstance();
	rentedShowRqst.RentedShowID = rentedShowID;

	WaitScreen.newInstance();
	this.Callback = Session.prototype.rentedShowResponse;
	this.CallerCallback = callbackObj;
	DataRequestor.newInstance(this.fSessionData).startRequest(rentedShowRqst, this);
}

/******************************************************************************/

/*void*/ Session.prototype.rentedShowResponse = function(/*RentedShowResp*/ rentedShowResp,
	/*StatusCode*/ statusCode, /*string*/ statusMessage)
{
	WaitScreen_close();
	if(statusCode == sc_Success)
	{
		this.callbackCaller(rentedShowResp.RentedShow, statusCode, statusMessage);
		return;
	}

	this.showRequestError(statusMessage);
	this.callbackCaller(null, statusCode, statusMessage);
}

/******************************************************************************/

/*void*/ Session.prototype.downloadRefresh = function()
{
	if(this.fDownloadServiceMgr == null)
		return;

	this.fDownloadServiceMgr.refresh();
}

/******************************************************************************/

/*string*/ Session.prototype.getDownloadRentedShowStatus = function(/*string*/ rentedShowID)
{
	if(this.fDownloadServiceMgr == null)
		return null;

	return this.fDownloadServiceMgr.getRentedShowStatus(rentedShowID);
}

/******************************************************************************/

/*string*/ Session.prototype.getDownloadRentedShowPath = function(/*string*/ rentedShowID)
{
	if(this.fDownloadServiceMgr == null)
		return null;

	return this.fDownloadServiceMgr.getRentedShowPath(rentedShowID);
}

/******************************************************************************/

/*string*/ Session.prototype.playDownloadedRentedShow = function(/*string*/ rentedShowID,
	/*string*/ useApp)
{
	if(this.fDownloadServiceMgr == null)
		return false;

	return this.fDownloadServiceMgr.playRentedShow(rentedShowID, useApp);
}

/******************************************************************************/

/*void*/ Session.prototype.watchShow = function(/*object*/ callbackObj, /*string*/ rentedShowID)
{
	var watchShowRqst;

	watchShowRqst = WatchShowRqst.newInstance();
	watchShowRqst.RentedShowID = rentedShowID;

	WaitScreen.newInstance();
	this.Callback = Session.prototype.watchShowResponse;
	this.CallerCallback = callbackObj;
	DataRequestor.newInstance(this.fSessionData).startRequest(watchShowRqst, this);
}

/******************************************************************************/

/*void*/ Session.prototype.watchShowResponse = function(/*WatchShowResp*/ watchShowResp,
	/*StatusCode*/ statusCode, /*string*/ statusMessage)
{
	WaitScreen_close();
	if(statusCode == sc_Success)
	{
		this.callbackCaller(watchShowResp.License, statusCode, statusMessage);
		return;
	}

	this.showRequestError(statusMessage);
	this.callbackCaller(null, statusCode, statusMessage);
}

/******************************************************************************/

/*void*/ Session.prototype.releaseShow = function(/*object*/ callbackObj, /*string*/ rentedShowID)
{
	var releaseShowRqst;

	releaseShowRqst = ReleaseShowRqst.newInstance();
	releaseShowRqst.RentedShowID = rentedShowID;

	WaitScreen.newInstance();
	this.Callback = Session.prototype.releaseShowResponse;
	this.CallerCallback = callbackObj;
	DataRequestor.newInstance(this.fSessionData).startRequest(releaseShowRqst, this);
}

/******************************************************************************/

/*void*/ Session.prototype.releaseShowResponse = function(/*ReleaseShowResp*/ releaseShowResp,
	/*StatusCode*/ statusCode, /*string*/ statusMessage)
{
	WaitScreen_close();
	if(statusCode == sc_Success)
	{
		if(this.fDownloadServiceMgr != null)
			this.fDownloadServiceMgr.processNow();
		this.callbackCaller(null, statusCode, statusMessage);
		return;
	}

	this.showRequestError(statusMessage);
	this.callbackCaller(null, statusCode, statusMessage);
}

/******************************************************************************/

/*string*/ Session.prototype.determineAppForShow = function(/*string*/ showURL)
{
	var fileExt = determineFileExtFromURL(showURL).toLowerCase();

	if(arrayIndexOf(FileExtensions_QuickTime, fileExt) >= 0)
		return Application_QuickTimePlayer;

	if(arrayIndexOf(FileExtensions_WindowsMedia, fileExt) >= 0)
		return Application_WindowsMediaPlayer;

	return null;
}

/******************************************************************************/
/******************************************************************************/
/* SessionStore */

/******************************************************************************/
/******************************************************************************/

SessionStore.ContainerFieldName = "SessionStore";

/******************************************************************************/

function SessionStore(reader)
{
	this.GuestAccess = true;
	this.SessionData = null;
	this.SessionExpires = null;

	this.MemberPrefs = null;
	this.MemberProviderList = null;

	this.CanAccessAdult = false;

	if(reader != undefined)
		this.readFrom(reader);
}

/******************************************************************************/

/*SessionStore*/ SessionStore.newInstanceFromXmlString = function(/*string*/ sessionStr)
{
	if(!testStrHasLen(sessionStr))
		return null;

	var dataReader = new XmlDataReader(createXmlDocument(sessionStr));
	return dataReader.readObject(SessionStore.ContainerFieldName, SessionStore);
}

/******************************************************************************/

/*string*/ SessionStore.toXmlString = function(/*SessionStore*/ sessionStore)
{
	if(sessionStore == null)
		return null;

	var dataWriter = new XmlDataWriter();
	dataWriter.writeObject(SessionStore.ContainerFieldName, sessionStore);
	return dataWriter.toString();
}

/******************************************************************************/

/*void*/ SessionStore.prototype.readFrom = function(/*DataReader*/ reader)
{
	this.GuestAccess = reader.readBoolean("GuestAccess");
	this.SessionData = reader.readString("SessionData", SignonResp.SessionDataMaxLength);
	this.SessionExpires = reader.readDateTime("SessionExpires");
	this.MemberPrefs = reader.readObject("MemberPrefs", MemberPrefs);
	this.MemberProviderList = reader.readList("MemberProvider", MemberProvider);

	this.CanAccessAdult = reader.readBoolean("CanAccessAdult");
}

/******************************************************************************/

/*void*/ SessionStore.prototype.writeTo = function(/*DataWriter*/ writer)
{
	writer.writeBoolean("GuestAccess", this.GuestAccess);
	writer.writeString("SessionData", this.SessionData, SignonResp.SessionDataMaxLength);
	writer.writeDateTime("SessionExpires", this.SessionExpires);
	writer.writeObject("MemberPrefs", this.MemberPrefs);
	writer.writeList("MemberProvider", this.MemberProviderList);

	writer.writeBoolean("CanAccessAdult", this.CanAccessAdult);
}

/******************************************************************************/
/******************************************************************************/
/* CryptoAPI.js */

/******************************************************************************/
/******************************************************************************/

CryptoAPI.newInstance = function()
{
	return new CryptoAPI();
}

/******************************************************************************/

function CryptoAPI()
{
}

/******************************************************************************/

/*string*/ CryptoAPI.prototype.digest = function(/*string*/ data)
{
	var httpRequestor = HTTPRequestor.newInstance();

	return httpRequestor.sendGet("/digest/" + data);
}

/******************************************************************************/
/******************************************************************************/

/* DataID.js */

/******************************************************************************/
/******************************************************************************/

var ManufacturerIDMaxLength = 32;
var ProviderIDMaxLength = 32;
var ShowIDMaxLength = 64;
var RentedShowIDMaxLength = 64;
var CategoryIDMaxLength = 32;
var RatingIDMaxLength = 32;

/******************************************************************************/
/******************************************************************************/
/* Player.js */

/******************************************************************************/
/******************************************************************************/

Player.ModelNoMaxLength = 32;
Player.SerialNoMaxLength = 64;
Player.VersionMaxLength = 16;

/******************************************************************************/

Player.newInstance = function()
{
	return new Player();
}

/******************************************************************************/

function Player()
{
	this.ManufacturerID = null;
	this.ModelNo = null;
	this.SerialNo = null;
	this.Version = null;
}

/******************************************************************************/

/*void*/ Player.prototype.writeTo = function(/*DataWriter*/ writer)
{
	writer.writeString("ManufacturerID", this.ManufacturerID, ManufacturerIDMaxLength);
	writer.writeString("ModelNo", this.ModelNo, Player.ModelNoMaxLength);
	writer.writeString("SerialNo", this.SerialNo, Player.SerialNoMaxLength);
	writer.writeString("Version", this.Version, Player.VersionMaxLength);
}

/******************************************************************************/
/******************************************************************************/
/* MemberState.js */

/******************************************************************************/
/******************************************************************************/

function MemberState(reader)
{
	this.MemberPrefs = null;
	this.MemberProviderList = null;

	if(reader != undefined)
		this.readFrom(reader);
}

/******************************************************************************/

/*void*/ MemberState.prototype.readFrom = function(/*DataReader*/ reader)
{
	this.MemberPrefs = reader.readObject("MemberPrefs", MemberPrefs);
	this.MemberProviderList = reader.readList("MemberProvider", MemberProvider);
}

/******************************************************************************/
/******************************************************************************/
/* MemberPrefs.js */

/******************************************************************************/
/******************************************************************************/

function MemberPrefs(reader)
{
	this.IncludeAdult = ina_Never;

	if(reader != undefined)
		this.readFrom(reader);
}

/******************************************************************************/

/*void*/ MemberPrefs.prototype.readFrom = function(/*DataReader*/ reader)
{
	this.IncludeAdult = reader.readString("IncludeAdult", IncludeAdultMaxLength);
}

/******************************************************************************/

/*void*/ MemberPrefs.prototype.writeTo = function(/*DataWriter*/ writer)
{
	writer.writeString("IncludeAdult", this.IncludeAdult, IncludeAdultMaxLength);
}

/******************************************************************************/
/******************************************************************************/
/* IncludeAdult.js */

/******************************************************************************/
/******************************************************************************/

var IncludeAdultMaxLength = 32;

var ina_Never = "Never";
var ina_PromptPassword = "PromptPassword";
var ina_Always = "Always";

/******************************************************************************/
/******************************************************************************/
/* Provider.js */

/******************************************************************************/
/******************************************************************************/

Provider.AllProvidersID = "all";
Provider.AllProvidersName = "All Providers";

/******************************************************************************/

function Provider(reader)
{
	this.ProviderID = null;
	this.Name = null;

	if(reader != undefined)
		this.readFrom(reader);
}

/******************************************************************************/

/*void*/ Provider.prototype.readFrom = function(/*DataReader*/ reader)
{
	this.ProviderID = reader.readString("ProviderID", ProviderIDMaxLength);
	this.Name = reader.readString("Name", 64);
}

/******************************************************************************/
/******************************************************************************/
/* ProviderIDCmpr.js */

/******************************************************************************/
/******************************************************************************/

function ProviderIDCmpr(providerID)
{
	this.ProviderID = providerID;
}

/******************************************************************************/

/*int*/ ProviderIDCmpr.prototype.compare = function(oCompare)
{
	if(this.ProviderID == oCompare.ProviderID)
		return 0;
	if(this.ProviderID < oCompare.ProviderID)
		return -1;
	return 1;
}

/******************************************************************************/
/******************************************************************************/
/* Category.js */

/******************************************************************************/
/******************************************************************************/

Category.AllCategoriesID = "all";
Category.AllCategoriesName = "All Categories";
Category.FeaturedCategoryID = "featured";

/******************************************************************************/

function Category(reader)
{
	this.CategoryID = null;
	this.Name = null;

	if(reader != undefined)
		this.readFrom(reader);
}

/******************************************************************************/

/*void*/ Category.prototype.readFrom = function(/*DataReader*/ reader)
{
	this.CategoryID = reader.readString("CategoryID", CategoryIDMaxLength);
	this.Name = reader.readString("Name", 64);
}

/******************************************************************************/
/******************************************************************************/
/* Rating.js */

/******************************************************************************/
/******************************************************************************/

Rating.AllRatingsID = "all";
Rating.AllRatingsName = "All Ratings";

/******************************************************************************/

function Rating(reader)
{
	this.RatingID = null;
	this.Name = null;

	if(reader != undefined)
		this.readFrom(reader);
}

/******************************************************************************/

/*void*/ Rating.prototype.readFrom = function(/*DataReader*/ reader)
{
	this.RatingID = reader.readString("RatingID", RatingIDMaxLength);
	this.Name = reader.readString("Name", 64);
}

/******************************************************************************/
/******************************************************************************/
/* MemberProvider.js */

/******************************************************************************/
/******************************************************************************/

MemberProvider.newInstance = function(/*string*/ providerID)
{
	var oMemberProvider = new MemberProvider();

	oMemberProvider.ProviderID = providerID;

	return oMemberProvider;
}

/******************************************************************************/

function MemberProvider(reader)
{
	this.ProviderID = null;

	if(reader != undefined)
		this.readFrom(reader);
}

/******************************************************************************/

/*void*/ MemberProvider.prototype.readFrom = function(/*DataReader*/ reader)
{
	this.ProviderID = reader.readString("ProviderID", ProviderIDMaxLength);
}

/******************************************************************************/

/*void*/ MemberProvider.prototype.writeTo = function(/*DataWriter*/ writer)
{
	writer.writeString("ProviderID", this.ProviderID, ProviderIDMaxLength);
}

/******************************************************************************/
/******************************************************************************/
/* ShowSearch.js */

/******************************************************************************/
/******************************************************************************/

function ShowSearch(reader)
{
	this.ShowID = null;
	this.Name = null;
	this.EpisodeName = null;
	this.ReleasedOn = null;
	this.ReleasedYear = null;
	this.PictureURL = null;
	this.ShowProviderList = null;

	if(reader != undefined)
		this.readFrom(reader);
}

/******************************************************************************/

/*void*/ ShowSearch.prototype.readFrom = function(/*DataReader*/ reader)
{
	this.ShowID = reader.readString("ShowID", ShowIDMaxLength);
	this.Name = reader.readString("Name", 64);
	this.EpisodeName = reader.readString("EpisodeName", 64);
	this.ReleasedOn = reader.readDate("ReleasedOn");
	this.ReleasedYear = reader.readShort("ReleasedYear");
	this.PictureURL = reader.readString("PictureURL", 4096);	//TODO:
	this.ShowProviderList = reader.readList("ShowProvider", ShowProvider);
}

/******************************************************************************/
/******************************************************************************/
/* ShowSearchCmprs.js */

/******************************************************************************/
/******************************************************************************/

function ShowSearchByNameCmpr(lhs, rhs)
{
	var rc = compareStringsIgnoreCase(lhs.Name, rhs.Name);

	if(rc != 0)
		return rc;

	return compareDates(rhs.ReleasedOn, lhs.ReleasedOn);	// reversed
}

/******************************************************************************/

function ShowSearchByDateCmpr(lhs, rhs)
{
	var rc = compareDates(lhs.ReleasedOn, rhs.ReleasedOn);

	//if(rc != 0)
		return rc;

	//return compareStringsIgnoreCase(lhs.EpisodeName, rhs.EpisodeName);
}

/******************************************************************************/

function ShowSearchByDateDescCmpr(lhs, rhs)
{
	var rc = compareDates(rhs.ReleasedOn, lhs.ReleasedOn);

	//if(rc != 0)
		return rc;

	//return compareStringsIgnoreCase(lhs.EpisodeName, rhs.EpisodeName);
}

/******************************************************************************/

function ShowSearchByCostCmpr(lhs, rhs)
{
	var lhsShowCost = lhs.ShowProviderList[0].ShowCost;
	var rhsShowCost = rhs.ShowProviderList[0].ShowCost;

	var rc = ShowCostTypeCmpr(lhsShowCost.ShowCostType, rhsShowCost.ShowCostType);

	if(rc != 0)
		return rc;

	if(lhsShowCost.ShowCostType == sct_PayPerView)
	{
		rc = compareNumbers(lhsShowCost.Cost.Amount, rhsShowCost.Cost.Amount);
		if(rc != 0)
			return rc;
	}

	// sort by Name as last resort
	return ShowSearchByNameCmpr(lhs, rhs);
}

/******************************************************************************/
/******************************************************************************/
/* ShowDetail.js */

/******************************************************************************/
/******************************************************************************/

function ShowDetail(reader)
{
	this.ShowID = null;
	this.Name = null;
	this.EpisodeName = null;
	this.EpisodeNumber= null;

	this.ReleasedOn = null;
	this.ReleasedYear = null;
	this.Description = null;
	this.RunningMins = null;
	this.PictureURL = null;

	this.CategoryIDList = null;
	this.RatingID = null;
	this.IsAdult = false;

	this.ShowProviderList = null;

	if(reader != undefined)
		this.readFrom(reader);
}

/******************************************************************************/

/*void*/ ShowDetail.prototype.readFrom = function(/*DataReader*/ reader)
{
	this.ShowID = reader.readString("ShowID", ShowIDMaxLength);
	this.Name = reader.readString("Name", 64);
	this.EpisodeName = reader.readString("EpisodeName", 64);
	this.EpisodeNumber = reader.readString("EpisodeNumber", 32);

	this.ReleasedOn = reader.readDate("ReleasedOn");
	this.ReleasedYear = reader.readShort("ReleasedYear");
	this.Description = reader.readString("Description", 4096);	//TODO:
	this.RunningMins = reader.readShort("RunningMins");
	this.PictureURL = reader.readString("PictureURL", 4096);	//TODO:

	this.CategoryIDList = reader.readStringList("CategoryID", String);
	this.RatingID = reader.readString("RatingID", RatingIDMaxLength);
	this.IsAdult = reader.readBoolean("IsAdult");

	this.ShowProviderList = reader.readList("ShowProvider", ShowProvider);
}

/******************************************************************************/
/******************************************************************************/
/* ShowProvider.js */

/******************************************************************************/
/******************************************************************************/

function ShowProvider(reader)
{
	this.ProviderID = null;
	this.ShowCostList = null;

	if(reader != undefined)
		this.readFrom(reader);
}

/******************************************************************************/

/*void*/ ShowProvider.prototype.readFrom = function(/*DataReader*/ reader)
{
	this.ProviderID = reader.readString("ProviderID", ProviderIDMaxLength);
	this.ShowCostList = reader.readList("ShowCost", ShowCost);
}

/******************************************************************************/
/******************************************************************************/
/* ShowCostType.js */

/******************************************************************************/
/******************************************************************************/

var ShowCostTypeMaxLength = 32;

var sct_Free = "Free";
var sct_Subscription = "Subscription";
var sct_PayPerView = "PayPerView";

var ShowCostTypeSortOrder = new Array(sct_Free, sct_Subscription, sct_PayPerView);

/******************************************************************************/

function ShowCostTypeCmpr(lhs, rhs)
{
	return compareNumbers(arrayIndexOf(ShowCostTypeSortOrder, lhs),
		arrayIndexOf(ShowCostTypeSortOrder, rhs));
}

/******************************************************************************/
/******************************************************************************/
/* ShowCost.js */

/******************************************************************************/
/******************************************************************************/

ShowCost.CostDisplayMaxLength = 32;

/******************************************************************************/

function ShowCost(reader)
{
	this.ShowCostType = null;
	this.Cost = null;
	this.CostDisplay = null;
	this.RentalWindowDays = null;
	this.RentalPeriodHours = null;

	if(reader != undefined)
		this.readFrom(reader);
}

/******************************************************************************/

/*string*/ ShowCost.prototype.formatRental = function()
{
	var tempStr = "";

	if(this.RentalPeriodHours)
	{
		if(this.RentalPeriodHours > 48)
			tempStr = (this.RentalPeriodHours / 24) + " days";
		else
			tempStr = this.RentalPeriodHours + " hrs.";
	}
	if(this.RentalWindowDays)
	{
		if(tempStr.length > 0)
			tempStr += " / ";
		tempStr += this.RentalWindowDays + " days";
	}

	if(tempStr.length == 0)
		return "n/a";
	return tempStr;
}

/******************************************************************************/

/*void*/ ShowCost.prototype.readFrom = function(/*DataReader*/ reader)
{
	this.ShowCostType = reader.readString("ShowCostType", ShowCostTypeMaxLength);
	this.Cost = reader.readObject("Cost", Money);
	this.CostDisplay = reader.readString("CostDisplay", ShowCost.CostDisplayMaxLength);
	this.RentalWindowDays = reader.readShort("RentalWindowDays");
	this.RentalPeriodHours = reader.readShort("RentalPeriodHours");
}

/******************************************************************************/

/*void*/ ShowCost.prototype.writeTo = function(/*DataWriter*/ writer)
{
	writer.writeString("ShowCostType", this.ShowCostType, ShowCostTypeMaxLength);
	writer.writeObject("Cost", this.Cost);
	writer.writeString("CostDisplay", this.CostDisplay, ShowCost.CostDisplayMaxLength);
	writer.writeShort("RentalWindowDays", this.RentalWindowDays);
	writer.writeShort("RentalPeriodHours", this.RentalPeriodHours);
}

/******************************************************************************/
/******************************************************************************/
/* RentedShowSearch.js */

/******************************************************************************/
/******************************************************************************/

function RentedShowSearch(reader)
{
	this.RentedShowID = null;
	this.ShowID = null;
	this.ProviderID = null;
	this.Name = null;
	this.EpisodeName = null;
	this.PictureURL = null;
	this.AvailableUntil = null;

	if(reader != undefined)
		this.readFrom(reader);
}

/******************************************************************************/

/*void*/ RentedShowSearch.prototype.readFrom = function(/*DataReader*/ reader)
{
	this.RentedShowID = reader.readString("RentedShowID", RentedShowIDMaxLength);
	this.ShowID = reader.readString("ShowID", ShowIDMaxLength);
	this.ProviderID = reader.readString("ProviderID", ProviderIDMaxLength);
	this.Name = reader.readString("Name", 64);
	this.EpisodeName = reader.readString("EpisodeName", 64);
	this.PictureURL = reader.readString("PictureURL", 4096);	//TODO:
	this.AvailableUntil = reader.readDateTime("AvailableUntil");
}

/******************************************************************************/
/******************************************************************************/
/* RentedShowSearchCmprs.js */

/******************************************************************************/
/******************************************************************************/

function RentedShowSearchToIDCmpr(rentedShowID)
{
	this.RentedShowID = rentedShowID;
}

/******************************************************************************/

/*int*/ RentedShowSearchToIDCmpr.prototype.compare = function(oRentedShowSearch)
{
	if(this.RentedShowID == oRentedShowSearch.RentedShowID)
		return 0;
	if(this.RentedShowID < oRentedShowSearch.RentedShowID)
		return -1;
	return 1;
}

/******************************************************************************/
/******************************************************************************/

function RentedShowSearchByNameCmpr(lhs, rhs)
{
	var rc = compareStringsIgnoreCase(lhs.Name, rhs.Name);

	if(rc != 0)
		return rc;

	return compareDates(rhs.ReleasedOn, lhs.ReleasedOn);	// reversed
}

/******************************************************************************/

function RentedShowSearchByAvailableUntilCmpr(lhs, rhs)
{
	return compareDates(lhs.AvailableUntil, rhs.AvailableUntil);
}

/******************************************************************************/
/******************************************************************************/
/* RentedShow.js */

/******************************************************************************/
/******************************************************************************/

function RentedShow(reader)
{
	this.RentedShowID = null;

	this.ShowID = null;
	this.ProviderID = null;
	this.Name = null;
	this.EpisodeName = null;
	this.EpisodeNumber= null;

	this.ReleasedOn = null;
	this.ReleasedYear = null;
	this.Description = null;
	this.RunningMins = null;
	this.PictureURL = null;

	this.CategoryIDList = null;
	this.RatingID = null;
	this.IsAdult = false;

	this.ShowCost = null;
	this.RentedOn = null;
	this.AvailableUntil = null;

	if(reader != undefined)
		this.readFrom(reader);
}

/******************************************************************************/

/*void*/ RentedShow.prototype.readFrom = function(/*DataReader*/ reader)
{
	this.RentedShowID = reader.readString("RentedShowID", RentedShowIDMaxLength);

	this.ShowID = reader.readString("ShowID", ShowIDMaxLength);
	this.ProviderID = reader.readString("ProviderID", ProviderIDMaxLength);
	this.Name = reader.readString("Name", 64);
	this.EpisodeName = reader.readString("EpisodeName", 64);
	this.EpisodeNumber = reader.readString("EpisodeNumber", 32);

	this.ReleasedOn = reader.readDate("ReleasedOn");
	this.ReleasedYear = reader.readShort("ReleasedYear");
	this.Description = reader.readString("Description", 4096);	//TODO:
	this.RunningMins = reader.readShort("RunningMins");
	this.PictureURL = reader.readString("PictureURL", 4096);	//TODO:

	this.CategoryIDList = reader.readStringList("CategoryID", String);
	this.RatingID = reader.readString("RatingID", RatingIDMaxLength);
	this.IsAdult = reader.readBoolean("IsAdult");

	this.ShowCost = reader.readObject("ShowCost", ShowCost);
	this.RentedOn = reader.readDateTime("RentedOn");
	this.AvailableUntil = reader.readDateTime("AvailableUntil");
}

/******************************************************************************/
/******************************************************************************/
/* License.js */

/******************************************************************************/
/******************************************************************************/

License.ShowURLMaxLength = 4096;
License.LicenseURLMaxLength = 4096;
License.ContentIDMaxLength = 64;
License.UserIDMaxLength = 64;
License.PasswordMaxLength = 32;

/******************************************************************************/

function License(reader)
{
	this.LicenseMethod = null;
	this.ShowURL = null;
	this.LicenseURL = null;
	this.ContentID = null;
	this.UserID = null;
	this.Password = null;

	if(reader != undefined)
		this.readFrom(reader);
}

/******************************************************************************/

/*void*/ License.prototype.readFrom = function(/*DataReader*/ reader)
{
	this.LicenseMethod = reader.readString("LicenseMethod", LicenseMethodMaxLength);
	this.ShowURL = reader.readString("ShowURL", License.ShowURLMaxLength);
	this.LicenseURL = reader.readString("LicenseURL", License.LicenseURLMaxLength);
	this.ContentID = reader.readString("ContentID", License.ContentIDMaxLength);
	this.UserID = reader.readString("UserID", License.UserIDMaxLength);
	this.Password = reader.readString("Password", License.MaxLength);
}

/******************************************************************************/
/******************************************************************************/
/* LicenseMethod.js */

/******************************************************************************/
/******************************************************************************/

var LicenseMethodMaxLength = 32;

var lm_URLOnly = "URLOnly";
var lm_LicenseServer = "LicenseServer";

/******************************************************************************/
/******************************************************************************/
/* StatusCode.js */

/******************************************************************************/
/******************************************************************************/

var sc_Success = 0;

var sc_InvalidUserIDPassword = 1000;
var sc_InvalidSession = 1001;
var sc_InvalidProviderUserIDPassword = 1003;

var sc_GeneralError = 9999;

/******************************************************************************/
/******************************************************************************/
/* HTTPRequestor.js */

/******************************************************************************/
/******************************************************************************/

HTTPRequestor.newInstance = function()
{
	return new HTTPRequestor();
}

/******************************************************************************/

function HTTPRequestor()
{
}

/******************************************************************************/

/*string*/ HTTPRequestor.prototype.sendRequest = function(/*string*/ request)
{
	var session = MainApp.getThe().getSession();

	var xmlHttp = createXMLHttpRequest();
	xmlHttp.open("POST", session.getNetworkURL(), false);
	xmlHttp.setRequestHeader("Content-Type", "text/xml;charset=UTF-8");
	xmlHttp.send(request);

	return xmlHttp.responseText;
}

/******************************************************************************/

/*void*/ HTTPRequestor.prototype.sendRequestAsync = function(/*string*/ request,
	/*object*/ callbackObj)
{
	try
	{
		var session = MainApp.getThe().getSession();

		var xmlHttp = createXMLHttpRequest();
		xmlHttp.onreadystatechange = function() { HTTPRequestor_checkRequest(xmlHttp, callbackObj); };
		xmlHttp.open("POST", session.getNetworkURL(), true);
		xmlHttp.setRequestHeader("Content-Type", "text/xml;charset=UTF-8");
		xmlHttp.send(request);
	}
	catch(e)
	{
		HTTPRequestor_callback(callbackObj, null);
	}
}

/******************************************************************************/

/*void*/ function HTTPRequestor_checkRequest(/*XMLHttpRequest*/ xmlHttp,
	/*object*/ callbackObj)
{
	if(xmlHttp.readyState == 4)
	{
		try
		{
			if(xmlHttp.status == 200)
			{
				HTTPRequestor_callback(callbackObj, xmlHttp.responseXML);
				return;
			}
		}
		catch(e)
		{
		}

		HTTPRequestor_callback(callbackObj, null);
	}
}

/******************************************************************************/

/*void*/ function HTTPRequestor_callback(/*object*/ callbackObj, /*object*/ data)
{
	if(callbackObj && callbackObj.Callback)
	{
		try
		{
			callbackObj.Callback(data);
		}
		catch(e)
		{
		}
	}
}

/******************************************************************************/

/*string*/ HTTPRequestor.prototype.sendGet = function(/*string*/ request)
{
	var session = MainApp.getThe().getSession();

	var xmlHttp = createXMLHttpRequest();
	xmlHttp.open("GET", session.getCryptoAPIURL() + request, false);
	xmlHttp.send(null);

	return xmlHttp.responseText;
}

/******************************************************************************/
/******************************************************************************/
/* DataRequestor.js */

/******************************************************************************/
/******************************************************************************/

DataRequestor.newInstance = function(/*string*/ sessionData)
{
	return new DataRequestor(sessionData);
}

/******************************************************************************/

function DataRequestor(/*string*/ sessionData)
{
	this.Callback = null;
	this.CallerCallback = null;

	this.fSessionData = null;
	if(testStrHasLen(sessionData))
		this.fSessionData = sessionData;

	this.fStatusCode = sc_GeneralError;
	this.fStatusMessage = null;
}

/******************************************************************************/

/*INetVODPlayerRqst*/ DataRequestor.prototype.createHeader = function(/*Streamable*/ payload)
{
	var request;
	var requestData;

	request = INetVODPlayerRqst.newInstance();
	request.setVersion("1.0.0");	//TODO:
	request.setRequestID("1");	//TODO:
	request.setSessionData(this.fSessionData);

	requestData = RequestData.newInstance();
	requestData.setRequest(payload);
	request.setRequestData(requestData);

	return request;
}

/******************************************************************************/

/*Streamable*/ DataRequestor.prototype.parseHeader = function(/*INetVODPlayerResp*/ response)
{
	this.fStatusCode = response.StatusCode;
	this.fStatusMessage = response.StatusMessage;

	if(this.fStatusCode == sc_InvalidSession)
		MainApp.getThe().closePopup();

	if(isNull(response.ResponseData))
	{
		if(this.fStatusCode == sc_Success)
			this.fStatusCode = sc_GeneralError;
		return null;
	}

	return response.ResponseData.Response;
}

/******************************************************************************/

/*Streamable*/ DataRequestor.prototype.sendRequest = function(/*Streamable*/ payload)
{
	var httpRequestor = HTTPRequestor.newInstance();

	// build the request header
	var request = this.createHeader(payload);

	// build request data
	var dataWriter = new XmlDataWriter();
	dataWriter.writeObject("INetVODPlayerRqst", request);

	var response = httpRequestor.sendRequest(dataWriter.toString());
	var dataReader = new XmlDataReader(response);

	var requestable = dataReader.readObject("INetVODPlayerResp", INetVODPlayerResp);
	return this.parseHeader(requestable);
}

/******************************************************************************/

/*void*/ DataRequestor.prototype.sendRequestAsync = function(/*Streamable*/ payload,
	/*object*/ callbackObj)
{
	try
	{
		var httpRequestor = HTTPRequestor.newInstance();

		// build the request header
		var request = this.createHeader(payload);

		// build request data
		var dataWriter = new XmlDataWriter();
		dataWriter.writeObject("INetVODPlayerRqst", request);

		this.Callback = DataRequestor.prototype.parseResponse;
		this.CallerCallback = callbackObj;
		httpRequestor.sendRequestAsync(dataWriter.toString(), this);
	}
	catch(e)
	{
		showError("DataRequestor.sendRequestAsync", e);
		this.callbackCaller(null);
	}
}

/******************************************************************************/

/*void*/ DataRequestor.prototype.parseResponse = function(/*Streamable*/ response)
{
	try
	{
		if(response)
		{
			var dataReader = new XmlDataReader(response);
			var requestable = dataReader.readObject("INetVODPlayerResp", INetVODPlayerResp);
			this.callbackCaller(this.parseHeader(requestable));
		}
		else
			this.callbackCaller(null);
	}
	catch(e)
	{
		showError("DataRequestor.parseResponse", e);
		this.callbackCaller(null);
	}
}

/******************************************************************************/

/*void*/ DataRequestor.prototype.callbackCaller = function(/*object*/ data)
{
	if(isObject(this.CallerCallback) && isFunction(this.CallerCallback.Callback))
	{
		try
		{
			this.CallerCallback.Callback(data, this.fStatusCode, this.fStatusMessage);
		}
		catch(e)
		{
			showError("DataRequestor.callbackCaller", e);
		}
	}
}

/******************************************************************************/

/*void*/ DataRequestor.prototype.startRequest = function(/*object*/ request,
	/*object*/ callbackObj)
{
	this.sendRequestAsync(request, callbackObj);
}

/******************************************************************************/
/******************************************************************************/
/* INetVODPlayerRqst.js */

/******************************************************************************/
/******************************************************************************/

INetVODPlayerRqst.newInstance = function()
{
	return new INetVODPlayerRqst();
}

/******************************************************************************/

function INetVODPlayerRqst()
{
	this.VersionMaxLength = 16;
	this.RequestIDMaxLength = 64;
	this.SessionDataMaxLength = 32768;

	this.fVersion = null;
	this.fRequestID = 0;
	this.fSessionData = null;
	this.fRequestData = null;
}

/******************************************************************************/

/*void*/ INetVODPlayerRqst.prototype.setVersion = function(/*string*/ version)
{
	this.fVersion = version;
}

/******************************************************************************/

/*void*/ INetVODPlayerRqst.prototype.setRequestID = function(/*string*/ requestID)
{
	this.fRequestID = requestID;
}

/******************************************************************************/

/*void*/ INetVODPlayerRqst.prototype.setSessionData = function(/*string*/ sessionData)
{
	this.fSessionData = sessionData;
}

/******************************************************************************/

/*void*/ INetVODPlayerRqst.prototype.setRequestData = function(/*RequestData*/ requestData)
{
	this.fRequestData = requestData;
}

/******************************************************************************/

/*void*/ INetVODPlayerRqst.prototype.writeTo = function(/*DataWriter*/ writer)
{
	writer.writeString("Version", this.fVersion, this.VersionMaxLength);
	writer.writeString("RequestID", this.fRequestID, this.RequestIDMaxLength);
	writer.writeString("SessionData", this.fSessionData, this.SessionDataMaxLength);

	writer.writeObject("RequestData", this.fRequestData);
}

/******************************************************************************/
/******************************************************************************/
/* INetVODPlayerResp */

/******************************************************************************/
/******************************************************************************/

function INetVODPlayerResp(reader)
{
	this.RequestIDMaxLength = 64;
	this.StatusMessageMaxLength = 1024;

	this.RequestID = null;
	this.StatusCode = 0;
	this.StatusMessage = null;
	this.ResponseData = null;
	
	if(reader != undefined)
		this.readFrom(reader);
}

/******************************************************************************/

/*void*/ INetVODPlayerResp.prototype.readFrom = function(/*DataReader*/ reader)
{
	this.RequestID = reader.readString("RequestID", this.RequestIDMaxLength);
	this.StatusCode = reader.readInt("StatusCode");
	this.StatusMessage = reader.readString("StatusMessage", this.StatusMessageMaxLength);
	this.ResponseData = reader.readObject("ResponseData", ResponseData);
}

/******************************************************************************/
/******************************************************************************/
/* RequestData.js */

/******************************************************************************/
/******************************************************************************/

RequestData.newInstance = function()
{
	return new RequestData();
}

/******************************************************************************/

function RequestData()
{
	this.RequestTypeMaxLength = 64;

	this.fRequestType = null;
	this.fRequest = null;
}

/******************************************************************************/

/*void*/ RequestData.prototype.setRequest = function(/*Requestable*/ request)
{
	this.fRequestType = request.className();
	this.fRequest = request;
}

/******************************************************************************/

/*void*/ RequestData.prototype.writeTo = function(/*DataWriter*/ writer)
{
	writer.writeString("RequestType", this.fRequestType, this.RequestTypeMaxLength);
	writer.writeObject(this.fRequestType, this.fRequest);
}

/******************************************************************************/
/******************************************************************************/
/* ResponseData.js */

/******************************************************************************/
/******************************************************************************/

function ResponseData(reader)
{
	this.ResponseTypeMaxLength = 64;

	this.fResponseType = null;
	this.Response = null;
	
	if(reader != undefined)
		this.readFrom(reader);
}

/******************************************************************************/

/*void*/ ResponseData.prototype.readFrom = function(/*DataReader*/ reader)
{
	this.fResponseType = reader.readString("ResponseType", this.ResponseTypeMaxLength);
	this.Response = reader.readObject(this.fResponseType, eval(this.fResponseType));
}

/******************************************************************************/
/******************************************************************************/
/* PingRqst */

/******************************************************************************/
/******************************************************************************/

PingRqst.newInstance = function()
{
	return new PingRqst();
}

/******************************************************************************/

function PingRqst()
{
}

/******************************************************************************/

/*string*/ PingRqst.prototype.className = function()
{
	return "PingRqst";
}

/******************************************************************************/

/*void*/ PingRqst.prototype.writeTo = function(/*DataWriter*/ writer)
{
	/* no fields */
}

/******************************************************************************/
/******************************************************************************/
/* PingResp */

/******************************************************************************/
/******************************************************************************/

function PingResp(reader)
{
	if(reader != undefined)
		this.readFrom(reader);
}

/******************************************************************************/

/*void*/ PingResp.prototype.readFrom = function(/*DataReader*/ reader)
{
	/* no fields */
}

/******************************************************************************/
/******************************************************************************/
/* SignonRqst */

/******************************************************************************/
/******************************************************************************/

SignonRqst.UserIDMaxLength = 128;
SignonRqst.PasswordMaxLength = 32;

/******************************************************************************/

SignonRqst.newInstance = function()
{
	return new SignonRqst();
}

/******************************************************************************/

function SignonRqst()
{
	this.UserID = null;
	this.Password = null;
	this.Player = null;
}

/******************************************************************************/

/*string*/ SignonRqst.prototype.className = function()
{
	return "SignonRqst";
}

/******************************************************************************/

/*void*/ SignonRqst.prototype.writeTo = function(/*DataWriter*/ writer)
{
	writer.writeString("UserID", this.UserID, SignonRqst.UserIDMaxLength);
	writer.writeString("Password", this.Password, SignonRqst.PasswordMaxLength);
	writer.writeObject("Player", this.Player);
}

/******************************************************************************/
/******************************************************************************/
/* SignonResp */

/******************************************************************************/
/******************************************************************************/

SignonResp.SessionDataMaxLength = 32767;

/******************************************************************************/

function SignonResp(reader)
{
	this.SessionData = null;
	this.SessionExpires = null;
	this.MemberState = null;

	if(reader != undefined)
		this.readFrom(reader);
}

/******************************************************************************/

/*void*/ SignonResp.prototype.readFrom = function(/*DataReader*/ reader)
{
	this.SessionData = reader.readString("SessionData", SignonResp.SessionDataMaxLength);
	this.SessionExpires = reader.readDateTime("SessionExpires");
	this.MemberState = reader.readObject("MemberState", MemberState);
}

/******************************************************************************/
/******************************************************************************/
/* SystemDataRqst */

/******************************************************************************/
/******************************************************************************/

SystemDataRqst.newInstance = function()
{
	return new SystemDataRqst();
}

/******************************************************************************/

function SystemDataRqst()
{
}

/******************************************************************************/

/*string*/ SystemDataRqst.prototype.className = function()
{
	return "SystemDataRqst";
}

/******************************************************************************/

/*void*/ SystemDataRqst.prototype.writeTo = function(/*DataWriter*/ writer)
{
	/* no fields */
}

/******************************************************************************/
/******************************************************************************/
/* SystemDataResp */

/******************************************************************************/
/******************************************************************************/

function SystemDataResp(reader)
{
	this.ProviderList = null;
	this.CategoryList = null;
	this.RatingList = null;

	if(reader != undefined)
		this.readFrom(reader);
}

/******************************************************************************/

/*void*/ SystemDataResp.prototype.readFrom = function(/*DataReader*/ reader)
{
	this.ProviderList = reader.readList("Provider", Provider);
	this.CategoryList = reader.readList("Category", Category);
	this.RatingList = reader.readList("Rating", Rating);
}

/******************************************************************************/
/******************************************************************************/
/* EnableAdultAccessRqst */

/******************************************************************************/
/******************************************************************************/

EnableAdultAccessRqst.PasswordMaxLength = 32;

/******************************************************************************/

EnableAdultAccessRqst.newInstance = function()
{
	return new EnableAdultAccessRqst();
}

/******************************************************************************/

function EnableAdultAccessRqst()
{
	this.Password = null;
}

/******************************************************************************/

/*string*/ EnableAdultAccessRqst.prototype.className = function()
{
	return "EnableAdultAccessRqst";
}

/******************************************************************************/

/*void*/ EnableAdultAccessRqst.prototype.writeTo = function(/*DataWriter*/ writer)
{
	writer.writeString("Password", this.Password, EnableAdultAccessRqst.PasswordMaxLength);
}

/******************************************************************************/
/******************************************************************************/
/* EnableAdultAccessResp */

/******************************************************************************/
/******************************************************************************/

function EnableAdultAccessResp(reader)
{
	if(reader != undefined)
		this.readFrom(reader);
}

/******************************************************************************/

/*void*/ EnableAdultAccessResp.prototype.readFrom = function(/*DataReader*/ reader)
{
	/* no fields */
}

/******************************************************************************/
/******************************************************************************/
/* ShowSearchRqst */

/******************************************************************************/
/******************************************************************************/

ShowSearchRqst.MaxResults = 1000;	//TODO: ???

/******************************************************************************/

ShowSearchRqst.newInstance = function()
{
	return new ShowSearchRqst();
}

/******************************************************************************/

function ShowSearchRqst()
{
	this.Search = null;

	this.ProviderIDList = null;
	this.CategoryIDList = null;
	this.RatingIDList = null;

	this.MaxResults = ShowSearchRqst.MaxResults;
}

/******************************************************************************/

/*string*/ ShowSearchRqst.prototype.className = function()
{
	return "ShowSearchRqst";
}

/******************************************************************************/

/*void*/ ShowSearchRqst.prototype.writeTo = function(/*DataWriter*/ writer)
{
	writer.writeString("Search", this.Search, 64);	//TODO: Show_NameMaxLength

	writer.writeStringList("ProviderID", this.ProviderIDList, ProviderIDMaxLength);
	writer.writeStringList("CategoryID", this.CategoryIDList, CategoryIDMaxLength);
	writer.writeStringList("RatingID", this.RatingIDList, RatingIDMaxLength);

	writer.writeShort("MaxResults", this.MaxResults);
}

/******************************************************************************/
/******************************************************************************/
/* ShowSearchResp */

/******************************************************************************/
/******************************************************************************/

function ShowSearchResp(reader)
{
	this.ShowSearchList = null;
	this.ReachedMax = false;

	if(reader != undefined)
		this.readFrom(reader);
}

/******************************************************************************/

/*void*/ ShowSearchResp.prototype.readFrom = function(/*DataReader*/ reader)
{
	this.ShowSearchList = reader.readList("ShowSearch", ShowSearch);
	this.ReachedMax = reader.readBoolean("ReachedMax");
}

/******************************************************************************/
/******************************************************************************/
/* ShowDetailRqst */

/******************************************************************************/
/******************************************************************************/

ShowDetailRqst.newInstance = function()
{
	return new ShowDetailRqst();
}

/******************************************************************************/

function ShowDetailRqst()
{
	this.ShowID = null;
}

/******************************************************************************/

/*string*/ ShowDetailRqst.prototype.className = function()
{
	return "ShowDetailRqst";
}

/******************************************************************************/

/*void*/ ShowDetailRqst.prototype.writeTo = function(/*DataWriter*/ writer)
{
	writer.writeString("ShowID", this.ShowID, ShowIDMaxLength);
}

/******************************************************************************/
/******************************************************************************/
/* ShowDetailResp */

/******************************************************************************/
/******************************************************************************/

function ShowDetailResp(reader)
{
	this.ShowDetail = null;

	if(reader != undefined)
		this.readFrom(reader);
}

/******************************************************************************/

/*void*/ ShowDetailResp.prototype.readFrom = function(/*DataReader*/ reader)
{
	this.ShowDetail = reader.readObject("ShowDetail", ShowDetail);
}

/******************************************************************************/
/******************************************************************************/
/* ProviderEnrollRqst */

/******************************************************************************/
/******************************************************************************/

ProviderEnrollRqst.newInstance = function()
{
	return new ProviderEnrollRqst();
}

/******************************************************************************/

function ProviderEnrollRqst()
{
	this.ProviderID = null;
}

/******************************************************************************/

/*string*/ ProviderEnrollRqst.prototype.className = function()
{
	return "ProviderEnrollRqst";
}

/******************************************************************************/

/*void*/ ProviderEnrollRqst.prototype.writeTo = function(/*DataWriter*/ writer)
{
	writer.writeString("ProviderID", this.ProviderID, ProviderIDMaxLength);
}

/******************************************************************************/
/******************************************************************************/
/* ProviderEnrollResp */

/******************************************************************************/
/******************************************************************************/

function ProviderEnrollResp(reader)
{
	if(reader != undefined)
		this.readFrom(reader);
}

/******************************************************************************/

/*void*/ ProviderEnrollResp.prototype.readFrom = function(/*DataReader*/ reader)
{
	/* no fields */
}

/******************************************************************************/
/******************************************************************************/
/* SetProviderRqst */

/******************************************************************************/
/******************************************************************************/

SetProviderRqst.UserIDMaxLength = 128;
SetProviderRqst.PasswordMaxLength = 32;

/******************************************************************************/

SetProviderRqst.newInstance = function()
{
	return new SetProviderRqst();
}

/******************************************************************************/

function SetProviderRqst()
{
	this.ProviderID = null;
	this.UserID = null;
	this.Password = null;
}

/******************************************************************************/

/*string*/ SetProviderRqst.prototype.className = function()
{
	return "SetProviderRqst";
}

/******************************************************************************/

/*void*/ SetProviderRqst.prototype.writeTo = function(/*DataWriter*/ writer)
{
	writer.writeString("ProviderID", this.ProviderID, ProviderIDMaxLength);
	writer.writeString("UserID", this.UserID, SetProviderRqst.UserIDMaxLength);
	writer.writeString("Password", this.Password, SetProviderRqst.PasswordMaxLength);
}

/******************************************************************************/
/******************************************************************************/
/* SetProviderResp */

/******************************************************************************/
/******************************************************************************/

function SetProviderResp(reader)
{
	if(reader != undefined)
		this.readFrom(reader);
}

/******************************************************************************/

/*void*/ SetProviderResp.prototype.readFrom = function(/*DataReader*/ reader)
{
	/* no fields */
}

/******************************************************************************/
/******************************************************************************/
/* CheckShowAvailRqst */

/******************************************************************************/
/******************************************************************************/

CheckShowAvailRqst.newInstance = function()
{
	return new CheckShowAvailRqst();
}

/******************************************************************************/

function CheckShowAvailRqst()
{
	this.ShowID = null;
	this.ProviderID = null;
	this.ShowCost = null;
}

/******************************************************************************/

/*string*/ CheckShowAvailRqst.prototype.className = function()
{
	return "CheckShowAvailRqst";
}

/******************************************************************************/

/*void*/ CheckShowAvailRqst.prototype.writeTo = function(/*DataWriter*/ writer)
{
	writer.writeString("ShowID", this.ShowID, ShowIDMaxLength);
	writer.writeString("ProviderID", this.ProviderID, ProviderIDMaxLength);
	writer.writeObject("ShowCost", this.ShowCost);
}

/******************************************************************************/
/******************************************************************************/
/* CheckShowAvailResp */

/******************************************************************************/
/******************************************************************************/

function CheckShowAvailResp(reader)
{
	this.ShowCost = null;

	if(reader != undefined)
		this.readFrom(reader);
}

/******************************************************************************/

/*void*/ CheckShowAvailResp.prototype.readFrom = function(/*DataReader*/ reader)
{
	this.ShowCost = reader.readObject("ShowCost", ShowCost);
}

/******************************************************************************/
/******************************************************************************/
/* RentShowRqst */

/******************************************************************************/
/******************************************************************************/

RentShowRqst.newInstance = function()
{
	return new RentShowRqst();
}

/******************************************************************************/

function RentShowRqst()
{
	this.ShowID = null;
	this.ProviderID = null;
	this.ApprovedCost = null;
}

/******************************************************************************/

/*string*/ RentShowRqst.prototype.className = function()
{
	return "RentShowRqst";
}

/******************************************************************************/

/*void*/ RentShowRqst.prototype.writeTo = function(/*DataWriter*/ writer)
{
	writer.writeString("ShowID", this.ShowID, ShowIDMaxLength);
	writer.writeString("ProviderID", this.ProviderID, ProviderIDMaxLength);
	writer.writeObject("ApprovedCost", this.ApprovedCost);
}

/******************************************************************************/
/******************************************************************************/
/* RentShowResp */

/******************************************************************************/
/******************************************************************************/

function RentShowResp(reader)
{
	this.RentShowID = null;
	this.License = null;

	if(reader != undefined)
		this.readFrom(reader);
}

/******************************************************************************/

/*void*/ RentShowResp.prototype.readFrom = function(/*DataReader*/ reader)
{
	this.RentedShowID = reader.readString("RentedShowID", RentedShowIDMaxLength);
	this.License = reader.readObject("License", License);
}

/******************************************************************************/
/******************************************************************************/
/* RentedShowListRqst */

/******************************************************************************/
/******************************************************************************/

RentedShowListRqst.newInstance = function()
{
	return new RentedShowListRqst();
}

/******************************************************************************/

function RentedShowListRqst()
{
}

/******************************************************************************/

/*string*/ RentedShowListRqst.prototype.className = function()
{
	return "RentedShowListRqst";
}

/******************************************************************************/

/*void*/ RentedShowListRqst.prototype.writeTo = function(/*DataWriter*/ writer)
{
	/* no fields */
}

/******************************************************************************/
/******************************************************************************/
/* RentedShowListResp */

/******************************************************************************/
/******************************************************************************/

function RentedShowListResp(reader)
{
	this.RentedShowSearchList = null;

	if(reader != undefined)
		this.readFrom(reader);
}

/******************************************************************************/

/*void*/ RentedShowListResp.prototype.readFrom = function(/*DataReader*/ reader)
{
	this.RentedShowSearchList = reader.readList("RentedShowSearch", RentedShowSearch);
}

/******************************************************************************/
/******************************************************************************/
/* RentedShowRqst */

/******************************************************************************/
/******************************************************************************/

RentedShowRqst.newInstance = function()
{
	return new RentedShowRqst();
}

/******************************************************************************/

function RentedShowRqst()
{
	this.RentedShowID = null;
}

/******************************************************************************/

/*string*/ RentedShowRqst.prototype.className = function()
{
	return "RentedShowRqst";
}

/******************************************************************************/

/*void*/ RentedShowRqst.prototype.writeTo = function(/*DataWriter*/ writer)
{
	writer.writeString("RentedShowID", this.RentedShowID, RentedShowIDMaxLength);
}

/******************************************************************************/
/******************************************************************************/
/* RentedShowResp */

/******************************************************************************/
/******************************************************************************/

function RentedShowResp(reader)
{
	this.RentedShow = null;

	if(reader != undefined)
		this.readFrom(reader);
}

/******************************************************************************/

/*void*/ RentedShowResp.prototype.readFrom = function(/*DataReader*/ reader)
{
	this.RentedShow = reader.readObject("RentedShow", RentedShow);
}

/******************************************************************************/
/******************************************************************************/
/* WatchShowRqst */

/******************************************************************************/
/******************************************************************************/

WatchShowRqst.newInstance = function()
{
	return new WatchShowRqst();
}

/******************************************************************************/

function WatchShowRqst()
{
	this.RentedShowID = null;
}

/******************************************************************************/

/*string*/ WatchShowRqst.prototype.className = function()
{
	return "WatchShowRqst";
}

/******************************************************************************/

/*void*/ WatchShowRqst.prototype.writeTo = function(/*DataWriter*/ writer)
{
	writer.writeString("RentedShowID", this.RentedShowID, RentedShowIDMaxLength);
}

/******************************************************************************/
/******************************************************************************/
/* WatchShowResp */

/******************************************************************************/
/******************************************************************************/

function WatchShowResp(reader)
{
	this.License = null;

	if(reader != undefined)
		this.readFrom(reader);
}

/******************************************************************************/

/*void*/ WatchShowResp.prototype.readFrom = function(/*DataReader*/ reader)
{
	this.License = reader.readObject("License", License);
}

/******************************************************************************/
/******************************************************************************/
/* ReleaseShowRqst */

/******************************************************************************/
/******************************************************************************/

ReleaseShowRqst.newInstance = function()
{
	return new ReleaseShowRqst();
}

/******************************************************************************/

function ReleaseShowRqst()
{
	this.RentedShowID = null;
}

/******************************************************************************/

/*string*/ ReleaseShowRqst.prototype.className = function()
{
	return "ReleaseShowRqst";
}

/******************************************************************************/

/*void*/ ReleaseShowRqst.prototype.writeTo = function(/*DataWriter*/ writer)
{
	writer.writeString("RentedShowID", this.RentedShowID, RentedShowIDMaxLength);
}

/******************************************************************************/
/******************************************************************************/
/* ReleaseShowResp */

/******************************************************************************/
/******************************************************************************/

function ReleaseShowResp(reader)
{
	if(reader != undefined)
		this.readFrom(reader);
}

/******************************************************************************/

/*void*/ ReleaseShowResp.prototype.readFrom = function(/*DataReader*/ reader)
{
	/* no fields */
}

/******************************************************************************/
/******************************************************************************/
/* StartupFlows.js */

/******************************************************************************/
/******************************************************************************/

function StartupInitGeneral()
{
	MainApp.getThe().init();
	MainApp.getThe().getSession().loadDataSettings();
}

/******************************************************************************/

function StartupInitMember()
{
	StartupInitGeneral();
	if(!MainApp.getThe().getSession().isUserLoggedOn())
		document.location = "../member/mem_logon.jsp";
}

/******************************************************************************/
/******************************************************************************/

function StartupFlow()
{
	this.Data = null;
}

/******************************************************************************/
/******************************************************************************/

/*void*/ function StartupLogon()
{
	var oMainApp = MainApp.getThe();
	oMainApp.openPopup();

	var oSession = oMainApp.getSession();
	oSession.loadDataSettings();

	var oStartupFlow = new StartupFlow();
	oStartupFlow.Callback = StartupFlow.prototype.Logon_afterLogon;

	LogonScreen.newInstance(oStartupFlow);
}

/******************************************************************************/

/*void*/ StartupFlow.prototype.Logon_afterLogon = function()
{
	document.location.reload(true);
}

/******************************************************************************/
/******************************************************************************/

/*void*/ function StartupSearch()
{
	var oMainApp = MainApp.getThe();
	oMainApp.openPopup();

	var oSession = oMainApp.getSession();
	oSession.loadDataSettings();

	var oStartupFlow = new StartupFlow();

	if(!oSession.isSystemDataLoaded())
	{
		oStartupFlow.Callback = StartupFlow.prototype.Search_afterLoadSystemData;
		oSession.loadSystemData(oStartupFlow);
		return;
	}

	oStartupFlow.Search_afterLoadSystemData(null, sc_Success, null);
}

/******************************************************************************/

/*void*/ StartupFlow.prototype.Search_afterLoadSystemData = function(
	/*object*/ data, /*StatusCode*/ statusCode, /*string*/ statusMessage)
{
	if(statusCode == sc_Success)
		SearchScreen.newInstance();
	else
		MainApp.getThe().closePopup();
}

/******************************************************************************/
/******************************************************************************/

/*void*/ function StartupSearchDetail(/*ShowID*/ showID)
{
	var oMainApp = MainApp.getThe();
	oMainApp.openPopup();

	var oSession = oMainApp.getSession();
	oSession.loadDataSettings();

	var oStartupFlow = new StartupFlow();
	oStartupFlow.Data = showID;

	if(!oSession.isSystemDataLoaded())
	{
		oStartupFlow.Callback = StartupFlow.prototype.SearchDetail_afterLoadSystemData;
		oSession.loadSystemData(oStartupFlow);
		return;
	}

	oStartupFlow.SearchDetail_afterLoadSystemData(null, sc_Success, null);
}

/******************************************************************************/

/*void*/ StartupFlow.prototype.SearchDetail_afterLoadSystemData = function(
	/*object*/ data, /*StatusCode*/ statusCode, /*string*/ statusMessage)
{
	var oSession = MainApp.getThe().getSession();

	if(statusCode == sc_Success)
	{
		this.Callback = StartupFlow.prototype.StartupSearchDetail_afterShowDetail;
		oSession.showDetail(this, this.Data);
	}
	else
		MainApp.getThe().closePopup();
}

/******************************************************************************/

/*void*/ StartupFlow.prototype.StartupSearchDetail_afterShowDetail = function(
	/*ShowDetail*/ showDetail, /*StatusCode*/ statusCode, /*string*/ statusMessage)
{
	if(statusCode == sc_Success)
		SearchDetailScreen.newInstance(showDetail);
	else
		MainApp.getThe().closePopup();
}

/******************************************************************************/
/******************************************************************************/

/*void*/ function StartupRentedShowDetail(/*RentedShowID*/ rentedShowID)
{
//	StartupInitialCheck("MainApp.getThe().getSession().rentedShow(StartupRentedShowDetail_afterRentedShow, '" + rentedShowID + "');");

	var oMainApp = MainApp.getThe();
	oMainApp.openPopup();

	var oSession = oMainApp.getSession();
	oSession.loadDataSettings();

	var oStartupFlow = new StartupFlow();
	oStartupFlow.Data = rentedShowID;

	if(!oSession.isSystemDataLoaded())
	{
		oStartupFlow.Callback = StartupFlow.prototype.RentedShowDetail_afterLoadSystemData;
		oSession.loadSystemData(oStartupFlow);
		return;
	}

	oStartupFlow.RentedShowDetail_afterLoadSystemData(null, sc_Success, null);

}

/******************************************************************************/

/*void*/ StartupFlow.prototype.RentedShowDetail_afterLoadSystemData = function(
	/*object*/ data, /*StatusCode*/ statusCode, /*string*/ statusMessage)
{
	var oSession = MainApp.getThe().getSession();

	if(statusCode == sc_Success)
	{
		this.Callback = StartupFlow.prototype.RentedShowDetail_afterRentedShow;
		oSession.rentedShow(this, this.Data);
	}
	else
		MainApp.getThe().closePopup();
}

/******************************************************************************/

/*void*/ StartupFlow.prototype.RentedShowDetail_afterRentedShow = function(
	/*RentedShow*/ rentedShow, /*StatusCode*/ statusCode, /*string*/ statusMessage)
{
	if(statusCode == sc_Success)
		RentedShowDetailScreen.newInstance(rentedShow);
	else
		MainApp.getThe().closePopup();
}

/******************************************************************************/
/******************************************************************************/

/*void*/ function StartupPreferences()
{
	var oMainApp = MainApp.getThe();
	oMainApp.openPopup();

	var oSession = oMainApp.getSession();
	oSession.loadDataSettings();

	var oStartupFlow = new StartupFlow();

	if(!oSession.isSystemDataLoaded())
	{
		oStartupFlow.Callback = StartupFlow.prototype.Preferences_afterLoadSystemData;
		oSession.loadSystemData(oStartupFlow);
		return;
	}

	oStartupFlow.Preferences_afterLoadSystemData(null, sc_Success, null);
}

/******************************************************************************/

/*void*/ StartupFlow.prototype.Preferences_afterLoadSystemData = function(
	/*object*/ data, /*StatusCode*/ statusCode, /*string*/ statusMessage)
{
	if(statusCode == sc_Success)
		PreferencesScreen.newInstance();
	else
		MainApp.getThe().closePopup();
}

/******************************************************************************/
/******************************************************************************/
/* LogonScreen.js */

/******************************************************************************/
/******************************************************************************/

LogonScreen.ScreenID = "Startup004";

LogonScreen.PromptID = "Startup004_Prompt";
LogonScreen.UserIDLabelID = "Startup004_UserID_Label";
LogonScreen.UserIDID = "Startup004_UserID";
LogonScreen.UserIDMsgID = "Startup004_UserID_Msg";
LogonScreen.UserPasswordLabelID = "Startup004_UserPassword_Label";
LogonScreen.UserPasswordID = "Startup004_UserPassword";
LogonScreen.UserPasswordMsgID = "Startup004_UserPassword_Msg";
LogonScreen.RememberPasswordID = "Startup00_RememberPassword";
LogonScreen.ContinueID = "Startup004_Continue";
LogonScreen.LogonUsingID = "Startup004_LogonUsing";

/******************************************************************************/

LogonScreen.newInstance = function(/*object*/ callerCallback)
{
	return MainApp.getThe().openScreen(new LogonScreen(callerCallback));
}

/******************************************************************************/

LogonScreen.prototype = new Screen();
LogonScreen.prototype.constructor = LogonScreen;

/******************************************************************************/

function LogonScreen(/*object*/ callerCallback)
{
	var oControl;

	this.ScreenID = LogonScreen.ScreenID;
	this.ScreenTitle = "enter pin";
	this.ScreenTitleImage = "titleEnterpin.gif";
	this.CallerCallback = callerCallback;

	this.fContainerControl = new ContainerControl(this.ScreenID, 50, 100);

	var oSession = MainApp.getThe().getSession();

	this.fShowEmail = true;
	if (testStrHasLen(oSession.getUserID()) && testStrIsAllNumbers(oSession.getUserID()))
		this.fShowEmail = false;

	oControl = new TextControl(LogonScreen.PromptID, this.ScreenID);
	this.newControl(oControl);

	oControl = new TextControl(LogonScreen.UserIDLabelID, this.ScreenID);
	this.newControl(oControl);
	oControl = new EditControl(LogonScreen.UserIDID, this.ScreenID, 20, 64)
	this.newControl(oControl);
	oControl = new TextControl(LogonScreen.UserIDMsgID, this.ScreenID);
	this.newControl(oControl);

	oControl = new TextControl(LogonScreen.UserPasswordLabelID, this.ScreenID);
	this.newControl(oControl);
	oControl = new EditControl(LogonScreen.UserPasswordID, this.ScreenID, 10, 16);
	this.newControl(oControl);
	oControl = new TextControl(LogonScreen.UserPasswordMsgID, this.ScreenID);
	this.newControl(oControl);
	oControl = new CheckControl(LogonScreen.RememberPasswordID, this.ScreenID);
	oControl.setChecked(false);
	this.newControl(oControl);

	this.newControl(new ButtonControl(LogonScreen.ContinueID, this.ScreenID));

	this.newControl(new ButtonControl(LogonScreen.LogonUsingID, this.ScreenID));
	this.onButtonLogonUsing();

	this.getControl(LogonScreen.UserIDID).setText(oSession.getUserID());
}

/******************************************************************************/

/*void*/ LogonScreen.prototype.onButtonLogonUsing = function()
{
	this.getControl(LogonScreen.PromptID).setText(this.fShowEmail
		? "Please enter your registered Email and your chosen Password:"
		: "Please enter your registered Logon ID and your chosen PIN:");

	this.getControl(LogonScreen.UserIDLabelID).setText(this.fShowEmail ? "Email:" : "Logon ID:");
	var oControl = this.getControl(LogonScreen.UserIDID)
	if(this.fShowEmail)
		oControl.setFieldSize(20, 64);
	else
		oControl.setFieldSize(9, 9);
	oControl.setText("");
	oControl.Type = this.fShowEmail ? ect_AlphaNumeric : ect_Numeric;
	this.getControl(LogonScreen.UserIDMsgID).setText("");

	this.getControl(LogonScreen.UserPasswordLabelID).setText(this.fShowEmail ? "Password:" : "PIN:");
	oControl = this.getControl(LogonScreen.UserPasswordID)
	if(this.fShowEmail)
		oControl.setFieldSize(10, 16);
	else
		oControl.setFieldSize(6, 6);
	oControl.setText("");
	oControl.Type = this.fShowEmail ? ect_AlphaNumeric : ect_Numeric;
	this.getControl(LogonScreen.UserPasswordMsgID).setText("");

	this.getControl(LogonScreen.LogonUsingID).setText(this.fShowEmail
		? "Logon using Logon ID/PIN" : "Logon using Email/Password");
}

/******************************************************************************/

/*boolean*/ LogonScreen.prototype.key = function(/*int*/ key, /*Event*/ evt)
{
	if((key == ek_Back) || (key == ek_Escape))
	{
		MainApp.getThe().closePopup();
		return;
	}

	return Screen.prototype.key.call(this, key, evt);
}

/******************************************************************************/

/*void*/ LogonScreen.prototype.onButton = function(/*string*/ controlID)
{
	if((controlID == LogonScreen.ContinueID) || (controlID == LogonScreen.UserIDID)
		|| (controlID == LogonScreen.UserPasswordID))
	{
		this.getControl(LogonScreen.UserIDMsgID).setText("");
		this.getControl(LogonScreen.UserPasswordMsgID).setText("");

		var userID = this.getControl(LogonScreen.UserIDID).getText();
		if(!testStrHasLen(userID))
		{
			this.getControl(LogonScreen.UserIDMsgID).setText((this.fShowEmail ? "Email" : "Logon ID") + " must be entered.");
			this.focusControl(LogonScreen.UserIDID, true);
			return;
		}

		var userPassword = this.getControl(LogonScreen.UserPasswordID).getText();
		if(!testStrHasLen(userPassword))
		{
			this.getControl(LogonScreen.UserPasswordMsgID).setText((this.fShowEmail ? "Password" : "PIN") + " must be entered.");
			this.focusControl(LogonScreen.UserPasswordID, true);
			return;
		}

		var rememberPassword = this.getControl(LogonScreen.RememberPasswordID).getChecked();

		var oSession = MainApp.getThe().getSession();

		this.Callback = LogonScreen.prototype.afterSignon;
		oSession.signon(this, userID, userPassword, rememberPassword);
	}
	else if(controlID == LogonScreen.LogonUsingID)
	{
		this.fShowEmail = !this.fShowEmail;
		this.onButtonLogonUsing();
		this.focusControl(LogonScreen.UserIDID, true);
	}
	//else
	//Screen.prototype.onButton.call(this, controlID);
}

/******************************************************************************/

/*void*/ LogonScreen.prototype.afterSignon = function(/*object*/ data, /*StatusCode*/ statusCode,
	/*string*/ statusMessage)
{
	var oSession = MainApp.getThe().getSession();

	if(statusCode == sc_Success)
	{
		this.close();

		oSession.saveDataSettings();	// for possible temp store of userPassword

		this.Callback = LogonScreen.prototype.doCallBackCaller;
		oSession.loadSystemData(this);
	}
}

/******************************************************************************/

/*void*/ LogonScreen.prototype.doCallBackCaller = function(/*object*/ data,
	/*StatusCode*/ statusCode, /*string*/ statusMessage)
{
	if(isObject(this.CallerCallback) && isFunction(this.CallerCallback.Callback))
	{
		this.CallerCallback.Callback();
	}
	else if(isFunction(this.CallerCallback))
	{
		this.CallerCallback();
	}
}

/******************************************************************************/
/******************************************************************************/
/* SetupScreen.js */

/******************************************************************************/
/******************************************************************************/

SetupScreen.ScreenID = "Setup001";

/* SetupStep */
var ss_AskSignedUpStep = 0;
var ss_NeedLogonIDStep = 1;
var ss_HaveLogonIDStep = 2;

/******************************************************************************/

SetupScreen.newInstance = function(/*object*/ callerCallback)
{
	var oScreen = new SetupScreen(callerCallback);

	MainApp.getThe().openScreen(oScreen);
	oScreen.openStep(ss_AskSignedUpStep);

	return oScreen;
}

/******************************************************************************/

SetupScreen.prototype = new Screen();
SetupScreen.prototype.constructor = SetupScreen;

/******************************************************************************/

function SetupScreen(/*object*/ callerCallback)
{
	this.ScreenID = SetupScreen.ScreenID;
	this.ScreenTitle = "setup";
	this.ScreenTitleImage = "titleSetup.gif";
	this.CallerCallback = callerCallback;

	this.fContainerControl = new ContainerControl(this.ScreenID, 50, 100);

	this.fStepControlID = AskSignedUpControl.ControlID;
	this.fSetupData = new SetupData();
	this.fCurStep = ss_AskSignedUpStep;
}

/******************************************************************************/

/*void*/ SetupScreen.prototype.close = function()
{
	var oContainerControl = this.findControl(this.fStepControlID);
	if(oContainerControl != null)
		oContainerControl.show(false);
	Screen.prototype.close.call(this);
}

/******************************************************************************/

/*void*/ SetupScreen.prototype.openStep = function(/*int*/ step)
{
	var oContainerControl;

	switch(step)
	{
		case ss_AskSignedUpStep:
		default:
			oContainerControl = AskSignedUpControl.newInstance();
			break;
		case ss_NeedLogonIDStep:
			oContainerControl = NeedLogonIDControl.newInstance();
			break;
		case ss_HaveLogonIDStep:
			oContainerControl = HaveLogonIDControl.newInstance();
			break;
	}

	oContainerControl.show(true);
	this.newControl(oContainerControl);
	this.fStepControlID = oContainerControl.ControlID;
	this.fCurStep = step;
	oContainerControl.loadData(this.fSetupData);
	this.setFocus(true);
}

/******************************************************************************/

/*boolean*/ SetupScreen.prototype.closeStep = function(/*boolean*/ doUnload)
{
	var oContainerControl = this.getControl(this.fStepControlID);

	if(doUnload)
	{
		if(!oContainerControl.unloadData(this.fSetupData))
			return false;
	}

	oContainerControl.show(false);
	this.deleteControl(this.fStepControlID);
	return true;
}

/******************************************************************************/

/*boolean*/ SetupScreen.prototype.key = function(/*int*/ key, /*Event*/ evt)
{
	if((key == ek_Back) || (key == ek_Escape))
	{
		if(this.fContainerControl.key(key, evt))
			return true;

		if(this.fCurStep == ss_AskSignedUpStep)
		{
			this.close();
			return true;
		}
		else if(this.fCurStep == ss_NeedLogonIDStep)
		{
			if(this.closeStep(false))
				this.openStep(ss_AskSignedUpStep);

			return true;
		}
		else if(this.fCurStep == ss_HaveLogonIDStep)
		{
			if(this.closeStep(false))
				this.openStep(ss_AskSignedUpStep);

			return true;
		}
	}

	return Screen.prototype.key.call(this, key, evt);
}

/******************************************************************************/

/*void*/ SetupScreen.prototype.onButton = function(/*string*/ controlID)
{
	if(this.fCurStep == ss_AskSignedUpStep)
	{
		if(controlID == AskSignedUpControl.NotRegisteredID)
		{
			if(this.closeStep(true))
				this.openStep(ss_NeedLogonIDStep);
			return;
		}
		else if(controlID == AskSignedUpControl.AlreadyRegisteredID)
		{
			if(this.closeStep(true))
				this.openStep(ss_HaveLogonIDStep);
			return;
		}
	}
	else if(this.fCurStep == ss_NeedLogonIDStep)
	{
		if (controlID == NeedLogonIDControl.RegisterID)
		{
			window.open("/register");
			return;
		}
		else if(controlID == NeedLogonIDControl.HaveLogonID)
		{
			if(this.closeStep(true))
				this.openStep(ss_HaveLogonIDStep);
			return;
		}
	}
	else if(this.fCurStep == ss_HaveLogonIDStep)
	{
		if((controlID == HaveLogonIDControl.UserIDID)
			|| (controlID == HaveLogonIDControl.UserPasswordID)
			|| (controlID == HaveLogonIDControl.ContinueID))
		{
			this.doSetupSignon();
			return;
		}
		else if(controlID == HaveLogonIDControl.LogonUsingID)
		{
			this.doSwitchLogonUsing();
			return;
		}
	}

	Screen.prototype.onButton.call(this, controlID);
}

/******************************************************************************/

/*void*/ SetupScreen.prototype.doSetupSignon = function()
{
	var oContainerControl = this.getControl(this.fStepControlID);

	if(oContainerControl.unloadData(this.fSetupData))
	{
		var oSession = MainApp.getThe().getSession();

		this.Callback = SetupScreen.prototype.doSetupAfterSignon;
		oSession.signon(this, this.fSetupData.UserID, this.fSetupData.UserPassword,
			this.fSetupData.RememberPassword);
	}
}

/******************************************************************************/

/*void*/ SetupScreen.prototype.doSetupAfterSignon = function(/*object*/ data, /*StatusCode*/ statusCode,
	/*string*/ statusMessage)
{
	var oSession = MainApp.getThe().getSession();

	if(statusCode == sc_Success)
	{
		this.close();

		oSession.saveDataSettings();

		this.Callback = SetupScreen.prototype.doCallBackCaller;
		oSession.loadSystemData(this);
	}
}

/******************************************************************************/

/*void*/ SetupScreen.prototype.doCallBackCaller = function(/*object*/ data,
	/*StatusCode*/ statusCode, /*string*/ statusMessage)
{
	if(isObject(this.CallerCallback) && isFunction(this.CallerCallback.Callback))
	{
		this.CallerCallback.Callback();
	}
	else if(isFunction(this.CallerCallback))
	{
		this.CallerCallback();
	}
}

/******************************************************************************/

/*void*/ SetupScreen.prototype.doSwitchLogonUsing = function()
{
	var oContainerControl = this.getControl(this.fStepControlID);

	oContainerControl.fShowEmail = !oContainerControl.fShowEmail;
	oContainerControl.onButtonLogonUsing();
	oContainerControl.focusControl(HaveLogonIDControl.UserIDID, true);
}

/******************************************************************************/
/******************************************************************************/
/* SetupData.js */

/******************************************************************************/
/******************************************************************************/

function SetupData()
{
	this.UserID = null;
	this.UserPassword = null;
	this.RememberPassword = false;
}

/******************************************************************************/
/******************************************************************************/
/* AskSignedUpControl.js */

/******************************************************************************/
/******************************************************************************/

AskSignedUpControl.ControlID = "Setup001_AskSignedUpControl";

AskSignedUpControl.AlreadyRegisteredID = "Setup001_AskSignedUpControl_AlreadyRegistered";
AskSignedUpControl.NotRegisteredID = "Setup001_AskSignedUpControl_NotRegistered";

/******************************************************************************/

AskSignedUpControl.newInstance = function()
{
	var containerControl = new AskSignedUpControl(AskSignedUpControl.ControlID, 0, 0);

	containerControl.newControl(new ButtonControl(AskSignedUpControl.AlreadyRegisteredID, SetupScreen.ScreenID));
	containerControl.newControl(new ButtonControl(AskSignedUpControl.NotRegisteredID, SetupScreen.ScreenID));

	return containerControl
}

/******************************************************************************/

AskSignedUpControl.prototype = new ContainerControl();
AskSignedUpControl.prototype.constructor = AskSignedUpControl;

/******************************************************************************/

function AskSignedUpControl(/*int*/ controlID, /*int*/ left, /*int*/ top)
{
	ContainerControl.prototype.init.call(this, controlID, left, top);
}

/******************************************************************************/
/******************************************************************************/
/* NeedLogonIDControl.js */

/******************************************************************************/
/******************************************************************************/

NeedLogonIDControl.ControlID = "Setup001_NeedLogonIDControl";

NeedLogonIDControl.RegisterID = "Setup001_NeedLogonIDControl_Register";
NeedLogonIDControl.HaveLogonID = "Setup001_NeedLogonIDControl_HaveLogon";

/******************************************************************************/

NeedLogonIDControl.newInstance = function()
{
	var containerControl = new NeedLogonIDControl(NeedLogonIDControl.ControlID, 0, 0);

	containerControl.newControl(new ButtonControl(NeedLogonIDControl.RegisterID, SetupScreen.ScreenID));
	containerControl.newControl(new ButtonControl(NeedLogonIDControl.HaveLogonID, SetupScreen.ScreenID));

	return containerControl;
}

/******************************************************************************/

NeedLogonIDControl.prototype = new ContainerControl();
NeedLogonIDControl.prototype.constructor = NeedLogonIDControl;

/******************************************************************************/

function NeedLogonIDControl(/*int*/ controlID, /*int*/ left, /*int*/ top)
{
	ContainerControl.prototype.init.call(this, controlID, left, top);
}

/******************************************************************************/
/******************************************************************************/
/* HaveLogonIDControl.js */

/******************************************************************************/
/******************************************************************************/

HaveLogonIDControl.ControlID = "Setup001_HaveLogonIDControl";

HaveLogonIDControl.PromptID = "Setup001_HaveLogonIDControl_Prompt";
HaveLogonIDControl.UserIDLabelID = "Setup001_HaveLogonIDControl_UserID_Label";
HaveLogonIDControl.UserIDID = "Setup001_HaveLogonIDControl_UserID";
HaveLogonIDControl.UserIDMsgID = "Setup001_HaveLogonIDControl_UserID_Msg";
HaveLogonIDControl.UserPasswordLabelID = "Setup001_HaveLogonIDControl_UserPassword_Label";
HaveLogonIDControl.UserPasswordID = "Setup001_HaveLogonIDControl_UserPassword";
HaveLogonIDControl.UserPasswordMsgID = "Setup001_HaveLogonIDControl_UserPassword_Msg";
HaveLogonIDControl.RememberPasswordID = "Setup001_HaveLogonIDControl_RememberPassword";
HaveLogonIDControl.ContinueID = "Setup001_HaveLogonIDControl_Continue";
HaveLogonIDControl.LogonUsingID = "Setup001_HaveLogonIDControl_LogonUsing";

/******************************************************************************/

HaveLogonIDControl.newInstance = function()
{
	var containerControl = new HaveLogonIDControl(HaveLogonIDControl.ControlID, 0, 0);

	var oControl;

	containerControl.fShowEmail = true;

	containerControl.newControl(new TextControl(HaveLogonIDControl.PromptID, SetupScreen.ScreenID));

	containerControl.newControl(new TextControl(HaveLogonIDControl.UserIDLabelID, SetupScreen.ScreenID));
	containerControl.newControl(new EditControl(HaveLogonIDControl.UserIDID, SetupScreen.ScreenID, 20, 64));
	containerControl.newControl(new TextControl(HaveLogonIDControl.UserIDMsgID, SetupScreen.ScreenID));

	containerControl.newControl(new TextControl(HaveLogonIDControl.UserPasswordLabelID, SetupScreen.ScreenID));
	containerControl.newControl(new EditControl(HaveLogonIDControl.UserPasswordID, SetupScreen.ScreenID, 10, 16));
	containerControl.newControl(new TextControl(HaveLogonIDControl.UserPasswordMsgID, SetupScreen.ScreenID));

	oControl = new CheckControl(HaveLogonIDControl.RememberPasswordID, SetupScreen.ScreenID);
	oControl.setChecked(false);
	containerControl.newControl(oControl);

	containerControl.newControl(new ButtonControl(HaveLogonIDControl.ContinueID, SetupScreen.ScreenID));

	containerControl.newControl(new ButtonControl(HaveLogonIDControl.LogonUsingID, SetupScreen.ScreenID));
	containerControl.onButtonLogonUsing();

	return containerControl;
}

/******************************************************************************/

HaveLogonIDControl.prototype = new ContainerControl();
HaveLogonIDControl.prototype.constructor = AskSignedUpControl;

/******************************************************************************/

function HaveLogonIDControl(/*int*/ controlID, /*int*/ left, /*int*/ top)
{
	ContainerControl.prototype.init.call(this, controlID, left, top);
}

/******************************************************************************/

/*void*/ HaveLogonIDControl.prototype.onButtonLogonUsing = function()
{
	this.getControl(HaveLogonIDControl.PromptID).setText(this.fShowEmail
		? "Please enter your registered Email and your chosen Password:"
		: "Please enter your registered Logon ID and your chosen PIN:");

	this.getControl(HaveLogonIDControl.UserIDLabelID).setText(this.fShowEmail ? "Email:" : "Logon ID:");
	var oControl = this.getControl(HaveLogonIDControl.UserIDID)
	if(this.fShowEmail)
		oControl.setFieldSize(20, 64);
	else
		oControl.setFieldSize(9, 9);
	oControl.setText("");
	oControl.Type = this.fShowEmail ? ect_AlphaNumeric : ect_Numeric;
	this.getControl(HaveLogonIDControl.UserIDMsgID).setText("");

	this.getControl(HaveLogonIDControl.UserPasswordLabelID).setText(this.fShowEmail ? "Password:" : "PIN:");
	oControl = this.getControl(HaveLogonIDControl.UserPasswordID)
	if(this.fShowEmail)
		oControl.setFieldSize(10, 16);
	else
		oControl.setFieldSize(6, 6);
	oControl.setText("");
	oControl.Type = this.fShowEmail ? ect_AlphaNumeric : ect_Numeric;
	this.getControl(HaveLogonIDControl.UserPasswordMsgID).setText("");

	this.getControl(HaveLogonIDControl.LogonUsingID).setText(this.fShowEmail
		? "Logon using Logon ID/PIN" : "Logon using Email/Password");
}

/******************************************************************************/

/*boolean*/ HaveLogonIDControl.prototype.loadData = function(/*object*/ oData)
{
	return true;
}

/******************************************************************************/

/*boolean*/ HaveLogonIDControl.prototype.unloadData = function(/*object*/ oData)
{
	var data;
	var oSetupData = oData;

	this.getControl(HaveLogonIDControl.UserIDMsgID).setText("");
	this.getControl(HaveLogonIDControl.UserPasswordMsgID).setText("");

	data = this.getControl(HaveLogonIDControl.UserIDID).getText();
	if(!testStrHasLen(data))
	{
		this.getControl(HaveLogonIDControl.UserIDMsgID).setText((this.fShowEmail ? "Email" : "Logon ID") + " must be entered.");
		this.focusControl(HaveLogonIDControl.UserIDID, true);
		return false;
	}
	oSetupData.UserID = data;

	data = this.getControl(HaveLogonIDControl.UserPasswordID).getText();
	if(!testStrHasLen(data))
	{
		this.getControl(HaveLogonIDControl.UserPasswordMsgID).setText((this.fShowEmail ? "Password" : "PIN") + " must be entered.");
		this.focusControl(HaveLogonIDControl.UserPasswordID, true);
		return false;
	}
	oSetupData.UserPassword = data;

	oSetupData.RememberPassword = this.getControl(HaveLogonIDControl.RememberPasswordID).getChecked();

	return true;
}

/******************************************************************************/
/******************************************************************************/
/* SearchScreen.js */

/******************************************************************************/
/******************************************************************************/

SearchScreen.ScreenID = "Search006";
SearchScreen.ShowNameID = "Search006_ShowName";
SearchScreen.ShowNameMsgID = "Search006_ShowName_Msg";
SearchScreen.SearchID = "Search006_Search";
SearchScreen.ProviderID = "Search006_Provider";
SearchScreen.CategoryID = "Search006_Category";
SearchScreen.RatingID = "Search006_Rating";

SearchScreen.SEARCH_PARAM = "search";
SearchScreen.PROVIDERID_PARAM = "provderid";
SearchScreen.CATEGORYID_PARAM = "categoryid";
SearchScreen.RATINGID_PARAM = "ratingid";

/******************************************************************************/

SearchScreen.newInstance = function()
{
	return MainApp.getThe().openScreen(new SearchScreen());
}

/******************************************************************************/

SearchScreen.prototype = new Screen();
SearchScreen.prototype.constructor = SearchScreen;

/******************************************************************************/

function SearchScreen()
{
	var oControl;

	this.ScreenID = SearchScreen.ScreenID;
	this.ScreenTitle = "search";
	this.ScreenTitleImage = "titleSearch.gif";

	this.fContainerControl = new ContainerControl(this.ScreenID, 80, 100);
	//this.fContainerControl.onNavigate = SearchScreen.onNavigate;

	oControl = new EditControl(SearchScreen.ShowNameID, this.ScreenID, 32, 64);
	this.newControl(oControl);
	oControl.Type = ect_AlphaNumeric;
	this.newControl(new ButtonControl(SearchScreen.SearchID, this.ScreenID));
	oControl = new TextControl(SearchScreen.ShowNameMsgID, this.ScreenID);
	this.newControl(oControl);

	this.newControl(new ButtonControl(SearchScreen.ProviderID, this.ScreenID));
	this.newControl(new ButtonControl(SearchScreen.CategoryID, this.ScreenID));
	this.newControl(new ButtonControl(SearchScreen.RatingID, this.ScreenID));

	this.fSearchData = new SearchData();
}

/******************************************************************************/

/*boolean*/ SearchScreen.prototype.key = function(/*int*/ key, /*Event*/ evt)
{
	if((key == ek_Back) || (key == ek_Escape))
	{
		MainApp.getThe().closePopup();
		return;
	}

	return Screen.prototype.key.call(this, key, evt);
}

/******************************************************************************/

/*void*/ SearchScreen.prototype.onButton = function(/*string*/ controlID)
{
	var oControl;

	if((controlID == SearchScreen.SearchID) || (controlID == SearchScreen.ShowNameID))
	{
		oControl = this.getControl(SearchScreen.ShowNameID);
		this.fSearchData.Search = oControl.getText();

		if(!testStrHasLen(this.fSearchData.Search))
		{
			this.getControl(SearchScreen.ShowNameMsgID).setText("Partial title must be entered.");
			this.fContainerControl.focusControl(SearchScreen.ShowNameID, true);
			return;
		}

		var url = "searchResults.jsp?" + SearchScreen.SEARCH_PARAM + "=" + encodeURIComponent(this.fSearchData.Search);
		if(this.fSearchData.ProviderID != Provider.AllProvidersID)
			url += "&" + SearchScreen.PROVIDERID_PARAM + "=" + this.fSearchData.ProviderID;
		if(this.fSearchData.CategoryID != Category.AllCategoriesID)
			url += "&" + SearchScreen.CATEGORYID_PARAM + "=" + this.fSearchData.CategoryID;
		if(this.fSearchData.RatingID != Rating.AllRatingsID)
			url += "&" + SearchScreen.RATINGID_PARAM + "=" + this.fSearchData.RatingID;
		location.assign(url);
		return;
	}

	if(controlID == SearchScreen.ProviderID)
	{
		ProviderSelectScreen.newInstance(this.fSearchData);
		return;
	}

	if(controlID == SearchScreen.CategoryID)
	{
		CategorySelectScreen.newInstance(this.fSearchData);
		return;
	}

	if(controlID == SearchScreen.RatingID)
	{
		RatingSelectScreen.newInstance(this.fSearchData);
		return;
	}

	Screen.prototype.onButton.call(this, controlID);
}

/******************************************************************************/

/*string*/ SearchScreen.onNavigate = function(/*string*/ fromControl, /*int*/ key)
{
	if(key == ek_LeftButton)
	{
		if(fromControl == SearchScreen.SearchID)
			return SearchScreen.ShowNameID;
	}

	if(key == ek_RightButton)
	{
		if((fromControl == SearchScreen.ShowNameID)
				|| (fromControl == SearchScreen.ProviderID)
				|| (fromControl == SearchScreen.CategoryID)
				|| (fromControl == SearchScreen.RatingID))
			return SearchScreen.SearchID;
	}

	if(key == ek_DownButton)
	{
		if(fromControl == SearchScreen.ShowNameID)
			return SearchScreen.ProviderID;
	}

	if(key == ek_UpButton)
	{
		if(fromControl == SearchScreen.ProviderID)
			return SearchScreen.ShowNameID;
	}

	return null;
}

/******************************************************************************/
/******************************************************************************/
/* SearchData.js */

/******************************************************************************/
/******************************************************************************/

function SearchData()
{
	this.Search = null;

	this.ProviderID = Provider.AllProvidersID;
	this.CategoryID = Category.AllCategoriesID;
	this.RatingID = Rating.AllRatingsID;
}

/******************************************************************************/
/******************************************************************************/
/* ProviderSelectScreen.js */

/******************************************************************************/
/******************************************************************************/

ProviderSelectScreen.ScreenID = "Search001";
ProviderSelectScreen.ProvidersID = "Search001_Providers";

/******************************************************************************/

ProviderSelectScreen.newInstance = function(/*SearchDataPtr*/ oSearchData)
{
	var oScreen = MainApp.getThe().openScreen(new ProviderSelectScreen(oSearchData));

	if(testStrHasLen(oSearchData.ProviderID))
	{
		var oTextListControl = oScreen.getControl(ProviderSelectScreen.ProvidersID);
		oTextListControl.setFocusedItemByName(oSearchData.ProviderID);
	}

	return oScreen;
}

/******************************************************************************/

ProviderSelectScreen.prototype = new Screen();
ProviderSelectScreen.prototype.constructor = ProviderSelectScreen;

/******************************************************************************/

function ProviderSelectScreen(/*SearchDataPtr*/ oSearchData)
{
	this.ScreenID = ProviderSelectScreen.ScreenID;
	this.ScreenTitle = "search";
	this.ScreenTitleImage = "titleSearch.gif";

	var oRowItemList = new Array();
	oRowItemList.push(new ListControlRowItem("Provider", 300, "listCtrItem_normal"));

	this.fContainerControl = new ContainerControl(this.ScreenID, 80, 100);

	this.fSearchData = oSearchData;

	// load the Providers
	var oSession = MainApp.getThe().getSession();
	var providerList = oSession.getProviderList();
	var itemList = new Array();

	itemList.push(new NameValuePair(Provider.AllProvidersID, oSession.getProviderName(Provider.AllProvidersID)));
	for(var i = 0; i < providerList.length; i++)
		itemList.push(new NameValuePair(providerList[i].ProviderID, providerList[i].Name));

	this.newControl(new TextListControl(ProviderSelectScreen.ProvidersID, this.ScreenID,
		oRowItemList, itemList));
}

/******************************************************************************/

/*void*/ ProviderSelectScreen.prototype.onButton = function(/*string*/ controlID)
{
	var oTextListControl = this.getControl(ProviderSelectScreen.ProvidersID);
	this.fSearchData.ProviderID = oTextListControl.getFocusedItemValue().Name;

	var oSession = MainApp.getThe().getSession();
	var oScreen = MainApp.getThe().getScreen(SearchScreen.ScreenID);
	var oButtonControl = oScreen.getControl(SearchScreen.ProviderID);
	oButtonControl.setText(oSession.getProviderName(this.fSearchData.ProviderID));

	this.close();
}

/******************************************************************************/
/******************************************************************************/
/* CategorySelectScreen.js */

/******************************************************************************/
/******************************************************************************/

CategorySelectScreen.ScreenID = "Search002";
CategorySelectScreen.CategoriesID = "Search002_Categories";

/******************************************************************************/

CategorySelectScreen.newInstance = function(/*SearchDataPtr*/ oSearchData)
{
	var oScreen = MainApp.getThe().openScreen(new CategorySelectScreen(oSearchData));

	if(testStrHasLen(oSearchData.CategoryID))
	{
		var oTextListControl = oScreen.getControl(CategorySelectScreen.CategoriesID);
		oTextListControl.setFocusedItemByName(oSearchData.CategoryID);
	}

	return oScreen;
}

/******************************************************************************/

CategorySelectScreen.prototype = new Screen();
CategorySelectScreen.prototype.constructor = CategorySelectScreen;

/******************************************************************************/

function CategorySelectScreen(/*SearchDataPtr*/ oSearchData)
{
	this.ScreenID = CategorySelectScreen.ScreenID;
	this.ScreenTitle = "search";
	this.ScreenTitleImage = "titleSearch.gif";

	var oRowItemList = new Array();
	oRowItemList.push(new ListControlRowItem("Category", 300, "listCtrItem_normal"));

	this.fContainerControl = new ContainerControl(this.ScreenID, 80, 100);

	this.fSearchData = oSearchData;

	// load the Categories
	var oSession = MainApp.getThe().getSession();
	var categoryList = oSession.getCategoryList();
	var itemList = new Array();

	itemList.push(new NameValuePair(Category.AllCategoriesID, oSession.getCategoryName(Category.AllCategoriesID)));
	for(var i = 0; i < categoryList.length; i++)
		itemList.push(new NameValuePair(categoryList[i].CategoryID, categoryList[i].Name));

	this.newControl(new TextListControl(CategorySelectScreen.CategoriesID, this.ScreenID,
		oRowItemList, itemList));
}

/******************************************************************************/

/*void*/ CategorySelectScreen.prototype.onButton = function(/*string*/ controlID)
{
	var oTextListControl = this.getControl(CategorySelectScreen.CategoriesID);
	this.fSearchData.CategoryID = oTextListControl.getFocusedItemValue().Name;

	var oSession = MainApp.getThe().getSession();
	var oScreen = MainApp.getThe().getScreen(SearchScreen.ScreenID);
	var oButtonControl = oScreen.getControl(SearchScreen.CategoryID);
	oButtonControl.setText(oSession.getCategoryName(this.fSearchData.CategoryID));

	this.close();
}

/******************************************************************************/
/******************************************************************************/
/* RatingSelectScreen.js */

/******************************************************************************/
/******************************************************************************/

RatingSelectScreen.ScreenID = "Search008";
RatingSelectScreen.RatingsID = "Search008_Ratings";

/******************************************************************************/

RatingSelectScreen.newInstance = function(/*SearchDataPtr*/ oSearchData)
{
	var oScreen = MainApp.getThe().openScreen(new RatingSelectScreen(oSearchData));

	if(testStrHasLen(oSearchData.RatingID))
	{
		var oTextListControl = oScreen.getControl(RatingSelectScreen.RatingsID);
		oTextListControl.setFocusedItemByName(oSearchData.RatingID);
	}

	return oScreen;
}

/******************************************************************************/

RatingSelectScreen.prototype = new Screen();
RatingSelectScreen.prototype.constructor = RatingSelectScreen;

/******************************************************************************/

function RatingSelectScreen(/*SearchDataPtr*/ oSearchData)
{
	this.ScreenID = RatingSelectScreen.ScreenID;
	this.ScreenTitle = "search";
	this.ScreenTitleImage = "titleSearch.gif";

	var oRowItemList = new Array();
	oRowItemList.push(new ListControlRowItem("Rating", 300, "listCtrItem_normal"));

	this.fContainerControl = new ContainerControl(this.ScreenID, 80, 100);

	this.fSearchData = oSearchData;

	// load the Ratings
	var oSession = MainApp.getThe().getSession();
	var ratingList = oSession.getRatingList();
	var itemList = new Array();

	itemList.push(new NameValuePair(Rating.AllRatingsID, oSession.getRatingName(Rating.AllRatingsID)));
	for(var i = 0; i < ratingList.length; i++)
		itemList.push(new NameValuePair(ratingList[i].RatingID, ratingList[i].Name));

	this.newControl(new TextListControl(RatingSelectScreen.RatingsID, this.ScreenID,
		oRowItemList, itemList));
}

/******************************************************************************/

/*void*/ RatingSelectScreen.prototype.onButton = function(/*string*/ controlID)
{
	var oTextListControl = this.getControl(RatingSelectScreen.RatingsID);
	this.fSearchData.RatingID = oTextListControl.getFocusedItemValue().Name;

	var oSession = MainApp.getThe().getSession();
	var oScreen = MainApp.getThe().getScreen(SearchScreen.ScreenID);
	var oButtonControl = oScreen.getControl(SearchScreen.RatingID);
	oButtonControl.setText(oSession.getRatingName(this.fSearchData.RatingID));

	this.close();
}

/******************************************************************************/
/******************************************************************************/
/* SearchDetailScreen.js */

/******************************************************************************/
/******************************************************************************/

SearchDetailScreen.ScreenID = "Search004";
SearchDetailScreen.PictureID = "Search004_Picture";
SearchDetailScreen.NameID = "Search004_Name";
SearchDetailScreen.EpisodeID = "Search004_Episode";
SearchDetailScreen.ReleasedID = "Search004_Released";
SearchDetailScreen.DescriptionID = "Search004_Description";
SearchDetailScreen.RunningMinsID = "Search004_RunningMins";
SearchDetailScreen.CategoryID = "Search004_Category";
SearchDetailScreen.ProviderID = "Search004_Provider";
SearchDetailScreen.RatingID = "Search004_Rating";
SearchDetailScreen.CostID = "Search004_Cost";
SearchDetailScreen.RentalPeriodHoursID = "Search004_RentalPeriodHours";
SearchDetailScreen.MultiRentalsID = "Search004_MultiRentals";
SearchDetailScreen.RentNowID = "Search004_RentNow";

/******************************************************************************/

SearchDetailScreen.newInstance = function(/*RentedShow*/ showDetail)
{
	return MainApp.getThe().openScreen(new SearchDetailScreen(showDetail));
}

/******************************************************************************/

SearchDetailScreen.prototype = new Screen();
SearchDetailScreen.prototype.constructor = SearchDetailScreen;

/******************************************************************************/

function SearchDetailScreen(/*RentedShow*/ showDetail)
{
	var oSession = MainApp.getThe().getSession();
	var oControl;
	var tempStr;

	this.fShowDetail = showDetail;
	this.ScreenID = SearchDetailScreen.ScreenID;
	this.ScreenTitle = "search";
	this.ScreenTitleImage = "titleSearch.gif";

	var showProvider = this.fShowDetail.ShowProviderList[0];
	var showCost = showProvider.ShowCostList[0];

	this.fContainerControl = new ContainerControl(this.ScreenID, 22, 80);

	oControl = new ImageControl(SearchDetailScreen.PictureID, this.ScreenID);
	if(testStrHasLen(showDetail.PictureURL))
		oControl.setSource(showDetail.PictureURL);
	else
		oControl.setSource("images/no_picture.gif");
	this.newControl(oControl);

	oControl = new ButtonControl(SearchDetailScreen.RentNowID, this.ScreenID);
	oControl.setText((showCost.ShowCostType == sct_Free) ? "Get Now" : "Rent Now");
	this.newControl(oControl);


	oControl = new TextControl(SearchDetailScreen.NameID, this.ScreenID);
	oControl.setText(this.fShowDetail.Name);
	this.newControl(oControl);

	tempStr = "";
	if(testStrHasLen(this.fShowDetail.EpisodeName) || testStrHasLen(this.fShowDetail.EpisodeNumber))
	{
		if(testStrHasLen(this.fShowDetail.EpisodeName))
		{
			tempStr = '"' + this.fShowDetail.EpisodeName + '"';
			if(testStrHasLen(this.fShowDetail.EpisodeNumber))
				tempStr += " (" + this.fShowDetail.EpisodeNumber + ")";
		}
		else
			tempStr = "Episode: " + this.fShowDetail.EpisodeNumber;

	}
	oControl = new TextControl(SearchDetailScreen.EpisodeID, this.ScreenID);
	oControl.setText(tempStr);
	this.newControl(oControl);

	oControl = new TextControl(SearchDetailScreen.DescriptionID, this.ScreenID);
	oControl.setText(this.fShowDetail.Description);
	this.newControl(oControl);

	tempStr = "n/a";
	if(this.fShowDetail.ReleasedOn)
		tempStr = dateTimeToString(this.fShowDetail.ReleasedOn, dtf_M_D_YYYY, true);
	else if(this.fShowDetail.ReleasedYear)
		tempStr = this.fShowDetail.ReleasedYear.toString();
	oControl = new TextControl(SearchDetailScreen.ReleasedID, this.ScreenID);
	oControl.setText(tempStr);
	this.newControl(oControl);

	tempStr = "n/a";
	if(this.fShowDetail.RunningMins)
		tempStr = this.fShowDetail.RunningMins + " mins";
	oControl = new TextControl(SearchDetailScreen.RunningMinsID, this.ScreenID);
	oControl.setText(tempStr);
	this.newControl(oControl);

	tempStr = "n/a";
	if(this.fShowDetail.RatingID)
		tempStr = oSession.getRatingName(this.fShowDetail.RatingID)
	oControl = new TextControl(SearchDetailScreen.RatingID, this.ScreenID);
	oControl.setText(tempStr);
	this.newControl(oControl);

	oControl = new TextControl(SearchDetailScreen.CategoryID, this.ScreenID);
	oControl.setText(oSession.getCategoryNames(this.fShowDetail.CategoryIDList));
	this.newControl(oControl);

	oControl = new TextControl(SearchDetailScreen.ProviderID, this.ScreenID);
	oControl.setText(oSession.getProviderName(showProvider.ProviderID));
	this.newControl(oControl);

	oControl = new TextControl(SearchDetailScreen.CostID, this.ScreenID);
	oControl.setText(showCost.CostDisplay);
	this.newControl(oControl);

	oControl = new TextControl(SearchDetailScreen.RentalPeriodHoursID, this.ScreenID);
	oControl.setText(showCost.formatRental());
	this.newControl(oControl);

	oControl = new TextControl(SearchDetailScreen.MultiRentalsID, this.ScreenID);
	if((this.fShowDetail.ShowProviderList.length > 1) || (showProvider.ShowCostList.length > 1))
		oControl.setText("* Additional rentals available.");
	else
		oControl.setText("");
	this.newControl(oControl);
}

/******************************************************************************/

/*boolean*/ SearchDetailScreen.prototype.key = function(/*int*/ key, /*Event*/ evt)
{
	if((key == ek_Back) || (key == ek_Escape))
	{
		MainApp.getThe().closePopup();
		return;
	}

	return Screen.prototype.key.call(this, key, evt);
}

/******************************************************************************/

/*void*/ SearchDetailScreen.prototype.onButton = function(/*string*/ controlID)
{
	var oSession = MainApp.getThe().getSession();

	if(controlID == SearchDetailScreen.RentNowID)
	{
		if(!oSession.isGuestAccess())
		{
			RentScreen.newInstance(this.fShowDetail);
			return;
		}

		this.Callback = SearchDetailScreen.prototype.doAfterSignon;

		if(!oSession.haveUserID())
		{
			SetupScreen.newInstance(this);
			return;
		}

		if(!oSession.haveUserPassword())
		{
			LogonScreen.newInstance(this);
			return;
		}

		return;
	}

	Screen.prototype.onButton.call(this, controlID);
}

/******************************************************************************/

/*void*/ SearchDetailScreen.prototype.doAfterSignon = function()
{
	RentScreen.newInstance(this.fShowDetail);
}

/******************************************************************************/
/******************************************************************************/
/* RentData.js */

/******************************************************************************/
/******************************************************************************/

function RentData(/*ShowDetail*/ oShowDetail)
{
	var oSession = MainApp.getThe().getSession();

	this.ShowDetail = oShowDetail;

	this.HasMultipleRentals = true;
	this.Provider = null;
	this.ShowCost = null;

	if(this.ShowDetail.ShowProviderList.length == 1)
		if(this.ShowDetail.ShowProviderList[0].ShowCostList.length == 1)
		{
			this.HasMultipleRentals = false;
			this.Provider = oSession.getProvider(this.ShowDetail.ShowProviderList[0].ProviderID);
			this.ShowCost = this.ShowDetail.ShowProviderList[0].ShowCostList[0];
		}

	this.UserID = null;
	this.Password = null;
}

/******************************************************************************/

/*string*/ RentData.prototype.getShowID = function()
{
	return this.ShowDetail.ShowID;
}

/******************************************************************************/

/*string*/ RentData.prototype.getProviderID = function()
{
	return this.Provider.ProviderID;
}

/******************************************************************************/

/*string*/ RentData.prototype.getProviderName = function()
{
	return this.Provider.Name;
}

/******************************************************************************/

/*void*/ RentData.prototype.setRental = function(/*Provider*/ provider, /*ShowCost*/ showCost)
{
	this.Provider = provider;
	this.ShowCost = showCost;
}

/******************************************************************************/
/******************************************************************************/
/* RentScreen.js */

/******************************************************************************/
/******************************************************************************/

RentScreen.ScreenID = "Rent001";

/* RentStep */
var ss_Undefined = 0;
var ss_PickRentalStep = 1;
var ss_AskHaveProviderStep = 2;
var ss_NeedProviderStep = 3;
var ss_HaveProviderStep = 4;
var ss_ConfirmChargeStep = 5;

/******************************************************************************/

RentScreen.newInstance = function(/*ShowDetail*/ oShowDetail)
{
	var oScreen = new RentScreen(oShowDetail);

	MainApp.getThe().openScreen(oScreen);
	oScreen.createControls();

	return oScreen;
}

/******************************************************************************/

RentScreen.prototype = new Screen();
RentScreen.prototype.constructor = RentScreen;

/******************************************************************************/

function RentScreen(/*ShowDetail*/ oShowDetail)
{
	this.ScreenID = RentScreen.ScreenID;
	this.ScreenTitle = "rent";
	this.ScreenTitleImage = "titleRent.gif";

	this.fContainerControl = new ContainerControl(this.ScreenID, 50, 100);

	this.fStepControlID = null;
	this.fRentData = new RentData(oShowDetail);
	this.fCurStep = ss_Undefined;
}

/******************************************************************************/

/*void*/ RentScreen.prototype.close = function()
{
	var oContainerControl = this.findControl(this.fStepControlID);
	if(oContainerControl != null)
		oContainerControl.show(false);
	Screen.prototype.close.call(this);
}

/******************************************************************************/

/*void*/ RentScreen.prototype.createControls = function()
{
	var oSession = MainApp.getThe().getSession();

	if(this.fRentData.HasMultipleRentals)
		this.openStep(ss_PickRentalStep);
	else
	{
		var nextStep = this.allowAnonymous();
		if (nextStep != ss_Undefined)
			this.openStep(nextStep);
	}
}

/******************************************************************************/

/*void*/ RentScreen.prototype.openStep = function(/*int*/ step)
{
	var oContainerControl;

	switch(step)
	{
		case ss_PickRentalStep:
		default:
			oContainerControl = PickRentalControl.newInstance();
			break;
		case ss_AskHaveProviderStep:
			oContainerControl = AskHaveProviderControl.newInstance();
			break;
		case ss_NeedProviderStep:
			oContainerControl = NeedProviderControl.newInstance();
			break;
		case ss_HaveProviderStep:
			oContainerControl = HaveProviderControl.newInstance();
			break;
		case ss_ConfirmChargeStep:
			oContainerControl = ConfirmChargeControl.newInstance();
			break;
	}

	oContainerControl.show(true);
	this.newControl(oContainerControl);
	this.fStepControlID = oContainerControl.ControlID;
	this.fCurStep = step;
	oContainerControl.loadData(this.fRentData);
	this.fContainerControl.setFocus(true);
}

/******************************************************************************/

/*boolean*/ RentScreen.prototype.closeStep = function(/*boolean*/ doUnload)
{
	var oContainerControl = this.getControl(this.fStepControlID);

	if(doUnload)
	{
		if(!oContainerControl.unloadData(this.fRentData))
			return false;
	}

	oContainerControl.show(false);
	this.deleteControl(this.fStepControlID);
	return true;
}

/******************************************************************************/

/*boolean*/ RentScreen.prototype.key = function(/*int*/ key, /*Event*/ evt)
{
	if((key == ek_Back) || (key == ek_Escape))
	{
		if(this.fContainerControl.key(key, evt))
			return true;

		if(this.fCurStep == ss_PickRentalStep)
		{
			if(this.closeStep(false))
				this.close();
			return true;
		}
		else if(this.fCurStep == ss_AskHaveProviderStep)
		{
			if(this.closeStep(false))
			{
				if(this.fRentData.HasMultipleRentals)
					this.openStep(ss_PickRentalStep);
				else
					this.close();
			}

			return true;
		}
		else if(this.fCurStep == ss_NeedProviderStep)
		{
			if(this.closeStep(false))
				this.openStep(ss_AskHaveProviderStep);

			return true;
		}
		else if(this.fCurStep == ss_HaveProviderStep)
		{
			if(this.closeStep(false))
			{
				var oSession = MainApp.getThe().getSession();

				if(oSession.isMemberOfProvider(this.fRentData.getProviderID()))
					this.close();
				else
					this.openStep(ss_AskHaveProviderStep);
			}

			return true;
		}
		else if(this.fCurStep == ss_ConfirmChargeStep)
		{
			if(this.closeStep(false))
			{
				if(this.fRentData.HasMultipleRentals)
					this.openStep(ss_PickRentalStep);
				else
					this.close();
			}

			return true;
		}
	}

	return Screen.prototype.key.call(this, key, evt);
}

/******************************************************************************/

/*void*/ RentScreen.prototype.onButton = function(/*string*/ controlID)
{
	if(this.fCurStep == ss_PickRentalStep)
	{
		if(controlID == PickRentalControl.ProviderListID)
		{
			if(this.closeStep(true))
			{
				var nextStep = this.allowAnonymous();
				if (nextStep != ss_Undefined)
					this.openStep(nextStep);
			}
			return;
		}
	}
	else if(this.fCurStep == ss_AskHaveProviderStep)
	{
		if(controlID == AskHaveProviderControl.HaveMembershipID)
		{
			if(this.closeStep(true))
				this.openStep(ss_HaveProviderStep);
			return;
		}
		else if(controlID == AskHaveProviderControl.NeedMembershipID)
		{
			if(this.closeStep(true))
				this.openStep(ss_NeedProviderStep);
			return;
		}
	}
	else if(this.fCurStep == ss_NeedProviderStep)
	{
		if(controlID == NeedProviderControl.CreateMembershipID)
		{
			if(this.closeStep(true))
				this.providerEnroll();
			return;
		}
	}
	else if(this.fCurStep == ss_HaveProviderStep)
	{
		if(controlID == HaveProviderControl.ContinueID)
		{
			if(this.closeStep(true))
				this.setProvider();

			return;
		}
	}
	else if(this.fCurStep == ss_ConfirmChargeStep)
	{
		if(controlID == ConfirmChargeControl.ChargeAccountID)
		{
			if(this.closeStep(true))
				this.rentShow();
			//if(this.fRentedShowID)
			//	this.close();
			return;
		}
		else if(controlID == ConfirmChargeControl.DontChargeAccountID)
		{
			if(this.closeStep(true))
				this.close();
			return;
		}
	}

	Screen.prototype.onButton.call(this, controlID);
}

/******************************************************************************/

/*RentStep*/ RentScreen.prototype.allowAnonymous = function()
{
	var oSession = MainApp.getThe().getSession();

	if((this.fRentData.ShowCost.ShowCostType == sct_Free) ||
		oSession.isMemberOfProvider(this.fRentData.getProviderID()))
	{
		this.checkShowAvail();
		return ss_Undefined;
	}
	else
		return ss_AskHaveProviderStep;
}

/******************************************************************************/

/*void*/ RentScreen.prototype.checkShowAvail = function()
{
	var oSession = MainApp.getThe().getSession();

	this.Callback = RentScreen.prototype.afterCheckShowAvail;
	oSession.checkShowAvail(this, this.fRentData.getShowID(), this.fRentData.getProviderID(),
		this.fRentData.ShowCost);
}

/******************************************************************************/

/*void*/ RentScreen.prototype.afterCheckShowAvail = function(/*CheckShowAvailResp*/ oCheckShowAvailResp,
	/*StatusCode*/ statusCode, /*string*/ statusMessage)
{
	var oSession = MainApp.getThe().getSession();

	if(statusCode == sc_InvalidProviderUserIDPassword)
	{
		this.openStep(ss_HaveProviderStep);
		return;
	}
	if(statusCode != sc_Success)
	{
		this.close();
		return;
	}

	var oShowCost = oCheckShowAvailResp.ShowCost;

	this.fRentData.ShowCost = oShowCost;
	if(oShowCost.ShowCostType == sct_PayPerView)
	{
		this.openStep(ss_ConfirmChargeStep);
		return;
	}

	this.rentShow();
}

/******************************************************************************/

/*void*/ RentScreen.prototype.rentShow = function()
{
	var oSession = MainApp.getThe().getSession();

	this.Callback = RentScreen.prototype.afterRentShow;
	oSession.rentShow(this, this.fRentData.getShowID(),
		this.fRentData.getProviderID(), this.fRentData.ShowCost);
}

/******************************************************************************/

/*void*/ RentScreen.prototype.afterRentShow = function(/*RentShowResp*/ oRentShowResp,
	/*StatusCode*/ statusCode, /*string*/ statusMessage)
{
	var oSession = MainApp.getThe().getSession();

	// close the SearchDetailScreen and this screen
	var oScreen = MainApp.getThe().findScreen(SearchDetailScreen.ScreenID);
	if(oScreen != null)
		oScreen.close();
	this.close();

	if(oRentShowResp != null)
	{
		// fetch the rentedShow and open the screen
		this.Callback = RentScreen.prototype.afterRentedShow;
		oSession.rentedShow(this, oRentShowResp.RentedShowID);
	}
}

/******************************************************************************/

/*void*/ RentScreen.prototype.afterRentedShow = function(/*RentedShow*/ rentedShow,
	/*StatusCode*/ statusCode, /*string*/ statusMessage)
{
	if(statusCode == sc_Success)
	{
		RentedShowDetailScreen.newInstance(rentedShow);
	}

	// show message last, or will have focus problems
	showMsg("This Show has been successfully added to your Now Playing list.");
}

/******************************************************************************/

/*void*/ RentScreen.prototype.setProvider = function()
{
	var oSession = MainApp.getThe().getSession();

	this.Callback = RentScreen.prototype.afterSetProvider;
	oSession.setProvider(this, this.fRentData.getProviderID(),
		this.fRentData.UserID, this.fRentData.Password);
}

/******************************************************************************/

/*void*/ RentScreen.prototype.afterSetProvider = function(/*object*/ data,
	/*StatusCode*/ statusCode, /*string*/ statusMessage)
{
	if(statusCode == sc_Success)
		this.checkShowAvail();
	else
		this.openStep(ss_HaveProviderStep);
}

/******************************************************************************/

/*void*/ RentScreen.prototype.providerEnroll = function()
{
	var oSession = MainApp.getThe().getSession();

	this.Callback = RentScreen.prototype.afterProviderEnroll;
	oSession.providerEnroll(this, this.fRentData.getProviderID());
}

/******************************************************************************/

/*void*/ RentScreen.prototype.afterProviderEnroll = function(/*object*/ data,
	/*StatusCode*/ statusCode, /*string*/ statusMessage)
{
	var oSession = MainApp.getThe().getSession();
	var tempStr;

	if(statusCode == sc_Success)
	{
		tempStr = "Congratulations! You have been successfully enrolled to ";
		tempStr += this.fRentData.getProviderName();
		tempStr += "'s membership.";

		showMsg(tempStr);

		this.checkShowAvail();
	}
	else
		this.openStep(ss_NeedProviderStep);
}

/******************************************************************************/
/******************************************************************************/
/* PickRentalControl.js */

/******************************************************************************/
/******************************************************************************/

PickRentalControl.ControlID = "Rent001_PickRentalControl";

PickRentalControl.AvailTextID = "Rent001_PickRentalControl_AvailText";
PickRentalControl.ProviderListID = "Rent001_PickRentalControl_ProviderList";

/******************************************************************************/

PickRentalControl.newInstance = function()
{
	var containerControl = new PickRentalControl(PickRentalControl.ControlID, 0, 0);

	var oRowItemList = new Array();
	oRowItemList.push(new ListControlRowItem("Provider", 215, "listCtrItem_normal"));
	oRowItemList.push(new ListControlRowItem("Rental", 140, "listCtrSmallItem_normal"));
	oRowItemList.push(new ListControlRowItem("Price", 60, "listCtrSmallItem_normal"));

	containerControl.newControl(new TextControl(PickRentalControl.AvailTextID, RentScreen.ScreenID));
	containerControl.newControl(new ShowProviderListControl(PickRentalControl.ProviderListID,
		RentScreen.ScreenID, oRowItemList, null));

	return containerControl;
}

/******************************************************************************/

PickRentalControl.prototype = new ContainerControl();
PickRentalControl.prototype.constructor = PickRentalControl;

/******************************************************************************/

function PickRentalControl(/*int*/ controlID, /*int*/ left, /*int*/ top)
{
	ContainerControl.prototype.init.call(this, controlID, left, top);
}

/******************************************************************************/

/*boolean*/ PickRentalControl.prototype.loadData = function(/*object*/ oData)
{
	var oRentData = oData;
	var oControl;
	var tempStr;

	oControl = this.getControl(PickRentalControl.AvailTextID);
	tempStr = "'" + oRentData.ShowDetail.Name + "' is available through multiple rentals.";
	oControl.setText(tempStr);

	oControl = this.getControl(PickRentalControl.ProviderListID);
	oControl.setShowProviderList(oRentData.ShowDetail.ShowProviderList, true);

	return true;
}

/******************************************************************************/

/*boolean*/ PickRentalControl.prototype.unloadData = function(/*object*/ oData)
{
	var oRentData = oData;
	var showProviderItem;

	showProviderItem = this.getControl(PickRentalControl.ProviderListID).getFocusedItemValue();
	oRentData.setRental(showProviderItem.Provider, showProviderItem.ShowCost);

	return true;
}

/******************************************************************************/
/******************************************************************************/
/* AskHaveProviderControl.js */

/******************************************************************************/
/******************************************************************************/

AskHaveProviderControl.ControlID = "Rent001_AskHaveProviderControl";

AskHaveProviderControl.WelcomeTextID = "Rent001_AskHaveProviderControl_WelcomeText";
AskHaveProviderControl.MembershipTextID = "Rent001_AskHaveProviderControl_MembershipText";
AskHaveProviderControl.HaveMembershipID = "Rent001_AskHaveProviderControl_HaveMembership";
AskHaveProviderControl.NeedMembershipID = "Rent001_AskHaveProviderControl_NeedMembership";

/******************************************************************************/

AskHaveProviderControl.newInstance = function()
{
	var containerControl = new AskHaveProviderControl(AskHaveProviderControl.ControlID, 0, 0);

	containerControl.newControl(new TextControl(AskHaveProviderControl.WelcomeTextID, RentScreen.ScreenID));
	containerControl.newControl(new TextControl(AskHaveProviderControl.MembershipTextID, RentScreen.ScreenID));
	containerControl.newControl(new ButtonControl(AskHaveProviderControl.HaveMembershipID, RentScreen.ScreenID));
	containerControl.newControl(new ButtonControl(AskHaveProviderControl.NeedMembershipID, RentScreen.ScreenID));

	return containerControl
}

/******************************************************************************/

AskHaveProviderControl.prototype = new ContainerControl();
AskHaveProviderControl.prototype.constructor = AskHaveProviderControl;

/******************************************************************************/

function AskHaveProviderControl(/*int*/ controlID, /*int*/ left, /*int*/ top)
{
	ContainerControl.prototype.init.call(this, controlID, left, top);
}

/******************************************************************************/

/*boolean*/ AskHaveProviderControl.prototype.loadData = function(/*object*/ oData)
{
	var oRentData = oData;
	var oControl;
	var tempStr;

	oControl = this.getControl(AskHaveProviderControl.WelcomeTextID);
	tempStr = "This show requires a membership with the provider, ";
	tempStr += oRentData.getProviderName();
	tempStr += ".";
	oControl.setText(tempStr);

	oControl = this.getControl(AskHaveProviderControl.MembershipTextID);
	tempStr = "Do you already have a membership with ";
	tempStr += oRentData.getProviderName();
	tempStr += "?";
	oControl.setText(tempStr);

	return true;
}

/******************************************************************************/
/******************************************************************************/
/* NeedProviderControl.js */

/******************************************************************************/
/******************************************************************************/

NeedProviderControl.ControlID = "Rent001_NeedProviderControl";

NeedProviderControl.MemberTextID = "Rent001_NeedProviderControl_MemberText";
NeedProviderControl.PlanTextID = "Rent001_NeedProviderControl_PlanText";
NeedProviderControl.CreateMembershipID = "Rent001_NeedProviderControl_CreateMembership";

/******************************************************************************/

NeedProviderControl.newInstance = function()
{
	var containerControl = new NeedProviderControl(NeedProviderControl.ControlID, 0, 0);

	containerControl.newControl(new TextControl(NeedProviderControl.MemberTextID, RentScreen.ScreenID));
	containerControl.newControl(new TextControl(NeedProviderControl.PlanTextID, RentScreen.ScreenID));
	containerControl.newControl(new ButtonControl(NeedProviderControl.CreateMembershipID, RentScreen.ScreenID));

	return containerControl;
}

/******************************************************************************/

NeedProviderControl.prototype = new ContainerControl();
NeedProviderControl.prototype.constructor = NeedProviderControl;

/******************************************************************************/

function NeedProviderControl(/*int*/ controlID, /*int*/ left, /*int*/ top)
{
	ContainerControl.prototype.init.call(this, controlID, left, top);
}

/******************************************************************************/

/*boolean*/ NeedProviderControl.prototype.loadData = function(/*object*/ oData)
{
	var oRentData = oData;
	var oControl;
	var tempStr;

	oControl = this.getControl(NeedProviderControl.MemberTextID);
	tempStr = "Your Storm membership information will be used to create a new FREE membership at ";
	tempStr += oRentData.getProviderName();
	tempStr += ".  Your credit card information, if on file, will not be sent to ";
	tempStr += oRentData.getProviderName();
	tempStr += ".";
	oControl.setText(tempStr);

	oControl = this.getControl(NeedProviderControl.PlanTextID);
	tempStr = oRentData.getProviderName();
	tempStr += " may have various member subscription plans that may be of interest to you.  Please visit their site for more information.";
	oControl.setText(tempStr);

	return true;
}

/******************************************************************************/
/******************************************************************************/
/* HaveProviderControl.js */

/******************************************************************************/
/******************************************************************************/

HaveProviderControl.ControlID = "Rent001_HaveProviderControl";

HaveProviderControl.DescriptionID = "Rent001_HaveProviderControl_Description";
HaveProviderControl.UserID = "Rent001_HaveProviderControl_UserID";
HaveProviderControl.PasswordID = "Rent001_HaveProviderControl_Password";
HaveProviderControl.ContinueID = "Rent001_HaveProviderControl_Continue";

/******************************************************************************/

HaveProviderControl.newInstance = function()
{
	var containerControl = new HaveProviderControl(HaveProviderControl.ControlID, 0, 0);

	var oControl;

	containerControl.newControl(new TextControl(HaveProviderControl.DescriptionID, RentScreen.ScreenID));

	oControl = new EditControl(HaveProviderControl.UserID, RentScreen.ScreenID, 9, 64)
	containerControl.newControl(oControl);
	oControl.Type = ect_AlphaNumeric;
	oControl = new EditControl(HaveProviderControl.PasswordID, RentScreen.ScreenID, 6, 16);
	oControl.Type = ect_AlphaNumeric;
	containerControl.newControl(oControl);

	containerControl.newControl(new ButtonControl(HaveProviderControl.ContinueID, RentScreen.ScreenID));

	return containerControl
}

/******************************************************************************/

HaveProviderControl.prototype = new ContainerControl();
HaveProviderControl.prototype.constructor = HaveProviderControl;

/******************************************************************************/

function HaveProviderControl(/*int*/ controlID, /*int*/ left, /*int*/ top)
{
	ContainerControl.prototype.init.call(this, controlID, left, top);
}

/******************************************************************************/

/*boolean*/ HaveProviderControl.prototype.loadData = function(/*object*/ oData)
{
	var oRentData = oData;
	var oControl;
	var tempStr;

	oControl = this.getControl(HaveProviderControl.DescriptionID);
	tempStr = "Please enter your logon information for ";
	tempStr += oRentData.getProviderName();
	tempStr += ":";
	oControl.setText(tempStr);

	return true;
}

/******************************************************************************/

/*boolean*/ HaveProviderControl.prototype.unloadData = function(/*object*/ oData)
{
	var data;
	var oRentData = oData;

	data = this.getControl(HaveProviderControl.UserID).getText();
	if(!testStrHasLen(data))
	{
		showMsg("User ID must be entered.");
		return false;
	}
	oRentData.UserID = data;

	data = this.getControl(HaveProviderControl.PasswordID).getText();
	if(!testStrHasLen(data))
	{
		showMsg("Password must be entered.");
		return false;
	}
	oRentData.Password = data;

	return true;
}

/******************************************************************************/
/******************************************************************************/
/* ConfirmChargeControl.js */

/******************************************************************************/
/******************************************************************************/

ConfirmChargeControl.ControlID = "Rent001_ConfirmChargeControl";

ConfirmChargeControl.ChargeTextID = "Rent001_ConfirmChargeControl_ChargeText";
ConfirmChargeControl.ChargeAccountID = "Rent001_ConfirmChargeControl_ChargeAccount";
ConfirmChargeControl.DontChargeAccountID = "Rent001_ConfirmChargeControl_DontChargeAccount";

/******************************************************************************/

ConfirmChargeControl.newInstance = function()
{
	var containerControl = new ConfirmChargeControl(ConfirmChargeControl.ControlID, 0, 0);

	containerControl.newControl(new TextControl(ConfirmChargeControl.ChargeTextID, RentScreen.ScreenID));
	containerControl.newControl(new ButtonControl(ConfirmChargeControl.ChargeAccountID, RentScreen.ScreenID));
	containerControl.newControl(new ButtonControl(ConfirmChargeControl.DontChargeAccountID, RentScreen.ScreenID));

	return containerControl
}

/******************************************************************************/

ConfirmChargeControl.prototype = new ContainerControl();
ConfirmChargeControl.prototype.constructor = ConfirmChargeControl;

/******************************************************************************/

function ConfirmChargeControl(/*int*/ controlID, /*int*/ left, /*int*/ top)
{
	ContainerControl.prototype.init.call(this, controlID, left, top);
}

/******************************************************************************/

/*boolean*/ ConfirmChargeControl.prototype.loadData = function(/*object*/ oData)
{
	var oRentData = oData;
	var oShowCost = oRentData.ShowCost;
	var oTextControl;
	var tempStr;

	oTextControl = this.getControl(ConfirmChargeControl.ChargeTextID);
	tempStr = "This show has a cost of ";
	tempStr += oShowCost.CostDisplay;
	tempStr += ".  This cost will be charged to your account at ";
	tempStr += oRentData.getProviderName();
	tempStr += ".";
	oTextControl.setText(tempStr);

	return true;
}

/******************************************************************************/
/******************************************************************************/
/* RentedShowDetailScreen.js */

/******************************************************************************/
/******************************************************************************/

RentedShowDetailScreen.ScreenID = "Show003";
RentedShowDetailScreen.PictureID = "Show003_Picture";
RentedShowDetailScreen.StatusIconID = "Show003_StatusIcon";
RentedShowDetailScreen.NameID = "Show003_Name";
RentedShowDetailScreen.EpisodeID = "Show003_Episode";
RentedShowDetailScreen.ReleasedID = "Show003_Released";
RentedShowDetailScreen.DescriptionID = "Show003_Description";
RentedShowDetailScreen.RunningMinsID = "Show003_RunningMins";
RentedShowDetailScreen.CategoryID = "Show003_Category";
RentedShowDetailScreen.ProviderID = "Show003_Provider";
RentedShowDetailScreen.RatingID = "Show003_Rating";
RentedShowDetailScreen.CostID = "Show003_Cost";
RentedShowDetailScreen.RentalPeriodHoursID = "Show003_RentalPeriodHours";
RentedShowDetailScreen.RentedOnLabelID = "Show003_RentedOnLabel";
RentedShowDetailScreen.RentedOnID = "Show003_RentedOn";
RentedShowDetailScreen.AvailableUntilID = "Show003_AvailableUntil";
RentedShowDetailScreen.WatchNowID = "Show003_WatchNow";
RentedShowDetailScreen.DeleteNowID = "Show003_DeleteNow";

/******************************************************************************/

RentedShowDetailScreen.newInstance = function(/*RentedShow*/ rentedShow)
{
	return MainApp.getThe().openScreen(new RentedShowDetailScreen(rentedShow));
}

/******************************************************************************/

RentedShowDetailScreen.prototype = new Screen();
RentedShowDetailScreen.prototype.constructor = RentedShowDetailScreen;

/******************************************************************************/

function RentedShowDetailScreen(/*RentedShow*/ rentedShow)
{
	var oSession = MainApp.getThe().getSession();
	var oControl;
	var tempStr;

	this.fRentedShow = rentedShow;
	this.ScreenID = RentedShowDetailScreen.ScreenID;
	this.ScreenTitle = "playing";
	this.ScreenTitleImage = "titlePlaying.gif";
	this.fDownloadStatus = "";

	this.fContainerControl = new ContainerControl(this.ScreenID, 22, 80);

	oControl = new ImageControl(RentedShowDetailScreen.PictureID, this.ScreenID);
	if(testStrHasLen(rentedShow.PictureURL))
		oControl.setSource(rentedShow.PictureURL);
	else
		oControl.setSource("images/no_picture.gif");
	this.newControl(oControl);

	this.newControl(new ButtonControl(RentedShowDetailScreen.WatchNowID, this.ScreenID));
	this.newControl(new ButtonControl(RentedShowDetailScreen.DeleteNowID, this.ScreenID));

	oControl = new ImageControl(RentedShowDetailScreen.StatusIconID, this.ScreenID);
	oControl.setSource("images/ballRed24.gif");
	this.newControl(oControl);

	oControl = new TextControl(RentedShowDetailScreen.NameID, this.ScreenID);
	oControl.setText(this.fRentedShow.Name);
	this.newControl(oControl);

	tempStr = "";
	if(testStrHasLen(this.fRentedShow.EpisodeName) || testStrHasLen(this.fRentedShow.EpisodeNumber))
	{
		if(testStrHasLen(this.fRentedShow.EpisodeName))
		{
			tempStr = '"' + this.fRentedShow.EpisodeName + '"';
			if(testStrHasLen(this.fRentedShow.EpisodeNumber))
				tempStr += " (" + this.fRentedShow.EpisodeNumber + ")";
		}
		else
			tempStr = "Episode: " + this.fRentedShow.EpisodeNumber;

	}
	oControl = new TextControl(RentedShowDetailScreen.EpisodeID, this.ScreenID);
	oControl.setText(tempStr);
	this.newControl(oControl);

	oControl = new TextControl(RentedShowDetailScreen.DescriptionID, this.ScreenID);
	oControl.setText(this.fRentedShow.Description);
	this.newControl(oControl);

	tempStr = "n/a";
	if(this.fRentedShow.ReleasedOn)
		tempStr = dateTimeToString(this.fRentedShow.ReleasedOn, dtf_M_D_YYYY, true);
	else if(this.fRentedShow.ReleasedYear)
		tempStr = this.fRentedShow.ReleasedYear.toString();
	oControl = new TextControl(RentedShowDetailScreen.ReleasedID, this.ScreenID);
	oControl.setText(tempStr);
	this.newControl(oControl);

	tempStr = "n/a";
	if(this.fRentedShow.RunningMins)
		tempStr = this.fRentedShow.RunningMins + " mins";
	oControl = new TextControl(RentedShowDetailScreen.RunningMinsID, this.ScreenID);
	oControl.setText(tempStr);
	this.newControl(oControl);

	tempStr = "n/a";
	if(this.fRentedShow.RatingID)
		tempStr = oSession.getRatingName(this.fRentedShow.RatingID)
	oControl = new TextControl(RentedShowDetailScreen.RatingID, this.ScreenID);
	oControl.setText(tempStr);
	this.newControl(oControl);

	oControl = new TextControl(RentedShowDetailScreen.CategoryID, this.ScreenID);
	oControl.setText(oSession.getCategoryNames(this.fRentedShow.CategoryIDList));
	this.newControl(oControl);

	oControl = new TextControl(RentedShowDetailScreen.ProviderID, this.ScreenID);
	oControl.setText(oSession.getProviderName(this.fRentedShow.ProviderID));
	this.newControl(oControl);

	oControl = new TextControl(RentedShowDetailScreen.CostID, this.ScreenID);
	oControl.setText(this.fRentedShow.ShowCost.CostDisplay);
	this.newControl(oControl);

	tempStr = "n/a";
	oControl = new TextControl(RentedShowDetailScreen.RentalPeriodHoursID, this.ScreenID);
	if(this.fRentedShow.ShowCost.RentalPeriodHours)
		tempStr = this.fRentedShow.ShowCost.RentalPeriodHours + " hrs";
	oControl.setText(tempStr);
	this.newControl(oControl);

	oControl = new TextControl(RentedShowDetailScreen.RentedOnLabelID, this.ScreenID)
	oControl.setText((this.fRentedShow.ShowCost.ShowCostType == sct_Free) ? "Added On:" : "Rented On:");
	this.newControl(oControl);

	oControl = new TextControl(RentedShowDetailScreen.RentedOnID, this.ScreenID);
	oControl.setText(dateTimeToString(this.fRentedShow.RentedOn, dtf_M_D_H_MM_AM));
	this.newControl(oControl);

	tempStr = "n/a";
	oControl = new TextControl(RentedShowDetailScreen.AvailableUntilID, this.ScreenID);
	if(this.fRentedShow.AvailableUntil)
		tempStr = dateTimeToString(this.fRentedShow.AvailableUntil, dtf_M_D_H_MM_AM);
	oControl.setText(tempStr);
	this.newControl(oControl);
}

/******************************************************************************/

/*void*/ RentedShowDetailScreen.prototype.idle = function()
{
	if(this.fDownloadStatus != DownloadStatus_Completed)
	{
		var oSession = MainApp.getThe().getSession();

		oSession.downloadRefresh();
		var newDownloadStatus = oSession.getDownloadRentedShowStatus(this.fRentedShow.RentedShowID);

		if(this.fDownloadStatus != newDownloadStatus)
		{
			this.fDownloadStatus = newDownloadStatus;

			var oControl = this.findControl(RentedShowDetailScreen.StatusIconID);

			if(this.fDownloadStatus == DownloadStatus_InProgress)
				oControl.setSource("images/ballYellow24.gif");
			else if(this.fDownloadStatus == DownloadStatus_Completed)
				oControl.setSource("images/ballGreen24.gif");
			else //if(this.fDownloadStatus == DownloadStatus_NotStarted)
				oControl.setSource("images/ballRed24.gif");
			//else
			//	oControl.setSource("images/ballOrange32.gif");
		}
	}

	Screen.prototype.idle.call(this);
}

/******************************************************************************/

/*boolean*/ RentedShowDetailScreen.prototype.key = function(/*int*/ key, /*Event*/ evt)
{
	if((key == ek_Back) || (key == ek_Escape))
	{
		MainApp.getThe().closePopup();
		return;
	}

	return Screen.prototype.key.call(this, key, evt);
}

/******************************************************************************/

/*void*/ RentedShowDetailScreen.prototype.onButton = function(/*string*/ controlID)
{
	var oSession = MainApp.getThe().getSession();

	if(controlID == RentedShowDetailScreen.WatchNowID)
	{
		this.Callback = RentedShowDetailScreen.prototype.afterWatchShow;
		oSession.watchShow(this, this.fRentedShow.RentedShowID);
		return;
	}
	else if(controlID == RentedShowDetailScreen.DeleteNowID)
	{
		this.Callback = RentedShowDetailScreen.prototype.afterReleaseShow;
		oSession.releaseShow(this, this.fRentedShow.RentedShowID);
		return;
	}

	Screen.prototype.onButton.call(this, controlID);
}

/******************************************************************************/

/*void*/ RentedShowDetailScreen.prototype.afterWatchShow = function(/*License*/ license,
	/*StatusCode*/ statusCode, /*string*/ statusMessage)
{
	if(statusCode != sc_Success)
		return;

	var oSession = MainApp.getThe().getSession();
	oSession.downloadRefresh();

	var useApp = oSession.determineAppForShow(license.ShowURL);
	var downloadStatus = oSession.getDownloadRentedShowStatus(this.fRentedShow.RentedShowID);

	var playLocal = false;

	// downloadStatus will be null if DownloadServiceMgr is not insalled
	if(downloadStatus == DownloadStatus_Completed)
		playLocal = true;
	else if((downloadStatus == DownloadStatus_InProgress) && (useApp == Application_WindowsMediaPlayer))
		playLocal = true;

	if(playLocal)
	{
		if(!oSession.playDownloadedRentedShow(this.fRentedShow.RentedShowID, useApp))
		{
			playLocal = false;
			showMsg("An error occurred while trying to play locally.  Show will be streamed.");
		}
	}

	if(!playLocal)
		MediaPlayerScreen.newInstance(license.ShowURL, useApp);
}

/******************************************************************************/

/*void*/ RentedShowDetailScreen.prototype.afterReleaseShow = function(/*object*/ data,
	/*StatusCode*/ statusCode, /*string*/ statusMessage)
{
	if(statusCode == sc_Success)
	{
		document.location.reload(true);
//		this.close();
//		MainApp.getThe().closePopup();

		//		var oNowPlayingScreen = MainApp.getThe().findScreen(NowPlayingScreen.ScreenID);
//		if(oNowPlayingScreen != null)
//			oNowPlayingScreen.removeRentedShow(this.fRentedShow.RentedShowID);
	}
}

/******************************************************************************/
/******************************************************************************/
/* PreferencesScreen.js */

/******************************************************************************/
/******************************************************************************/

PreferencesScreen.ScreenID = "Prefs001";
PreferencesScreen.AccessAdultValueID = "Prefs001_AccessAdultValue";
PreferencesScreen.AccessAdultButtonID = "Prefs001_AccessAdultButton";
PreferencesScreen.ResetFactoryButtonID = "Prefs001_ResetFactoryButton";

/******************************************************************************/

PreferencesScreen.newInstance = function()
{
	return MainApp.getThe().openScreen(new PreferencesScreen());
}

/******************************************************************************/

PreferencesScreen.prototype = new Screen();
PreferencesScreen.prototype.constructor = PreferencesScreen;

/******************************************************************************/

function PreferencesScreen()
{
	var oControl;

	this.ScreenID = PreferencesScreen.ScreenID;
	this.ScreenTitle = "prefs";
	this.ScreenTitleImage = "titlePrefs.gif";

	this.fContainerControl = new ContainerControl(this.ScreenID, 122, 182);

	oControl = new TextControl(PreferencesScreen.AccessAdultValueID, this.ScreenID);
	this.newControl(oControl);

	oControl = new ButtonControl(PreferencesScreen.AccessAdultButtonID, this.ScreenID);
	this.newControl(oControl);

	this.newControl(new ButtonControl(PreferencesScreen.ResetFactoryButtonID, this.ScreenID));

	this.updateAdultAccess();
}

/******************************************************************************/

/*boolean*/ PreferencesScreen.prototype.key = function(/*int*/ key, /*Event*/ evt)
{
	if((key == ek_Back) || (key == ek_Escape))
	{
		document.location.reload();
		return;
	}

	return Screen.prototype.key.call(this, key, evt);
}

/******************************************************************************/

/*void*/ PreferencesScreen.prototype.onButton = function(/*string*/ controlID)
{
	if(controlID == PreferencesScreen.AccessAdultButtonID)
	{
		AskAdultPINScreen.newInstance();
		return;
	}

	if(controlID == PreferencesScreen.ResetFactoryButtonID)
	{
		MainApp.getThe().getSession().resetDataSettings();
		MainApp.getThe().reset();
		document.location = "../index.jsp";
		return;
	}

	Screen.prototype.onButton.call(this, controlID);
}

/******************************************************************************/

/*boolean*/ PreferencesScreen.prototype.updateAdultAccess = function()
{
	var oSession = MainApp.getThe().getSession();

	var oControl = this.getControl(PreferencesScreen.AccessAdultValueID);
	oControl.setText(oSession.CanAccessAdult ? "Enabled" : "Disabled");

	oControl = this.getControl(PreferencesScreen.AccessAdultButtonID);
	oControl.setEnabled(!oSession.CanAccessAdult && (oSession.IncludeAdult == ina_PromptPassword));
}

/******************************************************************************/
/******************************************************************************/
/* AskAdultPINScreen.js */

/******************************************************************************/
/******************************************************************************/

AskAdultPINScreen.ScreenID = "Prefs002";

AskAdultPINScreen.PINID = "Prefs002_PIN";
AskAdultPINScreen.PINMsgID = "Prefs002_PIN_Msg";
AskAdultPINScreen.ContinueID = "Prefs002_Continue";

/******************************************************************************/

AskAdultPINScreen.newInstance = function()
{
	return MainApp.getThe().openScreen(new AskAdultPINScreen());
}

/******************************************************************************/

AskAdultPINScreen.prototype = new Screen();
AskAdultPINScreen.prototype.constructor = AskAdultPINScreen;

/******************************************************************************/

function AskAdultPINScreen()
{
	var oControl;

	this.ScreenID = AskAdultPINScreen.ScreenID;
	this.ScreenTitle = "enter pin";
	this.ScreenTitleImage = "titleEnterpin.gif";

	this.fContainerControl = new ContainerControl(this.ScreenID, 130, 120);
	oControl = new EditControl(AskAdultPINScreen.PINID, this.ScreenID, 6, 6);
	this.newControl(oControl);
	oControl.Type = ect_Numeric;
	oControl = new TextControl(AskAdultPINScreen.PINMsgID, this.ScreenID);
	this.newControl(oControl);

	this.newControl(new ButtonControl(AskAdultPINScreen.ContinueID, this.ScreenID));
}

/******************************************************************************/

/*void*/ AskAdultPINScreen.prototype.onButton = function(/*string*/ controlID)
{
	var data;

	this.getControl(AskAdultPINScreen.PINMsgID).setText("");

	data = this.getControl(AskAdultPINScreen.PINID).getText();
	if(!testStrHasLen(data))
	{
		this.getControl(AskAdultPINScreen.PINMsgID).setText("PIN must be entered.");
		this.fContainerControl.focusControl(AskAdultPINScreen.PINID, true);
		return;
	}

	var oSession = MainApp.getThe().getSession();

	this.Callback = AskAdultPINScreen.prototype.afterEnableAdultAccess;
	oSession.enableAdultAccess(this, data);
}

/******************************************************************************/

/*void*/ AskAdultPINScreen.prototype.afterEnableAdultAccess = function(/*object*/ data,
	/*StatusCode*/ statusCode, /*string*/ statusMessage)
{
	if(statusCode == sc_Success)
	{
		var oSession = MainApp.getThe().getSession();
		oSession.saveDataSettings();

		MainApp.getThe().getScreen(PreferencesScreen.ScreenID).updateAdultAccess();
		this.close();
	}
}

/******************************************************************************/
/******************************************************************************/
