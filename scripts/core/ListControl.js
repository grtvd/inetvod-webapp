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
