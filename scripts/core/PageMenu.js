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
