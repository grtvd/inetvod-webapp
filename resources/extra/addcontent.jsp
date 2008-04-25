<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
/**
 * Copyright © 2008 iNetVOD, Inc. All Rights Reserved.
 * iNetVOD Confidential and Proprietary.  See LEGAL.txt.
 */
%>
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
<head>
	<title>Add Content</title>
	<link href="../styles/style.css" rel="stylesheet" type="text/css"/>
	<link href="../omnie.css" rel="stylesheet" type="text/css"/>
	<script type="text/javascript" src="../main.js"></script>
	<script type="text/javascript">
		function runOnLoad()
		{
			MainApp.getThe().init();
			MainApp.getThe().getSession().loadDataSettings();
			headerCheckFields();
			document.getElementById("AddContent_URL").focus();
		}

		function onSubmit()
		{
			var oSubmit = document.getElementById("AddContent_Submit");
			var oEdit = document.getElementById("AddContent_URL");
			var oMsg = document.getElementById("AddContent_Msg");
			var oErr = document.getElementById("AddContent_Err");

			oMsg.innerHTML = "";
			oErr.innerHTML = "";

			var url = trim(oEdit.value);
			if(testStrHasLen(url))
			{
				var result = ExtraAPI.FAILED_RESULT;

				try
				{
					oSubmit.disabled = true;
					result = ExtraAPI.newInstance().addContent(url);
				}
				catch(ignore)
				{
				}
				oSubmit.disabled = false;
				if (result == ExtraAPI.SUCCESS_RESULT)
					oMsg.innerHTML = "Thank you, your podcast has been accepted and will be processed in a short while. Please check back later and feel free to add additional podcasts.";
				else if (result == ExtraAPI.ADD_CONTENT_DUPLICATE_RESULT)
					oMsg.innerHTML = "Thank you, this podcast has already been added. Please feel free to add additional podcasts.";
				else
					oErr.innerHTML = "Sorry, there was an error processing your request. Please check your URL and try again."
			}
			else
			{
				oErr.innerHTML = "Please enter a URL";
				oEdit.focus();
			}
			return false;
		}

		function resetForNewURL()
		{
			document.getElementById("AddContent_Msg").innerHTML = "";
			document.getElementById("AddContent_Err").innerHTML = "";
		}
	</script>
</head>
<body onload="runOnLoad();">
<jsp:include flush="true" page="../includes/header.jsp"/>
<div align="center">

<table border="0" cellpadding="0" cellspacing="0" width="760">
<tr><td align="left" valign="top" class="leftside" width="222">

	<table border="0" cellpadding="0" cellspacing="0" width="200">
	<tr>
		<td class="menuboxtop" align="left" valign="middle">Content</td>
	</tr>
	<tr>
		<td class="menubox"><p><a href="addcontent.jsp" style="background-color:#7CC0E2;">Add Content</a><br/>
			<a href="newfeatures.jsp">New Features</a><br/>
			<a href="developers.jsp">Developers</a><br/></p></td>
	</tr>
	</table>

</td>
<td valign="top" class="contentBody">

	<table border="0" cellpadding="1" cellspacing="0" width="520">
		<tr>
			<td colspan="2" class="contentWithoutBorder">

				<h2>Add Content</h2>

				<p>You want more content! So do we but we need your help. Here is what you can do:</p>

				<ul>
					<li>Get all your friends to register for Storm.  We have talked to many content providers and
						they're all looking at our install base.<br/><br/></li>

					<li>Tell your favorite content providers to support Storm. Pay-per-view, subscription, and of course
						free content is supported by Storm.<br/><br/></li>

					<li>Add your favorite video/audio RSS podcast to Storm. We're adding podcasts as fast as possible,
						but you can help by adding your favorite podcasts here.

						<p>Enter RSS URL:<br/>
							<input id="AddContent_URL" class="editCtr" size="58" maxlength="4096"
								onkeydown="resetForNewURL()"/>&nbsp;
							<input id="AddContent_Submit" type="submit" value="Submit" onclick="return onSubmit()"/><br/>
							<span id="AddContent_Err" class="required"></span>
							<span id="AddContent_Msg" style="color:blue;"></span>
						</p>
					</li>
				</ul>

			</td>
		</tr>
	</table>

</td></tr></table>
</div>
<jsp:include flush="true" page="../includes/footer.jsp"/>
</body>
</html>