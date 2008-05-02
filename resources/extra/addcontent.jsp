<%--
Copyright © 2008 iNetVOD, Inc. All Rights Reserved.
iNetVOD Confidential and Proprietary.  See LEGAL.txt.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<jsp:include flush="true" page="../player/header.jsp"/>

	<script type="text/javascript">
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

	<div style="padding:2em;">

		<p>You want more content! So do we but we need your help. Here is what you can do:</p>

		<ul>
			<li>Get all your friends to register for Storm. The more registered users we have, the more
				premium content we can get. We have talked to many online video sites and
				they're all looking at our install base.<br/><br/></li>

			<li>Tell your favorite online video sites to support Storm. Pay-per-view, subscription, and of course
				free content is supported by Storm.<br/><br/></li>

			<li>Add your favorite video/audio RSS podcasts to Storm. We're adding podcasts as fast as possible,
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

	</div>

<jsp:include flush="true" page="../player/footer.jsp"/>
